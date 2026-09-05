import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { mockActivities } from '../../data/mockData';
import { ActivityEvent } from '../../types';
import { Activity, Search, Filter, Download, ArrowRight, User } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityEvent[]>(mockActivities);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'product', 'service', 'agent', 'deploy', 'security'];

  const filtered = activities.filter(act => {
    const matchesCat = filterCategory === 'All' || act.category === filterCategory;
    const matchesSearch = act.target.toLowerCase().includes(search.toLowerCase()) ||
                          act.action.toLowerCase().includes(search.toLowerCase()) ||
                          act.user.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Workspace' }, { label: 'Activity' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Audit & Timeline</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Workspace Activity Stream</h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl">
            Live event logs of user actions, deployments, agent runs, and security events.
          </p>
        </div>

        <button
          onClick={() => alert('Exported activity feed as CSV.')}
          className="px-3.5 py-2 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Activity Log</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filterCategory === cat
                  ? 'bg-[#07111F] text-white shadow-sm'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search activity events..."
            className="pl-9 pr-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[#0F172A] w-full sm:w-60"
          />
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle">
        <div className="divide-y divide-[#F1F5F9] space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 flex items-start justify-between gap-4 text-xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  {item.user.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[#0F172A] leading-snug">
                    <span className="font-bold">{item.user.name}</span>{' '}
                    <span className="text-[#64748B]">{item.action}</span>
                  </p>
                  <p className="text-xs font-mono font-bold text-[#2563EB] mt-0.5">
                    {item.target}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Author: {item.user.email} • Category: {item.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-[11px] font-mono text-[#64748B]">{item.timestamp}</span>
                <div className="mt-1.5">
                  <StatusBadge status={item.status === 'success' ? 'Success' : item.status === 'warning' ? 'Warning' : 'Info'} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
