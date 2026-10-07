import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { cx } from '../../ui';

interface OfficerReview {
  id: string;
  role: string;
  reviewed: string;
  validation: string;
  findings: string;
  risk: string;
  decision: string;
}

const OFFICER_REVIEWS: OfficerReview[] = [
  {
    id: 'cpo',
    role: 'Chief Product Officer (CPO)',
    reviewed: 'Product behavior, feature implementation, and UI/UX alignment.',
    validation: 'The build accurately reflects the approved product requirements.',
    findings: 'No blocking product issues.',
    risk: 'Low',
    decision: 'Validated for next stage.',
  },
  {
    id: 'cto',
    role: 'Chief Technology Officer (CTO)',
    reviewed: 'Technical integration, API endpoints, and system communication.',
    validation: 'Technical implementation is consistent with the architecture.',
    findings: 'Code quality and technical correctness are validated.',
    risk: 'Low',
    decision: 'Validated for next stage.',
  },
  {
    id: 'cdo',
    role: 'Chief Data Officer (CDO)',
    reviewed: 'Data schema, database modeling, migrations, and storage safety.',
    validation: 'MongoDB collections and relational schemas conform to architectural bounds.',
    findings: 'Data integrity and schema consistency verified.',
    risk: 'Low',
    decision: 'Validated for next stage.',
  },
  {
    id: 'ciso',
    role: 'Chief Information Security Officer (CISO)',
    reviewed: 'Security architecture, RBAC, session tokens, and threat vector audit.',
    validation: 'Security controls satisfy compliance and least-privilege standards.',
    findings: 'No critical vulnerabilities or secret leakage detected.',
    risk: 'Low',
    decision: 'Validated for next stage.',
  },
  {
    id: 'cio',
    role: 'Chief Information Officer (CIO)',
    reviewed: 'Operational readiness, cloud deployment, and system availability.',
    validation: 'Infrastructure pipelines and monitoring satisfy operational criteria.',
    findings: 'High availability and telemetry verified.',
    risk: 'Low',
    decision: 'Validated for next stage.',
  },
];

interface CSuiteValidationModalProps {
  open: boolean;
  onClose: () => void;
  projectName?: string;
}

export const CSuiteValidationModal: React.FC<CSuiteValidationModalProps> = ({ open, onClose }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs font-sans animate-fade-in">
      {/* Detail Deep-dive Modal (Screenshot 3) */}
      {detailsOpen ? (
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="text-[17px] font-bold text-slate-900">
              C-Suite Review Details
            </h3>
            <button
              onClick={() => setDetailsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Reviews List */}
          <div className="p-6 overflow-y-auto space-y-4">
            {OFFICER_REVIEWS.map(officer => (
              <div
                key={officer.id}
                className="rounded-2xl border border-emerald-100 bg-white p-4 space-y-3.5 shadow-2xs"
              >
                {/* Officer Card Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[14px] font-bold text-slate-900">
                      {officer.role}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                    VALIDATED
                  </span>
                </div>

                {/* REVIEWED */}
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    REVIEWED
                  </p>
                  <p className="text-[12.5px] text-slate-700 mt-0.5 leading-snug">
                    {officer.reviewed}
                  </p>
                </div>

                {/* VALIDATION */}
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    VALIDATION
                  </p>
                  <p className="text-[12.5px] text-slate-700 mt-0.5 leading-snug">
                    {officer.validation}
                  </p>
                </div>

                {/* FINDINGS & RISK */}
                <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                      FINDINGS
                    </p>
                    <p className="text-[12.5px] text-slate-700 mt-0.5 leading-snug">
                      {officer.findings}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      RISK
                    </p>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                      {officer.risk}
                    </span>
                  </div>
                </div>

                {/* DECISION */}
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    DECISION
                  </p>
                  <p className="text-[12.5px] font-semibold text-emerald-600 mt-0.5">
                    {officer.decision}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Summary Overview Modal (Screenshot 2) */
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="p-5 pb-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="text-[17px] font-bold text-slate-900">
                C-Suite Validation
              </h3>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Officers Checklist */}
          <div className="p-5 space-y-3.5">
            {OFFICER_REVIEWS.map(officer => (
              <div key={officer.id} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[13.5px] font-medium text-slate-800">
                  {officer.role}
                </span>
              </div>
            ))}

            <div className="pt-2">
              <button
                onClick={() => setDetailsOpen(true)}
                className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition"
              >
                View details
              </button>
            </div>
          </div>

          {/* Bottom STATUS Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-emerald-50/70 border-t border-emerald-100">
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-900">
              STATUS
            </span>
            <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700">
              VALIDATED
            </span>
          </div>
        </div>
      )}

      {/* Backdrop click to close */}
      <button
        onClick={onClose}
        className="fixed inset-0 -z-10 cursor-default focus:outline-none"
        aria-label="Close modal"
      />
    </div>
  );
};
