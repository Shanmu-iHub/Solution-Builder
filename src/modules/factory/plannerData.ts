import { DOC_DEFS, makeDocContent, makePersonas, makeProposal, makeTasks } from '../planning/content';

export interface PlannerBrief {
  problem: string;
  solution: string;
  stakeholders: string[];
  objectives: string[];
  inScope: string[];
  outOfScope: string[];
  domain: string;
  initiativeContext?: string;
  problemStatement?: string;
  currentState?: string;
  businessRules?: string[];
  successMetrics?: string[];
  assumptions?: string[];
  constraints?: string[];
  risks?: string[];
  securityCompliance?: string;
  highLevelReqs?: string[];
  solutionName?: string;
  solutionTagline?: string;
  solutionDesc?: string;
  confidenceScore?: number;
  complexity?: string;
  aiLevel?: string;
  solutionWhyThis?: string[];
  solutionBenefits?: string[];
  solutionOutcomes?: string[];
  solutionCapabilities?: string[];
  solutionModules?: string[];
  solutionAiFeatures?: string[];
  solutionIntegrations?: string[];
}

const BRIEFS: Record<string, PlannerBrief> = {
  'ExpensifyIQ': {
    domain: 'PROBLEM DISCOVERY',
    problem: 'No business problem statement captured in discovery.',
    solution: 'An intelligent expense management platform that simplifies expense submission, approvals, and policy compliance while improving spending visibility for finance teams.',
    initiativeContext: 'An intelligent expense management platform that simplifies expense submission, approvals, and policy compliance while improving spending visibility for finance teams.',
    problemStatement: 'Expense report approval cycles take 14 business days on average. Employees frequently miss receipt attachments, and finance managers spend excessive hours manually verifying line-item compliance against company travel policies.',
    currentState: 'Employees manually upload scanned receipts into spreadsheets. Managers review each claim line by line and approve via unstructured email threads. Finance reconciles credit card feeds manually at month-end.',
    stakeholders: ['Finance Operations Lead', 'VP Corporate Controller', 'Travel & Expense Admin', 'Frontline Employee Submitter', 'Audit & Compliance Officer'],
    objectives: [
      'Accelerate reimbursement turnaround from 14 days to under 48 hours',
      'Automate 80% of routine receipt-to-policy compliance checks',
      'Reduce fraudulent or out-of-policy claims by 65%',
      'Achieve seamless real-time ERP ledger synchronization'
    ],
    inScope: [
      'Web & Mobile receipt submission with OCR extraction',
      'Automated corporate travel policy validation engine',
      'Multi-tier manager approval workflow with escalation timers',
      'Real-time corporate card transaction matching',
      'Finance audit & anomaly detection dashboard'
    ],
    outOfScope: [
      'Direct vendor invoice & accounts payable processing',
      'Payroll direct-deposit clearing engine',
      'Replacement of existing core ERP general ledger'
    ],
    businessRules: [
      'Receipts are mandatory for all transactions exceeding $25.00',
      'Expense reports above $1,000 require secondary approval from Department Head',
      'Foreign currency transactions convert using daily ECB exchange rates',
      'Weekend personal charges must be marked as non-reimbursable'
    ],
    successMetrics: [
      'Reimbursement turnaround < 48 hours',
      '95% Receipt OCR field extraction accuracy',
      '0% Unaudited duplicate expense submissions',
      'Employee satisfaction rating > 4.6 / 5.0'
    ],
    assumptions: [
      'Employees possess smartphones with cameras capable of capturing receipt images',
      'Corporate card issuers provide daily transaction feeds via webhook or SFTP',
      'Enterprise SSO via Okta/Azure AD is enabled for role management'
    ],
    constraints: [
      'Must strictly comply with SOC2 Type II and GDPR data retention policies',
      'Processing cost per expense report must remain under $1.50'
    ],
    risks: [
      'Low mobile app adoption if manual receipt adjustment takes too long',
      'API rate limits or delays from banking feed aggregators',
      'High false-positive rate on automated fraud flags'
    ],
    securityCompliance: 'Standard GDPR, Role-Based Access Control (RBAC), and Enterprise Security guidelines apply. All receipt image uploads encrypted with AES-256 at rest.',
    highLevelReqs: [
      'Mobile camera receipt scanning with instantaneous optical character recognition',
      'Per-diem calculation auto-adjustment by city tier and travel duration',
      'Out-of-policy flag justification prompt before submission',
      'Multi-currency automatic rate conversion',
      'Direct sync with NetSuite / SAP ERP accounting codes'
    ],
    solutionName: 'ExpensifyIQ',
    solutionTagline: 'Eliminating manual audits through AI-driven policy enforcement and seamless workflow automation.',
    solutionDesc: 'An intelligent expense management platform that simplifies expense submission, approvals, and policy compliance while improving spending visibility for finance teams.',
    confidenceScore: 95,
    complexity: 'Medium',
    aiLevel: 'Basic',
    solutionWhyThis: [
      'Automates 90% of policy checks instantly at point of submission',
      'Reduces approval lag from weeks to hours with smart mobile routing',
      'Provides CFOs with real-time spend analytics and spend anomaly alerts'
    ],
    solutionBenefits: [
      'Zero-touch audit for compliant receipts',
      'Instant mobile OCR capture & categorization',
      'Automated policy rule enforcement',
      'Seamless ERP export & audit trail'
    ],
    solutionOutcomes: [
      '90% reduction in audit cycle times',
      '100% policy compliance visibility',
      '$140k annual savings in admin labor',
      'Sub-2 day reimbursement turnaround'
    ],
    solutionCapabilities: [
      'Multi-currency receipt OCR parsing',
      'Rule-based & AI policy anomaly detection',
      'Dynamic hierarchical manager approval chains',
      'Real-time card feed reconciliation'
    ],
    solutionModules: [
      'SUBMISSION WEB/MOBILE APP',
      'POLICY ENGINE',
      'FINANCE ANALYTICS HUB'
    ],
    solutionAiFeatures: [
      'RECEIPT-TO-POLICY MATCHING',
      'DUPLICATE DETECTION',
      'ANOMALY DETECTION FOR HIGH-VALUE CLAIMS'
    ],
    solutionIntegrations: [
      'NetSuite ERP Connector',
      'SAP General Ledger API',
      'Visa & Mastercard Corporate Feeds',
      'Workday HR Employee Sync',
      'Slack Approval Bot'
    ]
  },
  'Loan Origination Portal': {
    domain: 'Retail Banking',
    problem: 'Loan applications take 9 days on average because customers must visit a branch, documents are checked manually and credit decisions wait in email queues. Roughly 35% of applicants abandon the process.',
    solution: 'A digital origination portal where customers apply online, upload documents once, receive an automated pre-decision within minutes and track the application end to end, with underwriters reviewing only the exceptions.',
    initiativeContext: 'A modern, omnichannel loan origination system that accelerates retail credit underwriting, reduces manual document handling, and delivers transparent applicant status tracking.',
    problemStatement: 'Loan applications take 9 days on average because customers must visit a branch, documents are checked manually and credit decisions wait in email queues. Roughly 35% of applicants abandon the process.',
    currentState: 'Borrowers visit branch offices with physical paperwork. Officers manually scan and upload documents into legacy core banking screens. Underwriters evaluate creditworthiness manually in spreadsheets.',
    stakeholders: ['Head of Retail Lending', 'Chief Risk Officer', 'Compliance Officer', 'Operations Manager', 'Customer Experience Lead'],
    objectives: [
      'Cut time-to-decision from 9 days to 2 days',
      'Reduce application abandonment from 35% to 15%',
      'Auto-decide 60% of standard applications within policy',
      'Keep a complete audit trail for every decision'
    ],
    inScope: [
      'Personal and auto loans',
      'Online application and document upload',
      'Automated eligibility and scoring',
      'Underwriter workbench',
      'Customer status tracking'
    ],
    outOfScope: [
      'Mortgage lending',
      'Commercial loans',
      'Replacement of the core banking system'
    ],
    businessRules: [
      'Credit score < 620 automatically routes to Senior Underwriter',
      'Debt-to-Income (DTI) ratio must not exceed 43% for automated approval',
      'Proof of income required for loan amounts exceeding $10,000',
      'KYC identity verification must succeed within 72 hours'
    ],
    successMetrics: [
      'Decision time < 48 hours for 90% of applicants',
      'Application abandonment reduced to < 15%',
      'Customer Net Promoter Score > 60',
      '100% compliance audit pass rate'
    ],
    assumptions: [
      'Equifax & Experian credit bureau APIs have > 99.9% uptime',
      'Core banking engine supports RESTful account disbursement APIs'
    ],
    constraints: [
      'Must strictly conform to Fair Lending and FCRA regulations',
      'PII data must be encrypted with HSM-backed keys'
    ],
    risks: [
      'Legacy core banking API throttling during peak morning hours',
      'Borrower confusion regarding document verification requirements'
    ],
    securityCompliance: 'Full FCRA, GLBA, and SOC2 compliance. End-to-end encryption for all financial records and biometric KYC inputs.',
    highLevelReqs: [
      'Instant credit bureau pull & algorithmic scoring',
      'Self-service borrower dashboard with live status tracker',
      'Automated paystub OCR parsing',
      'Digital signature & automated fund disbursement'
    ],
    solutionName: 'Omnichannel Loan Origination Portal',
    solutionTagline: 'Accelerating retail lending with automated scoring, fraud checks, and end-to-end self-service tracking.',
    solutionDesc: 'A digital origination portal where customers apply online, upload documents once, receive an automated pre-decision within minutes and track the application end to end, with underwriters reviewing only the exceptions.',
    confidenceScore: 92,
    complexity: 'High',
    aiLevel: 'Intermediate',
    solutionWhyThis: [
      'Reduces turnaround by 75% via instant algorithmic scoring',
      'Provides borrowers with transparent self-service status updates',
      'Focuses expert underwriters exclusively on complex exceptions'
    ],
    solutionBenefits: [
      'Automated pre-decision in under 3 minutes',
      'Frictionless mobile document upload',
      'Integrated fraud and identity verification',
      'Comprehensive regulatory audit trail'
    ],
    solutionOutcomes: [
      '78% drop in time-to-decision',
      '57% reduction in processing costs',
      '60% automated straight-through processing rate',
      'Zero non-compliance findings'
    ],
    solutionCapabilities: [
      'Instant credit bureau pull & scoring',
      'Automated tax & paystub OCR parsing',
      'Underwriter exception triage queue',
      'Digital signature & automated fund disbursement'
    ],
    solutionModules: [
      'BORROWER APPLICATION PORTAL',
      'CREDIT DECISION ENGINE',
      'UNDERWRITER WORKBENCH'
    ],
    solutionAiFeatures: [
      'INCOME DOCUMENT OCR & VALIDATION',
      'SYNTHETIC IDENTITY FRAUD DETECTION',
      'DYNAMIC RISK-BASED PRICING'
    ],
    solutionIntegrations: [
      'Core Banking System API',
      'Experian & Equifax Credit Bureaus',
      'Plaid Financial Account Verification',
      'DocuSign Digital Signatures'
    ]
  },
  'Retail Analytics Hub': {
    domain: 'Retail',
    problem: 'Category managers wait up to two weeks for reports and make stocking decisions on stale data, causing 7% stock-outs on fast movers and 12% overstock on slow lines across 120 stores.',
    solution: 'A unified analytics hub that combines store sales, inventory and promotions with demand forecasts, so managers get alerts and recommended orders before stock-outs happen.',
    stakeholders: ['Chief Merchandising Officer', 'Category Managers', 'Supply Chain Director', 'Store Operations Lead', 'Finance Business Partner'],
    objectives: ['Reduce stock-outs on top 500 SKUs from 7% to 3%', 'Cut overstock write-offs by 20%', 'Deliver daily refreshed dashboards by 7:00', 'Forecast accuracy (WAPE) below 25%'],
    inScope: ['Sales and inventory ingestion', 'Demand forecasting for top SKUs', 'Replenishment recommendations', 'Executive and category dashboards'],
    outOfScope: ['Automated purchase-order placement', 'Supplier portal', 'Pricing optimisation'],
  },
  'Policy Renewal Advisor': {
    domain: 'Insurance',
    problem: 'Brokers learn that a commercial policy is at risk only when the client has already requested quotes elsewhere. Renewal preparation takes 6 hours per account and is done in spreadsheets.',
    solution: 'An advisor that scores renewal risk months ahead, compares market quotes side by side and drafts a tailored renewal recommendation the broker can review and send.',
    stakeholders: ['Head of Broking', 'Account Managers', 'Underwriting Liaison', 'Compliance Officer', 'Client Services'],
    objectives: ['Raise renewal retention from 82% to 90%', 'Reduce preparation time from 6 hours to 90 minutes', 'Flag at-risk policies 90 days before renewal', 'Standardise renewal communications'],
    inScope: ['Renewal risk scoring', 'Quote comparison', 'Recommendation drafting', 'Broker dashboard'],
    outOfScope: ['Policy administration', 'Claims handling', 'Direct client portal'],
  },
  'Claims Automation Portal': {
    domain: 'Insurance',
    problem: 'Simple claims take 14 days to settle because intake is by phone and email, triage is manual and adjusters re-key data across three systems. Claimants chase status by phone, driving 40% of call volume.',
    solution: 'A claims portal with guided online intake, automated severity and fraud triage, a unified adjuster workbench and live status tracking for claimants.',
    stakeholders: ['Claims Director', 'Fraud Investigator', 'Adjuster Team Lead', 'Policyholder Representative', 'IT Security'],
    objectives: ['Settle simple claims in 5 days', 'Reduce claims leakage by 8%', 'Deflect 30% of status calls', 'Raise claimant NPS above 55'],
    inScope: ['First notice of loss', 'Triage and routing', 'Adjuster workbench', 'Claim status tracking', 'Document intake with OCR'],
    outOfScope: ['Subrogation recovery', 'Reinsurance reporting', 'Legacy policy system replacement'],
  },
  'Enterprise Solution Architecture': {
    domain: 'Financial Services',
    problem: 'Customer onboarding takes 11 days on average because KYC checks, document collection and account set-up are handled in separate tools with manual hand-offs.',
    solution: 'A unified onboarding workspace that orchestrates KYC, document intake and account provisioning, with automated reminders and an auditable status timeline.',
    stakeholders: ['Head of Retail Operations', 'Compliance Officer', 'Customer Experience Lead', 'IT Security'],
    objectives: ['Cut onboarding time from 11 days to 3 days', 'Reduce manual KYC touches by 60%', 'Provide a full audit trail for every onboarding case'],
    inScope: ['Individual customer onboarding', 'Document capture and verification', 'Account provisioning hand-off'],
    outOfScope: ['Corporate / SME onboarding', 'Legacy core-banking replacement'],
  },
};

