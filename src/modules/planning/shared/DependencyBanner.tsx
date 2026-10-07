import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DiscoveryPage } from '../types';
import { PHASE_CONFIGS, getPhaseInfo } from '../map/mapData';
import { usePlanning } from '../PlanningStore';

interface Props {
  projectId: string;
  projectName: string;
  currentPhase: DiscoveryPage;
  onNavigateToPhase: (phase: DiscoveryPage) => void;
}

export const DependencyBanner: React.FC<Props> = ({ projectId, projectName, currentPhase, onNavigateToPhase }) => {
  const { state } = usePlanning();
  const s = state(projectId);
  const [dismissed, setDismissed] = useState(false);

  const config = PHASE_CONFIGS[currentPhase];
  if (!config || config.dependencies.length === 0 || dismissed) return null;

  // Check if any dependencies are not approved
  const unapproved = config.dependencies.filter(depId => getPhaseInfo(s, depId, projectName).status !== 'approved');
  if (unapproved.length === 0) return null;

  const firstUnapproved = unapproved[0];
  const upstreamConfig = PHASE_CONFIGS[firstUnapproved];

  return (
    <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-4 text-[13px] text-slate-600 shrink-0">
      <p>
        <span className="font-medium text-[#0F172A]">Upstream input pending.</span>{' '}
        This phase can be explored, but <span className="font-medium text-[#0F172A]">{upstreamConfig.title}</span> is still awaiting validation ({config.missingInputs.slice(0, 2).join(', ')}).
      </p>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onNavigateToPhase(firstUnapproved)} className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-medium transition-colors cursor-pointer">Review {upstreamConfig.shortTitle}</button>
        <button onClick={() => setDismissed(true)} title="Continue with assumptions" aria-label="Dismiss" className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"><X className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
};
