import React, { useState } from 'react';
import { Check, HelpCircle, Pencil } from 'lucide-react';

// text = short fill-up · long = paragraph · number = numeric fill-up
// single = radio (one choice) · multi = checkboxes · fields = several labelled fill-ups in one question
export type QuestionType = 'text' | 'long' | 'number' | 'single' | 'multi' | 'fields';

export interface QuestionField {
  id: string;
  label: string;
  unit?: string;
}

export interface EngineQuestion {
  slotId: string;
  question: string;
  reason: string;
  placeholder?: string;
  type?: QuestionType;
  options?: string[];
  multi?: boolean;
  unit?: string;
  fields?: QuestionField[];
}

export const questionType = (q: EngineQuestion): QuestionType =>
  q.type || (q.fields ? 'fields' : q.options?.length ? (q.multi ? 'multi' : 'single') : 'long');

// Field answers are stored as JSON; this turns them into a readable line
export const formatAnswer = (q: EngineQuestion | undefined, answer: string) => {
  if (!q?.fields) return answer;
  try {
    const values = JSON.parse(answer) as Record<string, string>;
    return q.fields.map((f) => `${f.label}: ${values[f.id] || '—'}${values[f.id] && f.unit ? ` ${f.unit}` : ''}`).join(' · ');
  } catch {
    return answer;
  }
};

interface QuestionCardProps {
  question: EngineQuestion;
  index?: number;
  total?: number;
  initial?: string;
  onAnswer: (value: string) => void;
  onUnknown: () => void;
  onCancel?: () => void;
}

