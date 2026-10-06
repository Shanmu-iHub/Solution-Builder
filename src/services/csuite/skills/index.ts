import { ExecutiveId, ExecutiveSkill } from '../types';

export const EXECUTIVE_SKILLS: Record<ExecutiveId, ExecutiveSkill> = {
  CPO: {
    executiveId: 'CPO',
    responsibility: 'Validate product relevance, user value, user journey integrity, product scope, and features.',
    validationCriteria: [
      'User problem is clearly articulated and based on real observed behavior.',
      'User value proposition differentiates from market alternatives.',
      'Features directly map to confirmed user pain points.',
      'User journeys reflect realistic field and operational contexts.',
      'Product requirements trace back to validated user needs.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Documented user pain points and persona definitions.',
      'Feature-to-problem traceability matrix.'
    ],
    blockingConditions: [
      'Missing target user personas.',
      'Features proposed without underlying user problem link.',
      'Product vision conflicts with upstream confirmed intent.'
    ],
    reportFormat: 'Scope, Personas Evaluated, Feature Coherence, Findings, Evidence, Decision.'
  },
  CBO: {
    executiveId: 'CBO',
    responsibility: 'Validate business relevance, business context, operational feasibility, and commercial value.',
    validationCriteria: [
      'Alignment with organizational operations and departmental workflows.',
      'Clear business case with operational efficiency gains.',
      'Operational disruption is minimized with manageable transition requirements.',
      'Stakeholder roles and incentives are accounted for.',
      'BRD reflects verified commercial and operational scope.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Current operational turnaround baselines.',
      'Stakeholder workflows across Sales, Operations, and Accounting.'
    ],
    blockingConditions: [
      'Operational workflow omitted or conflicting with existing policy.',
      'Stakeholder roles undefined in the workflow.',
      'Critical operational bottlenecks ignored.'
    ],
    reportFormat: 'Operational Impact, Stakeholder Alignment, Business Risks, Findings, Decision.'
  },
  CMO: {
    executiveId: 'CMO',
    responsibility: 'Validate market demand, competitive differentiation, customer segmentation, and market positioning.',
    validationCriteria: [
      'Market analysis backed by real benchmarks and verified public sources.',
      'Target customer segments differentiated with verified willingness to adopt.',
      'Value positioning is distinct against existing alternatives (e.g. Concur, Expensify).',
      'Go-to-market channels align with target customer discovery patterns.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'External market citations and verified source links.',
      'Competitive comparison matrix.'
    ],
    blockingConditions: [
      'Hallucinated market statistics without verified source citations.',
      'Overlapping customer segments with contradictory positioning.'
    ],
    reportFormat: 'Market Opportunity, Competitive Positioning, Customer Segments, Findings, Decision.'
  },
  CSO: {
    executiveId: 'CSO',
    responsibility: 'Validate long-term strategic fit, alignment with corporate strategy, and portfolio coherence.',
    validationCriteria: [
      'Solution advances enterprise strategic pillars and modernization roadmap.',
      'Ecosystem defensibility and strategic leverage are evident.',
      'Opportunity avoids strategic fragmentation and platform duplication.',
      'Downstream scalability supports corporate growth.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Mapping to corporate modernization and automation pillars.',
      'Interoperability with broader enterprise ecosystem.'
    ],
    blockingConditions: [
      'Direct conflict with core IT/Business long-term roadmaps.',
      'Lack of alignment with organizational strategic objectives.'
    ],
    reportFormat: 'Strategic Fit, Ecosystem Coherence, Strategic Risks, Findings, Decision.'
  },
  CFO: {
    executiveId: 'CFO',
    responsibility: 'Validate financial feasibility, cost modeling, investment requirements, and ROI justification.',
    validationCriteria: [
      'Financial estimates are derived from authentic user inputs (no fabricated numbers).',
      'Total Cost of Ownership (TCO) accounts for implementation, licensing, and cloud costs.',
      'Payback period and net benefit follow verifiable arithmetic.',
      'Budget assumptions and financial contingencies are documented.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Explicit user-entered financial parameters and operational savings.',
      'Verifiable cost-benefit calculations.'
    ],
    blockingConditions: [
      'Absence of basic cost parameters or savings assumptions.',
      'Unsubstantiated ROI claims without explicit underlying data.'
    ],
    reportFormat: 'TCO, Savings Projections, Payback Period, Financial Risks, Findings, Decision.'
  },
  CTO: {
    executiveId: 'CTO',
    responsibility: 'Validate technical feasibility, system architecture, integration contracts, and engineering readiness.',
    validationCriteria: [
      'Architecture follows proven scalable patterns (microservices, event-driven).',
      'External integration contracts (ERP, SAP Concur, banking) are clearly specified.',
      'Latency budgets, scalability, and 99.9% uptime targets are realistic.',
      'Technology stack avoids vendor lock-in and adheres to modern standards.',
      'SRS and technical specifications are verifiable.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Documented API integration specifications and protocol contracts.',
      'Component topology and data flow diagrams.'
    ],
    blockingConditions: [
      'Undefined external integration contracts for critical data exchanges.',
      'Unsubstantiated performance claims without architectural feasibility.'
    ],
    reportFormat: 'Architecture Soundness, Integration Risk, Feasibility Score, Findings, Decision.'
  },
  CDO: {
    executiveId: 'CDO',
    responsibility: 'Validate data models, entity relationships, data lineage, and data governance.',
    validationCriteria: [
      'Data schemas reflect all domain entities (claims, receipts, audits, line items).',
      'Data lineage and immutability guarantees exist for compliance audit trails.',
      'Deduplication and master data management rules are defined.',
      'Query indexing supports high-throughput operational and reporting needs.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Entity-relationship schema definitions.',
      'Audit logging and data retention specifications.'
    ],
    blockingConditions: [
      'Missing entity definitions for core business objects.',
      'Inability to trace transaction state transitions.'
    ],
    reportFormat: 'Schema Completeness, Lineage, Governance, Findings, Decision.'
  },
  CISO: {
    executiveId: 'CISO',
    responsibility: 'Validate cybersecurity posture, regulatory compliance (SOC2, GDPR, PCI-DSS), and encryption.',
    validationCriteria: [
      'Role-based access control (RBAC) and least-privilege principles enforced.',
      'Data in transit (TLS 1.3) and data at rest (AES-256) encryption specified.',
      'PII, banking data, and sensitive financial records are isolated.',
      'Comprehensive audit logging and tamper-proof security event logging.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Security control matrix and compliance checklist.',
      'Threat model assessment.'
    ],
    blockingConditions: [
      'Missing encryption specifications for financial or personal receipt data.',
      'Unauthenticated or unverified administrative actions.'
    ],
    reportFormat: 'Threat Modeling, Compliance Readiness, Data Protection, Findings, Decision.'
  },
  CIO: {
    executiveId: 'CIO',
    responsibility: 'Validate operational rollout readiness, IT compatibility, SLA support, and change management.',
    validationCriteria: [
      'Rollout plan minimizes operational disruptions across departments.',
      'End-user training and onboarding curricula are prepared.',
      'Helpdesk and Level 1/2/3 operational support models are established.',
      'Disaster recovery and business continuity plans meet corporate RPO/RTO.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Rollout schedule and support SLA agreements.',
      'High-availability and backup specifications.'
    ],
    blockingConditions: [
      'No operational support tier assignment.',
      'Omission of employee training or transition migration plan.'
    ],
    reportFormat: 'IT Infrastructure Readiness, Support Model, Change Impact, Findings, Decision.'
  },
  CEO: {
    executiveId: 'CEO',
    responsibility: 'Master orchestration, cross-executive consensus evaluation, stage gating, and final sign-off.',
    validationCriteria: [
      'All relevant domain executives have provided valid, substantiated reviews.',
      'Zero blocking issues remain across technical, operational, and financial domains.',
      'Stage outputs preserve complete traceability back to seed intent.',
      'Final package is ready for engineering delivery.'
    ],
    allowedDecisions: ['VALIDATED', 'NEEDS_CHANGES'],
    requiredEvidence: [
      'Consolidated multi-executive sign-off records.',
      'Stage gate evaluation reports.'
    ],
    blockingConditions: [
      'Unresolved blocking issues from any required C-Suite executive.',
      'Contradictions across downstream documents.'
    ],
    reportFormat: 'Executive Summary, Cross-Functional Consensus, Stage Gate Decision, Final Sign-off.'
  }
};
