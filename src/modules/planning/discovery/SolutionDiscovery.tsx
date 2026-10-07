import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, Check, LayoutDashboard, 
  Sparkles, Cpu, Network, X, Smartphone, 
  CheckCheck, Workflow, Building2, Boxes, Compass,
  Pencil, Trash2, Plus
} from 'lucide-react';
import { Button, cx, Input, Textarea } from '../../ui';
import { usePlanning } from '../PlanningStore';

export interface SolutionPackage {
  id: string;
  name: string;
  category: string;
  badge: string;
  recommended: boolean;
  tagline: string;
  description: string;
  metrics: {
    feasibility: string;
    cost: string;
    time: string;
    fit: string;
    risk: 'Low' | 'Medium' | 'High';
  };
  highlights: string[];
  inScope: { title: string; desc: string }[];
  outScope: { title: string; desc: string }[];
  features: { name: string; role: string; desc: string; type: string }[];
  techStack: { frontend: string; backend: string; ai: string; integration: string };
  capabilities: {
    id: string;
    title: string;
    category: string;
    categoryColor: string;
    rc: string;
    desc: string;
  }[];
}

const PACKAGES: SolutionPackage[] = [
  {
    id: 'sol_custom',
    name: 'Custom Mobile App & Web Dashboard',
    category: 'Bespoke Architecture',
    badge: 'Recommended',
    recommended: true,
    tagline: 'Tailored React Native mobile scanner + web approval orchestration with automated ERP bridge.',
    description: 'Engineered specifically for field sales workflows: offline receipt capture, instantaneous OCR parsing, and policy-driven approval routing directly into accounting.',
    metrics: {
      feasibility: '9 / 10',
      cost: '$140K',
      time: '8–10 weeks',
      fit: '95%',
      risk: 'Low'
    },
    highlights: [
      'Native offline camera capture with auto-edge detection',
      'AI OCR extraction with 99.2% key field accuracy',
      'Web approval queue with 48h SLA escalation rules',
      'Direct 2-way REST API connector for ERP ledger'
    ],
    inScope: [
      { 
        title: 'Cross-Platform Mobile Scanner', 
        desc: 'Native iOS & Android mobile application for reps with on-device camera auto-capture and local offline queue.' 
      },
      { 
        title: 'AI Receipt Parsing Service', 
        desc: 'Multi-field OCR engine extracting vendor, date, line items, currency, VAT, and total spend in sub-second latency.' 
      },
      { 
        title: 'Manager Approval Web Portal', 
        desc: 'Centralized web dashboard with 1-click batch approvals, exception highlighting, and email quick-actions.' 
      },
      { 
        title: 'SLA Tracking & Auto-Escalation', 
        desc: 'Configurable approval escalation rules that auto-reassign claims stalled past 48 hours to alternate managers.' 
      },
      { 
        title: 'Automated ERP Accounting Bridge', 
        desc: 'Direct bi-directional API synchronization posting verified claims into general ledger without manual re-keying.' 
      },
      { 
        title: 'Audit Trail & Receipt Archival', 
        desc: 'Immutable compliance logging and tamper-proof cloud storage for thermal receipt scans.' 
      }
    ],
    outScope: [
      { 
        title: 'Personal Credit Card Statement Feeds', 
        desc: 'Parsing personal bank feeds (deferred to corporate card integration in Phase 2).' 
      },
      { 
        title: 'Corporate Travel Booking Engine', 
        desc: 'Flight and hotel reservation booking is handled externally through corporate travel partners.' 
      },
      { 
        title: 'Payroll Direct Deposit Adjustments', 
        desc: 'Payroll calculation and tax withholdings remain inside core HRIS software.' 
      }
    ],
    features: [
      { 
        name: 'Point-of-Sale Camera Scanner', 
        role: 'Field Sales Reps', 
        desc: 'Instantly captures physical receipts with auto-crop, glare reduction, and instant preview.', 
        type: 'Mobile App' 
      },
      { 
        name: 'Real-Time Policy Compliance Validator', 
        role: 'Sales Reps & Managers', 
        desc: 'Validates meal and travel spend limits against corporate policy before submission.', 
        type: 'AI Service' 
      },
      { 
        name: 'Manager Exception Queue', 
        role: 'Line Managers', 
        desc: 'Triage inbox with one-click approve, reject, or request clarification options.', 
        type: 'Web Portal' 
      },
      { 
        name: 'Finance Ledger Sync Engine', 
        role: 'Accounting & Finance', 
        desc: 'Automated ledger batch posting with reconciliation logs and exception alerts.', 
        type: 'Integration API' 
      }
    ],
    techStack: {
      frontend: 'React Native (iOS/Android) + React 18 Web Portal',
      backend: 'Node.js / Express microservices + PostgreSQL',
      ai: 'Cloud Vision OCR + LLM structured JSON parser',
      integration: 'RESTful bi-directional connector with webhook listeners'
    },
    capabilities: [
      { 
        id: 'cap_cust_capture', 
        title: 'Mobile Camera Capture & Offline Queue', 
        category: 'Mobile / POS', 
        categoryColor: 'bg-blue-50 text-blue-700 border-blue-200', 
        rc: 'No mobile digital capture at point of purchase', 
        desc: 'Allows field sales reps to photograph receipts on the road even without network connectivity.' 
      },
      { 
        id: 'cap_cust_ocr', 
        title: 'AI Automated Receipt Data Extraction', 
        category: 'AI / Vision', 
        categoryColor: 'bg-purple-50 text-purple-700 border-purple-200', 
        rc: 'Receipts exist only on physical paper until manual filing', 
        desc: 'Instantly digitizes vendor, date, line items, and totals, eliminating manual spreadsheet entry.' 
      },
      { 
        id: 'cap_cust_queue', 
        title: 'Manager Approval Queue with SLA Rules', 
        category: 'Workflow', 
        categoryColor: 'bg-amber-50 text-amber-700 border-amber-200', 
        rc: 'Approval has no tracked queue or escalation rules', 
        desc: 'Replaces unstructured email chains with a centralized queue and automated 48-hour reminders.' 
      },
      { 
        id: 'cap_cust_status', 
        title: 'Live Claim Status & Push Tracking', 
        category: 'Transparency', 
        categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
        rc: 'Claims wait in managers’ email inboxes without reminders', 
        desc: 'Provides reps live progress tracking from submission through approval and payout.' 
      },
      { 
        id: 'cap_cust_erp', 
        title: 'Automated Direct ERP Ledger Sync', 
        category: 'Integration', 
        categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
        rc: 'No automated link between approval workflow and ERP', 
        desc: 'Directly posts approved expense lines into accounting software, removing finance re-keying.' 
      }
    ]
  },
  {
    id: 'sol_concur',
    name: 'SAP Concur Enterprise Deployment',
    category: 'Enterprise SaaS',
    badge: 'Turnkey Enterprise',
    recommended: false,
    tagline: 'Turnkey Concur enterprise rollout utilizing standard expense policy templates and native SAP connectors.',
    description: 'Deploy standard SAP Concur cloud suite with pre-built enterprise ledger connectors and corporate compliance rules.',
    metrics: {
      feasibility: '7 / 10',
      cost: '$210K',
      time: '14–16 weeks',
      fit: '78%',
      risk: 'Medium'
    },
    highlights: [
      'Standard SAP Concur mobile application',
      'Pre-configured corporate policy rule templates',
      'Certified SAP ERP ledger integration module',
      'High annual enterprise licensing overhead'
    ],
    inScope: [
      { 
        title: 'Concur Mobile App Rollout', 
        desc: 'Standard client rollout across iOS and Android corporate fleet devices.' 
      },
      { 
        title: 'Standard Approval Hierarchy', 
        desc: 'Multi-tier manager approval workflow mapped to corporate active directory.' 
      },
      { 
        title: 'Corporate Policy Compliance Engine', 
        desc: 'Automated flags for weekend spend, alcohol limits, and per-diem violations.' 
      },
      { 
        title: 'Certified SAP ERP Connector', 
        desc: 'Native adapter connecting Concur directly to SAP S/4HANA financial ledger.' 
      }
    ],
    outScope: [
      { 
        title: 'Custom Mobile UX Modifications', 
        desc: 'Standard Concur UI cannot be customized for simplified 1-tap rep capture.' 
      },
      { 
        title: 'Legacy Non-SAP Accounting Integration', 
        desc: 'Requires separate middleware if non-SAP ledgers are introduced.' 
      },
      { 
        title: 'Custom Offline LLM Receipt Models', 
        desc: 'Relies on Concur ExpenseIt proprietary OCR processing pipeline.' 
      }
    ],
    features: [
      { 
        name: 'Concur ExpenseIt Mobile Intake', 
        role: 'Sales Reps', 
        desc: 'Standard mobile receipt upload with background optical character recognition.', 
        type: 'SaaS Mobile' 
      },
      { 
        name: 'Manager Approval Worklist', 
        role: 'Managers', 
        desc: 'Web portal for reviewing expense line items and policy exception notices.', 
        type: 'SaaS Web' 
      },
      { 
        name: 'Policy Audit Automation', 
        role: 'Auditors', 
        desc: 'System flags claims exceeding limits for secondary manual inspection.', 
        type: 'SaaS Rules' 
      },
      { 
        name: 'Native SAP ERP Financial Posting', 
        role: 'Finance', 
        desc: 'Automated scheduled sync posting to accounts payable ledger.', 
        type: 'Native Connector' 
      }
    ],
    techStack: {
      frontend: 'SAP Concur Standard Mobile Client & Web Portal',
      backend: 'SAP Concur Cloud SaaS Platform',
      ai: 'ExpenseIt Optical Recognition',
      integration: 'SAP Certified Native ERP Connector'
    },
    capabilities: [
      { 
        id: 'cap_concur_mob', 
        title: 'Standard Concur Mobile Photo Intake', 
        category: 'Mobile SaaS', 
        categoryColor: 'bg-blue-50 text-blue-700 border-blue-200', 
        rc: 'No mobile digital capture at point of purchase', 
        desc: 'Provides mobile camera capture using standard SAP Concur mobile application.' 
      },
      { 
        id: 'cap_concur_policy', 
        title: 'Automated Policy Rules & Exception Flags', 
        category: 'Governance', 
        categoryColor: 'bg-amber-50 text-amber-700 border-amber-200', 
        rc: 'Approval has no tracked queue or escalation rules', 
        desc: 'Flags policy violations before claims reach manager sign-off.' 
      },
      { 
        id: 'cap_concur_route', 
        title: 'Standard Multi-Tier Manager Worklist', 
        category: 'Workflow', 
        categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
        rc: 'Claims wait in managers’ email inboxes without reminders', 
        desc: 'Centralizes approvals into a dedicated Concur web worklist.' 
      },
      { 
        id: 'cap_concur_erp', 
        title: 'Native SAP S/4HANA Ledger Posting', 
        category: 'Integration', 
        categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
        rc: 'No automated link between approval workflow and ERP', 
        desc: 'Posts approved claim records directly to SAP enterprise general ledger.' 
      }
    ]
  },
  {
    id: 'sol_power',
    name: 'PowerApps & Teams Approval Workflow',
    category: 'Low-Code / M365',
    badge: 'Rapid Prototype',
    recommended: false,
    tagline: 'Rapid low-code deployment leveraging corporate Office 365 licenses, Power Automate, and Teams cards.',
    description: 'Fastest time-to-market using existing corporate Microsoft 365 licensing, PowerApps canvas forms, and Teams approval cards.',
    metrics: {
      feasibility: '8 / 10',
      cost: '$75K',
      time: '4–6 weeks',
      fit: '72%',
      risk: 'Medium'
    },
    highlights: [
      'Uses existing Microsoft 365 corporate licenses',
      'PowerApps mobile form for field sales receipt capture',
      'Teams adaptive cards for manager approvals',
      'SharePoint list storage with periodic CSV export to ERP'
    ],
    inScope: [
      { 
        title: 'PowerApps Canvas Mobile App', 
        desc: 'Simple canvas interface for reps to take photos and enter expense details.' 
      },
      { 
        title: 'AI Builder Receipt Model', 
        desc: 'Microsoft AI Builder basic OCR extracting total spend and store names.' 
      },
      { 
        title: 'Teams Adaptive Card Routing', 
        desc: 'Sends interactive cards directly into manager Microsoft Teams chat with 1-click buttons.' 
      },
      { 
        title: 'SharePoint Staging Table', 
        desc: 'Stores claim records in cloud lists with basic status auditing.' 
      }
    ],
    outScope: [
      { 
        title: 'Direct Live 2-Way ERP Sync', 
        desc: 'Requires manual CSV export or scheduled batch files rather than real-time API.' 
      },
      { 
        title: 'High-Volume Scalability (>10k claims/mo)', 
        desc: 'Power Automate run limits make high-volume scale costly over time.' 
      },
      { 
        title: 'Advanced Offline Mobile Caching', 
        desc: 'Canvas app requires active internet connectivity during claim submission.' 
      }
    ],
    features: [
      { 
        name: 'Canvas Mobile Form', 
        role: 'Sales Reps', 
        desc: 'Simple photo upload form within Microsoft PowerApps container.', 
        type: 'Canvas App' 
      },
      { 
        name: 'Teams Interactive Approval Cards', 
        role: 'Managers', 
        desc: 'Direct chat notifications in Microsoft Teams with approve/reject buttons.', 
        type: 'Teams Card' 
      },
      { 
        name: 'Power Automate Reminders', 
        role: 'All Users', 
        desc: 'Basic automated flow triggering email reminders every 3 business days.', 
        type: 'Cloud Flow' 
      },
      { 
        name: 'Finance CSV Export Utility', 
        role: 'Finance', 
        desc: 'Admin export view to generate monthly CSV files for finance upload.', 
        type: 'SharePoint View' 
      }
    ],
    techStack: {
      frontend: 'Microsoft PowerApps Canvas App',
      backend: 'Power Automate Cloud Flows + SharePoint Online',
      ai: 'Microsoft AI Builder Receipt Processing',
      integration: 'Power Automate CSV Export / Dataverse'
    },
    capabilities: [
      { 
        id: 'cap_power_form', 
        title: 'PowerApps Mobile Photo Submission', 
        category: 'Low-Code', 
        categoryColor: 'bg-blue-50 text-blue-700 border-blue-200', 
        rc: 'No mobile digital capture at point of purchase', 
        desc: 'Enables mobile photo uploads inside corporate Microsoft 365 PowerApps app.' 
      },
      { 
        id: 'cap_power_ocr', 
        title: 'AI Builder Basic OCR Data Parsing', 
        category: 'AI Builder', 
        categoryColor: 'bg-purple-50 text-purple-700 border-purple-200', 
        rc: 'Receipts exist only on physical paper until manual filing', 
        desc: 'Extracts store name and total transaction cost from photo attachments.' 
      },
      { 
        id: 'cap_power_teams', 
        title: 'Teams Adaptive Card Approval Routing', 
        category: 'Collaboration', 
        categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
        rc: 'Approval has no tracked queue or escalation rules', 
        desc: 'Delivers approval prompts right into managers’ existing Microsoft Teams client.' 
      },
      { 
        id: 'cap_power_export', 
        title: 'SharePoint Ledger Staging & CSV Export', 
        category: 'Integration', 
        categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
        rc: 'No automated link between approval workflow and ERP', 
        desc: 'Stages approved claims and produces structured CSV exports for finance.' 
      }
    ]
  }
];

