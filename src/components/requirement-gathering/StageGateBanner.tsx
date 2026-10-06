import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Wrench,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { StageGateEvaluation } from '../../services/csuite/types';

interface StageGateBannerProps {
  evaluation: StageGateEvaluation;
  nextStageTitle?: string;
  onContinue: () => void;
  onFixIssues?: () => void;
  onRevalidate?: () => void;
  isRevalidating?: boolean;
}

export const StageGateBanner: React.FC<StageGateBannerProps> = ({
  evaluation,
  nextStageTitle,
  onContinue,
  onFixIssues,
  onRevalidate,
  isRevalidating = false
}) => {
  const isApproved = evaluation.decision === 'APPROVED';
  const totalRequired = evaluation.requiredExecutives.length;
  const validatedCount = evaluation.validatedExecutives.length;
  const issuesCount = evaluation.executivesWithIssues.length;
  const blockingCount = evaluation.blockingIssuesCount;
  const progressPercent = totalRequired > 0 ? Math.round((validatedCount / totalRequired) * 100) : 0;

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 mt-6 ${
        isApproved
          ? 'bg-gradient-to-br from-emerald-50/60 to-slate-50 border-emerald-200/90 shadow-2xs'
          : 'bg-gradient-to-br from-rose-50/60 to-slate-50 border-rose-200/90 shadow-2xs'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left side: Gate Decision & Stats */}
        <div className="space-y-3 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              C-SUITE STAGE GATE
            </span>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span>Required: <strong>{totalRequired}</strong></span>
              <span>•</span>
              <span>Validated: <strong className="text-emerald-700">{validatedCount}</strong></span>
              <span>•</span>
              <span>Needs Changes: <strong className={issuesCount > 0 ? 'text-rose-700' : 'text-slate-700'}>{issuesCount}</strong></span>
              <span>•</span>
              <span>Blocking: <strong className={blockingCount > 0 ? 'text-rose-700' : 'text-slate-700'}>{blockingCount}</strong></span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                isApproved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                {isApproved ? (
                  <>
                    <span className="text-emerald-700">✓</span> STAGE VALIDATED & APPROVED
                  </>
                ) : (
                  <>
                    <span className="text-rose-600">⚠</span> STAGE NEEDS CHANGES
                  </>
                )}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isApproved
                  ? `All ${totalRequired} required C-Suite executive perspectives have validated this stage output. The stage is approved to proceed.`
                  : `${issuesCount} executive(s) identified ${blockingCount} blocking issue(s). Stage cannot continue until required validation issues are resolved.`}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1 max-w-md pt-1">
            <div className="flex justify-between text-[11px] font-medium text-slate-500">
              <span>Executive Consensus Progress</span>
              <span>{validatedCount}/{totalRequired} Validated ({progressPercent}%)</span>
            </div>
            <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isApproved ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {isApproved ? (
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#18181b] hover:bg-black text-white transition-all shadow-xs cursor-pointer group"
            >
              <span>Continue to {nextStageTitle || 'Next Stage'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <>
              {onFixIssues && (
                <button
                  type="button"
                  onClick={onFixIssues}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Fix Issues
                </button>
              )}

              {onRevalidate && (
                <button
                  type="button"
                  onClick={onRevalidate}
                  disabled={isRevalidating}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {isRevalidating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  Revalidate C-Suite
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
