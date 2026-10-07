import React, { useState } from 'react';
import { AlertTriangle, BadgeCheck, UserCircle2, Users, Pencil, Trash2, Plus, X } from 'lucide-react';
import { DiscoveryDashboard, FeatureCardData, Chip } from './DiscoveryDashboard';
import { Button, Input, Textarea } from '../../ui';

export interface PersonaProfile {
  id: string;
  name: string;        // Optional archetype name (e.g. "Arjun")
  role: string;        // Enterprise Role Title (e.g. "Field Sales Rep")
  tag: string;         // e.g. "Primary User", "Secondary User"
  roleDesc: string;    // Role description
  goals: string;
  painPoints: string;
  constraints: string;
}

const INITIAL_PERSONAS: PersonaProfile[] = [
  {
    id: 'p1',
    name: 'Arjun',
    role: 'Field Sales Rep',
    tag: 'Primary User',
    roleDesc: 'Visits 6–8 B2B clients daily on the road',
    goals: 'Get reimbursed quickly and spend maximum time selling',
    painPoints: 'Lost paper receipts, zero visibility into claim approval progress',
    constraints: 'Mobile smartphone only, frequently patchy network connectivity',
  },
  {
    id: 'p2',
    name: 'Meera',
    role: 'Line Manager',
    tag: 'Secondary User',
    roleDesc: 'Manages a distributed team of 10 sales reps',
    goals: 'Approve legitimate claims quickly without manual email chasing',
    painPoints: 'Receipt scans and claim requests scattered across email threads',
    constraints: 'Limited time allocation per claim review',
  },
  {
    id: 'p3',
    name: 'Kabir',
    role: 'Finance Executive',
    tag: 'Secondary User',
    roleDesc: 'Audits compliance and executes expense payouts',
    goals: 'Clean, policy-compliant claims with direct ledger reconciliation',
    painPoints: 'Manual spreadsheet entry, policy breaches, missing thermal slips',
    constraints: 'Strict monthly accounting cut-off dates',
  },
];

