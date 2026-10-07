import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Download,
  FileText,
  Info,
  Layers,
  Maximize2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cx, timeAgo, useToast } from '../../ui';
import { Markdown } from '../../ui/Markdown';
import { plannerArchitectureLayers } from '../mockData';
import { briefFor, plannerDocuments, plannerMetrics } from '../plannerData';
import { useFactory } from '../FactoryStore';
import { usePlanning } from '../../planning/PlanningStore';
import { FactoryProject } from '../types';
import { makeTasks } from '../../planning/content';

interface Props {
  project: FactoryProject;
  onBack: () => void;
  onOpenBuild: (id: string) => void;
}

export const PlannerAppWorkspace: React.FC<Props> = ({ project, onBack, onOpenBuild }) => {
  const f = useFactory();
  const { toast } = useToast();
  const { projects: planningProjects, state: planningStateGetter } = usePlanning();

  // Top level tabs: problem_and_solution vs technical_docs
  const [activeMainTab, setActiveMainTab] = useState<'problem_and_solution' | 'technical_docs'>('problem_and_solution');
  // Sub tabs under problem_and_solution: identified_problem vs solution_planned
  const [activeProblemSolutionSubTab, setActiveProblemSolutionSubTab] = useState<'identified_problem' | 'solution_planned'>('identified_problem');
  // Tech doc sub tab: prd, sad, tdd, api_list, ddd, tasks
  const [activeTechDoc, setActiveTechDoc] = useState<'prd' | 'sad' | 'tdd' | 'api_list' | 'ddd' | 'tasks'>('prd');

  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const name = project.projectName.replace(/ — Build$/, '');
  const b = briefFor(name);

  // Look up if there is an active planning project matching name
  const matchedPlanning = planningProjects.find(p => p.name.toLowerCase() === name.toLowerCase());
  const planState = matchedPlanning ? planningStateGetter(matchedPlanning.id) : null;

  const docs = useMemo(() => plannerDocuments(name, b), [name, b]);
  const metrics = plannerMetrics();
  const epicsData = useMemo(() => makeTasks(), []);

  const copyToClipboard = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    setCopiedSection(label);
    toast({ title: 'Copied', description: `${label} copied to clipboard.` });
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const proceed = () => {
    const plan = `# Implementation Plan — ${name}

## 1. Summary
Imported from the approved **Solution Planner** roadmap. ${b.solution}

## 2. Objectives
${b.objectives.map(o => `- ${o}`).join('\n')}

## 3. Scope
**In scope:** ${b.inScope.join(', ')}.

**Out of scope:** ${b.outOfScope.join(', ')}.

## 4. Architecture
${plannerArchitectureLayers.map(l => `- **${l.name}** — ${l.items.join(', ')}`).join('\n')}

## 5. Delivery Steps
- [ ] Scaffold application and design tokens
- [ ] Implement data layer and API routes
- [ ] Build dashboard and list screens
- [ ] Add auth, validation and error handling
- [ ] Run lint / type-check and prepare deployment

## 6. Risks
- Quality of source data and knowledge
- Dependency on existing system APIs
- Change management with frontline users
`;
    const p = f.startFromPlan(`${name} — Build`, project.description, plan);
    toast({ title: 'Application session created', description: 'The planner roadmap was imported as the approved plan.' });
    onOpenBuild(p.projectId);
  };

  const currentDocContent = useMemo(() => {
    if (activeTechDoc === 'tasks') return '';
    const mapDocId: Record<string, string> = {
      prd: 'prd',
      sad: 'sad',
      tdd: 'tdd',
      api_list: 'api',
      ddd: 'ddd',
    };
    const targetId = mapDocId[activeTechDoc] || 'prd';
    const found = docs.find(d => d.id.toLowerCase() === targetId);
    return found ? found.body : docs[0]?.body || '';
  }, [activeTechDoc, docs]);

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-stone-900 font-sans pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              <button onClick={onBack} className="hover:text-stone-900 cursor-pointer transition-colors">
                SOLUTION BUILDER APPLICATIONS
              </button>
              <span className="text-stone-300">/</span>
              <span className="text-stone-900 uppercase">{name}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-stone-900 tracking-tight line-clamp-1">
              {name}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={proceed}
              className="group flex items-center gap-2.5 rounded-none bg-black text-white hover:bg-stone-800 px-6 py-3.5 text-xs font-bold uppercase tracking-widest shadow-xl transition-all cursor-pointer"
            >
              <Code2 size={16} className="transition-transform group-hover:scale-110" />
              <span>BUILD SOLUTION</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Main Classification Tabs */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveMainTab('problem_and_solution')}
              className={cx(
                'group relative flex items-center gap-2.5 px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer',
                activeMainTab === 'problem_and_solution'
                  ? 'bg-black text-white shadow-md border border-black'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-400'
              )}
            >
              <Briefcase size={16} />
              <span>Problem & Solution</span>
            </button>

            <button
              onClick={() => setActiveMainTab('technical_docs')}
              className={cx(
                'group relative flex items-center gap-2.5 px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer',
                activeMainTab === 'technical_docs'
                  ? 'bg-black text-white shadow-md border border-black'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-400'
              )}
            >
              <FileText size={16} />
              <span>Technical Documentation</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
            <Sparkles size={15} />
            <span>Solution Planning & Architect Insights</span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: PROBLEM & SOLUTION                            */}
        {/* ---------------------------------------------------- */}
        {activeMainTab === 'problem_and_solution' && (
          <div className="space-y-6">
            {/* Sub-tabs row */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveProblemSolutionSubTab('identified_problem')}
                  className={cx(
                    'flex items-center gap-2 px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                    activeProblemSolutionSubTab === 'identified_problem'
                      ? 'bg-black text-white shadow-sm border border-black'
                      : 'bg-white text-stone-700 border border-stone-200 shadow-xs hover:bg-stone-200/70 hover:text-stone-900 hover:border-stone-400'
                  )}
                >
                  <AlertCircle size={15} />
                  <span>Identified Problem</span>
                </button>

                <button
                  onClick={() => setActiveProblemSolutionSubTab('solution_planned')}
                  className={cx(
                    'flex items-center gap-2 px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                    activeProblemSolutionSubTab === 'solution_planned'
                      ? 'bg-black text-white shadow-sm border border-black'
                      : 'bg-white text-stone-700 border border-stone-200 shadow-xs hover:bg-stone-200/70 hover:text-stone-900 hover:border-stone-400'
                  )}
                >
                  <Sparkles size={15} className="text-amber-500" />
                  <span>Solution Planned</span>
                </button>
              </div>

              <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400 uppercase pr-3 font-semibold">
                {activeProblemSolutionSubTab === 'identified_problem' ? 'Problem Discovery Context' : 'Approved Solution Architecture'}
              </span>
            </div>

            {/* 1.1 IDENTIFIED PROBLEM SUBTAB */}
            {activeProblemSolutionSubTab === 'identified_problem' && (
              <div className="space-y-10 animate-fade-in">
                {/* Hero: Identified Problem Box */}
                <div className="bg-white border border-gray-200 p-8 space-y-6 shadow-xs">
                  {/* Top row */}
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
                    <div className="space-y-3 flex-1 xl:max-w-[60%]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 bg-amber-500 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-500">
                          IDENTIFIED BUSINESS PROBLEM
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-medium uppercase tracking-wider text-gray-900 leading-tight">
                        {name}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-medium uppercase tracking-wider xl:max-w-[40%] xl:justify-end">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200">
                        {b.domain || 'Problem Discovery'}
                      </span>
                      <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        Validated Problem Context
                      </span>

                    </div>
                  </div>

                  {/* Core Identified Problem Alert Banner */}
                  <div className="p-5 bg-amber-500/5 border-l-4 border-amber-500 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                          Identified Problem
                        </span>
                      </div>
                    </div>
                    <p className="text-base md:text-lg font-medium text-stone-900 leading-snug">
                      {b.problem}
                    </p>
                  </div>

                  {/* Initiative Context */}
                  <div className="space-y-1 text-xs text-gray-600 border-l-2 border-stone-200 pl-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 block">
                      Initiative Context
                    </span>
                    <p className="leading-relaxed text-stone-700 text-sm">
                      {b.initiativeContext || project.description}
                    </p>
                  </div>

                  {/* High Level Reqs Tags */}
                  {b.highLevelReqs && b.highLevelReqs.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-2">High-Level Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {b.highLevelReqs.map((req, i) => (
                          <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-xs text-gray-700">
                            <Check className="w-3 h-3 text-emerald-500" />
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Detailed Sections */}
                <div className="space-y-8">
                  {/* Two Column: Problem Statement & Current State */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white border border-gray-200 p-6 space-y-3">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Problem Statement
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {b.problemStatement || b.problem}
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 space-y-3">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Current State Process
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {b.currentState || 'Manual and spreadsheet-based reporting with fragmented email handoffs between teams.'}
                      </p>
                    </div>
                  </div>

                  {/* Two Column: Stakeholders & Business Objectives */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Key Stakeholders & User Personas */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Key Stakeholders &amp; User Personas
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {b.stakeholders.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 p-3 border border-gray-100 bg-gray-50/50">
                            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
                              {s.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs text-gray-700 font-medium">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strategic Business Objectives */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Strategic Business Objectives
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {b.objectives.map((obj, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-3 border border-gray-100 bg-gray-50/50">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs text-gray-700 font-medium">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Full Width: Project Scope Boundaries */}
                  <div className="bg-white border border-gray-200 p-6 space-y-4">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                      Project Scope Boundaries
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-600 block mb-2 font-bold">
                          In Scope
                        </span>
                        <ul className="space-y-2">
                          {b.inScope.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                          Out of Scope
                        </span>
                        <ul className="space-y-2">
                          {b.outOfScope.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Two Column: Business Rules & Success Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Business Rules */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Business Rules
                      </h4>
                      <ul className="space-y-2.5 text-xs text-gray-700">
                        {(b.businessRules || [
                          'Mandatory verification on high-value line items',
                          'Role-based approvals enforced based on organizational tier',
                          'Audit timestamps recorded for every state change',
                          'External currency conversions validated against central exchange index',
                        ]).map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Success Metrics */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Success Metrics &amp; Target KPIs
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {(b.successMetrics || [
                          'SLA turnaround < 48 hours',
                          '95% automated policy compliance',
                          '0% unrecorded exceptions',
                          'Employee CSAT > 4.5 / 5',
                        ]).map((m, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 p-3 border border-gray-100 bg-gray-50/50">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-gray-700 font-medium">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Two Column: Assumptions & Risks */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Assumptions & Constraints */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Assumptions
                      </h4>
                      <ul className="space-y-2.5 text-xs text-gray-700">
                        {(b.assumptions || [
                          'Frontline employees possess smartphones capable of accessing the portal',
                          'Corporate financial APIs provide real-time transaction webhooks',
                          'Enterprise SSO is available for role-based authentication',
                        ]).map((a, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-3 border-t border-gray-100">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 block mb-2 font-bold">
                          Constraints
                        </span>
                        <ul className="space-y-1.5 text-xs text-gray-700">
                          {(b.constraints || [
                            'Must comply with corporate security guidelines and data retention protocols',
                            'Per-transaction processing overhead must remain within operational budgets',
                          ]).map((c, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Risks */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Risks
                      </h4>
                      <ul className="space-y-2.5 text-xs text-gray-700">
                        {(b.risks || [
                          'Change management resistance if frontline training is insufficient',
                          'Upstream legacy API rate-limits during peak reconciliation cycles',
                          'Edge cases in automated compliance scoring requiring manual triage',
                        ]).map((r, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Security & Compliance */}
                  <div className="bg-white border border-gray-200 p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Security &amp; Compliance
                      </h4>
                      <ShieldCheck size={18} className="text-emerald-500" />
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {b.securityCompliance || 'Standard GDPR, Role-Based Access Control (RBAC), and Enterprise Security guidelines apply. All data encrypted in transit and at rest with AES-256.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 1.2 SOLUTION PLANNED SUBTAB */}
            {activeProblemSolutionSubTab === 'solution_planned' && (
              <div className="space-y-10 animate-fade-in">
                {/* Hero: Single Recommended Solution */}
                <div className="bg-white border border-gray-200 p-8 space-y-6 shadow-xs">
                  {/* Top row */}
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
                    <div className="space-y-3 flex-1 xl:max-w-[60%]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 bg-amber-500 flex items-center justify-center shrink-0">
                          <Sparkles className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-500">
                          AI-RECOMMENDED SOLUTION
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-medium uppercase tracking-wider text-gray-900 leading-tight">
                        {b.solutionName || name}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed italic">
                        {b.solutionTagline || 'Eliminating manual audits through AI-driven policy enforcement and seamless workflow automation.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-medium uppercase tracking-wider xl:max-w-[40%] xl:justify-end">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200">
                        {b.domain || 'FINTECH / CORPORATE OPERATIONS'}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 border border-gray-200">
                        Complexity: {b.complexity || 'Medium'}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 border border-gray-200">
                        AI: {b.aiLevel || 'Basic'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-amber-400 pl-4">
                    {b.solutionDesc || b.solution}
                  </p>

                  {/* Why this solution (3 highlight cards) */}
                  {(b.solutionWhyThis || [
                    'Automates 90% of policy checks instantly at point of submission',
                    'Reduces approval lag from weeks to hours with smart mobile routing',
                    'Provides CFOs with real-time spend analytics and spend anomaly alerts',
                  ]).length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(b.solutionWhyThis || [
                        'Automates 90% of policy checks instantly at point of submission',
                        'Reduces approval lag from weeks to hours with smart mobile routing',
                        'Provides CFOs with real-time spend analytics and spend anomaly alerts',
                      ]).slice(0, 3).map((reason, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-4 bg-amber-500/5 border border-amber-500/20">
                          <div className="w-4 h-4 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                          </div>
                          <span className="text-xs text-gray-700 leading-relaxed">{reason}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Benefits */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-3">Key Benefits</p>
                    <div className="flex flex-wrap gap-2">
                      {(b.solutionBenefits || [
                        'Zero-touch audit for compliant receipts',
                        'Instant mobile OCR capture & categorization',
                        'Automated policy rule enforcement',
                        'Seamless ERP export & audit trail',
                      ]).map((ben, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-xs text-gray-700">
                          <Check className="w-3 h-3 text-emerald-500" />
                          {ben}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-8">
                  {/* Two Column: Expected Business Outcomes & Business Capabilities Enabled */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Expected Business Outcomes */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Expected Business Outcomes
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {(b.solutionOutcomes || [
                          '90% reduction in audit cycle times',
                          '100% policy compliance visibility',
                          '$140k annual savings in admin labor',
                          'Sub-2 day reimbursement turnaround',
                        ]).map((out, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-3 border border-gray-100 bg-gray-50/50">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-gray-700 font-medium">{out}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Business Capabilities Enabled */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Business Capabilities Enabled
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(b.solutionCapabilities || [
                          'Multi-currency receipt OCR parsing',
                          'Rule-based & AI policy anomaly detection',
                          'Dynamic hierarchical manager approval chains',
                          'Real-time card feed reconciliation',
                        ]).map((cap, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Core Modules Included */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                      Core Modules Included
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(b.solutionModules || ['SUBMISSION WEB/MOBILE APP', 'POLICY ENGINE', 'FINANCE ANALYTICS HUB']).map((mod, i) => (
                        <div key={i} className="bg-white border border-gray-200 p-5 flex flex-col items-center justify-center text-center gap-2">
                          <div className="p-2.5 bg-gray-100 text-gray-700 rounded-full">
                            <Layers className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-medium uppercase tracking-wider text-gray-800">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two Column: AI Capabilities & Integrations */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* AI Capabilities */}
                    <div className="bg-white border border-gray-200 p-6 space-y-5">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        AI Capabilities
                      </h4>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {(b.solutionAiFeatures || ['RECEIPT-TO-POLICY MATCHING', 'DUPLICATE DETECTION', 'ANOMALY DETECTION FOR HIGH-VALUE CLAIMS']).map((feat, i) => (
                            <span key={i} className="px-2.5 py-1 bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[10px] font-medium uppercase tracking-wider">
                              {feat}
                            </span>
                          ))}
                        </div>
                        {/* Human Oversight Notice */}
                        <div className="border border-amber-500/20 bg-amber-500/5 p-4 flex gap-3 text-xs">
                          <Info className="w-4 h-4 text-amber-500 shrink-0" />
                          <div className="space-y-1">
                            <p className="font-medium text-amber-600 uppercase tracking-widest text-[10px]">Human Oversight</p>
                            <p className="text-gray-600 leading-relaxed">
                              AI provides recommendations and flags policy discrepancies. Final approvals are always authorized by human managers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Integrations & Connectors */}
                    <div className="bg-white border border-gray-200 p-6 space-y-4">
                      <h4 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                        Integrations &amp; Connectors
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {(b.solutionIntegrations || ['NetSuite ERP Connector', 'SAP General Ledger API', 'Visa & Mastercard Feeds', 'Workday HR Sync']).map((conn, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-3 border border-gray-100 bg-gray-50/50">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            <span className="text-xs text-gray-700 font-medium">{conn}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: TECHNICAL DOCUMENTATION                       */}
        {/* ---------------------------------------------------- */}
        {activeMainTab === 'technical_docs' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-tabs row */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
              {[
                { id: 'prd' as const, label: 'PRD (Product Requirements)' },
                { id: 'sad' as const, label: 'SAD (Architecture)' },
                { id: 'tdd' as const, label: 'TDD (Technical Design)' },
                { id: 'api_list' as const, label: 'API List' },
                { id: 'ddd' as const, label: 'DDD (Data Design)' },
                { id: 'tasks' as const, label: 'Task Breakdown' },
              ].map(tabItem => (
                <button
                  key={tabItem.id}
                  onClick={() => setActiveTechDoc(tabItem.id)}
                  className={cx(
                    'px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer transition-all',
                    activeTechDoc === tabItem.id
                      ? 'bg-black text-white shadow-md border border-black'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100 hover:border-stone-400 hover:text-stone-900'
                  )}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>

            {/* Document Content Display Card */}
            <div className="border border-stone-200 bg-white p-6 shadow-xl min-h-[500px]">
              {/* Task Breakdown View */}
              {activeTechDoc === 'tasks' ? (
                <div className="space-y-6">
                  {/* Summary Strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 shadow-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Status</span>
                      <span className="text-xs font-semibold text-emerald-600">Approved</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Epics</span>
                      <span className="text-xs font-semibold text-stone-900">{metrics[0]?.[1] || epicsData.length}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Features</span>
                      <span className="text-xs font-semibold text-stone-900">{metrics[1]?.[1] || 6}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Implementation Tasks</span>
                      <span className="text-xs font-semibold text-stone-700">{metrics[3]?.[1] || 17}</span>
                    </div>
                  </div>

                  {/* Epics Accordion */}
                  <div className="flex flex-col gap-4">
                    {epicsData.map((epic, eIdx) => (
                      <EpicAccordionItem key={epic.id || eIdx} epic={epic} index={eIdx + 1} />
                    ))}
                  </div>
                </div>
              ) : (
                /* PRD, SAD, TDD, API, DDD Markdown Views */
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-stone-900">
                        {activeTechDoc === 'prd' && 'Product Requirements Document (PRD)'}
                        {activeTechDoc === 'sad' && 'System Architecture Document (SAD)'}
                        {activeTechDoc === 'tdd' && 'Technical Design Document (TDD)'}
                        {activeTechDoc === 'api_list' && 'API Specification & Endpoints'}
                        {activeTechDoc === 'ddd' && 'Domain-Driven Design (DDD)'}
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Version: 1.0 | Status: Approved for Build | Roadmap: Solution Planner
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(currentDocContent, activeTechDoc.toUpperCase())}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 bg-stone-50 text-xs text-stone-700 hover:text-stone-900 transition-all cursor-pointer font-semibold"
                      >
                        {copiedSection === activeTechDoc.toUpperCase() ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Markdown</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          const u = URL.createObjectURL(new Blob([currentDocContent], { type: 'text/markdown' }));
                          const a = document.createElement('a');
                          a.href = u;
                          a.download = `${name}-${activeTechDoc}.md`;
                          a.click();
                          URL.revokeObjectURL(u);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 bg-stone-50 text-xs text-stone-700 hover:text-stone-900 transition-all cursor-pointer font-semibold"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Architecture Diagram Trigger for SAD */}
                  {activeTechDoc === 'sad' && (
                    <div
                      onClick={() => setZoomModalOpen(true)}
                      className="group relative my-4 rounded-xl border border-stone-200 bg-stone-950 p-6 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:border-emerald-500/50 transition-all text-white"
                    >
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 text-stone-200 border border-stone-700 text-[11px] font-bold shadow-md opacity-90 group-hover:opacity-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Maximize2 size={13} />
                        <span>Click to Zoom Architecture</span>
                      </div>
                      <div className="w-full py-4">
                        <ArchDiagram />
                      </div>
                    </div>
                  )}

                  <div className="prose max-w-none text-xs leading-relaxed font-sans text-stone-800">
                    <Markdown source={currentDocContent} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Zoom Architecture Modal Popup */}
      {zoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md select-none">
          <div className="absolute inset-0" onClick={() => setZoomModalOpen(false)} />
          <div className="relative z-10 flex flex-col w-full max-w-5xl h-[82vh] bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-stone-800 px-6 bg-stone-900/60">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Maximize2 size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Architecture Blueprint</h3>
                  <p className="text-[10px] text-stone-400 font-mono">Zoom Scale: {Math.round(zoomScale * 100)}%</p>
                </div>
              </div>

              {/* Toolbar Actions */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.5))}
                    title="Zoom Out (-)"
                    className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-stone-200 min-w-[45px] text-center">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 3.0))}
                    title="Zoom In (+)"
                    className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
                  >
                    <ZoomIn size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  title="Reset (100%)"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={() => setZoomModalOpen(false)}
                  title="Close Modal"
                  className="p-1.5 bg-stone-900 hover:bg-red-600 text-stone-400 hover:text-white border border-stone-800 rounded-lg transition-all ml-1 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body Canvas */}
            <div className="relative flex-1 overflow-auto p-8 flex items-center justify-center bg-stone-950/90">
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="w-full max-w-4xl"
              >
                <ArchDiagram large />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Epic & Feature Accordion Components for Task Breakdown ──────────────── */

function EpicAccordionItem({ epic, index }: { epic: any; index: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const features = epic.features || epic.tasks || [];

  return (
    <div className="border border-stone-200 rounded-xl bg-white overflow-hidden shadow-xs transition-all w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 border-b border-stone-200 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-black text-white text-[11px] font-bold">
            E{index}
          </span>
          <div>
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              {epic.title || epic.name || `Epic ${index}`}
              {epic.id && <span className="text-[10px] font-mono text-stone-400">({epic.id})</span>}
            </h4>
            {epic.description && (
              <p className="text-xs text-stone-500 mt-0.5 max-w-3xl line-clamp-1">
                {epic.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-200 text-stone-700">
            {Array.isArray(features) ? features.length : 0} Features
          </span>
          {isOpen ? <ChevronDown size={18} className="text-stone-400" /> : <ChevronRight size={18} className="text-stone-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 flex flex-col gap-4 bg-stone-50/40 w-full">
          {epic.description && (
            <p className="text-xs text-stone-600 bg-white p-3 rounded-lg border border-stone-200">
              {epic.description}
            </p>
          )}

          {Array.isArray(features) && features.map((feature: any, fIdx: number) => (
            <FeatureAccordionItem key={feature.id || fIdx} feature={feature} index={fIdx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureAccordionItem({ feature, index }: { feature: any; index: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const userStories = feature.stories || feature.userStories || [];
  const tasks = feature.tasks || [];

  return (
    <div className="border border-stone-200 rounded-lg bg-white overflow-hidden shadow-xs w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 bg-stone-100/70 hover:bg-stone-100 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            {feature.id || `F00${index}`}
          </span>
          <span className="text-xs font-bold text-stone-900">
            {feature.title || feature.name || `Feature ${index}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-stone-400">
            {userStories.length} Stories · {tasks.length} Tasks
          </span>
          {isOpen ? <ChevronDown size={15} className="text-stone-400" /> : <ChevronRight size={15} className="text-stone-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 flex flex-col gap-3 text-xs border-t border-stone-100 w-full">
          {feature.description && (
            <p className="text-stone-600 leading-relaxed font-sans">
              {feature.description}
            </p>
          )}

          {/* User Stories */}
          {Array.isArray(userStories) && userStories.length > 0 && (
            <div className="mt-1 space-y-2 w-full">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">User Stories</span>
              <div className="flex flex-col gap-2 w-full">
                {userStories.map((us: any, sIdx: number) => (
                  <div key={us.id || sIdx} className="p-2.5 rounded bg-stone-50 border border-stone-200 w-full">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-stone-500">{us.id || `US00${sIdx + 1}`}</span>
                      <span className="text-xs font-semibold text-stone-900">{us.title}</span>
                    </div>
                    {us.statement && (
                      <p className="text-[11px] text-stone-600 italic">&quot;{us.statement}&quot;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {Array.isArray(tasks) && tasks.length > 0 && (
            <div className="mt-2 space-y-2 w-full">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Implementation Tasks</span>
              <div className="flex flex-col gap-2 w-full">
                {tasks.map((task: any, tIdx: number) => (
                  <div key={task.id || tIdx} className="p-2.5 rounded bg-stone-50 border border-stone-200 w-full">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-stone-500">{task.id || `T00${tIdx + 1}`}</span>
                      <span className="text-xs font-semibold text-stone-900">{task.title}</span>
                      <span className="text-[10px] text-stone-400">{task.owner} · {task.hours}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Architecture Diagram Layer Component ────────────────────────────────── */

const ArchDiagram: React.FC<{ large?: boolean }> = ({ large }) => (
  <div className={cx('space-y-3 w-full', large && 'py-2')}>
    {plannerArchitectureLayers.map((layer, i) => (
      <div key={layer.name} className="relative">
        <div className="flex items-center gap-3">
          <div className={cx('w-32 shrink-0 text-right text-[12px] font-bold uppercase tracking-wider', ['text-blue-400', 'text-indigo-400', 'text-teal-400', 'text-amber-400'][i])}>
            {layer.name}
          </div>
          <div
            className={cx(
              'flex-1 grid gap-2.5 rounded-xl border p-3',
              ['bg-blue-950/30 border-blue-900/60', 'bg-indigo-950/30 border-indigo-900/60', 'bg-teal-950/30 border-teal-900/60', 'bg-amber-950/30 border-amber-900/60'][i]
            )}
            style={{ gridTemplateColumns: `repeat(${layer.items.length}, minmax(0, 1fr))` }}
          >
            {layer.items.map(it => (
              <div key={it} className="bg-stone-900 border border-stone-700/80 rounded-lg px-3 py-2.5 text-center text-[12px] font-semibold text-stone-100 shadow-sm">
                {it}
              </div>
            ))}
          </div>
        </div>
        {i < plannerArchitectureLayers.length - 1 && (
          <div className="ml-36 pl-3 text-stone-600 text-base leading-none py-0.5">↕</div>
        )}
      </div>
    ))}
  </div>
);