const generic = (name: string): PlannerBrief => ({
  domain: 'Problem Discovery',
  problem: `Teams working on ${name} rely on disconnected tools and manual hand-offs, which slows delivery and makes quality hard to audit.`,
  solution: `A single workspace for ${name} that automates routine steps, keeps people in control of decisions and records every action for audit.`,
  initiativeContext: `Enterprise solution architecture designed to modernize and automate ${name} workflows.`,
  problemStatement: `Teams working on ${name} face substantial workflow friction and manual overhead that impacts operational velocity.`,
  currentState: `Workflows are currently tracked manually across disparate spreadsheets and email threads without central governance.`,
  stakeholders: ['Business Sponsor', 'Product Owner', 'Operations Lead', 'Compliance Officer', 'Engineering Manager'],
  objectives: ['Reduce cycle time by 40%', 'Cut manual effort by 30%', 'Provide a full audit trail', 'Improve stakeholder satisfaction'],
  inScope: ['Core workflow', 'Dashboards', 'Integrations with existing systems', 'Role-based access control'],
  outOfScope: ['Replacement of core systems of record', 'Direct legacy database schema migrations'],
  businessRules: ['All transactions require authorization', 'Audit logs must be preserved for 7 years'],
  successMetrics: ['Operational SLA improvement > 35%', 'Cycle time reduction > 40%'],
  assumptions: ['Cloud hosting environment is configured', 'Standard identity provider is operational'],
  constraints: ['Budget and timeline constraints apply', 'Must meet corporate security standards'],
  risks: ['User adoption friction', 'Integration latency with legacy endpoints'],
  securityCompliance: 'Standard enterprise security protocols, TLS 1.3 encryption, and RBAC enforced.',
  solutionName: name,
  solutionTagline: 'Transforming legacy operations with unified automation and intelligent workflow control.',
  solutionDesc: `A single workspace for ${name} that automates routine steps, keeps people in control of decisions and records every action for audit.`,
  confidenceScore: 90,
  complexity: 'Medium',
  aiLevel: 'Intermediate',
  solutionWhyThis: ['Eliminates manual bottlenecks', 'Provides auditable transparency', 'Reduces delivery friction'],
  solutionBenefits: ['Automated policy verification', 'Centralized status tracking', 'Real-time reporting'],
  solutionOutcomes: ['35% faster execution', 'Zero compliance penalties', 'Streamlined user handoffs'],
  solutionCapabilities: ['Workflow automation engine', 'Audit trail logger', 'Multi-role approval routing'],
  solutionModules: ['CORE WORKSPACE', 'INTELLIGENCE ENGINE', 'ANALYTICS HUB'],
  solutionAiFeatures: ['ANOMALY DETECTION', 'DOCUMENT PARSING', 'SMART RECOMMENDATIONS'],
  solutionIntegrations: ['Active Directory SSO', 'Enterprise ERP API', 'Notification Webhooks']
});

