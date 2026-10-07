import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileCode2,
  HelpCircle,
  Layers,
  Layout,
  Loader2,
  RotateCcw,
  Send,
  Settings,
  Sparkles,
  Square,
  Terminal,
  User,
  Zap,
} from 'lucide-react';
import { Markdown } from '../../ui/Markdown';
import { cx, useToast } from '../../ui';
import { WorkspaceState } from '../types';

export type StoryStage =
  | 'unstarted'
  | 'generating_plan'
  | 'plan_ready'
  | 'pipeline1_running'
  | 'awaiting_db'
  | 'pipeline2_running'
  | 'completed';

interface Props {
  projectName: string;
  state: WorkspaceState;
  storyStage: StoryStage;
  pipeline1Step: number;
  pipeline2Step: number;
  tokensCount: number;
  placeholder?: string;
  onStartGeneration: () => void;
  onProceedToBuild: () => void;
  onConnectDatabase: () => void;
  onResetStory?: () => void;
  onBack: () => void;
  onSend: (text: string) => void;
  onStop: () => void;
  onJumpToFile: (file: string) => void;
  onOpenPlan?: () => void;
  onOpenTokens: () => void;
  onViewArchitecture?: () => void;
  onOpenDatabase?: () => void;
  suggestions?: string[];
  prompts?: string[];
}

const TRACE_DATA: Record<string, { operation: string; json: object }> = {
  'requirement-analyzer': {
    operation: 'requirement_analyzer',
    json: {
      operation: 'requirement_analyzer',
      args: {
        pipeline: 'Full-Stack Application Builder',
        action: 'analyze_specifications',
        active_skills: ['Requirements Analyst', 'Domain Expert'],
      },
      result: {
        status: 'success',
        data_feeded: true,
        features: ['expense_tracking', 'approval_hierarchy', 'receipt_ocr', 'policy_engine'],
        confidence: 0.99,
      },
    },
  },
  'skill-gathering': {
    operation: 'skill_discovery',
    json: {
      operation: 'skill_discovery',
      args: {
        pipeline: 'Full-Stack Application Builder',
        action: 'discovery_request',
        active_skills: ['Skill Discovery Agent', 'Skill Catalog Registry'],
      },
      result: {
        status: 'success',
        skills_gathered: 9,
        available: [
          'Requirements Analyst',
          'Database Engineer',
          'Database Schema Architect',
          'Fullstack Code Generator',
          'Next.js 15 Specialist',
          'Tailwind UI Designer',
          'Agent Workflow Architect',
          'TypeScript & Lint Checker',
          'Runtime Smoke Tester',
        ],
      },
    },
  },
  'context-architect': {
    operation: 'architecture_synthesis',
    json: {
      operation: 'architecture_synthesis',
      args: {
        pipeline: 'Full-Stack Application Builder',
        action: 'compile_architecture_graph',
        active_skills: ['Solutions Architect', 'Agent Workflow Architect'],
      },
      result: {
        status: 'architecture_planned',
        total_modules: 62,
        categories: 9,
        agent_workflows: 11,
      },
    },
  },
  'project-initializer': {
    operation: 'scaffold_project_files',
    json: {
      operation: 'scaffold_project_files',
      args: {
        pipeline: 'Full-Stack Application Builder',
        template: 'nextjs-enterprise-saas',
        active_skills: ['Next.js 15 Specialist', 'Package Scaffolder'],
      },
      result: {
        status: 'project_initialized',
        package_json: 'created',
        tsconfig: 'valid',
      },
    },
  },
  'database-initializer-awaiting': {
    operation: 'database_initializer',
    json: {
      operation: 'database_initializer',
      args: {
        database_name: 'expensifyiq',
        active_skills: ['Database Engineer', 'Database Schema Architect'],
      },
      result: {
        status: 'awaiting_cluster',
        required: 'MONGODB_URI',
      },
    },
  },
  'database-initializer-ready': {
    operation: 'database_initializer',
    json: {
      operation: 'database_initializer',
      args: {
        database_name: 'expensifyiq',
        active_skills: ['Database Engineer', 'Database Schema Architect'],
      },
      result: {
        status: 'database_configured',
        collections_ready: ['users', 'expenses', 'policies', 'receipts'],
      },
    },
  },
  'code-writer': {
    operation: 'code_writer',
    json: {
      operation: 'code_writer',
      args: {
        target_files: 55,
        active_skills: [
          'Fullstack Code Generator',
          'Next.js 15 Specialist',
          'Tailwind UI Designer',
        ],
      },
      result: {
        status: 'completed',
        files_generated: 55,
      },
    },
  },
  'code-validator': {
    operation: 'code_validator',
    json: {
      operation: 'code_validator',
      args: {
        engine: 'typescript_tsc',
        active_skills: ['TypeScript & Lint Checker'],
      },
      result: {
        status: 'code_validated',
        diagnostics: 0,
        errors: 0,
      },
    },
  },
  'build-executor': {
    operation: 'build_executor',
    json: {
      operation: 'build_executor',
      args: {
        command: 'next build',
        active_skills: ['Build Engine'],
      },
      result: {
        status: 'build_executed',
        routes_compiled: 18,
        duration: '4.8s',
      },
    },
  },
  'build-validator': {
    operation: 'build_validator',
    json: {
      operation: 'build_validator',
      args: {
        port: 3000,
        active_skills: ['Runtime Smoke Tester'],
      },
      result: {
        status: 'build_validated',
        health_check: 'HTTP 200 OK',
        preview_ready: true,
      },
    },
  },
};

