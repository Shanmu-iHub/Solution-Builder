import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  Sparkles,
  Plus,
  ChevronDown,
  Mic,
  Volume2,
  Folder,
  Upload,
  Link2,
  User,
  Search,
  X,
  Check,
  ArrowRight,
  ChevronRight,
  Globe,
  Mail,
  Calendar,
  HardDrive,
  Users,
  MessageSquare,
  Bot,
  Layers,
  Code2,
  Layout,
  Presentation,
  FileSpreadsheet,
  Headphones,
  FileText,
  Boxes,
  Zap,
  CheckCircle2,
  Sliders,
  Send,
  Database,
  GitBranch,
  RefreshCw,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Star,
  Copy,
  ThumbsUp,
  ThumbsDown,
  CornerDownLeft,
  Share2
} from 'lucide-react';

interface ConnectorItem {
  id: string;
  name: string;
  category: 'all' | 'communication' | 'productivity' | 'crm' | 'developer' | 'data' | 'project' | 'other';
  icon: React.ReactNode;
  description: string;
  actionsCount?: number;
  actionsList?: string[];
  connected: boolean;
}

interface QueryTemplate {
  id: string;
  title: string;
  category: 'all' | 'apps-email' | 'files-brain' | 'data-sheets' | 'dev-ops' | 'crm-support' | 'research' | 'content-deck';
  categoryLabel: string;
  badgeColor: string;
  icon: React.ReactNode;
  description: string;
  query: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const QUERY_TEMPLATES: QueryTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Inbox Triage & Smart Reply Drafting',
    category: 'apps-email',
    categoryLabel: 'Email & Calendar',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/60',
    icon: <Mail className="w-4 h-4 text-rose-600" />,
    description: 'Scan unread Gmail threads, cross-reference pricing files in Drive, draft replies, and set Calendar reminders.',
    query: 'Scan my unread emails in Gmail from the past 48 hours. Identify high-priority client inquiries, cross-reference them with our pricing guide in Google Drive, draft personalized replies for my review, and create follow-up reminders in Google Calendar.'
  },
  {
    id: 'tpl-2',
    title: 'Executive Daily Brief & Meeting Prep',
    category: 'apps-email',
    categoryLabel: 'Email & Calendar',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
    icon: <Calendar className="w-4 h-4 text-blue-600" />,
    description: 'Audit tomorrow\'s Google Calendar, pull email context & SecondBrain notes for attendees, and generate a brief packet.',
    query: 'Review all meetings scheduled on my Google Calendar for tomorrow. For each meeting, retrieve the attendees\' previous correspondence from Gmail and relevant project notes from SecondBrain, then generate a bulleted briefing packet with actionable talking points.'
  },
  {
    id: 'tpl-3',
    title: 'SecondBrain Spec & Knowledge Synthesis',
    category: 'files-brain',
    categoryLabel: 'Files & SecondBrain',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
    icon: <HardDrive className="w-4 h-4 text-amber-600" />,
    description: 'Search Google Drive and SecondBrain for roadmap specs, extract milestones, and compile an executive summary doc.',
    query: 'Search my Google Drive and SecondBrain for all documents referencing \'Q3 Enterprise Architecture\'. Extract milestone dates, technical dependencies, and risk factors, then compile a unified executive summary and save it to Google Docs.'
  },
  {
    id: 'tpl-4',
    title: 'Financial Pipeline Analysis & Slack Broadcast',
    category: 'data-sheets',
    categoryLabel: 'Data & Spreadsheets',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />,
    description: 'Parse monthly revenue rows in Google Sheets, calculate MoM conversion metrics, and broadcast updates to Slack.',
    query: 'Open the \'2026 Revenue Pipeline\' spreadsheet in Google Drive. Calculate Month-over-Month MRR growth, churn rates, and sales pipeline conversion, generate trend summaries, and broadcast an executive update to our Slack #leadership channel.'
  },
  {
    id: 'tpl-5',
    title: 'GitHub PR Review & Release Changelog',
    category: 'dev-ops',
    categoryLabel: 'GitHub & Code Ops',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    icon: <GitBranch className="w-4 h-4 text-indigo-600" />,
    description: 'Inspect open PRs on GitHub, check code coverage & breaking changes, post comments, and generate release notes.',
    query: 'Inspect all open pull requests in our GitHub repository tagged \'needs-review\'. Analyze diffs for breaking changes, verify unit test coverage, post inline review comments, and generate formatted markdown release notes for the upcoming release.'
  },
  {
    id: 'tpl-6',
    title: 'Zendesk Ticket Triage & CRM Sync',
    category: 'crm-support',
    categoryLabel: 'CRM & Support',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
    icon: <Users className="w-4 h-4 text-cyan-600" />,
    description: 'Extract urgent Zendesk tickets, query customer account records in HubSpot CRM, draft Gmail replies, and file Jira bugs.',
    query: 'Query Zendesk for all open priority-1 support tickets. Fetch account subscription details from HubSpot CRM, draft empathetic resolution emails in Gmail, and automatically create tracked bug tickets in Jira for the engineering team.'
  },
  {
    id: 'tpl-7',
    title: 'Autonomous Competitor & Market Research',
    category: 'research',
    categoryLabel: 'Deep Research',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
    icon: <Search className="w-4 h-4 text-purple-600" />,
    description: 'Conduct deep web research, benchmark pricing & connectors against top competitors, and export a structured matrix.',
    query: 'Conduct deep autonomous web research on top 5 competitors in enterprise AI agent automation. Analyze their pricing tiers, core connectors, enterprise security certifications, and API capabilities. Output a structured comparison matrix and export to Google Drive.'
  },
  {
    id: 'tpl-8',
    title: 'Drive Spec to 10-Slide Keynote Deck',
    category: 'content-deck',
    categoryLabel: 'Content & Slides',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200/60',
    icon: <Presentation className="w-4 h-4 text-orange-600" />,
    description: 'Transform architecture docs from Google Drive into a polished 10-slide keynote deck with visual diagrams.',
    query: 'Read the technical architecture document from Google Drive. Break it down into a compelling 10-slide executive pitch deck with slide titles, structured talking points, visual layout suggestions, and export to Google Slides.'
  },
  {
    id: 'tpl-9',
    title: 'Vendor Contract Audit & SLA Compliance',
    category: 'files-brain',
    categoryLabel: 'Files & SecondBrain',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300/80',
    icon: <FileText className="w-4 h-4 text-slate-700" />,
    description: 'Scan PDF contracts in Google Drive / SecondBrain, extract renewal dates, and export SLA breach milestones to CSV.',
    query: 'Scan all vendor PDF contracts uploaded in Google Drive and SecondBrain. Extract contract expiration dates, SLA breach penalties, and upcoming payment milestones into a consolidated CSV summary.'
  }
];

