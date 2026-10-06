import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, Archive, ArchiveRestore, Calendar, Copy, Download, FileDown, GitBranch, Layers, Link2, Pencil, Pin, RotateCcw, Save, Send, ShieldAlert, ShieldCheck, Star, Trash2, User, X, Loader2 } from 'lucide-react';
import { Badge, Button, Callout, Card, ConfirmDialog, Crumbs, Dialog, EmptyBlock, Field, Input, SectionLabel, Select, Tabs, TagInput, Textarea, timeAgo, useToast, cx } from '../ui';
import { reportScores, scanAsset, useSkills } from './SkillsStore';
import { AccessBadge, AssetStatusBadge, TypeBadge, assetIcon } from './assetMeta';
import { Markdown } from '../ui/Markdown';
import { ValidationReportView } from './SkillCreatePage';
import { ASSET_TYPE_LABEL, Asset, ChangeType, HISTORY_LABEL, HistoryAction, MARKETPLACE_CATEGORIES, STATUS_LABEL, ValidationReport } from './types';

interface Props {
  assetId: string;
  onBack: () => void;
  onOpen: (id: string) => void;
}

type DetailTab = 'about' | 'document' | 'comments' | 'compliance' | 'versions' | 'history';

const actionStyle: Record<HistoryAction, string> = {
  CREATED: 'bg-blue-50 text-blue-700 border-blue-200',
  UPDATED: 'bg-slate-50 text-slate-600 border-slate-200',
  PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  VERSION_CREATED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  DEPRECATED: 'bg-amber-50 text-amber-700 border-amber-200',
  UNDEPRECATED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ARCHIVED: 'bg-rose-50 text-rose-700 border-rose-200',
  RESTORED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ROLLED_BACK: 'bg-amber-50 text-amber-700 border-amber-200',
};

const humanize = (f: string) => ({ promptTemplate: 'Instructions', accessibility: 'Who can see this', displayName: 'Name', shortDescription: 'Summary' } as Record<string, string>)[f] || f.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());

