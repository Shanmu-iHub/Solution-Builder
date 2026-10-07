import React from 'react';
import { AlertTriangle, CheckCircle2, Coins, Cpu, LayoutGrid, Timer, TrendingUp } from 'lucide-react';
import { Badge, Button, Dialog, StatTile, Tone, cx } from '../../ui';
import { FeatureCard, FeatureCardData } from './DiscoveryDashboard';

/* Illustrative analysis for each framing option in Problem Discovery → Framing.
 * Money is USD thousands (AI estimates for the demo, not quotes). */

export interface FramingOption { id: string; t: string }

type BmcKey = 'partners' | 'activities' | 'resources' | 'value' | 'relationships' | 'channels' | 'segments' | 'cost' | 'revenue';
interface CostItem { item: string; oneTime: number; monthly: number }
interface Analysis {
  lens: string;
  verdict: { label: string; tone: Tone };
  bmc: Record<BmcKey, string[]>;
  feasibility: { label: string; value: number; note?: string }[];
  feasibilityFacts: { label: string; value: string }[];
  timeToValue: string;
  costs: CostItem[];
  sustain: { label: string; value: number; note?: string }[];
  sustainFacts: { label: string; value: string }[];
  sustainLabel: string;
  risks: string[];
}

const ANALYSES: Record<string, Analysis> = {
  stmt_1: {
    lens: 'Rep-first: fix the receipt and the wait',
    verdict: { label: 'Recommended', tone: 'green' },
    bmc: {
      partners: ['Receipt-reading (OCR) provider', 'Finance system vendor', 'Cloud host'],
      activities: ['Mobile receipt capture', 'Claim routing and tracking', 'Finance hand-off'],
      resources: ['Mobile app team', 'Receipt-reading models', 'Claim data'],
      value: ['Capture a receipt in seconds', 'See claim status live', 'Paid in days, not weeks'],
      relationships: ['Self-service app', 'In-app status nudges', 'Onboarding for sales teams'],
      channels: ['iOS / Android app', 'Sales-ops led rollout', 'Email and chat reminders'],
      segments: ['Field sales reps (primary)', 'Line managers', 'Finance teams at mid-size B2B firms'],
      cost: ['Product build and design', 'Receipt-reading usage fees', 'Cloud and support'],
      revenue: ['Per-seat monthly subscription', 'Onboarding fee for larger teams'],
    },
    feasibility: [
      { label: 'Data availability', value: 8, note: 'Receipts and claims already exist' },
      { label: 'Integration ease', value: 7, note: 'Finance system still unknown' },
      { label: 'Team skill fit', value: 8 },
      { label: 'Receipt-reading maturity', value: 9, note: 'Proven technology' },
      { label: 'Security & compliance readiness', value: 8 },
    ],
    feasibilityFacts: [
      { label: 'Overall view', value: 'Technically straightforward; mostly assembly of proven parts.' },
      { label: 'Key dependency', value: 'Identify the target finance system before the hand-off step is built.' },
    ],
    timeToValue: '10–12 weeks',
    costs: [
      { item: 'Product build and design', oneTime: 140, monthly: 0 },
      { item: 'Receipt-reading integration', oneTime: 25, monthly: 2.5 },
      { item: 'Finance system connector', oneTime: 40, monthly: 0 },
      { item: 'Cloud hosting', oneTime: 5, monthly: 3 },
      { item: 'Support and maintenance', oneTime: 0, monthly: 6 },
    ],
    sustain: [
      { label: 'Demand durability', value: 8, note: 'Mobile-first filing is now expected' },
      { label: 'Competitive resilience', value: 6, note: 'Established tools already scan receipts' },
      { label: 'Defensibility', value: 6, note: 'Field-sales focus is the edge' },
      { label: 'Adoption stickiness', value: 8 },
      { label: 'Regulatory outlook', value: 7 },
    ],
    sustainFacts: [
      { label: 'Will it sustain?', value: 'Yes, if positioned as the field-sales tool rather than a generic scanner.' },
      { label: 'Time horizon', value: 'Receipt capture alone becomes a commodity within about 2 years.' },
    ],
    sustainLabel: 'Strong',
    risks: ['Poor photo quality on the road', 'Finance system not yet identified', 'Large suites add field-sales features'],
  },
  stmt_2: {
    lens: 'Process-first: remove errors and manual checks',
    verdict: { label: 'Viable', tone: 'blue' },
    bmc: {
      partners: ['Policy owners in finance', 'Receipt-reading provider', 'ERP vendor'],
      activities: ['Automated policy checks', 'Duplicate and error detection', 'Exception routing'],
      resources: ['Policy rules library', 'Claim history data', 'AI/ML engineers'],
      value: ['Fewer rejected and reworked claims', 'Errors caught before approval', 'Finance sees exceptions only'],
      relationships: ['Dedicated finance onboarding', 'Rule tuning with policy owners'],
      channels: ['Web app for managers and finance', 'Mobile capture for reps', 'Direct sales to finance leads'],
      segments: ['Finance teams (economic buyer)', 'Line managers', 'Field sales reps'],
      cost: ['Rules engine and AI build', 'Policy configuration effort', 'Cloud and support'],
      revenue: ['Per-claim processing fee', 'Premium audit tier'],
    },
    feasibility: [
      { label: 'Data availability', value: 6, note: 'Needs clean history to tune rules' },
      { label: 'Integration ease', value: 6 },
      { label: 'Team skill fit', value: 7 },
      { label: 'Rules and AI maturity', value: 7, note: 'Rules are easy; anomaly checks need tuning' },
      { label: 'Security & compliance readiness', value: 8 },
    ],
    feasibilityFacts: [
      { label: 'Overall view', value: 'Feasible, but accuracy depends on how well policy can be written as rules.' },
      { label: 'Key dependency', value: 'Policy must be agreed and kept up to date by a named owner.' },
    ],
    timeToValue: '14–16 weeks',
    costs: [
      { item: 'Product build and design', oneTime: 150, monthly: 0 },
      { item: 'Rules engine and anomaly checks', oneTime: 70, monthly: 4 },
      { item: 'Finance system connector', oneTime: 45, monthly: 0 },
      { item: 'Cloud hosting', oneTime: 5, monthly: 4 },
      { item: 'Support and rule maintenance', oneTime: 0, monthly: 9 },
    ],
    sustain: [
      { label: 'Demand durability', value: 7 },
      { label: 'Competitive resilience', value: 7, note: 'Audit depth is harder to copy' },
      { label: 'Defensibility', value: 7, note: 'Rules and history build a moat over time' },
      { label: 'Adoption stickiness', value: 6, note: 'Depends on finance buy-in' },
      { label: 'Regulatory outlook', value: 8, note: 'Audit pressure is rising' },
    ],
    sustainFacts: [
      { label: 'Will it sustain?', value: 'Likely, and it gets harder to copy as rules and claim history accumulate.' },
      { label: 'Time horizon', value: 'Value compounds over 2–3 years of data.' },
    ],
    sustainLabel: 'Moderate–strong',
    risks: ['False rejections frustrate reps', 'Policy owner unclear', 'Slower to show value than capture-led options'],
  },
  stmt_3: {
    lens: 'Capability-first: digital capture and tracked approval',
    verdict: { label: 'Low cost', tone: 'amber' },
    bmc: {
      partners: ['Workflow platform vendor', 'Email and chat providers', 'Finance system vendor'],
      activities: ['Approval workflow design', 'Queue, reminders and tracking', 'Basic receipt upload'],
      resources: ['Workflow engine', 'Small product team', 'Integration templates'],
      value: ['Every claim has an owner and a status', 'No claims lost in inboxes', 'Quick to roll out'],
      relationships: ['Self-service setup', 'Templates for common policies'],
      channels: ['Web app', 'Email and chat approvals', 'Partner referrals'],
      segments: ['Line managers', 'Finance teams', 'Mid-size B2B sales orgs'],
      cost: ['Workflow build on existing platform', 'Integration templates', 'Light support'],
      revenue: ['Per-seat subscription (lower price point)', 'Integration add-ons'],
    },
    feasibility: [
      { label: 'Data availability', value: 8 },
      { label: 'Integration ease', value: 8, note: 'Leans on existing workflow tools' },
      { label: 'Team skill fit', value: 9 },
      { label: 'Technology maturity', value: 9 },
      { label: 'Security & compliance readiness', value: 8 },
    ],
    feasibilityFacts: [
      { label: 'Overall view', value: 'The easiest option to build; mostly configuration of a workflow engine.' },
      { label: 'Key dependency', value: 'Receipt capture stays basic, so reps still do some manual entry.' },
    ],
    timeToValue: '6–8 weeks',
    costs: [
      { item: 'Workflow build and configuration', oneTime: 80, monthly: 0 },
      { item: 'Receipt upload', oneTime: 10, monthly: 0.5 },
      { item: 'Finance system connector', oneTime: 30, monthly: 0 },
      { item: 'Cloud hosting', oneTime: 3, monthly: 2 },
      { item: 'Support and maintenance', oneTime: 0, monthly: 4 },
    ],
    sustain: [
      { label: 'Demand durability', value: 6 },
      { label: 'Competitive resilience', value: 4, note: 'Easy for others to match' },
      { label: 'Defensibility', value: 3, note: 'Workflow alone is a commodity' },
      { label: 'Adoption stickiness', value: 6 },
      { label: 'Regulatory outlook', value: 6 },
    ],
    sustainFacts: [
      { label: 'Will it sustain?', value: 'Only as a stepping stone; it needs a differentiator added within a year.' },
      { label: 'Time horizon', value: 'Good first release, weak long-term position on its own.' },
    ],
    sustainLabel: 'Weak–moderate',
    risks: ['Little differentiation from existing tools', 'Reps still re-key receipt details', 'Price pressure from bundled suites'],
  },
};