const GENERATED_FILES_55: string[] = [
  'README.md',
  '.env.example',
  'src/models/userModel.ts',
  'src/models/expenseModel.ts',
  'src/models/receiptAssetModel.ts',
  'src/models/policyModel.ts',
  'src/models/approvalHierarchyModel.ts',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/expenses/page.tsx',
  'src/app/expenses/new/page.tsx',
  'src/app/expenses/[id]/page.tsx',
  'src/app/approvals/page.tsx',
  'src/app/policies/page.tsx',
  'src/app/analytics/page.tsx',
  'src/app/settings/page.tsx',
  'src/app/login/page.tsx',
  'src/components/ExpenseTable.tsx',
  'src/components/ReceiptUploader.tsx',
  'src/components/ApprovalWorkflow.tsx',
  'src/components/SpendAnalyticsChart.tsx',
  'src/components/PolicyRuleEditor.tsx',
  'src/components/Sidebar.tsx',
  'src/components/Navbar.tsx',
  'src/components/StatCard.tsx',
  'src/app/api/auth/login/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/users/route.ts',
  'src/app/api/expenses/route.ts',
  'src/app/api/expenses/[id]/route.ts',
  'src/app/api/receipts/route.ts',
  'src/app/api/categories/route.ts',
  'src/app/api/policies/route.ts',
  'src/app/api/reports/route.ts',
  'src/app/api/notifications/route.ts',
  'src/lib/db.ts',
  'src/lib/data.ts',
  'src/lib/auth.ts',
  'src/lib/ocrService.ts',
  'src/lib/policyEngine.ts',
  'src/lib/utils.ts',
  'prisma/schema.prisma',
  'tailwind.config.js',
  'postcss.config.js',
  'tsconfig.json',
  'package.json',
];

