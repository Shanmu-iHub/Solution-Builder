import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { 
  Layers, 
  Settings, 
  Code2, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  Cloud,
  Database,
  Terminal,
  CheckCircle2,
  Cpu,
  Boxes,
  Zap,
  Play,
  Server,
  Workflow,
  Check
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const SolutionBuilderFullStack: React.FC = () => {
  const { setCurrentView, navigateToProduct } = useNavigation();
  const [isFullStackModalOpen, setIsFullStackModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in select-none pb-16 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumb Top Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button 
          onClick={() => setCurrentView('home')} 
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-500">Solution Builder</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Full Stack</span>
      </nav>

      {/* 2. Enhanced Enterprise Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]/40 border border-slate-200/90 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        
        {/* Ambient Background Mesh & Grid Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-sky-300/15 via-cyan-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Typography & Badges */}
          <div className="flex-1 max-w-xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-blue-200/80 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>SOLUTION BUILDER PLATFORM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
              Full Stack <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">Architecture</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
              Build complete enterprise solutions with end-to-end system architecture, autonomous code scaffolding, and multi-cloud deployment.
            </p>

            {/* Capability Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>AI Architecture Canvas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Code & API Factory</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Multi-Cloud IaC</span>
              </span>
            </div>
          </div>

          {/* Right Column: High-End 3D Architecture Canvas */}
          <div className="w-full lg:w-[560px] h-[320px] sm:h-[350px] relative flex items-center justify-center">
            
            {/* Connecting Circuit SVG with Glowing Pulses */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 560 350" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Connection Pathways */}
              <path d="M 100 175 L 150 175 L 200 125 L 320 125" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 280 75 L 340 75 L 380 120 L 490 120" stroke="url(#glowLine)" strokeWidth="2" />
              <path d="M 390 75 L 450 75 L 500 75" stroke="#CBD5E1" strokeWidth="2" />
              <path d="M 380 220 L 440 220 L 490 220" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 260 260 L 320 260 L 360 220" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Glowing Terminal Node Rings */}
              <circle cx="340" cy="75" r="5" fill="#2563EB" filter="url(#glowEffect)" />
              <circle cx="340" cy="75" r="2.5" fill="#FFFFFF" />
              
              <circle cx="500" cy="75" r="5" fill="#6366F1" filter="url(#glowEffect)" />
              <circle cx="500" cy="75" r="2.5" fill="#FFFFFF" />

              <circle cx="490" cy="220" r="5" fill="#0EA5E9" filter="url(#glowEffect)" />
              <circle cx="490" cy="220" r="2.5" fill="#FFFFFF" />
            </svg>

            {/* Stage Tags matching reference */}
            <div className="absolute top-10 left-[56%] px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
              PLAN
            </div>
            
            <div className="absolute top-10 right-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              BUILD
            </div>

            <div className="absolute top-[58%] right-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              DEPLOY
            </div>

            {/* Left "FROM IDEA TO IMPACT" Stacked Badge */}
            <div className="absolute left-2 sm:left-6 top-[38%] bg-white/90 border border-slate-200/90 rounded-xl p-2.5 shadow-2xs flex flex-col items-center">
              <span className="text-[9px] font-extrabold text-slate-500 tracking-[0.15em] uppercase leading-tight text-center">
                FROM<br />IDEA TO<br />IMPACT
              </span>
              <div className="w-6 h-0.5 bg-blue-600 mt-1.5 rounded-full" />
            </div>

            {/* Central 3D Dark IDE Terminal Window */}
            <div 
              className="absolute left-[24%] top-[18%] w-[170px] sm:w-[195px] bg-[#0F172A] rounded-2xl shadow-2xl p-3 flex flex-col justify-between border border-slate-700/80 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20"
            >
              {/* IDE Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[9px] font-mono text-slate-400">solution.config.ts</span>
              </div>

              {/* Code Lines Mockup */}
              <div className="space-y-1.5 py-2.5 font-mono text-[9px]">
                <div className="flex items-center gap-1">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-300">stack</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-amber-300">&#123;</span>
                </div>
                <div className="pl-3 text-slate-300">
                  arch: <span className="text-emerald-400">'Microservices'</span>,
                </div>
                <div className="pl-3 text-slate-300">
                  cloud: <span className="text-sky-400">'AWS + K8s'</span>
                </div>
                <div className="text-amber-300">&#125;;</div>
              </div>

              {/* IDE Footer Live Status */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[8px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready to Deploy
                </span>
                <span className="font-mono">v2.4</span>
              </div>
            </div>

            {/* Satellite 3D Tile 1: Code Tile </> */}
            <div 
              className="absolute right-[22%] top-[14%] w-16 sm:w-18 h-16 sm:h-18 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 flex flex-col items-center justify-center text-slate-800 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-30 group/tile"
            >
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 mb-0.5 group-hover/tile:bg-blue-600 group-hover/tile:text-white transition-colors">
                <Code2 className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">CODE</span>
            </div>

            {/* Satellite 3D Tile 2: Cloud Tile */}
            <div 
              className="absolute right-[32%] bottom-[10%] w-14 sm:w-16 h-14 sm:h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/90 flex flex-col items-center justify-center text-slate-700 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 group/tile"
            >
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 mb-0.5 group-hover/tile:bg-indigo-600 group-hover/tile:text-white transition-colors">
                <Cloud className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">CLOUD</span>
            </div>

            {/* Satellite 3D Tile 3: Database Tile */}
            <div 
              className="absolute right-[8%] bottom-[12%] w-14 sm:w-16 h-14 sm:h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/90 flex flex-col items-center justify-center text-slate-700 transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 group/tile"
            >
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 mb-0.5 group-hover/tile:bg-emerald-600 group-hover/tile:text-white transition-colors">
                <Database className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">DATA</span>
            </div>

          </div>

        </div>

      </section>

      {/* 3. Three Main Feature Cards matching Reference Image with Polished Finish */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Solution Architect */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-blue-50/90 border border-blue-100/80 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                Design
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-6 group-hover:text-blue-600 transition-colors">
              Solution Architect
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2.5 mb-8">
              Create robust solution architectures and designs for your business requirements with the help of AI.
            </p>
          </div>

          <button
            onClick={() => navigateToProduct('solution-architect')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group-hover:shadow-md"
          >
            <span>Open Solution Architect</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Card 2: Solution Factory */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-indigo-50/90 border border-indigo-100/80 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                <Settings className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                Build
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-6 group-hover:text-indigo-600 transition-colors">
              Solution Factory
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2.5 mb-8">
              Orchestrate solution creation with pre-built templates, agents and automation to accelerate development.
            </p>
          </div>

          <button
            onClick={() => navigateToProduct('solution-factor')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0F172A] hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group-hover:shadow-md"
          >
            <span>Open Solution Factory</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Card 3: Full Stack */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-sky-50/90 border border-sky-100/80 flex items-center justify-center text-sky-600 group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-2xs">
                <Code2 className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                End-to-End
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-6 group-hover:text-sky-600 transition-colors">
              Full Stack
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2.5 mb-8">
              Build and deliver complete, production-ready solutions with frontend, backend, integrations and deployment.
            </p>
          </div>

          <button
            onClick={() => setIsFullStackModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0F172A] hover:bg-sky-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group-hover:shadow-md"
          >
            <span>Open Full Stack</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </section>

      {/* Full Stack Execution Engine Modal */}
      <Modal
        isOpen={isFullStackModalOpen}
        onClose={() => setIsFullStackModalOpen(false)}
        title="Full Stack Solution Pipeline"
        maxWidth="2xl"
      >
        <div className="space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Autonomous Full-Stack Generator</span>
            </div>
            <p className="text-xs text-slate-600">
              Combines Solution Architect's system topology generation and Solution Factory's scaffold templates into an end-to-end deployable repository.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Step 1: System Topology & Data Schema</div>
                  <div className="text-[11px] text-slate-500">Design cloud microservices, auth, and database</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsFullStackModalOpen(false);
                  navigateToProduct('solution-architect');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg"
              >
                Launch Architect
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Step 2: PRD Spec & Boilerplate Factory</div>
                  <div className="text-[11px] text-slate-500">Generate frontend React components & backend APIs</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsFullStackModalOpen(false);
                  navigateToProduct('solution-factor');
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 bg-indigo-50 rounded-lg"
              >
                Launch Factory
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setIsFullStackModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsFullStackModalOpen(false);
                navigateToProduct('solution-architect');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Start End-to-End Build</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