export const SolutionDiscovery: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onContinue: () => void 
}> = ({ projectId, projectName, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

  // Dynamic packages list allowing edits & additions
  const [packagesList, setPackagesList] = useState<SolutionPackage[]>(PACKAGES);

  // Selected solution package (default to custom or saved state)
  const [selPkg, setSelPkg] = useState<string>(() => {
    return s.selectedPackage || 'sol_custom';
  });

  // Modal inspection dashboard state (Tab: Scope, Features, Capabilities)
  const [inspectPkgId, setInspectPkgId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'scope' | 'features' | 'capabilities'>('scope');

  // Editing state for capabilities
  const [editingCap, setEditingCap] = useState<{
    id?: string;
    title: string;
    category: string;
    desc: string;
    rc: string;
  } | null>(null);

  // Editing state for scope items
  const [editingScope, setEditingScope] = useState<{
    type: 'inScope' | 'outScope';
    index?: number;
    title: string;
    desc: string;
  } | null>(null);

  // Editing state for features
  const [editingFeature, setEditingFeature] = useState<{
    index?: number;
    name: string;
    role: string;
    desc: string;
    type: string;
  } | null>(null);

  const selectedPackageData = packagesList.find(p => p.id === selPkg) || packagesList[0];
  const inspectedPackage = inspectPkgId ? packagesList.find(p => p.id === inspectPkgId) : null;

  const handleSelectPackage = (id: string) => {
    setSelPkg(id);
    patch(projectId, { selectedPackage: id });
  };

  const getCategoryColor = (cat: string) => {
    if (cat.includes('AI') || cat.includes('Vision')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (cat.includes('Workflow')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (cat.includes('Mobile') || cat.includes('POS')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (cat.includes('Transparency')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (cat.includes('Integration') || cat.includes('API')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const handleSaveCapability = (data: { id?: string; title: string; category: string; desc: string; rc: string }) => {
    if (!inspectPkgId || !data.title.trim()) return;
    const catColor = getCategoryColor(data.category);

    setPackagesList(prev => prev.map(p => {
      if (p.id !== inspectPkgId) return p;
      if (data.id) {
        return {
          ...p,
          capabilities: p.capabilities.map(c => c.id === data.id ? { ...c, ...data, categoryColor: catColor } : c)
        };
      } else {
        const newCap = {
          id: `cap_${Date.now()}`,
          title: data.title,
          category: data.category,
          categoryColor: catColor,
          desc: data.desc,
          rc: data.rc || 'Operational and workflow friction'
        };
        return {
          ...p,
          capabilities: [...p.capabilities, newCap]
        };
      }
    }));
    setEditingCap(null);
  };

  const handleDeleteCapability = (capId: string) => {
    if (!inspectPkgId) return;
    setPackagesList(prev => prev.map(p => {
      if (p.id !== inspectPkgId) return p;
      return {
        ...p,
        capabilities: p.capabilities.filter(c => c.id !== capId)
      };
    }));
  };

  const handleSaveScope = (data: { type: 'inScope' | 'outScope'; index?: number; title: string; desc: string }) => {
    if (!inspectPkgId || !data.title.trim()) return;
    setPackagesList(prev => prev.map(p => {
      if (p.id !== inspectPkgId) return p;
      const key = data.type;
      const list = [...p[key]];
      if (data.index !== undefined) {
        list[data.index] = { title: data.title, desc: data.desc };
      } else {
        list.push({ title: data.title, desc: data.desc });
      }
      return { ...p, [key]: list };
    }));
    setEditingScope(null);
  };

  const handleDeleteScope = (type: 'inScope' | 'outScope', index: number) => {
    if (!inspectPkgId) return;
    setPackagesList(prev => prev.map(p => {
      if (p.id !== inspectPkgId) return p;
      return {
        ...p,
        [type]: p[type].filter((_, i) => i !== index)
      };
    }));
  };

  const handleSaveFeature = (data: { index?: number; name: string; role: string; desc: string; type: string }) => {
    if (!inspectPkgId || !data.name.trim()) return;
    setPackagesList(prev => prev.map(p => {
      if (p.id !== inspectPkgId) return p;
      const list = [...p.features];
      if (data.index !== undefined) {
        list[data.index] = { name: data.name, role: data.role, desc: data.desc, type: data.type };
      } else {
        list.push({ name: data.name, role: data.role, desc: data.desc, type: data.type });
      }
      return { ...p, features: list };
    }));
    setEditingFeature(null);
  };

  const handleDeleteFeature = (index: number) => {
    if (!inspectPkgId) return;
    setPackagesList(prev => prev.map(p => {
      if (p.id !== inspectPkgId) return p;
      return {
        ...p,
        features: p.features.filter((_, i) => i !== index)
      };
    }));
  };

  const confirm = () => {
    patch(projectId, { 
      solutionConfirmed: true, 
      selectedPackage: selPkg,
      discoveryPage: 'business_model' 
    });
    onContinue();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Solution Discovery</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate recommended architectural packages against confirmed requirements, root causes, and business goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Step 4 · Architectural Selection</span>
          </span> */}
        </div>
      </div>

      {/* Main Full-Width Workspace (No Congested Side Panel) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recommended Solution
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select the architectural package that best addresses the core problem and delivers on executive objectives.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
              3 Architectures Evaluated
            </span>
          </div>

          {/* Solution Cards Grid */}
          <div className="space-y-4">
            {packagesList.map((pkg) => {
              const isSelected = selPkg === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={cx(
                    "rounded-2xl border transition-all duration-200 bg-white p-6 sm:p-7 cursor-pointer relative overflow-hidden shadow-2xs hover:shadow-xs",
                    isSelected 
                      ? "border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/10" 
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  {/* Top Row: Icon, Category, Title, Tagline, Selection Button */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Architecture Icon */}
                      <div className={cx(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs mt-0.5",
                        pkg.id === 'sol_custom' ? "bg-blue-50 text-blue-600 border border-blue-200/80" :
                        pkg.id === 'sol_concur' ? "bg-purple-50 text-purple-600 border border-purple-200/80" :
                        "bg-amber-50 text-amber-600 border border-amber-200/80"
                      )}>
                        {pkg.id === 'sol_custom' && <Smartphone className="w-5 h-5" />}
                        {pkg.id === 'sol_concur' && <Building2 className="w-5 h-5" />}
                        {pkg.id === 'sol_power' && <Workflow className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {pkg.category}
                          </span>
                          {pkg.recommended && (
                            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Recommended
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {pkg.name}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-3xl">
                          {pkg.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Selection State Button */}
                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPackage(pkg.id);
                        }}
                        className={cx(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                          isSelected
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <span>Select Solution</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Middle Row: Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5 pt-5 border-t border-slate-100 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Feasibility
                      </span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {pkg.metrics.feasibility}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Est. Build Cost
                      </span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {pkg.metrics.cost}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Time to Value
                      </span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {pkg.metrics.time}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Arch. Fit Score
                      </span>
                      <span className="text-sm font-bold text-blue-600 mt-0.5 block">
                        {pkg.metrics.fit}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Scope Highlights & View Details Action */}
                  <div className="mt-5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Deliverables:
                      </span>
                      {pkg.highlights.map((hl, idx) => (
                        <span 
                          key={idx} 
                          className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<LayoutDashboard className="w-3.5 h-3.5" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectPkgId(pkg.id);
                        setModalTab('scope');
                      }}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs self-start sm:self-auto cursor-pointer"
                    >
                      View Details &amp; Scope
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Selected Architecture:</span>
          </span>
          <span className="text-slate-900 font-bold">
            {selectedPackageData.name}
          </span>
          {selectedPackageData.recommended && (
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Recommended
            </span>
          )}
        </div>

        <Button
          variant="primary"
          onClick={confirm}
          className="px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span>Confirm &amp; Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* SOLUTION DASHBOARD MODAL (View Details: In-Scope, Out-of-Scope, Features) */}
      {/* ========================================================================= */}
      {inspectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cx(
                    "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border",
                    inspectedPackage.recommended 
                      ? "bg-blue-50 text-blue-700 border-blue-200" 
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  )}>
                    {inspectedPackage.category}
                  </span>
                  {inspectedPackage.recommended && (
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Recommended Architecture
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {inspectedPackage.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {inspectedPackage.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selPkg === inspectedPackage.id ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      handleSelectPackage(inspectedPackage.id);
                    }}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
                  >
                    Select this Solution
                  </Button>
                )}

                <button
                  type="button"
                  onClick={() => setInspectPkgId(null)}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Sub-Header Tabs (No Repetitive Capabilities) */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setModalTab('scope')}
                className={cx(
                  "px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5",
                  modalTab === 'scope'
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                )}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Scope (In-Scope &amp; Out-Scope)</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('features')}
                className={cx(
                  "px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5",
                  modalTab === 'features'
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                )}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Core Features ({inspectedPackage.features.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('capabilities')}
                className={cx(
                  "px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5",
                  modalTab === 'capabilities'
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                )}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Capabilities ({inspectedPackage.capabilities.length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              {/* TAB 1: SCOPE ARCHITECTURE (IN-SCOPE vs OUT-OF-SCOPE) */}
              {modalTab === 'scope' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* IN-SCOPE */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          In-Scope Deliverables ({inspectedPackage.inScope.length})
                        </h4>
                      </div>
                      <Button
                        size="xs"
                        variant="secondary"
                        icon={<Plus className="w-3 h-3 text-emerald-600" />}
                        onClick={() => setEditingScope({ type: 'inScope', title: '', desc: '' })}
                        className="text-[11px] font-bold"
                      >
                        Add In-Scope
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {inspectedPackage.inScope.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1 group">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 block flex-1">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => setEditingScope({ type: 'inScope', index: idx, title: item.title, desc: item.desc })}
                                className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit item"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteScope('inScope', idx)}
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Delete item"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[11.5px] text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OUT-OF-SCOPE */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
                          ✕
                        </span>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Out-of-Scope Boundaries ({inspectedPackage.outScope.length})
                        </h4>
                      </div>
                      <Button
                        size="xs"
                        variant="secondary"
                        icon={<Plus className="w-3 h-3 text-slate-600" />}
                        onClick={() => setEditingScope({ type: 'outScope', title: '', desc: '' })}
                        className="text-[11px] font-bold"
                      >
                        Add Out-Scope
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {inspectedPackage.outScope.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1 group">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 block flex-1">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => setEditingScope({ type: 'outScope', index: idx, title: item.title, desc: item.desc })}
                                className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit item"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteScope('outScope', idx)}
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Delete item"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CORE FEATURES */}
              {modalTab === 'features' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Architectural Features ({inspectedPackage.features.length})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Key interface and backend components supporting the solution architecture
                      </p>
                    </div>
                    <Button
                      size="xs"
                      variant="primary"
                      icon={<Plus className="w-3.5 h-3.5" />}
                      onClick={() => setEditingFeature({ name: '', role: 'Field Reps', desc: '', type: 'Mobile / Service' })}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                    >
                      Add Feature
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inspectedPackage.features.map((feat, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-2 group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {feat.type}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-slate-400 mr-1">
                              Target: {feat.role}
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingFeature({ index: idx, name: feat.name, role: feat.role, desc: feat.desc, type: feat.type })}
                              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit feature"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteFeature(idx)}
                              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete feature"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {feat.name}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CAPABILITIES */}
              {modalTab === 'capabilities' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Architectural Capabilities ({inspectedPackage.capabilities.length})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Technical capabilities engineered to address identified root causes
                      </p>
                    </div>
                    <Button
                      size="xs"
                      variant="primary"
                      icon={<Plus className="w-3.5 h-3.5" />}
                      onClick={() => setEditingCap({ title: '', category: 'AI / Vision', desc: '', rc: '' })}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                    >
                      Add Capability
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {inspectedPackage.capabilities.map((cap) => (
                      <div key={cap.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-start gap-4 group hover:border-slate-300 transition-all">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </span>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-900">
                              {cap.title}
                            </h4>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className={cx("text-[10px] font-bold uppercase px-2 py-0.5 rounded border", cap.categoryColor)}>
                                {cap.category}
                              </span>
                              <button
                                type="button"
                                onClick={() => setEditingCap({ id: cap.id, title: cap.title, category: cap.category, desc: cap.desc, rc: cap.rc })}
                                className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit capability"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCapability(cap.id)}
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Delete capability"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {cap.desc}
                          </p>
                          <div className="pt-1">
                            <span className="text-[10.5px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block">
                              Fixes Root Cause: {cap.rc}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInspectPkgId(null)}
                className="text-xs font-bold"
              >
                Close
              </Button>

              <div className="flex items-center gap-2">
                {selPkg !== inspectedPackage.id && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handleSelectPackage(inspectedPackage.id);
                      setInspectPkgId(null);
                    }}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
                  >
                    Select this Package &amp; Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submodal for Editing Capability */}
      {editingCap && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingCap.id ? 'Edit Capability' : 'Add Architectural Capability'}
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
                <label className="font-bold text-slate-700 block mb-1">Capability Title</label>
                <Input
                  value={editingCap.title}
                  onChange={e => setEditingCap({ ...editingCap, title: e.target.value })}
                  placeholder="e.g. Real-Time Policy Validator"
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category / Tag</label>
                  <select
                    value={editingCap.category}
                    onChange={e => setEditingCap({ ...editingCap, category: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="AI / Vision">AI / Vision</option>
                    <option value="Workflow">Workflow</option>
                    <option value="Mobile / POS">Mobile / POS</option>
                    <option value="Transparency">Transparency</option>
                    <option value="Integration / API">Integration / API</option>
                    <option value="Security & Compliance">Security &amp; Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Package</label>
                  <span className="block px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium truncate">
                    {inspectedPackage?.name || 'Selected Architecture'}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <Textarea
                  rows={3}
                  value={editingCap.desc}
                  onChange={e => setEditingCap({ ...editingCap, desc: e.target.value })}
                  placeholder="Explain how this capability operates and benefits users..."
                  className="text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fixes Root Cause</label>
                <Input
                  value={editingCap.rc}
                  onChange={e => setEditingCap({ ...editingCap, rc: e.target.value })}
                  placeholder="e.g. Receipt paper loss on travel trips"
                  className="text-xs"
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
                disabled={!editingCap.title.trim()}
                onClick={() => handleSaveCapability(editingCap)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Save Capability
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Submodal for Editing Scope Item */}
      {editingScope && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingScope.index !== undefined ? 'Edit Deliverable' : `Add ${editingScope.type === 'inScope' ? 'In-Scope' : 'Out-of-Scope'} Deliverable`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingScope(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Deliverable Title</label>
                <Input
                  value={editingScope.title}
                  onChange={e => setEditingScope({ ...editingScope, title: e.target.value })}
                  placeholder="e.g. Automated Receipt Sync Bridge"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description / Boundary</label>
                <Textarea
                  rows={3}
                  value={editingScope.desc}
                  onChange={e => setEditingScope({ ...editingScope, desc: e.target.value })}
                  placeholder="Specify exact scope boundaries and functional responsibilities..."
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingScope(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingScope.title.trim()}
                onClick={() => handleSaveScope(editingScope)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Save Deliverable
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Submodal for Editing Feature */}
      {editingFeature && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingFeature.index !== undefined ? 'Edit Architectural Feature' : 'Add Architectural Feature'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingFeature(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Feature Name</label>
                <Input
                  value={editingFeature.name}
                  onChange={e => setEditingFeature({ ...editingFeature, name: e.target.value })}
                  placeholder="e.g. Point-of-Sale Camera Scanner"
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target User Role</label>
                  <Input
                    value={editingFeature.role}
                    onChange={e => setEditingFeature({ ...editingFeature, role: e.target.value })}
                    placeholder="e.g. Field Sales Reps"
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Module / Component Type</label>
                  <Input
                    value={editingFeature.type}
                    onChange={e => setEditingFeature({ ...editingFeature, type: e.target.value })}
                    placeholder="e.g. Mobile App, AI Service"
                    className="text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <Textarea
                  rows={3}
                  value={editingFeature.desc}
                  onChange={e => setEditingFeature({ ...editingFeature, desc: e.target.value })}
                  placeholder="Describe what this feature enables and how it functions..."
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingFeature(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingFeature.name.trim()}
                onClick={() => handleSaveFeature(editingFeature)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Save Feature
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};