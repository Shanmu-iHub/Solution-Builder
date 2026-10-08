import { DiscoveryPage, ExecutiveDecision, PhaseMetadata, PhaseStatus, PlanningState } from '../types';

export interface MacroArea {
  id: 'understand' | 'discover' | 'define' | 'package';
  label: string;
  tagline: string;
  phases: DiscoveryPage[];
}

export const MACRO_AREAS: MacroArea[] = [
  {
    id: 'understand',
    label: 'UNDERSTAND',
    tagline: 'Frame the core idea, market opportunity, and customer problem',
    phases: ['idea', 'problem', 'opportunity']
  },
  {
    id: 'discover',
    label: 'DISCOVER',
    tagline: 'Explore solution packages, feasibility, and business economics',
    phases: ['solution', 'business_model']
  },
  {
    id: 'define',
    label: 'DEFINE',
    tagline: 'Specify MVP capabilities, personas, and structured requirements',
    phases: ['product_definition', 'requirements']
  },
  {
    id: 'package',
    label: 'HANDOFF',
    tagline: 'Generate approved BRD, PRD, and implementation blueprint',
    phases: ['documentation']
  }
];

export interface PhaseConfig {
  id: DiscoveryPage;
  num: string;
  title: string;
  shortTitle: string;
  tagline: string;
  dependencies: DiscoveryPage[];
  missingInputs: string[];
}

export const PHASE_CONFIGS: Record<DiscoveryPage, PhaseConfig> = {
  idea: {
    id: 'idea',
    num: '01',
    title: 'Definition',
    shortTitle: 'Idea Definition',
    tagline: 'Idea Brief & Initial Vision',
    dependencies: [],
    missingInputs: []
  },
  problem: {
    id: 'problem',
    num: '02',
    title: 'Problem Discovery',
    shortTitle: 'Problem Discovery',
    tagline: 'Root Causes & Quantified Impact',
    dependencies: ['idea'],
    missingInputs: ['Confirmed idea brief']
  },
  opportunity: {
    id: 'opportunity',
    num: '03',
    title: 'Opportunity & Discovery',
    shortTitle: 'Opportunity & market',
    tagline: 'Market Evidence & Segments',
    dependencies: ['problem'],
    missingInputs: ['Validated problem statement']
  },
  solution: {
    id: 'solution',
    num: '04',
    title: 'Solution Discovery',
    shortTitle: 'Solution Discovery',
    tagline: 'Architectural Packages & Capabilities',
    dependencies: ['opportunity'],
    missingInputs: ['Confirmed opportunity brief']
  },
  business_model: {
    id: 'business_model',
    num: '05',
    title: 'Business Model',
    shortTitle: 'Business Model',
    tagline: 'Canvas Blocks & ROI Projections',
    dependencies: ['solution'],
    missingInputs: ['Selected solution package', 'Primary value proposition']
  },
  product_definition: {
    id: 'product_definition',
    num: '06',
    title: 'Product Definition',
    shortTitle: 'Product Definition',
    tagline: 'MVP Boundary, Personas & Flows',
    dependencies: ['solution', 'business_model'],
    missingInputs: ['Business model validation', 'Selected capability modules']
  },
  requirements: {
    id: 'requirements',
    num: '07',
    title: 'Requirements',
    shortTitle: 'Requirements',
    tagline: 'Functional & Non-Functional Specs',
    dependencies: ['product_definition'],
    missingInputs: ['Product capability boundaries', 'MVP scope sign-off', 'User persona journeys']
  },
  documentation: {
    id: 'documentation',
    num: '08',
    title: 'Documentation',
    shortTitle: 'Documentation',
    tagline: 'BRD, PRD & Architecture Spec Package',
    dependencies: ['requirements'],
    missingInputs: ['Approved requirements baseline', 'Compliance & security requirements']
  }
};

