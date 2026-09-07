import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';
import { 
  GitBranch, 
  Play, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  ShieldCheck, 
  Server, 
  Terminal, 
  GitCommit, 
  Layers,
  ArrowRight,
  ArrowLeft,
  Infinity as InfinityIcon
} from 'lucide-react';

interface PipelineStage {
  name: string;
  status: 'passed' | 'running' | 'pending';
  duration: string;
}

export const DevOpsWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [isDeploying, setIsDeploying] = useState(false);
  const [stages, setStages] = useState<PipelineStage[]>([
    { name: '1. Lint & Types', status: 'passed', duration: '14s' },
    { name: '2. 2,480 Test Suites', status: 'passed', duration: '1m 18s' },
    { name: '3. Docker Build', status: 'passed', duration: '42s' },
    { name: '4. SAST Security Scan', status: 'passed', duration: '19s' },
    { name: '5. Canary Deployment (10%)', status: 'passed', duration: '45s' },
    { name: '6. Blue/Green Production', status: 'passed', duration: '20s' },
  ]);

  const [deployHistory, setDeployHistory] = useState([
    {
      id: 'dep-4091',
      commit: 'a491f82',
      message: 'feat: add Claude 3.5 Sonnet streaming support',
      branch: 'main',
      environment: 'Production (US-East-1)',
      status: 'Success',
      duration: '3m 38s',
      author: 'Sanmugavel S',
      timestamp: '18 mins ago'
    },
    {
      id: 'dep-4090',
      commit: 'c901e14',
      message: 'perf: optimize Redis vector cache serialization',
      branch: 'main',
      environment: 'Production (US-East-1)',
      status: 'Success',
      duration: '3m 12s',
      author: 'Sanmugavel S',
      timestamp: '2 hours ago'
    },
    {
      id: 'dep-4089',
      commit: 'e812d90',
      message: 'fix: handle token expiration during stream reconnect',
      branch: 'main',
      environment: 'Production (US-East-1)',
      status: 'Success',
      duration: '3m 05s',
      author: 'Sanmugavel S',
      timestamp: '5 hours ago'
    }
  ]);

  const handleTriggerDeploy = () => {
    setIsDeploying(true);
    setStages(prev => prev.map((s, i) => ({ ...s, status: i === 0 ? 'running' : 'pending' })));

    setTimeout(() => {
      setStages(prev => prev.map(s => ({ ...s, status: 'passed' })));
      setIsDeploying(false);
      setDeployHistory(prev => [
        {
          id: `dep-${Date.now().toString().slice(-4)}`,
          commit: 'b719c22',
          message: 'manual: triggered Blue/Green release v2.4.1',
          branch: 'main',
          environment: 'Production (US-East-1)',
          status: 'Success',
          duration: '3m 20s',
          author: 'Sanmugavel S',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }, 1500);
  };

  const config = getOfferingConfig('devops');

  if (viewMode === 'landing' && config) {
    return <ProductLandingLayout config={config} onOpenConsole={() => setViewMode('console')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 hover:text-orange-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to DevOps Overview</span>
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
            className="px-3 py-1 rounded-lg bg-white text-orange-600 shadow-2xs font-semibold cursor-pointer"
          >
            Live Console
          </button>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'Products' }, { label: 'DevOps' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">DevOps CI/CD & Delivery Control Plane</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                GitOps Sync: Synced
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Multi-stage pipeline automation, blue/green and canary zero-downtime deployments, ephemeral PR environments, and instant rollback.
            </p>
          </div>
        </div>

        <button
          onClick={handleTriggerDeploy}
          disabled={isDeploying}
          className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isDeploying ? 'animate-spin' : ''}`} />
          <span>{isDeploying ? 'Executing Pipeline...' : 'Deploy to Production'}</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Deploy Velocity" value="18 / day" subtitle="Production rollouts" change="High velocity" isPositive />
        <MetricCard label="Pipeline Success" value="98.9%" subtitle="Past 90 days" change="+1.2% reliability" isPositive />
        <MetricCard label="Lead Time for Changes" value="12 mins" subtitle="Commit to Production" change="-4m faster" isPositive />
        <MetricCard label="MTTR (Mean Recovery)" value="4m 12s" subtitle="Automated rollback" change="Fast recovery" isPositive />
      </div>

      {/* Visual Pipeline DAG Flow */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Active Production Release Pipeline DAG
            </h3>
            <span className="text-[11px] text-[#64748B]">Branch: main • Target: us-east-1 Production Cluster</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            {isDeploying ? '● RUNNING' : '✔ ALL STAGES GREEN'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                stage.status === 'running'
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400">STAGE {idx + 1}</span>
                  {stage.status === 'passed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : stage.status === 'running' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-300" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#0F172A] leading-tight mb-2">{stage.name}</h4>
              </div>
              <span className="text-[10px] font-mono text-[#64748B] block mt-2 pt-2 border-t border-slate-200">
                {stage.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment History Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
        <h3 className="text-sm font-bold text-[#0F172A] mb-4">Deployment History & Rollbacks</h3>
        <div className="divide-y divide-[#F1F5F9]">
          {deployHistory.map((dep) => (
            <div key={dep.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0 mt-0.5">
                  <GitCommit className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#0F172A] bg-slate-100 px-1.5 py-0.5 rounded">
                      {dep.commit}
                    </span>
                    <span className="font-bold text-[#0F172A]">{dep.message}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#64748B]">
                    <span>{dep.environment}</span>
                    <span>•</span>
                    <span>By {dep.author}</span>
                    <span>•</span>
                    <span>{dep.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:ml-auto">
                <StatusBadge status={dep.status} />
                <button
                  onClick={() => alert(`Triggered instantaneous zero-downtime rollback to revision ${dep.commit}`)}
                  className="px-2.5 py-1 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded text-[11px] font-medium transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Rollback</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
