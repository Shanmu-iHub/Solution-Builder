import { DOC_DEFS, makeDocContent, makePersonas, makeProposal, makeTasks } from '../planning/content';

export interface PlannerBrief {
  problem: string;
  solution: string;
  stakeholders: string[];
  objectives: string[];
  inScope: string[];
  outOfScope: string[];
  domain: string;
}

const BRIEFS: Record<string, PlannerBrief> = {
  'Loan Origination Portal': {
    domain: 'Retail Banking',
    problem: 'Loan applications take 9 days on average because customers must visit a branch, documents are checked manually and credit decisions wait in email queues. Roughly 35% of applicants abandon the process.',
    solution: 'A digital origination portal where customers apply online, upload documents once, receive an automated pre-decision within minutes and track the application end to end, with underwriters reviewing only the exceptions.',
    stakeholders: ['Head of Retail Lending', 'Chief Risk Officer', 'Compliance Officer', 'Operations Manager', 'Customer Experience Lead'],
    objectives: ['Cut time-to-decision from 9 days to 2 days', 'Reduce application abandonment from 35% to 15%', 'Auto-decide 60% of standard applications within policy', 'Keep a complete audit trail for every decision'],
    inScope: ['Personal and auto loans', 'Online application and document upload', 'Automated eligibility and scoring', 'Underwriter workbench', 'Customer status tracking'],
    outOfScope: ['Mortgage lending', 'Commercial loans', 'Replacement of the core banking system'],
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
  domain: 'Enterprise',
  problem: `Teams working on ${name} rely on disconnected tools and manual hand-offs, which slows delivery and makes quality hard to audit.`,
  solution: `A single workspace for ${name} that automates the routine steps, keeps people in control of decisions and records every action for audit.`,
  stakeholders: ['Business Sponsor', 'Product Owner', 'Operations Lead', 'Compliance Officer'],
  objectives: ['Reduce cycle time by 40%', 'Cut manual effort by 30%', 'Provide a full audit trail'],
  inScope: ['Core workflow', 'Dashboards', 'Integrations with existing systems'],
  outOfScope: ['Replacement of systems of record'],
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
