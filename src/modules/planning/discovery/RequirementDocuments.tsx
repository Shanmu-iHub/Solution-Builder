import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, Check, Download, 
  FileText, Copy, Printer, Sparkles, ShieldCheck, 
  Briefcase, Cpu, User, Layers, CheckCheck, Eye
} from 'lucide-react';
import { Button, cx, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';

export type DocumentType = 'brd' | 'prd' | 'srs' | 'traceability';

interface DocMetadata {
  id: DocumentType;
  code: string;
  title: string;
  description: string;
  sectionsCount: number;
  badgeTone: 'blue' | 'purple' | 'emerald' | 'amber';
  updatedAt: string;
  version: string;
}

const DOC_TABS: DocMetadata[] = [
  {
    id: 'brd',
    code: 'BRD',
    title: 'Business Requirements Document',
    description: 'Strategic justification, revenue ROI, stakeholder personas, and operational impact.',
    sectionsCount: 9,
    badgeTone: 'blue',
    updatedAt: 'Today, 2:45 PM',
    version: 'v1.0 Baseline',
  },
  {
    id: 'prd',
    code: 'PRD',
    title: 'Product Requirements Document',
    description: 'User journey workflows, mobile UI specs, core capabilities, and scope boundaries.',
    sectionsCount: 7,
    badgeTone: 'purple',
    updatedAt: 'Today, 2:48 PM',
    version: 'v1.0 Baseline',
  },
  {
    id: 'srs',
    code: 'SRS',
    title: 'Software Requirements Specification',
    description: 'Technical architecture, AI OCR pipeline, API schemas, security, and SLAs.',
    sectionsCount: 8,
    badgeTone: 'emerald',
    updatedAt: 'Today, 2:50 PM',
    version: 'v1.0 Baseline',
  },
  {
    id: 'traceability',
    code: 'RTM',
    title: 'Traceability Matrix',
    description: 'End-to-end mapping from Problem statement to 38 Requirements and architecture modules.',
    sectionsCount: 5,
    badgeTone: 'amber',
    updatedAt: 'Today, 2:52 PM',
    version: 'v1.0 Complete',
  },
];

export const RequirementDocuments: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onComplete: () => void;
  onBack?: () => void;
}> = ({ projectId, projectName, onComplete, onBack }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();

  const [activeDoc, setActiveDoc] = useState<DocumentType>('brd');
  const [copied, setCopied] = useState(false);

  const currentMeta = DOC_TABS.find(d => d.id === activeDoc) || DOC_TABS[0];

  const handleExport = (format: string) => {
    toast({
      title: `Exporting ${currentMeta.code} (${format})`,
      description: `Preparing executive document package for ${projectName}...`,
    });
  };

  const handleCopyMarkdown = () => {
    setCopied(true);
    toast({
      title: 'Copied to Clipboard',
      description: `${currentMeta.title} exported in Markdown format.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const confirm = () => {
    patch(projectId, { documentsConfirmed: true });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Phase · Specification &amp; Governance
          </span>
          <h1 className="text-lg font-bold text-[#0F172A]">Enterprise Document Set</h1>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
          Document Set · Baseline v1.0
        </div>
      </div>

      {/* Main Workspace (Full-Width, Clean, Balanced Layout) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* 1. TOP 4 KPI SUMMARY CARDS (Matching System Aesthetic) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Generated Documents
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                3 Sets
              </span>
              <span className="text-[11px] text-slate-500 block">BRD · PRD · SRS + RTM</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Sections
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                24
              </span>
              <span className="text-[11px] text-slate-500 block">Fully detailed specs</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Traceability Coverage
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
                100%
              </span>
              <span className="text-[11px] text-slate-500 block">38 requirements mapped</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Governance Status
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                Ready
              </span>
              <span className="text-[11px] text-slate-500 block">C-Suite sign-off unblocked</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. DOCUMENT SELECTOR TABS (Matching System Aesthetic) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {DOC_TABS.map(doc => {
              const active = activeDoc === doc.id;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveDoc(doc.id)}
                  className={cx(
                    "text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group",
                    active
                      ? "bg-white border-blue-600 shadow-sm ring-1 ring-blue-600/20"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={cx(
                        "text-base font-extrabold tracking-tight",
                        active ? "text-blue-600" : "text-slate-900"
                      )}>
                        {doc.code}
                      </span>
                      <span className={cx(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        active ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-500"
                      )}>
                        {doc.sectionsCount} Sections
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      {doc.title}
                    </span>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span className="text-slate-400">{doc.version}</span>
                    <span className={cx(
                      "font-semibold flex items-center gap-1",
                      active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                    )}>
                      <Eye className="w-3 h-3" /> View
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 3. DOCUMENT CONTROLS & EXPORT TOOLBAR */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-slate-900 text-white">
                  {currentMeta.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {currentMeta.title}
                </h3>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentMeta.version}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-500 mt-0.5">
                Official traceable baseline generated from confirmed phases 01–07.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="xs"
                variant="secondary"
                icon={<Copy className="w-3 h-3" />}
                onClick={handleCopyMarkdown}
                className="text-xs font-medium"
              >
                {copied ? 'Copied!' : 'Copy Markdown'}
              </Button>

              <Button
                size="xs"
                variant="secondary"
                icon={<Download className="w-3 h-3" />}
                onClick={() => handleExport('PDF')}
                className="text-xs font-medium"
              >
                PDF
              </Button>

              <Button
                size="xs"
                variant="primary"
                icon={<Download className="w-3 h-3" />}
                onClick={() => handleExport('Word')}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Export Word (.docx)
              </Button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. FULL-WIDTH EXECUTIVE DOCUMENT VIEWER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">

            {/* TAB 1: BRD - BUSINESS REQUIREMENTS DOCUMENT */}
            {activeDoc === 'brd' && (
              <div className="space-y-8">
                {/* Document Header Metadata */}
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      Confidential · Enterprise Architecture Baseline
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: BRD-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Business Requirements Document (BRD)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    High-level enterprise specification detailing the business justification, target operational workflows, revenue ROI drivers, and strategic scope for the Mobile Expense Receipt Capture solution.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Target Project</span>
                      <span className="font-bold text-slate-800">{projectName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Document Owner</span>
                      <span className="font-bold text-slate-800">Product &amp; Commercial Strategy</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Baseline Version</span>
                      <span className="font-bold text-emerald-600">v1.0 Signed Off</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Sign-Off Date</span>
                      <span className="font-bold text-slate-800">October 2026</span>
                    </div>
                  </div>
                </div>

                {/* Section 1: Strategic Purpose & Vision */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>Executive Purpose &amp; Strategic Vision</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700 leading-relaxed">
                    <p>
                      Field sales representatives face significant friction in expense reimbursement, spending up to 3.5 hours per week manually filing physical paper receipts, resulting in an estimated 14% receipt loss rate and prolonged payment cycles exceeding 21 days.
                    </p>
                    <p>
                      The primary objective of this initiative is to deploy an AI-powered mobile application allowing instantaneous receipt capture at the point of sale, automatic metadata extraction, automated compliance audits, and straight-through routing into corporate accounting queues.
                    </p>
                  </div>
                </div>

                {/* Section 2: Target Stakeholder Personas */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Target Stakeholder &amp; User Personas</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Field Sales Rep</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">Primary</span>
                      </div>
                      <p className="text-slate-600">Visits 6–8 clients daily; needs 1-tap receipt capture with guaranteed offline queuing so reimbursements take days instead of weeks.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Sales Line Manager</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px]">Approver</span>
                      </div>
                      <p className="text-slate-600">Supervises team travel spend; requires a centralized queue with automated 48-hour reminders to approve compliant claims with zero email clutter.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Finance &amp; Audit Team</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Reconciliation</span>
                      </div>
                      <p className="text-slate-600">Audits tax compliance; needs immutable logs, structured CSV/ledger feeds, and automated pre-checks to cut monthly audit hours by 60%.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Traceable Business Requirements Matrix */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">3</span>
                    <span>Traceable Business Requirements Baseline</span>
                  </h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10.5px]">
                        <tr>
                          <th className="px-4 py-2.5 w-24">Req ID</th>
                          <th className="px-4 py-2.5">Business Requirement Statement</th>
                          <th className="px-4 py-2.5 w-24">Priority</th>
                          <th className="px-4 py-2.5 w-24">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-001</td>
                          <td className="px-4 py-2.5 text-slate-900">Enable field sales reps to capture receipts instantly on mobile devices.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Objective</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-002</td>
                          <td className="px-4 py-2.5 text-slate-900">Provide accurate AI extraction of receipt line-item data without manual typing.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Objective</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-003</td>
                          <td className="px-4 py-2.5 text-slate-900">Store captured receipts when offline and auto-sync when cellular connectivity returns.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Rule</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-005</td>
                          <td className="px-4 py-2.5 text-slate-900">Integrate claim submission with existing corporate expense workflows and SAP Concur.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Objective</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Expected ROI & Business Success Metrics */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">4</span>
                    <span>Quantified ROI &amp; Success Targets</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Reimbursement Cycle</span>
                      <span className="text-base font-bold text-slate-900 block">&lt; 3 Days</span>
                      <span className="text-[11px] text-slate-500">Down from 21 days</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Manual Data Entry</span>
                      <span className="text-base font-bold text-slate-900 block">Zero Effort</span>
                      <span className="text-[11px] text-slate-500">95%+ OCR Auto-populate</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Field CSAT</span>
                      <span className="text-base font-bold text-slate-900 block">92%+ CSAT</span>
                      <span className="text-[11px] text-slate-500">Target rep adoption</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Lost Receipts</span>
                      <span className="text-base font-bold text-slate-900 block">0% Losses</span>
                      <span className="text-[11px] text-slate-500">Instant digital backup</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRD - PRODUCT REQUIREMENTS DOCUMENT */}
            {activeDoc === 'prd' && (
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                      Product Architecture Baseline
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: PRD-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Product Requirements Document (PRD)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    Detailed product specification defining user experience flows, core functional modules, edge-handling rules, and strict scope boundaries.
                  </p>
                </div>

                {/* Section 1: User Journey Walkthrough */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>Core User Experience &amp; Journey Flow</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">1</span>
                        <span>Single-Tap Photo Capture</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Sales rep points camera at receipt; edge-detection automatically identifies document borders, rectifies perspective skew, and snaps image in &lt; 2 seconds.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px]">2</span>
                        <span>AI Extraction &amp; Pre-Fill</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        OCR extracts vendor name, currency, amount, tax, and date. Fields auto-populate on screen with confidence flags highlighting any ambiguous entries.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">3</span>
                        <span>Pre-Submission Policy Audit</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Automated checks verify expense limits and per-diem rules in real time. Rep receives immediate guidance before submission, avoiding later rejections.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">4</span>
                        <span>Manager Approval &amp; GL Sync</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Manager reviews claim in 1-click mobile inbox. Approved claim triggers automated API posting into SAP Concur with digital receipts attached.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: In-Scope Deliverables vs Out-of-Scope Boundaries */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Product Scope Boundaries</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                      <span className="font-bold uppercase tracking-wider text-emerald-800 text-[11px] block">
                        Included in Scope
                      </span>
                      <ul className="space-y-1 text-slate-700 list-disc pl-4 leading-relaxed">
                        <li>Native iOS and Android field rep capture applications</li>
                        <li>Automated OCR receipt parser with edge rectification</li>
                        <li>Offline encrypted storage queue with background synchronization</li>
                        <li>Web-based manager approval queue with 48h SLA reminders</li>
                        <li>Export integration to enterprise accounting feeds</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="font-bold uppercase tracking-wider text-slate-600 text-[11px] block">
                        Strictly Out of Scope
                      </span>
                      <ul className="space-y-1 text-slate-600 list-disc pl-4 leading-relaxed">
                        <li>No replacement of corporate general ledger or payroll engines</li>
                        <li>No proprietary scanning hardware devices</li>
                        <li>No physical paper storage or warehouse logistics</li>
                        <li>No ingestion of non-corporate personal credit cards</li>
                        <li>No direct bank wire disbursement execution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SRS - SOFTWARE REQUIREMENTS SPECIFICATION */}
            {activeDoc === 'srs' && (
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Technical Engineering Specification
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: SRS-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Software Requirements Specification (SRS)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    Engineering requirements governing software architecture, AI inference latency, cloud synchronization protocol, data encryption, and high-availability SLAs.
                  </p>
                </div>

                {/* Section 1: Architectural Components */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>System Architecture Overview</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                    <p>
                      <strong>Client Layer:</strong> React Native mobile application supporting offline-first persistence using SQLCipher with AES-256 encrypted database encryption.
                    </p>
                    <p>
                      <strong>Inference Pipeline:</strong> Microservices-based OCR processing engine leveraging fine-tuned transformer models running on GPU clusters, delivering sub-2-second parse times.
                    </p>
                    <p>
                      <strong>Integration Gateway:</strong> RESTful API gateway authenticated via OAuth 2.0 / SAML SSO with corporate identity providers, routing validated payloads to SAP Concur webhooks.
                    </p>
                  </div>
                </div>

                {/* Section 2: Non-Functional Specifications Table */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Non-Functional &amp; Security Specifications</span>
                  </h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10.5px]">
                        <tr>
                          <th className="px-4 py-2.5 w-24">ID</th>
                          <th className="px-4 py-2.5">Domain</th>
                          <th className="px-4 py-2.5">Specification Standard</th>
                          <th className="px-4 py-2.5 w-24">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-001</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Data Encryption</td>
                          <td className="px-4 py-2.5 text-slate-600">AES-256 for all stored imagery; TLS 1.3 in transit with certificate pinning.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-002</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Package Size</td>
                          <td className="px-4 py-2.5 text-slate-600">Mobile app binary package footprint &lt; 45 MB on app stores.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-003</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Availability</td>
                          <td className="px-4 py-2.5 text-slate-600">99.95% cloud service availability with multi-region failover.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-005</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Regulatory</td>
                          <td className="px-4 py-2.5 text-slate-600">SOC 2 Type II, GDPR, and PCI-DSS compliance certification.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TRACEABILITY MATRIX */}
            {activeDoc === 'traceability' && (
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      Requirements Traceability Matrix (RTM)
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: RTM-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    End-to-End Requirements Traceability Matrix
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    Verifies bidirectional linkage from the root business problem to customer personas, technical capabilities, traceable requirements, and system verification test plans.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10.5px]">
                      <tr>
                        <th className="px-4 py-3 w-24">Business ID</th>
                        <th className="px-4 py-3">Requirement &amp; Root Cause</th>
                        <th className="px-4 py-3 w-36">Mapped Capability</th>
                        <th className="px-4 py-3 w-28">Specification</th>
                        <th className="px-4 py-3 w-28 text-center">Coverage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">BR-001</td>
                        <td className="px-4 py-3 text-slate-900">
                          Field rep mobile capture instantly on the road without paper receipts.
                        </td>
                        <td className="px-4 py-3 text-blue-600 font-semibold">Photo Capture Module</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">PRD §1.1 · FR-001</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            100% Trace
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">BR-002</td>
                        <td className="px-4 py-3 text-slate-900">
                          Accurate OCR extraction of vendor, total, tax, and date fields.
                        </td>
                        <td className="px-4 py-3 text-purple-600 font-semibold">AI Extraction Engine</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">SRS §2.1 · AI-001</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            100% Trace
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">BR-003</td>
                        <td className="px-4 py-3 text-slate-900">
                          Offline capture and auto-sync when network connectivity returns.
                        </td>
                        <td className="px-4 py-3 text-indigo-600 font-semibold">Offline Sync Bridge</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">SRS §3.4 · FR-004</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            100% Trace
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">BR-005</td>
                        <td className="px-4 py-3 text-slate-900">
                          Workflow routing and integration into corporate ERP/Concur.
                        </td>
                        <td className="px-4 py-3 text-amber-600 font-semibold">Approval Queue API</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">PRD §2.3 · FR-005</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            100% Trace
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stage Gate Sign-Off & Governance Box (Full-Width Clean Presentation) */}
            <div className="pt-6 border-t border-slate-200">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Stage Gate Sign-Off
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      C-Suite Requirement Gathering Approval
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All Validations Complete</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  All required C-Suite validations across Business Alignment, Architecture Feasibility, and Strategic Fit have been verified against the confirmed baseline document set. Requirement Gathering is complete and ready for formal transition into Solution Planning.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">C-Suite Execs Validated</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Business Alignment Approved</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Strategic Fit Approved</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM STICKY ACTION BAR (Matching System Standard) */}
      {/* ========================================================================= */}
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document Set Validated</span>
            <span className="text-slate-400 font-normal">·</span>
            <span className="text-slate-600 font-medium">
              BRD, PRD, SRS &amp; RTM Baseline Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={confirm}
            className="px-6 py-2.5 text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Complete Requirement Gathering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