export const getDefaultDecisions = (projectName: string): ExecutiveDecision[] => [
  {
    id: 'dec-1',
    phaseId: 'problem',
    title: 'Problem Scope: Field Sales vs Enterprise-wide',
    category: 'Scope & Boundary',
    description: `Determine whether ${projectName} focuses strictly on field sales expense claims in Phase 1 or includes headquarters operations immediately.`,
    impact: 'Controls MVP delivery timeline (4 weeks vs 12 weeks) and adoption friction.',
    risk: 'medium',
    confidence: 86,
    status: 'pending',
    options: ['Field Sales Reps Only (Recommended MVP)', 'Include All Line Managers & HQ', 'Pilot in 2 High-Volume Regions'],
    selectedOption: 'Field Sales Reps Only (Recommended MVP)',
    decisionNote: 'Focusing on field sales delivers fastest time-to-value with lowest operational disruption.'
  },
  {
    id: 'dec-2',
    phaseId: 'solution',
    title: 'Architecture Direction: Autonomous Agent vs Guided Workflow',
    category: 'Architecture Strategy',
    description: 'Approve AI autonomy level for claim policy compliance checks and automated approvals under threshold limits ($150).',
    impact: 'Reduces manager handling by 70% while maintaining compliance guardrails.',
    risk: 'low',
    confidence: 82,
    status: 'pending',
    options: ['Autonomous Approval Under $150 with Human Exception Triage', '100% Human In The Loop Drafting Only', 'Autonomous Logging with Manual Batch Sign-Off'],
    selectedOption: 'Autonomous Approval Under $150 with Human Exception Triage',
    decisionNote: 'Audits reveal 85% of receipts fall below $150 with zero historic fraud flags.'
  },
  {
    id: 'dec-3',
    phaseId: 'business_model',
    title: 'Investment Commitment: Year 1 Infrastructure & OCR License',
    category: 'Budget & ROI',
    description: 'Approve allocation for specialized multimodal OCR extraction and cloud vector store integration.',
    impact: 'Target annual operational savings of $120,000 against a $28,000 annual infra cost.',
    risk: 'low',
    confidence: 91,
    status: 'approved',
    options: ['Cloud Native OCR & Hosted DB', 'On-Premises Dedicated Server'],
    selectedOption: 'Cloud Native OCR & Hosted DB',
    decisionNote: 'Signed off based on proven 4.2x ROI payback period under 6 months.'
  }
];

export const getPhaseInfo = (s: PlanningState, phaseId: DiscoveryPage, projectName: string): PhaseMetadata => {
  if (s.phaseMeta?.[phaseId]) {
    return s.phaseMeta[phaseId]!;
  }

  // Fallbacks / intelligent derivations based on active state:
  switch (phaseId) {
    case 'idea': {
      const isApproved = s.briefConfirmed || s.ideaStep === 'confirm';
      return {
        status: isApproved ? 'approved' : s.idea ? 'in_progress' : 'not_started',
        confidence: isApproved ? 92 : s.idea ? 76 : 0,
        openQuestions: isApproved ? 0 : 2,
        evidenceSources: 3,
        lastUpdated: 'Today',
        summaryText: s.vision?.text || s.idea || `An AI-assisted service platform for ${projectName} that automates manual workflows.`
      };
    }
    case 'opportunity': {
      const isApproved = s.oppCompleted || (Array.isArray(s.customers) && s.customers.some((c: any) => c.primary));
      return {
        status: isApproved ? 'approved' : s.opportunity ? 'ready_for_review' : 'in_progress',
        confidence: isApproved ? 88 : 74,
        openQuestions: isApproved ? 0 : 1,
        evidenceSources: 6,
        lastUpdated: '1d ago',
        summaryText: typeof s.marketBrief === 'string' ? s.marketBrief : 'Mobile-first expense capture and approval automation with 25-40% faster handling.'
      };
    }
    case 'problem': {
      const isApproved = Boolean(s.problemCompleted || s.decision || s.selectedStatement);
      return {
        status: isApproved ? 'approved' : s.statements?.length ? 'needs_attention' : 'in_progress',
        confidence: isApproved ? 90 : 86,
        openQuestions: isApproved ? 0 : 3,
        evidenceSources: 8,
        lastUpdated: 'Yesterday',
        summaryText: s.statements?.[0]?.statement || 'Field sales reps lose paper receipts and wait weeks for reimbursements due to fragmented manual email reviews.'
      };
    }
    case 'solution': {
      const isApproved = !!s.solutionConfirmed;
      return {
        status: isApproved ? 'approved' : 'ready_for_review',
        confidence: isApproved ? 84 : 70,
        openQuestions: 2,
        evidenceSources: 5,
        lastUpdated: '2d ago',
        summaryText: 'Unified mobile companion with instant optical receipt scanning, policy guardrails, and auto-triage.'
      };
    }
    case 'business_model': {
      const isApproved = !!s.businessModelConfirmed;
      return {
        status: isApproved ? 'approved' : 'in_progress',
        confidence: isApproved ? 85 : 68,
        openQuestions: 1,
        evidenceSources: 4,
        lastUpdated: '3d ago',
        summaryText: 'Estimated $120,000 yearly operational cost reduction with estimated payback within 4.5 months.'
      };
    }
    case 'product_definition': {
      const isApproved = !!s.productDefinitionConfirmed;
      return {
        status: isApproved ? 'approved' : 'in_progress',
        confidence: isApproved ? 82 : 60,
        openQuestions: 3,
        evidenceSources: 5,
        lastUpdated: '3d ago',
        summaryText: 'Phase 1 MVP scope: Mobile photo submission, manager Slack/email one-click approvals, and accounting CSV sync.'
      };
    }
    case 'requirements': {
      const isApproved = !!s.requirementsConfirmed;
      return {
        status: isApproved ? 'approved' : 'not_started',
        confidence: isApproved ? 90 : 45,
        openQuestions: 4,
        evidenceSources: 7,
        lastUpdated: '4d ago',
        summaryText: '14 functional requirements defined across intake, optical scanning, compliance validation, and audit logs.'
      };
    }
    case 'documentation': {
      const isApproved = !!s.documentsConfirmed;
      return {
        status: isApproved ? 'approved' : 'not_started',
        confidence: isApproved ? 95 : 30,
        openQuestions: 0,
        evidenceSources: 12,
        lastUpdated: 'Just now',
        summaryText: 'Comprehensive Business Requirement Document (BRD) and Technical Product Spec ready for sign-off.'
      };
    }
  }
};

