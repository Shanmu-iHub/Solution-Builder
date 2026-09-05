import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { mockProjects } from '../../data/mockData';
import { Project } from '../../types';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Users, 
  Layers, 
  Calendar, 
  ArrowRight, 
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [search, setSearch] = useState('');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // New project form state
  const [newProjName, setNewProjName] = useState('');
  const [newProjKey, setNewProjKey] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.key.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName || !newProjKey) return;
    const newPrj: Project = {
      id: `proj-${Date.now()}`,
      name: newProjName,
      key: newProjKey.toUpperCase(),
      description: newProjDesc || 'Enterprise business technology workspace',
      status: 'Active',
      productsUsed: ['Solution Architect', 'Monitoring'],
      owner: 'Sanmugavel S',
      updatedAt: 'Just now',
      membersCount: 1
    };
    setProjects([newPrj, ...projects]);
    setIsNewProjectModalOpen(false);
    setNewProjName('');
    setNewProjKey('');
    setNewProjDesc('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Workspace' }, { label: 'Projects' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <FolderKanban className="w-4 h-4" />
            <span>Workspace Control</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Workspace Projects</h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl">
            Centralized management for applications, microservices, cloud topologies, and AI agent workloads.
          </p>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Projects" value={projects.length} subtitle="Enterprise Workspace" isPositive />
        <MetricCard label="Active Deployments" value="12 Active" subtitle="Production clusters" isPositive />
        <MetricCard label="Team Collaborators" value="31 Users" subtitle="Across 4 projects" isPositive />
        <MetricCard label="Cloud Resource Health" value="100%" subtitle="0 degraded services" isPositive />
      </div>

      {/* Search & Project Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects by name or key..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[#0F172A]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-extrabold text-xs text-[#2563EB]">
                      {project.key}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">{project.name}</h3>
                      <span className="text-[11px] text-[#64748B]">Updated {project.updatedAt}</span>
                    </div>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Connected Products */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Connected Products:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.productsUsed.map((prod, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#64748B]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{project.membersCount} members</span>
                  <span>•</span>
                  <span>{project.owner}</span>
                </div>
                <button
                  onClick={() => alert(`Navigating to console for ${project.name}`)}
                  className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>Open Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Workspace Project"
        subtitle="Initialize a project workspace with cloud and AI services"
        actions={
          <>
            <button
              onClick={() => setIsNewProjectModalOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm"
            >
              Create Project
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Project Name</label>
            <input
              type="text"
              required
              value={newProjName}
              onChange={e => {
                setNewProjName(e.target.value);
                if (!newProjKey) {
                  setNewProjKey(e.target.value.slice(0, 3).toUpperCase());
                }
              }}
              placeholder="e.g. Real-Time Telemetry Gateway"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Project Key (Prefix)</label>
            <input
              type="text"
              required
              maxLength={4}
              value={newProjKey}
              onChange={e => setNewProjKey(e.target.value.toUpperCase())}
              placeholder="RTG"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs font-mono uppercase"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={newProjDesc}
              onChange={e => setNewProjDesc(e.target.value)}
              placeholder="Brief description of the project objective..."
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