export const briefFor = (name: string): PlannerBrief => BRIEFS[name] ?? generic(name);

export interface PlannerDocument { id: string; title: string; subtitle: string; body: string; group: 'Product' | 'Architecture' | 'Delivery' }

const prd = (name: string, b: PlannerBrief) => `# Product Requirements Document

| | |
|---|---|
| **Product** | ${name} |
| **Domain** | ${b.domain} |
| **Version** | 1.0 |
| **Status** | Approved for build |

## 1. Vision
${b.solution}

## 2. Problem statement
${b.problem}

## 3. Goals and success metrics
| # | Goal | Metric | Target |
|---|---|---|---|
${b.objectives.map((o, i) => `| G${i + 1} | ${o} | Measured monthly | See goal |`).join('\n')}

## 4. Users and personas
${makePersonas(name).map(p => `**${p.name} — ${p.role}.** ${p.tagline} *Goals:* ${p.goals.join('; ')}.`).join('\n\n')}

## 5. Scope
**In scope**
${b.inScope.map(x => `- ${x}`).join('\n')}

**Out of scope**
${b.outOfScope.map(x => `- ${x}`).join('\n')}

## 6. Feature overview
| Feature | Description | Priority |
|---|---|---|
| Workspace | One place to see, act on and track work | Must |
| Smart routing | Automatically send work to the right person or queue | Must |
| AI assistance | Drafts and summaries grounded in approved knowledge, always human-approved | Should |
| Dashboards | Live operational and management views | Must |
| Notifications | Preference-aware alerts and reminders | Should |
| Administration | Roles, configuration and audit search | Must |

## 7. Non-functional requirements
- Availability 99.9% monthly · p95 latency under 300 ms
- WCAG 2.2 AA accessibility
- Single sign-on, role-based access, full audit logging
- Data retention and deletion aligned to policy

## 8. Release plan
| Release | Content | Target |
|---|---|---|
| R1 (MVP) | Core workflow, routing, dashboards, audit | Week 10 |
| R2 | AI assistance, notifications | Week 16 |
| R3 | Integrations, reporting exports, admin tooling | Week 22 |

## 9. Risks and dependencies
- Dependency on existing systems exposing stable APIs
- Change management with frontline users
- Quality of source knowledge and data

## 10. Stakeholders
${b.stakeholders.map(s => `- ${s}`).join('\n')}`;

