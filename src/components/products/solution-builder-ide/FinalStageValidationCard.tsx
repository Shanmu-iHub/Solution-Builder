import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Check,
  X,
  Eye
} from 'lucide-react';
import {
  CSuiteMemberId,
  CSuiteMemberReview
} from '../../../services/csuiteSolutionBuilder/types';

interface FinalStageValidationCardProps {
  stageApproved: boolean;
  finalExecutives: Array<{
    id: CSuiteMemberId;
    name: string;
    status: 'Validated' | 'Changes Required' | 'In Review' | 'Pending';
    area: string;
  }>;
  failedExecutives: Array<{
    id: CSuiteMemberId;
    name: string;
    area: string;
    review: CSuiteMemberReview;
  }>;
  onContinue: () => void;
  onViewReview: (review: CSuiteMemberReview) => void;
  onToggleScenario?: () => void;
}

export const FinalStageValidationCard: React.FC<FinalStageValidationCardProps> = ({
  stageApproved,
  finalExecutives,
  failedExecutives,
  onContinue,
  onViewReview,
  onToggleScenario
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            C-SUITE STAGE VALIDATION
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Solution Building Stage
          </h3>
        </div>

        {/* Demo Switcher Button to simulate both states easily */}
        {onToggleScenario && (
          <button
            type="button"
            onClick={onToggleScenario}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
          >
            {stageApproved ? 'Simulate Validation Issue (CDO / CISO)' : 'Restore All Validated'}
          </button>
        )}
      </div>

      {/* List of Executives */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
        {finalExecutives.map((exec) => {
          const isValidated = exec.status === 'Validated';
          return (
            <div
              key={exec.id}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isValidated
                  ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900'
                  : 'bg-rose-50/50 border-rose-200/80 text-rose-900'
              }`}
            >
              <div>
                <strong className="block text-slate-900 font-bold">{exec.id}</strong>
                <span className="text-[10px] opacity-75">{exec.area}</span>
              </div>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isValidated
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isValidated ? '✓' : '✕'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decision Banner */}
      {stageApproved ? (
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700">✓ C-Suite Validated</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-slate-900">Stage Approved</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                All required C-Suite perspectives have validated the Solution Building stage.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#18181b] hover:bg-black text-white shadow-xs cursor-pointer group shrink-0 transition-colors"
          >
            <span>Continue to Next Stage</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-rose-50/80 to-slate-50 border border-rose-200 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-rose-800">
                ⚠ C-Suite Validation Incomplete
              </h4>
              <p className="text-xs text-slate-700 font-medium">
                The stage cannot be completed until required executive issues are resolved.
              </p>
              <div className="pt-1 text-xs text-slate-600">
                <span className="font-semibold block mb-1">Changes required from:</span>
                <ul className="space-y-1 list-disc list-inside text-rose-900">
                  {failedExecutives.map((failed) => (
                    <li key={failed.id}>
                      <strong>{failed.id}</strong> — {failed.area} validation
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {failedExecutives.length > 0 && (
              <button
                type="button"
                onClick={() => onViewReview(failedExecutives[0].review)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" />
                View Review
              </button>
            )}

            {/* Disabled Continue Button as required */}
            <button
              type="button"
              disabled={true}
              title="The stage cannot be completed until all required validations are complete."
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            >
              <span>Continue to Next Stage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
