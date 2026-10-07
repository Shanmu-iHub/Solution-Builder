import React, { useState } from 'react';
import { ArrowLeftRight, ListChecks, Plus, Trash2 } from 'lucide-react';
import { Button, Dialog, Input, Select, Tone, cx } from '../../ui';
import { Block, Chip, FeatureCard, FeatureCardData, KpiTile } from './DiscoveryDashboard';

/* Capabilities of each recommended solution in Solution Discovery.
 * The list changes with the selected solution; every capability opens a feature-list dashboard.
 * Demo data for the expense-claims project. */

export type Fit = 'Out of the box' | 'Configure' | 'Custom build';
export type Priority = 'Must' | 'Should' | 'Could';
export type Complexity = 'Low' | 'Medium' | 'High';
export type CapFeature = [name: string, description: string, priority: Priority, complexity: Complexity];

export interface Capability {
  id: string;
  t: string;
  rc: string;
  fit: Fit;
  effort: string;
  /** 0–10 scores */
  coverage: number; value: number; confidence: number;
  users: string[];
  trigger: string;
  features: CapFeature[];
  /** one-line scope statement and what is in / out of scope */
  scope: string;
  inScope: string[];
  outScope: string[];
  /** added by the user rather than part of the suggested solution */
  custom?: boolean;
  deps: string[];
  metrics: string[];
  risks: string[];
}

const RC_CAPTURE = 'No capture at the point of purchase';
const RC_QUEUE = 'Approval has no tracked queue or reminders';
const RC_LINK = 'No link between approval and the finance system';

type RawCapability = Omit<Capability, 'scope' | 'inScope' | 'outScope' | 'custom'>;

