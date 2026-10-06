import React, { useState } from 'react';
import {
  Boxes,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Activity,
  Terminal,
  ShieldCheck,
  Cpu,
  Database,
  Code2,
  Check,
  X
} from 'lucide-react';
import {
  SolutionActivityConfig,
  CSuiteMemberReview,
  SOLUTION_ACTIVITIES_MAPPING,
  SolutionActivityId,
  ActivityValidationStatus
} from '../../../services/csuiteSolutionBuilder/types';
import { CSuiteActivityIndicator } from './CSuiteActivityIndicator';

interface ExecutionPipelineTrackerProps {
  activitiesState: Record<SolutionActivityId, {
    status: ActivityValidationStatus;
    reviews: Record<string, CSuiteMemberReview>;
  }>;
  onViewReview: (review: CSuiteMemberReview) => void;
  onSelectActivity?: (activityId: SolutionActivityId) => void;
  selectedActivityId?: SolutionActivityId;
}

export const ExecutionPipelineTracker: React.FC<ExecutionPipelineTrackerProps> = ({
  activitiesState,
  onViewReview,
  onSelectActivity,
  selectedActivityId = 'architect'
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const activitiesList = Object.values(SOLUTION_ACTIVITIES_MAPPING);

  const totalActivities = activitiesList.length;
  const validatedCount = activitiesList.filter(
    (a) => (activitiesState[a.id]?.status || a.defaultStatus) === 'Validated'
  ).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
      
      {/* Pipeline Header */}
      <div className="p-3.5 sm:p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-700 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">Execution Pipeline</h4>
            <p className="text-[11px] text-slate-500">Live execution status & technical trace logs</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {validatedCount}/{totalActivities} Validated
          </span>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="p-3 sm:p-4 space-y-3.5 max-h-[580px] overflow-y-auto custom-scrollbar">
          {activitiesList.map((act, idx) => {
            const currentActState = activitiesState[act.id] || {
              status: act.defaultStatus,
              reviews: act.reviews
            };
            const isSelected = selectedActivityId === act.id;
            const isChangesRequired = currentActState.status === 'Changes Required';
            const isValidated = currentActState.status === 'Validated';

            return (
              <div
                key={act.id}
                onClick={() => onSelectActivity && onSelectActivity(act.id)}
                className={`relative rounded-xl border p-3.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50/70 ring-1 ring-slate-900/10 shadow-2xs'
                    : isChangesRequired
                    ? 'border-rose-200 bg-rose-50/20 hover:border-rose-300'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                {/* Step Connector Line */}
                {idx < activitiesList.length - 1 && (
                  <div className="absolute left-[26px] -bottom-3.5 w-0.5 h-3.5 bg-slate-200 z-0" />
                )}

                <div className="flex items-start gap-3">
                  {/* Step Number Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 z-10 ${
                      isValidated
                        ? 'bg-emerald-600 text-white'
                        : isChangesRequired
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isValidated ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isChangesRequired ? (
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      act.number
                    )}
                  </div>

                  {/* Step Title & Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Step 0{act.number}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {act.description}
                    </p>

                    {/* C-Suite Validation Layer */}
                    <CSuiteActivityIndicator
                      requiredMembers={act.requiredMembers}
                      reviews={currentActState.reviews}
                      overallStatus={currentActState.status}
                      onViewReview={onViewReview}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
