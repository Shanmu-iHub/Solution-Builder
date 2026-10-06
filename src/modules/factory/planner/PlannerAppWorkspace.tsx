import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Coins, Copy, Download, Layers, Maximize2, Rocket, Search, ShieldCheck, Users, X } from 'lucide-react';
import { Badge, Button, Card, Crumbs, Dialog, SectionLabel, StatTile, Tabs, cx, timeAgo, useToast } from '../../ui';
import { Markdown } from '../../ui/Markdown';
import { plannerArchitectureLayers } from '../mockData';
import { briefFor, plannerBenefits, plannerDocuments, plannerMetrics, plannerProfile } from '../plannerData';
import { useFactory } from '../FactoryStore';
import { FactoryProject } from '../types';

const credits = (seed: number) => [
  { step: 'Planner handoff import', model: 'claude-sonnet-5-5', input: 4200 + seed * 37, output: 1100 + seed * 11, credits: 18 + (seed % 5), at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { step: 'Architecture blueprint', model: 'claude-sonnet-5-5', input: 8800 + seed * 41, output: 6400 + seed * 29, credits: 52 + (seed % 9), at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { step: 'Implementation task expansion', model: 'claude-haiku-4-5', input: 12400 + seed * 53, output: 9800 + seed * 31, credits: 21 + (seed % 6), at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { step: 'Documentation generation (PRD, SAD, TDD, API, DDD)', model: 'claude-sonnet-5-5', input: 15200 + seed * 61, output: 12100 + seed * 43, credits: 88 + (seed % 12), at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { step: 'Architecture validation', model: 'claude-sonnet-5-5', input: 9100 + seed * 23, output: 3400 + seed * 17, credits: 34 + (seed % 7), at: new Date(Date.now() - 2 * 86400000).toISOString() },
];

export const PlannerAppWorkspace: React.FC<{ project: FactoryProject; onBack: () => void; onOpenBuild: (id: string) => void }> = ({ project, onBack, onOpenBuild }) => {
  const f = useFactory();
  const { toast } = useToast();
  const [tab, setTab] = useState<'problem' | 'docs' | 'insights' | 'credits'>('problem');
  const [zoom, setZoom] = useState(false);
  const [q, setQ] = useState('');
  const [docId, setDocId] = useState('prd');
  const [copied, setCopied] = useState(false);

  const name = project.projectName.replace(/ — Build$/, '');
  const b = briefFor(name);
  const docs = useMemo(() => plannerDocuments(name, b), [name]); // eslint-disable-line react-hooks/exhaustive-deps
  const metrics = plannerMetrics();
  const log = credits(name.length);
  const totalCredits = log.reduce((a, c) => a + c.credits, 0);
  const doc = docs.find(d => d.id === docId) ?? docs[0];
  const shown = docs.filter(d => d.title.toLowerCase().includes(q.toLowerCase()));

  const proceed = () => {
    const plan = `# Implementation Plan — ${name}\n\n## 1. Summary\nImported from the approved **Solution Planner** roadmap. ${b.solution}\n\n## 2. Objectives\n${b.objectives.map(o => `- ${o}`).join('\n')}\n\n## 3. Scope\n**In scope:** ${b.inScope.join(', ')}.\n\n**Out of scope:** ${b.outOfScope.join(', ')}.\n\n## 4. Architecture\n${plannerArchitectureLayers.map(l => `- **${l.name}** — ${l.items.join(', ')}`).join('\n')}\n\n## 5. Delivery Steps\n- [ ] Scaffold application and design tokens\n- [ ] Implement data layer and API routes\n- [ ] Build dashboard and list screens\n- [ ] Add auth, validation and error handling\n- [ ] Run lint / type-check and prepare deployment\n\n## 6. Risks\n- Quality of source data and knowledge\n- Dependency on existing system APIs\n- Change management with frontline users\n`;
    const p = f.startFromPlan(`${name} — Build`, project.description, plan);
    toast({ title: 'Application session created', description: 'The planner roadmap was imported as the approved plan.' });
    onOpenBuild(p.projectId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Crumbs items={[{ label: 'Solution Builder', onClick: onBack }, { label: 'Solution Builder Application', onClick: onBack }, { label: project.projectName }]} />
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Layers className="w-6 h-6" /></div>
          <div><div className="flex items-center gap-2 flex-wrap"><h1 className="text-[26px] font-bold tracking-tight text-[#0F172A]">{project.projectName}</h1><Badge tone="amber">Solution Planner</Badge><Badge>{b.domain}</Badge></div><p className="text-[16px] text-[#64748B] mt-1 max-w-3xl leading-relaxed">{project.description}</p><p className="text-[13px] text-slate-400 mt-1">Created {timeAgo(project.createdAt)} · Updated {timeAgo(project.updatedAt)}</p></div>
        </div>
        <Button variant="primary" icon={<Rocket className="w-4 h-4" />} onClick={proceed}>Build solution</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map(([k, v], i) => <StatTile key={k} label={k} value={v} icon={[<Layers key="a" className="w-4 h-4" />, <Users key="b" className="w-4 h-4" />, <ShieldCheck key="c" className="w-4 h-4" />, <Rocket key="d" className="w-4 h-4" />][i]} tone={(['blue', 'indigo', 'teal', 'amber'] as const)[i]} />)}
      </div>

      <Tabs active={tab} onChange={setTab} className="mb-6" tabs={[{ id: 'problem', label: 'Problem & Solution' }, { id: 'docs', label: `Technical Documentation (${docs.length})` }, { id: 'insights', label: 'Architect Insights' }, { id: 'credits', label: 'Credit Monitoring', icon: <Coins className="w-4 h-4" /> }]} />

      {tab === 'problem' && (
        <div className="space-y-5 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="border-l-4 !border-l-rose-400"><SectionLabel>Identified problem</SectionLabel><p className="text-[16px] text-slate-700 leading-[1.75]">{b.problem}</p></Card>
            <Card className="border-l-4 !border-l-emerald-400"><SectionLabel>Solution planned</SectionLabel><p className="text-[16px] text-slate-700 leading-[1.75]">{b.solution}</p></Card>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Card><SectionLabel>Stakeholders</SectionLabel><ul className="space-y-2">{b.stakeholders.map(x => <li key={x} className="text-[15px] text-slate-700 flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" />{x}</li>)}</ul></Card>
            <Card><SectionLabel>Business objectives</SectionLabel><ul className="space-y-2 list-disc pl-5 marker:text-[#2563EB]">{b.objectives.map(x => <li key={x} className="text-[15px] text-slate-700 leading-snug">{x}</li>)}</ul></Card>
            <Card className="space-y-4"><div><SectionLabel>In scope</SectionLabel><div className="flex flex-wrap gap-1.5">{b.inScope.map(x => <Badge key={x} tone="green">{x}</Badge>)}</div></div><div><SectionLabel>Out of scope</SectionLabel><div className="flex flex-wrap gap-1.5">{b.outOfScope.map(x => <Badge key={x}>{x}</Badge>)}</div></div></Card>
          </div>
          <Card><SectionLabel>Key benefits</SectionLabel><div className="flex flex-wrap gap-2">{plannerBenefits(name).map(x => <span key={x} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[14px] text-slate-700"><Check className="w-3.5 h-3.5 text-emerald-500" />{x}</span>)}</div></Card>
          <Card><SectionLabel>Solution profile</SectionLabel><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{plannerProfile(name).map(([k, v]) => <div key={k} className="border border-slate-100 rounded-xl p-3.5"><p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{k}</p><p className="text-[15px] font-semibold text-[#0F172A] mt-0.5">{v}</p></div>)}</div></Card>
        </div>
      )}

      {tab === 'docs' && (
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 animate-fade-in items-start">
          <div className="space-y-3 lg:sticky lg:top-4">
            <div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter documents…" className="w-full pl-9 pr-3 py-2.5 text-[15px] rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#2563EB]" /></div>
            <Card padded={false} className="overflow-hidden divide-y divide-slate-100">
              {(['Product', 'Architecture', 'Delivery'] as const).map(g => {
                const items = shown.filter(d => d.group === g);
                return items.length ? (
                  <div key={g}>
                    <p className="px-4 pt-3 pb-1 text-[12px] font-bold uppercase tracking-wider text-slate-400">{g}</p>
                    {items.map(d => <button key={d.id} onClick={() => setDocId(d.id)} className={cx('w-full text-left px-4 py-3 transition cursor-pointer', doc.id === d.id ? 'bg-blue-50' : 'hover:bg-slate-50')}><span className={cx('block text-[15px] font-semibold', doc.id === d.id ? 'text-[#1D4ED8]' : 'text-[#0F172A]')}>{d.title}</span><span className="block text-[13px] text-slate-500 mt-0.5 leading-snug">{d.subtitle}</span></button>)}
                  </div>
                ) : null;
              })}
            </Card>
          </div>
          <Card className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div><h3 className="text-[17px] font-bold text-[#0F172A]">{doc.title}</h3><p className="text-[13px] text-slate-500">{doc.subtitle}</p></div>
              <div className="flex gap-2">
                <Button size="sm" icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} onClick={async () => { try { await navigator.clipboard.writeText(doc.body); } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? 'Copied' : 'Copy'}</Button>
                <Button size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={() => { const u = URL.createObjectURL(new Blob([doc.body], { type: 'text/markdown' })); const a = document.createElement('a'); a.href = u; a.download = `${doc.id}.md`; a.click(); URL.revokeObjectURL(u); }}>Download</Button>
              </div>
            </div>
            <div className="px-8 lg:px-12 py-8 max-h-[78vh] overflow-auto"><Markdown source={doc.body} /></div>
          </Card>
        </div>
      )}

      {tab === 'insights' && (
        <div className="space-y-5 animate-fade-in">
          <Card className="space-y-4">
            <SectionLabel right={<Button size="xs" icon={<Maximize2 className="w-3 h-3" />} onClick={() => setZoom(true)}>Click to zoom</Button>}>Architecture diagram</SectionLabel>
            <ArchDiagram />
          </Card>
          <div className="grid md:grid-cols-2 gap-5">
            <Card><SectionLabel>Why this architecture</SectionLabel><ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed">{['Modular monolith keeps the first release fast and cheap to run, with a clear path to services later', 'AI assists but never decides — every sensitive action is human-approved and audited', 'Provider-agnostic AI gateway avoids lock-in and gives cost control', 'Event outbox decouples reporting and notifications from the transaction path'].map(x => <li key={x} className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />{x}</li>)}</ul></Card>
            <Card><SectionLabel>Risks &amp; dependencies</SectionLabel><ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed list-disc pl-5 marker:text-amber-500"><li>Source-system APIs and rate limits must be confirmed before integration work starts</li><li>Quality of existing data and knowledge limits AI answer quality</li><li>Regional data-residency sign-off for sensitive data</li><li>Change management with frontline users needs an early champion programme</li></ul></Card>
          </div>
        </div>
      )}

      {tab === 'credits' && (
        <div className="space-y-5 animate-fade-in">
          <div className="grid sm:grid-cols-3 gap-4"><StatTile label="Total project credits" value={totalCredits} hint="Live compute metrics" icon={<Coins className="w-4 h-4" />} tone="amber" /><StatTile label="Steps billed" value={log.length} tone="blue" /><StatTile label="Tokens (in / out)" value={`${(log.reduce((a, c) => a + c.input, 0) / 1000).toFixed(1)}k / ${(log.reduce((a, c) => a + c.output, 0) / 1000).toFixed(1)}k`} tone="indigo" /></div>
          <Card padded={false} className="overflow-hidden"><table className="w-full text-[14.5px]"><thead className="bg-slate-50 text-left"><tr>{['Step name', 'Engine / model', 'Tokens (in / out)', 'Credits deducted', 'Timestamp'].map(h => <th key={h} className="px-5 py-3 font-bold text-slate-600">{h}</th>)}</tr></thead><tbody>{log.map((c, i) => <tr key={i} className="border-t border-slate-100"><td className="px-5 py-3.5 font-semibold text-[#0F172A]">{c.step}</td><td className="px-5 py-3.5 font-mono text-slate-500">{c.model}</td><td className="px-5 py-3.5">{c.input.toLocaleString()} / {c.output.toLocaleString()}</td><td className="px-5 py-3.5 font-semibold">{c.credits}</td><td className="px-5 py-3.5 text-slate-400">{timeAgo(c.at)}</td></tr>)}</tbody></table></Card>
        </div>
      )}

      <Card className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] !border-0 text-white">
        <div><p className="text-[18px] font-bold">Ready to execute?</p><p className="text-[14px] text-blue-100 mt-0.5">Import this roadmap as the approved plan and open the application builder.</p></div>
        <Button className="!bg-white !text-[#0F172A] !border-0 hover:!bg-blue-50" icon={<ArrowRight className="w-4 h-4" />} onClick={proceed}>Proceed to Application Builder</Button>
      </Card>

      <Dialog open={zoom} onClose={() => setZoom(false)} title="Architecture diagram" subtitle="Layered view of the planned solution" width="max-w-5xl" footer={<Button onClick={() => setZoom(false)} icon={<X className="w-4 h-4" />}>Close</Button>}><ArchDiagram large /></Dialog>
    </div>
  );
};

const ArchDiagram: React.FC<{ large?: boolean }> = ({ large }) => (
  <div className={cx('space-y-3', large && 'py-2')}>
    {plannerArchitectureLayers.map((layer, i) => (
      <div key={layer.name} className="relative">
        <div className="flex items-center gap-3">
          <div className={cx('w-32 shrink-0 text-right text-[13px] font-bold uppercase tracking-wider', ['text-blue-600', 'text-indigo-600', 'text-teal-600', 'text-amber-600'][i])}>{layer.name}</div>
          <div className={cx('flex-1 grid gap-2.5 rounded-2xl border p-3', ['bg-blue-50/60 border-blue-100', 'bg-indigo-50/60 border-indigo-100', 'bg-teal-50/60 border-teal-100', 'bg-amber-50/60 border-amber-100'][i])} style={{ gridTemplateColumns: `repeat(${layer.items.length}, minmax(0, 1fr))` }}>
            {layer.items.map(it => <div key={it} className="bg-white border border-slate-200 rounded-xl px-3 py-3 text-center text-[14px] font-semibold text-[#0F172A] shadow-subtle">{it}</div>)}
          </div>
        </div>
        {i < plannerArchitectureLayers.length - 1 && <div className="ml-36 pl-3 text-slate-300 text-lg leading-none py-0.5">↕</div>}
      </div>
    ))}
  </div>
);
