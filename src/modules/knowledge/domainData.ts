export interface DomainEntity { id: string; label: string; text: string }
export type DomainPack = Record<string, DomainEntity[]>;

const e = (id: string, label: string, text: string): DomainEntity => ({ id, label, text });

/** Customer Loyalty Platform — the fully curated demo project. */
export const loyalty: DomainPack = {
  BusinessRequirement: [
    e('BR-001', 'Single sign-on for staff and partners', 'Staff and partner managers must sign in once with corporate credentials (SSO) and reach every loyalty tool without a second login. Password reset and multi-factor authentication are handled by the identity provider.'),
    e('BR-002', 'Real-time points balance visibility', 'Customers must see their current points balance, tier and recent activity within two seconds of any transaction, in the mobile app and on the web portal.'),
    e('BR-003', 'Audit trail for every points adjustment', 'Every manual or automated change to a customer points balance must be recorded with who, when, why and the before/after values, and kept for seven years for regulatory review.'),
    e('BR-004', 'Tier progression and expiry rules', 'Customers move between Silver, Gold and Platinum tiers based on rolling 12-month spend; tier benefits and points expiry must be configurable without code changes.'),
    e('BR-005', 'Partner rewards catalogue management', 'Partner managers must be able to publish, price and retire reward offers, with approval before anything becomes visible to customers.'),
    e('BR-006', 'Fraud detection on redemptions', 'Suspicious redemption patterns (velocity, geography, device) must be flagged or blocked automatically, with an analyst queue for review.'),
    e('BR-007', 'Regulatory reporting export', 'Finance and compliance must be able to export monthly points liability, redemption and expiry reports in CSV and PDF for regulators.'),
    e('BR-008', 'Customer consent and data privacy', 'Customer marketing consent must be captured, stored and honoured in every channel, with a self-service preference centre and data-deletion requests completed within 30 days.'),
    e('BR-009', 'Multi-currency and multi-region support', 'Points earn and burn rates must be configurable per country and currency, with correct rounding and tax handling for each region.'),
    e('BR-010', 'Notifications for balance, tier and expiry events', 'Customers must receive timely email, SMS and push notifications when points are earned, tiers change or points are about to expire.'),
    e('BR-011', 'Self-service password reset', 'Customers who forget their password must be able to reset it by email or SMS without contacting support; reset links expire after 30 minutes.'),
    e('BR-012', 'Support agent console with customer 360', 'Support agents need a single view of a customer: profile, points history, redemptions and open cases, with permissioned actions such as goodwill adjustments.'),
    e('BR-013', 'Bulk import of historical transactions', 'During migration, operations must be able to import historical transactions in bulk with validation, error reports and the ability to re-run safely.'),
    e('BR-014', 'Service availability and performance', 'The platform must be available 99.9% monthly and keep p95 API latency below 300 ms during peak campaign traffic.'),
  ],
  Goal: [
    e('GO-01', 'Increase repeat purchase rate by 15%', 'Lift the share of customers who make a second purchase within 90 days from 38% to 53% through better rewards and timely nudges.'),
    e('GO-02', 'Cut manual rewards operations effort by 40%', 'Automate catalogue publishing, adjustments and reporting so operations spends 40% less time on routine tasks.'),
    e('GO-03', 'Reach 60% active loyalty members', 'Grow the proportion of customers who earned or redeemed in the last 90 days from 41% to 60%.'),
    e('GO-04', 'Achieve audit readiness with zero findings', 'Pass the annual financial and privacy audit without material findings on points liability or consent handling.'),
    e('GO-05', 'Launch five new partner offers per quarter', 'Make partner onboarding fast enough to publish five new, approved offers every quarter.'),
  ],
  Feature: [
    e('FT-01', 'Rewards catalogue', 'Browse, search and filter rewards by category, points cost and partner, with availability and expiry shown on each offer.'),
    e('FT-02', 'Tier progression engine', 'Calculates rolling spend, assigns tiers, applies benefits and sends tier-change notifications.'),
    e('FT-03', 'Points ledger', 'Immutable double-entry ledger of every earn, burn, expiry and adjustment event with running balances.'),
    e('FT-04', 'Partner offer feed', 'Ingests partner offers via API or admin console, with approval workflow, scheduling and pricing rules.'),
    e('FT-05', 'Notification centre', 'Preference-aware email, SMS and push messages triggered by loyalty events with templates and throttling.'),
    e('FT-06', 'Admin and agent console', 'Role-based console for operations, partner managers and support agents with audit logging.'),
    e('FT-07', 'Consent and preference manager', 'Captures marketing consent, channel preferences and data requests, and exposes them to every service.'),
    e('FT-08', 'Analytics and liability reporting', 'Dashboards and scheduled exports for points liability, redemption rates, cohort retention and partner performance.'),
  ],
  Epic: [
    e('EP-01', 'Catalogue browsing and search', 'Everything customers need to discover and understand rewards.'),
    e('EP-02', 'Points earning and burning', 'Rules, ledger and balance computation for earn and burn events.'),
    e('EP-03', 'Redemption and fulfilment', 'Checkout of rewards, partner fulfilment and failure handling.'),
    e('EP-04', 'Role management and access', 'SSO, roles, permissions and audit of privileged actions.'),
    e('EP-05', 'Reporting and compliance', 'Regulatory exports, liability reports and consent evidence.'),
    e('EP-06', 'Customer communications', 'Notifications, templates and preference handling.'),
    e('EP-07', 'Fraud and risk controls', 'Detection rules, scoring and analyst review.'),
    e('EP-08', 'Migration and data import', 'Bulk import, reconciliation and cut-over tooling.'),
  ],
  FunctionalRequirement: [
    e('FR-001', 'Authenticate user with SSO', 'The system shall authenticate staff through the corporate OIDC provider, create a session of at most 8 hours, and refuse access when the identity provider reports the account as disabled. Acceptance: valid credentials reach the dashboard; disabled accounts see an access-denied page.'),
    e('FR-002', 'Reset password by email or SMS', 'The system shall let a customer request a password reset link by email or SMS; the link shall expire after 30 minutes and be single-use. Acceptance: expired or reused links show a clear error.'),
    e('FR-003', 'Record an earn event in the ledger', 'The system shall record every earn event as an immutable ledger entry with amount, source, timestamp and idempotency key, and update the cached balance within two seconds.'),
    e('FR-004', 'Calculate customer tier', 'The system shall recalculate a customer tier nightly using rolling 12-month qualifying spend and apply tier benefits from configuration; downgrades occur only at month end.'),
    e('FR-005', 'Redeem a reward', 'The system shall allow a customer with sufficient points to redeem a reward, deduct points atomically, reserve partner stock and send a confirmation. Acceptance: insufficient points block the redemption with a helpful message.'),
    e('FR-006', 'Export monthly statement', 'The system shall generate a downloadable monthly statement (PDF and CSV) listing earn, burn and expiry events with opening and closing balances.'),
    e('FR-007', 'Send points-expiry alert', 'The system shall notify customers 30 and 7 days before points expire, honouring channel preferences and quiet hours.'),
    e('FR-008', 'Approve manual points adjustment', 'The system shall require a second approver for any manual adjustment above 5,000 points and record both identities in the audit log.'),
    e('FR-009', 'Search the rewards catalogue', 'The system shall return catalogue results within 400 ms for keyword, category and points-range filters, ranked by relevance and availability.'),
    e('FR-010', 'Block a suspicious redemption', 'The system shall score each redemption for fraud risk and automatically hold those above the configured threshold for analyst review.'),
    e('FR-011', 'Synchronise partner offers', 'The system shall import partner offers every 15 minutes, upsert changes, retire expired offers and report failures to the partner manager.'),
    e('FR-012', 'Show audit history for a customer', 'The system shall show agents a chronological audit history for a customer, including adjustments, redemptions, consent changes and who performed them.'),
    e('FR-013', 'Capture and honour marketing consent', 'The system shall record consent per channel with timestamp and source, and suppress any marketing message when consent is withdrawn.'),
    e('FR-014', 'Import historical transactions in bulk', 'The system shall accept CSV imports of up to 500,000 rows, validate each row, report errors per line and allow a safe re-run without duplicating entries.'),
  ],
  Stakeholder: [
    e('SH-01', 'Head of Retail', 'Executive sponsor accountable for loyalty performance and customer growth targets.'),
    e('SH-02', 'Compliance Officer', 'Owns regulatory reporting, audit evidence and data-privacy obligations.'),
    e('SH-03', 'Product Owner', 'Prioritises the backlog and accepts delivered features.'),
    e('SH-04', 'CX Lead', 'Responsible for customer experience, satisfaction and communications quality.'),
    e('SH-05', 'Fraud Analyst', 'Reviews flagged redemptions and tunes detection rules.'),
    e('SH-06', 'Partner Manager', 'Manages partner relationships, offers and fulfilment performance.'),
  ],
  Component: [
    e('CMP-01', 'API Gateway', 'Authenticates requests, applies rate limits and routes traffic to services.'),
    e('CMP-02', 'Points Service', 'Owns the ledger, balances, earn/burn rules and tier calculation.'),
    e('CMP-03', 'Offers Service', 'Catalogue, partner offers, pricing and approval workflow.'),
    e('CMP-04', 'Identity Provider', 'Corporate OIDC single sign-on, MFA and password recovery.'),
    e('CMP-05', 'Notification Worker', 'Consumes events and delivers email, SMS and push messages with retries.'),
    e('CMP-06', 'Reporting Store', 'Columnar store and scheduled jobs for liability and regulatory reports.'),
    e('CMP-07', 'Fraud Engine', 'Rules and model scoring for redemption risk with an analyst queue.'),
    e('CMP-08', 'Consent Service', 'System of record for marketing consent and data requests.'),
  ],
};

