import React, { useState } from 'react';
import { 
  ArrowRight, BarChart3, Check, CheckCircle2, ChevronDown, ChevronRight, 
  ChevronLeft, Sparkles, Loader2, AlertCircle, Layers, GitBranch, Cpu, Network
} from 'lucide-react';
import { Button, cx, sleep } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { PD_QUESTIONS } from '../content';
import { AnalysisChips, StatementAnalysisDialog } from './ProblemStatementAnalysis';

const ROOT_CAUSES_BY_ASPECT = [
  {
    id: 'rc_process',
    aspect: 'Process Aspect',
    tag: 'Workflow & SLA Lag',
    dimensionNumber: '01',
    icon: GitBranch,
    theme: {
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      iconBg: 'bg-blue-100 text-blue-700',
      border: 'border-slate-200 hover:border-blue-300',
    },
    sym: 'Reimbursement turnaround takes weeks',
    symDetail: 'Field staff wait 14–28 days for basic expense settlements.',
    bec: "Claims sit stalled in managers' email inboxes with no automated reminders, queue tracking, or SLA escalation policies.",
    root: 'Approval workflow lacks a centralized queue and policy-enforced escalation rules'
  },
  {
    id: 'rc_tech',
    aspect: 'Technology Aspect',
    tag: 'Point-of-Sale Capture Gap',
    dimensionNumber: '02',
    icon: Cpu,
    theme: {
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
      iconBg: 'bg-purple-100 text-purple-700',
      border: 'border-slate-200 hover:border-purple-300',
    },
    sym: 'Paper receipts are routinely lost',
    symDetail: 'Physical receipts fade or go missing during business travel.',
    bec: 'Receipts only exist as loose physical paper until manual retrospective batch submission weeks later.',
    root: 'No mobile digital capture or real-time OCR extraction at point of purchase'
  },
  {
    id: 'rc_integ',
    aspect: 'Integration Aspect',
    tag: 'ERP & System Disconnect',
    dimensionNumber: '03',
    icon: Network,
    theme: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-700',
      border: 'border-slate-200 hover:border-emerald-300',
    },
    sym: 'Approved claims are delayed in payment',
    symDetail: 'Turnaround stalls after manager approval has completed.',
    bec: 'Accounting staff manually re-type every line item from approved claim emails into enterprise accounting systems.',
    root: 'No automated API link connecting the approval workflow with the ERP system'
  }
];

const FRAMINGS = [
  { id: 'stmt_1', t: 'Field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually.' },
  { id: 'stmt_2', t: 'Expense claims are delayed and error-prone because reps rely on paper receipts and managers approve manually over email.' },
  { id: 'stmt_3', t: 'The lack of digital receipt capture and tracked approval workflows causes week-long delays in reimbursing field sales reps.' },
];

