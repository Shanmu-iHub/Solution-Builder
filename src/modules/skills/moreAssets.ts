import { daysAgo } from '../ui';
import { Asset } from './types';

type Base = (over: Partial<Asset> & Pick<Asset, 'id' | 'type' | 'displayName'>) => Asset;

/** Additional folders, skills, knowledge, instructions and policies so the library feels lived-in. */
export const makeMoreAssets = (base: Base): Asset[] => [
  /* ── Folders ── */
  base({ id: 'CAP-0005', type: 'capability', displayName: 'Compliance & Risk', shortDescription: 'Policy checks, risk registers and audit-ready summaries.', description: 'Assistants used by the risk and compliance teams to check documents against policy, build risk registers and prepare audit evidence.', category: 'Operations', subCategory: 'Risk Management', department: 'Compliance', tags: ['compliance', 'risk', 'audit'], linkedSkillIds: ['SKL-0010', 'SKL-0011'], updatedAt: daysAgo(4) }),
  base({ id: 'CAP-0006', type: 'capability', displayName: 'Sales Enablement', shortDescription: 'Call summaries, proposals and follow-up helpers for sales teams.', description: 'Helps account executives spend more time selling: automatic call notes, proposal drafts and next-step suggestions grounded in the sales playbook.', category: 'Sales & CRM', subCategory: 'Enablement', department: 'Sales', tags: ['sales', 'crm', 'proposals'], linkedSkillIds: ['SKL-0012', 'SKL-0013'], updatedAt: daysAgo(7) }),

  /* ── Skills ── */
  base({
    id: 'SKL-0010', type: 'skill', displayName: 'Compliance Policy Checker', skillType: 'VALIDATION', category: 'Operations', subCategory: 'Risk Management', department: 'Compliance', tags: ['compliance', 'policy', 'review', 'audit'],
    shortDescription: 'Checks a document against internal policies and flags gaps with evidence and fixes.',
    description: 'Compares any contract, procedure or product description against the selected policy set. Each finding cites the clause, quotes the evidence, rates the severity and proposes compliant wording. Produces an audit-ready summary for the compliance file.',
    status: 'PUBLISHED', semanticVersion: '1.2.0', accessibility: 'TEAM', capabilityIds: ['CAP-0005'], knowledgeIds: ['KNW-0006'], instructionIds: ['INS-0002', 'INS-0005'], policyIds: ['POL-0002', 'POL-0005'],
    promptTemplate: `# ROLE
You are a compliance analyst. You test documents against written policy and you cite your evidence.

# INPUT
Document under review:
<document>
{{document}}
</document>

Policies in scope: {{policy_set}}
Jurisdiction: {{jurisdiction}}    Business unit: {{business_unit}}

# PROCEDURE
1. Read the document fully and list its purpose, parties and data it handles (3 bullets).
2. For every policy in scope, evaluate each control and mark it **Compliant**, **Partially compliant**, **Non-compliant** or **Not applicable**.
3. For every non-compliant or partial control, produce a finding:
   - **Policy / control ID**
   - **Evidence:** exact quote from the document with section reference
   - **Gap:** what is missing or conflicting
   - **Severity:** Critical / High / Medium / Low (use the risk matrix in the knowledge base)
   - **Recommended wording:** a replacement clause that would comply
4. Summarise results in a table: Control | Result | Severity.
5. Give an overall rating (Green / Amber / Red) with a one-paragraph justification.

# RULES
- Quote the document; never paraphrase evidence.
- If the policy text is not provided for a control, mark it **Cannot assess** instead of guessing.
- Redact personal data in all quotes.
- Do not give legal advice; recommend review by Legal where a clause has contractual effect.`,
    examples: [{ title: 'Vendor data-processing addendum', input: 'Document: Vendor DPA v3 (excerpt). Policy set: Data Protection Policy 2026.', output: '| DP-4.2 Sub-processor approval | Non-compliant | High |\nEvidence: "Vendor may appoint sub-processors at its discretion."…' }],
    stats: { views: 940, installs: 120, favorites: 58, rating: 4.6, reviewCount: 17 }, updatedAt: daysAgo(3),
  }),
  base({
    id: 'SKL-0011', type: 'skill', displayName: 'Risk Register Builder', skillType: 'GENERATION', category: 'Operations', subCategory: 'Risk Management', department: 'Compliance', tags: ['risk', 'register', 'mitigation'],
    shortDescription: 'Turns a project description into a scored risk register with owners and mitigations.',
    description: 'Identifies delivery, security, operational and regulatory risks from a project brief, scores likelihood and impact on a 5×5 matrix, and proposes mitigations and early-warning indicators.',
    status: 'PUBLISHED', semanticVersion: '1.0.1', accessibility: 'PRIVATE', capabilityIds: ['CAP-0005'], knowledgeIds: ['KNW-0006'], instructionIds: ['INS-0002'], policyIds: ['POL-0001'],
    promptTemplate: `You are a risk manager. From the project brief below build a risk register.

<brief>
{{brief}}
</brief>

For each risk output: ID, category (Delivery / Technical / Security / Regulatory / Operational / Financial), description in the form "If <cause> then <event> resulting in <impact>", likelihood (1-5), impact (1-5), score (L×I), rating (Low <6, Medium 6-11, High 12-19, Critical ≥20), owner role, mitigation actions (max 3), contingency, and an early-warning indicator.

Return a Markdown table sorted by score descending, followed by the top three risks explained in plain language. Do not invent facts about the project — if you are unsure, state the assumption.`,
    stats: { views: 310, installs: 0, favorites: 12, rating: 4.2, reviewCount: 4 }, updatedAt: daysAgo(9),
  }),
  base({
    id: 'SKL-0012', type: 'skill', displayName: 'Sales Call Summarizer', skillType: 'ANALYSIS', category: 'Sales & CRM', subCategory: 'Enablement', department: 'Sales', tags: ['sales', 'calls', 'crm', 'summary'],
    shortDescription: 'Summarises a discovery call into pain points, buying signals, objections and next steps.',
    description: 'Takes a call transcript and produces a CRM-ready note: attendees, pain points, current tooling, budget and timeline signals, objections with suggested responses and a prioritised next-step list.',
    status: 'PUBLISHED', semanticVersion: '2.1.0', accessibility: 'PUBLIC', marketplaceLive: true, capabilityIds: ['CAP-0006'], knowledgeIds: ['KNW-0007'], instructionIds: ['INS-0002', 'INS-0003'], policyIds: ['POL-0002'],
    promptTemplate: `You are a sales operations analyst. Summarise the discovery call transcript for the CRM.

<transcript>
{{transcript}}
</transcript>

Account: {{account}}    Opportunity stage: {{stage}}

Produce:
1. **One-line summary**
2. **Attendees and roles**
3. **Pain points** (quote the prospect's words)
4. **Current solution / competitors mentioned**
5. **Buying signals** (budget, timeline, decision process, champion)
6. **Objections** with a suggested response grounded in the sales playbook
7. **MEDDICC snapshot** — Metrics, Economic buyer, Decision criteria, Decision process, Identified pain, Champion, Competition (mark unknown as "?")
8. **Next steps** — owner, action, due date
9. **CRM fields** — stage recommendation and close-date confidence

Never invent numbers or commitments. Redact personal contact details.`,
    examples: [{ title: 'Discovery call — logistics prospect', input: 'Transcript excerpt: "We lose about two days a month reconciling carrier invoices…"', output: 'Pain: manual invoice reconciliation (~2 days/month). Champion: Head of Finance Ops. Next step: send ROI model by Friday.' }],
    stats: { views: 4120, installs: 860, favorites: 322, rating: 4.8, reviewCount: 96 }, updatedAt: daysAgo(2),
  }),
  base({
    id: 'SKL-0013', type: 'skill', displayName: 'Proposal Drafter', skillType: 'GENERATION', category: 'Sales & CRM', subCategory: 'Enablement', department: 'Sales', tags: ['proposal', 'rfp', 'sales'],
    shortDescription: 'Drafts a tailored customer proposal from the call notes and the sales playbook.',
    description: 'Builds a structured proposal: executive summary, understanding of the customer problem, proposed solution, plan, pricing options, risks and next steps — using approved messaging only.',
    status: 'DRAFT', semanticVersion: '0.4.0', accessibility: 'PRIVATE', capabilityIds: ['CAP-0006'], knowledgeIds: ['KNW-0007'], instructionIds: ['INS-0002'], policyIds: ['POL-0003'],
    promptTemplate: `Write a customer proposal using the discovery notes and the approved messaging in the sales playbook.

Customer: {{customer}}
Discovery notes: {{notes}}
Package selected: {{package}}

Sections: Executive summary (120 words) · Your challenge · Our understanding · Proposed solution · Implementation plan (phases and timeline) · Investment (three options) · Why us · Risks and how we manage them · Next steps.

Use only claims found in the playbook. Do not promise discounts or contractual terms; mark any pricing exceptions as "Subject to approval".`,
    stats: { views: 55, installs: 0, favorites: 3, rating: 0, reviewCount: 0 }, updatedAt: daysAgo(1),
  }),
  base({
    id: 'SKL-0014', type: 'skill', displayName: 'Test Case Generator', skillType: 'GENERATION', category: 'IT & Engineering', subCategory: 'Quality Engineering', department: 'Engineering', tags: ['testing', 'qa', 'acceptance'],
    shortDescription: 'Creates positive, negative and boundary test cases from functional requirements.',
    description: 'For each functional requirement it generates test cases with preconditions, steps, expected results, test data and traceability. Covers equivalence classes, boundary values and negative paths.',
    status: 'PUBLISHED', semanticVersion: '1.1.0', accessibility: 'TEAM', capabilityIds: ['CAP-0001', 'CAP-0003'], knowledgeIds: ['KNW-0008'], instructionIds: ['INS-0001', 'INS-0002'], policyIds: ['POL-0001'],
    promptTemplate: `You are a senior QA engineer. Generate test cases for the requirements below.

<requirements>
{{requirements}}
</requirements>

For every requirement produce at least: 2 positive cases, 3 negative cases, 2 boundary cases and 1 non-functional case when relevant.

Format each case as:
**TC-<FR id>-<n>** | Type | Priority (P0–P2)
Preconditions · Steps (numbered) · Test data · Expected result · Traces to FR-###

End with a coverage table (FR → number of cases by type) and a list of requirements that are untestable as written, with the reason.`,
    stats: { views: 760, installs: 0, favorites: 41, rating: 4.5, reviewCount: 11 }, updatedAt: daysAgo(5),
  }),
  base({
    id: 'SKL-0015', type: 'skill', displayName: 'SQL Query Explainer', skillType: 'ANALYSIS', category: 'Data & Analytics', subCategory: 'Analytics Engineering', department: 'Data', tags: ['sql', 'analytics', 'explain'],
    shortDescription: 'Explains a SQL query in plain English and flags performance and correctness risks.',
    description: 'Walks through a query step by step, describes what each join and filter does, highlights risks such as accidental cross joins and missing indexes, and suggests a more readable rewrite.',
    status: 'DRAFT', semanticVersion: '0.2.0', accessibility: 'PRIVATE', capabilityIds: [], knowledgeIds: [], instructionIds: ['INS-0002'], policyIds: ['POL-0004'],
    promptTemplate: `Explain the SQL query below to a business analyst.

<sql>
{{sql}}
</sql>
Dialect: {{dialect}}

1. One-paragraph summary of what it returns.
2. Step-by-step walk-through in execution order (FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY).
3. Risks: cross joins, non-sargable filters, SELECT *, missing indexes, NULL handling, double counting.
4. Suggested rewrite with comments.`,
    stats: { views: 18, installs: 0, favorites: 1, rating: 0, reviewCount: 0 }, updatedAt: daysAgo(0),
  }),

  /* ── Knowledge ── */
  base({
    id: 'KNW-0006', type: 'knowledge', displayName: 'Enterprise Risk Framework', subType: 'ORGANIZATION', category: 'Operations', subCategory: 'Risk Management', tags: ['risk', 'framework', 'matrix'], capabilityIds: ['CAP-0005'],
    shortDescription: 'Risk categories, the 5×5 scoring matrix and the escalation thresholds.',
    content: `# Enterprise Risk Framework

## Risk categories
Strategic · Operational · Financial · Compliance · Technology & Security · Third-party · Reputational

## Likelihood scale
| Score | Label | Description |
|---|---|---|
| 1 | Rare | Less than once in 10 years |
| 2 | Unlikely | Once in 3–10 years |
| 3 | Possible | Once in 1–3 years |
| 4 | Likely | Several times a year |
| 5 | Almost certain | Monthly or more |

## Impact scale (financial / customer / regulatory)
| Score | Label | Financial | Customer | Regulatory |
|---|---|---|---|---|
| 1 | Minor | < $10k | No visible impact | None |
| 2 | Moderate | $10k–$100k | Isolated complaints | Internal finding |
| 3 | Significant | $100k–$1M | Widespread complaints | Reportable breach |
| 4 | Major | $1M–$10M | Loss of key accounts | Regulatory action |
| 5 | Severe | > $10M | Sustained brand damage | Licence at risk |

## Rating and escalation
- **Low (1–5):** manage locally, review quarterly.
- **Medium (6–11):** owner plus department head, monthly review.
- **High (12–19):** risk committee, mitigation plan within 30 days.
- **Critical (20–25):** executive team immediately, weekly review until reduced.

## Risk statement format
*If <cause>, then <event>, resulting in <impact>.* Always name an accountable owner and a review date.`,
    updatedAt: daysAgo(11),
  }),
  base({
    id: 'KNW-0007', type: 'knowledge', displayName: 'Sales Playbook & Ideal Customer Profile', subType: 'BUSINESS', category: 'Sales & CRM', subCategory: 'Enablement', tags: ['sales', 'playbook', 'icp'], capabilityIds: ['CAP-0006'], accessibility: 'TEAM',
    shortDescription: 'ICP definition, qualification questions, objection handling and approved messaging.',
    content: `# Sales Playbook

## Ideal customer profile
- **Industry:** financial services, insurance, logistics, healthcare providers
- **Size:** 200–5,000 employees; 20+ people in operations or service teams
- **Signals:** manual reconciliation, multiple disconnected systems, audit pressure, growth through acquisition
- **Buyers:** COO / Head of Operations (economic buyer), IT Director (technical), Compliance Officer (influencer)

## Qualification (MEDDICC)
1. **M**etrics — what number must move and by how much?
2. **E**conomic buyer — who signs?
3. **D**ecision criteria — what will they compare us on?
4. **D**ecision process — steps, dates, legal and security reviews
5. **I**dentified pain — in their own words
6. **C**hampion — who sells internally when we are not in the room?
7. **C**ompetition — incumbent, build-in-house, do nothing

## Approved messaging
- "We cut manual effort by 30–40% in the first two quarters."
- "Every AI suggestion is reviewed by a person and fully auditable."
- "Live in 8–12 weeks with your existing systems."

## Common objections
| Objection | Response |
|---|---|
| "We tried AI and it hallucinated." | Answers are grounded in your approved knowledge with citations; low-confidence cases go to a person. |
| "Security will never approve this." | We run in a private tenant, encrypt data, support SSO and provide a full audit log; share the security pack early. |
| "No budget this year." | Start with one workflow pilot funded from operating budget; payback model attached. |

## Discounting
Sales may not commit discounts above 10%. Anything higher is "Subject to approval" by the Deal Desk.`,
    updatedAt: daysAgo(6),
  }),
  base({
    id: 'KNW-0008', type: 'knowledge', displayName: 'Testing Strategy & Coverage Rules', subType: 'TECHNICAL', category: 'IT & Engineering', subCategory: 'Quality Engineering', tags: ['testing', 'qa', 'strategy'], capabilityIds: ['CAP-0001', 'CAP-0003'],
    shortDescription: 'Test pyramid, coverage targets, environments and defect severity definitions.',
    content: `# Testing Strategy

## Test pyramid
- **Unit (70%)** — fast, isolated, run on every commit. Target ≥ 80% branch coverage on business logic.
- **Integration (20%)** — services with real databases and queues in containers.
- **End-to-end (10%)** — critical user journeys only; run nightly and before release.

## Techniques
Equivalence partitioning · Boundary value analysis · Decision tables · State transition testing · Pairwise testing for configuration matrices · Exploratory sessions timeboxed to 60 minutes.

## Environments
| Environment | Data | Purpose |
|---|---|---|
| Dev | Synthetic | Developer testing |
| Staging | Anonymised copy | Release candidates, performance tests |
| Production | Real | Smoke tests and monitoring only |

## Defect severity
| Severity | Definition | Fix SLA |
|---|---|---|
| S1 | Outage, data loss, security breach | 4 hours |
| S2 | Major feature broken, no workaround | 2 days |
| S3 | Feature impaired, workaround exists | Next sprint |
| S4 | Cosmetic | Backlog |

## Exit criteria for release
No open S1/S2, all P0 test cases passing, performance within budget, security scan clean, accessibility checks passed.`,
    updatedAt: daysAgo(8),
  }),

  /* ── Instructions ── */
  base({
    id: 'INS-0005', type: 'instruction', displayName: 'Executive Summary Format', subType: 'FORMATTING', category: 'General Utilities', tags: ['summary', 'executive'], capabilityIds: ['CAP-0005'],
    shortDescription: 'Lead with the answer; 120 words; three bullets for decisions, risks and next steps.',
    content: `## Executive Summary Format

1. **Headline (1 sentence)** — the conclusion or recommendation, not the topic.
2. **Context (2 sentences)** — why this matters now.
3. **Key points (3 bullets)** — each starts with a bold verb phrase and includes one number.
4. **Decision required** — what you need from the reader and by when.
5. **Risks (max 2 bullets)** — with likelihood and impact.

Total length: **120 words or fewer**. No acronyms unless defined, no adjectives that cannot be measured.`,
    updatedAt: daysAgo(15),
  }),
  base({
    id: 'INS-0006', type: 'instruction', displayName: 'Citation and Source Rules', subType: 'QUALITY', category: 'General Utilities', tags: ['citations', 'sources'], capabilityIds: [],
    shortDescription: 'Every factual claim carries a numbered citation to a provided source.',
    content: `## Citation and Source Rules

- Cite every factual claim with a bracketed number, e.g. **[2]**, that refers to the **Sources** list at the end.
- Only cite sources that were provided or retrieved in this conversation.
- Quote exactly when wording matters; otherwise paraphrase and cite.
- If two sources disagree, present both and say which you consider more reliable and why.
- If you cannot support a claim, say "I could not find a source for this" rather than omitting the caveat.
- Sources list format: **[n] Title — Publisher/Author, date, URL or document ID**.`,
    updatedAt: daysAgo(21),
  }),

  /* ── Policies ── */
  base({
    id: 'POL-0005', type: 'policy', displayName: 'Regulated Advice Disclaimer', subType: 'LEGAL', enforcementMode: 'MANDATORY', category: 'Operations', tags: ['legal', 'disclaimer'], capabilityIds: ['CAP-0005'],
    shortDescription: 'Never present output as legal, tax, medical or investment advice.',
    content: `## Policy: Regulated Advice Disclaimer

**Enforcement:** Mandatory · **Severity:** High

Assistants provide general information and drafting support only. They must not present output as **legal, tax, medical or investment advice**.

**Required behaviour**
1. When a request touches a regulated domain, include this sentence: *"This is general information, not professional advice. Please consult a qualified professional before acting."*
2. Do not state that a document "is compliant" or "is legal"; state that it "appears consistent with the cited policy" and name the reviewer who must confirm.
3. Escalate contract, litigation and regulatory-reporting questions to Legal or Compliance.`,
    updatedAt: daysAgo(13),
  }),
  base({
    id: 'POL-0006', type: 'policy', displayName: 'Source Attribution Required', subType: 'QUALITY', enforcementMode: 'RECOMMENDED', category: 'General Utilities', tags: ['quality', 'sources'], capabilityIds: [],
    shortDescription: 'Answers based on internal knowledge must name the source document and version.',
    content: `## Policy: Source Attribution Required

**Enforcement:** Recommended · **Severity:** Low

When an answer relies on internal knowledge, name the **document title and version** it came from. If the document is older than 12 months, add a note that it may be out of date. If no internal source supports the answer, say so before offering general guidance.`,
    updatedAt: daysAgo(25),
  }),
];
