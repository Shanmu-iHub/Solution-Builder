import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { WorkspaceView } from '../../types';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  ChevronRight,
  Zap,
  ArrowRight,
  Search,
  BookOpen,
  Layers,
  ShieldCheck,
  CreditCard,
  Cpu,
  Compass,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    view: WorkspaceView;
  };
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['what is', 'sns square', 'about', 'overview', 'who are you', 'platform'],
    response:
      '**SNS Square** is an Enterprise AI-First Cloud Architecture & Autonomous Agent Orchestration Platform. It unifies Full-Stack Solution Building, Custom AI Agents, Cloud FinOps (in INR ₹), DevOps CI/CD, and Compliance Automation (SOC 2, HIPAA) into a single developer ecosystem.',
    action: { label: 'Explore Dashboard', view: 'home' as WorkspaceView },
    suggestions: ['What products do you have?', 'How does Agent Builder work?', 'Show me FinOps pricing in INR']
  },
  {
    keywords: ['product', 'products', 'finops', 'monitoring', 'testing', 'devops', 'compliance', 'analytics', 'audit', 'gamification', 'gamifications'],
    response:
      'SNS Square offers 8 Core Operational Products:\n\n• **FinOps**: Cloud cost intelligence in INR (₹) with automated waste reduction\n• **Monitoring**: Real-time telemetry, Prometheus metrics, and anomaly detection\n• **Testing**: Automated E2E, load simulations & AI evaluation test suites\n• **DevOps**: CI/CD pipelines, GitOps, and Kubernetes EKS rollouts\n• **Compliance**: Automated SOC 2 Type II, HIPAA, and DPDP policy checks\n• **Analytics**: Operational intelligence, developer velocity & BI dashboards\n• **Audit**: Immutable trail & enterprise audit logs\n• **Gamifications**: Quests, XP rewards, streaks & squad leaderboards.',
    action: { label: 'View All Products', view: 'products' as WorkspaceView },
    suggestions: ['Tell me about FinOps', 'What is Gamifications?', 'How does Testing work?']
  },
  {
    keywords: ['finops', 'cost', 'cloud bill', 'savings', 'aws cost', 'inr', 'rupees'],
    response:
      '**FinOps Workspace** delivers automated multi-cloud cost intelligence formatted in Indian Rupees (₹):\n\n• Real-time compute & database spend tracking\n• Idle EC2/EBS volume auto-hibernation\n• Spot instance rebalancing with 0 downtime\n• Average enterprise customer saves **32%** on AWS/GCP bills monthly.',
    action: { label: 'Open FinOps Workspace', view: 'product-finops' as WorkspaceView },
    suggestions: ['Check Credits & Billing', 'Tell me about Compliance', 'Go to Solution Builder']
  },
  {
    keywords: ['agent', 'custom agent', 'agent builder', 'build agent', 'create agent', 'superagent'],
    response:
      'With **Agent Builder & Custom Agent Workspace**, you can configure autonomous AI agents in minutes:\n\n1. **Define Persona & System Prompt**\n2. **Connect Tools & Integrations** (Slack, Zendesk, Postgres, GitHub, Webhooks)\n3. **Index Knowledge Bases** (PDFs, Notion, SQL data via RAG)\n4. **Select Base LLM** (Claude 3.5 Sonnet, GPT-4o, Llama 3 70B)\n5. **Deploy with 1-Click** or trigger via REST / Python SDK.',
    action: { label: 'Open Custom Agent Builder', view: 'custom-agent' as WorkspaceView },
    suggestions: ['Show Marketplace Agents', 'What is SuperAgent?', 'How much does it cost?']
  },
  {
    keywords: ['marketplace', 'store', 'templates', 'blueprints', 'explore agents'],
    response:
      'The **SNS Square Marketplace** features verified community & core agents and architecture blueprints:\n\n• **Featured Agents**: Customer Support, Content Creator, Data Analyst\n• **Popular Agents**: Sales Outreach, Research Agent, HR Assistant\n• **Solution Blueprints**: E-Commerce Cloud, Multi-Tenant FinOps, Healthcare HIPAA SaaS\n\nAll items include interactive sandboxes and 1-click workspace deployment.',
    action: { label: 'Browse Marketplace', view: 'marketplace' as WorkspaceView },
    suggestions: ['How to build Custom Agent?', 'Check Support & Tickets', 'Show AI Factory']
  },
  {
    keywords: ['factory', 'ai factory', 'services', 'ai chat', 'ai image', 'ai video', 'ai music', 'ai audio', 'ai pods'],
    response:
      'The **AI Factory (Services)** suite includes generative media & compute engines:\n\n• **AI Chat**: Multi-model conversational workspace\n• **AI Image & Video**: Next-gen diffusion and video rendering\n• **AI Music & Audio**: Voice synthesis and custom soundtracks\n• **AI Pods**: Dedicated high-GPU serverless compute containers.',
    action: { label: 'Explore AI Factory', view: 'services' as WorkspaceView },
    suggestions: ['Tell me about AI Chat', 'Go to Marketplace', 'View Products']
  },
  {
    keywords: ['ticket', 'support', 'help', 'contact', 'bug', 'issue', 'create ticket'],
    response:
      'The **Help & Support System** provides an end-to-end ticketing platform:\n\n• Create new tickets with priority tiers (P1 Urgent to P4 Low)\n• Clean single-row ticket management with real-time status (Open, In Progress, Resolved)\n• Dedicated Full-Page ticket submission with file attachments and SLA tracking.',
    action: { label: 'Open Help & Support', view: 'support' as WorkspaceView },
    suggestions: ['How to check Billing?', 'What is SNS Square?', 'Open FinOps']
  },
  {
    keywords: ['credit', 'billing', 'price', 'pricing', 'inr', 'rupee', 'subscription', 'plan'],
    response:
      '**Credits & Billing** are fully localized in Indian Rupees (₹):\n\n• **Free Starter Tier**: ₹0 with 5,000 monthly inference credits\n• **Pro Developer**: ₹2,499 / month with 50,000 credits & priority API endpoints\n• **Enterprise Grid**: Custom pricing with dedicated VPC and 99.99% SLA\n• GST invoice generation and instant wallet top-ups via UPI / NetBanking / Cards.',
    action: { label: 'View Usage & Billing', view: 'usage' as WorkspaceView },
    suggestions: ['Explore FinOps', 'Build Custom Agent', 'Open Help & Support']
  },
  {
    keywords: ['compliance', 'security', 'hipaa', 'soc2', 'dpdp', 'privacy', 'gdpr'],
    response:
      '**Security & Compliance Standards at SNS Square**:\n\n• **SOC 2 Type II Certified** & ISO 27001 compliant\n• **Indian DPDP Act 2023** & GDPR data residency safeguards\n• **HIPAA Ready**: Zero data retention on LLM gateways with client-side KMS envelope encryption\n• Automated compliance audits and downloadable auditor reports.',
    action: { label: 'Check Compliance Workspace', view: 'product-compliance' as WorkspaceView },
    suggestions: ['View Audit Logs', 'Check Products', 'Browse Marketplace']
  }
];

