import React, { useState } from 'react';
import { Compass, FileText, GitCompare, Lightbulb, MousePointerClick, Scale, Target, Trophy, Wand2, AlertTriangle } from 'lucide-react';
import { Badge, Button, Input, cx } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { Block, DiscoveryDashboard, FeatureCardData } from './DiscoveryDashboard';

const CRITERIA = ['Business value', 'Customer value', 'Potential scale', 'Feasibility', 'Strategic alignment', 'Differentiation', 'Impact magnitude'] as const;
type Score = Record<(typeof CRITERIA)[number], number>;

interface Opp {
  id: string; name: string; concept: string; hypothesis: string; origin: 'AI' | 'User';
  scores: Score; target: string; value: string; assumptions: string[]; risks: string[]; success: string[];
}

const OPPS: Opp[] = [
  {
    id: 'o_capture', name: 'Phone receipt capture + auto-routed approval', origin: 'AI',
    concept: 'Reps photograph a receipt; fields are read automatically and the claim is routed to the line manager without email.',
    hypothesis: 'If receipts are captured at the point of spend, lost receipts and reimbursement delays drop sharply.',
    scores: { 'Business value': 8, 'Customer value': 9, 'Potential scale': 7, Feasibility: 8, 'Strategic alignment': 8, Differentiation: 5, 'Impact magnitude': 8 },
    target: 'Field sales reps and their line managers', value: 'Reimbursement time from ~12 days to ~3; ~60% less manual handling',
    assumptions: ['Reps will photograph receipts on the spot', 'Receipt fields can be read with acceptable accuracy'], risks: ['Poor photo quality on the road', 'Finance system not yet identified'],
    success: ['Median reimbursement time under 4 days', '90% of claims submitted from mobile'],
  },
  {
    id: 'o_audit', name: 'Policy-aware expense auto-audit', origin: 'AI',
    concept: 'Every claim is checked against travel and spend policy before a person sees it; only exceptions reach finance.',
    hypothesis: 'If policy checks run automatically, finance spends time only on real exceptions.',
    scores: { 'Business value': 8, 'Customer value': 6, 'Potential scale': 7, Feasibility: 6, 'Strategic alignment': 7, Differentiation: 7, 'Impact magnitude': 7 },
    target: 'Finance team and sales operations', value: '~40% fewer claims touched manually by finance',
    assumptions: ['Spend policy can be expressed as machine-checkable rules', 'Policy owners will keep rules up to date'], risks: ['Rule exceptions create false rejections', 'Policy ownership unclear'],
    success: ['85% of compliant claims auto-approved', 'Policy breaches caught before payment'],
  },
  {
    id: 'o_insight', name: 'Spend insight dashboard for sales operations', origin: 'User',
    concept: 'A live view of spend by team, category and trip so sales operations can spot overspend early.',
    hypothesis: 'If spend is visible by team and category, budget owners act before month-end.',
    scores: { 'Business value': 6, 'Customer value': 5, 'Potential scale': 6, Feasibility: 8, 'Strategic alignment': 6, Differentiation: 4, 'Impact magnitude': 5 },
    target: 'Sales operations and regional heads', value: 'Earlier budget corrections; better forecasting',
    assumptions: ['Claim data is clean enough to report on'], risks: ['Value depends on claim volume going through the tool'],
    success: ['Monthly forecast variance under 5%'],
  },
  {
    id: 'o_card', name: 'Corporate card feed auto-reconciliation', origin: 'AI',
    concept: 'Card transactions flow in automatically and are matched to receipts, removing manual claim entry.',
    hypothesis: 'If card transactions pre-fill claims, reps only need to confirm, not type.',
    scores: { 'Business value': 7, 'Customer value': 7, 'Potential scale': 8, Feasibility: 4, 'Strategic alignment': 7, Differentiation: 6, 'Impact magnitude': 8 },
    target: 'Reps with corporate cards; finance', value: 'Near-zero manual entry for card spend',
    assumptions: ['Bank/card issuer exposes a transaction feed'], risks: ['Issuer integration cost and lead time', 'Not every rep holds a corporate card'],
    success: ['70% of card spend auto-matched'],
  },
];

const ALT_OPP: Opp = {
  id: 'o_voice', name: 'Voice-based expense logging', origin: 'AI',
  concept: 'Reps dictate an expense after a visit and the assistant drafts the claim, asking for a receipt later.',
  hypothesis: 'If logging takes ten seconds hands-free, claims are filed the same day.',
  scores: { 'Business value': 5, 'Customer value': 7, 'Potential scale': 5, Feasibility: 5, 'Strategic alignment': 5, Differentiation: 8, 'Impact magnitude': 5 },
  target: 'Field sales reps who drive between visits', value: 'Same-day claim filing',
  assumptions: ['Speech recognition copes with noisy cars and accents'], risks: ['Still needs a receipt, so does not remove capture'],
  success: ['50% of claims opened by voice within a quarter'],
};

