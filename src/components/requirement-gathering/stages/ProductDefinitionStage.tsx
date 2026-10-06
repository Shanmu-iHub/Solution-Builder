import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Users, Sparkles, Layers } from 'lucide-react';

export const ProductDefinitionStage: React.FC = () => {
  const [inScopeItems] = useState([
    'iOS & Android native receipt capture application with offline cache',
    'AI OCR receipt data extraction (merchant, date, total, tax, currency)',
    'Dynamic policy verification engine (flags violations before submission)',
    'Single-tap manager approval dashboard with push notifications',
    'Bi-directional ERP sync adapter for SAP Concur'
  ]);

  const [outOfScopeItems] = useState([
    'Direct consumer peer-to-peer payments or wallet features',
    'Corporate credit card physical card issuance / underwriting',
    'Custom accounting GL chart-of-accounts restructuring'
  ]);

  return (
    <div className="space-y-6">
      {/* Product Vision & Scope */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
        <span className="text-[10px] font-bold uppercase text-slate-400">Validated Product Vision</span>
        <p className="text-xs text-slate-800 leading-relaxed font-medium">
          A unified, mobile-first enterprise expense platform that automates receipt scanning, enforces policy pre-checks, accelerates manager approvals, and synchronizes seamlessly with corporate ERP systems.
        </p>
      </div>

      {/* Scope Boundaries: In-Scope vs Out-of-Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>In-Scope (Release 1.0)</span>
          </div>
          <ul className="space-y-2">
            {inScopeItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Out-of-Scope (Non-Goals)</span>
          </div>
          <ul className="space-y-2">
            {outOfScopeItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="text-rose-500 font-bold">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product KPIs & Success Metrics */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Product Success Metrics & Targets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">Reimbursement Turnaround</span>
            <p className="text-base font-bold text-slate-900 mt-1">≤ 48 Hours</p>
            <span className="text-[11px] text-slate-500">Reduced from 18 days baseline</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">OCR Extraction Accuracy</span>
            <p className="text-base font-bold text-slate-900 mt-1">≥ 95%</p>
            <span className="text-[11px] text-slate-500">Across itemized receipt fields</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <span className="text-[10px] font-bold uppercase text-slate-400">Finance Re-Keying Reduction</span>
            <p className="text-base font-bold text-slate-900 mt-1">100% Automated</p>
            <span className="text-[11px] text-slate-500">Via SAP Concur batch connector</span>
          </div>
        </div>
      </div>
    </div>
  );
};
