import React from 'react';
import { BookOpen, Loader2, Sparkles } from 'lucide-react';
import { useSkills } from '../../skills/SkillsStore';
import type { Asset } from '../../skills/types';

interface StageResourceActivityProps {
  active: boolean;
  activity: string;
  skillIds?: string[];
  knowledgeIds?: string[];
  instructionIds?: string[];
  policyIds?: string[];
}

export const StageResourceActivity: React.FC<StageResourceActivityProps> = ({
  active,
  activity,
  skillIds = [],
  knowledgeIds = [],
  instructionIds = [],
  policyIds = [],
}) => {
  const { library } = useSkills();
  if (!active) return null;

  const resources = [...skillIds, ...knowledgeIds, ...instructionIds, ...policyIds]
    .map(id => library.find(asset => asset.id === id))
    .filter((asset): asset is Asset => Boolean(asset));
  const skills = resources.filter(asset => asset.type === 'skill');
  const knowledge = resources.filter(asset => asset.type === 'knowledge' || asset.type === 'policy' || asset.type === 'instruction');

  return (
    <div className="mx-auto mt-5 w-full max-w-2xl rounded-xl border border-blue-100 bg-white p-4 text-left shadow-sm" role="status" aria-live="polite">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        {activity}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {skills.length > 0 && (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><Sparkles className="h-3.5 w-3.5" /> Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(asset => <span key={asset.id} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">{asset.displayName}</span>)}
            </div>
          </div>
        )}
        {knowledge.length > 0 && (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><BookOpen className="h-3.5 w-3.5" /> Knowledge & guidance</div>
            <div className="flex flex-wrap gap-1.5">
              {knowledge.map(asset => <span key={asset.id} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{asset.displayName}</span>)}
            </div>
          </div>
        )}
      </div>
      {skills.length === 0 && knowledge.length === 0 && <p className="mt-2 text-xs text-slate-500">No additional skill or knowledge source is needed for this step.</p>}
    </div>
  );
};
