import {
  Analysis, Customers, DimensionKey, Direction, DocType, EpicNode, Finding, IdeaQuestion, Journey, LensKey, MarketBrief, MarketResearch, Opportunity, PdQuestion, Persona,
  PlanningState, Proposal, RootChain, Slots, Statement, WireframePage,
} from './types';

/* ── Idea definition ────────────────────────────────────────────────────── */

export const IDEA_QUESTIONS: IdeaQuestion[] = [
  { id: 'iq1', slot: 'users', text: 'Who will use this solution most often?', why: 'Knowing the primary users shapes every later decision.', suggested: ['customers', 'agents', 'managers'], type: 'multi_select', allowOther: true, skippable: false, options: [{ value: 'customers', label: 'End customers' }, { value: 'agents', label: 'Support / operations staff' }, { value: 'managers', label: 'Team leads and managers' }, { value: 'admins', label: 'Administrators' }] },
  { id: 'iq2', slot: 'outcome', text: 'What outcome matters most in the first 6 months?', why: 'This becomes the success measure for the solution.', suggested: 'speed', type: 'single_select', allowOther: true, skippable: false, options: [{ value: 'speed', label: 'Faster resolution / response times' }, { value: 'cost', label: 'Lower operating cost' }, { value: 'satisfaction', label: 'Higher customer satisfaction' }, { value: 'compliance', label: 'Better compliance and auditability' }] },
  { id: 'iq3', slot: 'context', text: 'Describe the environment this will run in.', why: 'Context such as existing systems and constraints avoids rework later.', suggested: 'We run a cloud-first stack with a CRM (Salesforce), an email platform and Okta single sign-on. The support team is 180 agents across three time zones. Data must stay in the EU, and any customer-facing change needs sign-off from Compliance.', type: 'long_text', allowOther: false, skippable: true, options: [] },
  { id: 'iq4', slot: 'use_cases', text: 'Name the single most important use case.', why: 'One concrete scenario keeps the first release focused.', suggested: 'A customer asks why they were charged twice and gets an accurate, cited answer within a minute.', type: 'short_text', allowOther: false, skippable: true, options: [] },
  { id: 'iq5', slot: 'problem', text: 'How is this handled today?', why: 'Understanding the current process reveals the real pain.', suggested: 'tools', type: 'single_select', allowOther: true, skippable: false, options: [{ value: 'manual', label: 'Manually, with spreadsheets and email' }, { value: 'tools', label: 'With several disconnected tools' }, { value: 'legacy', label: 'In a legacy system' }, { value: 'none', label: 'It is not handled at all' }] },
];

export const emptySlots = (): Slots => ({
  idea: { state: 'missing', value: '' }, problem: { state: 'missing', value: '' }, users: { state: 'missing', value: '' }, outcome: { state: 'missing', value: '' }, context: { state: 'missing', value: '' }, use_cases: { state: 'missing', value: '' },
});

export const analyzeIdea = (idea: string): Slots => {
  const s = idea.trim();
  const short = s.length > 110 ? `${s.slice(0, 107)}…` : s;
  return {
    idea: { state: 'known', value: short },
    problem: { state: 'inferred', value: 'People spend too long getting answers because information and work are spread across disconnected tools and manual steps.' },
    users: { state: 'inferred', value: 'End customers, support staff', items: ['End customers', 'Support staff'] },
    outcome: { state: 'inferred', value: 'Faster resolution with less manual effort', items: ['Faster resolution with less manual effort'] },
    context: { state: 'missing', value: '' },
    use_cases: { state: 'missing', value: '' },
  };
};

export const makeDirections = (name: string, more = false): Direction[] => {
  const base: Direction[] = [
    { id: 'd1', title: 'Focused workflow assistant', description: `Start with one high-volume workflow and make ${name} excellent at it before expanding. Lowest risk and fastest time-to-value.`, tag: 'recommended', buildsOn: ['Users', 'Outcome'] },
    { id: 'd2', title: 'AI-first platform', description: 'Lead with an autonomous AI layer that resolves routine cases end to end, with humans handling exceptions.', tag: 'ambitious', buildsOn: ['Problem', 'Outcome'] },
    { id: 'd3', title: 'Unified workspace', description: 'Replace the disconnected tools with one workspace for every role, including reporting and administration.', tag: 'broad_scope', buildsOn: ['Users', 'Context'] },
  ];
  return more ? [...base, { id: 'd4', title: 'Embedded companion', description: 'Embed lightweight assistance into the tools people already use instead of introducing a new product.', tag: 'alternative', buildsOn: ['Context'] }] : base;
};

export const makeVision = (name: string, directionTitle: string) =>
  `${name} is the single place where people get fast, trustworthy answers and where teams resolve work with far less effort — starting with a ${directionTitle.toLowerCase()} that proves value in weeks, not quarters.`;

/* ── Opportunity & discovery ────────────────────────────────────────────── */

