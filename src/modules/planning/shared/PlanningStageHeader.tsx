import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { CSuiteMemberReview } from '../executive/csuiteData';
import { avgScore } from '../executive/planningExecutives';
import { PLANNING_STAGES, PlanningStageConfig, PlanningStageStatus } from '../map/planningMap';
import { cx } from '../../ui';

const STATUS_LABEL: Record<PlanningStageStatus, { label: string; style: string }> = {
  active: { label: 'In progress', style: 'bg-blue-50 text-blue-700 border-blue-200' },
  completed: { label: 'Completed', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  open: { label: 'Ready to start', style: 'bg-slate-50 text-slate-600 border-slate-200' },
  locked: { label: 'Locked', style: 'bg-slate-50 text-slate-400 border-slate-200' },
};

/** Slim strip above each planning stage: where you are, its status and the C-Suite readiness for it. */
export const PlanningStageHeader: React.FC<{
  stage: PlanningStageConfig;
  status: PlanningStageStatus;
  reviews: CSuiteMemberReview[];
  onOpenExecutives: () => void;
}> = ({ stage, status, reviews, onOpenExecutives }) => {
  const validated = reviews.filter(r => r.status === 'Validated').length;
  const allValidated = validated === reviews.length;
  const st = STATUS_LABEL[status];
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4 shrink-0">
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Solution Planning · Stage {stage.num} of {String(PLANNING_STAGES.length).padStart(2, '0')}</div>
        <div className="flex items-center gap-2.5 mt-0.5">
          <h2 className="text-lg font-bold text-[#0F172A] truncate">{stage.title}</h2>
          <span className={cx('text-[11.5px] font-bold px-2 py-0.5 rounded-full border shrink-0', st.style)}>{st.label}</span>
        </div>
        <p className="text-[13px] text-slate-500 mt-0.5">{stage.tagline}</p>
      </div>
      <button onClick={onOpenExecutives} className="shrink-0 flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-50 transition-colors cursor-pointer text-left">
        <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">{allValidated ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}</span>
        <span>
          <span className="block text-[10.5px] font-bold uppercase tracking-wider text-purple-700">C-Suite validation</span>
          <span className="block text-[12.5px] text-slate-600"><strong className="text-[#0F172A]">{avgScore(reviews)}/100</strong> · {validated}/{reviews.length} validated</span>
        </span>
      </button>
    </div>
  );
};
