import { DiscoveryPage } from '../types';

export type CSuiteRole = 
  | 'CEO' 
  | 'CTO' 
  | 'CFO' 
  | 'CPO' 
  | 'COO' 
  | 'CMO' 
  | 'CRO' 
  | 'CISO' 
  | 'CIO' 
  | 'CDO' 
  | 'CCO' 
  | 'CSO'
  | 'CBO';

export interface CSuiteMemberReview {
  role: CSuiteRole;
  title: string;
  score: number;
  status: 'Validated' | 'Pending';
  reviewed: string;
  findings: string;
  criteria: string[];
  risk: 'Low' | 'Medium' | 'High';
}

export const CSUITE_ROLES_META: Record<CSuiteRole, { title: string; category: string; description: string }> = {
  CEO: {
    title: 'Chief Executive Officer',
    category: 'Executive Mandate',
    description: 'Enterprise mission alignment, corporate viability, and high-level investment priority.'
  },
  CTO: {
    title: 'Chief Technology Officer',
    category: 'Technical Architecture',
    description: 'System feasibility, architecture patterns, tech stack scalability, and engineering feasibility.'
  },
  CFO: {
    title: 'Chief Financial Officer',
    category: 'Financial Governance',
    description: 'Unit economics, capital allocation, ROI payback, and OPEX/CAPEX projections.'
  },
  CPO: {
    title: 'Chief Product Officer',
    category: 'Product Strategy',
    description: 'Product-market fit, user experience friction, MVP feature boundary, and persona journey.'
  },
  COO: {
    title: 'Chief Operating Officer',
    category: 'Operations & Execution',
    description: 'Process automation, change management, operational resilience, and workforce impact.'
  },
  CMO: {
    title: 'Chief Marketing Officer',
    category: 'Market & Go-To-Market',
    description: 'Market addressability (TAM/SAM), competitive positioning, and brand differentiation.'
  },
  CRO: {
    title: 'Chief Revenue Officer',
    category: 'Commercial Monetization',
    description: 'Monetization strategy, sales enablement, customer retention, and contract value growth.'
  },
  CISO: {
    title: 'Chief Information Security Officer',
    category: 'Security & Privacy',
    description: 'Cybersecurity posture, PII data protection, threat modeling, and SOC2/ISO compliance.'
  },
  CIO: {
    title: 'Chief Information Officer',
    category: 'Enterprise Integration',
    description: 'Enterprise IT infrastructure, SSO/IAM integration, legacy ERP/CRM interoperability.'
  },
  CDO: {
    title: 'Chief Data Officer',
    category: 'Data & AI Governance',
    description: 'Data ingestion lineage, proprietary data moats, model accuracy, and analytics.'
  },
  CCO: {
    title: 'Chief Compliance Officer',
    category: 'Regulatory & Governance',
    description: 'Regulatory compliance (GDPR/HIPAA/SEC), legal risk, ethical AI boundaries.'
  },
  CBO: {
    title: 'Chief Business Officer',
    category: 'Business Strategy',
    description: 'Business model feasibility, market partnerships, and cross-functional operations.'
  },
  CSO: {
    title: 'Chief Strategy Officer',
    category: 'Corporate Strategy',
    description: 'Long-term defensibility, strategic partnerships, ecosystem network effects, and expansion.'
  }
};

export const CSUITE_ROLES_ORDER: CSuiteRole[] = [
  'CEO', 'CTO', 'CFO', 'CPO', 'COO', 'CMO',
  'CRO', 'CISO', 'CIO', 'CDO', 'CCO', 'CSO', 'CBO'
];

