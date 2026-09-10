import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  Sparkles,
  Save,
  Coins,
  Play,
  Share2,
  Rocket,
  Home,
  Plus,
  RotateCcw,
  Clock,
  ZoomIn,
  ZoomOut,
  Maximize,
  Upload,
  Download,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Bot,
  Zap,
  GitBranch,
  Database,
  Cpu,
  Globe,
  Sliders,
  FileText,
  Key,
  MessageSquare,
  Lock,
  UserCheck,
  Code2,
  Trash2,
  Settings,
  CheckCircle2,
  AlertCircle,
  Layers,
  Activity,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Copy,
  Terminal,
  Shuffle
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface WorkflowNode {
  id: string;
  typeId: string;
  category: string;
  title: string;
  subtitle: string;
  iconName: string;
  x: number;
  y: number;
  status: 'idle' | 'running' | 'success' | 'error';
  executionTime?: string;
  config: {
    model?: string;
    temperature?: number;
    prompt?: string;
    triggerType?: string;
    endpoint?: string;
    channel?: string;
    code?: string;
    condition?: string;
    tools?: string[];
  };
}

export interface NodeConnection {
  id: string;
  fromId: string;
  toId: string;
  fromPort?: string;
  toPort?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  iconName: string;
  badge?: string;
}

export interface ToolCategory {
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  items: ToolItem[];
}