const RAW_CAPS: Record<string, RawCapability[]> = {
  sol_custom: [
    {
      id: 'c_capture', t: 'Mobile camera capture', rc: RC_CAPTURE, fit: 'Custom build', effort: '3–4 weeks', coverage: 9, value: 9, confidence: 8,
      users: ['Field sales reps'], trigger: 'Rep pays for something and opens the app',
      features: [
        ['Receipt photo capture', 'Take a photo with edge detection and auto-crop.', 'Must', 'Low'],
        ['Offline queue', 'Save receipts without signal and upload later.', 'Must', 'Medium'],
        ['Multi-receipt claim', 'Group several receipts into one trip claim.', 'Should', 'Medium'],
        ['Gallery import', 'Pick an existing photo from the phone.', 'Could', 'Low'],
      ],
      deps: ['Camera and storage permissions', 'Secure file storage'], metrics: ['90% of claims start from mobile', 'Under 30 seconds to capture'], risks: ['Poor photos in low light', 'Large images on weak networks'],
    },
    {
      id: 'c_extract', t: 'AI data extraction', rc: RC_CAPTURE, fit: 'Custom build', effort: '4–5 weeks', coverage: 8, value: 8, confidence: 7,
      users: ['Field sales reps', 'Finance team'], trigger: 'A receipt photo is uploaded',
      features: [
        ['Field reading', 'Read merchant, date, amount and tax from the receipt.', 'Must', 'Medium'],
        ['Category suggestion', 'Suggest an expense category from the merchant.', 'Should', 'Medium'],
        ['Duplicate detection', 'Flag the same receipt submitted twice.', 'Should', 'High'],
        ['Confidence score', 'Show low-confidence fields for the rep to confirm.', 'Must', 'Low'],
      ],
      deps: ['Receipt-reading (OCR) provider', 'Category mapping from finance'], metrics: ['95% field accuracy on clear receipts', 'Under 10% manual corrections'], risks: ['Accuracy on handwritten receipts', 'Per-document provider cost'],
    },
    {
      id: 'c_queue', t: 'Manager approval queue', rc: RC_QUEUE, fit: 'Custom build', effort: '3–4 weeks', coverage: 9, value: 8, confidence: 8,
      users: ['Line managers'], trigger: 'A rep submits a claim',
      features: [
        ['Single approval queue', 'One list of pending claims per manager.', 'Must', 'Low'],
        ['Approve / query / reject', 'Decide in one tap with a comment.', 'Must', 'Low'],
        ['Reminders and escalation', 'Nudge after 2 days, escalate after 5.', 'Should', 'Medium'],
        ['Delegation', 'Hand approvals to a deputy while on leave.', 'Could', 'Medium'],
      ],
      deps: ['Org hierarchy (manager lookup)', 'Email / chat notifications'], metrics: ['Median approval under 1 day', 'Zero claims untouched after 5 days'], risks: ['Org data out of date', 'Managers ignoring notifications'],
    },
    {
      id: 'c_status', t: 'Claim status tracking', rc: RC_QUEUE, fit: 'Custom build', effort: '2 weeks', coverage: 7, value: 8, confidence: 9,
      users: ['Field sales reps'], trigger: 'Rep wonders where a claim is',
      features: [
        ['Live status timeline', 'Submitted, approved, paid with timestamps.', 'Must', 'Low'],
        ['Push notifications', 'Notify on every status change.', 'Should', 'Low'],
        ['Rejection reasons', 'Show why a claim was queried or rejected.', 'Must', 'Low'],
      ],
      deps: ['Status events from approval and finance'], metrics: ['Status-chasing messages down 80%'], risks: ['Status lags if finance sync is delayed'],
    },
    {
      id: 'c_export', t: 'SAP Concur export', rc: RC_LINK, fit: 'Configure', effort: '2–3 weeks', coverage: 8, value: 7, confidence: 6,
      users: ['Finance team'], trigger: 'A claim is approved',
      features: [
        ['Approved-claim export', 'Send approved claims to the finance system.', 'Must', 'Medium'],
        ['Field mapping', 'Map categories and cost centres.', 'Must', 'Medium'],
        ['Export log and retry', 'See failures and retry safely.', 'Should', 'Medium'],
      ],
      deps: ['Concur API access', 'Cost centre master data'], metrics: ['Zero re-keying by finance'], risks: ['Target finance system still not confirmed'],
    },
  ],
  sol_concur: [
    {
      id: 'k_capture', t: 'Standard receipt capture', rc: RC_CAPTURE, fit: 'Out of the box', effort: '1 week', coverage: 8, value: 8, confidence: 9,
      users: ['Field sales reps'], trigger: 'Rep opens the Concur mobile app',
      features: [
        ['Receipt photo and reading', 'Built-in capture with automatic field reading.', 'Must', 'Low'],
        ['Mobile expense entry', 'Create and submit claims on the phone.', 'Must', 'Low'],
        ['Card transaction match', 'Match receipts to card spend.', 'Should', 'Low'],
      ],
      deps: ['Concur licences for all reps', 'SSO setup'], metrics: ['Adoption above 85% in 60 days'], risks: ['Generic flow, not tuned for field trips'],
    },
    {
      id: 'k_flow', t: 'Standard approval workflow', rc: RC_QUEUE, fit: 'Out of the box', effort: '1–2 weeks', coverage: 8, value: 8, confidence: 9,
      users: ['Line managers'], trigger: 'A claim is submitted',
      features: [
        ['Manager approval inbox', 'Pending claims in app and email.', 'Must', 'Low'],
        ['Multi-level routing', 'Route by amount or department.', 'Should', 'Medium'],
        ['Automatic reminders', 'Built-in nudges and escalation.', 'Should', 'Low'],
      ],
      deps: ['HR feed for the approval hierarchy'], metrics: ['Median approval under 2 days'], risks: ['Routing rules need admin setup'],
    },
    {
      id: 'k_policy', t: 'Policy rules and audit', rc: RC_QUEUE, fit: 'Configure', effort: '2 weeks', coverage: 7, value: 7, confidence: 8,
      users: ['Finance team'], trigger: 'A claim breaks a spend rule',
      features: [
        ['Spend policy rules', 'Limits per category and role.', 'Must', 'Medium'],
        ['Audit trail', 'Full history of changes and decisions.', 'Must', 'Low'],
        ['Exception flags', 'Highlight out-of-policy claims.', 'Should', 'Low'],
      ],
      deps: ['Written policy owned by finance'], metrics: ['Out-of-policy claims caught before payment'], risks: ['Policy wording not rule-ready'],
    },
    {
      id: 'k_erp', t: 'Native finance integration', rc: RC_LINK, fit: 'Out of the box', effort: '2–3 weeks', coverage: 9, value: 8, confidence: 8,
      users: ['Finance team'], trigger: 'A claim is approved',
      features: [
        ['Direct posting', 'Approved claims flow into the ledger.', 'Must', 'Medium'],
        ['Reimbursement run', 'Batch payments from approved claims.', 'Should', 'Medium'],
      ],
      deps: ['Finance system connector licence'], metrics: ['Zero manual re-keying'], risks: ['Licence cost grows with users'],
    },
    {
      id: 'k_trip', t: 'Field-sales trip tagging', rc: RC_CAPTURE, fit: 'Configure', effort: '3–4 weeks', coverage: 5, value: 6, confidence: 5,
      users: ['Field sales reps'], trigger: 'Rep logs spend during a client trip',
      features: [
        ['Trip and client tags', 'Attach spend to a trip or account.', 'Should', 'Medium'],
        ['Mileage capture', 'Log distance for visits.', 'Could', 'High'],
      ],
      deps: ['CRM account list'], metrics: ['Spend visible per client visit'], risks: ['Limited customisation in the standard product'],
    },
  ],
  sol_power: [
    {
      id: 'p_scan', t: 'PowerApps receipt scan', rc: RC_CAPTURE, fit: 'Configure', effort: '2–3 weeks', coverage: 7, value: 8, confidence: 7,
      users: ['Field sales reps'], trigger: 'Rep opens the claims app',
      features: [
        ['Camera capture screen', 'Photograph a receipt in the app.', 'Must', 'Low'],
        ['Form reading (AI Builder)', 'Read receipt fields into the claim.', 'Must', 'Medium'],
        ['Draft and submit', 'Save a draft and submit when ready.', 'Should', 'Low'],
      ],
      deps: ['Microsoft 365 licences', 'AI Builder credits'], metrics: ['80% of claims created from a scan'], risks: ['Reading accuracy needs tuning', 'Credit limits'],
    },
    {
      id: 'p_teams', t: 'Teams approval flow', rc: RC_QUEUE, fit: 'Out of the box', effort: '1–2 weeks', coverage: 8, value: 8, confidence: 9,
      users: ['Line managers'], trigger: 'A claim is submitted',
      features: [
        ['Approval card in Teams', 'Approve or reject from a Teams message.', 'Must', 'Low'],
        ['Email fallback', 'Same approval by email.', 'Should', 'Low'],
        ['Escalation after delay', 'Move to a deputy after two days.', 'Should', 'Medium'],
      ],
      deps: ['Teams for all managers'], metrics: ['Median approval under 1 day'], risks: ['Managers outside Teams'],
    },
    {
      id: 'p_track', t: 'Claim tracker', rc: RC_QUEUE, fit: 'Configure', effort: '2 weeks', coverage: 6, value: 7, confidence: 8,
      users: ['Field sales reps', 'Finance team'], trigger: 'Anyone checks a claim',
      features: [
        ['Claims list with status', 'Each rep sees their claims and status.', 'Must', 'Low'],
        ['Finance overview', 'All claims by state for finance.', 'Should', 'Medium'],
      ],
      deps: ['Dataverse or SharePoint list'], metrics: ['Status questions down 70%'], risks: ['Limited reporting without extra tooling'],
    },
    {
      id: 'p_export', t: 'Finance export flow', rc: RC_LINK, fit: 'Custom build', effort: '3–4 weeks', coverage: 6, value: 7, confidence: 5,
      users: ['Finance team'], trigger: 'A claim is approved',
      features: [
        ['Approved-claim export', 'Push approved claims to a file or API.', 'Must', 'Medium'],
        ['Error handling', 'Retry and alert on failed exports.', 'Should', 'High'],
      ],
      deps: ['Finance system interface (not confirmed)'], metrics: ['Zero manual re-keying'], risks: ['Connector may not exist for the target system'],
    },
  ],
};