export const makeOpportunity = (name: string): Opportunity => ({
  cards: {
    business: { text: `${name} reduces cost-to-serve by automating routine work and giving teams a single source of truth, freeing capacity for higher-value cases.`, source: 'ai_estimate' },
    customer: { text: 'Customers get consistent, faster answers across channels without repeating themselves to different people.', source: 'user_confirmed' },
    market: { text: 'Demand for AI-assisted service tooling is growing as organisations look to contain headcount growth while raising satisfaction.', source: 'source_backed' },
    technology: { text: 'Modern LLM tooling, retrieval over internal knowledge, and workflow engines make a safe human-in-the-loop design feasible with commodity infrastructure.', source: 'ai_suggestion' },
  },
  potentialValue: [
    { label: 'Handling time reduction', value: '25–40%', basis: 'Comparable deployments report 25–40% lower average handling time.', source: 'source_backed' },
    { label: 'Deflection of routine requests', value: '15–30%', basis: 'Assumes 20% of volume is repetitive and answerable from documented knowledge.', source: 'ai_estimate' },
    { label: 'Agent onboarding time', value: '-35%', basis: 'Guided workflows shorten ramp-up for new staff.', source: 'ai_estimate' },
  ],
  assumptions: [
    { text: 'Existing knowledge content is accurate enough to ground AI answers.', source: 'ai_estimate' },
    { text: 'Stakeholders accept a human-approval step for sensitive actions.', source: 'ai_estimate' },
    { text: 'Core systems expose APIs for read access in the first release.', source: 'ai_estimate' },
  ],
});

export const makeMarket = (): MarketResearch => ({
  queries: ['AI customer service software market size 2026', 'customer service automation adoption trends', 'best practices human-in-the-loop AI support'],
  results: [
    { rank: 1, title: 'The state of AI in customer service — Industry Analyst Report', url: 'https://example.com/research/ai-customer-service', content: 'Adoption of generative AI in service organisations has more than doubled; leaders report double-digit reductions in handling time while maintaining quality through human review.' },
    { rank: 2, title: 'Customer service automation: buyer’s guide', url: 'https://example.com/guides/service-automation', content: 'Buyers prioritise integration depth, auditability and time-to-value. Pricing models are shifting from per-seat to usage-based.' },
    { rank: 3, title: 'Responsible AI in regulated service environments', url: 'https://example.com/whitepapers/responsible-ai', content: 'Regulated industries require explainability, data residency controls and a documented escalation path to a human.' },
    { rank: 4, title: 'Market map: conversational support platforms', url: 'https://example.com/maps/conversational-support', content: 'The landscape splits between suite vendors adding AI features and AI-native start-ups focused on specific workflows.' },
  ],
  summary: [
    { text: 'Generative AI adoption in service organisations is accelerating, with leaders reporting material reductions in handling time.', sources: [1] },
    { text: 'Buyers weigh integration depth, auditability and time-to-value above feature breadth.', sources: [2] },
    { text: 'Regulated sectors require explainability, residency controls and a clear human escalation path.', sources: [3] },
    { text: 'The market is split between incumbent suites and AI-native specialists.', sources: [4] },
  ],
});

export const makeCustomers = (): Customers => ({
  problemHolders: ['Support operations lead', 'Head of customer experience', 'Compliance officer'],
  solutionUsers: ['Support agent', 'Customer', 'Team lead'],
  segments: [
    { name: 'Mid-market service teams', description: '20–200 agents, multiple channels, limited tooling budget.' },
    { name: 'Regulated enterprises', description: 'Banks, insurers and healthcare providers with strict audit needs.' },
    { name: 'Digital-first scale-ups', description: 'High growth, small teams, API-first stack.' },
  ],
  personas: [
    { name: 'Asha — Support Lead', type: 'problem_holder', goals: 'Keep SLAs green while the team size stays flat.', pains: 'Context switching between five tools; inconsistent answers.' },
    { name: 'Marcus — Agent', type: 'solution_user', goals: 'Resolve each case on first contact.', pains: 'Hunting for the right policy or past case.' },
    { name: 'Priya — Customer', type: 'solution_user', goals: 'Get a clear answer quickly without repeating herself.', pains: 'Being transferred and re-explaining the issue.' },
  ],
});

export const makeAnalysis = (name: string): Analysis => ({
  summary: `${name} addresses a clear, measurable pain with a credible market. The opportunity is strongest where volume is high, knowledge is documented and a human review step is acceptable.`,
  strengths: ['Clear link between pain and measurable value', 'Feasible with mature technology', 'Fits a growing, budgeted market', 'Phased delivery limits risk'],
  risks: ['Quality of source knowledge limits answer quality', 'Change management with frontline staff', 'Integration effort with legacy systems'],
  openQuestions: ['Which channel should the first release cover?', 'What is the acceptable error rate for autonomous replies?', 'Who owns the knowledge base content after launch?'],
});