// ==========================================
// 14 TOOL CATEGORIES (Exact counts from UI)
// ==========================================

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    name: 'AI / LLM',
    count: 15,
    icon: <Bot className="w-4 h-4 text-purple-600" />,
    color: '#8B5CF6',
    items: [
      { id: 'llm-deepseek', name: 'DeepSeek-R1 (Reasoning)', category: 'AI / LLM', desc: 'State-of-the-art open reasoning model', iconName: 'Bot', badge: 'R1' },
      { id: 'llm-claude', name: 'Claude 3.5 Sonnet', category: 'AI / LLM', desc: 'Top tier coding & reasoning model', iconName: 'Bot', badge: 'Anthropic' },
      { id: 'llm-gpt4o', name: 'OpenAI GPT-4o', category: 'AI / LLM', desc: 'Omni multimodal fast inference', iconName: 'Bot', badge: 'OpenAI' },
      { id: 'llm-gemini', name: 'Gemini 1.5 Pro', category: 'AI / LLM', desc: '2M long context window', iconName: 'Bot', badge: 'Google' },
      { id: 'llm-mistral', name: 'Mistral Large 2', category: 'AI / LLM', desc: 'High throughput European multilingual', iconName: 'Bot' },
      { id: 'llm-llama', name: 'Llama 3.3 70B', category: 'AI / LLM', desc: 'Open-weight enterprise LLM', iconName: 'Bot' },
      { id: 'llm-embed', name: 'Text Embedding 3', category: 'AI / LLM', desc: 'High dimension vector embeddings', iconName: 'Cpu' },
      { id: 'llm-vision', name: 'Vision Document Analyzer', category: 'AI / LLM', desc: 'Extract data from images & PDFs', iconName: 'Cpu' },
      { id: 'llm-function', name: 'Function Calling Agent', category: 'AI / LLM', desc: 'Autonomous tool dispatcher', iconName: 'Zap' },
      { id: 'llm-whisper', name: 'Whisper Speech-to-Text', category: 'AI / LLM', desc: 'Audio transcription & translation', iconName: 'MessageSquare' },
      { id: 'llm-tts', name: 'Neural Voice TTS', category: 'AI / LLM', desc: 'Ultra-realistic voice synthesis', iconName: 'MessageSquare' },
      { id: 'llm-rerank', name: 'Cohere Reranker v3', category: 'AI / LLM', desc: 'Precision RAG document ranking', iconName: 'Database' },
      { id: 'llm-custom', name: 'Fine-tuned Private Model', category: 'AI / LLM', desc: 'Self-hosted vLLM / Ollama endpoint', iconName: 'Key' },
      { id: 'llm-spec', name: 'Fast Speculative Decoder', category: 'AI / LLM', desc: '2.5x low-latency token streaming', iconName: 'Zap' },
      { id: 'llm-mod', name: 'Llama Guard Safety', category: 'AI / LLM', desc: 'Toxicity and policy scanner', iconName: 'Lock' }
    ]
  },
  {
    name: 'Triggers',
    count: 3,
    icon: <Zap className="w-4 h-4 text-emerald-600" />,
    color: '#10B981',
    items: [
      { id: 'trig-webhook', name: 'Webhook Trigger', category: 'Triggers', desc: 'Execute on inbound HTTP POST', iconName: 'Globe', badge: 'HTTP' },
      { id: 'trig-schedule', name: 'Cron Schedule', category: 'Triggers', desc: 'Run periodically on time intervals', iconName: 'Clock' },
      { id: 'trig-manual', name: 'Manual / API Event', category: 'Triggers', desc: 'Trigger via SDK or UI click', iconName: 'Zap' }
    ]
  },
  {
    name: 'Logic & Flow Control',
    count: 8,
    icon: <GitBranch className="w-4 h-4 text-blue-600" />,
    color: '#3B82F6',
    items: [
      { id: 'logic-if', name: 'Condition (If / Else)', category: 'Logic & Flow Control', desc: 'Branch execution based on rules', iconName: 'GitBranch' },
      { id: 'logic-router', name: 'Multi-Branch Router', category: 'Logic & Flow Control', desc: 'Route to multiple paths dynamically', iconName: 'Shuffle' },
      { id: 'logic-loop', name: 'Loop Iterator', category: 'Logic & Flow Control', desc: 'Iterate over array elements', iconName: 'RotateCcw' },
      { id: 'logic-delay', name: 'Delay / Wait', category: 'Logic & Flow Control', desc: 'Pause execution for N seconds', iconName: 'Clock' },
      { id: 'logic-fork', name: 'Parallel Fork', category: 'Logic & Flow Control', desc: 'Run concurrent child branches', iconName: 'GitBranch' },
      { id: 'logic-join', name: 'Join Aggregator', category: 'Logic & Flow Control', desc: 'Wait for all parallel steps to finish', iconName: 'Layers' },
      { id: 'logic-error', name: 'Error Fallback Handler', category: 'Logic & Flow Control', desc: 'Catch exceptions and retry', iconName: 'AlertCircle' },
      { id: 'logic-switch', name: 'Switch Case Rule', category: 'Logic & Flow Control', desc: 'Match values against cases', iconName: 'GitBranch' }
    ]
  },
  {
    name: 'Data Processing',
    count: 13,
    icon: <Sliders className="w-4 h-4 text-cyan-600" />,
    color: '#06B6D4',
    items: [
      { id: 'dp-json', name: 'JSON Parser & Extractor', category: 'Data Processing', desc: 'Parse nested JSON schemas', iconName: 'Code2' },
      { id: 'dp-filter', name: 'Filter & Search', category: 'Data Processing', desc: 'Filter records matching predicates', iconName: 'Search' },
      { id: 'dp-mapper', name: 'Field Mapper', category: 'Data Processing', desc: 'Transform data keys and types', iconName: 'Sliders' },
      { id: 'dp-agg', name: 'Data Aggregator', category: 'Data Processing', desc: 'Sum, average, group datasets', iconName: 'Activity' },
      { id: 'dp-dedup', name: 'Deduplicator', category: 'Data Processing', desc: 'Remove duplicate array entries', iconName: 'Layers' },
      { id: 'dp-chunk', name: 'Document Chunker', category: 'Data Processing', desc: 'Split long text into tokens', iconName: 'FileText' },
      { id: 'dp-regex', name: 'Regex Pattern Matcher', category: 'Data Processing', desc: 'Extract emails, phones, URLs', iconName: 'Code2' },
      { id: 'dp-validate', name: 'Schema Validator (Zod)', category: 'Data Processing', desc: 'Validate payloads strictly', iconName: 'CheckCircle2' },
      { id: 'dp-flatten', name: 'Object Flattener', category: 'Data Processing', desc: 'Flatten deeply nested maps', iconName: 'Sliders' },
      { id: 'dp-string', name: 'String Template Replacer', category: 'Data Processing', desc: 'Inject variables into strings', iconName: 'FileText' },
      { id: 'dp-math', name: 'Math Operator Engine', category: 'Data Processing', desc: 'Perform financial & unit calculations', iconName: 'Cpu' },
      { id: 'dp-date', name: 'Date / Time Formatter', category: 'Data Processing', desc: 'Convert UTC timestamps to local formats', iconName: 'Clock' },
      { id: 'dp-table', name: 'Table / Markdown Builder', category: 'Data Processing', desc: 'Construct clean Markdown tables', iconName: 'FileText' }
    ]
  },
  {
    name: 'Core Utilities',
    count: 4,
    icon: <Cpu className="w-4 h-4 text-slate-600" />,
    color: '#64748B',
    items: [
      { id: 'core-log', name: 'Console Logger', category: 'Core Utilities', desc: 'Write trace outputs to execution log', iconName: 'Terminal' },
      { id: 'core-uuid', name: 'UUID Generator', category: 'Core Utilities', desc: 'Generate unique session v4 IDs', iconName: 'Key' },
      { id: 'core-vault', name: 'Secret Vault Credential', category: 'Core Utilities', desc: 'Inject encrypted enterprise keys', iconName: 'Lock' },
      { id: 'core-hash', name: 'HMAC / SHA256 Hasher', category: 'Core Utilities', desc: 'Hash and verify payload signatures', iconName: 'Lock' }
    ]
  },
  {
    name: 'Integrations',
    count: 28,
    icon: <Globe className="w-4 h-4 text-indigo-600" />,
    color: '#6366F1',
    items: [
      { id: 'int-slack', name: 'Slack Bot Notifier', category: 'Integrations', desc: 'Send rich blocks to Slack channels', iconName: 'MessageSquare', badge: 'Popular' },
      { id: 'int-github', name: 'GitHub PR & Repo Sync', category: 'Integrations', desc: 'Create PRs, issues, read commits', iconName: 'Code2', badge: 'Dev' },
      { id: 'int-postgres', name: 'PostgreSQL Database', category: 'Integrations', desc: 'Execute read/write SQL queries', iconName: 'Database' },
      { id: 'int-salesforce', name: 'Salesforce CRM Lead Sync', category: 'Integrations', desc: 'Update CRM accounts and pipeline', iconName: 'Globe' },
      { id: 'int-notion', name: 'Notion Knowledge Base', category: 'Integrations', desc: 'Search and append Notion docs', iconName: 'FileText' },
      { id: 'int-jira', name: 'Jira Issue Creator', category: 'Integrations', desc: 'Create and assign triage tickets', iconName: 'CheckCircle2' },
      { id: 'int-stripe', name: 'Stripe Billing & Invoices', category: 'Integrations', desc: 'Fetch subscription status & payments', iconName: 'Coins' },
      { id: 'int-redis', name: 'Redis Key-Value Cache', category: 'Integrations', desc: 'Sub-millisecond memory caching', iconName: 'Zap' },
      { id: 'int-s3', name: 'AWS S3 Object Store', category: 'Integrations', desc: 'Upload and fetch file assets', iconName: 'Database' },
      { id: 'int-sendgrid', name: 'SendGrid Transactional Email', category: 'Integrations', desc: 'Send templated transactional emails', iconName: 'MessageSquare' },
      { id: 'int-hubspot', name: 'HubSpot Contact Sync', category: 'Integrations', desc: 'Manage inbound customer marketing', iconName: 'Globe' },
      { id: 'int-sheets', name: 'Google Sheets Live Sync', category: 'Integrations', desc: 'Append rows to Google Spreadsheets', iconName: 'FileText' },
      { id: 'int-twilio', name: 'Twilio SMS & Voice', category: 'Integrations', desc: 'Dispatch SMS verification codes', iconName: 'MessageSquare' },
      { id: 'int-discord', name: 'Discord Webhook Dispatch', category: 'Integrations', desc: 'Notify Discord developer servers', iconName: 'MessageSquare' },
      { id: 'int-zendesk', name: 'Zendesk Customer Support', category: 'Integrations', desc: 'Escalate customer support tickets', iconName: 'UserCheck' },
      { id: 'int-linear', name: 'Linear Issue Tracking', category: 'Integrations', desc: 'Sync high-velocity engineering sprints', iconName: 'CheckCircle2' },
      { id: 'int-elastic', name: 'Elasticsearch Query', category: 'Integrations', desc: 'Full-text log & document search', iconName: 'Search' },
      { id: 'int-mongo', name: 'MongoDB Atlas NoSQL', category: 'Integrations', desc: 'Query and update BSON collections', iconName: 'Database' },
      { id: 'int-snowflake', name: 'Snowflake Data Warehouse', category: 'Integrations', desc: 'Run analytical aggregate queries', iconName: 'Database' },
      { id: 'int-confluence', name: 'Confluence Enterprise Wiki', category: 'Integrations', desc: 'Sync team runbooks and specs', iconName: 'FileText' },
      { id: 'int-teams', name: 'Microsoft Teams Webhook', category: 'Integrations', desc: 'Post alerts into Teams channels', iconName: 'MessageSquare' },
      { id: 'int-post', name: 'Webhook Outbound Post', category: 'Integrations', desc: 'Call external enterprise endpoints', iconName: 'Globe' },
      { id: 'int-supabase', name: 'Supabase Vector & Auth', category: 'Integrations', desc: 'pgvector query and edge functions', iconName: 'Database' },
      { id: 'int-airtable', name: 'Airtable Base Sync', category: 'Integrations', desc: 'Update collaborative databases', iconName: 'Sliders' },
      { id: 'int-asana', name: 'Asana Project Tasks', category: 'Integrations', desc: 'Create milestones and checklists', iconName: 'CheckCircle2' },
      { id: 'int-pagerduty', name: 'PagerDuty Incident Triage', category: 'Integrations', desc: 'Trigger on-call engineer paging', iconName: 'Activity' },
      { id: 'int-intercom', name: 'Intercom Live Chat Relay', category: 'Integrations', desc: 'Auto-reply to customer chat queues', iconName: 'MessageSquare' },
      { id: 'int-shopify', name: 'Shopify Store Orders', category: 'Integrations', desc: 'Lookup orders and tracking status', iconName: 'Coins' }
    ]
  },
  {
    name: 'API & HTTP',
    count: 4,
    icon: <Globe className="w-4 h-4 text-emerald-600" />,
    color: '#059669',
    items: [
      { id: 'api-rest', name: 'HTTP / REST Request', category: 'API & HTTP', desc: 'Send custom GET/POST/PUT calls', iconName: 'Globe', badge: 'REST' },
      { id: 'api-graphql', name: 'GraphQL Query Client', category: 'API & HTTP', desc: 'Execute queries with variables', iconName: 'Code2' },
      { id: 'api-resp', name: 'Webhook Response Node', category: 'API & HTTP', desc: 'Return custom HTTP status code', iconName: 'CheckCircle2' },
      { id: 'api-sse', name: 'SSE Event Streamer', category: 'API & HTTP', desc: 'Stream Server-Sent Events live', iconName: 'Activity' }
    ]
  },
  {
    name: 'Knowledge / Context',
    count: 1,
    icon: <Database className="w-4 h-4 text-amber-600" />,
    color: '#D97706',
    items: [
      { id: 'know-rag', name: 'RAG Enterprise Vector Store', category: 'Knowledge / Context', desc: 'Semantic search across enterprise knowledge base with hybrid sparse/dense embeddings', iconName: 'Database', badge: 'Hybrid RAG' }
    ]
  },
  {
    name: 'Memory & State',
    count: 4,
    icon: <Activity className="w-4 h-4 text-pink-600" />,
    color: '#EC4899',
    items: [
      { id: 'mem-buffer', name: 'Conversation Buffer Memory', category: 'Memory & State', desc: 'Retain recent dialogue turns', iconName: 'MessageSquare' },
      { id: 'mem-kv', name: 'Persistent Key-Value State', category: 'Memory & State', desc: 'Persist state across sessions', iconName: 'Database' },
      { id: 'mem-vector', name: 'Long-term Vector Memory', category: 'Memory & State', desc: 'Recall past episodic user facts', iconName: 'Brain' },
      { id: 'mem-summary', name: 'Adaptive Summary Memory', category: 'Memory & State', desc: 'Compress historical dialogue', iconName: 'FileText' }
    ]
  },
  {
    name: 'Input / Output',
    count: 7,
    icon: <MessageSquare className="w-4 h-4 text-teal-600" />,
    color: '#0D9488',
    items: [
      { id: 'io-chat', name: 'User Chat Input Handle', category: 'Input / Output', desc: 'Receive prompt from end user', iconName: 'MessageSquare' },
      { id: 'io-text', name: 'Markdown Text Output', category: 'Input / Output', desc: 'Render streamed markdown response', iconName: 'FileText' },
      { id: 'io-json', name: 'Structured JSON Output', category: 'Input / Output', desc: 'Return strictly formatted JSON', iconName: 'Code2' },
      { id: 'io-file', name: 'File Artifact Exporter', category: 'Input / Output', desc: 'Generate and serve downloadable files', iconName: 'Download' },
      { id: 'io-card', name: 'Interactive UI Card', category: 'Input / Output', desc: 'Render actionable UI widget', iconName: 'Layers' },
      { id: 'io-audio', name: 'Audio Stream Output', category: 'Input / Output', desc: 'Stream synthesized voice audio', iconName: 'Activity' },
      { id: 'io-email', name: 'Email Dispatch Response', category: 'Input / Output', desc: 'Format and send final email report', iconName: 'Globe' }
    ]
  },
  {
    name: 'Data Transformation',
    count: 1,
    icon: <Code2 className="w-4 h-4 text-violet-600" />,
    color: '#7C3AED',
    items: [
      { id: 'dt-code', name: 'Custom Code (Python / TypeScript)', category: 'Data Transformation', desc: 'Execute sandboxed Python or TS scripts with zero latency', iconName: 'Code2', badge: 'Sandbox' }
    ]
  },
  {
    name: 'File Upload Tool',
    count: 2,
    icon: <Upload className="w-4 h-4 text-orange-600" />,
    color: '#EA580C',
    items: [
      { id: 'file-pdf', name: 'PDF & Doc AI OCR Parser', category: 'File Upload Tool', desc: 'Extract clean markdown and tables from invoices & contracts', iconName: 'FileText' },
      { id: 'file-csv', name: 'CSV / Excel Sheet Ingest', category: 'File Upload Tool', desc: 'Read tabular rows and convert to structured records', iconName: 'Sliders' }
    ]
  },
  {
    name: 'Security',
    count: 3,
    icon: <Lock className="w-4 h-4 text-rose-600" />,
    color: '#E11D48',
    items: [
      { id: 'sec-guard', name: 'AI Guardrail & Jailbreak Filter', category: 'Security', desc: 'Block prompt injections, PII, and unsafe content', iconName: 'Lock', badge: 'Zero Trust' },
      { id: 'sec-pii', name: 'PII Redactor & Anonymizer', category: 'Security', desc: 'Mask SSN, credit cards, emails before LLM inference', iconName: 'ShieldCheck' },
      { id: 'sec-rate', name: 'API Rate Limiter & Quota Gate', category: 'Security', desc: 'Enforce per-user token and RPM limits', iconName: 'Activity' }
    ]
  },
  {
    name: 'Human Review',
    count: 1,
    icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
    color: '#059669',
    items: [
      { id: 'hr-gate', name: 'Human-in-the-Loop Approval Gate', category: 'Human Review', desc: 'Halt workflow and request manual manager authorization via Slack/Email before critical actions', iconName: 'UserCheck', badge: 'HITL' }
    ]
  }
];

