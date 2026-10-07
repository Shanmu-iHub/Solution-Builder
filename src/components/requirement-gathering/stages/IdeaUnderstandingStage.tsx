import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Pencil, Sparkles } from 'lucide-react';
import { RunStep, SlotSource, useRGStore } from '../engine/RGStore';
import { PhaseRunPanel } from '../engine/PhaseRunPanel';
import { AnsweredItem, AnsweredList, EngineQuestion, QuestionCard } from '../engine/QuestionCard';
import { matchSkills } from '../engine/skillsCatalog';

const PHASE = 'idea-understanding' as const;
const MAX_QUESTIONS = 3;
const MIN_IDEA_LENGTH = 30;

// The six parts of the confirmed Idea Brief, in question priority order
const BRIEF_SLOTS: { id: string; label: string; question: EngineQuestion }[] = [
  {
    id: 'intended_users',
    label: 'Users',
    question: { slotId: 'intended_users', question: 'Who will use this day to day?', reason: 'Needed to define users', placeholder: 'Describe the users', options: ['Employees', 'Managers / approvers', 'Finance or admin team', 'External customers'], multi: true }
  },
  {
    id: 'problem',
    label: 'Problem',
    question: { slotId: 'problem', question: 'What problem does this solve today?', reason: 'Needed for problem discovery', placeholder: 'What goes wrong or takes too long today?', options: ['Too slow or manual', 'Errors and rework', 'No visibility or tracking', 'Too costly'], multi: true }
  },
  {
    id: 'intended_outcome',
    label: 'Outcome',
    question: { slotId: 'intended_outcome', question: 'What should be different once this works?', reason: 'Needed to measure success', placeholder: 'The result you expect', options: ['Faster turnaround', 'Fewer errors', 'Lower cost', 'Better visibility and reporting'], multi: true }
  },
  {
    id: 'context',
    label: 'Context',
    question: { slotId: 'context', question: 'Where will this be used?', reason: 'Needed to scope research', placeholder: 'Industry, organization type or region', options: ['Internal tool for our organization', 'Product for other businesses (B2B)', 'Consumer app (B2C)', 'Public sector'] }
  },
  {
    id: 'use_cases',
    label: 'Use cases',
    question: { slotId: 'use_cases', question: 'Name 2–3 key things users must be able to do.', reason: 'Needed for product scope', placeholder: 'Key things users must do', options: ['Submit or capture', 'Review and approve', 'Track status', 'Report and analyze'], multi: true }
  }
];

const SOURCE_LABEL: Record<SlotSource, string> = {
  user: 'From your idea',
  answer: 'Your answer',
  research: 'Research',
  kb: 'Knowledge base',
  derived: 'Calculated',
  assumption: 'Assumption · confirm later'
};

// Rule-based extraction from the user's own text — nothing is added that the user did not write
const extractFromIdea = (text: string): Record<string, string> => {
  const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  const find = (re: RegExp, exclude: string[] = []) => sentences.find((s) => re.test(s) && !exclude.includes(s)) || '';
  const unique = (matches: RegExpMatchArray | null) =>
    Array.from(new Set((matches || []).map((m) => m.toLowerCase()))).map((m) => m[0].toUpperCase() + m.slice(1));

  const problem = find(/(struggl|problem|pain|manual|delay|slow|error|lose|lost|losing|wait|difficult|inefficien|spread across|lack|hard to|time-consuming|costly|frustrat|miss)/i);
  // The idea is what the user wants to build; fall back to the first sentence that isn't the problem
  const idea = find(/(want|build|create|app|platform|tool|system|solution|portal)/i, [problem]) || find(/./, [problem]);
  const outcome = find(/(aim|goal|so that|reduce|improve|increase|faster|automate|enable|centrali[sz]e|help)/i, [problem, idea]);
  const users = unique(text.match(/\b(employees?|managers?|admins?|administrators?|staff|customers?|accountants?|finance team|sales reps?|students?|patients?|doctors?|teachers?|drivers?|vendors?|suppliers?|approvers?|technicians?|agents?)\b/gi));
  const context = unique(text.match(/\b(organi[sz]ations?|enterprises?|compan(?:y|ies)|hospitals?|schools?|universit(?:y|ies)|retail|banks?|startups?|government|warehouses?|factor(?:y|ies)|field)\b/gi));
  const useCases = unique(text.match(/\b(submi(?:t|ssion)|captur(?:e|ing)|approv(?:e|als?)|track(?:ing)?|report(?:ing)?|reimburse(?:ment)?|validat(?:e|ion)|schedul(?:e|ing)|book(?:ing)?|upload(?:ing)?|search(?:ing)?|notif(?:y|ications?)|invoic(?:e|ing))\b/gi));

  return {
    idea,
    problem,
    intended_outcome: outcome,
    intended_users: users.join(', '),
    context: context.join(', '),
    use_cases: useCases.join(', ')
  };
};

