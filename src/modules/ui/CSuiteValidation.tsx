import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { CSUITE_CONFIG, ROLE_LABELS, ValidationStatus } from './CSuiteConfig';

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const Modal = ({ title, onClose, children }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <h2 className="text-[18px] font-bold text-[#0F172A]">{title}</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      <div className="p-0 overflow-y-auto bg-slate-50">
        {children}
      </div>
    </div>
  </div>
);

export const CSuiteValidation: React.FC<{
  stageId: string;
  status: ValidationStatus;
  className?: string;
}> = ({ stageId, status, className }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const isPending = status === 'Pending';
  const isValidated = status === 'Validated';
  const isRevision = status === 'Needs Attention' || status === 'Failed';
  
  const config = CSUITE_CONFIG.find(c => c.stageId === stageId);
  if (!config) return null; // Don't show validation if no config exists for this stage

  return (
    <div className={cx("bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col shrink-0", 
      isValidated ? "border-emerald-200" : isRevision ? "border-amber-200" : "border-slate-200", 
      className
    )}>
      <div className={cx("p-4 border-b flex items-center gap-2", 
        isValidated ? "bg-emerald-50/50 border-emerald-100" : 
        isRevision ? "bg-amber-50/50 border-amber-100" : "bg-slate-50/50 border-slate-100"
      )}>
        {isValidated && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        {isRevision && <AlertTriangle className="w-5 h-5 text-amber-600" />}
        {isPending && <Info className="w-5 h-5 text-blue-500" />}
        <h3 className="text-[15px] font-bold text-[#0F172A]">C-Suite Validation</h3>
      </div>
      
      <div className="p-4 space-y-3">
        {config.reviews.map(review => (
          <div key={review.role} className="flex items-center gap-2.5">
            <div className={cx("w-4 h-4 rounded-full flex items-center justify-center border shrink-0",
              isValidated ? "bg-emerald-500 border-emerald-600 text-white" : 
              "border-slate-300 bg-slate-50"
            )}>
              {isValidated && <CheckCircle2 className="w-3 h-3" />}
            </div>
            <span className={cx("text-[13.5px] font-medium", isValidated ? "text-[#0F172A]" : "text-slate-500")}>
              {ROLE_LABELS[review.role]}
            </span>
          </div>
        ))}
        <button 
          onClick={() => setShowDetails(true)}
          className="text-[12px] font-bold text-blue-600 hover:underline pt-1 flex items-center gap-1"
        >
          View details
        </button>
      </div>

      <div className={cx("px-4 py-3 border-t text-[13px] font-bold uppercase tracking-wider flex items-center justify-between",
        isValidated ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
        isRevision ? "bg-amber-50 text-amber-700 border-amber-100" : 
        "bg-slate-50 text-blue-600 border-slate-100"
      )}>
        <span>Status</span>
        <span>{status}</span>
      </div>
      
      {showDetails && (
        <Modal title="C-Suite Review Details" onClose={() => setShowDetails(false)}>
          <div className="p-5 space-y-6 bg-white">
            {config.reviews.map(review => (
              <div key={review.role} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    {isValidated ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-500" />
                    )}
                    <h3 className="text-[14.5px] font-bold text-[#0F172A]">{ROLE_LABELS[review.role]}</h3>
                  </div>
                  <span className={cx("text-[11.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                    isValidated ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                  )}>
                    {status}
                  </span>
                </div>
                <div className="p-4 space-y-4 bg-white">
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reviewed</h4>
                    <p className="text-[13.5px] text-slate-700 leading-snug">{review.reviewed}</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Validation</h4>
                    <p className="text-[13.5px] text-slate-700 leading-snug">
                      {isValidated ? review.validation : `Awaiting final review from ${ROLE_LABELS[review.role]}. They will evaluate the strategic alignment and provide feedback once complete.`}
                    </p>
                  </div>
                  {isValidated && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Findings</h4>
                        <p className="text-[13.5px] text-slate-700 leading-snug">{review.findings}</p>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risk</h4>
                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[12px] font-medium">{review.risk || 'Low'}</span>
                      </div>
                    </div>
                  )}
                  {isValidated && (
                    <div className="pt-2 border-t border-slate-100">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Decision</h4>
                      <p className="text-[13.5px] font-medium text-emerald-700">Validated for next stage.</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border-t border-slate-200 p-5">
            <h3 className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider mb-4">Validation Summary</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-[20px] font-bold text-[#0F172A]">{config.reviews.length}</span>
                <span className="block text-[11px] font-medium text-slate-500 uppercase">Executives</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className={cx("block text-[20px] font-bold", isValidated ? "text-emerald-600" : "text-slate-400")}>{isValidated ? config.reviews.length : 0}</span>
                <span className="block text-[11px] font-medium text-slate-500 uppercase">Validated</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-[20px] font-bold text-amber-500">{isRevision ? 1 : 0}</span>
                <span className="block text-[11px] font-medium text-slate-500 uppercase">Needs Attn</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
                <span className="block text-[20px] font-bold text-red-500">0</span>
                <span className="block text-[11px] font-medium text-slate-500 uppercase">Failed</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[12.5px] font-bold text-slate-500 uppercase">Overall Status</span>
              <span className={cx("text-[13px] font-bold uppercase", isValidated ? "text-emerald-600" : "text-blue-600")}>
                {isValidated ? '✓ C-Suite Validated' : 'Pending Review'}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const CSuiteGate: React.FC<{
  validated: boolean;
  className?: string;
}> = ({ validated, className }) => {
  return (
    <div className={cx("bg-white border rounded-xl overflow-hidden shadow-sm shrink-0", 
      validated ? "border-emerald-200" : "border-slate-200", 
      className
    )}>
      <div className={cx("p-5 border-b", validated ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50/50 border-slate-100")}>
        <h3 className="text-[16px] font-bold text-[#0F172A]">CEO Stage Gate Approval</h3>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-[14px] text-slate-600 leading-relaxed">
          {validated ? 
            "All required C-Suite validations have been completed. The proposed requirements and planning have been reviewed against business and technical strategy. No blocking validation issues remain." : 
            "This stage requires C-Suite validation before it can be submitted for final CEO stage gate approval. Complete the requirements above."}
        </p>
        <div className="space-y-2">
          {[
            'C-Suite Execs Validated',
            'Business Alignment Approved',
            'Strategic Fit Approved'
          ].map(req => (
            <div key={req} className="flex items-center gap-3">
              <div className={cx("w-5 h-5 rounded-full flex items-center justify-center border",
                validated ? "bg-emerald-500 border-emerald-600 text-white" : "border-slate-300 bg-slate-50"
              )}>
                {validated && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <span className={cx("text-[14.5px] font-medium", validated ? "text-[#0F172A]" : "text-slate-500")}>
                {req}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("px-5 py-4 border-t text-[14px] font-bold flex items-center justify-between",
        validated ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500"
      )}>
        <span>CEO Gate Status</span>
        <span>{validated ? 'Approved' : 'Locked'}</span>
      </div>
    </div>
  );
};
