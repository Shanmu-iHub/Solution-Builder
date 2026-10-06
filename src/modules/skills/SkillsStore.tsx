import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { sleep, uid } from '../ui';
import { Asset, AssetReview, AssetType, ChangeType, HistoryAction, HistoryEntry, ValidationIssue, ValidationReport } from './types';
import { seedAssets, seedHistory, seedReviews } from './mockData';

const ACTOR = 'Workspace Admin';

const bump = (version: string, change: ChangeType) => {
  const [maj, min, pat] = version.split('.').map(n => parseInt(n, 10) || 0);
  if (change === 'MAJOR') return `${maj + 1}.0.0`;
  if (change === 'MINOR') return `${maj}.${min + 1}.0`;
  return `${maj}.${min}.${pat + 1}`;
};

const idPrefix: Record<AssetType, string> = { capability: 'CAP', skill: 'SKL', knowledge: 'KNW', instruction: 'INS', policy: 'POL' };

/** Heuristic stand-in for the backend compliance pipeline. */
export const scanAsset = (a: Pick<Asset, 'type' | 'displayName' | 'shortDescription' | 'description' | 'category' | 'tags' | 'promptTemplate' | 'content'>): ValidationReport => {
  const issues: ValidationIssue[] = [];
  const body = `${a.promptTemplate || ''}\n${a.content || ''}`;
  if (!a.category) issues.push({ category: 'METADATA', severity: 'MEDIUM', message: 'No category selected — the marketplace needs one for discovery.', fixSuggestion: 'Choose the closest marketplace category in Basics.' });
  if (a.tags.length < 2) issues.push({ category: 'METADATA', severity: 'LOW', message: 'Fewer than two tags. Search relevance will be limited.', fixSuggestion: 'Add at least three descriptive tags.' });
  if (body.trim().length > 0 && body.trim().length < 80) issues.push({ category: 'CONTENT', severity: 'MEDIUM', message: 'The content is very short and may not give the AI enough direction.', fixSuggestion: 'Expand it with rules, an output format and an example.' });
  if (a.type === 'skill' && !/\{\{.+?\}\}/.test(body)) issues.push({ category: 'AI_QUALITY', severity: 'LOW', message: 'No input placeholder like {{input}} found in the prompt template.', fixSuggestion: 'Add a placeholder so callers can pass their data.' });
  if (/(password|api[_ -]?key|secret|token)\s*[:=]/i.test(body)) issues.push({ category: 'PROMPT_SECURITY', severity: 'CRITICAL', message: 'Possible hard-coded credential detected in the content.', fixSuggestion: 'Remove the secret and reference a vault variable instead.' });
  if (/ignore (all )?previous instructions/i.test(body)) issues.push({ category: 'BEHAVIORAL_SECURITY', severity: 'HIGH', message: 'Prompt-injection style phrase found.', fixSuggestion: 'Rephrase the instruction without overriding system rules.' });
  if (/\b\d{3}-\d{2}-\d{4}\b|\b\d{16}\b/.test(body)) issues.push({ category: 'DATA_PRIVACY', severity: 'HIGH', message: 'Content appears to contain personal identifiers (SSN / card number).', fixSuggestion: 'Replace real values with placeholders.' });
  const weights = { CRITICAL: 40, HIGH: 20, MEDIUM: 10, LOW: 0 } as const;
  const score = Math.max(0, 100 - issues.reduce((s, i) => s + weights[i.severity], 0));
  const blocked = issues.some(i => i.severity === 'CRITICAL' || i.severity === 'HIGH');
  return { status: blocked ? 'BLOCKED' : issues.length ? 'WARNINGS' : 'PASSED', readinessScore: score, issues, scannedAt: new Date().toISOString() };
};

export const reportScores = (r: ValidationReport) => {
  const ded = (list: ValidationIssue[]) => list.reduce((s, i) => s + (i.severity === 'CRITICAL' ? 40 : i.severity === 'HIGH' ? 20 : i.severity === 'MEDIUM' ? 10 : 0), 0);
  const quality = r.issues.filter(i => ['METADATA', 'CONTENT', 'AI_QUALITY'].includes(i.category));
  const security = r.issues.filter(i => ['PROMPT_SECURITY', 'BEHAVIORAL_SECURITY', 'DATA_PRIVACY', 'COMPLIANCE'].includes(i.category));
  return { quality: Math.max(0, 100 - ded(quality)), security: Math.max(0, 100 - ded(security)) };
};

