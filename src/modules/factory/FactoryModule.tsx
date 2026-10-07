import React, { useState } from 'react';
import { FactoryProjectsPage } from './ProjectsPage';
import { SelectorPage } from './SelectorPage';
import { BuilderWorkspace } from './workspace/BuilderWorkspace';
import { MigrationWorkspace } from './migration/MigrationWorkspace';
import { RepoGroupsPage } from './migration/RepoGroupsPage';
import { PlannerAppWorkspace } from './planner/PlannerAppWorkspace';
import { useFactory } from './FactoryStore';
import { FactoryKind } from './types';

type Route = { page: 'selector' } | { page: 'projects'; kind: FactoryKind } | { page: 'groups' } | { page: 'workspace'; id: string; kind: FactoryKind };

/** Solution Factory — selector → project lists → workspaces (full stack, UI canvas, code migration, planner application). */
export const SolutionFactoryModule: React.FC = () => {
  const { projects } = useFactory();
  const [route, setRoute] = useState<Route>({ page: 'selector' });
  const go = (r: Route) => { setRoute(r); window.scrollTo({ top: 0 }); };

  if (route.page === 'selector') return <SelectorPage onPick={kind => go({ page: 'projects', kind })} />;
  if (route.page === 'groups') return <RepoGroupsPage onBack={() => go({ page: 'projects', kind: 'code-migration' })} />;
  if (route.page === 'projects')
    return <FactoryProjectsPage kind={route.kind} onBack={() => go({ page: 'selector' })} onGroups={() => go({ page: 'groups' })} onOpen={id => go({ page: 'workspace', id, kind: route.kind })} />;

  const project = projects.find(p => p.projectId === route.id);
  const back = () => go({ page: 'projects', kind: route.kind });
  if (!project) return <SelectorPage onPick={kind => go({ page: 'projects', kind })} />;

  if (project.kind === 'code-migration') return <MigrationWorkspace project={project} onBack={back} />;
  if (project.kind === 'planner-app') return <PlannerAppWorkspace project={project} onBack={back} onOpenBuild={id => go({ page: 'workspace', id, kind: 'full-stack' })} />;
  return <BuilderWorkspace key={project.projectId} project={project} onBack={back} />;
};
