import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Menu as MenuIcon,
  MessageSquare,
  Play,
  Plus,
  Rocket,
  Shield,
  Sliders,
  Sparkles,
  Workflow,
  X,
  Bot,
  Terminal,
  Activity,
  Zap,
  CheckCircle2,
  FileText,
  Search,
  Settings,
  Share2,
  Server,
  Cloud,
  Key,
  Eye,
  BarChart3,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { LoginModal } from './LoginModal';
import { FiveLayerArchitectureSection } from './FiveLayerArchitectureSection';
import { AIChatbot } from './AIChatbot';
import snsLogo from '../../assets/SNS Square Logo.png';
import heroConfluenceImg from '../../assets/SNS Square Hero Section.png';

/* ==========================================================================
   DATA & CONSTANTS
   ========================================================================== */

const NAV_LINKS = [
  { id: 'platform', label: 'Platform' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'agents', label: 'Agents' },
  { id: 'testimonials', label: 'Testimonials' },
];

const FIVE_LAYERS = [
  {
    id: 'orchestration',
    num: '01',
    layerName: 'ORCHESTRATION LAYER',
    tagline: 'Coordinate intelligence across your ecosystem',
    desc: 'Manage agents, workflows, tasks, decisions, triggers, and multi-agent collaboration from one orchestration layer.',
    capabilities: [
      'Workflow orchestration',
      'Multi-agent coordination',
      'Task routing',
      'Events & triggers',
      'Conditional logic',
      'Human-in-the-loop'
    ],
    color: '#2563EB',
    icon: <Workflow className="w-5 h-5" />,
    stats: 'Deterministic DAG Routing'
  },
  {
    id: 'agent-builder',
    num: '02',
    layerName: 'AGENT BUILDER LAYER',
    tagline: 'Build agents that actually get work done',
    desc: 'Create purpose-built agents with instructions, tools, memory, knowledge, actions, and workflows.',
    capabilities: [
      'Agent creation',
      'Instructions',
      'Tools & actions',
      'Knowledge',
      'Memory',
      'Skills',
      'Testing',
      'Deployment'
    ],
    color: '#7C3AED',
    icon: <Bot className="w-5 h-5" />,
    stats: 'Multi-Tool Stateful Execution'
  },
  {
    id: 'integration',
    num: '03',
    layerName: 'INTEGRATION LAYER',
    tagline: 'Connect AI to the systems you already use',
    desc: 'Connect applications, APIs, databases, enterprise platforms, communication tools, and external services.',
    capabilities: [
      'APIs',
      'Applications',
      'Databases',
      'SaaS platforms',
      'Enterprise systems',
      'External services'
    ],
    color: '#0891B2',
    icon: <Share2 className="w-5 h-5" />,
    stats: '300+ Enterprise Connectors'
  },
  {
    id: 'model',
    num: '04',
    layerName: 'MODEL LAYER',
    tagline: 'The right intelligence for every task',
    desc: 'Connect and manage AI models based on capability, performance, cost, and use case.',
    capabilities: [
      'Multiple model providers',
      'Model selection',
      'Model routing',
      'Performance optimization',
      'Cost management',
      'Model evaluation'
    ],
    color: '#D97706',
    icon: <Cpu className="w-5 h-5" />,
    stats: 'Dynamic Multi-Model Router'
  },
  {
    id: 'governance',
    num: '05',
    layerName: 'GOVERNANCE LAYER',
    tagline: 'Enterprise control from day one',
    desc: 'Control identity, access, security, compliance, monitoring, policies, and AI operations.',
    capabilities: [
      'Identity & access',
      'Permissions',
      'Security',
      'Compliance',
      'Audit trails',
      'Monitoring',
      'Policy enforcement'
    ],
    color: '#059669',
    icon: <Shield className="w-5 h-5" />,
    stats: 'SOC-2 & Zero-Trust Enforced'
  }
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'BUILD',
    desc: 'Create intelligent agents around real business tasks with defined instructions, tools, and long-term memory.',
    tag: 'Agent Studio'
  },
  {
    step: '02',
    title: 'CONNECT',
    desc: 'Bring enterprise applications, APIs, data sources, databases, tools, and communication services together.',
    tag: 'Unified Mesh'
  },
  {
    step: '03',
    title: 'ORCHESTRATE',
    desc: 'Coordinate agents and multi-step workflows to execute complex, resilient enterprise processes.',
    tag: 'Engine Canvas'
  },
  {
    step: '04',
    title: 'GOVERN',
    desc: 'Maintain end-to-end visibility, strict security guardrails, policy enforcement, and compliance at scale.',
    tag: 'Command Center'
  }
];

