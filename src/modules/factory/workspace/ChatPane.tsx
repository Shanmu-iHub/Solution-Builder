import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, ChevronDown, ChevronRight, Copy, ExternalLink, FileCode2, HelpCircle, Layers, Loader2, Send, Sparkles, Square, User } from 'lucide-react';
import { Markdown } from '../../ui/Markdown';
import { cx } from '../../ui';
import { WorkspaceState } from '../types';

interface Props {
  projectName: string;
  state: WorkspaceState;
  placeholder?: string;
  onBack: () => void;
  onSend: (text: string) => void;
  onStop: () => void;
  onJumpToFile: (file: string) => void;
  onOpenPlan?: () => void;
  onOpenTokens: () => void;
  suggestions?: string[];
  /** prompts offered one after another in the input box */
  prompts?: string[];
}

const TraceItem: React.FC<{ a: any; i: number; isLast: boolean; onJumpToFile: (f: string) => void }> = ({ a, i, isLast, onJumpToFile }) => {
  const [open, setOpen] = useState(false);
  const isCode = !!a.file;
  
  return (
    <div className="relative mb-5 last:mb-0">
      {!isLast && <div className="absolute left-[11px] top-7 bottom-[-28px] w-[2px] bg-emerald-400/30" />}
      
      <div className={cx('absolute left-[3px] top-1.5 w-4 h-4 rounded-full flex items-center justify-center border-2', a.done ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white')}>
        {a.done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
      </div>

      <div className="ml-8 border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-slate-700 font-mono">
            {isCode ? <FileCode2 className="w-4 h-4 text-blue-500" /> : <Layers className="w-4 h-4 text-purple-500" />}
            {isCode ? 'code-generation' : (a.label.includes('Design') ? 'context-architect' : 'skill-gathering')}
          </div>
          <span className={cx("px-2 py-0.5 rounded-full border text-[10.5px] font-bold uppercase tracking-wider", a.done ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-slate-200 bg-slate-100 text-slate-500")}>
            {a.done ? (isCode ? 'CODE WRITTEN' : 'STEP COMPLETED') : 'IN PROGRESS'}
          </span>
        </div>
        
        <div className="p-4 bg-white">
          <div className="text-[13px] font-semibold text-slate-700 mb-3">{a.label}</div>
          {isCode ? (
            <button disabled={!a.done} onClick={() => a.file && onJumpToFile(a.file)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600 transition shadow-sm group disabled:opacity-50">
              <div className="flex items-center gap-2 text-[13px] font-bold text-blue-300">
                <FileCode2 className="w-4 h-4" />
                {a.file}
              </div>
              <span className="text-[12px] text-slate-400 font-medium flex items-center gap-1.5 group-hover:text-slate-200">View code <ExternalLink className="w-3 h-3" /></span>
            </button>
          ) : (
            <div className="text-[12.5px] text-slate-500 font-mono">
              <div onClick={() => setOpen(!open)} className="flex items-center gap-2 cursor-pointer hover:text-slate-700 select-none">
                {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />} _ View technical trace · 1 event
              </div>
              {open && (
                <div className="mt-3 bg-[#0F111A] rounded-lg p-3 text-emerald-400 text-[11px] overflow-x-auto shadow-inner border border-slate-800">
                  <div className="flex justify-between items-center text-slate-500 mb-2 border-b border-slate-800 pb-2">
                    <span>EXECUTION TRACE LOG</span>
                    <button className="flex items-center gap-1 hover:text-slate-300 transition-colors"><Copy className="w-3 h-3" /> Copy</button>
                  </div>
                  <pre><code>{`{\n  "operation": "${isCode ? 'code_generation' : 'skill_discovery'}",\n  "status": "${a.done ? 'success' : 'pending'}",\n  "task": "${a.label}"\n}`}</code></pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export const ChatPane: React.FC<Props> = ({ projectName, state, placeholder = 'Describe what you want to build…', onBack, onSend, onStop, onJumpToFile, onOpenPlan, onOpenTokens, suggestions, prompts = [] }) => {
  const userCount = state.messages.filter(m => m.role === 'user').length;
  const [draft, setDraft] = useState(prompts[userCount] ?? '');
  // after each send (and once the assistant is done) offer the next suggested prompt
  useEffect(() => { if (!state.generating && prompts[userCount]) setDraft(d => (d.trim() ? d : prompts[userCount])); }, [userCount, state.generating]); // eslint-disable-line react-hooks/exhaustive-deps
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [state.messages]);

  const submit = () => {
    const t = draft.trim();
    if (!t || state.generating) return;
    setDraft('');
    onSend(t);
  };
  const awaiting = state.clarificationStatus === 'AWAITING_USER';

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 hover:text-[#0F172A] cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back to Projects</button>
        <button onClick={onOpenTokens} title="View Token Consumption Report" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500 hover:text-[#2563EB] px-2 py-1 rounded-lg hover:bg-blue-50 cursor-pointer"><BarChart3 className="w-3.5 h-3.5" /> {state.tokens.reduce((s, t) => s + t.input + t.output, 0).toLocaleString()} tokens</button>
      </div>
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-400">Project</p>
        <p className="text-[15px] font-bold text-[#0F172A] truncate">{projectName}</p>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {state.messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3"><Sparkles className="w-6 h-6" /></div>
            <p className="text-[15px] font-bold text-[#0F172A]">What are we building?</p>
            <p className="text-[13.5px] text-slate-500 mt-1 max-w-[260px]">Describe your idea in plain language. I’ll ask a few questions, draft a plan, then build it.</p>
            {suggestions && (
              <div className="mt-4 space-y-2 w-full">
                {suggestions.map(s => <button key={s} onClick={() => onSend(s)} className="w-full text-left text-[13.5px] px-3 py-2 rounded-xl border border-slate-200 hover:border-[#2563EB]/40 hover:bg-blue-50/40 text-slate-600 cursor-pointer">{s}</button>)}
              </div>
            )}
          </div>
        )}
        {state.messages.map(m => (
          <div key={m.id} className={cx('flex gap-2.5', m.role === 'user' && 'flex-row-reverse')}>
            <div className={cx('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', m.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-[#0F172A] text-white')}>{m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}</div>
            <div className={cx('max-w-[88%] min-w-0 space-y-2', m.role === 'user' && 'items-end')}>
              <div className={cx('rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-relaxed', m.role === 'user' ? 'bg-[#2563EB] text-white rounded-tr-md' : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-md')}>
                {m.role === 'user' ? m.content : <Markdown source={m.content || '…'} className="[&_p]:my-0" />}
                {m.streaming && <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />}
              </div>
              {m.activity && (
                <div className="mt-4 pt-2">
                  {m.activity.map((a, i) => (
                    <TraceItem key={i} a={a} i={i} isLast={i === m.activity!.length - 1} onJumpToFile={onJumpToFile} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {awaiting && onOpenPlan && (
          <button onClick={onOpenPlan} className="w-full flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left cursor-pointer hover:bg-amber-100/70 transition">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span><span className="block text-[13.5px] font-bold text-amber-800">Clarification Required</span><span className="block text-[12.5px] text-amber-700">Answer Questions in Plan Tab →</span></span>
          </button>
        )}
        
      </div>

      <div className="shrink-0 border-t border-slate-200 p-3">
        {state.generating && <div className="flex items-center gap-2 text-[12.5px] text-amber-600 font-semibold mb-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" /> AI is generating… click stop to pause.</div>}
        <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 transition">
          <textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }} rows={3} placeholder={placeholder} className="flex-1 resize-none bg-transparent min-h-[84px] text-[16px] leading-relaxed px-2 py-1 focus:outline-none placeholder:text-slate-400" />
          {state.generating ? (
            <button onClick={onStop} title="Stop generation" className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 cursor-pointer"><Square className="w-4 h-4 fill-current" /></button>
          ) : (
            <button onClick={submit} disabled={!draft.trim()} className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1D4ED8] disabled:opacity-40 cursor-pointer"><Send className="w-4 h-4" /></button>
          )}
        </div>
      </div>
    </div>
  );
};