const SCOPE: Record<string, { scope: string; inScope: string[]; outScope: string[] }> = {
  c_capture: { scope: "Photograph and upload receipts from the rep's phone, including without signal.", inScope: ['iOS and Android app capture', 'Offline queue and upload', 'Multi-receipt trip claims'], outScope: ['Desktop or scanner upload', 'Card-statement import', 'Editing a receipt after submit'] },
  c_extract: { scope: 'Read receipt fields automatically and flag the doubtful ones.', inScope: ['Merchant, date, amount and tax reading', 'Category suggestion', 'Low-confidence flags'], outScope: ['Handwritten receipts', 'Reading full invoices', 'Fraud detection'] },
  c_queue: { scope: 'One approval queue for line managers, with decisions and reminders.', inScope: ['Single pending-claims list', 'Approve, query or reject with a comment', 'Reminders and escalation'], outScope: ['Multi-level approval chains', 'Budget-holder checks', 'Approval by email reply'] },
  c_status: { scope: 'Show reps where every claim is and why.', inScope: ['Status timeline', 'Push notifications', 'Rejection reasons'], outScope: ['Payment-date prediction', 'Finance-side reporting', 'Chat with the approver'] },
  c_export: { scope: 'Send approved claims to the finance system reliably.', inScope: ['Approved-claim export', 'Category and cost-centre mapping', 'Failure log and retry'], outScope: ['Two-way sync of finance data', 'Posting claims that are not approved', 'Payment execution'] },
  k_capture: { scope: 'Use the standard mobile app for capture and claim entry.', inScope: ['Receipt photo and reading', 'Mobile claim entry', 'Card transaction matching'], outScope: ['Offline-first capture', 'Field-trip specific workflows', 'Custom screens'] },
  k_flow: { scope: 'Use the standard approval workflow for managers.', inScope: ['Manager approval inbox', 'Routing by amount or department', 'Automatic reminders'], outScope: ['Custom approval screens', 'Cross-system approvals', 'Delegation beyond the standard rules'] },
  k_policy: { scope: 'Configure spend rules and keep an audit trail.', inScope: ['Spend limits per category and role', 'Audit trail', 'Exception flags'], outScope: ['AI anomaly detection', 'Policy authoring for non-admins', 'Re-auditing past claims'] },
  k_erp: { scope: 'Post approved claims to the ledger with the native connector.', inScope: ['Direct posting', 'Reimbursement run'], outScope: ['A second finance system', 'Custom mappings beyond the standard', 'Real-time balances'] },
  k_trip: { scope: 'Tag spend to trips and clients inside the standard product.', inScope: ['Trip and client tags', 'Mileage capture (stretch)'], outScope: ['Itinerary planning', 'CRM write-back', 'Custom visit reports'] },
  p_scan: { scope: 'Scan receipts in a PowerApps app and read the fields.', inScope: ['Camera capture screen', 'Form reading', 'Draft and submit'], outScope: ['Offline mode', 'Multi-currency handling', 'Handwritten receipts'] },
  p_teams: { scope: 'Approve claims inside Teams or by email.', inScope: ['Approval card in Teams', 'Email fallback', 'Escalation after a delay'], outScope: ['Other chat tools', 'Mobile push outside Teams', 'Multi-level chains'] },
  p_track: { scope: 'Give reps and finance a list of claims and their state.', inScope: ['Claims list with status', 'Finance overview'], outScope: ['Advanced analytics', 'Forecasting', 'Exports to BI tools'] },
  p_export: { scope: 'Push approved claims to the finance system with a flow.', inScope: ['Approved-claim export', 'Error handling and retry'], outScope: ['Real-time sync', 'Claims that are not approved', 'Payment execution'] },
};

