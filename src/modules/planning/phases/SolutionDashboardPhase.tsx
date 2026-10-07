import React, { useState } from 'react';
import { ArrowRight, Loader2, X } from 'lucide-react';
import { Button, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { makeProposal } from '../content';
import { Primary, Working } from '../shared';
import { Chip } from '../discovery/DiscoveryDashboard';

const Panel: React.FC<{ title: string; className?: string; children: React.ReactNode }> = ({ title, className, children }) => (
  <section className={`bg-white border border-slate-200 rounded-xl ${className ?? ''}`}>
    <h3 className="px-5 py-3.5 border-b border-slate-200 text-[14px] font-semibold text-[#0F172A]">{title}</h3>
    <div className="p-5">{children}</div>
  </section>
);

const Bullets: React.FC<{ items: string[]; cols?: boolean }> = ({ items, cols }) => (
  <ul className={cols ? 'grid md:grid-cols-2 gap-x-8 gap-y-2' : 'space-y-2'}>
    {items.map(i => <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-slate-700 leading-snug"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[8px] shrink-0" />{i}</li>)}
  </ul>
);

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

  if (busy === 'proposal') return <div className="h-full bg-white flex items-center justify-center"><Working label="Generating the solution blueprint…" sub="Using the validated problem and the business intent" /></div>;
  if (!p) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white text-center p-6">
        <h3 className="text-[17px] font-semibold text-[#0F172A]">No solution generated yet</h3>
        <p className="text-[14px] text-slate-500 mt-2 max-w-md leading-relaxed">Use the validated problem from Problem Discovery to generate the solution overview.</p>
        <Primary className="mt-6" onClick={generate}>Generate solution overview</Primary>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-6 py-8 space-y-5">
          <section className="bg-white border border-slate-200 rounded-xl p-7 space-y-5">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div className="space-y-2 flex-1">
                <p className="text-[12.5px] font-medium text-slate-500">Recommended solution</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A] leading-tight">{p.name}</h2>
                <p className="text-[14.5px] text-slate-500 leading-relaxed">{p.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 xl:max-w-[40%] xl:justify-end">
                <Chip>{p.domain}</Chip><Chip>{p.confidence}% confidence</Chip><Chip>{p.status}</Chip><Chip>Complexity: {p.complexity}</Chip><Chip>AI: {p.aiLevel}</Chip>
              </div>
            </div>
            <p className="text-[14.5px] text-slate-700 leading-relaxed border-l-2 border-slate-300 pl-4">{p.description}</p>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-[12.5px] font-medium text-slate-500 mb-2.5">Key benefits</p>
              <Bullets items={p.benefits} cols />
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-5">
            <Panel title="Problem to solution">
              <div className="divide-y divide-slate-100">
                {p.mapping.map((m, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0 grid grid-cols-[1fr_auto_1fr] gap-4 items-start text-[13.5px]">
                    <div><p className="text-[12px] font-medium text-slate-500">Business problem</p><p className="text-slate-700 mt-0.5">{m.problem}</p></div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 mt-5 shrink-0" />
                    <div><p className="text-[12px] font-medium text-slate-500">Solution capability</p><p className="text-[#0F172A] font-medium mt-0.5">{m.solution}</p></div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Expected business outcomes"><Bullets items={p.outcomes} /></Panel>
          </div>

          <Panel title="Business capabilities enabled"><Bullets items={p.capabilities} cols /></Panel>

          <Panel title="Core modules">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{p.modules.map(m => <div key={m} className="border border-slate-200 rounded-lg px-4 py-3 text-[13.5px] font-medium text-[#0F172A]">{m}</div>)}</div>
          </Panel>

          <div className="grid lg:grid-cols-2 gap-5">
            <Panel title="AI capabilities">
              <div className="flex flex-wrap gap-1.5">{p.aiFeatures.map(f => <Chip key={f}>{f}</Chip>)}</div>
              <p className="mt-4 text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3"><span className="font-medium text-[#0F172A]">Human oversight.</span> AI provides recommendations. Final decisions are always made by people.</p>
            </Panel>
            <Panel title="Integrations and connectors">
              <div className="flex flex-wrap gap-1.5">{p.integrations.map(i => <Chip key={i}>{i}</Chip>)}</div>
            </Panel>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <Panel title="Solution summary">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-[13.5px]">{Object.entries(p.summary).map(([k, v]) => <div key={k}><dt className="text-[12px] font-medium text-slate-500">{k}</dt><dd className="text-[#0F172A] font-medium mt-0.5">{v}</dd></div>)}</dl>
            </Panel>
            <Panel title="Why this solution"><Bullets items={p.whyThis} /></Panel>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end shrink-0">
        <div className="flex items-center gap-3">
          {busy === 'docs' && (
            <div className="flex items-center"><button disabled className="flex items-center gap-2 px-4 py-2 rounded-l-lg bg-slate-100 text-slate-500 text-[13px] font-medium cursor-not-allowed"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating docs…</button><button onClick={() => setBusy(null)} title="Stop generation" className="px-2.5 py-2 rounded-r-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 border-l border-white cursor-pointer"><X className="w-4 h-4" /></button></div>
          )}
          {busy !== 'docs' && s.solutionApproved && (
            <>
              <Button onClick={async () => { setBusy('docs'); await sleep(1800); patch(projectId, st => ({ docs: Object.fromEntries(Object.entries(st.docs).map(([k]) => [k, { status: 'none' as const, content: '' }])) })); setBusy(null); toast({ title: 'Documents reset', description: 'Regenerate them in the Documentation step.' }); }}>Regenerate docs</Button>
              <Primary arrow onClick={() => onComplete('documentation')}>View architecture documents</Primary>
            </>
          )}
          {busy !== 'docs' && !s.solutionApproved && (
            <>
              <Button onClick={generate}>Regenerate solution</Button>
              <Primary loading={busy === 'approve'} onClick={async () => { setBusy('approve'); await sleep(900); patch(projectId, { solutionApproved: true }); setBusy(null); toast({ title: 'Solution approved' }); onComplete('documentation'); }}>Approve solution</Primary>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
