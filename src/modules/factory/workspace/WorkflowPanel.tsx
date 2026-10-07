import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCode,
  FileText,
  Filter,
  Layers,
  Loader2,
  MoreHorizontal,
  Play,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Square,
  Zap,
} from 'lucide-react';
import { cx, useToast } from '../../ui';

interface WorkflowItem {
  id: number;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  workflowName: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Not Started';
  progress: number;
}

const INITIAL_WORKFLOWS: WorkflowItem[] = [
  { id: 1, endpoint: '/api/auth/login', method: 'POST', description: 'User authentication', workflowName: 'Auth - Login', status: 'Completed', progress: 100 },
  { id: 2, endpoint: '/api/auth/register', method: 'POST', description: 'User registration', workflowName: 'Auth - Register', status: 'Completed', progress: 100 },
  { id: 3, endpoint: '/api/users', method: 'GET', description: 'Get all users', workflowName: 'User Management', status: 'Completed', progress: 100 },
  { id: 4, endpoint: '/api/expenses', method: 'GET', description: 'List expenses', workflowName: 'Expenses - List', status: 'Completed', progress: 100 },
  { id: 5, endpoint: '/api/expenses', method: 'POST', description: 'Create expense', workflowName: 'Expenses - Create', status: 'In Progress', progress: 65 },
  { id: 6, endpoint: '/api/expenses/[id]', method: 'GET', description: 'Get expense by ID', workflowName: 'Expenses - Get', status: 'In Progress', progress: 40 },
  { id: 7, endpoint: '/api/expenses/[id]', method: 'PUT', description: 'Update expense', workflowName: 'Expenses - Update', status: 'Pending', progress: 0 },
  { id: 8, endpoint: '/api/expenses/[id]', method: 'DELETE', description: 'Delete expense', workflowName: 'Expenses - Delete', status: 'Pending', progress: 0 },
  { id: 9, endpoint: '/api/reports', method: 'GET', description: 'Generate reports', workflowName: 'Reports - Generate', status: 'Not Started', progress: 0 },
  { id: 10, endpoint: '/api/notifications', method: 'GET', description: 'Get notifications', workflowName: 'Notifications', status: 'Not Started', progress: 0 },
];

