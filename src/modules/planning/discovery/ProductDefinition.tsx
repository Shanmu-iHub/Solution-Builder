import React from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, Check, Sparkles, Smartphone, 
  Users, Workflow, ShieldCheck, Clock, CheckCheck, Compass, 
  Layers, Zap, Lock, RefreshCw, BarChart3, UserCheck, Briefcase
} from 'lucide-react';
import { Button, cx } from '../../ui';
import { usePlanning } from '../PlanningStore';

export const ProductDefinition: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onComplete: () => void 
}> = ({ projectId, projectName, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

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
            Turn the confirmed business model into a simplified, clear product specification.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Step 6 · Product Definition</span>
          </span>
        </div>
      </div>

      {/* Main Workspace (Full-Width, Simplified & Clean) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* 1. PRODUCT OVERVIEW (Dark Hero Card) */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Product Overview · From your idea
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
              <span className="text-xs font-semibold text-slate-500">4 Target Roles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Primary: Field Rep */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      <Smartphone className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">Field Rep</h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Primary User
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Needs:</strong> Submit expense receipts quickly on the road and receive reimbursement without loose paperwork or manual spreadsheets.
                </p>
              </div>

              {/* Primary: Sales Manager */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                      <UserCheck className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">Sales Manager</h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    Primary Approver
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Needs:</strong> Approve team expenses efficiently in a single triage queue with budget compliance visibility and 48-hour reminders.
                </p>
              </div>

              {/* Secondary: Finance Approver */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                      <Briefcase className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">Finance Approver</h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    Secondary
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Needs:</strong> Process verified claims accurately with standardized data feeds and automated posting into enterprise accounting.
                </p>
              </div>

              {/* Secondary: Mobile Ops Lead */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                      <Workflow className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">Mobile Ops Lead</h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    Secondary
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Needs:</strong> Ensure the mobile application is securely adopted, updated via enterprise MDM, and operates reliably in the field.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. WHAT DOES IT DO? (Capabilities & Product Boundaries) */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              What does it do? · Core Capabilities &amp; Scope Boundaries
            </span>

            {/* Core Capabilities 6-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Photo Capture</span>
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Enable reps to take receipt images on smartphones with auto-edge detection.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>OCR Extraction</span>
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Automatically read date, amount, vendor, and tax from captured receipt images.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Form Auto-Populate</span>
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Fill claim fields with extracted data to eliminate tedious manual typing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Workflow Integration</span>
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Route claims directly to managers with automated SLA reminders &amp; escalation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Offline Sync</span>
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Store receipts securely offline and auto-sync when cellular signal returns.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Security &amp; Compliance</span>
                </div>
                <p className="text-[11.5px] text-slate-600">
                  Protect receipt imagery with AES-256 encryption and immutable audit logs.
                </p>
              </div>
            </div>

            {/* In-Scope vs Not-In-Scope 2-Col Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {/* In Scope */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Scope Deliverables</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Included
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Provides mobile receipt capture for field sales reps</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Uses AI OCR to extract receipt details automatically</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Auto-populates expense forms and routes through approval workflow</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Allows offline receipt capture with background auto-sync</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Implements security controls and compliance audit trails</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Distribution via internal MDM and corporate intranet</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Includes onboarding training, help-desk support &amp; in-app guides</span>
                  </li>
                </ul>
              </div>

              {/* Not in Scope */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <span className="font-bold text-xs">✕</span>
                    <span>Not in Scope (Boundaries)</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                    Excluded
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Does not replace the existing core expense ledger system</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Does not develop a custom proprietary OCR engine (uses cloud service)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Does not store, scan, or manage physical paper receipts</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Does not alter standard corporate manager approval hierarchies</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Does not ingest personal non-corporate credit card statements</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>Does not handle direct bank wire reimbursement disbursement</span>
                  </li>
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
                    <span><strong>Alex (Field Rep)</strong> photographs receipt; AI extracts fields and auto-populates claim.</span>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <span><strong>Jordan (Manager)</strong> receives notification and approves via 1-click triage queue.</span>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <span><strong>Sam (Finance)</strong> reviews verified claim data; syncs to accounting with zero typing.</span>
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
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Product Definition Validated</span>
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-600">
            Personas, Scope, UX &amp; Success Targets Confirmed
          </span>
        </div>

        <Button
          variant="primary"
          onClick={confirm}
          className="px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span>Continue to Requirements</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
