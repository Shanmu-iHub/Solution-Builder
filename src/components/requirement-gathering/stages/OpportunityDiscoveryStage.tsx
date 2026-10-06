import React, { useState } from 'react';
import {
  TrendingUp,
  Globe,
  Users,
  CheckCircle2,
  ExternalLink,
  Plus,
  ShieldCheck,
  Building2,
  Cpu
} from 'lucide-react';

export const OpportunityDiscoveryStage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('field-rep');
  const [findings, setFindings] = useState([
    {
      id: 'f-1',
      source: 'concur.com',
      title: 'Manual entry causes 19% exception rates in enterprise expense workflows',
      relevant: true,
      origin: 'Source-backed'
    },
    {
      id: 'f-2',
      source: 'expensify.com',
      title: 'Mobile OCR receipt capture reduces average claim cycle from 14 days to 3.2 days',
      relevant: true,
      origin: 'Source-backed'
    },
    {
      id: 'f-3',
      source: 'zoho.com/expense',
      title: 'Multi-level managerial approvals prevent over-budget claims before finance audit',
      relevant: true,
      origin: 'Source-backed'
    },
    {
      id: 'f-4',
      source: 'Internal expense-process-notes.pdf',
      title: 'Finance department currently re-keys approved expense claims into SAP Concur',
      relevant: true,
      origin: 'From your document'
    }
  ]);

  const toggleFinding = (id: string) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, relevant: !f.relevant } : f))
    );
  };

  return (
    <div className="space-y-6">
      {/* Starting point banner */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400">Starting Point</span>
          <p className="font-semibold text-slate-800">
            Unified Expense Management Platform (Idea Brief v2.0 Confirmed)
          </p>
        </div>
        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[11px] border border-emerald-200">
          ✓ Inputs Verified
        </span>
      </div>

      {/* 4 Opportunity Lenses */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Opportunity Lenses
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <Building2 className="w-4 h-4" />
              <span>Business Lens</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Eliminate redundant admin re-keying and reduce reimbursement latency from weeks to 48 hours.
            </p>
            <span className="text-[10px] text-slate-400 font-semibold block pt-1 border-t border-slate-100">
              Builds on operational cost targets
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <Users className="w-4 h-4" />
              <span>Customer Lens</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Field sales reps stop losing receipts and gain real-time visibility into reimbursement status.
            </p>
            <span className="text-[10px] text-slate-400 font-semibold block pt-1 border-t border-slate-100">
              Builds on sales mobility persona
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-purple-600 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Market Lens</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Differentiate via autonomous policy pre-checks before submission, avoiding post-audit rejections.
            </p>
            <span className="text-[10px] text-slate-400 font-semibold block pt-1 border-t border-slate-100">
              Competitive benchmark verified
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Cpu className="w-4 h-4" />
              <span>Technology Lens</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Leverage on-device OCR + cloud multimodal vision for instant structured receipt parsing.
            </p>
            <span className="text-[10px] text-slate-400 font-semibold block pt-1 border-t border-slate-100">
              AI feasibility confirmed
            </span>
          </div>
        </div>
      </div>

      {/* Market Research Findings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Market Research & Benchmarks
          </h3>
          <span className="text-xs text-slate-400">4 Verified Sources</span>
        </div>

        <div className="space-y-2">
          {findings.map((f, i) => (
            <div
              key={f.id}
              className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                f.relevant
                  ? 'border-slate-200 bg-white'
                  : 'border-slate-200/50 bg-slate-50/60 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-800">{f.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="text-blue-600 flex items-center gap-1 font-mono">
                      <Globe className="w-3 h-3" /> {f.source}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">{f.origin}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFinding(f.id)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border cursor-pointer ${
                  f.relevant
                    ? 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    : 'border-slate-300 text-slate-800 bg-white'
                }`}
              >
                {f.relevant ? 'Mark not relevant' : 'Restore'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Target Customers & Persona Selection */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Target Customer Segments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div
            onClick={() => setSelectedCustomer('field-rep')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedCustomer === 'field-rep'
                ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold text-sm">Field Sales Rep</strong>
              <span className="text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded-sm">
                PRIMARY
              </span>
            </div>
            <p className="text-slate-600 mb-2">
              Traveling rep incurring fuel, client dinners, and lodging costs daily.
            </p>
            <ul className="space-y-1 text-slate-500 text-[11px]">
              <li>• Wants: Rapid receipt capture on mobile</li>
              <li>• Struggles: Lost physical receipts</li>
              <li>• Today: Stashes receipts in wallet, emails finance</li>
            </ul>
          </div>

          <div
            onClick={() => setSelectedCustomer('sales-manager')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedCustomer === 'sales-manager'
                ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold text-sm">Sales Manager</strong>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-sm">
                APPROVER
              </span>
            </div>
            <p className="text-slate-600 mb-2">
              Reviews team claims and ensures expenses correlate with sales visits.
            </p>
            <ul className="space-y-1 text-slate-500 text-[11px]">
              <li>• Wants: 1-click batch approvals</li>
              <li>• Struggles: Unclear justification</li>
              <li>• Today: Sifts through email threads</li>
            </ul>
          </div>

          <div
            onClick={() => setSelectedCustomer('finance-admin')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedCustomer === 'finance-admin'
                ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold text-sm">Finance & Accounting</strong>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-sm">
                OPERATIONS
              </span>
            </div>
            <p className="text-slate-600 mb-2">
              Validates compliance and posts claims to ERP / SAP Concur.
            </p>
            <ul className="space-y-1 text-slate-500 text-[11px]">
              <li>• Wants: Direct ERP integration</li>
              <li>• Struggles: Manual re-keying errors</li>
              <li>• Today: Manual copy-paste into SAP Concur</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