export const CAPS_BY_PACKAGE: Record<string, Capability[]> = Object.fromEntries(
  Object.entries(RAW_CAPS).map(([pkg, caps]) => [pkg, caps.map(c => ({ ...c, ...SCOPE[c.id] }))]),
);

export const ROOT_CAUSES = [RC_CAPTURE, RC_QUEUE, RC_LINK];

/** A capability the user adds themselves; features and scope are filled in from its popup. */
export const newCustomCapability = (id: string, t: string, rc: string): Capability => ({
  id, t, rc, fit: 'Custom build', effort: 'To estimate', coverage: 5, value: 5, confidence: 5,
  users: [], trigger: 'To be defined', features: [], scope: '', inScope: [], outScope: [], deps: [], metrics: [], risks: [], custom: true,
});

/** What the user changed inside a capability; stored with the project. */
export interface CapabilityEdit { inScope: string[]; outScope: string[]; features: CapFeature[] }

export const applyEdit = (cap: Capability, edit?: CapabilityEdit): Capability => (edit ? { ...cap, ...edit } : cap);

export const rootCausesCovered = (caps: Capability[]) => new Set(caps.map(c => c.rc)).size;

const PRIO_TONE: Record<Priority, string> = { Must: 'Must have', Should: 'Should have', Could: 'Could have' };