export const ProblemDiscovery: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onContinue: () => void;
}> = ({ projectId, projectName, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

  // Progressive state: 'inputs' (questions & aspects) -> 'framing' (root causes by aspect & framing selection)
  const hasExistingFraming = Boolean(s.selectedStatement || s.problemCompleted);
  const [stage, setStage] = useState<'inputs' | 'framing'>(hasExistingFraming ? 'framing' : 'inputs');
  
  const [generating, setGenerating] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Local answers state mapped to pdAnswers
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    PD_QUESTIONS.forEach(q => {
      init[q.id] = (s.pdAnswers || {})[q.id]?.value ?? q.suggested;
    });
    return init;
  });

  const handleSelectOption = (qId: string, val: string, isMulti: boolean) => {
    let nextVal: any;
    if (isMulti) {
      const cur = Array.isArray(answers[qId]) ? answers[qId] : [];
      nextVal = cur.includes(val) ? cur.filter((x: string) => x !== val) : [...cur, val];
    } else {
      nextVal = [val];
    }
    setAnswers(prev => ({ ...prev, [qId]: nextVal }));
    patch(projectId, st => ({
      pdAnswers: { ...(st.pdAnswers || {}), [qId]: { value: nextVal } }
    }));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await sleep(1500);
    // Pre-select first framing if none selected yet
    if (!s.selectedStatement) {
      patch(projectId, { selectedStatement: 'stmt_1' });
    }
    setGenerating(false);
    setStage('framing');
  };

  const confirm = () => {
    patch(projectId, { problemCompleted: true, discoveryPage: 'solution' });
    onContinue();
  };

  const answeredCount = PD_QUESTIONS.filter(q => {
    const a = answers[q.id];
    return Array.isArray(a) ? a.length > 0 : Boolean(a);
  }).length;
  const currentQ = PD_QUESTIONS[currentQuestionIndex];
  const canConfirm = Boolean(s.selectedStatement);

  // =========================================================================
  // STAGE 1 — INPUTS & CLARIFICATION QUESTIONS
  // =========================================================================
  if (stage === 'inputs') {
    if (generating) {
      return (
        <div className="h-full bg-slate-50/60 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Synthesizing Problem Model…</h2>
            <div className="space-y-2 text-left text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" /> Problem aspects evaluated
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" /> Process friction mapped across stakeholders
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Structuring root causes and statement framings...
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 bg-white shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A]">Problem Discovery</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Define problem aspects and complete clarifications to generate root-cause analysis and problem framing.
            </p>
          </div>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
            Step 1 · Problem Inputs
          </span>
        </div>

        {/* Two-Column Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Problem Aspects */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Problem Aspects
              </span>
              <span className="text-xs text-slate-500">
                Extracted baseline context
              </span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs">
              <div className="p-4 flex items-start gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 shrink-0">
                  Current Process
                </span>
                <span className="text-xs text-slate-900 font-medium flex-1">
                  Claims are emailed with physical receipt photos and approved manually over email threads.
                </span>
              </div>

              <div className="p-4 flex items-start gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 shrink-0">
                  Core Pain Points
                </span>
                <span className="text-xs text-slate-900 font-medium flex-1">
                  Paper receipts get lost on the road; reimbursement turnaround takes 2 to 4 weeks.
                </span>
              </div>

              <div className="p-4 flex items-start gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 shrink-0">
                  Affected Users
                </span>
                <span className="text-xs text-slate-900 font-medium flex-1">
                  Field sales representatives, Line managers (approvers), and Finance &amp; Accounting staff.
                </span>
              </div>

              <div className="p-4 flex items-start gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 shrink-0">
                  Frequency
                </span>
                <span className="text-xs text-slate-800 flex-1 font-semibold">
                  {answers['pq1']?.[0] ? `${answers['pq1'][0]} occurrence across active reps` : 'Ongoing recurring transactions'}
                </span>
              </div>

              <div className="p-4 flex items-start gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 shrink-0">
                  Severity &amp; Impact
                </span>
                <span className="text-xs text-slate-800 flex-1 font-semibold">
                  {answers['pq2']?.[0] ? answers['pq2'][0] : 'Delays reimbursement and creates employee friction'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Clarification Interview */}
          <div className="w-[420px] bg-white border-l border-slate-200 flex flex-col shrink-0">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Clarification Required
                </h3>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {PD_QUESTIONS.length - answeredCount === 0 
                    ? 'All answered' 
                    : `${PD_QUESTIONS.length - answeredCount} details remaining`}
                </span>
              </div>

              {/* Progress Stepper Dots */}
              <div className="flex items-center gap-1.5 mt-3">
                {PD_QUESTIONS.map((q, idx) => {
                  const isDone = Boolean(answers[q.id]?.length);
                  const isCurrent = idx === currentQuestionIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={cx(
                        "flex-1 h-1.5 rounded-full transition-all cursor-pointer",
                        isCurrent ? "bg-blue-600" : isDone ? "bg-emerald-500" : "bg-slate-200"
                      )}
                      title={`Question ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Active Question Box */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <span>Question {currentQuestionIndex + 1} of {PD_QUESTIONS.length}</span>
                  {answers[currentQ.id]?.length > 0 && (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Answered
                    </span>
                  )}
                </div>

                <h4 className="text-[15px] font-bold text-slate-900 leading-snug mb-1">
                  {currentQ.text}
                </h4>

                <p className="text-xs text-slate-500">
                  {currentQ.help}
                </p>
              </div>

              {/* Question Options */}
              <div className="space-y-2 pt-2">
                {currentQ.options.map((opt: string) => {
                  const isMulti = currentQ.multi;
                  const cur = answers[currentQ.id] || [];
                  const isSelected = cur.includes(opt);

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt, isMulti)}
                      className={cx(
                        "w-full text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between",
                        isSelected 
                          ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs" 
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      <span>{opt}</span>
                      <span className={cx(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2",
                        isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                      )}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Question Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>

                {currentQuestionIndex < PD_QUESTIONS.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(PD_QUESTIONS.length - 1, prev + 1))}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
                  >
                    Next Question <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready to generate
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Generate Action */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-2">
              <Button
                variant="primary"
                className="w-full text-xs font-bold py-2.5 bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                onClick={handleGenerate}
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Root Causes &amp; Framing</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STAGE 2 — GENERATED OUTPUT: ROOT CAUSES BY ASPECT & FRAMING SELECTION
  // =========================================================================
  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Problem Discovery</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStage('inputs')}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            ← Revise Inputs
          </button>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Step 2 · Root Causes &amp; Framing
          </span>
        </div>
      </div>

      {/* Main Workspace (Full-Width, Spacious Layout) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Section: Root Causes Structured by Aspect (Spacious, Uncluttered Architecture) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Root Causes by Aspect
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Three distinct architectural dimensions explaining why this problem occurs.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                3 Dimensions Identified
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ROOT_CAUSES_BY_ASPECT.map((rc) => {
                const IconComponent = rc.icon;
                return (
                  <div 
                    key={rc.id} 
                    className={cx(
                      "bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-sm",
                      rc.theme.border
                    )}
                  >
                    {/* Aspect Header */}
                    <div className="p-5 md:p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={cx("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs", rc.theme.iconBg)}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              Dimension {rc.dimensionNumber}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">
                              {rc.aspect}
                            </h4>
                          </div>
                        </div>
                        <span className={cx("text-[11px] font-semibold px-2.5 py-1 rounded-lg border", rc.theme.badgeBg)}>
                          {rc.tag}
                        </span>
                      </div>
                    </div>

                    {/* Diagnostic Flow: Symptom & Mechanism */}
                    <div className="p-5 md:p-6 space-y-4 flex-1">
                      {/* Observed Symptom */}
                      <div className="space-y-1.5">
                        <span className="text-[10.5px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
                          Observed Symptom
                        </span>
                        <p className="text-[14px] font-bold text-slate-900 leading-snug">
                          {rc.sym}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {rc.symDetail}
                        </p>
                      </div>

                      {/* Underlying Mechanism */}
                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                          Underlying Mechanism
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {rc.bec}
                        </p>
                      </div>
                    </div>

                    {/* Root Cause Inset Callout */}
                    <div className="p-5 md:p-6 pt-0 bg-white">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50/90 to-red-50/50 border border-rose-200/90 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-rose-700 mb-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Identified Root Cause</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 leading-relaxed">
                          {rc.root}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Problem Framing Selection (Preserving Analysis) */}
          <div className="space-y-3.5 pt-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Problem Statement Framing
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select the statement that best frames the core problem and executive objective.
              </p>
            </div>

            <div className="space-y-3">
              {FRAMINGS.map(f => {
                const picked = s.selectedStatement === f.id || (f.id === 'stmt_1' && (s.selectedStatement === 'st1' || !s.selectedStatement));
                return (
                  <div 
                    key={f.id} 
                    className={cx(
                      "rounded-2xl border transition-all shadow-2xs", 
                      picked 
                        ? "bg-blue-50/70 border-blue-600 ring-1 ring-blue-600/30" 
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <button 
                      onClick={() => patch(projectId, { selectedStatement: f.id })} 
                      className={cx(
                        "w-full text-left p-5 pb-3 cursor-pointer", 
                        picked ? "text-blue-900" : "text-[#0F172A]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[14.5px] font-semibold leading-relaxed flex-1">
                          {f.t}
                        </span>
                        <span className={cx(
                          "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                          picked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        )}>
                          {picked && <Check className="w-3 h-3" />}
                        </span>
                      </div>
                      <div className="mt-2.5">
                        <AnalysisChips id={f.id} />
                      </div>
                    </button>
                    
                    <div className="px-5 pb-4 pt-1">
                      <Button 
                        size="xs" 
                        icon={<BarChart3 className="w-3.5 h-3.5" />} 
                        onClick={() => setAnalysisId(f.id)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white"
                      >
                        View analysis
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 shadow-xs">
        {canConfirm ? (
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Problem statement selected</span>
          </div>
        ) : (
          <div className="text-amber-600 text-xs font-semibold">
            Select a problem statement framing to continue
          </div>
        )}

        <Button 
          variant="primary" 
          disabled={!canConfirm} 
          onClick={confirm}
          className="px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span>Confirm &amp; Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Analysis Dialog Modal */}
      <StatementAnalysisDialog
        option={FRAMINGS.find(f => f.id === analysisId) ?? null}
        selected={Boolean(analysisId && s.selectedStatement === analysisId)}
        onClose={() => setAnalysisId(null)}
        onSelect={id => patch(projectId, { selectedStatement: id })}
      />
    </div>
  );
};
