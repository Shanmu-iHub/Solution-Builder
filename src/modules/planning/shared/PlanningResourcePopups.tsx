import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button, Dialog, cx, sleep } from '../../ui';
import { DomainKey } from '../archModel';
import { relatedProjects } from '../kbReferences';
import { PLANNING_STAGES, PlanningStageId, PlanningStageStatus } from '../map/planningMap';
import { Chip } from '../discovery/DiscoveryDashboard';
import { stageSkills } from './stageResources';

export const DOMAIN_LABEL: Record<DomainKey, string> = {
  support: 'Customer support', claims: 'Insurance claims', renewal: 'Insurance renewals', lending: 'Lending', fleet: 'Fleet telematics',
  retail: 'Retail analytics', hr: 'HR onboarding', healthcare: 'Healthcare', generic: 'General business application',
};

const Bar: React.FC<{ value: number }> = ({ value }) => (
  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-[#2563EB] transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
);

/* ── Skills (opened from the top bar) ───────────────────────────────────── */

export const SkillsPopup: React.FC<{
  open: boolean; onClose: () => void;
  projectName: string; description: string;
  activeStage: PlanningStageId;
  statusOf: (stage: PlanningStageId) => PlanningStageStatus;
}> = ({ open, onClose, projectName, description, activeStage, statusOf }) => {
  const [stage, setStage] = useState<PlanningStageId>(activeStage);
  const [lastOpen, setLastOpen] = useState(false);
  // open on the stage the user is in each time the popup opens
  if (open !== lastOpen) { setLastOpen(open); if (open) setStage(activeStage); }
  if (!open) return null;

  const skills = stageSkills(stage, projectName, description);
  const status = statusOf(stage);
  const label = status === 'completed' ? 'Loaded' : status === 'active' ? 'Ready' : 'Not loaded';

  return (
    <Dialog open onClose={onClose} width="max-w-3xl" title="Skills" subtitle={`What the AI loads for each planning stage of ${projectName}`} footer={<Button onClick={onClose}>Close</Button>}>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {PLANNING_STAGES.map(st => (
          <button key={st.id} onClick={() => setStage(st.id)} className={cx('px-3 py-1.5 rounded-lg text-[13px] font-medium border transition cursor-pointer', st.id === stage ? 'bg-slate-100 border-slate-300 text-[#0F172A]' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300')}>
            {st.shortTitle}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] text-slate-500">{skills.length} skills · {PLANNING_STAGES.find(s => s.id === stage)?.title}</p>
        <Chip>{label}</Chip>
      </div>
      <ul className="space-y-2">
        {skills.map(s => (
          <li key={s.id} className="border border-slate-200 rounded-lg px-4 py-3 bg-white">
            <p className="font-mono text-[13.5px] font-semibold text-[#0F172A]">{s.id}</p>
            <p className="text-[13.5px] text-slate-600 mt-0.5 leading-snug">{s.purpose}</p>
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

/* ── Knowledge base ─────────────────────────────────────────────────────── */

const KbCard: React.FC<{ r: ReturnType<typeof relatedProjects>[number] }> = ({ r }) => (
  <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3 animate-fade-in">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0"><p className="text-[15px] font-semibold text-[#0F172A] truncate">{r.name}</p><p className="text-[12.5px] text-slate-400">{r.version}</p></div>
      <span className="text-[14px] font-semibold text-[#0F172A] tabular-nums shrink-0">{r.similarity}%<span className="text-slate-400 font-normal"> match</span></span>
    </div>
    <Bar value={r.similarity} />
    <p className="text-[13.5px] text-slate-600 leading-snug">{r.summary}</p>
    <div>
      <p className="text-[12px] font-semibold text-slate-500 mb-1.5">Data used from this project</p>
      <ul className="space-y-1">{r.facts.map(f => <li key={f} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[8px] shrink-0" />{f}</li>)}</ul>
    </div>
  </div>
);

export const KnowledgePopup: React.FC<{
  open: boolean; onClose: () => void;
  projectName: string; domain: DomainKey;
}> = ({ open, onClose, projectName, domain }) => {
  if (!open) return null;
  const refs = relatedProjects(domain);
  return (
    <Dialog open onClose={onClose} width="max-w-4xl" title="Knowledge Base" subtitle={`Delivered projects similar to ${projectName} · ${DOMAIN_LABEL[domain]}`} footer={<Button onClick={onClose}>Close</Button>}>
      <p className="text-[13.5px] text-slate-500 mb-4">{refs.length} similar projects found. Their documents are used as references when architecture documents are generated.</p>
      <div className="grid md:grid-cols-2 gap-4">{refs.map(r => <KbCard key={r.name} r={r} />)}</div>
    </Dialog>
  );
};

/* ── Auto-run popups: shown while a stage generates, then they close by themselves ─────── */

/** Loads the stage's skills one after another, then closes. */
export const SkillsRunDialog: React.FC<{ stage: PlanningStageId; projectName: string; description: string; onDone: () => void }> = ({ stage, projectName, description, onDone }) => {
  const skills = stageSkills(stage, projectName, description);
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < skills.length; i++) { await sleep(330); if (cancelled) return; setLoaded(i + 1); }
      await sleep(800);
      if (!cancelled) onDone();
    })();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const finished = loaded === skills.length;
  return (
    <Dialog open onClose={onDone} width="max-w-2xl" title={finished ? 'Skills loaded' : 'Loading skills…'} subtitle={`Preparing the AI for ${PLANNING_STAGES.find(s => s.id === stage)?.title} of ${projectName}`} footer={<Button variant="ghost" onClick={onDone}>Skip</Button>}>
      <div className="flex items-center justify-between mb-2 text-[13px] text-slate-500"><span>{finished ? 'All skills loaded' : `Loading ${Math.min(loaded + 1, skills.length)} of ${skills.length}`}</span><span className="tabular-nums">{loaded}/{skills.length}</span></div>
      <div className="mb-4"><Bar value={(loaded / skills.length) * 100} /></div>
      <ul className="space-y-2">
        {skills.map((s, i) => {
          const st = i < loaded ? 'loaded' : i === loaded ? 'loading' : 'pending';
          return (
            <li key={s.id} className={cx('flex items-start gap-3 border border-slate-200 rounded-lg px-4 py-3 bg-white transition-opacity', st === 'pending' && 'opacity-50')}>
              <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                {st === 'loaded' ? <Check className="w-4 h-4 text-slate-700" strokeWidth={2.5} /> : st === 'loading' ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
              </span>
              <div className="min-w-0"><p className="font-mono text-[13.5px] font-semibold text-[#0F172A]">{s.id}</p><p className="text-[13px] text-slate-600 mt-0.5 leading-snug">{s.purpose}</p></div>
            </li>
          );
        })}
      </ul>
    </Dialog>
  );
};

/** Searches the knowledge base, pulls in the similar projects' data one by one, then closes. */
export const KnowledgeRunDialog: React.FC<{ projectName: string; domain: DomainKey; onDone: () => void }> = ({ projectName, domain, onDone }) => {
  const refs = relatedProjects(domain);
  const [shown, setShown] = useState(0);
  const [searching, setSearching] = useState(true);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await sleep(900);
      if (cancelled) return;
      setSearching(false);
      for (let i = 0; i < refs.length; i++) { await sleep(650); if (cancelled) return; setShown(i + 1); }
      await sleep(1000);
      if (!cancelled) onDone();
    })();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const finished = !searching && shown === refs.length;
  return (
    <Dialog open onClose={onDone} width="max-w-4xl" title={finished ? 'Knowledge base data ready' : 'Reading the knowledge base…'} subtitle={`Delivered projects similar to ${projectName} · ${DOMAIN_LABEL[domain]}`} footer={<Button variant="ghost" onClick={onDone}>Skip</Button>}>
      <p className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-[13.5px] text-slate-700">
        {finished ? <Check className="w-4 h-4 text-slate-700" strokeWidth={2.5} /> : <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
        {finished ? `Pulled data from ${refs.length} similar projects. Continuing with the documents…` : searching ? 'Searching for similar projects…' : `Getting data from similar projects (${shown}/${refs.length})…`}
      </p>
      <div className="grid md:grid-cols-2 gap-4">{refs.slice(0, shown).map(r => <KbCard key={r.name} r={r} />)}</div>
    </Dialog>
  );
};