const IDEA_STEPS: RunStep[] = [
  { id: 'read', label: 'Read your idea', tag: 'Engine', status: 'waiting' },
  { id: 'skills', label: 'Identify existing capabilities', tag: 'Skills', status: 'waiting' },
  { id: 'check', label: 'Check required context', tag: 'Engine', status: 'waiting' },
  { id: 'clarify', label: 'Clarify missing details', tag: 'Question', status: 'waiting' },
  { id: 'brief', label: 'Generate Idea Brief', tag: 'Engine', status: 'waiting' },
  { id: 'save', label: 'Save confirmed brief', tag: 'Database', status: 'waiting' }
];

type Mode = 'describe' | 'running' | 'questions' | 'brief' | 'confirmed';

interface IdeaPhaseData {
  text: string;
  mode: Mode;
  steps: RunStep[];
  queue: string[];
  asked: number;
  answered?: AnsweredItem[];
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const IdeaUnderstandingStage: React.FC = () => {
  const { slots, setSlot, setStatus, versions, bumpVersion, phaseData, setPhaseData, skills, setSkills } = useRGStore();
  const saved: IdeaPhaseData = phaseData[PHASE] || { text: '', mode: 'describe', steps: IDEA_STEPS, queue: [], asked: 0 };
  const [data, setData] = useState<IdeaPhaseData>(saved);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const runId = useRef(0);

  // Keep phase progress in the shared store so it survives navigation
  useEffect(() => {
    setPhaseData(PHASE, data);
  }, [data, setPhaseData]);

  const update = (patch: Partial<IdeaPhaseData>) => setData((prev) => ({ ...prev, ...patch }));
  const setStep = (id: string, status: RunStep['status'], detail?: string, items?: string[]) =>
    setData((prev) => ({ ...prev, steps: prev.steps.map((s) => (s.id === id ? { ...s, status, detail, items } : s)) }));

  const missingSlots = (values: Record<string, string>) => BRIEF_SLOTS.filter((s) => !values[s.id]).map((s) => s.id);

  const analyze = async () => {
    const id = ++runId.current;
    const text = data.text.trim();
    setStatus(PHASE, 'In Progress');
    update({ mode: 'running', steps: IDEA_STEPS, queue: [], asked: 0, answered: [] });

    setStep('read', 'running');
    await wait(500);
    const values = extractFromIdea(text);
    if (id !== runId.current) return;
    setSlot({ id: 'idea', phase: PHASE, label: 'Idea', value: values.idea, source: 'user', status: 'known' });
    BRIEF_SLOTS.forEach((s) =>
      setSlot({ id: s.id, phase: PHASE, label: s.label, value: values[s.id], source: 'user', status: values[s.id] ? 'known' : 'missing' })
    );
    setStep('read', 'done');

    setStep('skills', 'running');
    await wait(500);
    const matches = matchSkills(text);
    setSkills(PHASE, matches);
    setStep('skills', matches.length ? 'done' : 'not_found', matches.length ? `${matches.length} matched` : 'No matching capabilities', matches.map((m) => m.name));

    setStep('check', 'running');
    await wait(400);
    const missing = missingSlots(values);
    setStep('check', 'done', `${6 - missing.length} of 6 found`);

    const queue = missing.slice(0, MAX_QUESTIONS);
    if (queue.length) {
      setStep('clarify', 'paused', `${queue.length} question${queue.length > 1 ? 's' : ''}`);
      setStatus(PHASE, 'Needs Validation');
      update({ mode: 'questions', queue, asked: 0 });
    } else {
      setStep('clarify', 'skipped');
      await finishBrief();
    }
  };

  const finishBrief = async () => {
    setStep('brief', 'running');
    await wait(400);
    setStep('brief', 'done');
    setStep('save', 'paused', 'Waiting for your confirmation');
    setStatus(PHASE, 'In Progress');
    update({ mode: 'brief' });
  };

  const recordAnswer = (slotId: string, value: string | null) => {
    const label = BRIEF_SLOTS.find((s) => s.id === slotId)?.label || slotId;
    setSlot({
      id: slotId,
      phase: PHASE,
      label,
      value: value || 'Not known yet',
      source: value ? 'answer' : 'assumption',
      status: value ? 'known' : 'assumed'
    });
    // Editing an earlier answer only updates it; a new answer advances the queue
    if (data.answered?.some((a) => a.slotId === slotId)) {
      update({ answered: data.answered.map((a) => (a.slotId === slotId ? { ...a, answer: value } : a)) });
      return;
    }
    const queue = data.queue.slice(1);
    const asked = data.asked + 1;
    const question = BRIEF_SLOTS.find((s) => s.id === slotId)!.question.question;
    update({ queue, asked, answered: [...(data.answered || []), { slotId, question, answer: value }] });
    if (!queue.length) {
      setStep('clarify', 'done', `${asked} answered`);
      finishBrief();
    }
  };

  const briefRows = [{ id: 'idea', label: 'Idea' }, ...BRIEF_SLOTS.map((s) => ({ id: s.id, label: s.label }))];
  const incomplete = briefRows.some((r) => !slots[r.id]?.value);
  const version = versions[PHASE];

  const confirm = () => {
    const v = bumpVersion(PHASE);
    setStep('save', 'done', `Saved v${v}`);
    setStatus(PHASE, 'Completed');
    update({ mode: 'confirmed' });
  };

  const reopen = () => {
    setStep('save', 'paused', 'Waiting for your confirmation');
    setStatus(PHASE, 'In Progress');
    update({ mode: 'brief' });
  };

  const saveEdit = (rowId: string, label: string) => {
    const value = draft.trim();
    setSlot({ id: rowId, phase: PHASE, label, value, source: 'user', status: value ? 'known' : 'missing' });
    setEditing(null);
  };

  const matched = skills[PHASE] || [];
  const summary = `${matched.length} capabilit${matched.length === 1 ? 'y' : 'ies'} matched · ${data.asked} question${data.asked === 1 ? '' : 's'} asked${version && data.mode === 'confirmed' ? ` · saved v${version}` : ''}`;

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Step 1 · Describe (collapses to one line once analyzed) */}
      {data.mode === 'describe' ? (
        <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <label htmlFor="idea-text" className="block text-sm font-semibold text-slate-900">
            Describe your idea
          </label>
          <textarea
            id="idea-text"
            value={data.text}
            onChange={(e) => update({ text: e.target.value })}
            rows={6}
            maxLength={3000}
            placeholder="What do you want to build, who is it for, and what problem does it solve?"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">{data.text.length} / 3000</span>
            <button
              type="button"
              onClick={analyze}
              disabled={data.text.trim().length < MIN_IDEA_LENGTH}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#18181b] hover:bg-black text-white text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" /> Analyze idea
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-start gap-3">
          <p className="flex-1 text-sm text-slate-600 line-clamp-2">{data.text}</p>
          {data.mode !== 'running' && (
            <button
              type="button"
              onClick={() => {
                runId.current++;
                setStatus(PHASE, 'In Progress');
                update({ mode: 'describe' });
              }}
              className="text-sm font-medium text-slate-700 hover:underline cursor-pointer shrink-0"
            >
              Edit idea
            </button>
          )}
        </section>
      )}

