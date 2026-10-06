import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Download,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  SendHorizontal,
  ExternalLink,
  Code2,
  ArrowRight
} from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';

export const HandoffStage: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [copiedExport, setCopiedExport] = useState(false);

  const readinessPillars = [
    {
      role: 'CEO',
      title: 'Executive Sign-off',
      status: 'Ready',
      detail: 'Strategic intent, financial ROI model, and business goals approved for delivery.'
    },
    {
      role: 'CTO',
      title: 'Technical Readiness',
      status: 'Ready',
      detail: 'Architecture specifications, API schemas, and SAP Concur adapter specifications ready for sprint planning.'
    },
    {
      role: 'CIO',
      title: 'Operational Delivery Readiness',
      status: 'Ready',
      detail: 'IT infrastructure support tiers, mobile MDM deployment, and user training curricula established.'
    }
  ];

  const handleCopyManifest = () => {
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Handoff Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
          <Rocket className="w-4 h-4" />
          <span>PHASE 10 COMPLETE · SOLUTION BUILDER HANDOFF</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight">
          Requirement Gathering Package Ready for Implementation
        </h3>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          The end-to-end requirement discovery journey is validated across all 10 phases. Full specifications, architecture models, and validation evidence are compiled into the engineering delivery package.
        </p>
        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyManifest}
            className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
          >
            {copiedExport ? '✓ Copied Handoff JSON' : 'Export Solution Package (JSON)'}
          </button>
        </div>
      </div>

      {/* 3 Executive Readiness Pillars */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-3">Executive Readiness Pillars</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {readinessPillars.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                  {p.role}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {p.status}
                </span>
              </div>
              <strong className="text-slate-900 text-sm block">{p.title}</strong>
              <p className="text-slate-600 text-xs leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Package Contents */}
      <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 text-xs">
        <h4 className="text-sm font-bold text-slate-900">Delivery Package Artifacts</h4>
        <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden bg-slate-50/50">
          <div className="p-3 flex justify-between items-center">
            <span className="font-medium text-slate-800">1. Product Requirements Document (PRD v1.0)</span>
            <span className="text-emerald-700 font-semibold text-[11px]">CPO Signed</span>
          </div>
          <div className="p-3 flex justify-between items-center">
            <span className="font-medium text-slate-800">2. Business Requirements Document (BRD v1.0)</span>
            <span className="text-emerald-700 font-semibold text-[11px]">CBO Signed</span>
          </div>
          <div className="p-3 flex justify-between items-center">
            <span className="font-medium text-slate-800">3. System Architecture Specification (SRS / SAD v1.0)</span>
            <span className="text-emerald-700 font-semibold text-[11px]">CTO Signed</span>
          </div>
          <div className="p-3 flex justify-between items-center">
            <span className="font-medium text-slate-800">4. Data Schema & Audit Logging Specification</span>
            <span className="text-emerald-700 font-semibold text-[11px]">CDO Signed</span>
          </div>
          <div className="p-3 flex justify-between items-center">
            <span className="font-medium text-slate-800">5. Security, RBAC & Compliance Framework Matrix</span>
            <span className="text-emerald-700 font-semibold text-[11px]">CISO Signed</span>
          </div>
          <div className="p-3 flex justify-between items-center">
            <span className="font-medium text-slate-800">6. IT Infrastructure & Operational Transition Plan</span>
            <span className="text-emerald-700 font-semibold text-[11px]">CIO Signed</span>
          </div>
        </div>
      </div>

      {/* Ready to Execute CTA matching Screenshot 1 */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            READY TO EXECUTE?
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Proceed to IDE & Application Builder
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mt-1 leading-relaxed">
            Launch the interactive solution builder environment to execute code generation, agent workflows, and live application rendering with full C-Suite validation gates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('solution-builder-ide')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 group"
        >
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span>BUILD SOLUTION IN IDE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
