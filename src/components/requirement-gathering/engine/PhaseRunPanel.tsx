import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Circle, Loader2, MinusCircle, PauseCircle, SearchX } from 'lucide-react';
import { RunStep, RunStepStatus } from './RGStore';

const STATUS_ICON: Record<RunStepStatus, React.ReactNode> = {
  waiting: <Circle className="w-4 h-4 text-slate-300" />,
  running: <Loader2 className="w-4 h-4 text-slate-700 animate-spin" />,
  done: <Check className="w-4 h-4 text-emerald-600" />,
  paused: <PauseCircle className="w-4 h-4 text-amber-600" />,
  not_found: <SearchX className="w-4 h-4 text-amber-600" />,
  skipped: <MinusCircle className="w-4 h-4 text-slate-400" />
};

const STATUS_TEXT: Record<RunStepStatus, string> = {
  waiting: 'Waiting',
  running: 'Running',
  done: 'Done',
  paused: 'Waiting for you',
  not_found: 'Not found',
  skipped: 'Not needed'
};

interface PhaseRunPanelProps {
  steps: RunStep[];
  summary?: string;
}

// Shows the phase engine steps as they run, then collapses to one summary line
export const PhaseRunPanel: React.FC<PhaseRunPanelProps> = ({ steps, summary }) => {
  const isActive = steps.some((s) => s.status === 'running' || s.status === 'paused');
  const [open, setOpen] = useState(false);
  const expanded = isActive || open;

  return (
    <section className="rounded-xl border border-slate-200 bg-white" aria-label="Phase run">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={isActive}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer disabled:cursor-default"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          {isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-emerald-600" />}
          {isActive ? 'Working…' : summary || 'Run complete'}
        </span>
        {!isActive && (open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />)}
      </button>

      {expanded && (
        <ol className="border-t border-slate-100 px-4 py-2">
          {steps.map((step) => (
            <li key={step.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-sm">
              {STATUS_ICON[step.status]}
              <span className={step.status === 'waiting' ? 'text-slate-400' : 'text-slate-800'}>{step.label}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{step.tag}</span>
              <span className="ml-auto text-xs text-slate-500">{step.detail || STATUS_TEXT[step.status]}</span>
              {step.items && step.items.length > 0 && (
                <span className="basis-full pl-7 flex flex-wrap gap-1.5">
                  {step.items.map((item) => (
                    <span key={item} className="text-xs px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">{item}</span>
                  ))}
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};