      {/* Engine run */}
      {data.mode !== 'describe' && <PhaseRunPanel steps={data.steps} summary={summary} />}

      {/* Step 2 · Clarify — answered questions stay visible with Edit, then one open question at a time */}
      {data.mode !== 'describe' && (
        <AnsweredList
          items={data.answered || []}
          questions={Object.fromEntries(BRIEF_SLOTS.map((s) => [s.id, s.question]))}
          locked={data.mode === 'confirmed'}
          onEdit={recordAnswer}
        />
      )}
      {data.mode === 'questions' && data.queue.length > 0 && (
        <QuestionCard
          key={data.queue[0]}
          question={BRIEF_SLOTS.find((s) => s.id === data.queue[0])!.question}
          index={data.asked + 1}
          total={data.asked + data.queue.length}
          onAnswer={(v) => recordAnswer(data.queue[0], v)}
          onUnknown={() => recordAnswer(data.queue[0], null)}
        />
      )}

      {/* Step 3 · Idea Brief */}
      {(data.mode === 'brief' || data.mode === 'confirmed') && (
        <section className="rounded-xl border border-slate-200 bg-white">
          <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Idea Brief</h2>
            {data.mode === 'confirmed' ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Confirmed · v{version}
              </span>
            ) : (
              <span className="text-sm text-slate-500">Review and edit, then confirm</span>
            )}
          </header>

          <dl className="divide-y divide-slate-100">
            {briefRows.map((row) => {
              const slot = slots[row.id];
              const isEditing = editing === row.id;
              const assumed = slot?.status === 'assumed';
              return (
                <div key={row.id} className="grid grid-cols-[110px_1fr_auto] gap-3 px-4 py-3 items-start">
                  <dt className="text-sm font-medium text-slate-500 pt-0.5">{row.label}</dt>
                  <dd className="min-w-0">
                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          rows={2}
                          autoFocus
                          aria-label={row.label}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        <div className="flex gap-2">
                          <button type="button" onClick={() => saveEdit(row.id, row.label)} className="px-3 py-1.5 rounded-lg bg-[#18181b] text-white text-sm font-semibold cursor-pointer">
                            Save
                          </button>
                          <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 cursor-pointer">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : slot?.value ? (
                      <p className={`text-sm leading-relaxed ${assumed ? 'text-amber-800' : 'text-slate-800'}`}>{slot.value}</p>
                    ) : (
                      <p className="text-sm text-rose-700">Missing — add this to confirm</p>
                    )}
                    {!isEditing && slot?.value && (
                      <span className={`mt-1 inline-block text-xs ${assumed ? 'text-amber-700' : 'text-slate-500'}`}>
                        {SOURCE_LABEL[slot.source]}
                      </span>
                    )}
                  </dd>
                  {data.mode === 'brief' && !isEditing && (
                    <button
                      type="button"
                      aria-label={`Edit ${row.label}`}
                      onClick={() => {
                        setEditing(row.id);
                        setDraft(assumed ? '' : slot?.value || '');
                      }}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </dl>

          <footer className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                <span className="font-medium text-slate-600">Related capabilities:</span>{' '}
                {matched.length ? matched.map((m) => `${m.name} ${m.version}`).join(' · ') : 'None found'}
              </p>
              <p>C-Suite · No mandatory approval at this stage</p>
            </div>
            {data.mode === 'brief' ? (
              <button
                type="button"
                onClick={confirm}
                disabled={incomplete || editing !== null}
                className="px-4 py-2 rounded-lg bg-[#18181b] hover:bg-black text-white text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Confirm Idea Brief
              </button>
            ) : (
              <button type="button" onClick={reopen} className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                Edit brief (creates v{(version || 0) + 1})
              </button>
            )}
          </footer>
        </section>
      )}
    </div>
  );
};