export const makeMarketBrief = (): MarketBrief => ({
  sections: [
    { key: 'executive_summary', title: 'Executive summary', items: [{ text: 'The market for AI-assisted service tooling is expanding quickly and buyers favour integrated, auditable solutions.', type: 'synthesis', sources: [1, 2] }] },
    { key: 'market_definition', title: 'Market definition', items: [{ text: 'Software that automates or augments customer-facing service workflows using AI.', type: 'reported', sources: [4] }] },
    { key: 'target_segments', title: 'Target segments', items: [{ text: 'Mid-market service teams and regulated enterprises show the strongest need.', type: 'synthesis', sources: [2, 3] }] },
    { key: 'drivers_trends', title: 'Drivers & trends', items: [{ text: 'Cost pressure and rising customer expectations push adoption.', type: 'reported', sources: [1] }, { text: 'Usage-based pricing is replacing per-seat licensing.', type: 'reported', sources: [2] }] },
    { key: 'gtm', title: 'Go-to-market considerations', items: [{ text: 'Land with one high-volume workflow, then expand across channels.', type: 'synthesis', sources: [2] }] },
    { key: 'risks', title: 'Risks', items: [{ text: 'Regulated buyers will require explainability and residency controls.', type: 'reported', sources: [3] }] },
  ],
  sizing: { tam: '$14.2B', sam: '$3.6B', som: '$180M', method: 'Top-down from analyst-reported market size, narrowed by segment and region.' },
  competitors: [
    { name: 'SuiteCo Service Cloud', description: 'Incumbent suite adding AI assistants to an existing helpdesk.' },
    { name: 'AgentAI', description: 'AI-native start-up focused on autonomous email resolution.' },
    { name: 'HelpFlow', description: 'Workflow-first platform with strong integrations.' },
  ],
  comparison: [
    { competitor: 'SuiteCo Service Cloud', capability: 'Auditability', detail: 'Strong logs, limited explanation of AI decisions.' },
    { competitor: 'AgentAI', capability: 'Autonomous resolution', detail: 'High automation, thin human-review tooling.' },
    { competitor: 'HelpFlow', capability: 'Integrations', detail: '200+ connectors, AI features still maturing.' },
  ],
  assumptions: ['Sizing is calculated top-down and should be validated bottom-up.'],
  openQuestions: ['Which regions are in scope for the first release?'],
});

/* ── Problem discovery ──────────────────────────────────────────────────── */

export const DIMENSIONS: { key: DimensionKey; label: string; required: boolean }[] = [
  { key: 'problem', label: 'Problem', required: true },
  { key: 'affected_users', label: 'Affected users', required: true },
  { key: 'pain_points', label: 'Pain points', required: true },
  { key: 'current_process', label: 'Current process', required: false },
  { key: 'frequency', label: 'Frequency', required: false },
  { key: 'severity', label: 'Severity', required: false },
  { key: 'business_impact', label: 'Business impact', required: true },
  { key: 'customer_impact', label: 'Customer impact', required: false },
  { key: 'evidence', label: 'Evidence', required: false },
];

export const PD_QUESTIONS: PdQuestion[] = [
  { id: 'pq1', dimension: 'frequency', text: 'How often does this problem occur?', help: 'An estimate is fine.', suggested: ['Daily'], options: ['Constantly', 'Daily', 'Weekly', 'Monthly or less'], multi: false, allowOther: false, skippable: true },
  { id: 'pq2', dimension: 'severity', text: 'How severe is the impact when it happens?', help: 'Think about the worst realistic outcome.', suggested: ['Costs money or customers'], options: ['Minor inconvenience', 'Delays work', 'Costs money or customers', 'Creates compliance or safety risk'], multi: false, allowOther: false, skippable: true },
  { id: 'pq3', dimension: 'current_process', text: 'Which steps does the current process involve?', help: 'Select everything that applies.', suggested: ['Email back-and-forth', 'Manual data re-entry', 'Approval chains'], options: ['Email back-and-forth', 'Spreadsheet tracking', 'Manual data re-entry', 'Phone escalations', 'Approval chains'], multi: true, allowOther: true, skippable: true },
  { id: 'pq4', dimension: 'customer_impact', text: 'How are customers affected?', help: 'Pick the closest match.', suggested: ['They wait longer', 'They get inconsistent answers'], options: ['They wait longer', 'They get inconsistent answers', 'They churn or complain', 'Little visible impact'], multi: true, allowOther: false, skippable: true },
  { id: 'pq5', dimension: 'evidence', text: 'What evidence do you already have?', help: 'Evidence strengthens validation later.', suggested: ['Support ticket data', 'Survey results'], options: ['Survey results', 'Support ticket data', 'Interview notes', 'Financial reports', 'None yet'], multi: true, allowOther: false, skippable: true },
];

export const initialDimensions = (name: string) => ({
  problem: { state: 'inferred' as const, items: [{ label: 'Problem', value: `Teams and customers struggle to get fast, consistent answers because ${name}’s domain knowledge and workflows are fragmented.`, origin: 'ai_inference' as const }] },
  affected_users: { state: 'known' as const, items: [{ label: 'Users', value: 'End customers; support staff', origin: 'user_confirmed' as const }] },
  pain_points: { state: 'inferred' as const, items: [{ label: 'Pain point', value: 'Long wait times', origin: 'ai_inference' as const }, { label: 'Pain point', value: 'Repeated manual lookups', origin: 'ai_inference' as const }, { label: 'Pain point', value: 'Inconsistent answers across channels', origin: 'ai_inference' as const }] },
  business_impact: { state: 'inferred' as const, items: [{ label: 'Impact', value: 'Higher cost-to-serve and lower satisfaction scores', origin: 'ai_estimate' as const }] },
  current_process: { state: 'missing' as const, items: [] }, frequency: { state: 'missing' as const, items: [] }, severity: { state: 'missing' as const, items: [] }, customer_impact: { state: 'missing' as const, items: [] }, evidence: { state: 'missing' as const, items: [] },
});