const total = (o: Opp) => Math.round((Object.values(o.scores).reduce((a, b) => a + b, 0) / CRITERIA.length) * 10) / 10;

const OpportunitySelection: React.FC<{
  opps: Opp[]; primaryId: string | null; rejected: string[]; refined: Record<string, string>; altShown: boolean;
  onSelect: (id: string) => void; onReject: (id: string) => void; onRefine: (id: string, note: string) => void; onExplore: () => void;
}> = ({ opps, primaryId, rejected, refined, altShown, onSelect, onReject, onRefine, onExplore }) => {
  const [refining, setRefining] = useState<string | null>(null);
  const [note, setNote] = useState('');
  return (
    <div className="space-y-3">
      <p className="text-[12.5px] text-slate-500">Pick the primary opportunity option — the rest of discovery is built around it.</p>
      {opps.map(o => {
        const isPrimary = primaryId === o.id;
        const isRejected = rejected.includes(o.id);
        return (
          <div key={o.id} className={cx('rounded-xl border p-3.5 transition', isPrimary ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200', isRejected && 'opacity-60')}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={cx('text-[14px] font-bold text-[#0F172A]', isRejected && 'line-through')}>{o.name}</p>
                <p className="text-[12.5px] text-slate-500 mt-0.5">Score {total(o)} / 10{refined[o.id] && <span className="text-blue-600"> · Refined: {refined[o.id]}</span>}</p>
              </div>
              {isPrimary && <Badge tone="blue">Primary</Badge>}
              {isRejected && <Badge tone="red">Rejected</Badge>}
            </div>
            <p className="text-[12.5px] text-slate-600 mt-2 leading-relaxed">{o.concept}</p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {isRejected
                ? <Button size="xs" onClick={() => onReject(o.id)}>Restore</Button>
                : <>
                    <Button size="xs" variant={isPrimary ? 'primary' : 'secondary'} onClick={() => onSelect(o.id)}>{isPrimary ? 'Selected' : 'Select primary'}</Button>
                    <Button size="xs" onClick={() => { setRefining(refining === o.id ? null : o.id); setNote(refined[o.id] ?? ''); }}>Refine</Button>
                    <Button size="xs" variant="danger" onClick={() => onReject(o.id)}>Reject</Button>
                  </>}
            </div>
            {refining === o.id && (
              <div className="flex gap-2 mt-2.5">
                <Input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Start with Android only" />
                <Button size="sm" variant="primary" onClick={() => { onRefine(o.id, note.trim()); setRefining(null); }}>Save</Button>
              </div>
            )}
          </div>
        );
      })}
      {!altShown && <Button icon={<Wand2 className="w-3.5 h-3.5" />} onClick={onExplore}>Explore alternatives</Button>}
    </div>
  );
};

export const OpportunityTab: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [rejected, setRejected] = useState<string[]>([]);
  const [refined, setRefined] = useState<Record<string, string>>({});
  const [altShown, setAltShown] = useState(false);

  const all = altShown ? [...OPPS, ALT_OPP] : OPPS;
  const live = all.filter(o => !rejected.includes(o.id));
  const ranked = [...live].sort((a, b) => total(b) - total(a));
  const primary = live.find(o => o.id === s.selectedOpportunity) ?? null;
  const focus = primary ?? ranked[0];

  const selectionCard = (
    <OpportunitySelection
      opps={all} primaryId={primary?.id ?? null} rejected={rejected} refined={refined} altShown={altShown}
      onSelect={id => patch(projectId, { selectedOpportunity: id })}
      onReject={id => {
        const rejecting = !rejected.includes(id);
        setRejected(r => (rejecting ? [...r, id] : r.filter(x => x !== id)));
        if (rejecting && s.selectedOpportunity === id) patch(projectId, { selectedOpportunity: null });
      }}
      onRefine={(id, note) => setRefined(r => ({ ...r, [id]: note }))}
      onExplore={() => setAltShown(true)}
    />
  );

  const cards: FeatureCardData[] = [
    {
      id: 'context',
      title: 'Opportunity Context',
      icon: <Target className="w-4 h-4" />,
      status: { label: 'Complete', tone: 'green' },
      blocks: [{
        kind: 'facts',
        rows: [
          { label: 'Validated problem summary', value: 'Field sales reps lose receipts and wait weeks for reimbursement; managers and finance chase claims through email.' },
          { label: 'Problem impact', value: 'Slow reimbursement, repeated manual checks, no visibility of claim status.' },
          { label: 'Affected population', value: 'Field sales reps, line managers, finance team.' },
          { label: 'Current alternatives', value: 'Email receipts and manual approval; established tools such as SAP Concur, Expensify and Zoho Expense.' },
        ],
      }],
    },
    {
      id: 'exploration',
      title: 'Opportunity Exploration',
      icon: <Compass className="w-4 h-4" />,
      status: { label: 'Strategic lenses', tone: 'blue' },
      blocks: [{
        kind: 'facts',
        rows: [
          { label: 'Market gaps', value: 'Few tools target field-sales travel patterns end to end.' },
          { label: 'Revenue opportunities', value: 'Per-seat subscription for sales teams; premium audit tier.' },
          { label: 'Cost reduction', value: 'Less manager and finance time spent on manual checks.' },
          { label: 'Strategic positioning', value: 'Position as the sales-first expense tool, not a finance-first one.' },
          { label: 'Business model innovation', value: 'Outcome-linked pricing based on claims processed.' },
          { label: 'Technology innovation', value: 'Mobile OCR with policy-aware validation at capture time.' },
        ],
      }],
    },
    {
      id: 'options',
      title: 'Opportunity Options',
      icon: <MousePointerClick className="w-4 h-4" />,
      status: primary ? { label: 'Primary chosen', tone: 'green' } : { label: 'Choose primary', tone: 'amber' },
      custom: selectionCard,
    },
    {
      id: 'matrix',
      title: 'Priority Matrix',
      icon: <Scale className="w-4 h-4" />,
      status: { label: 'Feasibility vs Value', tone: 'blue' },
      blocks: [
        {
          kind: 'matrix',
          title: 'Feasibility vs. Business Value Distribution',
          xLabel: 'Feasibility',
          yLabel: 'Business value',
          points: live.map(o => ({
            label: o.name.split(' ').slice(0, 2).join(' '),
            x: o.scores.Feasibility,
            y: o.scores['Business value'],
            highlight: o.id === primary?.id,
          })),
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Opportunity Evaluation',
      icon: <GitCompare className="w-4 h-4" />,
      wide: true,
      status: { label: `${live.length} options evaluated`, tone: 'blue' },
      blocks: [
        {
          kind: 'table',
          title: 'Consolidated Criteria & Ranking Matrix',
          head: ['Rank', 'Opportunity Option', 'Origin', ...CRITERIA, 'Total Score'],
          rows: ranked.map((o, i) => [
            `#${i + 1}`,
            o.name,
            o.origin,
            ...CRITERIA.map(c => o.scores[c]),
            `${total(o)} / 10`,
          ]),
          strongCol: CRITERIA.length + 3,
        },
      ],
    },
    ...(primary
      ? [{
          id: 'brief',
          title: 'Opportunity Brief',
          wide: true,
          icon: <FileText className="w-4 h-4" />,
          status: { label: 'Draft v0.1', tone: 'green' as const },
          blocks: [{
            kind: 'facts' as const,
            title: `Validated Baseline: ${primary.name}`,
            rows: [
              { label: 'Opportunity statement', value: `${primary.concept}${refined[primary.id] ? ` Refinement: ${refined[primary.id]}.` : ''}` },
              { label: 'Target area', value: primary.target },
              { label: 'Value potential', value: primary.value },
              { label: 'Key assumptions', value: primary.assumptions.join('; ') },
              { label: 'Risks', value: primary.risks.join('; ') },
              { label: 'Success criteria', value: primary.success.join('; ') },
            ],
          }],
        }]
      : []),
  ];

  return (
    <DiscoveryDashboard
      phase="Phase 3"
      title="Opportunity Discovery"
      subtitle="Where the validated problem becomes a ranked, selectable opportunity."
      badge={primary ? 'Opportunity Artifact · Draft v0.1' : 'Opportunity Artifact · Not started'}
      kpis={[
        { label: 'Opportunity Options', value: live.length, hint: `${rejected.length} rejected`, icon: <Lightbulb className="w-4 h-4" />, tone: 'purple' },
        { label: 'Top score', value: ranked[0] ? `${total(ranked[0])} / 10` : '—', hint: ranked[0]?.name, icon: <Trophy className="w-4 h-4" />, tone: 'green' },
        { label: 'Primary Option', value: primary ? 'Selected' : 'Pending', hint: primary?.name ?? 'Select one below', icon: <Target className="w-4 h-4" />, tone: primary ? 'green' : 'amber' },
        { label: 'Open risks', value: (focus?.risks.length ?? 0) + (focus?.assumptions.length ?? 0), hint: 'Risks + assumptions to test', icon: <AlertTriangle className="w-4 h-4" />, tone: 'orange' },
      ]}
      cards={cards}
      csuiteStage="opportunity"
      validated={!!primary}
    />
  );
};