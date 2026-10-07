import React, { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Globe, Info, Layers, Loader2, RefreshCw, Sparkles, X } from 'lucide-react';
import { Badge, Button, Card, SectionLabel, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { makeProposal } from '../content';
import { Primary, Working } from '../shared';

export const SolutionDashboardPhase: React.FC<{ projectId: string; projectName: string; onComplete: (next: 'documentation') => void }> = ({ projectId, projectName, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const [busy, setBusy] = useState<'proposal' | 'approve' | 'docs' | null>(null);
  const p = s.proposal;

  const generate = async () => {
    setBusy('proposal');
    await sleep(2200);
    patch(projectId, { proposal: makeProposal(projectName), solutionApproved: false });
    setBusy(null);
  };

  if (busy === 'proposal') return <div className="h-full bg-white flex items-center justify-center"><Working label="Generating Solution Blueprint…" sub="Sifting through business intent and validated problems…" /></div>;
  if (!p) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4"><Sparkles className="w-8 h-8" /></div>
        <h3 className="text-[15px] font-bold uppercase tracking-widest text-slate-600">No solution generated yet</h3>
        <p className="text-[13.5px] text-slate-500 mt-2 max-w-md leading-relaxed">Fetch the validated problem from Problem Discovery and generate the Solution Overview.</p>
        <Primary className="mt-6" onClick={generate}>Generate Solution Overview</Primary>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-8">
          {/* Hero */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-subtle">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
              <div className="space-y-3 flex-1 xl:max-w-[60%]">
                <div className="flex items-center gap-2.5"><div className="w-5 h-5 rounded-md bg-amber-500 flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div><span className="text-[11.5px] font-bold uppercase tracking-[0.25em] text-amber-600">AI-Recommended Solution</span></div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] leading-tight">{p.name}</h2>
                <p className="text-[15px] text-slate-500 leading-relaxed italic">{p.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 xl:max-w-[40%] xl:justify-end">
                <Badge>{p.domain}</Badge><Badge tone="green">{p.confidence}% confidence</Badge><Badge tone="blue">{p.status}</Badge><Badge>Complexity: {p.complexity}</Badge><Badge tone="purple">AI: {p.aiLevel}</Badge>
              </div>
            </div>
            <p className="text-[15px] text-slate-700 leading-relaxed border-l-4 border-amber-400 pl-4">{p.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{p.whyThis.map((w, i) => <div key={i} className="flex items-start gap-2.5 p-4 bg-amber-50/60 border border-amber-200 rounded-xl"><div className="w-4 h-4 rounded bg-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5"><Sparkles className="w-2.5 h-2.5" /></div><span className="text-[13.5px] text-slate-700 leading-relaxed">{w}</span></div>)}</div>
            <div className="pt-4 border-t border-slate-100"><p className="text-[11.5px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key benefits</p><div className="flex flex-wrap gap-2">{p.benefits.map(b => <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13.5px] text-slate-700"><Check className="w-3 h-3 text-emerald-500" />{b}</span>)}</div></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="space-y-2">
              <SectionLabel>Problem → Solution mapping</SectionLabel>
              <div className="divide-y divide-slate-100">{p.mapping.map((m, i) => (
                <div key={i} className="py-3 flex items-start gap-4 text-[13.5px]"><div className="flex-1"><p className="text-[11.5px] font-bold uppercase text-slate-400">Business problem</p><p className="text-slate-700 mt-0.5">{m.problem}</p></div><ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-5 shrink-0" /><div className="flex-1"><p className="text-[11.5px] font-bold uppercase text-emerald-500">Solution capability</p><p className="text-[#0F172A] font-semibold mt-0.5">{m.solution}</p></div></div>
              ))}</div>
            </Card>
            <Card className="space-y-2"><SectionLabel>Expected business outcomes</SectionLabel><div className="grid sm:grid-cols-2 gap-3">{p.outcomes.map(o => <div key={o} className="flex items-center gap-2.5 p-3 border border-slate-100 bg-slate-50/60 rounded-xl"><div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div><span className="text-[13.5px] text-slate-700 font-medium">{o}</span></div>)}</div></Card>
          </div>

          <Card><SectionLabel>Business capabilities enabled</SectionLabel><ul className="grid md:grid-cols-2 gap-4">{p.capabilities.map(c => <li key={c} className="flex items-start gap-2.5 text-[13.5px] text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />{c}</li>)}</ul></Card>

          <div><SectionLabel>Core modules included</SectionLabel><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{p.modules.map(m => <div key={m} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center text-center gap-2"><div className="p-2.5 bg-slate-100 text-slate-700 rounded-full"><Layers className="w-4 h-4" /></div><span className="text-[13.5px] font-bold tracking-wide text-[#0F172A]">{m}</span></div>)}</div></div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="space-y-4"><SectionLabel>AI capabilities</SectionLabel>
              <div className="flex flex-wrap gap-2">{p.aiFeatures.map(f => <Badge key={f} tone="blue">{f}</Badge>)}</div>
              <div className="border border-amber-200 bg-amber-50/70 rounded-xl p-4 flex gap-3 text-[13.5px]"><Info className="w-4 h-4 text-amber-500 shrink-0" /><div><p className="font-bold text-amber-700 uppercase tracking-widest text-[11.5px]">Human oversight</p><p className="text-slate-600 leading-relaxed mt-1">AI provides recommendations. Final decisions are always made by people.</p></div></div>
            </Card>
            <Card><SectionLabel>Integrations &amp; connectors</SectionLabel><div className="grid grid-cols-2 gap-3">{p.integrations.map(i => <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 bg-slate-50/60 rounded-xl"><Globe className="w-4 h-4 text-slate-400" /><span className="text-[13.5px] font-semibold text-slate-700">{i}</span></div>)}</div></Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card><SectionLabel>Solution summary specification</SectionLabel><div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[13.5px]">{Object.entries(p.summary).map(([k, v]) => <div key={k}><p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest">{k}</p><p className="text-[#0F172A] font-semibold mt-0.5">{v}</p></div>)}</div></Card>
            <Card><SectionLabel>Why this solution?</SectionLabel><div className="space-y-3">{p.whyThis.map((w, i) => <div key={i} className="flex items-start gap-2.5 text-[13.5px]"><div className="w-4 h-4 rounded bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5"><Sparkles className="w-2.5 h-2.5" /></div><span className="text-slate-700 leading-relaxed">{w}</span></div>)}</div></Card>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end shrink-0">
        <div className="flex items-center gap-3">
          {busy === 'docs' && (
            <div className="flex items-center"><button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-l-xl bg-slate-200 text-slate-500 text-[12.5px] font-bold uppercase tracking-widest cursor-not-allowed"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating docs…</button><button onClick={() => setBusy(null)} title="Stop generation" className="px-3 py-2.5 rounded-r-xl bg-slate-200 text-slate-500 hover:bg-rose-100 hover:text-rose-600 border-l border-white"><X className="w-4 h-4" /></button></div>
          )}
          {busy !== 'docs' && s.solutionApproved && (
            <>
              <Button icon={<RefreshCw className="w-3 h-3" />} onClick={async () => { setBusy('docs'); await sleep(1800); patch(projectId, st => ({ docs: Object.fromEntries(Object.entries(st.docs).map(([k]) => [k, { status: 'none' as const, content: '' }])) })); setBusy(null); toast({ title: 'Documents reset', description: 'Regenerate them in the Documentation step.' }); }}>Regenerate docs</Button>
              <Primary arrow onClick={() => onComplete('documentation')}>View architecture documents</Primary>
            </>
          )}
          {busy !== 'docs' && !s.solutionApproved && (
            <>
              <Button icon={<RefreshCw className="w-3 h-3" />} onClick={generate}>Regenerate solution</Button>
              <Primary loading={busy === 'approve'} icon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={async () => { setBusy('approve'); await sleep(900); patch(projectId, { solutionApproved: true }); setBusy(null); toast({ title: 'Solution approved' }); onComplete('documentation'); }}>Approve solution</Primary>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
