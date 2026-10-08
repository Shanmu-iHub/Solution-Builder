import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cx } from '../../ui';
import { CSUITE_ROLES_META, CSuiteRole } from '../../planning/executive/csuiteData';

interface Props {
  open: boolean;
  onClose: () => void;
  projectName: string;
}

// Initial default data for the Build Validation phase
const INITIAL_OFFICER_REVIEWS = [
  {
    role: 'CPO' as CSuiteRole,
    title: 'Chief Product Officer',
    reviewed: 'Product behavior, feature implementation, and UI/UX alignment.',
    findings: 'All user stories are implemented as per Figma design. No blocking product issues found in UAT.',
    criteria: ['UI/UX Fidelity', 'Feature completeness', 'User acceptance'],
    status: 'Validated' as 'Validated' | 'Pending',
    score: 95,
    risk: 'Low' as 'Low' | 'Medium' | 'High',
  },
  {
    role: 'CTO' as CSuiteRole,
    title: 'Chief Technology Officer',
    reviewed: 'Technical integration, API endpoints, and system communication.',
    findings: 'Architecture holds up under initial load testing. Technical debt is minimal.',
    criteria: ['API Contracts', 'Code Quality', 'Test Coverage'],
    status: 'Validated' as 'Validated' | 'Pending',
    score: 92,
    risk: 'Low' as 'Low' | 'Medium' | 'High',
  },
  {
    role: 'CDO' as CSuiteRole,
    title: 'Chief Data Officer',
    reviewed: 'Data schema, database modeling, migrations, and storage safety.',
    findings: 'Data integrity and schema consistency verified against original ERD.',
    criteria: ['Schema validation', 'Migration safety', 'Data retention'],
    status: 'Validated' as 'Validated' | 'Pending',
    score: 94,
    risk: 'Low' as 'Low' | 'Medium' | 'High',
  },
  {
    role: 'CISO' as CSuiteRole,
    title: 'Chief Information Security Officer',
    reviewed: 'Security architecture, RBAC, session tokens, and threat vector audit.',
    findings: 'No critical vulnerabilities or secret leakage detected in static analysis.',
    criteria: ['Auth/Authz', 'Secrets Management', 'Dependency Scan'],
    status: 'Validated' as 'Validated' | 'Pending',
    score: 96,
    risk: 'Low' as 'Low' | 'Medium' | 'High',
  },
  {
    role: 'CIO' as CSuiteRole,
    title: 'Chief Information Officer',
    reviewed: 'Operational readiness, cloud deployment, and system availability.',
    findings: 'Infrastructure pipelines and monitoring satisfy operational criteria.',
    criteria: ['CI/CD Pipeline', 'Observability', 'Uptime SLAs'],
    status: 'Validated' as 'Validated' | 'Pending',
    score: 91,
    risk: 'Low' as 'Low' | 'Medium' | 'High',
  },
];

const RISK_STYLE = { Low: 'text-slate-600 border-slate-200 bg-slate-50', Medium: 'text-amber-700 border-amber-200 bg-amber-50', High: 'text-rose-700 border-rose-200 bg-rose-50' };
const RISK_BADGE = { Low: 'bg-emerald-100 text-emerald-700 border-emerald-200', Medium: 'bg-amber-100 text-amber-700 border-amber-200', High: 'bg-rose-100 text-rose-700 border-rose-200' };

