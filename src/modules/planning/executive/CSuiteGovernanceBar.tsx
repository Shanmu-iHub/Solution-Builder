import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, Check, SlidersHorizontal, X } from 'lucide-react';
import { DiscoveryPage } from '../types';
import { 
  CSuiteRole, 
  CSUITE_ROLES_META, 
  INITIAL_CSUITE_DATA, 
  getRoleTheme, 
  CSuiteMemberReview 
} from './csuiteData';
import { PHASE_CONFIGS } from '../map/mapData';
import { cx, useToast } from '../../ui';

interface Props {
  page: DiscoveryPage;
  onOpenFullPanel?: () => void;
  className?: string;
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

export const CSuiteGovernanceBar: React.FC<Props> = ({
  page,
  onOpenFullPanel,
  className
}) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Record<DiscoveryPage, CSuiteMemberReview[]>>(INITIAL_CSUITE_DATA);
  const [activeRole, setActiveRole] = useState<CSuiteRole | null>(null);

  const currentReviews = reviews[page] || [];
  const phaseConfig = PHASE_CONFIGS[page];

  const phaseAvg = Math.round(
    currentReviews.reduce((sum, r) => sum + r.score, 0) / (currentReviews.length || 1)
  );

  const handleScoreChange = (role: CSuiteRole, score: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(score)));
    setReviews(prev => ({
      ...prev,
      [page]: prev[page].map(r => r.role === role ? { ...r, score: clamped } : r)
    }));
  };

  const handleToggleValidation = (role: CSuiteRole) => {
    setReviews(prev => {
      const updated = {
        ...prev,
        [page]: prev[page].map(r => 
          r.role === role ? { ...r, status: r.status === 'Validated' ? 'Pending' : 'Validated' } : r
        )
      };
      const status = updated[page].find(r => r.role === role)?.status;
      toast({
        title: `${role} Evaluation`,
        description: `Marked as ${status} for ${phaseConfig.shortTitle}.`
      });
      return updated;
    });
  };

  const activeReview = activeRole ? currentReviews.find(r => r.role === activeRole) : null;
  const activeMeta = activeRole ? CSUITE_ROLES_META[activeRole] : null;

  return (
    <>
      <div className={cx(
        "bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3",
        className
      )}>
        {/* Left: Governance Label & Phase Score */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-900 tracking-tight">
                C-Suite Governance
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-1.5 py-0.2 rounded">
                12 Executives
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <span>Phase Score:</span>
              <span className="font-bold font-mono text-indigo-600">{phaseAvg}/100</span>
            </div>
          </div>
        </div>

        {/* Center: 12 C-Suite Score Chips (Only Role and Score) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1 min-w-[320px]">
          {currentReviews.map(rev => {
            const theme = getRoleTheme(rev.role);
            return (
              <button
                key={rev.role}
                type="button"
                onClick={() => setActiveRole(rev.role)}
                title={`${rev.title}: Click to view what was analyzed`}
                className={cx(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer group text-xs shrink-0",
                  "bg-slate-50 hover:bg-white hover:border-indigo-300 hover:shadow-xs",
                  rev.status === 'Validated' ? "border-slate-200" : "border-amber-200 bg-amber-50/40"
                )}
              >
                <span className={cx(
                  "px-1.5 py-0.2 rounded text-[10px] font-black text-white",
                  theme.badge
                )}>
                  {rev.role}
                </span>
                <span className="font-mono font-bold text-slate-800 text-[11.5px] group-hover:text-indigo-600">
                  {rev.score}
                </span>
                {rev.status === 'Validated' ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Expand Full Panel Button */}
        {onOpenFullPanel && (
          <button
            type="button"
            onClick={onOpenFullPanel}
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0 cursor-pointer ml-auto hover:underline"
          >
            <span>Open Boardroom</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Detail Inspector Modal on clicking each member */}
      {activeRole && activeReview && activeMeta && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setActiveRole(null)}
        >
          <div 
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={cx(
                  "px-3 py-1 rounded-lg text-sm font-black text-white shadow-xs",
                  getRoleTheme(activeRole).badge
                )}>
                  {activeRole}
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {activeReview.title}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{activeMeta.category}</span>
                    <span>•</span>
                    <span className="font-semibold text-indigo-600">Phase {phaseConfig.num}: {phaseConfig.shortTitle}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveRole(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              {/* Role Mandate */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Role Mandate: </span>
                {activeMeta.description}
              </div>

              {/* What was analyzed */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Scope Evaluated for {phaseConfig.shortTitle}
                </label>
                <div className="text-sm font-semibold text-slate-800 p-3 bg-slate-100/70 rounded-xl border border-slate-200/70">
                  {activeReview.reviewed}
                </div>
              </div>

              {/* Executive Findings & Critique */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Executive Findings & Critique
                </label>
                <div className="text-sm text-slate-700 p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100 leading-relaxed">
                  {activeReview.findings}
                </div>
              </div>

              {/* Criteria */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Criteria Checkpoints
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeReview.criteria.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Scoring Slider */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Update {activeRole} Score
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={activeReview.score}
                      onChange={e => handleScoreChange(activeRole, parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg"
                    />
                    <span className="text-xs font-bold text-slate-400">/ 100</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={activeReview.score}
                  onChange={e => handleScoreChange(activeRole, parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Score Followed Across 8 Phases */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {activeRole} Progression Across All 8 Phases
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-2 bg-slate-100/70 rounded-xl border border-slate-200">
                  {PHASES_LIST.map((pId, idx) => {
                    const sc = reviews[pId]?.find(r => r.role === activeRole)?.score ?? 0;
                    const isCur = pId === page;
                    return (
                      <div 
                        key={pId} 
                        className={cx(
                          "flex flex-col items-center justify-center p-1 rounded-md text-center",
                          isCur ? "bg-indigo-600 text-white font-bold" : "bg-white text-slate-700"
                        )}
                      >
                        <span className={cx("text-[9px]", isCur ? "text-indigo-200" : "text-slate-400")}>
                          P0{idx + 1}
                        </span>
                        <span className="text-xs font-mono font-bold">
                          {sc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status & Validation Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-600">
                  Risk Level: <span className="font-bold text-emerald-700">{activeReview.risk}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleValidation(activeRole)}
                  className={cx(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5",
                    activeReview.status === 'Validated' 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{activeReview.status === 'Validated' ? 'Validated' : 'Validate'}</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveRole(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
