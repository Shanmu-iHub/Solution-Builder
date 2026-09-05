import React from 'react';
import { mockActivities, mockProjects } from '../../data/mockData';
import { useNavigation } from '../../context/NavigationContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Activity, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  Server, 
  Zap, 
  ExternalLink,
  ShieldCheck,
  FolderKanban
} from 'lucide-react';

export const PlatformOverview: React.FC = () => {
  const { setCurrentView, navigateToProduct } = useNavigation();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Col 1 & 2: Recent Activity Timeline */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Workspace Activity</h3>
              <p className="text-xs text-[#64748B]">Real-time audit events and agent executions</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('activity')}
            className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Activity Feed */}
        <div className="divide-y divide-[#F1F5F9] space-y-3">
          {mockActivities.slice(0, 4).map((activity) => (
            <div key={activity.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {activity.user.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[#0F172A] leading-snug">
                    <span className="font-semibold">{activity.user.name}</span>{' '}
                    <span className="text-[#64748B]">{activity.action}</span>
                  </p>
                  <p className="text-[11px] font-mono text-[#2563EB] truncate mt-0.5">
                    {activity.target}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[10px] text-[#94A3B8]">{activity.timestamp}</span>
                <div className="mt-1">
                  <StatusBadge status={activity.status === 'success' ? 'Success' : activity.status === 'warning' ? 'Warning' : 'Info'} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: Platform Telemetry & System Health */}
      <div className="space-y-4">
        {/* Cloud Health Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">System Posture</h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              99.99% SLA
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#2563EB]" />
                <span className="font-medium text-[#0F172A]">Production Cloud</span>
              </div>
              <span className="text-emerald-600 font-semibold text-[11px]">Healthy (48 Nodes)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-[#0F172A]">AI Inference Gateway</span>
              </div>
              <span className="text-emerald-600 font-semibold text-[11px]">42ms Latency</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-[#0F172A]">SOC 2 & ISO Controls</span>
              </div>
              <span className="text-emerald-600 font-semibold text-[11px]">148 / 152 Passed</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
            <button
              onClick={() => navigateToProduct('monitoring')}
              className="w-full py-2 rounded-lg bg-[#F8FAFC] hover:bg-blue-50 text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#E2E8F0] hover:border-blue-200"
            >
              <span>Open Monitoring Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Workspace Project card */}
        <div className="bg-gradient-to-br from-[#07111F] to-[#0F2038] rounded-2xl p-5 text-white shadow-subtle border border-[#1E293B]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Current Project</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">Active</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">OmniFlow Commerce Core</h4>
          <p className="text-[11px] text-slate-300 line-clamp-2 mb-4 leading-relaxed">
            Multi-tenant microservices architecture with event-driven checkout and real-time fraud scoring.
          </p>
          <button
            onClick={() => setCurrentView('projects')}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Manage All Workspace Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
};