export const INITIAL_CSUITE_DATA: Record<DiscoveryPage, CSuiteMemberReview[]> = {
  idea: [],

  opportunity: [
    {
      role: 'CBO',
      title: 'Chief Business Officer',
      score: 85,
      status: 'Pending',
      reviewed: 'Business strategy and market alignment.',
      findings: 'Requires further alignment on business partnerships.',
      criteria: ['Business Model', 'Partnerships', 'Market Fit'],
      risk: 'Medium'
    },
    {
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Market TAM/SAM monetization models and cost-to-capture.',
      findings: 'Conservative penetration scenarios yield $1.4M annual efficiency gain within 18 months.',
      criteria: ['TAM/SAM verification', 'Cost-to-capture', 'Margin projections'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Market demand signals, customer acquisition dynamics, and positioning.',
      findings: 'Established demand signals confirmed across comparable industry deployments with rapid conversion.',
      criteria: ['Demand signals', 'CAC predictability', 'Competitive moat'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Adjacent vertical expansion paths and enterprise partnership leverage.',
      findings: 'Enables quick lateral expansion into procurement and billing operations after initial rollout.',
      criteria: ['Adjacent vertical roadmap', 'Partner leverage', 'Long-term defensibility'],
      risk: 'Low'
    }
  
  ],

  problem: [
    {
      role: 'CBO',
      title: 'Chief Business Officer',
      score: 85,
      status: 'Pending',
      reviewed: 'Business strategy and market alignment.',
      findings: 'Requires further alignment on business partnerships.',
      criteria: ['Business Model', 'Partnerships', 'Market Fit'],
      risk: 'Medium'
    },
    {
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 95,
      status: 'Validated',
      reviewed: 'Problem tree taxonomy, user frustration frequency, and drop-off analytics.',
      findings: 'Problem statement is validated with 12,400 ticket logs and verified root-cause categorization.',
      criteria: ['Ticket log evidence', 'User journey drop-off', 'Severity rating'],
      risk: 'Low'
    }
  
  ],

  solution: [
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 86,
      status: 'Validated',
      reviewed: 'Architectural package feasibility, AI inference pipelines, and latency budgets.',
      findings: 'Architecture employs hybrid retrieval-augmented generation with strict schema enforcement.',
      criteria: ['Latency budget (<800ms)', 'Inference reliability', 'Failover redundancy'],
      risk: 'Medium'
    },
    {
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Solution package capabilities, triage autonomy, and human-in-the-loop fallback.',
      findings: 'Proposed solution packages map directly to validated root causes with automated confidence thresholds.',
      criteria: ['Capability-to-problem mapping', 'Human-in-the-loop ergonomics', 'Auto-triage accuracy'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Prompt injection defenses, data masking, and LLM output guardrails.',
      findings: 'Multi-layer guardrail firewall intercepts prompt injection attempts and filters sensitive outputs.',
      criteria: ['Prompt injection firewall', 'LLM output sanitization', 'Secrets isolation'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Knowledge retrieval indexing, vector embeddings, and chunking strategies.',
      findings: 'Semantic search indexing ensures high document recall without hallucinations.',
      criteria: ['Vector chunking strategy', 'Embedding precision', 'Hallucination rate (<1%)'],
      risk: 'Low'
    }
  
  ],

  business_model: [
    {
      role: 'CBO',
      title: 'Chief Business Officer',
      score: 85,
      status: 'Pending',
      reviewed: 'Business strategy and market alignment.',
      findings: 'Requires further alignment on business partnerships.',
      criteria: ['Business Model', 'Partnerships', 'Market Fit'],
      risk: 'Medium'
    },
    {
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 95,
      status: 'Validated',
      reviewed: 'Financial model, ROI payback horizon, and 3-year NPV.',
      findings: 'Projected 4.2x ROI payback period within 4.5 months of full deployment.',
      criteria: ['ROI payback (<6 mo)', '3-year Net Present Value', 'CAPEX vs OPEX ratio'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Pricing packaging communication and competitive pricing clarity.',
      findings: 'Pricing communicates clear enterprise value without confusing token tiers.',
      criteria: ['Pricing transparency', 'Packaging comprehensibility', 'Market competitiveness'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Long-term profit pool migration and competitive pricing insulation.',
      findings: 'Defensible margin structure insulated from price wars due to high switching value.',
      criteria: ['Margin defensibility', 'Switching costs', 'Profit pool dominance'],
      risk: 'Low'
    }
  
  ],

  product_definition: [
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 87,
      status: 'Validated',
      reviewed: 'Frontend tech stack, state management, and real-time event streaming.',
      findings: 'Clean modular component hierarchy with optimistic updates and solid error states.',
      criteria: ['Modular architecture', 'State management hygiene', 'Client performance'],
      risk: 'Low'
    },
    {
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Persona definition fidelity, journey maps, and UX acceptance thresholds.',
      findings: 'Personas (Reps, Managers, Finance) have distinct, un-conflated user journeys.',
      criteria: ['Persona segmentation', 'Journey map completeness', 'Usability benchmark'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 95,
      status: 'Validated',
      reviewed: 'Role-based access control (RBAC) and least-privilege persona permissions.',
      findings: 'Granular RBAC boundaries strictly enforce field rep vs supervisor permissions.',
      criteria: ['RBAC matrix completeness', 'Session timeout policy', 'Privilege isolation'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'User telemetry, clickstream instrumentation, and feedback capture.',
      findings: 'Product analytics events capture every interaction stage for continuous refinement.',
      criteria: ['Telemetry schema', 'Feedback capture loop', 'Analytics coverage'],
      risk: 'Low'
    }
  
  ],

  requirements: [
    {
      role: 'CBO',
      title: 'Chief Business Officer',
      score: 85,
      status: 'Pending',
      reviewed: 'Business strategy and market alignment.',
      findings: 'Requires further alignment on business partnerships.',
      criteria: ['Business Model', 'Partnerships', 'Market Fit'],
      risk: 'Medium'
    },
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Non-functional SLAs, latency tolerances, uptime, and throughput targets.',
      findings: 'Performance requirements (<1.5s OCR response, 99.9% uptime) are realistic.',
      criteria: ['Uptime SLA (99.9%)', 'Response latency (<1.5s)', 'Throughput headroom'],
      risk: 'Low'
    },
    {
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Functional specification completeness and edge-case acceptance criteria.',
      findings: '14 functional requirements provide unambiguous acceptance criteria.',
      criteria: ['Functional completeness', 'Acceptance test coverage', 'Edge-case handling'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 96,
      status: 'Validated',
      reviewed: 'Data encryption in transit/rest, audit logging, and vulnerability thresholds.',
      findings: 'End-to-end encryption in transit (TLS 1.3) and rest (AES-256) complies with SOC2.',
      criteria: ['TLS 1.3 / AES-256', 'SOC2 Type II alignment', 'PII automated redaction'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Data retention periods, automated backup policies, and query performance.',
      findings: 'Automated 90-day hot retention with cold archival tier balances cost and retrieval.',
      criteria: ['Data retention rules', 'Backup automation', 'Analytical schema indexing'],
      risk: 'Low'
    }
  
  ],

  documentation: [
    {
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 95,
      status: 'Validated',
      reviewed: 'Complete Solution Package Readiness & Executive Sign-off.',
      findings: 'Executive summary is thorough, compelling, and fully ready for stakeholder presentation.',
      criteria: ['Executive summary polish', 'Sign-off readiness', 'Clear strategic path forward'],
      risk: 'Low'
    },
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Solution Architecture Document, HLD, ERDs, and API specs.',
      findings: 'Architecture blueprint approved for engineering handover with zero ambiguity.',
      criteria: ['Architecture doc completeness', 'API schemas approved', 'Engineering handover ready'],
      risk: 'Low'
    },
    {
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Enterprise infrastructure blueprint, deployment architecture, and SSO sign-off.',
      findings: 'IT infrastructure topology and cloud provider integration documented and approved.',
      criteria: ['IT topology verified', 'SSO/IAM signoff granted', 'Staging/Prod segregation plans'],
      risk: 'Low'
    }
  
  ]
};

/** One neutral style for every role: the role is identified by its title, not by a color. */
export const getRoleTheme = (_role: CSuiteRole) => ({ bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', badge: 'bg-slate-700', ring: 'ring-slate-400' });