const tasksDoc = (): string => `# Implementation Task Breakdown\n\n${makeTasks().map(e => `## ${e.id} — ${e.title}\n${e.description}\n\n${e.features.map(f => `### ${f.title}\n${f.stories.map(s => `**${s.title}** — *${s.statement}*\n\n${s.tasks.map(t => `- [ ] ${t.title} — ${t.owner}, ${t.priority}, ${t.hours}h`).join('\n')}`).join('\n\n')}`).join('\n\n')}`).join('\n\n')}`;

export const plannerDocuments = (name: string, b: PlannerBrief): PlannerDocument[] => [
  { id: 'prd', title: 'Product Requirements Document (PRD)', subtitle: 'Goals, personas, scope and success metrics', body: prd(name, b), group: 'Product' },
  ...DOC_DEFS.map(d => ({ id: d.abbr.toLowerCase(), title: d.title, subtitle: d.description, body: makeDocContent(d.type, name), group: 'Architecture' as const })),
  { id: 'tasks', title: 'Implementation Task Breakdown', subtitle: 'Epics → features → stories → tasks with estimates', body: tasksDoc(), group: 'Delivery' },
];

export const plannerMetrics = () => {
  const epics = makeTasks();
  const feats = epics.flatMap(e => e.features);
  const stories = feats.flatMap(f => f.stories);
  const tasks = stories.flatMap(s => s.tasks);
  return [['Total epics', String(epics.length)], ['Total features', String(feats.length)], ['User stories', String(stories.length)], ['Implementation tasks', String(tasks.length)]] as [string, string][];
};

export const plannerProfile = (name: string): [string, string][] => {
  const p = makeProposal(name).summary;
  return Object.entries(p);
};

export const plannerBenefits = (name: string) => makeProposal(name).benefits;
