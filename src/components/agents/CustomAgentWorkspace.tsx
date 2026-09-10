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
  MessageSquare,
  Users,
  Layers,
  ArrowLeft,
  Search,
  Star,
  Compass,
  Upload,
  Paperclip,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  X,
  Lock,
  Headphones,
  Activity,
  Coins,
  FileCheck
} from 'lucide-react';

// ==========================================
// 10 DEFAULT CUSTOM AGENTS WITH REAL USECASES
// ==========================================

export interface CustomAgentItem {
  id: string;
  name: string;
  rating: string;
  category: string;
  author: string;
  desc: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  avatarChar: string;
  isFeatured?: boolean;
  systemPrompt: string;
  starters: string[];
  model: string;
}

const DEFAULT_10_AGENTS: CustomAgentItem[] = [
  {
    id: 'agent-architect',
    name: 'Enterprise Architecture Synthesizer',
    rating: '4.9 ★',
    category: 'Engineering & DevOps',
    author: 'SNS Architecture Labs',
    desc: 'Generates end-to-end cloud microservice topologies, entity schemas, and production Terraform IaC blueprints.',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    iconBorder: 'border-indigo-100',
    avatarChar: 'EA',
    isFeatured: true,
    model: 'Claude 3.5 Sonnet',
    systemPrompt: 'You are an elite enterprise software architect. Design scalable, secure, multi-cloud microservices and generate Terraform IaC.',
    starters: [
      'Design a multi-tenant fintech microservice architecture',
      'Generate AWS Terraform code for an EKS cluster with Redis',
      'Create database entity schema for e-commerce checkout'
    ]
  },
  {
    id: 'agent-finops',
    name: 'FinOps Cloud Cost & Anomaly Optimizer',
    rating: '4.9 ★',
    category: 'Finance & FinOps',
    author: 'SNS FinOps Core',
    desc: 'Monitors AWS/Azure cloud spend, discovers idle compute waste, detects anomaly spikes, and forecasts in INR.',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    iconBorder: 'border-cyan-100',
    avatarChar: 'FO',
    isFeatured: true,
    model: 'DeepSeek-R1 (Reasoning)',
    systemPrompt: 'You are a certified FinOps practitioner. Analyze cloud billing telemetry, rightsizing opportunities, and cost anomalies in INR.',
    starters: [
      'Analyze cost anomaly in Kubernetes nodes',
      'Calculate monthly savings for 3-year EC2 reservations in INR',
      'Suggest tagging strategy to allocate multi-cloud costs'
    ]
  },
  {
    id: 'agent-soc2',
    name: 'SOC 2 & Security Compliance Auditor',
    rating: '4.8 ★',
    category: 'Security & Compliance',
    author: 'CyberSec Ops',
    desc: 'Automates continuous security control posture, validates IAM policies, and collects evidence for SOC 2 Type II audits.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconBorder: 'border-emerald-100',
    avatarChar: 'SC',
    isFeatured: true,
    model: 'GPT-4o',
    systemPrompt: 'You are a senior SOC 2 Type II and ISO 27001 auditor. Audit cloud access permissions and generate compliance evidence.',
    starters: [
      'Verify IAM policy compliance for least privilege',
      'Generate evidence checklist for SOC 2 Trust Services Criteria',
      'Audit encryption-at-rest settings across S3 and RDS'
    ]
  },
  {
    id: 'agent-support',
    name: 'Customer Support Escalation Triage',
    rating: '4.8 ★',
    category: 'Customer Support',
    author: 'Customer Ops Team',
    desc: 'Classifies inbound Zendesk tickets by sentiment and urgency, drafting contextual resolutions with human handoff.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    iconBorder: 'border-blue-100',
    avatarChar: 'ST',
    model: 'Claude 3.5 Sonnet',
    systemPrompt: 'You are an empathetic senior customer operations specialist. Resolve technical questions and format structured replies.',
    starters: [
      'Draft a polite resolution for delayed shipment inquiry',
      'Triage an urgent P0 API 500 error ticket',
      'Summarize customer ticket history for escalation'
    ]
  },
  {
    id: 'agent-research',
    name: 'Deep Research & Market Analyst',
    rating: '4.9 ★',
    category: 'Research & Analysis',
    author: 'Research Squad',
    desc: 'Performs multi-source enterprise market analysis, synthesizing competitor intelligence and technical whitepapers with citations.',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    iconBorder: 'border-purple-100',
    avatarChar: 'DR',
    model: 'Gemini 1.5 Pro',
    systemPrompt: 'You are an expert market analyst and scientific researcher. Deliver deep structured reports with verifiable citations.',
    starters: [
      'Analyze enterprise AI market dynamics in 2026',
      'Compare PostgreSQL vs ClickHouse for telemetry ingestion',
      'Draft competitive landscape analysis for cloud FinOps'
    ]
  },
  {
    id: 'agent-api-validator',
    name: 'API Contract & Schema Validator',
    rating: '4.7 ★',
    category: 'Engineering & DevOps',
    author: 'QA Automation Lab',
    desc: 'Validates OpenAPI/Swagger specifications, creates fuzzing test scenarios, and checks breaking backwards compatibility.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    iconBorder: 'border-orange-100',
    avatarChar: 'AV',
    model: 'GPT-4o',
    systemPrompt: 'You are a senior QA automation engineer specializing in API contract validation, GraphQL schemas, and REST mock generation.',
    starters: [
      'Check OpenAPI schema for breaking changes',
      'Generate boundary edge case test payloads in JSON',
      'Create synthetic mock response for user authentication endpoint'
    ]
  },
  {
    id: 'agent-meeting-notes',
    name: 'Executive Meeting Minutes & Action Tracker',
    rating: '4.9 ★',
    category: 'Productivity',
    author: 'Productivity Labs',
    desc: 'Transforms raw audio transcripts and messy notes into executive summaries, key decisions, and syncable Jira action items.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    iconBorder: 'border-amber-100',
    avatarChar: 'MN',
    model: 'Claude 3.5 Sonnet',
    systemPrompt: 'You are an executive chief of staff. Convert unstructured meeting notes into crisp summaries and assigned action items.',
    starters: [
      'Extract action items and assignees from sprint meeting notes',
      'Format executive summary for leadership team',
      'Draft follow-up email with timeline commitments'
    ]
  },
  {
    id: 'agent-hr-policy',
    name: 'HR Onboarding & Policy Assistant',
    rating: '4.8 ★',
    category: 'Legal & HR',
    author: 'People Operations',
    desc: 'Answers questions on employee benefits, PTO allowances, health insurance claims, and company workplace handbooks.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    iconBorder: 'border-rose-100',
    avatarChar: 'HR',
    model: 'GPT-4o',
    systemPrompt: 'You are an HR people partner. Answer employee questions accurately based on company policy guidelines.',
    starters: [
      'What is the parental leave policy allowance?',
      'How do I claim health insurance reimbursement?',
      'Explain the standard work-from-anywhere guidelines'
    ]
  },
  {
    id: 'agent-devops-copilot',
    name: 'DevOps Incident & Rollback Copilot',
    rating: '4.9 ★',
    category: 'Engineering & DevOps',
    author: 'Cloud SRE Team',
    desc: 'Diagnoses Kubernetes container crashes, inspects CI/CD pipeline logs, and suggests automated canary rollbacks.',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    iconBorder: 'border-slate-200',
    avatarChar: 'DO',
    model: 'DeepSeek-R1 (Reasoning)',
    systemPrompt: 'You are a principal Site Reliability Engineer. Troubleshoot container crash loops, OOM kills, and deployment rollbacks.',
    starters: [
      'Diagnose CrashLoopBackOff error in Kubernetes pod',
      'Write safe rollback step for failing database migration',
      'Generate Prometheus alerting rule for elevated 5xx error rates'
    ]
  },
  {
    id: 'agent-legal-reviewer',
    name: 'Legal Contract & Liability Reviewer',
    rating: '4.8 ★',
    category: 'Legal & HR',
    author: 'Legal Counsel Group',
    desc: 'Analyzes enterprise SaaS agreements, NDAs, liability cap thresholds, and flags non-standard indemnification clauses.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    iconBorder: 'border-violet-100',
    avatarChar: 'LR',
    model: 'Claude 3.5 Sonnet',
    systemPrompt: 'You are an enterprise legal counsel. Review SaaS commercial contracts, identify risk terms, and suggest standard redlines.',
    starters: [
      'Identify uncapped liability terms in SaaS Master Services Agreement',
      'Review mutual non-disclosure agreement for standard term duration',
      'Suggest redline language for GDPR data processing addendum'
    ]
  }
];

