import React, { useEffect, useMemo, useState } from 'react';
import { Bold, Code, Download, Edit3, Eye, FileText, CheckCircle2, Italic, List, ListOrdered, Loader2, Maximize2, Minus, Plus, RefreshCw, Save, Sparkles, X } from 'lucide-react';
import { Button, Dialog, cx, sleep, useToast, CSuiteValidation } from '../../ui';
import { Markdown } from '../../ui/Markdown';
import { GraphCanvas } from '../../knowledge/GraphCanvas';
import { usePlanning } from '../PlanningStore';
import { DOC_DEFS, makeDocContent } from '../content';
import { Primary } from '../shared';
import { DocType } from '../types';

const ARCH_NODES = [
  { id: 'gw', type: 'Edge', label: 'API Gateway', description: 'Authentication, rate limiting and routing.', version: null },
  { id: 'case', type: 'Service', label: 'Case Service', description: 'Case lifecycle, routing and SLAs.', version: null },
  { id: 'kb', type: 'Service', label: 'Knowledge Service', description: 'Articles, embeddings and retrieval.', version: null },
  { id: 'ai', type: 'Service', label: 'Assistant Service', description: 'Reply drafting and summarisation with guardrails.', version: null },
  { id: 'notify', type: 'Worker', label: 'Notification Worker', description: 'Email / SMS delivery with retries.', version: null },
  { id: 'ana', type: 'Pipeline', label: 'Analytics Pipeline', description: 'Event ingestion and dashboards.', version: null },
  { id: 'pg', type: 'Data', label: 'PostgreSQL', description: 'System of record for cases and audit data.', version: null },
  { id: 'redis', type: 'Data', label: 'Redis', description: 'Queues and caching.', version: null },
  { id: 'idp', type: 'External', label: 'Identity Provider', description: 'OIDC single sign-on.', version: null },
  { id: 'crm', type: 'External', label: 'CRM', description: 'Customer profile enrichment (read).', version: null },
  { id: 'llm', type: 'External', label: 'LLM Provider', description: 'Hosted model behind a provider-agnostic gateway.', version: null },
];
const ARCH_EDGES = [['gw', 'case'], ['gw', 'kb'], ['gw', 'ai'], ['gw', 'idp'], ['ai', 'kb'], ['ai', 'case'], ['ai', 'llm'], ['case', 'pg'], ['kb', 'pg'], ['case', 'redis'], ['notify', 'redis'], ['case', 'notify'], ['case', 'ana'], ['case', 'crm']].map(([source, target], i) => ({ id: `a${i}`, source, target, type: 'CALLS' }));

interface Props { projectId: string; projectName: string; onComplete: () => void }

