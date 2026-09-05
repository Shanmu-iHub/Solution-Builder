import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { DataTable, Column } from '../common/DataTable';
import { Modal } from '../common/Modal';
import { 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Filter, 
  Plus, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  Cpu 
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  suite: 'API Contract' | 'Web E2E' | 'Load / Perf' | 'AI Regression' | 'Security';
  status: 'Passed' | 'Failed' | 'Running' | 'Blocked';
  duration: string;
  lastRun: string;
  author: string;
  logs: string;
}

export const TestingWorkspace: React.FC = () => {
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);

  const [tests, setTests] = useState<TestCase[]>([
    {
      id: 'TC-101',
      name: 'POST /v1/checkout/process - Idempotency Check',
      suite: 'API Contract',
      status: 'Passed',
      duration: '42ms',
      lastRun: '2 mins ago',
      author: 'CI Runner',
      logs: 'HTTP 200 OK\nPayload verified.\nHeader: X-Idempotency-Key validated.'
    },
    {
      id: 'TC-102',
      name: 'User Onboarding & MFA Enrollment Journey',
      suite: 'Web E2E',
      status: 'Passed',
      duration: '1.4s',
      lastRun: '5 mins ago',
      author: 'Sanmugavel S',
      logs: 'Playwright synthetic run passed on Chromium, Firefox, WebKit.'
    },
    {
      id: 'TC-103',
      name: '50,000 req/s Sustained Load Test (15m)',
      suite: 'Load / Perf',
      status: 'Passed',
      duration: '15m 02s',
      lastRun: '1 hour ago',
      author: 'Perf Automation',
      logs: 'k6 test completed. Error rate 0.002%. p99 latency 28.4ms.'
    },
    {
      id: 'TC-104',
      name: 'Prompt Injection & PII Leakage Jailbreak Benchmark',
      suite: 'AI Regression',
      status: 'Passed',
      duration: '320ms',
      lastRun: '12 mins ago',
      author: 'Security Bot',
      logs: 'Evaluated 450 adversarial jailbreak prompts. 0 toxic or leaked responses.'
    },
    {
      id: 'TC-105',
      name: 'OAuth2 Token Expiration & Refresh Flow',
      suite: 'Security',
      status: 'Passed',
      duration: '85ms',
      lastRun: '30 mins ago',
      author: 'Elena Rostova',
      logs: 'Token refreshed successfully with zero session drops.'
    },
    {
      id: 'TC-106',
      name: 'Webhook Retry & Dead Letter Queue Evacuation',
      suite: 'API Contract',
      status: 'Passed',
      duration: '110ms',
      lastRun: '45 mins ago',
      author: 'CI Runner',
      logs: 'Kafka dead-letter replay confirmed 100% data integrity.'
    }
  ]);

  const handleRunAll = () => {
    setIsRunningAll(true);
    setTests(prev => prev.map(t => ({ ...t, status: 'Running' as const })));
    setTimeout(() => {
      setIsRunningAll(false);
      setTests(prev => prev.map(t => ({ ...t, status: 'Passed' as const, lastRun: 'Just now' })));
    }, 1200);
  };

  const columns: Column<TestCase>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      render: (t) => <span className="font-mono text-slate-500 font-medium">{t.id}</span>
    },
    {
      key: 'name',
      header: 'Test Scenario',
      sortable: true,
      render: (t) => (
        <div>
          <span className="font-bold text-[#0F172A] hover:text-[#2563EB] cursor-pointer block">{t.name}</span>
          <span className="text-[10px] text-[#64748B]">{t.suite}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (t) => <StatusBadge status={t.status} />
    },
    {
      key: 'duration',
      header: 'Execution Time',
      sortable: true,
      render: (t) => (
        <span className="text-slate-600 flex items-center gap-1 font-mono">
          <Clock className="w-3 h-3 text-slate-400" />
          {t.duration}
        </span>
      )
    },
    {
      key: 'lastRun',
      header: 'Last Run',
      render: (t) => <span className="text-slate-500">{t.lastRun}</span>
    },
    {
      key: 'actions',
      header: 'Logs',
      render: (t) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTest(t);
          }}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
        >
          View Log
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'Testing' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Continuous Testing & Validation</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Pass Rate
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Validate APIs, web applications, microservices, load tolerance, and AI model guardrails with automated continuous regression suites.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAll}
          disabled={isRunningAll}
          className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isRunningAll ? 'animate-pulse' : ''}`} />
          <span>{isRunningAll ? 'Running All Test Suites...' : 'Run All Test Suites'}</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Tests" value="2,480" subtitle="Across 6 suites" change="+142 tests" isPositive />
        <MetricCard label="Pass Rate" value="99.8%" subtitle="0 critical failures" change="+0.4% stability" isPositive />
        <MetricCard label="Code Coverage" value="94.2%" subtitle="Branch & Statement" change="High coverage" isPositive />
        <MetricCard label="Avg. Run Time" value="1m 18s" subtitle="Distributed runners" change="Fast runner" isPositive />
      </div>

      {/* Test Suites Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Active Test Executions</h3>
          <span className="text-xs text-[#64748B]">Automated CI/CD Test Pipeline</span>
        </div>
        <DataTable
          columns={columns}
          data={tests}
          searchKey="name"
          searchPlaceholder="Search test scenarios or suites..."
          onRowClick={(item) => setSelectedTest(item)}
        />
      </div>

      {/* Modal for Logs */}
      {selectedTest && (
        <Modal
          isOpen={!!selectedTest}
          onClose={() => setSelectedTest(null)}
          title={`Execution Log: ${selectedTest.id}`}
          subtitle={selectedTest.name}
          actions={
            <button
              onClick={() => setSelectedTest(null)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold"
            >
              Close
            </button>
          }
        >
          <div className="bg-[#07111F] p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2">
            <div className="text-emerald-400">=== TEST SUITE: {selectedTest.suite} ===</div>
            <div>STATUS: {selectedTest.status} (Duration: {selectedTest.duration})</div>
            <div className="text-slate-400">AUTHOR: {selectedTest.author} | {selectedTest.lastRun}</div>
            <div className="pt-2 border-t border-slate-800 whitespace-pre-wrap font-mono text-[11px] text-slate-200">
              {selectedTest.logs}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
