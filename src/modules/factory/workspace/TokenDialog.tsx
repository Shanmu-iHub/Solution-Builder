import React from 'react';
import { Button, Dialog, timeAgo } from '../../ui';
import { TokenLog } from '../types';

export const TokenDialog: React.FC<{ open: boolean; onClose: () => void; logs: TokenLog[] }> = ({ open, onClose, logs }) => {
  const input = logs.reduce((s, l) => s + l.input, 0);
  const output = logs.reduce((s, l) => s + l.output, 0);
  return (
    <Dialog open={open} onClose={onClose} title="Token Consumption Breakdown" subtitle="Live AI pipeline execution analytics" width="max-w-3xl" footer={<Button onClick={onClose}>Close</Button>}>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[['Input tokens', input], ['Output tokens', output], ['Total tokens', input + output]].map(([k, v]) => (
          <div key={k as string} className="rounded-xl border border-slate-200 p-4"><p className="text-[12.5px] font-bold uppercase tracking-wider text-slate-400">{k}</p><p className="text-2xl font-bold text-[#0F172A] mt-1">{(v as number).toLocaleString()}</p></div>
        ))}
      </div>
      <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-[#64748B] mb-2">Consumption logs</h4>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-[13.5px]">
          <thead className="bg-slate-50 text-left"><tr>{['Step', 'Model', 'Prompt (input)', 'Completion (output)', 'When'].map(h => <th key={h} className="px-3 py-2.5 font-bold text-slate-600">{h}</th>)}</tr></thead>
          <tbody>
            {logs.length === 0 && <tr><td colSpan={5} className="px-3 py-8 text-center text-slate-400">No usage recorded yet.</td></tr>}
            {logs.map(l => <tr key={l.id} className="border-t border-slate-100"><td className="px-3 py-2.5 font-semibold text-[#0F172A]">{l.step}</td><td className="px-3 py-2.5 font-mono text-slate-500">{l.model}</td><td className="px-3 py-2.5">{l.input.toLocaleString()}</td><td className="px-3 py-2.5">{l.output.toLocaleString()}</td><td className="px-3 py-2.5 text-slate-400">{timeAgo(l.at)}</td></tr>)}
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};