const avg = (rows: { value: number }[]) => Math.round((rows.reduce((a, r) => a + r.value, 0) / rows.length) * 10) / 10;
const k = (n: number) => `$${Math.round(n * 10) / 10}K`;
const oneTimeOf = (a: Analysis) => a.costs.reduce((s, c) => s + c.oneTime, 0);
const monthlyOf = (a: Analysis) => a.costs.reduce((s, c) => s + c.monthly, 0);
const tcoOf = (a: Analysis) => oneTimeOf(a) + monthlyOf(a) * 36;

export const AnalysisChips: React.FC<{ id: string }> = ({ id }) => {
  const a = ANALYSES[id];
  if (!a) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2.5">
      <Badge tone="blue">Feasibility {avg(a.feasibility)} / 10</Badge>
      <Badge tone="slate">Build {k(oneTimeOf(a))}</Badge>
      <Badge tone="teal">Time to value {a.timeToValue}</Badge>
      <Badge tone="purple">Market: {a.sustainLabel}</Badge>
    </div>
  );
};

const BMC_LAYOUT: { key: BmcKey; title: string; span: string }[] = [
  { key: 'partners', title: 'Key partners', span: 'md:col-span-2 md:row-span-2' },
  { key: 'activities', title: 'Key activities', span: 'md:col-span-2' },
  { key: 'value', title: 'Value propositions', span: 'md:col-span-2 md:row-span-2' },
  { key: 'relationships', title: 'Customer relationships', span: 'md:col-span-2' },
  { key: 'segments', title: 'Customer segments', span: 'md:col-span-2 md:row-span-2' },
  { key: 'resources', title: 'Key resources', span: 'md:col-span-2' },
  { key: 'channels', title: 'Channels', span: 'md:col-span-2' },
  { key: 'cost', title: 'Cost structure', span: 'md:col-span-5' },
  { key: 'revenue', title: 'Revenue streams', span: 'md:col-span-5' },
];