interface SkillsStore {
  assets: Asset[];
  reviews: AssetReview[];
  history: HistoryEntry[];
  pins: string[];
  /** One representative per version family (live version first). */
  library: (Asset & { pendingDraft?: Asset })[];
  getAsset: (id: string) => Asset | undefined;
  familyOf: (familyId: string) => Asset[];
  createAsset: (draft: Partial<Asset> & { type: AssetType; displayName: string }, publish?: boolean) => Promise<Asset>;
  updateAsset: (id: string, patch: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  publish: (id: string) => Promise<ValidationReport>;
  deprecate: (id: string, reason: string, replacementId?: string) => void;
  reactivate: (id: string) => void;
  archive: (id: string, reason: string) => void;
  restore: (id: string) => void;
  createVersion: (id: string, change: ChangeType, notes: string) => Asset;
  rollback: (assetId: string) => void;
  togglePin: (id: string) => void;
  addReview: (r: Omit<AssetReview, 'id' | 'createdAt' | 'helpful' | 'verified'>) => void;
  link: (capabilityId: string, assetId: string) => void;
  unlink: (capabilityId: string, assetId: string) => void;
}

const Ctx = createContext<SkillsStore | null>(null);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(seedAssets);
  const [reviews, setReviews] = useState<AssetReview[]>(seedReviews);
  const [history, setHistory] = useState<HistoryEntry[]>(seedHistory);
  const [pins, setPins] = useState<string[]>(['SKL-0001', 'SKL-0003']);

  const log = useCallback((a: Asset, action: HistoryAction, reason?: string, changes: HistoryEntry['changes'] = []) => {
    setHistory(h => [{ id: uid('H'), familyId: a.familyId, assetId: a.id, action, changedBy: ACTOR, changedAt: new Date().toISOString(), reason, changes }, ...h]);
  }, []);

  const getAsset = useCallback((id: string) => assets.find(a => a.id === id), [assets]);
  const familyOf = useCallback((familyId: string) => assets.filter(a => a.familyId === familyId).sort((x, y) => y.createdAt.localeCompare(x.createdAt)), [assets]);

  const library = useMemo(() => {
    const byFamily = new Map<string, Asset[]>();
    assets.forEach(a => byFamily.set(a.familyId, [...(byFamily.get(a.familyId) || []), a]));
    const reps: (Asset & { pendingDraft?: Asset })[] = [];
    byFamily.forEach(group => {
      const live = group.find(g => g.status === 'PUBLISHED' && g.semanticVersion === [...group].filter(x => x.status === 'PUBLISHED').map(x => x.semanticVersion).sort((p, q) => q.localeCompare(p, undefined, { numeric: true }))[0]);
      const head = group.find(g => g.isFamilyHead);
      const rep = live ?? head ?? group[0];
      const pendingDraft = group.find(g => g !== rep && g.status === 'DRAFT');
      reps.push({ ...rep, pendingDraft });
    });
    return reps;
  }, [assets]);

  const patch = useCallback((id: string, p: Partial<Asset>) => setAssets(list => list.map(a => (a.id === id ? { ...a, ...p, updatedAt: new Date().toISOString() } : a))), []);