const CATEGORIES = [
  'Top Picks',
  'Engineering & DevOps',
  'Finance & FinOps',
  'Security & Compliance',
  'Customer Support',
  'Research & Analysis',
  'Productivity',
  'Legal & HR'
];

export const CustomAgentWorkspace: React.FC = () => {
  const { setCurrentView } = useNavigation();

  // Mode: 'explore' (GPT Explorer style) | 'studio' (Create / Configure Split Screen) | 'test-agent' (Testing existing agent)
  const [viewMode, setViewMode] = useState<'explore' | 'studio'>('explore');
  const [selectedCategory, setSelectedCategory] = useState('Top Picks');
  const [searchQuery, setSearchQuery] = useState('');
  const [customAgents, setCustomAgents] = useState<CustomAgentItem[]>(DEFAULT_10_AGENTS);

  // Active Selected Agent in Studio
  const [activeTab, setActiveTab] = useState<'create' | 'configure'>('create');
  const [agentName, setAgentName] = useState('New Custom Agent');
  const [agentDesc, setAgentDesc] = useState('An intelligent AI assistant customized for your enterprise workflows.');
  const [agentInstructions, setAgentInstructions] = useState(
    'You are a specialized enterprise AI agent. Follow instructions strictly, maintain privacy guardrails, and provide structured insights.'
  );
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [conversationStarters, setConversationStarters] = useState<string[]>([
    'How can you help our team?',
    'Analyze our latest data',
    'Run a workflow diagnostic'
  ]);
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(true);
  const [isCodeInterpreterEnabled, setIsCodeInterpreterEnabled] = useState(true);

  // Conversational Builder Chat State (Left Pane in 'create' tab)
  const [builderMessages, setBuilderMessages] = useState<Array<{ role: 'assistant' | 'user'; text: string }>>([
    {
      role: 'assistant',
      text: `Hi! I'll help you build a new Custom Agent. You can say something like, "make a financial advisor who monitors cloud budgets and alerts on Slack" or "make a DevOps engineer who validates Terraform files."\n\nWhat would you like to make?`
    }
  ]);
  const [builderInput, setBuilderInput] = useState('');
  const [isBuilderThinking, setIsBuilderThinking] = useState(false);

  // Live Playground Chat State (Right Pane)
  const [playgroundMessages, setPlaygroundMessages] = useState<Array<{ role: 'agent' | 'user' | 'thought'; text: string }>>([]);
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [isPlaygroundRunning, setIsPlaygroundRunning] = useState(false);

  // Filter Agents
  const filteredAgents = customAgents.filter(agent => {
    const matchesCategory =
      selectedCategory === 'Top Picks' ? true : agent.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open Studio to Create New Agent
  const handleOpenCreateStudio = () => {
    setAgentName('New Custom Agent');
    setAgentDesc('Custom assistant configured with enterprise tools and knowledge.');
    setAgentInstructions('You are an intelligent enterprise agent.');
    setBuilderMessages([
      {
        role: 'assistant',
        text: `Hi! I'll help you build a new Custom Agent. You can say something like, "make a financial advisor who monitors cloud budgets" or "make a DevOps engineer who validates Terraform files."\n\nWhat would you like to make?`
      }
    ]);
    setPlaygroundMessages([]);
    setActiveTab('create');
    setViewMode('studio');
  };

  // Open Studio to Edit/Test Existing Agent
  const handleOpenExistingAgent = (agent: CustomAgentItem) => {
    setAgentName(agent.name);
    setAgentDesc(agent.desc);
    setAgentInstructions(agent.systemPrompt);
    setSelectedModel(agent.model);
    setConversationStarters(agent.starters);
    setPlaygroundMessages([
      {
        role: 'agent',
        text: `Hello! I am **${agent.name}** (${agent.category}). How can I assist you today?`
      }
    ]);
    setActiveTab('configure');
    setViewMode('studio');
  };

  // Conversational Builder Submit (Left Pane)
  const handleBuilderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderInput.trim() || isBuilderThinking) return;

    const userText = builderInput.trim();
    setBuilderInput('');
    setBuilderMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsBuilderThinking(true);

    setTimeout(() => {
      // Auto-extract and update agent config based on user input
      let reply = `Great idea! I've updated the agent behavior.`;
      if (userText.toLowerCase().includes('finops') || userText.toLowerCase().includes('cost')) {
        setAgentName('FinOps Budget Copilot');
        setAgentDesc('Analyzes cloud expenditures, discovers idle compute waste, and recommends reservation savings in INR.');
        setAgentInstructions(`You are an expert cloud FinOps advisor. Guide users on cost allocation, reservation planning, and unit economics.`);
        reply = `I've named the agent **FinOps Budget Copilot** and configured its persona with cost optimization instructions. Would you like to connect a cloud billing data source or add custom Slack alerts?`;
      } else if (userText.toLowerCase().includes('devops') || userText.toLowerCase().includes('terraform') || userText.toLowerCase().includes('code')) {
        setAgentName('DevOps Blueprint Generator');
        setAgentDesc('Validates infrastructure code, checks Terraform drift, and crafts CI/CD pipelines.');
        setAgentInstructions(`You are a senior DevOps and SRE engineer. Generate verified Terraform modules and diagnose Kubernetes pod crashes.`);
        reply = `I've configured the agent as **DevOps Blueprint Generator** with IaC syntax verification and Kubernetes telemetry rules. You can test it on the right!`;
      } else {
        const generatedName = userText.split(' ').slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Agent';
        setAgentName(generatedName);
        setAgentInstructions(`You are ${generatedName}. Expertly assist the user with: ${userText}`);
        reply = `I've updated the instructions and name to **${generatedName}**. You can test its responses in the live Preview panel on the right.`;
      }

      setBuilderMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsBuilderThinking(false);
    }, 1000);
  };

  // Live Playground Chat Submit (Right Pane)
  const handlePlaygroundSubmit = (textToSend?: string) => {
    const text = textToSend || playgroundInput;
    if (!text.trim() || isPlaygroundRunning) return;

    setPlaygroundInput('');
    setPlaygroundMessages(prev => [...prev, { role: 'user', text }]);
    setIsPlaygroundRunning(true);

    setTimeout(() => {
      let response = `Here is the structured insight based on **${agentName}** configuration:\n\n1. **Analysis**: Verified context using ${selectedModel}.\n2. **Recommendation**: Implement zero-trust boundaries with automated monitoring.\n3. **Action**: Ready to dispatch workflow payload.`;
      if (text.toLowerCase().includes('finops') || text.toLowerCase().includes('cost')) {
        response = `📊 **FinOps Telemetry Overview**:\n- **Current Run Rate**: ₹18.4 Lakhs/mo (-12% vs budget)\n- **Idle EC2/RDS Waste**: ₹3.2 Lakhs/mo detected across 6 unattached EBS volumes\n- **Recommendation**: Apply 1-year Compute Savings Plans to save ~24% immediately.`;
      } else if (text.toLowerCase().includes('terraform') || text.toLowerCase().includes('architecture')) {
        response = '```terraform\n# Production Multi-AZ Architecture\nmodule "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"\n  version = "5.0.0"\n  name    = "enterprise-core-vpc"\n  cidr    = "10.0.0.0/16"\n}\n```\n✅ Synthesized valid Terraform IaC with encrypted storage and multi-AZ failover.';
      }

      setPlaygroundMessages(prev => [...prev, { role: 'agent', text: response }]);
      setIsPlaygroundRunning(false);
    }, 900);
  };

  // Save New Custom Agent
  const handleSaveCustomAgent = () => {
    const newAgent: CustomAgentItem = {
      id: `agent-${Date.now()}`,
      name: agentName,
      rating: '5.0 ★',
      category: 'Enterprise',
      author: 'You (Custom Created)',
      desc: agentDesc,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      iconBorder: 'border-purple-200',
      avatarChar: agentName.slice(0, 2).toUpperCase(),
      model: selectedModel,
      systemPrompt: agentInstructions,
      starters: conversationStarters
    };

    setCustomAgents(prev => [newAgent, ...prev]);
    alert(`🎉 "${agentName}" successfully created and added to your Custom Agents catalog!`);
    setViewMode('explore');
  };

  // =========================================================================
  // VIEW 1: EXPLORE CUSTOM AGENTS (White Theme matching GPTs Explorer)
  // =========================================================================
  if (viewMode === 'explore') {
    return (
      <div className="space-y-8 animate-fade-in select-none pb-20 max-w-7xl mx-auto font-sans text-slate-800">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-slate-400">Build and Create</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Custom Agents</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedCategory('Top Picks')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              My Agents
            </button>
            <button
              onClick={handleOpenCreateStudio}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Search Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-4 pb-2">
          <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Custom Agents
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Discover and create custom enterprise AI agents that combine instructions, extra knowledge, and any combination of tools and skills.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Custom Agents..."
                className="w-full pl-11 pr-4 py-3 text-xs bg-white border border-slate-200 rounded-2xl shadow-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Curated Picks Section (Top 3) */}
        {selectedCategory === 'Top Picks' && !searchQuery && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Featured</h3>
              <p className="text-xs text-slate-500">Curated top picks from this week</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {customAgents.filter(a => a.isFeatured).map(agent => (
                <div
                  key={agent.id}
                  onClick={() => handleOpenExistingAgent(agent)}
                  className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer group flex flex-col justify-between"
                  style={{ minHeight: '190px' }}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${agent.iconBg} ${agent.iconColor} border ${agent.iconBorder} flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      {agent.avatarChar}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {agent.name}
                        </h4>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {agent.rating} &middot; By {agent.author}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 pt-1 font-normal leading-relaxed">
                        {agent.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">{agent.model}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Try Agent <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10 Default Custom Agents List with Diverse Real-World Use Cases */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {selectedCategory === 'Top Picks' ? 'Trending Enterprise Agents' : `${selectedCategory} Agents`}
              </h3>
              <p className="text-xs text-slate-500">
                Showing {filteredAgents.length} purpose-built autonomous agents
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                onClick={() => handleOpenExistingAgent(agent)}
                className="bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-sm rounded-2xl p-4.5 transition-all cursor-pointer group flex items-start gap-4"
              >
                {/* Agent Avatar */}
                <div
                  className={`w-12 h-12 rounded-2xl ${agent.iconBg} ${agent.iconColor} border ${agent.iconBorder} flex items-center justify-center font-black text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                >
                  {agent.avatarChar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {agent.name}
                    </h4>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-bold shrink-0">
                      {agent.rating}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium">
                    By {agent.author} &middot; <span className="text-slate-500">{agent.category}</span>
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                    {agent.desc}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {agent.model}
                    </span>
                    <span className="text-xs font-bold text-blue-600 group-hover:underline inline-flex items-center gap-1">
                      Use Agent &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: CREATE / CONFIGURE CUSTOM AGENT STUDIO (Split Screen matching Image 2)
  // =========================================================================
  return (
    <div className="h-[calc(100vh-96px)] min-h-[640px] w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col font-sans select-none text-slate-800">
      
      {/* Studio Top Navigation Bar */}
      <header className="h-14 bg-white border-b border-slate-200/90 px-5 flex items-center justify-between shrink-0 z-20">
        
        {/* Left: Back Arrow + Agent Avatar + Name + Draft Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('explore')}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            title="Back to Explore Agents"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
              {agentName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="text-xs font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-0.5"
                />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[10px] font-mono text-slate-400">Draft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Save / Create Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveCustomAgent}
            className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Create & Publish</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2-COLUMN SPLIT SCREEN WORKSPACE (Left: Builder / Config, Right: Preview) */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANE: BUILDER (Create / Configure Tabs) */}
        <div className="w-1/2 border-r border-slate-200/90 flex flex-col bg-white overflow-hidden">
          
          {/* Sub-tab Pill Switcher: [ Create ] | [ Configure ] */}
          <div className="p-3 border-b border-slate-100 flex justify-center shrink-0">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'create'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create
              </button>
              <button
                onClick={() => setActiveTab('configure')}
                className={`px-6 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTab === 'configure'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Configure
              </button>
            </div>
          </div>

          {/* TAB 1: CONVERSATIONAL AI BUILDER (Image 2 style) */}
          {activeTab === 'create' ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden p-6 bg-[#FAFAFC]">
              
              {/* Chat Conversation Flow */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {builderMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 text-xs leading-relaxed ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                        <Bot className="w-4 h-4 text-sky-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-[#0F172A] text-white rounded-br-xs shadow-xs'
                          : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isBuilderThinking && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse pl-10">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                    <span>Updating Custom Agent instructions & capabilities...</span>
                  </div>
                )}
              </div>

              {/* Bottom Input Box (Image 2 prompt bar) */}
              <form onSubmit={handleBuilderSubmit} className="pt-4 shrink-0">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex flex-col gap-2">
                  <textarea
                    value={builderInput}
                    onChange={(e) => setBuilderInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleBuilderSubmit(e);
                      }
                    }}
                    placeholder="Ask anything or describe what your custom agent should do..."
                    rows={2}
                    className="w-full p-2 text-xs bg-transparent focus:outline-none resize-none text-slate-800 placeholder:text-slate-400"
                  />

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 px-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px]">
                        <Brain className="w-3 h-3 text-purple-600" /> Think
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!builderInput.trim() || isBuilderThinking}
                      className="p-2 rounded-xl bg-[#0F172A] hover:bg-blue-600 text-white disabled:opacity-40 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* TAB 2: MANUAL CONFIGURATION */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              
              {/* Avatar + Basic Details */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-black text-xl shadow-2xs">
                  {agentName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={agentDesc}
                      onChange={(e) => setAgentDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Instructions Editor */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Instructions / System Prompt
                </label>
                <textarea
                  value={agentInstructions}
                  onChange={(e) => setAgentInstructions(e.target.value)}
                  rows={5}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 font-mono leading-relaxed"
                />
              </div>

              {/* Conversation Starters */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Conversation Starters
                </label>
                <div className="space-y-2">
                  {conversationStarters.map((starter, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={starter}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConversationStarters(prev => prev.map((s, i) => (i === idx ? val : s)));
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                      <button
                        onClick={() => setConversationStarters(prev => prev.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setConversationStarters(prev => [...prev, 'New prompt starter'])}
                    className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Starter
                  </button>
                </div>
              </div>

              {/* Knowledge Base */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Knowledge Base (RAG)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-blue-400 transition-colors bg-slate-50/50">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-slate-700">Upload Files or Documents</p>
                  <p className="text-[10px] text-slate-400">PDF, Markdown, DOCX, or CSV (up to 100MB)</p>
                </div>
              </div>

              {/* Capabilities Checkboxes */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Capabilities
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isWebSearchEnabled}
                      onChange={(e) => setIsWebSearchEnabled(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span className="font-semibold text-slate-800">Web Search & Live Browsing</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCodeInterpreterEnabled}
                      onChange={(e) => setIsCodeInterpreterEnabled(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span className="font-semibold text-slate-800">Code Interpreter & Sandbox Execution</span>
                  </label>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT PANE: LIVE PREVIEW PLAYGROUND (Right side of Image 2) */}
        <div className="w-1/2 flex flex-col bg-[#F8FAFC] overflow-hidden">
          
          {/* Preview Header: "Preview" + Model Selector */}
          <div className="h-12 bg-white border-b border-slate-200/90 px-5 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-slate-700">Preview</span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500"
              >
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="DeepSeek-R1 (Reasoning)">DeepSeek-R1 (Reasoning)</option>
                <option value="GPT-4o">OpenAI GPT-4o</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
              </select>
            </div>
          </div>

          {/* Playground Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {playgroundMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 font-black text-xl">
                  {agentName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{agentName}</h4>
                  <p className="text-xs text-slate-500 mt-1">{agentDesc}</p>
                </div>

                {/* Prompt Starters Chips */}
                <div className="grid grid-cols-1 gap-2 w-full pt-2">
                  {conversationStarters.map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePlaygroundSubmit(starter)}
                      className="p-2.5 text-xs text-left bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-xl transition-all shadow-2xs text-slate-700 font-medium"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              playgroundMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 text-xs leading-relaxed ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'agent' && (
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {agentName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#0F172A] text-white rounded-br-xs shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs font-normal'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {isPlaygroundRunning && (
              <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse pl-10">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                <span>{agentName} is formulating response with {selectedModel}...</span>
              </div>
            )}
          </div>

          {/* Playground Bottom Input Bar (matching Image 2 right pane) */}
          <div className="p-4 bg-white border-t border-slate-200/90 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaygroundSubmit();
              }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-2xs"
            >
              <input
                type="text"
                value={playgroundInput}
                onChange={(e) => setPlaygroundInput(e.target.value)}
                placeholder={`Start by testing ${agentName}...`}
                className="flex-1 text-xs bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
              />

              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600">
                  Think
                </span>
                <button
                  type="submit"
                  disabled={!playgroundInput.trim() || isPlaygroundRunning}
                  className="p-1.5 rounded-xl bg-[#0F172A] hover:bg-blue-600 text-white disabled:opacity-30 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
