import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { 
  Activity, 
  Plus, 
  Server, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ShieldAlert, 
  Radio, 
  RefreshCw,
  Cpu
} from 'lucide-react';

export const MonitoringWorkspace: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [monitorName, setMonitorName] = useState('');
  const [monitorUrl, setMonitorUrl] = useState('');
  const [monitors, setMonitors] = useState([
    { id: 'mon-1', name: 'Core Checkout API Gateway', target: 'https://api.snssquare.com/v1/checkout', type: 'HTTP HTTPS', status: 'Healthy', latency: '38ms', uptime: '99.99%' },
    { id: 'mon-2', name: 'AI Inference Router (Gemini)', target: 'https://ai-gateway.internal/route', type: 'gRPC Stream', status: 'Healthy', latency: '44ms', uptime: '100.0%' },
    { id: 'mon-3', name: 'PostgreSQL Aurora Primary', target: 'aurora-cluster.internal:5432', type: 'TCP Database', status: 'Healthy', latency: '8ms', uptime: '99.99%' },
    { id: 'mon-4', name: 'User Auth & SSO Keycloak', target: 'https://auth.snssquare.com', type: 'HTTP HTTPS', status: 'Healthy', latency: '24ms', uptime: '99.98%' },
    { id: 'mon-5', name: 'Kafka Ingestion Cluster', target: 'kafka-broker-01.internal:9092', type: 'Message Broker', status: 'Healthy', latency: '12ms', uptime: '100.0%' }
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monitorName || !monitorUrl) return;
    setMonitors(prev => [
      ...prev,
      {
        id: `mon-${Date.now()}`,
        name: monitorName,
        target: monitorUrl,
        type: 'HTTP HTTPS',
        status: 'Healthy',
        latency: '32ms',
        uptime: '100.0%'
      }
    ]);
    setIsCreateOpen(false);
    setMonitorName('');
    setMonitorUrl('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'Monitoring' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Enterprise Observability & Monitoring</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Telemetry Active
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Real-time distributed tracing, synthetic availability monitors, AI model latency telemetry, and anomaly alerting.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Monitor</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Monitors" value="48 Endpoints" subtitle="100% operational" change="All Healthy" isPositive />
        <MetricCard label="Average Latency" value="42 ms" subtitle="Global edge p50" change="-4ms faster" isPositive />
        <MetricCard label="Monthly Uptime" value="99.995%" subtitle="SLA 99.9% Target" change="0 Incidents" isPositive />
        <MetricCard label="Error Rate" value="0.0012%" subtitle="HTTP 5xx rate" change="Within limits" isPositive />
      </div>

      {/* Visual Telemetry Gauges and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauge 1: CPU & Memory Cluster Telemetry */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">
            Compute Cluster Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#64748B] font-medium">Cluster CPU Utilization</span>
                <span className="font-bold text-[#0F172A]">34.2%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '34.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#64748B] font-medium">Memory Allocation (RAM)</span>
                <span className="font-bold text-[#0F172A]">52.8%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '52.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#64748B] font-medium">Disk IOPS Headroom</span>
                <span className="font-bold text-[#0F172A]">18.5%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18.5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Gauge 2: Response Time Distribution */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">
            Latency Percentiles (Past 24h)
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div className="p-3 bg-[#F8FAFC] border rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 block">p50 MEDIAN</span>
              <span className="text-lg font-extrabold text-[#0F172A]">38ms</span>
            </div>
            <div className="p-3 bg-[#F8FAFC] border rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 block">p95 TAIL</span>
              <span className="text-lg font-extrabold text-[#0F172A]">74ms</span>
            </div>
            <div className="p-3 bg-[#F8FAFC] border rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 block">p99 WORST</span>
              <span className="text-lg font-extrabold text-[#0F172A]">124ms</span>
            </div>
          </div>
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            All services are operating comfortably within the 200ms contractual p99 SLA limit.
          </p>
        </div>

        {/* Gauge 3: AI Inference Workload Monitor */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">
            AI Token Ingestion Stream
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#64748B]">Active Streams:</span>
            <span className="text-xs font-bold text-[#2563EB]">1,480 req/min</span>
          </div>
          <div className="flex items-end gap-1 h-24 pt-4 border-b border-slate-100">
            {[40, 65, 55, 80, 70, 95, 88, 72, 85, 90, 98, 92, 84, 91, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t hover:bg-blue-500 transition-colors"
                style={{ height: `${h}%` }}
                title={`Interval ${i}: ${h * 15} tokens/s`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 text-right block mt-1">Streaming Telemetry (Live)</span>
        </div>
      </div>

      {/* Monitored Endpoints List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
        <h3 className="text-sm font-bold text-[#0F172A] mb-4">Monitored Service Endpoints</h3>
        <div className="divide-y divide-[#F1F5F9]">
          {monitors.map((mon) => (
            <div key={mon.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A]">{mon.name}</h4>
                  <span className="font-mono text-[11px] text-[#64748B]">{mon.target}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:ml-auto">
                <span className="text-slate-500 font-mono">{mon.type}</span>
                <span className="font-mono font-semibold text-slate-700">{mon.latency}</span>
                <StatusBadge status={mon.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Monitor Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Synthetic Endpoint Monitor"
        subtitle="Configure HTTP/HTTPS or TCP health check probe"
        actions={
          <>
            <button
              onClick={() => setIsCreateOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold"
            >
              Start Monitoring
            </button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Service / Endpoint Name</label>
            <input
              type="text"
              required
              value={monitorName}
              onChange={e => setMonitorName(e.target.value)}
              placeholder="e.g. Payments Gateway Microservice"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Target URL / Host</label>
            <input
              type="url"
              required
              value={monitorUrl}
              onChange={e => setMonitorUrl(e.target.value)}
              placeholder="https://api.yourservice.com/healthz"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Check Frequency</label>
              <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
                <option>Every 30 seconds</option>
                <option>Every 1 minute</option>
                <option>Every 5 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Regions</label>
              <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
                <option>Global (US, EU, AP)</option>
                <option>US-East & US-West</option>
                <option>EU-Central</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