// Helper to render icon by name
const renderIcon = (name: string, className: string = 'w-4 h-4') => {
  switch (name) {
    case 'Bot': return <Bot className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'GitBranch': return <GitBranch className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Sliders': return <Sliders className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Key': return <Key className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'CheckCircle2': return <CheckCircle2 className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Download': return <Download className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    default: return <Layers className={className} />;
  }
};

// ==========================================
// INITIAL STARTER WORKFLOW (Matching Images)
// ==========================================

const INITIAL_NODES: WorkflowNode[] = [
  {
    id: 'node-trigger-1',
    typeId: 'trig-webhook',
    category: 'Triggers',
    title: 'Customer Inbound Query',
    subtitle: 'Webhook Trigger (POST /api/v1/agent)',
    iconName: 'Globe',
    x: 80,
    y: 180,
    status: 'idle',
    config: { triggerType: 'HTTP POST Webhook', endpoint: 'https://api.snssquare.com/v1/triage' }
  },
  {
    id: 'node-llm-1',
    typeId: 'llm-deepseek',
    category: 'AI / LLM',
    title: 'agent.workflow.ts',
    subtitle: 'DeepSeek-R1 (Autonomous Reasoning)',
    iconName: 'Bot',
    x: 420,
    y: 130,
    status: 'idle',
    config: {
      model: 'DeepSeek-R1 (Reasoning)',
      temperature: 0.2,
      prompt: 'const agent = {\n  model: "DeepSeek-R1",\n  tools: ["CRM", "Slack", "RAG"],\n  reasoning: true\n};',
      tools: ['CRM', 'Slack', 'RAG']
    }
  },
  {
    id: 'node-rag-1',
    typeId: 'know-rag',
    category: 'Knowledge / Context',
    title: 'Enterprise RAG Index',
    subtitle: 'Hybrid Vector & BM25 Search',
    iconName: 'Database',
    x: 420,
    y: 420,
    status: 'idle',
    config: { endpoint: 'Pinecone-v2 / Hybrid Index (10M Docs)' }
  },
  {
    id: 'node-logic-1',
    typeId: 'logic-if',
    category: 'Logic & Flow Control',
    title: 'Confidence & Urgency Router',
    subtitle: 'Evaluate SLA & VIP Tier',
    iconName: 'GitBranch',
    x: 780,
    y: 150,
    status: 'idle',
    config: { condition: 'if (ticket.priority === "P0" || confidence < 0.85)' }
  },
  {
    id: 'node-action-1',
    typeId: 'int-slack',
    category: 'Integrations',
    title: 'Slack Triage & Dispatch',
    subtitle: 'Post to #enterprise-ops',
    iconName: 'MessageSquare',
    x: 1100,
    y: 100,
    status: 'idle',
    config: { channel: '#enterprise-ops-alerts' }
  },
  {
    id: 'node-output-1',
    typeId: 'io-chat',
    category: 'Input / Output',
    title: 'Automated Resolution',
    subtitle: 'Dispatch Structured Response',
    iconName: 'FileText',
    x: 1100,
    y: 290,
    status: 'idle',
    config: { prompt: 'Return customer answer with inline citations' }
  }
];