  const store: SkillsStore = {
    assets,
    reviews,
    history,
    pins,
    library,
    getAsset,
    familyOf,

    createAsset: async (draft, publish) => {
      await sleep(publish ? 900 : 500);
      const id = `${idPrefix[draft.type]}-${String(1000 + assets.length).slice(-4)}`;
      const now = new Date().toISOString();
      const asset: Asset = {
        familyId: id,
        isFamilyHead: true,
        releaseNotes: '',
        changeType: null,
        name: draft.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        shortDescription: '',
        description: '',
        category: '',
        subCategory: '',
        tags: [],
        semanticVersion: '1.0.0',
        accessibility: 'PRIVATE',
        marketplaceLive: false,
        owner: ACTOR,
        capabilityIds: [],
        stats: { views: 0, installs: 0, favorites: 0, rating: 0, reviewCount: 0 },
        ...draft,
        id,
        status: publish ? 'PUBLISHED' : 'DRAFT',
        createdAt: now,
        updatedAt: now,
      };
      setAssets(list => {
        let next = [asset, ...list];
        // folder → skills link-back, so the folder detail view shows what it contains
        if (asset.type === 'capability' && asset.linkedSkillIds?.length) {
          next = next.map(a => (asset.linkedSkillIds!.includes(a.id) ? { ...a, capabilityIds: [...new Set([...a.capabilityIds, id])] } : a));
        }
        return next;
      });
      log(asset, 'CREATED');
      if (publish) log(asset, 'PUBLISHED', 'Published at creation');
      return asset;
    },

    updateAsset: (id, p) => {
      const before = assets.find(a => a.id === id);
      if (!before) return;
      const changes = (Object.keys(p) as (keyof Asset)[])
        .filter(k => JSON.stringify(before[k]) !== JSON.stringify(p[k]) && typeof p[k] !== 'object')
        .map(k => ({ field: String(k), from: String(before[k] ?? ''), to: String(p[k] ?? '') }));
      patch(id, p);
      if (changes.length) log(before, 'UPDATED', undefined, changes);
    },

    deleteAsset: id => {
      setAssets(list => list.filter(a => a.id !== id).map(a => ({ ...a, capabilityIds: a.capabilityIds.filter(c => c !== id) })));
      setPins(p => p.filter(x => x !== id));
    },

    publish: async id => {
      const a = assets.find(x => x.id === id)!;
      await sleep(1100);
      const report = scanAsset(a);
      if (report.status === 'BLOCKED') return report;
      // previous live versions of the same family become "not live"
      setAssets(list => list.map(x => (x.familyId === a.familyId && x.id !== id && x.marketplaceLive ? { ...x, marketplaceLive: false } : x)));
      patch(id, { status: 'PUBLISHED', marketplaceLive: a.accessibility === 'PUBLIC' });
      log(a, 'PUBLISHED', undefined, [{ field: 'status', from: a.status, to: 'PUBLISHED' }]);
      return report;
    },

    deprecate: (id, reason, replacementId) => {
      const a = assets.find(x => x.id === id)!;
      patch(id, { status: 'DEPRECATED', deprecationReason: reason, replacementAssetId: replacementId });
      log(a, 'DEPRECATED', reason, [{ field: 'status', from: a.status, to: 'DEPRECATED' }]);
    },
    reactivate: id => {
      const a = assets.find(x => x.id === id)!;
      patch(id, { status: 'PUBLISHED', deprecationReason: undefined, replacementAssetId: undefined });
      log(a, 'UNDEPRECATED');
    },
    archive: (id, reason) => {
      const a = assets.find(x => x.id === id)!;
      patch(id, { status: 'ARCHIVED', archiveReason: reason, marketplaceLive: false });
      log(a, 'ARCHIVED', reason, [{ field: 'status', from: a.status, to: 'ARCHIVED' }]);
    },
    restore: id => {
      const a = assets.find(x => x.id === id)!;
      patch(id, { status: 'DRAFT', archiveReason: undefined });
      log(a, 'RESTORED');
    },

    createVersion: (id, change, notes) => {
      const src = assets.find(a => a.id === id)!;
      const family = assets.filter(a => a.familyId === src.familyId);
      const latest = family.map(f => f.semanticVersion).sort((p, q) => q.localeCompare(p, undefined, { numeric: true }))[0];
      const next = bump(latest, change);
      const copy: Asset = { ...src, id: `${src.id.split('-V')[0].replace(/-D\d*$/, '')}-V${Date.now().toString().slice(-4)}`, isFamilyHead: false, status: 'DRAFT', semanticVersion: next, changeType: change, releaseNotes: notes, marketplaceLive: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setAssets(list => [copy, ...list]);
      log(copy, 'VERSION_CREATED', notes, [{ field: 'semanticVersion', from: latest, to: next }]);
      return copy;
    },

    rollback: assetId => {
      const target = assets.find(a => a.id === assetId)!;
      setAssets(list => list.map(a => (a.familyId === target.familyId ? { ...a, marketplaceLive: a.id === assetId && target.accessibility === 'PUBLIC' } : a)));
      log(target, 'ROLLED_BACK', `Switched back to v${target.semanticVersion}`);
    },

    togglePin: id => setPins(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id])),

    addReview: r => setReviews(list => [{ ...r, id: uid('R'), createdAt: new Date().toISOString(), helpful: 0, verified: true }, ...list]),

    link: (capId, assetId) => patch(assetId, { capabilityIds: [...new Set([...(assets.find(a => a.id === assetId)?.capabilityIds || []), capId])] }),
    unlink: (capId, assetId) => patch(assetId, { capabilityIds: (assets.find(a => a.id === assetId)?.capabilityIds || []).filter(c => c !== capId) }),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

export const useSkills = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSkills must be used within SkillsProvider');
  return ctx;
};
