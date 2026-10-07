import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Loader2, Sparkles, Check, X } from 'lucide-react';
import { Button, cx, sleep } from '../../ui';
import { CSuiteValidation } from '../shared/CSuiteSummary';
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

const TYPES: Record<string, string> = { BR: 'Business', UR: 'User', FR: 'Functional', AI: 'AI', NFR: 'Non-functional', DATA: 'Data', INT: 'Integration', UI: 'UI', SEC: 'Security' };

const INITIAL_REQS = [
  { id: 'BR-001', type: 'BR', t: 'The solution shall support the goal: shorten time from purchase to reimbursement', st: 'Proposed' },
  { id: 'UR-001', type: 'UR', t: 'Field sales reps shall be able to submit a claim from their phone without keeping paper receipts', st: 'Proposed' },
  { id: 'FR-001', type: 'FR', t: 'The system shall let users mobile camera capture', st: 'Proposed' },
  { id: 'FR-002', type: 'FR', t: 'The system shall let users manager approval queue', st: 'Proposed' },
  { id: 'AI-001', type: 'AI', t: 'AI shall read amount, date and merchant from a receipt photo and show them for the rep to confirm', st: 'Proposed' },
  { id: 'DATA-001', type: 'DATA', t: 'Receipt images shall be stored with their claim for the retention period in the company policy', st: 'Proposed' },
  { id: 'SEC-001', type: 'SEC', t: 'Only the claim\'s rep, approver and finance shall see a claim and its receipt', st: 'Proposed' }
];

export const Requirements: React.FC<{ projectId: string; projectName: string; onComplete: () => void }> = ({ projectId, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ list: true });
  const [drafting, setDrafting] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [reqs, setReqs] = useState(INITIAL_REQS);

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasReqs = s.requirementsConfirmed;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    setGenerated(true);
    setBusy(false); setDrafting(false);
    setOpenSecs({ list: true });
  };

  const confirm = () => {
    patch(projectId, { requirementsConfirmed: true, discoveryPage: 'documentation' });
    onComplete();
  };

  // No initial state setup required for Requirements beyond open sections


  const toReview = reqs.filter(r => r.st === 'Proposed').length;
  const approved = reqs.filter(r => r.st === 'Approved').length;
  const canConfirm = toReview === 0 && approved > 0;

  const updateSt = (id: string, st: string) => {
    setReqs(reqs.map(r => r.id === id ? { ...r, st } : r));
  };

  const approveAll = () => {
    setReqs(reqs.map(r => r.st === 'Proposed' ? { ...r, st: 'Approved' } : r));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Drafting traceable functional requirements" knowledgeIds={['KNW-0001']} instructionIds={['INS-0001']} policyIds={['POL-0001']} />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Requirements</h1>
          <p className="text-[15px] text-slate-500 mt-1">Approve requirements into one baseline.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Requirements Baseline · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          
          <Section num="01" title="Requirements list" summary={`${reqs.length} requirements · ${approved} approved`} need={toReview > 0 ? `${toReview} to review` : null} open={openSecs.list} onToggle={() => toggle('list')}>
            <div className="space-y-4 pt-2">
              <div className="flex justify-end">
                {toReview > 0 && <Button variant="secondary" className="text-[12.5px] py-1 h-8" onClick={approveAll}>Approve all remaining</Button>}
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-[12px] font-bold text-slate-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-[12px] font-bold text-slate-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-[12px] font-bold text-slate-500 uppercase">Requirement</th>
                      <th className="px-4 py-3 text-[12px] font-bold text-slate-500 uppercase w-28 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reqs.map(r => (
                      <tr key={r.id} className={cx(r.st === 'Rejected' && "opacity-50 bg-slate-50")}>
                        <td className="px-4 py-3 text-[13.5px] font-bold text-slate-600 whitespace-nowrap">{r.id}</td>
                        <td className="px-4 py-3 text-[13.5px] text-slate-500">{TYPES[r.type]}</td>
                        <td className="px-4 py-3 text-[14px] text-[#0F172A] max-w-md">{r.t}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => updateSt(r.id, 'Approved')} className={cx("p-1.5 rounded transition", r.st === 'Approved' ? "bg-emerald-100 text-emerald-700" : "text-slate-400 hover:bg-slate-100")}><Check className="w-4 h-4"/></button>
                            <button onClick={() => updateSt(r.id, 'Rejected')} className={cx("p-1.5 rounded transition", r.st === 'Rejected' ? "bg-red-100 text-red-700" : "text-slate-400 hover:bg-slate-100")}><X className="w-4 h-4"/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">Baseline Summary</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">Draft v0.1</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Approved</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{approved} of {reqs.length}</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rejected</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{reqs.filter(r => r.st === 'Rejected').length}</p></div>
            <div className="pt-2">
              <CSuiteValidation stageId="requirements" status={canConfirm ? 'Validated' : 'Pending'} />
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
            {canConfirm ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600 text-[13.5px] font-bold mb-2"><CheckCircle2 className="w-4 h-4" /> Ready to confirm</div>
                <Button variant="primary" className="w-full text-[15px] py-2.5" onClick={confirm}>Confirm Baseline <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-600 text-[13.5px] font-bold mb-2">Pending decisions</div>
                <Button className="w-full text-[15px] py-2.5" disabled>Confirm Baseline</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
