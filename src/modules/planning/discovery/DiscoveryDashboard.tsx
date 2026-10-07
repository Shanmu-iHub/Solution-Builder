import React from 'react';
import { Badge, Card, CSuiteValidation, ProgressBar, StatTile, Tone, cx } from '../../ui';

/* Shared dashboard layout for the data-heavy discovery phases (Opportunity, Market, User).
 * A page is a header, a KPI row and a grid of feature cards; each card is made of blocks,
 * and each block is one sub-feature (or a small group of them). */

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
  icon: React.ReactNode;
  /** short status shown in the card header */
  status?: { label: string; tone: Tone };
  wide?: boolean;
  blocks?: Block[];
  /** replaces blocks for cards that need their own interaction */
  custom?: React.ReactNode;
}

export interface Kpi { label: string; value: React.ReactNode; hint?: string; icon: React.ReactNode; tone?: Tone }

const BlockTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">{children}</h4>
);

const tone2dot: Record<string, string> = { slate: 'bg-slate-400', blue: 'bg-blue-500', green: 'bg-emerald-500', amber: 'bg-amber-500', red: 'bg-rose-500', indigo: 'bg-indigo-500', purple: 'bg-purple-500', teal: 'bg-teal-500', orange: 'bg-orange-500' };

const QUADRANTS: [string, string, string, string] = ['Plan', 'Do first', 'Avoid', 'Quick win'];

const moodEmoji = (m: number) => (m >= 4 ? '😀' : m === 3 ? '😐' : m === 2 ? '😕' : '😣');

