import React, { useEffect } from 'react';
import { Download } from 'lucide-react';
import { StageId } from '../../../services/csuite/types';
import { useRGStore } from './RGStore';
import { CheckContext } from './CSuitePanel';
import { ExtraProps, GateDecision, PhaseConfig } from './PhaseStage';

const num = (s: string) => {
  const n = parseFloat((s || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : null;
};

const download = (name: string, content: string, type: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

const btn = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

// ---------- Business Model · calculated only from the user's own figures ----------
const FinanceCalc: React.FC<ExtraProps> = () => {
  const { slots } = useRGStore();
  const val = (id: string) => (slots[id]?.status === 'assumed' ? null : num(slots[id]?.value || ''));
  const cur = slots.bm_currency?.status === 'assumed' ? '' : slots.bm_currency?.value || '';
  const users = val('bm_users'), hours = val('bm_hours'), rate = val('bm_rate'), build = val('bm_build_cost'), running = val('bm_run_cost');
  const savings = users !== null && hours !== null && rate !== null ? users * hours * rate * 52 : null;
  const net = savings !== null && running !== null ? savings - running : null;
  const payback = net !== null && net > 0 && build !== null ? build / (net / 12) : null;
  const fmt = (n: number | null) => (n === null ? '—' : `${cur} ${Math.round(n).toLocaleString()}`.trim());
  const rows = [
    ['Annual time savings', 'users × hours saved per week × hourly cost × 52', fmt(savings)],
    ['Net yearly benefit', 'annual savings − yearly running cost', fmt(net)],
    ['Payback', 'build cost ÷ (net yearly benefit ÷ 12)', payback === null ? '—' : `${payback.toFixed(1)} months`]
  ];
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-900">Calculated from your figures</h3>
      <table className="w-full text-sm">
        <tbody className="divide-y divide-slate-100">
          {rows.map(([label, formula, value]) => (
            <tr key={label}>
              <td className="py-2 text-slate-700">{label}</td>
              <td className="py-2 text-xs text-slate-500">{formula}</td>
              <td className="py-2 text-right font-semibold text-slate-900">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(savings === null || payback === null) && <p className="text-xs text-slate-500">“—” means a figure is missing, an assumption, or the benefit does not cover running cost.</p>}
    </div>
  );
};

// ---------- Requirements · generated from confirmed use cases and constraints ----------
export interface Requirement { id: string; type: 'Functional' | 'Non-functional'; text: string; source: string; decision?: 'Accepted' | 'Rejected' }

const useGeneratedRequirements = (): Requirement[] => {
  const { slots } = useRGStore();
  const known = (id: string) => (slots[id] && slots[id].status !== 'assumed' ? slots[id].value : '');
  const useCases = [known('use_cases'), known('prod_scope')].join(',').split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
  const fr = Array.from(new Set(useCases.map((u) => u.toLowerCase()))).map((u, i) => ({
    id: `FR-${String(i + 1).padStart(3, '0')}`, type: 'Functional' as const, text: `Users can ${u}.`, source: 'Use cases / Product scope'
  }));
  const nfrSources: [string, string][] = [['req_compliance', 'Compliance'], ['req_performance', 'Performance & availability'], ['req_security', 'Security & data']];
  const nfr = nfrSources.filter(([id]) => known(id)).map(([id, label], i) => ({
    id: `NFR-${String(i + 1).padStart(3, '0')}`, type: 'Non-functional' as const, text: known(id), source: label
  }));
  return [...fr, ...nfr];
};

const RequirementsList: React.FC<ExtraProps> = ({ value, onChange, setReady, locked }) => {
  const generated = useGeneratedRequirements();
  const decisions: Record<string, Requirement['decision']> = value || {};
  const allDecided = generated.length > 0 && generated.every((r) => decisions[r.id]);
  const anyAccepted = generated.some((r) => decisions[r.id] === 'Accepted');
  useEffect(() => setReady(allDecided && anyAccepted), [allDecided, anyAccepted, setReady]);
  const decide = (id: string, d: Requirement['decision']) => onChange({ ...decisions, [id]: d });

  if (!generated.length) return <p className="text-sm text-rose-700">No requirements yet · add use cases or product scope above.</p>;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Requirement register</h3>
        {!locked && <button type="button" className={btn} onClick={() => onChange(Object.fromEntries(generated.map((r) => [r.id, 'Accepted'])))}>Accept all</button>}
      </div>
      <ul className="divide-y divide-slate-100">
        {generated.map((r) => (
          <li key={r.id} className="py-2 flex items-start gap-3 text-sm">
            <span className="font-mono text-xs text-slate-500 w-16 shrink-0 pt-0.5">{r.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800">{r.text}</p>
              <p className="text-xs text-slate-500">{r.type} · Source: {r.source}</p>
            </div>
            {locked ? (
              <span className="text-xs font-medium text-slate-600">{decisions[r.id]}</span>
            ) : (
              <div className="flex gap-1 shrink-0">
                {(['Accepted', 'Rejected'] as const).map((d) => (
                  <button key={d} type="button" aria-pressed={decisions[r.id] === d} onClick={() => decide(r.id, d)}
                    className={`px-2 py-1 rounded-md text-xs font-medium cursor-pointer border ${decisions[r.id] === d ? (d === 'Accepted' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800') : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    {d === 'Accepted' ? 'Accept' : 'Reject'}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const useBaseline = () => {
  const { phaseData } = useRGStore();
  const generated = useGeneratedRequirements();
  const decisions = phaseData.requirements?.extra || {};
  return generated.filter((r) => decisions[r.id] === 'Accepted');
};

const confirmedSlots = (slots: ReturnType<typeof useRGStore>['slots'], phase: StageId) =>
  Object.values(slots).filter((s) => s.phase === phase && s.value);

// ---------- Documents · built from confirmed stage outputs and the requirement baseline ----------
const DOCS: { id: string; title: string; phases: StageId[]; reqs: 'none' | 'Functional' | 'all' }[] = [
  { id: 'BRD', title: 'Business Requirements Document', phases: ['idea-understanding', 'problem-discovery', 'opportunity', 'business-model'], reqs: 'none' },
  { id: 'PRD', title: 'Product Requirements Document', phases: ['idea-understanding', 'solution-discovery', 'product-definition'], reqs: 'Functional' },
  { id: 'SRS', title: 'Software Requirements Specification', phases: ['solution-discovery', 'requirements'], reqs: 'all' }
];

const DocumentsList: React.FC<ExtraProps> = () => {
  const { slots, versions } = useRGStore();
  const baseline = useBaseline();
  const build = (doc: (typeof DOCS)[number]) => {
    const lines = [`# ${doc.title}`, `Requirement baseline: v${versions.requirements || 0}`, ''];
    doc.phases.forEach((p) => {
      const items = confirmedSlots(slots, p);
      if (!items.length) return;
      lines.push(`## ${p.replace(/-/g, ' ')} (v${versions[p] || 0})`);
      items.forEach((s) => lines.push(`- **${s.label}:** ${s.value}${s.status === 'assumed' ? ' _(assumption)_' : ''}`));
      lines.push('');
    });
    const reqs = doc.reqs === 'none' ? [] : baseline.filter((r) => doc.reqs === 'all' || r.type === doc.reqs);
    if (reqs.length) {
      lines.push('## Requirements');
      reqs.forEach((r) => lines.push(`- ${r.id} (${r.type}) ${r.text} — source: ${r.source}`));
    }
    return lines.join('\n');
  };
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-900">Generated documents</h3>
      <ul className="divide-y divide-slate-100">
        {DOCS.map((doc) => {
          const sections = doc.phases.filter((p) => confirmedSlots(slots, p).length).length;
          const reqCount = doc.reqs === 'none' ? 0 : baseline.filter((r) => doc.reqs === 'all' || r.type === doc.reqs).length;
          return (
            <li key={doc.id} className="py-2 flex items-center gap-3 text-sm">
              <span className="font-semibold text-slate-900 w-12">{doc.id}</span>
              <span className="flex-1 text-slate-700">{doc.title}<span className="block text-xs text-slate-500">{sections} sections{doc.reqs !== 'none' ? ` · ${reqCount} requirements` : ''}</span></span>
              <button type="button" className={btn} onClick={() => download(`${doc.id}.md`, build(doc), 'text/markdown')}>
                <Download className="w-4 h-4" /> Download
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ---------- Review · checks run against the real stage state ----------
const ReviewChecks: React.FC<ExtraProps> = ({ setReady }) => {
  const { statuses, phaseData, slots } = useRGStore();
  const baseline = useBaseline();
  const gate = (id: StageId) => (phaseData[id]?.decision as GateDecision | undefined)?.value;
  const checks = [
    { label: 'Idea Brief confirmed', ok: statuses['idea-understanding'] === 'Completed' },
    { label: 'Gate 1 approved (Problem)', ok: !!gate('problem-discovery') && gate('problem-discovery') !== 'On hold' },
    { label: 'Gate 2 approved (Business Model)', ok: !!gate('business-model') && gate('business-model') !== 'On hold' },
    { label: 'Requirement baseline has functional requirements', ok: baseline.some((r) => r.type === 'Functional') },
    { label: 'Requirement baseline has non-functional requirements', ok: baseline.some((r) => r.type === 'Non-functional') },
    { label: 'Documents confirmed', ok: statuses.documents === 'Completed' }
  ];
  const failed = checks.filter((c) => !c.ok).length;
  const assumptions = Object.values(slots).filter((s) => s.status === 'assumed');
  useEffect(() => setReady(failed === 0), [failed, setReady]);
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-900">Readiness checks · {failed ? `${failed} failing` : 'all passing'}</h3>
      <ul className="space-y-1 text-sm">
        {checks.map((c) => (
          <li key={c.label} className={c.ok ? 'text-slate-700' : 'text-rose-700'}>{c.ok ? '✓' : '✕'} {c.label}{c.ok ? '' : ' · fix before approval'}</li>
        ))}
      </ul>
      {assumptions.length > 0 && <p className="text-xs text-amber-700">Accepted assumptions: {assumptions.map((a) => a.label).join(', ')}</p>}
    </div>
  );
};

// ---------- Handoff · summary and real export ----------
const HandoffSummary: React.FC<ExtraProps> = () => {
  const { slots, versions, phaseData, statuses } = useRGStore();
  const baseline = useBaseline();
  const gates = (['problem-discovery', 'business-model', 'review'] as StageId[]).map((id, i) => ({
    gate: `Gate ${i + 1}`, decision: (phaseData[id]?.decision as GateDecision | undefined) || null
  }));
  const pkg = { exportedAt: new Date().toISOString(), versions, statuses, gates, requirementBaseline: baseline, context: slots };
  return (
    <div className="space-y-3 text-sm">
      <ul className="space-y-1">
        {gates.map((g) => (
          <li key={g.gate} className="text-slate-700">{g.gate}: {g.decision ? `${g.decision.value}${g.decision.note ? ` · ${g.decision.note}` : ''}` : 'Not decided'}</li>
        ))}
        <li className="text-slate-700">Requirement baseline: v{versions.requirements || 0} · {baseline.length} accepted</li>
      </ul>
      <button type="button" className={btn} onClick={() => download('solution-package.json', JSON.stringify(pkg, null, 2), 'application/json')}>
        <Download className="w-4 h-4" /> Export solution package (JSON)
      </button>
    </div>
  );
};

const users = (v: (id: string) => string) => v('intended_users');

const gateValue = (ctx: CheckContext, id: StageId) => (ctx.phaseData[id]?.decision as GateDecision | undefined)?.value;
const gatePassed = (ctx: CheckContext, id: StageId) => !!gateValue(ctx, id) && gateValue(ctx, id) !== 'On hold';
const acceptedReqs = (ctx: CheckContext, prefix: string) =>
  Object.entries((ctx.phaseData.requirements?.extra || {}) as Record<string, string>).filter(([id, d]) => id.startsWith(prefix) && d === 'Accepted').length;
const netBenefit = (ctx: CheckContext) => {
  const [u, h, r, run] = ['bm_users', 'bm_hours', 'bm_rate', 'bm_run_cost'].map(ctx.num);
  return u === null || h === null || r === null || run === null ? null : u * h * r * 52 - run;
};

export const PHASE_CONFIGS: Partial<Record<StageId, PhaseConfig>> = {
  opportunity: {
    id: 'opportunity',
    outputTitle: 'Market Brief',
    csuite: 'Strategy / market advisory',
    steps: [
      { id: 'domain', label: 'Industry & domain analysis', tag: 'Engine' },
      { id: 'plan', label: 'Plan research (max 3 queries)', tag: 'Engine' },
      { id: 'research', label: 'External market research', tag: 'Research', kind: 'research' }
    ],
    researchQueries: (v) => [
      v('idea') && `market size and adoption: ${v('idea')}`,
      v('intended_users') && `pain points of ${v('intended_users')}${v('opp_market') ? ` in ${v('opp_market')}` : ''}`,
      v('use_cases') && `existing tools for ${v('use_cases')}`
    ],
    slots: [
      { id: 'opp_segments', label: 'Customer segments', derive: users, question: 'Which customer segments is this for?', type: 'multi', options: ['Small businesses', 'Mid-size companies', 'Large enterprises', 'Individual consumers'] },
      { id: 'opp_market', label: 'Target market', question: 'Which market or region will you start in?', reason: 'Needed to scope research', type: 'single', options: ['India', 'United States', 'Europe', 'Global'] },
      { id: 'opp_alternatives', label: 'Current alternatives', question: 'What do people use today instead?', reason: 'Needed for competitive context', type: 'multi', options: ['Email and spreadsheets', 'Paper or manual process', 'An existing software tool', 'Nothing today'] },
      { id: 'opp_assumptions', label: 'Key assumptions', optional: true }
    ],
    executives: [
      {
        role: 'CMO',
        focus: 'Market demand & positioning',
        checks: [
          { label: 'Customer segments defined', test: (c) => c.known('opp_segments') },
          { label: 'Target market defined', test: (c) => c.known('opp_market') },
          { label: 'Current alternatives identified', test: (c) => c.known('opp_alternatives') },
          { label: 'Market claims backed by external research', test: (c) => Object.values(c.slots).some((s) => s.source === 'research') }
        ]
      },
      {
        role: 'CSO',
        focus: 'Strategic fit',
        checks: [
          { label: 'Desired outcome stated', test: (c) => c.known('intended_outcome') },
          { label: 'Context of use defined', test: (c) => c.known('context') }
        ]
      }
    ]
  },
  'problem-discovery': {
    id: 'problem-discovery',
    outputTitle: 'Problem Statement',
    csuite: 'Gate 1 reviewers',
    gate: { name: 'Gate 1', roles: 'CPO + CBO', question: 'Worth solving?' },
    steps: [
      { id: 'kb', label: 'Knowledge & evidence retrieval', tag: 'KB', kind: 'kb' },
      { id: 'gap', label: 'Gap detection', tag: 'Engine' },
      { id: 'root', label: 'Root cause & impact analysis', tag: 'Engine' }
    ],
    slots: [
      { id: 'pb_stakeholder', label: 'Affected stakeholders', derive: users },
      { id: 'pb_pain', label: 'Pain point', derive: (v) => v('problem') },
      { id: 'pb_current', label: 'Current process', question: 'How is this handled today?', reason: 'Needed for root cause', type: 'single', options: ['Email and spreadsheets', 'Paper forms', 'Existing software with workarounds', 'No defined process'] },
      { id: 'pb_impact', label: 'Business impact', question: 'What does this problem cost you today?', reason: 'Add your own figures under Other', type: 'multi', options: ['Staff time lost', 'Delayed payments or decisions', 'Errors and compliance risk', 'Unhappy employees or customers'] },
      { id: 'pb_evidence', label: 'Evidence', question: 'What evidence do you have that this problem is real?', reason: 'Needed to validate the problem', type: 'multi', options: ['Complaints or feedback', 'Audit or review findings', 'Internal data or reports', 'Only our own observation'] },
      { id: 'pb_outcome', label: 'Desired outcome', derive: (v) => v('intended_outcome') }
    ],
    executives: [
      {
        role: 'CPO',
        focus: 'User problem',
        checks: [
          { label: 'Affected stakeholders identified', test: (c) => c.known('pb_stakeholder') },
          { label: 'Pain point stated', test: (c) => c.known('pb_pain') },
          { label: 'Desired outcome stated', test: (c) => c.known('pb_outcome') }
        ]
      },
      {
        role: 'CBO',
        focus: 'Business value',
        checks: [
          { label: 'Current process described', test: (c) => c.known('pb_current') },
          { label: 'Business impact stated', test: (c) => c.known('pb_impact') },
          { label: 'Evidence beyond own observation', test: (c) => c.known('pb_evidence') && c.slots.pb_evidence.value !== 'Only our own observation' }
        ]
      }
    ]
  },
  'solution-discovery': {
    id: 'solution-discovery',
    outputTitle: 'Solution Brief',
    csuite: 'Advisory',
    steps: [
      { id: 'ideate', label: 'Solution ideation', tag: 'Engine' },
      { id: 'skills', label: 'Capability & skills discovery (reuse · extend · build)', tag: 'Skills', kind: 'skills' },
      { id: 'feasibility', label: 'Technical & operational feasibility', tag: 'Engine' }
    ],
    slots: [
      { id: 'sol_objective', label: 'Solution objective', derive: (v) => v('intended_outcome') },
      { id: 'sol_selected', label: 'Selected approach', question: 'Which approach do you want to take?', reason: 'Needed to scope the build', type: 'single', options: ['Mobile app', 'Web application', 'Mobile and web', 'Extend an existing system'] },
      { id: 'sol_integrations', label: 'Integration needs', question: 'Which existing systems must it connect to?', reason: 'Needed for feasibility', type: 'multi', options: ['Accounting / ERP', 'HR system', 'Email and calendar', 'None'] },
      { id: 'sol_constraints', label: 'Constraints', question: 'Any constraints on budget, timeline or platforms?', reason: 'Needed for feasibility', type: 'multi', options: ['Fixed budget', 'Launch deadline', 'Must use existing platforms', 'No major constraints'] }
    ],
    executives: [
      {
        role: 'CTO',
        focus: 'Technical feasibility',
        checks: [
          { label: 'Approach selected', test: (c) => c.known('sol_selected') },
          { label: 'Integration needs identified', test: (c) => c.known('sol_integrations') },
          { label: 'Reusable capabilities found', test: (c) => c.skillsCount > 0 }
        ]
      },
      {
        role: 'CISO',
        focus: 'Security exposure',
        checks: [
          { label: 'Connected systems known (data flows)', test: (c) => c.known('sol_integrations') },
          { label: 'Constraints recorded', test: (c) => c.known('sol_constraints') }
        ]
      }
    ]
  },
  'business-model': {
    id: 'business-model',
    outputTitle: 'Business Model',
    csuite: 'Gate 2 reviewers',
    gate: { name: 'Gate 2', roles: 'CFO + CBO + CSO', question: 'Worth funding?' },
    steps: [
      { id: 'canvas', label: 'Business Model Canvas', tag: 'Engine' },
      { id: 'finance', label: 'Cost, benefit & risk analysis', tag: 'Engine' }
    ],
    slots: [
      { id: 'bm_value', label: 'Value proposition', derive: (v) => v('intended_outcome') },
      { id: 'bm_segments', label: 'Customer segments', derive: (v) => v('opp_segments') || users(v) },
      { id: 'bm_revenue', label: 'Revenue model', question: 'How will this create value?', reason: 'Needed for the business case', type: 'single', options: ['Internal cost savings', 'Subscription', 'Per-transaction fee', 'One-time licence'] },
      { id: 'bm_currency', label: 'Currency', question: 'Which currency should figures use?', reason: 'Needed for all financial figures', type: 'single', options: ['INR', 'USD', 'EUR', 'GBP'] },
      {
        id: 'bm_figures',
        label: 'Financial figures',
        question: 'Enter your own figures',
        reason: 'Used only as entered · nothing is estimated for you',
        type: 'fields',
        fields: [
          { id: 'bm_users', label: 'Number of users', unit: 'people' },
          { id: 'bm_hours', label: 'Hours saved per user', unit: 'hours/week' },
          { id: 'bm_rate', label: 'Hourly cost', unit: '{currency}' },
          { id: 'bm_build_cost', label: 'One-time build cost', unit: '{currency}' },
          { id: 'bm_run_cost', label: 'Yearly running cost', unit: '{currency}' }
        ]
      },
      { id: 'bm_users', label: 'Number of users' },
      { id: 'bm_hours', label: 'Hours saved per user per week' },
      { id: 'bm_rate', label: 'Hourly cost' },
      { id: 'bm_build_cost', label: 'One-time build cost' },
      { id: 'bm_run_cost', label: 'Yearly running cost' },
      { id: 'bm_partners', label: 'Key partners', optional: true },
      { id: 'bm_channels', label: 'Channels', optional: true }
    ],
    Extra: FinanceCalc,
    executives: [
      {
        role: 'CFO',
        focus: 'Financial viability',
        checks: [
          { label: 'All figures entered by you', test: (c) => ['bm_users', 'bm_hours', 'bm_rate', 'bm_build_cost', 'bm_run_cost'].every((id) => c.num(id) !== null) },
          { label: 'Net yearly benefit is positive', test: (c) => (netBenefit(c) ?? 0) > 0 },
          { label: 'Payback can be calculated', test: (c) => (netBenefit(c) ?? 0) > 0 && c.num('bm_build_cost') !== null }
        ]
      },
      {
        role: 'CBO',
        focus: 'Business case',
        checks: [
          { label: 'Revenue model chosen', test: (c) => c.known('bm_revenue') },
          { label: 'Value proposition stated', test: (c) => c.known('bm_value') }
        ]
      },
      {
        role: 'CSO',
        focus: 'Go-to-market',
        checks: [
          { label: 'Customer segments defined', test: (c) => c.known('bm_segments') },
          { label: 'Channels identified', test: (c) => c.known('bm_channels') }
        ]
      }
    ]
  },
  'product-definition': {
    id: 'product-definition',
    outputTitle: 'Product Brief',
    csuite: 'Advisory',
    steps: [
      { id: 'product', label: 'Product definition', tag: 'Engine' },
      { id: 'skills', label: 'Map features to reusable capabilities', tag: 'Skills', kind: 'skills' },
      { id: 'metrics', label: 'Success metrics & acceptance', tag: 'Engine' }
    ],
    slots: [
      { id: 'prod_personas', label: 'Target personas', derive: (v) => v('opp_segments') || users(v) },
      { id: 'prod_scope', label: 'In scope', derive: (v) => v('use_cases') },
      { id: 'prod_out', label: 'Out of scope', question: 'What is out of scope for the first release?', reason: 'Needed to fix scope', type: 'multi', options: ['Integrations with other systems', 'Advanced analytics', 'Offline mode', 'Multiple languages'] },
      { id: 'prod_metrics', label: 'Success metrics', question: 'How will you measure success, and what targets?', reason: 'Type your targets under Other', type: 'multi', options: ['Turnaround time', 'Error rate', 'User adoption', 'Cost per transaction'] }
    ],
    executives: [
      {
        role: 'CPO',
        focus: 'Product scope',
        checks: [
          { label: 'Personas defined', test: (c) => c.known('prod_personas') },
          { label: 'Scope and out-of-scope set', test: (c) => c.known('prod_scope') && c.known('prod_out') },
          { label: 'Success metrics defined', test: (c) => c.known('prod_metrics') }
        ]
      }
    ]
  },
  requirements: {
    id: 'requirements',
    outputTitle: 'Requirement Baseline',
    csuite: 'Advisory',
    steps: [
      { id: 'context', label: 'Requirement context', tag: 'Engine' },
      { id: 'kb', label: 'Policy retrieval', tag: 'KB', kind: 'kb' },
      { id: 'skills', label: 'Skills, policy & capability mapping', tag: 'Skills', kind: 'skills' },
      { id: 'trace', label: 'Traceability & quality check', tag: 'Engine' }
    ],
    slots: [
      { id: 'req_compliance', label: 'Compliance', question: 'Which compliance rules apply?', reason: 'Needed for non-functional requirements', type: 'multi', options: ['GDPR', 'SOC 2', 'ISO 27001', 'Internal policy only'] },
      { id: 'req_performance', label: 'Performance & availability', question: 'What availability do you need?', reason: 'Needed for non-functional requirements', type: 'single', options: ['Business-hours availability', '24×7 availability', 'Fast response on mobile', 'No specific need'] },
      { id: 'req_security', label: 'Security & data', question: 'Any security or data-residency needs?', reason: 'Needed for non-functional requirements', type: 'multi', options: ['Data stays in-country', 'Role-based access', 'Encryption at rest', 'Standard security'] }
    ],
    Extra: RequirementsList,
    executives: [
      {
        role: 'CTO',
        focus: 'Build readiness',
        checks: [
          { label: 'Functional requirements accepted', test: (c) => acceptedReqs(c, 'FR') > 0 },
          { label: 'Performance target set', test: (c) => c.known('req_performance') }
        ]
      },
      {
        role: 'CISO',
        focus: 'Security & compliance',
        checks: [
          { label: 'Compliance rules set', test: (c) => c.known('req_compliance') },
          { label: 'Security needs set', test: (c) => c.known('req_security') },
          { label: 'Non-functional requirements accepted', test: (c) => acceptedReqs(c, 'NFR') > 0 }
        ]
      }
    ]
  },
  documents: {
    id: 'documents',
    outputTitle: 'Document Set',
    csuite: 'Review by document scope',
    steps: [
      { id: 'gen', label: 'Generate BRD · PRD · SRS', tag: 'Engine' },
      { id: 'check', label: 'Consistency & traceability validation', tag: 'Engine' }
    ],
    slots: [{ id: 'doc_owner', label: 'Document owner', question: 'Who owns and approves these documents?', reason: 'Needed for review', type: 'single', options: ['Product owner', 'Business owner', 'Finance head', 'IT / engineering lead'] }],
    Extra: DocumentsList,
    executives: [
      { role: 'CBO', focus: 'BRD', checks: [{ label: 'Problem approved at Gate 1', test: (c) => gatePassed(c, 'problem-discovery') }, { label: 'Business model approved at Gate 2', test: (c) => gatePassed(c, 'business-model') }] },
      { role: 'CPO', focus: 'PRD', checks: [{ label: 'Product brief confirmed', test: (c) => c.statuses['product-definition'] === 'Completed' }] },
      { role: 'CTO', focus: 'SRS', checks: [{ label: 'Requirement baseline confirmed', test: (c) => c.statuses.requirements === 'Completed' }] }
    ]
  },
  review: {
    id: 'review',
    outputTitle: 'Executive Review',
    csuite: 'Gate 3 reviewers',
    gate: { name: 'Gate 3', roles: 'CEO + CTO + CISO', question: 'Ready to build?' },
    steps: [{ id: 'checks', label: 'Run readiness checks', tag: 'Engine' }],
    slots: [],
    Extra: ReviewChecks,
    executives: [
      { role: 'CEO', focus: 'Strategic go / no-go', checks: [{ label: 'Gate 1 approved', test: (c) => gatePassed(c, 'problem-discovery') }, { label: 'Gate 2 approved', test: (c) => gatePassed(c, 'business-model') }] },
      { role: 'CTO', focus: 'Technical readiness', checks: [{ label: 'Functional requirements in baseline', test: (c) => acceptedReqs(c, 'FR') > 0 }, { label: 'Documents confirmed', test: (c) => c.statuses.documents === 'Completed' }] },
      { role: 'CISO', focus: 'Security readiness', checks: [{ label: 'Non-functional requirements in baseline', test: (c) => acceptedReqs(c, 'NFR') > 0 }, { label: 'Security needs recorded', test: (c) => c.known('req_security') }] }
    ]
  },
  handoff: {
    id: 'handoff',
    outputTitle: 'Handoff Package',
    csuite: 'No further approval',
    steps: [
      { id: 'ready', label: 'Handoff readiness', tag: 'Engine' },
      { id: 'impact', label: 'Dependency & change impact check', tag: 'Engine' },
      { id: 'skills', label: 'Skills plan (reuse · extend · build)', tag: 'Skills', kind: 'skills' }
    ],
    slots: [{ id: 'handoff_owner', label: 'Handoff owner', question: 'Who receives and owns the build?', reason: 'Needed for acknowledgment', type: 'single', options: ['IT delivery team', 'External vendor', 'Product team', 'Engineering lead'] }],
    Extra: HandoffSummary
  }
};
