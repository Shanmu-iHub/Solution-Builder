import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, Check, Sparkles, Smartphone, 
  Users, Workflow, ShieldCheck, Clock, CheckCheck, Compass, 
  Layers, Zap, Lock, RefreshCw, BarChart3, UserCheck, Briefcase,
  Pencil, Trash2, Plus, X
} from 'lucide-react';
import { Button, Input, Textarea, cx } from '../../ui';
import { usePlanning } from '../PlanningStore';

interface ProductPersona {
  id: string;
  role: string;
  tag: string;
  needs: string;
  icon?: string;
}

interface ProductCapability {
  id: string;
  name: string;
  desc: string;
  color: string;
}

const DEFAULT_PERSONAS: ProductPersona[] = [
  {
    id: 'per-1',
    role: 'Field Rep',
    tag: 'Primary User',
    needs: 'Submit expense receipts quickly on the road and receive reimbursement without loose paperwork or manual spreadsheets.',
    icon: 'Smartphone',
  },
  {
    id: 'per-2',
    role: 'Sales Manager',
    tag: 'Primary Approver',
    needs: 'Approve team expenses efficiently in a single triage queue with budget compliance visibility and 48-hour reminders.',
    icon: 'UserCheck',
  },
  {
    id: 'per-3',
    role: 'Finance Approver',
    tag: 'Secondary',
    needs: 'Process verified claims accurately with standardized data feeds and automated posting into enterprise accounting.',
    icon: 'Briefcase',
  },
  {
    id: 'per-4',
    role: 'Mobile Ops Lead',
    tag: 'Secondary',
    needs: 'Ensure the mobile application is securely adopted, updated via enterprise MDM, and operates reliably in the field.',
    icon: 'Workflow',
  },
];

const DEFAULT_CAPABILITIES: ProductCapability[] = [
  {
    id: 'cap-1',
    name: 'Photo Capture',
    desc: 'Enable reps to take receipt images on smartphones with auto-edge detection.',
    color: 'bg-blue-500',
  },
  {
    id: 'cap-2',
    name: 'OCR Extraction',
    desc: 'Automatically read date, amount, vendor, and tax from captured receipt images.',
    color: 'bg-purple-500',
  },
  {
    id: 'cap-3',
    name: 'Form Auto-Populate',
    desc: 'Fill claim fields with extracted data to eliminate tedious manual typing.',
    color: 'bg-emerald-500',
  },
  {
    id: 'cap-4',
    name: 'Workflow Integration',
    desc: 'Route claims directly to managers with automated SLA reminders & escalation.',
    color: 'bg-amber-500',
  },
  {
    id: 'cap-5',
    name: 'Offline Sync',
    desc: 'Store receipts securely offline and auto-sync when cellular signal returns.',
    color: 'bg-indigo-500',
  },
  {
    id: 'cap-6',
    name: 'Security & Compliance',
    desc: 'Protect receipt imagery with AES-256 encryption and immutable audit logs.',
    color: 'bg-rose-500',
  },
];

const DEFAULT_IN_SCOPE = [
  'Provides mobile receipt capture for field sales reps',
  'Uses AI OCR to extract receipt details automatically',
  'Auto-populates expense forms and routes through approval workflow',
  'Allows offline receipt capture with background auto-sync',
  'Implements security controls and compliance audit trails',
  'Distribution via internal MDM and corporate intranet',
  'Includes onboarding training, help-desk support & in-app guides',
];

const DEFAULT_OUT_SCOPE = [
  'Does not replace the existing core expense ledger system',
  'Does not develop a custom proprietary OCR engine (uses cloud service)',
  'Does not store, scan, or manage physical paper receipts',
  'Does not alter standard corporate manager approval hierarchies',
  'Does not ingest personal non-corporate credit card statements',
  'Does not handle direct bank wire reimbursement disbursement',
];

