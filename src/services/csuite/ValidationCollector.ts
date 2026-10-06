import { ExecutiveReview, ValidationDecision } from './types';

export class ValidationService {
  public static validateReview(review: ExecutiveReview): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!review.executiveId) {
      errors.push('Missing executive identifier');
    }
    if (!review.decision) {
      errors.push('Review missing explicit decision (VALIDATED or NEEDS_CHANGES)');
    }
    if (review.decision === 'NEEDS_CHANGES' && (!review.findings || review.findings.length === 0)) {
      errors.push('Decision NEEDS_CHANGES requires at least one actionable finding');
    }
    if (!review.traceability || !review.traceability.stageId) {
      errors.push('Review missing document traceability metadata');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class ValidationCollector {
  private reviews: Map<string, ExecutiveReview> = new Map();

  public clear(stageId: string): void {
    const keysToRemove: string[] = [];
    this.reviews.forEach((_, key) => {
      if (key.startsWith(`${stageId}:`)) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach((k) => this.reviews.delete(k));
  }

  public addReview(stageId: string, review: ExecutiveReview): void {
    this.reviews.set(`${stageId}:${review.executiveId}`, review);
  }

  public getReviewsForStage(stageId: string): ExecutiveReview[] {
    const results: ExecutiveReview[] = [];
    this.reviews.forEach((review, key) => {
      if (key.startsWith(`${stageId}:`)) {
        results.push(review);
      }
    });
    return results;
  }

  public getReview(stageId: string, executiveId: string): ExecutiveReview | undefined {
    return this.reviews.get(`${stageId}:${executiveId}`);
  }

  public getDecisionSummary(stageId: string): {
    total: number;
    validated: number;
    needsChanges: number;
    blockingCount: number;
  } {
    const stageReviews = this.getReviewsForStage(stageId);
    const validated = stageReviews.filter((r) => r.decision === 'VALIDATED').length;
    const needsChanges = stageReviews.filter((r) => r.decision === 'NEEDS_CHANGES').length;
    const blockingCount = stageReviews.reduce(
      (sum, r) => sum + r.findings.filter((f) => f.blocking).length,
      0
    );

    return {
      total: stageReviews.length,
      validated,
      needsChanges,
      blockingCount
    };
  }
}