export const FactoryExecutivePanel: React.FC<Props> = ({ open, onClose, projectName }) => {
  const [reviews, setReviews] = useState(INITIAL_OFFICER_REVIEWS);
  const [selectedRole, setSelectedRole] = useState<CSuiteRole | null>(null);
  const [editScore, setEditScore] = useState<number | null>(null);

  if (!open) return null;

  const handleRoleSelect = (role: CSuiteRole, currentScore: number) => {
    setSelectedRole(role);
    setEditScore(currentScore);
  };

  const handleSaveClose = () => {
    if (selectedRole && editScore !== null) {
      setReviews(prev => prev.map(r => r.role === selectedRole ? { ...r, score: editScore } : r));
    }
    setSelectedRole(null);
    setEditScore(null);
  };

  const toggleStatus = (role: CSuiteRole) => {
    setReviews(prev => prev.map(r => r.role === role ? { ...r, status: r.status === 'Validated' ? 'Pending' : 'Validated' } : r));
  };

  const detail = reviews.find(r => r.role === selectedRole);
  const meta = detail ? CSUITE_ROLES_META[detail.role] : null;
  const overall = Math.round(reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length);
  const validatedCount = reviews.filter(r => r.status === 'Validated').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div>
            <p className="text-[12.5px] text-slate-500">{projectName} · Solution Factory</p>
            <h2 className="text-lg font-semibold text-[#0F172A] mt-0.5">Executive review</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[12px] text-slate-500">Overall readiness</p>
              <p className="text-xl font-semibold text-[#0F172A] tabular-nums leading-tight">{overall}<span className="text-sm font-normal text-slate-400"> / 100</span></p>
            </div>
            <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"><X className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Tab */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-6 overflow-x-auto shrink-0">
          <button className="flex items-center gap-1.5 py-3 text-[13.5px] whitespace-nowrap border-b-2 -mb-px transition-colors border-[#0F172A] text-[#0F172A] font-semibold cursor-pointer">
            Build Validation
            <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0F172A]">Build Validation</h3>
            <p className="text-[13px] text-slate-500 mt-0.5">{reviews.length} executives review this stage · {validatedCount} validated · average {overall} / 100</p>
          </div>
          <button disabled className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-[13px] font-medium transition-colors cursor-not-allowed opacity-80">
            Gate approved
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {reviews.map(r => {
              const isSel = selectedRole === r.role;
              return (
                <button key={r.role} type="button" onClick={() => handleRoleSelect(r.role, r.score)} className={cx('text-left bg-white rounded-lg border p-4 transition-colors cursor-pointer flex flex-col', isSel ? 'border-[#2563EB]' : 'border-slate-200 hover:border-slate-300')}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-slate-500">{r.role}</span>
                    <span className={cx('text-[12px]', r.status === 'Validated' ? 'text-emerald-700' : 'text-slate-400')}>{r.status}</span>
                  </div>
                  <p className="text-[14.5px] font-semibold text-[#0F172A] mt-1">{r.title}</p>
                  <p className="text-[12.5px] text-slate-500 mt-1 line-clamp-2">{r.reviewed}</p>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className={cx('text-[12px] px-2 py-0.5 rounded-md border', RISK_STYLE[r.risk])}>{r.risk} risk</span>
                    <span className="text-lg font-semibold text-[#0F172A] tabular-nums">{r.score}<span className="text-xs font-normal text-slate-400"> / 100</span></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Executive Detail Popup */}
        {detail && meta && editScore !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 animate-fade-in" onClick={handleSaveClose}>
            <div className="bg-white w-full max-w-[580px] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>

              {/* Popup Header */}
              <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold tracking-wide">{detail.role}</span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0F172A]">{meta.title}</h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">
                      <span className="text-blue-600 font-medium">{meta.category}</span>
                      <span className="mx-1.5">·</span>
                      Solution Factory Build
                    </p>
                  </div>
                </div>
                <button onClick={handleSaveClose} aria-label="Close detail" className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer mt-0.5"><X className="w-5 h-5" /></button>
              </div>

              {/* Popup Body */}
              <div className="max-h-[65vh] overflow-y-auto">
                <div className="px-6 py-5 space-y-5">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5">
                    <p className="text-[13.5px] text-slate-700 leading-relaxed">
                      <span className="font-semibold text-[#0F172A]">Role Mandate: </span>{meta.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Scope & Focus Evaluated</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5">
                      <p className="text-[14px] text-[#0F172A] leading-relaxed">{detail.reviewed}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Executive Findings & Strategic Critique</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5">
                      <p className="text-[14px] text-slate-700 leading-relaxed">{detail.findings}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Criteria Checkpoints Analyzed</p>
                    <div className="flex flex-wrap gap-2">
                      {detail.criteria.map(c => (
                        <span key={c} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[13px] text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-semibold text-[#0F172A]">Update {detail.role} Evaluation Score</p>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={editScore}
                          onChange={e => setEditScore(Math.max(0, Math.min(100, Number(e.target.value))))}
                          className="w-14 text-center text-[15px] font-semibold text-[#0F172A] border border-slate-300 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-slate-400 text-[14px]">/ 100</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={editScore}
                      onChange={e => setEditScore(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#2563EB]"
                      style={{ background: `linear-gradient(to right, #2563EB ${editScore}%, #e2e8f0 ${editScore}%)` }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className={cx('text-[10px] font-bold tracking-wide uppercase', editScore < 70 ? 'text-rose-600' : 'text-slate-400')}>Needs Revision (0–69)</span>
                      <span className={cx('text-[10px] font-bold tracking-wide uppercase', editScore >= 70 && editScore < 85 ? 'text-amber-600' : 'text-slate-400')}>Adequate (70–84)</span>
                      <span className={cx('text-[10px] font-bold tracking-wide uppercase', editScore >= 85 ? 'text-blue-600' : 'text-slate-400')}>Enterprise Ready (85–100)</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2.5">{detail.role} Score Across Factory Build</p>
                    <div className="flex gap-2 flex-wrap">
                      <button className="flex flex-col items-center px-3 py-2 rounded-xl border text-center transition-colors cursor-pointer min-w-[52px] bg-[#1E293B] border-[#1E293B] text-white">
                        <span className="text-[10px] font-bold tracking-wide text-slate-300">BLD</span>
                        <span className="text-[15px] font-bold tabular-nums text-white">{detail.score}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[13px] text-slate-600 font-medium">Assessed Risk:</span>
                      <span className={cx('text-[12px] font-semibold px-3 py-1 rounded-lg border', RISK_BADGE[detail.risk])}>{detail.risk} Risk</span>
                    </div>
                    <button
                      onClick={() => toggleStatus(detail.role)}
                      className={cx(
                        'flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold border transition-colors cursor-pointer',
                        detail.status === 'Validated' ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      {detail.status === 'Validated' && <Check className="w-4 h-4" strokeWidth={3} />}
                      {detail.status === 'Validated' ? `Validated by ${detail.role}` : `Mark Validated`}
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-1 flex justify-end">
                  <button onClick={handleSaveClose} className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl text-[13px] font-semibold transition-colors cursor-pointer shadow-sm">
                    Save & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
