import { PhaseSkill, SkillPhase, skillsFor } from '../SkillsLoader';
import { PlanningStageId } from '../map/planningMap';

const STAGE_PHASE: Partial<Record<PlanningStageId, SkillPhase>> = {
  documentation: 'documentation',
  architecture_validation: 'validation',
  ux_foundation: 'ux',
  wireframe_generation: 'wireframes',
};

/** Skills a planning stage uses. Stages without task skills still load the project context and the domain skill. */
export const stageSkills = (stage: PlanningStageId, projectName: string, description = ''): PhaseSkill[] => {
  const phase = STAGE_PHASE[stage];
  if (phase) return skillsFor(phase, projectName, description);
  const base = skillsFor('documentation', projectName, description);
  return [base[0], base[base.length - 1]];
};
