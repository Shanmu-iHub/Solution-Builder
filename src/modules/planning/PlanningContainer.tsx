import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { cx } from '../ui';
import { usePlanning } from './PlanningStore';
import { DiscoveryPage, PlanningStage } from './types';
import { IdeaDefinition } from './discovery/IdeaDefinition';
import { OpportunityDiscovery } from './discovery/OpportunityDiscovery';
import { ProblemDiscovery } from './discovery/ProblemDiscovery';
import { SolutionDashboardPhase } from './phases/SolutionDashboardPhase';
import { DocumentationPhase } from './phases/DocumentationPhase';
import { ArchitectureValidation } from './phases/ArchitectureValidation';
import { UxFoundation } from './phases/UxFoundation';
import { Wireframes } from './phases/Wireframes';
import { TaskBreakdown } from './phases/TaskBreakdown';

const STAGES: { id: PlanningStage; label: string }[] = [
  { id: 'requirement_context', label: 'Requirement Discovery' },
  { id: 'solution_dashboard', label: 'Solution Dashboard' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'architecture_validation', label: 'Arch Validation' },
  { id: 'ux_foundation', label: 'UX Foundation' },
  { id: 'wireframe_generation', label: 'Wireframe' },
  { id: 'task_breakdown', label: 'Task Breakdown' },
];
const MAIN = [
  { id: 'requirement_context', label: 'Requirement Gathering', stages: ['requirement_context'] as PlanningStage[] },
  { id: 'solution_planning', label: 'Solution Planning', stages: ['solution_dashboard', 'documentation', 'architecture_validation', 'ux_foundation', 'wireframe_generation', 'task_breakdown'] as PlanningStage[] },
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

export const PlanningContainer: React.FC<{ projectId: string; onBack: () => void }> = ({ projectId, onBack }) => {
  const { projects, state, patch, setStage } = usePlanning();
  const { setCanvasMode } = useNavigation();
  const project = projects.find(p => p.id === projectId);
  const s = state(projectId);
  const persisted = project?.stage ?? 'requirement_context';
  const [active, setActive] = useState<PlanningStage>(persisted);
  useEffect(() => { setCanvasMode(true); return () => setCanvasMode(false); }, [setCanvasMode]);

  if (!project) return null;
  const mainIdx = MAIN.findIndex(m => m.stages.includes(active));
  const main = MAIN[mainIdx];
  const persistedMain = MAIN.findIndex(m => m.stages.includes(persisted));
  const advance = (next: PlanningStage) => { setActive(next); const order = STAGES.map(x => x.id); if (order.indexOf(next) > order.indexOf(persisted)) setStage(projectId, next); };
  const maxReached = Math.max(main.stages.indexOf(active), main.stages.indexOf(persisted));

  const discoverySteps: { key: DiscoveryPage; label: string }[] = [{ key: 'idea', label: 'Idea Definition' }, { key: 'opportunity', label: 'Opportunity & Discovery' }, { key: 'problem', label: 'Problem Discovery' }];
  const dIdx = discoverySteps.findIndex(d => d.key === s.discoveryPage);
  const dReach = (i: number) => i === 0 || (i === 1 && s.briefConfirmed) || (i === 2 && s.oppCompleted) || i <= dIdx;

  const goMain = (dir: -1 | 1) => { const n = MAIN[mainIdx + dir]; if (n && (dir < 0 || persistedMain >= mainIdx + 1 || persisted !== 'requirement_context')) setActive(n.stages[0]); };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className={cx('bg-white px-6 pt-3 shrink-0 z-20 border-b border-slate-200 pb-3')}>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 hover:text-[#0F172A] cursor-pointer"><ArrowLeft className="w-4 h-4" />Solutions<span className="text-slate-300">/</span><span className="text-[#0F172A] max-w-[200px] truncate">{project.name}</span></button>
          </div>
          <div className="flex items-center gap-1.5 -ml-2 mt-1">
            <button onClick={() => goMain(-1)} disabled={mainIdx === 0} className={cx('p-1.5 rounded-lg transition-colors', mainIdx > 0 ? 'hover:bg-slate-100 text-slate-600 cursor-pointer' : 'text-slate-300 cursor-not-allowed')}><ChevronLeft className="w-5 h-5" /></button>
            <div className="text-[22px] font-bold tracking-tight text-[#0F172A]">{main.label}</div>
            <button onClick={() => goMain(1)} disabled={mainIdx >= MAIN.length - 1 || persistedMain < 1} className={cx('p-1.5 rounded-lg transition-colors', mainIdx < MAIN.length - 1 && persistedMain >= 1 ? 'hover:bg-slate-100 text-slate-600 cursor-pointer' : 'text-slate-300 cursor-not-allowed')}><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="mt-1.5">
            {main.id === 'requirement_context' ? (
              <Stepper items={discoverySteps} active={s.discoveryPage} reachable={dReach} done={i => i < dIdx} onSelect={k => patch(projectId, { discoveryPage: k as DiscoveryPage })} />
            ) : (
              <Stepper items={main.stages.map(id => ({ key: id, label: STAGES.find(x => x.id === id)!.label }))} active={active} reachable={i => i <= maxReached} done={i => i < maxReached} onSelect={k => setActive(k as PlanningStage)} />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {active === 'requirement_context' && s.discoveryPage === 'idea' && <IdeaDefinition projectId={projectId} projectName={project.name} onContinue={() => patch(projectId, { discoveryPage: 'opportunity' })} />}
        {active === 'requirement_context' && s.discoveryPage === 'opportunity' && <OpportunityDiscovery projectId={projectId} projectName={project.name} onBack={() => patch(projectId, { discoveryPage: 'idea' })} onContinue={() => patch(projectId, { discoveryPage: 'problem' })} />}
        {active === 'requirement_context' && s.discoveryPage === 'problem' && <ProblemDiscovery projectId={projectId} projectName={project.name} onBack={() => patch(projectId, { discoveryPage: 'opportunity' })} onProceed={() => advance('solution_dashboard')} />}
        {active === 'solution_dashboard' && <SolutionDashboardPhase projectId={projectId} projectName={project.name} onComplete={() => advance('documentation')} />}
        {active === 'documentation' && <DocumentationPhase projectId={projectId} projectName={project.name} onComplete={() => advance('architecture_validation')} />}
        {active === 'architecture_validation' && <ArchitectureValidation projectId={projectId} onComplete={() => advance('ux_foundation')} />}
        {active === 'ux_foundation' && <UxFoundation projectId={projectId} projectName={project.name} onComplete={() => advance('wireframe_generation')} />}
        {active === 'wireframe_generation' && <Wireframes projectId={projectId} onComplete={() => advance('task_breakdown')} />}
        {active === 'task_breakdown' && <TaskBreakdown projectId={projectId} projectName={project.name} />}
      </div>
    </div>
  );
};
