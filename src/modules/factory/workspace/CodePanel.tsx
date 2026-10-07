import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  FileCode,
  Pencil,
  Save,
  Terminal,
  X,
} from 'lucide-react';
import { Button } from '../../ui';
import { WorkspaceState } from '../types';
import { CodeViewer, FileExplorer } from './CodeParts';

interface Props {
  state: WorkspaceState;
  onPick: (f: string) => void;
  onSave: (f: string, content: string) => void;
}

const DEFAULT_PAGE_CODE = `'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import Footer from '@/components/Footer';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Expense Analytics & Forecasting
            </h1>
          </div>
          <AnalyticsCharts />
        </main>
      </div>

      <Footer />
    </div>
  );
}`;

const TERMINAL_LINES = [
  '1 > bun install',
  '2 > bun install',
  '3 bun install v1.3.14 (0d9b296a)',
  '4 bun install v1.3.14 (0d9b296a)',
  '5 [2.70ms] ".env.local", ".env"',
  '6 [2.70ms] ".env.local", ".env"',
  '7 Resolving dependencies [next, react, react-dom, tailwindcss, lucide-react, mongodb]',
  '8 Saved lockfile bun.lockb',
  '9 Done in 412ms',
  '10 > next build --no-lint',
  '11 Creating an optimized production build ...',
  '12 ✓ Compiled successfully in 1.4s',
  '13 Route (app)                              Size     First Load JS',
  '14 ┌ ○ /                                    5.4 kB         87.2 kB',
  '15 ├ ○ /analytics                           8.2 kB         90.1 kB',
  '16 ├ ○ /expenses                            6.1 kB         88.0 kB',
  '17 ├ ○ /approvals                           4.8 kB         86.7 kB',
  '18 └ ○ /settings                            3.9 kB         85.8 kB',
  '19 + First Load JS shared by all            81.8 kB',
  '20 ✓ Generating static pages (55/55) [100%]',
  '21 ✓ Finalizing page optimization ...',
  '22 ✓ Ready in 320ms on http://localhost:3000',
];

export const CodePanel: React.FC<Props> = ({ state, onPick, onSave }) => {
  const fileKeys = Object.keys(state.files);
  const files = fileKeys.length > 0 ? fileKeys.sort() : ['page.tsx', 'layout.tsx', 'globals.css'];
  const activeFile = state.activeFile || 'page.tsx';
  const content = state.files[activeFile] || DEFAULT_PAGE_CODE;

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEditing(false);
  }, [activeFile]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const fileCount = Math.max(files.length, 101);

  return (
    <div className="flex h-full w-full flex-col bg-white overflow-hidden font-sans border-l border-slate-200">
      {/* Upper Area: File Explorer + Code Editor */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left: Files Sidebar */}
        <div className="w-64 shrink-0 border-r border-slate-200 bg-[#FAFAFA] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-white">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              FILES
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-400">
              {fileCount}
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <FileExplorer files={files} active={activeFile} onPick={onPick} />
          </div>
        </div>

        {/* Center: Editor Area */}
        <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden">
          {/* Tab Header */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 px-4 bg-white">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <FileCode className="w-4 h-4 text-slate-400" />
              <span className="text-[13px] font-mono font-bold text-slate-800">
                {activeFile}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                TYPESCRIPT
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11.5px] font-sans font-medium text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              {editing ? (
                <div className="flex items-center gap-1.5 ml-2">
                  <Button
                    size="xs"
                    variant="primary"
                    icon={<Save className="w-3 h-3" />}
                    onClick={() => {
                      onSave(activeFile, draft);
                      setEditing(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button size="xs" icon={<X className="w-3 h-3" />} onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setDraft(content);
                    setEditing(true);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                  title="Edit file"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 min-h-0 overflow-auto bg-white">
            {editing ? (
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                spellCheck={false}
                className="w-full h-full resize-none p-4 font-mono text-[13px] leading-[1.65] text-slate-800 focus:outline-none bg-white"
              />
            ) : (
              <CodeViewer code={content} className="min-h-full py-3" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Area: Terminal (Matching Screenshot 5) */}
      <div className="h-44 shrink-0 border-t border-slate-200 bg-white flex flex-col font-mono">
        <div className="flex items-center justify-between px-4 h-8 border-b border-slate-200 bg-slate-50/70 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider">TERMINAL</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
          <span className="text-slate-400 font-sans text-[11px]">32 lines</span>
        </div>

        <div className="flex-1 overflow-auto p-3 text-[12px] leading-relaxed text-slate-700 bg-white space-y-0.5">
          {TERMINAL_LINES.map((line, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="select-none text-slate-300 w-6 text-right shrink-0">{idx + 1}</span>
              <span className={line.includes('✓') ? 'text-emerald-600 font-semibold' : ''}>
                {line.replace(/^\d+\s/, '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