export const ChatPane: React.FC<Props> = ({
  projectName,
  state,
  storyStage,
  pipeline1Step,
  pipeline2Step,
  tokensCount,
  placeholder = 'Describe what you want to build…',
  onStartGeneration,
  onProceedToBuild,
  onConnectDatabase,
  onResetStory,
  onBack,
  onSend,
  onStop,
  onJumpToFile,
  onOpenPlan,
  onOpenTokens,
  onViewArchitecture,
  onOpenDatabase,
  suggestions,
}) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState('');

  // Track expanded execution traces by key
  const [expandedTraces, setExpandedTraces] = useState<Record<string, boolean>>({
    'p1-skill-gathering': false,
  });
  const [pipeline1Collapsed, setPipeline1Collapsed] = useState(false);
  const [pipeline2Collapsed, setPipeline2Collapsed] = useState(false);
  const [copiedTrace, setCopiedTrace] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [storyStage, pipeline1Step, pipeline2Step, state.messages]);

  const submit = () => {
    const t = draft.trim();
    if (!t || state.generating || storyStage !== 'completed') return;
    setDraft('');
    onSend(t);
  };

  const toggleTrace = (key: string) => {
    setExpandedTraces(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyTraceJson = (key: string, data: object) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedTrace(key);
    toast({ title: 'Trace log copied', description: 'Execution trace JSON copied to clipboard.' });
    setTimeout(() => setCopiedTrace(null), 2000);
  };

  const cleanProjectName = projectName.replace(/—\s*Build/i, '').trim();

  return (
    <div className="flex h-full flex-col bg-[#FAFAFA] font-sans border-r border-slate-200">
      {/* Top Header */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:px-4">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBack}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            title="Back to projects"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <span className="text-[13.5px] font-bold text-slate-900 truncate block leading-tight">
              {cleanProjectName}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenTokens}
            title="View Token Consumption Report"
            className="flex items-center gap-1.5 text-[11.5px] font-semibold text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100/70 border border-indigo-100 px-2.5 py-1 rounded-full cursor-pointer transition"
          >
            <Zap className="w-3 h-3 text-indigo-500" />
            <span>{tokensCount.toLocaleString()} tokens</span>
          </button>

          {onResetStory && storyStage !== 'unstarted' && (
            <button
              onClick={onResetStory}
              title="Restart story from initial state"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}


        </div>
      </div>

      {/* Main Conversation & Step-by-Step Pipeline Area */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 text-[13px]">
        {/* STAGE 0: UNSTARTED (Matches Image 4) */}
        {storyStage === 'unstarted' && (
          <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center px-4 py-8 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center mb-5 shadow-md">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-[15px] font-black uppercase tracking-wider text-slate-900 mb-2">
              {cleanProjectName.toUpperCase()}
            </h3>
            <p className="text-[13px] text-slate-500 leading-relaxed max-w-[280px] mb-8">
              Discovery &amp; Planning context is loaded. Click below to analyze specs and generate your technical implementation plan.
            </p>
            <button
              onClick={onStartGeneration}
              className="w-full max-w-[280px] flex items-center justify-center gap-2 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 px-6 text-[12.5px] font-bold shadow-lg transition-all cursor-pointer group hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="tracking-wide">START APPLICATION GENERATION</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* STAGES >= GENERATING_PLAN */}
        {storyStage !== 'unstarted' && (
          <>
            {/* User Initial Message 1 */}
            <div className="flex flex-col items-end space-y-1 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#0F172A] text-white px-4 py-2 text-[13px] font-medium shadow-sm flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Start Solution Application Generation</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 pr-8">04:42 PM</span>
            </div>

            {/* Generating Plan indicator */}
            {storyStage === 'generating_plan' && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-xs font-semibold animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>AI is analyzing specs and synthesizing implementation plan…</span>
              </div>
            )}

            {/* Assistant Response 1 */}
            {storyStage !== 'generating_plan' && (
              <div className="flex flex-col items-start space-y-1 animate-fade-in">
                <div className="flex items-start gap-2 max-w-[92%]">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 p-3 text-slate-700 leading-relaxed shadow-xs">
                    I have drafted the feature-wise <strong className="text-slate-900 font-semibold">Implementation Plan</strong>! Review it in the{' '}
                    <button
                      onClick={onOpenPlan}
                      className="inline-flex items-center font-bold text-slate-900 underline decoration-slate-300 hover:text-indigo-600 cursor-pointer"
                    >
                      PLAN
                    </button>{' '}
                    tab on the right and click <strong className="text-slate-900 font-semibold">Proceed to Build</strong> when ready.
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 pl-8">04:42 PM</span>
              </div>
            )}

            {/* Quick Action banner for Plan Ready */}
            {storyStage === 'plan_ready' && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/90 border border-indigo-200/80 flex items-center justify-between shadow-xs animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  <span className="text-[12.5px] font-bold text-indigo-950">Implementation Plan Ready</span>
                </div>
                <button
                  onClick={onProceedToBuild}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white text-[12px] font-bold shadow-xs cursor-pointer transition hover:scale-105"
                >
                  <span>Proceed to Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* User Message 2 (Plan Approved) */}
            {(storyStage === 'pipeline1_running' ||
              storyStage === 'awaiting_db' ||
              storyStage === 'pipeline2_running' ||
              storyStage === 'completed') && (
              <div className="flex flex-col items-end space-y-1 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#0F172A] text-white px-4 py-2 text-[12.5px] font-medium shadow-sm flex items-center gap-2 max-w-[85%] text-right">
                    <span>Implementation plan approved. Proceed with full-stack code generation.</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 pr-8">08:35 AM</span>
              </div>
            )}

            {/* PIPELINE 1 CARD */}
            {(storyStage === 'pipeline1_running' ||
              storyStage === 'awaiting_db' ||
              storyStage === 'pipeline2_running' ||
              storyStage === 'completed') && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">Execution Pipeline</h4>
                      <p className="text-[10.5px] text-slate-400 leading-none mt-0.5">Live execution status &amp; technical trace logs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {storyStage !== 'pipeline1_running' ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-500" /> PIPELINE COMPLETE
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin text-indigo-500" /> EXECUTING...
                      </span>
                    )}
                    <button
                      onClick={() => setPipeline1Collapsed(c => !c)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {pipeline1Collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {!pipeline1Collapsed && (
                  <div className="p-3.5 space-y-3 font-sans">
                    {/* Step 1: requirement-analyzer */}
                    <div className="flex items-start gap-2.5">
                      {pipeline1Step >= 1 ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[12px] font-semibold text-slate-800">requirement-analyzer</span>
                          {pipeline1Step >= 1 ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                              DATA FEEDED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                              ANALYZING...
                            </span>
                          )}
                        </div>
                        {pipeline1Step >= 1 && (
                          <>
                            <button
                              onClick={() => toggleTrace('p1-req')}
                              className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                            >
                              <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p1-req'] && 'rotate-90')} />
                              <span>_ View technical trace · 1 event</span>
                            </button>
                            {expandedTraces['p1-req'] && (
                              <TraceTerminalView
                                title="requirement_analyzer"
                                data={TRACE_DATA['requirement-analyzer'].json}
                                copied={copiedTrace === 'p1-req'}
                                onCopy={() => copyTraceJson('p1-req', TRACE_DATA['requirement-analyzer'].json)}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Step 2: skill-gathering */}
                    {pipeline1Step >= 1 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {pipeline1Step >= 2 ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">skill-gathering</span>
                            {pipeline1Step >= 2 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                SKILLS GATHERED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                DISCOVERING...
                              </span>
                            )}
                          </div>
                          {pipeline1Step >= 2 && (
                            <>
                              <button
                                onClick={() => toggleTrace('p1-skill-gathering')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p1-skill-gathering'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p1-skill-gathering'] && (
                                <TraceTerminalView
                                  title="skill_discovery"
                                  data={TRACE_DATA['skill-gathering'].json}
                                  copied={copiedTrace === 'p1-skill-gathering'}
                                  onCopy={() => copyTraceJson('p1-skill-gathering', TRACE_DATA['skill-gathering'].json)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 3: context-architect */}
                    {pipeline1Step >= 2 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {pipeline1Step >= 3 ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">context-architect</span>
                            {pipeline1Step >= 3 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                ARCHITECTURE PLANNED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                PLANNING...
                              </span>
                            )}
                          </div>

                          {/* Planned Code Structure Banner */}
                          {pipeline1Step >= 3 && (
                            <div className="rounded-xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] border border-purple-800/40 p-2.5 flex items-center justify-between shadow-xs animate-fade-in">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-purple-600/60 border border-purple-400/40 text-purple-200 flex items-center justify-center font-bold text-[10px]">
                                  tb
                                </div>
                                <span className="text-[12px] font-bold text-white tracking-wide">
                                  Planned Code Structure
                                </span>
                              </div>
                              <button
                                onClick={onViewArchitecture}
                                className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                              >
                                <span>View Architecture</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {pipeline1Step >= 3 && (
                            <>
                              <button
                                onClick={() => toggleTrace('p1-arch')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p1-arch'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p1-arch'] && (
                                <TraceTerminalView
                                  title="architecture_synthesis"
                                  data={TRACE_DATA['context-architect'].json}
                                  copied={copiedTrace === 'p1-arch'}
                                  onCopy={() => copyTraceJson('p1-arch', TRACE_DATA['context-architect'].json)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 4: project-initializer */}
                    {pipeline1Step >= 3 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {pipeline1Step >= 4 ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">project-initializer</span>
                            {pipeline1Step >= 4 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                PROJECT INITIALIZED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                INITIALIZING...
                              </span>
                            )}
                          </div>
                          {pipeline1Step >= 4 && (
                            <>
                              <button
                                onClick={() => toggleTrace('p1-proj')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p1-proj'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p1-proj'] && (
                                <TraceTerminalView
                                  title="scaffold_project_files"
                                  data={TRACE_DATA['project-initializer'].json}
                                  copied={copiedTrace === 'p1-proj'}
                                  onCopy={() => copyTraceJson('p1-proj', TRACE_DATA['project-initializer'].json)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 5: database-initializer */}
                    {pipeline1Step >= 4 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {storyStage === 'pipeline2_running' || storyStage === 'completed' ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : storyStage === 'awaiting_db' ? (
                          <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">database-init..</span>
                            {storyStage === 'pipeline2_running' || storyStage === 'completed' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                DATABASE CONFIGURED
                              </span>
                            ) : storyStage === 'awaiting_db' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                                AWAITING CLUSTER
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-amber-600 bg-amber-50 border border-amber-200 animate-pulse">
                                CHECKING DB...
                              </span>
                            )}
                          </div>
                          {(storyStage === 'awaiting_db' || storyStage === 'pipeline2_running' || storyStage === 'completed') && (
                            <>
                              <button
                                onClick={() => toggleTrace('p1-db')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p1-db'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p1-db'] && (
                                <TraceTerminalView
                                  title="database_initializer"
                                  data={
                                    storyStage === 'pipeline2_running' || storyStage === 'completed'
                                      ? TRACE_DATA['database-initializer'].json
                                      : TRACE_DATA['database-initializer-awaiting'].json
                                  }
                                  copied={copiedTrace === 'p1-db'}
                                  onCopy={() =>
                                    copyTraceJson(
                                      'p1-db',
                                      storyStage === 'pipeline2_running' || storyStage === 'completed'
                                        ? TRACE_DATA['database-initializer'].json
                                        : TRACE_DATA['database-initializer-awaiting'].json
                                    )
                                  }
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Database Connection Required Banner */}
            {(storyStage === 'awaiting_db' ||
              storyStage === 'pipeline2_running' ||
              storyStage === 'completed') && (
              <div className="flex flex-col items-start space-y-1 animate-fade-in">
                <div className="w-full rounded-2xl border border-amber-200/90 bg-[#FFFDF5] p-3.5 shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[12.5px] font-bold text-amber-900 leading-snug">
                        Database Connection Required
                      </h5>
                      <p className="text-[11.5px] text-amber-800/90 leading-relaxed mt-0.5">
                        Please connect your MongoDB cluster URL in the Database tab to proceed with full-stack application code generation.
                      </p>
                      {storyStage === 'awaiting_db' && (
                        <div className="mt-2.5">
                          <button
                            onClick={onOpenDatabase}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-[11.5px] font-bold shadow-xs transition cursor-pointer hover:scale-105"
                          >
                            <span>Configure Database</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 pl-2">08:17 AM</span>
              </div>
            )}

            {/* User Message 3: Database connected */}
            {(storyStage === 'pipeline2_running' || storyStage === 'completed') && (
              <div className="flex flex-col items-start space-y-1 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="rounded-2xl bg-[#0F172A] text-white px-4 py-2.5 text-[12.5px] font-medium shadow-sm max-w-[85%]">
                    <span>Database connected successfully. Proceed with code generation.</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 pl-8">08:18 AM</span>
              </div>
            )}

            {/* PIPELINE 2 CARD */}
            {(storyStage === 'pipeline2_running' || storyStage === 'completed') && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[12.5px] font-bold text-slate-900 leading-tight">Execution Pipeline</h4>
                      <p className="text-[10.5px] text-slate-400 leading-none mt-0.5">Live execution status &amp; technical trace logs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {storyStage === 'completed' ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-500" /> PIPELINE COMPLETE
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin text-indigo-500" /> EXECUTING...
                      </span>
                    )}
                    <button
                      onClick={() => setPipeline2Collapsed(c => !c)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {pipeline2Collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {!pipeline2Collapsed && (
                  <div className="p-3.5 space-y-3 font-sans">
                    {/* Step 1: requirement-analyzer */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[12px] font-semibold text-slate-800">requirement-analyzer</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                            DATA FEEDED
                          </span>
                        </div>
                        <button
                          onClick={() => toggleTrace('p2-req')}
                          className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                        >
                          <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p2-req'] && 'rotate-90')} />
                          <span>_ View technical trace · 1 event</span>
                        </button>
                        {expandedTraces['p2-req'] && (
                          <TraceTerminalView
                            title="requirement_analyzer"
                            data={TRACE_DATA['requirement-analyzer'].json}
                            copied={copiedTrace === 'p2-req'}
                            onCopy={() => copyTraceJson('p2-req', TRACE_DATA['requirement-analyzer'].json)}
                          />
                        )}
                      </div>
                    </div>

                    {/* Step 2: database-initializer */}
                    <div className="flex items-start gap-2.5">
                      {pipeline2Step >= 2 ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[12px] font-semibold text-slate-800">database-initializer</span>
                          {pipeline2Step >= 2 ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                              DATABASE CONFIGURED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                              CONNECTING...
                            </span>
                          )}
                        </div>
                        {pipeline2Step >= 2 && (
                          <>
                            <button
                              onClick={() => toggleTrace('p2-db')}
                              className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                            >
                              <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p2-db'] && 'rotate-90')} />
                              <span>_ View technical trace · 1 event</span>
                            </button>
                            {expandedTraces['p2-db'] && (
                              <TraceTerminalView
                                title="database_connection_test"
                                data={TRACE_DATA['database-initializer-ready'].json}
                                copied={copiedTrace === 'p2-db'}
                                onCopy={() => copyTraceJson('p2-db', TRACE_DATA['database-initializer-ready'].json)}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Step 3: code-writer */}
                    {pipeline2Step >= 2 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {pipeline2Step >= 3 ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">code-writer</span>
                            {pipeline2Step >= 3 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                55 FILES GENERATED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                WRITING 55 FILES...
                              </span>
                            )}
                          </div>
                          {pipeline2Step >= 3 && (
                            <>
                              <button
                                onClick={() => toggleTrace('p2-code')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p2-code'] && 'rotate-90')} />
                                <span>_ View technical trace · 55 events</span>
                              </button>
                              {expandedTraces['p2-code'] && (
                                <div className="mt-2 rounded-xl border border-stone-200 bg-white p-2.5 shadow-sm space-y-2 animate-fade-in font-sans">
                                  <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-800">
                                      <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                                      <span>GENERATED CODE FILES (55)</span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(GENERATED_FILES_55.join('\n'));
                                        toast({ title: 'Files list copied', description: '55 file paths copied to clipboard.' });
                                      }}
                                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                                    >
                                      <Copy className="w-2.5 h-2.5" />
                                      <span>Copy</span>
                                    </button>
                                  </div>

                                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                                    {GENERATED_FILES_55.map((file, idx) => (
                                      <div
                                        key={file}
                                        className="flex items-center justify-between p-1.5 rounded-lg border border-stone-100 bg-stone-50/70 hover:bg-indigo-50/40 hover:border-indigo-200 transition"
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                                          <FileCode2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                                          <span className="font-mono text-[11px] text-slate-800 truncate" title={file}>
                                            {file}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() => onJumpToFile(file)}
                                          className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 cursor-pointer shrink-0"
                                        >
                                          <span>View</span>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 4: code-validator */}
                    {pipeline2Step >= 3 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {pipeline2Step >= 4 ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">code-validator</span>
                            {pipeline2Step >= 4 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                CODE VALIDATED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                TYPE CHECKING...
                              </span>
                            )}
                          </div>
                          {pipeline2Step >= 4 && (
                            <>
                              <button
                                onClick={() => toggleTrace('p2-val')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p2-val'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p2-val'] && (
                                <TraceTerminalView
                                  title="syntax_and_type_check"
                                  data={TRACE_DATA['code-validator'].json}
                                  copied={copiedTrace === 'p2-val'}
                                  onCopy={() => copyTraceJson('p2-val', TRACE_DATA['code-validator'].json)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 5: build-executor */}
                    {pipeline2Step >= 4 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {pipeline2Step >= 5 ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">build-executor</span>
                            {pipeline2Step >= 5 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                BUILD EXECUTED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                COMPILING...
                              </span>
                            )}
                          </div>
                          {pipeline2Step >= 5 && (
                            <>
                              <button
                                onClick={() => toggleTrace('p2-build')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p2-build'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p2-build'] && (
                                <TraceTerminalView
                                  title="next_build_runner"
                                  data={TRACE_DATA['build-executor'].json}
                                  copied={copiedTrace === 'p2-build'}
                                  onCopy={() => copyTraceJson('p2-build', TRACE_DATA['build-executor'].json)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 6: build-validator */}
                    {pipeline2Step >= 5 && (
                      <div className="flex items-start gap-2.5 animate-fade-in">
                        {storyStage === 'completed' ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[12px] font-semibold text-slate-800">build-validator</span>
                            {storyStage === 'completed' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                BUILD VALIDATED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-200 animate-pulse">
                                VERIFYING...
                              </span>
                            )}
                          </div>
                          {storyStage === 'completed' && (
                            <>
                              <button
                                onClick={() => toggleTrace('p2-val2')}
                                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 mt-1 cursor-pointer"
                              >
                                <ChevronRight className={cx('w-3 h-3 transition-transform', expandedTraces['p2-val2'] && 'rotate-90')} />
                                <span>_ View technical trace · 1 event</span>
                              </button>
                              {expandedTraces['p2-val2'] && (
                                <TraceTerminalView
                                  title="runtime_smoke_test"
                                  data={TRACE_DATA['build-validator'].json}
                                  copied={copiedTrace === 'p2-val2'}
                                  onCopy={() => copyTraceJson('p2-val2', TRACE_DATA['build-validator'].json)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Application Ready Box */}
            {storyStage === 'completed' && (
              <div className="flex flex-col items-start space-y-1 animate-fade-in">
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h5 className="text-[12.5px] font-bold text-slate-900">Application Ready!</h5>
                  </div>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Your application preview is live in the <strong className="text-slate-900 font-semibold">Preview</strong> panel! You can test interactive features or ask for further customizations.
                  </p>
                  <div className="pt-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] text-white text-[11px] font-bold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>CURRENTLY PREVIEWING</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 pl-2">08:39 AM</span>
              </div>
            )}

            {/* Dynamic New Messages */}
            {state.messages
              .filter(
                m =>
                  !m.content.toLowerCase().includes('imported the approved') &&
                  !m.content.toLowerCase().includes('solution planner')
              )
              .map(m => (
              <div key={m.id} className={cx('flex gap-2.5', m.role === 'user' && 'flex-row-reverse')}>
                <div
                  className={cx(
                    'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs',
                    m.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-[#0F172A] text-white'
                  )}
                >
                  {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>
                <div className={cx('max-w-[88%] min-w-0 space-y-2', m.role === 'user' && 'items-end')}>
                  <div
                    className={cx(
                      'rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                      m.role === 'user'
                        ? 'bg-[#0F172A] text-white rounded-tr-sm'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                    )}
                  >
                    {m.role === 'user' ? m.content : <Markdown source={m.content || '…'} className="[&_p]:my-0" />}
                    {m.streaming && <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />}
                  </div>
                  {m.activity && (
                    <div className="space-y-1">
                      {m.activity.map((a, i) => (
                        <button
                          key={i}
                          disabled={!a.file || !a.done}
                          onClick={() => a.file && onJumpToFile(a.file)}
                          title={a.file ? 'Jump to file' : undefined}
                          className={cx(
                            'w-full flex items-center gap-2 text-left text-[12px] px-2.5 py-1 rounded-lg border font-mono',
                            a.done
                              ? 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400'
                              : 'border-dashed border-slate-200 text-slate-400'
                          )}
                        >
                          {a.done ? <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> : <Loader2 className="w-3 h-3 animate-spin shrink-0" />}
                          {a.file && <FileCode2 className="w-3 h-3 text-slate-400 shrink-0" />}
                          <span className="truncate">{a.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="shrink-0 border-t border-slate-200 bg-white p-3">
        {state.generating && (
          <div className="flex items-center gap-2 text-[12px] text-amber-600 font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>AI is generating… click stop to pause.</span>
          </div>
        )}
        <div
          className={cx(
            'rounded-2xl border p-2 transition',
            storyStage === 'unstarted'
              ? 'border-slate-200 bg-slate-100/60 opacity-70'
              : 'border-slate-200 bg-slate-50/70 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100'
          )}
        >
          <textarea
            value={draft}
            disabled={storyStage === 'unstarted'}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={2}
            placeholder={
              storyStage === 'unstarted'
                ? "Click 'Start Application Generation' above to begin..."
                : placeholder
            }
            className="w-full resize-none bg-transparent min-h-[46px] text-[13.5px] leading-relaxed px-2 py-1 focus:outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          />
          <div className="flex items-center justify-between pt-1 px-1">
            <span className="text-[10px] text-slate-400">
              {storyStage === 'unstarted'
                ? 'Generation required'
                : 'Enter to send · Shift+Enter for new line'}
            </span>
            {state.generating ? (
              <button
                onClick={onStop}
                title="Stop generation"
                className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 cursor-pointer shadow-xs"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={storyStage === 'unstarted' || !draft.trim()}
                className="w-7 h-7 rounded-xl bg-[#0F172A] text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 cursor-pointer shadow-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Terminal-style execution trace log viewer matching Screenshot 4 */
interface TraceTerminalViewProps {
  title: string;
  data: object;
  copied: boolean;
  onCopy: () => void;
}

const TraceTerminalView: React.FC<TraceTerminalViewProps> = ({ title, data, copied, onCopy }) => {
  return (
    <div className="mt-2 rounded-xl border border-stone-200 bg-white p-2.5 shadow-sm space-y-2 animate-fade-in">
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
        <span className="text-slate-400">#1</span>
        <Check className="w-3 h-3 text-emerald-500" />
        <span className="font-semibold text-slate-800">{title}</span>
      </div>

      {/* Terminal window */}
      <div className="rounded-xl overflow-hidden border border-stone-800 bg-[#0C0E14] shadow-md">
        {/* Top bar with macOS colored dots */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#141721] border-b border-stone-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-stone-400 uppercase">
            EXECUTION TRACE LOG
          </span>
          <button
            onClick={onCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
          >
            {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Monospace Code Content */}
        <pre className="p-3 text-[11px] font-mono text-emerald-400 leading-relaxed overflow-x-auto max-h-[160px] scrollbar-thin">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};
