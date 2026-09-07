import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';
import { 
  BarChart3, 
  Play, 
  Terminal, 
  Download, 
  Calendar, 
  Layers, 
  Database, 
  Zap,
  TrendingUp,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

export const AnalyticsWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sql'>('dashboard');
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT\n  date_trunc('day', timestamp) AS event_date,\n  product_name,\n  count(*) AS total_invocations,\n  avg(latency_ms) AS avg_latency\nFROM workspace_events\nWHERE timestamp >= now() - INTERVAL '7 days'\nGROUP BY 1, 2\nORDER BY 1 DESC;"
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [sqlResults, setSqlResults] = useState([
    { event_date: '2026-09-05', product_name: 'Solution Architect', total_invocations: 1420, avg_latency: '42.4ms' },
    { event_date: '2026-09-05', product_name: 'AI Models Hub', total_invocations: 8840, avg_latency: '118.2ms' },
    { event_date: '2026-09-04', product_name: 'Monitoring Probe', total_invocations: 12400, avg_latency: '14.1ms' },
    { event_date: '2026-09-04', product_name: 'FinOps Optimizer', total_invocations: 920, avg_latency: '68.0ms' },
  ]);

  const handleRunSql = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 600);
  };

  const config = getOfferingConfig('analytics');

  if (viewMode === 'landing' && config) {
    return <ProductLandingLayout config={config} onOpenConsole={() => setViewMode('console')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 hover:text-amber-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Analytics Overview</span>
        </button>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('landing')}
            className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 transition-all font-medium cursor-pointer"
          >
            Product Overview
          </button>
          <button
            onClick={() => setViewMode('console')}
            className="px-3 py-1 rounded-lg bg-white text-amber-600 shadow-2xs font-semibold cursor-pointer"
          >
            Live Console
          </button>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'Products' }, { label: 'Analytics' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Enterprise Analytics & Business Intelligence</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                ClickHouse Accelerated
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Real-time operational dashboards, high-throughput SQL query engine, cohort analytics, and AI-driven data insights.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sql')}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-600" />
            <span>SQL Query Lab</span>
          </button>
          <button
            onClick={() => alert('Exported analytics dashboard summary report as PDF.')}
            className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dashboard</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Invocations" value="14.2M req" subtitle="Past 30 days" change="+24.8% growth" isPositive />
        <MetricCard label="Avg Query Latency" value="180 ms" subtitle="Columnar cached" change="-35ms faster" isPositive />
        <MetricCard label="Connected Sources" value="12 Warehouses" subtitle="Postgres, Snowflake, S3" isPositive />
        <MetricCard label="Live Dashboards" value="36 Active" subtitle="Auto-refreshed" isPositive />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'dashboard' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Operational Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'sql' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Interactive SQL Engine</span>
        </button>
      </div>

      {/* Dashboard View */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Daily Request Volume Trend */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Daily API Invocations (Past 14 Days)
                  </h3>
                  <p className="text-[11px] text-[#64748B]">Aggregate requests across all 10 products</p>
                </div>
                <span className="text-xs font-bold text-emerald-600">+18.2% Trend</span>
              </div>

              {/* Bar Chart Visual */}
              <div className="flex items-end gap-2 h-44 pt-4 border-b border-slate-100">
                {[55, 62, 70, 68, 80, 85, 78, 92, 88, 95, 110, 105, 120, 135].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-blue-600 rounded-t group-hover:bg-blue-500 transition-colors"
                      style={{ height: `${(val / 140) * 100}%` }}
                      title={`Day ${idx + 1}: ${val * 10}k requests`}
                    />
                    <span className="text-[9px] text-slate-400 font-mono">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Product Breakdown & Latency Distribution */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Product Workload Distribution
                  </h3>
                  <p className="text-[11px] text-[#64748B]">Share of total infrastructure compute</p>
                </div>
                <span className="text-xs font-bold text-[#2563EB]">100% Balanced</span>
              </div>

              <div className="space-y-3 text-xs pt-1">
                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-[#0F172A]">AI Models Gateway & Ingestion</span>
                    <span className="font-bold text-[#0F172A]">42% (5.9M calls)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-[#0F172A]">Solution Architect Blueprints</span>
                    <span className="font-bold text-[#0F172A]">26% (3.7M calls)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '26%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-[#0F172A]">Testing & Continuous Validation</span>
                    <span className="font-bold text-[#0F172A]">18% (2.5M calls)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-[#0F172A]">Observability & FinOps</span>
                    <span className="font-bold text-[#0F172A]">14% (2.1M calls)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SQL View */}
      {activeTab === 'sql' && (
        <div className="space-y-4">
          <div className="bg-[#07111F] rounded-2xl border border-[#1E293B] overflow-hidden text-slate-200">
            <div className="px-5 py-3 border-b border-[#1E293B] bg-[#0B1625] flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400">ClickHouse SQL Editor — Read-Replica 01</span>
              <button
                onClick={handleRunSql}
                disabled={isExecuting}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
                <span>{isExecuting ? 'Running Query...' : 'Run Query (Ctrl+Enter)'}</span>
              </button>
            </div>
            <textarea
              rows={6}
              value={sqlQuery}
              onChange={e => setSqlQuery(e.target.value)}
              className="w-full p-4 bg-transparent font-mono text-xs text-blue-300 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Query Result Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Query Execution Result (4 Rows in 18ms)
              </h4>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                HTTP 200 Cached
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="p-2.5 font-bold text-[#475569]">event_date</th>
                    <th className="p-2.5 font-bold text-[#475569]">product_name</th>
                    <th className="p-2.5 font-bold text-[#475569]">total_invocations</th>
                    <th className="p-2.5 font-bold text-[#475569]">avg_latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] font-mono text-[11px]">
                  {sqlResults.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 text-slate-600">{row.event_date}</td>
                      <td className="p-2.5 text-[#0F172A] font-semibold">{row.product_name}</td>
                      <td className="p-2.5 text-blue-600 font-bold">{row.total_invocations.toLocaleString()}</td>
                      <td className="p-2.5 text-emerald-600">{row.avg_latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
