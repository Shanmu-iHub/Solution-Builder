import React, { useState } from 'react';
import {
  Boxes,
  Layers,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Check,
  X,
  Play,
  RotateCcw,
  Send,
  Sliders,
  Settings,
  Share2,
  Download,
  Maximize2,
  FileText,
  Code2,
  GitBranch,
  Database,
  Cloud,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';
import {
  SolutionActivityId,
  CSuiteMemberId,
  ActivityValidationStatus,
  CSuiteMemberReview,
  SOLUTION_ACTIVITIES_MAPPING
} from '../../../services/csuiteSolutionBuilder/types';
import { ExecutionPipelineTracker } from './ExecutionPipelineTracker';
import { ImplementationPlanView } from './ImplementationPlanView';
import { PlannedArchitectureView } from './PlannedArchitectureView';
import { FinalStageValidationCard } from './FinalStageValidationCard';
import { CSuiteReviewModal } from './CSuiteReviewModal';

export const SolutionBuilderIDE: React.FC = () => {
  const { setCurrentView } = useNavigation();

  // Active Project (OmniBoard Support Hub vs ExpensifyIQ)
  const [selectedApp, setSelectedApp] = useState<'omniboard' | 'expensify'>('omniboard');

  // Top Nav Tabs
  const [activeTab, setActiveTab] = useState<'plan' | 'preview' | 'code' | 'git' | 'database' | 'deployment'>('preview');

  // Selected Activity in the Pipeline
  const [selectedActivityId, setSelectedActivityId] = useState<SolutionActivityId>('architect');

  // Review Modal State
  const [activeReviewModal, setActiveReviewModal] = useState<CSuiteMemberReview | null>(null);

  // Scenario state: 'validated' | 'changes-required'
  const [scenario, setScenario] = useState<'validated' | 'changes-required'>('validated');

  // Interactive Activities State
  const [activitiesState, setActivitiesState] = useState<
    Record<SolutionActivityId, {
      status: ActivityValidationStatus;
      reviews: Record<string, CSuiteMemberReview>;
    }>
  >(() => {
    const initialState: any = {};
    Object.keys(SOLUTION_ACTIVITIES_MAPPING).forEach((key) => {
      const act = SOLUTION_ACTIVITIES_MAPPING[key as SolutionActivityId];
      initialState[key] = {
        status: act.defaultStatus,
        reviews: { ...act.reviews }
      };
    });
    return initialState;
  });

  // Toggle scenario to simulate Changes Required
  const handleToggleScenario = () => {
    if (scenario === 'validated') {
      // Simulate CDO issue on 'data-seeding' and CISO issue on 'db-credentials'
      setScenario('changes-required');
      setActivitiesState((prev) => {
        const next = { ...prev };
        next['data-seeding'] = {
          status: 'Changes Required',
          reviews: {
            ...next['data-seeding'].reviews,
            CDO: {
              memberId: 'CDO',
              memberName: 'Chief Data Officer',
              role: 'Data schema & integrity',
              status: 'Changes Required',
              validationArea: 'Database Schema',
              reviewMessage: 'Schema does not completely satisfy the approved data requirements. Missing composite index on ticket status and tenant_id.',
              requiredAction: 'Update the schema migrations to include tenant_id composite indexes and resubmit for CDO validation.'
            }
          }
        };
        next['db-credentials'] = {
          status: 'Changes Required',
          reviews: {
            ...next['db-credentials'].reviews,
            CISO: {
              memberId: 'CISO',
              memberName: 'Chief Information Security Officer',
              role: 'Security controls',
              status: 'Changes Required',
              validationArea: 'Credential Vault Security',
              reviewMessage: 'Database connection string contains static password token. Vault dynamic IAM secret rotation must be enforced.',
              requiredAction: 'Switch to IAM-based short-lived database auth tokens and resubmit for CISO validation.'
            }
          }
        };
        return next;
      });
    } else {
      // Restore all validated
      setScenario('validated');
      const resetState: any = {};
      Object.keys(SOLUTION_ACTIVITIES_MAPPING).forEach((key) => {
        const act = SOLUTION_ACTIVITIES_MAPPING[key as SolutionActivityId];
        resetState[key] = {
          status: 'Validated',
          reviews: { ...act.reviews }
        };
      });
      setActivitiesState(resetState);
    }
  };

  // Resubmit review action
  const handleResubmitReview = (review: CSuiteMemberReview) => {
    // Revalidate this executive and update state
    setActivitiesState((prev) => {
      const next = { ...prev };
      // Find activity that has this review
      Object.keys(next).forEach((actKey) => {
        const act = next[actKey as SolutionActivityId];
        if (act.reviews[review.memberId] && act.reviews[review.memberId].validationArea === review.validationArea) {
          act.reviews[review.memberId] = {
            ...act.reviews[review.memberId],
            status: 'Validated',
            reviewMessage: `${review.memberId} re-validation passed. All required adjustments verified.`
          };
          // Check if all required members are now Validated
          const cfg = SOLUTION_ACTIVITIES_MAPPING[actKey as SolutionActivityId];
          const allOk = cfg.requiredMembers.every((m) => act.reviews[m]?.status === 'Validated');
          if (allOk) {
            act.status = 'Validated';
          }
        }
      });
      return next;
    });

    // Check if both CDO and CISO issues are now cleared
    setTimeout(() => {
      setScenario('validated');
    }, 400);

    setActiveReviewModal(null);
  };

  // Determine stage overall approval
  const hasChangesRequired = Object.values(activitiesState).some(
    (act) => act.status === 'Changes Required'
  );
  const isStageApproved = !hasChangesRequired && scenario === 'validated';

  // Executives list for Final Stage Approval Card
  const finalExecutives: Array<{
    id: CSuiteMemberId;
    name: string;
    status: 'Validated' | 'Changes Required' | 'In Review' | 'Pending';
    area: string;
  }> = [
    { id: 'CPO', name: 'Chief Product Officer', status: 'Validated', area: 'Product Behavior' },
    { id: 'CTO', name: 'Chief Technology Officer', status: 'Validated', area: 'Technical Architecture' },
    {
      id: 'CDO',
      name: 'Chief Data Officer',
      status: activitiesState['data-seeding']?.reviews?.CDO?.status || 'Validated',
      area: 'Data Schema'
    },
    {
      id: 'CISO',
      name: 'Chief Information Security Officer',
      status: activitiesState['db-credentials']?.reviews?.CISO?.status || 'Validated',
      area: 'Security Controls'
    },
    { id: 'CIO', name: 'Chief Information Officer', status: 'Validated', area: 'Deployment Readiness' }
  ];

  // Failed executives for summary card
  const failedExecutives: Array<{
    id: CSuiteMemberId;
    name: string;
    area: string;
    review: CSuiteMemberReview;
  }> = [];

  if (activitiesState['data-seeding']?.reviews?.CDO?.status === 'Changes Required') {
    failedExecutives.push({
      id: 'CDO',
      name: 'Chief Data Officer',
      area: 'Data schema',
      review: activitiesState['data-seeding'].reviews.CDO
    });
  }
  if (activitiesState['db-credentials']?.reviews?.CISO?.status === 'Changes Required') {
    failedExecutives.push({
      id: 'CISO',
      name: 'Chief Information Security Officer',
      area: 'Security credentials',
      review: activitiesState['db-credentials'].reviews.CISO
    });
  }

  const appTitle = selectedApp === 'omniboard' ? 'OmniBoard Support Hub' : 'ExpensifyIQ';
  const tokenCount = selectedApp === 'omniboard' ? '61,773' : '49,277';

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col bg-slate-100/70 select-none pb-12">
      
      {/* 1. Top Navbar matching Screenshot 2, 3, 4 */}
      <header className="bg-white border-b border-slate-200/90 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sticky top-14 z-20 shadow-2xs">
        
        {/* Left: App Identity & Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedApp(selectedApp === 'omniboard' ? 'expensify' : 'omniboard')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
              title="Click to toggle reference application (OmniBoard / ExpensifyIQ)"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {selectedApp === 'omniboard' ? 'OB' : 'EQ'}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {appTitle}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-bold text-indigo-700">
              <Zap className="w-3 h-3 text-indigo-600 fill-indigo-600" />
              <span>{tokenCount} tokens</span>
            </div>
            <button
              type="button"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Workspace Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center/Right: Navigation Tabs & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          
          {/* Main Top Tabs: PLAN, PREVIEW, CODE, GIT, DATABASE, DEPLOYMENT */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-600">
            {(['plan', 'preview', 'code', 'git', 'database', 'deployment'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-slate-950 text-white shadow-2xs font-extrabold'
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Status Badge */}
          <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>READY</span>
          </div>

          {/* Actions: Expand, Share, Export */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer hidden sm:block"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">SHARE</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#18181b] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Two-Column Content Workspace */}
      <div className="w-full px-4 sm:px-6 py-4 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Interactive Chat & Execution Pipeline (5 cols) */}
        <section className="lg:col-span-5 space-y-4 flex flex-col">
          
          {/* Top Card matching Screenshot 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                APPLICATION WORKSPACE
              </span>
              <h2 className="text-base font-bold text-slate-950 uppercase tracking-wide">
                {appTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discovery & Planning context (BRD, PRD, SAD, Epics, Wireframes) is loaded.
              All Solution Building activities execute through attached C-Suite validation gates.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
              >
                <span>START APPLICATION GENERATION</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Interactive Chat History Stream matching Screenshot 3 & 4 */}
          <div className="space-y-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs">
            {/* User message */}
            <div className="flex items-start justify-end gap-2.5">
              <div className="bg-slate-950 text-white px-3.5 py-2 rounded-2xl rounded-tr-xs text-xs font-medium max-w-[85%] shadow-2xs">
                Start Solution Application Generation
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                U
              </div>
            </div>

            {/* Assistant message */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                AI
              </div>
              <div className="bg-slate-100 text-slate-800 px-3.5 py-2.5 rounded-2xl rounded-tl-xs text-xs leading-relaxed max-w-[90%] space-y-1">
                <p>
                  I have drafted the feature-wise <strong>Implementation Plan</strong>! Review it in
                  the <strong>PLAN</strong> tab on the right and click Proceed to Build when ready.
                </p>
                <span className="text-[10px] text-slate-400 block pt-0.5">06:06 PM</span>
              </div>
            </div>

            {/* User message 2 */}
            <div className="flex items-start justify-end gap-2.5">
              <div className="bg-slate-950 text-white px-3.5 py-2 rounded-2xl rounded-tr-xs text-xs font-medium max-w-[85%] shadow-2xs">
                Implementation plan approved. Proceed with full-stack code generation.
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                U
              </div>
            </div>
          </div>

          {/* Execution Pipeline Tracker with C-Suite Validation for all 10 Activities */}
          <ExecutionPipelineTracker
            activitiesState={activitiesState}
            onViewReview={(rev) => setActiveReviewModal(rev)}
            selectedActivityId={selectedActivityId}
            onSelectActivity={(id) => setSelectedActivityId(id)}
          />

          {/* Bottom Chat Prompt Input Box */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="relative">
              <textarea
                rows={2}
                placeholder="Describe what you want to build..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 resize-none"
              />
              <button
                type="button"
                className="absolute right-2.5 bottom-2.5 p-1.5 rounded-lg bg-slate-950 text-white hover:bg-black transition-colors cursor-pointer shadow-2xs"
                title="Send instruction"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Shift+Enter for new line</span>
              <span className="text-emerald-600 font-semibold">● 10/10 Activities Ready</span>
            </div>
          </div>
        </section>

        {/* Right Column: Active Tab Content & Final Stage Validation (7 cols) */}
        <section className="lg:col-span-7 space-y-5 flex flex-col">
          
          {/* Main Tab View Area */}
          <div className="min-h-[580px]">
            {activeTab === 'plan' && <ImplementationPlanView appName={appTitle} />}

            {activeTab === 'preview' && <PlannedArchitectureView />}

            {activeTab === 'code' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-sm text-slate-900">Generated Full-Stack Codebase</h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Validated by CTO & CISO
                  </span>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 space-y-2 overflow-x-auto">
                  <div className="text-slate-500">// src/server/routes/tickets.ts - Secure TypeScript API</div>
                  <div><span className="text-indigo-400">import</span> &#123; Hono &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">'hono'</span>;</div>
                  <div><span className="text-indigo-400">import</span> &#123; zValidator &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@hono/zod-validator'</span>;</div>
                  <div><span className="text-indigo-400">import</span> &#123; TicketSchema &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">'../models/ticket'</span>;</div>
                  <br />
                  <div><span className="text-indigo-400">export const</span> ticketRoutes = <span className="text-indigo-400">new</span> Hono()</div>
                  <div className="pl-4">.get(<span className="text-emerald-400">'/'</span>, <span className="text-indigo-400">async</span> (c) =&gt; &#123;</div>
                  <div className="pl-8 text-slate-400">// Strict RBAC & Tenant isolation enforced</div>
                  <div className="pl-8"><span className="text-indigo-400">const</span> tickets = <span className="text-indigo-400">await</span> ticketService.findAll();</div>
                  <div className="pl-8"><span className="text-indigo-400">return</span> c.json(&#123; success: <span className="text-amber-400">true</span>, data: tickets &#125;);</div>
                  <div className="pl-4">&#125;);</div>
                </div>
              </div>
            )}

            {activeTab === 'git' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-sm text-slate-900">Repository & Branch Verification</h3>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">branch: main (synced)</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                    <div>
                      <strong className="block text-slate-900">feat: complete solution builder implementation plan</strong>
                      <span className="text-[11px] text-slate-500">commit #7e4b91c • 2 minutes ago</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ CI Passed
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                    <div>
                      <strong className="block text-slate-900">feat: schema models & data seeding migrations</strong>
                      <span className="text-[11px] text-slate-500">commit #5a3d82f • 14 minutes ago</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ CI Passed
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-rose-600" />
                    <h3 className="font-bold text-sm text-slate-900">PostgreSQL Relational Schema</h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    CDO Validated
                  </span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Table</th>
                        <th className="p-3">Columns</th>
                        <th className="p-3">Indexes</th>
                        <th className="p-3">Referential Integrity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-mono font-bold text-slate-900">tickets</td>
                        <td className="p-3">id, title, priority, status, assignee_id</td>
                        <td className="p-3 font-mono text-[11px]">PRIMARY, idx_status</td>
                        <td className="p-3 text-emerald-700 font-semibold">✓ Verified</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-slate-900">agents</td>
                        <td className="p-3">id, name, email, department, role</td>
                        <td className="p-3 font-mono text-[11px]">PRIMARY, idx_email_unique</td>
                        <td className="p-3 text-emerald-700 font-semibold">✓ Verified</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-slate-900">audit_logs</td>
                        <td className="p-3">id, entity_id, actor_id, diff_json, timestamp</td>
                        <td className="p-3 font-mono text-[11px]">PRIMARY, idx_timestamp</td>
                        <td className="p-3 text-emerald-700 font-semibold">✓ Verified</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'deployment' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-cyan-600" />
                    <h3 className="font-bold text-sm text-slate-900">Runtime Sandbox & Live Preview</h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    CIO & CISO Validated
                  </span>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Preview Host URL:</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="font-mono text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      https://omniboard-preview.workbench.internal <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Deployment Status:</span>
                    <span className="text-emerald-700 font-bold">200 OK • Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">SSL / Security Headers:</span>
                    <span className="text-emerald-700 font-bold">TLS 1.3 • Strict CSP</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. FINAL STAGE APPROVAL CARD at bottom of Solution Building stage */}
          <FinalStageValidationCard
            stageApproved={isStageApproved}
            finalExecutives={finalExecutives}
            failedExecutives={failedExecutives}
            onContinue={() => {
              // Progression to next stage / workspace
              setCurrentView('products');
            }}
            onViewReview={(rev) => setActiveReviewModal(rev)}
            onToggleScenario={handleToggleScenario}
          />
        </section>
      </div>

      {/* 4. Functional C-Suite Review Modal */}
      {activeReviewModal && (
        <CSuiteReviewModal
          isOpen={true}
          review={activeReviewModal}
          onClose={() => setActiveReviewModal(null)}
          onResubmit={handleResubmitReview}
        />
      )}
    </div>
  );
};