const MODEL_CARDS = [
  {
    title: 'REASONING MODEL',
    subtitle: 'Complex decisions & strategic routing',
    desc: 'Optimized for complex multi-step planning, mathematical deduction, code architecture, and high-context policy synthesis.',
    latency: 'Deep Reasoning',
    bestFor: 'Legal analysis, financial auditing, system architecture'
  },
  {
    title: 'FAST MODEL',
    subtitle: 'High-volume tasks & real-time response',
    desc: 'Ultra low-latency token streaming engineered for real-time customer dialogues, high-throughput classification, and instant extraction.',
    latency: '< 180ms TTFT',
    bestFor: 'Live chat triage, categorization, real-time filters'
  },
  {
    title: 'VISION MODEL',
    subtitle: 'Images & complex structured documents',
    desc: 'High-fidelity visual understanding for blueprints, financial invoices, medical imagery, charts, and scanned enterprise documents.',
    latency: 'Visual Token Pipeline',
    bestFor: 'Document OCR, schematic verification, multi-modal QA'
  },
  {
    title: 'LANGUAGE MODEL',
    subtitle: 'Content & enterprise communication',
    desc: 'Natural language generation tuned for polished corporate communications, translation, technical summaries, and copy generation.',
    latency: 'Balanced Throughput',
    bestFor: 'Executive summaries, email drafting, technical writeups'
  },
  {
    title: 'EMBEDDING MODEL',
    subtitle: 'Knowledge retrieval & semantic vector search',
    desc: 'High-density multi-vector embeddings optimized for hybrid semantic search, enterprise knowledge bases, and precise RAG retrieval.',
    latency: 'Sub-millisecond Search',
    bestFor: 'Internal knowledge bases, compliance indexing, document search'
  }
];

const GOVERNANCE_CARDS = [
  {
    title: 'IDENTITY',
    desc: 'Control who can access AI resources with enterprise SSO, SAML, OAuth, and granular directory sync.',
    icon: <Key className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'PERMISSIONS',
    desc: 'Define role-based and attribute-based permissions for what human users and autonomous agents can execute.',
    icon: <Lock className="w-5 h-5 text-purple-400" />
  },
  {
    title: 'SECURITY',
    desc: 'Protect systems, data, credentials, and model interactions with enterprise-grade token masking and zero-trust vaults.',
    icon: <Shield className="w-5 h-5 text-emerald-400" />
  },
  {
    title: 'COMPLIANCE',
    desc: 'Apply organizational policies, safety guardrails, PII sanitization, and data residency requirements automatically.',
    icon: <CheckCircle2 className="w-5 h-5 text-amber-400" />
  },
  {
    title: 'AUDIT',
    desc: 'Comprehensive, tamper-proof audit trails for every prompt, tool execution, decision branch, and output.',
    icon: <FileText className="w-5 h-5 text-cyan-400" />
  },
  {
    title: 'MONITORING',
    desc: 'Real-time telemetry on latency, error rates, model drift, token expenditure, and throughput across your entire ecosystem.',
    icon: <Activity className="w-5 h-5 text-rose-400" />
  }
];

const AGENT_USE_CASES = [
  {
    title: 'Customer Support Agent',
    category: 'CUSTOMER OPERATIONS',
    desc: 'Resolve customer inquiries, process order modifications, authenticate identity, and escalate with full conversational context.',
    icon: <MessageSquare className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Knowledge Agent',
    category: 'ENTERPRISE RETRIEVAL',
    desc: 'Find verified enterprise information across disparate repositories, manuals, wikis, and databases with citeable sources.',
    icon: <Search className="w-5 h-5 text-purple-600" />
  },
  {
    title: 'Document Agent',
    category: 'DOCUMENT PROCESSING',
    desc: 'Extract, structure, validate, and process complex multi-page invoices, contracts, and regulatory filings in seconds.',
    icon: <FileText className="w-5 h-5 text-cyan-600" />
  },
  {
    title: 'Data Agent',
    category: 'BUSINESS INTELLIGENCE',
    desc: 'Query business databases in natural language, generate real-time visual charts, and summarize operational KPIs for leadership.',
    icon: <BarChart3 className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'Automation Agent',
    category: 'PROCESS EXECUTION',
    desc: 'Execute multi-step repetitive business workflows, sync records across CRM/ERP, and trigger downstream notifications.',
    icon: <Zap className="w-5 h-5 text-amber-600" />
  },
  {
    title: 'IT Operations Agent',
    category: 'SYSTEMS & DEVOPS',
    desc: 'Monitor server infrastructure, diagnose system alerts, run automated triage playbooks, and provision developer environments.',
    icon: <Server className="w-5 h-5 text-indigo-600" />
  }
];

const PLATFORM_BENEFITS = [
  {
    title: 'BUILD FASTER',
    desc: 'Go from concept to production-ready enterprise agent in hours with visual canvases, modular skills, and integrated testing.'
  },
  {
    title: 'CONNECT EVERYTHING',
    desc: 'Unify existing systems, legacy tools, SaaS platforms, APIs, and enterprise data warehouses into a single intelligent layer.'
  },
  {
    title: 'AUTOMATE MORE',
    desc: 'Turn complex, multi-party business operations into resilient, deterministic workflows with automated decision routing.'
  },
  {
    title: 'STAY IN CONTROL',
    desc: 'Maintain end-to-end visibility, verifiable compliance, strict token governance, and audit trails as AI adoption scales.'
  }
];

