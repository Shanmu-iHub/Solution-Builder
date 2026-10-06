import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Loader2, Play, RefreshCw, Search } from 'lucide-react';
import { Badge, Button, Callout, Card, Input, ProgressBar, SectionLabel, cx } from '../ui';
import { useKnowledge } from './KnowledgeStore';
import { GraphCanvas, colorForType, HIGHLIGHT } from './GraphCanvas';
import { BuildPhase, CollectionPreview, ProjectGraphStatus, ProjectView, SearchMode, SearchResult } from './types';

export const StatusPill: React.FC<{ status: ProjectGraphStatus }> = ({ status }) => {
  const map = { registered: ['Not built', 'slate'], building: ['Building', 'blue'], ready: ['Ready', 'green'], failed: ['Failed', 'red'] } as const;
  const [label, tone] = map[status];
  return <Badge tone={tone} dot>{label}</Badge>;
};

const PHASE_LABELS: Record<BuildPhase, string> = {
  queued: 'Waiting to start',
  reading: 'Reading the project data',
  extracting: 'Finding entities and relationships',
  embedding: 'Preparing search by meaning',
  writing: 'Saving the map',
  done: 'Finished',
};

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString() : '—');

/* ── Overview / build ──────────────────────────────────────────────────── */

export const BuildPanel: React.FC<{ project: ProjectView }> = ({ project }) => {
  const { startBuild } = useKnowledge();
  const { build } = project;
  const building = project.status === 'building';
  const progress = build.progress && build.progress.total > 0 ? Math.round((build.progress.done / build.progress.total) * 100) : null;
  const rels = build.report ? Object.entries(build.report.perRelationship) : [];
  const unresolved = rels.reduce((s, [, r]) => s + r.unresolved, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[19px] font-bold text-[#0F172A] truncate">{project.name}</h2>
            <StatusPill status={project.status} />
          </div>
          {project.description && <p className="text-[15px] text-[#64748B] mt-1">{project.description}</p>}
          <p className="text-[13.5px] text-slate-400 mt-1">{project.phase ?? 'No phase'}{project.stage ? ` · ${project.stage}` : ''} · Registered {fmt(project.registeredAt)}</p>
        </div>
        <Button variant="primary" loading={building} icon={<Play className="w-4 h-4" />} onClick={() => startBuild(project.projectId)} disabled={building}>
          {project.status === 'registered' ? 'Build map' : 'Rebuild map'}
        </Button>
      </div>

      {building && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3" role="status">
          <div className="flex items-center justify-between text-[15px] text-blue-900">
            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {build.phase ? PHASE_LABELS[build.phase] : 'Working'}</span>
            {progress !== null && <span className="font-semibold">{progress}%</span>}
          </div>
          {progress !== null && <ProgressBar value={progress} className="mt-2 !bg-blue-100" />}
          <p className="text-[13.5px] text-blue-700 mt-2">This runs in the background. You can leave this page; the map will be ready when it finishes.</p>
        </div>
      )}

      {project.status === 'failed' && build.error && <Callout tone="error" title="The last build failed">{build.error}</Callout>}

      {project.status === 'registered' && (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-[15px] text-slate-600">
          <p className="font-semibold text-[#0F172A] mb-1">Ready to build</p>
          <p>Check the project’s data in the <strong>Data</strong> tab and the relationships in the <strong>Definitions</strong> tab ({project.isDefaultDefinition ? 'the defaults are in use' : 'your definitions are saved'}), then build the map.</p>
        </div>
      )}

      {build.stats && build.completedAt && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-[15px] text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Last built {fmt(build.completedAt)}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {([['Entities', build.stats.entities], ['Relationships', build.stats.relationships], ['Searchable by meaning', build.stats.embedded], ['Unresolved references', unresolved]] as [string, number][]).map(([k, v]) => (
              <Card key={k} className="!p-4">
                <p className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">{k}</p>
                <p className="text-2xl font-bold text-[#0F172A] mt-1">{v}</p>
              </Card>
            ))}
          </div>

          {build.stats.embedded > 0 && build.stats.embedded < build.stats.entities && (
            <Callout tone="warning">Search by meaning covers {build.stats.embedded} of {build.stats.entities} entities. The rest are still found by keywords. Rebuild to retry the missing ones.</Callout>
          )}
          {build.report && build.report.missingCollections.length > 0 && <Callout tone="info">Not found in the data source, so skipped: {build.report.missingCollections.join(', ')}.</Callout>}

          <div>
            <SectionLabel>Entities by type</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {Object.entries(build.stats.byType).sort((a, b) => b[1] - a[1]).map(([t, c]) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[13.5px] rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
                  <span className="w-2 h-2 rounded-full" style={{ background: colorForType(t) }} />{t} <strong>{c}</strong>
                </span>
              ))}
            </div>
          </div>

          {rels.length > 0 && (
            <div>
              <SectionLabel>Relationships</SectionLabel>
              <p className="text-[13.5px] text-slate-500 mb-2">“Unresolved” means a reference pointed at something that was not found. A few are normal; many suggest the definition needs a change.</p>
              <Card padded={false} className="overflow-hidden">
                <table className="w-full text-[15px]">
                  <thead className="bg-slate-50 text-left text-[12.5px] text-slate-500 uppercase tracking-wider"><tr><th className="px-4 py-2.5 font-bold">Relationship</th><th className="px-4 py-2.5 font-bold text-right">Created</th><th className="px-4 py-2.5 font-bold text-right">Unresolved</th></tr></thead>
                  <tbody>
                    {rels.map(([k, r]) => (
                      <tr key={k} className="border-t border-slate-100">
                        <td className="px-4 py-2.5 font-mono text-[13.5px] text-slate-700">{k}</td>
                        <td className="px-4 py-2.5 text-right">{r.created}</td>
                        <td className={cx('px-4 py-2.5 text-right', r.unresolved > 0 ? 'text-amber-600 font-semibold' : 'text-slate-400')}>{r.unresolved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Data preview ──────────────────────────────────────────────────────── */

const CollectionCard: React.FC<{ c: CollectionPreview }> = ({ c }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const hasData = c.exists && c.documentCount > 0;
  const fields = useMemo(() => (filter.trim() ? c.fields.filter(f => f.path.toLowerCase().includes(filter.trim().toLowerCase())) : c.fields), [c.fields, filter]);
  return (
    <Card padded={false}>
      <button onClick={() => hasData && setOpen(o => !o)} disabled={!hasData} aria-expanded={open} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left disabled:cursor-default cursor-pointer">
        <span className="flex items-center gap-2 min-w-0">
          {hasData ? open ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" /> : <span className="w-4" />}
          <span className="font-mono text-[15px] text-[#0F172A] truncate">{c.collection}</span>
        </span>
        <span className="text-[13.5px] text-slate-500 shrink-0">{!c.exists ? 'Not in the data source' : c.documentCount === 0 ? 'No data for this project' : `${c.documentCount} document${c.documentCount === 1 ? '' : 's'} · ${c.fields.length}${c.fieldsTruncated ? '+' : ''} fields`}</span>
      </button>
      {open && hasData && (
        <div className="border-t border-slate-200 px-4 py-4 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="text-[15px] font-bold text-[#0F172A]">Fields</h4>
              <Input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter fields" className="!py-1.5 !text-[13.5px] max-w-56" />
            </div>
            <div className="max-h-72 overflow-auto rounded-xl border border-slate-200">
              <table className="w-full text-[13.5px]">
                <thead className="bg-slate-50 text-left text-slate-500 sticky top-0"><tr><th className="px-3 py-2 font-bold">Path</th><th className="px-3 py-2 font-bold">Type</th><th className="px-3 py-2 font-bold text-right">In docs</th></tr></thead>
                <tbody>
                  {fields.map(f => <tr key={f.path} className="border-t border-slate-100"><td className="px-3 py-1.5 font-mono text-slate-800 break-all">{f.path}</td><td className="px-3 py-1.5 text-slate-600">{f.types.join(' | ')}</td><td className="px-3 py-1.5 text-right text-slate-500">{f.seenIn}</td></tr>)}
                  {fields.length === 0 && <tr><td colSpan={3} className="px-3 py-4 text-center text-slate-500">No fields match.</td></tr>}
                </tbody>
              </table>
            </div>
            {c.fieldsTruncated && <p className="text-[13.5px] text-slate-400 mt-1">The field list itself was cut at a size limit.</p>}
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#0F172A] mb-2">Sample records <span className="font-normal text-slate-400">(long text and lists are shortened)</span></h4>
            <div className="space-y-2">{c.samples.map((s, i) => <pre key={i} className="text-[13.5px] bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-64 overflow-auto whitespace-pre-wrap break-words">{JSON.stringify(s, null, 2)}</pre>)}</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export const SchemaPanel: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { getSchema } = useKnowledge();
  const [preview, setPreview] = useState<CollectionPreview[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => setPreview(null), [projectId]);
  const load = async () => {
    setLoading(true);
    setPreview(await getSchema(projectId));
    setLoading(false);
  };
  const withData = preview?.filter(c => c.exists && c.documentCount > 0) ?? [];
  const rest = preview?.filter(c => !(c.exists && c.documentCount > 0)) ?? [];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-slate-600 max-w-2xl">See what this project’s data looks like before you define relationships: the collections it appears in, their fields and types, and a few sample records. Nothing is changed.</p>
        <Button loading={loading} icon={<RefreshCw className="w-4 h-4" />} onClick={load}>{preview ? 'Refresh' : 'Load data preview'}</Button>
      </div>
      {loading && !preview && <p className="text-[15px] text-slate-500">Reading the project’s data. This can take a few seconds…</p>}
      {preview && (
        <div className="space-y-2">
          {withData.map(c => <CollectionCard key={c.collection} c={c} />)}
          {rest.length > 0 && <h3 className="pt-3 text-[12.5px] font-bold uppercase tracking-wider text-slate-400">No data for this project</h3>}
          {rest.map(c => <CollectionCard key={c.collection} c={c} />)}
        </div>
      )}
    </div>
  );
};

/* ── Map ───────────────────────────────────────────────────────────────── */

const DEFAULT_QUERY = 'user login requirements';
const SUGGESTIONS = ['user login requirements', 'points expiry alerts', 'audit trail', 'fraud on redemptions', 'consent and privacy', 'BR-001', 'monthly reporting'];

const MODES: { value: SearchMode; label: string }[] = [
  { value: 'hybrid', label: 'Everything' },
  { value: 'keyword', label: 'Keywords' },
  { value: 'semantic', label: 'Meaning' },
  { value: 'exact', label: 'Exact id' },
];

const Chips: React.FC<{ title: string; counts: Record<string, number>; selected: string[]; onToggle: (t: string) => void; colored?: boolean }> = ({ title, counts, selected, onToggle, colored }) => {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mr-1">{title}</span>
      {entries.map(([t, c]) => {
        const on = selected.includes(t);
        return (
          <button key={t} onClick={() => onToggle(t)} aria-pressed={on} className={cx('inline-flex items-center gap-1.5 text-[13.5px] rounded-full border px-2.5 py-0.5 transition cursor-pointer', on ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold' : 'border-slate-200 text-slate-600 hover:border-slate-400 bg-white')}>
            {colored && <span className="w-2 h-2 rounded-full" style={{ background: colorForType(t) }} />}{t} <span className="opacity-60">{c}</span>
          </button>
        );
      })}
      {selected.length > 0 && <button onClick={() => selected.forEach(onToggle)} className="text-[13.5px] text-slate-500 underline ml-1 cursor-pointer">Clear</button>}
    </div>
  );
};

export const MapPanel: React.FC<{ project: ProjectView }> = ({ project }) => {
  const { getMap, search } = useKnowledge();
  const [entityTypes, setEntityTypes] = useState<string[]>([]);
  const [relTypes, setRelTypes] = useState<string[]>([]);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [mode, setMode] = useState<SearchMode>('hybrid');
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState<SearchResult | null>(null);

  useEffect(() => { setEntityTypes([]); setRelTypes([]); setFound(null); setQuery(DEFAULT_QUERY); }, [project.projectId]);

  const full = getMap(project.projectId, [], []);
  const map = getMap(project.projectId, entityTypes, relTypes);
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (t: string) => set(c => (c.includes(t) ? c.filter(x => x !== t) : [...c, t]));
  const highlight = useMemo(() => new Set(found?.records.map(r => r.id) ?? []), [found]);

  const run = async (q = query, m = mode) => {
    if (!q.trim() || searching) return;
    setSearching(true);
    setFound(await search(project.projectId, q, m));
    setSearching(false);
  };

  if (!project.build.completedAt || !full || !map) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
        <p className="font-bold text-[#0F172A]">The map has not been built yet</p>
        <p className="text-[15px] text-slate-500 mt-1">{project.status === 'building' ? 'The first build is running. The map will appear here when it finishes.' : 'Go to Overview and build the map to see it here.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Chips title="Entities" counts={full.entityTypeCounts} selected={entityTypes} onToggle={toggle(setEntityTypes)} colored />
        <Chips title="Relationships" counts={full.relationshipTypeCounts} selected={relTypes} onToggle={toggle(setRelTypes)} />
      </div>

      <div className="relative h-[560px] rounded-2xl border border-slate-200 overflow-hidden bg-white">
        <GraphCanvas nodes={map.nodes} edges={map.edges} highlightIds={highlight} />
      </div>

      <Card className="space-y-3">
        <div>
          <h3 className="text-[15px] font-bold text-[#0F172A]">Find records</h3>
          <p className="text-[13.5px] text-slate-500">Try the search the planning agents use: it finds the records a question is about. Matches light up on the map above.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && run()} placeholder={mode === 'exact' ? 'An id, e.g. BR_1' : 'e.g. user login requirements'} className="flex-1 min-w-56" />
          <div className="flex rounded-xl border border-slate-200 overflow-hidden" role="radiogroup">
            {MODES.map(m => <button key={m.value} role="radio" aria-checked={mode === m.value} onClick={() => setMode(m.value)} className={cx('px-3 py-2 text-[13.5px] font-semibold cursor-pointer', mode === m.value ? 'bg-[#0F172A] text-white' : 'bg-white text-slate-600 hover:bg-slate-50')}>{m.label}</button>)}
          </div>
          <Button variant="primary" loading={searching} icon={<Search className="w-4 h-4" />} onClick={() => run()} disabled={!query.trim()}>Search</Button>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mr-1">Try</span>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => { const m: SearchMode = /^[A-Za-z]{2,4}-\d+$/.test(s) ? 'exact' : 'hybrid'; setQuery(s); setMode(m); run(s, m); }} className="text-[13.5px] rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-600 hover:border-[#2563EB]/50 hover:text-[#2563EB] cursor-pointer">{s}</button>
          ))}
        </div>
        {found && (
          <div className="space-y-2">
            {found.ambiguous && <p className="text-[13.5px] text-slate-500">The best matches are very close, so the request may be ambiguous.</p>}
            {found.records.length === 0 ? <p className="text-[15px] text-slate-500">No records match “{query}”. Try a broader word (for example <b>login</b>, <b>audit</b> or <b>points</b>), switch to <b>Everything</b>, or search an id like <b>BR-001</b>.</p> : (
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                {found.records.map(r => (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-3 py-2">
                    <div className="min-w-0">
                      <p className="text-[15px] text-[#0F172A] truncate">{r.label}</p>
                      <p className="text-[13.5px] text-slate-500 font-mono truncate"><span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: colorForType(r.type) }} />{r.type} · {r.id}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[13.5px] text-slate-500"><span>{r.matchedBy.join(' + ')}</span><span className="rounded-md px-1.5 py-0.5 font-semibold text-white" style={{ background: HIGHLIGHT }}>{Math.round(r.score * 100)}%</span></div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
