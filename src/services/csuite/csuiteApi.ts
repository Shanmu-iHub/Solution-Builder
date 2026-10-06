import { StageId, ExecutiveId, ExecutiveReview, StageGateEvaluation } from './types';
import { MasterAgent } from './MasterAgent';
import { ConsolidatedReport } from './ReportService';

export class CSuiteApiClient {
  /**
   * POST /api/csuite/stage/start
   */
  public static async startStage(
    stageId: StageId,
    stageData: any = {},
    upstreamData: any = {},
    scenario: 'approved' | 'needs-changes' = 'approved',
    onProgress?: (execId: ExecutiveId, state: string) => void
  ): Promise<{ reviews: ExecutiveReview[]; gate: StageGateEvaluation; report: ConsolidatedReport }> {
    return MasterAgent.startStage(stageId, stageData, upstreamData, scenario, onProgress);
  }

  /**
   * POST /api/csuite/stage/:stageId/revalidate
   */
  public static async revalidateStage(
    stageId: StageId,
    executives?: ExecutiveId[],
    stageData: any = {},
    upstreamData: any = {}
  ): Promise<{ reviews: ExecutiveReview[]; gate: StageGateEvaluation; report: ConsolidatedReport }> {
    return MasterAgent.revalidateStage(stageId, executives, stageData, upstreamData);
  }

  /**
   * GET /api/csuite/stage/:stageId/status
   */
  public static async getStageStatus(stageId: StageId): Promise<StageGateEvaluation | undefined> {
    return MasterAgent.getStageGate(stageId);
  }

  /**
   * GET /api/csuite/stage/:stageId/review
   */
  public static async getStageReviews(stageId: StageId): Promise<ExecutiveReview[]> {
    return MasterAgent.getReviews(stageId);
  }

  /**
   * GET /api/csuite/stage/:stageId/report
   */
  public static async getStageReport(stageId: StageId): Promise<ConsolidatedReport | undefined> {
    return MasterAgent.getReport(stageId);
  }

  /**
   * POST /api/csuite/stage/:stageId/approve
   */
  public static async approveStage(stageId: StageId): Promise<{ approved: boolean }> {
    const gate = MasterAgent.getStageGate(stageId);
    return { approved: gate?.decision === 'APPROVED' };
  }
}