export const SolutionBuilderSuperAgent: React.FC = () => {
  const { setCurrentView } = useNavigation();

  // Prompt and Input States
  const [promptInput, setPromptInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isTemplateAppliedToast, setIsTemplateAppliedToast] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Chat Messages State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isExecuting]);

  const isChatActive = chatMessages.length > 0;

  // Query Templates Category Filter
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('all');

  const filteredQueryTemplates = useMemo(() => {
    if (selectedTemplateCategory === 'all') return QUERY_TEMPLATES;
    return QUERY_TEMPLATES.filter(t => t.category === selectedTemplateCategory);
  }, [selectedTemplateCategory]);

  const handleSelectTemplate = (query: string) => {
    setPromptInput(query);
    setIsTemplateAppliedToast(true);
    setTimeout(() => setIsTemplateAppliedToast(false), 2500);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Connectors Modal States
  const [isConnectorsModalOpen, setIsConnectorsModalOpen] = useState(false);
  const [connectorCategory, setConnectorCategory] = useState<string>('all');
  const [connectorSearch, setConnectorSearch] = useState('');
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);

  // Connectors Data
  const [connectors, setConnectors] = useState<ConnectorItem[]>([
    {
      id: 'google-suite',
      name: 'Google Suite',
      category: 'productivity',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-600">
          G
        </div>
      ),
      description: 'Access your Google Hub Suite, including Gmail, Calendar, Drive, and more.',
      connected: true
    },
    {
      id: 'gmail',
      name: 'Gmail',
      category: 'communication',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
          <Mail className="w-4 h-4" />
        </div>
      ),
      description: 'Access your Gmail inbox, read and send emails, and search through your messages.',
      actionsCount: 7,
      actionsList: ['Read emails & threads', 'Draft and send emails', 'Search message archives', 'Apply labels & stars', 'Manage contacts sync', 'Download attachments', 'Trigger webhook filters'],
      connected: true
    },
    {
      id: 'calendar',
      name: 'Calendar',
      category: 'productivity',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
          <Calendar className="w-4 h-4" />
        </div>
      ),
      description: 'Manage your Google Calendar events, set up appointments, and check your schedule.',
      actionsCount: 2,
      actionsList: ['Create and reschedule events', 'Check availability and conflicts'],
      connected: true
    },
    {
      id: 'drive',
      name: 'Drive',
      category: 'productivity',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <HardDrive className="w-4 h-4" />
        </div>
      ),
      description: 'Access files stored in your Google Drive, upload documents, and share content. Also unlocks Google Docs, Sheets, and Slides — no separate connection needed.',
      actionsCount: 3,
      actionsList: ['Search files & folders', 'Download & parse documents', 'Create shared links'],
      connected: true
    },
    {
      id: 'google-contacts',
      name: 'Google Contacts',
      category: 'communication',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
          <Users className="w-4 h-4" />
        </div>
      ),
      description: 'Access and manage your Google Contacts. Search, view, create, and update contacts from your address book.',
      connected: false
    },
    {
      id: 'google-chat',
      name: 'Google Chat',
      category: 'communication',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <MessageSquare className="w-4 h-4" />
        </div>
      ),
      description: "Read spaces and direct messages, and reply in Google Chat. Note: messages sent through this connector show the SNS Square app's name next to your name.",
      connected: false
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'developer',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
          <GitBranch className="w-4 h-4" />
        </div>
      ),
      description: 'Interact with GitHub repositories, pull requests, issues, CI actions, and automated code review pipelines.',
      actionsCount: 6,
      actionsList: ['Clone and inspect repos', 'Create branches and PRs', 'Read and reply to issues', 'Trigger GitHub Actions', 'Check test outputs', 'Merge pull requests'],
      connected: false
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      category: 'developer',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
          <GitBranch className="w-4 h-4" />
        </div>
      ),
      description: 'Manage GitLab merge requests, CI/CD runner pipelines, and issue trackers across self-hosted and cloud instances.',
      actionsCount: 4,
      actionsList: ['Inspect merge requests', 'Trigger CI pipelines', 'Manage repository issues', 'Read commit history'],
      connected: false
    },
    {
      id: 'vercel',
      name: 'Vercel & Cloudflare',
      category: 'developer',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
          ▲
        </div>
      ),
      description: 'Trigger autonomous edge deployments, inspect serverless logs, and preview pull request build states.',
      actionsCount: 3,
      actionsList: ['Trigger deployment builds', 'Inspect runtime error logs', 'Manage environment secrets'],
      connected: false
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'communication',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
          <MessageSquare className="w-4 h-4" />
        </div>
      ),
      description: 'Broadcast channel notifications, read thread context, and send direct alerts to teammates.',
      actionsCount: 4,
      actionsList: ['Post messages to channels', 'Read conversation history', 'React with emojis', 'Dispatch agent slash commands'],
      connected: false
    },
    {
      id: 'notion',
      name: 'Notion',
      category: 'productivity',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800">
          N
        </div>
      ),
      description: 'Sync engineering docs, product requirements, database rows, and roadmap task boards.',
      actionsCount: 5,
      actionsList: ['Query database blocks', 'Create and update pages', 'Append structured blocks', 'Search workspace pages', 'Export Markdown'],
      connected: false
    },
    {
      id: 'postgres',
      name: 'PostgreSQL / Supabase',
      category: 'data',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
          <Database className="w-4 h-4" />
        </div>
      ),
      description: 'Direct read/write access to enterprise PostgreSQL instances, vector embeddings, and schema introspection.',
      actionsCount: 4,
      actionsList: ['Execute SQL queries', 'Introspect database schema', 'Run pgvector similarity searches', 'Stream live table change events'],
      connected: false
    },
    {
      id: 'snowflake',
      name: 'Snowflake & BigQuery',
      category: 'data',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
          <Database className="w-4 h-4" />
        </div>
      ),
      description: 'Query enterprise data warehouses, extract analytical reports, and run high-volume SQL transformations.',
      actionsCount: 3,
      actionsList: ['Execute analytical SQL queries', 'Extract table schemas', 'Stream query results to spreadsheets'],
      connected: false
    },
    {
      id: 'linear',
      name: 'Linear',
      category: 'project',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
          <Layers className="w-4 h-4" />
        </div>
      ),
      description: 'High-speed issue tracking and sprint management for agile software engineering teams.',
      actionsCount: 3,
      actionsList: ['Create issues with labels', 'Update sprint status', 'Assign engineering tasks'],
      connected: false
    },
    {
      id: 'jira',
      name: 'Jira Software',
      category: 'project',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
          <Layers className="w-4 h-4" />
        </div>
      ),
      description: 'Orchestrate enterprise sprint epics, automate bug filings from customer issues, and sync roadmap milestones.',
      actionsCount: 4,
      actionsList: ['Create bug tickets', 'Update sprint boards', 'Link commits to issues', 'Transition issue workflow states'],
      connected: false
    },
    {
      id: 'salesforce',
      name: 'Salesforce CRM',
      category: 'crm',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
          <Users className="w-4 h-4" />
        </div>
      ),
      description: 'Sync customer accounts, track sales pipeline deals, and fetch enterprise account summaries.',
      connected: false
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'crm',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
          <Users className="w-4 h-4" />
        </div>
      ),
      description: 'Lookup contact properties, track inbound deal stages, and automate customer lifecycle workflows.',
      actionsCount: 4,
      actionsList: ['Fetch contact properties', 'Create new leads', 'Log email interactions', 'Update deal stages'],
      connected: false
    },
    {
      id: 'zendesk',
      name: 'Zendesk Support',
      category: 'crm',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <MessageSquare className="w-4 h-4" />
        </div>
      ),
      description: 'Pull customer support tickets, parse incident threads, and draft verified resolution notes.',
      actionsCount: 3,
      actionsList: ['Fetch open tickets', 'Post internal comments', 'Update ticket priority & status'],
      connected: false
    },
    {
      id: 'figma',
      name: 'Figma & Design Tokens',
      category: 'other',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
          <Layout className="w-4 h-4" />
        </div>
      ),
      description: 'Inspect UI design frames, extract component styles, and sync color and typography tokens.',
      actionsCount: 3,
      actionsList: ['Inspect frame nodes', 'Extract design tokens', 'Export vector SVG assets'],
      connected: false
    }
  ]);

  const toggleConnect = (id: string) => {
    setConnectors(prev =>
      prev.map(c => (c.id === id ? { ...c, connected: !c.connected } : c))
    );
  };

  const connectedCount = useMemo(() => connectors.filter(c => c.connected).length, [connectors]);

  // Filter Connectors
  const filteredConnectors = useMemo(() => {
    return connectors.filter(c => {
      const matchesCat =
        connectorCategory === 'all'
          ? true
          : connectorCategory === 'connected'
          ? c.connected
          : c.category === connectorCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(connectorSearch.toLowerCase()) ||
        c.description.toLowerCase().includes(connectorSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [connectors, connectorCategory, connectorSearch]);

  // AI Response generator based on user query context
  const generateAIResponse = (userQuery: string): string => {
    const query = userQuery.toLowerCase();
    if (query.includes('email') || query.includes('gmail') || query.includes('inbox')) {
      return `I've analyzed your Gmail inbox and found the following:\n\n📧 **12 unread emails** detected across 3 priority levels:\n\n**🔴 High Priority (3)**\n• Client proposal from Acme Corp — needs response by EOD\n• Security alert from AWS — action required\n• Invoice approval from Finance team\n\n**🟡 Medium Priority (5)**\n• Team standup notes from Engineering\n• Design review feedback from Sarah\n• Marketing campaign draft for Q4\n• HR policy update notification\n• Vendor contract renewal reminder\n\n**🟢 Low Priority (4)**\n• Newsletter subscriptions & updates\n• Automated notifications\n\n✅ I've drafted replies for the 3 high-priority items. Would you like me to send them or make edits first?`;
    }
    if (query.includes('meeting') || query.includes('calendar') || query.includes('schedule')) {
      return `I've reviewed your calendar and prepared your meeting brief:\n\n📅 **Tomorrow's Schedule — 4 meetings**\n\n**9:00 AM — Sprint Planning** (45 min)\n• Attendees: Dev Team (8 people)\n• Context: Sprint 24 backlog has 23 tickets, 5 carry-overs\n• Prep: I've compiled velocity charts and blocker summaries\n\n**11:30 AM — Client Demo** (60 min)\n• Attendees: Acme Corp stakeholders\n• Context: Product walkthrough of v2.0 features\n• Prep: Demo environment is ready, talking points generated\n\n**2:00 PM — 1:1 with Engineering Lead** (30 min)\n• Topics: Architecture review, hiring pipeline\n• Prep: I've pulled relevant Jira metrics\n\n**4:00 PM — All Hands** (30 min)\n• Company-wide update, no prep needed\n\n📋 Briefing packet has been generated. Want me to email it to you?`;
    }
    if (query.includes('research') || query.includes('competitor') || query.includes('market')) {
      return `I've completed a deep research analysis:\n\n🔍 **Competitive Intelligence Report**\n\n**Market Overview**\n• Total addressable market: $47.2B (2025)\n• Growth rate: 23.4% CAGR\n• Key segments: Enterprise AI, Workflow Automation, Agent Platforms\n\n**Top Competitors Analyzed**\n1. **Competitor A** — Market share: 18%, Strengths: Enterprise penetration\n2. **Competitor B** — Market share: 12%, Strengths: Developer ecosystem\n3. **Competitor C** — Market share: 8%, Strengths: Vertical specialization\n\n**Key Insights**\n• Gap identified in multi-agent orchestration space\n• Rising demand for autonomous workflow tools (+340% YoY search volume)\n• Enterprise buyers prioritize security & compliance certifications\n\n📊 Full report with charts has been saved to your SecondBrain. Want me to create an executive summary slide deck?`;
    }
    if (query.includes('code') || query.includes('github') || query.includes('pr') || query.includes('review')) {
      return `I've reviewed the latest pull requests:\n\n🔀 **GitHub PR Analysis — 6 open PRs**\n\n**Ready to Merge (2)**\n✅ #482 — "Add rate limiting middleware" by @sarah\n   • 3 approvals, all checks passing, no conflicts\n✅ #479 — "Fix pagination bug in dashboard" by @mike\n   • 2 approvals, tests passing\n\n**Needs Review (3)**\n🟡 #485 — "Implement WebSocket notifications" by @alex\n   • 847 lines changed, 1 pending review\n🟡 #483 — "Database migration for v2.0" by @priya\n   • Critical path — blocking 4 other PRs\n🟡 #481 — "Update CI/CD pipeline config" by @dev-ops\n   • Infrastructure change, needs DevOps lead approval\n\n**Has Issues (1)**\n🔴 #480 — "Refactor auth module" by @james\n   • 2 failing tests, merge conflicts detected\n\nShall I auto-merge the approved PRs and assign reviewers to pending ones?`;
    }
    // Default response
    return `I've processed your request and here's what I found:\n\n🤖 **Super Agent Execution Complete**\n\n**Task**: ${userQuery}\n\n**Steps Completed:**\n1. ✅ **Analysis** — Parsed your request and identified 3 sub-tasks\n2. ✅ **Data Collection** — Retrieved relevant context from connected apps (${connectedCount} active connectors)\n3. ✅ **Processing** — Applied AI reasoning across multiple data sources\n4. ✅ **Synthesis** — Generated actionable results\n\n**Connected Tools Used:**\n• Google Suite — Document retrieval\n• Gmail & Calendar — Inbox & schedule context\n• Slack / Workspace — Team channels\n\n**Results Summary:**\nI've compiled the findings and prepared deliverables based on your request. All artifacts are ready for your review.\n\n💡 Would you like me to refine any part of the results or take additional actions?`;
  };

  const handleExecutePrompt = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToExecute = (customQuery || promptInput).trim();
    if (!queryToExecute || isExecuting) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: queryToExecute,
      timestamp: new Date()
    };

    const typingMessage: ChatMessage = {
      id: `msg-${Date.now()}-typing`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setChatMessages(prev => [...prev, userMessage, typingMessage]);
    setPromptInput('');
    setIsExecuting(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(queryToExecute);
      setChatMessages(prev =>
        prev.map(msg =>
          msg.isTyping
            ? { ...msg, content: aiResponse, isTyping: false, timestamp: new Date() }
            : msg
        )
      );
      setIsExecuting(false);
    }, 1400);
  };

  const handleNewChat = () => {
    setChatMessages([]);
    setPromptInput('');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`select-none max-w-6xl mx-auto px-4 sm:px-6 ${isChatActive ? 'min-h-[88vh] flex flex-col' : 'min-h-[85vh] pb-20 space-y-10'}`}>
      
      {/* 1. Top Breadcrumb & Status */}
      <nav className="flex items-center justify-between text-xs text-slate-500 font-medium py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="cursor-pointer hover:text-slate-900 transition-colors font-medium text-slate-500"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Agent Studio</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Super Agent</span>
        </div>

        <div className="flex items-center gap-2.5">
          {isChatActive && (
            <button
              onClick={handleNewChat}
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>New Conversation</span>
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Engine v6.0
          </span>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* A. DEFAULT MODE: HERO + PROMPT BOX + QUERY TEMPLATES                      */}
      {/* ========================================================================= */}
      {!isChatActive ? (
        <>
          {/* 2. Hero Header */}
          <section className="text-center space-y-3 pt-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
              <span>Multi-Modal Autonomous Orchestrator</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Super Agent
            </h1>

            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Orchestrate multi-step actions across your connected tools, databases, and autonomous swarms with natural language.
            </p>
          </section>

          {/* 3. PROMPT INPUT BOX (Image 1 Design with Clean White Theme) */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-4 transition-all hover:border-slate-300 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
              
              {/* Text Input Area */}
              <div className="min-h-[100px] flex flex-col justify-between">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleExecutePrompt();
                    }
                  }}
                  placeholder="Ask Super Agent anything... (e.g. Scan unread Gmail emails, draft replies, and summarize calendar)"
                  rows={3}
                  className="w-full resize-none bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base leading-relaxed focus:outline-none custom-scrollbar"
                />
              </div>

              {/* Bottom Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                
                {/* Left Controls: Connectors Pill + Attachments + Voice */}
                <div className="flex items-center gap-2">
                  
                  {/* Connectors Button with Refined Compact Circle Count Badge */}
                  <button
                    type="button"
                    onClick={() => setIsConnectorsModalOpen(true)}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all text-xs font-semibold cursor-pointer shadow-2xs"
                  >
                    <Link2 className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-45 transition-transform" />
                    <span>Connectors</span>
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                      {connectedCount}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                  </button>

                  <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

                  {/* Mic / Voice Input Button */}
                  <button
                    type="button"
                    onClick={() => setIsMicActive(!isMicActive)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isMicActive
                        ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    title={isMicActive ? 'Listening...' : 'Voice Input'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Read Aloud / Speaker Button */}
                  <button
                    type="button"
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    title={isSpeaking ? 'Mute' : 'Audio Output'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Controls: Run / Submit Button */}
                <button
                  type="button"
                  onClick={() => handleExecutePrompt()}
                  disabled={!promptInput.trim() || isExecuting}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                    promptInput.trim() && !isExecuting
                      ? 'bg-[#0F172A] hover:bg-blue-600 text-white hover:shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Run Super Agent</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>

            </div>
          </section>

          {/* 4. "QUERY TEMPLATES" SECTION */}
          <section className="max-w-5xl mx-auto space-y-6 pt-2">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Query Templates</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select any pre-engineered prompt template to automatically fill the Super Agent input box.
                </p>
              </div>

              {/* Template Count Pill */}
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60 w-fit">
                {filteredQueryTemplates.length} Templates Available
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
              {[
                { id: 'all', label: 'All Workflows' },
                { id: 'apps-email', label: 'Email & Calendar' },
                { id: 'files-brain', label: 'Files & SecondBrain' },
                { id: 'data-sheets', label: 'Data & Spreadsheets' },
                { id: 'dev-ops', label: 'GitHub & Code Ops' },
                { id: 'crm-support', label: 'CRM & Support' },
                { id: 'research', label: 'Deep Research' },
                { id: 'content-deck', label: 'Content & Presentations' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedTemplateCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedTemplateCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Query Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQueryTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.query)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group space-y-4 relative"
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                          {template.icon}
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${template.badgeColor}`}>
                          {template.categoryLabel}
                        </span>
                      </div>

                      <span className="text-[11px] font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Use</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {template.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      {template.description}
                    </p>
                  </div>

                  {/* Sample Query Code Block Preview */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 text-[11px] font-mono text-slate-600 line-clamp-2 leading-relaxed group-hover:bg-blue-50/40 group-hover:border-blue-200/60 transition-colors">
                    "{template.query}"
                  </div>
                </div>
              ))}
            </div>

          </section>
        </>
      ) : (
        /* ========================================================================= */
        /* B. CHATBOT CONVERSATION MODE (Contextual chat bubbles + Sticky Input)     */
        /* ========================================================================= */
        <section className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-4 pb-36">
          
          {/* Chat Messages List */}
          <div className="space-y-6 flex-1">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Assistant Avatar */}
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                {/* Message Bubble Content */}
                <div className={`space-y-1 max-w-[85%] sm:max-w-[78%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {message.role === 'user' ? (
                    <div className="bg-[#0F172A] text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  ) : message.isTyping ? (
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs font-medium text-slate-500">Super Agent is analyzing connected context...</span>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-5 sm:p-6 shadow-xs text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3">
                      
                      {/* Formatted Content */}
                      <div className="whitespace-pre-wrap font-sans space-y-2">
                        {message.content}
                      </div>

                      {/* Action Bar on AI response */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-400 text-xs">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(message.content, message.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === message.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === message.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Good response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Poor response"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Timestamp */}
                  <div className={`text-[10px] text-slate-400 px-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>

                </div>

                {/* User Avatar */}
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs shrink-0 mt-1 text-xs font-bold">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Sticky Bottom Prompt Input Bar */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-30">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-2.5 sm:p-3 space-y-2">
              
              <form
                onSubmit={(e) => handleExecutePrompt(e)}
                className="flex items-center gap-2"
              >
                {/* Connectors Pill Button */}
                <button
                  type="button"
                  onClick={() => setIsConnectorsModalOpen(true)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all text-xs font-semibold cursor-pointer"
                  title="Manage Connectors"
                >
                  <Link2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Connectors</span>
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {connectedCount}
                  </span>
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ask a follow-up or command Super Agent..."
                  disabled={isExecuting}
                  className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!promptInput.trim() || isExecuting}
                  className={`p-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                    promptInput.trim() && !isExecuting
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Prompt Suggestions Row */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-1 text-[11px] text-slate-600">
                <span className="text-slate-400 text-[10px] font-semibold shrink-0 uppercase tracking-wider">Suggestions:</span>
                {[
                  'Draft reply to client',
                  'Summarize in SecondBrain',
                  'Send update to Slack',
                  'Check GitHub PR status'
                ].map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleExecutePrompt(undefined, sug)}
                    disabled={isExecuting}
                    className="whitespace-nowrap px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200/70 text-slate-600 font-medium transition-colors cursor-pointer text-[11px]"
                  >
                    {sug}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. CONNECTORS MODAL (Image 2 Design with Our Theme)                      */}
      {/* ========================================================================= */}
      {isConnectorsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] max-h-[700px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
          >
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Connectors</h3>
                  <p className="text-[11px] text-slate-500">Integrate third-party services directly into SNS Square Super Agent.</p>
                </div>
              </div>

              <button
                onClick={() => setIsConnectorsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Left Sidebar + Right Grid */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Category Sidebar */}
              <div className="w-52 sm:w-60 border-r border-slate-100 p-3 space-y-1 overflow-y-auto bg-slate-50/30 text-xs custom-scrollbar">
                
                <button
                  onClick={() => setConnectorCategory('all')}
                  className={`w-full px-3 py-2 rounded-xl text-left font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    connectorCategory === 'all'
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4" />
                    <span>All</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">{connectors.length}</span>
                </button>

                <button
                  onClick={() => setConnectorCategory('connected')}
                  className={`w-full px-3 py-2 rounded-xl text-left font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    connectorCategory === 'connected'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Connected</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">{connectedCount}</span>
                </button>

                <div className="my-2 border-t border-slate-200/60" />

                {[
                  { id: 'communication', label: 'Communication' },
                  { id: 'productivity', label: 'Productivity & Files' },
                  { id: 'crm', label: 'CRM & Sales' },
                  { id: 'developer', label: 'Developer' },
                  { id: 'data', label: 'Data Sources' },
                  { id: 'project', label: 'Project & Ops' },
                  { id: 'other', label: 'Other' }
                ].map((cat) => {
                  const catCount = connectors.filter(c => c.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setConnectorCategory(cat.id)}
                      className={`w-full px-3 py-2 rounded-xl text-left font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        connectorCategory === cat.id
                          ? 'bg-blue-50 text-blue-600 font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{catCount}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-4">
                
                {/* Search & Header Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 capitalize">
                      {connectorCategory === 'all' ? 'All Connectors' : connectorCategory}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      ({filteredConnectors.length} connectors)
                    </span>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-52 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={connectorSearch}
                      onChange={(e) => setConnectorSearch(e.target.value)}
                      placeholder="Search app..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400"
                    />
                  </div>
                </div>

                {/* Connector Cards Grid */}
                <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 content-start items-start auto-rows-max custom-scrollbar pr-1">
                  {filteredConnectors.map((connector) => (
                    <div
                      key={connector.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 h-fit ${
                        connector.connected
                          ? 'bg-blue-50/20 border-blue-200/90 shadow-2xs'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      {/* Top Row: Icon + Name + Connect Button */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {connector.icon}
                          <div>
                            <h4 className="font-bold text-xs text-slate-900">{connector.name}</h4>
                            {connector.connected && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                                <CheckCircle2 className="w-3 h-3" /> Connected
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleConnect(connector.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                            connector.connected
                              ? 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 border border-slate-200'
                              : 'bg-slate-900 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {connector.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {connector.description}
                      </p>

                      {/* Expandable Actions Dropdown */}
                      {connector.actionsCount && (
                        <div className="pt-2 border-t border-slate-100/80">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedActionId(expandedActionId === connector.id ? null : connector.id)
                            }
                            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                          >
                            <span>{connector.actionsCount} actions</span>
                            <ChevronDown
                              className={`w-3 h-3 transition-transform ${
                                expandedActionId === connector.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {expandedActionId === connector.id && connector.actionsList && (
                            <ul className="mt-2 space-y-1 pl-2 border-l-2 border-slate-200 text-[10px] text-slate-600 animate-in fade-in duration-100">
                              {connector.actionsList.map((act, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="p-3.5 px-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs">
              <span className="text-slate-500">
                Connected apps will be automatically available to the Super Agent during execution.
              </span>
              <button
                onClick={() => setIsConnectorsModalOpen(false)}
                className="px-4 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* NOTIFICATION TOAST: TEMPLATE APPLIED */}
      {isTemplateAppliedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Query Template Auto-Filled</div>
            <div className="text-[11px] text-slate-400">Prompt loaded into Super Agent input box.</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SolutionBuilderSuperAgent;
