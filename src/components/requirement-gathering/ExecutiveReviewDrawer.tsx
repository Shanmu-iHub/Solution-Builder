import React from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight,
  Check,
  AlertCircle
} from 'lucide-react';
import { ExecutiveReview } from '../../services/csuite/types';

interface ExecutiveReviewDrawerProps {
  review: ExecutiveReview | null;
  isOpen: boolean;
  onClose: () => void;
  onResolveIssue?: (findingId: string) => void;
}

export const ExecutiveReviewDrawer: React.FC<ExecutiveReviewDrawerProps> = ({
  review,
  isOpen,
  onClose,
  onResolveIssue
}) => {
  if (!isOpen || !review) return null;

  const isApproved = review.decision === 'VALIDATED';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col transform transition-transform ease-in-out duration-300">
          
          {/* Drawer Top Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {review.executiveId}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{review.executiveName}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold border bg-slate-100 text-slate-700 border-slate-200">
                    {review.executiveId}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{review.role}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs custom-scrollbar">
            
            {/* Decision Status Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isApproved
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/80 border-rose-200 text-rose-900'
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold">
                    Decision: {isApproved ? 'Validated & Approved' : 'Needs Changes'}
                  </strong>
                  <span className="text-[11px] opacity-75">
                    {new Date(review.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed opacity-90">{review.feedback}</p>
              </div>
            </div>

            {/* Validation Scope */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Validation Scope
              </h4>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 leading-relaxed">
                {review.validationScope}
              </div>
            </div>

            {/* Reviewed Inputs & Documents */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Inputs Reviewed
              </h4>
              <div className="space-y-1.5">
                {review.reviewedInputs.map((input, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80 text-slate-700"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium flex-1 truncate">{input}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {review.traceability.documentVersion}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checks Performed */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Checks Performed ({review.checks.filter((c) => c.passed).length}/{review.checks.length})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden bg-white">
                {review.checks.map((check) => (
                  <div key={check.id} className="p-3 flex items-start gap-2.5">
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className={`font-semibold ${check.passed ? 'text-slate-800' : 'text-rose-900'}`}>
                        {check.label}
                      </span>
                      {check.message && (
                        <p className="text-slate-500 text-[11px] mt-0.5">{check.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings & Action Items */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Findings ({review.findings.length})
              </h4>
              <div className="space-y-2.5">
                {review.findings.map((finding) => (
                  <div
                    key={finding.id}
                    className={`p-3.5 rounded-xl border ${
                      finding.blocking
                        ? 'bg-rose-50/40 border-rose-200/80'
                        : 'bg-slate-50/50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                            finding.severity === 'high'
                              ? 'bg-rose-600 text-white'
                              : finding.severity === 'medium'
                              ? 'bg-amber-500 text-white'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {finding.severity}
                        </span>
                        {finding.blocking && (
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-xs">
                            Blocking Issue
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-semibold text-slate-900 mb-1">{finding.title}</p>
                    <p className="text-slate-600 leading-relaxed mb-2">{finding.description}</p>
                    {finding.suggestion && (
                      <div className="p-2.5 rounded-lg bg-white/80 border border-slate-200/60 text-slate-700 text-[11px]">
                        <strong className="text-slate-900 block mb-0.5">Recommended Resolution:</strong>
                        {finding.suggestion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence References */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Evidence Cited
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                {review.evidence.map((ev, i) => (
                  <li key={i} className="text-xs leading-relaxed">
                    {ev}
                  </li>
                ))}
              </ul>
            </div>

            {/* Traceability Metadata */}
            <div className="p-3.5 rounded-xl bg-slate-100/60 border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700 mb-1">Document Traceability</div>
              <div className="flex justify-between">
                <span>Document ID:</span>
                <span className="font-mono text-slate-800">{review.traceability.documentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="font-mono text-slate-800">{review.traceability.documentVersion}</span>
              </div>
              <div className="flex justify-between">
                <span>Stage ID:</span>
                <span className="font-mono text-slate-800">{review.traceability.stageId}</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span className="text-slate-700">{new Date(review.timestamp).toISOString()}</span>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Evaluated by {review.executiveName}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Close Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
