import React from 'react';
import { 
  ChevronLeft, CheckCircle2, AlertTriangle, 
  ChevronRight, ShieldCheck 
} from 'lucide-react';
import { DiscoveryPage } from '../types';
import { usePlanning } from '../PlanningStore';
import { MACRO_AREAS, PHASE_CONFIGS, getPhaseInfo } from '../map/mapData';
import { cx } from '../../ui';

interface Props {
  projectId: string;
  projectName: string;
  activePhase: DiscoveryPage;
  onSelectPhase: (phase: DiscoveryPage) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenExecutivePanel: () => void;
}

export const RequirementNavRail: React.FC<Props> = ({
  projectId,
  projectName,
  activePhase,
  onSelectPhase,
  collapsed,
  onToggleCollapse,
  onOpenExecutivePanel
}) => {
  const { state } = usePlanning();
  const s = state(projectId);

  const phaseList = Object.keys(PHASE_CONFIGS) as DiscoveryPage[];
  const approvedCount = phaseList.filter(pid => getPhaseInfo(s, pid, projectName).status === 'approved').length;

  if (collapsed) {
    return (
      <div className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 shrink-0 justify-between select-none">
        <div className="flex flex-col items-center gap-2.5">
          <button
            onClick={onToggleCollapse}
            title="Expand Navigation Rail"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="w-6 h-px bg-slate-200 my-0.5" />
          {phaseList.map(pid => {
            const config = PHASE_CONFIGS[pid];
            const isActive = activePhase === pid;
            const info = getPhaseInfo(s, pid, projectName);
            return (
              <button
                key={pid}
                onClick={() => onSelectPhase(pid)}
                title={`${config.num} ${config.shortTitle}`}
                className={cx(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative",
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : info.status === 'approved'
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "text-slate-500 hover:bg-slate-100"
                )}
              >
                {config.num}
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenExecutivePanel}
          title="Open C-Suite Executive Panel"
          className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[12.5px] font-black text-[#0F172A] uppercase tracking-wider block">
            Phases
          </span>
          <span className="text-[11px] font-semibold text-slate-400">
            {approvedCount} of 8 validated
          </span>
        </div>
        <button
          onClick={onToggleCollapse}
          title="Collapse navigation"
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Macro Area Navigation Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {MACRO_AREAS.map(area => (
          <div key={area.id} className="space-y-1">
            <span className="block px-2 text-[10.5px] font-black uppercase tracking-wider text-slate-400">
              {area.label}
            </span>

            <div className="space-y-0.5">
              {area.phases.map(pid => {
                const config = PHASE_CONFIGS[pid];
                const isActive = activePhase === pid;
                const info = getPhaseInfo(s, pid, projectName);

                return (
                  <button
                    key={pid}
                    onClick={() => onSelectPhase(pid)}
                    className={cx(
                      "w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer relative",
                      isActive
                        ? "bg-blue-50/90 text-blue-700 font-bold shadow-2xs"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cx(
                        "font-mono text-[11px] font-extrabold shrink-0",
                        isActive ? "text-blue-600" : "text-slate-400"
                      )}>
                        {config.num}
                      </span>
                      <span className="truncate text-[12.5px]">{config.shortTitle}</span>
                    </div>

                    {/* Status dot */}
                    <div className="shrink-0 ml-1">
                      {info.status === 'approved' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : info.status === 'needs_attention' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      ) : info.status === 'in_progress' ? (
                        <span className="w-2 h-2 rounded-full bg-blue-600 block" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 block" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};