const INDUSTRIES = [
  {
    name: 'FINANCIAL SERVICES',
    desc: 'Intelligent operations, regulatory compliance audits, portfolio risk analysis, automated KYC, and customer support.'
  },
  {
    name: 'HEALTHCARE',
    desc: 'Clinical knowledge search, automated documentation, patient intake workflows, and HIPAA-compliant intelligent assistance.'
  },
  {
    name: 'EDUCATION',
    desc: 'Personalized learning assistants, academic administration workflows, automated grading assistance, and knowledge systems.'
  },
  {
    name: 'TECHNOLOGY',
    desc: 'Developer co-pilots, automated incident remediation, CI/CD orchestration, API governance, and internal engineering productivity.'
  }
];

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState('orchestration');
  const [activeTabWorkflow, setActiveTabWorkflow] = useState<'canvas' | 'code' | 'logs'>('canvas');
  const [activeTabAgent, setActiveTabAgent] = useState<'instructions' | 'tools' | 'memory' | 'preview'>('instructions');

  const openLogin = () => setShowLogin(true);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-blue-100 selection:text-blue-900" style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* --- [ANNOUNCEMENT BAR] --- */}
      <div className="bg-[#F7F8FA] border-b border-[#E5E7EB] py-2.5 px-4 text-center text-xs text-[#111111] fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded text-[11px] border border-blue-100 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" /> NEW
        </span>
        <span className="text-[#D1D5DB]">|</span>
        <span className="font-medium text-[#4B5563]">SNS Square brings your entire AI ecosystem together</span>
        <span className="text-[#D1D5DB]">|</span>
        <button onClick={openLogin} className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1">
          Explore SNS Square <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* --- [NAVIGATION] --- */}
      <nav className="fixed top-[37px] left-0 right-0 z-40 bg-[#070D18]/80 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="w-[90%] max-w-[1550px] mx-auto h-[66px] flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={snsLogo} alt="SNS Square" className="w-8 h-8 object-contain rounded-lg" />
            <span className="text-base font-bold text-white tracking-tight uppercase">SNS SQUARE</span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openLogin}
              className="text-sm font-medium text-white/80 hover:text-white px-2 transition-colors"
            >
              Agent Marketplace
            </button>
            <button
              onClick={openLogin}
              className="text-sm font-semibold text-white/90 hover:text-white px-3.5 py-2 rounded-lg border border-white/15 hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={openLogin}
              className="text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-5 py-2.5 rounded-lg transition-all shadow-md shadow-blue-600/30 hover:shadow-lg flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#070D18] px-6 py-6 space-y-4 shadow-2xl">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left text-base font-semibold text-white py-1"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={openLogin}
              className="block w-full text-left text-base font-semibold text-blue-400 py-1"
            >
              Agent Marketplace
            </button>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={openLogin}
                className="w-full text-center py-2.5 font-semibold text-white border border-white/20 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={openLogin}
                className="w-full text-center py-2.5 font-semibold text-white bg-[#2563EB] rounded-lg"
              >
                Get Started &rarr;
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* --- [HERO SECTION - FULL BG IMAGE] --- */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070D18] text-white pt-44 pb-14 sm:pt-52 sm:pb-16 border-b border-[#E5E7EB]">
        
        {/* Full-Bleed Confluence Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroConfluenceImg}
            alt="SNS Square Intelligent Flow"
            className="w-full h-full object-cover object-center brightness-90 scale-100"
          />
          {/* Multi-gradient atmospheric overlays - lightened for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/80 via-[#070D18]/45 to-[#070D18]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/75 via-transparent to-[#070D18]/40" />
        </div>

        <div className="w-[90%] max-w-[1550px] mx-auto relative z-10 my-auto">
          <div className="max-w-3xl space-y-8">


            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-black text-white tracking-tight leading-[1.02]">
              Everything<br />
              <span className="text-white">flows as one.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-2xl text-white/85 leading-relaxed max-w-2xl font-normal">
              One intelligent foundation for<br />
              your entire enterprise AI ecosystem.
            </p>

            {/* CTAs - Black & White */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={openLogin}
                className="px-8 py-4 rounded-lg text-sm font-semibold text-white bg-black hover:bg-neutral-800 transition-all flex items-center gap-2 border border-white/20 hover:scale-[1.02]"
              >
                Explore SNS Square
              </button>
              <button
                onClick={openLogin}
                className="px-8 py-4 rounded-lg text-sm font-semibold text-black bg-white hover:bg-neutral-100 transition-all hover:scale-[1.02]"
              >
                Start Building
              </button>
            </div>
          </div>
        </div>

        {/* --- [BOTTOM CATEGORY TICKER] --- */}
        <div className="w-[90%] max-w-[1550px] mx-auto relative z-10 mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between text-xs font-mono font-bold tracking-widest text-white/70 uppercase gap-4">
          {['AGENTS', 'WORKFLOWS', 'TOOLS', 'APIs', 'MODELS', 'DATA', 'GOVERNANCE'].map((item, idx) => (
            <React.Fragment key={item}>
              <span className="hover:text-blue-400 transition-colors cursor-default">{item}</span>
              {idx < 6 && <span className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:inline-block" />}
            </React.Fragment>
          ))}
        </div>

      </section>


      {/* --- SECTION 03 - INTRODUCTION (EDITORIAL TWO-COLUMN) --- */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase">
                THE SNS SQUARE APPROACH
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-[1.12]">
                AI, finally working as one.
              </h2>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-6 pt-2">
              <p className="text-lg sm:text-xl text-[#111111] font-medium leading-relaxed">
                Enterprise AI shouldn't live as a collection of disconnected tools.
              </p>
              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed font-normal">
                SNS Square brings the complete AI ecosystem together, giving teams one foundation to build, connect, orchestrate, operate, and govern intelligent systems.
              </p>
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span className="text-sm font-bold text-[#111111] tracking-wide uppercase">
                  One platform. Five layers. Endless possibilities.
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 04 - FIVE-LAYER ARCHITECTURE (3D STACK & ACCORDION) --- */}
      <FiveLayerArchitectureSection onSelectAction={openLogin} />

      {/* --- SECTION 05 - HOW IT WORKS --- */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="mb-16">
            <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              Built around the way enterprises work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {HOW_IT_WORKS.map((stage, idx) => (
              <div
                key={stage.step}
                className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-7 flex flex-col justify-between group hover:bg-white hover:border-[#2563EB] hover:shadow-xs transition-all"
                style={{ minHeight: '260px' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#E5E7EB] group-hover:text-[#2563EB] transition-colors font-mono">
                      {stage.step}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-[#6B7280] px-2 py-0.5 rounded bg-white border border-[#E5E7EB]">
                      {stage.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2 tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#2563EB]">
                  <span>Stage {stage.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 06 - ORCHESTRATION (TEXT LEFT, UI RIGHT) --- */}
      <section className="py-24 sm:py-32 bg-[#F7F8FA] border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase">
                ORCHESTRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight leading-tight">
                Turn complex processes into intelligent workflows.
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed font-normal">
                Coordinate agents, tools, decisions, and actions through visual workflows designed for enterprise automation.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {[
                  'Multi-agent workflows',
                  'Visual orchestration',
                  'Conditional logic',
                  'Event-based triggers',
                  'Human approvals',
                  'Automated task routing'
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-sm font-semibold text-[#111111]">
                    <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={openLogin}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all flex items-center gap-2 shadow-xs"
                >
                  Explore Orchestration <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Product UI Mockup: Realistic Workflow Canvas */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                {/* Canvas Window Header */}
                <div className="bg-[#F7F8FA] border-b border-[#E5E7EB] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-[#6B7280] ml-3">Customer_Support_Pipeline.flow</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#6B7280]">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">LIVE</span>
                    <span>v2.4.1</span>
                  </div>
                </div>

                {/* Canvas Workspace Visual */}
                <div className="p-6 sm:p-8 bg-[#FAFAFC] relative overflow-hidden" style={{ minHeight: '380px' }}>
                  {/* Subtle Grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                      backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Flowchart Nodes */}
                  <div className="relative z-10 flex flex-col items-center space-y-6">
                    
                    {/* Trigger Node */}
                    <div className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-3 shadow-xs flex items-center gap-3 w-64">
                      <div className="w-7 h-7 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center font-mono text-xs"><Zap className="w-4 h-4" /></div>
                      <div>
                        <div className="text-[10px] font-mono text-[#6B7280] uppercase">TRIGGER</div>
                        <div className="text-xs font-bold text-[#111111]">Webhook: Zendesk Ticket</div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-[#CBD5E1]" />

                    {/* Agent Node */}
                    <div className="bg-white border border-[#2563EB] rounded-xl px-5 py-3 shadow-sm flex items-center gap-3 w-72">
                      <div className="w-7 h-7 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-mono text-xs"><Bot className="w-4 h-4" /></div>
                      <div>
                        <div className="text-[10px] font-mono text-purple-600 uppercase font-bold">PRIMARY AGENT</div>
                        <div className="text-xs font-bold text-[#111111]">Triage & Intent Classifier</div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-[#CBD5E1]" />

                    {/* Decision Branch */}
                    <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                      {/* Left Branch */}
                      <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5 shadow-2xs space-y-2">
                        <div className="text-[10px] font-mono text-emerald-600 font-bold uppercase">TOOL: DB QUERY</div>
                        <div className="text-xs font-semibold text-[#111111]">Retrieve Order History</div>
                        <div className="text-[10px] text-[#6B7280]">PostgreSQL <span className="inline-block w-1 h-1 rounded-full bg-gray-400 align-middle mx-1" /> latency 14ms</div>
                      </div>

                      {/* Right Branch */}
                      <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5 shadow-2xs space-y-2">
                        <div className="text-[10px] font-mono text-amber-600 font-bold uppercase">SUB-AGENT: RESOLUTION</div>
                        <div className="text-xs font-semibold text-[#111111]">Generate Refund / Voucher</div>
                        <div className="text-[10px] text-[#6B7280]">Human approval required</div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-[#CBD5E1]" />

                    {/* Complete Node */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-1.5 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Complete <span className="inline-block w-1 h-1 rounded-full bg-emerald-700 align-middle mx-1" /> SLA 1.2s
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 07 - AGENT BUILDER (UI LEFT, TEXT RIGHT) --- */}
      <section id="agents" className="py-24 sm:py-32 bg-white border-b border-[#E5E7EB] scroll-mt-20">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Product UI Mockup: Realistic Agent Builder Interface */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#FAFAFC] border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                {/* Window Header */}
                <div className="bg-white border-b border-[#E5E7EB] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111111]">ComplianceAuditAgent_v3</div>
                      <div className="text-[10px] text-[#6B7280]">Model: Claude 3.5 Sonnet <span className="inline-block w-1 h-1 rounded-full bg-gray-400 align-middle mx-1" /> Memory: Active</div>
                    </div>
                  </div>
                  <button onClick={openLogin} className="px-3.5 py-1.5 rounded bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8]">
                    Deploy to Prod
                  </button>
                </div>

                {/* Inner Config Tabs */}
                <div className="p-6 space-y-4">
                  {/* Tab Selector */}
                  <div className="flex border-b border-[#E5E7EB] gap-6 text-xs font-semibold text-[#6B7280]">
                    <span className="pb-2 border-b-2 border-[#2563EB] text-[#2563EB]">Instructions</span>
                    <span className="pb-2 hover:text-[#111111] cursor-pointer">Tools (4)</span>
                    <span className="pb-2 hover:text-[#111111] cursor-pointer">Knowledge Base</span>
                    <span className="pb-2 hover:text-[#111111] cursor-pointer">Test Sandbox</span>
                  </div>

                  {/* System Prompt Editor Box */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2">
                    <div className="text-[11px] font-mono text-[#6B7280]">SYSTEM INSTRUCTIONS & GUARDRAILS</div>
                    <p className="text-xs font-mono text-[#111111] leading-relaxed bg-[#F7F8FA] p-3 rounded-lg border border-[#E5E7EB]">
                      You are a senior compliance auditor for enterprise SaaS contracts. Extract all liability caps, data residency clauses, and SLA commitments. If liability exceeds $1M, flag for human counsel review.
                    </p>
                  </div>

                  {/* Configured Tools Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'PDF Parser Tool', state: 'Active', icon: FileText },
                      { name: 'Legal Vector Store', state: 'RAG Sync', icon: Database },
                      { name: 'Slack Alert Webhook', state: 'Connected', icon: MessageSquare },
                    ].map((t) => {
                      const ToolIcon = t.icon;
                      return (
                        <div key={t.name} className="bg-white border border-[#E5E7EB] rounded-lg p-2.5 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-[#111111]">
                            <ToolIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{t.name}</span>
                          </div>
                          <div className="text-[10px] text-emerald-600 font-mono mt-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            <span>{t.state}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase">
                AGENT BUILDER
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight leading-tight">
                Build agents without starting from zero.
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed font-normal">
                Design, configure, test, and deploy intelligent agents with everything they need to understand a task and take action.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  'Instructions',
                  'Tools & actions',
                  'Knowledge',
                  'Memory',
                  'Skills',
                  'Testing',
                  'Deployment'
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                    <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={openLogin}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all flex items-center gap-2 shadow-xs"
                >
                  Build an Agent <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 08 - INTEGRATION --- */}
      <section className="py-24 sm:py-32 bg-[#F7F8FA] border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase">
                INTEGRATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight leading-tight">
                Connect every system.
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed font-normal">
                Make AI part of the business systems your teams already use. Connect databases, SaaS applications, internal APIs, and data lakes seamlessly.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  'APIs',
                  'Enterprise applications',
                  'Databases',
                  'SaaS platforms',
                  'Internal systems',
                  'Data sources'
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                    <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={openLogin}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all flex items-center gap-2 shadow-xs"
                >
                  Explore Integrations <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Integration Architecture Topology */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-9 shadow-xs">
                <div className="text-xs font-mono font-bold text-[#6B7280] mb-6 uppercase tracking-wider">
                  ENTERPRISE DATA & SYSTEM MESH
                </div>

                <div className="grid grid-cols-3 gap-6 items-center">
                  
                  {/* Left Sources Column */}
                  <div className="space-y-3">
                    {['CRM (Salesforce / HubSpot)', 'ERP (SAP / Oracle)', 'Databases (Postgres, Mongo)', 'REST / GraphQL APIs', 'SaaS (Zendesk, Slack)', 'Data Lake (Snowflake)'].map((sys) => (
                      <div key={sys} className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-lg p-2.5 text-[11px] font-bold text-[#111111] truncate shadow-2xs">
                        {sys}
                      </div>
                    ))}
                  </div>

                  {/* Middle Hub */}
                  <div className="flex flex-col items-center justify-center p-6 bg-blue-50 border-2 border-[#2563EB] rounded-xl text-center shadow-xs">
                    <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center mb-2 mx-auto">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-black text-[#111111]">SNS SQUARE</div>
                    <div className="text-[10px] font-mono text-[#2563EB] font-bold uppercase mt-1">Unified Gateway</div>
                  </div>

                  {/* Right Target Agents */}
                  <div className="space-y-3">
                    {['Autonomous SuperAgent', 'Customer Copilot', 'Operations Dispatcher', 'Audit Bot'].map((agent) => (
                      <div key={agent} className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-xs font-bold text-purple-950 flex items-center gap-2 shadow-2xs">
                        <Bot className="w-3.5 h-3.5 text-purple-700" />
                        <span>{agent}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 09 - MODEL LAYER --- */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
              MODEL LAYER
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
              The right model<br />for the right job.
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed font-normal mt-4">
              Give every agent access to the intelligence it needs while keeping models independent from your applications and workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODEL_CARDS.map((m) => (
              <div
                key={m.title}
                className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-7 flex flex-col justify-between hover:bg-white hover:border-[#2563EB] hover:shadow-xs transition-all"
                style={{ minHeight: '260px' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black tracking-wider text-[#2563EB] uppercase font-mono">
                      {m.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B7280] px-2 py-0.5 rounded bg-white border border-[#E5E7EB]">
                      {m.latency}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2 tracking-tight">
                    {m.subtitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
                  <span className="font-bold text-[#111111]">Best for: </span>{m.bestFor}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 10 - GOVERNANCE (DARK SECTION CONTRAST) --- */}
      <section className="py-24 sm:py-32 bg-[#0B0F19] text-white border-b border-gray-900">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#2563EB] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              GOVERNANCE LAYER
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Manage enterprise AI<br />with control and confidence.
            </h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-normal">
              AI at enterprise scale requires more than intelligence. SNS Square provides the controls needed to operate AI securely, responsibly, and transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOVERNANCE_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-[#121826] border border-gray-800 hover:border-[#2563EB] rounded-xl p-7 transition-all flex flex-col justify-between"
                style={{ minHeight: '210px' }}
              >
                <div>
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-800 text-[11px] font-mono text-[#2563EB] font-semibold">
                  Zero-Trust Enforced
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 11 - AGENT USE CASES --- */}
      <section className="py-24 sm:py-32 bg-white border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="mb-16">
            <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
              REAL-WORLD WORKFLOWS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              Agents built for real work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENT_USE_CASES.map((agent) => (
              <div
                key={agent.title}
                onClick={openLogin}
                className="group bg-[#F7F8FA] border border-[#E5E7EB] hover:bg-white hover:border-[#2563EB] hover:shadow-md rounded-xl p-7 flex flex-col justify-between transition-all cursor-pointer"
                style={{ minHeight: '240px' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center">
                      {agent.icon}
                    </div>
                    <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider font-bold">
                      {agent.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-2 tracking-tight">
                    {agent.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                    {agent.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#2563EB]">
                  <span>Explore Agent Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 12 - PLATFORM BENEFITS --- */}
      <section className="py-24 sm:py-32 bg-[#F7F8FA] border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="mb-16">
            <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
              PLATFORM ADVANTAGES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              Enterprise advantages by design.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORM_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-[#E5E7EB] rounded-xl p-7 flex flex-col justify-between hover:border-[#2563EB] transition-all"
                style={{ minHeight: '220px' }}
              >
                <div>
                  <h3 className="text-sm font-black text-[#2563EB] uppercase tracking-wider mb-2 font-mono">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#111111] leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>
                <div className="w-6 h-0.5 bg-[#2563EB] mt-4" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 13 - IMPACT (MINIMALIST CONCEPTUAL METRICS) --- */}
      <section className="py-24 sm:py-28 bg-white border-b border-[#E5E7EB]">
        <div className="w-[90%] max-w-[1550px] mx-auto text-center space-y-12">
          <div>
            <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
              PLATFORM SCALE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              One foundation. Every possibility.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl">
              <div className="text-6xl font-black text-[#2563EB] font-mono tracking-tight">5</div>
              <div className="text-sm font-bold text-[#111111] uppercase tracking-wider mt-2">Architecture Layers</div>
              <div className="text-xs text-[#6B7280] mt-1">Orchestration to Governance</div>
            </div>

            <div className="p-8 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl">
              <div className="text-6xl font-black text-[#111111] font-mono tracking-tight">1</div>
              <div className="text-sm font-bold text-[#111111] uppercase tracking-wider mt-2">Unified AI Platform</div>
              <div className="text-xs text-[#6B7280] mt-1">Zero fragmented tooling</div>
            </div>

            <div className="p-8 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl">
              <div className="text-6xl font-black text-[#7C3AED] font-mono tracking-tight">&infin;</div>
              <div className="text-sm font-bold text-[#111111] uppercase tracking-wider mt-2">Intelligent Workflows</div>
              <div className="text-xs text-[#6B7280] mt-1">Autonomous multi-agent execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 14 - INDUSTRIES --- */}
      <section id="solutions" className="py-24 sm:py-32 bg-[#F7F8FA] border-b border-[#E5E7EB] scroll-mt-20">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
                VERTICAL SOLUTIONS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                Transforming enterprises<br />across industries.
              </h2>
            </div>
            <button
              onClick={openLogin}
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5"
            >
              Explore Solutions <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                onClick={openLogin}
                className="bg-white border border-[#E5E7EB] hover:border-[#2563EB] hover:shadow-sm rounded-xl p-7 flex flex-col justify-between transition-all cursor-pointer group"
                style={{ minHeight: '220px' }}
              >
                <div>
                  <h3 className="text-base font-bold text-[#111111] mb-2 tracking-tight">
                    {ind.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                    {ind.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#2563EB]">
                  <span>View Blueprints</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 sm:py-32 bg-[#07101F] text-white overflow-hidden border-b border-white/10 scroll-mt-20">
        <div className="w-[90%] max-w-[1550px] mx-auto mb-16 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-400/20 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Customer Stories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Trusted by teams building<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">the future of AI.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto font-normal leading-relaxed">
            Enterprise teams across industries use SNS Square to orchestrate, govern, and scale intelligent systems.
          </p>
        </div>

        {/* Featured Quote */}
        <div className="w-[90%] max-w-[1550px] mx-auto mb-16">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10 sm:p-14 overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10">
              <div className="flex-1 space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug">
                  "SNS Square gave us a single plane to orchestrate 40+ AI agents across our enterprise. What used to take months of integration work now ships in days."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">RK</div>
                  <div>
                    <div className="text-sm font-bold text-white">Rajan Kumar</div>
                    <div className="text-xs text-white/50">Chief AI Officer <span className="inline-block w-1 h-1 rounded-full bg-white/40 align-middle mx-1" /> GlobalFinance Corp</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-64 xl:w-72 shrink-0 grid grid-cols-2 gap-4">
                {[
                  { val: '12x', label: 'Faster deployment' },
                  { val: '99.9%', label: 'Uptime SLA' },
                  { val: '40+', label: 'Agents orchestrated' },
                  { val: '68%', label: 'Cost reduction' },
                ].map(stat => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-2xl font-black text-white">{stat.val}</div>
                    <div className="text-xs text-white/45 mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Marquee Row */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07101F] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07101F] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 overflow-hidden hover-pause">
            <div className="flex gap-5 animate-[marquee_40s_linear_infinite] shrink-0">
              {[
                { name: 'Sarah Chen', role: 'VP Engineering \u00B7 NexaTech', initials: 'SC', color: 'from-violet-500 to-purple-600', quote: 'The governance layer alone was worth switching. We finally have full audit trails for every AI decision across our org.' },
                { name: 'Michael Torres', role: 'CTO \u00B7 Meridian Health', initials: 'MT', color: 'from-emerald-500 to-teal-600', quote: 'Agent Builder cut our development cycle by 60%. Our teams are shipping intelligent workflows faster than ever.' },
                { name: 'Priya Nair', role: 'Head of AI \u00B7 QuantumRetail', initials: 'PN', color: 'from-pink-500 to-rose-600', quote: 'The integration layer connected 15 enterprise systems in a week. Previously that took us 6 months of custom work.' },
                { name: 'James Okafor', role: 'Director of Data \u00B7 Apex Logistics', initials: 'JO', color: 'from-amber-500 to-orange-600', quote: 'The model layer gives us model-agnostic flexibility. We swap models without touching a line of business logic.' },
                { name: 'Elena Vasquez', role: 'AI Platform Lead \u00B7 Stratos Bank', initials: 'EV', color: 'from-sky-500 to-blue-600', quote: 'Orchestration across our 30-agent pipeline is now fully visual. Our non-technical teams can actually understand and control it.' },
                { name: 'David Park', role: 'SVP Operations \u00B7 CoreManufacturing', initials: 'DP', color: 'from-indigo-500 to-blue-600', quote: 'The compliance and governance features are enterprise-grade. Our security team signed off within 2 weeks of evaluation.' },
                { name: 'Amara Osei', role: 'Chief Digital Officer \u00B7 PanAfrica Energy', initials: 'AO', color: 'from-lime-500 to-green-600', quote: 'We went from 3 disconnected AI tools to one unified platform. The productivity gains are immense.' },
                { name: 'Liam Nguyen', role: 'AI Architect \u00B7 InfinityCloud', initials: 'LN', color: 'from-cyan-500 to-blue-500', quote: 'SNS Square is the connective tissue between all our AI investments. Nothing else comes close at enterprise scale.' },
              ].map((t, i) => (
                <div key={i} className="w-[340px] sm:w-[380px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-7 space-y-5 hover:border-blue-400/30 hover:bg-white/8 transition-all duration-300">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-1 border-t border-white/8">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>{t.initials}</div>
                    <div>
                      <div className="text-xs font-bold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-5 animate-[marquee_40s_linear_infinite] shrink-0" aria-hidden="true">
              {[
                { name: 'Sarah Chen', role: 'VP Engineering \u00B7 NexaTech', initials: 'SC', color: 'from-violet-500 to-purple-600', quote: 'The governance layer alone was worth switching. We finally have full audit trails for every AI decision across our org.' },
                { name: 'Michael Torres', role: 'CTO \u00B7 Meridian Health', initials: 'MT', color: 'from-emerald-500 to-teal-600', quote: 'Agent Builder cut our development cycle by 60%. Our teams are shipping intelligent workflows faster than ever.' },
                { name: 'Priya Nair', role: 'Head of AI \u00B7 QuantumRetail', initials: 'PN', color: 'from-pink-500 to-rose-600', quote: 'The integration layer connected 15 enterprise systems in a week. Previously that took us 6 months of custom work.' },
                { name: 'James Okafor', role: 'Director of Data \u00B7 Apex Logistics', initials: 'JO', color: 'from-amber-500 to-orange-600', quote: 'The model layer gives us model-agnostic flexibility. We swap models without touching a line of business logic.' },
                { name: 'Elena Vasquez', role: 'AI Platform Lead \u00B7 Stratos Bank', initials: 'EV', color: 'from-sky-500 to-blue-600', quote: 'Orchestration across our 30-agent pipeline is now fully visual. Our non-technical teams can actually understand and control it.' },
                { name: 'David Park', role: 'SVP Operations \u00B7 CoreManufacturing', initials: 'DP', color: 'from-indigo-500 to-blue-600', quote: 'The compliance and governance features are enterprise-grade. Our security team signed off within 2 weeks of evaluation.' },
                { name: 'Amara Osei', role: 'Chief Digital Officer \u00B7 PanAfrica Energy', initials: 'AO', color: 'from-lime-500 to-green-600', quote: 'We went from 3 disconnected AI tools to one unified platform. The productivity gains are immense.' },
                { name: 'Liam Nguyen', role: 'AI Architect \u00B7 InfinityCloud', initials: 'LN', color: 'from-cyan-500 to-blue-500', quote: 'SNS Square is the connective tissue between all our AI investments. Nothing else comes close at enterprise scale.' },
              ].map((t, i) => (
                <div key={i} className="w-[340px] sm:w-[380px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-7 space-y-5 hover:border-blue-400/30 hover:bg-white/8 transition-all duration-300">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-1 border-t border-white/8">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>{t.initials}</div>
                    <div>
                      <div className="text-xs font-bold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* --- SECTION 15 - FINAL CTA (DARK TRANSITION) --- */}
      <section className="py-28 sm:py-36 bg-[#0B0F19] text-white relative overflow-hidden">
        <div className="w-[90%] max-w-[1550px] mx-auto text-center relative z-10 space-y-8">
          
          <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase">
            SNS SQUARE
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Start building your AI ecosystem.
          </h2>

          <div className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto space-y-1 font-normal">
            <p>Build agents. Connect systems. Orchestrate workflows.</p>
            <p>Choose the right intelligence. Govern everything.</p>
            <p className="text-white font-semibold pt-2">SNS Square gives your enterprise one foundation for all of it.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={openLogin}
              className="px-8 py-4 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-md hover:scale-[1.02]"
            >
              Get Started
            </button>
            <button
              onClick={openLogin}
              className="px-8 py-4 rounded-lg text-sm font-semibold text-white bg-transparent border border-gray-700 hover:bg-white/5 hover:border-gray-500 transition-all"
            >
              Explore the Platform
            </button>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}

      <footer className="bg-[#07101F] border-t border-white/10 py-16 text-white/50">
        <div className="w-[90%] max-w-[1550px] mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            
            {/* Brand Col */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={snsLogo} alt="SNS Square" className="w-7 h-7 object-contain rounded-md" />
                <span className="text-sm font-bold text-white tracking-tight uppercase">SNS SQUARE</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Build. Connect. Orchestrate. Govern.
              </p>
              <p className="text-xs text-white/30">
                The enterprise foundation for intelligent systems.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">PLATFORM</h4>
              <ul className="space-y-2.5 text-xs">
                {['Orchestration', 'Agent Builder', 'Integrations', 'Models', 'Governance'].map((item) => (
                  <li key={item}>
                    <button onClick={openLogin} className="hover:text-blue-400 transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">SOLUTIONS</h4>
              <ul className="space-y-2.5 text-xs">
                {['Enterprise AI', 'AI Automation', 'Customer Operations', 'IT Operations', 'Business Intelligence'].map((item) => (
                  <li key={item}>
                    <button onClick={openLogin} className="hover:text-blue-400 transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">RESOURCES</h4>
              <ul className="space-y-2.5 text-xs">
                {['Documentation', 'Guides', 'Blog', 'Case Studies', 'Developer Resources'].map((item) => (
                  <li key={item}>
                    <button onClick={openLogin} className="hover:text-blue-400 transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">COMPANY</h4>
              <ul className="space-y-2.5 text-xs">
                {['About', 'Careers', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <button onClick={openLogin} className="hover:text-blue-400 transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/30 gap-4">
            <p>SNS Square &copy; 2026. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={openLogin} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={openLogin} className="hover:text-white transition-colors">Terms of Service</button>
              <button onClick={openLogin} className="hover:text-white transition-colors">Security</button>
            </div>
          </div>

        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* AI CHATBOT WIDGET */}
      <AIChatbot />
    </div>
  );
};
