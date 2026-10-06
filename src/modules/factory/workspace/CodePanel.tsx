import React, { useEffect, useState } from 'react';
import { Check, Copy, Pencil, Save, Terminal, X } from 'lucide-react';
import { Button, EmptyBlock } from '../../ui';
import { WorkspaceState } from '../types';
import { CodeViewer, FileExplorer } from './CodeParts';

interface Props {
  state: WorkspaceState;
  onPick: (f: string) => void;
  onSave: (f: string, content: string) => void;
}

export const CodePanel: React.FC<Props> = ({ state, onPick, onSave }) => {
  const files = Object.keys(state.files).sort();
  const content = state.files[state.activeFile] ?? '';
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => { setEditing(false); }, [state.activeFile]);

  if (files.length === 0) {
    return <EmptyBlock icon={<Terminal className="w-6 h-6" />} title="No code yet" message="Files appear here as the assistant writes them. Start by describing your app in the chat." />;
  }

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex-1 min-h-0 flex">
        <div className="w-60 shrink-0 border-r border-slate-200 bg-slate-50/60"><FileExplorer files={files} active={state.activeFile} onPick={onPick} /></div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-slate-200 px-3 bg-slate-50/70">
            <span className="text-[13.5px] font-mono text-slate-600 truncate">{state.activeFile}</span>
            <div className="flex items-center gap-1.5">
              <button onClick={async () => { try { await navigator.clipboard.writeText(content); } catch { /* ignore */ } setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer" title="Copy">{copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
              {editing ? (
                <>
                  <Button size="xs" variant="primary" icon={<Save className="w-3 h-3" />} onClick={() => { onSave(state.activeFile, draft); setEditing(false); }}>Save</Button>
                  <Button size="xs" icon={<X className="w-3 h-3" />} onClick={() => setEditing(false)}>Cancel</Button>
                </>
              ) : (
                <Button size="xs" icon={<Pencil className="w-3 h-3" />} onClick={() => { setDraft(content); setEditing(true); }}>Edit</Button>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {editing ? <textarea value={draft} onChange={e => setDraft(e.target.value)} spellCheck={false} className="w-full h-full resize-none p-4 font-mono text-[13.5px] leading-[1.65] text-slate-700 focus:outline-none bg-white" /> : <CodeViewer code={content} className="min-h-full py-3" />}
          </div>
        </div>
      </div>
      <div className="h-40 shrink-0 border-t border-slate-200 bg-[#0F172A] text-slate-200 flex flex-col">
        <div className="flex items-center gap-2 px-3 h-8 border-b border-white/10 text-[12.5px] font-bold uppercase tracking-wider text-slate-400"><Terminal className="w-3.5 h-3.5" /> Terminal</div>
        <div className="flex-1 overflow-auto p-3 font-mono text-[12.5px] leading-relaxed space-y-0.5">
          {state.terminal.length === 0 ? <span className="text-slate-500">Terminal output will appear here…</span> : state.terminal.map((l, i) => <div key={i} className={l.startsWith('✔') || l.startsWith('✓') ? 'text-emerald-400' : l.startsWith('$') ? 'text-sky-300' : ''}>{l}</div>)}
        </div>
      </div>
    </div>
  );
};
