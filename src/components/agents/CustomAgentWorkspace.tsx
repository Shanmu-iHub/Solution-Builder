import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { 
  Brain, 
  Sparkles, 
  Bot, 
  Plus, 
  Send, 
  Sliders, 
  Database, 
  Zap, 
  Code2, 
  Globe, 
  Play, 
  Check, 
  Copy, 
  ArrowRight, 
  ChevronRight, 
  FileText, 
  Key, 
  Settings, 
  Trash2, 
  RefreshCw,
  Terminal,
  ShieldCheck,
  Share2,
  Cpu,
  Link as LinkIcon,
  MessageSquare,
  MessageSquareCode,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Breadcrumb } from '../common/Breadcrumb';

export const CustomAgentWorkspace: React.FC = () => {
  const { setCurrentView } = useNavigation();
  
  // View mode: 'landing' (Default matching attached image) or 'console' (Interactive Studio)
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Active sub-tab in config console
  const [activeTab, setActiveTab] = useState<'persona' | 'model' | 'knowledge' | 'tools'>('persona');

  // Agent configuration state
  const [agentName, setAgentName] = useState('Enterprise Solution Architect');
  const [agentRole, setAgentRole] = useState('Cloud Architecture & System Design Specialist');
  const [selectedModel, setSelectedModel] = useState('Gemini 1.5 Pro (Multimodal 2M)');
  const [temperature, setTemperature] = useState(0.4);
  const [systemPrompt, setSystemPrompt] = useState(
    `You are an elite enterprise software architect. Your goal is to design scalable, secure, and cost-effective multi-cloud solutions. Always output structured architecture blueprints, entity-relationship schemas, and recommended infrastructure-as-code snippets.`
  );
  
  // Selected tools
  const [enabledTools, setEnabledTools] = useState<string[]>(['web-search', 'python-sandbox', 'api-connector']);

  // Chat playground state
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent' | 'thought'; content: string }>>([
    {
      role: 'agent',
      content: `Hello! I am your custom agent configured as **${agentName}**. How can I help you design, validate, or automate your solution today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleTool = (toolId: string) => {
    setEnabledTools(prev => 
      prev.includes(toolId) ? prev.filter(t => t !== toolId) : [...prev, toolId]
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsProcessing(true);

    // Simulate Agent Step-by-step Execution
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'thought',
          content: `⚙️ [Reasoning Trace]: Analyzing request "${userMsg}" using model ${selectedModel}... Invoking tools: [${enabledTools.join(', ')}]`
        }
      ]);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            role: 'agent',
            content: `### Architecture Plan & Execution\n\nBased on your prompt, here is the generated blueprint tailored for **${agentRole}**:\n\n\`\`\`yaml\nservice: "autonomous-data-pipeline"\nruntime: "distributed-agent-node"\nscaling:\n  minReplicas: 2\n  maxReplicas: 10\n  targetCPU: "75%"\nguardrails:\n  zeroDataRetention: true\n  tokenThrottle: "50k/min"\n\`\`\`\n\nAll tools executed cleanly with verified schema constraints.`
          }
        ]);
        setIsProcessing(false);
      }, 1200);
    }, 800);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(systemPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // =========================================================================
  // VIEW 1: LANDING PAGE (MATCHING ATTACHED IMAGE & FULL STACK DESIGN)
  // =========================================================================
  if (viewMode === 'landing') {
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
          <span className="text-slate-900 font-semibold">Custom Agent</span>
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
                <Brain className="w-3.5 h-3.5 text-blue-600" />
                <span>CUSTOM AGENT PLATFORM</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
                Your AI Agent, <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">Your Way</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
                Create purpose-built AI agents tailored to your business needs. Define behavior, connect knowledge, integrate tools and deliver consistent, high-value results.
              </p>

              {/* Capability Feature Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span>Custom Instructions</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span>Knowledge RAG Hub</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span>100+ Tool Integrations</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setViewMode('console')}
                  className="px-6 py-3.5 bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Open Custom Agent Platform</span>
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

            {/* Right Column: High-End 3D Custom Agent Orbit Illustration */}
            <div className="w-full lg:w-[560px] h-[320px] sm:h-[360px] relative flex items-center justify-center">
              
              {/* Connecting Wave Gradient Lines */}
              <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 560 360" fill="none">
                <defs>
                  <linearGradient id="customAgentLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path d="M 120 130 Q 220 130 310 180" stroke="url(#customAgentLine)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 150 250 Q 230 250 310 180" stroke="url(#customAgentLine)" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M 310 180 Q 390 140 450 140" stroke="url(#customAgentLine)" strokeWidth="2" />
              </svg>

              {/* Central Floating Robot / Agent Character */}
              <div className="z-20 w-32 h-32 rounded-3xl bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-2xl shadow-blue-500/15 flex flex-col items-center justify-center p-3 transform hover:scale-105 transition-transform">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-sky-400 p-1 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-[#0F172A] rounded-xl flex items-center justify-center">
                    <Bot className="w-10 h-10 text-sky-400 animate-pulse" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-800 mt-1">Autonomous</span>
              </div>

              {/* Orbiting Satellite Card 1: Custom Instructions (Top Left) */}
              <div className="absolute left-[4%] top-[12%] bg-white/95 backdrop-blur-md border border-purple-200/90 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 z-30 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                  <MessageSquareCode className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Custom Instructions</h4>
                  <p className="text-[10px] text-slate-500">Define how your agent behaves</p>
                </div>
              </div>

              {/* Orbiting Satellite Card 2: Knowledge (Bottom Left) */}
              <div className="absolute left-[8%] bottom-[12%] bg-white/95 backdrop-blur-md border border-emerald-200/90 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 z-30 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Knowledge</h4>
                  <p className="text-[10px] text-slate-500">Connect your data</p>
                </div>
              </div>

              {/* Orbiting Satellite Card 3: Tools & Integrations (Right) */}
              <div className="absolute right-[4%] top-[25%] bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 z-30 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                  <LinkIcon className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tools & Integrations</h4>
                  <p className="text-[10px] text-slate-500">Extend with 100+ tools</p>
                </div>
              </div>

              {/* Handwritten Script Tag: Your Business. Your Agent. */}
              <div className="absolute -bottom-2 right-4 z-30 transform rotate-[-6deg] select-none pointer-events-none">
                <span className="font-serif italic font-bold text-xs sm:text-[13px] text-[#2563EB] tracking-wide block leading-tight drop-shadow-xs">
                  Your <br />
                  Business. <br />
                  Your Agent.
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. FOUR KEY CAPABILITIES CARDS (COMPACT & SLEEK)                          */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Key Capabilities</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Everything you need to build and run custom AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Custom Instructions */}
            <div 
              onClick={() => {
                setActiveTab('persona');
                setViewMode('console');
              }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquareCode className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Custom Instructions
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Define how your agent behaves, including tone, role, goals and response style.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-purple-50 text-slate-400 group-hover:text-purple-600 flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 2: Knowledge and Context */}
            <div 
              onClick={() => {
                setActiveTab('knowledge');
                setViewMode('console');
              }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Database className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Knowledge and Context
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Connect your documents, data sources and business context to make your agent more accurate and relevant.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 3: Tools and Integrations */}
            <div 
              onClick={() => {
                setActiveTab('tools');
                setViewMode('console');
              }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <LinkIcon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Tools and Integrations
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Integrate with 100+ tools and services to let your agent take real actions.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-amber-50 text-slate-400 group-hover:text-amber-600 flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 4: Behavior and Control */}
            <div 
              onClick={() => {
                setActiveTab('model');
                setViewMode('console');
              }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <SlidersHorizontal className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Behavior and Control
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Set guardrails, permissions and fine-tune responses to ensure safe, reliable and consistent output.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PLATFORM BENEFITS SECTION                                              */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Platform Benefits</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Why teams choose Custom Agent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1: Improved Productivity */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-2xs">
                <TrendingUp className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                Improved Productivity
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Automate repetitive tasks and free up your team to focus on higher-value core initiatives.
              </p>
            </div>

            {/* Item 2: Scalable Agent Experiences */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-purple-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-5 shadow-2xs">
                <Users className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                Scalable Agent Experiences
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Create agents for different teams, use cases, and departments as your business grows.
              </p>
            </div>

            {/* Item 3: Flexible and Customizable */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5 shadow-2xs">
                <Sliders className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">
                Flexible and Customizable
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tailor every aspect of your agent to match your workflows, brand guidelines, and business needs.
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
                Ready to create your own AI agent?
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Take your ideas from concept to reality with Custom Agent.
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewMode('console')}
            className="px-6 py-3.5 bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer group"
          >
            <span>Open Custom Agent Platform</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </section>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <Modal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            title="Custom Agent Studio Walkthrough"
            subtitle="Learn how to define behavior, attach vector knowledge bases, and configure tools in 3 minutes."
            maxWidth="2xl"
          >
            <div className="space-y-4">
              <div className="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center relative group">
                <div className="text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-7 h-7 ml-1 fill-white" />
                  </div>
                  <p className="text-xs font-semibold text-white">Custom Agent Architecture & Studio Demo</p>
                  <p className="text-[11px] text-slate-400">Duration: 2 mins 30 secs · 1080p HD</p>
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
  }

  // =========================================================================
  // VIEW 2: INTERACTIVE CUSTOM AGENT STUDIO / PLAYGROUND CONSOLE
  // =========================================================================
  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Breadcrumb items={[{ label: 'Build and Create' }, { label: 'Custom Agent Studio' }]} />
        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Autonomous Intelligence Studio</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Custom Agent Builder</h1>
          <p className="text-xs text-[#64748B] max-w-2xl mt-1">
            Design, fine-tune, test, and deploy customized autonomous AI agents. Attach domain knowledge bases, specify multi-turn reasoning steps, and equip API execution tools.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setMessages([
                {
                  role: 'agent',
                  content: `Agent state reset! Ready with configuration for **${agentName}**.`
                }
              ]);
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Agent</span>
          </button>
          
          <button
            onClick={() => alert(`Agent "${agentName}" successfully deployed to production endpoint.`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deploy to Production</span>
          </button>
        </div>
      </div>

      {/* Studio Workspace: 2 Column Layout (Config Left, Playground Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Agent Architecture & Config Studio (Span 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle overflow-hidden">
            
            {/* Configuration Tabs Header */}
            <div className="flex border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-3 gap-2 overflow-x-auto">
              {[
                { id: 'persona', label: 'Persona & Role', icon: <Bot className="w-3.5 h-3.5" /> },
                { id: 'model', label: 'Model & Logic', icon: <Cpu className="w-3.5 h-3.5" /> },
                { id: 'knowledge', label: 'Knowledge Base', icon: <Database className="w-3.5 h-3.5" /> },
                { id: 'tools', label: 'API Tools (3)', icon: <Zap className="w-3.5 h-3.5" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all border-t border-x cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white border-[#E2E8F0] text-blue-600 -mb-px'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-5 space-y-5">
              {activeTab === 'persona' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      value={agentName}
                      onChange={e => setAgentName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                      Role Description & Identity
                    </label>
                    <input
                      type="text"
                      value={agentRole}
                      onChange={e => setAgentRole(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-700"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[#0F172A]">
                        System Prompt & Guardrails
                      </label>
                      <button
                        onClick={handleCopyPrompt}
                        className="text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      value={systemPrompt}
                      onChange={e => setSystemPrompt(e.target.value)}
                      className="w-full text-xs p-3 font-mono leading-relaxed bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'model' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                      Foundation Reasoning Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={e => setSelectedModel(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 font-medium text-slate-800"
                    >
                      <option value="Gemini 1.5 Pro (Multimodal 2M)">Gemini 1.5 Pro (2M Context, Multimodal)</option>
                      <option value="Claude 3.5 Sonnet (Agentic Reasoning)">Claude 3.5 Sonnet (Agentic Tooling)</option>
                      <option value="GPT-4o Omnichannel (128k)">GPT-4o Realtime Engine</option>
                      <option value="DeepSeek-R1 (High Reasoning Math)">DeepSeek-R1 (Pure Reasoning)</option>
                      <option value="Llama 3.3 70B (Private VPC)">Llama 3.3 70B (Dedicated VPC)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-1.5">
                      <span>Creativity / Temperature</span>
                      <span className="text-blue-600">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={temperature}
                      onChange={e => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                      <span>Deterministic (0.0)</span>
                      <span>Balanced (0.5)</span>
                      <span>Creative (1.0)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'knowledge' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Enterprise Cloud Architecture KB</span>
                        <span className="text-[10px] text-slate-500">14,800 chunks · Pinecone Vector Index</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Connected
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Security & Compliance Vault (SOC 2)</span>
                        <span className="text-[10px] text-slate-500">2,410 chunks · Embeddings v3</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Connected
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="space-y-2.5 animate-fade-in">
                  {[
                    { id: 'web-search', name: 'Real-time Web Search & Synthesis', desc: 'Queries live Google/Bing endpoints for up-to-date specs.' },
                    { id: 'python-sandbox', name: 'Python Code Execution Sandbox', desc: 'Safely executes pandas, numpy, and matplotlib scripts in isolations.' },
                    { id: 'api-connector', name: 'Custom REST API Connector', desc: 'Calls authenticated enterprise microservices and endpoints.' },
                    { id: 'github-sync', name: 'GitHub Repo Pull & PR Generator', desc: 'Syncs code changes directly to authorized repositories.' }
                  ].map(tool => (
                    <div
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        enabledTools.includes(tool.id)
                          ? 'bg-blue-50/60 border-blue-200 text-blue-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block">{tool.name}</span>
                        <span className="text-[11px] text-slate-500">{tool.desc}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={enabledTools.includes(tool.id)}
                        onChange={() => {}}
                        className="rounded accent-blue-600 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Chat & Execution Playground (Span 6) */}
        <div className="lg:col-span-6 flex flex-col bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle h-[560px] overflow-hidden">
          {/* Playground Header */}
          <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#0F172A]">Live Agent Sandbox Playground</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Latency: <strong>48ms</strong>
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  m.role === 'user'
                    ? 'bg-blue-50 text-blue-900 border-blue-200 ml-8'
                    : m.role === 'thought'
                    ? 'bg-amber-50 text-amber-900 border-amber-200 text-[11px] font-mono'
                    : 'bg-slate-50 text-slate-800 border-slate-200 mr-8'
                }`}
              >
                <div className="font-bold text-[10px] uppercase tracking-wider mb-1 opacity-70">
                  {m.role === 'user' ? 'Sanmugavel S' : m.role === 'thought' ? 'Agent Thought' : agentName}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              </div>
            ))}
            {isProcessing && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mr-8 text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Agent is reasoning and executing tools...</span>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E2E8F0] bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Send test instructions to ${agentName}...`}
              className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isProcessing || !inputText.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Run</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
