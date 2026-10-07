import React, { useMemo, useState } from 'react';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, FileText, GitBranch, Link as LinkIcon, Loader2, Play, RefreshCw, XCircle } from 'lucide-react';
import { Badge, Button, Card, Dialog, ProgressBar, cx, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { DIMENSION_CRITERIA, DOC_DEFS, makeDocContent, makeFindings } from '../content';
import { SkillsPanel, skillsFor, useSkillLoader } from '../SkillsLoader';
import { Finding } from '../types';

const SEV: Record<Finding['severity'], string> = { critical: 'bg-rose-100 text-rose-700', high: 'bg-orange-100 text-orange-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-slate-100 text-slate-600' };

const Ring: React.FC<{ value: number; color: string }> = ({ value, color }) => {
  const r = 17, c = 2 * Math.PI * r;
  return (
    <div className="relative w-12 h-12 shrink-0"><svg viewBox="0 0 40 40" className="-rotate-90"><circle cx="20" cy="20" r={r} fill="none" stroke="#E2E8F0" strokeWidth="4" /><circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} /></svg><span className="absolute inset-0 grid place-items-center text-[12.5px] font-bold text-[#0F172A]">{value}%</span></div>
  );
};

export const ArchitectureValidation: React.FC<{ projectId: string; onComplete: () => void }> = ({ projectId, onComplete }) => {
  const { state, patch, projects } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();
  const project = projects.find(p => p.id === projectId);
  const [busy, setBusy] = useState(false);
  const [regen, setRegen] = useState<string | null>(null);
  const [dimModal, setDimModal] = useState(false);
  const [docModal, setDocModal] = useState<{ abbr: string; label: string; findings: Finding[] } | null>(null);
  const v = s.validation;
  const done = v.status === 'completed';
  const skills = useMemo(() => skillsFor('validation', project?.name ?? '', project?.description), [project?.name, project?.description]);
  const loader = useSkillLoader(skills, done);

  const validate = async () => {
    setBusy(true);
    patch(projectId, st => ({ validation: { ...st.validation, status: 'validating' } }));
    await loader.load();
    await sleep(2400);
    patch(projectId, { validation: { status: 'completed', findings: makeFindings(), at: new Date().toISOString() } });
    setBusy(false);
  };

  /** Rewrites a document that failed validation, clears its failed findings and stamps the validation time. */
  const regenerate = async (abbr: string) => {
    const def = DOC_DEFS.find(d => d.abbr === abbr);
    if (!def || regen) return;
    const fixed = v.findings.filter(f => f.doc === abbr && f.status === 'failed').length;
    setRegen(abbr);
    await loader.load();
    await sleep(1400);
    patch(projectId, st => ({
      docs: { ...st.docs, [def.type]: { status: 'completed', content: makeDocContent(def.type, project?.name ?? '') } },
      validation: { ...st.validation, at: new Date().toISOString(), findings: st.validation.findings.map(f => (f.doc === abbr && f.status === 'failed' ? { ...f, status: 'passed' as const, severity: 'low' as const, finding: `Resolved: ${f.finding}`, recommendation: undefined } : f)) },
    }));
    setRegen(null);
    setDocModal(null);
    toast({ title: `${abbr} regenerated`, description: `${fixed} failed finding${fixed === 1 ? '' : 's'} resolved.` });
  };

  const findings = v.findings;
  const dimScore = (label: string) => {
    const f = findings.filter(x => x.dimension === label);
    const pen = f.filter(x => x.status === 'failed').length * 18 + f.filter(x => x.status === 'warning').length * 7 + f.filter(x => x.status === 'insufficient_evidence').length * 8;
    return Math.max(55, 100 - pen);
  };
  const consistent = findings.filter(f => f.status === 'passed').length;
  const minor = findings.filter(f => f.status === 'warning').length;
  const conflicts = findings.filter(f => f.status === 'failed').length;
  const missing = findings.filter(f => f.status === 'insufficient_evidence').length;
  const key = findings.filter(f => f.status === 'failed' || f.status === 'warning' || f.status === 'insufficient_evidence');

  const Head: React.FC<{ icon: React.ReactNode; title: string; sub: string; right?: React.ReactNode }> = ({ icon, title, sub, right }) => (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">{icon}</div><div><h3 className="font-bold text-[#0F172A]">{title}</h3><p className="text-[13.5px] text-slate-500 mt-0.5">{sub}</p></div></div>{right}</div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200 shrink-0">
        <div><h2 className="text-[19px] font-bold text-[#0F172A]">Architecture Validator</h2><p className="text-[15px] text-slate-500 mt-0.5">Validate your architecture documents for consistency, completeness, traceability, and alignment.</p></div>
        <div className="flex items-center gap-3">
          {busy && <span className="flex items-center gap-2 text-[#2563EB] text-[15px] font-semibold"><Loader2 className="w-4 h-4 animate-spin" />Validating…</span>}
          <Button variant="primary" onClick={validate} disabled={busy}>{busy ? 'Validating…' : done ? 'Re-run validation' : 'Run validation'}</Button>
          <Button variant="dark" onClick={onComplete}>Continue <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto 2xl:overflow-hidden flex flex-col 2xl:flex-row">
        <div className="2xl:flex-1 2xl:overflow-y-auto px-6 py-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
          {!done && !busy && (
            <div className="p-12 border border-slate-200 rounded-2xl bg-white flex flex-col items-center text-center space-y-4"><Activity className="w-12 h-12 text-slate-300" /><div><h3 className="text-[19px] font-bold text-[#0F172A]">Validation required</h3><p className="text-[15px] text-slate-500 mt-1 max-w-md">Run the validation engine to verify traceability, completeness, and consistency across your 10 architecture documents.</p></div><Button variant="primary" icon={<Play className="w-4 h-4" />} onClick={validate}>Start validation</Button></div>
          )}
          {busy && <Card className="flex flex-col items-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#2563EB] mb-3" /><p className="text-[15px] font-semibold text-[#0F172A]">Checking 42 criteria across 10 documents…</p><ProgressBar value={55} className="w-64 mt-3" /></Card>}

          {done && (
            <>
              <Card className="shadow-subtle">
                <Head icon={<Activity className="w-5 h-5" />} title="Validation by dimension" sub="42 criteria evaluated across 4 dimensions." right={<div className="flex flex-wrap items-center gap-3">{v.at && <span className="text-[13.5px] text-slate-400">Last validated: {new Date(v.at).toLocaleString()}</span>}<Button size="sm" onClick={() => setDimModal(true)}>View dimension details <ArrowRight className="w-3.5 h-3.5" /></Button></div>} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">{DIMENSION_CRITERIA.map(d => <div key={d.id} className="border border-slate-100 rounded-xl p-4 flex items-center justify-between gap-3 hover:shadow-card transition"><div className="min-w-0 flex-1"><p className="text-[15px] font-bold text-[#0F172A] leading-tight break-words">{d.label}</p><p className="text-[13.5px] text-slate-500 mt-1">{d.criteria.length} criteria</p></div><Ring value={dimScore(d.label)} color={d.color} /></div>)}</div>
              </Card>

              <Card>
                <Head icon={<FileText className="w-5 h-5" />} title="Architecture documents" sub="Validation status for each generated document (10 documents)." />
                <div className="grid md:grid-cols-2 gap-4">
                  {DOC_DEFS.map(d => {
                    const f = findings.filter(x => x.doc === d.abbr);
                    const bad = f.filter(x => x.status !== 'passed');
                    const worst = bad.find(x => x.status === 'failed') ? 'failed' : bad.length ? 'warning' : 'ok';
                    return (
                      <div key={d.abbr} onClick={() => setDocModal({ abbr: d.abbr, label: d.title, findings: f })} className="flex items-start gap-4 border border-slate-100 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0"><FileText className="w-5 h-5" /></div>
                        <div className="flex-1 min-w-0"><p className="text-[15px] font-bold text-[#0F172A] truncate">{d.title}</p><p className="text-[13.5px] text-slate-400 mb-2">{d.abbr}</p>
                          {worst === 'ok' ? <Badge tone="green"><CheckCircle2 className="w-3 h-3" />Ready</Badge> : worst === 'warning' ? <Badge tone="amber"><AlertTriangle className="w-3 h-3" />Ready with warnings</Badge> : <span className="inline-flex items-center gap-2"><Badge tone="red"><XCircle className="w-3 h-3" />Needs work</Badge><Button size="xs" loading={regen === d.abbr} disabled={!!regen} icon={<RefreshCw className="w-3 h-3" />} onClick={e => { e.stopPropagation(); regenerate(d.abbr); }}>{regen === d.abbr ? 'Regenerating…' : 'Regenerate'}</Button></span>}
                          <p className="text-[13.5px] text-slate-500 mt-1.5 line-clamp-2">{bad[0] ? `${bad[0].finding.slice(0, 80)}…` : 'All criteria passed.'}</p></div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <Head icon={<GitBranch className="w-5 h-5" />} title="Cross-document consistency" sub="Key relationships and consistency checks across architecture documents." />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                  {([[<CheckCircle2 key="a" className="w-6 h-6" />, 'green', consistent, 'Consistent relationships', 'Components, decisions and stack agree.'], [<AlertTriangle key="b" className="w-6 h-6" />, 'amber', minor, 'Minor issues', 'Naming differences and missing detail.'], [<XCircle key="c" className="w-6 h-6" />, 'red', conflicts, 'Conflicts found', 'Authentication flow mismatch between HLD and SDD.'], [<LinkIcon key="d" className="w-6 h-6" />, 'purple', missing, 'Missing connections', 'Traceability links not found for some requirements.']] as const).map(([icon, c, n, l, sub], i) => (
                    <div key={i} className={cx('rounded-xl p-4 border', { green: 'bg-emerald-50/60 border-emerald-100 text-emerald-600', amber: 'bg-amber-50/60 border-amber-100 text-amber-600', red: 'bg-rose-50/60 border-rose-100 text-rose-600', purple: 'bg-purple-50/60 border-purple-100 text-purple-600' }[c])}><div className="mb-2">{icon}</div><p className="text-2xl font-bold text-[#0F172A]">{n}</p><p className="text-[15px] font-bold text-slate-700 mt-0.5">{l}</p><p className="text-[13.5px] text-slate-500 mt-1 leading-snug">{sub}</p></div>
                  ))}
                </div>
              </Card>

              <Card padded={false} className="overflow-hidden">
                <div className="p-5 pb-0"><Head icon={<AlertTriangle className="w-5 h-5" />} title="Key validation findings" sub="Most important issues, warnings and recommendations." /></div>
                {key.length === 0 ? <p className="px-6 pb-6 text-[15px] text-emerald-600 font-semibold">No findings — architecture looks great!</p> : (
                  <table className="w-full text-[13.5px]"><thead className="bg-slate-50 text-left"><tr>{['Severity', 'Document', 'Finding', 'Recommendation'].map(h => <th key={h} className="px-5 py-3 font-bold text-slate-600">{h}</th>)}</tr></thead>
                    <tbody>{key.map((f, i) => <tr key={i} className="border-t border-slate-100 align-top"><td className="px-5 py-3"><span className={cx('px-2 py-0.5 rounded-md text-[11.5px] font-bold uppercase', SEV[f.severity])}>{f.severity}</span></td><td className="px-5 py-3 font-mono font-semibold">{f.doc}</td><td className="px-5 py-3 text-slate-700 max-w-md">{f.finding}</td><td className="px-5 py-3 text-slate-500 max-w-md">{f.recommendation}</td></tr>)}</tbody></table>
                )}
              </Card>
            </>
          )}
        </div>
        </div>
        <div className="w-full 2xl:w-[340px] bg-white border-t 2xl:border-t-0 2xl:border-l border-slate-200 2xl:overflow-y-auto shrink-0 flex flex-col p-6 space-y-6">
          <SkillsPanel skills={skills} status={loader.status} loading={loader.loading} />
        </div>
      </div>

      <Dialog open={dimModal} onClose={() => setDimModal(false)} title="Validation dimensions & criteria" width="max-w-4xl" footer={<Button onClick={() => setDimModal(false)}>Close</Button>}>
        <div className="space-y-5">{DIMENSION_CRITERIA.map(d => <div key={d.id}><h4 className="text-[15px] font-bold text-[#0F172A] flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />{d.label}</h4><ul className="mt-2 grid md:grid-cols-2 gap-x-6 gap-y-1">{d.criteria.map(c => <li key={c} className="text-[13.5px] text-slate-600 flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{c}</li>)}</ul></div>)}</div>
      </Dialog>
      <Dialog open={!!docModal} onClose={() => setDocModal(null)} title={docModal?.label ?? ''} subtitle="Validation findings for this document." width="max-w-2xl" footer={<>{docModal?.findings.some(f => f.status === 'failed') && <Button variant="primary" loading={regen === docModal.abbr} icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={() => regenerate(docModal.abbr)}>Regenerate document</Button>}<Button onClick={() => setDocModal(null)}>Close</Button></>}>
        {docModal && (docModal.findings.length === 0 ? <p className="text-[15px] text-slate-500">No findings available.</p> : <div className="space-y-3">{docModal.findings.map((f, i) => <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-1.5"><div className="flex items-center justify-between"><Badge tone={f.status === 'passed' ? 'green' : f.status === 'failed' ? 'red' : f.status === 'warning' ? 'amber' : 'purple'}>{f.status.replace('_', ' ')}</Badge><span className={cx('px-2 py-0.5 rounded-md text-[11.5px] font-bold uppercase', SEV[f.severity])}>{f.severity}</span></div><p className="text-[14.5px] text-[#0F172A]">{f.finding}</p>{f.recommendation && <p className="text-[13.5px] text-slate-500"><b>Recommendation:</b> {f.recommendation}</p>}</div>)}</div>)}
      </Dialog>
    </div>
  );
};
