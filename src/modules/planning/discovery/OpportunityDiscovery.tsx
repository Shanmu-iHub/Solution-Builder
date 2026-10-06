import React, { useRef, useState } from 'react';
import { BarChart3, Check, ExternalLink, FileText, Globe, Loader2, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { Badge, Button, Callout, Card, EmptyBlock, SectionLabel, Textarea, cx, sleep } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { makeAnalysis, makeCustomers, makeMarket, makeMarketBrief, makeOpportunity } from '../content';
import { FooterBar, OriginTag, PhaseTitle, Primary, UnderlineNav, Working } from '../shared';
import { PlanningState } from '../types';

const TABS = [
  { key: 'opportunity' as const, label: 'Opportunity', icon: <Target className="w-3.5 h-3.5" /> },
  { key: 'market' as const, label: 'Market research', icon: <Globe className="w-3.5 h-3.5" /> },
  { key: 'customers' as const, label: 'Customers', icon: <Users className="w-3.5 h-3.5" /> },
  { key: 'analysis' as const, label: 'Analysis', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { key: 'brief' as const, label: 'Market & industry brief', icon: <FileText className="w-3.5 h-3.5" /> },
];

const Generate: React.FC<{ title: string; message: string; cta: string; busy: boolean; onClick: () => void; busyLabel: string }> = ({ title, message, cta, busy, onClick, busyLabel }) =>
  busy ? <Working label={busyLabel} sub="This usually takes a few seconds" /> : (
    <EmptyBlock icon={<Sparkles className="w-6 h-6" />} title={title} message={message} action={<Primary icon={<Sparkles className="w-4 h-4" />} onClick={onClick}>{cta}</Primary>} />
  );

const CITE = (n: number[]) => <span className="text-[11.5px] font-bold text-[#2563EB] align-super ml-0.5">[{n.join(', ')}]</span>;

export const OpportunityDiscovery: React.FC<{ projectId: string; projectName: string; onBack: () => void; onContinue: () => void }> = ({ projectId, projectName, onBack, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const scroll = useRef<HTMLDivElement>(null);
  const idx = TABS.findIndex(t => t.key === s.oppTab);
  const last = idx === TABS.length - 1;

  const open = (t: PlanningState['oppTab']) => { patch(projectId, { oppTab: t }); scroll.current?.scrollTo({ top: 0 }); };
  const run = async (key: string, ms: number, apply: Partial<PlanningState>) => { setBusy(key); await sleep(ms); patch(projectId, apply); setBusy(null); };

  const next = async () => {
    setBusy('save');
    if (s.opportunity) {
      const cards = { ...s.opportunity.cards };
      (Object.keys(cards) as (keyof typeof cards)[]).forEach(k => { if (edits[k] !== undefined) cards[k] = { text: edits[k], source: 'user_confirmed' }; });
      patch(projectId, { opportunity: { ...s.opportunity, cards } });
    }
    await sleep(500);
    setBusy(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    if (!last) return open(TABS[idx + 1].key);
    setBusy('complete');
    await sleep(600);
    patch(projectId, { oppCompleted: true });
    setBusy(null);
    onContinue();
  };

  const opp = s.opportunity;
  return (
    <div ref={scroll} className="h-full w-full overflow-y-auto bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
        <PhaseTitle eyebrow="Phase · Discovery" title="Opportunity & Discovery" subtitle="Establish the market and customer context for this initiative." />
        <UnderlineNav steps={TABS} active={s.oppTab} onSelect={open} />

        {s.oppTab === 'opportunity' && (
          !opp ? <Generate title="No opportunity assessment yet" message="Generate a first assessment from your confirmed Idea Brief. You can edit every card afterwards." cta="Generate opportunity" busy={busy === 'opp'} busyLabel="Assessing the opportunity…" onClick={() => run('opp', 1600, { opportunity: makeOpportunity(projectName) })} /> : (
            <div className="space-y-5">
              <div className="flex items-center justify-between"><SectionLabel>Opportunity assessment</SectionLabel><Button size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={() => run('opp', 1200, { opportunity: makeOpportunity(projectName) })}>Regenerate</Button></div>
              <div className="grid md:grid-cols-2 gap-4">
                {(['business', 'customer', 'market', 'technology'] as const).map(k => (
                  <Card key={k} className="space-y-2">
                    <div className="flex items-center justify-between"><span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600">{k} opportunity</span><OriginTag origin={edits[k] !== undefined ? 'user_confirmed' : opp.cards[k].source} /></div>
                    <Textarea rows={4} value={edits[k] ?? opp.cards[k].text} onChange={e => setEdits(x => ({ ...x, [k]: e.target.value }))} className="!text-[14.5px] !leading-relaxed" />
                  </Card>
                ))}
              </div>
              <Card>
                <SectionLabel icon={<TrendingUp className="w-3.5 h-3.5" />}>Potential value</SectionLabel>
                <div className="grid md:grid-cols-3 gap-4">{opp.potentialValue.map(v => (
                  <div key={v.label} className="border border-slate-200 rounded-xl p-4"><div className="flex items-center justify-between"><p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-500">{v.label}</p><OriginTag origin={v.source} /></div><p className="text-2xl font-bold text-[#0F172A] mt-1">{v.value}</p><p className="text-[13.5px] text-slate-500 mt-1 leading-snug">{v.basis}</p></div>
                ))}</div>
              </Card>
              <Card>
                <SectionLabel>Assumptions</SectionLabel>
                <ul className="space-y-2">{opp.assumptions.map((a, i) => <li key={i} className="flex items-start justify-between gap-3 text-[14.5px] text-slate-700"><span className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />{a.text}</span><OriginTag origin={a.source} /></li>)}</ul>
              </Card>
            </div>
          )
        )}

        {s.oppTab === 'market' && (
          !s.market ? <Generate title="Market research hasn’t run yet" message="Search the web for market size, trends and competitors, then summarise the cited findings." cta="Run market research" busy={busy === 'market'} busyLabel="Researching the market…" onClick={() => run('market', 2200, { market: makeMarket() })} /> : (
            <div className="space-y-5">
              <div className="flex items-center justify-between"><SectionLabel>Research summary</SectionLabel><Button size="sm" icon={<Globe className="w-3.5 h-3.5" />} onClick={() => run('market', 1500, { market: makeMarket(), marketBrief: null })}>Re-run research</Button></div>
              <Card className="space-y-3">{s.market.summary.map((m, i) => <p key={i} className="text-[14.5px] text-slate-700 leading-relaxed">{m.text}{CITE(m.sources)}</p>)}</Card>
              <div><SectionLabel>Queries</SectionLabel><div className="flex flex-wrap gap-2">{s.market.queries.map(q => <Badge key={q} mono>{q}</Badge>)}</div></div>
              <div><SectionLabel>Sources</SectionLabel>
                <div className="grid md:grid-cols-2 gap-3">{s.market.results.map(r => (
                  <Card key={r.rank} className="!p-4 space-y-1.5"><div className="flex items-start justify-between gap-2"><p className="text-[14.5px] font-bold text-[#0F172A] leading-snug"><span className="text-[#2563EB] mr-1">[{r.rank}]</span>{r.title}</p></div><p className="text-[13.5px] text-slate-500 leading-relaxed">{r.content}</p><a className="inline-flex items-center gap-1 text-[12.5px] text-[#2563EB] font-semibold hover:underline" href={r.url} onClick={e => e.preventDefault()}><ExternalLink className="w-3 h-3" />{r.url.replace('https://', '')}</a></Card>
                ))}</div>
              </div>
            </div>
          )
        )}

        {s.oppTab === 'customers' && (
          !s.customers ? <Generate title="No customer view yet" message="Identify who has the problem, who will use the solution, segments and example personas." cta="Generate customers" busy={busy === 'cust'} busyLabel="Profiling customers…" onClick={() => run('cust', 1500, { customers: makeCustomers() })} /> : (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Card><SectionLabel>Problem holders</SectionLabel><div className="flex flex-wrap gap-2">{s.customers.problemHolders.map(x => <Badge key={x} tone="red">{x}</Badge>)}</div></Card>
                <Card><SectionLabel>Solution users</SectionLabel><div className="flex flex-wrap gap-2">{s.customers.solutionUsers.map(x => <Badge key={x} tone="green">{x}</Badge>)}</div></Card>
              </div>
              <Card><SectionLabel>Segments</SectionLabel><div className="grid md:grid-cols-3 gap-3">{s.customers.segments.map(x => <div key={x.name} className="border border-slate-200 rounded-xl p-3.5"><p className="text-[15px] font-bold text-[#0F172A]">{x.name}</p><p className="text-[13.5px] text-slate-500 mt-1 leading-relaxed">{x.description}</p></div>)}</div></Card>
              <Card><SectionLabel>Personas</SectionLabel><div className="grid md:grid-cols-3 gap-3">{s.customers.personas.map(p => (
                <div key={p.name} className="border border-slate-200 rounded-xl p-4 space-y-2"><div className="flex items-center justify-between"><p className="text-[15px] font-bold text-[#0F172A]">{p.name}</p><Badge tone={p.type === 'problem_holder' ? 'red' : 'blue'}>{p.type === 'problem_holder' ? 'Problem holder' : 'Solution user'}</Badge></div><p className="text-[13.5px] text-slate-600"><b>Goals:</b> {p.goals}</p><p className="text-[13.5px] text-slate-600"><b>Pains:</b> {p.pains}</p></div>
              ))}</div></Card>
            </div>
          )
        )}

        {s.oppTab === 'analysis' && (
          !s.analysis ? <Generate title="No analysis yet" message={opp ? 'Summarise strengths, risks and open questions across the opportunity, market and customers.' : 'Generate the opportunity first, then come back for the analysis.'} cta="Generate analysis" busy={busy === 'ana'} busyLabel="Analysing…" onClick={() => opp ? run('ana', 1400, { analysis: makeAnalysis(projectName) }) : open('opportunity')} /> : (
            <div className="space-y-5">
              <Callout tone="info" title="Summary">{s.analysis.summary}</Callout>
              <div className="grid md:grid-cols-3 gap-4">
                <Card><SectionLabel>Strengths</SectionLabel><ul className="space-y-2">{s.analysis.strengths.map(x => <li key={x} className="flex gap-2 text-[14.5px] text-slate-700"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{x}</li>)}</ul></Card>
                <Card><SectionLabel>Risks</SectionLabel><ul className="space-y-2">{s.analysis.risks.map(x => <li key={x} className="flex gap-2 text-[14.5px] text-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />{x}</li>)}</ul></Card>
                <Card><SectionLabel>Open questions</SectionLabel><ul className="space-y-2">{s.analysis.openQuestions.map(x => <li key={x} className="flex gap-2 text-[14.5px] text-slate-700"><span className="text-[#2563EB] font-bold">?</span>{x}</li>)}</ul></Card>
              </div>
            </div>
          )
        )}

        {s.oppTab === 'brief' && (
          !s.marketBrief ? (
            <div className="space-y-4">
              {!s.market && <Callout tone="warning" title="Run market research first">The brief is grounded in cited sources. <button onClick={() => open('market')} className="underline font-bold">Open Market research</button></Callout>}
              <Generate title="No market & industry brief yet" message="Build a structured brief with sizing, competitors and a feature comparison — every claim cites a source." cta="Generate brief" busy={busy === 'brief'} busyLabel="Writing the market & industry brief…" onClick={() => s.market ? run('brief', 2200, { marketBrief: makeMarketBrief() }) : open('market')} />
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between"><SectionLabel>Market &amp; industry brief</SectionLabel><Button size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={() => run('brief', 1500, { marketBrief: makeMarketBrief() })}>Regenerate</Button></div>
              {s.marketBrief.sections.map(sec => (
                <Card key={sec.key}><SectionLabel>{sec.title}</SectionLabel><ul className="space-y-2">{sec.items.map((it, i) => <li key={i} className="text-[14.5px] text-slate-700 leading-relaxed flex gap-2 items-start"><Badge tone={it.type === 'reported' ? 'blue' : 'purple'}>{it.type === 'reported' ? 'Reported' : 'Synthesis'}</Badge><span>{it.text}{CITE(it.sources)}</span></li>)}</ul></Card>
              ))}
              <Card>
                <SectionLabel>Market sizing</SectionLabel>
                <div className="grid grid-cols-3 gap-4 mb-3">{([['TAM', s.marketBrief.sizing.tam], ['SAM', s.marketBrief.sizing.sam], ['SOM', s.marketBrief.sizing.som]] as const).map(([k, v]) => <div key={k} className="border border-slate-200 rounded-xl p-4 text-center"><p className="text-[12.5px] font-bold tracking-wider text-slate-400">{k}</p><p className="text-2xl font-bold text-[#0F172A]">{v}</p></div>)}</div>
                <p className="text-[13.5px] text-slate-500"><b>Method:</b> {s.marketBrief.sizing.method}</p>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><SectionLabel>Competitors</SectionLabel><ul className="space-y-3">{s.marketBrief.competitors.map(c => <li key={c.name}><p className="text-[15px] font-bold text-[#0F172A]">{c.name}</p><p className="text-[13.5px] text-slate-500">{c.description}</p></li>)}</ul></Card>
                <Card padded={false} className="overflow-hidden"><div className="px-5 pt-4"><SectionLabel>Feature comparison</SectionLabel></div><table className="w-full text-[13.5px]"><thead className="bg-slate-50 text-left"><tr><th className="px-4 py-2 font-bold text-slate-600">Competitor</th><th className="px-4 py-2 font-bold text-slate-600">Capability</th><th className="px-4 py-2 font-bold text-slate-600">Detail</th></tr></thead><tbody>{s.marketBrief.comparison.map(r => <tr key={r.competitor} className="border-t border-slate-100"><td className="px-4 py-2.5 font-semibold">{r.competitor}</td><td className="px-4 py-2.5">{r.capability}</td><td className="px-4 py-2.5 text-slate-500">{r.detail}</td></tr>)}</tbody></table></Card>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><SectionLabel>Assumptions</SectionLabel><ul className="list-disc pl-4 text-[14.5px] text-slate-700 space-y-1">{s.marketBrief.assumptions.map(x => <li key={x}>{x}</li>)}</ul></Card>
                <Card><SectionLabel>Open questions</SectionLabel><ul className="list-disc pl-4 text-[14.5px] text-slate-700 space-y-1">{s.marketBrief.openQuestions.map(x => <li key={x}>{x}</li>)}</ul></Card>
              </div>
            </div>
          )
        )}

        <FooterBar onBack={idx === 0 ? onBack : () => open(TABS[idx - 1].key)} backLabel="Back" note={saved ? <span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-emerald-600"><Check className="w-3.5 h-3.5" />Saved</span> : busy === 'save' ? <span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-emerald-600"><Loader2 className="w-3.5 h-3.5 animate-spin" />Saving…</span> : undefined}>
          <Primary arrow loading={busy === 'complete'} disabled={busy !== null} onClick={next}>{!last ? 'Continue' : 'Continue to Problem Discovery'}</Primary>
        </FooterBar>
      </div>
    </div>
  );
};
