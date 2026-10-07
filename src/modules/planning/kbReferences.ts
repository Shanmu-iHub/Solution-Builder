import { DomainKey } from './archModel';
import { DOC_DEFS } from './content';

/**
 * Static, hardcoded "knowledge base" data for the prototype: for each project domain, the related
 * delivered projects and the facts that would be drawn from their documentation. Nothing here is
 * read from a real store.
 */
interface Related { name: string; version: string; similarity: number; summary: string; facts: string[] }

const RELATED: Record<DomainKey, Related[]> = {
  support: [
    { name: 'Service Desk Copilot', version: 'v3', similarity: 94, summary: 'AI drafting and knowledge retrieval for a service desk.', facts: ['Grounded replies with citations and an approval step', 'Hybrid keyword + vector retrieval over approved articles', 'Case timeline with SLA timers and smart routing', 'PII redaction before any model call'] },
    { name: 'Telecom Care Portal', version: 'v2', similarity: 88, summary: 'Omnichannel care portal for a regional telecom.', facts: ['Email, chat and web form feed one case queue', 'Intent classifier routes to 12 queues', 'CRM read-only enrichment with a 15-minute cache', 'Immutable audit log for every agent action'] },
    { name: 'Helpdesk Knowledge Hub', version: 'v2', similarity: 79, summary: 'Owned and versioned knowledge for support teams.', facts: ['Article ownership and versioning workflow', 'Freshness indicator when a policy changes', 'Search analytics for top unanswered questions', 'Approval required before an article is published'] },
  ],
  claims: [
    { name: 'Motor Claims Intake', version: 'v3', similarity: 93, summary: 'Online first notice of loss for motor insurance.', facts: ['Guided first notice of loss with photo capture', 'Severity bands decide fast-track or adjuster', 'Coverage check against the policy admin system', 'Payment limits by adjuster role'] },
    { name: 'Property Claims Triage', version: 'v2', similarity: 86, summary: 'Fraud and severity triage for property claims.', facts: ['Fraud-risk score on submission with an analyst queue', 'OCR extraction of invoices and police reports', 'Event bus for ClaimSubmitted and ClaimTriaged', 'Claimant status tracker with expected timeline'] },
    { name: 'Settlement Workbench', version: 'v2', similarity: 77, summary: 'Adjuster workspace for settlement and payment.', facts: ['Single case file: policy, documents and messages', 'Two-step approval above payment limits', 'Reconciliation export to finance', 'Audit trail kept for seven years'] },
  ],
  renewal: [
    { name: 'Broker Renewal Hub', version: 'v3', similarity: 92, summary: 'Renewal pipeline and quoting for brokers.', facts: ['Nightly at-risk policy scoring from claims and payment history', '60 / 30 / 7-day renewal reminder cadence', 'Quote comparison across carrier rating APIs', 'Broker portal with side-by-side premium view'] },
    { name: 'Commercial Policy Advisor', version: 'v2', similarity: 85, summary: 'Cover recommendations for commercial accounts.', facts: ['Recommendation engine for cover adjustments', 'Policy admin sync every 15 minutes', 'Explainable score shown to underwriters', 'Cached carrier quotes to cut API cost'] },
    { name: 'Policy Lapse Predictor', version: 'v1', similarity: 76, summary: 'Churn prediction for insurance policies.', facts: ['Churn model retrained monthly on warehouse features', 'Outreach list prioritised by premium at risk', 'Email and SMS templates per segment', 'Model monitoring with drift alerts'] },
  ],
  lending: [
    { name: 'Mortgage Origination Suite', version: 'v4', similarity: 95, summary: 'Digital mortgage application, scoring and approval.', facts: ['Rules-based decision workflow with bureau and KYC adapters', 'Encrypted document store with e-signature', 'Credit score returned in under 3 seconds (p95)', 'Immutable audit log for every decision'] },
    { name: 'Personal Loan Express', version: 'v3', similarity: 88, summary: 'Instant pre-approval and disbursement for personal loans.', facts: ['Instant pre-approval from a soft credit pull', 'Disbursement to core banking via an idempotent API', 'Affordability check using open-banking data', 'Underwriter queue for referred applications'] },
    { name: 'SME Credit Portal', version: 'v2', similarity: 79, summary: 'Business lending portal with approval limits.', facts: ['Document checklist per applicant type', 'Four-eyes approval above credit limits', 'Regulatory reporting export (CSV and PDF)', 'KYC re-verification on a schedule'] },
  ],
  fleet: [
    { name: 'Vehicle Telemetry Pipeline', version: 'v2', similarity: 94, summary: 'Streaming ingest and alerting for vehicle data.', facts: ['MQTT ingest into time-series storage', 'Hot / warm / cold retention tiers', 'Live positions cached in Redis with a 2 s refresh', 'Alert rules for harsh braking and speeding'] },
    { name: 'Driver Safety Scoring', version: 'v3', similarity: 87, summary: 'Driver behaviour scoring and coaching.', facts: ['Weekly score from braking, cornering and speed events', 'Coaching tips sent to the driver app', 'Fleet-wide leaderboard for managers', 'Scores recomputed incrementally, not in batch'] },
    { name: 'Predictive Maintenance Service', version: 'v2', similarity: 80, summary: 'Service-date forecasting for fleet vehicles.', facts: ['Forecast service dates from mileage and fault codes', 'Work orders created in the ERP', 'Downtime cut by 18% in the pilot', 'Model inputs stored for audit'] },
  ],
  retail: [
    { name: 'Retail Inventory Optimizer', version: 'v3', similarity: 93, summary: 'Demand forecasting and replenishment for stores.', facts: ['Nightly demand forecast per store and SKU', 'Warehouse star schema fed by batch and stream ingest', 'Low-stock alerts to category managers', 'Forecast accuracy tracked weekly'] },
    { name: 'Store Sales Analytics', version: 'v2', similarity: 86, summary: 'Sales dashboards for a store chain.', facts: ['POS feed ingested every 15 minutes', 'Dashboards cached for the morning peak', 'Promotion uplift analysis', 'Row-level access by region'] },
    { name: 'Customer Loyalty Platform', version: 'v3', similarity: 74, summary: 'Points, tiers and partner rewards.', facts: ['Immutable points ledger with idempotent writes', 'Scheduled liability and regulatory reports', 'Partner offer feed with approval', 'Consent and preference manager'] },
  ],
  hr: [
    { name: 'HR Onboarding Assistant', version: 'v2', similarity: 93, summary: 'Conversational onboarding across 12 countries.', facts: ['Retrieval-grounded assistant over HR policy', 'Task checklist per country and role', 'Human hand-off for sensitive questions', 'HRIS sync of the employee record'] },
    { name: 'Employee Self-Service Portal', version: 'v3', similarity: 84, summary: 'Paperwork, equipment and training in one portal.', facts: ['e-Signature for contracts and policies', 'Equipment requests raised as IT tickets', 'Training assigned automatically in the LMS', 'Progress dashboard for HR'] },
    { name: 'New Joiner Journey', version: 'v1', similarity: 76, summary: 'First-week plan and check-ins for new hires.', facts: ['First-week plan generated from the role', 'Buddy matching and reminders', 'Pulse survey at day 7 and day 30', 'Document expiry reminders'] },
  ],
  healthcare: [
    { name: 'Patient Intake Bot', version: 'v2', similarity: 94, summary: 'Conversational patient intake feeding the EHR.', facts: ['Consent captured before any data is stored', 'Field-level encryption for health data', 'FHIR write-back to the EHR', 'Assistant limited to intake questions'] },
    { name: 'Clinic Scheduling Service', version: 'v3', similarity: 85, summary: 'Appointment scheduling and reminders for clinics.', facts: ['Slot availability read from the EHR', 'SMS reminders with one-tap confirm', 'No-show rate tracked per clinic', 'Audit log of every record access'] },
    { name: 'Referral Management Portal', version: 'v2', similarity: 77, summary: 'Referral tracking between GPs and specialists.', facts: ['Referral status tracker for GPs', 'Secure document exchange', 'Role-based access for clinicians', 'Data-retention rules by record type'] },
  ],
  generic: [
    { name: 'Vendor Risk Scoring', version: 'v1', similarity: 82, summary: 'Third-party risk assessment and scoring.', facts: ['Explainable scoring service behind a versioned API', 'Workflow with approval steps and SLA timers', 'Dashboard of open assessments', 'Role-based access with audit logging'] },
    { name: 'Contract Review Copilot', version: 'v1', similarity: 76, summary: 'LLM-assisted clause review for legal teams.', facts: ['Chunked document retrieval with reviewer sign-off', 'Provider-agnostic LLM gateway', 'Evidence links back to source clauses', 'Usage-based AI cost controls'] },
    { name: 'Internal Request Portal', version: 'v2', similarity: 71, summary: 'Request intake and tracking for internal teams.', facts: ['Modular monolith with background workers', 'Email and SMS notifications with retries', 'Reporting service fed by events', 'SSO via an OIDC identity provider'] },
  ],
};

export interface KbSource { id: string; project: string; document: string; version: string; similarity: number; summary: string; facts: string[] }

/** The related projects for a domain, each with the document of the requested kind and the facts taken from it. */
export const findRelatedProjects = (domain: DomainKey, abbr: string): KbSource[] => {
  const idx = Math.max(0, DOC_DEFS.findIndex(d => d.abbr === abbr));
  const document = DOC_DEFS[idx]?.title ?? abbr;
  return RELATED[domain].map(r => {
    const start = (idx + RELATED[domain].indexOf(r)) % 2;
    return { id: `${domain}-${r.name}`, project: r.name, document, version: r.version, similarity: r.similarity, summary: r.summary, facts: r.facts.slice(start, start + 3) };
  });
};

/** Every fact of a related project, for the detail view. */
export const allFacts = (domain: DomainKey, project: string): string[] => RELATED[domain].find(r => r.name === project)?.facts ?? [];
