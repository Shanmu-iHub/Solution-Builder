import React from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { 
  CreditCard, 
  Download, 
  Check, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Receipt 
} from 'lucide-react';

export const UsageBillingPage: React.FC = () => {
  const invoices = [
    { id: 'INV-2026-08', date: 'Aug 31, 2026', amount: '$24,850.00', status: 'Paid', pdfUrl: '#' },
    { id: 'INV-2026-07', date: 'Jul 31, 2026', amount: '$22,410.00', status: 'Paid', pdfUrl: '#' },
    { id: 'INV-2026-06', date: 'Jun 30, 2026', amount: '$19,800.00', status: 'Paid', pdfUrl: '#' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Workspace' }, { label: 'Usage & Billing' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4" />
            <span>Plan & Quotas</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Billing & Resource Quotas</h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl">
            Monitor API token consumption, compute hours, active plan tier, and enterprise invoices.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs">
          Enterprise Tier: Active
        </span>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Current Month Total" value="$24,850.00" subtitle="Sep 1 - Sep 30" isPositive />
        <MetricCard label="Allocated Cloud Budget" value="$30,000.00" subtitle="82.4% utilized" isPositive />
        <MetricCard label="AI Tokens Consumed" value="84.2M Tokens" subtitle="30+ frontier models" isPositive />
        <MetricCard label="Next Invoice Date" value="Oct 1, 2026" subtitle="Auto-pay active" isPositive />
      </div>

      {/* Plan Card & Quotas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#07111F] to-[#0F2038] text-white rounded-2xl p-6 shadow-subtle border border-[#1E293B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Active Plan</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Enterprise Dedicated
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">SNS Square Enterprise Suite</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Full access to all 10 Products, 6 Generative Services, 6 Autonomous Agents, dedicated VPC peering, and 24/7 priority SLA support.
            </p>

            <ul className="space-y-2 text-xs text-slate-200 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                <span>Unlimited seat licenses</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                <span>SOC 2 Type II & HIPAA audit guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                <span>Zero-retention AI model privacy</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => alert('Contacting enterprise account manager...')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white shadow-sm transition-all"
          >
            Manage Enterprise Contract
          </button>
        </div>

        {/* Resource Quotas Breakdown (Cols 2-3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Monthly Quota Utilization
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-[#0F172A]">AI Inference Tokens</span>
                <span className="font-bold text-[#0F172A]">84.2M / 100M (84.2%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '84.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-[#0F172A]">DevOps CI/CD Build Minutes</span>
                <span className="font-bold text-[#0F172A]">4,120 / 10,000 mins (41.2%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '41.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-[#0F172A]">Active Synthetic Monitors</span>
                <span className="font-bold text-[#0F172A]">48 / 200 Endpoints (24%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-[#0F172A]">Audit Log Storage Retained</span>
                <span className="font-bold text-[#0F172A]">184 GB / Unlimited</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle">
        <h3 className="text-sm font-bold text-[#0F172A] mb-4">Past Invoices & Receipts</h3>
        <div className="divide-y divide-[#F1F5F9]">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Receipt className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="font-bold text-[#0F172A]">{inv.id}</span>
                  <span className="text-slate-500 text-[11px] block">{inv.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-[#0F172A]">{inv.amount}</span>
                <StatusBadge status={inv.status} />
                <button
                  onClick={() => alert(`Downloading PDF invoice: ${inv.id}`)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
