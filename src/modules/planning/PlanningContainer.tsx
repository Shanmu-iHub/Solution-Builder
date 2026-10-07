import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { cx, useToast } from '../ui';
import { usePlanning } from './PlanningStore';
import { DiscoveryPage, PlanningStage } from './types';
import { IdeaDefinition } from './discovery/IdeaDefinition';
import { OpportunityDiscovery } from './discovery/OpportunityDiscovery';
import { ProblemDiscovery } from './discovery/ProblemDiscovery';
import { SolutionDiscovery } from './discovery/SolutionDiscovery';
import { ProductDefinition } from './discovery/ProductDefinition';
import { Requirements } from './discovery/Requirements';
import { RequirementDocuments } from './discovery/RequirementDocuments';
import { BusinessModel } from './discovery/BusinessModel';
import { SolutionDashboardPhase } from './phases/SolutionDashboardPhase';
import { DocumentationPhase } from './phases/DocumentationPhase';
import { ArchitectureValidation } from './phases/ArchitectureValidation';
import { UxFoundation } from './phases/UxFoundation';
import { Wireframes } from './phases/Wireframes';
import { TaskBreakdown } from './phases/TaskBreakdown';

// Navigation & C-Suite Governance
import { RequirementNavRail } from './navigation/RequirementNavRail';
import { DependencyBanner } from './shared/DependencyBanner';
import { CSuiteExecutivePanel } from './executive/CSuiteExecutivePanel';
import { PHASE_CONFIGS, ORDERED_PHASES, isPhaseInputCompleted, isPhaseUnlocked } from './map/mapData';
import { PlanningNavRail } from './navigation/PlanningNavRail';
import { PlanningStageHeader } from './shared/PlanningStageHeader';
import { PlanningExecutivePanel } from './executive/PlanningExecutivePanel';
import { INITIAL_PLANNING_EXEC, avgScore } from './executive/planningExecutives';
import { PLANNING_STAGE_BY_ID, PLANNING_STAGE_IDS, PlanningStageId, getStageStatus } from './map/planningMap';
import { CSuiteMemberReview } from './executive/csuiteData';

const STAGES: { id: PlanningStage; label: string }[] = [
  { id: 'requirement_context', label: 'Requirement Gathering' },
  { id: 'solution_dashboard', label: 'Solution Dashboard' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'architecture_validation', label: 'Arch Validation' },
  { id: 'ux_foundation', label: 'UX Foundation' },
  { id: 'wireframe_generation', label: 'Wireframe' },
  { id: 'task_breakdown', label: 'Task Breakdown' },
];