export const FitBadge: React.FC<{ fit: Fit }> = ({ fit }) => <Chip>{fit}</Chip>;

export const CapabilityCard: React.FC<{ cap: Capability; onOpen: () => void }> = ({ cap, onOpen }) => (
  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <span className="block text-[14.5px] font-bold text-[#0F172A]">{cap.t}</span>
        <span className="block text-[12.5px] text-slate-500 mt-0.5">Fixes: <span className="font-semibold text-slate-700">{cap.rc}</span></span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">{cap.custom && <Chip>Added by you</Chip>}<FitBadge fit={cap.fit} /></div>
    </div>
    <div className="flex flex-wrap items-center gap-1.5">
      <Chip>{cap.features.length} features</Chip>
      <Chip>{cap.inScope.length} in scope</Chip>
      <Chip>{cap.outScope.length} out of scope</Chip>
      <Chip>{cap.effort}</Chip>
    </div>
    <div><Button size="xs" icon={<ListChecks className="w-3.5 h-3.5" />} onClick={onOpen}>View scope and features</Button></div>
  </div>
);

/* ── editors ────────────────────────────────────────────────────────────── */

const AddRow: React.FC<{ placeholder: string; onAdd: (text: string) => void }> = ({ placeholder, onAdd }) => {
  const [text, setText] = useState('');
  const submit = () => { const t = text.trim(); if (!t) return; onAdd(t); setText(''); };
  return (
    <div className="flex gap-2 mt-3">
      <Input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder={placeholder} />
      <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} disabled={!text.trim()} onClick={submit}>Add</Button>
    </div>
  );
};

const ScopeList: React.FC<{
  title: string; tone: 'green' | 'red'; items: string[]; empty: string; placeholder: string; moveLabel: string;
  onAdd: (t: string) => void; onRemove: (i: number) => void; onMove: (i: number) => void;
}> = ({ title, tone, items, empty, placeholder, moveLabel, onAdd, onRemove, onMove }) => (
  <div className={cx('rounded-lg border border-slate-200 p-4', tone === 'green' ? 'bg-white' : 'bg-slate-50/60')}>
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-[13px] font-semibold text-[#0F172A]">{title}</h4>
      <Chip>{items.length}</Chip>
    </div>
    {items.length === 0 ? <p className="text-[13px] text-slate-400 italic">{empty}</p> : (
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={`${it}-${i}`} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <span className="flex-1 min-w-0 text-[13.5px] text-slate-700 leading-snug">{it}</span>
            <button type="button" title={moveLabel} onClick={() => onMove(i)} className="p-1 rounded text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 cursor-pointer"><ArrowLeftRight className="w-3.5 h-3.5" /></button>
            <button type="button" title="Remove" onClick={() => onRemove(i)} className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
          </li>
        ))}
      </ul>
    )}
    <AddRow placeholder={placeholder} onAdd={onAdd} />
  </div>
);