const RenderBlock: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.kind) {
    case 'facts':
      return (
        <div>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <dl className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {block.rows.map(r => (
              <div key={r.label} className="grid grid-cols-[150px_1fr] gap-3 px-3.5 py-2.5 bg-white">
                <dt className="text-[12.5px] font-bold text-slate-500">{r.label}</dt>
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
                <span className={cx('w-1.5 h-1.5 rounded-full mt-[7px] shrink-0', tone2dot[block.tone ?? 'blue'])} />
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
          <div className="flex flex-wrap gap-1.5">{block.items.map(i => <Badge key={i} tone={block.tone ?? 'slate'}>{i}</Badge>)}</div>
        </div>
      );
    case 'bars': {
      const max = block.max ?? 10;
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="space-y-2.5">
            {block.rows.map(r => {
              const pct = (r.value / max) * 100;
              return (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between text-[13.5px]">
                    <span className="font-semibold text-slate-700">{r.label}</span>
                    <span className="font-mono font-bold text-[#0F172A]">{r.value}<span className="text-slate-400">/{max}</span></span>
                  </div>
                  <ProgressBar value={pct} tone={pct >= 75 ? 'green' : pct >= 50 ? 'blue' : 'amber'} className="mt-1" />
                  {r.note && <p className="text-[12.5px] text-slate-400 mt-0.5">{r.note}</p>}
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
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-[13px] text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>{block.head.map(h => <th key={h} className="px-3 py-2 font-bold text-[11.5px] uppercase tracking-wider whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="bg-white">
                    {row.map((c, ci) => <td key={ci} className={cx('px-3 py-2 text-slate-700 align-top', ci === block.strongCol && 'font-bold text-[#0F172A]', ci === 0 && 'font-semibold text-[#0F172A]')}>{c}</td>)}
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
          <div className="space-y-2">
            {block.rows.map((r, i) => (
              <div key={r.label}>
                <div className="h-9 rounded-lg bg-blue-600 flex items-center px-3 text-white text-[13px] font-bold" style={{ width: `${r.pct}%`, minWidth: 96, opacity: 1 - i * 0.22 }}>{r.label} · {r.value}</div>
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
              <div key={it.name} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14.5px] font-bold text-[#0F172A]">{it.name}</span>
                  <Badge tone="blue">{it.tag}</Badge>
                </div>
                {it.rows.map(r => (
                  <p key={r.label} className="text-[13px] text-slate-600 leading-snug"><span className="font-bold text-slate-400 uppercase text-[11px] tracking-wider mr-1.5">{r.label}</span>{r.value}</p>
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
              <div key={s.name} className="border border-slate-200 rounded-xl p-3 bg-white space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span title={`Emotion ${s.mood}/5`} className="text-[16px]">{moodEmoji(s.mood)}</span>
                </div>
                <p className="text-[13.5px] font-bold text-[#0F172A]">{s.name}</p>
                <p className="text-[12.5px] text-slate-600 leading-snug">{s.action}</p>
                <p className="text-[12.5px] text-rose-600 leading-snug">⚠ {s.pain}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'matrix':
      return (
        <div>
          <BlockTitle>{block.title}</BlockTitle>
          <div className="flex gap-2">
            <div className="flex items-center"><span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 [writing-mode:vertical-rl] rotate-180">{block.yLabel} →</span></div>
            <div className="flex-1">
              <div className="relative h-52 border border-slate-200 rounded-xl bg-slate-50/60 overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300" />
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300" />
                <span className="absolute top-1.5 right-2 text-[10.5px] font-bold uppercase tracking-wider text-emerald-600">{(block.quadrants ?? QUADRANTS)[1]}</span>
                <span className="absolute top-1.5 left-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">{(block.quadrants ?? QUADRANTS)[0]}</span>
                <span className="absolute bottom-1.5 right-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">{(block.quadrants ?? QUADRANTS)[3]}</span>
                <span className="absolute bottom-1.5 left-2 text-[10.5px] font-bold uppercase tracking-wider text-rose-400">{(block.quadrants ?? QUADRANTS)[2]}</span>
                {block.points.map(p => (
                  <div key={p.label} className="absolute -translate-x-1/2 translate-y-1/2 flex flex-col items-center" style={{ left: `${p.x * 10}%`, bottom: `${p.y * 10}%` }}>
                    <span className={cx('w-3.5 h-3.5 rounded-full ring-4', p.highlight ? 'bg-emerald-500 ring-emerald-100' : 'bg-blue-600 ring-blue-100')} />
                    <span className="mt-0.5 text-[11px] font-bold text-slate-700 bg-white/80 px-1 rounded whitespace-nowrap">{p.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">{block.xLabel} →</p>
            </div>
          </div>
        </div>
      );
  }
};

export const FeatureCard: React.FC<{ card: FeatureCardData; index: number }> = ({ card, index }) => (
  <Card padded={false} className={cx('overflow-hidden', card.wide && 'xl:col-span-2')}>
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">{card.icon}</div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold text-slate-400 font-mono">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">{card.title}</h3>
      </div>
      {card.status && <Badge tone={card.status.tone} dot>{card.status.label}</Badge>}
    </div>
    <div className="p-5 space-y-5">
      {card.custom ?? card.blocks?.map((b, i) => <RenderBlock key={i} block={b} />)}
    </div>
  </Card>
);

export const DiscoveryDashboard: React.FC<{
  phase: string;
  title: string;
  subtitle: string;
  badge: string;
  kpis: Kpi[];
  cards: FeatureCardData[];
  csuiteStage: string;
  validated: boolean;
}> = ({ phase, title, subtitle, badge, kpis, cards, csuiteStage, validated }) => (
  <div className="space-y-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">{phase}</div>
        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        <p className="text-[14.5px] text-slate-500 mt-1">{subtitle}</p>
      </div>
      <Badge tone="slate" className="shrink-0">{badge}</Badge>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map(k => <StatTile key={k.label} label={k.label} value={k.value} hint={k.hint} icon={k.icon} tone={k.tone} />)}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
      {cards.map((c, i) => <FeatureCard key={c.id} card={c} index={i} />)}
      <CSuiteValidation stageId={csuiteStage} status={validated ? 'Validated' : 'Pending'} />
    </div>
  </div>
);
