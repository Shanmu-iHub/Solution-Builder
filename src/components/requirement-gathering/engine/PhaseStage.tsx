import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Pencil, Play } from 'lucide-react';
import { StageId } from '../../../services/csuite/types';
import { RunStep, RunTag, Slot, SlotSource, useRGStore } from './RGStore';
import { PhaseRunPanel } from './PhaseRunPanel';
import { AnsweredItem, AnsweredList, EngineQuestion, QuestionCard, QuestionField, QuestionType } from './QuestionCard';
import { CSuitePanel, ExecutiveReviewDef } from './CSuitePanel';
import { matchSkills } from './skillsCatalog';

const MAX_QUESTIONS = 3;

export type SlotValues = (id: string) => string;

export interface SlotDef {
  id: string;
  label: string;
  question?: string;
  reason?: string;
  placeholder?: string;
  // Carry a value forward from earlier stages (never invents one)
  derive?: (v: SlotValues) => string;
  optional?: boolean;
  options?: string[];
  multi?: boolean;
  type?: QuestionType;
  unit?: string;
  // A grouped fill-up question that writes several slots; it is not itself shown in the brief
  fields?: QuestionField[];
}

export interface PreStep {
  id: string;
  label: string;
  tag: RunTag;
  kind?: 'skills' | 'kb' | 'research';
}

export interface ExtraProps {
  value: any;
  onChange: (value: any) => void;
  setReady: (ready: boolean) => void;
  locked: boolean;
}

export interface PhaseConfig {
  id: StageId;
  outputTitle: string;
  steps: PreStep[];
  slots: SlotDef[];
  csuite: string;
  executives?: ExecutiveReviewDef[];
  researchQueries?: (v: SlotValues) => string[];
  gate?: { name: string; roles: string; question: string };
  Extra?: React.FC<ExtraProps>;
}

export interface GateDecision {
  value: 'Approved' | 'Approved with conditions' | 'On hold';
  note: string;
  at: string;
}

type Mode = 'start' | 'running' | 'questions' | 'brief' | 'confirmed';

interface PhaseData {
  mode: Mode;
  steps: RunStep[];
  queue: string[];
  asked: number;
  answered?: AnsweredItem[];
  extra?: any;
  decision?: GateDecision;
}

const SOURCE_LABEL: Record<SlotSource, string> = {
  user: 'Entered by you',
  answer: 'Your answer',
  research: 'Research',
  kb: 'Knowledge base',
  derived: 'From earlier stages',
  assumption: 'Assumption · confirm later'
};

