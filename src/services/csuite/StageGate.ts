import { StageId, ExecutiveId, ExecutiveReview, StageGateEvaluation, StageGateDecision } from './types';
import { ConsensusEngine } from './ConsensusEngine';

export class StageGate {
  public static evaluate(
    stageId: StageId,
    requiredExecutives: ExecutiveId[],
    reviews: ExecutiveReview[]
  ): StageGateEvaluation {
    const timestamp = new Date().toISOString();
    const consensus = ConsensusEngine.evaluate(requiredExecutives, reviews);

    const reviewMap = new Map<ExecutiveId, ExecutiveReview>();
    reviews.forEach((r) => reviewMap.set(r.executiveId, r));

    const validatedExecutives: ExecutiveId[] = [];
    const executivesWithIssues: ExecutiveId[] = [];
    let blockingIssuesCount = 0;

    requiredExecutives.forEach((id) => {
      const review = reviewMap.get(id);
      if (review) {
        if (review.decision === 'VALIDATED') {
          validatedExecutives.push(id);
        } else {
          executivesWithIssues.push(id);
          blockingIssuesCount += review.findings.filter((f) => f.blocking).length;
        }
      }
    });

    let decision: StageGateDecision = consensus.decision;
    let summaryMessage = consensus.summary;

    if (executivesWithIssues.length > 0 || blockingIssuesCount > 0) {
      decision = 'NEEDS_CHANGES';
      summaryMessage = `${executivesWithIssues.length} executive(s) require changes before this stage can proceed. Total blocking issues: ${blockingIssuesCount}.`;
    } else if (validatedExecutives.length === requiredExecutives.length && requiredExecutives.length > 0) {
      decision = 'APPROVED';
      summaryMessage = 'All required C-Suite perspectives validated. Stage approved to continue.';
    } else {
      decision = 'IN_PROGRESS';
      summaryMessage = 'Validation in progress.';
    }

    return {
      stageId,
      requiredExecutives,
      validatedExecutives,
      executivesWithIssues,
      blockingIssuesCount,
      decision,
      summaryMessage,
      timestamp
    };
  }
}
