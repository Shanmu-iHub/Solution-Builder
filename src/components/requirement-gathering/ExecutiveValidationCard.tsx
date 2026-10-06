import React from 'react';
import { Check, AlertTriangle, Loader2, Eye, ShieldAlert, ArrowRight } from 'lucide-react';
import { ExecutiveReview, ExecutiveId } from '../../services/csuite/types';

interface ExecutiveValidationCardProps {
  review: ExecutiveReview;
  onViewReview: (review: ExecutiveReview) => void;
  onActionClick?: (review: ExecutiveReview) => void;
  isExecuting?: boolean;
}

const AVATAR_BG_MAP: Record<ExecutiveId, string> = {
  CPO: 'bg-indigo-600',
  CBO: 'bg-blue-600',
  CMO: 'bg-purple-600',
  CSO: 'bg-emerald-600',
  CFO: 'bg-amber-600',
  CTO: 'bg-cyan-600',
  CDO: 'bg-teal-600',
  CISO: 'bg-rose-600',
  CIO: 'bg-slate-700',
  CEO: 'bg-zinc-900'
};

export const ExecutiveValidationCard: React.FC<ExecutiveValidationCardProps> = ({
  review,
  onViewReview,
  onActionClick,
  isExecuting = false
}) => {
  const isBlocked = review.decision === 'NEEDS_CHANGES';
  const avatarBg = AVATAR_BG_MAP[review.executiveId] || 'bg-slate-800';
  const blockingFindings = review.findings.filter((f) => f.blocking);

  return (
    <article
      className={`relative rounded-xl border p-4 sm:p-5 transition-all duration-200 bg-white shadow-2xs ${
        isBlocked
          ? 'border-rose-200 bg-rose-50/20 ring-1 ring-rose-200/50'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Executive Avatar Badge */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs ${avatarBg}`}
        >
          {review.executiveId}
        </div>

        {/* Executive Header & Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <strong className="text-sm font-semibold text-slate-900">
                {review.executiveName}
              </strong>
              <span className="text-xs text-slate-500 font-medium">
                ({review.executiveId})
              </span>
            </div>

            {/* Status Pill */}
            {isExecuting ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                Validating...
              </span>
            ) : isBlocked ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                <AlertTriangle className="w-3 h-3" />
                Needs Changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Check className="w-3 h-3" />
                Validated
              </span>
            )}
          </div>

          {/* Validation Scope */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-2.5">
            {review.validationScope}
          </p>

          {/* Feedback Snippet */}
          <div
            className={`p-2.5 rounded-lg text-xs leading-relaxed mb-3 ${
              isBlocked
                ? 'bg-rose-50/80 border border-rose-200/70 text-rose-800'
                : 'bg-slate-50/80 border border-slate-100 text-slate-600'
            }`}
          >
            {review.feedback}
          </div>

          {/* Card Actions */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onViewReview(review)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:underline cursor-pointer py-1"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              View Review
            </button>

            {isBlocked ? (
              <button
                type="button"
                onClick={() => onActionClick && onActionClick(review)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-2xs transition-colors"
              >
                <ShieldAlert className="w-3 h-3" />
                Review {blockingFindings.length} Issue{blockingFindings.length > 1 ? 's' : ''}
              </button>
            ) : (
              <span className="text-[11px] text-slate-400">
                {review.checks.filter((c) => c.passed).length}/{review.checks.length} Checks passed
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
