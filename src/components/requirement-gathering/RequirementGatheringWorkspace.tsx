import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StageId, StageStatus } from '../../services/csuite/types';
import { StageRouter } from '../../services/csuite/StageRouter';
import { StageStepper } from './StageStepper';
import { RGStoreProvider, useRGStore } from './engine/RGStore';

import { IdeaUnderstandingStage } from './stages/IdeaUnderstandingStage';
import { PhaseStage } from './engine/PhaseStage';
import { PHASE_CONFIGS } from './engine/phaseConfigs';


const STATUS_LABEL: Record<StageStatus, string> = {
  Draft: 'Not started',
  'In Progress': 'In progress',
  'Needs Validation': 'Needs your input',
  Validated: 'Confirmed',
  Blocked: 'On hold',
  Completed: 'Confirmed'
};

const STATUS_STYLE: Record<StageStatus, string> = {
  Draft: 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-blue-50 text-blue-700',
  'Needs Validation': 'bg-amber-50 text-amber-800',
  Validated: 'bg-emerald-50 text-emerald-700',
  Blocked: 'bg-rose-50 text-rose-700',
  Completed: 'bg-emerald-50 text-emerald-700'
};

export const RequirementGatheringWorkspace: React.FC = () => (
  <RGStoreProvider>
    <WorkspaceContent />
  </RGStoreProvider>
);

const WorkspaceContent: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const { statuses, setStatus } = useRGStore();

  const [currentStageId, setCurrentStageId] = useState<StageId>('idea-understanding');
  // Furthest stage the user has reached — stages beyond it can't be opened from the stage bar
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);

  const allStageIds = StageRouter.getAllStages().map((s) => s.id);
  const currentStageConfig = StageRouter.resolve(currentStageId);
  const prevStageId = StageRouter.getPreviousStage(currentStageId);
  const nextStageId = StageRouter.getNextStage(currentStageId);
  const nextStageConfig = nextStageId ? StageRouter.resolve(nextStageId) : null;
  const currentStatus = statuses[currentStageId];
  // Continue stays locked until the user confirms (or approves) the stage output
  const canContinue = currentStatus === 'Completed';

  const goTo = (id: StageId) => {
    setCurrentStageId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinue = () => {
    if (!nextStageId || !canContinue) return;
    if (statuses[nextStageId] === 'Draft') setStatus(nextStageId, 'In Progress');
    setMaxReachedIndex((prev) => Math.max(prev, allStageIds.indexOf(nextStageId)));
    goTo(nextStageId);
  };

  const renderActiveStageContent = () => {
    const config = PHASE_CONFIGS[currentStageId];
    // key resets local state when switching between config-driven stages
    return config ? <PhaseStage key={currentStageId} config={config} /> : <IdeaUnderstandingStage />;
  };

  return (
    <div className="w-full animate-fade-in">
      <StageStepper
        currentStageId={currentStageId}
        stageStatuses={statuses}
        maxReachedIndex={maxReachedIndex}
        onSelectStage={goTo}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{currentStageConfig.title}</h1>
            <p className="text-sm text-slate-500 max-w-3xl">{currentStageConfig.subtitle}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[currentStatus]}`}>
            {STATUS_LABEL[currentStatus]}
          </span>
        </div>

        {renderActiveStageContent()}
      </div>

      {/* Single sticky footer: Back + one primary action */}
      <div className="sticky bottom-0 z-20 mt-8 bg-white/95 backdrop-blur border-t border-slate-200">
        <div className="pl-4 sm:pl-6 lg:pl-8 pr-20 py-3 flex items-center justify-between gap-4">
          {prevStageId ? (
            <button
              type="button"
              onClick={() => goTo(prevStageId)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-3">
            {!canContinue && <span className="hidden sm:inline text-xs text-slate-500">Confirm this stage to continue</span>}
            <button
              type="button"
              onClick={nextStageId ? handleContinue : () => setCurrentView('solution-builder-ide')}
              disabled={!canContinue}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#18181b] hover:bg-black text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {nextStageId ? `Continue to ${nextStageConfig?.title}` : 'Proceed to Solution Builder IDE'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