/** Claims Automation Portal. */
export const claims: DomainPack = {
  BusinessRequirement: [
    e('BR-001', 'Online first notice of loss', 'Policyholders must be able to report a claim online in under ten minutes with photos, location and a guided questionnaire.'),
    e('BR-002', 'Automated claim triage', 'Incoming claims must be classified by severity and fraud risk so simple claims are fast-tracked and complex ones go to adjusters.'),
    e('BR-003', 'Claim status transparency', 'Claimants must see the current status, next step and expected timeline for every claim at all times.'),
    e('BR-004', 'Adjuster workbench', 'Adjusters need one workspace with the claim file, policy coverage check, documents and communication history.'),
    e('BR-005', 'Payment authorisation limits', 'Payments above role-based limits require additional approval and must be recorded for audit.'),
    e('BR-006', 'Document intake and OCR', 'Uploaded invoices, police reports and estimates must be read automatically and attached to the claim.'),
  ],
  Goal: [e('GO-01', 'Cut average settlement time to 5 days', 'Reduce settlement time for simple claims from 14 days to 5 days.'), e('GO-02', 'Reduce claims leakage by 8%', 'Detect overpayment and fraud earlier to reduce leakage.'), e('GO-03', 'Raise claimant NPS above 55', 'Improve satisfaction through transparency and speed.')],
  Feature: [e('FT-01', 'Guided claim intake', 'Step-by-step form with photo capture and location.'), e('FT-02', 'Triage engine', 'Scores severity and fraud risk on submission.'), e('FT-03', 'Claim tracker', 'Live status timeline for claimants.'), e('FT-04', 'Adjuster workbench', 'Unified case view with coverage and documents.'), e('FT-05', 'Document intelligence', 'OCR and extraction for supporting documents.')],
  Epic: [e('EP-01', 'Claim intake', 'Everything to report and submit a claim.'), e('EP-02', 'Triage and routing', 'Classification and assignment.'), e('EP-03', 'Settlement and payment', 'Approvals, payment and reconciliation.')],
  FunctionalRequirement: [e('FR-001', 'Submit a first notice of loss', 'The system shall let a policyholder submit a claim with incident details, up to 10 photos and a location, and return a claim reference.'), e('FR-002', 'Score claim severity', 'The system shall assign a severity band (low, medium, high) on submission using policy and incident data.'), e('FR-003', 'Check policy coverage', 'The system shall verify that the policy was active and covers the reported peril on the date of loss.'), e('FR-004', 'Extract invoice data', 'The system shall extract vendor, amount and date from uploaded invoices with a confidence score.'), e('FR-005', 'Authorise a payment', 'The system shall require approval for payments above the adjuster limit and record the approver.')],
  Stakeholder: [e('SH-01', 'Claims Director', 'Accountable for settlement speed and cost.'), e('SH-02', 'Fraud Investigator', 'Reviews high-risk claims.'), e('SH-03', 'Policyholder Representative', 'Voice of the claimant.')],
  Component: [e('CMP-01', 'Claims API', 'Core claim lifecycle service.'), e('CMP-02', 'Triage Service', 'Scoring and routing.'), e('CMP-03', 'Document Service', 'Storage and OCR.'), e('CMP-04', 'Payments Adapter', 'Integration with the finance system.')],
};

export const domainFor = (projectId: string): DomainPack => (projectId === 'prj-claims' ? claims : loyalty);
