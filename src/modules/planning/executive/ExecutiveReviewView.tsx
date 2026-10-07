import React from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, 
  BarChart3, FileCheck, Layers, ChevronRight, Eye
} from 'lucide-react';
import { usePlanning } from '../PlanningStore';
import { DiscoveryPage } from '../types';
import { calculateReadinessMetrics, getDefaultDecisions, PHASE_CONFIGS, getPhaseInfo } from '../map/mapData';
import { cx, Button, useToast } from '../../ui';

interface Props {
  projectId: string;
  projectName: string;
  onSelectPhase: (phase: DiscoveryPage) => void;
  onOpenDecisionCenter: () => void;
  onSwitchPerspective: (p: 'team' | 'executive') => void;
}

export const ExecutiveReviewView: React.FC<Props> = ({
  projectId,
  projectName,
  onSelectPhase,
  onOpenDecisionCenter,
  onSwitchPerspective
}) => {
  const { state, patch } = usePlanning();
  const { toast } = useToast();
  const s = state(projectId);
  const metrics = calculateReadinessMetrics(s);
  const decisions = s.executiveDecisions || getDefaultDecisions(projectName);
  const pendingCount = decisions.filter(d => d.status === 'pending').length;

  const handleApproveCheckpoint = (phaseId: DiscoveryPage, title: string) => {
    // Mark corresponding confirmation
    const update: any = {};
    if (phaseId === 'idea') update.briefConfirmed = true;
    if (phaseId === 'opportunity') update.oppCompleted = true;
    if (phaseId === 'solution') update.solutionConfirmed = true;
    if (phaseId === 'business_model') update.businessModelConfirmed = true;
    if (phaseId === 'product_definition') update.productDefinitionConfirmed = true;
    if (phaseId === 'requirements') update.requirementsConfirmed = true;
    if (phaseId === 'documentation') update.documentsConfirmed = true;

    patch(projectId, update);
    toast({
      title: 'Executive Checkpoint Approved',
      description: `Checkpoint for "${title}" has been signed off.`
    });
  };

  const checkpoints: {
    phaseId: DiscoveryPage;
    gateNumber: string;
    question: string;
    statement: string;
    evidence: string;
    risk: 'low' | 'medium' | 'high';
    confidence: number;
    approved: boolean;
  }[] = [
    {
      phaseId: 'idea',
      gateNumber: '01',
      question: 'Strategic Intent & Alignment',
      statement: s.vision?.text || `Unified service platform for ${projectName} eliminating manual hand-offs and speeding case resolution.`,
      evidence: 'Aligned with Q3 automation directive',
      risk: 'low',
      confidence: 92,
      approved: !!s.briefConfirmed
    },
    {
      phaseId: 'opportunity',
      gateNumber: '02',
      question: 'Market Sizing & Commercial Viability',
      statement: typeof s.marketBrief === 'string' ? s.marketBrief : 'Mobile-first expense capture targeting 25-40% reduction in average handling time.',
      evidence: '6 market benchmarks & competitive reports',
      risk: 'low',
      confidence: 88,
      approved: !!s.oppCompleted
    },
    {
      phaseId: 'problem',
      gateNumber: '03',
      question: 'Is this a validated problem worth solving?',
      statement: s.statements?.[0]?.statement || 'Field sales reps lose paper receipts and wait weeks for reimbursement due to manual email approvals.',
      evidence: '8 verified sources (12,400 tickets & CX survey)',
      risk: 'medium',
      confidence: 86,
      approved: !!s.decision
    },
    {
      phaseId: 'solution',
      gateNumber: '04',
      question: 'Solution Architecture Feasibility',
      statement: 'Smart extraction with human exception triage and ERP/CRM integration layer.',
      evidence: 'Validated architectural proof-of-concept',
      risk: 'low',
      confidence: 84,
      approved: !!s.solutionConfirmed
    },
    {
      phaseId: 'business_model',
      gateNumber: '05',
      question: 'Economic Payback & ROI',
      statement: 'Projected $120,000 annual operational savings with full payback in 4.5 months.',
      evidence: 'Calculated from finance and headcount models',
      risk: 'low',
      confidence: 85,
      approved: !!s.businessModelConfirmed
    },
    {
      phaseId: 'product_definition',
      gateNumber: '06',
      question: 'MVP Scope & Delivery Boundary',
      statement: 'Phase 1 locked to field sales capture and manager one-click approval workflows.',
      evidence: 'Sign-off from Sales Ops and CX Leads',
      risk: 'medium',
      confidence: 82,
      approved: !!s.productDefinitionConfirmed
    },
    {
      phaseId: 'requirements',
      gateNumber: '07',
      question: 'Functional & Compliance Integrity',
      statement: '14 functional requirements and SOC2/GDPR compliance baseline established.',
      evidence: 'Reviewed against enterprise security guidelines',
      risk: 'low',
      confidence: 90,
      approved: !!s.requirementsConfirmed
    },
    {
      phaseId: 'documentation',
      gateNumber: '08',
      question: 'Final Blueprint & Implementation Sign-off',
      statement: 'Solution Architecture Document, PRD, and task roadmap packaged for engineering.',
      evidence: '12 technical artifacts compiled',
      risk: 'low',
      confidence: 95,
      approved: !!s.documentsConfirmed
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/70 p-6 lg:p-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-slate-50 text-slate-700 text-[11.5px] font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Executive Governance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[13px] font-semibold text-slate-500">{projectName}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Executive Review & Checkpoints
          </h1>
          <p className="text-[14.5px] text-slate-500 mt-1 max-w-2xl">
            Evaluate solution maturity, assess strategic risk, and issue governance sign-offs.
          </p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200">
            <button
              onClick={() => onSwitchPerspective('team')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Solution Team
            </button>
            <button
              onClick={() => onSwitchPerspective('executive')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-[#0F172A] shadow-xs cursor-pointer"
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
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-600 text-white text-[10.5px] font-extrabold">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Macro Readiness Dashboard */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Overall Requirement Readiness</h2>
            <p className="text-[13.5px] text-slate-500 mt-0.5">Composite confidence across business, problem, solution, and architecture specs</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-blue-600">{metrics.overall}%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target: 80%+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wider">Business Case</span>
              <span className="text-emerald-700">{metrics.businessCase}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${metrics.businessCase}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wider">Problem Confidence</span>
              <span className="text-blue-700">{metrics.problemConfidence}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.problemConfidence}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wider">Solution Readiness</span>
              <span className="text-slate-700">{metrics.solutionReadiness}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-slate-600 rounded-full" style={{ width: `${metrics.solutionReadiness}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wider">Architecture Spec</span>
              <span className="text-slate-700">{metrics.architectureReadiness}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-slate-600 rounded-full" style={{ width: `${metrics.architectureReadiness}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Executive Checkpoint Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Governance Checkpoints</h2>
            <p className="text-[13px] text-slate-500">8 key decision gates evaluated prior to implementation lock</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checkpoints.map(cp => {
            const config = PHASE_CONFIGS[cp.phaseId];
            return (
              <div 
                key={cp.phaseId}
                className={cx(
                  "bg-white rounded-xl border p-5 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs",
                  cp.approved ? "border-slate-200/90" : "border-slate-300"
                )}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px] font-black">
                        GATE {cp.gateNumber}
                      </span>
                      <span className="text-[12px] font-bold text-slate-500">
                        {config.shortTitle}
                      </span>
                    </div>

                    <span className={cx(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase",
                      cp.approved ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                    )}>
                      {cp.approved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                      {cp.approved ? 'Validated' : 'Pending Sign-Off'}
                    </span>
                  </div>

                  {/* Question & Statement */}
                  <h3 className="text-[15px] font-bold text-[#0F172A] mt-1">{cp.question}</h3>
                  <p className="text-[13px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {cp.statement}
                  </p>

                  {/* Supporting Evidence & Metrics */}
                  <div className="mt-3.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100/90 text-[12px] flex items-center justify-between text-slate-600">
                    <span className="truncate pr-2 font-medium">Evidence: <strong className="text-slate-800">{cp.evidence}</strong></span>
                    <span className="shrink-0 font-semibold">Confidence: <strong className="text-blue-600">{cp.confidence}%</strong></span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectPhase(cp.phaseId)}
                    className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details
                  </button>

                  {!cp.approved ? (
                    <button
                      onClick={() => handleApproveCheckpoint(cp.phaseId, cp.question)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sign Off Gate
                    </button>
                  ) : (
                    <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved by Authority
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
