import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { StageId, StageStatus } from '../../../services/csuite/types';
import { Slot, useRGStore } from './RGStore';

export interface CheckContext {
  // Value is present and was not recorded as "I don't know"
  known: (id: string) => boolean;
  num: (id: string) => number | null;
  skillsCount: number;
  statuses: Record<StageId, StageStatus>;
  phaseData: Partial<Record<StageId, any>>;
  slots: Record<string, Slot>;
}

export interface ExecutiveCheck {
  label: string;
  test: (ctx: CheckContext) => boolean;
}

export interface ExecutiveReviewDef {
  role: string;
  focus: string;
  checks: ExecutiveCheck[];
}

export const useCheckContext = (stage: StageId): CheckContext => {
  const { slots, skills, statuses, phaseData } = useRGStore();
  const known = (id: string) => !!slots[id]?.value && slots[id].status !== 'assumed';
  const num = (id: string) => {
    if (!known(id)) return null;
    const n = parseFloat(slots[id].value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : null;
  };
  return { known, num, skillsCount: (skills[stage] || []).length, statuses, phaseData, slots };
};

interface CSuitePanelProps {
  stage: StageId;
  executives: ExecutiveReviewDef[];
  note: string;
}

// Advisory validation per executive. The score is the share of checks that pass on the stage's real content.
export const CSuitePanel: React.FC<CSuitePanelProps> = ({ stage, executives, note }) => {
  const ctx = useCheckContext(stage);
  const [open, setOpen] = useState<string | null>(null);

  if (!executives.length) return <p className="text-xs text-slate-500">C-Suite · {note}</p>;

  return (
    <div className="rounded-lg border border-slate-200">
      <p className="px-3 py-2 text-xs font-semibold text-slate-600 border-b border-slate-100">C-Suite validation · {note}</p>
      <ul className="divide-y divide-slate-100">
        {executives.map((exec) => {
          const results = exec.checks.map((c) => ({ label: c.label, ok: c.test(ctx) }));
          const passed = results.filter((r) => r.ok).length;
          const score = Math.round((passed / results.length) * 100);
          const isOpen = open === exec.role;
          return (
            <li key={exec.role}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : exec.role)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm cursor-pointer hover:bg-slate-50"
              >
                <span className="w-12 font-semibold text-slate-900">{exec.role}</span>
                <span className="flex-1 text-slate-600">{exec.focus}</span>
                <span className="text-xs text-slate-500">{passed}/{results.length} checks</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${score === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
                  {score}% · {score === 100 ? 'Validated' : 'Needs attention'}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {isOpen && (
                <ul className="px-3 pb-2 pl-[4.5rem] space-y-0.5 text-sm">
                  {results.map((r) => (
                    <li key={r.label} className={r.ok ? 'text-slate-700' : 'text-rose-700'}>
                      {r.ok ? '✓' : '✕'} {r.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
