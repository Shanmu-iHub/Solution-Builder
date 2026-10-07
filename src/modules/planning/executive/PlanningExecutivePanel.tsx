import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
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
}

/** Risk is the only thing colored here, because it is the thing a reviewer must notice. */
const RISK_STYLE = { Low: 'text-slate-600 border-slate-200 bg-slate-50', Medium: 'text-amber-700 border-amber-200 bg-amber-50', High: 'text-rose-700 border-rose-200 bg-rose-50' };

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
            return (
              <button key={st.id} onClick={() => { setStage(st.id); setSelected(null); }} className={cx('flex items-center gap-1.5 py-3 text-[13.5px] whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer', isActive ? 'border-[#0F172A] text-[#0F172A] font-semibold' : 'border-transparent text-slate-500 hover:text-slate-800')}>
                {st.shortTitle}
                {all && <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />}
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

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-slate-50/60 min-h-0">
          <div className="flex-1 overflow-y-auto p-6">
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

          <aside className="lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white overflow-y-auto">
            {detail ? (
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[12px] font-semibold text-slate-500">{detail.role} · {CSUITE_ROLES_META[detail.role].category}</p>
                  <h4 className="text-[15px] font-semibold text-[#0F172A] mt-0.5">{detail.title}</h4>
                </div>
                <div><p className="text-[12px] font-semibold text-slate-500 mb-1">Reviewed</p><p className="text-[13.5px] text-slate-700 leading-snug">{detail.reviewed}</p></div>
                <div><p className="text-[12px] font-semibold text-slate-500 mb-1">Findings</p><p className="text-[13.5px] text-slate-700 leading-snug">{detail.findings}</p></div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-500 mb-1.5">Criteria</p>
                  <ul className="space-y-1">{detail.criteria.map(c => <li key={c} className="text-[13px] text-slate-700 flex gap-2"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[8px] shrink-0" />{c}</li>)}</ul>
                </div>
                <button onClick={() => toggle(detail.role)} className={cx('w-full px-3 py-2 rounded-lg text-[13px] font-medium border transition-colors cursor-pointer', detail.status === 'Validated' ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50' : 'bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8]')}>
                  {detail.status === 'Validated' ? 'Mark as pending' : 'Mark as validated'}
                </button>
              </div>
            ) : (
              <p className="p-6 text-center text-[13px] text-slate-400 mt-8">Select an executive to see their evaluation.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
