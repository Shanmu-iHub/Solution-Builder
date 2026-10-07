import React, { useState } from 'react';
import {
  Coins,
  Cpu,
  DollarSign,
  HardDrive,
  PlaySquare,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { cx, useToast } from '../../ui';

interface LogItem {
  id: string;
  stepName: string;
  engine: string;
  tokens: string;
  source: 'E2B METER' | 'LLM API';
  credits: string;
  timestamp: string;
  type: 'compute' | 'llm';
}

const REPORT_DATA: LogItem[] = [
  {
    id: '1',
    stepName: 'E2B Sandbox Runtime',
    engine: 'E2B Cloud Compute',
    tokens: 'N/A (240s)',
    source: 'E2B METER',
    credits: '-11 Credits',
    timestamp: '10:23:05 AM',
    type: 'compute',
  },
  {
    id: '2',
    stepName: 'E2B Sandbox Runtime',
    engine: 'E2B Cloud Compute',
    tokens: 'N/A (240s)',
    source: 'E2B METER',
    credits: '-11 Credits',
    timestamp: '10:19:02 AM',
    type: 'compute',
  },
  {
    id: '3',
    stepName: 'E2B Sandbox Runtime',
    engine: 'E2B Cloud Compute',
    tokens: 'N/A (240s)',
    source: 'E2B METER',
    credits: '-11 Credits',
    timestamp: '07:02:35 PM',
    type: 'compute',
  },
  {
    id: '4',
    stepName: 'E2B Sandbox Runtime',
    engine: 'E2B Cloud Compute',
    tokens: 'N/A (240s)',
    source: 'E2B METER',
    credits: '-11 Credits',
    timestamp: '06:22:25 PM',
    type: 'compute',
  },
  {
    id: '5',
    stepName: 'E2B Sandbox Runtime',
    engine: 'E2B Cloud Compute',
    tokens: 'N/A (240s)',
    source: 'E2B METER',
    credits: '-11 Credits',
    timestamp: '04:33:25 PM',
    type: 'compute',
  },
  {
    id: '6',
    stepName: 'E2B Sandbox Runtime',
    engine: 'E2B Cloud Compute',
    tokens: 'N/A (240s)',
    source: 'E2B METER',
    credits: '-11 Credits',
    timestamp: '04:29:14 PM',
    type: 'compute',
  },
  {
    id: '7',
    stepName: 'Code Generation (55 files)',
    engine: 'gemini-2.5-flash-lite',
    tokens: '26,353 / 51,274',
    source: 'LLM API',
    credits: '-776 Credits',
    timestamp: '04:25:00 PM',
    type: 'llm',
  },
  {
    id: '8',
    stepName: 'Architecture Design',
    engine: 'gemini-2.5-flash-lite',
    tokens: '13,381 / 1,716',
    source: 'LLM API',
    credits: '-151 Credits',
    timestamp: '04:20:00 PM',
    type: 'llm',
  },
];

export const CreditPanel: React.FC = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'All' | 'LLM Tokens' | 'Sandbox Compute'>('All');
  const [query, setQuery] = useState('');

  const filteredLogs = REPORT_DATA.filter(item => {
    if (filter === 'LLM Tokens' && item.type !== 'llm') return false;
    if (filter === 'Sandbox Compute' && item.type !== 'compute') return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        item.stepName.toLowerCase().includes(q) ||
        item.engine.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="h-full w-full overflow-y-auto bg-[#0C0F17] text-slate-200 p-4 lg:p-6 space-y-5 font-sans">
      {/* Top Banner Card */}
      <div className="rounded-2xl border border-stone-800/80 bg-[#121622] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-[17px] font-bold text-white tracking-tight">
                Credit &amp; Usage Monitoring
              </h2>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM OPERATIONAL
              </span>
            </div>
            <p className="text-[12.5px] text-stone-400 mt-1 leading-snug">
              Real-time token conversion (1 Credit = 100 Tokens) &amp; E2B sandbox compute billing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#181D2D] border border-stone-800 rounded-xl px-4 py-2.5 shrink-0 self-start md:self-auto">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              TOTAL PROJECT CREDITS
            </p>
            <p className="text-[17px] font-mono font-bold text-amber-400 leading-tight">
              1,565 <span className="text-[12px] font-sans font-normal text-stone-400">Credits</span>
            </p>
          </div>
          <button
            onClick={() => toast({ title: 'Telemetry Updated', description: 'Credit balance refreshed from cloud meters.' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-700 bg-[#22293E] hover:bg-[#2B344F] text-stone-200 text-[11.5px] font-semibold transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Middle Card: E2B Sandbox Compute Telemetry */}
      <div className="rounded-2xl border border-stone-800/80 bg-[#121622] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800/60 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-[12.5px] uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>E2B SANDBOX COMPUTE TELEMETRY</span>
          </div>
          <span className="text-[11.5px] text-stone-400">Live compute metrics</span>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1 */}
          <div className="rounded-xl border border-stone-800 bg-[#161B29] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400">
                STARTED &amp; RESUMED SANDBOXES
              </span>
              <PlaySquare className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 mb-3">
              <span className="text-2xl font-mono font-bold text-white">16</span>{' '}
              <span className="text-[10.5px] text-stone-400 uppercase font-semibold">TOTAL OVER RANGE</span>
            </div>
            {/* Amber mini bars */}
            <div className="flex items-end gap-1.5 h-7">
              {[40, 65, 30, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-amber-500/30 hover:bg-amber-500 rounded-xs transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-stone-800 bg-[#161B29] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400">
                USAGE COST &amp; CREDITS
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 mb-3">
              <span className="text-2xl font-mono font-bold text-emerald-400">$0.25</span>{' '}
              <span className="text-[10.5px] text-stone-400 uppercase font-semibold">(253 CREDITS)</span>
            </div>
            {/* Emerald mini bars */}
            <div className="flex items-end gap-1.5 h-7">
              {[35, 50, 75, 40, 85, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-emerald-500/30 hover:bg-emerald-500 rounded-xs transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-stone-800 bg-[#161B29] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400">
                VCPU HOURS
              </span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 mb-3">
              <span className="text-2xl font-mono font-bold text-blue-400">3.07</span>{' '}
              <span className="text-[10.5px] text-stone-400 uppercase font-semibold">TOTAL OVER RANGE</span>
            </div>
            {/* Blue mini bars */}
            <div className="flex items-end gap-1.5 h-7">
              {[25, 45, 60, 50, 70, 85, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500/30 hover:bg-blue-500 rounded-xs transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-stone-800 bg-[#161B29] p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-stone-400">
                RAM HOURS
              </span>
              <HardDrive className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2 mb-3">
              <span className="text-2xl font-mono font-bold text-purple-400">6.13</span>{' '}
              <span className="text-[10.5px] text-stone-400 uppercase font-semibold">TOTAL OVER RANGE</span>
            </div>
            {/* Purple mini bars */}
            <div className="flex items-end gap-1.5 h-7">
              {[30, 55, 40, 75, 60, 80, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-purple-500/30 hover:bg-purple-500 rounded-xs transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Step-by-Step Token & Credit Report */}
      <div className="rounded-2xl border border-stone-800/80 bg-[#121622] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-[13px] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Step-by-Step Token &amp; Credit Report</span>
            </div>
            <p className="text-[12px] text-stone-400 mt-0.5">
              Granular breakdown of LLM tokens and sandbox compute credits deducted.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search step or model..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-700 bg-[#191F30] text-[12px] text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/60 transition w-44 sm:w-56"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex rounded-lg bg-[#181D2D] p-1 border border-stone-800 text-[11px] font-semibold">
              {(['All', 'LLM Tokens', 'Sandbox Compute'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={cx(
                    'px-2.5 py-1 rounded-md transition cursor-pointer',
                    filter === tab
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table matching Screenshot 2 */}
        <div className="overflow-x-auto rounded-xl border border-stone-800">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-[#181E2E] text-[10.5px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="px-4 py-3">STEP NAME</th>
                <th className="px-4 py-3">ENGINE / MODEL</th>
                <th className="px-4 py-3">TOKENS (IN / OUT)</th>
                <th className="px-4 py-3">SOURCE</th>
                <th className="px-4 py-3">CREDITS DEDUCTED</th>
                <th className="px-4 py-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 bg-[#131724]">
              {filteredLogs.map(row => (
                <tr key={row.id} className="hover:bg-[#1A2033]/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-stone-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span>{row.stepName}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-stone-400">{row.engine}</td>
                  <td className="px-4 py-3 font-mono text-stone-400">{row.tokens}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cx(
                        'px-2 py-0.5 rounded text-[10px] font-mono font-bold',
                        row.source === 'E2B METER'
                          ? 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
                          : 'bg-purple-950/80 text-purple-400 border border-purple-800/60'
                      )}
                    >
                      {row.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-amber-400">
                    {row.credits}
                  </td>
                  <td className="px-4 py-3 font-mono text-stone-400">{row.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
