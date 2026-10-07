import { StageId, StageConfig, ExecutiveId } from './types';

export const STAGES_CONFIG: Record<StageId, StageConfig> = {
  'idea-understanding': {
    id: 'idea-understanding',
    number: '01',
    label: 'Idea Understanding',
    phaseLabel: 'PHASE · DISCOVERY',
    title: 'Idea Definition',
    subtitle: 'Start with what you have. Structure the idea and clarify only what is missing.',
    requiredExecutives: ['CPO', 'CBO', 'CMO', 'CSO', 'CFO']
  },
  'problem-discovery': {
    id: 'problem-discovery',
    number: '02',
    label: 'Problem Discovery',
    phaseLabel: 'PHASE · PROBLEM',
    title: 'Problem Discovery',
    subtitle: 'Identify core pain points, root causes, and business bottlenecks without assumptions.',
    requiredExecutives: ['CPO', 'CBO']
  },
  'opportunity': {
    id: 'opportunity',
    number: '03',
    label: 'Opportunity & Discovery',
    phaseLabel: 'PHASE · DISCOVERY',
    title: 'Opportunity & Discovery',
    subtitle: 'Explore market fit, validate the business opportunity, and identify target customers.',
    requiredExecutives: ['CBO', 'CMO', 'CSO', 'CFO']
  },
  'solution-discovery': {
    id: 'solution-discovery',
    number: '04',
    label: 'Solution Discovery',
    phaseLabel: 'PHASE · SOLUTION',
    title: 'Solution Discovery',
    subtitle: 'Evaluate solution alternatives, map core capabilities, and gauge feasibility.',
    requiredExecutives: ['CPO', 'CTO', 'CDO', 'CISO']
  },
  'business-model': {
    id: 'business-model',
    number: '05',
    label: 'Business Model',
    phaseLabel: 'PHASE · BUSINESS',
    title: 'Business Model & Economics',
    subtitle: 'Formulate value proposition, financial parameters, operational feasibility, and risk mitigations.',
    requiredExecutives: ['CBO', 'CSO', 'CFO', 'CMO']
  },
  'product-definition': {
    id: 'product-definition',
    number: '06',
    label: 'Product Definition',
    phaseLabel: 'PHASE · DEFINE',
    title: 'Product Definition',
    subtitle: 'Define product vision, scope boundaries, core features, and measurable success KPIs.',
    requiredExecutives: ['CPO', 'CTO', 'CDO', 'CISO']
  },
  'requirements': {
    id: 'requirements',
    number: '07',
    label: 'Requirements',
    phaseLabel: 'PHASE · REQUIREMENTS',
    title: 'Requirements Matrix',
    subtitle: 'Document business, user, functional, non-functional, data, and security requirements.',
    requiredExecutives: ['CPO', 'CBO', 'CTO', 'CDO', 'CISO']
  },
  'documents': {
    id: 'documents',
    number: '08',
    label: 'Documents',
    phaseLabel: 'PHASE · SPECIFICATION',
    title: 'Document Deliverables',
    subtitle: 'Generate and validate PRD, BRD, SRS/SAD, Data Architecture, and Security specifications.',
    requiredExecutives: ['CPO', 'CBO', 'CTO', 'CDO', 'CISO', 'CFO']
  },
  'review': {
    id: 'review',
    number: '09',
    label: 'Review',
    phaseLabel: 'PHASE · GOVERNANCE',
    title: 'Executive Review & Alignment',
    subtitle: 'Consolidate C-Suite validation, check traceability, and resolve cross-domain findings.',
    requiredExecutives: ['CPO', 'CBO', 'CTO', 'CDO', 'CISO', 'CFO', 'CSO', 'CMO']
  },
  'handoff': {
    id: 'handoff',
    number: '10',
    label: 'Handoff',
    phaseLabel: 'PHASE · HANDOFF',
    title: 'Delivery & Engineering Handoff',
    subtitle: 'Confirm technical, operational, and executive readiness to hand off to implementation teams.',
    requiredExecutives: ['CEO', 'CTO', 'CIO']
  }
};

export class StageRouter {
  public static getAllStages(): StageConfig[] {
    return Object.values(STAGES_CONFIG);
  }

  public static resolve(stageId: StageId): StageConfig {
    return STAGES_CONFIG[stageId] || STAGES_CONFIG['idea-understanding'];
  }

  public static getNextStage(currentStage: StageId): StageId | null {
    const list: StageId[] = [
      'idea-understanding',
      'problem-discovery',
      'opportunity',
      'solution-discovery',
      'business-model',
      'product-definition',
      'requirements',
      'documents',
      'review',
      'handoff'
    ];
    const idx = list.indexOf(currentStage);
    if (idx >= 0 && idx < list.length - 1) {
      return list[idx + 1];
    }
    return null;
  }

  public static getPreviousStage(currentStage: StageId): StageId | null {
    const list: StageId[] = [
      'idea-understanding',
      'problem-discovery',
      'opportunity',
      'solution-discovery',
      'business-model',
      'product-definition',
      'requirements',
      'documents',
      'review',
      'handoff'
    ];
    const idx = list.indexOf(currentStage);
    if (idx > 0) {
      return list[idx - 1];
    }
    return null;
  }
}
