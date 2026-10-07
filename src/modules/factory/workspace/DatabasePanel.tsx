import React, { useState } from 'react';
import {
  Database,
  Eye,
  Layers,
  RefreshCw,
  Shield,
  Table2,
} from 'lucide-react';
import { cx, useToast } from '../../ui';

interface DatabasePanelProps {
  connected: boolean;
  onConnect: () => void;
  projectName?: string;
}

const COLLECTIONS = [
  'receipt_assets',
  'workflows',
  'categories',
  'policy_violations',
  'file_assets',
  'receipts',
  'reimbursements',
  'users',
  'audit_logs',
  'approval_rules',
  'organizations',
  'vendors',
  'budgets',
];

export const DatabasePanel: React.FC<DatabasePanelProps> = ({
  connected,
  onConnect,
  projectName = 'expensifyiq',
}) => {
  const { toast } = useToast();
  const [uri, setUri] = useState('mongodb+srv://admin:cluster99.mongodb.net/expensifyiq');
  const [dbName, setDbName] = useState(projectName.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const [selectedCollection, setSelectedCollection] = useState('receipt_assets');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      onConnect();
      toast({
        title: 'Cluster Connected',
        description: `MongoDB cluster connected to '${dbName || 'expensifyiq'}' with 13 collections.`,
      });
    }, 600);
  };

  return (
    <div className="flex h-full w-full flex-col bg-white overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
                MongoDB Live Inspector
              </h2>
              {connected ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                  CONNECTED
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200 animate-pulse">
                  AWAITING CLUSTER
                </span>
              )}
            </div>
            <p className="text-[12px] text-slate-500 leading-tight mt-0.5">
              Cluster: {dbName || 'expensifyiq'} ({COLLECTIONS.length} Collections)
            </p>
          </div>
        </div>

        <button
          onClick={() => toast({ title: 'Status Synchronized', description: 'Collections & schema refreshed.' })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[12px] font-medium shadow-xs transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Sync Status</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left Column: Credentials & Live Collections list */}
        <div className="w-80 md:w-96 shrink-0 border-r border-slate-200 bg-slate-50/50 flex flex-col overflow-y-auto p-4 space-y-6">
          {/* Cluster Credentials */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-[11.5px] uppercase tracking-wider">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>CLUSTER CREDENTIALS</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">
                  MongoDB Connection URI <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={uri}
                  onChange={e => setUri(e.target.value)}
                  placeholder="mongodb+srv://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-mono text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">
                  Database Name (Optional)
                </label>
                <input
                  type="text"
                  value={dbName}
                  onChange={e => setDbName(e.target.value)}
                  placeholder="expensifyiq"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] font-sans text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold shadow-xs cursor-pointer transition disabled:opacity-50"
              >
                <Shield className="w-4 h-4" />
                <span>{isUpdating ? 'Connecting…' : 'Update Credentials'}</span>
              </button>
            </div>
          </div>

          {/* Live Collections */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-[11.5px] uppercase tracking-wider">
                <Table2 className="w-4 h-4 text-slate-500" />
                <span>LIVE COLLECTIONS</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                {COLLECTIONS.length}
              </span>
            </div>

            <div className="space-y-1">
              {COLLECTIONS.map(col => {
                const isSelected = selectedCollection === col;
                return (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={cx(
                      'w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] font-mono transition cursor-pointer text-left',
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/60'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Table2 className={cx('w-3.5 h-3.5 shrink-0', isSelected ? 'text-blue-600' : 'text-slate-400')} />
                      <span className="truncate">{col}</span>
                    </div>
                    {isSelected && <Eye className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Collection Records */}
        <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <Table2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-[14px] font-mono font-semibold text-slate-900">
                {selectedCollection} <span className="text-slate-400 font-normal font-sans">(0 Records)</span>
              </h3>
            </div>
            <button
              onClick={() => toast({ title: 'Live Sync Triggered', description: `Checking ${selectedCollection} records.` })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[12px] font-medium shadow-xs transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Live Sync</span>
            </button>
          </div>

          {/* Empty state container matching Screenshot 1 */}
          <div className="flex-1 rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 flex items-center justify-center p-8 text-center">
            <p className="text-[13.5px] text-slate-400">
              No records in &apos;{selectedCollection}&apos; yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
