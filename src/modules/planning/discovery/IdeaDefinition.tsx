import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { Button, Input, Textarea, cx, sleep } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { IDEA_QUESTIONS } from '../content';
import { StageResourceActivity } from './StageResourceActivity';

const DIRS = [
  { id: 'd_mobile', t: 'Mobile capture with AI receipt reading', d: 'Reps photograph receipts; AI reads amount, date and merchant and pre-fills the claim.', ai: true },
  { id: 'd_workflow', t: 'Digital approval workflow', d: 'Replace email with a tracked claim form and approval queue for managers and finance.', ai: false },
  { id: 'd_inbox', t: 'Receipt inbox by email', d: 'Reps forward receipt photos to an inbox; finance builds claims from them.', ai: false },
];
const VISIONS: Record<string, string[]> = {
  d_mobile: ['Field sales reps capture a receipt the moment they pay and their claim moves to approval without paperwork or email.', 'Every expense is captured on the phone at the point of purchase and reaches reimbursement through one tracked path.'],
  d_workflow: ['Every expense claim follows one tracked digital path from submission to manager approval to finance.', 'Claims stop living in email: reps, managers and finance work from the same queue.'],
  d_inbox: ['Reps never keep paper again: every receipt is forwarded once and finance takes it from there.', 'A single receipt inbox replaces paper and scattered email threads.'],
};

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

