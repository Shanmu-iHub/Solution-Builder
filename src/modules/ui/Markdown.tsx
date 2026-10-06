import React from 'react';

/** Minimal markdown renderer: headings, tables, lists, task lists, bold, inline code, code fences. */
const inline = (text: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    out.push(tok.startsWith('**') ? <strong key={i++} className="font-bold text-[#0F172A]">{tok.slice(2, -2)}</strong> : <code key={i++} className="px-1 py-0.5 rounded bg-slate-100 text-[0.92em] font-mono text-slate-700">{tok.slice(1, -1)}</code>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

export const Markdown: React.FC<{ source: string; className?: string }> = ({ source, className }) => {
  const lines = source.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push(<pre key={key++} className="bg-slate-900 text-slate-100 rounded-xl p-5 text-[14.5px] leading-relaxed font-mono overflow-auto my-4">{code.join('\n')}</pre>);
      continue;
    }
    if (/^#{1,4}\s/.test(line)) {
      const level = line.match(/^#+/)![0].length;
      const text = line.replace(/^#+\s*/, '');
      const cls = ['text-[26px] font-extrabold tracking-tight mt-1 mb-4', 'text-[21px] font-bold mt-8 mb-3 pb-2 border-b border-slate-200', 'text-[18px] font-bold mt-6 mb-2', 'text-[16.5px] font-semibold mt-4 mb-1.5'][level - 1];
      blocks.push(React.createElement(`h${level}`, { key: key++, className: `${cls} text-[#0F172A]` }, inline(text)));
      i++;
      continue;
    }
    if (line.trim().startsWith('|') && lines[i + 1]?.includes('---')) {
      const head = line.split('|').slice(1, -1).map(s => s.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++].split('|').slice(1, -1).map(s => s.trim()));
      blocks.push(
        <div key={key++} className="overflow-x-auto my-3 rounded-xl border border-slate-200">
          <table className="w-full text-[15px]">
            <thead className="bg-slate-50"><tr>{head.map((h, k) => <th key={k} className="text-left px-4 py-2.5 font-bold text-slate-600">{inline(h)}</th>)}</tr></thead>
            <tbody>{rows.map((r, k) => <tr key={k} className="border-t border-slate-100">{r.map((c, j) => <td key={j} className="px-4 py-2.5 text-slate-700">{inline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^\s*(-|\d+\.)\s/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*(-|\d+\.)\s/.test(lines[i])) items.push(lines[i++].replace(/^\s*(-|\d+\.)\s+/, ''));
      const Tag = ordered ? 'ol' : 'ul';
      blocks.push(
        <Tag key={key++} className={`my-3 space-y-1.5 text-[16px] leading-[1.75] text-slate-700 ${ordered ? 'list-decimal pl-5' : items.every(t => /^\[[ x]\]/.test(t)) ? '' : 'list-disc pl-5'}`}>
          {items.map((t, k) => {
            const task = t.match(/^\[([ x])\]\s*(.*)/);
            return task ? (
              <li key={k} className="flex items-start gap-2 list-none">
                <span className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center text-[11.5px] shrink-0 ${task[1] === 'x' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>{task[1] === 'x' ? '✓' : ''}</span>
                <span className={task[1] === 'x' ? 'line-through text-slate-400' : ''}>{inline(task[2])}</span>
              </li>
            ) : (
              <li key={k}>{inline(t)}</li>
            );
          })}
        </Tag>,
      );
      continue;
    }
    if (line.trim() === '') {
      i++;
      continue;
    }
    blocks.push(<p key={key++} className="text-[16px] leading-[1.8] text-slate-700 my-3">{inline(line)}</p>);
    i++;
  }
  return <div className={className}>{blocks}</div>;
};