const inputClass = 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300';

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, index, total, initial, onAnswer, onUnknown, onCancel }) => {
  const type = questionType(question);
  const options = question.options || [];
  const parts = (initial || '').split(', ').filter(Boolean);
  const startSelected = parts.filter((p) => options.includes(p));
  const startOther = options.length ? parts.filter((p) => !options.includes(p)).join(', ') : initial || '';
  let startFields: Record<string, string> = {};
  try {
    startFields = type === 'fields' && initial ? JSON.parse(initial) : {};
  } catch {
    startFields = {};
  }

  const [selected, setSelected] = useState<string[]>(startSelected);
  const [other, setOther] = useState(startOther);
  const [otherOn, setOtherOn] = useState(!options.length || !!startOther);
  const [fields, setFields] = useState<Record<string, string>>(startFields);

  const isChoice = type === 'single' || type === 'multi';
  const toggle = (opt: string) => {
    if (type === 'multi') setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
    else {
      setSelected([opt]);
      setOtherOn(false);
    }
  };
  const chooseOther = () => {
    if (type === 'single') setSelected([]);
    setOtherOn(type === 'multi' ? !otherOn : true);
  };

  const answer =
    type === 'fields'
      ? question.fields!.every((f) => fields[f.id]?.trim()) ? JSON.stringify(fields) : ''
      : [...selected, ...(otherOn && other.trim() ? [other.trim()] : [])].join(', ');

  const indicator = (on: boolean) =>
    type === 'multi' ? (
      <span className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center ${on ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'}`}>
        {on && <Check className="w-3 h-3" />}
      </span>
    ) : (
      <span className={`w-4 h-4 shrink-0 rounded-full border flex items-center justify-center ${on ? 'border-slate-900' : 'border-slate-300 bg-white'}`}>
        {on && <span className="w-2 h-2 rounded-full bg-slate-900" />}
      </span>
    );
  const row = (on: boolean) =>
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left text-sm cursor-pointer transition-colors ${on ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:bg-slate-50'}`;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3" aria-live="polite">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
          <HelpCircle className="w-4 h-4" />
          {index && total ? `Question ${index} of ${total}` : 'Edit answer'}
        </span>
        <span>{question.reason}</span>
      </div>

      <p id={`q-${question.slotId}-label`} className="text-base font-semibold text-slate-900">
        {question.question}
        {type === 'multi' && <span className="ml-2 text-xs font-normal text-slate-500">Select all that apply</span>}
        {type === 'single' && <span className="ml-2 text-xs font-normal text-slate-500">Choose one</span>}
      </p>

      {isChoice && (
        <div role={type === 'multi' ? 'group' : 'radiogroup'} aria-labelledby={`q-${question.slotId}-label`} className="space-y-2">
          {options.map((opt) => (
            <button key={opt} type="button" role={type === 'multi' ? 'checkbox' : 'radio'} aria-checked={selected.includes(opt)} onClick={() => toggle(opt)} className={row(selected.includes(opt))}>
              {indicator(selected.includes(opt))}
              <span className="text-slate-800">{opt}</span>
            </button>
          ))}
          <button type="button" role={type === 'multi' ? 'checkbox' : 'radio'} aria-checked={otherOn} onClick={chooseOther} className={row(otherOn)}>
            {indicator(otherOn)}
            <span className="text-slate-800">Other · type your own answer</span>
          </button>
          {otherOn && (
            <input value={other} onChange={(e) => setOther(e.target.value)} placeholder={question.placeholder || 'Type your answer'} aria-label="Your answer" autoFocus className={inputClass} />
          )}
        </div>
      )}

      {type === 'text' && (
        <input value={other} onChange={(e) => setOther(e.target.value)} placeholder={question.placeholder} aria-labelledby={`q-${question.slotId}-label`} autoFocus className={inputClass} />
      )}

      {type === 'long' && (
        <textarea value={other} onChange={(e) => setOther(e.target.value)} placeholder={question.placeholder} aria-labelledby={`q-${question.slotId}-label`} rows={2} autoFocus className={inputClass} />
      )}

      {type === 'number' && (
        <div className="flex items-center gap-2 max-w-xs">
          <input type="number" min={0} value={other} onChange={(e) => setOther(e.target.value)} placeholder={question.placeholder} aria-labelledby={`q-${question.slotId}-label`} autoFocus className={inputClass} />
          {question.unit && <span className="text-sm text-slate-500 shrink-0">{question.unit}</span>}
        </div>
      )}

      {type === 'fields' && (
        <div className="grid sm:grid-cols-2 gap-3">
          {question.fields!.map((f, i) => (
            <label key={f.id} className="block space-y-1">
              <span className="text-sm text-slate-700">{f.label}</span>
              <span className="flex items-center gap-2">
                <input type="number" min={0} value={fields[f.id] || ''} onChange={(e) => setFields((prev) => ({ ...prev, [f.id]: e.target.value }))} autoFocus={i === 0} className={inputClass} />
                {f.unit && <span className="text-sm text-slate-500 shrink-0">{f.unit}</span>}
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-1">
        <button type="button" onClick={onUnknown} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">
          I don't know
        </button>
        <div className="flex gap-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">
              Cancel
            </button>
          )}
          <button
            type="button"
            disabled={!answer}
            onClick={() => onAnswer(answer)}
            className="px-4 py-2 rounded-lg bg-[#18181b] hover:bg-black text-white text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            {onCancel ? 'Save' : 'Continue'}
          </button>
        </div>
      </div>
    </section>
  );
};

export interface AnsweredItem {
  slotId: string;
  question: string;
  answer: string | null;
}

interface AnsweredListProps {
  items: AnsweredItem[];
  questions: Record<string, EngineQuestion>;
  locked?: boolean;
  onEdit: (slotId: string, value: string | null) => void;
}

// Answered questions stay visible as a short Q&A thread, each with Edit
export const AnsweredList: React.FC<AnsweredListProps> = ({ items, questions, locked, onEdit }) => {
  const [editing, setEditing] = useState<string | null>(null);
  if (!items.length) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100" aria-label="Your answers">
      {items.map((item) =>
        editing === item.slotId ? (
          <div key={item.slotId} className="p-2">
            <QuestionCard
              question={questions[item.slotId]}
              initial={item.answer || ''}
              onAnswer={(v) => { onEdit(item.slotId, v); setEditing(null); }}
              onUnknown={() => { onEdit(item.slotId, null); setEditing(null); }}
              onCancel={() => setEditing(null)}
            />
          </div>
        ) : (
          <div key={item.slotId} className="flex items-start gap-3 px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">{item.question}</p>
              <p className={`text-sm ${item.answer ? 'text-slate-900' : 'text-amber-700'}`}>
                {item.answer ? formatAnswer(questions[item.slotId], item.answer) : "I don't know · recorded as an assumption"}
              </p>
            </div>
            {!locked && (
              <button type="button" onClick={() => setEditing(item.slotId)} className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
            )}
          </div>
        )
      )}
    </section>
  );
};
