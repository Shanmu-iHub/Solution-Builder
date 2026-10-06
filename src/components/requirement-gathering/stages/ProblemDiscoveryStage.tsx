import React, { useState } from 'react';
import {
  AlertCircle,
  FileText,
  GitBranch,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  Activity
} from 'lucide-react';

export const ProblemDiscoveryStage: React.FC = () => {
  const [problemValidationDecision, setProblemValidationDecision] = useState<'validated' | 'assumption'>('validated');

  const rootCauses = [
    {
      id: 'rc_capture',
      symptom: 'Receipts lost or submitted weeks late',
      because: 'Reps lack mobile scanning tools and store paper slips in cars/wallets',
      rootCause: 'No point-of-sale receipt capture mechanism during travel',
      active: true
    },
    {
      id: 'rc_approval',
      symptom: 'Approvals take 10+ business days',
      because: 'Managers receive claims via email attachments without policy flags',
      rootCause: 'No centralized real-time approval queue with exception alerts',
      active: true
    },
    {
      id: 'rc_entry',
      symptom: 'Finance spends 15 hours/week manual re-keying',
      because: 'No integration exists between claims software and SAP Concur',
      rootCause: 'Data silo between expense capture and enterprise ledger',
      active: true
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 7 Facets Problem Context Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Problem Context Analysis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">1. Current Process</span>
            <p className="text-slate-700 mt-1">Paper receipts saved, emailed to manager at month-end, manual spreadsheet creation.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">2. Pain Points</span>
            <p className="text-slate-700 mt-1">Unreimbursed rep cash flow, manager email backlog, finance re-entry friction.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">3. Affected Users</span>
            <p className="text-slate-700 mt-1">120 field sales representatives, 18 regional managers, 4 finance accountants.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">4. Existing Handling</span>
            <p className="text-slate-700 mt-1">Ad-hoc spreadsheets, PDF scans, manual verification against printed company policy.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">5. Frequency & Volume</span>
            <p className="text-slate-700 mt-1">~1,400 receipt transactions monthly, peaking during quarterly travel cycles.</p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">6. Severity</span>
            <p className="text-rose-700 font-semibold mt-1">High: Employee dissatisfaction, delayed expense visibility, audit vulnerability.</p>
          </div>
        </div>
      </div>

      {/* Root Cause Chains */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Root Cause Breakdown
        </h3>
        <div className="space-y-3">
          {rootCauses.map((rc, idx) => (
            <div key={rc.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                  Chain 0{idx + 1}: {rc.id.replace('rc_', '').toUpperCase()}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  Document-Verified
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Symptom</span>
                  <p className="text-slate-700">{rc.symptom}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100">
                  <span className="text-[10px] font-bold uppercase text-amber-700 block mb-0.5">Because</span>
                  <p className="text-slate-700">{rc.because}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                  <span className="text-[10px] font-bold uppercase text-indigo-700 block mb-0.5">Root Cause</span>
                  <p className="text-indigo-950 font-medium">{rc.rootCause}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validated Problem Statement */}
      <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">Problem Statement Framing</h4>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setProblemValidationDecision('validated')}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                problemValidationDecision === 'validated'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              ✓ Validated Problem
            </button>
            <button
              type="button"
              onClick={() => setProblemValidationDecision('assumption')}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                problemValidationDecision === 'assumption'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Working Assumption
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
          Field sales personnel experience an average 18-day delay between expense occurrence and reimbursement due to lack of immediate mobile capture and fragmented email routing. This leads to 12% receipt loss, recurring cash-flow friction, and 15 weekly hours of manual re-keying by finance.
        </p>
      </div>
    </div>
  );
};
