import React, { useEffect, useRef, useState } from 'react';
import { Database, Loader2, Plus, Search } from 'lucide-react';
import { Button, Card, Dialog, EmptyBlock, Input, PageHeader, Tabs, cx, useToast } from '../ui';
import { useKnowledge } from './KnowledgeStore';
import { BuildPanel, MapPanel, SchemaPanel, StatusPill } from './panels';
import { DefinitionsEditor } from './DefinitionsEditor';
import { ProjectView } from './types';

const RegisterDialog: React.FC<{ open: boolean; onClose: () => void; onRegistered: (p: ProjectView) => void }> = ({ open, onClose, onRegistered }) => {
  const { available, register } = useKnowledge();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const list = available.filter(a => a.name.toLowerCase().includes(search.trim().toLowerCase()));
  return (
    <Dialog open={open} onClose={onClose} title="Register a project" subtitle="Pick a project to add to the knowledge graph. You can then preview its data, define relationships, and build its map." width="max-w-lg">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects by name" className="!pl-9" />
      </div>
      <div className="max-h-80 overflow-auto -mx-1 px-1">
        {list.length === 0 && <p className="py-6 text-[15px] text-slate-500 text-center">{search ? 'No projects match that search.' : 'Every project is already registered.'}</p>}
        {list.map(p => (
          <div key={p.projectId} className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-100 last:border-0">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-[#0F172A] truncate">{p.name}</p>
              <p className="text-[13.5px] text-slate-500">{p.phase}{p.stage ? ` · ${p.stage}` : ''}</p>
            </div>
            <Button size="sm" disabled={busy !== null} loading={busy === p.projectId} onClick={async () => { setBusy(p.projectId); const proj = await register(p.projectId); setBusy(null); toast({ title: `Registered “${proj.name}”` }); onRegistered(proj); onClose(); }}>Register</Button>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export const ProjectKnowledgePage: React.FC = () => {
  const { projects } = useKnowledge();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(projects[0]?.projectId ?? null);
  const [tab, setTab] = useState<'overview' | 'data' | 'definitions' | 'map'>('overview');
  const [registerOpen, setRegisterOpen] = useState(false);
  const selected = projects.find(p => p.projectId === selectedId) ?? null;

  // say when a running build finishes
  const prev = useRef<string | null>(null);
  useEffect(() => {
    if (prev.current === 'building' && selected && selected.status !== 'building') {
      toast({ title: selected.status === 'ready' ? `The map for “${selected.name}” is ready` : `The build for “${selected.name}” failed`, tone: selected.status === 'ready' ? 'success' : 'error' });
    }
    prev.current = selected?.status ?? null;
  }, [selected?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="Project Knowledge" subtitle="Connect a project’s data into a relationship map that planning agents can search." icon={<Database className="w-5 h-5" />} />

      <Card padded={false} className="flex flex-col md:flex-row overflow-hidden min-h-[640px]">
        <aside className="md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/60 flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-2">
            <h2 className="text-[15px] font-bold text-[#0F172A]">Projects</h2>
            <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => setRegisterOpen(true)}>Register</Button>
          </div>
          <div className="flex-1 overflow-auto">
            {projects.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-[15px] font-semibold text-[#0F172A]">No projects registered yet</p>
                <p className="text-[13.5px] text-slate-500 mt-1">Register a project to start building its relationship map.</p>
              </div>
            )}
            <ul>
              {projects.map(p => (
                <li key={p.projectId}>
                  <button onClick={() => { setSelectedId(p.projectId); setTab('overview'); }} aria-current={selectedId === p.projectId} className={cx('w-full text-left px-4 py-3 border-b border-slate-100 flex flex-col gap-1.5 hover:bg-white transition cursor-pointer', selectedId === p.projectId && 'bg-white shadow-[inset_3px_0_0_#2563EB]')}>
                    <span className="text-[15px] font-semibold text-[#0F172A] truncate" title={p.name}>{p.name}</span>
                    <span className="flex items-center justify-between gap-2">
                      <StatusPill status={p.status} />
                      {p.status === 'ready' && p.build.stats && <span className="text-[13.5px] text-slate-500">{p.build.stats.entities} entities</span>}
                      {p.status === 'building' && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="flex-1 min-w-0 p-6">
          {!selected ? (
            <EmptyBlock icon={<Database className="w-6 h-6" />} title="Register a project to get started" message="Use the Register button on the left to pick one." />
          ) : (
            <div className="space-y-6" key={selected.projectId}>
              <Tabs active={tab} onChange={setTab} tabs={[{ id: 'overview', label: 'Overview' }, { id: 'data', label: 'Data' }, { id: 'definitions', label: 'Definitions' }, { id: 'map', label: 'Map' }]} />
              {tab === 'overview' && <BuildPanel project={selected} />}
              {tab === 'data' && <SchemaPanel projectId={selected.projectId} />}
              {tab === 'definitions' && <DefinitionsEditor projectId={selected.projectId} />}
              {tab === 'map' && <MapPanel project={selected} />}
            </div>
          )}
        </section>
      </Card>

      <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} onRegistered={p => { setSelectedId(p.projectId); setTab('overview'); }} />
    </div>
  );
};
