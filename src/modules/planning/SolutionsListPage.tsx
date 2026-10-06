import React, { useState } from 'react';
import { Clock, Package, Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge, Button, Card, ConfirmDialog, Crumbs, Dialog, EmptyBlock, Field, Input, SearchInput, Textarea, useToast } from '../ui';
import { usePlanning } from './PlanningStore';
import { SolutionProject } from './types';

const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
const stageTone = (stage: string) => (stage === 'requirement_context' ? 'amber' : stage === 'task_breakdown' ? 'green' : 'blue') as 'amber' | 'green' | 'blue';

export const SolutionsListPage: React.FC<{ onOpen: (id: string) => void }> = ({ onOpen }) => {
  const { projects, createProject, updateProject, deleteProject } = usePlanning();
  const { toast } = useToast();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SolutionProject | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [confirm, setConfirm] = useState<SolutionProject | null>(null);

  const list = projects.filter(p => `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase()));
  const inValidation = projects.filter(p => !['requirement_context', 'task_breakdown'].includes(p.stage)).length;
  const stats = [
    { label: 'Total solutions', value: projects.length, cls: 'text-purple-600' },
    { label: 'In discovery', value: projects.filter(p => p.stage === 'requirement_context').length, cls: 'text-emerald-600' },
    { label: 'In planning', value: inValidation, cls: 'text-amber-600' },
    { label: 'Ready to build', value: projects.filter(p => p.stage === 'task_breakdown').length, cls: 'text-blue-600' },
  ];

  const openForm = (p?: SolutionProject) => { setEditing(p ?? null); setForm({ name: p?.name ?? 'Supplier Onboarding Portal', description: p?.description ?? 'A portal where new suppliers upload compliance documents, are risk-checked automatically and approved in days instead of weeks.' }); setOpen(true); };
  const save = () => {
    if (!form.name.trim()) return;
    if (editing) { updateProject(editing.id, form.name.trim(), form.description.trim()); toast({ title: 'Solution updated successfully!' }); }
    else { const p = createProject(form.name.trim(), form.description.trim()); toast({ title: 'Solution created successfully!' }); setOpen(false); onOpen(p.id); return; }
    setOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Crumbs items={[{ label: 'Dashboard' }, { label: 'Solution Architect' }]} />
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Solution Architect</h1>
          <p className="mt-2 text-[16px] text-[#64748B]">{projects.length} • {projects.length === 1 ? 'solution' : 'solutions'} active</p>
        </div>
        <Button variant="dark" icon={<Plus className="w-4 h-4" />} onClick={() => openForm()}>New Solution</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => <Card key={s.label} className="flex flex-col items-center justify-center py-6"><p className="text-[12.5px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-1">{s.label}</p><p className={`text-3xl font-bold tracking-tight ${s.cls}`}>{s.value}</p></Card>)}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">Your Solutions<span className="ml-3 text-[15px] font-normal text-slate-400">{list.length} total</span></h2>
        <SearchInput value={q} onChange={setQ} placeholder="Search solutions…" className="w-full sm:w-96" />
      </div>

      {list.length > 0 ? (
        <Card padded={false} className="overflow-hidden">
          <div className="hidden lg:grid lg:grid-cols-[1fr_140px_190px_140px_160px_88px] gap-4 px-5 py-3.5 text-slate-500 border-b border-slate-200 text-[12.5px] font-bold uppercase tracking-[0.12em] bg-slate-50/80"><span>Name</span><span>Phase</span><span>Stage</span><span>Created at</span><span>Last updated</span><span /></div>
          {list.map(p => (
            <div key={p.id} onClick={() => onOpen(p.id)} className="flex flex-col lg:grid lg:grid-cols-[1fr_140px_190px_140px_160px_88px] gap-3 lg:gap-4 px-5 py-4 items-start lg:items-center cursor-pointer transition-all hover:bg-slate-50 border-b border-slate-100 last:border-b-0 group">
              <div className="min-w-0 w-full"><p className="text-[15px] font-bold text-[#0F172A] truncate group-hover:text-[#2563EB] transition-colors">{p.name}</p>{p.description && <p className="text-[13.5px] text-slate-400 truncate mt-0.5">{p.description}</p>}</div>
              <span className="text-[15px] text-slate-500 font-medium">Planning</span>
              <span><Badge tone={stageTone(p.stage)}>{p.stage.replace(/_/g, ' ')}</Badge></span>
              <span className="text-[15px] text-slate-500">{fmt(p.createdAt)}</span>
              <span className="text-[13.5px] text-slate-400 flex items-center gap-1.5"><Clock className="w-3 h-3" />{fmt(p.updatedAt)}</span>
              <div className="hidden lg:flex items-center justify-end gap-1">
                <button onClick={e => { e.stopPropagation(); openForm(p); }} className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={e => { e.stopPropagation(); setConfirm(p); }} className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </Card>
      ) : (
        <EmptyBlock icon={<Package className="w-6 h-6" />} title="No solutions found" message={q ? 'No solutions match your search.' : 'You haven’t created any solutions yet. Click “New Solution” to get started!'} action={q ? <Button onClick={() => setQ('')}>Clear search</Button> : <Button variant="primary" onClick={() => openForm()}>New Solution</Button>} />
      )}

      <Dialog open={open} onClose={() => setOpen(false)} title={editing ? 'Edit solution' : 'Start a new solution'} subtitle="Solution Planning — update the core details before moving into planning." width="max-w-lg" footer={<><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="primary" disabled={!form.name.trim()} onClick={save}>{editing ? 'Update solution' : 'Create solution'}</Button></>}>
        <div className="space-y-5">
          <Field label="Name" required hint={`${form.name.length}/30`}><Input maxLength={30} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. AI-powered onboarding flow" autoFocus /></Field>
          <Field label="Description"><Textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Briefly describe what this solution does… (optional)" /></Field>
        </div>
      </Dialog>
      <ConfirmDialog open={!!confirm} danger title="Delete this solution?" description={`“${confirm?.name}” and everything planned for it will be removed.`} confirmText="Delete" onClose={() => setConfirm(null)} onConfirm={() => { if (confirm) { deleteProject(confirm.id); toast({ title: 'Deleted', description: 'Solution has been removed.' }); } }} />
    </div>
  );
};
