import React, { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge, Button, Card, ConfirmDialog, Crumbs, Dialog, EmptyBlock, Field, Input, SearchInput, Textarea, useToast } from '../ui';
import { usePlanning } from './PlanningStore';
import { Chip } from './discovery/DiscoveryDashboard';
import { SolutionProject } from './types';

const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
const stageLabel = (stage: string) => { const t = stage.replace(/_/g, ' '); return t.charAt(0).toUpperCase() + t.slice(1); };

export const SolutionsListPage: React.FC<{ onOpen: (id: string) => void; mode: 'requirement' | 'planning' }> = ({ onOpen, mode }) => {
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
    { label: 'Total solutions', value: projects.length, cls: 'text-[#0F172A]' },
    { label: 'In discovery', value: projects.filter(p => p.stage === 'requirement_context').length, cls: 'text-[#0F172A]' },
    { label: 'In planning', value: inValidation, cls: 'text-[#0F172A]' },
    { label: 'Ready to build', value: projects.filter(p => p.stage === 'task_breakdown').length, cls: 'text-[#0F172A]' },
  ];

  const openForm = (p?: SolutionProject) => { 
    setEditing(p ?? null); 
    setForm({ 
      name: p?.name ?? (mode === 'requirement' ? 'Expense Approvals AI' : 'Sales Analytics Portal'), 
      description: p?.description ?? (mode === 'requirement' ? 'A mobile solution for field sales reps to quickly scan receipts and automatically route them for manager approval without manual paperwork.' : 'A comprehensive dashboard to track daily, weekly, and monthly sales performance across regions.') 
    }); 
    setOpen(true); 
  };
  const save = () => {
    if (!form.name.trim()) return;
    if (editing) { updateProject(editing.id, form.name.trim(), form.description.trim()); toast({ title: mode === 'requirement' ? 'Brief updated successfully!' : 'Solution updated successfully!' }); }
    else { const p = createProject(form.name.trim(), form.description.trim()); toast({ title: mode === 'requirement' ? 'Requirement draft created successfully!' : 'Solution created successfully!' }); setOpen(false); onOpen(p.id); return; }
    setOpen(false);
  };

  const isReq = mode === 'requirement';
  const pageTitle = isReq ? 'Requirement Gathering' : 'Requirement Gathering';
  const pageSub = isReq ? 'Define, validate, and plan solutions from idea to delivery.' : `${projects.length} • ${projects.length === 1 ? 'solution' : 'solutions'} active`;
  const btnLabel = isReq ? 'New Solution' : 'New Solution';
  
  const reqStats = [
    { label: 'Total Solutions', value: projects.length, cls: 'text-indigo-600' },
    { label: 'Ideas drafted', value: projects.filter(p => p.stage === 'requirement_context').length, cls: 'text-sky-600' },
    { label: 'In refinement', value: inValidation, cls: 'text-fuchsia-600' },
    { label: 'Approved specs', value: projects.filter(p => p.stage === 'task_breakdown').length, cls: 'text-teal-600' },
  ];
  const activeStats = isReq ? reqStats : stats;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Crumbs items={[{ label: 'Dashboard' }, { label: pageTitle }]} />
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">{pageTitle}</h1>
          <p className="mt-2 text-[16px] text-[#64748B]">{pageSub}</p>
        </div>
        <Button variant="dark" icon={<Plus className="w-4 h-4" />} onClick={() => openForm()}>{btnLabel}</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeStats.map(s => <div key={s.label} className="rounded-xl border border-slate-200 bg-white px-5 py-4"><p className="text-[13px] font-medium text-slate-500">{s.label}</p><p className={`text-2xl font-semibold tracking-tight mt-1 ${s.cls}`}>{s.value}</p></div>)}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-[#0F172A]">{isReq ? 'Active Briefs' : 'Your Solutions'}<span className="ml-3 text-[15px] font-normal text-slate-400">{list.length} total</span></h2>
        <SearchInput value={q} onChange={setQ} placeholder={isReq ? "Search briefs…" : "Search solutions…"} className="w-full sm:w-96" />
      </div>

      {list.length > 0 ? (
        <Card padded={false} className="overflow-hidden">
          <div className="hidden lg:grid lg:grid-cols-[1fr_140px_190px_140px_160px_88px] gap-4 px-5 py-3.5 text-slate-500 border-b border-slate-200 text-[12.5px] font-medium bg-slate-50"><span>Name</span><span>Phase</span><span>Stage</span><span>Created at</span><span>Last updated</span><span /></div>
          {list.map(p => (
            <div key={p.id} onClick={() => onOpen(p.id)} className="flex flex-col lg:grid lg:grid-cols-[1fr_140px_190px_140px_160px_88px] gap-3 lg:gap-4 px-5 py-4 items-start lg:items-center cursor-pointer transition-all hover:bg-slate-50 border-b border-slate-100 last:border-b-0 group">
              <div className="min-w-0 w-full"><p className="text-[15px] font-semibold text-[#0F172A] truncate">{p.name}</p>{p.description && <p className="text-[13.5px] text-slate-400 truncate mt-0.5">{p.description}</p>}</div>
              <span className="text-[15px] text-slate-500 font-medium">{isReq ? 'Discovery' : 'Planning'}</span>
              <span><Chip>{stageLabel(p.stage)}</Chip></span>
              <span className="text-[15px] text-slate-500">{fmt(p.createdAt)}</span>
              <span className="text-[13.5px] text-slate-400">{fmt(p.updatedAt)}</span>
              <div className="hidden lg:flex items-center justify-end gap-1">
                <button onClick={e => { e.stopPropagation(); openForm(p); }} className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={e => { e.stopPropagation(); setConfirm(p); }} className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </Card>
      ) : (
        <EmptyBlock title={isReq ? "No briefs found" : "No solutions found"} message={q ? (isReq ? 'No briefs match your search.' : 'No solutions match your search.') : (isReq ? 'Start gathering requirements for a new idea.' : 'You haven’t created any solutions yet. Click “New Solution” to get started!')} action={q ? <Button onClick={() => setQ('')}>Clear search</Button> : <Button variant="primary" onClick={() => openForm()}>{btnLabel}</Button>} />
      )}

      <Dialog open={open} onClose={() => setOpen(false)} title={editing ? (isReq ? 'Edit brief' : 'Edit solution') : (isReq ? 'Start a new solution' : 'Start a new solution')} subtitle={isReq ? "Frame the problem and define product requirements." : "Solution Planning — update the core details before moving into planning."} width="max-w-lg" footer={<><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="primary" disabled={!form.name.trim()} onClick={save}>{editing ? 'Update' : (isReq ? 'Start discovery' : 'Create solution')}</Button></>}>
        <div className="space-y-5">
          <Field label={isReq ? "Name" : "Name"} required hint={`${form.name.length}/30`}><Input maxLength={30} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. AI-powered onboarding flow" autoFocus /></Field>
          {/* <Field label="Description"><Textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Briefly describe what this solution does… (optional)" /></Field> */}
        </div>
      </Dialog>
      <ConfirmDialog open={!!confirm} danger title={isReq ? "Delete this brief?" : "Delete this solution?"} description={`“${confirm?.name}” and everything associated with it will be removed.`} confirmText="Delete" onClose={() => setConfirm(null)} onConfirm={() => { if (confirm) { deleteProject(confirm.id); toast({ title: 'Deleted', description: isReq ? 'Brief has been removed.' : 'Solution has been removed.' }); } }} />
    </div>
  );
};