const Canvas: React.FC<{ bmc: Analysis['bmc'] }> = ({ bmc }) => (
  <div className="grid grid-cols-1 md:grid-cols-10 gap-2.5">
    {BMC_LAYOUT.map(b => (
      <div key={b.key} className={cx('rounded-xl border p-3', b.key === 'value' ? 'bg-blue-50/60 border-blue-200' : 'bg-white border-slate-200', b.span)}>
        <h5 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{b.title}</h5>
        <ul className="space-y-1">
          {bmc[b.key].map(i => <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[7px] shrink-0" />{i}</li>)}
        </ul>
      </div>
    ))}
  </div>
);

export const StatementAnalysisDialog: React.FC<{
  option: FramingOption | null; selected: boolean; onClose: () => void; onSelect: (id: string) => void;
}> = ({ option, selected, onClose, onSelect }) => {
  const a = option ? ANALYSES[option.id] : null;
  const open = !!option && !!a;
  const cards: FeatureCardData[] = a ? [
    { id: 'bmc', title: 'Business Model Canvas', icon: <LayoutGrid className="w-4 h-4" />, wide: true, status: { label: a.verdict.label, tone: a.verdict.tone }, custom: <Canvas bmc={a.bmc} /> },
    {
      id: 'tech', title: 'Technical Feasibility', icon: <Cpu className="w-4 h-4" />, status: { label: `${avg(a.feasibility)} / 10`, tone: avg(a.feasibility) >= 7.5 ? 'green' : 'blue' },
      blocks: [{ kind: 'bars', title: 'Feasibility factors', rows: a.feasibility }, { kind: 'facts', rows: a.feasibilityFacts }],
    },
    {
      id: 'cost', title: 'Cost', icon: <Coins className="w-4 h-4" />, status: { label: `3-yr ${k(tcoOf(a))}`, tone: 'slate' },
      blocks: [{
        kind: 'table', title: 'Estimate (USD)', head: ['Item', 'One-time', 'Monthly'], strongCol: 1, rows: [
          ...a.costs.map(c => [c.item, c.oneTime ? k(c.oneTime) : '—', c.monthly ? k(c.monthly) : '—']),
          ['Total', k(oneTimeOf(a)), k(monthlyOf(a))],
        ],
      }, { kind: 'facts', rows: [{ label: '3-year cost', value: `${k(tcoOf(a))} (build plus 36 months of running cost)` }] }],
    },
    {
      id: 'market', title: 'Market Sustainability', icon: <TrendingUp className="w-4 h-4" />, status: { label: a.sustainLabel, tone: avg(a.sustain) >= 6.5 ? 'green' : 'amber' },
      blocks: [{ kind: 'bars', title: 'Will it hold up in the market?', rows: a.sustain }, { kind: 'facts', rows: a.sustainFacts }],
    },
    { id: 'risks', title: 'Key Risks', icon: <AlertTriangle className="w-4 h-4" />, status: { label: `${a.risks.length} risks`, tone: 'amber' }, blocks: [{ kind: 'list', title: 'Watch out for', items: a.risks, tone: 'amber' }] },
  ] : [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      width="max-w-6xl"
      title="Problem statement analysis"
      subtitle={a?.lens}
      footer={option && (
        <>
          <Button onClick={onClose}>Close</Button>
          <Button variant="primary" disabled={selected} icon={selected ? <CheckCircle2 className="w-3.5 h-3.5" /> : undefined} onClick={() => { onSelect(option.id); onClose(); }}>
            {selected ? 'Selected' : 'Select this statement'}
          </Button>
        </>
      )}
    >
      {option && a && (
        <div className="space-y-5">
          <p className="text-[15px] font-medium text-[#0F172A] leading-relaxed border-l-4 border-blue-300 pl-4">{option.t}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Feasibility" value={`${avg(a.feasibility)} / 10`} hint="Technical, average of 5 factors" icon={<Cpu className="w-4 h-4" />} tone="blue" />
            <StatTile label="Build cost" value={k(oneTimeOf(a))} hint={`Then ${k(monthlyOf(a))} a month`} icon={<Coins className="w-4 h-4" />} tone="slate" />
            <StatTile label="Time to value" value={a.timeToValue} hint="To a first usable release" icon={<Timer className="w-4 h-4" />} tone="teal" />
            <StatTile label="Market outlook" value={a.sustainLabel} hint={`${avg(a.sustain)} / 10 sustainability`} icon={<TrendingUp className="w-4 h-4" />} tone={avg(a.sustain) >= 6.5 ? 'green' : 'amber'} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
            {cards.map((c, i) => <FeatureCard key={c.id} card={c} index={i} />)}
          </div>
        </div>
      )}
    </Dialog>
  );
};
