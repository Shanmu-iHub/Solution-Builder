import React, { useMemo, useState } from 'react';
import { CheckCircle, CheckCircle2, ChevronDown, ChevronRight, Circle, Loader2, MessageSquare, Rocket, RotateCcw, Sparkles } from 'lucide-react';
import { Badge, Button, Card, Dialog, EmptyBlock, SearchInput, SegmentedControl, Textarea, cx, sleep, useToast } from '../../ui';
import { useNavigation } from '../../../context/NavigationContext';
import { useFactory } from '../../factory/FactoryStore';
import { usePlanning } from '../PlanningStore';
import { makeTasks } from '../content';
import { Primary } from '../shared';
import { EpicNode, FeatureNode, StoryNode, TaskNode } from '../types';

type Level = 'All' | 'Epics' | 'Features' | 'Stories' | 'Tasks';
const PRI = { P0: 'red', P1: 'amber', P2: 'slate' } as const;
const STEPS = ['Documents collected', 'Solution architecture loaded', 'Identifying business capabilities…', 'Generating implementation breakdown'];

const Chevron: React.FC<{ open: boolean }> = ({ open }) => open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />;

const TaskRow: React.FC<{ t: TaskNode; onCycle: () => void }> = ({ t, onCycle }) => (
  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 group">
    <button onClick={onCycle} title="Change status" className="mt-0.5 shrink-0 cursor-pointer">{t.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : t.status === 'in_progress' ? <Loader2 className="w-4 h-4 text-[#2563EB]" /> : <Circle className="w-4 h-4 text-slate-300" />}</button>
    <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="px-1.5 py-0.5 text-[11.5px] font-bold bg-slate-100 text-slate-600 rounded">TASK</span><span className={cx('text-[14.5px] font-semibold', t.status === 'completed' ? 'line-through text-slate-400' : 'text-[#0F172A]')}>{t.title}</span><Badge tone={PRI[t.priority]}>{t.priority}</Badge><Badge>{t.owner}</Badge><span className="text-[12.5px] text-slate-400">{t.hours}h</span></div><p className="text-[13.5px] text-slate-500 mt-0.5">{t.description}</p></div>
  </div>
);

