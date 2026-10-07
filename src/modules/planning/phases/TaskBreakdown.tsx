import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Circle, Loader2 } from 'lucide-react';
import { Button, Card, Dialog, EmptyBlock, SearchInput, SegmentedControl, Textarea, cx, sleep, useToast } from '../../ui';
import { useNavigation } from '../../../context/NavigationContext';
import { useFactory } from '../../factory/FactoryStore';
import { usePlanning } from '../PlanningStore';
import { makeTasks } from '../content';
import { Primary } from '../shared';
import { EpicNode, FeatureNode, StoryNode, TaskNode } from '../types';
import { Chip, KpiTile } from '../discovery/DiscoveryDashboard';

type Level = 'All' | 'Epics' | 'Features' | 'Stories' | 'Tasks';
const PRI = { P0: 'red', P1: 'slate', P2: 'slate' } as const;
const STEPS = ['Documents collected', 'Solution architecture loaded', 'Identifying business capabilities…', 'Generating implementation breakdown'];

const Chevron: React.FC<{ open: boolean }> = ({ open }) => open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />;

const TaskRow: React.FC<{ t: TaskNode; onCycle: () => void }> = ({ t, onCycle }) => (
  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 group">
    <button onClick={onCycle} title="Change status" className="mt-0.5 shrink-0 cursor-pointer">{t.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-slate-700" /> : t.status === 'in_progress' ? <Circle className="w-4 h-4 text-[#2563EB]" strokeWidth={3} /> : <Circle className="w-4 h-4 text-slate-300" />}</button>
    <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="text-[11.5px] font-medium text-slate-400">Task</span><span className={cx('text-[14.5px] font-semibold', t.status === 'completed' ? 'line-through text-slate-400' : 'text-[#0F172A]')}>{t.title}</span><Chip tone={PRI[t.priority]}>{t.priority}</Chip><Chip>{t.owner}</Chip><span className="text-[12.5px] text-slate-400">{t.hours}h</span></div><p className="text-[13.5px] text-slate-500 mt-0.5">{t.description}</p></div>
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
        <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className={cx('px-1.5 py-0.5 text-[11.5px] font-medium rounded border bg-white', tagCls)}>{tag}</span><span className="font-semibold text-[#0F172A] text-[14.5px]">{title}</span>{extra && <span className="text-[13.5px] text-slate-400">{extra}</span>}</div>{sub && <p className="text-[13.5px] text-slate-500 mt-1">{sub}</p>}</div>
      </div>
    );
    return (
      <>
        {tb!.epics.filter(epicMatch).map(e => (
          <div key={e.id} className="mb-2">
            {showEpic && row(e.id, 'Epic', 'text-slate-500 border-slate-200', e.title, e.description, `${e.features.length} features`)}
            {(!closed[e.id] || !showEpic) && e.features.filter(featMatch).map(f => (
              <div key={f.id} className={cx(showEpic && 'ml-6 pl-3 border-l border-slate-200')}>
                {showFeat && row(f.id, 'Feature', 'text-slate-500 border-slate-200', f.title, f.description, `${f.stories.length} stories`)}
                {(!closed[f.id] || !showFeat) && f.stories.filter(storyMatch).map(st => (
                  <div key={st.id} className={cx(showFeat && 'ml-6 pl-3 border-l border-slate-100')}>
                    {showStory && row(st.id, 'Story', 'text-slate-500 border-slate-200', st.title, `“${st.statement}”`, `${st.tasks.length} tasks`)}
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
        <Loader2 className="w-6 h-6 animate-spin text-slate-400 mb-4" /><p className="text-[15px] font-medium text-[#0F172A]">Analyzing solution architecture</p><p className="text-[13.5px] text-slate-500 mt-1">Building development hierarchy from your documents…</p>
        <div className="mt-6 space-y-2 text-left">{STEPS.map((x, i) => <div key={x} className={cx('flex items-center gap-2 text-[13.5px]', i <= step ? 'text-[#0F172A]' : 'text-slate-300')}>{i < step ? <CheckCircle2 className="w-4 h-4 text-slate-700" /> : i === step ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Circle className="w-4 h-4" />}{x}</div>)}</div>
      </div>
    );
  }
  if (!tb) return <div className="h-full bg-slate-50/60 p-8 flex items-center justify-center"><EmptyBlock title="Generate task breakdown" message="Turn the architecture documents into epics, features, user stories and implementation tasks with estimates." action={<Primary onClick={() => generate()}>Generate task breakdown</Primary>} /></div>;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[['Epics', counts.epics], ['Features', counts.features], ['User stories', counts.stories], ['Tasks', counts.tasks], ['Estimated hours', counts.hours]].map(([k, v]) => <KpiTile key={k as string} label={k as string} value={v} />)}
        </div>
        {tb.review === 'changes_requested' && tb.notes && <div className="bg-white border border-slate-200 rounded-xl p-4"><div><h4 className="text-[#0F172A] font-semibold mb-1">Changes requested</h4><p className="text-slate-600 text-[14.5px]">{tb.notes}</p><Button size="sm" className="mt-3" onClick={() => generate(tb.notes)}>Regenerate with feedback</Button></div></div>}
        {tb.review === 'approved' && <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap"><div className="flex gap-3 items-center"><div><h4 className="text-[#0F172A] font-semibold">Breakdown approved</h4><p className="text-slate-600 text-[14.5px]">Planning is complete. Hand it to the Solution Factory to start building.</p></div></div><Primary onClick={async () => { await factory.createProject('planner-app', { projectName: projectName, description: 'Execution session created from the approved Solution Planner roadmap.' }); toast({ title: 'Sent to Solution Factory', description: 'A planner application session was created.' }); setCurrentView('product-solution-factor'); }}>Send to Solution Factory</Primary></div>}

        <div className="flex flex-col h-[560px] overflow-hidden bg-white border border-slate-200 rounded-xl">
          <div className="flex flex-wrap items-center gap-3 p-3 border-b border-slate-100"><SearchInput value={q} onChange={setQ} placeholder="Search epics, stories, tasks…" className="w-72" /><SegmentedControl value={level} onChange={setLevel} options={(['All', 'Epics', 'Features', 'Stories', 'Tasks'] as Level[]).map(l => ({ id: l, label: l }))} /><span className="ml-auto text-[13.5px] text-slate-400">{counts.done}/{counts.tasks} tasks done · click the circle to change status</span></div>
          <div className="flex-1 overflow-auto p-4 bg-slate-50/40"><Tree /></div>
        </div>
      </div>
      <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
        <Button disabled={tb.review === 'approved'} onClick={() => generate()}>Regenerate</Button>
        <Button disabled={tb.review === 'approved'} onClick={() => { setNotes('Combine the authentication and audit features into one platform epic, and add more detail to the database migration and data-retention tasks.'); setNotesOpen(true); }}>Request changes</Button>
        <Button variant="primary" disabled={tb.review === 'approved'} onClick={() => { patch(projectId, { tasks: { ...tb, review: 'approved' } }); toast({ title: 'Task breakdown approved' }); }}>{tb.review === 'approved' ? 'Approved' : 'Approve breakdown'}</Button>
      </div>
      <Dialog open={notesOpen} onClose={() => setNotesOpen(false)} title="Request changes" subtitle="Provide instructions for the AI on how to adjust the Task Breakdown." width="max-w-lg" footer={<><Button onClick={() => setNotesOpen(false)}>Cancel</Button><Button variant="primary" disabled={!notes.trim()} onClick={() => { patch(projectId, { tasks: { ...tb, review: 'changes_requested', notes } }); setNotesOpen(false); }}>Submit request</Button></>}>
        <Textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Combine the authentication features into one epic, or add more detail to the database tasks." />
      </Dialog>
    </div>
  );
};
