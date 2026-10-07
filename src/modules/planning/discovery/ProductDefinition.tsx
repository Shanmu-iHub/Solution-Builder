import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { Button, Input, cx, sleep, CSuiteValidation } from '../../ui';
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

const FEATURES = [
  { id: 'f1', t: 'Mobile camera capture', pri: 'Must', set: 'you' },
  { id: 'f2', t: 'AI data extraction', pri: 'Should', set: null },
  { id: 'f3', t: 'Manager approval queue', pri: 'Must', set: null },
];

export const ProductDefinition: React.FC<{ projectId: string; projectName: string; onComplete: () => void }> = ({ projectId, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ scope: true, feat: true, ux: true });
  const [drafting, setDrafting] = useState(false);
  const [features, setFeatures] = useState(FEATURES);

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasProduct = s.productDefinitionConfirmed;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    setGenerated(true);
    setBusy(false); setDrafting(false);
    setOpenSecs({ scope: true, feat: true, ux: true });
  };

  const confirm = () => {
    patch(projectId, { productDefinitionConfirmed: true, discoveryPage: 'requirements' });
    onComplete();
  };

  // No initial state setup required for ProductDefinition beyond open sections


  const aiToReview = features.filter(f => !f.set).length;
  const canConfirm = aiToReview === 0;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Shaping product scope and priorities" />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 06 of 10</div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Product Definition</h1>
          <p className="text-[15px] text-slate-500 mt-1">Scope, features, journeys and metrics.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Product Brief · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          
          <Section num="01" title="Scope" summary="4 in scope · 1 out of scope" open={openSecs.scope} onToggle={() => toggle('scope')}>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[12.5px] font-bold text-emerald-700 uppercase mb-2">In scope</h4>
                  <ul className="space-y-2">
                    <li className="text-[14px] text-[#0F172A] p-3 bg-white border border-emerald-200 rounded-lg shadow-sm">Mobile camera capture</li>
                    <li className="text-[14px] text-[#0F172A] p-3 bg-white border border-emerald-200 rounded-lg shadow-sm">Manager approval queue</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-400 uppercase mb-2">Out of scope</h4>
                  <ul className="space-y-2">
                    <li className="text-[14px] text-slate-500 line-through p-3 bg-slate-50 border border-slate-200 rounded-lg">Auto-approval of small claims</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          <Section num="02" title="Features" summary="3 features · priorities from AI" need={aiToReview > 0 ? `${aiToReview} AI priorities to review` : null} open={openSecs.feat} onToggle={() => toggle('feat')}>
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12.5px] text-slate-500">Same capabilities as the Solution Brief. Click a priority to change it.</span>
                {aiToReview > 0 && <Button variant="secondary" className="text-[12.5px] py-1 h-7" onClick={() => setFeatures(features.map(f => ({...f, set: 'acc'})))}>Accept AI Priorities</Button>}
              </div>
              {features.map(f => (
                <div key={f.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-1 w-24 shrink-0 cursor-pointer hover:bg-slate-50 p-1 rounded">
                    <span className="text-[13px] font-bold text-slate-800">{f.pri}</span>
                    <span className={cx("text-[10px] uppercase font-bold tracking-widest", f.set ? "text-emerald-600" : "text-purple-600")}>{f.set ? 'Set by you' : 'AI priority'}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-100" />
                  <span className="text-[14.5px] text-[#0F172A] font-medium flex-1">{f.t}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section num="03" title="User experience" summary="4 journeys · 3 screen areas" open={openSecs.ux} onToggle={() => toggle('ux')}>
            <div className="space-y-6 pt-2">
              <div>
                <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-2">Journeys</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-[14px] text-slate-700">
                    <span className="font-bold text-[#0F172A] block mb-1">Field sales reps</span>
                    Pays → photographs the receipt → checks the fields AI read → submits → follows status → is reimbursed
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-2">Screen Areas</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[13.5px] font-medium">Receipt capture (camera)</span>
                  <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[13.5px] font-medium">Claim review & submit</span>
                  <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[13.5px] font-medium">Approval queue (managers)</span>
                </div>
              </div>
            </div>
          </Section>

        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">Product Brief</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">Draft v0.1</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Vision</span><p className="text-[14.5px] text-[#0F172A] leading-snug">Reps get reimbursed without paper or chasing, and managers and finance handle claims in one tracked flow.</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Scope</span><p className="text-[14.5px] text-[#0F172A] leading-snug">4 in scope, 1 out</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Features</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{features.length} prioritized</p></div>
            <div className="pt-2">
              <CSuiteValidation stageId="product" status={canConfirm ? 'Validated' : 'Pending'} />
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
                <Button className="w-full text-[15px] py-2.5" disabled>Confirm Product Brief</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
