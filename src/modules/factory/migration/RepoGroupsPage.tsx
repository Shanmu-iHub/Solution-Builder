import React, { useMemo, useState } from 'react';
import { ArrowRight, Layers, Plus, Trash2 } from 'lucide-react';
import { Badge, Button, Card, ConfirmDialog, Crumbs, Dialog, EmptyBlock, Field, Input, SectionLabel, Textarea, cx, timeAgo, useToast } from '../../ui';
import { GraphCanvas } from '../../knowledge/GraphCanvas';
import { useFactory } from '../FactoryStore';
import { RepoGroup } from '../types';

export const RepoGroupsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { groups, projects, createGroup, deleteGroup } = useFactory();
  const { toast } = useToast();
  const migrations = projects.filter(p => p.kind === 'code-migration');
  const [selected, setSelected] = useState<RepoGroup | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Order Platform — Services');
  const [desc, setDesc] = useState('Orders and billing services analysed together to find cross-service calls before migration.');
  const [picked, setPicked] = useState<string[]>(['mg-flask', 'mg-java']);
  const [confirm, setConfirm] = useState<RepoGroup | null>(null);

  const current = selected ? groups.find(g => g.id === selected.id) || null : null;

  const graph = useMemo(() => {
    if (!current) return { nodes: [], edges: [] };
    const names = [...new Set(current.crossCalls.flatMap(c => [c.from, c.to]))];
    return {
      nodes: names.map(n => ({ id: n, type: 'Service', label: n, description: 'Indexed repository analysed in this group.', version: null })),
      edges: current.crossCalls.map((c, i) => ({ id: `x${i}`, source: c.from, target: c.to, type: 'CALLS' })),
    };
  }, [current]);

  if (current) {
    return (
      <div className="max-w-6xl mx-auto">
        <Crumbs items={[{ label: 'Solution Builder', onClick: onBack }, { label: 'Code Migration', onClick: () => setSelected(null) }, { label: current.name }]} />
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div><h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">{current.name}</h1><p className="text-[15px] text-[#64748B] mt-1">{current.description}</p></div>
          <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={() => setConfirm(current)}>Delete group</Button>
        </div>
        <div className="grid lg:grid-cols-[1fr_360px] gap-5">
          <Card padded={false} className="h-[420px] overflow-hidden">{graph.nodes.length ? <GraphCanvas nodes={graph.nodes} edges={graph.edges} /> : <div className="h-full flex items-center justify-center text-[15px] text-slate-400">Add two or more repositories to see cross-service calls.</div>}</Card>
          <div className="space-y-5">
            <Card><SectionLabel>Repositories ({current.projectIds.length})</SectionLabel><div className="space-y-2">{current.projectIds.map(id => { const p = projects.find(x => x.projectId === id); return <div key={id} className="flex items-center justify-between text-[15px] border border-slate-200 rounded-xl px-3 py-2"><span className="font-semibold text-[#0F172A] truncate">{p?.projectName || id}</span><Badge tone="blue">Indexed</Badge></div>; })}</div></Card>
            <Card padded={false} className="overflow-hidden">
              <div className="px-5 pt-4"><SectionLabel>Cross-service calls</SectionLabel></div>
              {current.crossCalls.length === 0 ? <p className="px-5 pb-5 text-[13.5px] text-slate-400">None detected.</p> : current.crossCalls.map((c, i) => (
                <div key={i} className="px-5 py-3 border-t border-slate-100 text-[13.5px]"><div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">{c.from}<ArrowRight className="w-3 h-3 text-slate-400" />{c.to}</div><div className="flex items-center justify-between mt-1"><code className="font-mono text-slate-500">{c.via}</code><Badge>{c.count} calls</Badge></div></div>
              ))}
            </Card>
          </div>
        </div>
        <ConfirmDialog open={!!confirm} danger title="Delete this group?" description="The repositories stay indexed; only the group is removed." confirmText="Delete" onClose={() => setConfirm(null)} onConfirm={() => { if (confirm) { deleteGroup(confirm.id); setSelected(null); toast({ title: 'Group deleted' }); } }} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div><Crumbs items={[{ label: 'Solution Builder', onClick: onBack }, { label: 'Code Migration', onClick: onBack }, { label: 'Repo Groups' }]} /><h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Repo Groups</h1><p className="text-[15px] text-[#64748B] mt-1">Analyse several indexed repositories together to find cross-service calls.</p></div>
        <Button variant="dark" icon={<Plus className="w-4 h-4" />} onClick={() => setOpen(true)}>New group</Button>
      </div>
      {groups.length === 0 ? <EmptyBlock icon={<Layers className="w-6 h-6" />} title="No repo groups yet" message="Group repositories to see how services talk to each other." action={<Button variant="primary" onClick={() => setOpen(true)}>Create first group</Button>} /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(g => (
            <Card key={g.id} hover onClick={() => setSelected(g)} className="space-y-3">
              <div className="flex items-center justify-between"><div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center"><Layers className="w-5 h-5" /></div><Badge>{g.projectIds.length} repos</Badge></div>
              <div><h3 className="text-[19px] font-bold text-[#0F172A]">{g.name}</h3><p className="text-[15px] text-[#64748B] line-clamp-2 mt-1">{g.description || 'No description.'}</p></div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[13.5px] text-slate-400"><span>{g.crossCalls.length} cross-service links</span><span>{timeAgo(g.updatedAt)}</span></div>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} title="New repo group" subtitle="Pick the indexed migration projects to analyse together." width="max-w-lg"
        footer={<><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="primary" disabled={!name.trim() || picked.length === 0} onClick={() => { createGroup(name.trim(), desc.trim(), picked); setOpen(false); setName('Order Platform — Services'); setDesc('Orders and billing services analysed together to find cross-service calls before migration.'); setPicked(['mg-flask', 'mg-java']); toast({ title: 'Group created' }); }}>Create group</Button></>}>
        <div className="space-y-4">
          <Field label="Group name" required><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Order Platform" /></Field>
          <Field label="Description"><Textarea rows={2} value={desc} onChange={e => setDesc(e.target.value)} /></Field>
          <div className="space-y-2"><span className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">Repositories</span>
            {migrations.map(p => { const on = picked.includes(p.projectId); return <button key={p.projectId} onClick={() => setPicked(s => (on ? s.filter(x => x !== p.projectId) : [...s, p.projectId]))} className={cx('w-full text-left p-3 border rounded-xl flex items-center justify-between cursor-pointer', on ? 'border-[#2563EB] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300')}><span className="text-[15px] font-semibold text-[#0F172A]">{p.projectName}</span><span className={cx('w-5 h-5 rounded-md border flex items-center justify-center text-white text-[13.5px]', on ? 'bg-[#2563EB] border-[#2563EB]' : 'border-slate-300')}>{on && '✓'}</span></button>; })}
          </div>
        </div>
      </Dialog>
    </div>
  );
};