export const DocumentationPhase: React.FC<Props> = ({ projectId, projectName, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const [selected, setSelected] = useState<DocType | null>(() => (DOC_DEFS.find(d => s.docs[d.type]?.status === 'completed')?.type ?? null));
  const [view, setView] = useState<'documents' | 'architecture'>('documents');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [preview, setPreview] = useState(false);
  const [archPreview, setArchPreview] = useState(false);
  const [generating, setGenerating] = useState<DocType | null>(null);
  const [all, setAll] = useState(false);
  const [zoomTick, setZoomTick] = useState(1);

  const doc = selected ? s.docs[selected] : null;
  const allReady = DOC_DEFS.every(d => s.docs[d.type]?.status === 'completed');
  const archReady = s.docs['Solution Architecture Document']?.status === 'completed';

  useEffect(() => setEditing(false), [selected]);

  const generate = async (type: DocType, select = true) => {
    setGenerating(type);
    patch(projectId, st => ({ docs: { ...st.docs, [type]: { status: 'generating', content: '' } } }));
    await sleep(1400);
    patch(projectId, st => ({ docs: { ...st.docs, [type]: { status: 'completed', content: makeDocContent(type, projectName) } } }));
    setGenerating(null);
    if (select) { setSelected(type); setView('documents'); }
  };
  const generateAll = async () => {
    setAll(true);
    for (const d of DOC_DEFS) if (s.docs[d.type]?.status !== 'completed') await generate(d.type, false);
    setAll(false);
    setSelected(sel => sel ?? DOC_DEFS[0].type);
    toast({ title: 'All documents generated' });
  };

  const exportPdf = () => {
    if (!selected || !doc) return;
    const w = window.open('', '_blank');
    if (!w) return toast({ title: 'Pop-up blocked', description: 'Allow pop-ups to print the document.', tone: 'error' });
    const esc = doc.content.replace(/</g, '&lt;');
    w.document.write(`<html><head><title>${selected}</title><style>body{font-family:Georgia,serif;line-height:1.7;max-width:760px;margin:40px auto;color:#111}pre{white-space:pre-wrap;font-family:inherit}</style></head><body><pre>${esc}</pre></body></html>`);
    w.document.close();
    w.print();
  };

  const wrap = (before: string, after = before) => {
    const ta = document.getElementById('doc-editor') as HTMLTextAreaElement | null;
    if (!ta) return;
    const { selectionStart: a, selectionEnd: b } = ta;
    const next = `${draft.slice(0, a)}${before}${draft.slice(a, b) || 'text'}${after}${draft.slice(b)}`;
    setDraft(next);
  };
  const lineStart = (prefix: string) => setDraft(d => `${d}${d.endsWith('\n') || !d ? '' : '\n'}${prefix}`);

  const Toolbar = useMemo(() => (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-white/95 border-b border-slate-200 shrink-0">
      {[{ i: <Bold size={14} />, t: 'Bold', f: () => wrap('**') }, { i: <Italic size={14} />, t: 'Italic', f: () => wrap('_') }, { i: <Code size={14} />, t: 'Inline code', f: () => wrap('`') }].map(b => <button key={b.t} title={b.t} onClick={b.f} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer">{b.i}</button>)}
      <span className="w-px h-4 bg-slate-200 mx-1" />
      {['H1', 'H2', 'H3'].map((h, i) => <button key={h} onClick={() => lineStart(`${'#'.repeat(i + 1)} `)} className="px-2 py-0.5 text-[11.5px] font-bold rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer">{h}</button>)}
      <span className="w-px h-4 bg-slate-200 mx-1" />
      <button title="Bullet list" onClick={() => lineStart('- ')} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"><List size={14} /></button>
      <button title="Numbered list" onClick={() => lineStart('1. ')} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"><ListOrdered size={14} /></button>
    </div>
  ), [draft]); // eslint-disable-line react-hooks/exhaustive-deps

  const floatBtn = 'p-2.5 hover:bg-slate-50 rounded-md transition-colors text-slate-600 cursor-pointer';

  return (
    <div className="flex h-full w-full bg-slate-50/60 overflow-hidden">
      {/* Left: explorer */}
      <div className="w-[340px] shrink-0 border-r border-slate-200 bg-white overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/60">
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-subtle">
            {(['documents', 'architecture'] as const).map(m => <button key={m} onClick={() => setView(m)} className={cx('flex-1 py-2 text-[13.5px] font-bold rounded-lg transition capitalize cursor-pointer', view === m ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-500 hover:text-slate-700')}>{m}</button>)}
          </div>
        </div>
        <div className="p-6 border-b border-slate-200"><h1 className="text-[19px] font-bold tracking-tight text-[#0F172A]">Documentation</h1><p className="text-[14.5px] text-slate-500 mt-1.5 leading-relaxed">Generate technical specifications from project context.</p>
          <Button size="sm" className="mt-3" loading={all} icon={<Sparkles className="w-3.5 h-3.5" />} onClick={generateAll} disabled={allReady}>{all ? 'Generating all…' : 'Generate all documents'}</Button></div>
        <div className="p-4 flex flex-col gap-3">
          {DOC_DEFS.map(def => {
            const d = s.docs[def.type];
            const gen = generating === def.type || d?.status === 'generating';
            const ready = d?.status === 'completed';
            const sel = selected === def.type && view === 'documents';
            return (
              <div key={def.type} onClick={() => { if (ready) { setSelected(def.type); setView('documents'); } }} className={cx('border rounded-xl transition cursor-pointer', sel ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white hover:border-slate-300', !ready && 'opacity-90')}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1"><FileText className={cx('w-4 h-4 shrink-0', sel ? 'text-[#2563EB]' : def.color)} /><h3 className={cx('text-[14.5px] font-bold truncate', sel ? 'text-[#1D4ED8]' : 'text-[#0F172A]')}>{def.abbr}</h3></div>
                    {gen ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563EB]" /> : ready ? (
                      <div className="flex items-center gap-1.5 shrink-0"><CheckCircle2 className="w-[18px] h-[18px] text-emerald-500" /><button onClick={e => { e.stopPropagation(); setSelected(def.type); setView('documents'); }} className="px-2.5 py-1 text-[12.5px] font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 bg-white cursor-pointer">Preview</button><button title="Regenerate" onClick={e => { e.stopPropagation(); generate(def.type); }} className="p-1 text-slate-400 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 bg-white cursor-pointer"><RefreshCw className="w-3 h-3" /></button></div>
                    ) : <button onClick={e => { e.stopPropagation(); generate(def.type); }} className="px-2.5 py-1 text-[12.5px] font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 bg-white cursor-pointer">Generate</button>}
                  </div>
                  <h4 className="text-[13.5px] font-semibold text-slate-800 mb-0.5">{def.title}</h4>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed line-clamp-2">{def.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 mt-auto border-t border-slate-200 bg-slate-50 flex flex-col gap-4">
          <CSuiteValidation stageId="documents" status={allReady ? 'Validated' : 'Pending'} />
          <Primary className="w-full" disabled={!allReady} onClick={onComplete}>Continue to validation</Primary>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        {view === 'architecture' ? (
          <div className="flex-1 relative bg-white">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 bg-white p-1.5 rounded-xl shadow-card border border-slate-200">
              <button className={floatBtn} title="Zoom in" onClick={() => setZoomTick(z => z + 1)}><Plus className="w-[18px] h-[18px]" /></button>
              <button className={floatBtn} title="Zoom out" onClick={() => setZoomTick(z => z + 1)}><Minus className="w-[18px] h-[18px]" /></button>
              <div className="w-6 h-px bg-slate-100" />
              <button className={floatBtn} title="Preview in fullscreen" onClick={() => setArchPreview(true)}><Maximize2 className="w-[18px] h-[18px]" /></button>
              <div className="w-6 h-px bg-slate-100" />
              <button className={floatBtn} title="Regenerate architecture" onClick={() => generate('Solution Architecture Document', false)}>{generating === 'Solution Architecture Document' ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <RefreshCw className="w-[18px] h-[18px]" />}</button>
              <div className="w-6 h-px bg-slate-100" />
              <button className={floatBtn} title="Export diagram" onClick={() => toast({ title: 'Diagram exported', description: 'architecture-diagram.svg downloaded (prototype).' })}><Download className="w-[18px] h-[18px]" /></button>
            </div>
            {archReady ? <GraphCanvas key={zoomTick > 0 ? 'arch' : 'arch'} nodes={ARCH_NODES} edges={ARCH_EDGES} /> : <div className="h-full flex flex-col items-center justify-center text-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300 mb-3" /><p className="text-[15px] text-slate-500">Generate the Solution Architecture Document to see the diagram.</p><Button className="mt-4" variant="primary" onClick={() => generate('Solution Architecture Document', false)}>Generate architecture</Button></div>}
          </div>
        ) : doc && doc.status === 'completed' && selected ? (
          <>
            <div className="absolute top-8 right-8 z-20 flex flex-col items-center gap-1.5 bg-white p-1.5 rounded-xl shadow-card border border-slate-200">
              {editing ? (
                <>
                  <button className={cx(floatBtn, '!text-emerald-600 hover:!bg-emerald-50')} title="Save edits" onClick={() => { patch(projectId, st => ({ docs: { ...st.docs, [selected]: { ...st.docs[selected], content: draft } } })); setEditing(false); toast({ title: 'Document saved' }); }}><Save className="w-[18px] h-[18px]" /></button>
                  <button className={cx(floatBtn, '!text-rose-500 hover:!bg-rose-50')} title="Cancel" onClick={() => setEditing(false)}><X className="w-[18px] h-[18px]" /></button>
                </>
              ) : (
                <>
                  <button className={floatBtn} title="Preview" onClick={() => setPreview(true)}><Eye className="w-[18px] h-[18px]" /></button>
                  <button className={floatBtn} title="Edit document" onClick={() => { setDraft(doc.content); setEditing(true); }}><Edit3 className="w-[18px] h-[18px]" /></button>
                  <button className={floatBtn} title="Export PDF" onClick={exportPdf}><Download className="w-[18px] h-[18px]" /></button>
                </>
              )}
            </div>
            {editing && Toolbar}
            <div className="flex-1 overflow-auto p-8 lg:p-12 pb-24">
              <div className="max-w-[900px] mx-auto bg-white border border-slate-200 rounded-2xl shadow-subtle p-8 lg:p-12 min-h-[400px]">
                {editing ? <textarea id="doc-editor" value={draft} onChange={e => setDraft(e.target.value)} spellCheck={false} className="w-full min-h-[480px] font-mono text-[15px] leading-[1.8] focus:outline-none resize-y" /> : <Markdown source={doc.content} />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8"><div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3"><FileText className="w-7 h-7" /></div><p className="text-[15px] font-bold text-[#0F172A]">No document selected</p><p className="text-[13.5px] text-slate-500 mt-1">Generate a document on the left, then open it here.</p></div>
        )}
      </div>

      <Dialog open={preview && !!selected} onClose={() => setPreview(false)} title={selected ?? ''} subtitle="Preview" width="max-w-4xl" footer={<Button onClick={() => setPreview(false)}>Close preview</Button>}>{doc && <Markdown source={doc.content} />}</Dialog>
      <Dialog open={archPreview} onClose={() => setArchPreview(false)} title="Technical architecture" subtitle="Component view — drag to pan, scroll to zoom" width="max-w-6xl" footer={<Button onClick={() => setArchPreview(false)}>Close</Button>}><div className="h-[520px] rounded-xl border border-slate-200 overflow-hidden"><GraphCanvas nodes={ARCH_NODES} edges={ARCH_EDGES} /></div></Dialog>
    </div>
  );
};
