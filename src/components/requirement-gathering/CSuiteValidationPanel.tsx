import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Info
} from 'lucide-react';
import { StageId, ExecutiveReview, StageGateEvaluation } from '../../services/csuite/types';
import { ExecutiveValidationCard } from './ExecutiveValidationCard';
import { StageGateBanner } from './StageGateBanner';
import { ExecutiveReviewDrawer } from './ExecutiveReviewDrawer';

interface CSuiteValidationPanelProps {
  stageId: StageId;
  nextStageTitle?: string;
  reviews: ExecutiveReview[];
  gateEvaluation: StageGateEvaluation;
  onContinue: () => void;
  onRevalidate: () => void;
  onFixIssues?: () => void;
  onScenarioChange?: (scenario: 'approved' | 'needs-changes') => void;
  activeScenario?: 'approved' | 'needs-changes';
  isRevalidating?: boolean;
}

export const CSuiteValidationPanel: React.FC<CSuiteValidationPanelProps> = ({
  stageId,
  nextStageTitle,
  reviews,
  gateEvaluation,
  onContinue,
  onRevalidate,
  onFixIssues,
  onScenarioChange,
  activeScenario = 'approved',
  isRevalidating = false
}) => {
  const [selectedReview, setSelectedReview] = useState<ExecutiveReview | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewReview = (review: ExecutiveReview) => {
    setSelectedReview(review);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const totalCount = reviews.length;
  const validatedCount = reviews.filter((r) => r.decision === 'VALIDATED').length;
  const isAllValidated = validatedCount === totalCount && totalCount > 0;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200" id="sec-csuite-validation">
      {/* Panel Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              C-SUITE VALIDATION
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sparkles className="w-3 h-3" />
              Multi-Agent Governance
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {isAllValidated ? 'Stage validated & approved' : 'Stage requires changes'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isAllValidated
              ? 'All required executive perspectives for this stage have validated the stage output and verified evidence traceability.'
              : 'One or more required C-Suite perspectives identified issues that must be addressed before this stage can proceed.'}
          </p>
        </div>

        {/* Counter Badge & Scenario Toggle */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
              isAllValidated
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {isAllValidated ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            )}
            {validatedCount} of {totalCount} validated
          </span>

          {/* Validation Scenario Switcher (Demonstrating Happy Path vs Failed Path) */}
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200/80 text-xs">
            <button
              type="button"
              onClick={() => onScenarioChange && onScenarioChange('approved')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeScenario === 'approved'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Happy Path
            </button>
            <button
              type="button"
              onClick={() => onScenarioChange && onScenarioChange('needs-changes')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeScenario === 'needs-changes'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Needs Changes
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Executive Cards (ONLY REQUIRED FOR THIS STAGE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reviews.map((review) => (
          <ExecutiveValidationCard
            key={review.executiveId}
            review={review}
            onViewReview={handleViewReview}
            onActionClick={handleViewReview}
            isExecuting={isRevalidating}
          />
        ))}
      </div>

      {/* Final Stage Gate Banner */}
      <StageGateBanner
        evaluation={gateEvaluation}
        nextStageTitle={nextStageTitle}
        onContinue={onContinue}
        onFixIssues={onFixIssues || (() => handleViewReview(reviews.find((r) => r.decision === 'NEEDS_CHANGES') || reviews[0]))}
        onRevalidate={onRevalidate}
        isRevalidating={isRevalidating}
      />

      {/* Slide-over review drawer */}
      <ExecutiveReviewDrawer
        review={selectedReview}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </section>
  );
};
