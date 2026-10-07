import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowRightLeft, ClipboardList, Clock, Folder, FolderUp, Layers, Plus, Trash2, Zap } from 'lucide-react';
import { Badge, Button, ConfirmDialog, Crumbs, Dialog, EmptyBlock, Field, Input, SearchInput, Textarea, cx, useToast, GithubIcon as Github } from '../ui';
import { useFactory } from './FactoryStore';
import { FactoryKind, FactoryProject } from './types';

interface Props {
  kind: FactoryKind;
  onBack: () => void;
  onOpen: (id: string) => void;
  onGroups: () => void;
}

const META: Record<FactoryKind, { crumb: string; title: string; subtitle?: string; cta: string; badge: string; dialogTitle: string; dialogDesc: string; nameLabel: string; namePlaceholder: string; descPlaceholder: string; emptyTitle: string; emptyBody: string; icon: typeof Layers; tone: string }> = {
  'full-stack': { crumb: 'Full Stack App', title: 'Full Stack', cta: 'New Project', badge: 'Full Stack', dialogTitle: 'Create New Project', dialogDesc: 'Give your full-stack application a name and an optional description to get started.', nameLabel: 'Project name', namePlaceholder: 'e.g. E-Commerce Dashboard', descPlaceholder: 'A brief overview of what this application does…', emptyTitle: 'No projects found', emptyBody: "You haven't created any full-stack projects yet. Start by creating a new project.", icon: Folder, tone: 'purple' },
  'ui-canvas': { crumb: 'Frontend Creator', title: 'Frontend Creator / UI Canvas', subtitle: 'Prompt a page into existence, then refine it with the chat.', cta: 'New Project', badge: 'UI Canvas', dialogTitle: 'New UI Project', dialogDesc: 'Name your interface project. You can describe the first page in the chat.', nameLabel: 'Project name', namePlaceholder: 'e.g. SaaS Landing Page', descPlaceholder: 'What is this interface for?', emptyTitle: 'No UI projects yet', emptyBody: 'Create your first UI project and describe the page you want.', icon: Zap, tone: 'emerald' },
  'code-migration': { crumb: 'Code Migration', title: 'Code Migration', subtitle: 'Migrate legacy code to modern languages and frameworks with AI', cta: 'New Migration', badge: 'Migration', dialogTitle: 'New Migration Project', dialogDesc: 'Give your migration project a name, point it at a source, and describe the target stack in the chat.', nameLabel: 'Project name', namePlaceholder: 'e.g. Flask to FastAPI Migration', descPlaceholder: 'Briefly describe the migration goal…', emptyTitle: 'No migration projects yet', emptyBody: 'Create a new migration project to start converting your legacy code to modern stacks.', icon: ArrowRightLeft, tone: 'blue' },
  'planner-app': { crumb: 'Solution Builder Application', title: 'Solution Builder Applications', subtitle: 'Manage strategic roadmaps and execution sessions from Solution Planner.', cta: 'New Application', badge: 'Solution Planner', dialogTitle: 'New Solution Builder Session', dialogDesc: 'Create an execution session for solution planner requirements.', nameLabel: 'Application name', namePlaceholder: 'e.g. Enterprise Solution Architecture', descPlaceholder: 'Overview of requirement context or solution roadmap…', emptyTitle: 'No Solution Builder sessions found', emptyBody: "You haven't created any Solution Builder applications yet. Create one to get started.", icon: ClipboardList, tone: 'amber' },
};

const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

