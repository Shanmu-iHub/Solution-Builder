import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Plus, RotateCcw, Save, ShieldCheck, Trash2 } from 'lucide-react';
import { Button, Input, Select, useToast } from '../ui';
import { validateDefinition, useKnowledge } from './KnowledgeStore';
import { ALLOWED_COLLECTIONS, DEFAULT_DEFINITION } from './mockData';
import { EntitySourceDefinition, ProjectGraphDefinition, RelationshipDefinition } from './types';

const Fld: React.FC<{ label: string; hint?: string; children: React.ReactNode; className?: string }> = ({ label, hint, children, className }) => (
  <label className={`block text-[13.5px] ${className || ''}`}>
    <span className="font-bold text-slate-700">{label}</span>
    <div className="mt-1">{children}</div>
    {hint && <span className="block mt-1 text-slate-400">{hint}</span>}
  </label>
);

const parseCsv = (t: string) => t.split(',').map(s => s.trim()).filter(Boolean);

const CsvInput: React.FC<{ value: string[]; onChange: (v: string[]) => void; placeholder?: string }> = ({ value, onChange, placeholder }) => {
  const [text, setText] = useState(value.join(', '));
  const joined = value.join('|');
  useEffect(() => { if (parseCsv(text).join('|') !== joined) setText(value.join(', ')); }, [joined]); // eslint-disable-line react-hooks/exhaustive-deps
  return <Input value={text} placeholder={placeholder} className="!py-1.5 !text-[13.5px]" onChange={e => { setText(e.target.value); onChange(parseCsv(e.target.value)); }} />;
};

const opt = (v: string) => (v.trim() === '' ? undefined : v);
const mono = '!py-1.5 !text-[13.5px] font-mono';

const SourceCard: React.FC<{ s: EntitySourceDefinition; all: EntitySourceDefinition[]; onChange: (p: Partial<EntitySourceDefinition>) => void; onRemove: () => void }> = ({ s, all, onChange, onRemove }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex-1 min-w-0 flex items-center gap-2 text-left cursor-pointer">
          {open ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
          <span className="font-mono text-[13.5px] bg-slate-100 rounded-md px-1.5 py-0.5 shrink-0">{s.id}</span>
          <span className="text-[15px] font-semibold text-[#0F172A] shrink-0">{s.entityType}</span>
          <span className="text-[13.5px] text-slate-500 truncate">{s.collection} · {s.path || 'the whole document'}</span>
        </button>
        <Button variant="ghost" size="xs" onClick={onRemove} aria-label={`Remove ${s.id}`}><Trash2 className="w-4 h-4 text-slate-400" /></Button>
      </div>
      {open && (
        <div className="border-t border-slate-200 px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Fld label="Id" hint="A short name that relationships refer to."><Input value={s.id} onChange={e => onChange({ id: e.target.value })} className={mono} /></Fld>
          <Fld label="Entity type" hint="What each item is called in the graph."><Input value={s.entityType} onChange={e => onChange({ entityType: e.target.value })} className="!py-1.5 !text-[13.5px]" /></Fld>
          <Fld label="Collection">
            <Select value={s.collection} onChange={e => onChange({ collection: e.target.value })} className="!py-1.5 !text-[13.5px]">
              {!ALLOWED_COLLECTIONS.includes(s.collection) && <option value={s.collection}>{s.collection} (not available)</option>}
              {ALLOWED_COLLECTIONS.map(c => <option key={c}>{c}</option>)}
            </Select>
          </Fld>
          <Fld label="Path to the items" hint="Dotted path to a list inside the document, e.g. register.items. Use * for any key. Empty = whole document."><Input value={s.path} onChange={e => onChange({ path: e.target.value })} className={mono} placeholder="(whole document)" /></Fld>
          <Fld label="Id field" hint="The field that identifies an item."><Input value={s.idField} onChange={e => onChange({ idField: e.target.value })} className={mono} /></Fld>
          <Fld label="Id prefix (optional)" hint="Put in front of every id, e.g. pd. makes go_1 into pd.go_1."><Input value={s.idPrefix ?? ''} onChange={e => onChange({ idPrefix: opt(e.target.value) })} className={mono} /></Fld>
          <Fld label="Name field" hint="Shown as the item's name."><Input value={s.labelField} onChange={e => onChange({ labelField: e.target.value })} className={mono} /></Fld>
          <Fld label="Searchable fields" hint="Comma separated. Used for search."><CsvInput value={s.textFields} onChange={textFields => onChange({ textFields })} placeholder="statement, priority" /></Fld>
          <Fld label="Parent (optional)" hint="For items nested inside another source's items.">
            <Select value={s.parent ?? ''} onChange={e => onChange({ parent: opt(e.target.value), ...(e.target.value ? {} : { parentRelationship: undefined }) })} className="!py-1.5 !text-[13.5px]">
              <option value="">None</option>
              {all.filter(x => x.id !== s.id).map(x => <option key={x.id}>{x.id}</option>)}
            </Select>
          </Fld>
          {s.parent && <Fld label="Relationship from the parent" hint="UPPER_SNAKE_CASE. Default CONTAINS."><Input value={s.parentRelationship ?? ''} onChange={e => onChange({ parentRelationship: opt(e.target.value) })} className={mono} placeholder="CONTAINS" /></Fld>}
          <Fld label="Version field (optional)" hint="Copied onto the entity as its version."><Input value={s.versionField ?? ''} onChange={e => onChange({ versionField: opt(e.target.value) })} className={mono} /></Fld>
          {!s.parent && (
            <label className="flex items-start gap-2 text-[13.5px] md:col-span-2">
              <input type="checkbox" className="mt-0.5" checked={s.latestOnly ?? false} onChange={e => onChange({ latestOnly: e.target.checked || undefined })} />
              <span><span className="font-bold text-slate-700">Latest document only</span><span className="block mt-0.5 text-slate-400">For versioned documents (BRD, PRD, SRS): use only the newest version instead of mixing every version.</span></span>
            </label>
          )}
        </div>
      )}
    </div>
  );
};

