import React from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Badge, Button, Tone, cx } from '../ui';
import { Origin } from './types';

export const PhaseTitle: React.FC<{ eyebrow: string; title: string; subtitle?: string }> = ({ eyebrow, title, subtitle }) => (
  <div>
    <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-400">{eyebrow}</p>
    <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] mt-2">{title}</h1>
    {subtitle && <p className="text-[15px] text-[#64748B] mt-2 max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

export interface NavStep<T extends string> { key: T; label: string; icon?: React.ReactNode }

/** Underline tab bar with "reached" gating, used by every multi-step planning screen. */
export function UnderlineNav<T extends string>({ steps, active, reached, onSelect, numbered }: { steps: NavStep<T>[]; active: T; reached?: number; onSelect: (k: T) => void; numbered?: boolean }) {
  const activeIdx = steps.findIndex(s => s.key === active);
  const reachedIdx = Math.max(activeIdx, reached ?? activeIdx);
  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-slate-200 overflow-x-auto">
      {steps.map((s, i) => {
        const isActive = s.key === active;
        const done = i < reachedIdx && !isActive;
        const can = reached === undefined || i <= reachedIdx;
        return (
          <button key={s.key} type="button" disabled={!can} onClick={() => can && onSelect(s.key)} aria-current={isActive ? 'step' : undefined}
            className={cx('group flex items-center gap-2 pb-2.5 text-[14.5px] whitespace-nowrap border-b-2 -mb-px transition-colors', isActive ? 'border-[#2563EB] text-[#0F172A] font-bold' : done ? 'border-transparent text-slate-600 hover:text-[#0F172A] font-medium' : 'border-transparent text-slate-400', can && !isActive ? 'cursor-pointer' : 'cursor-default')}>
            {numbered ? (
              <span className={cx('w-6 h-6 rounded-full border grid place-items-center text-[12.5px] font-bold', isActive ? 'bg-[#2563EB] border-[#2563EB] text-white' : done ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300 text-slate-500')}>{done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}</span>
            ) : done ? <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} /> : s.icon}
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}

export const FooterBar: React.FC<{ onBack?: () => void; backLabel?: string; children?: React.ReactNode; note?: React.ReactNode }> = ({ onBack, backLabel = 'Back', children, note }) => (
  <div className="border-t border-slate-200 pt-5 flex items-center justify-between gap-3 flex-wrap">
    {onBack ? <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-[15px] font-semibold text-slate-700 hover:underline cursor-pointer"><ArrowLeft className="w-4 h-4" />{backLabel}</button> : <span />}
    <div className="flex items-center gap-4">{note}{children}</div>
  </div>
);

export const Primary: React.FC<React.ComponentProps<typeof Button> & { arrow?: boolean }> = ({ arrow, children, ...rest }) => (
  <Button variant="primary" {...rest}>{children}{arrow && <ArrowRight className="w-4 h-4" />}</Button>
);

export const Working: React.FC<{ label: string; sub?: string }> = ({ label, sub }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Loader2 className="w-8 h-8 animate-spin text-[#2563EB] mb-4" />
    <p className="text-[13.5px] font-bold uppercase tracking-widest text-[#2563EB] animate-pulse">{label}</p>
    {sub && <p className="text-[13.5px] text-slate-500 mt-2">{sub}</p>}
  </div>
);

const ORIGIN: Record<Origin, { label: string; tone: Tone }> = {
  user_confirmed: { label: 'Confirmed', tone: 'green' },
  source_backed: { label: 'Cited source', tone: 'blue' },
  ai_suggestion: { label: 'AI suggestion', tone: 'purple' },
  ai_inference: { label: 'AI inference', tone: 'purple' },
  ai_estimate: { label: 'AI estimate', tone: 'amber' },
  assumption: { label: 'Assumption', tone: 'orange' },
  missing: { label: 'Missing', tone: 'red' },
};
export const OriginTag: React.FC<{ origin: Origin }> = ({ origin }) => <Badge tone={ORIGIN[origin].tone}>{ORIGIN[origin].label}</Badge>;

export const SLOT_TONE = { known: 'green', inferred: 'amber', missing: 'red', skipped: 'slate' } as const;
export const SLOT_LABEL = { known: 'Known', inferred: 'Inferred', missing: 'Missing', skipped: 'Skipped' } as const;

export const Section: React.FC<{ title: string; hint?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, hint, right, children, className }) => (
  <section className={cx('bg-white border border-slate-200 rounded-2xl shadow-subtle', className)}>
    <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100">
      <div><h3 className="text-[12.5px] font-bold uppercase tracking-wider text-[#475569]">{title}</h3>{hint && <p className="text-[13.5px] text-slate-400 mt-0.5">{hint}</p>}</div>
      {right}
    </div>
    <div className="p-5">{children}</div>
  </section>
);
