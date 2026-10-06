import { ExecutiveId, StageId, ExecutiveSkill } from './types';
import { EXECUTIVE_SKILLS } from './skills';

export interface ValidationTask {
  taskId: string;
  stageId: StageId;
  executiveId: ExecutiveId;
  skill: ExecutiveSkill;
  inputs: {
    stageData: any;
    upstreamData: any;
    documentsReviewed: string[];
    version: string;
  };
  assignedAt: string;
}

export class ExecutiveTaskManager {
  public static assignTasks(
    stageId: StageId,
    executives: ExecutiveId[],
    stageData: any,
    upstreamData: any,
    documentsReviewed: string[] = ['Stage Deliverable v1.0']
  ): ValidationTask[] {
    const timestamp = new Date().toISOString();

    return executives.map((execId) => {
      const skill = EXECUTIVE_SKILLS[execId] || EXECUTIVE_SKILLS['CPO'];
      return {
        taskId: `task-${stageId}-${execId}-${Date.now()}`,
        stageId,
        executiveId: execId,
        skill,
        inputs: {
          stageData,
          upstreamData,
          documentsReviewed,
          version: stageData?.version || 'v1.0'
        },
        assignedAt: timestamp
      };
    });
  }
}
