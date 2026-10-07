import React, { useMemo, useState } from 'react';
import { ArrowRight, Brain, Frown, Meh, Quote, RefreshCw, Smile, Sparkles, Target, Users } from 'lucide-react';
import { Badge, Button, Card, EmptyBlock, SectionLabel, SegmentedControl, cx, sleep } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { makeJourneys, makePersonas } from '../content';
import { Primary, Working } from '../shared';
import { SkillsPanel, skillsFor, useSkillLoader } from '../SkillsLoader';
import { Persona } from '../types';

const Avatar: React.FC<{ name: string; big?: boolean }> = ({ name, big }) => (
  <div className={cx('rounded-2xl bg-gradient-to-br from-[#2563EB] to-indigo-500 text-white font-bold flex items-center justify-center shrink-0', big ? 'w-16 h-16 text-xl' : 'w-11 h-11 text-[15px]')}>{name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
);

export const UxFoundation: React.FC<{ projectId: string; projectName: string; onComplete: () => void }> = ({ projectId, projectName, onComplete }) => {
  const { state, patch, projects } = usePlanning();
  const s = state(projectId);
  const [tab, setTab] = useState<'personas' | 'journeys'>('personas');
  const [busy, setBusy] = useState<'personas' | 'journeys' | null>(null);
  const [active, setActive] = useState<string | null>(s.personas[0]?.id ?? null);
  const [journeyId, setJourneyId] = useState<string | null>(s.journeys[0]?.id ?? null);

  const skills = useMemo(() => skillsFor('ux', projectName, projects.find(p => p.id === projectId)?.description), [projectName, projects, projectId]);
  const loader = useSkillLoader(skills, s.personas.length > 0);
  const persona: Persona | undefined = s.personas.find(p => p.id === active) ?? s.personas[0];
  const journey = s.journeys.find(j => j.id === journeyId) ?? s.journeys[0];

  const genPersonas = async () => { setBusy('personas'); await loader.load(); await sleep(1400); const p = makePersonas(projectName); patch(projectId, { personas: p, journeys: [] }); setActive(p[0].id); setBusy(null); };
  const genJourneys = async () => { setBusy('journeys'); await loader.load(); await sleep(1400); const j = makeJourneys(s.personas); patch(projectId, { journeys: j }); setJourneyId(j[0].id); setBusy(null); };

  const EmotionIcon = ({ n }: { n: number }) => (n >= 4 ? <Smile className="w-5 h-5 text-emerald-500" /> : n === 3 ? <Meh className="w-5 h-5 text-amber-500" /> : <Frown className="w-5 h-5 text-rose-500" />);

  return (
    <div className="h-full overflow-y-auto bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div><p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-400">Phase · UX Foundation</p><h1 className="text-3xl font-bold tracking-tight text-[#0F172A] mt-2">UX Foundation</h1><p className="text-[15px] text-[#64748B] mt-2 max-w-2xl">Understand who you are designing for and how they move through the experience.</p></div>
          <div className="flex items-center gap-3"><SegmentedControl value={tab} onChange={setTab} options={[{ id: 'personas', label: `User personas (${s.personas.length})` }, { id: 'journeys', label: `User journeys (${s.journeys.length})` }]} /></div>
        </div>

        <SkillsPanel skills={skills} status={loader.status} loading={loader.loading} />

        {tab === 'personas' && (
          busy === 'personas' ? <Working label={loader.loading ? 'Loading skills…' : 'Generating personas…'} sub={loader.loading ? 'Picking up the skills this project needs' : 'Clustering evidence from discovery into representative users'} /> : s.personas.length === 0 ? (
            <EmptyBlock icon={<Users className="w-6 h-6" />} title="No personas yet" message="Generate evidence-based personas from the discovery work — goals, concerns, key tasks and context." action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={genPersonas}>Generate personas</Primary>} />
          ) : persona && (
            <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
              <div className="space-y-3">
                <div className="flex items-center justify-between"><SectionLabel>Personas</SectionLabel><Button size="xs" icon={<RefreshCw className="w-3 h-3" />} onClick={genPersonas}>Regenerate</Button></div>
                {s.personas.map(p => <button key={p.id} onClick={() => setActive(p.id)} className={cx('w-full text-left flex items-center gap-3 p-3.5 rounded-2xl border transition cursor-pointer', persona.id === p.id ? 'bg-white border-[#2563EB] ring-2 ring-blue-100 shadow-card' : 'bg-white border-slate-200 hover:border-slate-300')}><Avatar name={p.name} /><div className="min-w-0"><p className="text-[15px] font-bold text-[#0F172A] truncate">{p.name}</p><p className="text-[13.5px] text-slate-500 truncate">{p.role}</p></div></button>)}
              </div>
              <div className="space-y-5">
                <Card className="space-y-4">
                  <div className="flex items-start gap-4"><Avatar name={persona.name} big /><div><h2 className="text-xl font-bold text-[#0F172A]">{persona.name}</h2><p className="text-[15px] text-slate-500">{persona.role} · {persona.experience}</p><p className="text-[15px] font-semibold text-[#2563EB] mt-1">{persona.tagline}</p></div></div>
                  <p className="text-[14.5px] text-slate-600 leading-relaxed">{persona.about}</p>
                  <div className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-xl p-4"><Quote className="w-5 h-5 text-[#2563EB] shrink-0" /><p className="text-[15px] italic text-slate-700">“{persona.quote}”</p></div>
                  <div className="grid sm:grid-cols-3 gap-3">{[['Environment', persona.environment], ['Device', persona.device], ['Frequency', persona.frequency]].map(([k, v]) => <div key={k} className="border border-slate-200 rounded-xl p-3"><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">{k}</p><p className="text-[14.5px] font-semibold text-[#0F172A] mt-0.5">{v}</p></div>)}</div>
                </Card>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card><SectionLabel icon={<Target className="w-3.5 h-3.5" />}>Goals</SectionLabel><ul className="space-y-2">{persona.goals.map(g => <li key={g} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />{g}</li>)}</ul></Card>
                  <Card><SectionLabel icon={<Brain className="w-3.5 h-3.5" />}>Concerns</SectionLabel><ul className="space-y-2">{persona.concerns.map(g => <li key={g} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />{g}</li>)}</ul></Card>
                  <Card><SectionLabel>Key tasks</SectionLabel><ul className="space-y-2">{persona.tasks.map(g => <li key={g} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />{g}</li>)}</ul></Card>
                </div>
              </div>
            </div>
          )
        )}

        {tab === 'journeys' && (
          s.personas.length === 0 ? <EmptyBlock icon={<Users className="w-6 h-6" />} title="Create personas first" message="Journeys are built per persona." action={<Button variant="primary" onClick={() => setTab('personas')}>Go to personas</Button>} /> :
          busy === 'journeys' ? <Working label={loader.loading ? 'Loading skills…' : 'Mapping journeys…'} /> : s.journeys.length === 0 ? (
            <EmptyBlock icon={<Sparkles className="w-6 h-6" />} title="No journeys yet" message="Map the key scenarios for each persona: actions, mindset, touchpoints and emotion across each phase." action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={genJourneys}>Generate journeys</Primary>} />
          ) : journey && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">{s.journeys.map(j => { const p = s.personas.find(x => x.id === j.personaId); return <button key={j.id} onClick={() => setJourneyId(j.id)} className={cx('px-3.5 py-2 rounded-xl border text-[13.5px] font-semibold cursor-pointer', journey.id === j.id ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white border-slate-200 text-slate-600')}>{p?.name.split(' ')[0]} — {j.scenario}</button>; })}<Button size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={genJourneys}>Regenerate</Button></div>
              <Card className="grid md:grid-cols-3 gap-4"><div><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Persona</p><p className="text-[15px] font-bold text-[#0F172A] mt-0.5">{s.personas.find(p => p.id === journey.personaId)?.name}</p></div><div><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">User goal</p><p className="text-[15px] font-semibold text-[#0F172A] mt-0.5">{journey.goal}</p></div><div><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Expectations</p><p className="text-[15px] text-slate-600 mt-0.5">{journey.expectations}</p></div></Card>
              <div className="overflow-x-auto"><div className="grid gap-3 min-w-[820px]" style={{ gridTemplateColumns: `repeat(${journey.phases.length}, minmax(200px, 1fr))` }}>
                {journey.phases.map((ph, i) => (
                  <div key={ph.name} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-subtle">
                    <div className="px-4 py-3 bg-[#0F172A] text-white flex items-center justify-between"><span className="text-[13.5px] font-bold uppercase tracking-wider">{i + 1}. {ph.name}</span><EmotionIcon n={ph.emotion.score} /></div>
                    <div className="p-4 space-y-4 text-[13.5px]">
                      {([['Actions', ph.actions], ['Mindset', ph.mindsets], ['Saying', ph.saying], ['Touchpoints', ph.touchpoints]] as const).map(([k, list]) => <div key={k}><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">{k}</p><ul className="space-y-1">{list.map(x => <li key={x} className="text-slate-700 leading-snug">• {x}</li>)}</ul></div>)}
                      <div><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">Emotion</p><div className="flex items-center gap-2"><div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden"><div className={cx('h-full rounded-full', ph.emotion.score >= 4 ? 'bg-emerald-500' : ph.emotion.score === 3 ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${ph.emotion.score * 20}%` }} /></div><span className="text-[12.5px] font-semibold text-slate-600">{ph.emotion.label}</span></div></div>
                    </div>
                  </div>
                ))}
              </div></div>
              <Card><SectionLabel>Opportunities</SectionLabel><div className="flex flex-wrap gap-2">{journey.opportunities.map(o => <Badge key={o} tone="blue">{o}</Badge>)}</div></Card>
            </div>
          )
        )}

        <div className="border-t border-slate-200 pt-5 flex justify-end"><Primary arrow disabled={s.personas.length === 0} onClick={onComplete}>Continue to wireframes</Primary></div>
      </div>
    </div>
  );
};
