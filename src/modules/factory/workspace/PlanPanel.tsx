import React, { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Copy, Download, FileText, HelpCircle, Loader2, Play, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Markdown } from '../../ui/Markdown';
import { Badge, Button, Card, cx } from '../../ui';
import { WorkspaceState } from '../types';

interface Props {
  projectId: string;
  state: WorkspaceState;
  onSubmitClarifications: (answers: Record<string, { question: string; answer: string }>) => Promise<void>;
  onProceed: () => void;
}

export const PlanPanel: React.FC<Props> = ({ projectId, state, onSubmitClarifications, onProceed }) => {
  const [answers, setAnswers] = useState<Record<string, { question: string; answer: string }>>({});
  const [custom, setCustom] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const approved = state.planStatus === 'APPROVED';
  const showForm = state.questions.length > 0 && !approved && (!state.planMarkdown || state.clarificationStatus === 'AWAITING_USER');
  const answeredCount = Object.keys(answers).length;

  const copy = async () => {
    try { await navigator.clipboard.writeText(state.planMarkdown); } catch { /* clipboard unavailable */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([state.planMarkdown], { type: 'text/markdown' }));
    const a = document.createElement('a');
    a.href = url; a.download = `implementation-plan-${projectId}.md`; a.click();
    URL.revokeObjectURL(url);
  };
  const generate = async () => {
    setSubmitting(true);
    await onSubmitClarifications(answers);
    setSubmitting(false);
  };

  return (
    <div className="flex h-full w-full flex-col bg-white overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-5 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center">{showForm ? <SlidersHorizontal className="w-4 h-4" /> : <FileText className="w-4 h-4" />}</div>
          <h3 className="text-[13.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
            {showForm ? 'Architecture Clarification' : 'Implementation Plan'}
            <Badge tone={approved ? 'green' : showForm ? 'amber' : 'slate'}>
              {approved ? <CheckCircle2 className="w-3 h-3" /> : showForm ? <HelpCircle className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
              {showForm ? 'Awaiting decisions' : state.planStatus}
            </Badge>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {state.planMarkdown && !showForm && (
            <>
              <Button size="sm" icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} onClick={copy}>{copied ? 'Copied' : 'Copy'}</Button>
              <Button size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={download}>Download</Button>
            </>
          )}
          {showForm ? (
            <Button size="sm" variant="dark" loading={submitting} disabled={answeredCount === 0} icon={<Sparkles className="w-3.5 h-3.5" />} onClick={generate}>{submitting ? 'Generating plan…' : 'Generate plan'}</Button>
          ) : !approved && state.planMarkdown ? (
            <Button size="sm" variant="primary" icon={<Play className="w-3.5 h-3.5" />} onClick={onProceed}>Proceed to build <ArrowRight className="w-3.5 h-3.5" /></Button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/40">
        {showForm ? (
          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] text-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5" /></div>
                <div>
                  <h2 className="text-[17px] font-bold">Project Architecture Decisions</h2>
                  <p className="text-[13.5px] text-blue-100 mt-1.5 leading-relaxed">{state.clarificationSummary || 'Select your preferred options below to generate a tailored plan.'}</p>
                </div>
              </div>
            </div>
            {state.questions.map((q, idx) => {
              const current = answers[q.id]?.answer || '';
              return (
                <Card key={q.id} className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <span className="text-[14.5px] font-bold text-[#0F172A] flex items-center gap-2.5"><span className="w-5 h-5 rounded-md bg-slate-100 text-[11.5px] font-mono flex items-center justify-center">{idx + 1}</span>{q.question}</span>
                    <Badge mono>{q.category}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {q.options.map(opt => {
                      const on = current === opt;
                      return (
                        <button key={opt} type="button" onClick={() => setAnswers(a => ({ ...a, [q.id]: { question: q.question, answer: opt } }))} className={cx('flex items-center justify-between p-3.5 rounded-xl text-[13.5px] text-left transition border cursor-pointer', on ? 'bg-blue-50 border-[#2563EB] text-[#1D4ED8] font-semibold ring-2 ring-blue-100' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300')}>
                          <span className="pr-2 leading-snug">{opt}</span>
                          <span className={cx('w-4 h-4 rounded-full border flex items-center justify-center shrink-0', on ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-slate-300')}>{on && <Check className="w-2.5 h-2.5" />}</span>
                        </button>
                      );
                    })}
                  </div>
                  {q.allowCustom && (
                    <input type="text" placeholder="Other / custom requirement write-in…" value={custom[q.id] || ''} onChange={e => { setCustom(c => ({ ...c, [q.id]: e.target.value })); setAnswers(a => ({ ...a, [q.id]: { question: q.question, answer: e.target.value } })); }} className="w-full h-9 px-3.5 text-[13.5px] bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100" />
                  )}
                </Card>
              );
            })}
            <div className="flex items-center justify-between text-[13.5px] text-slate-500 font-mono pb-4"><span>{answeredCount} of {state.questions.length} decisions selected</span><span className="text-slate-400">Click “Generate plan” above when ready</span></div>
          </div>
        ) : state.planMarkdown ? (
          <div className="max-w-4xl mx-auto">
            <Card className="!p-6 md:!p-8">
              <div className="flex items-center gap-2 text-[13.5px] font-mono text-slate-500 pb-4 mb-4 border-b border-slate-200"><FileText className="w-3.5 h-3.5" /><span className="font-semibold uppercase tracking-wider text-[12.5px]">Artifact: implementation_plan.md</span></div>
              <Markdown source={state.planMarkdown} />
            </Card>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center mb-4"><Sparkles className="w-6 h-6" /></div>
            <h4 className="text-[15px] font-bold text-[#0F172A] mb-1">No plan yet</h4>
            <p className="text-[13.5px] text-slate-500 max-w-md">Describe what you want to build in the chat. I’ll ask a few architecture questions and then draft the implementation plan here.</p>
          </div>
        )}
        {submitting && <div className="fixed inset-0 pointer-events-none flex items-end justify-center pb-10"><span className="bg-[#0F172A] text-white text-[13.5px] px-4 py-2 rounded-full flex items-center gap-2 shadow-modal"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Synthesizing implementation plan…</span></div>}
      </div>
    </div>
  );
};