export const WorkflowPanel: React.FC<{ projectName?: string }> = ({ projectName = 'ExpensifyIQ' }) => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<WorkflowItem[]>(INITIAL_WORKFLOWS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'In Progress' | 'Pending' | 'Not Started'>('All');
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [generatingAll, setGeneratingAll] = useState(false);

  const completedCount = workflows.filter(w => w.status === 'Completed').length;
  const inProgressCount = workflows.filter(w => w.status === 'In Progress').length;
  const pendingCount = workflows.filter(w => w.status === 'Pending').length;
  const totalCount = workflows.length;
  const overallPercent = Math.round((completedCount / totalCount) * 100);

  const filteredWorkflows = workflows.filter(w => {
    const matchesSearch =
      w.endpoint.toLowerCase().includes(search.toLowerCase()) ||
      w.workflowName.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleGenerateAll = () => {
    setGeneratingAll(true);
    toast({ title: 'Generating workflows', description: 'Executing Agent Builder synthesis for 10 endpoints.' });
    setTimeout(() => {
      setWorkflows(prev =>
        prev.map(w => ({
          ...w,
          status: 'Completed',
          progress: 100,
        }))
      );
      setGeneratingAll(false);
      toast({ title: 'All workflows generated', description: '10 of 10 backend endpoint agent workflows are ready.' });
    }, 2000);
  };

  const methodBadge = (method: WorkflowItem['method']) => {
    switch (method) {
      case 'POST':
        return <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">POST</span>;
      case 'GET':
        return <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200">GET</span>;
      case 'PUT':
        return <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-amber-50 text-amber-600 border border-amber-200">PUT</span>;
      case 'DELETE':
        return <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-rose-50 text-rose-600 border border-rose-200">DELETE</span>;
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6 space-y-6 font-sans bg-[#F9F9F8]">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight">Workflow Generation</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Generating agent workflows for each backend endpoint using Agent Builder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toast({ title: 'Workflow Settings', description: 'Default schema: Agent Workflow v2, Provider: Claude-Sonnet-3.5' })}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition cursor-pointer"
          >
            <Settings size={14} />
            <span>Workflow Settings</span>
          </button>

          <button
            onClick={handleGenerateAll}
            disabled={generatingAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
          >
            {generatingAll ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            <span>{generatingAll ? 'Generating...' : 'Generate All Workflows'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Total Endpoints */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Endpoints</span>
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <FileCode size={13} />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-stone-900">{totalCount}</p>
            <p className="text-[11px] text-stone-500 mt-0.5">API endpoints detected</p>
          </div>
        </div>

        {/* Generated */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Generated</span>
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <Check size={13} />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
            <p className="text-[11px] text-stone-500 mt-0.5">Workflows completed</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">In Progress</span>
            <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <Loader2 size={13} className="animate-spin" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-purple-600">{inProgressCount}</p>
            <p className="text-[11px] text-stone-500 mt-0.5">Currently generating</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Pending</span>
            <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <Clock size={13} />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            <p className="text-[11px] text-stone-500 mt-0.5">Waiting in queue</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="col-span-2 md:col-span-1 bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Overall Progress</span>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-stone-900">{overallPercent}%</span>
              <span className="text-[10px] text-stone-500">{completedCount} of {totalCount}</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Workflows Table Card */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/50">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Endpoint Workflows</h3>
            <p className="text-xs text-stone-500">
              Each backend API endpoint will be converted into an agent workflow
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search endpoints..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-indigo-500 w-44"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 bg-white text-stone-700 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Not Started">Not Started</option>
            </select>

            {/* Refresh */}
            <button
              onClick={() => toast({ title: 'Workflows refreshed' })}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-500 cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-bold">#</th>
                <th className="py-3 px-4 font-bold">API Endpoint</th>
                <th className="py-3 px-3 font-bold">Method</th>
                <th className="py-3 px-4 font-bold">Description</th>
                <th className="py-3 px-4 font-bold">Workflow Name</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Progress</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans">
              {filteredWorkflows.map(item => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition">
                  <td className="py-3 px-4 font-mono text-stone-400 text-[11px]">{item.id}</td>
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">{item.endpoint}</td>
                  <td className="py-3 px-3">{methodBadge(item.method)}</td>
                  <td className="py-3 px-4 text-stone-600">{item.description}</td>
                  <td className="py-3 px-4 font-semibold text-stone-800">{item.workflowName}</td>
                  <td className="py-3 px-4">
                    {item.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check size={11} /> Completed
                      </span>
                    )}
                    {item.status === 'In Progress' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" /> In Progress
                      </span>
                    )}
                    {item.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
                      </span>
                    )}
                    {item.status === 'Not Started' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                        ○ Not Started
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-stone-500 min-w-[28px]">{item.progress}%</span>
                      <div className="flex-1 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={cx(
                            'h-full rounded-full',
                            item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'In Progress' ? 'bg-indigo-500' : 'bg-stone-300'
                          )}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === 'Completed' ? (
                        <>
                          <button
                            onClick={() => setSelectedWorkflow(item)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 cursor-pointer shadow-2xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() => toast({ title: 'Exported workflow JSON', description: `${item.workflowName}.json` })}
                            className="p-1 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
                            title="Download workflow"
                          >
                            <Download size={13} />
                          </button>
                        </>
                      ) : item.status === 'In Progress' ? (
                        <>
                          <button
                            onClick={() => setSelectedWorkflow(item)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded border border-stone-200 bg-white hover:bg-stone-50 text-purple-700 cursor-pointer shadow-2xs"
                          >
                            View Logs
                          </button>
                          <button
                            onClick={() => toast({ title: 'Workflow paused', tone: 'info' })}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50 cursor-pointer"
                            title="Stop"
                          >
                            <Square size={12} className="fill-current" />
                          </button>
                        </>
                      ) : item.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => {
                              setWorkflows(prev => prev.map(w => w.id === item.id ? { ...w, status: 'In Progress', progress: 10 } : w));
                              toast({ title: 'Workflow queued for execution' });
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 cursor-pointer"
                          >
                            Queue
                          </button>
                          <button className="p-1 text-stone-400 hover:text-stone-600 cursor-pointer">
                            <MoreHorizontal size={13} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setWorkflows(prev => prev.map(w => w.id === item.id ? { ...w, status: 'In Progress', progress: 20 } : w));
                              toast({ title: 'Started workflow generation' });
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 cursor-pointer"
                          >
                            Start
                          </button>
                          <button className="p-1 text-stone-400 hover:text-stone-600 cursor-pointer">
                            <MoreHorizontal size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workflow Inspect Drawer Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-stone-900">{selectedWorkflow.workflowName}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                  {selectedWorkflow.endpoint}
                </span>
              </div>
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer rounded-lg hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block mb-1">
                  Agent Workflow Pipeline Definition
                </span>
                <pre className="p-3 bg-stone-950 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
{JSON.stringify({
  workflowId: `wf-${selectedWorkflow.id}`,
  name: selectedWorkflow.workflowName,
  endpoint: selectedWorkflow.endpoint,
  method: selectedWorkflow.method,
  triggers: ['http_request'],
  steps: [
    { name: 'authenticate_jwt', handler: 'auth.verifyToken' },
    { name: 'validate_payload', schema: `${selectedWorkflow.workflowName}Schema` },
    { name: 'execute_db_query', collection: selectedWorkflow.endpoint.split('/')[2] || 'records' },
    { name: 'format_response', status: 200 }
  ],
  status: selectedWorkflow.status,
  progress: `${selectedWorkflow.progress}%`
}, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