const toList = (to: string | string[]) => (Array.isArray(to) ? to : [to]);

const RelCard: React.FC<{ r: RelationshipDefinition; ids: string[]; onChange: (r: RelationshipDefinition) => void; onRemove: () => void }> = ({ r, ids, onChange, onRemove }) => {
  const [open, setOpen] = useState(false);
  const target = r.kind === 'reference' ? toList(r.to).join(', ') : r.to;
  const switchKind = (kind: RelationshipDefinition['kind']) => {
    if (kind === r.kind) return;
    const first = toList(r.to as string | string[])[0] ?? '';
    onChange(kind === 'reference' ? { name: r.name, kind, from: r.from, field: '', to: first } : { name: r.name, kind, from: r.from, fromField: '', to: first, toField: '' });
  };
  const pick = (value: string, on: (id: string) => void) => (
    <Select value={value} onChange={e => on(e.target.value)} className="!py-1.5 !text-[13.5px]">
      {!ids.includes(value) && <option value={value}>{value || 'Choose…'}</option>}
      {ids.map(i => <option key={i}>{i}</option>)}
    </Select>
  );
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex-1 min-w-0 flex items-center gap-2 text-left cursor-pointer">
          {open ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
          <span className="font-mono text-[13.5px] bg-slate-100 rounded-md px-1.5 py-0.5 shrink-0">{r.name || '(no name)'}</span>
          <span className="text-[13.5px] text-slate-500 truncate">{r.from} → {target} · {r.kind === 'reference' ? 'by reference' : 'by common value'}</span>
        </button>
        <Button variant="ghost" size="xs" onClick={onRemove} aria-label={`Remove ${r.name}`}><Trash2 className="w-4 h-4 text-slate-400" /></Button>
      </div>
      {open && (
        <div className="border-t border-slate-200 px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Fld label="Name" hint="UPPER_SNAKE_CASE, e.g. TRACES_TO."><Input value={r.name} onChange={e => onChange({ ...r, name: e.target.value })} className={mono} /></Fld>
          <Fld label="How the items are connected">
            <Select value={r.kind} onChange={e => switchKind(e.target.value as RelationshipDefinition['kind'])} className="!py-1.5 !text-[13.5px]">
              <option value="reference">A field holds the other item’s id (reference)</option>
              <option value="commonValue">Two fields hold the same value (common value)</option>
            </Select>
          </Fld>
          <Fld label="From">{pick(r.from, from => onChange({ ...r, from }))}</Fld>
          {r.kind === 'reference' ? (
            <>
              <Fld label="Field holding the ids" hint="On the “from” item: a single id or a list of ids."><Input value={r.field} onChange={e => onChange({ ...r, field: e.target.value })} className={mono} /></Fld>
              <div className="md:col-span-2">
                <span className="text-[13.5px] font-bold text-slate-700">Points at</span>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  {ids.map(id => {
                    const checked = toList(r.to).includes(id);
                    return (
                      <label key={id} className="flex items-center gap-1.5 text-[15px] text-slate-700">
                        <input type="checkbox" checked={checked} onChange={() => { const cur = toList(r.to).filter(Boolean); const next = checked ? cur.filter(t => t !== id) : [...cur, id]; onChange({ ...r, to: next.length === 1 ? next[0] : next }); }} />
                        <span className="font-mono text-[13.5px]">{id}</span>
                      </label>
                    );
                  })}
                </div>
                <span className="block mt-1 text-[13.5px] text-slate-400">Pick more than one when the field can point at different kinds of item.</span>
              </div>
              <Fld label="Prefix for the ids (optional)" hint="Put in front of each id before it is looked up."><Input value={r.valuePrefix ?? ''} onChange={e => onChange({ ...r, valuePrefix: opt(e.target.value) })} className={mono} /></Fld>
            </>
          ) : (
            <>
              <Fld label="Field on the “from” item"><Input value={r.fromField} onChange={e => onChange({ ...r, fromField: e.target.value })} className={mono} /></Fld>
              <Fld label="To">{pick(r.to, to => onChange({ ...r, to }))}</Fld>
              <Fld label="Field on the “to” item" hint="Items are connected when both fields have the same value (ignoring case)."><Input value={r.toField} onChange={e => onChange({ ...r, toField: e.target.value })} className={mono} /></Fld>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const DefinitionsEditor: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { getDefinition, saveDefinition, projects } = useKnowledge();
  const { toast } = useToast();
  const saved = getDefinition(projectId);
  const isDefault = projects.find(p => p.projectId === projectId)?.isDefaultDefinition ?? true;
  const [draft, setDraft] = useState<ProjectGraphDefinition>(() => structuredClone(saved));
  const [issues, setIssues] = useState<string[]>([]);
  const [valid, setValid] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setDraft(structuredClone(getDefinition(projectId))); setIssues([]); setValid(false); }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);
  const edit = (fn: (d: ProjectGraphDefinition) => ProjectGraphDefinition) => { setDraft(fn); setValid(false); };
  const ids = draft.entitySources.map(s => s.id);

  const check = () => { const found = validateDefinition(draft); setIssues(found); setValid(found.length === 0); };
  const save = async () => {
    const found = validateDefinition(draft);
    if (found.length) { setIssues(found); setValid(false); return; }
    setSaving(true);
    await saveDefinition(projectId, draft);
    setSaving(false);
    setIssues([]);
    toast({ title: 'Definitions saved', description: 'Rebuild the map to use them.' });
  };
  const nextId = () => { let n = ids.length + 1; while (ids.includes(`source${n}`)) n++; return `source${n}`; };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-[15px] text-slate-600">Tell the graph which parts of the project’s data become entities, and how they are connected. After saving, rebuild the map to apply the changes.</p>
          <p className="text-[13.5px] text-slate-400 mt-1">{isDefault ? 'These are the default definitions.' : 'Custom definitions are saved for this project.'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" icon={<RotateCcw className="w-4 h-4" />} onClick={() => edit(() => structuredClone(DEFAULT_DEFINITION))}>Reset to default</Button>
          <Button icon={<ShieldCheck className="w-4 h-4" />} onClick={check} disabled={saving}>Check</Button>
          <Button variant="primary" loading={saving} icon={<Save className="w-4 h-4" />} onClick={save} disabled={!dirty}>Save</Button>
        </div>
      </div>

      {issues.length > 0 && (
        <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[15px] text-rose-800">
          <p className="font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {issues.length === 1 ? '1 problem to fix' : `${issues.length} problems to fix`}</p>
          <ul className="mt-1 list-disc pl-6 space-y-0.5">{issues.map((i, k) => <li key={k}>{i}</li>)}</ul>
        </div>
      )}
      {valid && issues.length === 0 && <p className="flex items-center gap-2 text-[15px] text-emerald-700"><CheckCircle2 className="w-4 h-4" /> The definitions look good.</p>}

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#0F172A]">Entities <span className="font-normal text-slate-400">({draft.entitySources.length})</span></h3>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => edit(d => ({ ...d, entitySources: [...d.entitySources, { id: nextId(), collection: 'architecture_docs', entityType: 'Risk', path: 'risks', idField: 'risk_id', labelField: 'title', textFields: ['mitigation', 'severity'] }] }))}>Add entity</Button>
        </div>
        {draft.entitySources.map((s, i) => (
          <SourceCard key={i} s={s} all={draft.entitySources} onChange={p => edit(d => ({ ...d, entitySources: d.entitySources.map((x, k) => (k === i ? { ...x, ...p } : x)) }))} onRemove={() => edit(d => ({ ...d, entitySources: d.entitySources.filter((_, k) => k !== i) }))} />
        ))}
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#0F172A]">Relationships <span className="font-normal text-slate-400">({draft.relationships.length})</span></h3>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} disabled={ids.length === 0} onClick={() => edit(d => ({ ...d, relationships: [...d.relationships, { name: 'MITIGATED_BY', kind: 'reference', from: ids[0], field: 'mitigated_by', to: ids[0] }] }))}>Add relationship</Button>
        </div>
        {draft.relationships.length === 0 && <p className="text-[15px] text-slate-500">No relationships yet. Without them the map only has entities.</p>}
        {draft.relationships.map((r, i) => (
          <RelCard key={i} r={r} ids={ids} onChange={n => edit(d => ({ ...d, relationships: d.relationships.map((x, k) => (k === i ? n : x)) }))} onRemove={() => edit(d => ({ ...d, relationships: d.relationships.filter((_, k) => k !== i) }))} />
        ))}
      </section>
    </div>
  );
};
