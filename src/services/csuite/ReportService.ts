import { StageId, ExecutiveReview, StageGateEvaluation } from './types';
import { StageRouter } from './StageRouter';

export interface ConsolidatedReport {
  reportId: string;
  stageId: StageId;
  stageTitle: string;
  generatedAt: string;
  gateEvaluation: StageGateEvaluation;
  executiveSummaries: Array<{
    executiveId: string;
    executiveName: string;
    role: string;
    decision: string;
    feedback: string;
    checksPassed: number;
    checksTotal: number;
    blockingFindings: number;
  }>;
  executiveNarrative: string;
}

export class ReportService {
  public static generate(
    stageId: StageId,
    gateEvaluation: StageGateEvaluation,
    reviews: ExecutiveReview[]
  ): ConsolidatedReport {
    const stage = StageRouter.resolve(stageId);
    const reportId = `rep-${stageId}-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const executiveSummaries = reviews.map((r) => ({
      executiveId: r.executiveId,
      executiveName: r.executiveName,
      role: r.role,
      decision: r.decision,
      feedback: r.feedback,
      checksPassed: r.checks.filter((c) => c.passed).length,
      checksTotal: r.checks.length,
      blockingFindings: r.findings.filter((f) => f.blocking).length
    }));

    const isApproved = gateEvaluation.decision === 'APPROVED';

    const executiveNarrative = isApproved
      ? `The executive leadership team has reviewed stage deliverables for "${stage.title}". All ${reviews.length} required perspectives (Product, Business, Technical, Financial, and Operational) validated that the deliverables satisfy enterprise quality standards. Stage is approved for downstream advancement.`
      : `Executive review identified ${gateEvaluation.blockingIssuesCount} blocking issues across ${gateEvaluation.executivesWithIssues.length} executive domains (${gateEvaluation.executivesWithIssues.join(
          ', '
        )}). Deliverables require revision and re-validation before stage gating can pass.`;

    return {
      reportId,
      stageId,
      stageTitle: stage.title,
      generatedAt: timestamp,
      gateEvaluation,
      executiveSummaries,
      executiveNarrative
    };
  }
}
