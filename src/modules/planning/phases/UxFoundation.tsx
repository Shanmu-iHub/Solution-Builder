import React, { useMemo, useState } from 'react';
import { Button, Card, EmptyBlock, SectionLabel, SegmentedControl, cx, sleep } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { makeJourneys, makePersonas } from '../content';
import { Primary, Working } from '../shared';
import { useResourceRun } from '../shared/ResourceRun';
import { Persona } from '../types';
import { Chip } from '../discovery/DiscoveryDashboard';

const Avatar: React.FC<{ name: string; big?: boolean }> = ({ name, big }) => (
  <div className={cx('rounded-full bg-slate-100 text-slate-700 font-semibold flex items-center justify-center shrink-0', big ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-[14px]')}>{name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
);

export const UxFoundation: React.FC<{ projectId: string; projectName: string; onComplete: () => void }> = ({ projectId, projectName, onComplete }) => {
  const { state, patch, projects } = usePlanning();
  const s = state(projectId);
  const [tab, setTab] = useState<'personas' | 'journeys'>('personas');
  const [busy, setBusy] = useState<'personas' | 'journeys' | null>(null);
  const [active, setActive] = useState<string | null>(s.personas[0]?.id ?? null);
  const [journeyId, setJourneyId] = useState<string | null>(s.journeys[0]?.id ?? null);

  const { presentSkills } = useResourceRun();
  const persona: Persona | undefined = s.personas.find(p => p.id === active) ?? s.personas[0];
  const journey = s.journeys.find(j => j.id === journeyId) ?? s.journeys[0];

  const genPersonas = async () => { setBusy('personas'); await presentSkills(); await sleep(1400); const p = makePersonas(projectName); patch(projectId, { personas: p, journeys: [] }); setActive(p[0].id); setBusy(null); };
  const genJourneys = async () => { setBusy('journeys'); await presentSkills(); await sleep(1400); const j = makeJourneys(s.personas); patch(projectId, { journeys: j }); setJourneyId(j[0].id); setBusy(null); };


  return (
    <div className="h-full overflow-y-auto bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div><h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">UX Foundation</h1><p className="text-[14.5px] text-slate-500 mt-1.5 max-w-2xl">Understand who you are designing for and how they move through the experience.</p></div>
          <div className="flex items-center gap-3"><SegmentedControl value={tab} onChange={setTab} options={[{ id: 'personas', label: `User personas (${s.personas.length})` }, { id: 'journeys', label: `User journeys (${s.journeys.length})` }]} /></div>
        </div>

        {tab === 'personas' && (
          busy === 'personas' ? <Working label="Generating personas…" sub="Clustering evidence from discovery into representative users" /> : s.personas.length === 0 ? (
            <EmptyBlock title="No personas yet" message="Generate evidence-based personas from the discovery work — goals, concerns, key tasks and context." action={<Primary onClick={genPersonas}>Generate personas</Primary>} />
          ) : persona && (
            <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><SectionLabel>Personas</SectionLabel><Button size="xs" onClick={genPersonas}>Regenerate</Button></div>
                {s.personas.map(p => <button key={p.id} onClick={() => setActive(p.id)} className={cx('w-full text-left flex items-center gap-3 p-3.5 rounded-lg border transition cursor-pointer', persona.id === p.id ? 'bg-white border-[#0F172A]' : 'bg-white border-slate-200 hover:border-slate-300')}><Avatar name={p.name} /><div className="min-w-0"><p className="text-[15px] font-bold text-[#0F172A] truncate">{p.name}</p><p className="text-[13.5px] text-slate-500 truncate">{p.role}</p></div></button>)}
              </div>
              <div className="space-y-5">
                <Card className="space-y-4">
                  <div className="flex items-start gap-4"><Avatar name={persona.name} big /><div><h2 className="text-xl font-bold text-[#0F172A]">{persona.name}</h2><p className="text-[15px] text-slate-500">{persona.role} · {persona.experience}</p><p className="text-[14.5px] font-medium text-slate-700 mt-1">{persona.tagline}</p></div></div>
                  <p className="text-[14.5px] text-slate-600 leading-relaxed">{persona.about}</p>
                  <div className="border-l-2 border-slate-300 pl-4 py-1"><p className="text-[14.5px] italic text-slate-700">“{persona.quote}”</p></div>
                  <div className="grid sm:grid-cols-3 gap-3">{[['Environment', persona.environment], ['Device', persona.device], ['Frequency', persona.frequency]].map(([k, v]) => <div key={k} className="border border-slate-200 rounded-lg p-3"><p className="text-[12px] font-medium text-slate-500">{k}</p><p className="text-[14.5px] font-semibold text-[#0F172A] mt-0.5">{v}</p></div>)}</div>
                </Card>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card><SectionLabel>Goals</SectionLabel><ul className="space-y-2">{persona.goals.map(g => <li key={g} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[9px] shrink-0" />{g}</li>)}</ul></Card>
                  <Card><SectionLabel>Concerns</SectionLabel><ul className="space-y-2">{persona.concerns.map(g => <li key={g} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[9px] shrink-0" />{g}</li>)}</ul></Card>
                  <Card><SectionLabel>Key tasks</SectionLabel><ul className="space-y-2">{persona.tasks.map(g => <li key={g} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[9px] shrink-0" />{g}</li>)}</ul></Card>
                </div>
              </div>
            </div>
          )
        )}

        {tab === 'journeys' && (
          s.personas.length === 0 ? <EmptyBlock title="Create personas first" message="Journeys are built per persona." action={<Button variant="primary" onClick={() => setTab('personas')}>Go to personas</Button>} /> :
          busy === 'journeys' ? <Working label="Mapping journeys…" /> : s.journeys.length === 0 ? (
            <EmptyBlock title="No journeys yet" message="Map the key scenarios for each persona: actions, mindset, touchpoints and emotion across each phase." action={<Primary onClick={genJourneys}>Generate journeys</Primary>} />
          ) : journey && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">{s.journeys.map(j => { const p = s.personas.find(x => x.id === j.personaId); return <button key={j.id} onClick={() => setJourneyId(j.id)} className={cx('px-3.5 py-2 rounded-xl border text-[13.5px] font-semibold cursor-pointer', journey.id === j.id ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white border-slate-200 text-slate-600')}>{p?.name.split(' ')[0]} — {j.scenario}</button>; })}<Button size="sm" onClick={genJourneys}>Regenerate</Button></div>
              <Card className="grid md:grid-cols-3 gap-4"><div><p className="text-[12px] font-medium text-slate-500">Persona</p><p className="text-[15px] font-bold text-[#0F172A] mt-0.5">{s.personas.find(p => p.id === journey.personaId)?.name}</p></div><div><p className="text-[12px] font-medium text-slate-500">User goal</p><p className="text-[15px] font-semibold text-[#0F172A] mt-0.5">{journey.goal}</p></div><div><p className="text-[12px] font-medium text-slate-500">Expectations</p><p className="text-[15px] text-slate-600 mt-0.5">{journey.expectations}</p></div></Card>
              <div className="overflow-x-auto"><div className="grid gap-3 min-w-[820px]" style={{ gridTemplateColumns: `repeat(${journey.phases.length}, minmax(200px, 1fr))` }}>
                {journey.phases.map((ph, i) => (
                  <div key={ph.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200"><span className="text-[14px] font-semibold text-[#0F172A]">{i + 1}. {ph.name}</span></div>
                    <div className="p-4 space-y-4 text-[13.5px]">
                      {([['Actions', ph.actions], ['Mindset', ph.mindsets], ['Saying', ph.saying], ['Touchpoints', ph.touchpoints]] as const).map(([k, list]) => <div key={k}><p className="text-[12px] font-medium text-slate-500 mb-1">{k}</p><ul className="space-y-1">{list.map(x => <li key={x} className="text-slate-700 leading-snug">• {x}</li>)}</ul></div>)}
                      <div><p className="text-[12px] font-medium text-slate-500 mb-1">Emotion</p><div className="flex items-center gap-2"><div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden"><div className={cx('h-full rounded-full', 'bg-[#2563EB]')} style={{ width: `${ph.emotion.score * 20}%` }} /></div><span className="text-[12.5px] font-semibold text-slate-600">{ph.emotion.label}</span></div></div>
                    </div>
                  </div>
                ))}
              </div></div>
              <Card><SectionLabel>Opportunities</SectionLabel><div className="flex flex-wrap gap-2">{journey.opportunities.map(o => <Chip key={o}>{o}</Chip>)}</div></Card>
            </div>
          )
        )}

        <div className="border-t border-slate-200 pt-5 flex justify-end"><Primary arrow disabled={s.personas.length === 0} onClick={onComplete}>Continue to wireframes</Primary></div>
      </div>
    </div>
  );
};
