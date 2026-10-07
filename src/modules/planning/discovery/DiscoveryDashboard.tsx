import React from 'react';
import { Tone, cx } from '../../ui';
import { CSuiteValidation } from '../shared/CSuiteSummary';

/* Shared dashboard layout for the data-heavy discovery phases (Opportunity, Market, User).
 * A page is a header, a KPI row and a grid of feature cards; each card is made of blocks,
 * and each block is one sub-feature (or a small group of them).
 * Style: neutral surfaces, one blue accent for charts, green / amber / red only where they carry meaning. */

export type Block =
  | { kind: 'facts'; title?: string; rows: { label: string; value: string }[] }
  | { kind: 'list'; title: string; items: string[]; tone?: Tone }
  | { kind: 'chips'; title: string; items: string[]; tone?: Tone }
  | { kind: 'bars'; title: string; rows: { label: string; value: number; note?: string }[]; max?: number }
  | { kind: 'table'; title: string; head: string[]; rows: (string | number)[][]; strongCol?: number }
  | { kind: 'sizing'; title: string; rows: { label: string; value: string; note: string; pct: number }[] }
  | { kind: 'cards'; title: string; items: { name: string; tag: string; rows: { label: string; value: string }[] }[] }
  | { kind: 'journey'; title: string; stages: { name: string; action: string; pain: string; mood: number }[] }
  | { kind: 'matrix'; title: string; xLabel: string; yLabel: string; points: { label: string; x: number; y: number; highlight?: boolean }[]; quadrants?: [string, string, string, string] };

export interface FeatureCardData {
  id: string;
  title: string;
  /** kept for older callers; cards no longer show icons */
  icon?: React.ReactNode;
  /** short status shown in the card header */
  status?: { label: string; tone: Tone };
  wide?: boolean;
  blocks?: Block[];
  /** replaces blocks for cards that need their own interaction */
  custom?: React.ReactNode;
}

export interface Kpi { label: string; value: React.ReactNode; hint?: string; icon?: React.ReactNode; tone?: Tone }

/** Only status colors carry color; every other tone renders neutral. */
const STATUS_STYLE: Partial<Record<Tone, string>> = {
  green: 'text-emerald-700 border-emerald-200 bg-emerald-50',
  amber: 'text-amber-700 border-amber-200 bg-amber-50',
  red: 'text-rose-700 border-rose-200 bg-rose-50',
};
const NEUTRAL_CHIP = 'text-slate-600 border-slate-200 bg-slate-50';

export const Chip: React.FC<{ tone?: Tone; children: React.ReactNode; className?: string }> = ({ tone, children, className }) => (
  <span className={cx('inline-flex items-center rounded-md border px-2 py-0.5 text-[12.5px] font-medium whitespace-nowrap', (tone && STATUS_STYLE[tone]) || NEUTRAL_CHIP, className)}>{children}</span>
);

export const KpiTile: React.FC<{ label: string; value: React.ReactNode; hint?: string }> = ({ label, value, hint }) => (
  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3.5">
    <p className="text-[12.5px] font-medium text-slate-500">{label}</p>
    <p className="text-[22px] font-semibold text-[#0F172A] mt-0.5 tracking-tight leading-tight">{value}</p>
    {hint && <p className="text-[12.5px] text-slate-400 mt-1 leading-snug">{hint}</p>}
  </div>
);

const BlockTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[12px] font-semibold text-slate-500 mb-2">{children}</h4>
);

const QUADRANTS: [string, string, string, string] = ['Plan', 'Do first', 'Avoid', 'Quick win'];

const MOOD = ['', 'Frustrated', 'Negative', 'Neutral', 'Positive', 'Delighted'];

