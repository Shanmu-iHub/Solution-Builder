import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  GitCompare,
  TrendingUp,
  Award
} from 'lucide-react';

export const ReviewStage: React.FC = () => {
  const auditChecks = [
    { title: 'Requirement & Scope Consistency', desc: 'Zero unmapped requirements between PRD and BRD.', passed: true },
    { title: 'Technical & Architecture Alignment', desc: 'All functional capabilities implemented in SRS and API contracts.', passed: true },
    { title: 'Security & Compliance Verification', desc: 'PII encryption and SOC2 controls verified in security architecture.', passed: true },
    { title: 'Financial Feasibility & Payback Integrity', desc: 'Cost savings calculations corroborated by business baseline.', passed: true },
    { title: 'Data Lineage & Audit Trail Completeness', desc: 'Full lifecycle audit trail captured in relational schemas.', passed: true },
    { title: 'Cross-Document Conflict Check', desc: 'No conflicting definitions across all 6 core deliverables.', passed: true }
  ];

  return (
    <div className="space-y-6">
      
      {/* CEO Review Banner */}
      <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Master Agent / CEO Review Coordination</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">
          Comprehensive Solution Coherence Audit
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The CEO / Master Agent coordinates final cross-functional review across all required executive perspectives to guarantee requirement traceability, financial viability, and architectural soundness prior to delivery handoff.
        </p>
      </div>

      {/* 6 Automated Audit Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
        {auditChecks.map((check, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Audit Check 0{idx + 1}
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Passed
              </span>
            </div>
            <strong className="text-slate-900 block font-semibold">{check.title}</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">{check.desc}</p>
          </div>
        ))}
      </div>

      {/* Final Consensus Summary */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          <span>
            <strong>Traceability Score: 100%</strong> — All requirements, architectural components, and business goals are linked end-to-end.
          </span>
        </div>
        <span className="text-emerald-700 font-bold text-xs">Zero Blocking Conflicts</span>
      </div>
    </div>
  );
};
