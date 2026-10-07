import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button, Dialog, cx, sleep, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { DIMENSION_CRITERIA, DOC_DEFS, makeDocContent, makeFindings } from '../content';
import { useResourceRun } from '../shared/ResourceRun';
import { Finding } from '../types';
import { Chip } from '../discovery/DiscoveryDashboard';

/** Severity is the one place color is used for emphasis: critical and high stand out, the rest stay quiet. */
const SEV: Record<Finding['severity'], string> = {
  critical: 'text-rose-700 border-rose-200 bg-rose-50',
  high: 'text-amber-700 border-amber-200 bg-amber-50',
  medium: 'text-slate-600 border-slate-200 bg-slate-50',
  low: 'text-slate-500 border-slate-200 bg-white',
};
const SevTag: React.FC<{ severity: Finding['severity'] }> = ({ severity }) => <span className={cx('px-2 py-0.5 rounded-md border text-[12px] font-medium capitalize', SEV[severity])}>{severity}</span>;

const Panel: React.FC<{ title: string; sub?: string; right?: React.ReactNode; flush?: boolean; children: React.ReactNode }> = ({ title, sub, right, flush, children }) => (
  <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
      <div><h3 className="text-[15px] font-semibold text-[#0F172A]">{title}</h3>{sub && <p className="text-[13px] text-slate-500 mt-0.5">{sub}</p>}</div>
      {right}
    </div>
    <div className={flush ? '' : 'p-5'}>{children}</div>
  </section>
);

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
  const { presentSkills } = useResourceRun();

  const validate = async () => {
    setBusy(true);
    patch(projectId, st => ({ validation: { ...st.validation, status: 'validating' } }));
    await presentSkills();
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
    await presentSkills();
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

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-8 py-5 bg-white border-b border-slate-200 shrink-0">
        <div><h2 className="text-lg font-semibold text-[#0F172A]">Architecture validator</h2><p className="text-[14px] text-slate-500 mt-0.5">Check the architecture documents for consistency, completeness, traceability and alignment.</p></div>
        <div className="flex items-center gap-3">
          {busy && <span className="flex items-center gap-2 text-slate-500 text-[13.5px]"><Loader2 className="w-4 h-4 animate-spin" />Validating…</span>}
          <Button variant="primary" className="whitespace-nowrap" onClick={validate} disabled={busy}>{busy ? 'Validating…' : done ? 'Re-run validation' : 'Run validation'}</Button>
          <Button variant="dark" className="whitespace-nowrap" onClick={onComplete}>Continue <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-5">
            {!done && !busy && (
              <div className="p-12 border border-slate-200 rounded-xl bg-white flex flex-col items-center text-center space-y-4">
                <div><h3 className="text-[17px] font-semibold text-[#0F172A]">Validation required</h3><p className="text-[14px] text-slate-500 mt-1 max-w-md">Run the validation to check traceability, completeness and consistency across the 10 architecture documents.</p></div>
                <Button variant="primary" onClick={validate}>Start validation</Button>
              </div>
            )}
            {busy && (
              <div className="bg-white border border-slate-200 rounded-xl flex flex-col items-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400 mb-3" />
                <p className="text-[15px] font-medium text-[#0F172A]">Checking 42 criteria across 10 documents…</p>
              </div>
            )}

            {done && (
              <>
                <Panel
                  title="Validation by dimension"
                  sub="42 criteria evaluated across 4 dimensions."
                  right={<div className="flex flex-wrap items-center gap-3">{v.at && <span className="text-[13px] text-slate-400">Last validated {new Date(v.at).toLocaleString()}</span>}<Button size="sm" onClick={() => setDimModal(true)}>View criteria</Button></div>}
                >
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                    {DIMENSION_CRITERIA.map(d => {
                      const score = dimScore(d.label);
                      return (
                        <div key={d.id} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="text-[14px] font-semibold text-[#0F172A] leading-tight">{d.label}</p>
                            <p className="text-lg font-semibold text-[#0F172A] tabular-nums">{score}%</p>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3"><div className={cx('h-full rounded-full', score >= 80 ? 'bg-[#2563EB]' : 'bg-amber-500')} style={{ width: `${score}%` }} /></div>
                          <p className="text-[13px] text-slate-500 mt-2">{d.criteria.length} criteria</p>
                        </div>
                      );
                    })}
                  </div>
                </Panel>

                <Panel title="Architecture documents" sub="Validation status for each generated document.">
                  <div className="grid md:grid-cols-2 gap-3">
                    {DOC_DEFS.map(d => {
                      const f = findings.filter(x => x.doc === d.abbr);
                      const bad = f.filter(x => x.status !== 'passed');
                      const worst = bad.find(x => x.status === 'failed') ? 'failed' : bad.length ? 'warning' : 'ok';
                      return (
                        <div key={d.abbr} onClick={() => setDocModal({ abbr: d.abbr, label: d.title, findings: f })} className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-slate-300 hover:bg-slate-50/60 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0"><p className="text-[14.5px] font-semibold text-[#0F172A] truncate">{d.title}</p><p className="text-[12.5px] text-slate-400 font-mono mt-0.5">{d.abbr}</p></div>
                            {worst === 'ok' ? <Chip tone="green">Ready</Chip> : worst === 'warning' ? <Chip tone="amber">Warnings</Chip> : <Chip tone="red">Needs work</Chip>}
                          </div>
                          <p className="text-[13px] text-slate-500 mt-2.5 line-clamp-2">{bad[0] ? `${bad[0].finding.slice(0, 90)}…` : 'All criteria passed.'}</p>
                          {worst === 'failed' && <div className="mt-3"><Button size="xs" loading={regen === d.abbr} disabled={!!regen} onClick={e => { e.stopPropagation(); regenerate(d.abbr); }}>{regen === d.abbr ? 'Regenerating…' : 'Regenerate'}</Button></div>}
                        </div>
                      );
                    })}
                  </div>
                </Panel>

                <Panel title="Cross-document consistency" sub="Relationships and checks across the architecture documents.">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                    {([[consistent, 'Consistent relationships', 'Components, decisions and stack agree.'], [minor, 'Minor issues', 'Naming differences and missing detail.'], [conflicts, 'Conflicts found', 'Authentication flow mismatch between HLD and SDD.'], [missing, 'Missing connections', 'Traceability links not found for some requirements.']] as const).map(([n, l, sub], i) => (
                      <div key={i} className="border border-slate-200 rounded-lg p-4">
                        <p className="text-2xl font-semibold text-[#0F172A] tabular-nums">{n}</p>
                        <p className="text-[14px] font-medium text-slate-700 mt-0.5">{l}</p>
                        <p className="text-[13px] text-slate-500 mt-1 leading-snug">{sub}</p>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="Key findings" sub="Most important issues, warnings and recommendations." flush>
                  {key.length === 0 ? <p className="px-5 pb-5 pt-1 text-[14px] text-slate-600">No findings. The architecture is consistent.</p> : (
                    <table className="w-full text-[13.5px]">
                      <thead className="bg-slate-50 text-left"><tr>{['Severity', 'Document', 'Finding', 'Recommendation'].map(h => <th key={h} className="px-5 py-2.5 text-[12.5px] font-medium text-slate-500">{h}</th>)}</tr></thead>
                      <tbody>{key.map((f, i) => <tr key={i} className="border-t border-slate-100 align-top"><td className="px-5 py-3"><SevTag severity={f.severity} /></td><td className="px-5 py-3 font-mono text-[13px] text-slate-700">{f.doc}</td><td className="px-5 py-3 text-slate-700 max-w-md">{f.finding}</td><td className="px-5 py-3 text-slate-500 max-w-md">{f.recommendation}</td></tr>)}</tbody>
                    </table>
                  )}
                </Panel>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={dimModal} onClose={() => setDimModal(false)} title="Validation criteria" subtitle="What each dimension checks" width="max-w-4xl" footer={<Button onClick={() => setDimModal(false)}>Close</Button>}>
        <div className="space-y-6">{DIMENSION_CRITERIA.map(d => <div key={d.id}><h4 className="text-[14.5px] font-semibold text-[#0F172A]">{d.label}</h4><ul className="mt-2 grid md:grid-cols-2 gap-x-6 gap-y-1.5">{d.criteria.map(c => <li key={c} className="text-[13.5px] text-slate-600 flex gap-2"><span className="w-1 h-1 rounded-full bg-slate-400 mt-[8px] shrink-0" />{c}</li>)}</ul></div>)}</div>
      </Dialog>
      <Dialog open={!!docModal} onClose={() => setDocModal(null)} title={docModal?.label ?? ''} subtitle="Validation findings for this document." width="max-w-2xl" footer={<>{docModal?.findings.some(f => f.status === 'failed') && <Button variant="primary" loading={regen === docModal.abbr} onClick={() => regenerate(docModal.abbr)}>Regenerate document</Button>}<Button onClick={() => setDocModal(null)}>Close</Button></>}>
        {docModal && (docModal.findings.length === 0 ? <p className="text-[14.5px] text-slate-500">No findings available.</p> : (
          <div className="space-y-3">
            {docModal.findings.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <Chip tone={f.status === 'passed' ? 'green' : f.status === 'failed' ? 'red' : f.status === 'warning' ? 'amber' : undefined}>{f.status.replace('_', ' ')}</Chip>
                  <SevTag severity={f.severity} />
                </div>
                <p className="text-[14.5px] text-[#0F172A]">{f.finding}</p>
                {f.recommendation && <p className="text-[13.5px] text-slate-500"><span className="font-medium text-slate-700">Recommendation:</span> {f.recommendation}</p>}
              </div>
            ))}
          </div>
        ))}
      </Dialog>
    </div>
  );
};