export const calculateReadinessMetrics = (s: PlanningState) => {
  const briefScore = s.briefConfirmed ? 92 : s.idea ? 70 : 40;
  const oppScore = s.oppCompleted ? 88 : 75;
  const problemScore = s.decision ? 90 : 86;
  const solutionScore = s.solutionConfirmed ? 85 : 68;
  const businessScore = s.businessModelConfirmed ? 82 : 64;
  const productScore = s.productDefinitionConfirmed ? 80 : 55;
  const reqScore = s.requirementsConfirmed ? 90 : 45;
  const docScore = s.documentsConfirmed ? 95 : 30;

  const overall = Math.round(
    (briefScore + oppScore + problemScore + solutionScore + businessScore + productScore + reqScore + docScore) / 8
  );

  return {
    overall,
    businessCase: Math.round((briefScore + oppScore + businessScore) / 3),
    problemConfidence: Math.round((oppScore + problemScore) / 2),
    solutionReadiness: Math.round((solutionScore + productScore) / 2),
    architectureReadiness: Math.round((solutionScore + reqScore + docScore) / 3)
  };
};

export const ORDERED_PHASES: DiscoveryPage[] = [
  'idea',
  'problem',
  'opportunity',
  'solution',
  'business_model',
  'product_definition',
  'requirements',
  'documentation'
];

export const isPhaseInputCompleted = (s: PlanningState, phaseId: DiscoveryPage): boolean => {
  switch (phaseId) {
    case 'idea':
      return Boolean(s.briefConfirmed);
    case 'opportunity':
      return Boolean(s.oppCompleted);
    case 'problem':
      return Boolean(s.problemCompleted || s.decision || s.selectedStatement);
    case 'solution':
      return Boolean(s.solutionConfirmed);
    case 'business_model':
      return Boolean(s.businessModelConfirmed);
    case 'product_definition':
      return Boolean(s.productDefinitionConfirmed);
    case 'requirements':
      return Boolean(s.requirementsConfirmed);
    case 'documentation':
      return Boolean(s.documentsConfirmed);
    default:
      return false;
  }
};

export const isPhaseUnlocked = (s: PlanningState, phaseId: DiscoveryPage): boolean => {
  const index = ORDERED_PHASES.indexOf(phaseId);
  if (index <= 0) return true; // Phase 01 'idea' is always open
  // Each subsequent phase opens ONLY after filling/confirming all previous phases inputs
  for (let i = 0; i < index; i++) {
    if (!isPhaseInputCompleted(s, ORDERED_PHASES[i])) {
      return false;
    }
  }
  return true;
};
