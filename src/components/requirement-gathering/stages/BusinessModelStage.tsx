import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Building,
  CheckCircle2,
  Calculator,
  Percent
} from 'lucide-react';

export const BusinessModelStage: React.FC = () => {
  const [repCount, setRepCount] = useState(120);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(3.5);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [annualSoftwareCost, setAnnualSoftwareCost] = useState(36000);

  const annualLaborSavings = Math.round(repCount * hoursSavedPerWeek * 48 * hourlyRate);
  const netAnnualBenefit = annualLaborSavings - annualSoftwareCost;
  const paybackMonths = Math.round((annualSoftwareCost / (annualLaborSavings / 12)) * 10) / 10;

  return (
    <div className="space-y-6">
      
      {/* 9-Block Lean Canvas Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          9-Block Lean Canvas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-xs">
          
          {/* Problem */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">1. Problem</span>
            <p className="text-slate-700">Lost receipts, 18-day reimbursement lag, manual re-keying into ERP.</p>
          </div>

          {/* Solution */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">2. Solution</span>
            <p className="text-slate-700">Mobile OCR receipt capture, automated policy checks, 1-tap manager approval.</p>
          </div>

          {/* Value Proposition */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">3. Unique Value</span>
            <p className="text-slate-700">Zero lost receipts and reimbursement within 48 hours for traveling teams.</p>
          </div>

          {/* Unfair Advantage */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">4. Advantage</span>
            <p className="text-slate-700">Pre-built bidirectional synchronization connector with legacy SAP Concur.</p>
          </div>

          {/* Customer Segments */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">5. Segments</span>
            <p className="text-slate-700">Field sales reps, regional sales managers, and finance accounting teams.</p>
          </div>

          {/* Key Metrics */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">6. Key Metrics</span>
            <p className="text-slate-700">Average days to reimburse, monthly lost receipts, rep submission rate.</p>
          </div>

          {/* Channels */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">7. Channels</span>
            <p className="text-slate-700">Internal enterprise mobile MDM portal, web browser workspace.</p>
          </div>

          {/* Cost Structure */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">8. Cost Structure</span>
            <p className="text-slate-700">Platform subscription, cloud OCR inference, SAP integration maintenance.</p>
          </div>

          {/* Revenue / Value Streams */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 md:col-span-2">
            <span className="text-[10px] font-bold uppercase text-slate-400">9. Return on Investment (ROI)</span>
            <p className="text-slate-700">Recaptured sales rep field selling time + reduction in unapproved over-spending.</p>
          </div>
        </div>
      </div>

      {/* Financial ROI Calculator (Strictly based on User Inputs) */}
      <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">Financial Modeling & Economics</h4>
          </div>
          <span className="text-[10px] font-semibold text-slate-400">
            CFO Reviewable Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
              Field Sales Reps Count
            </label>
            <input
              type="number"
              value={repCount}
              onChange={(e) => setRepCount(Number(e.target.value) || 0)}
              className="w-full bg-white border border-slate-200 rounded p-1.5 font-semibold text-slate-800"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
              Hours Saved / Rep / Week
            </label>
            <input
              type="number"
              step="0.5"
              value={hoursSavedPerWeek}
              onChange={(e) => setHoursSavedPerWeek(Number(e.target.value) || 0)}
              className="w-full bg-white border border-slate-200 rounded p-1.5 font-semibold text-slate-800"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
              Loaded Hourly Rate ($)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
              className="w-full bg-white border border-slate-200 rounded p-1.5 font-semibold text-slate-800"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
              Annual Platform Cost ($)
            </label>
            <input
              type="number"
              value={annualSoftwareCost}
              onChange={(e) => setAnnualSoftwareCost(Number(e.target.value) || 0)}
              className="w-full bg-white border border-slate-200 rounded p-1.5 font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Calculated Financial Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] font-bold uppercase text-emerald-800">Annual Labor Savings</span>
            <p className="text-lg font-bold text-emerald-900 mt-0.5">
              ${annualLaborSavings.toLocaleString()}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200">
            <span className="text-[10px] font-bold uppercase text-indigo-800">Net Annual Benefit</span>
            <p className="text-lg font-bold text-indigo-900 mt-0.5">
              ${netAnnualBenefit.toLocaleString()}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
            <span className="text-[10px] font-bold uppercase text-blue-800">Payback Period</span>
            <p className="text-lg font-bold text-blue-900 mt-0.5">
              {paybackMonths} Months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
