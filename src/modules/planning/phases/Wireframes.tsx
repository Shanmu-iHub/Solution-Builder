import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Layout, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { Badge, Button, Card, EmptyBlock, SectionLabel, cx, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { makeWireframes } from '../content';
import { Primary, Working } from '../shared';

export const Wireframes: React.FC<{ projectId: string; onComplete: () => void }> = ({ projectId, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [sel, setSel] = useState(s.wireframes[0]?.id ?? null);
  const [copied, setCopied] = useState(false);
  const page = s.wireframes.find(w => w.id === sel) ?? s.wireframes[0];

  const gen = async () => { setBusy(true); await sleep(2600); const w = makeWireframes(); patch(projectId, { wireframes: w }); setSel(w[0].id); setBusy(false); };

  if (busy) return <div className="h-full bg-white flex items-center justify-center"><Working label="Generating wireframes…" sub="Composing screens from personas, journeys and the architecture" /></div>;
  if (s.wireframes.length === 0) {
    return <div className="h-full bg-slate-50/60 p-8 flex items-center justify-center"><EmptyBlock icon={<Layout className="w-6 h-6" />} title="No wireframes generated yet" message="Create low-fidelity screens for the main user flows, including components, interactions and states." action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={gen}>Generate wireframes</Primary>} /></div>;
  }

  return (
    <div className="flex h-full bg-slate-50/60 overflow-hidden">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-100"><h2 className="text-[15px] font-bold text-[#0F172A]">Screens</h2><p className="text-[13.5px] text-slate-500">{s.wireframes.length} pages</p></div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">{s.wireframes.map(w => <button key={w.id} onClick={() => setSel(w.id)} className={cx('w-full text-left px-3 py-2.5 rounded-xl text-[15px] transition cursor-pointer', page?.id === w.id ? 'bg-blue-50 text-[#1D4ED8] font-semibold' : 'text-slate-600 hover:bg-slate-50')}><span className="block truncate">{w.name}</span><span className="text-[11.5px] uppercase tracking-wider text-slate-400">{w.flowType}</span></button>)}</div>
        <div className="p-3 border-t border-slate-100 space-y-2"><Button className="w-full" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={gen}>Regenerate</Button><Primary className="w-full" onClick={onComplete}>Continue to task breakdown <ArrowRight className="w-4 h-4" /></Primary></div>
      </aside>
      {page && (
        <>
          <main className="flex-1 min-w-0 flex flex-col p-5 gap-3">
            <div className="flex items-center justify-between"><h2 className="text-[19px] font-bold text-[#0F172A]">{page.name}</h2><Button size="sm" icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} onClick={async () => { try { await navigator.clipboard.writeText(page.html); } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 1500); toast({ title: 'HTML copied' }); }}>{copied ? 'Copied' : 'Copy HTML'}</Button></div>
            <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-subtle"><iframe key={page.id} title={page.name} srcDoc={page.html} sandbox="" className="w-full h-full border-0" /></div>
          </main>
          <aside className="w-80 shrink-0 border-l border-slate-200 bg-white overflow-y-auto p-5 space-y-5">
            <div><SectionLabel>Screen information</SectionLabel><p className="text-[14.5px] text-slate-700 leading-relaxed">{page.purpose}</p><div className="mt-2"><Badge tone={page.flowType === 'Main' ? 'blue' : 'slate'}>{page.flowType} flow</Badge></div></div>
            <div><SectionLabel>Components</SectionLabel><div className="flex flex-wrap gap-1.5">{page.components.map(c => <Badge key={c} mono>{c}</Badge>)}</div></div>
            <div><SectionLabel>Interactions</SectionLabel><div className="space-y-2">{page.interactions.map((i, k) => <div key={k} className="border border-slate-200 rounded-xl p-3 text-[13.5px]"><p className="font-semibold text-[#0F172A]">{i.action}</p><p className="text-slate-500 mt-0.5">→ {i.result}</p></div>)}</div></div>
            <div><SectionLabel>States</SectionLabel><div className="flex flex-wrap gap-1.5">{['Empty', 'Loading', 'Error', 'Success'].map(x => <Badge key={x}>{x}</Badge>)}</div></div>
            <div><SectionLabel>Accessibility</SectionLabel><ul className="text-[13.5px] text-slate-600 space-y-1 list-disc pl-4"><li>Logical reading and focus order</li><li>Visible focus indicators</li><li>Contrast ratio ≥ 4.5:1</li></ul></div>
          </aside>
        </>
      )}
      <span className="hidden"><Card>{null}</Card><Loader2 /></span>
    </div>
  );
};
