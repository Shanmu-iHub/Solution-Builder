import { PlanningStage } from '../types';

/** The six Solution Planning stages (everything after Requirement Gathering), in order. */
export type PlanningStageId = Exclude<PlanningStage, 'requirement_context'>;

export interface PlanningStageConfig {
  id: PlanningStageId;
  num: string;
  title: string;
  shortTitle: string;
  tagline: string;
}

export const PLANNING_STAGES: PlanningStageConfig[] = [
  { id: 'solution_dashboard', num: '01', title: 'Solution Dashboard', shortTitle: 'Solution Dashboard', tagline: 'Recommended solution and business case' },
  { id: 'documentation', num: '02', title: 'Documentation', shortTitle: 'Documentation', tagline: 'Architecture and design documents' },
  { id: 'architecture_validation', num: '03', title: 'Architecture Validation', shortTitle: 'Arch Validation', tagline: 'Technical, data and security review' },
  { id: 'ux_foundation', num: '04', title: 'UX Foundation', shortTitle: 'UX Foundation', tagline: 'Personas and user journeys' },
  { id: 'wireframe_generation', num: '05', title: 'Wireframes', shortTitle: 'Wireframes', tagline: 'Screens, flows and interactions' },
  { id: 'task_breakdown', num: '06', title: 'Task Breakdown', shortTitle: 'Task Breakdown', tagline: 'Epics, stories and delivery plan' },
];

export const PLANNING_STAGE_IDS: PlanningStageId[] = PLANNING_STAGES.map(s => s.id);

export const PLANNING_STAGE_BY_ID = Object.fromEntries(PLANNING_STAGES.map(s => [s.id, s])) as Record<PlanningStageId, PlanningStageConfig>;

export interface PlanningArea { id: string; label: string; stages: PlanningStageId[] }

export const PLANNING_AREAS: PlanningArea[] = [
  { id: 'blueprint', label: 'BLUEPRINT', stages: ['solution_dashboard', 'documentation'] },
  { id: 'validate', label: 'VALIDATE', stages: ['architecture_validation'] },
  { id: 'design', label: 'DESIGN', stages: ['ux_foundation', 'wireframe_generation'] },
  { id: 'deliver', label: 'DELIVER', stages: ['task_breakdown'] },
];

export type PlanningStageStatus = 'completed' | 'active' | 'open' | 'locked';

/** A stage is open once the one before it has been completed; everything before the furthest reached stage is completed. */
export const getStageStatus = (id: PlanningStageId, active: PlanningStage, maxReached: number): PlanningStageStatus => {
  const i = PLANNING_STAGE_IDS.indexOf(id);
  if (id === active) return 'active';
  if (i < maxReached) return 'completed';
  if (i === maxReached) return 'open';
  return 'locked';
};