export const IdeaDefinition: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onContinue: () => void;
}> = ({ projectId, projectName, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ slots: true });
  const [ideaText, setIdeaText] = useState(
    s.slots?.idea?.value || 
    (s.briefConfirmed 
      ? 'Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.' 
      : '')
  );
  const [drafting, setDrafting] = useState(false);

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    patch(projectId, { 
      slots: { 
        idea: { state: 'known', value: ideaText },
        problem: { state: 'inferred', value: 'Paper receipts get lost. Reimbursement takes weeks.' },
        intended_users: { state: 'inferred', value: 'Field sales reps' },
        intended_outcome: { state: 'inferred', value: 'Claims approved faster' },
        context: { state: 'missing', value: '' },
        use_cases: { state: 'missing', value: '' },
        affected_stakeholders: { state: 'missing', value: '' },
        handled_today: { state: 'inferred', value: 'Claims are handled through email and approved manually.' },
        main_drivers: { state: 'missing', value: '' },
        success_signal: { state: 'missing', value: '' },
        constraints: { state: 'missing', value: '' },
      },
      answers: {},
      analyzed: true,
    });
    setBusy(false); setDrafting(false);
    setOpenSecs({ slots: true, qs: true, dir: true });
  };

  const confirm = () => {
    patch(projectId, { briefConfirmed: true, discoveryPage: 'opportunity' });
    onContinue();
  };

  if (!s.briefConfirmed && !s.slots?.idea?.value && !drafting) {
    return (
      <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Idea Definition</h1>
            <p className="text-[15px] text-slate-500 mt-1">Capture the initial business idea and context to create a reviewable Idea Brief.</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center">
          <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-[19px] font-bold text-[#0F172A] mb-1">What's the idea?</h2>
            <p className="text-[14.5px] text-slate-500 mb-6">Plain words are fine. Add a document if you have one — facts from it are tagged "From your document".</p>
            
            <Textarea 
              rows={5} 
              value={ideaText} 
              onChange={e => setIdeaText(e.target.value)} 
              placeholder="e.g. Our field sales reps lose paper receipts…" 
              className="mb-2 text-[15px] w-full border-slate-200 focus:border-[#2563EB]"
            />
            {ideaText.length < 12 && (
              <button 
                type="button"
                className="text-[13.5px] font-bold text-[#2563EB] hover:underline mb-8 cursor-pointer" 
                onClick={() => setIdeaText('Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.')}
              >
                Use the expense-claims example
              </button>
            )}
            {ideaText.length >= 12 && <div className="mb-8"></div>}

            <div className="flex items-center gap-4">
              <Button 
                variant="primary" 
                icon={<Sparkles className="w-4 h-4" />} 
                onClick={generate} 
                disabled={ideaText.length < 12} 
                className="px-6 py-2.5 text-[15px]"
              >
                Understand my idea
              </Button>
              {ideaText.length < 12 && <span className="text-[14.5px] text-slate-500">Write a sentence or two first</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (drafting) {
    return (
      <div className="h-full bg-slate-50/60 flex items-center justify-center text-center p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">Understand my idea…</h2>
          <p className="text-slate-500">Simulated AI step — deterministic output, no invented figures.</p>
          <StageResourceActivity active={drafting} activity="Structuring your idea brief" skillIds={['SKL-0002']} knowledgeIds={['KNW-0001']} policyIds={['POL-0001']} />
        </div>
      </div>
    );
  }

  const canConfirm = (s.slots?.idea?.value || ideaText).trim().length >= 12;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 01 of 10</div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Idea Understanding</h1>
          <p className="text-[15px] text-slate-500 mt-1">Turn the raw idea and notes into a clear Idea Brief.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Idea Brief · {s.briefConfirmed ? 'v1.0' : 'Draft v0.1'}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Workspace */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          <Section num="01" title="What we understood" summary="11 brief slots · 2 AI-inferred to check" open={openSecs.slots} onToggle={() => toggle('slots')}>
            <div className="flex justify-between items-center text-[12.5px] mb-6">
              <span className="text-slate-500">Click any line to edit. Hover an origin tag to see the quote.</span>
              <button className="text-[#2563EB] font-bold hover:underline">Accept all AI-inferred lines</button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Idea</h4>
                <div className="text-[14.5px] text-[#0F172A]">{s.slots?.idea?.value || ideaText}</div>
                <div className="mt-1"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase tracking-wider">From your idea</span></div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Problem</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Paper receipts get lost</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase tracking-wider">From your idea</span></div>
                  </div>
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Reimbursement takes weeks</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase tracking-wider">From your idea</span></div>
                  </div>
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Claims are handled through email and approved manually</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase tracking-wider">From your idea</span></div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Intended Users</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Field sales reps</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase tracking-wider">From your idea</span></div>
                  </div>
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Approvers (who approves is not stated)</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[11px] font-bold uppercase tracking-wider">AI Inferred</span></div>
                  </div>
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Finance team</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[11px] font-bold uppercase tracking-wider">AI Inferred</span></div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Intended Outcome</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">Claims approved faster</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold uppercase tracking-wider">From your idea</span></div>
                  </div>
                  <div>
                    <div className="text-[14.5px] text-[#0F172A]">No receipts lost between purchase and claim</div>
                    <div className="mt-1"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[11px] font-bold uppercase tracking-wider">AI Inferred</span></div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
          
          <Section num="02" title="A few questions" summary={IDEA_QUESTIONS.map(q => (s.answers || {})[q.id]?.value).filter(Boolean).join(' · ')} open={openSecs.qs} onToggle={() => toggle('qs')}>
            <div className="space-y-6 pt-2">
              {IDEA_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="text-[15px] font-semibold text-[#0F172A] mb-3">{q.text}</p>
                  
                  {q.type === 'long_text' || q.type === 'short_text' ? (
                    q.type === 'long_text' ? (
                      <Textarea 
                         value={((s.answers || {})[q.id]?.value as string) || ''}
                         onChange={e => patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: e.target.value } } }))}
                         placeholder="Type your answer..."
                      />
                    ) : (
                      <Input 
                         value={((s.answers || {})[q.id]?.value as string) || ''}
                         onChange={e => patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: e.target.value } } }))}
                         placeholder="Type your answer..."
                      />
                    )
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map(o => {
                        const v = typeof o === 'string' ? o : o.value;
                        const l = typeof o === 'string' ? o : o.label;
                        const isMulti = q.type === 'multi_select';
                        const current = (s.answers || {})[q.id]?.value;
                        const isSelected = isMulti ? (Array.isArray(current) && current.includes(v)) : current === v;
                        
                        return (
                          <button 
                            key={v} 
                            onClick={() => {
                              if (isMulti) {
                                const arr = Array.isArray(current) ? current : [];
                                const next = arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
                                patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: next } } }));
                              } else {
                                patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: v } } }));
                              }
                            }}
                            className={cx("px-4 py-2 rounded-full border text-[13.5px] font-semibold transition-colors cursor-pointer", isSelected ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300")}
                          >
                            {l} {(Array.isArray(q.suggested) ? q.suggested.includes(v) : v === q.suggested) && <span className="ml-1 text-[11px] uppercase tracking-wider opacity-70">Suggested</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#0F172A]">Idea Brief</h3>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[11px] font-bold uppercase tracking-widest">
              {s.briefConfirmed ? 'v1.0' : 'Draft v0.1'}
            </span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Idea</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">{s.slots?.idea?.value || ideaText}</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Problem</span>
              <ul className="text-[13.5px] text-[#0F172A] list-disc pl-4 space-y-1">
                <li>Paper receipts get lost</li>
                <li>Reimbursement takes weeks</li>
                <li>Claims are handled through email and approved manually</li>
              </ul>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Intended Users</span>
              <ul className="text-[13.5px] text-[#0F172A] list-disc pl-4 space-y-1">
                <li>Field sales reps</li>
                <li>Approvers (who approves is not stated)</li>
                <li>Finance team</li>
              </ul>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Intended Outcome</span>
              <ul className="text-[13.5px] text-[#0F172A] list-disc pl-4 space-y-1">
                <li>Claims approved faster</li>
                <li>No receipts lost between purchase and claim</li>
                <li>Approval speed: Measure today first</li>
              </ul>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Context</span>
              <ul className="text-[13.5px] text-[#0F172A] list-disc pl-4 space-y-1">
                <li>Approval process — Not provided</li>
              </ul>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Use Cases</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">Capture a receipt on a phone and submit an expense claim.</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Affected Stakeholders</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">Approvers and the finance team.</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Handled Today</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">Claims are submitted by email and approved manually.</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Main Drivers</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">Reduce lost receipts and reimbursement delays.</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Success Signal</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">Claims are approved faster and fewer receipts are lost.</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Constraints</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">Not provided.</p>
            </div>
            <div>
              <span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Direction</span>
              <p className="text-[13.5px] text-[#0F172A] leading-snug">{DIRS.find(d => d.id === s.selectedDirection)?.t || 'Mobile capture with AI receipt reading'}</p>
            </div>
          </div>
          <div className="p-5 border-t border-slate-200">
            {s.briefConfirmed ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600 text-[12.5px] font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4" /> Brief Confirmed
                </div>
                <Button 
                  variant="primary" 
                  className="w-full text-[15px] py-2.5 cursor-pointer" 
                  onClick={() => {
                    patch(projectId, { discoveryPage: 'opportunity' });
                    onContinue();
                  }}
                >
                  Continue to Opportunity <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </>
            ) : canConfirm ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600 text-[12.5px] font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4" /> Everything decided — ready to confirm
                </div>
                <Button 
                  variant="primary" 
                  className="w-full text-[15px] py-2.5 bg-[#16A34A] hover:bg-[#15803D] border-[#16A34A] cursor-pointer" 
                  onClick={confirm}
                >
                  Confirm Idea Brief
                </Button>
              </>
            ) : (
              <Button className="w-full text-[15px] py-2.5" disabled>
                Confirm Idea Brief
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
