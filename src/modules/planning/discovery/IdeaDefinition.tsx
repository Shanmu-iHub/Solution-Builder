import React, { useState } from 'react';
import { 
  ArrowRight, Check, CheckCircle2, ChevronRight, ChevronLeft, 
  Sparkles, FileText, AlertTriangle, ShieldCheck, Edit3, HelpCircle, 
  Loader2, RefreshCw
} from 'lucide-react';
import { Button, Input, Textarea, cx, sleep } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { StageResourceActivity } from './StageResourceActivity';

interface ClarifyQuestion {
  id: string;
  slot: string;
  title: string;
  why: string;
  type: 'single_select' | 'multi_select' | 'text';
  options?: { value: string; label: string }[];
  suggested?: string | string[];
}

const CLARIFY_QUESTIONS: ClarifyQuestion[] = [
  {
    id: 'cq_users',
    slot: 'intended_users',
    title: 'Who will use this solution most often?',
    why: 'Knowing the primary users shapes every downstream workflow and UX pattern.',
    type: 'multi_select',
    options: [
      { value: 'reps', label: 'Field sales representatives' },
      { value: 'managers', label: 'Line managers (approvers)' },
      { value: 'finance', label: 'Finance and accounting team' },
      { value: 'ops', label: 'Sales operations / admins' }
    ],
    suggested: ['reps', 'managers']
  },
  {
    id: 'cq_outcome',
    slot: 'intended_outcome',
    title: 'What outcome matters most in the first 6 months?',
    why: 'This defines the quantifiable success metric for the MVP release.',
    type: 'single_select',
    options: [
      { value: 'speed', label: 'Faster claim approval and reimbursement (<48 hours)' },
      { value: 'loss', label: 'Zero lost receipts and reduced disputes' },
      { value: 'labor', label: '40% reduction in manual finance review time' },
      { value: 'compliance', label: 'Better policy adherence and audit trails' }
    ],
    suggested: 'speed'
  },
  {
    id: 'cq_today',
    slot: 'handled_today',
    title: 'How is this process handled today?',
    why: 'Understanding the existing process reveals the core friction and operational baseline.',
    type: 'single_select',
    options: [
      { value: 'manual', label: 'Manually, with paper receipts and email threads' },
      { value: 'spreadsheets', label: 'Spreadsheets sent to line managers each month' },
      { value: 'disconnected', label: 'Multiple disconnected portals with no tracking' },
      { value: 'none', label: 'No structured workflow currently exists' }
    ],
    suggested: 'manual'
  },
  {
    id: 'cq_usecase',
    slot: 'use_cases',
    title: 'What is the single most critical use case for day 1?',
    why: 'One concrete end-to-end scenario ensures the first release remains focused and impactful.',
    type: 'text',
    suggested: 'Field rep snaps a receipt photo on mobile; AI extracts merchant, amount, and tax; manager gets 1-click Slack/email approval.'
  }
];

