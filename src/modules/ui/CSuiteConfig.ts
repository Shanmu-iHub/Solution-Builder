export type CSuiteRole = 'CEO' | 'CPO' | 'CBO' | 'CTO' | 'CSO' | 'CMO' | 'CFO' | 'CDO' | 'CISO' | 'CIO';
export type ValidationStatus = 'Validated' | 'Needs Attention' | 'Failed' | 'Pending';

export interface CSuiteReview {
  role: CSuiteRole;
  reviewed: string;
  validation: string;
  findings: string;
  action?: string;
  risk?: 'Low' | 'Medium' | 'High';
}

export interface CSuiteStageConfig {
  stageId: string;
  reviews: CSuiteReview[];
}

export const CSUITE_CONFIG: CSuiteStageConfig[] = [
  {
    stageId: 'opportunity',
    reviews: [
      { role: 'CMO', reviewed: 'Market opportunity, customer segment, customer need, and market relevance.', validation: 'Current definition is consistent with the identified customer and market context.', findings: 'No critical market alignment gaps identified.', risk: 'Low' },
      { role: 'CBO', reviewed: 'Business alignment and market fit.', validation: 'Business feasibility and customer fit are sound for this stage.', findings: 'Market sizing is preliminary but acceptable.', risk: 'Low' }
    ]
  },
  {
    stageId: 'problem',
    reviews: [
      { role: 'CPO', reviewed: 'Problem definition, user pain points, and target user needs.', validation: 'The identified problem is clear, actionable, and aligns with product strategy.', findings: 'User needs are well-defined.', risk: 'Low' },
      { role: 'CBO', reviewed: 'Business problem relevance.', validation: 'The problem represents a valid business opportunity.', findings: 'No conflicts with current business priorities.', risk: 'Low' }
    ]
  },
  {
    stageId: 'solution',
    reviews: [
      { role: 'CPO', reviewed: 'Solution direction, product capability, and problem alignment.', validation: 'Proposed solution effectively addresses the validated problem.', findings: 'Product capabilities are well mapped to user pain points.', risk: 'Low' },
      { role: 'CTO', reviewed: 'Technical feasibility at a high level.', validation: 'The solution direction is technically viable based on current capabilities.', findings: 'No immediate technical blockers identified.', risk: 'Medium' }
    ]
  },
  {
    stageId: 'business-model',
    reviews: [
      { role: 'CSO', reviewed: 'Strategic alignment and business model.', validation: 'The proposed business model aligns with long-term organizational strategy.', findings: 'Strategic fit is confirmed.', risk: 'Low' },
      { role: 'CFO', reviewed: 'Revenue model, cost assumptions, and financial feasibility.', validation: 'Financial assumptions are sound and business viability is acceptable.', findings: 'Initial cost estimates require refinement in later stages.', risk: 'Medium' },
      { role: 'CBO', reviewed: 'Business viability and operational model.', validation: 'Operational requirements are achievable.', findings: 'No critical business blockers.', risk: 'Low' }
    ]
  },
  {
    stageId: 'product',
    reviews: [
      { role: 'CPO', reviewed: 'Product scope, capabilities, feature definition, and UX direction.', validation: 'The product definition provides sufficient direction for detailed requirements.', findings: 'User value and product goals are clearly established.', risk: 'Low' }
    ]
  },
  {
    stageId: 'requirements',
    reviews: [
      { role: 'CPO', reviewed: 'Functional and product requirements, requirement completeness.', validation: 'Requirements are complete and correctly specify product behavior.', findings: 'No significant gaps in user flows.', risk: 'Low' },
      { role: 'CBO', reviewed: 'Business requirements and consistency.', validation: 'Requirements accurately reflect the validated business model.', findings: 'Business objectives are fully supported by requirements.', risk: 'Low' },
      { role: 'CTO', reviewed: 'Technical and non-functional requirements.', validation: 'Technical constraints and system requirements are accurately captured.', findings: 'Performance and scaling requirements are adequate.', risk: 'Low' }
    ]
  },
  {
    stageId: 'documents',
    reviews: [
      { role: 'CPO', reviewed: 'Product alignment and documentation completeness.', validation: 'Requirements documents provide a complete picture of the product.', findings: 'Traceability from problem to requirement is solid.', risk: 'Low' },
      { role: 'CBO', reviewed: 'Business alignment.', validation: 'Business assumptions are fully documented and validated.', findings: 'No gaps in business documentation.', risk: 'Low' },
      { role: 'CTO', reviewed: 'Technical feasibility coverage.', validation: 'Technical requirements documentation is sufficient for architecture planning.', findings: 'Ready for solution planning phase.', risk: 'Low' },
      { role: 'CFO', reviewed: 'Financial assumptions.', validation: 'Cost boundaries and ROI assumptions are documented.', findings: 'Financial parameters are clear.', risk: 'Low' },
      { role: 'CSO', reviewed: 'Strategic requirements.', validation: 'Strategic alignment is maintained in final requirements.', findings: 'Ready for phase gate.', risk: 'Low' }
    ]
  },
  {
    stageId: 'architecture_validation',
    reviews: [
      { role: 'CTO', reviewed: 'System architecture, API design, integration approach, and technology choices.', validation: 'The architecture is technically consistent with approved requirements and feasible.', findings: 'No critical architecture conflicts identified.', risk: 'Low' },
      { role: 'CDO', reviewed: 'Data architecture, database design, entity relationships, and storage.', validation: 'Proposed data model supports requirements without structural gaps.', findings: 'Data flow is logical and scales well.', risk: 'Low' },
      { role: 'CISO', reviewed: 'Security architecture, authentication, authorization, and controls.', validation: 'No critical security architecture gaps were identified.', findings: 'Threat considerations are properly addressed.', risk: 'Low' }
    ]
  },
  {
    stageId: 'solution-factory',
    reviews: [
      { role: 'CPO', reviewed: 'Product behavior, feature implementation, and UI/UX alignment.', validation: 'The build accurately reflects the approved product requirements.', findings: 'No blocking product issues.', risk: 'Low' },
      { role: 'CTO', reviewed: 'Technical integration, API endpoints, and system communication.', validation: 'Technical implementation is consistent with the architecture.', findings: 'Code quality and technical correctness are validated.', risk: 'Low' },
      { role: 'CDO', reviewed: 'Database interactions, data seeding, schema, and data integrity.', validation: 'Data structures and database operations function as designed.', findings: 'Data integrity checks passed.', risk: 'Low' },
      { role: 'CISO', reviewed: 'Security vulnerabilities, secure coding, and sensitive data handling.', validation: 'Security controls are properly implemented.', findings: 'No high-severity vulnerabilities detected.', risk: 'Low' },
      { role: 'CIO', reviewed: 'Build readiness, environment readiness, and deployment.', validation: 'The solution is ready for deployment.', findings: 'Infrastructure and deployment pipelines are validated.', risk: 'Low' }
    ]
  }
];

export const ROLE_LABELS: Record<CSuiteRole, string> = {
  CEO: 'Chief Executive Officer (CEO)',
  CPO: 'Chief Product Officer (CPO)',
  CBO: 'Chief Business Officer (CBO)',
  CTO: 'Chief Technology Officer (CTO)',
  CSO: 'Chief Strategy Officer (CSO)',
  CMO: 'Chief Marketing Officer (CMO)',
  CFO: 'Chief Financial Officer (CFO)',
  CDO: 'Chief Data Officer (CDO)',
  CISO: 'Chief Information Security Officer (CISO)',
  CIO: 'Chief Information Officer (CIO)'
};
