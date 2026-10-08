import React, { useEffect, useState } from 'react';
import { Check, X, Lock } from 'lucide-react';
import { CSuiteMemberReview, CSuiteRole, CSUITE_ROLES_META } from './csuiteData';
import { PLANNING_STAGES, PLANNING_STAGE_BY_ID, PlanningStageId } from '../map/planningMap';
import { avgScore } from './planningExecutives';
import { cx, useToast } from '../../ui';

interface Props {
  open: boolean;
  onClose: () => void;
  projectName: string;
  reviews: Record<PlanningStageId, CSuiteMemberReview[]>;
  onChange: (stage: PlanningStageId, reviews: CSuiteMemberReview[]) => void;
  initialStage: PlanningStageId;
  statusOf: (stageId: PlanningStageId) => string;
}

/** Risk is the only thing colored here, because it is the thing a reviewer must notice. */
const RISK_STYLE = { Low: 'text-slate-600 border-slate-200 bg-slate-50', Medium: 'text-amber-700 border-amber-200 bg-amber-50', High: 'text-rose-700 border-rose-200 bg-rose-50' };
const RISK_BADGE = { Low: 'bg-emerald-100 text-emerald-700 border-emerald-200', Medium: 'bg-amber-100 text-amber-700 border-amber-200', High: 'bg-rose-100 text-rose-700 border-rose-200' };

const SCORE_LABEL = (s: number) => s < 70 ? 'NEEDS REVISION' : s < 85 ? 'ADEQUATE' : 'ENTERPRISE READY';

