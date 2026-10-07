import React from 'react';
import { AlertTriangle, BadgeCheck, UserCircle2, Users } from 'lucide-react';
import { DiscoveryDashboard, FeatureCardData } from './DiscoveryDashboard';

/* Illustrative data for the expense-claims demo project. */

const persona = (name: string, tag: string, r: Record<'Role' | 'Goals' | 'Pain points' | 'Constraints', string>) =>
  ({ name, tag, rows: Object.entries(r).map(([label, value]) => ({ label, value })) });

const cards: FeatureCardData[] = [
  {
    id: 'identification', title: 'Users & Buyers', icon: <Users className="w-4 h-4" />, wide: true, status: { label: '6 groups', tone: 'blue' },
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
    id: 'personas', title: 'Personas', icon: <UserCircle2 className="w-4 h-4" />, wide: true, status: { label: '3 personas', tone: 'green' },
    blocks: [{
      kind: 'cards', title: 'Persona profiles', items: [
        persona('Arjun, field sales rep', 'Primary', { Role: 'Visits 6–8 clients a day', Goals: 'Get reimbursed fast, spend time selling', 'Pain points': 'Lost receipts, no claim status', Constraints: 'Phone only, patchy network' }),
        persona('Meera, line manager', 'Secondary', { Role: 'Manages 10 reps', Goals: 'Approve quickly without chasing', 'Pain points': 'Claims scattered across email', Constraints: 'Little time per claim' }),
        persona('Kabir, finance executive', 'Secondary', { Role: 'Checks and pays claims', Goals: 'Clean, policy-checked claims', 'Pain points': 'Manual checks, missing documents', Constraints: 'Fixed finance cut-off dates' }),
      ],
    }],
  },
  {
    id: 'needs', title: 'Needs & Pain Points', icon: <AlertTriangle className="w-4 h-4" />, wide: true, status: { label: '4 pain points', tone: 'amber' },
    blocks: [
      { kind: 'chips', title: 'Functional needs', items: ['Capture receipt on phone', 'Track claim status', 'Policy check before submit'], tone: 'blue' },
      { kind: 'chips', title: 'Business needs', items: ['Faster close', 'Fewer manual checks', 'Audit trail'], tone: 'green' },
      {
        kind: 'table', title: 'Pain points', head: ['Pain point', 'Severity', 'Frequency', 'Root cause', 'Existing workaround'], strongCol: 1, rows: [
          ['Lost receipts', 'High', 'Weekly', 'Paper receipts on the road', 'Photos in phone gallery'],
          ['No claim status', 'High', 'Every claim', 'Email-based approval', 'Chasing managers by chat'],
          ['Manual policy checks', 'Medium', 'Every claim', 'Rules live in a PDF', 'Finance checks by eye'],
          ['Slow reimbursement', 'High', 'Monthly', 'Batch payment run', 'Reps pay out of pocket'],
        ],
      },
      { kind: 'facts', rows: [{ label: 'Needs hierarchy', value: '1) Know claim status  2) Capture once on the phone  3) Fewer manual checks  4) Faster payment.' }] },
    ],
  },
  {
    id: 'validation', title: 'Evidence & Validation', icon: <BadgeCheck className="w-4 h-4" />, wide: true, status: { label: 'Segment size low', tone: 'amber' },
    blocks: [
      {
        kind: 'bars', title: 'Validation coverage', max: 100, rows: [
          { label: 'Need validation', value: 82, note: 'Confirmed in interviews and survey' },
          { label: 'Problem confirmation', value: 90, note: 'Matches the validated problem' },
          { label: 'Priority validation', value: 70, note: 'Reps rank visibility first, managers rank speed' },
          { label: 'Segment size validation', value: 45, note: 'Rep count still an estimate' },
        ],
      },
      { kind: 'list', title: 'Key findings', items: ['6 of 8 interviewees lost a receipt in the last quarter', 'Survey: 71% wait more than a week for reimbursement'], tone: 'green' },
      { kind: 'list', title: 'Contradictions', items: ['Managers want strict checks; reps want fewer steps'], tone: 'amber' },
      {
        kind: 'facts', title: 'Research basis', rows: [
          { label: 'Interviews', value: '8 interviews: 4 reps, 2 managers, 2 finance.' },
          { label: 'Survey', value: '12 questions, sent to 120 reps.' },
        ],
      },
    ],
  },
];

export const UserDiscovery: React.FC = () => (
  <DiscoveryDashboard cards={cards} csuiteStage="user" validated />
);
