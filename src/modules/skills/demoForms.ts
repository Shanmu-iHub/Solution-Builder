import { AssetType, SkillExample } from './types';

export interface DemoForm {
  displayName: string;
  tags: string[];
  shortDescription: string;
  description: string;
  category: string;
  subCategory: string;
  department: string;
  subType: string;
  promptTemplate: string;
  content: string;
  enforcement: 'OPTIONAL' | 'RECOMMENDED' | 'MANDATORY';
  examples: SkillExample[];
  folderIds: string[];
  knowledgeIds: string[];
  instructionIds: string[];
  policyIds: string[];
  skillIds: string[];
  visibility: 'Private' | 'Team' | 'Marketplace';
  teamId: string;
}

const none = { promptTemplate: '', content: '', enforcement: 'MANDATORY' as const, examples: [], folderIds: [], knowledgeIds: [], instructionIds: [], policyIds: [], skillIds: [] };

/** Pre-filled wizard data for every asset type, so a demo can click straight through. */
export const DEMOS: Record<AssetType, DemoForm> = {
  skill: {
    ...none,
    displayName: 'Customer Complaint Analyzer',
    tags: ['complaints', 'support', 'analysis', 'sentiment'],
    shortDescription: 'Analyses a customer complaint and returns root cause, severity, sentiment and a recommended resolution path.',
    description:
      'Reads a customer complaint (email, chat or call transcript) and produces a structured analysis for the support lead: what went wrong, how severe it is, how the customer feels, which policy applies and what the best next action is. It follows the empathetic support tone, redacts personal data and never promises refunds or legal outcomes.',
    category: 'Customer Support',
    subCategory: 'Quality Assurance',
    department: 'Support',
    subType: 'ANALYSIS',
    promptTemplate: `# ROLE
You are a customer experience analyst. You read complaints carefully and give the support lead a clear, fair and actionable assessment.

# INPUT
<complaint>
{{complaint}}
</complaint>
Customer tier: {{tier}}    Channel: {{channel}}    Previous contacts (30 days): {{previous_contacts}}

# TASK
1. **Summary** — one sentence describing what happened.
2. **Root cause** — the most likely underlying cause: product defect, process failure, communication gap, billing error or expectation mismatch. State your confidence (High / Medium / Low).
3. **Severity** — Critical / High / Medium / Low with a one-line justification (money, data, safety, repeat contact, public escalation risk).
4. **Sentiment** — very negative / negative / neutral / positive, plus the single emotion that best describes the customer.
5. **Applicable policy** — name the policy from the knowledge base that applies, or "None found".
6. **Recommended resolution path** — three steps with owner and target time.
7. **Draft reply** — 4–6 sentences following the empathetic support tone.
8. **Learning for the team** — one sentence on how to prevent this complaint category.

# RULES
- Redact personal data as [REDACTED].
- Do not promise refunds, credits or legal outcomes — recommend escalation to an authorised person instead.
- If the complaint lacks the facts needed to judge root cause, say what to ask the customer.`,
    examples: [
      { title: 'Double billing complaint', input: 'I was charged twice for my annual plan and nobody has replied to my two emails. This is unacceptable!', output: 'Severity: High · Sentiment: very negative (frustrated) · Root cause: billing error + missed follow-up (High confidence) · Path: 1) Billing verifies duplicate charge today 2) Finance reverses within 2 business days 3) Support confirms by email.' },
      { title: 'Feature expectation gap', input: 'Your app says it supports bulk export but I can only export 100 rows. Misleading.', output: 'Severity: Medium · Sentiment: negative · Root cause: expectation mismatch (documentation unclear) · Path: share the 5,000-row workaround and raise a docs fix.' },
    ],
    folderIds: ['CAP-0002'],
    knowledgeIds: ['KNW-0003'],
    instructionIds: ['INS-0003', 'INS-0002'],
    policyIds: ['POL-0002', 'POL-0003'],
    visibility: 'Team',
    teamId: 'team-product',
  },
  knowledge: {
    ...none,
    displayName: 'Customer Refund & Credit Policy Handbook',
    tags: ['refunds', 'credits', 'policy', 'support'],
    shortDescription: 'Eligibility rules, limits and approval levels for refunds and service credits.',
    description: 'The single reference for when a customer is eligible for a refund or credit, how much, who must approve it and how it is recorded. Support skills use it to explain outcomes accurately and to know when to escalate.',
    category: 'Customer Support',
    subCategory: 'Policies',
    department: 'Support',
    subType: 'ORGANIZATION',
    content: `# Customer Refund & Credit Policy Handbook

## 1. Principles
- Customers are treated fairly and consistently.
- Frontline staff may resolve small issues immediately; larger amounts need approval.
- Every refund or credit is recorded with a reason code.

## 2. Refund eligibility
| Situation | Eligible? | Window |
|---|---|---|
| Duplicate or incorrect charge | Yes — full refund | Any time |
| Cancellation within 14 days of purchase | Yes — full refund | 14 days |
| Annual plan cancelled after 14 days | Pro-rata, minus 10% admin fee | 60 days |
| Service outage > 4 hours | Service credit | 30 days |
| Change of mind on monthly plan | No refund; cancel effective end of period | — |

## 3. Approval limits
| Amount | Approver |
|---|---|
| Up to $50 | Support agent |
| $50 – $500 | Team lead |
| $500 – $5,000 | Support manager |
| Above $5,000 | Finance director |

## 4. Reason codes
DUP (duplicate charge) · ERR (billing error) · CAN (cancellation) · SLA (service level breach) · GW (goodwill)

## 5. Recording
Log the case ID, amount, reason code, approver and customer communication in the finance system within one business day.`,
    visibility: 'Team',
    teamId: 'team-product',
  },
  instruction: {
    ...none,
    displayName: 'Plain-Language Writing Guide',
    tags: ['tone', 'clarity', 'writing'],
    shortDescription: 'Rules for writing short, clear, jargon-free customer communication.',
    description: 'Gives the assistant a consistent writing style for customer-facing text: short sentences, active voice, everyday words and a clear call to action.',
    category: 'General Utilities',
    subCategory: 'Writing',
    department: 'Support',
    subType: 'FORMATTING',
    content: `## Plain-Language Writing Guide

1. **Lead with what the reader needs.** First sentence = the answer or the action.
2. **Short sentences.** Aim for 15–20 words; never more than 30.
3. **Active voice.** "We reversed the charge" — not "The charge has been reversed."
4. **Everyday words.** Use "use" instead of "utilise", "help" instead of "facilitate".
5. **One idea per paragraph**, no more than four lines.
6. **Numbers and dates are explicit.** "by Friday 10 October" — not "soon".
7. **End with one clear next step.**
8. **Avoid** internal jargon, acronyms without explanation, double negatives and exclamation marks in complaints.

**Checklist before sending**
- Would my grandparent understand this?
- Is the next step obvious?
- Did I name the person or team who will act?`,
    visibility: 'Private',
    teamId: '',
  },
  policy: {
    ...none,
    displayName: 'Customer Data Retention Policy',
    tags: ['privacy', 'retention', 'gdpr'],
    shortDescription: 'How long customer data may be stored and when it must be deleted.',
    description: 'Defines retention periods per data category and the required deletion behaviour. The assistant must not store, summarise or reuse data beyond these limits.',
    category: 'Operations',
    subCategory: 'Data Governance',
    department: 'Compliance',
    subType: 'PRIVACY',
    enforcement: 'MANDATORY',
    content: `## Policy: Customer Data Retention

**Enforcement:** Mandatory · **Severity:** High · **Basis:** GDPR Art. 5(1)(e), internal retention schedule v6

| Data category | Retention | After expiry |
|---|---|---|
| Support conversations | 24 months | Anonymise |
| Billing records | 7 years | Delete |
| Marketing consent evidence | Life of relationship + 3 years | Delete |
| Call recordings | 12 months | Delete |
| Authentication logs | 13 months | Delete |

**Required behaviour**
1. Never retain conversation content beyond the period for its category.
2. Honour deletion requests within 30 days and confirm completion to the customer.
3. Do not copy customer data into prompts, examples or training material.
4. When unsure which category applies, choose the shorter retention period and ask a human.`,
    visibility: 'Team',
    teamId: 'team-data',
  },
  capability: {
    ...none,
    displayName: 'Customer Success Toolkit',
    tags: ['customer-success', 'retention', 'onboarding'],
    shortDescription: 'Everything the customer success team uses to onboard, retain and grow accounts.',
    description: 'A folder that groups the skills, knowledge, instructions and policies used by customer success managers: complaint analysis, reply drafting, renewal preparation and health-score explanations.',
    category: 'Customer Support',
    subCategory: 'Customer Success',
    department: 'Customer Success',
    subType: '',
    skillIds: ['SKL-0003', 'SKL-0008', 'SKL-0012'],
    visibility: 'Team',
    teamId: 'team-product',
  },
};
