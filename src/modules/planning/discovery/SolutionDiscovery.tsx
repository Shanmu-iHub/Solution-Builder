import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { Button, cx, sleep, CSuiteValidation } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { StageResourceActivity } from './StageResourceActivity';

const Section: React.FC<{
  num: string; title: string; summary: string; need?: string | null; open: boolean;
  onToggle: () => void; children: React.ReactNode;
}> = ({ num, title, summary, need, open, onToggle, children }) => (
  <div className={cx('border border-slate-200 bg-white rounded-xl overflow-hidden transition-all duration-200', open ? 'shadow-sm' : 'hover:border-slate-300')}>
    <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer text-left bg-white">
      <span className="text-[13.5px] font-bold text-slate-400 font-mono">{num}</span>
      <span className="text-[15px] font-bold text-[#0F172A]">{title}</span>
      {need && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[11.5px] font-bold tracking-wide uppercase">{need}</span>}
      <span className="flex-1 min-w-0 text-[13.5px] text-slate-500 truncate ml-2">{summary}</span>
      <span className="text-slate-400">{open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
    </button>
    {open && <div className="px-5 pb-5 pt-1 border-t border-slate-100">{children}</div>}
  </div>
);

const PACKAGES = [
  { id: 'sol_custom', t: 'Custom mobile app & web dashboard', d: 'A tailored app for reps and a web approval queue for managers.' },
  { id: 'sol_concur', t: 'SAP Concur deployment', d: 'Roll out the standard Concur mobile app and workflow.' },
  { id: 'sol_power', t: 'PowerApps & Teams approval', d: 'Use Office 365 to scan receipts and route approvals in Teams.' }
];

const CAPS = [
  { id: 'cap_capture', t: 'Mobile camera capture', rc: 'No capture at the point of purchase' },
  { id: 'cap_extract', t: 'AI data extraction', rc: 'No capture at the point of purchase' },
  { id: 'cap_queue', t: 'Manager approval queue', rc: 'Approval has no tracked queue or reminders' },
  { id: 'cap_status', t: 'Claim status tracking', rc: 'Approval has no tracked queue or reminders' },
  { id: 'cap_export', t: 'SAP Concur export', rc: 'No link between approval and the finance system' }
];

export const SolutionDiscovery: React.FC<{ projectId: string; projectName: string; onContinue: () => void }> = ({ projectId, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ pkgs: true, caps: true });
  const [drafting, setDrafting] = useState(false);
  const [selPkg, setSelPkg] = useState<string | null>(null);

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasSolution = !!s.solutionConfirmed;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    setGenerated(true);
    setBusy(false); setDrafting(false);
    setOpenSecs({ pkgs: true, caps: true });
  };

  const confirm = () => {
    patch(projectId, { discoveryPage: 'business_model', solutionConfirmed: true });
  };

  // No initial state setup required for SolutionDiscovery beyond open sections


  const needPkg = !selPkg;
  const canConfirm = !needPkg;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Comparing solution options against confirmed needs" />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 04 of 10</div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Solution Discovery</h1>
          <p className="text-[15px] text-slate-500 mt-1">Packages and capabilities.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Solution Brief · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          
          <Section num="01" title="Recommended Solutions" summary={PACKAGES.find(p => p.id === selPkg)?.t || ''} need={needPkg ? "Pick one" : null} open={openSecs.pkgs} onToggle={() => toggle('pkgs')}>
            <div className="space-y-3 pt-2">
              <p className="text-[12.5px] text-slate-500 mb-2">Pick the solution that best addresses the problem.</p>
              {PACKAGES.map(p => (
                <button 
                  key={p.id} 
                  onClick={() => setSelPkg(p.id)}
                  className={cx("w-full text-left p-4 rounded-xl border transition cursor-pointer flex flex-col gap-1", selPkg === p.id ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-slate-300")}
                >
                  <span className={cx("text-[15px] font-bold", selPkg === p.id ? "text-[#1D4ED8]" : "text-[#0F172A]")}>{p.t}</span>
                  <span className="text-[13.5px] text-slate-600">{p.d}</span>
                </button>
              ))}
            </div>
          </Section>

          {selPkg && (
            <Section num="02" title="Capabilities" summary={`${CAPS.length} capabilities covering 3 root causes`} open={openSecs.caps} onToggle={() => toggle('caps')}>
              <div className="space-y-4 pt-2">
                <p className="text-[12.5px] text-slate-500 mb-2">Capabilities provided by the chosen solution.</p>
                {CAPS.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                    <span className="text-[14px] font-semibold text-[#0F172A]">{c.t}</span>
                    <span className="text-[12px] text-slate-500 flex items-center gap-1">Fixes: <span className="font-semibold text-slate-700">{c.rc}</span></span>
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">Solution Brief</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">Draft v0.1</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Selected Package</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{selPkg ? PACKAGES.find(p => p.id === selPkg)?.t : 'Not decided'}</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Capabilities</span><ul className="text-[14.5px] text-[#0F172A] leading-snug list-disc pl-4 space-y-1">{selPkg ? CAPS.map(c => <li key={c.id}>{c.t}</li>) : <li>Not decided</li>}</ul></div>
            <div className="pt-2">
              <CSuiteValidation stageId="solution" status={canConfirm ? 'Validated' : 'Pending'} />
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
            {canConfirm ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600 text-[13.5px] font-bold mb-2"><CheckCircle2 className="w-4 h-4" /> Ready to confirm</div>
                <Button variant="primary" className="w-full text-[15px] py-2.5" onClick={confirm}>Confirm & Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-600 text-[13.5px] font-bold mb-2">Pending decisions</div>
                <Button className="w-full text-[15px] py-2.5" disabled>Confirm Solution</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