export const makeChains = (): RootChain[] => [
  { id: 'rc1', status: 'proposed', levels: { pain_point: 'Customers wait too long for an answer', symptom: 'Cases bounce between teams before resolution', root_cause: 'Information is spread across disconnected tools', underlying_cause: 'No shared system of record for knowledge and case history' }, rationale: 'Supported by the stated pain points and the current-process description.' },
  { id: 'rc2', status: 'proposed', levels: { pain_point: 'Agents give inconsistent answers', symptom: 'Different replies to the same question', root_cause: 'Policies live in documents that are hard to search', underlying_cause: 'Knowledge ownership and updates have no defined process' }, rationale: 'Inferred from user pain points; needs evidence from ticket data.' },
  { id: 'rc3', status: 'proposed', levels: { pain_point: 'New staff take months to be productive', symptom: 'Heavy reliance on a few experienced people', root_cause: 'Know-how is tacit and undocumented', underlying_cause: 'Onboarding is shadowing-based rather than guided' }, rationale: 'AI estimate based on typical service-operations patterns.' },
];

export const makeStatements = (name: string): Statement[] => [
  { id: 'st1', perspective: 'user', label: 'User perspective', source: 'ai_generated', status: 'proposed', statement: 'Customers cannot get a fast, consistent answer without repeating themselves to multiple people.', why: 'It directly drives dissatisfaction and churn.', affected: ['End customers'], uncertainties: ['Assumes wait time is the main driver of dissatisfaction.'] },
  { id: 'st2', perspective: 'business', label: 'Business perspective', source: 'ai_generated', status: 'proposed', statement: `The organisation spends too much to resolve routine cases because knowledge and workflows around ${name} are fragmented.`, why: 'It inflates cost-to-serve and limits scalability.', affected: ['Support operations', 'Finance'], uncertainties: ['Cost figures are estimates, not measured.'] },
  { id: 'st3', perspective: 'process', label: 'Process perspective', source: 'ai_generated', status: 'proposed', statement: 'Cases move through manual hand-offs with no shared record, causing rework and delays.', why: 'It is the mechanism behind both user and business pain.', affected: ['Agents', 'Team leads'], uncertainties: ['Hand-off counts need data to confirm.'] },
];

export const makeExecutive = (stId: string): Record<LensKey, { role: string; focus: string; score: number; reasoning: string }> => {
  const seed = stId.charCodeAt(stId.length - 1) % 3;
  return {
    ceo: { role: 'CEO', focus: 'Strategic fit & growth', score: 78 + seed * 4, reasoning: 'Aligned with the stated strategy of improving customer experience while scaling efficiently.' },
    cfo: { role: 'CFO', focus: 'Cost & return', score: 72 + seed * 5, reasoning: 'Potential savings are plausible but not yet evidenced; payback depends on volume assumptions.' },
    coo: { role: 'COO', focus: 'Operations & delivery', score: 84 - seed * 3, reasoning: 'Directly improves operational flow; needs a clear owner for knowledge upkeep.' },
    cmo: { role: 'CMO', focus: 'Brand & customer experience', score: 76 + seed * 2, reasoning: 'Consistent answers strengthen the brand promise and retention.' },
  };
};

export const EVIDENCE_TYPES: Record<string, string> = { survey: 'Survey results', tickets: 'Support ticket data', interview: 'Interview notes', financial: 'Financial report', analytics: 'Analytics export', other: 'Other' };

/* ── Solution planning ──────────────────────────────────────────────────── */

export const makeProposal = (name: string): Proposal => ({
  name: `${name} — Intelligent Service Workspace`,
  tagline: 'One workspace where answers, cases and knowledge come together — with people always in control.',
  domain: 'Customer Service',
  confidence: 91,
  status: 'Recommended',
  complexity: 'Medium',
  aiLevel: 'AI-Assisted',
  description: `A modular workspace that unifies case handling, knowledge retrieval and reporting. AI drafts answers and suggests next steps grounded in approved knowledge; humans approve anything sensitive. Designed for ${name} as a phased rollout starting with the highest-volume workflow.`,
  whyThis: ['Matches the validated problem: fragmented knowledge and manual hand-offs', 'AI-assisted (not autonomous) keeps risk low while delivering early value', 'Modular delivery lets you start with one channel and expand'],
  benefits: ['Faster resolution', 'Consistent answers', 'Lower cost-to-serve', 'Full audit trail', 'Quicker agent onboarding'],
  mapping: [
    { problem: 'Customers wait too long for answers', solution: 'AI-drafted replies grounded in approved knowledge' },
    { problem: 'Cases bounce between teams', solution: 'Shared case timeline with smart routing' },
    { problem: 'Inconsistent answers', solution: 'Central knowledge base with ownership and versioning' },
    { problem: 'No visibility for managers', solution: 'Live operational dashboards and SLA alerts' },
  ],
  outcomes: ['25–40% lower handling time', 'Higher first-contact resolution', 'Improved CSAT', 'Audit-ready history of every decision'],
  capabilities: ['Omnichannel case intake', 'Knowledge retrieval with citations', 'AI reply drafting with human approval', 'Smart routing and prioritisation', 'SLA tracking and alerts', 'Role-based access and audit logging'],
  modules: ['Case Management', 'Knowledge Hub', 'AI Assistant', 'Analytics'],
  aiFeatures: ['Reply drafting', 'Semantic search', 'Case summarisation', 'Intent classification'],
  integrations: ['CRM', 'Email / SMS', 'Identity (SSO)', 'Data warehouse'],
  summary: { 'Business Users': '120 – 400', 'AI Enabled': 'Yes — assisted', 'Integrations Count': '4', 'Security Level': 'High', 'Deployment Type': 'Cloud (private tenant)', 'Expected Growth': '+30% YoY', 'Business Criticality': 'Tier 1', 'Sensitive Data': 'PII, case content' },
});