const RenderBlock: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.kind) {
    case 'facts':
      return (
        <div>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <dl className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {block.rows.map(r => (
              <div key={r.label} className="grid grid-cols-[150px_1fr] gap-3 px-3.5 py-2.5 bg-white">
                <dt className="text-[12.5px] font-medium text-slate-500">{r.label}</dt>
                <dd className="text-[13.5px] text-[#0F172A] leading-snug">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case 'list':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <ul className="space-y-1.5">
            {block.items.map(i => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-slate-700 leading-snug">
                <span className="w-1 h-1 rounded-full bg-slate-400 mt-[8px] shrink-0" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'chips':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="flex flex-wrap gap-1.5">{block.items.map(i => <Chip key={i}>{i}</Chip>)}</div>
        </div>
      );
    case 'bars': {
      const max = block.max ?? 10;
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="space-y-3">
            {block.rows.map(r => {
              const pct = Math.max(0, Math.min(100, (r.value / max) * 100));
              return (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between text-[13.5px]">
                    <span className="text-slate-700">{r.label}</span>
                    <span className="font-medium text-[#0F172A] tabular-nums">{r.value}<span className="text-slate-400"> / {max}</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-1.5"><div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${pct}%` }} /></div>
                  {r.note && <p className="text-[12.5px] text-slate-400 mt-1">{r.note}</p>}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    case 'table':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-[13px] text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>{block.head.map(h => <th key={h} className="px-3 py-2 font-medium text-[12px] whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="bg-white">
                    {row.map((c, ci) => <td key={ci} className={cx('px-3 py-2 text-slate-700 align-top', ci === block.strongCol && 'font-semibold text-[#0F172A]', ci === 0 && 'font-medium text-[#0F172A]')}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'sizing':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="space-y-2.5">
            {block.rows.map((r, i) => (
              <div key={r.label}>
                <div className="h-8 rounded-md bg-[#2563EB] flex items-center px-3 text-white text-[13px] font-medium" style={{ width: `${r.pct}%`, minWidth: 96, opacity: 1 - i * 0.25 }}>{r.label} · {r.value}</div>
                <p className="text-[12.5px] text-slate-500 mt-1">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'cards':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {block.items.map(it => (
              <div key={it.name} className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14.5px] font-semibold text-[#0F172A]">{it.name}</span>
                  <Chip>{it.tag}</Chip>
                </div>
                {it.rows.map(r => (
                  <p key={r.label} className="text-[13px] text-slate-600 leading-snug"><span className="font-medium text-slate-400 mr-1.5">{r.label}</span>{r.value}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    case 'journey':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
            {block.stages.map((s, i) => (
              <div key={s.name} className="border border-slate-200 rounded-lg p-3 bg-white space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-medium text-slate-400 tabular-nums">{i + 1}</span>
                  <span className="text-[12px] text-slate-500">{MOOD[s.mood]}</span>
                </div>
                <p className="text-[13.5px] font-semibold text-[#0F172A]">{s.name}</p>
                <p className="text-[12.5px] text-slate-600 leading-snug">{s.action}</p>
                <p className="text-[12.5px] text-slate-500 leading-snug"><span className="font-medium text-slate-600">Pain:</span> {s.pain}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'matrix': {
      const q = block.quadrants ?? QUADRANTS;
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="flex gap-2">
            <div className="flex items-center"><span className="text-[11.5px] font-medium text-slate-400 [writing-mode:vertical-rl] rotate-180">{block.yLabel} →</span></div>
            <div className="flex-1">
              <div className="relative h-52 border border-slate-200 rounded-lg bg-slate-50/60 overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300" />
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300" />
                <span className="absolute top-1.5 left-2 text-[11px] text-slate-400">{q[0]}</span>
                <span className="absolute top-1.5 right-2 text-[11px] text-slate-400">{q[1]}</span>
                <span className="absolute bottom-1.5 left-2 text-[11px] text-slate-400">{q[2]}</span>
                <span className="absolute bottom-1.5 right-2 text-[11px] text-slate-400">{q[3]}</span>
                {block.points.map(p => (
                  <div key={p.label} className="absolute -translate-x-1/2 translate-y-1/2 flex flex-col items-center" style={{ left: `${p.x * 10}%`, bottom: `${p.y * 10}%` }}>
                    <span className={cx('w-3 h-3 rounded-full', p.highlight ? 'bg-[#0F172A]' : 'bg-[#2563EB]')} />
                    <span className={cx('mt-0.5 text-[11px] px-1 rounded whitespace-nowrap bg-white/80', p.highlight ? 'font-semibold text-[#0F172A]' : 'text-slate-600')}>{p.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11.5px] font-medium text-slate-400 mt-1">{block.xLabel} →</p>
            </div>
          </div>
        </div>
      );
    }
  }
};

export const FeatureCard: React.FC<{ card: FeatureCardData; index?: number }> = ({ card }) => (
  <section className={cx('rounded-xl border border-slate-200 bg-white overflow-hidden', card.wide && 'xl:col-span-2')}>
    <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-200">
      <h3 className="text-[15px] font-semibold text-[#0F172A] leading-tight">{card.title}</h3>
      {card.status && <Chip>{card.status.label}</Chip>}
    </div>
    <div className="p-5 space-y-5">
      {card.custom ?? card.blocks?.map((b, i) => <RenderBlock key={i} block={b} />)}
    </div>
  </section>
);

export const DiscoveryDashboard: React.FC<{
  phase?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  kpis?: Kpi[];
  cards: FeatureCardData[];
  csuiteStage: string;
  validated: boolean;
}> = ({ phase, title, subtitle, badge, kpis, cards, csuiteStage, validated }) => (
  <div className="space-y-6">
    {title && (
      <div className="flex items-start justify-between gap-4">
        <div>
          {phase && <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">{phase}</div>}
          <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
          {subtitle && <p className="text-[14.5px] text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {badge && <Badge tone="slate" className="shrink-0">{badge}</Badge>}
      </div>
    )}

    {kpis && kpis.length > 0 && (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => <StatTile key={k.label} label={k.label} value={k.value} hint={k.hint} icon={k.icon} tone={k.tone} />)}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
      {cards.map(c => <FeatureCard key={c.id} card={c} />)}
      <CSuiteValidation stageId={csuiteStage} status={validated ? 'Validated' : 'Pending'} />
    </div>
  </div>
);
