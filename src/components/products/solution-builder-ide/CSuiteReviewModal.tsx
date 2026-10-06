import React from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { CSuiteMemberReview } from '../../../services/csuiteSolutionBuilder/types';

interface CSuiteReviewModalProps {
  review: CSuiteMemberReview | null;
  isOpen: boolean;
  onClose: () => void;
  onResubmit?: (review: CSuiteMemberReview) => void;
}

export const CSuiteReviewModal: React.FC<CSuiteReviewModalProps> = ({
  review,
  isOpen,
  onClose,
  onResubmit
}) => {
  if (!isOpen || !review) return null;

  const isChangesRequired = review.status === 'Changes Required';
  const isValidated = review.status === 'Validated';
  const isInReview = review.status === 'In Review';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-scale-up">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs ${
                isChangesRequired ? 'bg-rose-600' : isValidated ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
            >
              {review.memberId}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">C-Suite Review</h3>
              <p className="text-xs text-slate-500 font-medium">{review.memberName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Executive & Role */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Executive
            </span>
            <p className="font-semibold text-slate-900 text-sm">
              {review.memberId} — {review.memberName}
            </p>
          </div>

          {/* Status Badge */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </span>
            <div>
              {isValidated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Validated
                </span>
              ) : isChangesRequired ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Changes Required
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {isInReview ? 'In Review' : 'Pending'}
                </span>
              )}
            </div>
          </div>

          {/* Validation Area */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Validation Area
            </span>
            <p className="font-semibold text-slate-800 text-xs">
              {review.validationArea || 'Domain Specification'}
            </p>
          </div>

          {/* Review Message */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Review
            </span>
            <div
              className={`p-3.5 rounded-xl border leading-relaxed text-xs ${
                isChangesRequired
                  ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                  : 'bg-slate-50 border-slate-200/80 text-slate-700'
              }`}
            >
              {review.reviewMessage}
            </div>
          </div>

          {/* Required Action */}
          {review.requiredAction && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Required Action
              </span>
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-900 text-xs leading-relaxed font-medium">
                {review.requiredAction}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          {isChangesRequired && onResubmit ? (
            <button
              onClick={() => {
                onResubmit(review);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-black transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resubmit for Validation
            </button>
          ) : (
            <span className="text-[11px] text-slate-400">
              Domain review completed
            </span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};