export const DOC_DEFS: { type: DocType; title: string; description: string; abbr: string; color: string }[] = [
  { type: 'Solution Architecture Document', title: 'Solution Architecture Document', description: 'Business context, architecture style, key decisions and quality attributes.', abbr: 'SAD', color: 'text-blue-500' },
  { type: 'Technical Design Document', title: 'Technical Design Document', description: 'Detailed technical choices, patterns and implementation guidance.', abbr: 'TDD', color: 'text-indigo-500' },
  { type: 'API Endpoint List', title: 'API Endpoint List', description: 'REST resources, methods, request/response contracts and error model.', abbr: 'API_LIST', color: 'text-teal-500' },
  { type: 'Database Design Document', title: 'Database Design Document', description: 'Domain entities, relations, indexes and data lifecycle.', abbr: 'DDD', color: 'text-emerald-500' },
  { type: 'High-Level Design Document', title: 'High-Level Design Document', description: 'Major components, responsibilities and interactions.', abbr: 'HLD', color: 'text-purple-500' },
  { type: 'Integration Design Document', title: 'Integration Design Document', description: 'External systems, protocols, retries and failure handling.', abbr: 'IDD', color: 'text-orange-500' },
  { type: 'Infrastructure Design Document', title: 'Infrastructure Design Document', description: 'Hosting topology, environments, scaling and observability.', abbr: 'INDD', color: 'text-sky-500' },
  { type: 'Security Design Document', title: 'Security Design Document', description: 'Authentication, authorisation, data protection and threat model.', abbr: 'SDD', color: 'text-rose-500' },
  { type: 'Low-Level Design Document', title: 'Low-Level Design Document', description: 'Module internals, class/sequence design and error handling.', abbr: 'LLD', color: 'text-amber-500' },
  { type: 'AI Solution Design Document', title: 'AI Solution Design Document', description: 'Model usage, grounding, guardrails, evaluation and human oversight.', abbr: 'AISDD', color: 'text-fuchsia-500' },
];

export { makeDocContent } from './docsContent';

export const DIMENSION_CRITERIA = [
  { id: 'governance', label: 'Governance & Traceability', color: '#2563EB', criteria: ['Scope boundaries defined', 'System boundary clarity', 'Stakeholder & BRD consistency', 'BRD NFR coverage', 'Goal-to-component traceability', 'Open issues acknowledged', 'Architecture framework conformance'] },
  { id: 'decisions', label: 'Decisions & Requirements', color: '#8B5CF6', criteria: ['Decisions address concerns', 'Architecture style rationale', 'ASR-to-decision traceability', 'Decision alternatives considered', 'API-to-requirement traceability', 'Component-to-requirement traceability'] },
  { id: 'components', label: 'Components & Diagrams', color: '#14B8A6', criteria: ['Diagram-text consistency', 'LLD is HLD refinement', 'SAD ↔ TA component consistency', 'HLD ↔ DDD consistency', 'API ↔ DDD entity consistency'] },
  { id: 'security', label: 'Security & Infrastructure', color: '#F59E0B', criteria: ['Infrastructure NFR coverage', 'Security control scope', 'HLD ↔ security/auth consistency', 'Availability strategy', 'CIA triad coverage', 'AI risk mitigations'] },
];

