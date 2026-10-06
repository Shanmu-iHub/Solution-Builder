import { ExecutiveId, ExecutiveRuntimeState, ExecutiveReview } from './types';
import { ValidationTask } from './ExecutiveTaskManager';
import { ProviderFactory } from './ProviderFactory';
import { ExecutiveSelector } from './ExecutiveSelector';

export class ExecutiveRuntime {
  private state: ExecutiveRuntimeState = 'IDLE';
  private executiveId: ExecutiveId;
  private currentTask: ValidationTask | null = null;
  private lastReview: ExecutiveReview | null = null;

  constructor(executiveId: ExecutiveId) {
    this.executiveId = executiveId;
  }

  public getState(): ExecutiveRuntimeState {
    return this.state;
  }

  public getExecutiveId(): ExecutiveId {
    return this.executiveId;
  }

  public getLastReview(): ExecutiveReview | null {
    return this.lastReview;
  }

  public async execute(
    task: ValidationTask,
    scenario: 'approved' | 'needs-changes' = 'approved',
    onStateChange?: (state: ExecutiveRuntimeState) => void
  ): Promise<ExecutiveReview> {
    this.currentTask = task;

    // 1. ASSIGNED
    this.transition('ASSIGNED', onStateChange);

    // 2. PREPARING
    this.transition('PREPARING', onStateChange);

    // 3. VALIDATING
    this.transition('VALIDATING', onStateChange);

    const provider = ProviderFactory.getInstance();
    const result = await provider.executeExecutivePrompt({
      executiveId: this.executiveId,
      stageId: task.stageId,
      skillContent: JSON.stringify(task.skill),
      stageContext: task.inputs,
      evaluationScenario: scenario
    });

    // 4. GENERATING_REPORT
    this.transition('GENERATING_REPORT', onStateChange);

    const execDef = ExecutiveSelector.getDefinition(this.executiveId);
    const timestamp = new Date().toISOString();

    const review: ExecutiveReview = {
      executiveId: this.executiveId,
      executiveName: execDef.name,
      role: execDef.role,
      validationScope: execDef.scope,
      reviewedInputs: task.inputs.documentsReviewed || ['Confirmed Stage Deliverables'],
      checks: result.checks,
      findings: result.findings,
      evidence: result.evidence,
      decision: result.decision,
      feedback: result.feedback,
      timestamp,
      traceability: {
        documentId: `doc-${task.stageId}-${Date.now().toString().slice(-4)}`,
        documentVersion: task.inputs.version || 'v1.0',
        stageId: task.stageId,
        executiveId: this.executiveId,
        validationResult: result.decision,
        issues: result.findings.filter((f) => f.blocking).map((f) => f.title),
        decision: result.decision,
        timestamp
      }
    };

    this.lastReview = review;

    // 5. COMPLETED or NEEDS_CHANGES
    if (result.decision === 'NEEDS_CHANGES') {
      this.transition('NEEDS_CHANGES', onStateChange);
    } else {
      this.transition('COMPLETED', onStateChange);
    }

    return review;
  }

  public triggerWaitingForResubmission(onStateChange?: (state: ExecutiveRuntimeState) => void): void {
    if (this.state === 'NEEDS_CHANGES') {
      this.transition('WAITING_FOR_RESUBMISSION', onStateChange);
    }
  }

  public triggerRevalidating(onStateChange?: (state: ExecutiveRuntimeState) => void): void {
    this.transition('REVALIDATING', onStateChange);
  }

  private transition(
    newState: ExecutiveRuntimeState,
    callback?: (state: ExecutiveRuntimeState) => void
  ): void {
    this.state = newState;
    if (callback) {
      callback(newState);
    }
  }
}