export const SkillDetailPage: React.FC<Props> = ({ assetId, onBack, onOpen }) => {
  const store = useSkills();
  const { assets, getAsset, familyOf, reviews, history, pins, library } = store;
  const { toast } = useToast();
  const asset = getAsset(assetId);

  const [tab, setTab] = useState<DetailTab>('about');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Asset | null>(null);

  const [versionOpen, setVersionOpen] = useState(false);
  const [change, setChange] = useState<ChangeType>('MINOR');
  const [notes, setNotes] = useState('');
  const [deprecateOpen, setDeprecateOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [replacement, setReplacement] = useState('');
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [blockedReport, setBlockedReport] = useState<ValidationReport | null>(null);
  const [complianceReport, setComplianceReport] = useState<ValidationReport | null>(null);
  const [scanning, setScanning] = useState(false);

  const [rating, setRating] = useState(5);
  const [revTitle, setRevTitle] = useState('Accurate and easy to adapt');
  const [revBody, setRevBody] = useState('Used it on three real documents this week. The output was well structured and needed only light edits. The open-questions section is especially useful in review meetings.');

  useEffect(() => {
    setEditing(false);
    setTab('about');
    setComplianceReport(null);
  }, [assetId]);

  const family = asset ? familyOf(asset.familyId) : [];
  const assetReviews = useMemo(() => reviews.filter(r => r.assetId === assetId || family.some(f => f.id === r.assetId)), [reviews, assetId, family]);
  const avg = assetReviews.length ? assetReviews.reduce((s, r) => s + r.rating, 0) / assetReviews.length : 0;
  const entries = useMemo(() => (asset ? history.filter(h => h.familyId === asset.familyId) : []), [history, asset]);

  if (!asset) {
    return (
      <div className="max-w-3xl mx-auto">
        <EmptyBlock icon={<AlertTriangle className="w-6 h-6" />} title="Item not found" message="It may have been deleted." action={<Button variant="primary" onClick={onBack}>Back to library</Button>} />
      </div>
    );
  }

  const a = editing && form ? form : asset;
  const set = (p: Partial<Asset>) => setForm(f => ({ ...(f || asset), ...p }));
  const isInstalled = asset.acquisitionType === 'INSTALL';
  const isOwner = !isInstalled;
  const isPinned = pins.includes(asset.id);
  const isLatestLive = library.find(l => l.familyId === asset.familyId)?.id === asset.id;
  const hasNewer = isOwner && asset.status === 'PUBLISHED' && family.some(f => f.id !== asset.id && f.semanticVersion.localeCompare(asset.semanticVersion, undefined, { numeric: true }) > 0);
  const hasContentTab = asset.type !== 'capability';
  const folders = assets.filter(x => x.type === 'capability');
  const linked = (ids?: string[]) => (ids || []).map(id => assets.find(x => x.id === id)).filter(Boolean) as Asset[];
  const folderSkills = asset.type === 'capability' ? assets.filter(x => x.isFamilyHead && x.capabilityIds.includes(asset.id)) : [];

  const startEdit = () => { setForm({ ...asset }); setEditing(true); };
  const saveEdit = () => {
    if (!form) return;
    const { id, ...patch } = form;
    store.updateAsset(asset.id, patch);
    setEditing(false);
    toast({ title: 'Changes saved' });
  };

  const doPublish = async () => {
    setPublishing(true);
    const report = await store.publish(asset.id);
    setPublishing(false);
    if (report.status === 'BLOCKED') {
      setBlockedReport(report);
      return;
    }
    setComplianceReport(report);
    toast({ title: 'Published', description: `v${asset.semanticVersion} is now live.` });
  };

  const runCompliance = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 1000));
    setComplianceReport(scanAsset(asset));
    setScanning(false);
  };

  const submitReview = () => {
    if (!rating) return toast({ title: 'Pick a rating first', tone: 'error' });
    store.addReview({ assetId: asset.id, author: 'You', rating, title: revTitle, review: revBody });
    setRating(5); setRevTitle('Accurate and easy to adapt'); setRevBody('Used it on three real documents this week. The output was well structured and needed only light edits.');
    toast({ title: 'Review posted', description: 'Thanks for the feedback.' });
  };

  const tabs = [
    { id: 'about' as const, label: 'About' },
    ...(hasContentTab ? [{ id: 'document' as const, label: asset.type === 'skill' ? 'Instructions' : 'Document' }] : []),
    { id: 'comments' as const, label: 'Reviews', count: assetReviews.length },
    ...(hasContentTab ? [{ id: 'compliance' as const, label: 'Compliance' }] : []),
    { id: 'versions' as const, label: 'Versions', count: family.length },
    ...(isOwner ? [{ id: 'history' as const, label: 'History' }] : []),
  ];

  const dist = [5, 4, 3, 2, 1].map(n => ({ n, c: assetReviews.filter(r => r.rating === n).length }));

  return (
    <div className="max-w-7xl mx-auto">
      <Crumbs items={[{ label: 'Skills Library', onClick: onBack }, { label: ASSET_TYPE_LABEL[asset.type] }, { label: asset.displayName }]} />

      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />} onClick={onBack} className="!px-2">Back to library</Button>
        <div className="flex flex-wrap items-center gap-2">
          {editing ? (
            <>
              <Button variant="primary" icon={<Save className="w-4 h-4" />} onClick={saveEdit}>Save changes</Button>
              <Button onClick={() => setEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              {isInstalled && <Button icon={<RotateCcw className="w-4 h-4" />} onClick={() => toast({ title: 'Already up to date', description: "This copy matches the publisher's current version." })}>Refresh from publisher</Button>}
              {isOwner && asset.status === 'DRAFT' && (
                <>
                  <Button icon={<Pencil className="w-4 h-4" />} onClick={startEdit}>Edit</Button>
                  {asset.type !== 'capability' && <Button variant="primary" loading={publishing} icon={<Send className="w-4 h-4" />} onClick={doPublish}>{publishing ? 'Scanning…' : 'Publish'}</Button>}
                </>
              )}
              {isOwner && asset.status === 'PUBLISHED' && (
                <>
                  <Button icon={<Pencil className="w-4 h-4" />} disabled title="Published versions can't be edited — create a new version to make changes.">Edit</Button>
                  <Button variant="primary" icon={<GitBranch className="w-4 h-4" />} onClick={() => { setNotes('Tightened the acceptance-criteria wording, added a multilingual input option and fixed the traceability table ordering.'); setChange('MINOR'); setVersionOpen(true); }}>New version</Button>
                  <Button icon={<AlertTriangle className="w-4 h-4" />} onClick={() => { setReason('A newer version with improved accuracy and currency handling is available; this one is kept only for existing users.'); setReplacement(''); setDeprecateOpen(true); }}>Mark outdated</Button>
                  <Button icon={<Archive className="w-4 h-4" />} onClick={() => { setReason('No longer used by any team. Archived for audit history; can be restored if needed.'); setArchiveOpen(true); }}>Archive</Button>
                </>
              )}
              {isOwner && asset.status === 'DEPRECATED' && (
                <>
                  <Button variant="primary" icon={<RotateCcw className="w-4 h-4" />} onClick={() => { store.reactivate(asset.id); toast({ title: 'Reactivated', description: 'This is Live again.' }); }}>Reactivate</Button>
                  <Button icon={<Archive className="w-4 h-4" />} onClick={() => { setReason('No longer used by any team. Archived for audit history; can be restored if needed.'); setArchiveOpen(true); }}>Archive</Button>
                </>
              )}
              {isOwner && asset.status === 'ARCHIVED' && <Button variant="primary" icon={<ArchiveRestore className="w-4 h-4" />} onClick={() => { store.restore(asset.id); toast({ title: 'Restored as draft' }); }}>Restore</Button>}
              {isOwner && asset.status !== 'PUBLISHED' && <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={() => setConfirmDelete(true)}>Delete</Button>}
            </>
          )}
        </div>
      </div>

      {editing && !isOwner && <div className="mb-4"><Callout tone="warning" title="Note">You do not own this skill. Saving creates a personal copy under your ownership.</Callout></div>}

      {/* Title block */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {assetIcon(asset.type)}
          {editing ? (
            <Input value={a.displayName} onChange={e => set({ displayName: e.target.value })} className="!text-xl !font-bold max-w-md" />
          ) : (
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
              {isPinned && <Star className="w-6 h-6 text-amber-500 fill-amber-500" />}
              {asset.displayName}
            </h1>
          )}
          <TypeBadge type={asset.type} />
          <AssetStatusBadge asset={asset} />
          <Badge mono>v{asset.semanticVersion}</Badge>
          <AccessBadge access={asset.accessibility} />
          {hasNewer && <Badge tone="blue">Newer version exists</Badge>}
          {asset.marketplaceLive && <Badge tone="green" dot>Live on marketplace</Badge>}
        </div>

        {asset.status === 'DEPRECATED' && (
          <Callout tone="warning" title="Outdated">
            Still works for people already using it, but not recommended for new work. {asset.deprecationReason}
            {asset.replacementAssetId && <> Consider <button onClick={() => onOpen(asset.replacementAssetId!)} className="underline font-bold">{asset.replacementAssetId}</button> instead.</>}
          </Callout>
        )}
        {asset.status === 'ARCHIVED' && <Callout tone="info" title="Archived">Removed from the marketplace and search, but nothing was deleted. {asset.archiveReason}</Callout>}
        {asset.acquisitionType === 'INSTALL' && <Callout tone="success" title="Installed asset"><span className="flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Linked to the original publisher. You will be notified about updates and can choose to adopt them.</span></Callout>}
        {asset.acquisitionType === 'CLONE' && <Callout tone="info" title="Cloned asset"><span className="flex items-center gap-2"><Copy className="w-3.5 h-3.5" /> This is a fully independent copy of its source.</span></Callout>}

        <div className="flex items-center gap-3 flex-wrap text-[13.5px] text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[11.5px] font-bold">{asset.owner.charAt(0)}</span>
            by <strong className="text-[#0F172A]">{asset.owner}</strong>
          </span>
          <button onClick={() => setTab('comments')} className="flex items-center gap-1.5 px-2 py-0.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50">
            <Star className={cx('w-3.5 h-3.5', avg > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-300')} />
            {assetReviews.length ? `${avg.toFixed(1)} (${assetReviews.length} rating${assetReviews.length === 1 ? '' : 's'})` : 'Not rated yet'}
          </button>
          <button onClick={() => toast({ title: 'Link copied', description: `${location.origin}/skills/${asset.id}` })} className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50" title="Copy link"><Link2 className="w-3.5 h-3.5" /></button>
          <button onClick={() => toast({ title: 'Export started', description: `${asset.name}.zip downloaded` })} className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50" title="Export as ZIP"><FileDown className="w-3.5 h-3.5" /></button>
          <button onClick={() => { store.togglePin(asset.id); toast({ title: isPinned ? 'Unpinned' : 'Pinned' }); }} className={cx('flex items-center gap-1.5 px-3 py-1 border rounded-lg font-semibold', isPinned ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white border-slate-200 hover:bg-slate-50')}>
            <Pin className="w-3.5 h-3.5" /> {isPinned ? 'Pinned' : 'Pin'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 items-center">
          {asset.category && <Badge tone="indigo">{asset.category}</Badge>}
          {editing ? <div className="w-72"><TagInput tags={a.tags} onChange={tags => set({ tags })} placeholder="New tag…" /></div> : asset.tags.map(t => <Badge key={t} mono>#{t}</Badge>)}
        </div>

        {editing ? (
          <Field label="Short description"><Textarea rows={2} value={a.shortDescription} onChange={e => set({ shortDescription: e.target.value })} /></Field>
        ) : (
          <p className="text-[15px] text-[#475569] max-w-3xl leading-relaxed">{asset.shortDescription || 'No short description provided.'}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5 min-w-0">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />

          {tab === 'about' && (
            <div className="space-y-5 animate-fade-in">
              <Card className="space-y-4">
                <SectionLabel>Description</SectionLabel>
                {editing ? <Textarea rows={5} value={a.description} onChange={e => set({ description: e.target.value })} /> : <p className="text-[14.5px] text-[#334155] leading-relaxed whitespace-pre-wrap">{asset.description || 'No description provided.'}</p>}
                {asset.type === 'skill' && (
                  <div className="flex flex-wrap gap-6 pt-2 border-t border-slate-100">
                    <div><p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">Skill type</p><p className="text-[14.5px] font-semibold mt-0.5">{asset.skillType}</p></div>
                    <div><p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">Dept. scope</p><p className="text-[14.5px] font-semibold mt-0.5">{asset.department || 'Not specified'}</p></div>
                  </div>
                )}
              </Card>

              {asset.type === 'skill' && (
                <Card>
                  <SectionLabel>Few-shot examples</SectionLabel>
                  {(asset.examples || []).length === 0 ? <p className="text-[13.5px] text-slate-400 italic">No examples yet.</p> : (
                    <div className="space-y-3">
                      {asset.examples!.map((ex, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                          <p className="px-4 py-2 bg-slate-50 text-[13.5px] font-bold text-[#0F172A] border-b border-slate-200">{ex.title}</p>
                          <div className="p-4 grid md:grid-cols-2 gap-4 text-[13.5px]">
                            <div><p className="text-[12.5px] font-bold text-slate-400 uppercase mb-1">Input</p><pre className="font-mono text-[14.5px] leading-relaxed bg-slate-50 rounded-lg p-3.5 whitespace-pre-wrap">{ex.input}</pre></div>
                            <div><p className="text-[12.5px] font-bold text-slate-400 uppercase mb-1">Output</p><pre className="font-mono text-[14.5px] leading-relaxed bg-slate-50 rounded-lg p-3.5 whitespace-pre-wrap">{ex.output}</pre></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              )}

              {asset.type === 'capability' && (
                <Card>
                  <SectionLabel>Items in this folder ({folderSkills.length})</SectionLabel>
                  {folderSkills.length === 0 ? <p className="text-[13.5px] text-slate-400 italic">Nothing linked yet — use "Link Existing" in the explorer.</p> : (
                    <div className="divide-y divide-slate-100">
                      {folderSkills.map(s => (
                        <button key={s.id} onClick={() => onOpen(s.id)} className="w-full flex items-center justify-between gap-3 py-2.5 text-left hover:bg-slate-50 -mx-2 px-2 rounded-lg">
                          <span className="flex items-center gap-2.5 min-w-0">{assetIcon(s.type, 'sm')}<span className="text-[14.5px] font-semibold truncate">{s.displayName}</span></span>
                          <AssetStatusBadge asset={s} />
                        </button>
                      ))}
                    </div>
                  )}
                </Card>
              )}

              {asset.type === 'skill' && (
                <Card>
                  <SectionLabel icon={<ShieldCheck className="w-3.5 h-3.5" />}>Usage</SectionLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[['Views', asset.stats.views], ['Installs', asset.stats.installs], ['Favorites', asset.stats.favorites], ['Rating', avg ? avg.toFixed(1) : '—']].map(([k, v]) => (
                      <div key={k as string}><p className="text-xl font-bold text-[#0F172A]">{typeof v === 'number' ? v.toLocaleString() : v}</p><p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">{k}</p></div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {tab === 'document' && hasContentTab && (
            <Card className="space-y-4 animate-fade-in">
              <SectionLabel>{asset.type === 'skill' ? 'Prompt template' : asset.type === 'policy' ? 'Enforcement guardrails' : asset.type === 'instruction' ? 'Directive content' : 'Markdown knowledge content'}</SectionLabel>
              {asset.type === 'policy' && (
                <div className="flex items-center gap-3 text-[13.5px]">
                  <Badge tone="orange">{a.subType}</Badge>
                  {editing ? (
                    <Select value={a.enforcementMode} onChange={e => set({ enforcementMode: e.target.value as any })} className="!w-52 !py-1.5 !text-[13.5px]">
                      <option value="OPTIONAL">Optional (Advisory)</option><option value="RECOMMENDED">Recommended</option><option value="MANDATORY">Mandatory</option>
                    </Select>
                  ) : <Badge tone={asset.enforcementMode === 'MANDATORY' ? 'red' : 'amber'}>{asset.enforcementMode}</Badge>}
                </div>
              )}
              {editing ? (
                <Textarea rows={14} className="font-mono !text-[13.5px]" value={(asset.type === 'skill' ? a.promptTemplate : a.content) || ''} onChange={e => set(asset.type === 'skill' ? { promptTemplate: e.target.value } : { content: e.target.value })} />
              ) : (
                asset.type === 'skill'
                  ? <pre className="font-mono text-[15px] bg-slate-50 border border-slate-200 rounded-xl p-6 whitespace-pre-wrap leading-[1.85] max-h-[780px] overflow-auto">{asset.promptTemplate || 'Empty.'}</pre>
                  : <div className="bg-white border border-slate-200 rounded-xl p-8 max-h-[780px] overflow-auto"><Markdown source={asset.content || 'Empty.'} /></div>
              )}
            </Card>
          )}

          {tab === 'comments' && (
            <div className="space-y-5 animate-fade-in">
              <Card className="grid md:grid-cols-[180px_1fr] gap-6 items-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#0F172A]">{avg ? avg.toFixed(1) : '—'}</p>
                  <div className="flex justify-center gap-0.5 my-1">{[1, 2, 3, 4, 5].map(n => <Star key={n} className={cx('w-4 h-4', n <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-slate-300')} />)}</div>
                  <p className="text-[13.5px] text-slate-400">{assetReviews.length} review{assetReviews.length === 1 ? '' : 's'}</p>
                </div>
                <div className="space-y-1.5">
                  {dist.map(d => (
                    <div key={d.n} className="flex items-center gap-2 text-[13.5px] text-slate-500">
                      <span className="w-3">{d.n}</span><Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-400 rounded-full" style={{ width: `${assetReviews.length ? (d.c / assetReviews.length) * 100 : 0}%` }} /></div>
                      <span className="w-5 text-right">{d.c}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="space-y-3">
                <SectionLabel>Write a review</SectionLabel>
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => setRating(n)}><Star className={cx('w-6 h-6 transition', n <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 hover:text-amber-300')} /></button>)}</div>
                <Input placeholder="Review title (optional)" value={revTitle} onChange={e => setRevTitle(e.target.value)} />
                <Textarea rows={3} placeholder="Your comment…" value={revBody} onChange={e => setRevBody(e.target.value)} />
                <Button variant="primary" onClick={submitReview}>Post review</Button>
              </Card>

              {assetReviews.length === 0 ? <EmptyBlock icon={<Star className="w-6 h-6" />} title="No reviews yet" message="Be the first to share how this worked for you." /> : (
                <div className="space-y-3">
                  {assetReviews.map(r => (
                    <Card key={r.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-blue-50 text-[#2563EB] text-[13.5px] font-bold flex items-center justify-center">{r.author.charAt(0)}</span><span className="text-[14.5px] font-bold">{r.author}</span>{r.verified && <Badge tone="green">Verified</Badge>}</div>
                        <span className="text-[12.5px] text-slate-400">{timeAgo(r.createdAt)}</span>
                      </div>
                      <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(n => <Star key={n} className={cx('w-3.5 h-3.5', n <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300')} />)}</div>
                      {r.title && <p className="text-[14.5px] font-semibold">{r.title}</p>}
                      <p className="text-[13.5px] text-slate-500 leading-relaxed">{r.review}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'compliance' && (
            <div className="space-y-5 animate-fade-in">
              <Card className="space-y-4">
                <SectionLabel icon={<ShieldAlert className="w-3.5 h-3.5" />} right={<Button size="sm" variant="dark" loading={scanning} onClick={runCompliance}>{complianceReport ? 'Re-run scan' : 'Run scan'}</Button>}>Marketplace readiness audit</SectionLabel>
                {!complianceReport ? (
                  <p className="text-[13.5px] text-slate-500 leading-relaxed">Run the compliance pipeline to see quality and security scores before publishing or listing this on the marketplace.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[['Readiness', complianceReport.readinessScore], ['Quality', reportScores(complianceReport).quality], ['Security', reportScores(complianceReport).security]].map(([k, v]) => (
                        <div key={k as string} className="border border-slate-200 rounded-xl py-4">
                          <p className={cx('text-3xl font-bold', (v as number) >= 90 ? 'text-emerald-600' : (v as number) >= 80 ? 'text-amber-600' : 'text-rose-600')}>{v}</p>
                          <p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">{k}</p>
                        </div>
                      ))}
                    </div>
                    <ValidationReportView report={complianceReport} />
                  </>
                )}
              </Card>
            </div>
          )}

          {tab === 'versions' && (
            <Card padded={false} className="overflow-hidden animate-fade-in">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-left text-[12.5px] font-bold uppercase tracking-wider text-[#64748B]">
                    <th className="px-4 py-3">Version</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th><th className="px-4 py-3">What changed</th>{isOwner && <th className="px-4 py-3 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {family.filter(v => isOwner || v.status === 'PUBLISHED').map(v => {
                    const live = v.marketplaceLive;
                    const canRollback = v.status === 'PUBLISHED' && !live && v.accessibility === 'PUBLIC';
                    return (
                      <tr key={v.id} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-3 font-mono font-bold">
                          {v.id === asset.id ? `v${v.semanticVersion}` : <button onClick={() => onOpen(v.id)} className="underline decoration-dotted hover:text-[#2563EB]">v{v.semanticVersion}</button>}
                          {v.isFamilyHead && <span className="ml-2 text-[10.5px] font-bold uppercase text-slate-400">Main</span>}
                        </td>
                        <td className="px-4 py-3">{live ? <Badge tone="green">Live</Badge> : v.status === 'PUBLISHED' ? <Badge>Not live</Badge> : <Badge tone="amber">{STATUS_LABEL[v.status]}</Badge>}</td>
                        <td className="px-4 py-3 text-slate-500">{new Date(v.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{v.releaseNotes || '—'}</td>
                        {isOwner && (
                          <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                            {canRollback && <Button size="xs" icon={<RotateCcw className="w-3 h-3" />} onClick={() => { store.rollback(v.id); toast({ title: `v${v.semanticVersion} is live again` }); }}>Use this version</Button>}
                            {!v.isFamilyHead && v.status === 'DRAFT' && <Button size="xs" variant="danger" icon={<Trash2 className="w-3 h-3" />} onClick={() => { store.deleteAsset(v.id); toast({ title: 'Draft deleted' }); }}>Delete draft</Button>}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          )}

          {tab === 'history' && (
            <Card padded={false} className="overflow-hidden animate-fade-in">
              {entries.length === 0 ? <div className="text-center py-16 text-[13.5px] text-slate-400">No history recorded yet.</div> : (
                <div className="divide-y divide-slate-100">
                  {entries.map(e => (
                    <div key={e.id} className="px-4 py-4 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={cx('text-[12.5px] font-bold px-2 py-0.5 rounded-full border', actionStyle[e.action])}>{HISTORY_LABEL[e.action]}</span>
                          <span className="text-[13.5px] font-semibold text-slate-700">{e.changedBy}</span>
                          <span className="font-mono text-[11.5px] text-slate-400">{e.assetId}{e.assetId === asset.id ? ' (this version)' : ''}</span>
                        </div>
                        <span className="text-[12.5px] text-slate-400">{new Date(e.changedAt).toLocaleString()}</span>
                      </div>
                      {e.reason && <p className="text-[13.5px] text-slate-500 italic">“{e.reason}”</p>}
                      {e.changes.length > 0 && (
                        <ul className="text-[12.5px] text-slate-500 space-y-1">
                          {e.changes.map((c, i) => (
                            <li key={i} className="flex flex-wrap items-baseline gap-1"><span className="font-semibold text-slate-600">{humanize(c.field)}:</span><span className="line-through decoration-rose-400/60 text-slate-400">{c.from || '—'}</span><span>→</span><span className="text-slate-700">{c.to || '—'}</span></li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5 lg:pt-[3.25rem]">
          <Card className="space-y-4">
            <SectionLabel>Details</SectionLabel>
            <div className="space-y-3 text-[13.5px]">
              {[
                [<User key="u" className="w-3.5 h-3.5" />, 'Owner', asset.owner],
                [<Calendar key="c" className="w-3.5 h-3.5" />, 'Created', new Date(asset.createdAt).toLocaleDateString()],
                [<Layers key="l" className="w-3.5 h-3.5" />, 'Category', editing ? null : asset.category || 'Unassigned'],
              ].map(([icon, k, v]) => (
                <div key={k as string} className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <span className="uppercase font-bold text-slate-400 flex items-center gap-1.5">{icon}{k}</span>
                  {v === null ? (
                    <Select value={a.category} onChange={e => set({ category: e.target.value })} className="!w-40 !py-1 !text-[13.5px]"><option value="">Unassigned</option>{MARKETPLACE_CATEGORIES.map(c => <option key={c}>{c}</option>)}</Select>
                  ) : <span className="text-slate-700 font-medium">{v}</span>}
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span className="uppercase font-bold text-slate-400 pl-5">Subcategory</span>
                {editing ? <Input value={a.subCategory} onChange={e => set({ subCategory: e.target.value })} className="!w-40 !py-1 !text-[13.5px] text-right" /> : <span className="text-slate-700">{asset.subCategory || <em className="text-slate-400">Unassigned</em>}</span>}
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="uppercase font-bold text-slate-400 pl-5">Scope</span>
                {editing ? (
                  <Select value={a.accessibility} onChange={e => set({ accessibility: e.target.value as any })} className="!w-40 !py-1 !text-[13.5px]"><option value="PRIVATE">Only Me</option><option value="TEAM">My Team</option><option value="PUBLIC">Marketplace</option></Select>
                ) : <AccessBadge access={asset.accessibility} />}
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <SectionLabel>Relations</SectionLabel>
            {asset.type === 'capability' ? (
              <p className="text-[13.5px] text-slate-500">{folderSkills.length} item{folderSkills.length === 1 ? '' : 's'} linked to this folder.</p>
            ) : (
              <div className="space-y-4">
                {([['Folders', linked(asset.capabilityIds)], ...(asset.type === 'skill' ? [['Knowledge', linked(asset.knowledgeIds)], ['Instructions', linked(asset.instructionIds)], ['Policies', linked(asset.policyIds)]] : [])] as [string, Asset[]][]).map(([label, list]) => (
                  <div key={label} className="space-y-1.5">
                    <p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">Linked {label}</p>
                    {label === 'Folders' && editing ? (
                      <div className="border border-slate-100 rounded-lg p-2 space-y-1.5 max-h-28 overflow-y-auto">
                        {folders.map(f => (
                          <label key={f.id} className="flex items-center gap-2 text-[13.5px] cursor-pointer">
                            <input type="checkbox" checked={a.capabilityIds.includes(f.id)} onChange={e => set({ capabilityIds: e.target.checked ? [...a.capabilityIds, f.id] : a.capabilityIds.filter(x => x !== f.id) })} />
                            {f.displayName}
                          </label>
                        ))}
                      </div>
                    ) : list.length === 0 ? (
                      <p className="text-[13.5px] text-slate-400 italic">None</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {list.map(l => <button key={l.id} onClick={() => onOpen(l.id)} className="text-[12.5px] font-medium px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:border-[#2563EB]/40 hover:text-[#2563EB]">{l.displayName}</button>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* New version */}
      <Dialog open={versionOpen} onClose={() => setVersionOpen(false)} title="Create new version" subtitle={`Based on v${asset.semanticVersion}`} width="max-w-lg"
        footer={<><Button onClick={() => setVersionOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => { const v = store.createVersion(asset.id, change, notes); setVersionOpen(false); toast({ title: `Draft v${v.semanticVersion} created` }); onOpen(v.id); }}>Create draft</Button></>}>
        <div className="space-y-4">
          <Field label="Change type" hint="Major = breaking, Minor = new capability, Patch = fix.">
            <Select value={change} onChange={e => setChange(e.target.value as ChangeType)}><option value="MAJOR">Major</option><option value="MINOR">Minor</option><option value="PATCH">Patch</option></Select>
          </Field>
          <Field label="Release notes"><Textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="What changed and why?" /></Field>
        </div>
      </Dialog>

      {/* Deprecate */}
      <Dialog open={deprecateOpen} onClose={() => setDeprecateOpen(false)} title="Mark as outdated" subtitle="Still works for existing users, but discouraged for new work." width="max-w-lg"
        footer={<><Button onClick={() => setDeprecateOpen(false)}>Cancel</Button><Button variant="primary" disabled={!reason.trim()} onClick={() => { store.deprecate(asset.id, reason, replacement || undefined); setDeprecateOpen(false); toast({ title: 'Marked as outdated' }); }}>Confirm</Button></>}>
        <div className="space-y-4">
          <Field label="Reason" required><Textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} /></Field>
          <Field label="Replacement (optional)">
            <Select value={replacement} onChange={e => setReplacement(e.target.value)}><option value="">None</option>{library.filter(l => l.type === asset.type && l.id !== asset.id).map(l => <option key={l.id} value={l.id}>{l.displayName}</option>)}</Select>
          </Field>
        </div>
      </Dialog>

      {/* Archive */}
      <Dialog open={archiveOpen} onClose={() => setArchiveOpen(false)} title="Archive" subtitle="Removes it from the marketplace, search and recommendations. Can be restored." width="max-w-lg"
        footer={<><Button onClick={() => setArchiveOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => { store.archive(asset.id, reason); setArchiveOpen(false); toast({ title: 'Archived' }); }}>Archive</Button></>}>
        <Field label="Reason (optional)"><Textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} /></Field>
      </Dialog>

      {/* Publishing blocked */}
      <Dialog open={!!blockedReport} onClose={() => setBlockedReport(null)} title="Publishing blocked" subtitle="Security & compliance scan" width="max-w-xl" footer={<><Button onClick={() => setBlockedReport(null)}>Close</Button><Button variant="primary" onClick={() => { setBlockedReport(null); startEdit(); }}>Fix in editor</Button></>}>
        {blockedReport && <ValidationReportView report={blockedReport} />}
      </Dialog>

      <ConfirmDialog open={confirmDelete} danger title="Delete permanently?" description={`“${asset.displayName}” will be removed from the library. This can't be undone.`} confirmText="Delete" onClose={() => setConfirmDelete(false)} onConfirm={() => { store.deleteAsset(asset.id); toast({ title: 'Deleted' }); onBack(); }} />

      {publishing && <div className="fixed inset-0 z-40 pointer-events-none flex items-end justify-center pb-10"><span className="bg-[#0F172A] text-white text-[13.5px] px-4 py-2 rounded-full flex items-center gap-2 shadow-modal"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running safety scan…</span></div>}
    </div>
  );
};
