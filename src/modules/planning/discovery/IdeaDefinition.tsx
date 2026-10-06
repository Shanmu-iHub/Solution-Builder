import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight, Compass, GitBranch, Lightbulb, ListChecks, Loader2, MessageCircleQuestion, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { Badge, Button, Callout, Card, Input, Textarea, cx, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { IDEA_QUESTIONS, analyzeIdea, makeDirections, makeVision } from '../content';
import { FooterBar, PhaseTitle, Primary, SLOT_LABEL, SLOT_TONE, UnderlineNav, Working } from '../shared';
import { DirectionTag, IdeaAnswer, PlanningState, SlotKey } from '../types';

const STEPS = [
  { key: 'understand' as const, label: 'Understand', icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { key: 'clarify' as const, label: 'Clarify', icon: <MessageCircleQuestion className="w-3.5 h-3.5" /> },
  { key: 'directions' as const, label: 'Directions', icon: <GitBranch className="w-3.5 h-3.5" /> },
  { key: 'vision' as const, label: 'Vision', icon: <Compass className="w-3.5 h-3.5" /> },
  { key: 'confirm' as const, label: 'Confirm', icon: <ListChecks className="w-3.5 h-3.5" /> },
];
const CORE: { key: SlotKey; label: string }[] = [{ key: 'idea', label: 'Idea' }, { key: 'problem', label: 'Problem' }, { key: 'users', label: 'Intended Users' }, { key: 'outcome', label: 'Intended Outcome' }];
const EXTRA: { key: SlotKey; label: string }[] = [{ key: 'context', label: 'Context' }, { key: 'use_cases', label: 'Use Cases' }];
const LIST_SLOTS: SlotKey[] = ['users', 'outcome', 'use_cases'];
const TAG: Record<DirectionTag, { label: string; tone: 'green' | 'purple' | 'blue' | 'slate' }> = { recommended: { label: 'Recommended', tone: 'green' }, ambitious: { label: 'Ambitious', tone: 'purple' }, broad_scope: { label: 'Broad scope', tone: 'blue' }, alternative: { label: 'Alternative', tone: 'slate' } };

interface Props { projectId: string; projectName: string; onContinue: () => void }

export const IdeaDefinition: React.FC<Props> = ({ projectId, projectName, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [draftAnswer, setDraftAnswer] = useState<IdeaAnswer>({ value: '' });
  const [visionDraft, setVisionDraft] = useState<string | null>(null);

  const answeredIds = Object.keys(s.answers);
  const question = IDEA_QUESTIONS.find(q => !answeredIds.includes(q.id)) ?? null;
  // pre-fill the suggested answer whenever a new question appears
  React.useEffect(() => { if (question) setDraftAnswer({ value: question.suggested, other: question.suggestedOther ?? '' }); }, [question?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const questionsDone = !question;
  const reachedIdx = s.ideaReached;
  const goto = (step: PlanningState['ideaStep'], reach?: number) => patch(projectId, st => ({ ideaStep: step, ideaReached: Math.max(st.ideaReached, reach ?? STEPS.findIndex(x => x.key === step)) }));
  const selectedDir = s.directions.find(d => d.id === s.selectedDirection) ?? null;
  const required: SlotKey[] = ['idea', 'problem', 'users', 'outcome'];
  const missingReq = required.filter(k => s.slots[k].state === 'missing' || (s.slots[k].state === 'inferred' && !s.slots[k].value));
  const inferredReq = required.filter(k => s.slots[k].state === 'inferred');
  const ready = questionsDone && inferredReq.length === 0 && missingReq.length === 0;

  const analyze = async () => {
    setBusy('analyze');
    await sleep(1300);
    patch(projectId, { slots: analyzeIdea(s.idea), analyzed: true });
    setPanelOpen(true);
    setBusy(null);
  };
  const submitAnswer = (skipped = false) => {
    if (!question) return;
    const value = draftAnswer.value;
    patch(projectId, st => {
      const answers = { ...st.answers, [question.id]: skipped ? { value: '', skipped: true } : { ...draftAnswer } };
      const slots = { ...st.slots };
      if (!skipped) {
        const text = Array.isArray(value) ? value.map(v => question.options.find(o => o.value === v)?.label ?? v).join(', ') : question.options.find(o => o.value === value)?.label ?? String(value);
        const full = draftAnswer.other ? `${text}${text ? ', ' : ''}${draftAnswer.other}` : text;
        slots[question.slot] = { state: 'known', value: full, items: LIST_SLOTS.includes(question.slot) ? full.split(', ') : undefined };
      } else if (slots[question.slot].state === 'missing') slots[question.slot] = { state: 'skipped', value: '' };
      return { answers, slots };
    });
    setDraftAnswer({ value: '' });
  };
  const hasAnswer = question ? (question.type === 'multi_select' ? (draftAnswer.value as string[]).length > 0 : String(draftAnswer.value).trim().length > 0) : false;

  const enterDirections = async () => {
    goto('directions');
    if (s.directions.length === 0) {
      setBusy('directions');
      await sleep(1400);
      patch(projectId, { directions: makeDirections(projectName) });
      setBusy(null);
    }
  };
  const generateVision = async () => {
    setBusy('vision');
    await sleep(1200);
    patch(projectId, { vision: { text: makeVision(projectName, selectedDir?.title ?? 'focused first release'), source: 'ai' } });
    setVisionDraft(null);
    setBusy(null);
  };
  const enterVision = async () => { goto('vision'); if (!s.vision) await generateVision(); };

  /* AI Understanding rows */
  const SlotRow: React.FC<{ k: SlotKey; label: string }> = ({ k, label }) => {
    const slot = s.slots[k];
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState('');
    const isList = LIST_SLOTS.includes(k);
    return (
      <div className="border border-slate-200 rounded-xl p-3 bg-white">
        <div className="flex items-center justify-between gap-2"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">{label}</span><Badge tone={SLOT_TONE[slot.state]}>{SLOT_LABEL[slot.state]}</Badge></div>
        {editing ? (
          <div className="mt-2 space-y-2">
            <Textarea rows={isList ? 4 : 3} value={draft} onChange={e => setDraft(e.target.value)} placeholder={isList ? 'One item per line' : ''} className="!text-[13.5px]" />
            <div className="flex gap-3 text-[12.5px] font-semibold"><button className="text-[#2563EB] cursor-pointer" disabled={!draft.trim()} onClick={() => { const items = isList ? draft.split('\n').map(x => x.trim()).filter(Boolean) : undefined; patch(projectId, st => ({ slots: { ...st.slots, [k]: { state: 'known', value: items ? items.join(', ') : draft.trim(), items } } })); setEditing(false); }}>Save</button><button className="text-slate-500 cursor-pointer" onClick={() => setEditing(false)}>Cancel</button></div>
          </div>
        ) : <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">{slot.value || 'Not yet identified'}</p>}
        {s.analyzed && !editing && (
          <div className="mt-2 flex items-center gap-3 text-[12.5px] font-semibold">
            {slot.state === 'inferred' && slot.value && <button className="text-[#2563EB] cursor-pointer" onClick={() => patch(projectId, st => ({ slots: { ...st.slots, [k]: { ...st.slots[k], state: 'known' } } }))}>Confirm</button>}
            <button className="text-slate-500 hover:text-slate-800 cursor-pointer" onClick={() => { setDraft(isList ? (slot.items ?? []).join('\n') : slot.value); setEditing(true); }}>Edit</button>
          </div>
        )}
      </div>
    );
  };

  const open = panelOpen || (questionsDone && !ready && s.analyzed);

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
        <PhaseTitle eyebrow="Phase · Discovery" title="Idea Definition" />
        <UnderlineNav steps={STEPS} active={s.ideaStep} reached={reachedIdx} onSelect={k => { if (k === 'directions') enterDirections(); else if (k === 'vision') enterVision(); else goto(k); }} />

        <div className="flex flex-col gap-6">
          {s.ideaStep === 'understand' && (
            <div className="flex flex-col gap-5">
              <div><h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Define your idea</h2><p className="text-[15px] text-[#64748B] mt-1">Start with what you have. We’ll structure the idea and clarify only what is missing.</p></div>
              <Card className="!p-0">
                <div className="p-4 flex flex-col gap-3">
                  <textarea value={s.idea} onChange={e => patch(projectId, { idea: e.target.value.slice(0, 3000), analyzed: false })} rows={6} placeholder="e.g. An AI customer support platform for colleges that helps students get faster answers and reduces support staff workload…" className="w-full min-h-[150px] border border-slate-200 rounded-xl p-4 text-[15px] leading-relaxed text-[#0F172A] placeholder:text-slate-400 bg-white hover:border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none resize-y transition" />
                  <div className="text-right text-[11.5px] text-slate-400">{s.idea.length} / 3000</div>
                  <div className="border border-slate-200 rounded-xl bg-slate-50/70 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0"><span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-slate-700"><Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />AI Assistant</span><p className="mt-0.5 text-[12.5px] text-slate-500">We can make the idea clearer without changing its meaning.</p></div>
                      <Button size="sm" icon={<Wand2 className="w-3.5 h-3.5" />} disabled={!s.idea.trim()} onClick={() => { const t = s.idea.trim().replace(/\s+/g, ' '); const c = t.charAt(0).toUpperCase() + t.slice(1); setSuggestion(/[.!?]$/.test(c) ? c : `${c}.`); }}>Suggest rewrite</Button>
                    </div>
                    {suggestion && (
                      <div className="mt-3 border border-slate-200 rounded-xl bg-white p-3">
                        <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Suggested rewrite</span>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-slate-700">{suggestion}</p>
                        <div className="mt-2.5 flex items-center gap-2"><Button size="xs" onClick={() => { patch(projectId, { idea: suggestion, analyzed: false }); setSuggestion(null); }}>Accept rewrite</Button><button className="text-[12.5px] font-semibold text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => setSuggestion(null)}>Keep original</button></div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end pt-1">
                    <Primary arrow loading={busy === 'analyze'} disabled={!s.idea.trim()} onClick={s.analyzed ? () => goto('clarify') : analyze}>{busy === 'analyze' ? 'Analyzing…' : s.analyzed ? 'Continue to Clarify' : 'Analyze idea'}</Primary>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {s.ideaStep === 'clarify' && (
            <div className="flex flex-col gap-5">
              <div><h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Clarify the idea</h2><p className="text-[15px] text-[#64748B] mt-1">We’ll ask only what is needed.</p></div>
              {question ? (
                <Card className="!p-0">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">Question {answeredIds.length + 1}</span><span className="text-[11.5px] uppercase tracking-wider text-slate-400">{answeredIds.length} answered</span></div>
                  <div className="p-4 flex flex-col gap-3">
                    <p className="text-[16px] font-semibold text-[#0F172A]">{question.text}</p>
                    <p className="text-[13.5px] text-slate-500">{question.why}</p>
                    {question.type === 'long_text' && <Textarea rows={5} value={String(draftAnswer.value)} onChange={e => setDraftAnswer({ value: e.target.value })} />}
                    {question.type === 'short_text' && <Input value={String(draftAnswer.value)} onChange={e => setDraftAnswer({ value: e.target.value })} />}
                    {(question.type === 'single_select' || question.type === 'multi_select') && (
                      <div className="flex flex-col gap-2">
                        {[...question.options, ...(question.allowOther ? [{ value: 'other', label: 'Other' }] : [])].map(o => {
                          const multi = question.type === 'multi_select';
                          const cur = draftAnswer.value;
                          const on = multi ? (cur as string[]).includes?.(o.value) : cur === o.value;
                          return (
                            <label key={o.value} className={cx('flex items-center gap-2.5 border rounded-xl px-3 py-2.5 text-[15px] cursor-pointer transition', on ? 'border-[#2563EB] bg-blue-50/60' : 'border-slate-200 hover:border-slate-300')}>
                              <input type={multi ? 'checkbox' : 'radio'} checked={!!on} onChange={() => setDraftAnswer(d => ({ ...d, value: multi ? ((Array.isArray(d.value) ? d.value : []).includes(o.value) ? (d.value as string[]).filter(v => v !== o.value) : [...(Array.isArray(d.value) ? d.value : []), o.value]) : o.value }))} />
                              <span className="text-slate-800">{o.label}</span>
                            </label>
                          );
                        })}
                        {(Array.isArray(draftAnswer.value) ? draftAnswer.value.includes('other') : draftAnswer.value === 'other') && <Input placeholder="Describe your answer" value={draftAnswer.other ?? ''} onChange={e => setDraftAnswer(d => ({ ...d, other: e.target.value }))} />}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      {question.skippable ? <Button onClick={() => submitAnswer(true)}>Skip</Button> : <span />}
                      <Primary arrow disabled={!hasAnswer} onClick={() => submitAnswer(false)}>Next</Primary>
                    </div>
                  </div>
                </Card>
              ) : ready ? (
                <Card><h3 className="text-[17px] font-bold text-[#0F172A]">Clarification complete</h3><p className="text-[15px] text-slate-500 mt-1">Next, explore a few directions this idea could take.</p><div className="flex justify-end mt-4"><Primary onClick={enterDirections}>Continue to directions</Primary></div></Card>
              ) : (
                <Card><h3 className="text-[17px] font-bold text-[#0F172A]">Almost there — please review</h3><p className="text-[15px] text-slate-500 mt-1">Confirm or edit <b className="text-slate-700">{[...inferredReq, ...missingReq].map(k => CORE.find(c => c.key === k)?.label).join(', ')}</b> in AI Understanding below. We suggested it from your idea, so it needs your OK first.</p></Card>
              )}
              {answeredIds.length > 0 && (
                <Card padded={false} className="overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 text-[12.5px] font-bold uppercase tracking-wider text-slate-500">{question ? 'Answered so far' : 'Your answers'}</div>
                  {IDEA_QUESTIONS.filter(q => s.answers[q.id]).map(q => {
                    const a = s.answers[q.id];
                    const txt = a.skipped ? null : Array.isArray(a.value) ? a.value.map(v => q.options.find(o => o.value === v)?.label ?? v).join(', ') : q.options.find(o => o.value === a.value)?.label ?? String(a.value);
                    return <div key={q.id} className="px-4 py-3 border-t border-slate-100 first:border-0"><p className="text-[13.5px] text-slate-500">{q.text}</p><p className="text-[15px] font-semibold text-[#0F172A] mt-0.5">{a.skipped ? <Badge>Skipped</Badge> : `${txt}${a.other ? `, ${a.other}` : ''}`}</p></div>;
                  })}
                </Card>
              )}
            </div>
          )}

          {s.ideaStep === 'directions' && (
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4 flex-wrap"><div><h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Explore directions</h2><p className="text-[15px] text-[#64748B] mt-1">Pick the direction that best matches your intent. You can generate more options.</p></div>
                <div className="flex gap-2"><Button icon={<RefreshCw className="w-3.5 h-3.5" />} disabled={busy === 'directions'} onClick={async () => { setBusy('directions'); await sleep(1100); patch(projectId, { directions: makeDirections(projectName), selectedDirection: null, vision: null }); setBusy(null); }}>Regenerate</Button><Button disabled={s.directions.length >= 4 || busy === 'directions'} onClick={async () => { setBusy('directions'); await sleep(900); patch(projectId, { directions: makeDirections(projectName, true) }); setBusy(null); }}>Generate more</Button></div></div>
              {busy === 'directions' && s.directions.length === 0 ? <Working label="Generating directions…" sub="Exploring alternative ways to shape this idea" /> : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {s.directions.map(d => {
                    const on = s.selectedDirection === d.id;
                    return (
                      <button key={d.id} onClick={() => patch(projectId, { selectedDirection: d.id, vision: s.selectedDirection === d.id ? s.vision : null })} className={cx('text-left rounded-2xl border p-5 transition cursor-pointer bg-white', on ? 'border-[#2563EB] ring-2 ring-blue-100 shadow-card' : 'border-slate-200 hover:border-slate-300 hover:shadow-subtle')}>
                        <div className="flex items-center justify-between mb-3"><Badge tone={TAG[d.tag].tone}>{TAG[d.tag].label}</Badge>{on && <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white grid place-items-center"><Check className="w-3 h-3" strokeWidth={3} /></span>}</div>
                        <h3 className="text-[17px] font-bold text-[#0F172A]">{d.title}</h3>
                        <p className="text-[14.5px] text-slate-600 leading-relaxed mt-1.5">{d.description}</p>
                        <p className="text-[12.5px] text-slate-400 mt-3">Builds on: {d.buildsOn.join(', ')}</p>
                      </button>
                    );
                  })}
                </div>
              )}
              <FooterBar onBack={() => goto('clarify')}><Primary arrow disabled={!s.selectedDirection} onClick={enterVision}>Continue to vision</Primary></FooterBar>
            </div>
          )}

          {s.ideaStep === 'vision' && (
            <div className="flex flex-col gap-5">
              <div><h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Product vision</h2><p className="text-[15px] text-[#64748B] mt-1">What this product aims to be, in one sentence.</p></div>
              {selectedDir && <Callout tone="info" title={`Direction: ${selectedDir.title}`}>{selectedDir.description}</Callout>}
              {busy === 'vision' ? <Working label="Writing vision…" /> : s.vision && (
                <Card className="space-y-3">
                  <div className="flex items-center justify-between"><Badge tone={s.vision.source === 'ai' ? 'purple' : 'blue'}>{s.vision.source === 'ai' ? 'AI draft' : 'Edited by you'}</Badge><Button size="xs" icon={<RefreshCw className="w-3 h-3" />} onClick={generateVision}>Regenerate</Button></div>
                  <Textarea rows={4} value={visionDraft ?? s.vision.text} onChange={e => setVisionDraft(e.target.value)} className="!text-[16px] !leading-relaxed" />
                  {visionDraft !== null && visionDraft !== s.vision.text && <div className="flex items-center justify-between"><p className="text-[13.5px] text-amber-600">Save your changes to continue.</p><Button variant="primary" size="sm" onClick={() => { patch(projectId, { vision: { text: visionDraft, source: 'user_edited' } }); setVisionDraft(null); toast({ title: 'Vision saved' }); }}>Save vision</Button></div>}
                </Card>
              )}
              <FooterBar onBack={() => goto('directions')}><Primary arrow disabled={!s.vision || (visionDraft !== null && visionDraft !== s.vision.text)} onClick={() => goto('confirm')}>Continue</Primary></FooterBar>
            </div>
          )}

          {s.ideaStep === 'confirm' && (
            <div className="flex flex-col gap-5">
              <div><h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">{s.briefConfirmed ? 'Idea Brief confirmed' : 'Review your Idea Brief'}</h2><p className="text-[15px] text-[#64748B] mt-1">{s.briefConfirmed ? 'This is the confirmed summary of your idea.' : 'Check everything below. Confirming saves this as the agreed summary of your idea.'}</p></div>
              <Card className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  {[...CORE, ...EXTRA].map(({ key, label }) => (
                    <div key={key} className="border border-slate-200 rounded-xl p-3.5">
                      <div className="flex items-center justify-between"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">{label}</span><Badge tone={SLOT_TONE[s.slots[key].state]}>{SLOT_LABEL[s.slots[key].state]}</Badge></div>
                      <p className="text-[14.5px] text-slate-700 mt-1.5">{s.slots[key].value || <span className="text-slate-400">Not specified</span>}</p>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-xl p-3.5"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">Selected direction</span><p className="text-[15px] font-semibold text-[#0F172A] mt-1">{selectedDir?.title ?? '—'}</p><p className="text-[13.5px] text-slate-500 mt-0.5">{selectedDir?.description}</p></div>
                  <div className="border border-slate-200 rounded-xl p-3.5"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">Product vision</span><p className="text-[14.5px] text-slate-700 mt-1 leading-relaxed">{s.vision?.text ?? '—'}</p></div>
                </div>
                {missingReq.length > 0 && <Callout tone="warning" title="Needs your input">Some required details still need your confirmation: {missingReq.join(', ')}.</Callout>}
              </Card>
              <FooterBar onBack={() => goto('vision')}>
                {s.briefConfirmed ? (
                  <><Button onClick={() => patch(projectId, { briefConfirmed: false })}>Reopen brief</Button><Primary arrow onClick={onContinue}>Continue to Opportunity &amp; Discovery</Primary></>
                ) : (
                  <Primary loading={busy === 'confirm'} disabled={!ready && missingReq.length > 0} icon={<Check className="w-4 h-4" />} onClick={async () => { setBusy('confirm'); await sleep(800); patch(projectId, { briefConfirmed: true }); setBusy(null); toast({ title: 'Idea Brief confirmed', description: 'v1.0 saved.' }); }}>Confirm brief</Primary>
                )}
              </FooterBar>
            </div>
          )}

          {/* AI Understanding panel */}
          <aside className="border border-slate-200 rounded-2xl bg-slate-50/70">
            <button type="button" onClick={() => setPanelOpen(v => !v)} className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left cursor-pointer" aria-expanded={open}>
              <span className="inline-flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">AI Understanding</span></span>
              {open ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>
            {open && (
              <div className="px-4 pb-4 flex flex-col gap-3">
                {!s.analyzed && <p className="text-[13.5px] text-slate-500">Analyze your idea to see what we understand. Nothing is confirmed until you review it.</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{CORE.map(c => <SlotRow key={c.key} k={c.key} label={c.label} />)}</div>
                <div className="border-t border-slate-200 pt-2">
                  <button type="button" onClick={() => setExtraOpen(v => !v)} className="w-full flex items-center justify-between py-1 text-left cursor-pointer"><span className="text-[12.5px] font-semibold uppercase tracking-wider text-slate-500">Additional context &amp; use cases</span>{extraOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}</button>
                  {extraOpen && <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">{EXTRA.map(c => <SlotRow key={c.key} k={c.key} label={c.label} />)}</div>}
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-400">AI suggestions do not become confirmed information until you accept or edit them.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
