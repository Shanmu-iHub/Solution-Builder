import React from 'react';
import { ChevronRight, ChevronLeft, Check, AlertTriangle, Clock } from 'lucide-react';
import { StageId, StageStatus } from '../../services/csuite/types';
import { STAGES_CONFIG, StageRouter } from '../../services/csuite/StageRouter';

interface StageStepperProps {
  currentStageId: StageId;
  stageStatuses: Record<StageId, StageStatus>;
  onSelectStage: (stageId: StageId) => void;
  onPrevStage?: () => void;
  onNextStage?: () => void;
}

const STATUS_COLOR_MAP: Record<StageStatus, { bg: string; text: string; dot: string }> = {
  Draft: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  'In Progress': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Needs Validation': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  Validated: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Blocked: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
  Completed: { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-600' }
};

export const StageStepper: React.FC<StageStepperProps> = ({
  currentStageId,
  stageStatuses,
  onSelectStage,
  onPrevStage,
  onNextStage
}) => {
  const allStages = StageRouter.getAllStages();

  return (
    <div className="w-full bg-white border-b border-slate-200/80 sticky top-14 z-20 shadow-2xs">
      
      {/* Top Header Bar: < Requirement Gathering > */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevStage}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Previous Stage"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Requirement Gathering
          </h2>

          <button
            onClick={onNextStage}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Next Stage"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Current Stage Status Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">Current Phase Status:</span>
          {(() => {
            const status = stageStatuses[currentStageId] || 'In Progress';
            const style = STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP['In Progress'];
            return (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                {status}
              </span>
            );
          })()}
        </div>
      </div>

      {/* Horizontal Stage Navigation Stepper (01 to 10) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto custom-scrollbar py-2.5">
        <div className="flex items-center min-w-max gap-1 sm:gap-2">
          {allStages.map((stage, idx) => {
            const isActive = stage.id === currentStageId;
            const status = stageStatuses[stage.id] || 'Draft';
            const isCompleted = status === 'Completed' || status === 'Validated';
            const isBlocked = status === 'Blocked';

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Item Pill */}
                <button
                  type="button"
                  onClick={() => onSelectStage(stage.id)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap select-none ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : isBlocked
                      ? 'bg-rose-50/70 text-rose-800 hover:bg-rose-100/70'
                      : isCompleted
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {/* Stage Number / Status Icon */}
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-white text-slate-900'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isBlocked
                        ? 'bg-rose-200 text-rose-800'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted && !isActive ? (
                      <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                    ) : (
                      parseInt(stage.number, 10)
                    )}
                  </span>

                  {/* Stage Label */}
                  <span className="uppercase tracking-wider text-[11px]">
                    {stage.label}
                  </span>
                </button>

                {/* Connecting Line */}
                {idx < allStages.length - 1 && (
                  <div
                    className={`w-3 sm:w-5 h-px shrink-0 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
