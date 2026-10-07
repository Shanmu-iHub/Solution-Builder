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

const CANVAS = [
  { k: 'Key Partners', items: ['Finance system vendor', 'Receipt-reading AI service'] },
  { k: 'Key Activities', items: ['Run the claim and approval flow', 'Maintain expense policy rules'] },
  { k: 'Key Resources', items: ['Mobile app and approval service', 'Expense policy'] },
  { k: 'Value Prop', items: ['Mobile app with AI receipt reading', 'Paperless and fast claims'] },
  { k: 'Relationships', items: ['Self-service for reps', 'In-app reminders for managers'] },
  { k: 'Channels', items: ['Company MDM', 'Email / Teams notifications'] },
  { k: 'Segments', items: ['Field sales reps', 'Line managers', 'Finance team'] },
  { k: 'Cost Structure', items: ['Build and run cost', 'AI usage per receipt'] },
  { k: 'Value Streams', items: ['Time saved and faster reimbursement'] },
];

export const BusinessModel: React.FC<{ projectId: string; projectName: string; onComplete: () => void }> = ({ projectId, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ canvas: true, case: true, fin: true });
  const [drafting, setDrafting] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  const [fin, setFin] = useState({ cost: '', run: '', save: '' });

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasModel = s.businessModelConfirmed;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    setGenerated(true);
    setBusy(false); setDrafting(false);
    setOpenSecs({ canvas: true, case: true, fin: true });
  };

  const confirm = () => {
    patch(projectId, { businessModelConfirmed: true, discoveryPage: 'product_definition' });
    onComplete();
  };

  // No initial state setup required for BusinessModel beyond open sections


  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Building the business model from confirmed outcomes" />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 05 of 10</div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Business Model</h1>
          <p className="text-[15px] text-slate-500 mt-1">Canvas, business case, and financials.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Business Model · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          
          <Section num="01" title="Business model canvas" summary="9 canvas building blocks" open={openSecs.canvas} onToggle={() => toggle('canvas')}>
            <div className="pt-2 grid grid-cols-3 gap-3">
              {CANVAS.map((c, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="text-[12px] font-bold text-slate-800 uppercase mb-2">{c.k}</h4>
                  <ul className="space-y-1">
                    {c.items.map((it, j) => (
                      <li key={j} className="text-[13.5px] text-slate-600 flex items-start gap-1.5"><span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0"/>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section num="02" title="Business case" summary="Reps get reimbursed without paper" open={openSecs.case} onToggle={() => toggle('case')}>
            <div className="space-y-6 pt-2">
              <div>
                <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-2">Value Proposition</h4>
                <p className="text-[15px] font-medium text-[#0F172A] leading-relaxed p-4 bg-slate-50 rounded-xl border border-slate-200">
                  Reps get reimbursed without paper or chasing, and managers and finance handle claims in one tracked flow.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-2">Objectives</h4>
                  <ul className="space-y-2">
                    <li className="text-[14px] text-[#0F172A] p-2 bg-slate-50 border border-slate-100 rounded-lg">Remove paper receipts</li>
                    <li className="text-[14px] text-[#0F172A] p-2 bg-slate-50 border border-slate-100 rounded-lg">Make status visible</li>
                    <li className="text-[14px] text-[#0F172A] p-2 bg-slate-50 border border-slate-100 rounded-lg">Remove manual re-keying</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-2">Benefits</h4>
                  <ul className="space-y-2">
                    <li className="text-[14px] text-[#0F172A] p-2 bg-slate-50 border border-slate-100 rounded-lg">Reps spend less time on admin</li>
                    <li className="text-[14px] text-[#0F172A] p-2 bg-slate-50 border border-slate-100 rounded-lg">Managers approve from one queue</li>
                    <li className="text-[14px] text-[#0F172A] p-2 bg-slate-50 border border-slate-100 rounded-lg">Policy applied consistently</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* <Section num="03" title="Financial figures" summary="Optional · entered by you only" open={openSecs.fin} onToggle={() => toggle('fin')}>
            <div className="space-y-4 pt-2">
              <p className="text-[12.5px] text-slate-500 mb-4">Nothing here is estimated by AI. Leave blank if not known.</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-[12px] font-semibold text-slate-700 mb-1">One-off build cost</span>
                  <Input placeholder="e.g. 50000" value={fin.cost} onChange={e => setFin({...fin, cost: e.target.value})} />
                </div>
                <div>
                  <span className="block text-[12px] font-semibold text-slate-700 mb-1">Yearly running cost</span>
                  <Input placeholder="e.g. 10000" value={fin.run} onChange={e => setFin({...fin, run: e.target.value})} />
                </div>
                <div>
                  <span className="block text-[12px] font-semibold text-slate-700 mb-1">Yearly savings</span>
                  <Input placeholder="e.g. 30000" value={fin.save} onChange={e => setFin({...fin, save: e.target.value})} />
                </div>
              </div>
            </div>
          </Section> */}

        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">Business Model</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">Draft v0.1</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Value Prop</span><p className="text-[14.5px] text-[#0F172A] leading-snug">Reps get reimbursed without paper or chasing, and managers and finance handle claims in one tracked flow.</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Objectives</span><p className="text-[14.5px] text-[#0F172A] leading-snug">3 defined</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Financials</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{fin.save && fin.run ? 'Net calculated' : 'Not calculated'}</p></div>
            <div className="pt-2">
              <CSuiteValidation stageId="business-model" status={'Validated'} />
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 text-[13.5px] font-bold mb-2"><CheckCircle2 className="w-4 h-4" /> Ready to confirm</div>
            <Button variant="primary" className="w-full text-[15px] py-2.5" onClick={confirm}>Confirm & Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