const INITIAL_CONNECTIONS: NodeConnection[] = [
  { id: 'conn-1', fromId: 'node-trigger-1', toId: 'node-llm-1' },
  { id: 'conn-2', fromId: 'node-rag-1', toId: 'node-llm-1' },
  { id: 'conn-3', fromId: 'node-llm-1', toId: 'node-logic-1' },
  { id: 'conn-4', fromId: 'node-logic-1', toId: 'node-action-1' },
  { id: 'conn-5', fromId: 'node-logic-1', toId: 'node-output-1' }
];

export const AgentBuilderCanvas: React.FC = () => {
  const { setCurrentView } = useNavigation();

  // Canvas State
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<NodeConnection[]>(INITIAL_CONNECTIONS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState('Agent Builder');
  const [workflowVersion, setWorkflowVersion] = useState('v1');
  const [statusTag, setStatusTag] = useState('DRAFT');
  const [lastSaved, setLastSaved] = useState('Saved 12:38:55 PM');
  const [credits, setCredits] = useState(10150);

  // Tools Panel State
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'AI / LLM': true,
    'Triggers': true,
    'Integrations': true
  });

  // Canvas Zoom & Pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Dragging Node on Canvas
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Creating Connection
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null);

  // Execution Simulation State
  const [isRunning, setIsRunning] = useState(false);
  const [runLogs, setRunLogs] = useState<Array<{ time: string; text: string; type: 'info' | 'success' | 'warn' }>>([]);
  const [showLogsDrawer, setShowLogsDrawer] = useState(false);

  // AI Generator Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Publish / Deploy Modals
  const [isDeploySuccess, setIsDeploySuccess] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Toggle Category Accordion
  const toggleCategory = (catName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  // Node Selection
  const handleSelectNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
  };

  // Canvas Pan Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setSelectedNodeId(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    } else if (draggingNodeId) {
      const newX = (e.clientX - dragOffset.x - pan.x) / zoom;
      const newY = (e.clientY - dragOffset.y - pan.y) / zoom;
      
      setNodes(prev =>
        prev.map(n =>
          n.id === draggingNodeId
            ? { ...n, x: Math.max(20, Math.round(newX / 10) * 10), y: Math.max(20, Math.round(newY / 10) * 10) }
            : n
        )
      );
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  // Node Drag Start
  const handleNodeMouseDown = (node: WorkflowNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(node.id);
    setDraggingNodeId(node.id);
    setDragOffset({
      x: e.clientX - (node.x * zoom + pan.x),
      y: e.clientY - (node.y * zoom + pan.y)
    });
  };

  // Drag & Drop from Right Sidebar
  const handleToolDragStart = (e: React.DragEvent, tool: ToolItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(tool));
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;

    try {
      const tool: ToolItem = JSON.parse(data);
      const rect = canvasRef.current?.getBoundingClientRect();
      const dropX = rect ? (e.clientX - rect.left - pan.x) / zoom : 200;
      const dropY = rect ? (e.clientY - rect.top - pan.y) / zoom : 200;

      const newNode: WorkflowNode = {
        id: `node-${Date.now()}`,
        typeId: tool.id,
        category: tool.category,
        title: tool.name,
        subtitle: tool.desc,
        iconName: tool.iconName,
        x: Math.round(dropX / 10) * 10,
        y: Math.round(dropY / 10) * 10,
        status: 'idle',
        config: {
          prompt: tool.category === 'AI / LLM' ? 'You are a specialized agent node...' : undefined,
          model: tool.category === 'AI / LLM' ? tool.name : undefined
        }
      };

      setNodes(prev => [...prev, newNode]);
      setSelectedNodeId(newNode.id);
      setLastSaved(`Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Port Connection Logic
  const handlePortClick = (nodeId: string, isOutput: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutput) {
      setConnectingFromId(nodeId);
    } else if (connectingFromId && connectingFromId !== nodeId) {
      // Connect
      const newConn: NodeConnection = {
        id: `conn-${Date.now()}`,
        fromId: connectingFromId,
        toId: nodeId
      };
      setConnections(prev => [...prev, newConn]);
      setConnectingFromId(null);
      setLastSaved(`Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
    }
  };

  // Delete Node
  const handleDeleteNode = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.fromId !== nodeId && c.toId !== nodeId));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
  };

  // Delete Connection
  const handleDeleteConnection = (connId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connId));
  };

  // Run Workflow Simulation
  const handleRunWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowLogsDrawer(true);
    setRunLogs([]);

    const addLog = (text: string, type: 'info' | 'success' | 'warn' = 'info') => {
      const time = new Date().toLocaleTimeString();
      setRunLogs(prev => [...prev, { time, text, type }]);
    };

    addLog('🚀 Initiating agent pipeline execution graph...', 'info');

    // Reset all nodes
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' as const })));

    // Sequential DAG execution simulation
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      setNodes(prev => prev.map(n => (n.id === node.id ? { ...n, status: 'running' as const } : n)));
      addLog(`▶️ [Executing Node ${i + 1}/${nodes.length}]: "${node.title}" (${node.category})...`, 'info');

      await new Promise(r => setTimeout(r, 600 + Math.random() * 500));

      const latency = `${Math.floor(40 + Math.random() * 180)}ms`;
      setNodes(prev =>
        prev.map(n =>
          n.id === node.id ? { ...n, status: 'success' as const, executionTime: latency } : n
        )
      );
      addLog(`✅ Node "${node.title}" executed successfully in ${latency}`, 'success');
    }

    addLog('🎉 Workflow pipeline execution completed with zero errors. Output dispatched.', 'success');
    setIsRunning(false);
    setCredits(prev => Math.max(0, prev - 15));
  };

  // AI Prompt Auto-generate Workflow
  const handleGenerateWorkflow = async () => {
    if (!aiPrompt.trim() || isAiGenerating) return;
    setIsAiGenerating(true);

    await new Promise(r => setTimeout(r, 1400));

    const generatedNodes: WorkflowNode[] = [
      {
        id: `node-${Date.now()}-1`,
        typeId: 'trig-webhook',
        category: 'Triggers',
        title: 'Lead Inbound Webhook',
        subtitle: 'Listen for new CRM signups',
        iconName: 'Globe',
        x: 100,
        y: 200,
        status: 'idle',
        config: {}
      },
      {
        id: `node-${Date.now()}-2`,
        typeId: 'llm-claude',
        category: 'AI / LLM',
        title: 'Lead Qualification AI',
        subtitle: 'Claude 3.5 Sonnet Synthesis',
        iconName: 'Bot',
        x: 440,
        y: 150,
        status: 'idle',
        config: { model: 'Claude 3.5 Sonnet', prompt: `Analyze lead profile: ${aiPrompt}` }
      },
      {
        id: `node-${Date.now()}-3`,
        typeId: 'int-salesforce',
        category: 'Integrations',
        title: 'Salesforce CRM Updater',
        subtitle: 'Enrich contact & score',
        iconName: 'Globe',
        x: 800,
        y: 120,
        status: 'idle',
        config: {}
      },
      {
        id: `node-${Date.now()}-4`,
        typeId: 'int-slack',
        category: 'Integrations',
        title: 'Slack High-Value Alert',
        subtitle: 'Alert #sales-deals',
        iconName: 'MessageSquare',
        x: 800,
        y: 300,
        status: 'idle',
        config: {}
      }
    ];

    const generatedConns: NodeConnection[] = [
      { id: `c-${Date.now()}-1`, fromId: generatedNodes[0].id, toId: generatedNodes[1].id },
      { id: `c-${Date.now()}-2`, fromId: generatedNodes[1].id, toId: generatedNodes[2].id },
      { id: `c-${Date.now()}-3`, fromId: generatedNodes[1].id, toId: generatedNodes[3].id }
    ];

    setNodes(generatedNodes);
    setConnections(generatedConns);
    setIsAiGenerating(false);
    setIsAiModalOpen(false);
    setWorkflowName('AI Generated Lead Workflow');
    setLastSaved(`Saved ${new Date().toLocaleTimeString()}`);
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ workflowName, nodes, connections }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${workflowName.toLowerCase().replace(/\s+/g, '-')}-v1.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Calculate SVG Curve for Connections
  const calculateCurve = (fromNode: WorkflowNode, toNode: WorkflowNode) => {
    const nodeWidth = 260;
    const nodeHeight = 90;
    
    // Output handle on right edge of fromNode
    const x1 = fromNode.x + nodeWidth;
    const y1 = fromNode.y + nodeHeight / 2;

    // Input handle on left edge of toNode
    const x2 = toNode.x;
    const y2 = toNode.y + nodeHeight / 2;

    const dx = Math.abs(x2 - x1) * 0.5;
    const path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

    return { path, x1, y1, x2, y2 };
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Filter tools by search
  const filteredCategories = TOOL_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0 || !searchQuery.trim());

  return (
    <div className="flex flex-col h-full min-h-[680px] w-full bg-[#FAFAFC] overflow-hidden select-none font-sans text-slate-800">
      
      {/* ========================================================================= */}
      {/* TOP HEADER BAR (Exact layout from Image 2) */}
      {/* ========================================================================= */}
      <header className="h-14 bg-white border-b border-slate-200/90 px-4 flex items-center justify-between z-30 shrink-0 shadow-2xs">
        
        {/* Left: Home Icon, Divider, Title, Version, Status, Timestamp */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('agents')}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Back to Agent Overview"
          >
            <Home className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200" />

          {/* Workflow Title */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 tracking-tight">{workflowName}</span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {workflowVersion}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 tracking-wider font-mono">
              {statusTag}
            </span>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline-block ml-1 font-mono">
            {lastSaved}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* AI Generate Button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50/60 text-xs font-semibold text-purple-700 shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>AI Generate</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => {
              setLastSaved(`Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
              setStatusTag('SAVED');
              setTimeout(() => setStatusTag('DRAFT'), 2500);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save</span>
          </button>

          {/* Credits Counter Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>{credits.toLocaleString()} Credits</span>
          </div>

          {/* Run Workflow Button */}
          <button
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
              isRunning ? 'bg-indigo-600 animate-pulse' : 'bg-[#1E293B] hover:bg-black'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-white'}`} />
            <span>{isRunning ? 'Running...' : 'Run Workflow'}</span>
          </button>

          {/* Publish to Marketplace Button */}
          <button
            onClick={() => alert('🎉 Workflow packaged for Enterprise Agent Marketplace catalog.')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Publish to Marketplace</span>
          </button>

          {/* Deploy Button */}
          <button
            onClick={() => {
              setIsDeploySuccess(true);
              setTimeout(() => setIsDeploySuccess(false), 4000);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-sky-400" />
            <span>Deploy</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE: CANVAS + FLOATING TOOLBAR + RIGHT TOOLS SIDEBAR */}
      {/* ========================================================================= */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* LEFT FLOATING VERTICAL ACTION TOOLBAR (Pill matching Image 2) */}
        <aside className="absolute left-5 top-6 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-1.5 shadow-lg shadow-slate-200/50 flex flex-col items-center gap-1">
          <button
            onClick={() => setIsToolsOpen(true)}
            title="Add Node / Tools"
            className="p-2 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          
          <button
            onClick={() => {
              setNodes(INITIAL_NODES);
              setConnections(INITIAL_CONNECTIONS);
              setPan({ x: 0, y: 0 });
              setZoom(1);
            }}
            title="Reset to Default Layout"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowLogsDrawer(prev => !prev)}
            title="Toggle Execution Logs"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              showLogsDrawer ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
          </button>

          <div className="w-5 h-px bg-slate-200 my-0.5" />

          <button
            onClick={() => setZoom(z => Math.min(1.8, z + 0.15))}
            title="Zoom In"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.15))}
            title="Zoom Out"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            title="Fit to Screen"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Maximize className="w-4 h-4" />
          </button>

          <div className="w-5 h-px bg-slate-200 my-0.5" />

          <button
            onClick={() => alert('Upload / Import Workflow JSON')}
            title="Import Blueprint"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportJSON}
            title="Export JSON"
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </aside>

        {/* ========================================================================= */}
        {/* CENTER INTERACTIVE SVG CANVAS (Dotted Grid with Drag & Drop) */}
        {/* ========================================================================= */}
        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
          className="flex-1 h-full relative cursor-grab active:cursor-grabbing overflow-hidden bg-[#FAFAFC]"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`,
            backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        >
          {/* Zoom & Pan Container */}
          <div
            className="absolute inset-0 origin-top-left pointer-events-none"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
            }}
          >
            {/* SVG Connection Cables */}
            <svg className="w-[4000px] h-[4000px] absolute inset-0 pointer-events-auto">
              <defs>
                <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="activeWireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>

              {connections.map(conn => {
                const fromNode = nodes.find(n => n.id === conn.fromId);
                const toNode = nodes.find(n => n.id === conn.toId);
                if (!fromNode || !toNode) return null;

                const { path, x1, y1, x2, y2 } = calculateCurve(fromNode, toNode);
                const isConnectionActive = isRunning && (fromNode.status === 'running' || fromNode.status === 'success');

                return (
                  <g key={conn.id} className="group">
                    {/* Outer invisible path for easy clicking to delete */}
                    <path
                      d={path}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="18"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConnection(conn.id);
                      }}
                    />

                    {/* Visible Bezier Wire */}
                    <path
                      d={path}
                      fill="none"
                      stroke={isConnectionActive ? 'url(#activeWireGradient)' : '#94A3B8'}
                      strokeWidth={isConnectionActive ? 3.5 : 2.2}
                      strokeDasharray={isConnectionActive ? '6 4' : undefined}
                      className={`transition-all duration-300 ${
                        isConnectionActive ? 'animate-[dash_1s_linear_infinite]' : ''
                      }`}
                    />

                    {/* Animated glowing particle pulses when running */}
                    {isConnectionActive && (
                      <circle r="4" fill="#38BDF8">
                        <animateMotion dur="1.8s" repeatCount="indefinite" path={path} />
                      </circle>
                    )}

                    {/* Start and End Dots */}
                    <circle cx={x1} cy={y1} r="3" fill="#3B82F6" />
                    <circle cx={x2} cy={y2} r="3" fill="#8B5CF6" />
                  </g>
                );
              })}
            </svg>

            {/* LIVE DRAGGABLE NODES */}
            {nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isConnecting = connectingFromId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleNodeMouseDown(node, e)}
                  onClick={(e) => handleSelectNode(node.id, e)}
                  style={{
                    transform: `translate(${node.x}px, ${node.y}px)`,
                    width: '270px'
                  }}
                  className={`absolute pointer-events-auto rounded-2xl bg-white border transition-shadow cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md select-none ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-400/20 shadow-lg'
                      : node.status === 'running'
                      ? 'border-indigo-500 ring-2 ring-indigo-400/30'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Left Input Port Handle */}
                  <div
                    onClick={(e) => handlePortClick(node.id, false, e)}
                    title="Connect input here"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center cursor-pointer transition-all z-10"
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-blue-500" />
                  </div>

                  {/* Right Output Port Handle */}
                  <div
                    onClick={(e) => handlePortClick(node.id, true, e)}
                    title="Drag or click to connect to next step"
                    className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center cursor-pointer transition-all z-10 ${
                      isConnecting ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-200 animate-pulse' : 'border-slate-300 hover:border-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400 hover:bg-purple-600" />
                  </div>

                  {/* Node Header */}
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        {renderIcon(node.iconName, 'w-4 h-4 text-slate-700')}
                      </div>
                      <div className="max-w-[140px]">
                        <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">{node.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono block truncate">{node.category}</span>
                      </div>
                    </div>

                    {/* Status / Actions */}
                    <div className="flex items-center gap-1">
                      {node.status === 'running' && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping mr-1" />
                      )}
                      {node.status === 'success' && (
                        <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {node.executionTime || 'OK'}
                        </span>
                      )}
                      <button
                        onClick={(e) => handleDeleteNode(node.id, e)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                        title="Delete node"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Node Body / Preview Snippet */}
                  <div className="p-3 bg-slate-50/60 rounded-b-2xl text-[11px] space-y-2">
                    <p className="text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {node.subtitle}
                    </p>

                    {/* Node Config Badges */}
                    {node.config.model && (
                      <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500 border-t border-slate-200/60">
                        <span className="font-semibold text-purple-700">{node.config.model}</span>
                        <span>temp: {node.config.temperature ?? 0.2}</span>
                      </div>
                    )}

                    {node.config.channel && (
                      <div className="text-[10px] font-mono text-indigo-700 pt-1 border-t border-slate-200/60">
                        channel: {node.config.channel}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM RIGHT: INTERACTIVE MINIMAP & VERSION BADGE (Matching Image 2) */}
          {/* ========================================================================= */}
          <div className="absolute right-6 bottom-6 z-20 flex flex-col items-end gap-2">
            {/* Minimap Box */}
            <div className="w-48 h-28 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <span>Overview</span>
                <span>{nodes.length} Nodes</span>
              </div>
              <div className="flex-1 relative bg-slate-50 rounded-lg overflow-hidden border border-slate-100 my-1">
                {nodes.map(n => (
                  <div
                    key={n.id}
                    style={{
                      left: `${Math.min(90, Math.max(5, (n.x / 1400) * 100))}%`,
                      top: `${Math.min(80, Math.max(10, (n.y / 600) * 100))}%`
                    }}
                    className={`absolute w-3 h-2 rounded-xs ${
                      selectedNodeId === n.id ? 'bg-blue-600 ring-1 ring-blue-400' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-[9px] text-slate-400 text-right font-mono">
                {Math.round(zoom * 100)}% zoom
              </div>
            </div>

            {/* Version Footer Tag */}
            <span className="text-[11px] font-mono text-slate-400 font-medium">
              AgentBuilder v0.2.0
            </span>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM EXECUTION LOGS DRAWER */}
          {/* ========================================================================= */}
          {showLogsDrawer && (
            <div className="absolute left-0 right-0 bottom-0 max-h-56 bg-[#0B1120] border-t border-slate-800 text-slate-200 z-20 shadow-2xl flex flex-col animate-slide-up">
              <div className="px-4 py-2 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Execution Console Logs</span>
                </div>
                <button
                  onClick={() => setShowLogsDrawer(false)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3 font-mono text-xs overflow-y-auto space-y-1.5 max-h-44">
                {runLogs.length === 0 ? (
                  <span className="text-slate-500">No active execution logs. Click 'Run Workflow' to test pipeline.</span>
                ) : (
                  runLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-500 text-[10px] shrink-0">{log.time}</span>
                      <span
                        className={
                          log.type === 'success'
                            ? 'text-emerald-400'
                            : log.type === 'warn'
                            ? 'text-amber-400'
                            : 'text-slate-200'
                        }
                      >
                        {log.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDEBAR: WORKFLOW TOOLS (Exact accordion tree from Image 2) */}
        {/* ========================================================================= */}
        {isToolsOpen ? (
          <aside className="w-80 bg-white border-l border-slate-200/90 flex flex-col z-20 shrink-0 shadow-sm animate-fade-in">
            
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Workflow Tools</h3>
                <p className="text-xs text-slate-500">Drag to build your agent.</p>
              </div>
              <button
                onClick={() => setIsToolsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Collapse Tools"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Tools Input */}
            <div className="p-3 border-b border-slate-100 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* 14 Accordion Tool Categories List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100/80">
              {filteredCategories.map(cat => {
                const isOpen = openCategories[cat.name] ?? false;

                return (
                  <div key={cat.name} className="py-1">
                    {/* Category Header Row */}
                    <button
                      onClick={() => toggleCategory(cat.name)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {cat.icon}
                        <span className="font-bold text-slate-900">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-100">
                          {cat.count}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Category Items List (Draggable) */}
                    {isOpen && (
                      <div className="px-3 pb-2 space-y-1.5 animate-fade-in">
                        {cat.items.map(item => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleToolDragStart(e, item)}
                            onClick={() => {
                              // Click to add at center
                              const newNode: WorkflowNode = {
                                id: `node-${Date.now()}`,
                                typeId: item.id,
                                category: item.category,
                                title: item.name,
                                subtitle: item.desc,
                                iconName: item.iconName,
                                x: 300 + Math.random() * 80,
                                y: 200 + Math.random() * 80,
                                status: 'idle',
                                config: {}
                              };
                              setNodes(prev => [...prev, newNode]);
                              setSelectedNodeId(newNode.id);
                            }}
                            className="p-2.5 rounded-xl border border-slate-200/70 bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-grab active:cursor-grabbing group flex items-start justify-between gap-2"
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                {renderIcon(item.iconName, 'w-3.5 h-3.5')}
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                                  {item.name}
                                </h5>
                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            {item.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </aside>
        ) : (
          <button
            onClick={() => setIsToolsOpen(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-r-0 border-slate-300 px-2 py-4 rounded-l-xl shadow-md text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 z-20 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="[writing-mode:vertical-lr] tracking-wider uppercase text-[10px]">Tools</span>
          </button>
        )}

      </div>

      {/* ========================================================================= */}
      {/* AI GENERATE WORKFLOW MODAL */}
      {/* ========================================================================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Agent Workflow Generator</h3>
                  <p className="text-xs text-slate-500">Describe what your agent should do in plain English.</p>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Build an autonomous IT support agent that checks Jira for open tickets, fetches company docs via RAG, crafts resolution with DeepSeek-R1, and notifies on Slack."
              rows={4}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateWorkflow}
                disabled={!aiPrompt.trim() || isAiGenerating}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAiGenerating ? 'Synthesizing Workflow...' : 'Generate Graph'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deploy Success Toast */}
      {isDeploySuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <span className="font-bold block">Agent Deployed to Production!</span>
            <span className="text-slate-400">Endpoint: https://api.snssquare.com/v1/agents/{workflowName.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
        </div>
      )}

    </div>
  );
};
