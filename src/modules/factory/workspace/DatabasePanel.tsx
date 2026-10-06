import React, { useState } from 'react';
import { Database, KeyRound, Table2 } from 'lucide-react';
import { Badge, Card, EmptyBlock, Tabs, cx } from '../../ui';
import { dbCollections } from '../mockData';

export const DatabasePanel: React.FC<{ hasSchema: boolean }> = ({ hasSchema }) => {
  const [active, setActive] = useState(dbCollections[0].name);
  const [view, setView] = useState<'data' | 'schema'>('data');
  const c = dbCollections.find(x => x.name === active)!;

  if (!hasSchema) {
    return <EmptyBlock icon={<Database className="w-6 h-6" />} title="Database connection required" message="The inspector appears once the application has a data layer. Build the app first, then come back to browse its tables and collections." />;
  }

  return (
    <div className="flex h-full w-full rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-50/60 flex flex-col">
        <div className="px-4 h-12 flex items-center gap-2 border-b border-slate-200"><span className="relative flex w-2 h-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" /><span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" /></span><span className="text-[13.5px] font-bold uppercase tracking-wider text-[#0F172A]">Live inspector</span></div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {dbCollections.map(x => (
            <button key={x.name} onClick={() => setActive(x.name)} className={cx('w-full text-left px-3 py-2 rounded-xl text-[13.5px] transition cursor-pointer', active === x.name ? 'bg-blue-50 text-[#1D4ED8]' : 'text-slate-600 hover:bg-slate-100')}>
              <span className="flex items-center gap-2 font-semibold"><Table2 className="w-3.5 h-3.5" />{x.name}</span>
              <span className="flex items-center justify-between mt-0.5 text-[11.5px] text-slate-400"><span>{x.engine}</span><span>{x.count.toLocaleString()} rows</span></span>
            </button>
          ))}
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 h-12 border-b border-slate-200">
          <div className="flex items-center gap-2"><span className="text-[15px] font-bold text-[#0F172A]">{c.name}</span><Badge tone={c.engine === 'MongoDB' ? 'green' : 'blue'}>{c.engine}</Badge></div>
          <Tabs active={view} onChange={setView} tabs={[{ id: 'data', label: 'Data' }, { id: 'schema', label: 'Schema' }]} className="!border-0" />
        </div>
        <div className="flex-1 overflow-auto p-4">
          {view === 'data' ? (
            <Card padded={false} className="overflow-auto">
              <table className="w-full text-[13.5px]">
                <thead className="bg-slate-50 text-left"><tr>{c.fields.map(f => <th key={f.name} className="px-3 py-2.5 font-bold text-slate-600 whitespace-nowrap">{f.name}</th>)}</tr></thead>
                <tbody>{c.rows.map((r, i) => <tr key={i} className="border-t border-slate-100">{c.fields.map(f => <td key={f.name} className="px-3 py-2.5 font-mono text-slate-700 whitespace-nowrap">{String(r[f.name] ?? '')}</td>)}</tr>)}</tbody>
              </table>
              <p className="px-3 py-2 text-[12.5px] text-slate-400 border-t border-slate-100">Showing {c.rows.length} of {c.count.toLocaleString()} rows (read-only sample)</p>
            </Card>
          ) : (
            <Card padded={false} className="overflow-hidden">
              <table className="w-full text-[13.5px]">
                <thead className="bg-slate-50 text-left"><tr><th className="px-3 py-2.5 font-bold text-slate-600">Field</th><th className="px-3 py-2.5 font-bold text-slate-600">Type</th><th className="px-3 py-2.5 font-bold text-slate-600">Index</th></tr></thead>
                <tbody>{c.fields.map(f => <tr key={f.name} className="border-t border-slate-100"><td className="px-3 py-2.5 font-mono font-semibold">{f.name}</td><td className="px-3 py-2.5 text-slate-600">{f.type}</td><td className="px-3 py-2.5">{f.indexed ? <Badge tone="indigo"><KeyRound className="w-3 h-3" />indexed</Badge> : <span className="text-slate-300">—</span>}</td></tr>)}</tbody>
              </table>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
