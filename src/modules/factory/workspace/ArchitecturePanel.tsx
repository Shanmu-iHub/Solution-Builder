import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  FileCode,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  FolderTree,
  Globe,
  Layers,
  Layout,
  Maximize2,
  Network,
  RotateCcw,
  Server,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cx, useToast } from '../../ui';

interface ArchitecturePanelProps {
  projectName?: string;
  onClose: () => void;
}

interface ModuleItem {
  id: string;
  name: string;
  subtext: string;
  badge: string;
  method?: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  icon: typeof Layout;
  color: string;
  count: number;
  items: ModuleItem[];
}

export const ArchitecturePanel: React.FC<ArchitecturePanelProps> = ({ projectName = 'ExpensifyIQ', onClose }) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<'modules' | 'tree' | 'graph' | 'flowchart'>('modules');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    workflows: true,
    pages: false,
    components: false,
    apis: false,
    schemas: false,
  });
  const [copied, setCopied] = useState(false);
  const [graphZoom, setGraphZoom] = useState(71);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  const categories: CategoryGroup[] = useMemo(
    () => [
      {
        id: 'pages',
        title: 'Pages',
        icon: Layout,
        color: 'text-blue-500 bg-blue-50 border-blue-200',
        count: 9,
        items: [
          { id: 'p1', name: '/dashboard', subtext: 'src/app/dashboard/page.tsx', badge: 'App Route' },
          { id: 'p2', name: '/expenses', subtext: 'src/app/expenses/page.tsx', badge: 'App Route' },
          { id: 'p3', name: '/expenses/new', subtext: 'src/app/expenses/new/page.tsx', badge: 'App Route' },
          { id: 'p4', name: '/expenses/[id]', subtext: 'src/app/expenses/[id]/page.tsx', badge: 'App Route' },
          { id: 'p5', name: '/approvals', subtext: 'src/app/approvals/page.tsx', badge: 'App Route' },
          { id: 'p6', name: '/analytics', subtext: 'src/app/analytics/page.tsx', badge: 'App Route' },
          { id: 'p7', name: '/policies', subtext: 'src/app/policies/page.tsx', badge: 'App Route' },
          { id: 'p8', name: '/settings', subtext: 'src/app/settings/page.tsx', badge: 'App Route' },
          { id: 'p9', name: '/login', subtext: 'src/app/login/page.tsx', badge: 'App Route' },
        ],
      },
      {
        id: 'components',
        title: 'Components',
        icon: Boxes,
        color: 'text-purple-500 bg-purple-50 border-purple-200',
        count: 9,
        items: [
          { id: 'c1', name: 'ExpenseTable', subtext: 'src/components/ExpenseTable.tsx', badge: 'UI Component' },
          { id: 'c2', name: 'ReceiptUploader', subtext: 'src/components/ReceiptUploader.tsx', badge: 'UI Component' },
          { id: 'c3', name: 'ApprovalWorkflow', subtext: 'src/components/ApprovalWorkflow.tsx', badge: 'UI Component' },
          { id: 'c4', name: 'SpendAnalyticsChart', subtext: 'src/components/SpendAnalyticsChart.tsx', badge: 'UI Component' },
          { id: 'c5', name: 'PolicyBadge', subtext: 'src/components/PolicyBadge.tsx', badge: 'UI Component' },
          { id: 'c6', name: 'CurrencyConverter', subtext: 'src/components/CurrencyConverter.tsx', badge: 'UI Component' },
          { id: 'c7', name: 'ExpenseFilterBar', subtext: 'src/components/ExpenseFilterBar.tsx', badge: 'UI Component' },
          { id: 'c8', name: 'NotificationCenter', subtext: 'src/components/NotificationCenter.tsx', badge: 'UI Component' },
          { id: 'c9', name: 'SidebarNav', subtext: 'src/components/SidebarNav.tsx', badge: 'UI Component' },
        ],
      },
      {
        id: 'apis',
        title: 'Backend API Routes (Next.js)',
        icon: Globe,
        color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
        count: 2,
        items: [
          { id: 'a1', name: '/api/auth/[...nextauth]', subtext: 'src/app/api/auth/[...nextauth]/route.ts', badge: 'API Route' },
          { id: 'a2', name: '/api/webhooks/card-feed', subtext: 'src/app/api/webhooks/card-feed/route.ts', badge: 'API Route' },
        ],
      },
      {
        id: 'workflows',
        title: 'Agent Builder Workflows',
        icon: Zap,
        color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
        count: 11,
        items: [
          { id: 'w1', name: 'me (Database)', subtext: 'src/GET /api/auth/me (Database...)', badge: 'Module', method: 'GET' },
          { id: 'w2', name: 'expenses (Database)', subtext: 'src/POST /api/expenses (Data...)', badge: 'Module', method: 'POST' },
          { id: 'w3', name: '[id] (Database)', subtext: 'src/POST /api/expenses/[id]...', badge: 'Module', method: 'POST' },
          { id: 'w4', name: 'receipts (Database)', subtext: 'src/POST /api/receipts (Data...)', badge: 'Module', method: 'POST' },
          { id: 'w5', name: 'categories (Database)', subtext: 'src/POST /api/categories (Da...)', badge: 'Module', method: 'POST' },
          { id: 'w6', name: 'policies (Database)', subtext: 'src/POST /api/policies (Data...)', badge: 'Module', method: 'POST' },
          { id: 'w7', name: 'audit-log (Database)', subtext: 'src/GET /api/audit-log (Data...)', badge: 'Module', method: 'GET' },
          { id: 'w8', name: 'approvals (Database)', subtext: 'src/POST /api/approvals (Data...)', badge: 'Module', method: 'POST' },
          { id: 'w9', name: 'reconcile (Database)', subtext: 'src/POST /api/reconcile (Data...)', badge: 'Module', method: 'POST' },
          { id: 'w10', name: 'per-diem (Database)', subtext: 'src/GET /api/per-diem (Data...)', badge: 'Module', method: 'GET' },
          { id: 'w11', name: 'export-erp (Database)', subtext: 'src/POST /api/export-erp (Data...)', badge: 'Module', method: 'POST' },
        ],
      },
      {
        id: 'schemas',
        title: 'Database Schemas & Collections',
        icon: Database,
        color: 'text-blue-500 bg-blue-50 border-blue-200',
        count: 6,
        items: [
          { id: 's1', name: 'users', subtext: 'MongoDB Collection: users', badge: 'Collection' },
          { id: 's2', name: 'expenses', subtext: 'MongoDB Collection: expenses', badge: 'Collection' },
          { id: 's3', name: 'receipts', subtext: 'MongoDB Collection: receipts', badge: 'Collection' },
          { id: 's4', name: 'policies', subtext: 'MongoDB Collection: policies', badge: 'Collection' },
          { id: 's5', name: 'approvals', subtext: 'MongoDB Collection: approvals', badge: 'Collection' },
          { id: 's6', name: 'audit_logs', subtext: 'MongoDB Collection: audit_logs', badge: 'Collection' },
        ],
      },
    ],
    []
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  const handleCopy = () => {
    try {
      const summary = `Planned Architecture for ${projectName}\n9 Categories · 62 Target Modules\nGenerated via Agent Builder`;
      navigator.clipboard.writeText(summary);
      setCopied(true);
      toast({ title: 'Architecture copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(categories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase()}-architecture.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Architecture exported as JSON' });
  };

  return (
    <div className="flex h-full w-full flex-col bg-white overflow-hidden animate-fade-in font-sans">
      {/* Header Bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-stone-200 px-6 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-2xs">
            <FolderTree className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              Planned Application Architecture
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                {projectName}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition cursor-pointer"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition cursor-pointer"
          >
            <Download size={13} />
            <span>Export</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center justify-center p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 text-stone-400 transition cursor-pointer ml-1"
            title="Close Architecture View"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* View Switcher Tabs Bar */}
      <div className="flex items-center justify-between border-b border-stone-200 px-6 py-2.5 bg-stone-50/70">
        <div className="flex items-center gap-1 rounded-lg bg-stone-200/80 p-1 border border-stone-300/60">
          {[
            { id: 'modules' as const, label: 'Modules', icon: Boxes },
            { id: 'tree' as const, label: 'Tree', icon: FolderTree },
            { id: 'graph' as const, label: 'Graph', icon: Network },
            { id: 'flowchart' as const, label: 'Flowchart', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={cx(
                  'flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold rounded-md transition cursor-pointer',
                  active
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/60'
                )}
              >
                <Icon size={14} className={active ? 'text-indigo-600' : 'text-stone-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-stone-500 font-mono">
          9 Categories · 62 Target Modules
        </span>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto">
        {/* 1. MODULES VIEW */}
        {activeView === 'modules' && (
          <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider">
                  Target Blueprint Decomposition
                </p>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  9 Categories · 62 Target Modules
                </h3>
              </div>
              <button
                onClick={collapseAll}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition cursor-pointer"
              >
                Collapse All Sections
              </button>
            </div>

            <div className="space-y-4">
              {categories.map(cat => {
                const isExpanded = expandedCategories[cat.id];
                const Icon = cat.icon;

                return (
                  <div
                    key={cat.id}
                    className="border border-stone-200 rounded-xl bg-white overflow-hidden shadow-xs transition"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between p-4 bg-stone-50/60 hover:bg-stone-50 transition text-left cursor-pointer border-b border-stone-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cx('p-2 rounded-lg border', cat.color)}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                            {cat.title}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                              {cat.count} items
                            </span>
                          </h4>
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronDown size={18} className="text-stone-400" />
                      ) : (
                        <ChevronRight size={18} className="text-stone-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {cat.items.map(item => (
                            <div
                              key={item.id}
                              className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-100/50 hover:border-stone-300 transition flex flex-col justify-between gap-2 shadow-2xs group cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-900 group-hover:text-indigo-600 transition truncate">
                                  <Code2 size={13} className="text-stone-400 shrink-0 group-hover:text-indigo-600" />
                                  <span className="truncate">{item.name}</span>
                                </div>
                                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white text-stone-600 border border-stone-200 shrink-0">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[11px] font-mono text-stone-500 truncate" title={item.subtext}>
                                {item.subtext}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. TREE VIEW */}
        {activeView === 'tree' && (
          <div className="p-6 max-w-4xl mx-auto space-y-4">
            <div className="border border-stone-200 rounded-xl bg-white p-6 shadow-xs font-mono text-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-100 text-stone-700 font-bold">
                <FolderOpen size={16} className="text-indigo-600" />
                <span>{projectName.toLowerCase()}-root</span>
              </div>
              <div className="space-y-2 pl-4 border-l border-stone-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-800 font-bold">
                    <Folder size={14} className="text-amber-500" />
                    <span>src/</span>
                  </div>
                  <div className="space-y-1.5 pl-6 border-l border-stone-100">
                    <div>
                      <span className="text-stone-700 font-semibold">📁 app/</span>
                      <div className="pl-6 text-stone-500 space-y-1 pt-1">
                        <div>📄 page.tsx <span className="text-[10px] text-emerald-600">[Root Dashboard]</span></div>
                        <div>📄 layout.tsx <span className="text-[10px] text-blue-600">[Root Layout]</span></div>
                        <div>📁 expenses/ <span className="text-[10px] text-stone-400">(page.tsx, [id]/page.tsx)</span></div>
                        <div>📁 approvals/ <span className="text-[10px] text-stone-400">(page.tsx)</span></div>
                        <div>📁 api/ <span className="text-[10px] text-purple-600">(auth, expenses, receipts)</span></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-700 font-semibold">📁 components/</span>
                      <div className="pl-6 text-stone-500 space-y-1 pt-1">
                        <div>📄 ExpenseTable.tsx</div>
                        <div>📄 ReceiptUploader.tsx</div>
                        <div>📄 ApprovalWorkflow.tsx</div>
                        <div>📄 SpendAnalyticsChart.tsx</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-700 font-semibold">📁 models/</span>
                      <div className="pl-6 text-stone-500 space-y-1 pt-1">
                        <div>📄 Expense.ts</div>
                        <div>📄 Policy.ts</div>
                        <div>📄 User.ts</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-700 font-semibold">📁 workflows/</span>
                      <div className="pl-6 text-indigo-600 space-y-1 pt-1">
                        <div>⚡ expense-approval.workflow.json</div>
                        <div>⚡ ocr-receipt-parsing.workflow.json</div>
                        <div>⚡ policy-violation-alert.workflow.json</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. GRAPH VIEW (Screenshot 3 - Interactive Node Graph) */}
        {activeView === 'graph' && (
          <div className="relative h-full min-h-[600px] w-full bg-[#08080C] overflow-hidden select-none">
            {/* Top Bar on Graph */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 text-stone-200 border border-stone-800 text-xs font-semibold backdrop-blur-md">
                <Filter size={13} className="text-indigo-400" />
                <span>Categories (8)</span>
                <ChevronRight size={13} />
              </div>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-stone-900/90 border border-stone-800 rounded-lg p-1 text-stone-300 text-xs font-mono backdrop-blur-md">
              <button
                onClick={() => setGraphZoom(z => Math.max(z - 10, 30))}
                className="p-1 hover:text-white hover:bg-stone-800 rounded cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="px-2 font-bold min-w-[42px] text-center">{graphZoom}%</span>
              <button
                onClick={() => setGraphZoom(z => Math.min(z + 10, 150))}
                className="p-1 hover:text-white hover:bg-stone-800 rounded cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={14} />
              </button>
              <span className="w-px h-3 bg-stone-700 mx-1" />
              <button
                onClick={() => setGraphZoom(71)}
                className="px-2 py-0.5 hover:text-white hover:bg-stone-800 rounded cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <RotateCcw size={11} /> Fit
              </button>
            </div>

            {/* Glowing Interactive SVG Graph Canvas */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <svg
                viewBox="0 0 1000 650"
                className="w-full h-full max-h-[600px] transition-transform duration-200"
                style={{ transform: `scale(${graphZoom / 100})` }}
              >
                {/* Defs for glow effects */}
                <defs>
                  <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="edge-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#C084FC" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="edge-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Connecting Edges */}
                <g strokeWidth="1.2" opacity="0.65">
                  <line x1="500" y1="325" x2="350" y2="200" stroke="#6366F1" />
                  <line x1="500" y1="325" x2="650" y2="220" stroke="#818CF8" />
                  <line x1="500" y1="325" x2="360" y2="440" stroke="#38BDF8" />
                  <line x1="500" y1="325" x2="640" y2="450" stroke="#A855F7" />

                  {/* Secondary edges */}
                  <line x1="350" y1="200" x2="260" y2="150" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="350" y1="200" x2="220" y2="230" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="350" y1="200" x2="310" y2="110" stroke="#475569" strokeDasharray="3 3" />

                  <line x1="650" y1="220" x2="750" y2="160" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="650" y1="220" x2="790" y2="240" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="650" y1="220" x2="720" y2="290" stroke="#475569" strokeDasharray="3 3" />

                  <line x1="360" y1="440" x2="270" y2="480" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="360" y1="440" x2="340" y2="530" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="360" y1="440" x2="430" y2="520" stroke="#475569" strokeDasharray="3 3" />

                  <line x1="640" y1="450" x2="730" y2="490" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="640" y1="450" x2="710" y2="540" stroke="#475569" strokeDasharray="3 3" />
                  <line x1="640" y1="450" x2="580" y2="530" stroke="#475569" strokeDasharray="3 3" />
                </g>

                {/* Outer Leaf Nodes */}
                <g>
                  {/* Backend branch leaves */}
                  <circle cx="260" cy="150" r="9" fill="#0EA5E9" />
                  <circle cx="220" cy="230" r="11" fill="#F43F5E" />
                  <circle cx="310" cy="110" r="8" fill="#F59E0B" />

                  {/* Frontend branch leaves */}
                  <circle cx="750" cy="160" r="10" fill="#10B981" />
                  <circle cx="790" cy="240" r="12" fill="#8B5CF6" />
                  <circle cx="720" cy="290" r="8" fill="#06B6D4" />

                  {/* Database branch leaves */}
                  <circle cx="270" cy="480" r="9" fill="#3B82F6" />
                  <circle cx="340" cy="530" r="10" fill="#EC4899" />
                  <circle cx="430" cy="520" r="8" fill="#F59E0B" />

                  {/* Workflow branch leaves */}
                  <circle cx="730" cy="490" r="11" fill="#F97316" />
                  <circle cx="710" cy="540" r="9" fill="#A855F7" />
                  <circle cx="580" cy="530" r="10" fill="#14B8A6" />
                </g>

                {/* Major Domain Hub Nodes */}
                {/* 1. Backend Hub */}
                <g className="cursor-pointer">
                  <circle cx="350" cy="200" r="26" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2.5" />
                  <text x="350" y="204" textAnchor="middle" fill="#E0E7FF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    backend
                  </text>
                </g>

                {/* 2. Frontend Hub */}
                <g className="cursor-pointer">
                  <circle cx="650" cy="220" r="26" fill="#1E1B4B" stroke="#818CF8" strokeWidth="2.5" />
                  <text x="650" y="224" textAnchor="middle" fill="#E0E7FF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    frontend
                  </text>
                </g>

                {/* 3. Database Hub */}
                <g className="cursor-pointer">
                  <circle cx="360" cy="440" r="26" fill="#0C2340" stroke="#0284C7" strokeWidth="2.5" />
                  <text x="360" y="444" textAnchor="middle" fill="#E0F2FE" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    database
                  </text>
                </g>

                {/* 4. Workflows Hub */}
                <g className="cursor-pointer">
                  <circle cx="640" cy="450" r="26" fill="#2E1065" stroke="#9333EA" strokeWidth="2.5" />
                  <text x="640" y="454" textAnchor="middle" fill="#F3E8FF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    workflows
                  </text>
                </g>

                {/* Central Root Node (ExpensifyIQ) */}
                <g className="cursor-pointer" filter="url(#glow-purple)">
                  <circle cx="500" cy="325" r="42" fill="#581C87" stroke="#C084FC" strokeWidth="3.5" />
                  <text x="500" y="329" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    {projectName.toLowerCase()}
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Caption on Graph */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <span className="text-[11px] font-mono text-stone-500 bg-stone-900/80 px-3 py-1 rounded-full border border-stone-800">
                Click node to inspect · Use side filters · Drag to arrange
              </span>
            </div>
          </div>
        )}

        {/* 4. FLOWCHART VIEW */}
        {activeView === 'flowchart' && (
          <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="border border-stone-200 rounded-2xl bg-stone-950 p-8 text-white shadow-xl">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-4">
                Architecture Data Flow Diagram
              </h4>
              <div className="flex flex-col gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/30 flex items-center justify-between">
                  <span className="font-bold text-indigo-300">Client Layer (Next.js 15 UI)</span>
                  <span className="text-[10px] text-stone-400">Pages, ExpenseForm, ApprovalQueue</span>
                </div>
                <div className="flex justify-center text-stone-500">↓ REST / Server Actions ↓</div>
                <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/30 flex items-center justify-between">
                  <span className="font-bold text-purple-300">API &amp; Agent Workflows</span>
                  <span className="text-[10px] text-stone-400">10 Autonomous Agent Workflows</span>
                </div>
                <div className="flex justify-center text-stone-500">↓ Mongoose / ODM ↓</div>
                <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/30 flex items-center justify-between">
                  <span className="font-bold text-blue-300">Data Store (MongoDB Cluster)</span>
                  <span className="text-[10px] text-stone-400">expenses, receipts, policies collections</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