export const ProductDefinition: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onComplete: () => void 
}> = ({ projectId, projectName, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

  const [personas, setPersonas] = useState<ProductPersona[]>(DEFAULT_PERSONAS);
  const [capabilities, setCapabilities] = useState<ProductCapability[]>(DEFAULT_CAPABILITIES);
  const [inScope, setInScope] = useState<string[]>(DEFAULT_IN_SCOPE);
  const [outScope, setOutScope] = useState<string[]>(DEFAULT_OUT_SCOPE);

  // Submodal editing states
  const [editingPersona, setEditingPersona] = useState<ProductPersona | null>(null);
  const [editingCap, setEditingCap] = useState<ProductCapability | null>(null);
  const [editingDeliverable, setEditingDeliverable] = useState<{ type: 'in' | 'out'; index?: number; text: string } | null>(null);

  const handleSavePersona = (p: ProductPersona) => {
    if (!p.role.trim()) return;
    if (personas.some(x => x.id === p.id)) {
      setPersonas(prev => prev.map(x => x.id === p.id ? p : x));
    } else {
      setPersonas(prev => [...prev, { ...p, id: `per-${Date.now()}` }]);
    }
    setEditingPersona(null);
  };

  const handleSaveCapability = (c: ProductCapability) => {
    if (!c.name.trim()) return;
    if (capabilities.some(x => x.id === c.id)) {
      setCapabilities(prev => prev.map(x => x.id === c.id ? c : x));
    } else {
      setCapabilities(prev => [...prev, { ...c, id: `cap-${Date.now()}` }]);
    }
    setEditingCap(null);
  };

  const handleSaveDeliverable = () => {
    if (!editingDeliverable || !editingDeliverable.text.trim()) return;
    const { type, index, text } = editingDeliverable;
    if (type === 'in') {
      if (index !== undefined) {
        setInScope(prev => prev.map((item, i) => i === index ? text.trim() : item));
      } else {
        setInScope(prev => [...prev, text.trim()]);
      }
    } else {
      if (index !== undefined) {
        setOutScope(prev => prev.map((item, i) => i === index ? text.trim() : item));
      } else {
        setOutScope(prev => [...prev, text.trim()]);
      }
    }
    setEditingDeliverable(null);
  };

  const confirm = () => {
    patch(projectId, { 
      productDefinitionConfirmed: true, 
      discoveryPage: 'requirements' 
    });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#0F172A]">Product Definition</h1>
          <p className="text-xs text-slate-500">
            Product specification.
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Step 6 · Product Definition</span>
          </span>
        </div> */}
      </div>

      {/* Main Workspace (Full-Width, Simplified & Clean) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* 1. PRODUCT OVERVIEW (Dark Hero Card) */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Product Overview 
            </span>

            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 shadow-md border border-slate-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>Mobile receipt capture with AI extraction</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold tracking-tight leading-snug">
                A mobile app that lets field sales reps capture receipts on their phone and submit them for faster claim approval.
              </h2>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                <strong className="text-white">Purpose:</strong> Provide field sales reps with instant digital receipt capture and automated claim submission so they receive faster reimbursements without lost paperwork.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. WHO IS IT FOR? (Target Personas) */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Who is it for? · Customer Personas
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">{personas.length} Target Roles</span>
                <Button
                  size="xs"
                  variant="secondary"
                  icon={<Plus className="w-3 h-3 text-blue-600" />}
                  onClick={() => setEditingPersona({ id: '', role: '', tag: 'Primary User', needs: '' })}
                  className="text-[11px] font-bold"
                >
                  Add Role
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {personas.map(p => (
                <div key={p.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        <Users className="w-3.5 h-3.5" />
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{p.role}</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cx(
                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded border",
                        p.tag.includes('Primary')
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      )}>
                        {p.tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingPersona(p)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit persona"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      {personas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPersonas(prev => prev.filter(x => x.id !== p.id))}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete persona"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Needs:</strong> {p.needs}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. WHAT DOES IT DO? (Capabilities & Product Boundaries) */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                What does it do? · Core Capabilities &amp; Scope Boundaries
              </span>
              <Button
                size="xs"
                variant="primary"
                icon={<Plus className="w-3 h-3 text-white" />}
                onClick={() => setEditingCap({ id: '', name: '', desc: '', color: 'bg-blue-500' })}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold"
              >
                Add Capability
              </Button>
            </div>

            {/* Core Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {capabilities.map(cap => (
                <div key={cap.id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <span className={cx("w-2 h-2 rounded-full", cap.color || 'bg-blue-500')} />
                      <span>{cap.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingCap(cap)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit capability"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      {capabilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setCapabilities(prev => prev.filter(x => x.id !== cap.id))}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete capability"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* In-Scope vs Not-In-Scope 2-Col Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {/* In Scope */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Scope Deliverables ({inScope.length})</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      icon={<Plus className="w-2.5 h-2.5 text-emerald-700" />}
                      onClick={() => setEditingDeliverable({ type: 'in', text: '' })}
                      className="text-[10.5px] font-bold py-0.5 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300"
                    >
                      Add
                    </Button>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Included
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {inScope.map((item, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-2 group">
                      <div className="flex items-start gap-1.5 flex-1">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => setEditingDeliverable({ type: 'in', index: idx, text: item })}
                          className="p-0.5 rounded text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit deliverable"
                        >
                          <Pencil className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setInScope(prev => prev.filter((_, i) => i !== idx))}
                          className="p-0.5 rounded text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete deliverable"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not in Scope */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <span className="font-bold text-xs">✕</span>
                    <span>Not in Scope Boundaries ({outScope.length})</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      icon={<Plus className="w-2.5 h-2.5 text-slate-700" />}
                      onClick={() => setEditingDeliverable({ type: 'out', text: '' })}
                      className="text-[10.5px] font-bold py-0.5 px-2 bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300"
                    >
                      Add
                    </Button>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                      Excluded
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {outScope.map((item, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-2 group">
                      <div className="flex items-start gap-1.5 flex-1">
                        <span className="text-slate-400 font-bold">•</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => setEditingDeliverable({ type: 'out', index: idx, text: item })}
                          className="p-0.5 rounded text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit deliverable"
                        >
                          <Pencil className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setOutScope(prev => prev.filter((_, i) => i !== idx))}
                          className="p-0.5 rounded text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete deliverable"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. HOW WILL USERS EXPERIENCE IT? (User Journey & UX Principles) */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              How will users experience it? · User Journeys &amp; UX Principles
            </span>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
              {/* Sequential Journey Steps */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Key User Journey Flow
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <span><strong>Field Rep</strong> photographs receipt; AI extracts fields and auto-populates claim.</span>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <span><strong>Manager</strong> receives notification and approves via 1-click triage queue.</span>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <span><strong>Finance officer</strong> reviews verified claim data; syncs to accounting with zero typing.</span>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      4
                    </span>
                    <span><strong>Offline Capture:</strong> Reps photograph off-grid; app queues and auto-syncs when online.</span>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 sm:col-span-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      5
                    </span>
                    <span><strong>In-App Guidance:</strong> Real-time prompts highlight policy thresholds and let reps adjust any field before submitting.</span>
                  </div>
                </div>
              </div>

              {/* UX Principles Pills */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Core UX Principles
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    Capture receipts in seconds, one hand
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    Instant AI extraction with clear feedback
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    Seamless offline capture &amp; automatic sync
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    Secure data handling meeting compliance
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    Guided claim creation to eliminate manual effort
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. WHAT DOES SUCCESS LOOK LIKE? (Goals & Target Metrics) */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              What does success look like? · Goals &amp; Metrics
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Goals */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Product Goals
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Field reps submit digital receipts instantly, eliminating paper loss</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reps receive reimbursements faster, improving cashflow</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Managers approve expense claims efficiently in one place</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Finance processes claims with higher data accuracy, reducing corrections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reps can capture receipts anywhere, even without cellular signal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Receipt data is protected to meet corporate compliance standards</span>
                  </li>
                </ul>
              </div>

              {/* Success Metrics 4-Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Time to Resolution
                  </span>
                  <div>
                    <span className="text-base font-bold text-slate-900 block mt-1">
                      Under 3 days
                    </span>
                    <span className="text-[10.5px] text-slate-500">
                      Receipt submitted to reimbursement
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Manual Effort Reduction
                  </span>
                  <div>
                    <span className="text-base font-bold text-slate-900 block mt-1">
                      No manual entry
                    </span>
                    <span className="text-[10.5px] text-slate-500">
                      For standard digital receipts
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Satisfaction Lift
                  </span>
                  <div>
                    <span className="text-base font-bold text-slate-900 block mt-1">
                      92%+ CSAT
                    </span>
                    <span className="text-[10.5px] text-slate-500">
                      Target rep satisfaction score
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Adoption / Coverage
                  </span>
                  <div>
                    <span className="text-base font-bold text-slate-900 block mt-1">
                      All field reps
                    </span>
                    <span className="text-[10.5px] text-slate-500">
                      Within first quarter rollout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-end shrink-0 shadow-xs">


        <Button
          variant="primary"
          onClick={confirm}
          className="px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span>Continue to Requirements</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Submodal for Editing/Adding Persona */}
      {editingPersona && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingPersona.id ? 'Edit Customer Persona' : 'Add Customer Persona'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPersona(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <Input
                  value={editingPersona.role}
                  onChange={e => setEditingPersona({ ...editingPersona, role: e.target.value })}
                  placeholder="e.g. Field Sales Representative"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Priority Tag</label>
                <select
                  value={editingPersona.tag}
                  onChange={e => setEditingPersona({ ...editingPersona, tag: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Primary User">Primary User</option>
                  <option value="Primary Approver">Primary Approver</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Stakeholder">Stakeholder</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Needs &amp; Workflow Requirements</label>
                <Textarea
                  rows={3}
                  value={editingPersona.needs}
                  onChange={e => setEditingPersona({ ...editingPersona, needs: e.target.value })}
                  placeholder="Describe key responsibilities and critical needs..."
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingPersona(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingPersona.role.trim()}
                onClick={() => handleSavePersona(editingPersona)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Save Persona
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Submodal for Editing/Adding Capability */}
      {editingCap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingCap.id ? 'Edit Capability' : 'Add Capability'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCap(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Capability Name</label>
                <Input
                  value={editingCap.name}
                  onChange={e => setEditingCap({ ...editingCap, name: e.target.value })}
                  placeholder="e.g. Automated OCR Parser"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Badge Accent Color</label>
                <select
                  value={editingCap.color}
                  onChange={e => setEditingCap({ ...editingCap, color: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="bg-blue-500">Blue (Capture/Mobile)</option>
                  <option value="bg-purple-500">Purple (AI/OCR)</option>
                  <option value="bg-emerald-500">Emerald (Form/Automation)</option>
                  <option value="bg-amber-500">Amber (Workflow/Routing)</option>
                  <option value="bg-indigo-500">Indigo (Offline/Sync)</option>
                  <option value="bg-rose-500">Rose (Security/Compliance)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Functional Description</label>
                <Textarea
                  rows={3}
                  value={editingCap.desc}
                  onChange={e => setEditingCap({ ...editingCap, desc: e.target.value })}
                  placeholder="Describe what this capability enables..."
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingCap(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingCap.name.trim()}
                onClick={() => handleSaveCapability(editingCap)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Save Capability
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Submodal for Editing/Adding Deliverable */}
      {editingDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingDeliverable.index !== undefined ? 'Edit Item' : `Add ${editingDeliverable.type === 'in' ? 'In-Scope' : 'Out-of-Scope'} Item`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingDeliverable(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Deliverable / Boundary Description</label>
                <Textarea
                  rows={3}
                  value={editingDeliverable.text}
                  onChange={e => setEditingDeliverable({ ...editingDeliverable, text: e.target.value })}
                  placeholder="Specify exact scope boundary or deliverable..."
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingDeliverable(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingDeliverable.text.trim()}
                onClick={handleSaveDeliverable}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Save Item
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
