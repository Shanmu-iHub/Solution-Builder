import React from 'react';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { PlanningStage } from '../types';
import { PLANNING_AREAS, PLANNING_STAGES, PLANNING_STAGE_BY_ID, PLANNING_STAGE_IDS, PlanningStageId, getStageStatus } from '../map/planningMap';
import { cx, useToast } from '../../ui';

interface Props {
  active: PlanningStage;
  /** index (in PLANNING_STAGE_IDS) of the furthest stage reached so far */
  maxReached: number;
  onSelect: (stage: PlanningStageId) => void;
  onBackToRequirements: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const PlanningNavRail: React.FC<Props> = ({ active, maxReached, onSelect, onBackToRequirements, collapsed, onToggleCollapse }) => {
  const { toast } = useToast();
  const completedCount = PLANNING_STAGE_IDS.filter(id => getStageStatus(id, active, maxReached) === 'completed').length;

  const click = (id: PlanningStageId) => {
    if (getStageStatus(id, active, maxReached) === 'locked') {
      const prev = PLANNING_STAGES[Math.max(0, PLANNING_STAGE_IDS.indexOf(id) - 1)];
      toast({ title: 'Stage Locked', description: `Complete ${prev.title} before opening this stage.` });
      return;
    }
    onSelect(id);
  };

  if (collapsed) {
    return (
      <div className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 shrink-0 select-none">
        <div className="flex flex-col items-center gap-2.5">
          <button onClick={onToggleCollapse} title="Expand navigation" className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="w-6 h-px bg-slate-200 my-0.5" />
          {PLANNING_STAGES.map(st => {
            const status = getStageStatus(st.id, active, maxReached);
            return (
              <button
                key={st.id}
                onClick={() => click(st.id)}
                title={`${st.num} ${st.title}${status === 'locked' ? ' (Locked)' : ''}`}
                className={cx(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all',
                  status === 'active' ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                    : status === 'locked' ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                    : status === 'completed' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer'
                    : 'text-slate-500 hover:bg-slate-100 cursor-pointer',
                )}
              >
                {status === 'locked' ? <Lock className="w-3.5 h-3.5" /> : st.num}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[12.5px] font-black text-[#0F172A] uppercase tracking-wider block">Stages</span>
          <span className="text-[11px] font-semibold text-slate-400">{completedCount} of {PLANNING_STAGES.length} completed</span>
        </div>
        <button onClick={onToggleCollapse} title="Collapse navigation" className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3.5 pt-3">
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${(completedCount / PLANNING_STAGES.length) * 100}%` }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {PLANNING_AREAS.map(area => (
          <div key={area.id} className="space-y-1">
            <span className="block px-2 text-[10.5px] font-black uppercase tracking-wider text-slate-400">{area.label}</span>
            <div className="space-y-0.5">
              {area.stages.map(id => {
                const st = PLANNING_STAGE_BY_ID[id];
                const status = getStageStatus(id, active, maxReached);
                const isActive = status === 'active';
                const locked = status === 'locked';
                return (
                  <button
                    key={id}
                    onClick={() => click(id)}
                    className={cx(
                      'w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all',
                      isActive ? 'bg-blue-50/90 text-blue-700 font-bold shadow-2xs cursor-pointer'
                        : locked ? 'text-slate-400 hover:bg-slate-50/50 cursor-not-allowed opacity-75'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 cursor-pointer',
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cx('font-mono text-[11px] font-extrabold shrink-0', isActive ? 'text-blue-600' : locked ? 'text-slate-300' : 'text-slate-400')}>{st.num}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-[12.5px]">{st.title}</span>
                        <span className={cx('block truncate text-[10.5px] font-medium', isActive ? 'text-blue-500' : 'text-slate-400')}>{st.tagline}</span>
                      </span>
                    </div>
                    <div className="shrink-0 ml-1 flex items-center gap-1.5">
                      {locked ? <Lock className="w-3.5 h-3.5 text-slate-400" />
                        : status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        : status === 'active' ? <span className="w-2 h-2 rounded-full bg-blue-600 block" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 block" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100">
        <button onClick={onBackToRequirements} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[12.5px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          Requirement Gathering
        </button>
      </div>
    </div>
  );
};
