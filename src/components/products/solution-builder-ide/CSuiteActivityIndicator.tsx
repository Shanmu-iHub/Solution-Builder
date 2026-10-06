import React from 'react';
import { Check, X, Clock, AlertTriangle, Eye, ShieldAlert } from 'lucide-react';
import {
  CSuiteMemberId,
  ActivityValidationStatus,
  CSuiteMemberReview
} from '../../../services/csuiteSolutionBuilder/types';

interface CSuiteActivityIndicatorProps {
  requiredMembers: CSuiteMemberId[];
  reviews: Record<CSuiteMemberId, CSuiteMemberReview>;
  overallStatus: ActivityValidationStatus;
  onViewReview: (review: CSuiteMemberReview) => void;
}

export const CSuiteActivityIndicator: React.FC<CSuiteActivityIndicatorProps> = ({
  requiredMembers,
  reviews,
  overallStatus,
  onViewReview
}) => {
  if (!requiredMembers || requiredMembers.length === 0) {
    return null;
  }

  const isChangesRequired = overallStatus === 'Changes Required';
  const isValidated = overallStatus === 'Validated';
  const isInReview = overallStatus === 'In Review';

  // Find any failed member for summary issue notice
  const failedMember = requiredMembers.find((m) => reviews[m]?.status === 'Changes Required');
  const failedReview = failedMember ? reviews[failedMember] : null;

  return (
    <div
      className={`mt-2 pt-2 border-t rounded-lg p-2.5 transition-all text-xs ${
        isChangesRequired
          ? 'bg-rose-50/60 border-rose-200/80 ring-1 ring-rose-200/50'
          : isValidated
          ? 'bg-slate-50/70 border-slate-200/70'
          : 'bg-slate-50/40 border-slate-200/50'
      }`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          C-SUITE VALIDATION
        </span>

        {/* Overall Status Badge */}
        {isValidated && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3 stroke-[2.5]" />
            VALIDATED
          </span>
        )}
        {isInReview && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full border border-amber-600 border-t-transparent animate-spin inline-block" />
            IN REVIEW
          </span>
        )}
        {isChangesRequired && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            <X className="w-3 h-3 stroke-[2.5]" />
            CHANGES REQUIRED
          </span>
        )}
        {overallStatus === 'Pending' && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            <Clock className="w-3 h-3" />
            PENDING
          </span>
        )}
      </div>

      {/* Member Chips: [✓ CTO] [✓ CDO] [✕ CISO] */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {requiredMembers.map((memberId) => {
          const rev = reviews[memberId];
          const memberStatus = rev?.status || 'Pending';

          const chipStyle =
            memberStatus === 'Validated'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : memberStatus === 'Changes Required'
              ? 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 font-bold'
              : memberStatus === 'In Review'
              ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50';

          return (
            <button
              key={memberId}
              type="button"
              onClick={() => rev && onViewReview(rev)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-medium transition-colors cursor-pointer select-none shadow-2xs ${chipStyle}`}
              title={`View ${memberId} (${rev?.memberName || memberId}) Review`}
            >
              {memberStatus === 'Validated' && (
                <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />
              )}
              {memberStatus === 'Changes Required' && (
                <X className="w-2.5 h-2.5 text-rose-700 stroke-[3]" />
              )}
              {memberStatus === 'In Review' && (
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              )}
              {memberStatus === 'Pending' && (
                <span className="w-2 h-2 rounded-full border border-slate-400 inline-block" />
              )}
              <span>{memberId}</span>
            </button>
          );
        })}
      </div>

      {/* Failed Reason & View Review Action when Changes Required */}
      {isChangesRequired && failedReview && (
        <div className="mt-2 pt-2 border-t border-rose-200/70 flex items-start justify-between gap-2 text-rose-900">
          <div className="flex items-start gap-1.5 flex-1 min-w-0">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-tight truncate">
              <strong>{failedReview.memberId}:</strong> {failedReview.reviewMessage}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onViewReview(failedReview)}
            className="text-[11px] font-bold text-rose-700 hover:text-rose-900 hover:underline shrink-0 cursor-pointer"
          >
            View Review
          </button>
        </div>
      )}
    </div>
  );
};
