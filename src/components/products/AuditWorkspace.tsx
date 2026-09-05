import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { DataTable, Column } from '../common/DataTable';
import { Modal } from '../common/Modal';
import { mockAuditLogs } from '../../data/mockData';
import { AuditRecord } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Filter, 
  Lock, 
  User, 
  Globe, 
  FileText, 
  Terminal,
  Check
} from 'lucide-react';

export const AuditWorkspace: React.FC = () => {
  const [logs, setLogs] = useState<AuditRecord[]>(mockAuditLogs);
  const [selectedLog, setSelectedLog] = useState<AuditRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const filteredLogs = logs.filter(l => {
    if (statusFilter === 'All') return true;
    return l.status === statusFilter;
  });

  const columns: Column<AuditRecord>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (l) => <span className="font-mono text-[11px] text-slate-500">{l.timestamp}</span>
    },
    {
      key: 'user',
      header: 'Actor / IAM Principal',
      sortable: true,
      render: (l) => (
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-[#0F172A]">{l.user}</span>
        </div>
      )
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: (l) => <span className="font-mono font-bold text-xs text-[#2563EB]">{l.action}</span>
    },
    {
      key: 'resource',
      header: 'Resource Target',
      render: (l) => <span className="font-mono text-xs text-slate-600 truncate max-w-xs block">{l.resource}</span>
    },
    {
      key: 'status',
      header: 'Result',
      sortable: true,
      render: (l) => <StatusBadge status={l.status} />
    },
    {
      key: 'ip',
      header: 'IP Address',
      render: (l) => <span className="font-mono text-xs text-slate-500">{l.ip}</span>
    },
    {
      key: 'details',
      header: 'Inspector',
      render: (l) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLog(l);
          }}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
        >
          Details
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'Audit' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Immutable Security Audit Trail</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Cryptographically Signed
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Tamper-evident logs of all workspace operations, IAM role modifications, API tokens, and AI agent executions.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
          <span>{copied ? 'Audit Stream Exported!' : 'Export SIEM Feed (JSON)'}</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Audit Events (30d)" value="1.4M Events" subtitle="Zero data loss" isPositive />
        <MetricCard label="Security Denials" value="1 Blocked" subtitle="Geo-fence policy" change="Threat Neutralized" isPositive />
        <MetricCard label="Retention Policy" value="7 Years" subtitle="Compliant with SOC2/ISO" isPositive />
        <MetricCard label="SIEM Sync" value="Real-time" subtitle="Datadog / Splunk Hook" isPositive />
      </div>

      {/* Filters & Audit Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-[#0F172A]">Workspace Activity Stream</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B]">Filter Status:</span>
            {['All', 'Success', 'Denied'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === st 
                    ? 'bg-[#07111F] text-white' 
                    : 'bg-white border border-[#E2E8F0] text-slate-600 hover:bg-[#F8FAFC]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredLogs}
          searchKey="user"
          searchPlaceholder="Search actor, email, or action..."
          onRowClick={(item) => setSelectedLog(item)}
        />
      </div>

      {/* Modal / Drawer for Audit Inspector */}
      {selectedLog && (
        <Modal
          isOpen={!!selectedLog}
          onClose={() => setSelectedLog(null)}
          title={`Audit Event Details: ${selectedLog.id}`}
          subtitle={`${selectedLog.action} by ${selectedLog.user}`}
          actions={
            <button
              onClick={() => setSelectedLog(null)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div>
                <span className="text-[10px] font-bold text-[#64748B] block">TIMESTAMP</span>
                <span className="font-mono text-xs text-[#0F172A]">{selectedLog.timestamp} UTC</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#64748B] block">OUTCOME</span>
                <StatusBadge status={selectedLog.status} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#64748B] block">ACTOR IP</span>
                <span className="font-mono text-xs text-[#0F172A]">{selectedLog.ip}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#64748B] block">RESOURCE</span>
                <span className="font-mono text-xs text-[#2563EB]">{selectedLog.resource}</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#64748B] block mb-1">EVENT PAYLOAD DETAILS</label>
              <div className="p-3 bg-[#07111F] text-slate-200 rounded-xl font-mono text-[11px] leading-relaxed">
                {selectedLog.details}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#64748B] block mb-1">CLIENT USER AGENT</label>
              <div className="p-2 bg-slate-50 border rounded-lg text-[11px] text-slate-600 font-mono">
                {selectedLog.userAgent}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