export const IdeaDefinition: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onContinue: () => void;
}> = ({ projectId, projectName, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

  // Progressive Transformation States: 'understand' (State A) -> 'clarify' (State B) -> 'brief' (State C)
  const initialStage = s.briefConfirmed 
    ? 'brief' 
    : s.slots?.idea?.value 
    ? 'clarify' 
    : 'understand';

  const [stage, setStage] = useState<'understand' | 'clarify' | 'brief'>(initialStage);
  
  // State A inputs
  const [ideaText, setIdeaText] = useState(
    s.slots?.idea?.value || 
    'Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.'
  );

  // Loading/Transition states
  const [understandingLoading, setUnderstandingLoading] = useState(false);
  const [generatingBriefLoading, setGeneratingBriefLoading] = useState(false);

  // State B (Clarify interview) state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    CLARIFY_QUESTIONS.forEach(q => {
      initial[q.id] = (s.answers || {})[q.id]?.value ?? q.suggested;
    });
    return initial;
  });

  // Handle State A -> State B
  const handleUnderstandIdea = async () => {
    setUnderstandingLoading(true);
    await sleep(1400);

    patch(projectId, {
      slots: {
        idea: { state: 'known', value: ideaText },
        problem: { state: 'inferred', value: 'Paper receipts get lost and claims are delayed in manual email chains.' },
        intended_users: { state: 'inferred', value: 'Field sales reps, line managers, and finance team' },
        intended_outcome: { state: 'inferred', value: 'Faster expense approval and zero lost receipts' },
        context: { state: 'missing', value: '' },
        use_cases: { state: 'missing', value: '' },
        affected_stakeholders: { state: 'missing', value: '' },
        handled_today: { state: 'inferred', value: 'Claims are submitted via email and reviewed manually.' },
        main_drivers: { state: 'missing', value: '' },
        success_signal: { state: 'missing', value: '' },
        constraints: { state: 'missing', value: '' },
      },
      analyzed: true,
    });

    setUnderstandingLoading(false);
    setStage('clarify');
  };

  // Handle answering question in State B
  const handleAnswer = (qId: string, val: any) => {
    const updated = { ...answers, [qId]: val };
    setAnswers(updated);
    patch(projectId, st => ({
      answers: { ...(st.answers || {}), [qId]: { value: val } }
    }));
  };

  // Handle State B -> State C
  const handleGenerateBrief = async () => {
    setGeneratingBriefLoading(true);
    await sleep(1600);
    setGeneratingBriefLoading(false);
    setStage('brief');
  };

  // Confirm Idea Brief and proceed to Phase 02 (Opportunity)
  const handleConfirm = () => {
    patch(projectId, { 
      briefConfirmed: true, 
      discoveryPage: 'opportunity',
      selectedDirection: 'd_mobile'
    });
    onContinue();
  };

  // =========================================================================
  // STATE A — INITIAL UNDERSTAND (Clean, focused card)
  // =========================================================================
  if (stage === 'understand') {
    return (
      <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Phase 01 · Solution Definition
            </div>
            <h1 className="text-xl font-bold text-[#0F172A]">Idea Definition</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Turn your raw business idea into a validated, reviewable Idea Brief.
            </p>
          </div>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
            State 1 of 3 · Understand
          </span>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex items-start justify-center">
          <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">
              Start with your idea
            </h2>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Describe the problem you are solving, who experiences it, and what outcome you want. Plain words are fine.
            </p>

            <Textarea 
              rows={5} 
              value={ideaText} 
              onChange={e => setIdeaText(e.target.value)} 
              placeholder="e.g. Our field sales reps lose paper receipts and wait weeks for expense reimbursement..." 
              className="mb-2 text-sm w-full border-slate-200 focus:border-blue-600 rounded-xl leading-relaxed"
            />

            {ideaText.length < 12 && (
              <button 
                type="button"
                className="text-xs font-bold text-blue-600 hover:underline mb-6 cursor-pointer block" 
                onClick={() => setIdeaText('Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.')}
              >
                Use the expense-claims example
              </button>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-5">
              <span className="text-[11px] text-slate-400">
                {ideaText.trim().length} characters
              </span>

              <Button 
                variant="primary" 
                icon={understandingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} 
                onClick={handleUnderstandIdea} 
                disabled={ideaText.trim().length < 12 || understandingLoading} 
                className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer"
              >
                {understandingLoading ? 'Analyzing idea...' : 'Understand my idea'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE B — CLARIFY (Center: "What We Understand", Right: Clarification Interview)
  // =========================================================================
  if (stage === 'clarify') {
    if (generatingBriefLoading) {
      return (
        <div className="h-full bg-slate-50/60 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Synthesizing Idea Brief…</h2>
            <div className="space-y-2 text-left text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" /> Original idea analyzed
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" /> Context & semantic boundaries extracted
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" /> Clarifications incorporated
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating structured document...
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = CLARIFY_QUESTIONS[currentQuestionIndex];
    const answeredCount = CLARIFY_QUESTIONS.filter(q => !!answers[q.id]).length;
    const allAnswered = answeredCount === CLARIFY_QUESTIONS.length;

    return (
      <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white shrink-0">
          <div>

            <h1 className="text-xl font-bold text-[#0F172A]">Idea Definition</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              We extracted initial context from your idea. Complete clarifications to generate the formal Idea Brief.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStage('understand')}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              ← Edit Idea
            </button>

          </div>
        </div>

        {/* Two-Column Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left/Center: WHAT WE UNDERSTAND (Semantic Blocks) */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                What We Understand So Far
              </span>
              <span className="text-xs text-slate-500">
                Extracted from your input
              </span>
            </div>

            {/* Block 1: IDEA */}
            <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Idea
                </span>

              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {s.slots?.idea?.value || ideaText}
              </p>
            </div>

            {/* Block 2: CURRENT PROBLEM */}
            <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Current Problem
                </span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 pl-1">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>Paper receipts get lost between point-of-sale and claim filing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>Reimbursement takes weeks due to manual routing delays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>Claims are handled through email and approved manually</span>
                </li>
              </ul>
            </div>

            {/* Block 3: PEOPLE INVOLVED (With Provenance) */}
            <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  People Involved
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  3 stakeholder groups
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">Field sales representatives</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">Finance and accounting team</span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                    ✦ AI inferred · 78%
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">Line managers &amp; approvers</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    ? Needs clarification
                  </span>
                </div>
              </div>
            </div>

            {/* Block 4: CURRENT PROCESS */}
            <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Current Process
                </span>

              </div>
              <p className="text-xs text-slate-700">
                Claims are handled through email and approved manually with high friction and lack of status visibility.
              </p>
            </div>

            {/* Block 5: DESIRED OUTCOME */}
            <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Desired Outcome
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  ✦ AI inferred
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Faster approval cycles, zero lost paper receipts, and streamlined mobile capture for road staff.
              </p>
            </div>
          </div>

          {/* Right Column: CLARIFY THE IDEA (Interactive Interview) */}
          <div className="w-[420px] bg-white border-l border-slate-200 flex flex-col shrink-0">
            {/* Interview Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Clarification Required
                </h3>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {CLARIFY_QUESTIONS.length - answeredCount === 0 
                    ? 'All answered' 
                    : `${CLARIFY_QUESTIONS.length - answeredCount} details remaining`}
                </span>
              </div>


              {/* Progress Stepper Dots */}
              <div className="flex items-center gap-1.5 mt-3">
                {CLARIFY_QUESTIONS.map((q, idx) => {
                  const isDone = !!answers[q.id];
                  const isCurrent = idx === currentQuestionIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={cx(
                        "flex-1 h-1.5 rounded-full transition-all cursor-pointer",
                        isCurrent ? "bg-blue-600" : isDone ? "bg-emerald-500" : "bg-slate-200"
                      )}
                      title={`Question ${idx + 1}: ${q.title}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Active Question Box */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <span>Question {currentQuestionIndex + 1} of {CLARIFY_QUESTIONS.length}</span>
                  {answers[currentQ.id] && (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Answered
                    </span>
                  )}
                </div>

                <h4 className="text-[15px] font-bold text-slate-900 leading-snug mb-1">
                  {currentQ.title}
                </h4>

              </div>

              {/* Question Inputs */}
              <div className="pt-2">
                {currentQ.type === 'single_select' && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map(opt => {
                      const selected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswer(currentQ.id, opt.value)}
                          className={cx(
                            "w-full text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between",
                            selected 
                              ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs" 
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <span>{opt.label}</span>
                          <span className={cx(
                            "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2",
                            selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                          )}>
                            {selected && <Check className="w-2.5 h-2.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQ.type === 'multi_select' && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map(opt => {
                      const currentVals = Array.isArray(answers[currentQ.id]) ? answers[currentQ.id] : [];
                      const selected = currentVals.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            const nextVals = selected 
                              ? currentVals.filter((v: string) => v !== opt.value) 
                              : [...currentVals, opt.value];
                            handleAnswer(currentQ.id, nextVals);
                          }}
                          className={cx(
                            "w-full text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between",
                            selected 
                              ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs" 
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <span>{opt.label}</span>
                          <span className={cx(
                            "w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-2",
                            selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                          )}>
                            {selected && <Check className="w-2.5 h-2.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQ.type === 'text' && (
                  <div>
                    <Textarea
                      rows={4}
                      value={answers[currentQ.id] || ''}
                      onChange={e => handleAnswer(currentQ.id, e.target.value)}
                      placeholder="Type details..."
                      className="text-xs leading-relaxed"
                    />
                  </div>
                )}
              </div>

              {/* Navigation between questions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>

                {currentQuestionIndex < CLARIFY_QUESTIONS.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(CLARIFY_QUESTIONS.length - 1, prev + 1))}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
                  >
                    Next Question <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All questions reached
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Panel Action: Generate Idea Brief */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500 font-medium">Clarification status</span>
                <span className="font-bold text-slate-800">{answeredCount} of {CLARIFY_QUESTIONS.length} resolved</span>
              </div>

              <Button
                variant="primary"
                className="w-full text-xs font-bold py-2.5 bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                onClick={handleGenerateBrief}
                disabled={generatingBriefLoading}
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Idea Brief</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE C — IDEA BRIEF DOCUMENT & REVIEW (Center: Document, Right: Review)
  // =========================================================================
  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
            Phase 01 · Final Document Review
          </div>
          <h1 className="text-xl font-bold text-[#0F172A]">Idea Brief Document</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidated business brief generated from your idea and clarifications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setStage('clarify')}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            ← Revise Clarifications
          </button>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> State 3 of 3 · Review
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Center: THE RICH IDEA BRIEF DOCUMENT */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
            {/* Document Header */}
            <div className="border-b border-slate-100 pb-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Solution Definition Brief · v0.1
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Mobile Receipt Capture &amp; Expense Approval Automation
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Authored via AI Progressive Synthesis · Ready for Executive Quorum Validation
              </p>
            </div>

            {/* Section 1: Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Executive Summary
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed font-normal bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                Field sales representatives currently lose paper receipts and experience multi-week reimbursement delays because expense claims are submitted over fragmented email chains and approved manually. This solution introduces a mobile-first companion enabling immediate optical receipt capture, automated policy validation, and one-click manager sign-off.
              </p>
            </div>

            {/* Section 2: Core Problem & Root Friction */}
            <div className="space-y-2 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Problem Context &amp; Root Causes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="font-bold text-slate-900 mb-0.5">Receipt Leakage</div>
                  <div className="text-slate-600 leading-relaxed">Paper receipts exist only in physical form until claim time, causing lost documentation.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="font-bold text-slate-900 mb-0.5">Approval Latency</div>
                  <div className="text-slate-600 leading-relaxed">Claims sit idle in managers’ email inboxes without SLA reminders or queue tracking.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="font-bold text-slate-900 mb-0.5">Manual Re-entry</div>
                  <div className="text-slate-600 leading-relaxed">Finance re-keys claim data manually, generating avoidable transcription errors.</div>
                </div>
              </div>
            </div>

            {/* Section 3: Target Users & Stakeholders */}
            <div className="space-y-2 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Intended Users &amp; Stakeholder Hierarchy
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10.5px]">Primary User</span>
                  <div>
                    <div className="font-bold text-slate-900">Field Sales Representatives</div>
                    <div className="text-slate-600 mt-0.5">Need instant mobile capture at point of purchase and real-time claim status tracking.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-bold rounded text-[10.5px]">Approver</span>
                  <div>
                    <div className="font-bold text-slate-900">Line Managers</div>
                    <div className="text-slate-600 mt-0.5">Need a unified queue to approve claims with zero email chasing.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-bold rounded text-[10.5px]">Auditor</span>
                  <div>
                    <div className="font-bold text-slate-900">Finance &amp; Accounting Team</div>
                    <div className="text-slate-600 mt-0.5">Need policy-compliant exports into ERP without manual reconciliation.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Target Outcomes & KPIs */}
            <div className="space-y-2 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                4. Target Outcomes &amp; Success Signals
              </h3>
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs space-y-1.5 text-emerald-950 font-medium">
                <div>• Reduce average reimbursement cycle time from 21 days down to under 48 hours.</div>
                <div>• Eliminate paper receipt losses through immediate photo-to-cloud extraction.</div>
                <div>• Save 40% of line manager and finance staff review hours per expense cycle.</div>
              </div>
            </div>

            {/* Section 5: Strategic Direction */}
            <div className="space-y-2 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                5. Selected Direction &amp; Vision
              </h3>
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/80 text-xs text-blue-950 font-medium">
                <span className="font-bold">Mobile capture with AI receipt reading: </span>
                Reps photograph receipts the moment they pay; AI extracts amount, date, and merchant. The claim moves seamlessly into an automated approval queue without paperwork or email.
              </div>
            </div>
          </div>
        </div>

        {/* Right: REVIEW & DECISION PANEL */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Review &amp; Decision
              </h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold uppercase tracking-wider">
                {s.briefConfirmed ? 'Approved' : 'Draft v0.1'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Validation summary before advancing to Opportunity Discovery.
            </p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs">
            {/* Fact Verification */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Verification Metrics
              </span>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-emerald-800 font-semibold">
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Confirmed facts</span>
                  <span className="font-mono">8 confirmed</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Explicit assumptions</span>
                  <span className="font-mono">2 assumptions</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-blue-500" /> Open questions</span>
                  <span className="font-mono">0 remaining</span>
                </div>
              </div>
            </div>




          </div>

          {/* Decision Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50/70">
            {s.briefConfirmed ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Idea Brief Confirmed · Phase 01 Completed</span>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full text-xs font-bold py-2.5 bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-xs" 
                  onClick={onContinue}
                >
                  Continue to Opportunity <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <Button 
                  variant="primary" 
                  className="w-full text-xs font-bold py-2.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-xs cursor-pointer flex items-center justify-center gap-1.5" 
                  onClick={handleConfirm}
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Idea Brief</span>
                </Button>
                <p className="text-[11px] text-slate-400 text-center">
                  Confirms Phase 01 and unlocks Phase 02 (Opportunity &amp; Market).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
