import React, { useEffect, useRef } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { StageId, StageStatus } from '../../services/csuite/types';
import { StageRouter } from '../../services/csuite/StageRouter';

interface StageStepperProps {
  currentStageId: StageId;
  stageStatuses: Record<StageId, StageStatus>;
  maxReachedIndex: number;
  onSelectStage: (stageId: StageId) => void;
}

export const StageStepper: React.FC<StageStepperProps> = ({
  currentStageId,
  stageStatuses,
  maxReachedIndex,
  onSelectStage
}) => {
  const allStages = StageRouter.getAllStages();
  const activeRef = useRef<HTMLButtonElement>(null);

  // Keep the active stage visible when the bar overflows
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [currentStageId]);

  return (
    <nav aria-label="Requirement gathering stages" className="w-full bg-white border-b border-slate-200 sticky top-14 z-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto custom-scrollbar py-2.5">
        <ol className="flex items-center min-w-max gap-1 sm:gap-2">
          {allStages.map((stage, idx) => {
            const isActive = stage.id === currentStageId;
            const status = stageStatuses[stage.id] || 'Draft';
            const isConfirmed = status === 'Completed' || status === 'Validated';
            const needsInput = status === 'Needs Validation' || status === 'Blocked';
            const isLocked = idx > maxReachedIndex;

            return (
              <li key={stage.id} className="flex items-center gap-1 sm:gap-2">
                <button
                  ref={isActive ? activeRef : undefined}
                  type="button"
                  disabled={isLocked}
                  aria-current={isActive ? 'step' : undefined}
                  title={isLocked ? 'Complete the previous stages first' : undefined}
                  onClick={() => onSelectStage(stage.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : isLocked
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100 cursor-pointer'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive
                        ? 'bg-white text-slate-900'
                        : isConfirmed
                        ? 'bg-emerald-100 text-emerald-700'
                        : needsInput
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isConfirmed && !isActive ? (
                      <Check className="w-3 h-3 stroke-[3]" aria-label="Confirmed" />
                    ) : needsInput && !isActive ? (
                      <AlertCircle className="w-3 h-3" aria-label="Needs your input" />
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <span>{stage.label}</span>
                </button>
                {idx < allStages.length - 1 && <span aria-hidden className="w-3 sm:w-4 h-px bg-slate-200" />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