export const PlanningExecutivePanel: React.FC<Props> = ({ open, onClose, projectName, reviews, onChange, initialStage, statusOf }) => {
  const { toast } = useToast();
  const [stage, setStage] = useState<PlanningStageId>(initialStage);
  const [selected, setSelected] = useState<CSuiteRole | null>(null);
  const [editScore, setEditScore] = useState<number | null>(null);
  // open on the stage the user is currently in, every time the panel is opened
  useEffect(() => { if (open) { setStage(initialStage); setSelected(null); setEditScore(null); } }, [open, initialStage]);

  const list = reviews[stage] || [];
  const detail = list.find(r => r.role === selected) ?? null;

  // When opening a detail popup, sync the editable score
  useEffect(() => { if (detail) setEditScore(detail.score); }, [selected, stage]);

  if (!open) return null;

  const cfg = PLANNING_STAGE_BY_ID[stage];
  const validated = list.filter(r => r.status === 'Validated').length;
  const stageAvg = avgScore(list);
  const overall = avgScore(Object.values(reviews).flat());
  const meta = detail ? CSUITE_ROLES_META[detail.role] : null;

  const toggle = (role: CSuiteRole) => {
    const next = list.map(r => (r.role === role ? { ...r, status: r.status === 'Validated' ? ('Pending' as const) : ('Validated' as const) } : r));
    onChange(stage, next);
    toast({ title: `${role} review updated`, description: `Marked ${next.find(r => r.role === role)?.status} for ${cfg?.title || stage}.` });
  };

  const approveGate = () => {
    onChange(stage, list.map(r => ({ ...r, status: 'Validated' as const })));
    toast({ title: `Stage gate passed: ${cfg?.title || stage}`, description: `All ${list.length} executives validated this stage (average ${stageAvg}/100).` });
  };

  const handleSaveClose = () => {
    if (detail && editScore !== null && editScore !== detail.score) {
      const next = list.map(r => (r.role === detail.role ? { ...r, score: editScore } : r));
      onChange(stage, next);
      toast({ title: `${detail.role} score updated`, description: `Score set to ${editScore}/100 for ${cfg?.title || stage}.` });
    }
    setSelected(null);
  };

  if (!cfg) return null;

  // Collect this executive's scores across all stages
  const crossStageScores = detail
    ? PLANNING_STAGES.map(st => {
        const r = reviews[st.id]?.find(rev => rev.role === detail.role);
        return { id: st.id, num: st.num, score: r?.score ?? 0 };
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div>
            <p className="text-[12.5px] text-slate-500">{projectName} · Solution Planning</p>
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

        <div className="px-6 border-b border-slate-200 flex items-center gap-6 overflow-x-auto shrink-0">
          {PLANNING_STAGES.map(st => {
            const rs = reviews[st.id];
            const all = rs.every(r => r.status === 'Validated');
            const isActive = st.id === stage;
            const isLocked = statusOf(st.id) === 'locked';
            return (
              <button 
                key={st.id} 
                onClick={() => { if (!isLocked) { setStage(st.id); setSelected(null); } }} 
                className={cx('flex items-center gap-1.5 py-3 text-[13.5px] whitespace-nowrap border-b-2 -mb-px transition-colors', 
                  isLocked ? 'cursor-not-allowed opacity-50 border-transparent text-slate-400' :
                  isActive ? 'border-[#0F172A] text-[#0F172A] font-semibold cursor-pointer' : 'border-transparent text-slate-500 hover:text-slate-800 cursor-pointer')}
              >
                {isLocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                {st.shortTitle}
                {!isLocked && all && <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0F172A]">{cfg.title}</h3>
            <p className="text-[13px] text-slate-500 mt-0.5">{list.length} executives review this stage · {validated} validated · average {stageAvg} / 100</p>
          </div>
          <button onClick={approveGate} disabled={validated === list.length} className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-lg text-[13px] font-medium transition-colors cursor-pointer">
            {validated === list.length ? 'Gate approved' : 'Approve stage gate'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60 min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {list.map(r => {
              const isSel = selected === r.role;
              return (
                <button key={r.role} type="button" onClick={() => setSelected(r.role)} className={cx('text-left bg-white rounded-lg border p-4 transition-colors cursor-pointer flex flex-col', isSel ? 'border-[#2563EB]' : 'border-slate-200 hover:border-slate-300')}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-slate-500">{r.role}</span>
                    <span className={cx('text-[12px]', r.status === 'Validated' ? 'text-emerald-700' : 'text-slate-400')}>{r.status}</span>
                  </div>
                  <p className="text-[14.5px] font-semibold text-[#0F172A] mt-1">{r.title}</p>
                  <p className="text-[12.5px] text-slate-500 mt-1 line-clamp-2">{r.reviewed}</p>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className={cx('text-[12px] px-2 py-0.5 rounded-md border', RISK_STYLE[r.risk])}>{r.risk} risk</span>
                    <span className="text-lg font-semibold text-[#0F172A] tabular-nums">{r.score}<span className="text-xs font-normal text-slate-400"> / 100</span></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Executive Detail Popup (matches reference design) ─── */}
        {detail && meta && editScore !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setSelected(null)}>
            <div className="bg-white w-full max-w-[580px] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>

              {/* ── Header: Badge + Title + Close ── */}
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
                      Phase {cfg.num}: {cfg.title}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Close detail" className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer mt-0.5"><X className="w-5 h-5" /></button>
              </div>

              {/* ── Scrollable Body ── */}
              <div className="max-h-[65vh] overflow-y-auto">
                <div className="px-6 py-5 space-y-5">

                  {/* Role Mandate */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5">
                    <p className="text-[13.5px] text-slate-700 leading-relaxed">
                      <span className="font-semibold text-[#0F172A]">Role Mandate: </span>{meta.description}
                    </p>
                  </div>

                  {/* Scope & Focus Evaluated */}
                  <div>
                    <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Scope & Focus Evaluated</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5">
                      <p className="text-[14px] text-[#0F172A] leading-relaxed">{detail.reviewed}</p>
                    </div>
                  </div>

                  {/* Executive Findings & Strategic Critique */}
                  <div>
                    <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-2">Executive Findings & Strategic Critique</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5">
                      <p className="text-[14px] text-slate-700 leading-relaxed">{detail.findings}</p>
                    </div>
                  </div>

                  {/* Criteria Checkpoints Analyzed */}
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

                  {/* Update Score */}
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

                  {/* Score Across All Phases */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2.5">{detail.role} Score Across All {PLANNING_STAGES.length} Phases (First to Last)</p>
                    <div className="flex gap-2 flex-wrap">
                      {crossStageScores.map(ps => {
                        const isCurrent = ps.id === stage;
                        return (
                          <button
                            key={ps.id}
                            onClick={() => { setStage(ps.id); }}
                            className={cx(
                              'flex flex-col items-center px-3 py-2 rounded-xl border text-center transition-colors cursor-pointer min-w-[52px]',
                              isCurrent
                                ? 'bg-[#1E293B] border-[#1E293B] text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            )}
                          >
                            <span className={cx('text-[10px] font-bold tracking-wide', isCurrent ? 'text-slate-300' : 'text-slate-400')}>P{ps.num}</span>
                            <span className={cx('text-[15px] font-bold tabular-nums', isCurrent ? 'text-white' : 'text-[#0F172A]')}>{ps.score}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom: Risk + Validate */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[13px] text-slate-600 font-medium">Assessed Risk:</span>
                      <span className={cx('text-[12px] font-semibold px-3 py-1 rounded-lg border', RISK_BADGE[detail.risk])}>{detail.risk} Risk</span>
                    </div>
                    <button
                      onClick={() => toggle(detail.role)}
                      className={cx(
                        'flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold border transition-colors cursor-pointer',
                        detail.status === 'Validated'
                          ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      {detail.status === 'Validated' && <Check className="w-4 h-4" strokeWidth={3} />}
                      {detail.status === 'Validated' ? `Validated by ${detail.role}` : `Mark Validated`}
                    </button>
                  </div>
                </div>

                {/* Save & Close */}
                <div className="px-6 pb-5 pt-1 flex justify-end">
                  <button
                    onClick={handleSaveClose}
                    className="px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
                  >
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
