import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { mockProjects } from '../../data/mockData';
import { Project, WorkspaceView } from '../../types';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Users, 
  Layers, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  MoreVertical,
  CheckCircle2,
  Trash2,
  Terminal,
  Activity,
  Cpu,
  Database,
  ExternalLink,
  Shield,
  Zap,
  Play,
  Copy,
  Check,
  RotateCw,
  Clock,
  Server,
  AlertTriangle,
  ChevronRight,
  Code2,
  Globe,
  Lock,
  Download,
  Share2
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [search, setSearch] = useState('');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  
  // Dedicated Full-Page Console State
  const [selectedConsoleProject, setSelectedConsoleProject] = useState<Project | null>(null);
  const [consoleTab, setConsoleTab] = useState<'overview' | 'logs' | 'endpoints' | 'team'>('overview');
  const [copiedKey, setCopiedKey] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

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

  const handleDeleteProject = () => {
    if (!projectToDelete) return;
    setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
    if (selectedConsoleProject?.id === projectToDelete.id) {
      setSelectedConsoleProject(null);
    }
    setProjectToDelete(null);
  };

  const handleCopyEndpoint = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRestartServices = () => {
    setIsRestarting(true);
    setTimeout(() => {
      setIsRestarting(false);
      alert('Microservice cluster rebooted and health check 200 OK passed.');
    }, 1200);
  };

  // =========================================================================
  // VIEW 1: FULL-PAGE PROJECT CONSOLE UI (WHEN OPEN CONSOLE IS CLICKED)
  // =========================================================================
  if (selectedConsoleProject) {
    return (
      <div className="space-y-8 animate-fade-in select-none pb-20 max-w-7xl mx-auto">
        
        {/* 1. Breadcrumb and Back Navigation Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setSelectedConsoleProject(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Knowledge Base & Projects
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px]">
              {selectedConsoleProject.name} Console
            </span>
          </div>

          <button
            onClick={() => setSelectedConsoleProject(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all shadow-2xs cursor-pointer w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* 2. Hero Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-indigo-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Info Column */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 border-2 border-blue-200 text-[#2563EB] flex items-center justify-center font-extrabold text-xl sm:text-2xl shrink-0 shadow-md">
                {selectedConsoleProject.key}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={selectedConsoleProject.status} />
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    Project Key: {selectedConsoleProject.key}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active Cluster</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {selectedConsoleProject.name}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {selectedConsoleProject.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>{selectedConsoleProject.membersCount}</strong> Team Collaborators</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span>Owner: <strong className="text-slate-700">{selectedConsoleProject.owner}</strong></span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Updated {selectedConsoleProject.updatedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[220px]">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('solution-builder-fullstack');
                }}
                className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Solution Builder</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestartServices}
                  disabled={isRestarting}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRestarting ? 'animate-spin text-blue-600' : ''}`} />
                  <span>{isRestarting ? 'Restarting...' : 'Restart Pods'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectToDelete(selectedConsoleProject)}
                  className="p-2.5 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Live Telemetry Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cluster Health</span>
            <div className="flex items-center gap-2 text-lg font-extrabold text-emerald-600">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Healthy (200 OK)</span>
            </div>
            <p className="text-[11px] text-slate-500">99.99% Availability SLA</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CPU Compute Load</span>
            <div className="text-lg font-extrabold text-slate-900">
              24.2% <span className="text-xs font-medium text-slate-400">/ 8 Cores</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[24%] h-full bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Memory Allocation</span>
            <div className="text-lg font-extrabold text-slate-900">
              1.84 GB <span className="text-xs font-medium text-slate-400">/ 8.0 GB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[23%] h-full bg-indigo-500 rounded-full" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">API Avg Latency</span>
            <div className="text-lg font-extrabold text-blue-600">
              38 ms <span className="text-xs font-medium text-slate-400">p95 response</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold">● Fast edge routing</p>
          </div>
        </div>

        {/* 4. Tab Navigation */}
        <div className="border-b border-slate-200 flex items-center gap-8 text-sm font-bold">
          <button
            onClick={() => setConsoleTab('overview')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              consoleTab === 'overview'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture & Connected Services</span>
          </button>

          <button
            onClick={() => setConsoleTab('logs')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              consoleTab === 'logs'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Live Cluster Logs</span>
          </button>

          <button
            onClick={() => setConsoleTab('endpoints')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              consoleTab === 'endpoints'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>API Endpoints & Keys</span>
          </button>

          <button
            onClick={() => setConsoleTab('team')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              consoleTab === 'team'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team & Access Control ({selectedConsoleProject.membersCount})</span>
          </button>
        </div>

        {/* 5. Tab Content */}
        {consoleTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Connected Services */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Connected Enterprise Workspaces</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Microservices, AI models, and cloud management modules currently bound to this project.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentView('products')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Attach Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {selectedConsoleProject.productsUsed.map((prod, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-white transition-all flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{prod}</h4>
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Connected & Operational
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (prod === 'Solution Architect') setCurrentView('product-solution-architect');
                          else if (prod === 'Monitoring') setCurrentView('product-monitoring');
                          else if (prod === 'FinOps') setCurrentView('product-finops');
                          else if (prod === 'Compliance') setCurrentView('product-compliance');
                          else if (prod === 'DevOps') setCurrentView('product-devops');
                          else if (prod === 'Testing') setCurrentView('product-testing');
                          else setCurrentView('products');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-slate-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                      >
                        Launch
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quick Diagnostics & Config */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Actions
                </span>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => alert('Triggering stress test for 10,000 synthetic requests...')}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Run Chaos & Load Test</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('Exporting Terraform IaC configuration for this project topology...')}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span>Export Terraform Blueprint</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Project console link copied to clipboard!');
                    }}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-xs font-bold text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-slate-600" />
                      <span>Share Project Workspace</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {consoleTab === 'logs' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 font-mono text-xs text-slate-200 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-slate-300">Cluster Container Logs ({selectedConsoleProject.key})</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    isLiveStreaming
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                  <span>{isLiveStreaming ? 'LIVE' : 'PAUSED'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed max-h-96 overflow-y-auto">
              <div className="text-slate-400">[2026-09-07 16:36:01] [BOOT] Kubernetes node pool `ap-south-1a-prod` ready.</div>
              <div className="text-emerald-400">[2026-09-07 16:36:04] [TLS] Zero-trust ingress proxy attached to cloud endpoints.</div>
              <div className="text-slate-300">[2026-09-07 16:36:09] [ROUTER] Ingress load balancer receiving 1,850 req/sec across 4 pods.</div>
              <div className="text-blue-300">[2026-09-07 16:36:15] [RAG] Vector database synchronized with 14,200 company documents.</div>
              <div className="text-emerald-400">[2026-09-07 16:36:20] [HEALTH] Prometheus exporter health status: 200 OK. 0 errors detected.</div>
              <div className="text-slate-300">[2026-09-07 16:36:28] [FINOPS] Auto-scaler rightsized idle worker node (₹4,200/mo estimated saving).</div>
            </div>
          </div>
        )}

        {consoleTab === 'endpoints' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Production API Endpoints & Access Tokens</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Integrate {selectedConsoleProject.name} directly into your frontend, mobile, or backend microservices.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Production REST Base URL</span>
                <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-slate-200">
                  <span className="font-mono text-xs text-slate-800">
                    https://api.snssquare.com/v1/workspaces/{selectedConsoleProject.key.toLowerCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyEndpoint(`https://api.snssquare.com/v1/workspaces/${selectedConsoleProject.key.toLowerCase()}`)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project API Key Token</span>
                <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-slate-200">
                  <span className="font-mono text-xs text-slate-800">
                    sk_live_enterprise_{selectedConsoleProject.key.toLowerCase()}_9948271a
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyEndpoint(`sk_live_enterprise_${selectedConsoleProject.key.toLowerCase()}_9948271a`)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {consoleTab === 'team' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Team Collaborators & IAM Access</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage permissions and roles for engineers working on {selectedConsoleProject.name}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Invite member form opened')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Invite Collaborator</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                    SS
                  </div>
                  <div>
                    <strong className="text-xs text-slate-900 block">Sanmugavel S (You)</strong>
                    <span className="text-[11px] text-slate-500">sanmugavel@snssquare.com</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
                  Project Owner
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                    ER
                  </div>
                  <div>
                    <strong className="text-xs text-slate-900 block">Elena Rostova</strong>
                    <span className="text-[11px] text-slate-500">elena.r@snssquare.com</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300">
                  Lead Architect
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: KNOWLEDGE BASE & PROJECTS CARDS LIST (DEFAULT)
  // =========================================================================
  return (
    <div className="space-y-6 animate-fade-in select-none pb-12">
      <Breadcrumb items={[{ label: 'Resources' }, { label: 'Knowledge Base & Projects' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <FolderKanban className="w-4 h-4" />
            <span>Workspace & Knowledge Base Control</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Knowledge Base & Projects</h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl">
            Centralized management for applications, microservices, cloud topologies, and AI agent workloads.
          </p>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Projects" value={projects.length} subtitle="Enterprise Workspace" isPositive />
        <MetricCard label="Active Deployments" value="12 Active" subtitle="Production clusters" isPositive />
        <MetricCard label="Team Collaborators" value="31 Users" subtitle="Across active projects" isPositive />
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
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[#0F172A]"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong>{filteredProjects.length}</strong> projects
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FolderKanban className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No projects found</h3>
            <p className="text-xs text-slate-400 mt-1">Try refining your search keyword or create a new project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-extrabold text-xs text-[#2563EB] shadow-2xs">
                        {project.key}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        <span className="text-[11px] text-[#64748B]">Updated {project.updatedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={project.status} />

                      {/* Delete Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectToDelete(project);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Connected Products */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Connected Products:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.productsUsed.map((prod, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200/60">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.membersCount} members</span>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{project.owner}</span>
                  </div>

                  {/* Open Console Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedConsoleProject(project);
                      setConsoleTab('overview');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#2563EB] hover:text-blue-800 flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    <span>Open Console</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Project Confirmation Modal */}
      {projectToDelete && (
        <Modal
          isOpen={!!projectToDelete}
          onClose={() => setProjectToDelete(null)}
          title="Delete Project?"
          subtitle="This action will permanently remove the project workspace"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block font-bold">Are you sure you want to delete {projectToDelete.name}?</strong>
                <p className="text-[11px] text-rose-700 leading-relaxed">
                  All connected services ({projectToDelete.productsUsed.join(', ')}) and associated configurations will be removed.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-3.5 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Project</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Project Creation Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Workspace Project"
        subtitle="Initialize a project workspace with cloud and AI services"
        actions={
          <>
            <button
              onClick={() => setIsNewProjectModalOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm cursor-pointer"
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
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs"
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
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs font-mono uppercase"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={newProjDesc}
              onChange={e => setNewProjDesc(e.target.value)}
              placeholder="Brief description of the project objective..."
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
