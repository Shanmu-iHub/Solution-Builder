import React, { useEffect, useMemo, useState } from 'react';
import { Bold, Code, Copy, Download, Edit3, Eye, Italic, List, ListOrdered, Loader2, Maximize2, Minus, Plus, RefreshCw, Save, X } from 'lucide-react';
import { Button, Dialog, cx, sleep, useToast } from '../../ui';
import { Markdown } from '../../ui/Markdown';
import { MermaidDiagram } from '../../ui/MermaidDiagram';
import { usePlanning } from '../PlanningStore';
import { DOC_DEFS, makeDocContent } from '../content';
import { Primary } from '../shared';
import { DocType } from '../types';
import { makeArchitecture } from '../archModel';
import { useResourceRun } from '../shared/ResourceRun';

interface Props { projectId: string; projectName: string; onComplete: () => void }

const downloadSvg = (svg: string, projectName: string) => {
  if (!svg) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  a.download = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-architecture.svg`;
  a.click();
  URL.revokeObjectURL(a.href);
};

export const DocumentationPhase: React.FC<Props> = ({ projectId, projectName, onComplete }) => {
  const { state, patch, projects } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const description = `${projects.find(p => p.id === projectId)?.description ?? ''} ${s.idea}`.trim();
  const arch = useMemo(() => makeArchitecture(projectName, description), [projectName, description]);
  const { presentSkills, presentKnowledge } = useResourceRun();
  const [selected, setSelected] = useState<DocType | null>(() => (DOC_DEFS.find(d => s.docs[d.type]?.status === 'completed')?.type ?? null));
  const [view, setView] = useState<'documents' | 'architecture'>('documents');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [preview, setPreview] = useState(false);
  const [archPreview, setArchPreview] = useState(false);
  const [generating, setGenerating] = useState<DocType | null>(null);
  const [all, setAll] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [archCode, setArchCode] = useState(false);
  const [archSvg, setArchSvg] = useState('');

  const doc = selected ? s.docs[selected] : null;
  const allReady = DOC_DEFS.every(d => s.docs[d.type]?.status === 'completed');
  const archReady = s.docs['Solution Architecture Document']?.status === 'completed';

  useEffect(() => setEditing(false), [selected]);

  /** Before writing: the Skills popup loads the skills, then the Knowledge Base popup pulls data from similar projects. Each closes itself. */
  const prepare = async () => {
    await presentSkills();
    await presentKnowledge();
  };
  const generate = async (type: DocType, select = true, prepared = false) => {
    setGenerating(type);
    if (!prepared) await prepare();
    patch(projectId, st => ({ docs: { ...st.docs, [type]: { status: 'generating', content: '' } } }));
    await sleep(1400);
    patch(projectId, st => ({ docs: { ...st.docs, [type]: { status: 'completed', content: makeDocContent(type, projectName) } } }));
    setGenerating(null);
    if (select) { setSelected(type); setView('documents'); }
  };
  const generateAll = async () => {
    setAll(true);
    await prepare();
    for (const d of DOC_DEFS) if (s.docs[d.type]?.status !== 'completed') await generate(d.type, false, true);
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
          <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200">
            {(['documents', 'architecture'] as const).map(m => <button key={m} onClick={() => setView(m)} className={cx('flex-1 py-2 text-[13.5px] font-medium rounded-md transition capitalize cursor-pointer', view === m ? 'bg-slate-100 text-[#0F172A]' : 'text-slate-500 hover:text-slate-700')}>{m}</button>)}
          </div>
        </div>
        <div className="p-6 border-b border-slate-200"><h1 className="text-[17px] font-semibold tracking-tight text-[#0F172A]">Documentation</h1><p className="text-[14.5px] text-slate-500 mt-1.5 leading-relaxed">Generate technical specifications from project context.</p>
          <Button size="sm" className="mt-3" loading={all} onClick={generateAll} disabled={allReady}>{all ? 'Generating all…' : 'Generate all documents'}</Button></div>
        <div className="p-4 flex flex-col gap-3">
          {DOC_DEFS.map(def => {
            const d = s.docs[def.type];
            const gen = generating === def.type || d?.status === 'generating';
            const ready = d?.status === 'completed';
            const sel = selected === def.type && view === 'documents';
            return (
              <div key={def.type} onClick={() => { if (ready) { setSelected(def.type); setView('documents'); } }} className={cx('border rounded-lg transition cursor-pointer', sel ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300')}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1"><h3 className="text-[13.5px] font-semibold font-mono truncate text-[#0F172A]">{def.abbr}</h3></div>
                    {gen ? <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" /> : ready ? (
                      <div className="flex items-center gap-1.5 shrink-0"><button onClick={e => { e.stopPropagation(); setSelected(def.type); setView('documents'); }} className="px-2.5 py-1 text-[12.5px] font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 bg-white cursor-pointer">Preview</button><button title="Regenerate" onClick={e => { e.stopPropagation(); generate(def.type); }} className="p-1 text-slate-400 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 bg-white cursor-pointer"><RefreshCw className="w-3 h-3" /></button></div>
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
          <Primary className="w-full" disabled={!allReady} onClick={onComplete}>Continue to validation</Primary>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        {view === 'architecture' ? (
          <div className="flex-1 min-h-0 flex flex-col bg-white">
            <div className="flex items-center justify-between gap-4 px-6 py-3.5 border-b border-slate-200 shrink-0">
              <div className="min-w-0"><h2 className="text-[15px] font-bold text-[#0F172A] truncate">{projectName} — technical architecture</h2><p className="text-[13.5px] text-slate-500 truncate">{arch.label} · {arch.style} · {arch.components} components</p></div>
              <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">{([false, true] as const).map(code => <button key={String(code)} onClick={() => setArchCode(code)} className={cx('px-3 py-1.5 text-[13px] font-bold rounded-lg transition cursor-pointer', archCode === code ? 'bg-white text-[#0F172A] shadow-subtle' : 'text-slate-500 hover:text-slate-700')}>{code ? 'Mermaid source' : 'Diagram'}</button>)}</div>
            </div>
            <div className="flex-1 min-h-0 relative">
              {archReady && (
                <div className="absolute right-6 top-6 z-20 flex flex-col items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200">
                  {archCode ? <button className={floatBtn} title="Copy Mermaid source" onClick={async () => { try { await navigator.clipboard.writeText(arch.mermaid); } catch { /* ignore */ } toast({ title: 'Mermaid source copied' }); }}><Copy className="w-[18px] h-[18px]" /></button> : (
                    <>
                      <button className={floatBtn} title="Zoom in" onClick={() => setZoom(z => Math.min(2.5, +(z + 0.2).toFixed(1)))}><Plus className="w-[18px] h-[18px]" /></button>
                      <button className={floatBtn} title="Zoom out" onClick={() => setZoom(z => Math.max(0.4, +(z - 0.2).toFixed(1)))}><Minus className="w-[18px] h-[18px]" /></button>
                      <div className="w-6 h-px bg-slate-100" />
                      <button className={floatBtn} title="Preview in fullscreen" onClick={() => setArchPreview(true)}><Maximize2 className="w-[18px] h-[18px]" /></button>
                    </>
                  )}
                  <div className="w-6 h-px bg-slate-100" />
                  <button className={floatBtn} title="Regenerate architecture" onClick={() => generate('Solution Architecture Document', false)}>{generating === 'Solution Architecture Document' ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <RefreshCw className="w-[18px] h-[18px]" />}</button>
                  {!archCode && <><div className="w-6 h-px bg-slate-100" /><button className={floatBtn} title="Export diagram (SVG)" onClick={() => downloadSvg(archSvg, projectName)}><Download className="w-[18px] h-[18px]" /></button></>}
                </div>
              )}
              {!archReady ? <div className="h-full flex flex-col items-center justify-center text-center"><p className="text-[15px] text-slate-500">Generate the Solution Architecture Document to see the diagram.</p><Button className="mt-4" variant="primary" onClick={() => generate('Solution Architecture Document', false)}>Generate architecture</Button></div>
                : archCode ? <pre className="h-full overflow-auto m-0 p-6 pr-20 bg-slate-900 text-slate-100 text-[14px] leading-relaxed font-mono">{arch.mermaid}</pre>
                : <MermaidDiagram code={arch.mermaid} zoom={zoom} onSvg={setArchSvg} className="h-full pr-16" />}
            </div>
          </div>
        ) : doc && doc.status === 'completed' && selected ? (
          <>
            <div className="absolute top-8 right-8 z-20 flex flex-col items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200">
              {editing ? (
                <>
                  <button className={floatBtn} title="Save edits" onClick={() => { patch(projectId, st => ({ docs: { ...st.docs, [selected]: { ...st.docs[selected], content: draft } } })); setEditing(false); toast({ title: 'Document saved' }); }}><Save className="w-[18px] h-[18px]" /></button>
                  <button className={floatBtn} title="Cancel" onClick={() => setEditing(false)}><X className="w-[18px] h-[18px]" /></button>
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
              <div className="max-w-[900px] mx-auto bg-white border border-slate-200 rounded-xl p-8 lg:p-12 min-h-[400px]">
                {editing ? <textarea id="doc-editor" value={draft} onChange={e => setDraft(e.target.value)} spellCheck={false} className="w-full min-h-[480px] font-mono text-[15px] leading-[1.8] focus:outline-none resize-y" /> : <Markdown source={doc.content} />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8"><p className="text-[15px] font-semibold text-[#0F172A]">No document selected</p><p className="text-[13.5px] text-slate-500 mt-1">Generate a document on the left, then open it here.</p></div>
        )}
      </div>

      <Dialog open={preview && !!selected} onClose={() => setPreview(false)} title={selected ?? ''} subtitle="Preview" width="max-w-4xl" footer={<Button onClick={() => setPreview(false)}>Close preview</Button>}>{doc && <Markdown source={doc.content} />}</Dialog>
      <Dialog open={archPreview} onClose={() => setArchPreview(false)} title="Technical architecture" subtitle={`${projectName} — scroll to pan`} width="max-w-6xl" footer={<Button onClick={() => setArchPreview(false)}>Close</Button>}><div className="h-[520px] rounded-xl border border-slate-200 overflow-hidden">{archPreview && <MermaidDiagram code={arch.mermaid} className="h-full" />}</div></Dialog>
    </div>
  );
};