const ScopeEditor: React.FC<{ cap: Capability; onEdit: (e: CapabilityEdit) => void }> = ({ cap, onEdit }) => {
  const edit = (patch: Partial<CapabilityEdit>) => onEdit({ inScope: cap.inScope, outScope: cap.outScope, features: cap.features, ...patch });
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Scope</p>
        <p className="text-[14.5px] text-[#0F172A] leading-relaxed">{cap.scope || <span className="text-slate-400 italic">No scope statement yet. List what is in and out of scope below.</span>}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ScopeList title="In scope" tone="green" items={cap.inScope} empty="Nothing in scope yet." placeholder="Add something in scope" moveLabel="Move to out of scope"
          onAdd={t => edit({ inScope: [...cap.inScope, t] })}
          onRemove={i => edit({ inScope: cap.inScope.filter((_, x) => x !== i) })}
          onMove={i => edit({ inScope: cap.inScope.filter((_, x) => x !== i), outScope: [...cap.outScope, cap.inScope[i]] })} />
        <ScopeList title="Out of scope" tone="red" items={cap.outScope} empty="Nothing excluded yet." placeholder="Add something out of scope" moveLabel="Move to in scope"
          onAdd={t => edit({ outScope: [...cap.outScope, t] })}
          onRemove={i => edit({ outScope: cap.outScope.filter((_, x) => x !== i) })}
          onMove={i => edit({ outScope: cap.outScope.filter((_, x) => x !== i), inScope: [...cap.inScope, cap.outScope[i]] })} />
      </div>
    </div>
  );
};

const PRIORITIES: Priority[] = ['Must', 'Should', 'Could'];
const COMPLEXITIES: Complexity[] = ['Low', 'Medium', 'High'];