export const FactoryProjectsPage: React.FC<Props> = ({ kind, onBack, onOpen, onGroups }) => {
  const m = META[kind];
  const { projects, createProject, deleteProject } = useFactory();
  const { toast } = useToast();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const DEFAULTS: Record<FactoryKind, { name: string; desc: string }> = {
    'full-stack': { name: 'Vendor Management Portal', desc: 'Portal for onboarding vendors, tracking contracts and approving invoices, with role-based access and a full audit history.' },
    'ui-canvas': { name: 'Product Launch Landing Page', desc: 'High-fidelity landing page for a B2B analytics product with hero, features, pricing, testimonials and a demo request form.' },
    'code-migration': { name: 'Legacy CRM to Node.js Migration', desc: 'Move the legacy PHP CRM services to Node.js (Express + TypeScript) with identical behaviour and automated tests.' },
    'planner-app': { name: 'Supplier Onboarding Solution', desc: 'Execution session for the supplier onboarding roadmap: compliance document intake, risk checks and approvals.' },
  };
  const [name, setName] = useState(DEFAULTS[kind].name);
  const [desc, setDesc] = useState(DEFAULTS[kind].desc);
  const [source, setSource] = useState<'github' | 'upload'>('github');
  const [repoUrl, setRepoUrl] = useState('https://github.com/acme/legacy-crm');
  const [folder, setFolder] = useState<{ name: string; count: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [creating, setCreating] = useState(false);
  const [confirm, setConfirm] = useState<FactoryProject | null>(null);
  const folderRef = useRef<HTMLInputElement>(null);

  const openCreate = () => { setName(DEFAULTS[kind].name); setDesc(DEFAULTS[kind].desc); setOpen(true); };

  const list = projects.filter(p => p.kind === kind && (p.projectName || 'Untitled').toLowerCase().includes(q.toLowerCase()));
  const Icon = m.icon;

  const pickFolder = (files: FileList | null) => {
    if (!files || !files.length) return;
    const first = files[0] as any;
    setFolder({ name: first.webkitRelativePath ? first.webkitRelativePath.split('/')[0] : 'local-folder', count: files.length });
  };

  const create = async () => {
    if (!name.trim()) return toast({ title: 'Required', description: 'Please enter a project name', tone: 'error' });
    if (kind === 'code-migration' && source === 'github' && !repoUrl.trim()) return toast({ title: 'Required', description: 'Please enter a GitHub repository URL', tone: 'error' });
    if (kind === 'code-migration' && source === 'upload' && !folder) return toast({ title: 'Required', description: 'Please select a local folder', tone: 'error' });
    setCreating(true);
    const p = await createProject(kind, { projectName: name.trim(), description: desc.trim(), sourceType: source, sourceRef: source === 'github' ? repoUrl.trim() : folder?.name });
    setCreating(false);
    setOpen(false);
    setName(DEFAULTS[kind].name); setDesc(DEFAULTS[kind].desc); setRepoUrl('https://github.com/acme/legacy-crm'); setFolder(null);
    toast({ title: 'Project created', description: p.projectName });
    onOpen(p.projectId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Crumbs items={[{ label: 'Solution Builder', onClick: onBack }, { label: m.crumb }]} />
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">{m.title}</h1>
          {m.subtitle && <p className="text-[15px] text-[#64748B] mt-1">{m.subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {kind === 'code-migration' && <Button icon={<ArrowRightLeft className="w-4 h-4" />} onClick={onGroups}>Repo Groups</Button>}
          <Button variant="dark" icon={<Plus className="w-4 h-4" />} onClick={openCreate}>{m.cta}</Button>
        </div>
      </div>

      <SearchInput value={q} onChange={setQ} placeholder={`Search your ${m.title.toLowerCase()} projects…`} className="max-w-md mb-8" />

      {list.length === 0 ? (
        <EmptyBlock icon={<Layers className="w-6 h-6" />} title={m.emptyTitle} message={m.emptyBody} action={<Button variant="primary" onClick={openCreate}>Create first project</Button>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {list.map(p => (
            <div key={p.projectId} onClick={() => onOpen(p.projectId)} className="group relative flex h-60 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle transition-all cursor-pointer hover:border-[#2563EB]/40 hover:shadow-card animate-fade-in">
              <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#2563EB] transition-transform duration-500 group-hover:scale-x-100" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center transition-colors group-hover:bg-[#2563EB] group-hover:text-white"><Icon className="w-[18px] h-[18px]" /></div>
                  <Badge className="group-hover:opacity-0 transition-opacity">{m.badge}</Badge>
                  <button onClick={e => { e.stopPropagation(); setConfirm(p); }} className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
                <h3 className="text-[19px] font-bold tracking-tight text-[#0F172A] line-clamp-1">{p.projectName || 'Untitled Project'}</h3>
                <p className="text-[15px] text-[#64748B] leading-relaxed line-clamp-2 mt-1.5">{p.description || 'No description provided.'}</p>
                {(p.sourceLanguage || p.targetLanguage) && (
                  <div className="flex items-center gap-2 mt-2">
                    {p.sourceLanguage && <Badge>{p.sourceLanguage}</Badge>}
                    {p.targetLanguage && <><ArrowRight className="w-3 h-3 text-slate-400" /><Badge tone="blue">{p.targetLanguage}</Badge></>}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wider text-slate-400"><Clock className="w-3 h-3" />{fmt(p.updatedAt || p.createdAt)}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1.5 group-hover:text-[#2563EB]" />
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onClose={() => !creating && setOpen(false)} title={m.dialogTitle} subtitle={m.dialogDesc} width="max-w-lg"
        footer={<><Button onClick={() => setOpen(false)} disabled={creating}>Cancel</Button><Button variant="primary" loading={creating} disabled={!name.trim()} onClick={create}>{creating ? 'Creating…' : kind === 'planner-app' ? 'Create application' : 'Create project'}</Button></>}>
        <div className="space-y-5">
          <Field label={m.nameLabel} required><Input autoFocus value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && kind !== 'code-migration' && create()} placeholder={m.namePlaceholder} /></Field>
          {kind === 'code-migration' && (
            <div className="space-y-2">
              <span className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">Source</span>
              <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                {([['github', 'GitHub URL', Github], ['upload', 'Local folder', FolderUp]] as const).map(([k, label, I]) => (
                  <button key={k} type="button" onClick={() => setSource(k)} className={cx('flex flex-1 items-center justify-center gap-2 py-2 rounded-lg text-[13.5px] font-semibold transition cursor-pointer', source === k ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-[#0F172A]')}><I className="w-3.5 h-3.5" />{label}</button>
                ))}
              </div>
              {source === 'github' ? (
                <Input value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/owner/repo" />
              ) : (
                <div onClick={() => folderRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); pickFolder(e.dataTransfer.files); }} className={cx('flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 text-center transition', dragging ? 'border-[#2563EB] bg-blue-50' : 'border-slate-200 bg-slate-50')}>
                  <FolderUp className="w-6 h-6 text-slate-400" />
                  {folder ? <p className="text-[13.5px] text-slate-600"><b>{folder.name}</b> — {folder.count} files selected</p> : <p className="text-[13.5px] text-slate-500">Click or drop a folder to select it</p>}
                  <input ref={folderRef} type="file" multiple className="hidden" onChange={e => pickFolder(e.target.files)} {...({ webkitdirectory: '', directory: '' } as any)} />
                </div>
              )}
            </div>
          )}
          <Field label="Description (optional)"><Textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder={m.descPlaceholder} /></Field>
        </div>
      </Dialog>

      <ConfirmDialog open={!!confirm} danger title="Delete this project?" description={`“${confirm?.projectName}” and all of its generated files and chat history will be permanently deleted.`} confirmText="Delete" onClose={() => setConfirm(null)} onConfirm={() => { if (confirm) { deleteProject(confirm.projectId); toast({ title: 'Deleted', description: 'Project deleted successfully!' }); } }} />
    </div>
  );
};