export const makeFindings = (): Finding[] => [
  { doc: 'SDD', dimension: 'Security & Infrastructure', severity: 'high', status: 'failed', finding: 'Authentication flow in the Security Design differs from the HLD (token lifetime and refresh handling).', recommendation: 'Align the HLD sequence with the SDD: 15-minute access tokens with rotating refresh tokens.' },
  { doc: 'DDD', dimension: 'Components & Diagrams', severity: 'medium', status: 'warning', finding: 'Entity “Reply” is named “Message” in the API list.', recommendation: 'Use a single name across DDD and API_LIST.' },
  { doc: 'INDD', dimension: 'Security & Infrastructure', severity: 'medium', status: 'warning', finding: 'Disaster recovery targets (RPO/RTO) are not stated.', recommendation: 'Add RPO ≤ 15 min and RTO ≤ 1 h with a restore-test cadence.' },
  { doc: 'TDD', dimension: 'Decisions & Requirements', severity: 'low', status: 'warning', finding: 'Rate-limiting strategy is mentioned but not specified per endpoint.', recommendation: 'Add a rate-limit table to the API list.' },
  { doc: 'IDD', dimension: 'Governance & Traceability', severity: 'medium', status: 'insufficient_evidence', finding: 'No traceability link from the CRM integration to a business requirement.', recommendation: 'Reference the requirement ID that drives the CRM read access.' },
  { doc: 'SAD', dimension: 'Governance & Traceability', severity: 'low', status: 'passed', finding: 'Scope and system boundary are clearly documented.' },
  { doc: 'HLD', dimension: 'Components & Diagrams', severity: 'low', status: 'passed', finding: 'Components in the diagram match the text description.' },
  { doc: 'AISDD', dimension: 'Security & Infrastructure', severity: 'low', status: 'passed', finding: 'AI-specific risks and guardrails are documented.' },
];

export const makePersonas = (name: string): Persona[] => [
  { id: 'p1', name: 'Asha Verma', role: 'Support Operations Lead', tagline: 'Keeps the SLAs green with a flat team.', about: `Asha leads a team of 24 agents and is accountable for resolution times and quality in ${name}.`, experience: '9 years in service operations', environment: 'Open-plan service floor, hybrid', device: 'Laptop + second monitor', frequency: 'All day, every day', goals: ['Hit SLA targets consistently', 'See problems before customers do', 'Onboard new agents faster'], concerns: ['Tool sprawl', 'Inconsistent answers between agents', 'Reporting takes hours to assemble'], tasks: ['Monitor queue health', 'Reassign escalations', 'Review quality samples'], quote: 'I spend more time stitching reports together than coaching my team.' },
  { id: 'p2', name: 'Marcus Lee', role: 'Support Agent', tagline: 'Wants to solve it right the first time.', about: 'Marcus handles 40–60 cases a day across email and chat.', experience: '2 years in support', environment: 'Home office', device: 'Laptop', frequency: 'Full-time', goals: ['Resolve on first contact', 'Find the right policy quickly', 'Avoid repeat work'], concerns: ['Hunting across five tools', 'Fear of giving a wrong answer', 'Context lost during transfers'], tasks: ['Triage incoming cases', 'Draft and send replies', 'Escalate complex issues'], quote: 'If I could see the history and the right policy in one place, I would fly.' },
  { id: 'p3', name: 'Priya Nair', role: 'Customer', tagline: 'Just wants a clear answer, fast.', about: 'Priya uses the service weekly and contacts support when something blocks her.', experience: 'Customer for 3 years', environment: 'On the go', device: 'Phone', frequency: 'A few times a month', goals: ['Get an accurate answer quickly', 'Not repeat herself', 'Know what happens next'], concerns: ['Being transferred repeatedly', 'Vague timelines', 'Privacy of her data'], tasks: ['Raise a request', 'Track progress', 'Confirm resolution'], quote: 'Please do not make me explain it a third time.' },
];

export const makeJourneys = (personas: Persona[]): Journey[] => [
  {
    id: 'j1', personaId: personas[2]?.id ?? 'p3', scenario: 'Raising and resolving a request', goal: 'Get a clear answer without repeating herself', expectations: 'A quick, accurate reply and visibility of progress.',
    phases: [
      { name: 'Aware', actions: ['Notices an issue', 'Looks for help in the portal'], mindsets: ['“I hope this is easy.”'], saying: ['Where do I ask?'], touchpoints: ['Help centre', 'App'], emotion: { label: 'Hopeful', score: 3 } },
      { name: 'Contact', actions: ['Starts a chat', 'Describes the problem'], mindsets: ['“Will it understand me?”'], saying: ['Here is what happened…'], touchpoints: ['Chat widget'], emotion: { label: 'Cautious', score: 3 } },
      { name: 'Resolution', actions: ['Receives a grounded answer', 'Confirms it worked'], mindsets: ['“That was quick.”'], saying: ['Thanks, that solved it.'], touchpoints: ['Chat', 'Email'], emotion: { label: 'Relieved', score: 5 } },
      { name: 'Follow-up', actions: ['Gets a summary', 'Rates the experience'], mindsets: ['“I trust them.”'], saying: ['Five stars.'], touchpoints: ['Email'], emotion: { label: 'Satisfied', score: 5 } },
    ],
    opportunities: ['Proactive status updates', 'Instant answers for the top 20 questions', 'Seamless hand-off with full context'],
  },
  {
    id: 'j2', personaId: personas[1]?.id ?? 'p2', scenario: 'Handling a complex escalation', goal: 'Resolve it correctly on first contact', expectations: 'Everything needed in one view.',
    phases: [
      { name: 'Triage', actions: ['Opens the case', 'Reads the history'], mindsets: ['“What did they already try?”'], saying: ['Let me check…'], touchpoints: ['Case workspace'], emotion: { label: 'Focused', score: 3 } },
      { name: 'Investigate', actions: ['Searches knowledge', 'Checks policy'], mindsets: ['“Is this the latest policy?”'], saying: ['One moment please.'], touchpoints: ['Knowledge hub'], emotion: { label: 'Uncertain', score: 2 } },
      { name: 'Respond', actions: ['Reviews an AI draft', 'Edits and sends'], mindsets: ['“I am confident in this.”'], saying: ['Here is what we will do.'], touchpoints: ['Assistant'], emotion: { label: 'Confident', score: 5 } },
    ],
    opportunities: ['Suggested next best action', 'Policy freshness indicator', 'One-click escalation with summary'],
  },
];

