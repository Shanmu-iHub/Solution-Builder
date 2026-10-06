import React, { useState } from 'react';
import { PlanningContainer } from './PlanningContainer';
import { SolutionsListPage } from './SolutionsListPage';

/** Solution Architect (Solution Planning): solutions list → planning lifecycle. */
export const SolutionPlanningModule: React.FC = () => {
  const [projectId, setProjectId] = useState<string | null>(null);
  if (projectId) return <PlanningContainer key={projectId} projectId={projectId} onBack={() => setProjectId(null)} />;
  return <SolutionsListPage onOpen={setProjectId} />;
};
