import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';
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
import { PHASE_CONFIGS } from './map/mapData';

const STAGES: { id: PlanningStage; label: string }[] = [
  { id: 'requirement_context', label: 'Requirement Gathering' },
  { id: 'solution_dashboard', label: 'Solution Dashboard' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'architecture_validation', label: 'Arch Validation' },
  { id: 'ux_foundation', label: 'UX Foundation' },
  { id: 'wireframe_generation', label: 'Wireframe' },
  { id: 'task_breakdown', label: 'Task Breakdown' },
];

const Stepper: React.FC<{ items: { key: string; label: string }[]; active: string; reachable: (i: number) => boolean; done: (i: number) => boolean; onSelect: (k: string) => void }> = ({ items, active, reachable, done, onSelect }) => (
  <nav className="w-full overflow-x-auto flex mt-1">
    <ol className="flex items-center min-w-max mx-auto">
      {items.map((it, i) => {
        const isActive = it.key === active;
        const isDone = done(i) && !isActive;
        const can = reachable(i);
        return (
          <li key={it.key} className="flex items-center shrink-0">
            <button type="button" disabled={!can} onClick={() => can && onSelect(it.key)} aria-current={isActive ? 'step' : undefined} className={cx('flex items-center gap-2 px-1.5 py-1 rounded-lg transition-colors', can && !isActive ? 'cursor-pointer hover:bg-slate-50' : 'cursor-default')}>
              <span className={cx('flex items-center justify-center w-6 h-6 rounded-full border text-[12.5px] font-bold transition-colors', isActive ? 'bg-[#2563EB] text-white border-[#2563EB] ring-4 ring-blue-100' : isDone ? 'bg-emerald-500 text-white border-emerald-500' : can ? 'bg-white text-slate-500 border-slate-300' : 'bg-white text-slate-300 border-slate-200')}>{isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}</span>
              <span className={cx('text-[12.5px] uppercase tracking-[0.12em] transition-colors', isActive ? 'text-[#0F172A] font-bold' : isDone ? 'text-slate-600 font-semibold' : can ? 'text-slate-400 font-semibold' : 'text-slate-300 font-semibold')}>{it.label}</span>
            </button>
            {i < items.length - 1 && <span aria-hidden className={cx('mx-1.5 h-px w-7 rounded-full', isDone || (done(i + 1) && i < items.length) ? 'bg-emerald-500' : 'bg-slate-200')} />}
          </li>
        );
      })}
    </ol>
  </nav>
);

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
    patch(projectId, { discoveryPage: phase });
    setActiveWorkspacePage(phase);
  };

  const handleNextPhase = () => {
    const phases: DiscoveryPage[] = ['idea', 'opportunity', 'problem', 'solution', 'business_model', 'product_definition', 'requirements', 'documentation'];
    const nextIdx = phases.indexOf(activeWorkspacePage) + 1;
    if (nextIdx < phases.length) {
      handleSelectPhase(phases[nextIdx]);
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
                type="button"
                onClick={() => setActive('requirement_context')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Requirement Gathering</span>
              </button>
            )}
          </div>
        </div>

        {/* Planning Stepper only when in Solution Planning mode */}
        {!isRequirementMode && (
          <div className="mt-2 pt-2 border-t border-slate-100">
            <Stepper 
              items={planningStages.map(id => ({ key: id, label: STAGES.find(x => x.id === id)!.label }))} 
              active={active} 
              reachable={i => i <= maxReached} 
              done={i => i < maxReached} 
              onSelect={k => setActive(k as PlanningStage)} 
            />
          </div>
        )}
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
              onOpenExecutivePanel={() => setExecutivePanelOpen(true)}
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
                    onOpenExecutivePanel={() => setExecutivePanelOpen(true)}
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

        {/* CASE 2: In Solution Planning Mode */}
        {!isRequirementMode && (
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {active === 'solution_dashboard' && <SolutionDashboardPhase projectId={projectId} projectName={project.name} onComplete={() => advance('documentation')} />}
            {active === 'documentation' && <DocumentationPhase projectId={projectId} projectName={project.name} onComplete={() => advance('architecture_validation')} />}
            {active === 'architecture_validation' && <ArchitectureValidation projectId={projectId} onComplete={() => advance('ux_foundation')} />}
            {active === 'ux_foundation' && <UxFoundation projectId={projectId} projectName={project.name} onComplete={() => advance('wireframe_generation')} />}
            {active === 'wireframe_generation' && <Wireframes projectId={projectId} onComplete={() => advance('task_breakdown')} />}
            {active === 'task_breakdown' && <TaskBreakdown projectId={projectId} projectName={project.name} />}
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
    </div>
  );
};
