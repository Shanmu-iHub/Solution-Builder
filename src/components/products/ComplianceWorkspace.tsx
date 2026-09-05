import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { DataTable, Column } from '../common/DataTable';
import { mockComplianceControls } from '../../data/mockData';
import { ComplianceControl } from '../../types';
import { 
  FileCheck, 
  ShieldCheck, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  FileSpreadsheet,
  Sparkles
} from 'lucide-react';

export const ComplianceWorkspace: React.FC = () => {
  const [controls, setControls] = useState<ComplianceControl[]>(mockComplianceControls);
  const [activeFramework, setActiveFramework] = useState<string>('All');
  const [isScanning, setIsScanning] = useState(false);

  const frameworks = ['All', 'SOC 2 Type II', 'ISO 27001', 'HIPAA', 'GDPR'];

  const filteredControls = controls.filter(c => {
    if (activeFramework === 'All') return true;
    return c.framework === activeFramework;
  });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setControls(prev => prev.map(c => ({ ...c, lastAudited: 'Just now' })));
    }, 1000);
  };

  const columns: Column<ComplianceControl>[] = [
    {
      key: 'id',
      header: 'Control ID',
      sortable: true,
      render: (c) => <span className="font-mono font-bold text-xs text-[#0F172A]">{c.id}</span>
    },
    {
      key: 'controlName',
      header: 'Security Control Requirement',
      sortable: true,
      render: (c) => (
        <div>
          <span className="font-semibold text-[#0F172A] block">{c.controlName}</span>
          <span className="text-[10px] text-[#64748B]">{c.framework}</span>
        </div>
      )
    },
    {
      key: 'score',
      header: 'Score',
      sortable: true,
      render: (c) => (
        <span className={`font-bold ${c.score === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
          {c.score}%
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (c) => <StatusBadge status={c.status} />
    },
    {
      key: 'owner',
      header: 'Owner',
      render: (c) => <span className="text-slate-600">{c.owner}</span>
    },
    {
      key: 'lastAudited',
      header: 'Last Evidence Sync',
      render: (c) => <span className="text-slate-500 font-mono text-[11px]">{c.lastAudited}</span>
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'Compliance' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Security Compliance & Risk Posture</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Auditor-Ready
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Automated continuous evidence collection and posture evaluation for SOC 2 Type II, ISO 27001, HIPAA, and GDPR frameworks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Evidence...' : 'Scan Cloud Evidence'}</span>
          </button>
          <button
            onClick={() => alert('Downloaded auditor packet (ZIP) containing cryptographic proof of all 148 passed controls.')}
            className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Auditor Report</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Readiness Score" value="96.2%" subtitle="Weighted control health" change="+3.1% this quarter" isPositive />
        <MetricCard label="Verified Controls" value="148 / 152" subtitle="4 in remediation" change="High compliance" isPositive />
        <MetricCard label="Active Frameworks" value="4 Standards" subtitle="SOC2, ISO, HIPAA, GDPR" isPositive />
        <MetricCard label="Evidence Auto-Sync" value="Continuous" subtitle="Hourly AWS/GitHub pull" isPositive />
      </div>

      {/* Framework Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {frameworks.map((fw) => (
          <button
            key={fw}
            onClick={() => setActiveFramework(fw)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeFramework === fw
                ? 'bg-[#07111F] text-white shadow-sm'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            {fw}
          </button>
        ))}
      </div>

      {/* Controls Table */}
      <div className="space-y-3">
        <DataTable
          columns={columns}
          data={filteredControls}
          searchKey="controlName"
          searchPlaceholder="Search controls, frameworks, or policies..."
        />
      </div>
    </div>
  );
};