const wf = (title: string, body: string) => `<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:#f8fafc;color:#0f172a;padding:20px}h1{font-size:18px;margin:0 0 14px}.bar{display:flex;gap:8px;margin-bottom:14px}.box{background:#fff;border:1.5px dashed #94a3b8;border-radius:10px;padding:14px;margin-bottom:12px;font-size:12px;color:#475569}.row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.btn{background:#2563eb;color:#fff;border-radius:8px;padding:8px 14px;font-size:12px;display:inline-block}.btn.g{background:#e2e8f0;color:#334155}.tag{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#64748b;margin-bottom:6px}.line{height:8px;background:#e2e8f0;border-radius:4px;margin:6px 0}</style></head><body><h1>${title}</h1>${body}</body></html>`;

export const makeWireframes = (): WireframePage[] => [
  { id: 'w1', name: 'Dashboard', purpose: 'Give managers a live view of queue health and SLAs.', flowType: 'Main', components: ['KPI card', 'Line chart', 'Table', 'Filter bar'], interactions: [{ action: 'Click a KPI card', result: 'Opens the filtered case list' }, { action: 'Change date range', result: 'Refreshes all widgets' }], html: wf('Dashboard', '<div class="bar"><span class="btn g">Today</span><span class="btn g">7 days</span><span class="btn g">30 days</span></div><div class="row"><div class="box"><div class="tag">Open cases</div><b style="font-size:22px">128</b></div><div class="box"><div class="tag">Avg. response</div><b style="font-size:22px">4m 12s</b></div><div class="box"><div class="tag">SLA at risk</div><b style="font-size:22px">9</b></div></div><div class="box" style="height:130px"><div class="tag">Weekly volume</div><div class="line" style="width:70%"></div><div class="line" style="width:50%"></div><div class="line" style="width:85%"></div></div><div class="box"><div class="tag">Recent cases</div><div class="line"></div><div class="line"></div><div class="line"></div></div>') },
  { id: 'w2', name: 'Case Workspace', purpose: 'Let an agent resolve a case with history, knowledge and AI help in one view.', flowType: 'Main', components: ['Timeline', 'Reply editor', 'Knowledge side-panel', 'Action bar'], interactions: [{ action: 'Click “Draft reply”', result: 'AI drafts a reply with citations' }, { action: 'Click “Send”', result: 'Reply is sent and logged' }], html: wf('Case #4821', '<div class="row" style="grid-template-columns:2fr 1fr"><div><div class="box"><div class="tag">Timeline</div><div class="line"></div><div class="line" style="width:80%"></div><div class="line" style="width:60%"></div></div><div class="box" style="height:110px"><div class="tag">Reply</div></div><span class="btn">Draft reply</span> <span class="btn g">Send</span></div><div class="box"><div class="tag">Knowledge</div><div class="line"></div><div class="line"></div><div class="line" style="width:50%"></div></div></div>') },
  { id: 'w3', name: 'Knowledge Hub', purpose: 'Search and maintain approved knowledge articles.', flowType: 'Secondary', components: ['Search bar', 'Article list', 'Editor'], interactions: [{ action: 'Search a phrase', result: 'Ranked results with excerpts' }], html: wf('Knowledge Hub', '<div class="box">Search knowledge…</div><div class="box"><div class="tag">Results</div><div class="line"></div><div class="line"></div><div class="line"></div></div><span class="btn">New article</span>') },
  { id: 'w4', name: 'Customer Portal', purpose: 'Let customers raise and track requests.', flowType: 'Main', components: ['Request form', 'Status tracker'], interactions: [{ action: 'Submit a request', result: 'Case is created and confirmation shown' }], html: wf('Customer Portal', '<div class="box"><div class="tag">New request</div><div class="line"></div><div class="line" style="width:70%"></div></div><span class="btn">Submit</span><div class="box" style="margin-top:12px"><div class="tag">My requests</div><div class="line"></div><div class="line"></div></div>') },
  { id: 'w5', name: 'Settings', purpose: 'Manage users, roles and notification preferences.', flowType: 'Edge', components: ['User table', 'Role selector', 'Toggle'], interactions: [{ action: 'Change a role', result: 'Permissions update immediately' }], html: wf('Settings', '<div class="box"><div class="tag">Team members</div><div class="line"></div><div class="line"></div></div><div class="box"><div class="tag">Notifications</div><div class="line" style="width:40%"></div></div>') },
];

