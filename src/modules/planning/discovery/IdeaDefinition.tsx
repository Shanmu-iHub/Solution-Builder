import React, { useState } from 'react';
import { 
  ArrowRight, Check, CheckCircle2, ChevronDown, ChevronRight, 
  Lightbulb, Sparkles, FileText, Bot, HelpCircle
} from 'lucide-react';
import { Button, Input, Textarea, cx, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { IDEA_QUESTIONS } from '../content';
import { StageResourceActivity } from './StageResourceActivity';
import { CSuiteGovernanceBar } from '../executive/CSuiteGovernanceBar';

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

const SAMPLE_PRESETS = [
  {
    title: 'Customer Support AI',
    desc: 'Automate tier-1 customer inquiries, ticket triage, and automated resolution with human escalation.',
    prompt: 'An AI customer support platform for a regional telecom that helps customers get answers 10x faster and reduces support staff workload by 40% through automated triage and resolution.'
  },
  {
    title: 'Expense Claims Automation',
    desc: 'Mobile photo receipt capture, automated OCR extraction, policy guardrails, and one-click approvals.',
    prompt: 'Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.'
  },
  {
    title: 'IT Service Desk AI',
    desc: 'Resolve internal employee IT tickets, password resets, hardware requests, and software provisioning.',
    prompt: 'An enterprise IT service desk bot that integrates with Slack and Okta to handle automated software provisioning, password resets, and hardware logistics without manual IT admin intervention.'
  }
];

const Section: React.FC<{
  num: string; title: string; summary: string; need?: string | null; open: boolean;
  onToggle: () => void; children: React.ReactNode;
}> = ({ num, title, summary, need, open, onToggle, children }) => (
  <div className={cx('border border-slate-200 bg-white rounded-xl overflow-hidden transition-all duration-200', open ? 'shadow-xs' : 'hover:border-slate-300')}>
    <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer text-left bg-white">
      <span className="text-[13px] font-bold text-slate-400 font-mono">{num}</span>
      <span className="text-[14.5px] font-bold text-slate-900">{title}</span>
      {need && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[11px] font-bold tracking-wide uppercase">{need}</span>}
      <span className="flex-1 min-w-0 text-[13px] text-slate-500 truncate ml-2">{summary}</span>
      <span className="text-slate-400">{open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
    </button>
    {open && <div className="px-5 pb-5 pt-1 border-t border-slate-100">{children}</div>}
  </div>
);

export const IdeaDefinition: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onContinue: () => void;
  onOpenExecutivePanel?: () => void;
}> = ({ projectId, projectName, onContinue, onOpenExecutivePanel }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ slots: true });
  const [ideaText, setIdeaText] = useState(
    s.slots?.idea?.value || 
    (projectName.toLowerCase().includes('support') 
      ? 'An AI customer support platform for a regional telecom that helps customers get answers faster and reduces support staff workload through automated triage.'
      : 'Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.')
  );
  const [drafting, setDrafting] = useState(false);

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(1500);
    patch(projectId, { 
      slots: { 
        idea: { state: 'known', value: ideaText },
        problem: { state: 'inferred', value: 'Manual handling causes delays, high error rates, and staff fatigue.' },
        intended_users: { state: 'inferred', value: 'Customer service agents, operations leads, and customers.' },
        intended_outcome: { state: 'inferred', value: 'Instant query response and 40% reduction in resolution cycle time.' },
        context: { state: 'missing', value: '' },
        use_cases: { state: 'missing', value: '' },
        affected_stakeholders: { state: 'missing', value: '' },
        handled_today: { state: 'inferred', value: 'Fragmented tickets handled across email, spreadsheets, and legacy portals.' },
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

  // 1. Initial State before generating idea brief
  if (!s.briefConfirmed && !s.slots?.idea?.value && !drafting) {
    return (
      <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                Phase 01 of 08 • Strategic Foundation
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Idea Definition</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Articulate the core problem, user mandate, and business vision to initialize the solution architecture.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
              Status: Draft Vision
            </span>
          </div>
        </div>

        {/* 12 C-Suite Executives Governance Bar (Scores Alone & Inspector) */}
        <div className="px-8 pt-4 pb-2 shrink-0">
          <CSuiteGovernanceBar 
            page="idea" 
            onOpenFullPanel={onOpenExecutivePanel} 
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Input Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">What is the core idea?</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Express the business challenge in plain words. AI will synthesize the structured architecture brief.
                  </p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-slate-400">
                  {ideaText.length} characters
                </span>
              </div>
              
              <Textarea 
                rows={4} 
                value={ideaText} 
                onChange={e => setIdeaText(e.target.value)} 
                placeholder="Describe what problem you want to solve, who the users are, and the desired business outcome..." 
                className="mb-3 text-sm w-full border-slate-200 focus:border-indigo-600 rounded-xl leading-relaxed"
              />

              {/* Sample Presets */}
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Or load an enterprise template:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {SAMPLE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIdeaText(preset.prompt)}
                      className="text-left p-3 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 mb-0.5">
                        {preset.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {preset.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Bot className="w-4 h-4 text-indigo-600" />
                  <span>Synthesizes 11 architecture slots & initializes 12 C-Suite reviews</span>
                </div>

                <Button 
                  variant="primary" 
                  icon={<Sparkles className="w-4 h-4" />} 
                  onClick={generate} 
                  disabled={ideaText.length < 12 || busy} 
                  className="px-6 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Synthesize Idea Brief
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Drafting State
  if (drafting) {
    return (
      <div className="h-full bg-slate-50/60 flex items-center justify-center text-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Synthesizing Enterprise Idea Brief…</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Extracting problem boundaries, stakeholder roles, and aligning criteria with the 12 C-Suite governance board.
          </p>
          <StageResourceActivity 
            active={drafting} 
            activity="Structuring your idea brief" 
            skillIds={['SKL-0002']} 
            knowledgeIds={['KNW-0001']} 
            policyIds={['POL-0001']} 
          />
        </div>
      </div>
    );
  }

  const canConfirm = (s.slots?.idea?.value || ideaText).trim().length >= 12;

  // 3. Drafted & Reviewable Idea Brief
  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
              Phase 01 of 08 • Strategic Foundation
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Idea Understanding</h1>
          <p className="text-xs text-slate-500">
            Synthesized enterprise vision ready for C-Suite validation and transition to market discovery.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
            Idea Brief · {s.briefConfirmed ? 'v1.0 (Approved)' : 'Draft v0.1'}
          </span>
        </div>
      </div>

      {/* 12 C-Suite Executives Governance Bar */}
      <div className="px-8 pt-3 pb-1 shrink-0">
        <CSuiteGovernanceBar 
          page="idea" 
          onOpenFullPanel={onOpenExecutivePanel} 
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Workspace Main Column */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          <Section num="01" title="What was synthesized" summary="11 brief slots · Inferred from enterprise mandate" open={openSecs.slots} onToggle={() => toggle('slots')}>
            <div className="flex justify-between items-center text-xs mb-4">
              <span className="text-slate-500">Review synthesized points below. All entries are mapped to C-Suite criteria.</span>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Executive Core Idea</h4>
                <div className="text-sm font-semibold text-slate-900">{s.slots?.idea?.value || ideaText}</div>
                <div className="mt-1"><span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-wider">Enterprise Vision</span></div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Problem Context</h4>
                <div className="space-y-2 text-xs text-slate-800">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <span>Manual customer handling creates long resolution delays and team fatigue.</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">Synthesized</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <span>Tickets handled in fragmented systems without unified context or instant triage.</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">Synthesized</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Stakeholders</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-700">
                    Frontline Customer Support
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-700">
                    Operations & Triage Leads
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-700">
                    Enterprise End Customers
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Business Outcome</h4>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 font-medium">
                  Direct resolution time reduction by 40% with automated triage and 99.9% uptime SLA compliance.
                </div>
              </div>
            </div>
          </Section>
          
          <Section num="02" title="Discovery Scoping Questions" summary={IDEA_QUESTIONS.map(q => (s.answers || {})[q.id]?.value).filter(Boolean).join(' · ')} open={openSecs.qs} onToggle={() => toggle('qs')}>
            <div className="space-y-5 pt-2">
              {IDEA_QUESTIONS.map(q => (
                <div key={q.id}>
                  <p className="text-xs font-bold text-slate-800 mb-2">{q.text}</p>
                  
                  {q.type === 'long_text' || q.type === 'short_text' ? (
                    q.type === 'long_text' ? (
                      <Textarea 
                        value={((s.answers || {})[q.id]?.value as string) || ''}
                        onChange={e => patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: e.target.value } } }))}
                        placeholder="Type answer..."
                        rows={2}
                        className="text-xs"
                      />
                    ) : (
                      <Input 
                        value={((s.answers || {})[q.id]?.value as string) || ''}
                        onChange={e => patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: e.target.value } } }))}
                        placeholder="Type answer..."
                        className="text-xs"
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
                            type="button"
                            onClick={() => {
                              if (isMulti) {
                                const arr = Array.isArray(current) ? current : [];
                                const next = arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
                                patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: next } } }));
                              } else {
                                patch(projectId, st => ({ answers: { ...(st.answers || {}), [q.id]: { value: v } } }));
                              }
                            }}
                            className={cx(
                              "px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer", 
                              isSelected ? "bg-indigo-600 text-white border-indigo-600 shadow-xs" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            )}
                          >
                            {l} {(Array.isArray(q.suggested) ? q.suggested.includes(v) : v === q.suggested) && <span className="ml-1 text-[10px] uppercase opacity-70">Suggested</span>}
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

        {/* Side Panel: Structured Idea Brief */}
        <div className="w-[360px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Idea Brief Summary</h3>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold uppercase tracking-wider">
              {s.briefConfirmed ? 'Approved' : 'Ready'}
            </span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Enterprise Idea</span>
              <p className="text-slate-800 leading-relaxed font-medium">{s.slots?.idea?.value || ideaText}</p>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Identified Pain Points</span>
              <ul className="text-slate-700 list-disc pl-4 space-y-1">
                <li>Ticket backlogs and long wait queues</li>
                <li>Manual repetitive inquiry responses</li>
                <li>Disconnected customer history</li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Validated C-Suite Quorum</span>
              <p className="text-slate-600 leading-relaxed">
                All 12 C-Suite executives review this brief. You can inspect individual evaluations using the Governance Bar above.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50">
            {s.briefConfirmed ? (
              <>
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Phase 01 Validated by Executive Quorum</span>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full text-xs font-bold py-2 bg-indigo-600 hover:bg-indigo-700" 
                  onClick={() => {
                    patch(projectId, { discoveryPage: 'opportunity' });
                    onContinue();
                  }}
                >
                  Continue to Phase 02 (Opportunity) <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </>
            ) : canConfirm ? (
              <>
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ready for Phase Confirmation</span>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full text-xs font-bold py-2 bg-emerald-600 hover:bg-emerald-700 border-emerald-600" 
                  onClick={confirm}
                >
                  Confirm Idea Brief & Continue <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </>
            ) : (
              <Button className="w-full text-xs font-bold py-2" disabled>
                Complete Brief to Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
