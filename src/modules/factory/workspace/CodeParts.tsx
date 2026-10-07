import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, File, FileCode2, FileJson, FileText, Folder, Search } from 'lucide-react';
import { cx } from '../../ui';

/* ── Lightweight syntax highlighting (keywords, strings, comments, numbers) ── */

const KEYWORDS = /\b(import|from|export|default|const|let|var|function|return|async|await|if|else|for|while|class|extends|new|type|interface|try|catch|throw|def|self|None|True|False|in|not|and|or|with|as|pass|raise|lambda|public|private|static|void|model|datasource|generator|use client)\b/g;

const highlight = (line: string): React.ReactNode => {
  const m = line.match(/^(\s*)(\/\/.*|#.*)$/);
  if (m) return <>{m[1]}<span className="text-slate-400 italic">{m[2]}</span></>;
  const parts: React.ReactNode[] = [];
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g;
  let last = 0;
  let k = 0;
  let mm: RegExpExecArray | null;
  const kw = (txt: string) =>
    txt.split(KEYWORDS).map((seg, i) => (i % 2 === 1 ? <span key={`${k}-${i}`} className="text-indigo-600 font-medium">{seg}</span> : <React.Fragment key={`${k}-${i}`}>{seg}</React.Fragment>));
  while ((mm = re.exec(line))) {
    if (mm.index > last) parts.push(<React.Fragment key={k++}>{kw(line.slice(last, mm.index))}</React.Fragment>);
    parts.push(<span key={k++} className="text-emerald-600">{mm[0]}</span>);
    last = mm.index + mm[0].length;
  }
  parts.push(<React.Fragment key={k++}>{kw(line.slice(last))}</React.Fragment>);
  return <>{parts}</>;
};

export const CodeViewer: React.FC<{ code: string; className?: string }> = ({ code, className }) => {
  const lines = code.split('\n');
  return (
    <div className={cx('font-mono text-[14.5px] leading-[1.75] overflow-auto bg-white', className)}>
      <table className="border-collapse w-full">
        <tbody>
          {lines.map((l, i) => (
            <tr key={i} className="hover:bg-blue-50/40">
              <td className="select-none text-right text-slate-300 pr-4 pl-4 w-10 align-top">{i + 1}</td>
              <td className="whitespace-pre pr-6 text-slate-700">{highlight(l) || ' '}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── File tree ──────────────────────────────────────────────────────────── */

interface TreeNode { name: string; path: string; children?: TreeNode[] }

const buildTree = (paths: string[]): TreeNode[] => {
  const root: TreeNode = { name: '', path: '', children: [] };
  paths.forEach(p => {
    const parts = p.split('/');
    let cur = root;
    parts.forEach((part, i) => {
      const path = parts.slice(0, i + 1).join('/');
      if (i === parts.length - 1) cur.children!.push({ name: part, path });
      else {
        let next = cur.children!.find(c => c.children && c.name === part);
        if (!next) { next = { name: part, path, children: [] }; cur.children!.push(next); }
        cur = next;
      }
    });
  });
  const sort = (n: TreeNode) => { n.children?.sort((a, b) => Number(!!b.children) - Number(!!a.children) || a.name.localeCompare(b.name)); n.children?.forEach(sort); };
  sort(root);
  return root.children!;
};

const fileIcon = (name: string) => {
  if (name.endsWith('.json')) return <FileJson className="w-3.5 h-3.5 text-amber-500" />;
  if (/\.(tsx?|jsx?|py|java|prisma)$/.test(name)) return <FileCode2 className="w-3.5 h-3.5 text-[#2563EB]" />;
  if (name.endsWith('.md') || name.endsWith('.txt')) return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  return <File className="w-3.5 h-3.5 text-slate-400" />;
};

const Node: React.FC<{ n: TreeNode; depth: number; active: string; onPick: (p: string) => void; forceOpen: boolean }> = ({ n, depth, active, onPick, forceOpen }) => {
  const [open, setOpen] = useState(true);
  if (n.children) {
    return (
      <div>
        <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-1.5 py-1 text-[13.5px] text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer" style={{ paddingLeft: 8 + depth * 12 }}>
          {open || forceOpen ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
          <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />{n.name}
        </button>
        {(open || forceOpen) && n.children.map(c => <Node key={c.path} n={c} depth={depth + 1} active={active} onPick={onPick} forceOpen={forceOpen} />)}
      </div>
    );
  }
  return (
    <button onClick={() => onPick(n.path)} className={cx('w-full flex items-center gap-1.5 py-1 text-[13.5px] rounded-md cursor-pointer', active === n.path ? 'bg-blue-50 text-[#1D4ED8] font-semibold' : 'text-slate-600 hover:bg-slate-100')} style={{ paddingLeft: 22 + depth * 12 }}>
      {fileIcon(n.name)}<span className="truncate">{n.name}</span>
    </button>
  );
};

export const FileExplorer: React.FC<{ files: string[]; active: string; onPick: (p: string) => void }> = ({ files, active, onPick }) => {
  const [q, setQ] = useState('');
  const shown = useMemo(() => files.filter(f => f.toLowerCase().includes(q.toLowerCase())), [files, q]);
  const tree = useMemo(() => buildTree(shown), [shown]);
  return (
    <div className="flex h-full flex-col">
      <div className="p-2 border-b border-slate-200">
        <div className="relative"><Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter files…" className="w-full pl-8 pr-2 py-1.5 text-[13.5px] rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#2563EB]" /></div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {tree.length === 0 ? <p className="text-[13.5px] text-slate-400 text-center py-6">{files.length ? 'No files match.' : 'No files yet.'}</p> : tree.map(n => <Node key={n.path} n={n} depth={0} active={active} onPick={onPick} forceOpen={!!q} />)}
      </div>
    </div>
  );
};