const QUICK_STARTERS = [
  'What is SNS Square?',
  'Show all Products',
  'How does FinOps save cost in INR?',
  'How do I build a Custom Agent?',
  'Browse Marketplace Agents',
  'How does Ticketing work?'
];

export const RightAIChatbot: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge' | 'navigator'>('chat');
  const [knowledgeSearch, setKnowledgeSearch] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am **SNS Square Copilot**, your intelligent website & product assistant. Ask me anything about our cloud architectures, custom AI agents, FinOps in INR, or marketplace solutions.',
      timestamp: 'Just now',
      suggestions: ['What is SNS Square?', 'Show all Products', 'How to build Custom Agent?']
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate intelligent query processing against website knowledge base
    setTimeout(() => {
      const lowerQuery = text.toLowerCase();
      let matchedItem = KNOWLEDGE_BASE.find(item =>
        item.keywords.some(keyword => lowerQuery.includes(keyword))
      );

      let botResponseText = '';
      let botAction = undefined;
      let botSuggestions = ['Show all Products', 'Build Custom Agent', 'Explore Marketplace'];

      if (matchedItem) {
        botResponseText = matchedItem.response;
        botAction = matchedItem.action;
        botSuggestions = matchedItem.suggestions;
      } else {
        botResponseText = `I found insights regarding **"${text}"** in the SNS Square knowledge base. You can explore our pre-configured architecture solutions, autonomous agent builders, and FinOps analytics. Let me know if you would like me to guide you to a specific tool.`;
        botSuggestions = ['Show all Products', 'How does FinOps work?', 'Browse Marketplace'];
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: botSuggestions,
        actionLink: botAction
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: 'Chat history cleared. How can I assist you with SNS Square today?',
        timestamp: 'Just now',
        suggestions: ['What is SNS Square?', 'Show all Products', 'How to build Custom Agent?']
      }
    ]);
  };

  return (
    <>
      {/* 1. Floating Trigger Button (Bottom Right) - Small Circle UI */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/80"
          title="Ask SNS Square AI Copilot"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-white transition-transform group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-xs animate-pulse" />
          </div>

          {/* Hover Tooltip */}
          <div className="absolute right-full mr-3.5 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg border border-slate-700/60 hidden sm:flex items-center gap-1.5">
            <span>Ask AI Copilot</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-t border-slate-700/60" />
          </div>
        </button>
      )}

      {/* 2. Chatbot Flyout Panel / Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'w-[95vw] sm:w-[580px] h-[88vh] max-h-[750px]'
              : 'w-[95vw] sm:w-[420px] h-[82vh] max-h-[640px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 shrink-0 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/90 border border-blue-400/30 flex items-center justify-center text-white shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white">SNS Square AI Copilot</h3>
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Deep Knowledge of Products & Architecture</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title={isExpanded ? 'Minimize width' : 'Expand width'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar (Chat / FAQs / Website Navigator) */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between text-xs font-bold shrink-0">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
                <span>AI Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('knowledge')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'knowledge'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                <span>Knowledge</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('navigator')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'navigator'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 inline mr-1" />
                <span>Quick Jump</span>
              </button>
            </div>

            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
              v2.5 Enterprise
            </span>
          </div>

          {/* TAB 1: AI CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 bg-[#FAFCFF]">
              {/* Message History List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-start gap-2 max-w-[88%]">
                      {msg.sender === 'bot' && (
                        <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white font-medium rounded-br-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                        }`}
                      >
                        <div className="whitespace-pre-line font-normal">{msg.text}</div>

                        {/* Interactive Navigation Action Button inside message */}
                        {msg.actionLink && (
                          <div className="mt-3 pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                if (msg.actionLink) {
                                  setCurrentView(msg.actionLink.view);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-all cursor-pointer shadow-2xs"
                            >
                              <span>{msg.actionLink.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>

                    {/* Quick suggestion chips attached to bot messages */}
                    {msg.suggestions && msg.suggestions.length > 0 && msg.sender === 'bot' && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pl-9">
                        {msg.suggestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => handleSendMessage(sug)}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-[11px] font-medium transition-all text-left cursor-pointer shadow-2xs"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 pl-1">
                    <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-2xs flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-100" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-200" />
                      <span className="text-[11px] text-slate-400 ml-1">Analyzing website knowledge...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Pills */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-white/80 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Suggested Questions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_STARTERS.map((starter, qIdx) => (
                      <button
                        key={qIdx}
                        type="button"
                        onClick={() => handleSendMessage(starter)}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[11px] transition-colors cursor-pointer"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Ask about products, agents, FinOps, or pricing..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all cursor-pointer shrink-0 shadow-2xs"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: KNOWLEDGE BASE SEARCH */}
          {activeTab === 'knowledge' && (
            <div className="flex-1 flex flex-col p-4 bg-[#FAFCFF] overflow-y-auto space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={knowledgeSearch}
                  onChange={e => setKnowledgeSearch(e.target.value)}
                  placeholder="Search SNS Square knowledge base..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                {KNOWLEDGE_BASE.filter(item =>
                  knowledgeSearch
                    ? item.keywords.some(k => k.includes(knowledgeSearch.toLowerCase())) ||
                      item.response.toLowerCase().includes(knowledgeSearch.toLowerCase())
                    : true
                ).map((item, kIdx) => (
                  <div
                    key={kIdx}
                    className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-2 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 capitalize">
                        {item.keywords[0]} & Overview
                      </span>
                      {item.action && (
                        <button
                          type="button"
                          onClick={() => setCurrentView(item.action.view)}
                          className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{item.action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {item.response}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: QUICK WEBSITE NAVIGATOR */}
          {activeTab === 'navigator' && (
            <div className="flex-1 flex flex-col p-4 bg-[#FAFCFF] overflow-y-auto space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Instant Teleport Navigation:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Dashboard Home', view: 'home' as WorkspaceView, icon: <Bot className="w-4 h-4 text-blue-600" /> },
                  { name: 'Solution Builder', view: 'solution-builder-fullstack' as WorkspaceView, icon: <Layers className="w-4 h-4 text-indigo-600" /> },
                  { name: 'Custom Agent Builder', view: 'custom-agent' as WorkspaceView, icon: <Cpu className="w-4 h-4 text-purple-600" /> },
                  { name: 'Marketplace', view: 'marketplace' as WorkspaceView, icon: <Compass className="w-4 h-4 text-amber-600" /> },
                  { name: 'FinOps Intelligence', view: 'product-finops' as WorkspaceView, icon: <CreditCard className="w-4 h-4 text-emerald-600" /> },
                  { name: 'Compliance & Audit', view: 'product-compliance' as WorkspaceView, icon: <ShieldCheck className="w-4 h-4 text-rose-600" /> },
                  { name: 'Help & Support', view: 'support' as WorkspaceView, icon: <HelpCircle className="w-4 h-4 text-sky-600" /> },
                  { name: 'Usage & Billing (INR)', view: 'usage' as WorkspaceView, icon: <Clock className="w-4 h-4 text-slate-600" /> }
                ].map((item, nIdx) => (
                  <button
                    key={nIdx}
                    type="button"
                    onClick={() => setCurrentView(item.view)}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Note */}
          <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-center shrink-0">
            <span className="text-[10px] text-slate-400">
              Powered by SNS Square SuperAgent Reasoning Engine
            </span>
          </div>
        </div>
      )}
    </>
  );
};
