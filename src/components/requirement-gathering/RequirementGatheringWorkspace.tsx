import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { StageId, StageStatus, ExecutiveReview, StageGateEvaluation } from '../../services/csuite/types';
import { StageRouter } from '../../services/csuite/StageRouter';
import { MasterAgent } from '../../services/csuite/MasterAgent';
import { StageStepper } from './StageStepper';
import { CSuiteValidationPanel } from './CSuiteValidationPanel';

// 10 Stages
import { IdeaUnderstandingStage } from './stages/IdeaUnderstandingStage';
import { OpportunityDiscoveryStage } from './stages/OpportunityDiscoveryStage';
import { ProblemDiscoveryStage } from './stages/ProblemDiscoveryStage';
import { SolutionDiscoveryStage } from './stages/SolutionDiscoveryStage';
import { BusinessModelStage } from './stages/BusinessModelStage';
import { ProductDefinitionStage } from './stages/ProductDefinitionStage';
import { RequirementsStage } from './stages/RequirementsStage';
import { DocumentsStage } from './stages/DocumentsStage';
import { ReviewStage } from './stages/ReviewStage';
import { HandoffStage } from './stages/HandoffStage';

export const RequirementGatheringWorkspace: React.FC = () => {
  const { setCurrentView } = useNavigation();

  // Active Stage (Default: 'idea-understanding')
  const [currentStageId, setCurrentStageId] = useState<StageId>('idea-understanding');

  // Stage Statuses
  const [stageStatuses, setStageStatuses] = useState<Record<StageId, StageStatus>>({
    'idea-understanding': 'Validated',
    'opportunity': 'In Progress',
    'problem-discovery': 'Draft',
    'solution-discovery': 'Draft',
    'business-model': 'Draft',
    'product-definition': 'Draft',
    'requirements': 'Draft',
    'documents': 'Draft',
    'review': 'Draft',
    'handoff': 'Draft'
  });

  // Validation Scenarios per stage ('approved' | 'needs-changes')
  const [stageScenarios, setStageScenarios] = useState<Record<StageId, 'approved' | 'needs-changes'>>({
    'idea-understanding': 'approved',
    'opportunity': 'approved',
    'problem-discovery': 'approved',
    'solution-discovery': 'approved',
    'business-model': 'approved',
    'product-definition': 'approved',
    'requirements': 'approved',
    'documents': 'approved',
    'review': 'approved',
    'handoff': 'approved'
  });

  // Current stage C-Suite reviews & Gate
  const [reviews, setReviews] = useState<ExecutiveReview[]>([]);
  const [gateEvaluation, setGateEvaluation] = useState<StageGateEvaluation | null>(null);
  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);

  const currentStageConfig = StageRouter.resolve(currentStageId);
  const nextStageId = StageRouter.getNextStage(currentStageId);
  const nextStageConfig = nextStageId ? StageRouter.resolve(nextStageId) : null;
  const currentScenario = stageScenarios[currentStageId] || 'approved';

  // Load / run C-Suite validation whenever currentStageId or scenario changes
  useEffect(() => {
    let isCancelled = false;

    const runValidation = async () => {
      setIsRevalidating(true);
      const result = await MasterAgent.startStage(
        currentStageId,
        { stage: currentStageId, version: 'v2.0' },
        {},
        currentScenario
      );

      if (!isCancelled) {
        setReviews(result.reviews);
        setGateEvaluation(result.gate);
        setIsRevalidating(false);

        // Update stage status based on decision
        setStageStatuses((prev) => ({
          ...prev,
          [currentStageId]: result.gate.decision === 'APPROVED' ? 'Validated' : 'Blocked'
        }));
      }
    };

    runValidation();

    return () => {
      isCancelled = true;
    };
  }, [currentStageId, currentScenario]);

  // Scenario Switcher (Happy path vs Needs changes)
  const handleScenarioChange = (scenario: 'approved' | 'needs-changes') => {
    setStageScenarios((prev) => ({
      ...prev,
      [currentStageId]: scenario
    }));
  };

  // Revalidate action
  const handleRevalidate = async () => {
    setIsRevalidating(true);
    // Revalidation simulates user fixing the stage issue and rerunning the executives
    const result = await MasterAgent.revalidateStage(currentStageId);
    setReviews(result.reviews);
    setGateEvaluation(result.gate);
    setIsRevalidating(false);

    setStageScenarios((prev) => ({
      ...prev,
      [currentStageId]: 'approved'
    }));

    setStageStatuses((prev) => ({
      ...prev,
      [currentStageId]: 'Validated'
    }));
  };

  // Advance to next stage
  const handleContinue = () => {
    if (nextStageId) {
      // Mark current stage as Completed
      setStageStatuses((prev) => ({
        ...prev,
        [currentStageId]: 'Completed',
        [nextStageId]: prev[nextStageId] === 'Draft' ? 'In Progress' : prev[nextStageId]
      }));

      setCurrentStageId(nextStageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    const prevId = StageRouter.getPreviousStage(currentStageId);
    if (prevId) {
      setCurrentStageId(prevId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextStage = () => {
    if (nextStageId) {
      setCurrentStageId(nextStageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderActiveStageContent = () => {
    switch (currentStageId) {
      case 'idea-understanding':
        return <IdeaUnderstandingStage />;
      case 'opportunity':
        return <OpportunityDiscoveryStage />;
      case 'problem-discovery':
        return <ProblemDiscoveryStage />;
      case 'solution-discovery':
        return <SolutionDiscoveryStage />;
      case 'business-model':
        return <BusinessModelStage />;
      case 'product-definition':
        return <ProductDefinitionStage />;
      case 'requirements':
        return <RequirementsStage />;
      case 'documents':
        return <DocumentsStage />;
      case 'review':
        return <ReviewStage />;
      case 'handoff':
        return <HandoffStage />;
      default:
        return <IdeaUnderstandingStage />;
    }
  };

  return (
    <div className="w-full pb-20 animate-fade-in select-none">
      
      {/* 1. Stage Stepper Navigation Header */}
      <StageStepper
        currentStageId={currentStageId}
        stageStatuses={stageStatuses}
        onSelectStage={(id) => {
          setCurrentStageId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onPrevStage={handlePrevStage}
        onNextStage={handleNextStage}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* 2. Stage Title & Eyebrow */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {currentStageConfig.phaseLabel}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {currentStageConfig.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
            {currentStageConfig.subtitle}
          </p>
        </div>

        {/* 3. Main Stage Content */}
        {renderActiveStageContent()}

        {/* 4. C-Suite Validation & Stage Gate Panel */}
        {gateEvaluation && (
          <CSuiteValidationPanel
            stageId={currentStageId}
            nextStageTitle={nextStageConfig?.title}
            reviews={reviews}
            gateEvaluation={gateEvaluation}
            onContinue={handleContinue}
            onRevalidate={handleRevalidate}
            onScenarioChange={handleScenarioChange}
            activeScenario={currentScenario}
            isRevalidating={isRevalidating}
          />
        )}
      </div>
    </div>
  );
};