export const TaskBreakdown: React.FC<{ projectId: string; projectName: string; onComplete?: () => void }> = ({ projectId, projectName }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const { setCurrentView } = useNavigation();
  const factory = useFactory();
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState('');
  const [level, setLevel] = useState<Level>('All');
  const [notes, setNotes] = useState('');
  const [notesOpen, setNotesOpen] = useState(false);
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const tog = (id: string) => setClosed(c => ({ ...c, [id]: !c[id] }));
  const tb = s.tasks;

  const generate = async (feedback?: string) => {
    setBusy(true);
    for (let i = 0; i < STEPS.length; i++) { setStep(i); await sleep(700); }
    patch(projectId, { tasks: { epics: makeTasks(), review: 'pending', notes: feedback ?? '' } });
    setBusy(false);
  };

  const counts = useMemo(() => {
    const epics = tb?.epics ?? [];
    const feats = epics.flatMap(e => e.features);
    const stories = feats.flatMap(f => f.stories);
    const tasks = stories.flatMap(st => st.tasks);
    return { epics: epics.length, features: feats.length, stories: stories.length, tasks: tasks.length, hours: tasks.reduce((a, t) => a + t.hours, 0), done: tasks.filter(t => t.status === 'completed').length };
  }, [tb]);

  const cycle = (id: string) => patch(projectId, st => st.tasks ? { tasks: { ...st.tasks, epics: st.tasks.epics.map(e => ({ ...e, features: e.features.map(f => ({ ...f, stories: f.stories.map(sy => ({ ...sy, tasks: sy.tasks.map(t => (t.id === id ? { ...t, status: (t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'completed' : 'todo') as TaskNode['status'] } : t)) })) })) })) } } : {});

  const match = (txt: string) => !q || txt.toLowerCase().includes(q.toLowerCase());
  const storyMatch = (st: StoryNode) => match(st.title) || match(st.statement) || st.tasks.some(t => match(t.title));
  const featMatch = (f: FeatureNode) => match(f.title) || match(f.description) || f.stories.some(storyMatch);
  const epicMatch = (e: EpicNode) => match(e.title) || match(e.description) || e.features.some(featMatch);

  const Tree: React.FC = () => {
    const showEpic = level === 'All' || level === 'Epics';
    const showFeat = level === 'All' || level === 'Features';
    const showStory = level === 'All' || level === 'Stories';
    const row = (id: string, tag: string, tagCls: string, title: string, sub?: string, extra?: string, indent = 0) => (
      <div className="flex items-start gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer" style={{ marginLeft: indent }} onClick={() => tog(id)}>
        <span className="mt-1 text-slate-400"><Chevron open={!closed[id]} /></span>
        <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className={cx('px-1.5 py-0.5 text-[11.5px] font-bold rounded border', tagCls)}>{tag}</span><span className="font-semibold text-[#0F172A] text-[14.5px]">{title}</span>{extra && <span className="text-[13.5px] text-slate-400">{extra}</span>}</div>{sub && <p className="text-[13.5px] text-slate-500 mt-1">{sub}</p>}</div>
      </div>
    );
    return (
      <>
        {tb!.epics.filter(epicMatch).map(e => (
          <div key={e.id} className="mb-2">
            {showEpic && row(e.id, 'EPIC', 'bg-indigo-50 text-indigo-600 border-indigo-100', e.title, e.description, `${e.features.length} features`)}
            {(!closed[e.id] || !showEpic) && e.features.filter(featMatch).map(f => (
              <div key={f.id} className={cx(showEpic && 'ml-6 pl-3 border-l border-slate-200')}>
                {showFeat && row(f.id, 'FEAT', 'bg-blue-50 text-[#2563EB] border-blue-100', f.title, f.description, `${f.stories.length} stories`)}
                {(!closed[f.id] || !showFeat) && f.stories.filter(storyMatch).map(st => (
                  <div key={st.id} className={cx(showFeat && 'ml-6 pl-3 border-l border-slate-100')}>
                    {showStory && row(st.id, 'STORY', 'bg-emerald-50 text-emerald-600 border-emerald-100', st.title, `“${st.statement}”`, `${st.tasks.length} tasks`)}
                    {(!closed[st.id] || !showStory) && level !== 'Epics' && level !== 'Features' && level !== 'Stories' && <div className={cx(showStory && 'ml-6 pl-3 border-l border-slate-100')}>{st.tasks.filter(t => match(t.title) || storyMatch(st)).map(t => <TaskRow key={t.id} t={t} onCycle={() => cycle(t.id)} />)}</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };

  if (busy) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-8 text-center">
        <Loader2 className="w-9 h-9 animate-spin text-[#2563EB] mb-4" /><p className="text-[15px] font-bold text-[#0F172A]">Analyzing solution architecture</p><p className="text-[13.5px] text-slate-500 mt-1">Building development hierarchy from your documents…</p>
        <div className="mt-6 space-y-2 text-left">{STEPS.map((x, i) => <div key={x} className={cx('flex items-center gap-2 text-[13.5px]', i <= step ? 'text-[#0F172A]' : 'text-slate-300')}>{i < step ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : i === step ? <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" /> : <Circle className="w-4 h-4" />}{x}</div>)}</div>
      </div>
    );
  }
  if (!tb) return <div className="h-full bg-slate-50/60 p-8 flex items-center justify-center"><EmptyBlock icon={<Sparkles className="w-6 h-6" />} title="Generate task breakdown" message="Turn the architecture documents into epics, features, user stories and implementation tasks with estimates." action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={() => generate()}>Generate task breakdown</Primary>} /></div>;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[['Epics', counts.epics], ['Features', counts.features], ['User stories', counts.stories], ['Tasks', counts.tasks], ['Estimated hours', counts.hours]].map(([k, v]) => <Card key={k as string} className="!p-4"><p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-500">{k}</p><p className="text-2xl font-bold text-[#0F172A] mt-1">{v}</p></Card>)}
        </div>
        {tb.review === 'changes_requested' && tb.notes && <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3"><MessageSquare className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" /><div><h4 className="text-amber-800 font-bold mb-1">Changes requested</h4><p className="text-amber-700 text-[15px]">{tb.notes}</p><Button size="sm" className="mt-3" icon={<RotateCcw className="w-3 h-3" />} onClick={() => generate(tb.notes)}>Regenerate with feedback</Button></div></div>}
        {tb.review === 'approved' && <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap"><div className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /><div><h4 className="text-emerald-800 font-bold">Breakdown approved</h4><p className="text-emerald-700 text-[15px]">Planning is complete. Hand it to the Solution Factory to start building.</p></div></div><Primary icon={<Rocket className="w-4 h-4" />} onClick={async () => { await factory.createProject('planner-app', { projectName: projectName, description: 'Execution session created from the approved Solution Planner roadmap.' }); toast({ title: 'Sent to Solution Factory', description: 'A planner application session was created.' }); setCurrentView('product-solution-factor'); }}>Send to Solution Factory</Primary></div>}

        <Card padded={false} className="flex flex-col h-[560px] overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 p-3 border-b border-slate-100"><SearchInput value={q} onChange={setQ} placeholder="Search epics, stories, tasks…" className="w-72" /><SegmentedControl value={level} onChange={setLevel} options={(['All', 'Epics', 'Features', 'Stories', 'Tasks'] as Level[]).map(l => ({ id: l, label: l }))} /><span className="ml-auto text-[13.5px] text-slate-400">{counts.done}/{counts.tasks} tasks done · click the circle to change status</span></div>
          <div className="flex-1 overflow-auto p-4 bg-slate-50/40"><Tree /></div>
        </Card>
      </div>
      <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
        <Button disabled={tb.review === 'approved'} icon={<RotateCcw className="w-3.5 h-3.5" />} onClick={() => generate()}>Regenerate</Button>
        <Button disabled={tb.review === 'approved'} icon={<MessageSquare className="w-3.5 h-3.5" />} onClick={() => { setNotes('Combine the authentication and audit features into one platform epic, and add more detail to the database migration and data-retention tasks.'); setNotesOpen(true); }}>Request changes</Button>
        <Button variant="primary" disabled={tb.review === 'approved'} icon={<CheckCircle className="w-3.5 h-3.5" />} onClick={() => { patch(projectId, { tasks: { ...tb, review: 'approved' } }); toast({ title: 'Task breakdown approved' }); }}>{tb.review === 'approved' ? 'Approved' : 'Approve breakdown'}</Button>
      </div>
      <Dialog open={notesOpen} onClose={() => setNotesOpen(false)} title="Request changes" subtitle="Provide instructions for the AI on how to adjust the Task Breakdown." width="max-w-lg" footer={<><Button onClick={() => setNotesOpen(false)}>Cancel</Button><Button variant="primary" disabled={!notes.trim()} onClick={() => { patch(projectId, { tasks: { ...tb, review: 'changes_requested', notes } }); setNotesOpen(false); }}>Submit request</Button></>}>
        <Textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Combine the authentication features into one epic, or add more detail to the database tasks." />
      </Dialog>
    </div>
  );
};
