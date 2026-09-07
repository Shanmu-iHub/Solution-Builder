import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { 
  Bot, 
  Brain, 
  Zap, 
  RefreshCw, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Search, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Cpu,
  Workflow
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const SolutionBuilderSuperAgent: React.FC = () => {
  const { setCurrentView, navigateToAgent } = useNavigation();
  const [isConsoleModalOpen, setIsConsoleModalOpen] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in select-none pb-16 max-w-7xl mx-auto">
      
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
        <span className="text-slate-900 font-semibold">Super Agent</span>
      </nav>

      {/* 2. Enhanced Hero Section matching Full Stack / Frontend Design Language */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]/40 border border-slate-200/90 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-gradient-to-br from-emerald-400/15 via-teal-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[400px] bg-gradient-to-tr from-cyan-400/15 via-blue-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Typography, Eyebrow & CTAs */}
          <div className="flex-1 max-w-xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-emerald-200/80 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>SOLUTION BUILDER PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-3">
              Super Agent <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Engine</span>
            </h1>

            {/* Sub-Headline & Description */}
            <p className="text-base sm:text-lg font-semibold text-[#1E293B] mb-2">
              Autonomous multi-agent orchestration for complex workflows.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
              Deploy self-reasoning AI agent swarms that decompose goals, execute tools, synthesize deep research, write code, and verify outcomes in real time.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Multi-Agent Swarm</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Dynamic Tool Execution</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Self-Healing Loops</span>
              </span>
            </div>

            {/* Primary Action Button */}
            <div>
              <button
                onClick={() => setIsConsoleModalOpen(true)}
                className="py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Open Super Agent Console</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Autonomous Agent Swarm & Reasoning Canvas */}
          <div className="w-full lg:w-[580px] h-[320px] sm:h-[360px] relative flex items-center justify-center">
            
            {/* Connecting Glowing Circuit SVG */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 580 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="swarmLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                </linearGradient>
                <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Circuit Pipelines */}
              <path d="M 110 180 L 160 180 L 210 130 L 330 130" stroke="url(#swarmLine)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 290 80 L 350 80 L 390 120 L 500 120" stroke="url(#swarmLine)" strokeWidth="2" />
              <path d="M 400 80 L 460 80 L 510 80" stroke="#CBD5E1" strokeWidth="2" />
              <path d="M 390 230 L 450 230 L 500 230" stroke="url(#swarmLine)" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 270 270 L 330 270 L 370 230" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Glowing Pulse Nodes */}
              <circle cx="350" cy="80" r="5" fill="#10B981" filter="url(#emeraldGlow)" />
              <circle cx="350" cy="80" r="2.5" fill="#FFFFFF" />
              
              <circle cx="510" cy="80" r="5" fill="#0D9488" filter="url(#emeraldGlow)" />
              <circle cx="510" cy="80" r="2.5" fill="#FFFFFF" />

              <circle cx="500" cy="230" r="5" fill="#06B6D4" filter="url(#emeraldGlow)" />
              <circle cx="500" cy="230" r="2.5" fill="#FFFFFF" />
            </svg>

            {/* Stage Tags */}
            <div className="absolute top-10 left-[58%] px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
              DECOMPOSE
            </div>
            
            <div className="absolute top-10 right-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              EXECUTE
            </div>

            <div className="absolute top-[60%] right-2 px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              VERIFY
            </div>

            {/* Left "FROM IDEA TO IMPACT" Stacked Badge */}
            <div className="absolute left-2 sm:left-6 top-[38%] bg-white/90 border border-slate-200/90 rounded-xl p-2.5 shadow-2xs flex flex-col items-center">
              <span className="text-[9px] font-extrabold text-slate-500 tracking-[0.15em] uppercase leading-tight text-center">
                FROM<br />IDEA TO<br />IMPACT
              </span>
              <div className="w-6 h-0.5 bg-emerald-600 mt-1.5 rounded-full" />
            </div>

            {/* Central 3D Dark Swarm Master IDE Window */}
            <div 
              className="absolute left-[24%] top-[18%] w-[175px] sm:w-[200px] bg-[#0F172A] rounded-2xl shadow-2xl p-3 flex flex-col justify-between border border-slate-700/80 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20"
            >
              {/* IDE Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[9px] font-mono text-slate-400">superagent.swarm.ts</span>
              </div>

              {/* Code Lines Mockup */}
              <div className="space-y-1.5 py-2.5 font-mono text-[9px]">
                <div className="flex items-center gap-1">
                  <span className="text-purple-400">const</span>
                  <span className="text-emerald-300">swarm</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-amber-300">&#123;</span>
                </div>
                <div className="pl-3 text-slate-300">
                  mode: <span className="text-teal-400">'Autonomous'</span>,
                </div>
                <div className="pl-3 text-slate-300">
                  tools: <span className="text-cyan-400">['Web', 'Code', 'DB']</span>
                </div>
                <div className="text-amber-300">&#125;;</div>
              </div>

              {/* IDE Footer Live Status */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[8px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Swarm Active · 4 Agents
                </span>
                <span className="font-mono">99.8% Acc</span>
              </div>
            </div>

            {/* Satellite 3D Tile 1: Research Agent Tile */}
            <div 
              className="absolute right-[22%] top-[14%] w-16 sm:w-18 h-16 sm:h-18 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 flex flex-col items-center justify-center text-slate-800 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-30 group/tile"
            >
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 mb-0.5 group-hover/tile:bg-emerald-600 group-hover/tile:text-white transition-colors">
                <Search className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">RESEARCH</span>
            </div>

            {/* Satellite 3D Tile 2: Coder Agent Tile */}
            <div 
              className="absolute right-[32%] bottom-[10%] w-14 sm:w-16 h-14 sm:h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/90 flex flex-col items-center justify-center text-slate-700 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 group/tile"
            >
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 mb-0.5 group-hover/tile:bg-teal-600 group-hover/tile:text-white transition-colors">
                <Code2 className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">CODER</span>
            </div>

            {/* Satellite 3D Tile 3: Evaluator Agent Tile */}
            <div 
              className="absolute right-[8%] bottom-[12%] w-14 sm:w-16 h-14 sm:h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/90 flex flex-col items-center justify-center text-slate-700 transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 group/tile"
            >
              <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 mb-0.5 group-hover/tile:bg-cyan-600 group-hover/tile:text-white transition-colors">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">VERIFY</span>
            </div>

          </div>

        </div>

      </section>

      {/* 3. Section: Capabilities */}
      <section className="space-y-6">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">
            CAPABILITIES
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Autonomous intelligence built for mission-critical software workflows
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Autonomous Reasoning */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50/90 border border-emerald-100/80 flex items-center justify-center text-emerald-600 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Brain className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Autonomous Reasoning
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Decomposes open-ended complex objectives into structured execution DAGs and sub-agent task trees.
              </p>
            </div>
          </div>

          {/* Card 2: Swarm Collaboration */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50/90 border border-teal-100/80 flex items-center justify-center text-teal-600 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Bot className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Swarm Collaboration
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Coordinates specialized researcher, coder, tester, and evaluator agents with shared memory context.
              </p>
            </div>
          </div>

          {/* Card 3: Tool & MCP Execution */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-violet-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-50/90 border border-violet-100/80 flex items-center justify-center text-violet-600 group-hover:scale-105 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Zap className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                Tool & MCP Execution
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Seamlessly invokes REST APIs, web scrapers, sandboxed Python interpreters, and database connectors.
              </p>
            </div>
          </div>

          {/* Card 4: Self-Healing Loops */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/90 border border-amber-100/80 flex items-center justify-center text-amber-600 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <RefreshCw className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Self-Healing Loops
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Continuous output evaluation, lint validation, and automatic error rectification without human blockers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Bottom Banner */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]/70 border border-slate-200/90 p-7 sm:p-9 shadow-xs overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Callout */}
        <div className="z-10 max-w-lg">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
            FROM IDEA TO IMPACT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Deploy autonomous AI agents, without limits.
          </h2>
        </div>

        {/* Right Button & Tech Accent */}
        <div className="z-10 flex items-center gap-6">
          <button
            onClick={() => setIsConsoleModalOpen(true)}
            className="py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>Open Super Agent Console</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="hidden lg:flex flex-col items-center pl-4 border-l border-slate-300/80">
            <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase leading-tight text-center">
              AUTONOMOUS<br />SWARM<br />READY
            </span>
            <div className="w-6 h-0.5 bg-emerald-500 mt-1 rounded-full" />
          </div>
        </div>

      </section>

      {/* Interactive Super Agent Launcher Modal */}
      <Modal
        isOpen={isConsoleModalOpen}
        onClose={() => setIsConsoleModalOpen(false)}
        title="Super Agent Swarm Console"
        maxWidth="2xl"
      >
        <div className="space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Multi-Agent Swarm Orchestrator</span>
            </div>
            <p className="text-xs text-slate-600">
              Select an agent workflow archetype to spawn autonomous reasoning swarms with real-time tool calling.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Deep Research Swarm</div>
                  <div className="text-[11px] text-slate-500">Autonomous web crawling, fact synthesis, and PDF reporting</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsConsoleModalOpen(false);
                  navigateToAgent('deep-research');
                }}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 px-3 py-1.5 bg-emerald-50 rounded-lg"
              >
                Launch Research
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-teal-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Fact-Check & Verification Swarm</div>
                  <div className="text-[11px] text-slate-500">Cross-reference claims against trusted knowledge graphs</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsConsoleModalOpen(false);
                  navigateToAgent('fact-check');
                }}
                className="text-xs font-semibold text-teal-600 hover:text-teal-800 px-3 py-1.5 bg-teal-50 rounded-lg"
              >
                Launch Verifier
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setIsConsoleModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsConsoleModalOpen(false);
                navigateToAgent('deep-research');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Launch Autonomous Swarm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