const task = (id: string, title: string, owner: string, priority: 'P0' | 'P1' | 'P2', hours: number, description: string) => ({ id, title, owner, priority, hours, status: 'todo' as const, description });

export const makeTasks = (): EpicNode[] => [
  {
    id: 'E1', title: 'Case management', description: 'Create, route, track and resolve customer cases.',
    features: [
      { id: 'F1', title: 'Case intake', description: 'Create cases from every channel.', stories: [
        { id: 'S1', title: 'Create a case from email', statement: 'As a customer, I want to email support so that a case is created automatically.', tasks: [task('T1', 'Build inbound email parser', 'Backend', 'P0', 10, 'Parse sender, subject and body into a Case.'), task('T2', 'Create Case API (POST /v1/cases)', 'Backend', 'P0', 6, 'Validate input with Zod and persist.'), task('T3', 'Write intake acceptance tests', 'QA', 'P1', 5, 'Cover valid, invalid and duplicate emails.')] },
        { id: 'S2', title: 'Create a case from the portal', statement: 'As a customer, I want a request form so that I can ask for help without email.', tasks: [task('T4', 'Request form UI', 'Frontend', 'P0', 8, 'Responsive form with inline validation.'), task('T5', 'Confirmation screen', 'Frontend', 'P1', 3, 'Show case ID and next steps.')] },
      ] },
      { id: 'F2', title: 'Smart routing', description: 'Route cases to the right queue.', stories: [
        { id: 'S3', title: 'Auto-assign by intent', statement: 'As a team lead, I want cases routed by intent so that the right people see them.', tasks: [task('T6', 'Intent classifier service', 'AI', 'P1', 14, 'Classify into the agreed taxonomy.'), task('T7', 'Routing rules engine', 'Backend', 'P1', 9, 'Configurable rules with priorities.')] },
      ] },
    ],
  },
  {
    id: 'E2', title: 'Knowledge hub', description: 'Central, owned and versioned knowledge.',
    features: [
      { id: 'F3', title: 'Search & retrieval', description: 'Semantic search with citations.', stories: [
        { id: 'S4', title: 'Search articles', statement: 'As an agent, I want to search knowledge so that I find the right policy quickly.', tasks: [task('T8', 'Embedding pipeline', 'AI', 'P0', 12, 'Chunk, embed and index articles.'), task('T9', 'Search API with ranking', 'Backend', 'P0', 8, 'Hybrid keyword + vector retrieval.'), task('T10', 'Search UI with highlights', 'Frontend', 'P1', 7, 'Result list with excerpts.')] },
      ] },
    ],
  },
  {
    id: 'E3', title: 'AI assistant', description: 'Grounded drafting with human approval.',
    features: [
      { id: 'F4', title: 'Reply drafting', description: 'AI drafts replies from case + knowledge.', stories: [
        { id: 'S5', title: 'Draft a reply', statement: 'As an agent, I want an AI draft so that I respond faster.', tasks: [task('T11', 'Prompt + guardrail design', 'AI', 'P0', 9, 'Citations required; PII redaction.'), task('T12', 'Draft API & UI integration', 'Fullstack', 'P0', 11, 'Show draft with sources and edit/send.'), task('T13', 'Evaluation harness', 'AI', 'P1', 8, 'Groundedness and helpfulness metrics.')] },
      ] },
    ],
  },
  {
    id: 'E4', title: 'Analytics & platform', description: 'Dashboards, audit and platform foundations.',
    features: [
      { id: 'F5', title: 'Operational dashboards', description: 'Live queue and SLA views.', stories: [
        { id: 'S6', title: 'View SLA risk', statement: 'As a manager, I want to see SLA risk so that I can intervene.', tasks: [task('T14', 'Event ingestion pipeline', 'Data', 'P1', 10, 'Consume case events into the warehouse.'), task('T15', 'Dashboard widgets', 'Frontend', 'P1', 12, 'KPI cards and charts.')] },
      ] },
      { id: 'F6', title: 'Security & audit', description: 'Access control and audit trail.', stories: [
        { id: 'S7', title: 'Audit every change', statement: 'As a compliance officer, I want an audit log so that decisions are traceable.', tasks: [task('T16', 'Immutable audit log', 'Backend', 'P0', 7, 'Append-only store with actor and entity.'), task('T17', 'RBAC middleware', 'Backend', 'P0', 6, 'Role checks on every route.')] },
      ] },
    ],
  },
];

export const initialPlanningState = (): PlanningState => ({
  discoveryPage: 'idea', ideaStep: 'understand', ideaReached: 0, idea: '', analyzed: false,
  slots: emptySlots(), answers: {}, directions: [], selectedDirection: null, vision: null, briefConfirmed: false,
  oppTab: 'opportunity', opportunity: null, market: null, customers: null, analysis: null, marketBrief: null, oppCompleted: false,
  pdStep: 'understand', pdReached: 0, pdContext: false, pdAnswers: {}, chains: [], statements: [], selectedStatement: null, executive: null, evidence: [], decision: null, versions: [],
  proposal: null, solutionApproved: false, docs: {}, validation: { status: 'none', findings: [], at: null }, personas: [], journeys: [], wireframes: [], tasks: null,
});
