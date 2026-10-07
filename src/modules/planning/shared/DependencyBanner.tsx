import React, { useState } from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';
import { DiscoveryPage } from '../types';
import { PHASE_CONFIGS, getPhaseInfo } from '../map/mapData';
import { usePlanning } from '../PlanningStore';

interface Props {
  projectId: string;
  projectName: string;
  currentPhase: DiscoveryPage;
  onNavigateToPhase: (phase: DiscoveryPage) => void;
}

export const DependencyBanner: React.FC<Props> = ({
  projectId,
  projectName,
  currentPhase,
  onNavigateToPhase
}) => {
  const { state } = usePlanning();
  const s = state(projectId);
  const [dismissed, setDismissed] = useState(false);

  const config = PHASE_CONFIGS[currentPhase];
  if (!config || config.dependencies.length === 0 || dismissed) return null;

  // Check if any dependencies are not approved
  const unapproved = config.dependencies.filter(depId => {
    const info = getPhaseInfo(s, depId, projectName);
    return info.status !== 'approved';
  });

  if (unapproved.length === 0) return null;

  const firstUnapproved = unapproved[0];
  const upstreamConfig = PHASE_CONFIGS[firstUnapproved];

  return (
    <div className="bg-amber-50/90 border-b border-amber-200/90 px-6 py-3 flex items-center justify-between text-xs text-amber-900 animate-fade-in shrink-0">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <div>
          <span className="font-bold">Upstream Inputs In Progress:</span>{' '}
          <span>
            This phase can be explored, but inputs from{' '}
            <strong className="underline decoration-amber-400">{upstreamConfig.title}</strong>{' '}
            are still pending validation ({config.missingInputs.slice(0, 2).join(', ')}).
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-4">
        <button
          onClick={() => onNavigateToPhase(firstUnapproved)}
          className="px-2.5 py-1 rounded-md bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-bold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Review {upstreamConfig.shortTitle}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => setDismissed(true)}
          title="Draft with assumptions"
          className="p-1 rounded-md text-amber-600 hover:text-amber-900 hover:bg-amber-200/50 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
