import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, 
  ChevronRight, Check, SlidersHorizontal, ArrowRight,
  TrendingUp, AlertCircle, Award, Sparkles
} from 'lucide-react';
import { usePlanning } from '../PlanningStore';
import { DiscoveryPage } from '../types';
import { 
  INITIAL_CSUITE_DATA, 
  CSuiteMemberReview, 
  CSuiteRole, 
  CSUITE_ROLES_META, 
  getRoleTheme 
} from './csuiteData';
import { PHASE_CONFIGS } from '../map/mapData';
import { cx, useToast } from '../../ui';

interface Props {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  initialPhase?: DiscoveryPage;
}

const PHASES_LIST: DiscoveryPage[] = [
  'idea',
  'opportunity',
  'problem',
  'solution',
  'business_model',
  'product_definition',
  'requirements',
  'documentation'
];

export const CSuiteExecutivePanel: React.FC<Props> = ({
  open,
  onClose,
  projectId,
  projectName,
  initialPhase = 'idea'
}) => {
  const { state, patch } = usePlanning();
  const { toast } = useToast();
  const s = state(projectId);

  // Store active reviews across all 8 phases (12 executives per phase)
  const [csuiteState, setCsuiteState] = useState<Record<DiscoveryPage, CSuiteMemberReview[]>>(INITIAL_CSUITE_DATA);
  const [activePhase, setActivePhase] = useState<DiscoveryPage>(initialPhase);
  
  // Selected executive for the deep-dive analysis modal/sheet
  const [selectedRole, setSelectedRole] = useState<CSuiteRole | null>(null);

  if (!open) return null;

  const currentReviews = csuiteState[activePhase] || [];
  const phaseConfig = PHASE_CONFIGS[activePhase];

  // Calculate average score for the active phase
  const phaseAvgScore = Math.round(
    currentReviews.reduce((sum, r) => sum + r.score, 0) / (currentReviews.length || 1)
  );

  // Calculate overall C-Suite readiness score across all 8 phases
  const allReviews = Object.values(csuiteState).flat();
  const overallAvgScore = Math.round(
    allReviews.reduce((sum, r) => sum + r.score, 0) / (allReviews.length || 1)
  );

  const validatedCount = currentReviews.filter(r => r.status === 'Validated').length;

  const handleScoreChange = (role: CSuiteRole, newScore: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newScore)));
    const updated = {
      ...csuiteState,
      [activePhase]: csuiteState[activePhase].map(r => 
        r.role === role ? { ...r, score: clamped } : r
      )
    };
    setCsuiteState(updated);
  };

  const handleToggleValidation = (role: CSuiteRole) => {
    const updated = {
      ...csuiteState,
      [activePhase]: csuiteState[activePhase].map(r => 
        r.role === role ? { ...r, status: r.status === 'Validated' ? 'Pending' : 'Validated' } : r
      )
    };
    setCsuiteState(updated);
    const newStatus = updated[activePhase].find(r => r.role === role)?.status;
    toast({
      title: `${role} Review Updated`,
      description: `Marked as ${newStatus} for ${phaseConfig.shortTitle}.`
    });
  };

  const handleApprovePhaseGate = () => {
    // Approve all 12 reviewers in this phase
    const updated = {
      ...csuiteState,
      [activePhase]: csuiteState[activePhase].map(r => ({ ...r, status: 'Validated' as const }))
    };
    setCsuiteState(updated);

    // Apply store patch for the corresponding phase
    const update: any = {};
    if (activePhase === 'idea') update.briefConfirmed = true;
    if (activePhase === 'opportunity') update.oppCompleted = true;
    if (activePhase === 'problem') update.problemCompleted = true;
    if (activePhase === 'solution') update.solutionConfirmed = true;
    if (activePhase === 'business_model') update.businessModelConfirmed = true;
    if (activePhase === 'product_definition') update.productDefinitionConfirmed = true;
    if (activePhase === 'requirements') update.requirementsConfirmed = true;
    if (activePhase === 'documentation') update.documentsConfirmed = true;

    patch(projectId, update);

    toast({
      title: `Phase Gate Passed: ${phaseConfig.shortTitle}`,
      description: activePhase === 'documentation' 
        ? 'Requirement Gathering completed! Solution Planning is now unlocked.'
        : `All 12 C-Suite executives validated this phase with an average score of ${phaseAvgScore}/100.`
    });
  };

  // Active selected member analysis data
  const activeMemberReview = selectedRole 
    ? currentReviews.find(r => r.role === selectedRole) 
    : null;
  const activeRoleMeta = selectedRole ? CSUITE_ROLES_META[selectedRole] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Executive Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-700/50">
                  Governance Board
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-medium truncate max-w-[280px]">
                  {projectName}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                C-Suite Executive Validation Panel
                <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  12 C-Level Executives
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Aggregate Score Pill */}
            <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-1.5 rounded-xl flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Aggregate C-Suite Score
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {validatedCount}/12 Validated in Phase
                </div>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-amber-400">
                  {overallAvgScore}
                </span>
                <span className="text-xs text-slate-400 font-semibold">/100</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Phase Timeline Tabs (Followed from first to last) */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-slate-50/90 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          {PHASES_LIST.map((pageId, idx) => {
            const cfg = PHASE_CONFIGS[pageId];
            const pageReviews = csuiteState[pageId] || [];
            const avg = Math.round(pageReviews.reduce((sum, r) => sum + r.score, 0) / (pageReviews.length || 1));
            const allValidated = pageReviews.every(r => r.status === 'Validated');
            const isActive = activePhase === pageId;

            return (
              <button
                key={pageId}
                onClick={() => {
                  setActivePhase(pageId);
                  setSelectedRole(null);
                }}
                className={cx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                  isActive
                    ? "bg-white text-indigo-700 border-indigo-200 shadow-xs ring-1 ring-indigo-500/20"
                    : "bg-white/60 text-slate-600 border-slate-200/70 hover:bg-white hover:text-slate-900"
                )}
              >
                <div className={cx(
                  "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0",
                  allValidated 
                    ? "bg-emerald-100 text-emerald-700" 
                    : isActive 
                    ? "bg-indigo-100 text-indigo-700" 
                    : "bg-slate-200 text-slate-600"
                )}>
                  {allValidated ? <Check className="w-2.5 h-2.5" /> : idx + 1}
                </div>
                <span>{cfg.shortTitle}</span>
                <span className={cx(
                  "text-[11px] font-mono font-bold px-1.5 py-0.2 rounded",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "bg-slate-100 text-slate-600"
                )}>
                  {avg}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phase Header & Gate Controls */}
        <div className="px-6 py-3.5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Phase {phaseConfig.num}</span>
              <span>•</span>
              <span className="text-indigo-600">{phaseConfig.tagline}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {phaseConfig.title} — Executive Scoring Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All 12 C-Suite executives review this phase. Click any executive to inspect their evaluation and update their score.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Phase Readiness
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl font-black text-slate-900">{phaseAvgScore}</span>
                <span className="text-xs font-semibold text-slate-400">/100</span>
              </div>
            </div>

            <button
              onClick={handleApprovePhaseGate}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:shadow"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Phase Gate</span>
            </button>
          </div>
        </div>

        {/* Main Body: 12 C-Suite Executive Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {currentReviews.map((rev) => {
              const theme = getRoleTheme(rev.role);
              const meta = CSUITE_ROLES_META[rev.role];
              const isSelected = selectedRole === rev.role;

              return (
                <div
                  key={rev.role}
                  onClick={() => setSelectedRole(rev.role)}
                  className={cx(
                    "bg-white rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between group relative hover:shadow-md",
                    isSelected 
                      ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-md bg-indigo-50/20" 
                      : "border-slate-200/90 hover:border-slate-300"
                  )}
                >
                  {/* Top: Role Badge & Validation Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={cx("px-2.5 py-1 rounded-md text-xs font-black text-white shadow-xs", theme.badge)}>
                        {rev.role}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {meta.category}
                      </span>
                    </div>

                    <span className={cx(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                      rev.status === 'Validated' 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    )}>
                      {rev.status === 'Validated' && <Check className="w-2.5 h-2.5" />}
                      {rev.status}
                    </span>
                  </div>

                  {/* Executive Title (NO person name) */}
                  <div className="mb-3">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {rev.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {rev.reviewed}
                    </div>
                  </div>

                  {/* Score Alone Display (Prominent & Clean) */}
                  <div className="pt-2.5 border-t border-slate-100 mt-auto">
                    <div className="flex items-end justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Score
                      </span>
                      <div className="flex items-baseline gap-0.5">
                        <span className={cx(
                          "text-xl font-black font-mono",
                          rev.score >= 90 ? "text-emerald-600" : rev.score >= 80 ? "text-indigo-600" : "text-amber-600"
                        )}>
                          {rev.score}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">/100</span>
                      </div>
                    </div>

                    {/* Mini Score Bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cx(
                          "h-full rounded-full transition-all duration-300",
                          rev.score >= 90 ? "bg-emerald-500" : rev.score >= 80 ? "bg-indigo-500" : "bg-amber-500"
                        )}
                        style={{ width: `${rev.score}%` }}
                      />
                    </div>

                    {/* Card Footer prompt */}
                    <div className="flex items-center justify-between mt-2.5 text-[11px] text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>View analysis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All 12 C-Suite evaluations recorded in enterprise audit log</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>

      {/* Member Deep-Dive Analysis Modal / Sheet */}
      {selectedRole && activeMemberReview && activeRoleMeta && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setSelectedRole(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={cx(
                  "px-3 py-1 rounded-lg text-sm font-black text-white shadow-xs",
                  getRoleTheme(selectedRole).badge
                )}>
                  {selectedRole}
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {activeMemberReview.title}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{activeRoleMeta.category}</span>
                    <span>•</span>
                    <span className="font-semibold text-indigo-600">Phase {phaseConfig.num}: {phaseConfig.shortTitle}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedRole(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: What that person analyzed */}
            <div className="p-6 space-y-4.5 overflow-y-auto max-h-[70vh]">
              {/* Executive Mandate Description */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Role Mandate: </span>
                {activeRoleMeta.description}
              </div>

              {/* What was analyzed */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Scope & Focus Evaluated
                </label>
                <div className="text-sm font-semibold text-slate-800 p-3 bg-slate-100/60 rounded-xl border border-slate-200/60">
                  {activeMemberReview.reviewed}
                </div>
              </div>

              {/* Findings & Analytical Critique */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Executive Findings & Strategic Critique
                </label>
                <div className="text-sm text-slate-700 p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100 leading-relaxed font-normal">
                  {activeMemberReview.findings}
                </div>
              </div>

              {/* Evaluation Criteria Checked */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Criteria Checkpoints Analyzed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeMemberReview.criteria.map((crit, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs text-emerald-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Score Slider */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Update {selectedRole} Evaluation Score
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={activeMemberReview.score}
                      onChange={e => handleScoreChange(selectedRole, parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
                    />
                    <span className="text-xs font-bold text-slate-400">/ 100</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={activeMemberReview.score}
                  onChange={e => handleScoreChange(selectedRole, parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                  <span>Needs Revision (0-69)</span>
                  <span>Adequate (70-84)</span>
                  <span className="text-emerald-600">Enterprise Ready (85-100)</span>
                </div>
              </div>

              {/* Score Followed Across All 8 Phases */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {selectedRole} Score Across All 8 Phases (First to Last)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-2.5 bg-slate-100/70 rounded-xl border border-slate-200">
                  {PHASES_LIST.map((pId, idx) => {
                    const pScore = csuiteState[pId]?.find(r => r.role === selectedRole)?.score ?? 0;
                    const isCur = pId === activePhase;
                    return (
                      <div 
                        key={pId} 
                        className={cx(
                          "flex flex-col items-center justify-center p-1.5 rounded-lg text-center transition-colors",
                          isCur ? "bg-indigo-600 text-white font-bold" : "bg-white text-slate-700"
                        )}
                      >
                        <span className={cx("text-[9px] font-semibold", isCur ? "text-indigo-200" : "text-slate-400")}>
                          P0{idx + 1}
                        </span>
                        <span className="text-xs font-bold font-mono">
                          {pScore}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Risk & Status Row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Assessed Risk:</span>
                  <span className={cx(
                    "px-2 py-0.5 rounded text-xs font-bold",
                    activeMemberReview.risk === 'Low' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  )}>
                    {activeMemberReview.risk} Risk
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleValidation(selectedRole)}
                  className={cx(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer",
                    activeMemberReview.status === 'Validated'
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {activeMemberReview.status === 'Validated' ? 'Validated by ' + selectedRole : 'Mark as Validated'}
                  </span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedRole(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
