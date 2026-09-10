import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { Modal } from '../common/Modal';
import {
  Bot,
  ArrowRight,
  ChevronRight,
  Play,
  Zap,
  Box,
  Plug,
  BarChart3,
  User,
  GitBranch,
  Layers,
  TrendingUp,
  Target,
  Users,
  Sparkles,
  CheckCircle2,
  Workflow,
  Check,
  Cpu,
  Boxes,
  ShieldCheck,
  Settings,
  Code2
} from 'lucide-react';

export const AgentListing: React.FC = () => {
  const { setCurrentView, navigateToAgent } = useNavigation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isBuilderModalOpen, setIsBuilderModalOpen] = useState(false);

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
        <span className="text-slate-500">Build and Create</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Agent Builder</span>
      </nav>

      {/* 2. Enhanced Enterprise Hero Section (Matching Solution Builder Full Stack) */}
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
              <span>AGENT BUILDER PLATFORM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
              Build Intelligent <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">AI Agents</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
              Design, customize and deploy AI agents to automate workflows, connect tools and solve real business problems — no complexity, just possibilities.
            </p>

            {/* Capability Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Autonomous Reasoning</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>100+ Tool Connectors</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Multi-Agent Orchestration</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentView('agent-builder')}
                className="px-6 py-3.5 bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Open Agent Builder</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-slate-600 fill-slate-600" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-End 3D Interactive Agent Network Canvas */}
          <div className="w-full lg:w-[560px] h-[320px] sm:h-[360px] relative flex items-center justify-center">
            
            {/* Connecting Circuit SVG with Glowing Pulses */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 560 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="agentGlowLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
                </linearGradient>
                <filter id="agentGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Connection Pathways */}
              <path d="M 120 180 L 190 180 L 250 130 L 350 130" stroke="url(#agentGlowLine)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 280 65 L 340 65 L 380 120 L 490 120" stroke="url(#agentGlowLine)" strokeWidth="2" />
              <path d="M 390 65 L 450 65 L 500 65" stroke="#CBD5E1" strokeWidth="2" />
              <path d="M 380 240 L 440 240 L 490 240" stroke="url(#agentGlowLine)" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 260 280 L 320 280 L 360 240" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Glowing Terminal Node Rings */}
              <circle cx="340" cy="65" r="5" fill="#2563EB" filter="url(#agentGlow)" />
              <circle cx="340" cy="65" r="2.5" fill="#FFFFFF" />
              
              <circle cx="500" cy="65" r="5" fill="#6366F1" filter="url(#agentGlow)" />
              <circle cx="500" cy="65" r="2.5" fill="#FFFFFF" />

              <circle cx="490" cy="240" r="5" fill="#0EA5E9" filter="url(#agentGlow)" />
              <circle cx="490" cy="240" r="2.5" fill="#FFFFFF" />
            </svg>

            {/* Stage Tags matching reference */}
            <div className="absolute top-8 left-[54%] px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
              PLAN
            </div>
            
            <div className="absolute top-8 right-4 px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              AUTOMATE
            </div>

            <div className="absolute top-[62%] right-4 px-2.5 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-[10px] font-extrabold tracking-widest text-slate-700 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              SCALE
            </div>

            {/* Left "YOUR AGENTS. YOUR IMPACT." Stacked Badge */}
            <div className="absolute left-2 sm:left-4 top-[36%] bg-white/90 border border-slate-200/90 rounded-2xl p-3 shadow-2xs flex flex-col items-center">
              <span className="text-[9px] font-extrabold text-blue-600 tracking-[0.15em] uppercase leading-tight text-center font-serif italic">
                YOUR<br />AGENTS.<br />YOUR IMPACT.
              </span>
              <div className="w-8 h-0.5 bg-blue-600 mt-1.5 rounded-full" />
            </div>

            {/* Central 3D Dark Agent Core Window */}
            <div 
              className="absolute left-[25%] top-[16%] w-[175px] sm:w-[200px] bg-[#0F172A] rounded-2xl shadow-2xl p-3 flex flex-col justify-between border border-slate-700/80 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20"
            >
              {/* Agent Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[9px] font-mono text-slate-400">agent.workflow.ts</span>
              </div>

              {/* Code / Workflow Mockup */}
              <div className="space-y-1.5 py-2.5 font-mono text-[9px]">
                <div className="flex items-center gap-1">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-300">agent</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-amber-300">&#123;</span>
                </div>
                <div className="pl-3 text-slate-300">
                  model: <span className="text-emerald-400">'DeepSeek-R1'</span>,
                </div>
                <div className="pl-3 text-slate-300">
                  tools: <span className="text-sky-400">['CRM', 'Slack']</span>
                </div>
                <div className="text-amber-300">&#125;;</div>
              </div>

              {/* Live Status */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[8px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Reasoning Active
                </span>
                <span className="font-mono">v3.0</span>
              </div>
            </div>

            {/* Satellite 3D Tile 1: Automate Node */}
            <div 
              className="absolute right-[22%] top-[12%] w-16 sm:w-18 h-16 sm:h-18 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 flex flex-col items-center justify-center text-slate-800 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-30 group/tile"
            >
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 mb-0.5 group-hover/tile:bg-blue-600 group-hover/tile:text-white transition-colors">
                <Zap className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">AUTOMATE</span>
            </div>

            {/* Satellite 3D Tile 2: Build Node */}
            <div 
              className="absolute right-[33%] bottom-[8%] w-14 sm:w-16 h-14 sm:h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/90 flex flex-col items-center justify-center text-slate-700 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 group/tile"
            >
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 mb-0.5 group-hover/tile:bg-indigo-600 group-hover/tile:text-white transition-colors">
                <Box className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">BUILD</span>
            </div>

            {/* Satellite 3D Tile 3: Integrate Node */}
            <div 
              className="absolute right-[6%] bottom-[12%] w-14 sm:w-16 h-14 sm:h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/90 flex flex-col items-center justify-center text-slate-700 transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 group/tile"
            >
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 mb-0.5 group-hover/tile:bg-emerald-600 group-hover/tile:text-white transition-colors">
                <Plug className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">INTEGRATE</span>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR KEY CAPABILITIES CARDS                                            */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Key Capabilities</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Everything you need to build, deploy and manage autonomous AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Create AI Agents */}
          <div
            onClick={() => setCurrentView('custom-agent')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <User className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Create AI Agents
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Design agents that can think, plan and take action across your tools.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-purple-50 text-slate-400 group-hover:text-purple-600 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Automated Workflows */}
          <div
            onClick={() => navigateToAgent('deep-research')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <GitBranch className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Automated Workflows
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Orchestrate complex workflows with conditional logic and integrations.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Tools and Integrations */}
          <div
            onClick={() => setCurrentView('integrations')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Plug className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Tools and Integrations
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Connect with 100+ tools and services to extend your agents.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4: Agent Orchestration */}
          <div
            onClick={() => setCurrentView('solution-builder-superagent')}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Agent Orchestration
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Manage, monitor and scale multiple agents with ease.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-amber-50 text-slate-400 group-hover:text-amber-600 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT HELPS VALUE PROPOSITIONS                                        */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">How It Helps</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Turn your ideas into real business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1: Improve Productivity */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-2xs">
              <TrendingUp className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">
              Improve Productivity
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Automate repetitive enterprise workflows, offload routine tasks, and save valuable engineering hours.
            </p>
          </div>

          {/* Item 2: Solve Complex Problems */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5 shadow-2xs">
              <Target className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">
              Solve Complex Problems
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Let autonomous agents handle multi-step reasoning, cross-system synthesis, and continuous decision making.
            </p>
          </div>

          {/* Item 3: Scale Your Business */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-purple-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-5 shadow-2xs">
              <Users className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">
              Scale Your Business
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Deploy reliable AI agents that work 24/7, expand across departments, and grow in capability over time.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM ENTERPRISE CTA BANNER                                           */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 border border-blue-100/90 rounded-3xl p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#2563EB] shadow-2xs border border-blue-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Ready to build your first AI agent?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Start building on the dedicated Agent Builder platform and turn your ideas into action.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('agent-builder')}
          className="px-6 py-3.5 bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer group"
        >
          <span>Open Agent Builder</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <Modal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          title="SNS Square Agent Builder Walkthrough"
          subtitle="Learn how to configure triggers, tools, and multi-step agent reasoning in under 3 minutes."
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center relative group">
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </div>
                <p className="text-xs font-semibold text-white">Agent Builder Architecture & Tooling Demo</p>
                <p className="text-[11px] text-slate-400">Duration: 2 mins 48 secs · 1080p HD</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
