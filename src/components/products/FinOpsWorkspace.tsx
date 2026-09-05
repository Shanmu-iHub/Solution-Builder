import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { 
  DollarSign, 
  TrendingDown, 
  Sparkles, 
  Check, 
  AlertCircle, 
  PieChart, 
  ArrowUpRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  impact: string;
  category: string;
  savings: number;
  applied: boolean;
}

export const FinOpsWorkspace: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 'rec-1',
      title: 'Rightsize 6 underutilized EKS worker nodes from c5.2xlarge to c5.xlarge',
      impact: 'Zero downtime rolling update',
      category: 'Compute Rightsizing',
      savings: 1420,
      applied: false
    },
    {
      id: 'rec-2',
      title: 'Purchase 1-Year Compute Savings Plan for production US-East-1',
      impact: 'Guaranteed 32% discount on steady-state baseload',
      category: 'Commitment Discount',
      savings: 2850,
      applied: false
    },
    {
      id: 'rec-3',
      title: 'Migrate old S3 backup buckets to Glacier Instant Retrieval',
      impact: 'Automated lifecycle rule',
      category: 'Storage Optimization',
      savings: 640,
      applied: false
    },
    {
      id: 'rec-4',
      title: 'Enable semantic caching for repeat LLM prompts on AI Gateway',
      impact: 'Reduces duplicate API calls to OpenAI/Claude',
      category: 'AI Token FinOps',
      savings: 1510,
      applied: false
    }
  ]);

  const [appliedCount, setAppliedCount] = useState(0);

  const handleApply = (id: string) => {
    setRecommendations(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, applied: true };
      }
      return r;
    }));
    setAppliedCount(c => c + 1);
  };

  const totalPotentialSavings = recommendations.filter(r => !r.applied).reduce((acc, r) => acc + r.savings, 0);
  const realizedSavings = recommendations.filter(r => r.applied).reduce((acc, r) => acc + r.savings, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'FinOps' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Cloud FinOps & Cost Intelligence</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ${realizedSavings > 0 ? `${realizedSavings}/mo Saved` : 'Optimization Ready'}
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Gain visibility into multi-cloud spending, detect resource waste, set automated budget thresholds, and optimize unit economics.
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#64748B] block">Current Billing Cycle</span>
          <span className="text-sm font-bold text-[#0F172A]">Sep 1 - Sep 30, 2026</span>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Current Month Spend" value="$24,850" subtitle="82.4% of $30k budget" change="-14% vs budget" isPositive />
        <MetricCard label="Projected Run Rate" value="$28,400" subtitle="Expected end of month" change="On Track" isPositive />
        <MetricCard label="Active Savings Pipeline" value={`$${totalPotentialSavings}/mo`} subtitle="4 rightsizing items" change="High ROI" isPositive />
        <MetricCard label="Realized Cost Reduction" value={`$${realizedSavings}/mo`} subtitle="Applied optimizations" change="Permanent savings" isPositive />
      </div>

      {/* Cost Breakdown & Forecasting Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown by Service */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">
            Spend by Cloud Category
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 font-medium">
                <span className="text-[#0F172A]">Kubernetes & Compute (EKS)</span>
                <span className="font-bold text-[#0F172A]">$9,440 (38%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-medium">
                <span className="text-[#0F172A]">Relational Databases (Aurora)</span>
                <span className="font-bold text-[#0F172A]">$5,960 (24%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-medium">
                <span className="text-[#0F172A]">AI Foundation Models API</span>
                <span className="font-bold text-[#0F172A]">$4,470 (18%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 font-medium">
                <span className="text-[#0F172A]">Storage & Backups (S3/EBS)</span>
                <span className="font-bold text-[#0F172A]">$2,980 (12%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Spend by Project / Environment */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">
            Cost by Environment
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A]">Production (us-east-1)</span>
              <span className="font-bold text-[#2563EB]">$16,890 / mo</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A]">Staging & Pre-prod</span>
              <span className="font-bold text-[#0F172A]">$4,120 / mo</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A]">AI Research & Dev</span>
              <span className="font-bold text-[#0F172A]">$3,840 / mo</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>AI FinOps budget governor is actively guarding against spiky egress fees.</span>
          </div>
        </div>

        {/* Cloud Efficiency Score */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Unit Economics Health
            </h3>
            <div className="text-3xl font-extrabold text-[#0F172A] mb-1">
              $0.0024 <span className="text-xs font-normal text-[#64748B]">/ user session</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mb-3">
              ↓ 18% cost reduction per customer transaction
            </p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Your infrastructure efficiency is rated in the top 5% of SaaS companies of similar scale.
            </p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] flex items-center justify-between">
            <span>FinOps Maturity Score</span>
            <span className="font-bold text-emerald-600">Level 4 (Elite)</span>
          </div>
        </div>
      </div>

      {/* Automated Savings Recommendations */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Automated Optimization Opportunities</h3>
            <p className="text-xs text-[#64748B]">Apply 1-click optimizations to eliminate idle compute and reduce cloud waste</p>
          </div>
          <span className="text-xs font-bold text-emerald-600">
            ${totalPotentialSavings}/mo Available Savings
          </span>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                rec.applied 
                  ? 'bg-emerald-50/50 border-emerald-200' 
                  : 'bg-white border-[#E2E8F0] hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  rec.applied ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600'
                }`}>
                  {rec.applied ? <CheckCircle2 className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{rec.category}</span>
                    <span className="text-xs font-bold text-emerald-600">+${rec.savings}/month</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A] mt-0.5">{rec.title}</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{rec.impact}</p>
                </div>
              </div>

              <div className="sm:ml-auto">
                {rec.applied ? (
                  <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(rec.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-2xs transition-all whitespace-nowrap"
                  >
                    Apply Optimization
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
