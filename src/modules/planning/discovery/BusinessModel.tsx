import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, Check, ChevronDown, ChevronRight, 
  Sparkles, Building2, Workflow, Layers, Target, HeartHandshake, 
  Share2, Users, Wallet, TrendingUp, DollarSign, 
  Compass, Briefcase
} from 'lucide-react';
import { Button, Input, cx } from '../../ui';
import { usePlanning } from '../PlanningStore';

export const BusinessModel: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onComplete: () => void 
}> = ({ projectId, projectName, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

  // Accordion toggle for sections below the BMC canvas
  const [openCase, setOpenCase] = useState<boolean>(false);
  const [openFin, setOpenFin] = useState<boolean>(false);

  // Financial figures state
  const [fin, setFin] = useState({
    cost: '140000',
    run: '30000',
    save: '122000'
  });

  const numericCost = parseFloat(fin.cost) || 0;
  const numericRun = parseFloat(fin.run) || 0;
  const numericSave = parseFloat(fin.save) || 0;
  const annualNet = numericSave - numericRun;
  const paybackMonths = numericCost > 0 && annualNet > 0 ? Math.round((numericCost / annualNet) * 12) : 14;
  const threeYearRoi = numericCost > 0 ? Math.round(((annualNet * 3 - numericCost) / numericCost) * 100) : 265;

  const confirm = () => {
    patch(projectId, { 
      businessModelConfirmed: true, 
      discoveryPage: 'product_definition' 
    });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Top Header - Compact */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#0F172A]">Business Model Canvas</h1>
          <p className="text-xs text-slate-500">
            Validated 9 building blocks, strategic value proposition, and economic model.
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Step 5 · Business Model (BMC)</span>
          </span>
        </div> */}
      </div>

      {/* Main Workspace (Full-Width, Single-Screen Fit) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <div className="max-w-6xl mx-auto space-y-4">
          
          {/* ========================================================================= */}
          {/* 1. BUSINESS MODEL CANVAS (CANONICAL 5-COLUMN BMC WITH CONCISE HINT POINTS) */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-2.5">
            
            {/* Top Operational Zone Group Headers */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-[10.5px]">
              {/* Infrastructure Zone (Cols 1-2) */}
              <div className="md:col-span-2 px-3 py-1 rounded-md bg-blue-50/80 border border-blue-200/80 flex items-center justify-between">
                <span className="font-bold text-blue-800 uppercase tracking-wider">
                  Infrastructure
                </span>
                <span className="text-blue-600 font-medium">3 Blocks</span>
              </div>

              {/* Value Proposition Zone (Col 3) */}
              <div className="md:col-span-1 px-3 py-1 rounded-md bg-amber-50/80 border border-amber-200/80 flex items-center justify-between">
                <span className="font-bold text-amber-800 uppercase tracking-wider">
                  Value Proposition
                </span>
                <span className="text-amber-600 font-medium">Core Value</span>
              </div>

              {/* Customer Structure Zone (Cols 4-5) */}
              <div className="md:col-span-2 px-3 py-1 rounded-md bg-purple-50/80 border border-purple-200/80 flex items-center justify-between">
                <span className="font-bold text-purple-800 uppercase tracking-wider">
                  Customer Structure
                </span>
                <span className="text-purple-600 font-medium">3 Blocks</span>
              </div>
            </div>

            {/* 5-Column Core Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
              
              {/* COL 1: Key Partners (Full Height) */}
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80">
                    <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Key Partners
                      </h4>
                      <span className="text-[9.5px] text-slate-400">Ecosystem</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>ERP vendors (SAP, NetSuite)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>AI OCR vision engine</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Corporate MDM provider</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Audit &amp; tax advisory</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COL 2: Stacked (Key Activities & Key Resources) */}
              <div className="flex flex-col gap-2.5">
                {/* Key Activities */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 flex-1">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 mb-2">
                    <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Workflow className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Key Activities
                      </h4>
                      <span className="text-[9.5px] text-slate-400">Operations</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Claim triage &amp; auto-routing</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Expense policy rule checks</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Automated general ledger sync</span>
                    </li>
                  </ul>
                </div>

                {/* Key Resources */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 flex-1">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 mb-2">
                    <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Key Resources
                      </h4>
                      <span className="text-[9.5px] text-slate-400">Assets</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Mobile capture application</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Approval queue microservices</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <span>Corporate travel policy rules</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COL 3: Value Proposition (Center Anchor) */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 flex flex-col justify-between shadow-2xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-amber-200/80">
                    <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Value Prop
                      </h4>
                      <span className="text-[9.5px] text-amber-700 font-semibold">Core Benefits</span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-[11.5px] text-slate-800">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1 shrink-0" />
                      <span>Instant receipt capture at POS</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1 shrink-0" />
                      <span>Reimbursement SLA cut to &lt;4 days</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1 shrink-0" />
                      <span>Zero manual re-keying for finance</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1 shrink-0" />
                      <span>100% automated policy checks</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1 shrink-0" />
                      <span>Tamper-proof audit readiness</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COL 4: Stacked (Relationships & Channels) */}
              <div className="flex flex-col gap-2.5">
                {/* Customer Relationships */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 flex-1">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 mb-2">
                    <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Relationships
                      </h4>
                      <span className="text-[9.5px] text-slate-400">Engagement</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Frictionless mobile self-service</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Automated 48h SLA reminders</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Exception-only finance review</span>
                    </li>
                  </ul>
                </div>

                {/* Customer Channels */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 flex-1">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 mb-2">
                    <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Channels
                      </h4>
                      <span className="text-[9.5px] text-slate-400">Touchpoints</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Enterprise MDM mobile app</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Web approval command portal</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Teams &amp; email action cards</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COL 5: Customer Segments (Full Height) */}
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80">
                    <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                        Segments
                      </h4>
                      <span className="text-[9.5px] text-slate-400">Beneficiaries</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Field sales reps (120+ travelers)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Line &amp; regional managers (18)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Finance &amp; accounting ops</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                      <span>Compliance &amp; CFO audit</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Bottom Financial / Revenue Zone Header */}
            <div className="px-3 py-1 rounded-md bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-[10.5px]">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">
                Financial Structure
              </span>
              <span className="text-emerald-600 font-medium">Cost vs Value Realization</span>
            </div>

            {/* Bottom 2-Column Grid: Cost Structure & Revenue Streams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              
              {/* Cost Structure */}
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200/80 mb-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Wallet className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                      Cost Structure
                    </h4>
                    <span className="text-[9.5px] text-slate-400">Capital &amp; Operational Costs</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11.5px] text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>Implementation &amp; ERP bridge ($140K)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>AI OCR per-receipt usage fees (~$0.04/scan)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>Cloud hosting &amp; encrypted receipt archival ($12K/yr)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>Annual SLA maintenance &amp; connector support ($18K/yr)</span>
                  </li>
                </ul>
              </div>

              {/* Revenue & Value Streams */}
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200/80 mb-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none">
                      Revenue &amp; Value Streams
                    </h4>
                    <span className="text-[9.5px] text-slate-400">Returns &amp; Savings</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11.5px] text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>60% reduction in manual claim touchpoints (~$84K/yr)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>~$38K annual savings via policy leakage prevention</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>4.2 hours/month rep selling capacity reclaimed</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>Early vendor settlement discounts &amp; rebates</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 2. BUSINESS CASE & FINANCIAL MODEL (BELOW CANVAS, AS LIKE NOW) */}
          {/* ========================================================================= */}
          <div className="space-y-3 pt-1">
            
            {/* Accordion 01: Strategic Business Case */}
            <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-2xs">
              <button 
                type="button"
                onClick={() => setOpenCase(!openCase)} 
                className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 font-mono">02</span>
                  <span className="text-sm font-bold text-[#0F172A]">Business Case Details</span>
                  <span className="text-xs text-slate-500 hidden sm:inline ml-2">
                    Executive value proposition, objectives, and benefits
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Validated
                  </span>
                  <span className="text-slate-400">
                    {openCase ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                </div>
              </button>

              {openCase && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                  {/* Value Proposition Callout */}
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Value Proposition
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      Reps get reimbursed without paper or chasing, and managers and finance handle claims in one tracked, policy-aware flow with automated ERP ledger posting.
                    </p>
                  </div>

                  {/* Objectives vs Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-blue-700 block">
                        Objectives
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-800">
                        <li className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Remove physical paper receipts</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Make turnaround status real-time visible</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Eliminate manual data re-keying for finance</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-700 block">
                        Benefits
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-800">
                        <li className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Reps spend less time on manual claim administration</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Managers approve from a single queue with 48h reminders</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Corporate travel policies applied consistently</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>



          </div>

        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold">
          {/* <span className="flex items-center gap-1.5 text-emerald-700 font-bold"> */}
            {/* <CheckCircle2 className="w-4 h-4 text-emerald-600" /> */}
            {/* <span>Business Model Validated:</span> */}
          {/* </span> */}
          {/* <span className="text-slate-900 font-bold">
            9 Canvas Blocks Mapped
          </span> */}
          {/* <span className="text-slate-400">·</span>
          <span className="text-slate-600">
            Payback in {paybackMonths} months
          </span> */}
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
    </div>
  );
};