const FeatureEditor: React.FC<{ cap: Capability; onEdit: (e: CapabilityEdit) => void }> = ({ cap, onEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Should');
  const [complexity, setComplexity] = useState<Complexity>('Medium');
  const save = (features: CapFeature[]) => onEdit({ inScope: cap.inScope, outScope: cap.outScope, features });
  const add = () => {
    if (!name.trim()) return;
    save([...cap.features, [name.trim(), description.trim() || 'Added by you.', priority, complexity]]);
    setName(''); setDescription('');
  };
  return (
    <div className="space-y-4">
      {cap.features.length === 0 ? <p className="text-[13px] text-slate-400 italic">No features yet. Add the first one below.</p> : (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-[13px] text-left">
            <thead className="bg-slate-50 text-slate-500"><tr>{['Feature', 'What it does', 'Priority', 'Complexity', ''].map((h, i) => <th key={i} className="px-3 py-2 font-bold text-[11.5px] uppercase tracking-wider whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {cap.features.map((f, i) => (
                <tr key={`${f[0]}-${i}`} className="bg-white">
                  <td className="px-3 py-2 font-semibold text-[#0F172A] align-top">{f[0]}</td>
                  <td className="px-3 py-2 text-slate-700 align-top">{f[1]}</td>
                  <td className="px-3 py-2 font-bold text-[#0F172A] align-top whitespace-nowrap">{PRIO_TONE[f[2]]}</td>
                  <td className="px-3 py-2 text-slate-700 align-top">{f[3]}</td>
                  <td className="px-2 py-2 align-top"><button type="button" title="Remove feature" onClick={() => save(cap.features.filter((_, x) => x !== i))} className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
        <p className="text-[12px] font-semibold text-slate-500 mb-2">Add a feature</p>
        <div className="grid md:grid-cols-[1fr_1.4fr_150px_120px_auto] gap-2 items-center">
          <Input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Feature name" />
          <Input value={description} onChange={e => setDescription(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="What it does (optional)" />
          <Select value={priority} onChange={e => setPriority(e.target.value as Priority)}>{PRIORITIES.map(p => <option key={p} value={p}>{PRIO_TONE[p]}</option>)}</Select>
          <Select value={complexity} onChange={e => setComplexity(e.target.value as Complexity)}>{COMPLEXITIES.map(c => <option key={c} value={c}>{c}</option>)}</Select>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} disabled={!name.trim()} onClick={add}>Add</Button>
        </div>
      </div>
    </div>
  );
};

/* ── dialog ─────────────────────────────────────────────────────────────── */

export const CapabilityDialog: React.FC<{ cap: Capability | null; packageName: string; onClose: () => void; onEdit: (e: CapabilityEdit) => void }> = ({ cap, packageName, onClose, onEdit }) => {
  const must = cap ? cap.features.filter(f => f[2] === 'Must').length : 0;
  const cards: FeatureCardData[] = [];
  if (cap) {
    cards.push(
      { id: 'scope', title: 'Scope', wide: true, status: { label: `${cap.inScope.length} in · ${cap.outScope.length} out`, tone: 'blue' }, custom: <ScopeEditor cap={cap} onEdit={onEdit} /> },
      { id: 'features', title: 'Features', wide: true, status: { label: `${cap.features.length} features`, tone: 'blue' }, custom: <FeatureEditor cap={cap} onEdit={onEdit} /> },
      {
        id: 'fit', title: 'Fit and confidence', status: { label: cap.fit, tone: 'slate' },
        blocks: [{ kind: 'bars', title: `How well ${packageName} delivers this`, rows: [{ label: 'Root-cause coverage', value: cap.coverage, note: cap.rc }, { label: 'User value', value: cap.value }, { label: 'Delivery confidence', value: cap.confidence }] }],
      },
    );
    const userBlocks: Block[] = [];
    if (cap.users.length) userBlocks.push({ kind: 'chips', title: 'Used by', items: cap.users, tone: 'blue' });
    userBlocks.push({ kind: 'facts', rows: [{ label: 'Starts when', value: cap.trigger }] });
    cards.push({ id: 'users', title: 'Users and trigger', blocks: userBlocks });
    if (cap.deps.length) cards.push({ id: 'deps', title: 'Dependencies', status: { label: `${cap.deps.length}`, tone: 'slate' }, blocks: [{ kind: 'list', title: 'Needs in place', items: cap.deps, tone: 'blue' }] });
    const mr: Block[] = [];
    if (cap.metrics.length) mr.push({ kind: 'list', title: 'How we will know it works', items: cap.metrics, tone: 'green' });
    if (cap.risks.length) mr.push({ kind: 'list', title: 'Risks', items: cap.risks, tone: 'amber' });
    if (mr.length) cards.push({ id: 'metrics', title: 'Success measures and risks', blocks: mr });
  }

  return (
    <Dialog
      open={!!cap}
      onClose={onClose}
      width="max-w-6xl"
      title={cap?.t ?? ''}
      subtitle={cap ? `${packageName} · fixes “${cap.rc}”` : undefined}
      footer={<Button onClick={onClose}>Done</Button>}
    >
      {cap && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Features" value={cap.features.length} hint={`${must} must-have`} />
            <KpiTile label="Scope" value={`${cap.inScope.length} in / ${cap.outScope.length} out`} hint="Items in and out of scope" />
            <KpiTile label="Effort" value={cap.effort} hint="Estimate to first release" />
            <KpiTile label="Fit" value={cap.fit} hint={`vs ${packageName}`} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
            {cards.map((c, i) => <FeatureCard key={c.id} card={c} index={i} />)}
          </div>
        </div>
      )}
    </Dialog>
  );
};
