import { ExecutiveId, ExecutiveReview, StageGateDecision } from './types';

export interface ConsensusEvaluation {
  hasConsensus: boolean;
  decision: StageGateDecision;
  unanimousApproval: boolean;
  conflictingExecutives: Array<{
    execA: ExecutiveId;
    execB: ExecutiveId;
    topic: string;
  }>;
  dissentingExecutives: ExecutiveId[];
  summary: string;
}

export class ConsensusEngine {
  public static evaluate(
    requiredExecutives: ExecutiveId[],
    reviews: ExecutiveReview[]
  ): ConsensusEvaluation {
    const reviewMap = new Map<ExecutiveId, ExecutiveReview>();
    reviews.forEach((r) => reviewMap.set(r.executiveId, r));

    const dissentingExecutives: ExecutiveId[] = [];
    const missingExecutives: ExecutiveId[] = [];

    requiredExecutives.forEach((reqId) => {
      const review = reviewMap.get(reqId);
      if (!review) {
        missingExecutives.push(reqId);
      } else if (review.decision === 'NEEDS_CHANGES') {
        dissentingExecutives.push(reqId);
      }
    });

    if (missingExecutives.length > 0) {
      return {
        hasConsensus: false,
        decision: 'IN_PROGRESS',
        unanimousApproval: false,
        conflictingExecutives: [],
        dissentingExecutives,
        summary: `Validation in progress. Awaiting reviews from ${missingExecutives.join(', ')}.`
      };
    }

    if (dissentingExecutives.length > 0) {
      return {
        hasConsensus: false,
        decision: 'NEEDS_CHANGES',
        unanimousApproval: false,
        conflictingExecutives: [],
        dissentingExecutives,
        summary: `${dissentingExecutives.length} required C-Suite executive(s) (${dissentingExecutives.join(
          ', '
        )}) identified blocking issues that must be addressed.`
      };
    }

    return {
      hasConsensus: true,
      decision: 'APPROVED',
      unanimousApproval: true,
      conflictingExecutives: [],
      dissentingExecutives: [],
      summary: `All ${requiredExecutives.length} required C-Suite perspectives have reached consensus and approved the stage output.`
    };
  }
}
