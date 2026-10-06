export type ExecutiveId =
  | 'CPO'
  | 'CBO'
  | 'CMO'
  | 'CSO'
  | 'CFO'
  | 'CTO'
  | 'CDO'
  | 'CISO'
  | 'CIO'
  | 'CEO';

export type StageId =
  | 'idea-understanding'
  | 'opportunity'
  | 'problem-discovery'
  | 'solution-discovery'
  | 'business-model'
  | 'product-definition'
  | 'requirements'
  | 'documents'
  | 'review'
  | 'handoff';

export type StageStatus =
  | 'Draft'
  | 'In Progress'
  | 'Needs Validation'
  | 'Validated'
  | 'Blocked'
  | 'Completed';

export type ExecutiveRuntimeState =
  | 'IDLE'
  | 'ASSIGNED'
  | 'PREPARING'
  | 'VALIDATING'
  | 'GENERATING_REPORT'
  | 'COMPLETED'
  | 'NEEDS_CHANGES'
  | 'WAITING_FOR_RESUBMISSION'
  | 'REVALIDATING';

export type ValidationDecision = 'VALIDATED' | 'NEEDS_CHANGES';

export type StageGateDecision = 'APPROVED' | 'NEEDS_CHANGES' | 'IN_PROGRESS';

export interface ValidationCheck {
  id: string;
  label: string;
  passed: boolean;
  message?: string;
}

export interface ValidationFinding {
  id: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  blocking: boolean;
  suggestion?: string;
}

export interface TraceabilityRecord {
  documentId: string;
  documentVersion: string;
  stageId: StageId;
  executiveId: ExecutiveId;
  validationResult: ValidationDecision;
  issues: string[];
  decision: ValidationDecision;
  timestamp: string;
}

export interface ExecutiveReview {
  executiveId: ExecutiveId;
  executiveName: string;
  role: string;
  validationScope: string;
  reviewedInputs: string[];
  checks: ValidationCheck[];
  findings: ValidationFinding[];
  evidence: string[];
  decision: ValidationDecision;
  feedback: string;
  timestamp: string;
  traceability: TraceabilityRecord;
}

export interface ExecutiveDefinition {
  id: ExecutiveId;
  name: string;
  role: string;
  scope: string;
  defaultFeedbackApproved: string;
  defaultFeedbackChanges: string;
}

export interface StageGateEvaluation {
  stageId: StageId;
  requiredExecutives: ExecutiveId[];
  validatedExecutives: ExecutiveId[];
  executivesWithIssues: ExecutiveId[];
  blockingIssuesCount: number;
  decision: StageGateDecision;
  summaryMessage: string;
  timestamp: string;
}

export interface ExecutiveSkill {
  executiveId: ExecutiveId;
  responsibility: string;
  validationCriteria: string[];
  allowedDecisions: ValidationDecision[];
  requiredEvidence: string[];
  blockingConditions: string[];
  reportFormat: string;
}

export interface StageConfig {
  id: StageId;
  number: string;
  label: string;
  phaseLabel: string;
  title: string;
  subtitle: string;
  requiredExecutives: ExecutiveId[];
}
