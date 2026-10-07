import React, { useEffect, useState } from 'react';
import { AlertCircle, Check, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { CSuiteMemberReview, CSuiteRole, CSUITE_ROLES_META, getRoleTheme } from './csuiteData';
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
}

const RISK_STYLE = { Low: 'bg-emerald-50 text-emerald-700 border-emerald-200', Medium: 'bg-amber-50 text-amber-700 border-amber-200', High: 'bg-rose-50 text-rose-700 border-rose-200' };

export const PlanningExecutivePanel: React.FC<Props> = ({ open, onClose, projectName, reviews, onChange, initialStage }) => {
  const { toast } = useToast();
  const [stage, setStage] = useState<PlanningStageId>(initialStage);
  const [selected, setSelected] = useState<CSuiteRole | null>(null);
  // open on the stage the user is currently in, every time the panel is opened
  useEffect(() => { if (open) { setStage(initialStage); setSelected(null); } }, [open, initialStage]);
  if (!open) return null;

  const cfg = PLANNING_STAGE_BY_ID[stage];
  const list = reviews[stage];
  const validated = list.filter(r => r.status === 'Validated').length;
  const stageAvg = avgScore(list);
  const overall = avgScore(Object.values(reviews).flat());
  const detail = list.find(r => r.role === selected) ?? null;

  const toggle = (role: CSuiteRole) => {
    const next = list.map(r => (r.role === role ? { ...r, status: r.status === 'Validated' ? ('Pending' as const) : ('Validated' as const) } : r));
    onChange(stage, next);
    toast({ title: `${role} review updated`, description: `Marked ${next.find(r => r.role === role)?.status} for ${cfg.title}.` });
  };

  const approveGate = () => {
    onChange(stage, list.map(r => ({ ...r, status: 'Validated' as const })));
    toast({ title: `Stage gate passed: ${cfg.title}`, description: `All ${list.length} executives validated this stage (average ${stageAvg}/100).` });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="px-6 py-4 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-700/50">Governance Board</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-medium truncate max-w-[280px]">{projectName}</span>
              </div>
              <h2 className="text-lg font-bold tracking-tight mt-0.5">C-Suite Executive Validation — Solution Planning</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-1.5 rounded-xl flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Planning readiness</div>
                <div className="text-xs text-slate-300 font-medium">{validated}/{list.length} validated in stage</div>
              </div>
              <div className="flex items-baseline gap-0.5"><span className="text-2xl font-black text-amber-400">{overall}</span><span className="text-xs text-slate-400 font-semibold">/100</span></div>
            </div>
            <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="px-6 py-2.5 border-b border-slate-200 bg-slate-50/90 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {PLANNING_STAGES.map((st, idx) => {
            const rs = reviews[st.id];
            const all = rs.every(r => r.status === 'Validated');
            const isActive = st.id === stage;
            return (
              <button key={st.id} onClick={() => { setStage(st.id); setSelected(null); }} className={cx('flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border', isActive ? 'bg-white text-indigo-700 border-indigo-200 shadow-xs ring-1 ring-indigo-500/20' : 'bg-white/60 text-slate-600 border-slate-200/70 hover:bg-white hover:text-slate-900')}>
                <span className={cx('w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0', all ? 'bg-emerald-100 text-emerald-700' : isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600')}>{all ? <Check className="w-2.5 h-2.5" /> : idx + 1}</span>
                {st.shortTitle}
                <span className={cx('text-[11px] font-mono font-bold px-1.5 rounded', isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600')}>{avgScore(rs)}</span>
              </button>
            );
          })}
        </div>

        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><span>Stage {cfg.num}</span><span>•</span><span className="text-indigo-600">{cfg.tagline}</span></div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{cfg.title} — Executive Scoring Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">{list.length} executives review this stage. Select one to see their evaluation.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Stage readiness</span>
              <div className="flex items-baseline justify-end gap-1"><span className="text-2xl font-black text-slate-900">{stageAvg}</span><span className="text-xs font-semibold text-slate-400">/100</span></div>
            </div>
            <button onClick={approveGate} disabled={validated === list.length} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
              <CheckCircle2 className="w-4 h-4" /> {validated === list.length ? 'Gate approved' : 'Approve Stage Gate'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-slate-50/60 min-h-0">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {list.map(r => {
                const theme = getRoleTheme(r.role);
                const isSel = selected === r.role;
                return (
                  <div key={r.role} onClick={() => setSelected(r.role)} className={cx('bg-white rounded-xl border p-4 transition-all cursor-pointer flex flex-col hover:shadow-md', isSel ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' : 'border-slate-200/90 hover:border-slate-300')}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cx('px-2.5 py-1 rounded-md text-xs font-black text-white shadow-xs', theme.badge)}>{r.role}</span>
                        <span className="text-[11px] font-semibold text-slate-500">{CSUITE_ROLES_META[r.role].category}</span>
                      </div>
                      <span className={cx('text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border', r.status === 'Validated' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200')}>{r.status === 'Validated' && <Check className="w-2.5 h-2.5" />}{r.status}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{r.title}</div>
                    <div className="text-[11.5px] text-slate-400 mt-0.5 line-clamp-2">{r.reviewed}</div>
                    <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className={cx('text-[10.5px] font-bold px-2 py-0.5 rounded-full border', RISK_STYLE[r.risk])}>{r.risk} risk</span>
                      <span className="flex items-baseline gap-0.5"><span className="text-xl font-black text-slate-900">{r.score}</span><span className="text-[11px] font-semibold text-slate-400">/100</span></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white overflow-y-auto">
            {detail ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={cx('px-2.5 py-1 rounded-md text-xs font-black text-white', getRoleTheme(detail.role).badge)}>{detail.role}</span>
                  <h4 className="text-[15px] font-bold text-slate-900">{detail.title}</h4>
                </div>
                <div><p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400 mb-1">Reviewed</p><p className="text-[13.5px] text-slate-700 leading-snug">{detail.reviewed}</p></div>
                <div><p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400 mb-1">Findings</p><p className="text-[13.5px] text-slate-700 leading-snug">{detail.findings}</p></div>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Criteria</p>
                  <ul className="space-y-1">{detail.criteria.map(c => <li key={c} className="flex items-center gap-2 text-[13px] text-slate-700"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />{c}</li>)}</ul>
                </div>
                <button onClick={() => toggle(detail.role)} className={cx('w-full px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer', detail.status === 'Validated' ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50' : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700')}>
                  {detail.status === 'Validated' ? 'Mark as pending' : 'Mark as validated'}
                </button>
              </div>
            ) : (
              <div className="p-6 text-center text-[13px] text-slate-400 flex flex-col items-center gap-2 mt-8"><AlertCircle className="w-5 h-5" />Select an executive to see their evaluation.</div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
