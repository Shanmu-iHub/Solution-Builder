import React, { useMemo, useState } from 'react';
import { AlertCircle, Check, CheckCircle2, ChevronRight, Circle, Pencil, Plus, RefreshCw, ShieldCheck, Sparkles, Trash2, X, XCircle } from 'lucide-react';
import { Badge, Button, Callout, Card, Dialog, EmptyBlock, Field, Input, ProgressBar, SectionLabel, Select, Textarea, Tone, cx, sleep, uid, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { DIMENSIONS, EVIDENCE_TYPES, PD_QUESTIONS, initialDimensions, makeChains, makeExecutive, makeStatements } from '../content';
import { FooterBar, OriginTag, PhaseTitle, Primary, UnderlineNav, Working } from '../shared';
import { Dimension, DimensionKey, LensKey, PlanningState, RootChain, Statement } from '../types';

const STEPS = [
  { key: 'understand' as const, label: 'Understand' },
  { key: 'root_causes' as const, label: 'Root causes' },
  { key: 'choose' as const, label: 'Choose problem' },
  { key: 'validate' as const, label: 'Validate' },
  { key: 'confirm' as const, label: 'Confirm' },
];
const ORDER = STEPS.map(s => s.key);
const LEVELS: { key: keyof RootChain['levels']; label: string; tone: Tone }[] = [
  { key: 'pain_point', label: 'Pain point', tone: 'amber' }, { key: 'symptom', label: 'Symptom', tone: 'orange' }, { key: 'root_cause', label: 'Root cause', tone: 'red' }, { key: 'underlying_cause', label: 'Underlying cause', tone: 'purple' },
];
const LENS_KEYS: LensKey[] = ['ceo', 'cfo', 'coo', 'cmo'];
const CORE_DIMS: DimensionKey[] = ['affected_users', 'severity', 'frequency', 'current_process', 'business_impact', 'customer_impact'];

const dimLabel = (k: string) => DIMENSIONS.find(d => d.key === k)?.label ?? k;

interface Props { projectId: string; projectName: string; onBack: () => void; onProceed: () => void }

export const ProblemDiscovery: React.FC<Props> = ({ projectId, projectName, onBack, onProceed }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [asked, setAsked] = useState(false);
  const [qDraft, setQDraft] = useState<{ value: string[]; other: string }>({ value: [], other: '' });
  const [editChain, setEditChain] = useState<string | null>(null);
  const [chainDraft, setChainDraft] = useState<RootChain['levels'] | null>(null);
  const [editStatement, setEditStatement] = useState<string | null>(null);
  const [stDraft, setStDraft] = useState('');
  const [evOpen, setEvOpen] = useState(false);
  const EV_DEMO = { description: 'Q2 support ticket export — 12,400 tickets, 31% tagged as repeat contacts', type: 'tickets', source: 'Helpdesk analytics export', supports: ['frequency', 'business_impact'] as string[] };
  const [ev, setEv] = useState(EV_DEMO);
  const [newStatement, setNewStatement] = useState(false);
  const CUSTOM_DEMO = 'Support staff lose roughly 25% of every shift searching for information across disconnected tools, which delays answers and drives repeat contacts.';
  const [custom, setCustom] = useState(CUSTOM_DEMO);

  /* ── derived understanding ── */
  const dims = useMemo(() => {
    const base = initialDimensions(projectName);
    const out = {} as Record<DimensionKey, Dimension>;
    DIMENSIONS.forEach(d => (out[d.key] = { ...d, ...(base[d.key] as Pick<Dimension, 'state' | 'items'>) }));
    PD_QUESTIONS.forEach(q => {
      const a = s.pdAnswers[q.id];
      if (!a) return;
      if (a.skipped) out[q.dimension] = { ...out[q.dimension], state: 'skipped', items: [] };
      else out[q.dimension] = { ...out[q.dimension], state: 'known', items: [{ label: dimLabel(q.dimension), value: [...a.value.map(v => q.options.find(o => o === v) ?? v), a.other].filter(Boolean).join(', '), origin: 'user_confirmed' }] };
    });
    return out;
  }, [s.pdAnswers, projectName]);
  const all = Object.values(dims);
  const known = all.filter(d => d.state === 'known').length;
  const inferred = all.filter(d => d.state === 'inferred').length;
  const missing = all.filter(d => d.state === 'missing').length;
  const skipped = all.filter(d => d.state === 'skipped').length;
  const level = missing === 0 && inferred === 0 ? { label: 'Complete', tone: 'green' as Tone, hint: 'Everything needed is confirmed.' } : known + inferred >= 6 ? { label: 'Sufficient with gaps', tone: 'amber' as Tone, hint: 'Enough to continue; some details are still AI-only or missing.' } : { label: 'Insufficient', tone: 'red' as Tone, hint: 'Answer a few questions to build a solid understanding.' };
  const nextQ = PD_QUESTIONS.find(q => !s.pdAnswers[q.id]);
  React.useEffect(() => { if (nextQ) setQDraft({ value: nextQ.suggested, other: '' }); }, [nextQ?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const answeredQ = PD_QUESTIONS.filter(q => s.pdAnswers[q.id]);

  const idx = ORDER.indexOf(s.pdStep);
  const go = (k: PlanningState['pdStep']) => patch(projectId, st => ({ pdStep: k, pdReached: Math.max(st.pdReached, ORDER.indexOf(k)) }));
  const selected = s.statements.find(x => x.id === s.selectedStatement) ?? null;
  const confirmedVersion = s.versions.find(v => v.status === 'confirmed');

  /* ── validation / gate ── */
  const coveredDims = new Set(s.evidence.flatMap(e => e.supports));
  const coreEvidenced = CORE_DIMS.filter(d => coveredDims.has(d));
  const conditions = [
    { id: 'c1', label: 'A problem statement is selected', passed: !!selected, detail: selected ? 'Statement selected.' : 'Choose a problem statement in the previous step.' },
    { id: 'c2', label: 'At least 2 evidence items', passed: s.evidence.length >= 2, detail: `${s.evidence.length} evidence item(s) provided.` },
    { id: 'c3', label: 'At least 2 core dimensions evidenced', passed: coreEvidenced.length >= 2, detail: `${coreEvidenced.length} core dimension(s) have evidence.` },
    { id: 'c4', label: 'A root-cause chain is confirmed', passed: s.chains.some(c => c.status === 'confirmed'), detail: s.chains.some(c => c.status === 'confirmed') ? 'Confirmed chain found.' : 'Confirm at least one root cause.' },
  ];
  const gatePassed = conditions.every(c => c.passed);
  const coverage = (k: string) => (coveredDims.has(k) ? 'evidenced' : dims[k as DimensionKey]?.state === 'known' ? 'confirmed' : dims[k as DimensionKey]?.state === 'inferred' ? 'inferred' : 'missing');
  const COV_TONE: Record<string, Tone> = { evidenced: 'green', confirmed: 'blue', inferred: 'amber', missing: 'red' };

  const run = async (key: string, ms: number, apply: () => Partial<PlanningState>) => { setBusy(key); await sleep(ms); patch(projectId, apply()); setBusy(null); };

  const answer = (skip: boolean) => {
    if (!nextQ) return;
    patch(projectId, st => ({ pdAnswers: { ...st.pdAnswers, [nextQ.id]: skip ? { value: [], skipped: true } : { value: qDraft.value, other: qDraft.other } } }));
    setQDraft({ value: [], other: '' });
  };

  const setChain = (id: string, p: Partial<RootChain>) => patch(projectId, st => ({ chains: st.chains.map(c => (c.id === id ? { ...c, ...p } : c)) }));
  const setStatement = (id: string, p: Partial<Statement>) => patch(projectId, st => ({ statements: st.statements.map(x => (x.id === id ? { ...x, ...p } : x)) }));

  const confirmProblem = async () => {
    setBusy('confirm');
    await sleep(700);
    const v = { version: `v${s.versions.length + 1}`, status: 'confirmed' as const, statement: selected?.statement ?? '', validation: s.decision?.status ?? null, at: new Date().toISOString() };
    patch(projectId, st => ({ versions: [v, ...st.versions.map(x => ({ ...x, status: 'draft' as const }))] }));
    setBusy(null);
    toast({ title: `Problem ${v.version} confirmed` });
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
        <PhaseTitle eyebrow="Phase · Validation" title="Problem Discovery & Validation" subtitle="Understand and validate the real problem behind your idea." />
        <UnderlineNav steps={STEPS} active={s.pdStep} reached={s.pdReached} onSelect={go} numbered />

        {/* ─────────── 1 · UNDERSTAND ─────────── */}
        {s.pdStep === 'understand' && (
          <>
            <Card className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3"><Badge tone={level.tone}>{level.label}</Badge><p className="text-[15px] text-slate-600">{level.hint}</p></div>
              <dl className="flex gap-6 text-[13.5px]">{([['Known', known], ['AI only', inferred], ['Missing', missing], ['Skipped', skipped]] as const).map(([k, n]) => <div key={k} className="flex flex-col items-center"><dt className="text-slate-400 uppercase tracking-wider text-[11.5px]">{k}</dt><dd className="text-[19px] font-bold text-[#0F172A]">{n}</dd></div>)}</dl>
            </Card>

            <Card className="!p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">Clarification questions</span><span className="text-[11.5px] uppercase tracking-wider text-slate-400">{answeredQ.length} of {PD_QUESTIONS.length} answered</span></div>
              <div className="p-4">
                {!asked && !nextQ ? <p className="text-[15px] text-slate-500">All questions answered — nice work.</p> : !asked ? (
                  <div className="flex items-center justify-between gap-4"><p className="text-[15px] text-slate-600">We’ll ask a few targeted questions to close the gaps in the understanding below.</p><Primary arrow onClick={() => setAsked(true)}>{answeredQ.length ? 'Continue questions' : 'Start questions'}</Primary></div>
                ) : nextQ ? (
                  <div className="space-y-3">
                    <p className="text-[16px] font-semibold text-[#0F172A]">{nextQ.text}</p><p className="text-[13.5px] text-slate-500">{nextQ.help}</p>
                    <div className="flex flex-col gap-2">{nextQ.options.map(o => { const on = qDraft.value.includes(o); return (
                      <label key={o} className={cx('flex items-center gap-2.5 border rounded-xl px-3 py-2.5 text-[15px] cursor-pointer', on ? 'border-[#2563EB] bg-blue-50/60' : 'border-slate-200 hover:border-slate-300')}>
                        <input type={nextQ.multi ? 'checkbox' : 'radio'} checked={on} onChange={() => setQDraft(d => ({ ...d, value: nextQ.multi ? (on ? d.value.filter(v => v !== o) : [...d.value, o]) : [o] }))} />{o}
                      </label>); })}
                      {nextQ.allowOther && <Input placeholder="Other (optional)" value={qDraft.other} onChange={e => setQDraft(d => ({ ...d, other: e.target.value }))} />}
                    </div>
                    <div className="flex items-center justify-between pt-1">{nextQ.skippable ? <Button onClick={() => answer(true)}>Skip</Button> : <span />}<Primary arrow disabled={!qDraft.value.length && !qDraft.other} onClick={() => answer(false)}>Next</Primary></div>
                  </div>
                ) : <p className="text-[15px] text-slate-500">All questions answered.</p>}
              </div>
              {answeredQ.length > 0 && <div className="border-t border-slate-100">{answeredQ.map(q => <div key={q.id} className="px-4 py-3 border-t border-slate-100 first:border-0"><p className="text-[13.5px] text-slate-500">{q.text}</p><p className="text-[15px] font-semibold text-[#0F172A] mt-0.5">{s.pdAnswers[q.id].skipped ? <Badge>Skipped</Badge> : [...s.pdAnswers[q.id].value, s.pdAnswers[q.id].other].filter(Boolean).join(', ')}</p></div>)}</div>}
            </Card>

            <div>
              <SectionLabel>Current understanding</SectionLabel>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {all.map(d => (
                  <div key={d.key} className="bg-white border border-slate-200 rounded-xl p-3.5">
                    <div className="flex items-center justify-between"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">{d.label}{d.required && <span className="text-rose-500 ml-0.5">*</span>}</span><Badge tone={d.state === 'known' ? 'green' : d.state === 'inferred' ? 'amber' : d.state === 'skipped' ? 'slate' : 'red'}>{d.state === 'inferred' ? 'AI only' : d.state}</Badge></div>
                    {d.items.length === 0 ? <p className="text-[13.5px] text-slate-400 mt-1.5">Not yet identified</p> : d.items.map((it, i) => <div key={i} className="mt-1.5 flex items-start justify-between gap-2"><p className="text-[13.5px] text-slate-600 leading-relaxed">{it.value}</p><OriginTag origin={it.origin} /></div>)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ─────────── 2 · ROOT CAUSES ─────────── */}
        {s.pdStep === 'root_causes' && (
          <>
            <Card className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-[15px] font-semibold">Understanding</span><span className="text-[13.5px] text-slate-500">{level.label} · {known} known</span></div><button className="text-[13.5px] font-bold text-[#2563EB]" onClick={() => go('understand')}>Review</button></Card>
            {s.chains.length === 0 ? (
              busy === 'chains' ? <Working label="Tracing root causes…" /> : <EmptyBlock icon={<Sparkles className="w-6 h-6" />} title="No root-cause chains yet" message="Trace each pain point down to its symptom, root cause and underlying cause — grounded in what you confirmed." action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={() => run('chains', 1700, () => ({ chains: makeChains() }))}>Generate root causes</Primary>} />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><SectionLabel>Root-cause chains ({s.chains.filter(c => c.status === 'confirmed').length} confirmed)</SectionLabel><Button size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={() => run('chains', 1200, () => ({ chains: makeChains() }))}>Regenerate</Button></div>
                {s.chains.map(c => (
                  <Card key={c.id} className={cx('space-y-4', c.status === 'confirmed' && '!border-emerald-300 bg-emerald-50/30', c.status === 'rejected' && 'opacity-60')}>
                    <div className="flex items-center justify-between"><Badge tone={c.status === 'confirmed' ? 'green' : c.status === 'rejected' ? 'red' : 'slate'}>{c.status}</Badge>{c.edited && <Badge tone="blue">Edited</Badge>}</div>
                    <div className="grid md:grid-cols-4 gap-3 relative">
                      {LEVELS.map((l, i) => (
                        <div key={l.key} className="relative">
                          <div className="border border-slate-200 bg-white rounded-xl p-3 h-full"><Badge tone={l.tone}>{l.label}</Badge>
                            {editChain === c.id && chainDraft ? <Textarea rows={3} value={chainDraft[l.key]} onChange={e => setChainDraft({ ...chainDraft, [l.key]: e.target.value })} className="!text-[13.5px] mt-2" /> : <p className="text-[14.5px] text-slate-700 mt-2 leading-snug">{c.levels[l.key]}</p>}
                          </div>
                          {i < 3 && <ChevronRight className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 z-10" />}
                        </div>
                      ))}
                    </div>
                    <p className="text-[13.5px] text-slate-500"><b>Rationale:</b> {c.rationale}</p>
                    <div className="flex flex-wrap gap-2">
                      {editChain === c.id ? (<><Button size="sm" variant="primary" onClick={() => { setChain(c.id, { levels: chainDraft!, edited: true }); setEditChain(null); }}>Save</Button><Button size="sm" onClick={() => setEditChain(null)}>Cancel</Button></>) : (<>
                        <Button size="sm" variant={c.status === 'confirmed' ? 'secondary' : 'primary'} icon={<Check className="w-3.5 h-3.5" />} onClick={() => setChain(c.id, { status: c.status === 'confirmed' ? 'proposed' : 'confirmed' })}>{c.status === 'confirmed' ? 'Unconfirm' : 'Confirm'}</Button>
                        <Button size="sm" icon={<Pencil className="w-3.5 h-3.5" />} onClick={() => { setEditChain(c.id); setChainDraft({ ...c.levels }); }}>Edit</Button>
                        <Button size="sm" variant="danger" icon={<X className="w-3.5 h-3.5" />} onClick={() => setChain(c.id, { status: c.status === 'rejected' ? 'proposed' : 'rejected' })}>{c.status === 'rejected' ? 'Restore' : 'Reject'}</Button></>)}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* ─────────── 3 · CHOOSE PROBLEM ─────────── */}
        {s.pdStep === 'choose' && (
          <>
            <Card className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-[15px] font-semibold">Root causes</span><span className="text-[13.5px] text-slate-500">{s.chains.filter(c => c.status === 'confirmed').length} confirmed</span></div><button className="text-[13.5px] font-bold text-[#2563EB]" onClick={() => go('root_causes')}>Review</button></Card>
            <div>
              <div className="flex items-center justify-between mb-3"><SectionLabel>Problem statements</SectionLabel><div className="flex gap-2"><Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => { setCustom(CUSTOM_DEMO); setNewStatement(true); }}>Write your own</Button>{s.statements.length > 0 && <Button size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={() => run('statements', 1200, () => ({ statements: [...makeStatements(projectName), ...s.statements.filter(x => x.source === 'user_written')], executive: null }))}>Regenerate</Button>}</div></div>
              {s.statements.length === 0 ? (
                busy === 'statements' ? <Working label="Drafting problem statements…" /> : <EmptyBlock icon={<Sparkles className="w-6 h-6" />} title="No problem statements yet" message="Generate one statement per perspective — user, business and process — each citing what it relies on." action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={() => run('statements', 1600, () => ({ statements: makeStatements(projectName) }))}>Generate statements</Primary>} />
              ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                  {s.statements.filter(x => x.status !== 'rejected').map(x => {
                    const on = s.selectedStatement === x.id;
                    return (
                      <div key={x.id} className={cx('bg-white rounded-2xl border p-5 space-y-3 transition', on ? 'border-[#2563EB] ring-2 ring-blue-100 shadow-card' : 'border-slate-200')}>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Badge tone="indigo">{x.label}</Badge><Badge tone={x.source === 'ai_generated' ? 'purple' : 'blue'}>{x.source === 'ai_generated' ? 'AI generated' : 'Written by you'}</Badge></div>{on && <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white grid place-items-center"><Check className="w-3 h-3" strokeWidth={3} /></span>}</div>
                        {editStatement === x.id ? <Textarea rows={3} value={stDraft} onChange={e => setStDraft(e.target.value)} /> : <p className="text-[15px] font-semibold text-[#0F172A] leading-snug">{x.statement}</p>}
                        <p className="text-[13.5px] text-slate-600"><b>Why it matters:</b> {x.why}</p>
                        <p className="text-[13.5px] text-slate-600"><b>Affected:</b> {x.affected.join(', ')}</p>
                        {x.uncertainties.length > 0 && <div className="text-[13.5px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><b>Uncertain:</b> {x.uncertainties.join(' ')}</div>}
                        <div className="flex flex-wrap gap-2">
                          {editStatement === x.id ? (<><Button size="sm" variant="primary" onClick={() => { setStatement(x.id, { statement: stDraft }); setEditStatement(null); }}>Save</Button><Button size="sm" onClick={() => setEditStatement(null)}>Cancel</Button></>) : (<>
                            <Button size="sm" variant={on ? 'secondary' : 'primary'} onClick={() => patch(projectId, { selectedStatement: on ? null : x.id, decision: null })}>{on ? 'Selected' : 'Select this problem'}</Button>
                            <Button size="sm" icon={<Pencil className="w-3.5 h-3.5" />} onClick={() => { setEditStatement(x.id); setStDraft(x.statement); }}>Edit</Button>
                            <Button size="sm" variant="danger" icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => { setStatement(x.id, { status: 'rejected' }); if (on) patch(projectId, { selectedStatement: null }); }}>Reject</Button></>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {s.statements.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3"><div><SectionLabel>Executive lenses</SectionLabel><p className="text-[13.5px] text-slate-400 -mt-2">AI-generated perspectives to help you compare statements. They are not evidence.</p></div><Button size="sm" loading={busy === 'exec'} icon={<Sparkles className="w-3.5 h-3.5" />} onClick={() => run('exec', 1500, () => ({ executive: Object.fromEntries(s.statements.filter(x => x.status !== 'rejected').map(x => [x.id, makeExecutive(x.id)])) as PlanningState['executive'] }))}>{s.executive ? 'Re-run analysis' : 'Analyse'}</Button></div>
                {s.executive ? (
                  <div className="space-y-3">
                    {s.statements.filter(x => s.executive![x.id]).map(x => (
                      <Card key={x.id} className="space-y-3"><p className="text-[14.5px] font-bold text-[#0F172A]">{x.label}</p>
                        <div className="grid md:grid-cols-4 gap-3">{LENS_KEYS.map(k => { const l = s.executive![x.id][k]; return (
                          <div key={k} className="border border-slate-200 rounded-xl p-3"><div className="flex items-center justify-between"><span className="text-[13.5px] font-bold text-[#0F172A]">{l.role}</span><span className={cx('text-[19px] font-bold', l.score >= 80 ? 'text-emerald-600' : l.score >= 70 ? 'text-amber-600' : 'text-rose-600')}>{l.score}</span></div><ProgressBar value={l.score} tone={l.score >= 80 ? 'green' : 'amber'} className="my-1.5" /><p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">{l.focus}</p><p className="text-[13.5px] text-slate-600 mt-1 leading-snug">{l.reasoning}</p></div>); })}</div>
                      </Card>
                    ))}
                  </div>
                ) : <p className="text-[15px] text-slate-400 italic">Run the analysis to see how each statement looks from a CEO, CFO, COO and CMO point of view.</p>}
              </div>
            )}
          </>
        )}

        {/* ─────────── 4 · VALIDATE ─────────── */}
        {s.pdStep === 'validate' && (
          <>
            <Card className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="text-[15px] font-semibold">Problem statement</span><span className="text-[13.5px] text-slate-500 truncate max-w-md">{selected ? selected.statement : 'None selected'}</span></div><button className="text-[13.5px] font-bold text-[#2563EB]" onClick={() => go('choose')}>Review</button></Card>
            {!selected && <Callout tone="warning" title="Select a problem first">Go back and choose the statement you want to validate.</Callout>}
            <Card>
              <SectionLabel right={<Button size="sm" variant="primary" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => { setEv({ ...EV_DEMO, description: s.evidence.length ? 'Customer survey (n=640): 58% say answers take too long' : EV_DEMO.description, type: s.evidence.length ? 'survey' : 'tickets', source: s.evidence.length ? 'CX team survey, Q2' : EV_DEMO.source, supports: s.evidence.length ? ['customer_impact', 'severity'] : EV_DEMO.supports }); setEvOpen(true); }}>Add evidence</Button>}>Validation by dimension</SectionLabel>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {CORE_DIMS.map(k => (
                  <div key={k} className="border border-slate-200 rounded-xl p-3.5"><div className="flex items-center justify-between"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">{dimLabel(k)}</span><Badge tone={COV_TONE[coverage(k)]}>{coverage(k)}</Badge></div>
                    <p className="text-[13.5px] text-slate-500 mt-1.5 leading-snug">{dims[k].items[0]?.value ?? 'No information yet.'}</p>
                    {s.evidence.filter(e => e.supports.includes(k)).map(e => <p key={e.id} className="text-[12.5px] text-emerald-700 mt-1">✓ {e.description}</p>)}
                  </div>
                ))}
              </div>
            </Card>
            <Card padded={false} className="overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between"><SectionLabel>Supporting evidence ({s.evidence.length})</SectionLabel></div>
              {s.evidence.length === 0 ? <p className="px-5 pb-5 text-[13.5px] text-slate-400">No evidence yet. Add survey results, ticket data, interviews or reports that support the problem.</p> : (
                <table className="w-full text-[13.5px]"><thead className="bg-slate-50 text-left"><tr><th className="px-5 py-2.5 font-bold text-slate-600">Description</th><th className="px-3 py-2.5 font-bold text-slate-600">Type</th><th className="px-3 py-2.5 font-bold text-slate-600">Source</th><th className="px-3 py-2.5 font-bold text-slate-600">Supports</th><th /></tr></thead>
                  <tbody>{s.evidence.map(e => <tr key={e.id} className="border-t border-slate-100"><td className="px-5 py-3 font-semibold text-[#0F172A]">{e.description}</td><td className="px-3 py-3">{EVIDENCE_TYPES[e.type]}</td><td className="px-3 py-3 text-slate-500">{e.source || '—'}</td><td className="px-3 py-3"><div className="flex flex-wrap gap-1">{e.supports.map(x => <Badge key={x}>{dimLabel(x)}</Badge>)}</div></td><td className="px-3"><button onClick={() => patch(projectId, st => ({ evidence: st.evidence.filter(x => x.id !== e.id), decision: null }))} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button></td></tr>)}</tbody></table>
              )}
            </Card>

            <Card className="space-y-4">
              <SectionLabel icon={<ShieldCheck className="w-3.5 h-3.5" />}>Validation gate</SectionLabel>
              <div className="space-y-2">{conditions.map(c => <div key={c.id} className="flex items-start gap-3 text-[15px]">{c.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-500 mt-0.5" />}<div><p className="font-semibold text-[#0F172A]">{c.label}</p><p className="text-[13.5px] text-slate-500">{c.detail}</p></div></div>)}</div>
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                <Primary loading={busy === 'gate'} disabled={!selected} icon={<ShieldCheck className="w-4 h-4" />} onClick={async () => { setBusy('gate'); await sleep(900); patch(projectId, { decision: { status: gatePassed ? 'validated' : 'needs_more_evidence', note: gatePassed ? 'All gate conditions passed.' : 'Some conditions are not met yet.', decidedAt: new Date().toISOString() } }); setBusy(null); }}>{s.decision ? 'Recalculate' : 'Run validation gate'}</Primary>
                {!gatePassed && selected && <Button onClick={() => patch(projectId, { decision: { status: 'working_assumption', note: 'Proceeding with this problem as a working assumption.', decidedAt: new Date().toISOString() } })}>Proceed as assumption</Button>}
                {s.decision && <Badge tone={s.decision.status === 'validated' ? 'green' : s.decision.status === 'working_assumption' ? 'amber' : 'red'}>{s.decision.status === 'validated' ? 'Validated' : s.decision.status === 'working_assumption' ? 'Working assumption' : 'Needs more evidence'}</Badge>}
              </div>
              {s.decision && <Callout tone={s.decision.status === 'validated' ? 'success' : 'warning'}>{s.decision.note}</Callout>}
            </Card>
          </>
        )}

        {/* ─────────── 5 · CONFIRM ─────────── */}
        {s.pdStep === 'confirm' && (
          <>
            <Card className="space-y-4">
              <div className="flex items-center justify-between"><SectionLabel>Problem summary</SectionLabel>{confirmedVersion && <Badge tone="green"><CheckCircle2 className="w-3 h-3" />{confirmedVersion.version} confirmed</Badge>}</div>
              {selected ? <p className="text-[19px] font-bold text-[#0F172A] leading-snug">{selected.statement}</p> : <Callout tone="warning" title="No problem selected">Choose a problem statement before confirming.</Callout>}
              <div className="grid md:grid-cols-3 gap-3 text-[15px]">
                <div className="border border-slate-200 rounded-xl p-3.5"><p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-400">Validation status</p><p className="font-semibold mt-1">{s.decision ? (s.decision.status === 'validated' ? 'Validated' : s.decision.status === 'working_assumption' ? 'Working assumption' : 'Needs more evidence') : 'Not run yet'}</p></div>
                <div className="border border-slate-200 rounded-xl p-3.5"><p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-400">Evidence</p><p className="font-semibold mt-1">{s.evidence.length} item(s)</p></div>
                <div className="border border-slate-200 rounded-xl p-3.5"><p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-400">Root causes confirmed</p><p className="font-semibold mt-1">{s.chains.filter(c => c.status === 'confirmed').length}</p></div>
              </div>
              {s.decision?.status === 'needs_more_evidence' && <Callout tone="warning" title="Open points">Validation says more evidence is needed. You can add evidence, or proceed as a working assumption in the Validate step.</Callout>}
              <div className="flex gap-2"><Primary loading={busy === 'confirm'} disabled={!selected || !s.decision} icon={<Check className="w-4 h-4" />} onClick={confirmProblem}>{confirmedVersion ? 'Confirm new version' : 'Confirm problem version'}</Primary>{!s.decision && selected && <p className="text-[13.5px] text-amber-600 self-center">Run the validation gate first.</p>}</div>
            </Card>
            <Card padded={false} className="overflow-hidden">
              <div className="px-5 pt-4"><SectionLabel>Version history</SectionLabel></div>
              {s.versions.length === 0 ? <p className="px-5 pb-5 text-[13.5px] text-slate-400">No versions yet.</p> : s.versions.map(v => <div key={v.version} className="px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3"><div className="min-w-0"><p className="text-[15px] font-bold text-[#0F172A]">{v.version} <Badge tone={v.status === 'confirmed' ? 'green' : 'slate'}>{v.status}</Badge></p><p className="text-[13.5px] text-slate-500 truncate">{v.statement}</p></div><span className="text-[12.5px] text-slate-400">{new Date(v.at).toLocaleDateString()}</span></div>)}
            </Card>
          </>
        )}

        <FooterBar onBack={idx === 0 ? onBack : () => go(ORDER[idx - 1])} backLabel={idx === 0 ? 'Back to Opportunity & Discovery' : 'Back'}>
          {idx < ORDER.length - 1 ? <Primary arrow onClick={() => go(ORDER[idx + 1])}>Continue</Primary> : <Primary arrow disabled={!confirmedVersion} title={confirmedVersion ? undefined : 'Confirm the problem version to proceed.'} onClick={onProceed}>Proceed to Solution Discovery</Primary>}
        </FooterBar>
      </div>

      <Dialog open={evOpen} onClose={() => setEvOpen(false)} title="Add evidence" subtitle="Evidence you provide counts toward validation." width="max-w-lg" footer={<><Button onClick={() => setEvOpen(false)}>Cancel</Button><Button variant="primary" disabled={!ev.description.trim() || ev.supports.length === 0} onClick={() => { patch(projectId, st => ({ evidence: [...st.evidence, { id: uid('ev'), description: ev.description.trim(), type: ev.type, source: ev.source, supports: ev.supports, origin: 'user_confirmed' }], decision: null })); setEvOpen(false); }}>Add evidence</Button></>}>
        <div className="space-y-4">
          <Field label="Description" required><Textarea rows={2} value={ev.description} onChange={e => setEv({ ...ev, description: e.target.value })} placeholder="e.g. Q2 support ticket export — 12,400 tickets" /></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="Type"><Select value={ev.type} onChange={e => setEv({ ...ev, type: e.target.value })}>{Object.entries(EVIDENCE_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select></Field><Field label="Source reference"><Input value={ev.source} onChange={e => setEv({ ...ev, source: e.target.value })} placeholder="Team or link" /></Field></div>
          <div className="space-y-2"><span className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">Supports dimensions *</span><div className="flex flex-wrap gap-2">{CORE_DIMS.map(k => { const on = ev.supports.includes(k); return <button key={k} type="button" onClick={() => setEv(e => ({ ...e, supports: on ? e.supports.filter(x => x !== k) : [...e.supports, k] }))} className={cx('text-[13.5px] rounded-full border px-3 py-1 cursor-pointer', on ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-semibold' : 'border-slate-200 text-slate-600')}>{dimLabel(k)}</button>; })}</div></div>
        </div>
      </Dialog>

      <Dialog open={newStatement} onClose={() => setNewStatement(false)} title="Write your own problem statement" width="max-w-lg" footer={<><Button onClick={() => setNewStatement(false)}>Cancel</Button><Button variant="primary" disabled={custom.trim().length < 10} onClick={() => { patch(projectId, st => ({ statements: [...st.statements, { id: uid('st'), perspective: 'custom', label: 'Your perspective', source: 'user_written', status: 'confirmed', statement: custom.trim(), why: 'Written by you.', affected: [], uncertainties: [] }] })); setNewStatement(false); }}>Add statement</Button></>}>
        <Field label="Statement" hint="State the problem, who has it and why it matters."><Textarea rows={4} value={custom} onChange={e => setCustom(e.target.value)} /></Field>
      </Dialog>
    </div>
  );
};