const KIND_RESULT: Record<string, string> = {
  kb: 'No knowledge base connected',
  research: 'Research service not connected · no findings recorded'
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const buildSteps = (config: PhaseConfig): RunStep[] => [
  ...config.steps.map((s) => ({ id: s.id, label: s.label, tag: s.tag, status: 'waiting' as const })),
  { id: 'clarify', label: 'Clarify missing details', tag: 'Question', status: 'waiting' },
  { id: 'output', label: `Generate ${config.outputTitle}`, tag: 'Engine', status: 'waiting' },
  { id: 'save', label: config.gate ? `Record ${config.gate.name} decision` : 'Save confirmed output', tag: 'Database', status: 'waiting' }
];

export const PhaseStage: React.FC<{ config: PhaseConfig }> = ({ config }) => {
  const PHASE = config.id;
  const { slots, setSlot, setStatus, versions, bumpVersion, phaseData, setPhaseData, skills, setSkills } = useRGStore();
  const [data, setData] = useState<PhaseData>(phaseData[PHASE] || { mode: 'start', steps: buildSteps(config), queue: [], asked: 0 });
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [extraReady, setExtraReady] = useState(true);
  const [note, setNote] = useState('');
  const runId = useRef(0);

  useEffect(() => {
    setPhaseData(PHASE, data);
  }, [data, PHASE, setPhaseData]);

  const v: SlotValues = (id) => slots[id]?.value || '';
  const update = (patch: Partial<PhaseData>) => setData((prev) => ({ ...prev, ...patch }));
  const setStep = (id: string, status: RunStep['status'], detail?: string, items?: string[]) =>
    setData((prev) => ({ ...prev, steps: prev.steps.map((s) => (s.id === id ? { ...s, status, detail, items } : s)) }));

  const writeSlot = (def: SlotDef, value: string, source: SlotSource, status: Slot['status']) =>
    setSlot({ id: def.id, phase: PHASE, label: def.label, value, source, status });

  const finishOutput = async () => {
    setStep('output', 'running');
    await wait(400);
    setStep('output', 'done');
    setStep('save', 'paused', config.gate ? 'Waiting for decision' : 'Waiting for your confirmation');
    setStatus(PHASE, 'In Progress');
    update({ mode: 'brief' });
  };

  const run = async () => {
    const id = ++runId.current;
    setStatus(PHASE, 'In Progress');
    update({ mode: 'running', steps: buildSteps(config), queue: [], asked: 0, answered: [], decision: undefined });

    for (const step of config.steps) {
      setStep(step.id, 'running');
      await wait(450);
      if (id !== runId.current) return;
      if (step.kind === 'skills') {
        const matches = matchSkills(Object.values(slots).map((s) => s.value).join(' '));
        setSkills(PHASE, matches);
        setStep(step.id, matches.length ? 'done' : 'not_found', matches.length ? `${matches.length} matched` : 'No matching capabilities', matches.map((m) => m.name));
      } else if (step.kind === 'research') {
        // Queries are planned from confirmed context; nothing is reported as found until a research service returns it
        const queries = (config.researchQueries?.(v) || []).filter(Boolean).slice(0, 3);
        setStep(step.id, 'not_found', KIND_RESULT.research, queries);
      } else if (step.kind) {
        setStep(step.id, 'not_found', KIND_RESULT[step.kind]);
      } else {
        setStep(step.id, 'done');
      }
    }

    // Carry forward what earlier stages already confirmed
    const missing: string[] = [];
    config.slots.forEach((def) => {
      if (def.fields) {
        if (def.fields.some((f) => !slots[f.id]?.value)) missing.push(def.id);
        return;
      }
      if (slots[def.id]?.value) return;
      const carried = def.derive?.(v) || '';
      if (carried) writeSlot(def, carried, 'derived', 'known');
      else if (!def.optional) missing.push(def.id);
    });

    const queue = missing.filter((id) => config.slots.find((s) => s.id === id)?.question).slice(0, MAX_QUESTIONS);
    if (queue.length) {
      setStep('clarify', 'paused', `${queue.length} question${queue.length > 1 ? 's' : ''}`);
      setStatus(PHASE, 'Needs Validation');
      update({ mode: 'questions', queue, asked: 0 });
    } else {
      setStep('clarify', 'skipped');
      await finishOutput();
    }
  };

  // Writes an answer into the store; a grouped question writes each of its field slots
  const writeAnswer = (def: SlotDef, value: string | null) => {
    if (def.fields) {
      const values: Record<string, string> = value ? JSON.parse(value) : {};
      toQuestion(def).fields!.forEach((f) => {
        const target = config.slots.find((s) => s.id === f.id) || { id: f.id, label: f.label };
        const val = values[f.id] ? `${values[f.id]}${f.unit ? ` ${f.unit}` : ''}` : '';
        writeSlot(target as SlotDef, val || 'Not known yet', val ? 'answer' : 'assumption', val ? 'known' : 'assumed');
      });
      return;
    }
    writeSlot(def, value || 'Not known yet', value ? 'answer' : 'assumption', value ? 'known' : 'assumed');
  };

  const recordAnswer = (value: string | null) => {
    const def = config.slots.find((s) => s.id === data.queue[0])!;
    writeAnswer(def, value);
    const queue = data.queue.slice(1);
    const asked = data.asked + 1;
    const answered = [...(data.answered || []), { slotId: def.id, question: def.question!, answer: value }];
    update({ queue, asked, answered });
    if (!queue.length) {
      setStep('clarify', 'done', `${asked} answered`);
      finishOutput();
    }
  };

  const toQuestion = (def: SlotDef): EngineQuestion => ({
    slotId: def.id, question: def.question!, reason: def.reason || `Needed for ${def.label.toLowerCase()}`,
    placeholder: def.placeholder, options: def.options, multi: def.multi, type: def.type, unit: def.unit,
    // Money fields show the currency the user chose
    fields: def.fields?.map((f) => ({ ...f, unit: f.unit === '{currency}' ? (slots.bm_currency?.status === 'known' ? v('bm_currency') : undefined) : f.unit }))
  });
  const questionMap = Object.fromEntries(config.slots.filter((s) => s.question).map((s) => [s.id, toQuestion(s)]));

  const editAnswer = (slotId: string, value: string | null) => {
    writeAnswer(config.slots.find((s) => s.id === slotId)!, value);
    update({ answered: (data.answered || []).map((a) => (a.slotId === slotId ? { ...a, answer: value } : a)) });
  };

  const saveEdit = (def: SlotDef) => {
    const value = draft.trim();
    writeSlot(def, value, 'user', value ? 'known' : 'missing');
    setEditing(null);
  };

  const briefSlots = config.slots.filter((s) => !s.fields);
  const incomplete = briefSlots.some((s) => !s.optional && !v(s.id));
  const assumptions = config.slots.filter((s) => slots[s.id]?.status === 'assumed');
  const locked = data.mode === 'confirmed';
  const version = versions[PHASE];

  const confirm = (decision?: GateDecision['value']) => {
    if (decision === 'On hold') {
      setStep('save', 'done', 'On hold');
      setStatus(PHASE, 'Blocked');
      update({ decision: { value: decision, note, at: new Date().toISOString() } });
      return;
    }
    const ver = bumpVersion(PHASE);
    setStep('save', 'done', decision ? `${decision} · v${ver}` : `Saved v${ver}`);
    setStatus(PHASE, 'Completed');
    update({ mode: 'confirmed', decision: decision ? { value: decision, note, at: new Date().toISOString() } : undefined });
  };

  const reopen = () => {
    setStep('save', 'paused', config.gate ? 'Waiting for decision' : 'Waiting for your confirmation');
    setStatus(PHASE, 'In Progress');
    update({ mode: 'brief', decision: undefined });
  };

  const matched = skills[PHASE] || [];
  const summary = `${matched.length} capabilit${matched.length === 1 ? 'y' : 'ies'} matched · ${data.asked} question${data.asked === 1 ? '' : 's'} asked${locked && version ? ` · saved v${version}` : ''}`;
  const Extra = config.Extra;
  const btn = 'px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="space-y-4 max-w-4xl">
      {data.mode === 'start' ? (
        <section className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Builds on what you confirmed in earlier stages and asks only for what is missing.</p>
          <button type="button" onClick={run} className={`${btn} inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white`}>
            <Play className="w-4 h-4" /> Start
          </button>
        </section>
      ) : (
        <PhaseRunPanel steps={data.steps} summary={summary} />
      )}

      {data.mode !== 'start' && (
        <AnsweredList items={data.answered || []} questions={questionMap} locked={locked} onEdit={editAnswer} />
      )}

      {data.mode === 'questions' && data.queue.length > 0 && (() => {
        const def = config.slots.find((s) => s.id === data.queue[0])!;
        return (
          <QuestionCard
            key={def.id}
            question={toQuestion(def)}
            index={data.asked + 1}
            total={data.asked + data.queue.length}
            onAnswer={recordAnswer}
            onUnknown={() => recordAnswer(null)}
          />
        );
      })()}

      {(data.mode === 'brief' || locked) && (
        <section className="rounded-xl border border-slate-200 bg-white">
          <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">{config.outputTitle}</h2>
            {locked ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> {data.decision?.value || 'Confirmed'} · v{version}
              </span>
            ) : (
              <span className="text-sm text-slate-500">Review and edit, then {config.gate ? 'decide' : 'confirm'}</span>
            )}
          </header>

          <dl className="divide-y divide-slate-100">
            {briefSlots.map((def) => {
              const slot = slots[def.id];
              const assumed = slot?.status === 'assumed';
              return (
                <div key={def.id} className="grid grid-cols-[150px_1fr_auto] gap-3 px-4 py-3 items-start">
                  <dt className="text-sm font-medium text-slate-500 pt-0.5">{def.label}</dt>
                  <dd className="min-w-0">
                    {editing === def.id ? (
                      <div className="space-y-2">
                        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2} autoFocus aria-label={def.label} placeholder={def.placeholder}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
                        <div className="flex gap-2">
                          <button type="button" onClick={() => saveEdit(def)} className="px-3 py-1.5 rounded-lg bg-[#18181b] text-white text-sm font-semibold cursor-pointer">Save</button>
                          <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 cursor-pointer">Cancel</button>
                        </div>
                      </div>
                    ) : slot?.value ? (
                      <>
                        <p className={`text-sm leading-relaxed ${assumed ? 'text-amber-800' : 'text-slate-800'}`}>{slot.value}</p>
                        <span className={`mt-1 inline-block text-xs ${assumed ? 'text-amber-700' : 'text-slate-500'}`}>{SOURCE_LABEL[slot.source]}</span>
                      </>
                    ) : def.optional ? (
                      <p className="text-sm text-slate-400">Not provided</p>
                    ) : (
                      <p className="text-sm text-rose-700">Missing · add this to continue</p>
                    )}
                  </dd>
                  {!locked && editing !== def.id && (
                    <button type="button" aria-label={`Edit ${def.label}`} onClick={() => { setEditing(def.id); setDraft(assumed ? '' : slot?.value || ''); }}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer">
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </dl>

          {Extra && (
            <div className="border-t border-slate-100 px-4 py-4">
              <Extra value={data.extra} onChange={(extra) => update({ extra })} setReady={setExtraReady} locked={locked} />
            </div>
          )}

          <footer className="px-4 py-3 border-t border-slate-100 space-y-3">
            <div className="text-xs text-slate-500 space-y-1">
              {config.steps.some((s) => s.kind === 'skills') && (
                <p>
                  <span className="font-medium text-slate-600">Related capabilities:</span>{' '}
                  {matched.length ? matched.map((m) => `${m.name} ${m.version}`).join(' · ') : 'None found'}
                </p>
              )}
              {assumptions.length > 0 && (
                <p className="text-amber-700">Open assumptions: {assumptions.map((a) => a.label).join(', ')}</p>
              )}
            </div>

            <CSuitePanel stage={PHASE} executives={config.executives || []} note={config.csuite} />

            {locked ? (
              <div className="flex justify-end">
                <button type="button" onClick={reopen} className={`${btn} border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium`}>
                  Edit (creates v{(version || 0) + 1})
                </button>
              </div>
            ) : config.gate ? (
              <div className="rounded-lg border border-slate-200 p-3 space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  {config.gate.name} · {config.gate.roles} · {config.gate.question}
                </p>
                {data.decision?.value === 'On hold' && <p className="text-sm text-rose-700">On hold{data.decision.note ? ` · ${data.decision.note}` : ''}</p>}
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Conditions or reason (optional)" aria-label="Decision note"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
                <div className="flex flex-wrap justify-end gap-2">
                  <button type="button" onClick={() => confirm('On hold')} className={`${btn} border border-slate-200 text-slate-700 hover:bg-slate-50`}>Hold / revise</button>
                  <button type="button" disabled={incomplete || !extraReady || !note.trim()} title="Add the conditions first" onClick={() => confirm('Approved with conditions')}
                    className={`${btn} border border-slate-300 text-slate-800 hover:bg-slate-50`}>Approve with conditions</button>
                  <button type="button" disabled={incomplete || !extraReady || editing !== null} onClick={() => confirm('Approved')} className={`${btn} bg-[#18181b] hover:bg-black text-white`}>
                    Approve
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <button type="button" disabled={incomplete || !extraReady || editing !== null} onClick={() => confirm()} className={`${btn} bg-[#18181b] hover:bg-black text-white`}>
                  Confirm {config.outputTitle}
                </button>
              </div>
            )}
          </footer>
        </section>
      )}
    </div>
  );
};