export const PlanningContainer: React.FC<{ projectId: string; onBack: () => void; mode: 'requirement' | 'planning' }> = ({ projectId, onBack }) => {
  const { projects, state, patch, setStage } = usePlanning();
  const { setCanvasMode } = useNavigation();
  const { toast } = useToast();
  const project = projects.find(p => p.id === projectId);
  const s = state(projectId);
  const persisted = project?.stage ?? 'requirement_context';

  // Major stage: Requirement Gathering vs Solution Planning
  const [active, setActive] = useState<PlanningStage>('requirement_context');
  // Directly open workspace page as requested (default to current discoveryPage or 'idea')
  const [activeWorkspacePage, setActiveWorkspacePage] = useState<DiscoveryPage>(s.discoveryPage || 'idea');
  // Executive C-Suite Panel state
  const [executivePanelOpen, setExecutivePanelOpen] = useState(false);
  // Navigation rail collapse state
  const [railCollapsed, setRailCollapsed] = useState(false);
  // Solution Planning: nav rail, executive panel and per-stage C-Suite reviews
  const [planRailCollapsed, setPlanRailCollapsed] = useState(false);
  const [planExecOpen, setPlanExecOpen] = useState(false);
  const [planExec, setPlanExec] = useState<Record<PlanningStageId, CSuiteMemberReview[]>>(INITIAL_PLANNING_EXEC);

  useEffect(() => { setCanvasMode(true); return () => setCanvasMode(false); }, [setCanvasMode]);

  if (!project) return null;

  const isRequirementMode = active === 'requirement_context';
  const isReqGatheringCompleted = !!s.documentsConfirmed;
  const planningStages: PlanningStage[] = ['solution_dashboard', 'documentation', 'architecture_validation', 'ux_foundation', 'wireframe_generation', 'task_breakdown'];

  const advance = (next: PlanningStage) => { 
    setActive(next); 
    const order = STAGES.map(x => x.id); 
    if (order.indexOf(next) > order.indexOf(persisted)) setStage(projectId, next); 
  };
  const maxReached = Math.max(planningStages.indexOf(active), planningStages.indexOf(persisted));

  const handleSelectPhase = (phase: DiscoveryPage) => {
    if (!isPhaseUnlocked(s, phase)) {
      const idx = ORDERED_PHASES.indexOf(phase);
      const prevTitle = idx > 0 ? PHASE_CONFIGS[ORDERED_PHASES[idx - 1]].shortTitle : 'previous phase';
      toast({
        title: 'Phase Locked',
        description: `Please complete the inputs for ${prevTitle} before proceeding to this phase.`
      });
      return;
    }
    patch(projectId, { discoveryPage: phase });
    setActiveWorkspacePage(phase);
  };

  const handleNextPhase = () => {
    if (!isPhaseInputCompleted(s, activeWorkspacePage)) {
      const currentConfig = PHASE_CONFIGS[activeWorkspacePage];
      toast({
        title: 'Current Phase Incomplete',
        description: `Please complete and confirm the inputs for ${currentConfig.shortTitle} before continuing to the next phase.`
      });
      return;
    }
    const nextIdx = ORDERED_PHASES.indexOf(activeWorkspacePage) + 1;
    if (nextIdx < ORDERED_PHASES.length) {
      handleSelectPhase(ORDERED_PHASES[nextIdx]);
    } else {
      setExecutivePanelOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Global Header Bar */}
      <div className={cx('bg-white px-6 py-3 shrink-0 z-20 border-b border-slate-200')}>
        <div className="flex items-center justify-between gap-4">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={onBack} 
              className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 hover:text-[#0F172A] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Solutions</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-[#0F172A] font-bold text-[14px] truncate max-w-[240px]">
              {project.name}
            </span>
          </div>

          {/* Center: Stage Switcher (Solution Planning locked until Requirement Gathering completed) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActive('requirement_context')}
              className={cx(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                isRequirementMode ? "bg-slate-900 text-white shadow-xs" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              1. Requirement Gathering
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => {
                if (!isReqGatheringCompleted) {
                  toast({
                    title: 'Solution Planning Locked',
                    description: 'Solution Planning will be opened only when all Requirement Gathering phases are completed and validated.'
                  });
                  return;
                }
                advance('solution_dashboard');
              }}
              className={cx(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
                !isRequirementMode 
                  ? "bg-slate-900 text-white shadow-xs cursor-pointer" 
                  : !isReqGatheringCompleted
                  ? "text-slate-400 bg-slate-100/70 border border-slate-200/60 cursor-not-allowed"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              )}
            >
              {!isReqGatheringCompleted && <Lock className="w-3 h-3 text-slate-400" />}
              <span>2. Solution Planning</span>
            </button>
          </div>

          {/* Right: Executive Panel Button & Progression Button */}
          <div className="flex items-center gap-3 shrink-0">
            {isRequirementMode ? (
              <>
                {/* Executive C-Suite Validation Panel Button */}
                <button
                  onClick={() => setExecutivePanelOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/90 hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Executive Panel</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-extrabold uppercase">
                    C-Suite
                  </span>
                </button>

                {/* Progression Button */}
                {isReqGatheringCompleted ? (
                  <button
                    type="button"
                    onClick={() => advance('solution_dashboard')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Continue to Solution Planning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextPhase}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <span>{activeWorkspacePage === 'documentation' ? 'Complete & Validate' : 'Next Phase →'}</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => setPlanExecOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/90 hover:bg-purple-100 transition-colors cursor-pointer shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Executive Panel</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-extrabold uppercase">
                  C-Suite
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* CASE 1: In Requirement Gathering Mode (directly in phase workspace with left rail) */}
        {isRequirementMode && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Phase Navigation Rail */}
            <RequirementNavRail
              projectId={projectId}
              projectName={project.name}
              activePhase={activeWorkspacePage}
              onSelectPhase={handleSelectPhase}
              collapsed={railCollapsed}
              onToggleCollapse={() => setRailCollapsed(!railCollapsed)}
            />

            {/* Right Main Workspace Canvas */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-white">
              <DependencyBanner
                projectId={projectId}
                projectName={project.name}
                currentPhase={activeWorkspacePage}
                onNavigateToPhase={handleSelectPhase}
              />

              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {activeWorkspacePage === 'idea' && (
                  <IdeaDefinition 
                    projectId={projectId} 
                    projectName={project.name} 
                    onContinue={() => handleSelectPhase('opportunity')} 
                  />
                )}
                {activeWorkspacePage === 'opportunity' && (
                  <OpportunityDiscovery 
                    projectId={projectId} 
                    projectName={project.name} 
                    onContinue={() => handleSelectPhase('problem')} 
                  />
                )}
                {activeWorkspacePage === 'problem' && (
                  <ProblemDiscovery 
                    projectId={projectId} 
                    projectName={project.name} 
                    onContinue={() => handleSelectPhase('solution')} 
                  />
                )}
                {activeWorkspacePage === 'solution' && (
                  <SolutionDiscovery 
                    projectId={projectId} 
                    projectName={project.name} 
                    onContinue={() => handleSelectPhase('business_model')} 
                  />
                )}
                {activeWorkspacePage === 'business_model' && (
                  <BusinessModel 
                    projectId={projectId} 
                    projectName={project.name} 
                    onComplete={() => handleSelectPhase('product_definition')} 
                  />
                )}
                {activeWorkspacePage === 'product_definition' && (
                  <ProductDefinition 
                    projectId={projectId} 
                    projectName={project.name} 
                    onComplete={() => handleSelectPhase('requirements')} 
                  />
                )}
                {activeWorkspacePage === 'requirements' && (
                  <Requirements 
                    projectId={projectId} 
                    projectName={project.name} 
                    onComplete={() => handleSelectPhase('documentation')} 
                  />
                )}
                {activeWorkspacePage === 'documentation' && (
                  <RequirementDocuments 
                    projectId={projectId} 
                    projectName={project.name} 
                    onComplete={() => {
                      patch(projectId, { documentsConfirmed: true });
                      setExecutivePanelOpen(true);
                      toast({
                        title: 'Requirement Gathering Completed!',
                        description: 'C-Suite documentation sign-off ready. Solution Planning is now unlocked.'
                      });
                    }} 
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* CASE 2: In Solution Planning Mode (left rail with locked / open stages, like Requirement Gathering) */}
        {!isRequirementMode && (
          <div className="flex-1 flex overflow-hidden">
            <PlanningNavRail
              active={active}
              maxReached={maxReached}
              scores={Object.fromEntries(PLANNING_STAGE_IDS.map(id => [id, avgScore(planExec[id])])) as Record<PlanningStageId, number>}
              onSelect={id => setActive(id)}
              onBackToRequirements={() => setActive('requirement_context')}
              collapsed={planRailCollapsed}
              onToggleCollapse={() => setPlanRailCollapsed(!planRailCollapsed)}
            />

            <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-white">
              <PlanningStageHeader
                stage={PLANNING_STAGE_BY_ID[active]}
                status={getStageStatus(active, active, maxReached)}
                reviews={planExec[active]}
                onOpenExecutives={() => setPlanExecOpen(true)}
              />
              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {active === 'solution_dashboard' && <SolutionDashboardPhase projectId={projectId} projectName={project.name} onComplete={() => advance('documentation')} />}
                {active === 'documentation' && <DocumentationPhase projectId={projectId} projectName={project.name} onComplete={() => advance('architecture_validation')} />}
                {active === 'architecture_validation' && <ArchitectureValidation projectId={projectId} onComplete={() => advance('ux_foundation')} />}
                {active === 'ux_foundation' && <UxFoundation projectId={projectId} projectName={project.name} onComplete={() => advance('wireframe_generation')} />}
                {active === 'wireframe_generation' && <Wireframes projectId={projectId} onComplete={() => advance('task_breakdown')} />}
                {active === 'task_breakdown' && <TaskBreakdown projectId={projectId} projectName={project.name} />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* C-Suite Executive Panel Modal */}
      <CSuiteExecutivePanel
        open={executivePanelOpen}
        onClose={() => setExecutivePanelOpen(false)}
        projectId={projectId}
        projectName={project.name}
        initialPhase={activeWorkspacePage}
      />

      {/* Solution Planning C-Suite Panel */}
      <PlanningExecutivePanel
        open={planExecOpen}
        onClose={() => setPlanExecOpen(false)}
        projectName={project.name}
        reviews={planExec}
        onChange={(stage, list) => setPlanExec(prev => ({ ...prev, [stage]: list }))}
        initialStage={active === 'requirement_context' ? 'solution_dashboard' : active}
      />
    </div>
  );
};