export const UserDiscovery: React.FC = () => {
  const [personas, setPersonas] = useState<PersonaProfile[]>(INITIAL_PERSONAS);
  const [editingPersona, setEditingPersona] = useState<PersonaProfile | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSavePersona = (p: PersonaProfile) => {
    if (!p.role.trim()) return;
    if (isAdding) {
      setPersonas(prev => [...prev, { ...p, id: `p_${Date.now()}` }]);
    } else {
      setPersonas(prev => prev.map(x => x.id === p.id ? p : x));
    }
    setEditingPersona(null);
    setIsAdding(false);
  };

  const cards: FeatureCardData[] = [
    {
      id: 'identification',
      title: 'Stakeholder & Buyer Ecosystem',
      icon: <Users className="w-4 h-4" />,
      status: { label: '6 groups', tone: 'blue' },
      blocks: [
        {
          kind: 'facts',
          rows: [
            { label: 'Primary users', value: 'Field sales reps who submit travel and visit expenses.' },
            { label: 'Secondary users', value: 'Line managers who approve; finance staff who audit and pay.' },
            { label: 'Target customers', value: 'Mid-size B2B sales organisations outgrowing spreadsheets.' },
            { label: 'Key buyers', value: 'Head of Sales Operations and Finance Controller.' },
            { label: 'Decision makers', value: 'VP of Sales and Chief Financial Officer (CFO).' },
            { label: 'Influencers', value: 'Top-performing sales reps, IT lead, and internal audit.' },
          ],
        },
      ],
    },
    {
      id: 'validation',
      title: 'Research Basis & Evidence',
      icon: <BadgeCheck className="w-4 h-4" />,
      status: { label: '90% validated', tone: 'green' },
      blocks: [
        {
          kind: 'bars',
          title: 'Empirical Validation Coverage',
          max: 100,
          rows: [
            { label: 'Problem confirmation', value: 90, note: 'Matches validated field-sales problem' },
            { label: 'Need validation', value: 82, note: 'Confirmed across 8 interviews and 120-rep survey' },
            { label: 'Priority validation', value: 70, note: 'Reps prioritize visibility; managers prioritize speed' },
            { label: 'Segment size validation', value: 45, note: 'Active rep count in target markets' },
          ],
        },
        {
          kind: 'list',
          title: 'Key Field Research Findings',
          items: [
            '6 of 8 interviewees lost at least one receipt in the last quarter',
            'Survey data: 71% of field reps wait more than one week for reimbursement',
            'Workflow tension: Managers require compliance auditability, while reps need single-tap speed',
          ],
          tone: 'green',
        },
      ],
    },
    {
      id: 'personas',
      title: 'Validated Customer Personas',
      icon: <UserCircle2 className="w-4 h-4" />,
      wide: true,
      status: { label: `${personas.length} profiles`, tone: 'green' },
      custom: (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[12px] font-semibold text-slate-500">
              Target User Profiles ({personas.length})
            </h4>
            <Button
              size="xs"
              variant="secondary"
              icon={<Plus className="w-3.5 h-3.5 text-blue-600" />}
              onClick={() => {
                setEditingPersona({
                  id: '',
                  name: '',
                  role: '',
                  tag: 'Primary User',
                  roleDesc: '',
                  goals: '',
                  painPoints: '',
                  constraints: '',
                });
                setIsAdding(true);
              }}
              className="text-xs font-bold"
            >
              Add Persona
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {personas.map(p => {
              const displayName = p.name ? `${p.name}, ${p.role}` : p.role;
              return (
                <div key={p.id} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2.5 shadow-2xs hover:border-slate-300 transition-all group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[14.5px] font-semibold text-[#0F172A] block leading-snug">
                        {displayName}
                      </span>
                      {p.name && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Archetype: {p.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Chip tone={p.tag.includes('Primary') ? 'green' : 'blue'}>
                        {p.tag}
                      </Chip>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPersona(p);
                          setIsAdding(false);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit persona"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {personas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPersonas(prev => prev.filter(x => x.id !== p.id))}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete persona"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[12.5px] text-slate-600 pt-1 border-t border-slate-100">
                    <p className="leading-snug">
                      <span className="font-medium text-slate-400 mr-1.5">Role</span>
                      {p.roleDesc}
                    </p>
                    <p className="leading-snug">
                      <span className="font-medium text-slate-400 mr-1.5">Goals</span>
                      {p.goals}
                    </p>
                    <p className="leading-snug">
                      <span className="font-medium text-slate-400 mr-1.5">Pain points</span>
                      {p.painPoints}
                    </p>
                    <p className="leading-snug">
                      <span className="font-medium text-slate-400 mr-1.5">Constraints</span>
                      {p.constraints}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: 'needs_matrix',
      title: 'Customer Pain Points & Needs Matrix',
      icon: <AlertTriangle className="w-4 h-4" />,
      wide: true,
      status: { label: '4 prioritized points', tone: 'amber' },
      blocks: [
        {
          kind: 'chips',
          title: 'Validated Functional & Business Needs',
          items: [
            'On-device camera receipt capture',
            'Live claim status tracking',
            'Pre-submission policy checks',
            'Faster monthly book closing',
            'Reduced manual finance audit hours',
            'Immutable compliance audit trail',
          ],
          tone: 'blue',
        },
        {
          kind: 'table',
          title: 'Pain Points, Severity & Current Workarounds',
          head: ['Pain Point', 'Severity', 'Frequency', 'Root Cause', 'Existing Workaround'],
          rows: [
            ['Lost receipts', 'High', 'Weekly', 'Paper receipts carried on multi-day road trips', 'Photos saved in personal phone gallery'],
            ['No claim status', 'High', 'Every claim', 'Unstructured email-based approval routing', 'Chasing managers via chat and phone calls'],
            ['Manual policy checks', 'Medium', 'Every claim', 'Spend policy documented only in static PDFs', 'Finance manually inspects every line item'],
            ['Slow reimbursement', 'High', 'Monthly', 'Batched monthly payment reconciliation cycles', 'Sales reps pay out of pocket for weeks'],
          ],
          strongCol: 1,
        },
      ],
    },
  ];

  return (
    <>
      <DiscoveryDashboard
        phase="Phase 3"
        title="Customer Discovery"
        subtitle="Identify key user personas, prioritize core pain points, and evaluate field interview evidence."
        badge="Customer Research · Draft v0.1"
        kpis={[
          { label: 'Target Personas', value: `${personas.length} Profiles`, hint: personas.map(p => p.role).slice(0, 3).join(', '), icon: <UserCircle2 className="w-4 h-4" />, tone: 'purple' },
          { label: 'User Interviews', value: '8 Sessions', hint: '4 reps, 2 managers, 2 finance', icon: <Users className="w-4 h-4" />, tone: 'blue' },
          { label: 'Survey Reach', value: '120 Reps', hint: '12 field questions surveyed', icon: <BadgeCheck className="w-4 h-4" />, tone: 'green' },
          { label: 'Problem Validation', value: '90%', hint: 'Empirical problem confirmation', icon: <AlertTriangle className="w-4 h-4" />, tone: 'amber' },
        ]}
        cards={cards}
        csuiteStage="user"
        validated
      />

      {/* Persona Edit / Add Modal */}
      {editingPersona && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {isAdding ? 'Add Target Customer Persona' : 'Edit Persona Profile'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPersona(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role Title (Required)</label>
                  <Input
                    value={editingPersona.role}
                    onChange={e => setEditingPersona({ ...editingPersona, role: e.target.value })}
                    placeholder="e.g. Field Sales Rep"
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Archetype Name (Optional)</label>
                  <Input
                    value={editingPersona.name}
                    onChange={e => setEditingPersona({ ...editingPersona, name: e.target.value })}
                    placeholder="e.g. Arjun (or leave empty)"
                    className="text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">User Category Tag</label>
                <select
                  value={editingPersona.tag}
                  onChange={e => setEditingPersona({ ...editingPersona, tag: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="Primary User">Primary User</option>
                  <option value="Secondary User">Secondary User</option>
                  <option value="Key Buyer">Key Buyer</option>
                  <option value="Decision Maker">Decision Maker</option>
                  <option value="Influencer">Influencer</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Responsibilities</label>
                <Input
                  value={editingPersona.roleDesc}
                  onChange={e => setEditingPersona({ ...editingPersona, roleDesc: e.target.value })}
                  placeholder="e.g. Visits 6–8 B2B clients daily on the road"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Core Goals</label>
                <Input
                  value={editingPersona.goals}
                  onChange={e => setEditingPersona({ ...editingPersona, goals: e.target.value })}
                  placeholder="e.g. Get reimbursed quickly and spend maximum time selling"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Key Pain Points</label>
                <Textarea
                  rows={2}
                  value={editingPersona.painPoints}
                  onChange={e => setEditingPersona({ ...editingPersona, painPoints: e.target.value })}
                  placeholder="e.g. Lost paper receipts, zero visibility into claim approval progress"
                  className="text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operational Constraints</label>
                <Input
                  value={editingPersona.constraints}
                  onChange={e => setEditingPersona({ ...editingPersona, constraints: e.target.value })}
                  placeholder="e.g. Mobile smartphone only, patchy connectivity"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingPersona(null)}
                className="text-xs cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingPersona.role.trim()}
                onClick={() => handleSavePersona(editingPersona)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Save Persona
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


