import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { cx, sleep } from '../ui';
import { DomainKey, detectDomain } from './archModel';

export type SkillPhase = 'documentation' | 'validation' | 'ux' | 'wireframes';
export interface PhaseSkill { id: string; purpose: string }
type Status = 'idle' | 'loading' | 'loaded';

const PHASE_SKILLS: Record<SkillPhase, PhaseSkill[]> = {
  documentation: [
    { id: 'solution-architecture-writer', purpose: 'Structures the SAD, HLD and decision records to the architecture framework' },
    { id: 'backend-development-standards', purpose: 'Applies the approved backend standards to the TDD, API list and database design' },
    { id: 'api-contract-designer', purpose: 'Drafts REST resources, contracts and the error model' },
    { id: 'data-modelling', purpose: 'Derives entities, relations and indexes for the database design' },
    { id: 'security-design-review', purpose: 'Covers authentication, authorisation and the threat model' },
  ],
  validation: [
    { id: 'architecture-consistency-checker', purpose: 'Compares components, flows and names across the 10 documents' },
    { id: 'requirements-traceability', purpose: 'Traces goals and requirements to components and APIs' },
    { id: 'nfr-coverage-reviewer', purpose: 'Checks availability, performance and DR targets are stated' },
    { id: 'security-controls-auditor', purpose: 'Verifies security controls match the stated risks' },
  ],
  ux: [
    { id: 'persona-builder', purpose: 'Turns discovery evidence into representative personas' },
    { id: 'journey-mapping', purpose: 'Maps actions, mindset, touchpoints and emotion per phase' },
    { id: 'ux-research-synthesis', purpose: 'Clusters findings into goals, concerns and opportunities' },
    { id: 'accessibility-guidelines', purpose: 'Keeps personas and journeys inclusive (WCAG 2.2 AA)' },
  ],
  wireframes: [
    { id: 'wireframe-composer', purpose: 'Composes low-fidelity screens from personas, journeys and architecture' },
    { id: 'design-system-patterns', purpose: 'Reuses standard layouts, components and navigation patterns' },
    { id: 'interaction-state-designer', purpose: 'Defines empty, loading, error and success states' },
    { id: 'accessibility-guidelines', purpose: 'Checks focus order, contrast and labelling' },
  ],
};

const DOMAIN_SKILL: Record<DomainKey, { id: string; purpose: string }> = {
  support: { id: 'customer-support-domain', purpose: 'Case, SLA and knowledge-base conventions for service desks' },
  claims: { id: 'insurance-claims-domain', purpose: 'Claim lifecycle, triage and payment-authority rules' },
  renewal: { id: 'insurance-renewals-domain', purpose: 'Renewal cycle, quoting and broker workflow rules' },
  lending: { id: 'lending-compliance-domain', purpose: 'Credit decisioning, KYC and lending compliance rules' },
  fleet: { id: 'fleet-telematics-domain', purpose: 'Telemetry, trip and driver-safety conventions' },
  retail: { id: 'retail-analytics-domain', purpose: 'Sales, inventory and demand-forecast conventions' },
  hr: { id: 'hr-onboarding-domain', purpose: 'Onboarding steps, HRIS and policy conventions' },
  healthcare: { id: 'healthcare-privacy-domain', purpose: 'Consent, PHI handling and EHR integration rules' },
  generic: { id: 'business-application-domain', purpose: 'General workflow, roles and reporting conventions' },
};

/** The skills this phase needs: the project's own context first, then the task skills, then the domain skill. */
export const skillsFor = (phase: SkillPhase, projectName: string, description = ''): PhaseSkill[] => [
  { id: 'project-context', purpose: `Loads the ${projectName} brief, validated problem and requirements` },
  ...PHASE_SKILLS[phase],
  DOMAIN_SKILL[detectDomain(projectName, description)],
];

/** Loads skills one after another so the UI can show them being picked up before the task runs. */
export const useSkillLoader = (skills: PhaseSkill[], alreadyUsed: boolean) => {
  const key = skills.map(s => s.id).join('|');
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [loading, setLoading] = useState(false);
  const skillsRef = useRef(skills);
  skillsRef.current = skills;

  const load = useCallback(async () => {
    setLoading(true);
    setStatus(Object.fromEntries(skillsRef.current.map(s => [s.id, 'idle' as Status])));
    for (const s of skillsRef.current) {
      setStatus(p => ({ ...p, [s.id]: 'loading' }));
      await sleep(320);
      setStatus(p => ({ ...p, [s.id]: 'loaded' }));
    }
    setLoading(false);
  }, []);

  const resolved = useMemo(() => Object.fromEntries(skills.map(s => [s.id, status[s.id] ?? (alreadyUsed ? 'loaded' : 'idle')])) as Record<string, Status>, [key, status, alreadyUsed]); // eslint-disable-line react-hooks/exhaustive-deps
  return { status: resolved, loading, load };
};

export const SkillsPanel: React.FC<{ title?: string; skills: PhaseSkill[]; status: Record<string, Status>; loading: boolean; className?: string }> = ({ title = 'Skills for this task', skills, status, loading, className }) => {
  const loaded = skills.filter(s => status[s.id] === 'loaded').length;
  const current = skills.find(s => status[s.id] === 'loading');
  return (
    <div className={cx('bg-white border border-slate-200 rounded-xl overflow-hidden shrink-0', className)}>
      <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/60">
        <span className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wider text-slate-500"><Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />{title}</span>
        <span className={cx('text-[12.5px] font-semibold', loaded === skills.length ? 'text-emerald-600' : loading ? 'text-[#2563EB]' : 'text-slate-400')}>{loading ? `Loading ${loaded}/${skills.length}` : loaded === skills.length ? `${loaded} loaded` : 'Not loaded'}</span>
      </div>
      <div className="p-3 flex flex-wrap gap-1.5">
        {skills.map(s => {
          const st = status[s.id];
          return (
            <span key={s.id} title={s.purpose} className={cx('inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[12.5px] font-mono transition-colors', st === 'loaded' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : st === 'loading' ? 'bg-blue-50 border-blue-200 text-[#2563EB]' : 'bg-slate-50 border-slate-200 text-slate-400')}>
              {st === 'loading' ? <Loader2 className="w-3 h-3 animate-spin" /> : st === 'loaded' ? <Check className="w-3 h-3" strokeWidth={3} /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
              {s.id}
            </span>
          );
        })}
      </div>
      {current && <p className="px-3.5 pb-3 -mt-1 text-[12.5px] text-slate-500">{current.purpose}…</p>}
    </div>
  );
};
