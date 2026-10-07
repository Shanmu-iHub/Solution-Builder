import React from 'react';
import { DiscoveryDashboard, FeatureCardData } from './DiscoveryDashboard';

/* Illustrative data for the expense-claims demo project. */

const persona = (name: string, tag: string, r: Record<'Role' | 'Goals' | 'Responsibilities' | 'Pain points' | 'Needs' | 'Behaviors' | 'Constraints', string>) =>
  ({ name, tag, rows: Object.entries(r).map(([label, value]) => ({ label, value })) });

const cards: FeatureCardData[] = [
  {
    id: 'identification', title: 'User Identification', wide: true, status: { label: '6 groups', tone: 'blue' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Primary users', value: 'Field sales reps who submit claims.' },
        { label: 'Secondary users', value: 'Line managers who approve; finance staff who check and pay.' },
        { label: 'Customers', value: 'Sales organisations that buy the tool for their teams.' },
        { label: 'Buyers', value: 'Head of sales operations; finance controller.' },
        { label: 'Decision makers', value: 'VP Sales and CFO.' },
        { label: 'Influencers', value: 'Top-performing reps, IT lead, internal audit.' },
      ],
    }],
  },
  {
    id: 'personas', title: 'Persona Discovery', wide: true, status: { label: '3 personas', tone: 'green' },
    blocks: [{
      kind: 'cards', title: 'Persona profiles', items: [
        persona('Arjun, field sales rep', 'Primary', { Role: 'Visits 6–8 clients a day', Goals: 'Get reimbursed fast, spend time selling', Responsibilities: 'Submit claims with receipts', 'Pain points': 'Lost receipts, no claim status', Needs: 'Capture on the spot, see status', Behaviors: 'Files claims in batches at month-end', Constraints: 'Phone only, patchy network' }),
        persona('Meera, line manager', 'Secondary', { Role: 'Manages 10 reps', Goals: 'Approve quickly without chasing', Responsibilities: 'Approve or query claims', 'Pain points': 'Claims scattered across email', Needs: 'One queue with policy flags', Behaviors: 'Approves in bursts between meetings', Constraints: 'Little time per claim' }),
        persona('Kabir, finance executive', 'Secondary', { Role: 'Checks and pays claims', Goals: 'Clean, policy-checked claims', Responsibilities: 'Audit and reimburse', 'Pain points': 'Manual checks, missing documents', Needs: 'Exceptions only, audit trail', Behaviors: 'Works through a weekly payment run', Constraints: 'Fixed finance cut-off dates' }),
      ],
    }],
  },
  {
    id: 'journey', title: 'User Journey Mapping', wide: true, status: { label: 'Arjun · today', tone: 'amber' },
    blocks: [
      {
        kind: 'journey', title: 'Journey stages, actions, pain points and emotion', stages: [
          { name: 'Spend', action: 'Pays for fuel, meals, parking', pain: 'Receipt is easily lost', mood: 3 },
          { name: 'Collect', action: 'Keeps paper receipts in the car', pain: 'Faded or missing receipts', mood: 2 },
          { name: 'Submit', action: 'Types claim and emails receipts', pain: 'Re-keying, long forms', mood: 1 },
          { name: 'Approve', action: 'Waits for manager reply', pain: 'No status, chasing by phone', mood: 2 },
          { name: 'Reimburse', action: 'Gets paid after finance run', pain: 'Paid weeks later', mood: 2 },
        ],
      },
      {
        kind: 'facts', rows: [
          { label: 'Touchpoints', value: 'Phone camera, email, spreadsheet, manager chat, finance portal.' },
          { label: 'Friction', value: 'Re-entering the same details; no feedback after submitting.' },
          { label: 'Desired outcomes', value: 'Capture once, see status live, paid within days.' },
        ],
      },
    ],
  },
  {
    id: 'workflow', title: 'Current Workflow Analysis', wide: true, status: { label: 'Mapped', tone: 'green' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Process steps', value: 'Spend → keep receipt → fill spreadsheet → email manager → manager forwards to finance → finance checks → payment run.' },
        { label: 'Bottlenecks', value: 'Manager approval by email and the weekly finance run.' },
        { label: 'Manual tasks', value: 'Typing receipt details, policy checks, matching receipts to rows.' },
        { label: 'Workarounds', value: 'Photos kept in the phone gallery; WhatsApp reminders to managers.' },
        { label: 'Decision points', value: 'Is it within policy? Is the receipt valid? Does it need escalation?' },
        { label: 'System interactions', value: 'Email, spreadsheets and the finance system (not yet identified).' },
      ],
    }],
  },
  {
    id: 'needs', title: 'Needs & Pain Point Analysis', wide: true, status: { label: '4 pain points', tone: 'amber' },
    blocks: [
      { kind: 'chips', title: 'Functional needs', items: ['Capture receipt on phone', 'Track claim status', 'Policy check before submit'], tone: 'blue' },
      { kind: 'chips', title: 'Emotional needs', items: ['Trust that claims are not lost', 'Feel respected, not chased'], tone: 'slate' },
      { kind: 'chips', title: 'Business needs', items: ['Faster close', 'Fewer manual checks', 'Audit trail'], tone: 'green' },
      {
        kind: 'table', title: 'Pain points', head: ['Pain point', 'Severity', 'Frequency', 'Root cause', 'Existing workaround'], strongCol: 1, rows: [
          ['Lost receipts', 'High', 'Weekly', 'Paper receipts on the road', 'Photos in phone gallery'],
          ['No claim status', 'High', 'Every claim', 'Email-based approval', 'Chasing managers by chat'],
          ['Manual policy checks', 'Medium', 'Every claim', 'Rules live in a PDF', 'Finance checks by eye'],
          ['Slow reimbursement', 'High', 'Monthly', 'Batch payment run', 'Reps pay out of pocket'],
        ],
      },
    ],
  },
  {
    id: 'research', title: 'User Research', status: { label: '2 of 5 done', tone: 'blue' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Interview framework', value: 'Done — 8 interviews: 4 reps, 2 managers, 2 finance.' },
        { label: 'Survey design', value: 'Done — 12 questions, sent to 120 reps.' },
        { label: 'Feedback collection', value: 'Planned — in-product feedback during pilot.' },
        { label: 'Support conversation analysis', value: 'Planned — review last quarter’s expense tickets.' },
        { label: 'Observation sessions', value: 'Planned — ride-along with two reps.' },
      ],
    }],
  },
  {
    id: 'synthesis', title: 'Research Synthesis', status: { label: 'Draft', tone: 'slate' },
    blocks: [
      { kind: 'list', title: 'Common patterns', items: ['Reps file claims in batches, not daily', 'Everyone wants to know where a claim is'], tone: 'blue' },
      { kind: 'list', title: 'Contradictions', items: ['Managers want strict checks; reps want fewer steps'], tone: 'amber' },
      { kind: 'list', title: 'Key findings & evidence-backed insights', items: ['6 of 8 interviewees lost a receipt in the last quarter', 'Survey: 71% wait more than a week for reimbursement'], tone: 'green' },
      { kind: 'list', title: 'User quotes', items: ['“I take a photo and hope I find it later.”', '“I never know if my manager even saw it.”'], tone: 'slate' },
    ],
  },
  {
    id: 'validation', title: 'User Validation', status: { label: 'Segment size low', tone: 'amber' },
    blocks: [{
      kind: 'bars', title: 'Validation coverage', max: 100, rows: [
        { label: 'Need validation', value: 82, note: 'Confirmed in interviews and survey' },
        { label: 'Problem confirmation', value: 90, note: 'Matches the validated problem' },
        { label: 'Priority validation', value: 70, note: 'Reps rank visibility first, managers rank speed' },
        { label: 'Segment size validation', value: 45, note: 'Rep count still an estimate' },
      ],
    }],
  },
  {
    id: 'report', title: 'User Insight Report', status: { label: 'Draft v0.1', tone: 'slate' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Personas', value: 'Arjun (rep), Meera (manager), Kabir (finance).' },
        { label: 'Journeys', value: 'Spend-to-reimbursement journey for the rep, with five stages and two low points (submit, approve).' },
        { label: 'Consolidated pain points', value: 'Lost receipts, no claim status, manual policy checks, slow reimbursement.' },
        { label: 'Needs hierarchy', value: '1) Know claim status  2) Capture once on the phone  3) Fewer manual checks  4) Faster payment.' },
        { label: 'Behaviors', value: 'Batch filing, approval in bursts, weekly payment runs.' },
        { label: 'Adoption success factors', value: 'Works offline, takes under a minute per claim, managers approve from a single queue.' },
      ],
    }],
  },
];

export const UserDiscovery: React.FC = () => (
  <DiscoveryDashboard
    phase="Phase 5"
    title="User & Customer Discovery"
    subtitle="Who uses and buys the product, how they work today and what hurts."
    badge="User Insight Report · Draft v0.1"
    kpis={[
      { label: 'User groups', value: 6, hint: 'Users, buyers, influencers', tone: 'blue' },
      { label: 'Personas', value: 3, hint: '1 primary, 2 secondary', tone: 'slate' },
      { label: 'Pain points', value: 4, hint: '3 high severity', tone: 'amber' },
      { label: 'Research done', value: '2 / 5', hint: 'Interviews and survey', tone: 'green' },
    ]}
    cards={cards}
    csuiteStage="user"
    validated
  />
);
