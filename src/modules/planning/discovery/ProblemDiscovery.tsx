import React, { useState } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, ChevronDown, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { Button, cx, sleep, CSuiteValidation } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { PD_QUESTIONS } from '../content';
import { StageResourceActivity } from './StageResourceActivity';
import { AnalysisChips, StatementAnalysisDialog } from './ProblemStatementAnalysis';

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

const ROOT_CAUSES = [
  { id: 'rc_capture', sym: 'Receipts are lost', bec: 'Receipts exist only on paper until the claim is written', root: 'No capture at the point of purchase' },
  { id: 'rc_approval', sym: 'Reimbursement takes weeks', bec: 'Claims wait in managers\' email inboxes', root: 'Approval has no tracked queue or reminders' },
  { id: 'rc_entry', sym: 'Approved claims are slow to be paid', bec: 'Finance re-keys every approved claim', root: 'No link between approval and the finance system' },
];

const FRAMINGS = [
  { id: 'stmt_1', t: 'Field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually.' },
  { id: 'stmt_2', t: 'Expense claims are delayed and error-prone because reps rely on paper receipts and managers approve manually over email.' },
  { id: 'stmt_3', t: 'The lack of digital receipt capture and tracked approval workflows causes week-long delays in reimbursing field sales reps.' },
];

export const ProblemDiscovery: React.FC<{ projectId: string; projectName: string; onContinue: () => void }> = ({ projectId, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ facets: true, qs: true, roots: true, frame: true });
  const [drafting, setDrafting] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasBrief = Object.keys(s.pdAnswers || {}).length > 0;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    patch(projectId, { 
      pdAnswers: {},
      selectedStatement: null
    });
    setGenerated(true);
    setBusy(false); setDrafting(false);
    setOpenSecs({ facets: true, qs: true, roots: true, frame: true });
  };

  const confirm = () => {
    patch(projectId, { discoveryPage: 'solution' });
  };

  const unansQs = PD_QUESTIONS.filter(q => !(s.pdAnswers || {})[q.id]).length;
  const needFrame = !s.selectedStatement;
  const canConfirm = unansQs === 0 && !needFrame;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Analyzing problem evidence and framing" skillIds={['SKL-0002']} knowledgeIds={['KNW-0001']} policyIds={['POL-0001']} />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 03 of 10</div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Problem Discovery</h1>
          <p className="text-[15px] text-slate-500 mt-1">Facets, root causes, and framing.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Problem Statement · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          <Section num="01" title="Problem aspects" summary="6 facets prefilled" open={openSecs.facets} onToggle={() => toggle('facets')}>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Current process</span>
                <span className="text-[14px] text-[#0F172A] flex-1">Claims are emailed with receipts and approved manually</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Pain points</span>
                <span className="text-[14px] text-[#0F172A] flex-1">Paper receipts get lost; Reimbursement takes weeks</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Affected users</span>
                <span className="text-[14px] text-[#0F172A] flex-1">Field sales reps, Line managers, Finance team</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Frequency</span>
                <span className="text-[14px] text-slate-500 italic flex-1">Not known yet — see questions</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Severity</span>
                <span className="text-[14px] text-[#0F172A] flex-1">Reps wait weeks for money they have spent</span>
              </div>
            </div>
          </Section>
          
          <Section num="02" title="A few questions" summary={PD_QUESTIONS.map(q => (s.pdAnswers || {})[q.id]?.value).filter(Boolean).join(' · ')} need={unansQs > 0 ? `${unansQs} to answer` : null} open={openSecs.qs} onToggle={() => toggle('qs')}>
            <div className="space-y-6 pt-2">
              {PD_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="text-[15px] font-semibold text-[#0F172A] mb-3">{q.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map(o => {
                      const v = typeof o === 'string' ? o : o.value;
                      const l = typeof o === 'string' ? o : o.label;
                      return (
                        <button 
                          key={v} 
                          onClick={() => patch(projectId, st => ({ pdAnswers: { ...(st.pdAnswers || {}), [q.id]: { value: v } } }))}
                          className={cx("px-4 py-2 rounded-full border text-[13.5px] font-semibold transition-colors cursor-pointer", (s.pdAnswers || {})[q.id]?.value === v ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300")}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section num="03" title="Root causes" summary={`${ROOT_CAUSES.length} chains identified`} open={openSecs.roots} onToggle={() => toggle('roots')}>
            <div className="space-y-3 pt-2">
              {ROOT_CAUSES.map((rc, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2"><span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest w-24 text-right">Symptom</span> <span className="text-[14.5px] font-bold text-[#0F172A]">{rc.sym}</span></div>
                  <div className="flex items-center gap-2 mb-2"><span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest w-24 text-right">Because</span> <span className="text-[14px] text-slate-700">{rc.bec}</span></div>
                  <div className="flex items-center gap-2"><span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest w-24 text-right">Root</span> <span className="text-[14px] font-semibold text-red-700">{rc.root}</span></div>
                </div>
              ))}
            </div>
          </Section>

          <Section num="04" title="Framing" summary={FRAMINGS.find(f => f.id === s.selectedStatement)?.t || ''} need={needFrame ? "Pick one" : null} open={openSecs.frame} onToggle={() => toggle('frame')}>
            <div className="space-y-3 pt-2">
              <p className="text-[12.5px] text-slate-500 mb-2">Pick the most accurate problem statement to serve as the project's “why”.</p>
              {FRAMINGS.map(f => {
                const picked = s.selectedStatement === f.id;
                return (
                  <div key={f.id} className={cx("rounded-xl border transition", picked ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-slate-300")}>
                    <button onClick={() => patch(projectId, { selectedStatement: f.id })} className={cx("w-full text-left p-4 pb-2 cursor-pointer", picked ? "text-[#1D4ED8]" : "text-[#0F172A]")}>
                      <span className="text-[15px] font-medium leading-relaxed">{f.t}</span>
                      <AnalysisChips id={f.id} />
                    </button>
                    <div className="px-4 pb-3">
                      <Button size="xs" icon={<BarChart3 className="w-3.5 h-3.5" />} onClick={() => setAnalysisId(f.id)}>View analysis</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">Problem Statement</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">Draft v0.1</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Statement</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{s.selectedStatement ? FRAMINGS.find(f => f.id === s.selectedStatement)?.t : 'Not decided'}</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Root Causes</span><ul className="text-[14.5px] text-[#0F172A] leading-snug list-disc pl-4 space-y-1">{ROOT_CAUSES.map(rc => <li key={rc.id}>{rc.root}</li>)}</ul></div>
            <div className="pt-2">
              <CSuiteValidation stageId="problem" status={canConfirm ? 'Validated' : 'Pending'} />
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
            {canConfirm ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600 text-[13.5px] font-bold mb-2"><CheckCircle2 className="w-4 h-4" /> Ready to confirm</div>
                <Button variant="primary" className="w-full text-[15px] py-2.5" onClick={onContinue}>Confirm & Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-600 text-[13.5px] font-bold mb-2">Pending decisions</div>
                <Button className="w-full text-[15px] py-2.5" disabled>Confirm Statement</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <StatementAnalysisDialog
        option={FRAMINGS.find(f => f.id === analysisId) ?? null}
        selected={!!analysisId && s.selectedStatement === analysisId}
        onClose={() => setAnalysisId(null)}
        onSelect={id => patch(projectId, { selectedStatement: id })}
      />
    </div>
  );
};
