import React from 'react';
import { 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, Sparkles, 
  HelpCircle, ShieldCheck, ChevronRight, BarChart3, Layers, BookOpen
} from 'lucide-react';
import { usePlanning } from '../PlanningStore';
import { DiscoveryPage, PhaseStatus } from '../types';
import { MACRO_AREAS, PHASE_CONFIGS, getPhaseInfo, calculateReadinessMetrics, getDefaultDecisions } from './mapData';
import { cx, Button } from '../../ui';

interface Props {
  projectId: string;
  projectName: string;
  onSelectPhase: (phase: DiscoveryPage) => void;
  onOpenDecisionCenter: () => void;
  onSwitchPerspective: (p: 'team' | 'executive') => void;
}

export const SolutionDefinitionMap: React.FC<Props> = ({
  projectId,
  projectName,
  onSelectPhase,
  onOpenDecisionCenter,
  onSwitchPerspective
}) => {
  const { state } = usePlanning();
  const s = state(projectId);
  const metrics = calculateReadinessMetrics(s);
  const decisions = s.executiveDecisions || getDefaultDecisions(projectName);
  const pendingDecisions = decisions.filter(d => d.status === 'pending');

  const renderStatusBadge = (status: PhaseStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold tracking-wide uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Approved
          </span>
        );
      case 'ready_for_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 text-[11px] font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-slate-500" /> Ready for review
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> In progress
          </span>
        );
      case 'needs_attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-bold tracking-wide uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Decision Required
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-medium tracking-wide uppercase">
            <Clock className="w-3 h-3 text-slate-400" /> Not started
          </span>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/70 p-6 lg:p-8 space-y-8">
      {/* Top Banner / Solution Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[11.5px] font-bold uppercase tracking-wider">
              Solution Definition
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[13px] font-semibold text-slate-500">{projectName}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Requirement Map
          </h1>
          <p className="text-[14.5px] text-slate-500 mt-1 max-w-2xl">
            A progressive architecture workspace enriching the solution definition across 4 macro domains.
          </p>
        </div>

        {/* Global Controls & Overall Readiness */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200">
            <button
              onClick={() => onSwitchPerspective('team')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-[#0F172A] shadow-xs cursor-pointer"
            >
              Solution Team
            </button>
            <button
              onClick={() => onSwitchPerspective('executive')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Executive Review
            </button>
          </div>

          <button
            onClick={onOpenDecisionCenter}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-300/80 hover:bg-amber-500/15 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Decision Center</span>
            {pendingDecisions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-600 text-white text-[10.5px] font-extrabold">
                {pendingDecisions.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 4 Macro Areas Grid / Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {MACRO_AREAS.map(area => (
          <div key={area.id} className="flex flex-col space-y-4">
            {/* Macro Area Header */}
            <div className="px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <h2 className="text-[13px] font-black tracking-wider uppercase text-slate-800">
                  {area.label}
                </h2>
              </div>
              <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">{area.tagline}</p>
            </div>

            {/* Artifact Cards */}
            <div className="space-y-3.5">
              {area.phases.map(phaseId => {
                const config = PHASE_CONFIGS[phaseId];
                const info = getPhaseInfo(s, phaseId, projectName);
                const hasPendingDecision = decisions.some(d => d.phaseId === phaseId && d.status === 'pending');

                return (
                  <div
                    key={phaseId}
                    onClick={() => onSelectPhase(phaseId)}
                    className={cx(
                      "group bg-white rounded-xl border transition-all duration-200 p-4.5 cursor-pointer flex flex-col justify-between hover:shadow-md",
                      info.status === 'needs_attention' || hasPendingDecision
                        ? "border-amber-300 ring-2 ring-amber-100 bg-amber-50/20"
                        : info.status === 'approved'
                        ? "border-slate-200/90 hover:border-emerald-300"
                        : "border-slate-200/90 hover:border-blue-300"
                    )}
                  >
                    <div>
                      {/* Top Bar: Number & Status */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[12px] font-black font-mono text-slate-400 group-hover:text-blue-600 transition-colors">
                          {config.num}
                        </span>
                        {renderStatusBadge(hasPendingDecision ? 'needs_attention' : info.status)}
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-[15px] font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                        {config.title}
                      </h3>
                      <p className="text-[12.5px] font-medium text-slate-500 mt-0.5">
                        {config.tagline}
                      </p>

                      {/* Artifact Excerpt */}
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[12.5px] text-slate-700 leading-snug line-clamp-2">
                        {info.summaryText}
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11.5px]">
                      <div className="flex items-center gap-3 text-slate-500 font-semibold">
                        <span>Confidence: <strong className="text-slate-800">{info.confidence}%</strong></span>
                        <span>•</span>
                        <span>{info.evidenceSources} sources</span>
                      </div>

                      <span className="text-blue-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        {info.status === 'approved' ? 'Open' : info.status === 'needs_attention' ? 'Decide' : 'Work'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Intelligence Row: Project Health & Urgent Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Project Health Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Solution Definition Health
              </h3>
              <p className="text-[13px] text-slate-500">Maturity and confidence breakdown across core architectural facets</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-600">{metrics.overall}%</span>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Overall Readiness</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="flex justify-between text-[12.5px] font-semibold text-slate-700 mb-1">
                <span>Problem Confidence</span>
                <span className="text-blue-700 font-bold">{metrics.problemConfidence}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${metrics.problemConfidence}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12.5px] font-semibold text-slate-700 mb-1">
                <span>Business Case Maturity</span>
                <span className="text-emerald-700 font-bold">{metrics.businessCase}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-600 transition-all duration-500" style={{ width: `${metrics.businessCase}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12.5px] font-semibold text-slate-700 mb-1">
                <span>Solution Readiness</span>
                <span className="text-slate-700 font-bold">{metrics.solutionReadiness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-slate-600 transition-all duration-500" style={{ width: `${metrics.solutionReadiness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12.5px] font-semibold text-slate-700 mb-1">
                <span>Architecture Spec Readiness</span>
                <span className="text-slate-700 font-bold">{metrics.architectureReadiness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-slate-600 transition-all duration-500" style={{ width: `${metrics.architectureReadiness}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Decisions Requiring Attention Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] font-bold text-[#0F172A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Decisions Pending
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-extrabold uppercase">
                {pendingDecisions.length} Action{pendingDecisions.length === 1 ? '' : 's'}
              </span>
            </div>
            <p className="text-[12.5px] text-slate-500 mb-4">
              Decisions requiring human authority before finalizing implementation.
            </p>

            <div className="space-y-2.5">
              {decisions.slice(0, 2).map(dec => (
                <div key={dec.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <span className={cx(
                    "w-2 h-2 rounded-full mt-1.5 shrink-0",
                    dec.status === 'approved' ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                  )} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[#0F172A] truncate">{dec.title}</p>
                    <p className="text-[11.5px] text-slate-500 truncate mt-0.5">{dec.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenDecisionCenter}
            className="w-full mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Open Decision Center <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
