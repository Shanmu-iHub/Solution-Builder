import { StageId, ExecutiveId, ExecutiveReview, StageGateEvaluation } from './types';
import { StageRouter } from './StageRouter';
import { ExecutiveSelector } from './ExecutiveSelector';
import { ExecutiveTaskManager } from './ExecutiveTaskManager';
import { ExecutiveRuntime } from './ExecutiveRuntime';
import { ValidationCollector } from './ValidationCollector';
import { StageGate } from './StageGate';
import { ReworkManager, ReworkTicket } from './ReworkManager';
import { ReportService, ConsolidatedReport } from './ReportService';

export class MasterAgent {
  private static collector = new ValidationCollector();
  private static runtimes: Map<ExecutiveId, ExecutiveRuntime> = new Map();
  private static stageGates: Map<StageId, StageGateEvaluation> = new Map();
  private static reports: Map<StageId, ConsolidatedReport> = new Map();

  private static getRuntime(executiveId: ExecutiveId): ExecutiveRuntime {
    if (!this.runtimes.has(executiveId)) {
      this.runtimes.set(executiveId, new ExecutiveRuntime(executiveId));
    }
    return this.runtimes.get(executiveId)!;
  }

  /**
   * Main entrypoint for starting validation on a stage
   * Orchestrates: Router -> Selector -> Tasks -> Runtime execution -> Collector -> Gate -> Report
   */
  public static async startStage(
    stageId: StageId,
    stageData: any = {},
    upstreamData: any = {},
    scenario: 'approved' | 'needs-changes' = 'approved',
    onExecutiveProgress?: (execId: ExecutiveId, state: string) => void
  ): Promise<{
    reviews: ExecutiveReview[];
    gate: StageGateEvaluation;
    report: ConsolidatedReport;
    tickets: ReworkTicket[];
  }> {
    // 1. Resolve Stage via StageRouter
    const stageConfig = StageRouter.resolve(stageId);

    // 2. Determine Required Executives via ExecutiveSelector
    const requiredExecs = ExecutiveSelector.select(stageId);

    // 3. Clear previous collector reviews for this stage
    this.collector.clear(stageId);
    ReworkManager.clearTickets(stageId);

    // 4. Assign Tasks via ExecutiveTaskManager
    const tasks = ExecutiveTaskManager.assignTasks(
      stageId,
      requiredExecs,
      stageData,
      upstreamData,
      [`${stageConfig.title} Deliverable v1.0`]
    );

    const reviews: ExecutiveReview[] = [];

    // 5. Execute Executive Runtimes
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const runtime = this.getRuntime(task.executiveId);

      // In 'needs-changes' scenario, make the 1st or 2nd executive fail to simulate realistic feedback
      const execScenario =
        scenario === 'needs-changes'
          ? (i === 0 || (tasks.length > 3 && i === tasks.length - 1) ? 'needs-changes' : 'approved')
          : 'approved';

      const review = await runtime.execute(task, execScenario, (state) => {
        if (onExecutiveProgress) {
          onExecutiveProgress(task.executiveId, state);
        }
      });

      // 6. Collect Result in ValidationCollector
      this.collector.addReview(stageId, review);
      reviews.push(review);
    }

    // 7. Evaluate Stage Gate
    const gate = StageGate.evaluate(stageId, requiredExecs, reviews);
    this.stageGates.set(stageId, gate);

    // 8. Track Rework Tickets if any failed
    const tickets = ReworkManager.createIssues(stageId, reviews);

    // 9. Generate Consolidated C-Suite Report
    const report = ReportService.generate(stageId, gate, reviews);
    this.reports.set(stageId, report);

    return { reviews, gate, report, tickets };
  }

  /**
   * Revalidate only affected executives who had issues or specifically requested
   */
  public static async revalidateStage(
    stageId: StageId,
    affectedExecIds?: ExecutiveId[],
    stageData: any = {},
    upstreamData: any = {}
  ): Promise<{
    reviews: ExecutiveReview[];
    gate: StageGateEvaluation;
    report: ConsolidatedReport;
  }> {
    const requiredExecs = ExecutiveSelector.select(stageId);
    const execsToRerun = affectedExecIds || ReworkManager.getAffectedExecutives(stageId);
    const targetExecs = execsToRerun.length > 0 ? execsToRerun : requiredExecs;

    // Create fresh approved reviews for rerun executives (simulating user fixed issues)
    const tasks = ExecutiveTaskManager.assignTasks(
      stageId,
      targetExecs,
      stageData,
      upstreamData,
      ['Revised Stage Deliverable (Post-Rework)']
    );

    for (const task of tasks) {
      const runtime = this.getRuntime(task.executiveId);
      runtime.triggerRevalidating();
      const review = await runtime.execute(task, 'approved');
      this.collector.addReview(stageId, review);
    }

    // Resolve any pending tickets
    targetExecs.forEach((execId) => {
      const tickets = ReworkManager.getTicketsForStage(stageId);
      tickets.filter((t) => t.executiveId === execId).forEach((t) => ReworkManager.resolveTicket(t.ticketId));
    });

    const currentReviews = this.collector.getReviewsForStage(stageId);
    const gate = StageGate.evaluate(stageId, requiredExecs, currentReviews);
    this.stageGates.set(stageId, gate);

    const report = ReportService.generate(stageId, gate, currentReviews);
    this.reports.set(stageId, report);

    return { reviews: currentReviews, gate, report };
  }

  public static getReviews(stageId: StageId): ExecutiveReview[] {
    return this.collector.getReviewsForStage(stageId);
  }

  public static getExecutiveReview(stageId: StageId, executiveId: ExecutiveId): ExecutiveReview | undefined {
    return this.collector.getReview(stageId, executiveId);
  }

  public static getStageGate(stageId: StageId): StageGateEvaluation | undefined {
    return this.stageGates.get(stageId);
  }

  public static getReport(stageId: StageId): ConsolidatedReport | undefined {
    return this.reports.get(stageId);
  }
}
