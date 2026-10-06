import { ExecutiveId, StageId, ExecutiveDefinition } from './types';

export const EXECUTIVE_DEFINITIONS: Record<ExecutiveId, ExecutiveDefinition> = {
  CPO: {
    id: 'CPO',
    name: 'Chief Product Officer',
    role: 'Product scope, user value and product opportunity',
    scope: 'Validates product relevance, user value and product opportunity.',
    defaultFeedbackApproved: 'Product scope and user needs are clearly aligned. User value is validated with zero blocking issues.',
    defaultFeedbackChanges: 'Product definition requires clearer persona boundaries between primary field reps and back-office staff.'
  },
  CBO: {
    id: 'CBO',
    name: 'Chief Business Officer',
    role: 'Business relevance and operational impact',
    scope: 'Validates business relevance, business context and operational value.',
    defaultFeedbackApproved: 'Business context and operational value are fully aligned with departmental workflows.',
    defaultFeedbackChanges: 'Operational disruption risk has not been adequately analyzed for the finance reconciliation team.'
  },
  CMO: {
    id: 'CMO',
    name: 'Chief Marketing Officer',
    role: 'Market and customer relevance',
    scope: 'Validates market and customer relevance.',
    defaultFeedbackApproved: 'Market citations and customer segment definitions are verified against industry benchmarks.',
    defaultFeedbackChanges: 'Competitive differentiation against existing enterprise expense platforms requires clearer articulation.'
  },
  CSO: {
    id: 'CSO',
    name: 'Chief Strategy Officer',
    role: 'Strategic alignment and direction',
    scope: 'Validates strategic alignment.',
    defaultFeedbackApproved: 'Strategic alignment with enterprise digital automation pillars is thoroughly satisfied.',
    defaultFeedbackChanges: 'Strategic initiative does not show clear integration into the corporate multi-year cloud roadmap.'
  },
  CFO: {
    id: 'CFO',
    name: 'Chief Financial Officer',
    role: 'Financial relevance and feasibility',
    scope: 'Validates financial and business-value relevance.',
    defaultFeedbackApproved: 'Cost assumptions and payback calculations follow realistic financial modeling without ungrounded assumptions.',
    defaultFeedbackChanges: 'Financial feasibility cannot be validated because the cost assumptions and ROI savings parameters are missing.'
  },
  CTO: {
    id: 'CTO',
    name: 'Chief Technology Officer',
    role: 'Technical feasibility and architecture',
    scope: 'Validates technical feasibility.',
    defaultFeedbackApproved: 'System architecture, API specifications, and service boundaries meet technical standards.',
    defaultFeedbackChanges: 'Define the external integration contract with legacy ERP / SAP Concur before solution planning can be approved.'
  },
  CDO: {
    id: 'CDO',
    name: 'Chief Data Officer',
    role: 'Data feasibility and governance',
    scope: 'Validates data feasibility and data requirements.',
    defaultFeedbackApproved: 'Data entities, relational schemas, and audit log pipelines satisfy enterprise governance standards.',
    defaultFeedbackChanges: 'Entity relationship model lacks immutable transaction history for expense approval lifecycle.'
  },
  CISO: {
    id: 'CISO',
    name: 'Chief Information Security Officer',
    role: 'Security, privacy and compliance',
    scope: 'Validates security and privacy feasibility.',
    defaultFeedbackApproved: 'Security perimeters, RBAC definitions, and SOC2/GDPR compliance frameworks are fully verified.',
    defaultFeedbackChanges: 'Employee reimbursement banking info and receipts require explicit AES-256 encryption at rest and TLS 1.3 in transit.'
  },
  CIO: {
    id: 'CIO',
    name: 'Chief Information Officer',
    role: 'Operational and delivery readiness',
    scope: 'Validates operational / implementation readiness.',
    defaultFeedbackApproved: 'IT infrastructure support tiers and deployment change management are ready for delivery.',
    defaultFeedbackChanges: 'Rollout plan lacks Level 2 internal IT helpdesk support SLA and migration cutover schedule.'
  },
  CEO: {
    id: 'CEO',
    name: 'Chief Executive Officer',
    role: 'Master orchestration and executive approval',
    scope: 'Final executive approval and cross-domain orchestration.',
    defaultFeedbackApproved: 'All required C-Suite perspectives have signed off. The solution package is approved for engineering handoff.',
    defaultFeedbackChanges: 'Stage blocked due to outstanding domain executive issues that require resolution.'
  }
};

export class ExecutiveSelector {
  public static select(stageId: StageId, context?: { documentType?: string }): ExecutiveId[] {
    switch (stageId) {
      case 'idea-understanding':
        // CPO, CBO, CMO, CSO, CFO
        return ['CPO', 'CBO', 'CMO', 'CSO', 'CFO'];

      case 'opportunity':
        // CBO, CMO, CSO, CFO
        return ['CBO', 'CMO', 'CSO', 'CFO'];

      case 'problem-discovery':
        // CPO, CBO (Do NOT unnecessarily invoke CMO, CTO, CDO, CISO, CIO here)
        return ['CPO', 'CBO'];

      case 'solution-discovery':
        // CPO, CTO, CDO, CISO
        return ['CPO', 'CTO', 'CDO', 'CISO'];

      case 'business-model':
        // CBO, CSO, CFO, CMO
        return ['CBO', 'CSO', 'CFO', 'CMO'];

      case 'product-definition':
        // CPO, CTO, CDO, CISO
        return ['CPO', 'CTO', 'CDO', 'CISO'];

      case 'requirements':
        // CPO, CBO, CTO, CDO, CISO
        return ['CPO', 'CBO', 'CTO', 'CDO', 'CISO'];

      case 'documents':
        // Domain-based validation
        if (context?.documentType) {
          return this.selectForDocument(context.documentType);
        }
        return ['CPO', 'CBO', 'CTO', 'CDO', 'CISO', 'CFO'];

      case 'review':
        // Final C-Suite validation
        return ['CPO', 'CBO', 'CTO', 'CDO', 'CISO', 'CFO', 'CSO', 'CMO'];

      case 'handoff':
        // CEO, CTO, CIO
        return ['CEO', 'CTO', 'CIO'];

      default:
        return ['CPO', 'CBO'];
    }
  }

  public static selectForDocument(documentType: string): ExecutiveId[] {
    switch (documentType.toUpperCase()) {
      case 'PRD':
        return ['CPO'];
      case 'BRD':
        return ['CBO'];
      case 'SRS':
      case 'SAD':
      case 'ARCHITECTURE':
        return ['CTO'];
      case 'DATABASE':
      case 'DATA_ARCHITECTURE':
        return ['CDO'];
      case 'SECURITY':
      case 'COMPLIANCE':
        return ['CISO'];
      case 'FINANCIAL':
      case 'BUSINESS_CASE':
        return ['CFO'];
      case 'MARKET':
      case 'COMPETITIVE':
        return ['CMO'];
      case 'STRATEGY':
        return ['CSO'];
      default:
        return ['CPO'];
    }
  }

  public static getDefinition(id: ExecutiveId): ExecutiveDefinition {
    return EXECUTIVE_DEFINITIONS[id] || EXECUTIVE_DEFINITIONS['CPO'];
  }
}
