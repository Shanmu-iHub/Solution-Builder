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
  | 'CSO';

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
  CSO: {
    title: 'Chief Strategy Officer',
    category: 'Corporate Strategy',
    description: 'Long-term defensibility, strategic partnerships, ecosystem network effects, and expansion.'
  }
};

export const CSUITE_ROLES_ORDER: CSuiteRole[] = [
  'CEO', 'CTO', 'CFO', 'CPO', 'COO', 'CMO',
  'CRO', 'CISO', 'CIO', 'CDO', 'CCO', 'CSO'
];

export const INITIAL_CSUITE_DATA: Record<DiscoveryPage, CSuiteMemberReview[]> = {
  idea: [
    {
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Strategic alignment, core corporate vision, and executive sponsorship.',
      findings: 'Strong strategic fit with our Q3 enterprise automation mandate. Directly targets high-friction operational workflows.',
      criteria: ['Enterprise vision match', 'Sponsorship readiness', 'High-impact outcome'],
      risk: 'Low'
    },
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 88,
      status: 'Validated',
      reviewed: 'Preliminary technical feasibility and foundational technology stack.',
      findings: 'Initial architecture can be supported using commodity AI models and standard cloud microservices.',
      criteria: ['Stack viability', 'Technical risk envelope', 'Compute expectations'],
      risk: 'Low'
    },
    {
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Capital allocation threshold and preliminary investment thesis.',
      findings: 'Initial ROI projections justify seed exploration. Budget envelope fits innovation allocation.',
      criteria: ['Budget alignment', 'Payback plausibility', 'Capital efficiency'],
      risk: 'Low'
    },
    {
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Core value proposition and user empathy framing.',
      findings: 'Idea pinpoints an urgent user pain point with intuitive workflow potential.',
      criteria: ['User empathy', 'Problem-solution resonance', 'Adoption viability'],
      risk: 'Low'
    },
    {
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Operational disruption risk and workflow integration feasibility.',
      findings: 'Minimal operational friction. Field staff can adopt the solution with zero workflow restructuring.',
      criteria: ['Process friction', 'Workflow integration', 'Training overhead'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Brand alignment, market resonance, and narrative differentiation.',
      findings: 'Provides a sharp technological leadership narrative and distinct market storytelling.',
      criteria: ['Brand equity', 'Value narrative', 'Category relevance'],
      risk: 'Low'
    },
    {
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 87,
      status: 'Validated',
      reviewed: 'Willingness to adopt and initial commercial value capture.',
      findings: 'Clear economic buyer identified with proven urgency to eliminate manual support waste.',
      criteria: ['Buyer persona', 'Willingness to pay', 'Value realization speed'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'High-level data confidentiality and initial security boundary.',
      findings: 'No unauthorized data transit identified. Zero high-risk data exposures in the core concept.',
      criteria: ['Confidentiality posture', 'Threat boundary', 'Data privacy scope'],
      risk: 'Low'
    },
    {
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Enterprise IT landscape compatibility and hosting posture.',
      findings: 'Compatible with standard enterprise cloud policies and identity federation services.',
      criteria: ['IT compatibility', 'Cloud policy fit', 'SSO integration feasibility'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Data availability, training data rights, and insight creation.',
      findings: 'Enterprise transaction data is readily accessible with clean ingestion pipelines.',
      criteria: ['Data availability', 'Pipeline access', 'Analytics leverage'],
      risk: 'Low'
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 95,
      status: 'Validated',
      reviewed: 'Ethical AI boundaries and corporate governance compliance.',
      findings: 'Core idea complies with corporate AI governance charters and industry labor protocols.',
      criteria: ['Corporate charter fit', 'AI ethics checklist', 'Statutory compliance'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Long-term defensibility, strategic moat, and synergy.',
      findings: 'Establishes a proprietary workflow dataset that compounds enterprise value over time.',
      criteria: ['Data network effect', 'Strategic defensibility', 'Ecosystem synergy'],
      risk: 'Low'
    }
  ],

  opportunity: [
    {
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Market opportunity magnitude and business case mandate.',
      findings: 'Total addressable market presents substantial expansion room within our core client verticals.',
      criteria: ['Market size magnitude', 'Strategic priority', 'Expansion potential'],
      risk: 'Low'
    },
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 87,
      status: 'Validated',
      reviewed: 'Technology infrastructure scalability to meet projected market volume.',
      findings: 'Cloud compute estimates confirm low horizontal scale bottlenecks as request load grows.',
      criteria: ['Scaling bottleneck analysis', 'Latency tolerance', 'Infrastructure capacity'],
      risk: 'Low'
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
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Customer segment prioritization and product differentiation.',
      findings: 'Target segment exhibits 4x higher willingness to adopt compared to generic self-service tools.',
      criteria: ['Segment prioritization', 'Competitor benchmarking', 'Feature demand signal'],
      risk: 'Low'
    },
    {
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Capacity scaling and front-line labor optimization.',
      findings: 'Allows existing operations team to absorb 3x higher volume without headcount expansion.',
      criteria: ['Labor capacity leverage', 'Volume absorption', 'Throughput gains'],
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
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 88,
      status: 'Validated',
      reviewed: 'Contract expansion, upsell potential, and market sales velocity.',
      findings: 'High interest from tier-1 enterprise accounts; provides an immediate sales conversion catalyst.',
      criteria: ['Sales velocity', 'Upsell readiness', 'Account retention'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Market segment regulatory security mandates (GDPR, HIPAA, PCI).',
      findings: 'Target industry regulatory constraints are thoroughly mapped and addressable.',
      criteria: ['Industry security standards', 'Jurisdictional mandates', 'Data sovereignty'],
      risk: 'Low'
    },
    {
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Enterprise software ecosystem overlap and integration demand.',
      findings: 'Connects seamlessly with standard enterprise helpdesk software (Zendesk, Salesforce).',
      criteria: ['CRM/Helpdesk integration', 'Vendor ecosystem compatibility', 'IT rollout ease'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Market intelligence data feeds and benchmarking metrics.',
      findings: 'Customer analytics provide clear segmentation benchmarks to optimize pipeline quality.',
      criteria: ['Market intelligence quality', 'Benchmark validity', 'Data telemetry'],
      risk: 'Low'
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Fair trade compliance, consumer protection regulations, and legal boundaries.',
      findings: 'Target segment marketing claims and disclosures comply with FTC and consumer protection rules.',
      criteria: ['Consumer disclosures', 'Trade compliance', 'Fair practice check'],
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
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Executive urgency of root-cause problems on organizational morale and brand.',
      findings: 'Customer wait times and repeated ticket escalations directly damage customer NPS.',
      criteria: ['Brand sentiment impact', 'Escalation severity', 'Executive priority'],
      risk: 'Low'
    },
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Technical debt roots, manual processing bugs, and legacy system failures.',
      findings: 'Manual email-to-ticket transcription is the root cause of 68% of data inaccuracy.',
      criteria: ['Root-cause technical depth', 'System error rates', 'Failure mode identification'],
      risk: 'Low'
    },
    {
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Quantified friction cost, lost productivity hours, and financial leakage.',
      findings: 'Direct operational leakage calculated at $180,000 annually across handling time.',
      criteria: ['Financial leakage calculation', 'Labor cost per incident', 'Avoidable scrap cost'],
      risk: 'Low'
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
    },
    {
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Front-line agent burnout, backlog accumulation, and SLA breaches.',
      findings: 'Repeated Tier-1 queries cause 22% employee turnover and persistent SLA breaches during peak hours.',
      criteria: ['SLA breach trends', 'Agent fatigue metrics', 'Backlog accumulation rate'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 88,
      status: 'Validated',
      reviewed: 'Customer churn correlation with unresolved service friction.',
      findings: '34% of churning customers cite delayed resolution times as primary dissatisfaction trigger.',
      criteria: ['Churn driver analysis', 'NPS correlation', 'Customer sentiment impact'],
      risk: 'Low'
    },
    {
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Revenue leakage from billing confusion and delayed query response.',
      findings: 'Delayed customer issue handling delays contract renewals and decreases cross-sell closing rates.',
      criteria: ['Renewal risk calculation', 'Expansion drag', 'Revenue cycle friction'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Security risks in current manual workaround procedures.',
      findings: 'Support staff currently email plaintext credentials and unredacted customer data to resolve tickets.',
      criteria: ['Manual workaround vulnerabilities', 'Data leakage exposure', 'Credential mishandling'],
      risk: 'Medium'
    },
    {
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Siloed database inconsistency and disconnected legacy systems.',
      findings: 'Data fragmentation between ERP and CRM causes agents to cross-check 4 different systems.',
      criteria: ['System fragmentation', 'Database synchronization lag', 'Tool sprawl'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Missing feedback loops and unstructured voice/text log blindspots.',
      findings: '85% of customer interactions are currently trapped in unindexed audio recordings and chat logs.',
      criteria: ['Dark data identification', 'Log auditability', 'Signal capture rate'],
      risk: 'Low'
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Statutory turnaround violations and consumer complaint escalation.',
      findings: 'Current ticket backlog risks regulatory reporting deadlines for SLA-governed contracts.',
      criteria: ['Regulatory deadline risk', 'Audit vulnerability', 'Contractual penalty risk'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Strategic drag of operational firefighting versus market innovation.',
      findings: 'Operations leadership spends 40% of time triaging escalations instead of driving growth.',
      criteria: ['Opportunity cost of firefighting', 'Leadership bandwidth loss', 'Competitive distraction'],
      risk: 'Low'
    }
  ],

  solution: [
    {
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Solution packaging alignment with enterprise strategy and board goals.',
      findings: 'High-impact solution packages provide modular implementation and immediate quick-wins.',
      criteria: ['Executive roadmap fit', 'Milestone clarity', 'Board deliverable alignment'],
      risk: 'Low'
    },
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
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Phased rollout expenditure, software licensing, and cloud API unit costs.',
      findings: 'Per-query inference cost ($0.008) is well below the manual handling cost baseline ($4.20).',
      criteria: ['Unit economics ($/query)', 'Cloud API licensing model', 'Cost ceiling guardrails'],
      risk: 'Low'
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
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Day-to-day workflow change impact and exception routing procedures.',
      findings: 'Clear fallback mechanics ensure no user ticket is dropped even if AI confidence is low.',
      criteria: ['Exception queue design', 'Operator handover flow', 'Zero-downtime transition'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Customer-facing touchpoint aesthetics and conversational tone branding.',
      findings: 'Tone guardrails ensure AI responses match the brand voice across all digital channels.',
      criteria: ['Tone consistency', 'Customer experience rating', 'Multi-channel branding'],
      risk: 'Low'
    },
    {
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Customer self-service satisfaction and retention impact.',
      findings: 'Instant 24/7 resolution capability is projected to increase net retention by 4.5 points.',
      criteria: ['Net retention impact', 'CSAT uplift projection', 'Upsell recommendation trigger'],
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
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 88,
      status: 'Validated',
      reviewed: 'API integration endpoints, webhook stability, and cloud deployment topology.',
      findings: 'Standard REST and GraphQL webhooks allow seamless bridge to backend microservices.',
      criteria: ['Webhook architecture', 'API versioning strategy', 'Cloud VPC isolation'],
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
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 95,
      status: 'Validated',
      reviewed: 'Model transparency, explainability logs, and statutory fairness standards.',
      findings: 'All automated decisions generate structured audit reasoning logs for legal traceability.',
      criteria: ['Explainability audit trail', 'Non-discrimination check', 'Traceable citation links'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Ecosystem lock-in prevention and model vendor independence.',
      findings: 'Abstraction layer allows switching between OpenAI, Anthropic, or open-source models at will.',
      criteria: ['Vendor lock-in mitigation', 'Model agility', 'Strategic optionality'],
      risk: 'Low'
    }
  ],

  business_model: [
    {
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Value creation sustainability and enterprise operating margin expansion.',
      findings: 'Compelling economic case that unlocks high operational leverage across our services fleet.',
      criteria: ['Operating margin expansion', 'Shareholder value', 'Scalable unit metrics'],
      risk: 'Low'
    },
    {
      role: 'CTO',
      title: 'Chief Technology Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Cloud infrastructure cost forecasting vs license expense.',
      findings: 'Hosting and vector database costs scale sub-linearly with user volume.',
      criteria: ['Sublinear cost scaling', 'Compute elasticity', 'Vendor license pricing'],
      risk: 'Low'
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
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Value metrics alignment with actual user product consumption.',
      findings: 'Value metric aligns with resolved outcomes rather than raw seat counts.',
      criteria: ['Value metric definition', 'User incentives alignment', 'Tiered packaging logic'],
      risk: 'Low'
    },
    {
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Vendor management, billing simplicity, and financial reconciliation overhead.',
      findings: 'Consolidated vendor billing model drastically reduces invoice processing overhead.',
      criteria: ['Billing reconciliation simplicity', 'Invoice audit ease', 'Vendor consolidation'],
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
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Contract expansion dynamics, revenue predictability, and ACV growth.',
      findings: 'Strong expansion mechanics with predictable usage-based upsell curves.',
      criteria: ['ACV expansion trajectory', 'Churn reduction impact', 'Predictable ARR modeling'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Cyber insurance considerations and financial indemnity clauses.',
      findings: 'Standard contractual limitation of liability and cyber warranties validated.',
      criteria: ['Indemnity clauses', 'Cyber insurance coverage', 'Liability boundary'],
      risk: 'Low'
    },
    {
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'TCO (Total Cost of Ownership) comparison against legacy custom build.',
      findings: 'Buying/building via this architecture delivers 62% lower TCO over 3 years.',
      criteria: ['3-year TCO benchmark', 'Maintenance burden', 'Licensing redundancy'],
      risk: 'Low'
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Data asset valuation and monetization upside.',
      findings: 'Accumulated domain interaction data generates proprietary enterprise IP.',
      criteria: ['Data asset valuation', 'IP creation potential', 'Analytics monetization'],
      risk: 'Low'
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Tax compliance, international VAT/sales tax on digital automation.',
      findings: 'Cross-border tax treatment and invoicing protocols comply with local statutes.',
      criteria: ['Tax compliance', 'Cross-border billing rules', 'Statutory audit logs'],
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
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'MVP scope boundary alignment with immediate time-to-value targets.',
      findings: 'MVP scope is tightly constrained to high-impact workflows for rapid delivery.',
      criteria: ['Scope discipline', 'Time-to-market (<60 days)', 'Executive milestone match'],
      risk: 'Low'
    },
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
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Sprint resourcing budget and milestone-based signoff thresholds.',
      findings: 'Engineering sprint allocations match pre-approved resource envelopes.',
      criteria: ['Sprint budget tracking', 'Staffing efficiency', 'Contingency reserves'],
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
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Manager approval workflows and notification overload prevention.',
      findings: 'Clean one-click approvals minimize manager notification fatigue and bottlenecks.',
      criteria: ['Approval ergonomics', 'Notification hygiene', 'Handover simplicity'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Product brand design system and customer interface polish.',
      findings: 'Enterprise visual standards comply with premium corporate design system.',
      criteria: ['Visual polish', 'Brand design system', 'Consistent styling'],
      risk: 'Low'
    },
    {
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Onboarding conversion rate optimization and time-to-first-value.',
      findings: 'Zero-configuration default experience ensures user activation within 90 seconds.',
      criteria: ['Activation speed (<90s)', 'Self-service onboarding', 'Time-to-first-value'],
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
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 90,
      status: 'Validated',
      reviewed: 'Mobile vs desktop client support across enterprise MDM policies.',
      findings: 'Web responsive application runs securely across corporate managed laptops and mobile devices.',
      criteria: ['MDM compatibility', 'Cross-platform rendering', 'Browser support matrix'],
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
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Accessibility (WCAG 2.1 AA) and multi-language localized disclaimers.',
      findings: 'UI meets accessibility standards with high-contrast elements and keyboard navigation.',
      criteria: ['WCAG 2.1 AA adherence', 'Screen reader support', 'Mandatory disclaimers'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Platform extensibility into future enterprise workflow modules.',
      findings: 'Core interface design allows plug-and-play addition of subsequent department portals.',
      criteria: ['Extensible UI patterns', 'Feature expansion paths', 'Long-term flexibility'],
      risk: 'Low'
    }
  ],

  requirements: [
    {
      role: 'CEO',
      title: 'Chief Executive Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Coverage of strategic deliverables and board commitments in specs.',
      findings: 'All core executive commitments are fully backed by functional specifications.',
      criteria: ['Strategic specs coverage', 'Board goal alignment', 'Deliverable checklist'],
      risk: 'Low'
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
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Scope creep guardrails and specification freeze accountability.',
      findings: 'Clear acceptance criteria prevent engineering scope creep and billable hour drift.',
      criteria: ['Scope freeze enforcement', 'Budget guardrail mapping', 'Cost overrun defense'],
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
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Disaster recovery, failover SLAs, and operational continuity specs.',
      findings: 'Recovery Point Objective (RPO <5 min) and Recovery Time Objective (RTO <15 min) verified.',
      criteria: ['RPO/RTO validation', 'Operational runbooks', 'Incident escalation spec'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 89,
      status: 'Validated',
      reviewed: 'Customer-facing error message clarity and communication tone in edge cases.',
      findings: 'Error states provide polite, helpful human explanations rather than technical stack traces.',
      criteria: ['Error message ergonomics', 'Brand protection in downtime', 'User reassurance'],
      risk: 'Low'
    },
    {
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Enterprise SLA commitments and contractual penalty mitigation.',
      findings: 'Engineering targets provide comfortable margins above contractual client SLAs.',
      criteria: ['Customer SLA safety margin', 'Penalty mitigation', 'Enterprise tier specs'],
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
      role: 'CIO',
      title: 'Chief Information Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Single Sign-On (SAML/OIDC), Active Directory sync, and logging destinations.',
      findings: 'SSO and automated user lifecycle provisioning (SCIM) fully specified.',
      criteria: ['SAML/OIDC integration', 'SCIM provisioning', 'Syslog audit piping'],
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
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 96,
      status: 'Validated',
      reviewed: 'GDPR right-to-be-forgotten, data subject access requests, and audit readiness.',
      findings: 'Automated GDPR deletion and export endpoints satisfy privacy compliance mandates.',
      criteria: ['GDPR Article 17 adherence', 'DSAR workflow endpoints', 'Legal hold capabilities'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'API open architecture standards for enterprise platform integration.',
      findings: 'Adherence to OpenAPI 3.1 standards future-proofs internal and external integrations.',
      criteria: ['OpenAPI 3.1 compliance', 'Ecosystem compatibility', 'Modular decoupled design'],
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
      role: 'CFO',
      title: 'Chief Financial Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Financial business case documentation, budget approval, and ROI schedules.',
      findings: 'Financial schedules and expenditure models are complete and audited.',
      criteria: ['Financial model attached', 'Budget authorization verified', 'Audit trail locked'],
      risk: 'Low'
    },
    {
      role: 'CPO',
      title: 'Chief Product Officer',
      score: 96,
      status: 'Validated',
      reviewed: 'Product Requirements Document (PRD) and User Story Acceptance Package.',
      findings: 'PRD contains comprehensive user flows, error edge cases, and telemetry KPIs.',
      criteria: ['PRD completeness', 'User stories signed off', 'Success metrics documented'],
      risk: 'Low'
    },
    {
      role: 'COO',
      title: 'Chief Operating Officer',
      score: 92,
      status: 'Validated',
      reviewed: 'Deployment runbooks, training documentation, and rollout operational plans.',
      findings: 'Operational procedures documented for deployment, day-2 support, and staff onboarding.',
      criteria: ['Operational runbooks', 'Staff training guides', 'Rollout milestone schedule'],
      risk: 'Low'
    },
    {
      role: 'CMO',
      title: 'Chief Marketing Officer',
      score: 91,
      status: 'Validated',
      reviewed: 'Customer-facing launch brief, product documentation, and release messaging.',
      findings: 'Product launch documentation aligns with market positioning and value statements.',
      criteria: ['Product launch collateral', 'Release notes clarity', 'Market communication plan'],
      risk: 'Low'
    },
    {
      role: 'CRO',
      title: 'Chief Revenue Officer',
      score: 93,
      status: 'Validated',
      reviewed: 'Commercial packaging sheets, customer pricing guide, and sales collateral.',
      findings: 'Sales enablement packages ready for enterprise customer conversations.',
      criteria: ['Pricing sheets finalized', 'Sales battlecard attached', 'Customer FAQ approved'],
      risk: 'Low'
    },
    {
      role: 'CISO',
      title: 'Chief Information Security Officer',
      score: 97,
      status: 'Validated',
      reviewed: 'Security Architecture Document and regulatory audit sign-off.',
      findings: 'Full security sign-off granted. Zero critical vulnerability exposures across documentation.',
      criteria: ['Security architecture approved', 'Vulnerability assessment passed', 'Sign-off complete'],
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
    },
    {
      role: 'CDO',
      title: 'Chief Data Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Data dictionary, lineage schemas, and AI model evaluation documentation.',
      findings: 'Comprehensive data dictionary and privacy categorization published in docs.',
      criteria: ['Data dictionary complete', 'Lineage schema mapped', 'Model benchmark logs'],
      risk: 'Low'
    },
    {
      role: 'CCO',
      title: 'Chief Compliance Officer',
      score: 97,
      status: 'Validated',
      reviewed: 'Regulatory compliance filing package and legal review sign-off.',
      findings: 'All compliance checks documented. Full legal sign-off granted for implementation.',
      criteria: ['Legal review complete', 'Regulatory filings ready', 'Compliance stamp issued'],
      risk: 'Low'
    },
    {
      role: 'CSO',
      title: 'Chief Strategy Officer',
      score: 94,
      status: 'Validated',
      reviewed: 'Long-term corporate roadmap alignment and patent/IP filing readiness.',
      findings: 'Solution documentation captures proprietary innovations suitable for patent protection.',
      criteria: ['IP protection readiness', 'Strategic roadmap alignment', 'Executive sign-off locked'],
      risk: 'Low'
    }
  ]
};

export const getRoleTheme = (role: CSuiteRole) => {
  switch (role) {
    case 'CEO': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-600', ring: 'ring-purple-500' };
    case 'CTO': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-600', ring: 'ring-blue-500' };
    case 'CFO': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-600', ring: 'ring-emerald-500' };
    case 'CPO': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', badge: 'bg-indigo-600', ring: 'ring-indigo-500' };
    case 'COO': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-600', ring: 'ring-amber-500' };
    case 'CMO': return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', badge: 'bg-rose-600', ring: 'ring-rose-500' };
    case 'CRO': return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', badge: 'bg-teal-600', ring: 'ring-teal-500' };
    case 'CISO': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-600', ring: 'ring-red-500' };
    case 'CIO': return { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', badge: 'bg-sky-600', ring: 'ring-sky-500' };
    case 'CDO': return { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200', badge: 'bg-fuchsia-600', ring: 'ring-fuchsia-500' };
    case 'CCO': return { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', badge: 'bg-violet-600', ring: 'ring-violet-500' };
    case 'CSO': return { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', badge: 'bg-cyan-600', ring: 'ring-cyan-500' };
    default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', badge: 'bg-slate-600', ring: 'ring-slate-500' };
  }
};
