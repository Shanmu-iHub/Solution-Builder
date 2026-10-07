import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, Code2, FileCode2, GitBranch, Loader2, Network, Play, Send, Sparkles, User, ListChecks, FolderUp } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';
import { Badge, Button, Card, ProgressBar, SearchInput, cx, sleep, uid, useToast, GithubIcon as Github } from '../../ui';
import { Markdown } from '../../ui/Markdown';
import { GraphCanvas, colorForType } from '../../knowledge/GraphCanvas';
import { MapEdge, MapNode } from '../../knowledge/types';
import { CodeViewer } from '../workspace/CodeParts';
import { migrationEdges, migrationFiles, migrationNodes, migrationPlan } from '../mockData';
import { FactoryProject, MigrationPlanStep } from '../types';

type View = 'code' | 'graph' | 'plan';
interface Msg { id: string; role: 'user' | 'assistant'; content: string; streaming?: boolean }

const riskTone = { LOW: 'green', MEDIUM: 'amber', HIGH: 'orange', CRITICAL: 'red' } as const;

export const MigrationWorkspace: React.FC<{ project: FactoryProject; onBack: () => void }> = ({ project, onBack }) => {
  const { setCanvasMode } = useNavigation();
  const { toast } = useToast();
  useEffect(() => { setCanvasMode(true); return () => setCanvasMode(false); }, [setCanvasMode]);

  const [view, setView] = useState<View>('code');
  const [active, setActive] = useState(migrationFiles[0].path);
  const [side, setSide] = useState<'split' | 'source' | 'migrated'>('split');
  const [migrated, setMigrated] = useState<string[]>(['models.py', 'services/billing.py']);
  const [steps, setSteps] = useState<MigrationPlanStep[]>(migrationPlan);
  const [planApproved, setPlanApproved] = useState(false);
  const [running, setRunning] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 'a0', role: 'assistant', content: `I indexed **${project.projectName}** — ${migrationFiles.length} files, ${migrationNodes.length} code entities and ${migrationEdges.length} relationships.\n\nTell me the target stack or say **plan** and I’ll propose a migration plan.` },
  ]);
  const [draft, setDraft] = useState('Migrate the next file to FastAPI and keep the behaviour identical.');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [msgs]);

  const file = migrationFiles.find(f => f.path === active)!;
  const isMigrated = migrated.includes(active);
  const doneSteps = steps.filter(s => s.status === 'done').length;
  const pct = Math.round((doneSteps / steps.length) * 100);

  const typeText = async (id: string, text: string) => {
    for (let i = 0; i < text.length; i += 6) {
      setMsgs(m => m.map(x => (x.id === id ? { ...x, content: text.slice(0, i + 6) } : x)));
      await sleep(16);
    }
    setMsgs(m => m.map(x => (x.id === id ? { ...x, content: text, streaming: false } : x)));
  };

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    setBusy(true);
    setMsgs(m => [...m, { id: uid('u'), role: 'user', content: text }]);
    await sleep(350);
    const id = uid('a');
    setMsgs(m => [...m, { id, role: 'assistant', content: '', streaming: true }]);
    const t = text.toLowerCase();
    let reply: string;
    if (/plan|steps|approach/.test(t)) {
      setView('plan');
      reply = `I drafted a ${steps.length}-step plan. The riskiest items are **Decimal money handling** (critical) and the **async session** change (high). Review it in the **Plan** view and approve it to start migrating.`;
    } else if (/migrate|convert|port|translate/.test(t)) {
      const next = migrationFiles.find(f => !migrated.includes(f.path));
      if (next) {
        reply = `Migrating \`${next.path}\` to ${project.targetLanguage || 'the target stack'}…\n\nDone. I replaced Flask-specific constructs with FastAPI equivalents and kept behaviour identical. Compare the two versions in the **Code** view.`;
        setActive(next.path);
        setMigrated(m => [...m, next.path]);
      } else reply = 'Every file in this project has already been migrated. Review the output or ask me to double-check a specific module.';
    } else if (/graph|depend|call/.test(t)) {
      setView('graph');
      reply = `The knowledge graph shows ${migrationNodes.length} entities. \`POST /orders\` is the busiest node: it calls the validator, the billing function and the \`Order\` model.`;
    } else if (/risk|danger|careful/.test(t)) {
      reply = '**Critical:** `calculate_total` uses float rounding — cents can drift. The migrated version uses `Decimal` with HALF_UP.\n\n**High:** the Flask-SQLAlchemy global session is replaced by a per-request async session. Make sure nothing else imports `db` directly.';
    } else {
      reply = `Understood. I’ll keep that in mind while migrating **${project.projectName}**. You can say **plan**, **migrate the next file**, or **show risks**.`;
    }
    await typeText(id, reply);
    setBusy(false);
  };

  const runStep = async (s: MigrationPlanStep) => {
    setRunning(s.id);
    setSteps(list => list.map(x => (x.id === s.id ? { ...x, status: 'in-progress' } : x)));
    await sleep(1700);
    setSteps(list => list.map(x => (x.id === s.id ? { ...x, status: 'done' } : x)));
    setMigrated(m => [...new Set([...m, ...s.files.filter(f => migrationFiles.some(mf => mf.path === f))])]);
    setRunning(null);
    toast({ title: 'Step completed', description: s.title });
  };

  /* knowledge graph */
  const [gq, setGq] = useState('');
  const [nodeTypes, setNodeTypes] = useState<string[]>([]);
  const [edgeTypes, setEdgeTypes] = useState<string[]>([]);
  const graph = useMemo(() => {
    const nodes: MapNode[] = migrationNodes.filter(n => (!nodeTypes.length || nodeTypes.includes(n.type)) && n.label.toLowerCase().includes(gq.toLowerCase())).map(n => ({ id: n.id, type: n.type, label: n.label, description: `${n.description} (${n.file})`, version: null }));
    const keep = new Set(nodes.map(n => n.id));
    const edges: MapEdge[] = migrationEdges.filter(e => keep.has(e.source) && keep.has(e.target) && (!edgeTypes.length || edgeTypes.includes(e.type)));
    return { nodes, edges };
  }, [gq, nodeTypes, edgeTypes]);
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>, v: string) => set(c => (c.includes(v) ? c.filter(x => x !== v) : [...c, v]));

  return (
    <div className="h-full w-full flex flex-col bg-slate-100/60">
      {/* header */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-4 min-w-0">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 hover:text-[#0F172A] cursor-pointer shrink-0"><ArrowLeft className="w-4 h-4" /> Projects</button>
          <span className="w-px h-5 bg-slate-200" />
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-[#0F172A] truncate">{project.projectName}</p>
            <p className="text-[12.5px] text-slate-400 flex items-center gap-1.5 truncate">{project.sourceType === 'upload' ? <FolderUp className="w-3 h-3" /> : <Github className="w-3 h-3" />}{project.sourceRef}</p>
          </div>
          <div className="hidden md:flex items-center gap-2"><Badge>{project.sourceLanguage}</Badge><ArrowRight className="w-3 h-3 text-slate-400" /><Badge tone="blue">{project.targetLanguage}</Badge></div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-[12.5px] text-slate-500"><span className="font-semibold">{migrated.length}/{migrationFiles.length} files</span><ProgressBar value={(migrated.length / migrationFiles.length) * 100} tone="green" className="w-24" /></div>
          <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200">
            {([['code', 'Code', Code2], ['graph', 'Graph', Network], ['plan', 'Plan', ListChecks]] as const).map(([id, label, I]) => (
              <button key={id} onClick={() => setView(id)} className={cx('flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wider transition cursor-pointer', view === id ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-[#0F172A]')}><I className="w-3.5 h-3.5" />{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        {/* main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {view === 'code' && (
            <div className="flex-1 min-h-0 flex">
              <aside className="w-56 shrink-0 border-r border-slate-200 bg-white overflow-auto">
                <p className="px-4 py-3 text-[12.5px] font-bold uppercase tracking-wider text-slate-400">Source files</p>
                {migrationFiles.map(f => (
                  <button key={f.path} onClick={() => setActive(f.path)} className={cx('w-full flex items-center gap-2 px-4 py-2 text-[13.5px] text-left cursor-pointer', active === f.path ? 'bg-blue-50 text-[#1D4ED8] font-semibold' : 'text-slate-600 hover:bg-slate-50')}>
                    <FileCode2 className="w-3.5 h-3.5 shrink-0" /><span className="truncate flex-1">{f.path}</span>
                    {migrated.includes(f.path) ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <Circle className="w-3 h-3 text-slate-300 shrink-0" />}
                  </button>
                ))}
              </aside>
              <div className="flex-1 min-w-0 flex flex-col p-4 gap-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13.5px] text-slate-600">{file.path}</span>
                  <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl">
                    {(['split', 'source', 'migrated'] as const).map(s => <button key={s} onClick={() => setSide(s)} className={cx('px-3 py-1 text-[12.5px] font-semibold rounded-lg capitalize cursor-pointer', side === s ? 'bg-[#0F172A] text-white' : 'text-slate-500')}>{s === 'migrated' ? 'Migrated output' : s}</button>)}
                  </div>
                </div>
                <div className={cx('flex-1 min-h-0 grid gap-3', side === 'split' ? 'grid-cols-2' : 'grid-cols-1')}>
                  {side !== 'migrated' && (
                    <Card padded={false} className="flex flex-col overflow-hidden min-h-0"><div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70 text-[12.5px] font-bold uppercase tracking-wider text-slate-500">Source · {project.sourceLanguage}</div><CodeViewer code={file.source} className="flex-1 py-2" /></Card>
                  )}
                  {side !== 'source' && (
                    <Card padded={false} className="flex flex-col overflow-hidden min-h-0"><div className="px-3 py-2 border-b border-slate-100 bg-emerald-50/60 text-[12.5px] font-bold uppercase tracking-wider text-emerald-700 flex items-center justify-between">Migrated output · {project.targetLanguage}{isMigrated ? <Badge tone="green">Migrated</Badge> : <Badge tone="amber">Pending</Badge>}</div>
                      {isMigrated ? <CodeViewer code={file.migrated || ''} className="flex-1 py-2" /> : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6"><p className="text-[15px] text-slate-500">Pick a source file from the tree — this one isn’t migrated yet.</p><Button className="mt-3" variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />} onClick={() => send(`migrate ${file.path}`)}>Migrate this file</Button></div>
                      )}
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'graph' && (
            <div className="flex-1 min-h-0 flex flex-col p-4 gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <SearchInput value={gq} onChange={setGq} placeholder="Search graph entities…" className="w-64" />
                <div className="flex flex-wrap items-center gap-1.5"><span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Node types</span>{[...new Set(migrationNodes.map(n => n.type))].map(t => <button key={t} onClick={() => toggle(setNodeTypes, t)} className={cx('inline-flex items-center gap-1.5 text-[13.5px] rounded-full border px-2.5 py-0.5 cursor-pointer', nodeTypes.includes(t) ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold' : 'border-slate-200 bg-white text-slate-600')}><span className="w-2 h-2 rounded-full" style={{ background: colorForType(t) }} />{t}</button>)}</div>
                <div className="flex flex-wrap items-center gap-1.5"><span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Edges</span>{['CALLS', 'IMPORTS', 'READS', 'EXPOSES'].map(t => <button key={t} onClick={() => toggle(setEdgeTypes, t)} className={cx('text-[13.5px] rounded-full border px-2.5 py-0.5 cursor-pointer', edgeTypes.includes(t) ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold' : 'border-slate-200 bg-white text-slate-600')}>{t}</button>)}</div>
              </div>
              <div className="flex-1 min-h-0 rounded-2xl border border-slate-200 bg-white overflow-hidden"><GraphCanvas nodes={graph.nodes} edges={graph.edges} /></div>
            </div>
          )}

          {view === 'plan' && (
            <div className="flex-1 min-h-0 overflow-auto p-6">
              <div className="max-w-3xl mx-auto space-y-4">
                <Card className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0F172A]">Migration plan</h3>
                    <p className="text-[13.5px] text-slate-500 mt-0.5">{doneSteps} of {steps.length} steps complete · {steps.filter(s => s.risk === 'CRITICAL' || s.risk === 'HIGH').length} critical/high risk</p>
                    <ProgressBar value={pct} tone="green" className="mt-3 w-64" />
                  </div>
                  {planApproved ? <Badge tone="green"><Check className="w-3 h-3" />Approved</Badge> : <Button variant="primary" onClick={() => { setPlanApproved(true); toast({ title: 'Plan approved', description: 'You can now run the steps.' }); }}>Approve plan</Button>}
                </Card>
                {steps.map((s, i) => (
                  <Card key={s.id} className="flex gap-4">
                    <div className={cx('w-8 h-8 rounded-full flex items-center justify-center text-[13.5px] font-bold shrink-0', s.status === 'done' ? 'bg-emerald-500 text-white' : s.status === 'in-progress' ? 'bg-blue-100 text-[#2563EB]' : 'bg-slate-100 text-slate-400')}>{s.status === 'done' ? <Check className="w-4 h-4" /> : s.status === 'in-progress' ? <Loader2 className="w-4 h-4 animate-spin" /> : i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap"><p className="text-[15px] font-bold text-[#0F172A]">{s.title}</p><Badge tone={riskTone[s.risk]}>{(s.risk === 'CRITICAL' || s.risk === 'HIGH') && <AlertTriangle className="w-3 h-3" />}{s.risk}</Badge></div>
                      <p className="text-[13.5px] text-slate-500 mt-1 leading-relaxed">{s.detail}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">{s.files.map(f => <Badge key={f} mono>{f}</Badge>)}</div>
                    </div>
                    {s.status === 'pending' && <Button size="sm" disabled={!planApproved || !!running} icon={<Play className="w-3.5 h-3.5" />} onClick={() => runStep(s)}>Run</Button>}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* chat */}
        <aside className="w-[340px] shrink-0 border-l border-slate-200 bg-white flex flex-col">
          <div className="h-12 shrink-0 flex items-center gap-2 px-4 border-b border-slate-200"><GitBranch className="w-4 h-4 text-[#2563EB]" /><span className="text-[13.5px] font-bold uppercase tracking-wider text-[#0F172A]">Migration assistant</span></div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {msgs.map(m => (
              <div key={m.id} className={cx('flex gap-2.5', m.role === 'user' && 'flex-row-reverse')}>
                <div className={cx('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', m.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-[#0F172A] text-white')}>{m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}</div>
                <div className={cx('rounded-2xl px-3.5 py-2.5 text-[14.5px] max-w-[88%]', m.role === 'user' ? 'bg-[#2563EB] text-white' : 'bg-slate-50 border border-slate-200')}>{m.role === 'user' ? m.content : <Markdown source={m.content || '…'} className="[&_p]:my-0" />}{m.streaming && <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />}</div>
              </div>
            ))}
            
          </div>
          <div className="shrink-0 border-t border-slate-200 p-3 space-y-2">
            <div className="flex flex-wrap gap-1.5">{['Plan', 'Migrate the next file', 'Show risks'].map(s => <button key={s} onClick={() => send(s)} disabled={busy} className="text-[12.5px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-[#2563EB]/40 hover:bg-blue-50/50 disabled:opacity-50 cursor-pointer">{s}</button>)}</div>
            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#2563EB]">
              <textarea rows={2} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(draft); setDraft(''); } }} placeholder="Describe the migration or paste code…" className="flex-1 resize-none bg-transparent text-[14.5px] px-2 py-1 focus:outline-none placeholder:text-slate-400" />
              <button onClick={() => { send(draft); setDraft(''); }} disabled={!draft.trim() || busy} className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center disabled:opacity-40 cursor-pointer"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
