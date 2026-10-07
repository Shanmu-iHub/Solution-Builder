import React, { useState } from 'react';
import {
  BarChart2,
  ChevronDown,
  ChevronUp,
  Code2,
  Coins,
  Cpu,
  FileCode2,
  Layers,
  X,
} from 'lucide-react';
import { cx } from '../../ui';

interface Props {
  open: boolean;
  onClose: () => void;
  tokensCount?: number;
}

const FILE_TOKENS = [
  { file: 'README.md', in: 262, out: 1126, total: 1388 },
  { file: '.env.example', in: 253, out: 68, total: 321 },
  { file: 'src/models/userModel.ts', in: 256, out: 206, total: 462 },
  { file: 'src/models/expenseModel.ts', in: 267, out: 146, total: 413 },
  { file: 'src/models/receiptAssetModel.ts', in: 238, out: 141, total: 379 },
  { file: 'src/models/policyModel.ts', in: 280, out: 172, total: 452 },
  { file: 'src/app/layout.tsx', in: 520, out: 840, total: 1360 },
  { file: 'src/app/page.tsx', in: 1840, out: 3420, total: 5260 },
  { file: 'src/app/expenses/page.tsx', in: 1420, out: 2680, total: 4100 },
  { file: 'src/app/approvals/page.tsx', in: 1310, out: 2450, total: 3760 },
  { file: 'src/app/analytics/page.tsx', in: 1540, out: 2980, total: 4520 },
  { file: 'src/app/api/auth/login/route.ts', in: 610, out: 1120, total: 1730 },
  { file: 'src/app/api/expenses/route.ts', in: 780, out: 1450, total: 2230 },
];

export const TokenConsumptionDrawer: React.FC<Props> = ({ open, onClose, tokensCount }) => {
  const [isCodeGroupOpen, setIsCodeGroupOpen] = useState(true);

  if (!open) return null;

  const totalTokens = tokensCount !== undefined ? tokensCount : 101293;
  const inputTokens = Math.round(totalTokens * (44813 / 101293));
  const outputTokens = Math.max(0, totalTokens - inputTokens);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs font-sans animate-fade-in">
      <div className="w-[480px] max-w-full h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left">
        {/* Drawer Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-6 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <BarChart2 size={15} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Token Consumption Breakdown</h3>
              <p className="text-[10px] text-slate-500">Live AI pipeline execution analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top 3 Stat Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Input Tokens
              </span>
              <span className="text-lg font-bold text-slate-800 font-mono">{inputTokens.toLocaleString()}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Output Tokens
              </span>
              <span className="text-lg font-bold text-slate-800 font-mono">{outputTokens.toLocaleString()}</span>
            </div>
            <div className="rounded-xl border border-indigo-400/30 bg-indigo-50/50 p-3.5 flex flex-col relative overflow-hidden group">
              <div className="absolute right-1 bottom-0 translate-y-2 opacity-10 text-indigo-600 group-hover:scale-110 transition-transform">
                <Coins size={44} />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mb-1">
                Total Tokens
              </span>
              <span className="text-lg font-bold text-indigo-700 font-mono">{totalTokens.toLocaleString()}</span>
            </div>
          </div>

          {/* Section: Consumption Logs */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Consumption Logs</h4>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100 shadow-xs">
              {/* Task 1: Implementation Plan Drafting */}
              <div className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">Implementation Plan Drafting</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Cpu size={10} className="text-slate-400" />
                      <span className="text-[10px] text-slate-500 font-mono">gemini-2.5-flash-lite</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-800 font-mono">8,569</span>
                    <p className="text-[9px] text-slate-400 mt-0.5">tokens</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Prompt (Input):</span>
                    <span className="font-mono font-medium text-slate-700">5,079</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Completion (Output):</span>
                    <span className="font-mono font-medium text-slate-700">3,490</span>
                  </div>
                </div>
              </div>

              {/* Task 2: Architecture Design */}
              <div className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">Architecture Design</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Cpu size={10} className="text-slate-400" />
                      <span className="text-[10px] text-slate-500 font-mono">gemini-2.5-flash-lite</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-800 font-mono">15,097</span>
                    <p className="text-[9px] text-slate-400 mt-0.5">tokens</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Prompt (Input):</span>
                    <span className="font-mono font-medium text-slate-700">13,381</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Completion (Output):</span>
                    <span className="font-mono font-medium text-slate-700">1,716</span>
                  </div>
                </div>
              </div>

              {/* Task 3: Grouped Code Generation (55 files) */}
              <div className="divide-y divide-slate-100">
                <div
                  onClick={() => setIsCodeGroupOpen(!isCodeGroupOpen)}
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex flex-col gap-2 bg-indigo-500/[0.02]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-indigo-500/10 text-indigo-500">
                        <Code2 size={13} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">Code Generation</p>
                          <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-indigo-500/10 text-indigo-600">
                            55 files
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Cpu size={10} className="text-slate-400" />
                          <span className="text-[10px] text-slate-500 font-mono">gemini-2.5-flash-lite</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-bold text-indigo-600 font-mono">77,627</span>
                        <p className="text-[9px] text-slate-400 mt-0.5">tokens</p>
                      </div>
                      <div className="text-slate-400 hover:text-slate-600">
                        {isCodeGroupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Total Input:</span>
                      <span className="font-mono font-medium text-slate-700">26,353</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Total Output:</span>
                      <span className="font-mono font-medium text-slate-700">51,274</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Individual Files Breakdown */}
                {isCodeGroupOpen && (
                  <div className="bg-slate-50/60 pl-6 pr-4 py-2 space-y-2 divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                    {FILE_TOKENS.map((r, i) => (
                      <div key={i} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <p className="font-mono text-[11px] font-medium text-slate-700 truncate" title={r.file}>
                            {r.file}
                          </p>
                          <p className="text-[9px] text-slate-400">
                            In: {r.in.toLocaleString()} · Out: {r.out.toLocaleString()}
                          </p>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-600 font-semibold shrink-0">
                          {r.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
