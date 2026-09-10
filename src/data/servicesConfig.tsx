import React from 'react';
import {
  MessageSquare,
  Image as ImageIcon,
  Video,
  Music,
  Mic,
  Cpu,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  Cloud,
  Layers,
  BarChart2,
  Headphones,
  Sliders,
  Store,
  Compass,
  SlidersHorizontal,
  Bot,
  Terminal,
  Activity,
  DollarSign,
  ShieldCheck,
  Code,
  Monitor
} from 'lucide-react';
import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';

export const servicesOfferingsConfigs: Record<string, OfferingLandingConfig> = {
  'ai-chat': {
    id: 'ai-chat',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Chat',
    badgeIcon: <MessageSquare className="w-3.5 h-3.5 text-blue-600" />,
    heroIcon: <MessageSquare className="w-6 h-6" />,
    heroIconBg: 'bg-blue-50/90',
    heroIconColor: 'text-blue-700',
    heroIconBorder: 'border-blue-100/80',
    headline1: 'Enterprise conversational AI.',
    headline2: 'Multi-turn reasoning & RAG.',
    subtitle: 'Deploy intelligent, enterprise-secure conversational assistants powered by leading foundation models with semantic document retrieval and tool execution.',
    openButtonText: 'Open AI Chat',
    heroIllustration: {
      cardTitle: 'Conversational Inference Stream',
      cardSub: 'Semantic RAG Assistant',
      cardBadge: '99.4% Accuracy',
      annotationText: 'Multi-turn Memory\nZero Latency',
      checklist: ['Enterprise RAG Embeddings', 'Multi-Modal Reasoning', 'Zero Data Leakage'],
      bars: [
        { height: '40%', bg: 'bg-blue-300' },
        { height: '60%', bg: 'bg-blue-400' },
        { height: '80%', bg: 'bg-blue-500' },
        { height: '95%', bg: 'bg-blue-600' },
        { height: '70%', bg: 'bg-blue-400' },
        { height: '98%', bg: 'bg-[#2563EB]' }
      ]
    },
    metrics: [
      { label: 'Token Generation Speed', value: '110 tps', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Ground-Truth RAG Accuracy', value: '99.4%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Context Window Depth', value: '2 Million', icon: <Layers className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Model Fallback Uptime', value: '100%', icon: <Cloud className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'State-of-the-art conversational AI tailored for enterprise workflows',
    capabilities: [
      {
        id: 'rag-engine',
        number: '01',
        title: 'Hybrid Semantic RAG Engine',
        icon: <Database className="w-4 h-4" />,
        tagline: 'Connect private documents, PDFs, databases, and Notion wikis with vector semantic search and re-ranking.',
        features: ['Hybrid vector & lexical search', 'Cross-encoder neural re-ranking', 'Document citation attribution', 'Real-time sync with Google Drive & Confluence'],
        preview: {
          title: 'RAG Retrieval Pipeline',
          bars: [{ label: 'Embed', val1: 95, val2: 90 }, { label: 'Search', val1: 98, val2: 95 }, { label: 'ReRank', val1: 99, val2: 96 }, { label: 'Inject', val1: 100, val2: 98 }, { label: 'Cite', val1: 100, val2: 100 }],
          providers: [{ name: 'Retrieval Precision', amount: '99.4%', color: 'bg-emerald-500' }, { name: 'Search Latency', amount: '22ms', color: 'bg-blue-600' }, { name: 'Indexed Docs', amount: '1.2M Pages', color: 'bg-indigo-600' }, { name: 'Citation Accuracy', amount: '100%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'agentic-tools',
        number: '02',
        title: 'Function Calling & Agent Tools',
        icon: <Bot className="w-4 h-4" />,
        tagline: 'Enable chat assistants to execute SQL queries, query internal APIs, and trigger automations.',
        features: ['Structured JSON output schemas', 'Multi-step action chaining', 'Human-in-the-loop approval gates', 'Automated error recovery'],
        preview: {
          title: 'Tool Execution Suite',
          bars: [{ label: 'SQL', val1: 96, val2: 92 }, { label: 'CRM', val1: 98, val2: 95 }, { label: 'Mail', val1: 100, val2: 98 }, { label: 'API', val1: 95, val2: 90 }, { label: 'Auth', val1: 100, val2: 100 }],
          providers: [{ name: 'Tool Call Accuracy', amount: '99.8%', color: 'bg-blue-600' }, { name: 'Connected Endpoints', amount: '48 APIs', color: 'bg-emerald-500' }, { name: 'Approval Gates', amount: 'Enforced', color: 'bg-purple-600' }, { name: 'Execution Latency', amount: '< 120ms', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'model-router',
        number: '03',
        title: 'Intelligent Model Routing',
        icon: <Compass className="w-4 h-4" />,
        tagline: 'Dynamically route queries between Claude 3.5, GPT-4o, Gemini 1.5, and open-source models for lowest cost.',
        features: ['Complexity-based model routing', 'Automated model failover', 'Semantic prompt caching', 'Cost reduction up to 68%'],
        preview: {
          title: 'Router Optimization',
          bars: [{ label: 'Fast', val1: 90, val2: 85 }, { label: 'Smart', val1: 95, val2: 90 }, { label: 'Vision', val1: 92, val2: 88 }, { label: 'Code', val1: 98, val2: 94 }, { label: 'Cache', val1: 100, val2: 98 }],
          providers: [{ name: 'Cost Reduction', amount: '-64.2%', color: 'bg-emerald-500' }, { name: 'Active Routing', amount: '4 Models', color: 'bg-blue-600' }, { name: 'Cache Hit Rate', amount: '38.4%', color: 'bg-indigo-600' }, { name: 'Failover SLA', amount: 'Zero Drop', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'enterprise-security',
        number: '04',
        title: 'Enterprise Privacy & Guardrails',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Zero data retention with model providers, automated PII masking, and strict content guardrails.',
        features: ['Automated PII token redaction', 'No training on customer data', 'Role-based knowledge access', 'Toxicity & prompt injection filter'],
        preview: {
          title: 'Security Guardrails',
          bars: [{ label: 'PII', val1: 100, val2: 100 }, { label: 'Jailbreak', val1: 100, val2: 99 }, { label: 'Leak', val1: 100, val2: 100 }, { label: 'RBAC', val1: 100, val2: 100 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'PII Scrubbing', amount: '100% Redacted', color: 'bg-emerald-500' }, { name: 'Prompt Shield', amount: 'Active', color: 'bg-blue-600' }, { name: 'Model Zero-Retention', amount: 'Certified', color: 'bg-purple-600' }, { name: 'Enterprise RBAC', amount: 'Enforced', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'multimodal-vision',
        number: '05',
        title: 'Multi-Modal Document & Vision',
        icon: <ImageIcon className="w-4 h-4" />,
        tagline: 'Upload PDFs, architectural diagrams, spreadsheets, and screenshots for instant analysis.',
        features: ['High-resolution OCR extraction', 'Chart & table data interpretation', 'Multi-image visual comparison', 'Diagram-to-code generation'],
        preview: {
          title: 'Multi-Modal Reasoning',
          bars: [{ label: 'PDF', val1: 98, val2: 95 }, { label: 'OCR', val1: 99, val2: 96 }, { label: 'Chart', val1: 96, val2: 92 }, { label: 'Code', val1: 98, val2: 94 }, { label: 'Image', val1: 100, val2: 98 }],
          providers: [{ name: 'OCR Precision', amount: '99.6%', color: 'bg-emerald-500' }, { name: 'Table Extraction', amount: 'Native JSON', color: 'bg-blue-600' }, { name: 'Supported Formats', amount: '24+ Formats', color: 'bg-indigo-600' }, { name: 'Parse Speed', amount: '< 450ms', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'voice-streaming',
        number: '06',
        title: 'Real-Time Voice Conversations',
        icon: <Mic className="w-4 h-4" />,
        tagline: 'Ultra-low latency full-duplex audio conversations with human-like interruptions.',
        features: ['Sub-300ms speech-to-speech latency', 'Natural interruption handling', 'Emotional inflection & tone matching', 'Multi-lingual voice translation'],
        preview: {
          title: 'Voice Audio Stream',
          bars: [{ label: 'STT', val1: 92, val2: 88 }, { label: 'LLM', val1: 95, val2: 90 }, { label: 'TTS', val1: 98, val2: 94 }, { label: 'Stream', val1: 100, val2: 98 }, { label: 'Duplex', val1: 99, val2: 96 }],
          providers: [{ name: 'End-to-End Latency', amount: '280ms', color: 'bg-emerald-500' }, { name: 'Natural Interruption', amount: 'Enabled', color: 'bg-blue-600' }, { name: 'Voice Fidelity', amount: 'Studio HD', color: 'bg-indigo-600' }, { name: 'Languages', amount: '52 Supported', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'custom-personas',
        number: '07',
        title: 'Custom Personas & Prompts',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Create domain-expert assistants for customer support, sales, code reviews, and financial underwriting.',
        features: ['System prompt version control', 'Few-shot example injection', 'Tone and style fine-tuning', 'Shareable team assistant workspace'],
        preview: {
          title: 'Assistant Personas',
          bars: [{ label: 'Support', val1: 95, val2: 90 }, { label: 'Sales', val1: 98, val2: 95 }, { label: 'Code', val1: 99, val2: 96 }, { label: 'Finance', val1: 96, val2: 92 }, { label: 'Legal', val1: 98, val2: 95 }],
          providers: [{ name: 'Deployed Personas', amount: '18 Live', color: 'bg-blue-600' }, { name: 'CSAT Rating', amount: '4.9 / 5.0', color: 'bg-emerald-500' }, { name: 'Resolution Rate', amount: '84.2%', color: 'bg-indigo-600' }, { name: 'Team Adoption', amount: '100%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'analytics-telemetry',
        number: '08',
        title: 'Conversation Quality Telemetry',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: 'Monitor user sentiment, conversation completion rates, and hallucination metrics.',
        features: ['User thumbs up/down sentiment tracking', 'Hallucination scoring index', 'Cost per conversation breakdown', 'Exportable chat transcripts'],
        preview: {
          title: 'Quality Scoreboard',
          bars: [{ label: 'CSAT', val1: 98, val2: 94 }, { label: 'Speed', val1: 95, val2: 90 }, { label: 'RAG', val1: 99, val2: 96 }, { label: 'Cost', val1: 92, val2: 88 }, { label: 'Safe', val1: 100, val2: 100 }],
          providers: [{ name: 'User Satisfaction', amount: '98.2%', color: 'bg-emerald-500' }, { name: 'Avg Session Time', amount: '2.4 mins', color: 'bg-blue-600' }, { name: 'Token Spend / Chat', amount: '$0.0018', color: 'bg-indigo-600' }, { name: 'Resolution Speed', amount: 'Instant', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Supercharge customer engagement and internal productivity',
    useCases: [
      { id: 'c-uc1', title: 'Customer Support Co-Pilot', desc: 'Resolve 80%+ of incoming tickets with accurate RAG answers.', icon: <Headphones className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'c-uc2', title: 'Internal Knowledge Assistant', desc: 'Instant answers across internal docs, Notion, and Jira.', icon: <Database className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'c-uc3', title: 'Sales & Deal Qualifier', desc: 'Engage inbound leads with intelligent product qualification.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'c-uc4', title: 'Code & Architecture Helper', desc: 'Assist developers with codebase queries and refactoring.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your knowledge bases and LLM providers',
    integrations: [
      { name: 'OpenAI GPT-4o', logoKey: 'openai' },
      { name: 'Anthropic Claude', logoKey: 'anthropic' },
      { name: 'Google Gemini', logoKey: 'gcp' },
      { name: 'AWS Bedrock', logoKey: 'aws' },
      { name: 'Microsoft Azure AI', logoKey: 'azure' },
      { name: 'Slack Bot', logoKey: 'slack' },
      { name: 'GitHub Sync', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to launch enterprise conversational AI?',
    ctaSubtitle: 'Connect your data sources and deploy your first custom AI chat assistant in minutes.',
    relatedHeadline: 'Explore related AI services',
    relatedOfferings: [
      { id: 'ai-image', type: 'service', name: 'AI Image Studio', desc: 'Generative image studio.', icon: <ImageIcon className="w-4 h-4" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-700', iconBorder: 'border-pink-100' },
      { id: 'ai-video', type: 'service', name: 'AI Video & Slides', desc: 'Automated video generation.', icon: <Video className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Ultra-realistic voices.', icon: <Mic className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'ai-music', type: 'service', name: 'AI Music Studio', desc: 'Generative soundtracks.', icon: <Music className="w-4 h-4" />, iconBg: 'bg-violet-50', iconColor: 'text-violet-700', iconBorder: 'border-violet-100' },
      { id: 'ai-pods', type: 'service', name: 'AI Compute Pods', desc: 'Serverless GPU clusters.', icon: <Cpu className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' }
    ],
    videoModal: {
      title: 'AI Chat Walkthrough',
      subtitle: 'Enterprise Conversational Intelligence & RAG',
      heroCardTitle: 'Watch Enterprise AI Chat in Action',
      heroCardDesc: 'See how SNS Square AI Chat searches private knowledge bases with zero hallucinations, executes API tools, and enforces enterprise guardrails.',
      highlights: [{ label: '110 TPS', sub: 'Instant streaming' }, { label: 'Zero Retention', sub: 'Enterprise privacy' }, { label: 'Multi-Modal', sub: 'Vision & voice' }]
    }
  },

  'ai-image': {
    id: 'ai-image',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Image Studio',
    badgeIcon: <ImageIcon className="w-3.5 h-3.5 text-pink-600" />,
    heroIcon: <ImageIcon className="w-6 h-6" />,
    heroIconBg: 'bg-pink-50/90',
    heroIconColor: 'text-pink-700',
    heroIconBorder: 'border-pink-100/80',
    headline1: 'Generative visual studio.',
    headline2: 'Hyper-realistic creative assets.',
    subtitle: 'Generate production-ready marketing assets, photorealistic photography, UI mockups, and vector illustrations with state-of-the-art diffusion models.',
    openButtonText: 'Open Image Studio',
    heroIllustration: {
      cardTitle: 'Multi-Model Diffusion Engine',
      cardSub: '8K Ultra HD Synthesizer',
      cardBadge: '8K Render Ready',
      annotationText: 'Photorealistic AI\nInstant Upscale',
      checklist: ['Multi-Model Synthesis', 'Inpainting & Outpainting', 'Vector SVG & 8K Upscaling'],
      bars: [
        { height: '45%', bg: 'bg-pink-300' },
        { height: '65%', bg: 'bg-pink-400' },
        { height: '85%', bg: 'bg-pink-500' },
        { height: '95%', bg: 'bg-pink-600' },
        { height: '70%', bg: 'bg-pink-400' },
        { height: '100%', bg: 'bg-[#DB2777]' }
      ],
      curveColor: '#DB2777'
    },
    metrics: [
      { label: 'Render Latency', value: '< 2.8s', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' },
      { label: 'Max Output Resolution', value: '8K Ultra HD', icon: <Layers className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Curated Style Presets', value: '140+ Styles', icon: <Sparkles className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { label: 'Commercial Usage Rights', value: '100% Cleared', icon: <ShieldCheck className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    capabilitiesHeadline: 'Comprehensive creative suite from concept sketch to commercial 8K renders',
    capabilities: [
      {
        id: 'multi-model-gen',
        number: '01',
        title: 'Multi-Model Generation Pipeline',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Access FLUX.1, Midjourney API, Stable Diffusion 3.5, and DALL-E 3 from a unified creative console.',
        features: ['Unified prompt interface across models', 'Instant side-by-side comparison matrix', 'Negative prompt fine-tuning', 'LoRA style checkpoint switching'],
        preview: {
          title: 'Model Generation Speed',
          bars: [{ label: 'FLUX', val1: 95, val2: 90 }, { label: 'SD3.5', val1: 90, val2: 85 }, { label: 'DALL-E', val1: 85, val2: 80 }, { label: 'MidJ', val1: 88, val2: 82 }, { label: 'Custom', val1: 98, val2: 94 }],
          providers: [{ name: 'FLUX.1 Pro Render', amount: '2.4s', color: 'bg-pink-600' }, { name: 'SD 3.5 Large', amount: '1.9s', color: 'bg-purple-600' }, { name: 'DALL-E 3 HD', amount: '4.2s', color: 'bg-blue-600' }, { name: 'Upscale Engine', amount: 'Instant', color: 'bg-emerald-500' }]
        }
      },
      {
        id: 'inpainting-canvas',
        number: '02',
        title: 'AI Inpainting & Object Replacement',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Brush over any element in an image to replace backgrounds, change product colors, or remove blemishes.',
        features: ['Precision brush mask selector', 'Seamless lighting & shadow blending', 'Smart object erase & fill', 'Generative canvas expanding (outpainting)'],
        preview: {
          title: 'Inpainting Canvas',
          bars: [{ label: 'Mask', val1: 100, val2: 98 }, { label: 'Blend', val1: 98, val2: 95 }, { label: 'Light', val1: 99, val2: 96 }, { label: 'Shadow', val1: 96, val2: 92 }, { label: 'Render', val1: 100, val2: 98 }],
          providers: [{ name: 'Masking Accuracy', amount: 'Pixel-Perfect', color: 'bg-emerald-500' }, { name: 'Lighting Match', amount: '99.4%', color: 'bg-pink-600' }, { name: 'Outpainting Ratio', amount: 'Up to 4x', color: 'bg-purple-600' }, { name: 'Edit History', amount: 'Unlimited', color: 'bg-blue-600' }]
        }
      },
      {
        id: 'brand-kit',
        number: '03',
        title: 'Brand Consistency & LoRA Training',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Train custom LoRA models on your company brand assets, color palettes, and product physical prototypes.',
        features: ['1-click custom LoRA fine-tuning', 'Hex color code locking', 'Brand logo placement guarantee', 'Consistent mascot and character generation'],
        preview: {
          title: 'Brand Kit Fidelity',
          bars: [{ label: 'Color', val1: 100, val2: 100 }, { label: 'Logo', val1: 100, val2: 98 }, { label: 'Mascot', val1: 98, val2: 95 }, { label: 'Font', val1: 96, val2: 92 }, { label: 'Style', val1: 100, val2: 98 }],
          providers: [{ name: 'Brand Color Fidelity', amount: '100% Match', color: 'bg-emerald-500' }, { name: 'Trained Models', amount: '4 Custom LoRAs', color: 'bg-pink-600' }, { name: 'Character Consistency', amount: '98.8%', color: 'bg-purple-600' }, { name: 'Brand Approved', amount: 'Enforced', color: 'bg-blue-600' }]
        }
      },
      {
        id: 'upscale-vector',
        number: '04',
        title: 'Neural 8K Upscaling & Vectorization',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Enhance low-resolution images into razor-sharp 8K prints and convert raster art into clean SVG vectors.',
        features: ['8x neural super-resolution', 'Artifact & noise removal', 'Raster to SVG vector tracing', 'Print-ready 300 DPI exports'],
        preview: {
          title: 'Upscaling Quality',
          bars: [{ label: '1080p', val1: 70, val2: 60 }, { label: '4K', val1: 85, val2: 75 }, { label: '8K', val1: 98, val2: 90 }, { label: 'SVG', val1: 100, val2: 98 }, { label: 'DPI', val1: 100, val2: 100 }],
          providers: [{ name: 'Max Resolution', amount: '8,192 x 8,192', color: 'bg-pink-600' }, { name: 'SVG Node Optimization', amount: 'Clean Paths', color: 'bg-emerald-500' }, { name: 'DPI Output', amount: '300 DPI Print', color: 'bg-purple-600' }, { name: 'Processing Time', amount: '1.2s', color: 'bg-blue-600' }]
        }
      },
      {
        id: 'ecommerce-studio',
        number: '05',
        title: 'E-Commerce Product Photography',
        icon: <Store className="w-4 h-4" />,
        tagline: 'Place product photos into photorealistic 3D lifestyle scenes with automated background removal.',
        features: ['Instant studio lighting presets', 'Automated product shadow projection', 'Batch generation for thousands of SKUs', 'Marketplace aspect ratio resizing'],
        preview: {
          title: 'E-Commerce Pipeline',
          bars: [{ label: 'Light', val1: 98, val2: 95 }, { label: 'Shadow', val1: 99, val2: 96 }, { label: 'Batch', val1: 95, val2: 90 }, { label: 'SKU', val1: 100, val2: 98 }, { label: 'Scale', val1: 98, val2: 95 }],
          providers: [{ name: 'Processed SKUs', amount: '24,000 Items', color: 'bg-pink-600' }, { name: 'CTR Uplift', amount: '+34.2%', color: 'bg-emerald-500' }, { name: 'Studio Cost Saved', amount: '$42,000/mo', color: 'bg-purple-600' }, { name: 'Batch Speed', amount: '50 Images/min', color: 'bg-blue-600' }]
        }
      },
      {
        id: 'marketing-ads',
        number: '06',
        title: 'Marketing Ad Variation Engine',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: 'Generate hundreds of ad creatives across Instagram, Facebook, Google, and LinkedIn with 1 click.',
        features: ['Multi-platform aspect ratios (1:1, 9:16, 16:9)', 'A/B testing visual variants', 'Text overlay typography editor', 'Automated CTA button overlays'],
        preview: {
          title: 'Ad Variant Generator',
          bars: [{ label: 'Square', val1: 100, val2: 98 }, { label: 'Story', val1: 100, val2: 98 }, { label: 'Banner', val1: 100, val2: 98 }, { label: 'Feed', val1: 100, val2: 98 }, { label: 'Thumb', val1: 100, val2: 98 }],
          providers: [{ name: 'Generated Variants', amount: '120 Ads/run', color: 'bg-emerald-500' }, { name: 'Social Formats', amount: 'All Platforms', color: 'bg-pink-600' }, { name: 'Ad Performance', amount: '+48% ROAS', color: 'bg-purple-600' }, { name: 'Export Format', amount: 'PNG / PSD / WebP', color: 'bg-blue-600' }]
        }
      },
      {
        id: 'ui-mockup-synth',
        number: '07',
        title: 'UI & App Mockup Synthesizer',
        icon: <Monitor className="w-4 h-4" />,
        tagline: 'Generate clean mobile app screens, SaaS landing page wireframes, and design system inspiration.',
        features: ['Modern glassmorphism & dark mode UI', 'Clean icon and typography rendering', 'Figma copy-paste integration', 'Design token extraction'],
        preview: {
          title: 'UI Mockup Generator',
          bars: [{ label: 'Web', val1: 96, val2: 92 }, { label: 'Mobile', val1: 98, val2: 95 }, { label: 'Dark', val1: 100, val2: 98 }, { label: 'Glass', val1: 95, val2: 90 }, { label: 'Figma', val1: 98, val2: 95 }],
          providers: [{ name: 'Design Fidelity', amount: 'Pixel Clean', color: 'bg-pink-600' }, { name: 'Figma Compatible', amount: '1-Click Export', color: 'bg-blue-600' }, { name: 'UI Components', amount: 'Design System', color: 'bg-purple-600' }, { name: 'Generation Speed', amount: '2.1s', color: 'bg-emerald-500' }]
        }
      },
      {
        id: 'api-batch-sdk',
        number: '08',
        title: 'Developer REST & GraphQL API',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Integrate automated image generation directly into your application with SDKs for Python, Node, and Go.',
        features: ['Async batch webhooks', 'Sub-second streaming generation', 'Dedicated GPU priority queues', 'Rate-limiting & spend governor'],
        preview: {
          title: 'API Throughput Board',
          bars: [{ label: 'REST', val1: 98, val2: 95 }, { label: 'GQL', val1: 95, val2: 90 }, { label: 'Hook', val1: 100, val2: 98 }, { label: 'Queue', val1: 92, val2: 88 }, { label: 'SLA', val1: 100, val2: 100 }],
          providers: [{ name: 'API Latency', amount: '< 2.5s', color: 'bg-emerald-500' }, { name: 'API Uptime SLA', amount: '99.99%', color: 'bg-pink-600' }, { name: 'Throughput Peak', amount: '1,500 req/min', color: 'bg-purple-600' }, { name: 'SDKs', amount: 'TS / Python / Go', color: 'bg-blue-600' }]
        }
      }
    ],
    useCasesHeadline: 'Create stunning visuals for products, marketing, and media',
    useCases: [
      { id: 'i-uc1', title: 'Commercial Marketing Assets', desc: 'Create billboard and social campaigns with brand consistency.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' },
      { id: 'i-uc2', title: 'E-Commerce Product Photos', desc: 'Replace physical photoshoots with photorealistic AI scenes.', icon: <Store className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'i-uc3', title: 'App & UI Concepting', desc: 'Rapidly ideate mobile interfaces, wireframes, and design systems.', icon: <Monitor className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'i-uc4', title: 'High-Res Print & Merch', desc: 'Upscale assets to 8K 300 DPI for physical merchandise prints.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    integrationsHeadline: 'Connects to your creative tools and storage',
    integrations: [
      { name: 'Figma Export', logoKey: 'figma' },
      { name: 'AWS S3 Storage', logoKey: 'aws' },
      { name: 'Google Cloud Storage', logoKey: 'gcp' },
      { name: 'Shopify Sync', logoKey: 'shopify' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'OpenAI DALL-E', logoKey: 'openai' },
      { name: 'Docker Registry', logoKey: 'docker' }
    ],
    ctaTitle: 'Ready to create commercial-grade visual assets?',
    ctaSubtitle: 'Generate your first photorealistic 8K image in under 5 seconds with AI Image Studio.',
    relatedHeadline: 'Explore related AI creative services',
    relatedOfferings: [
      { id: 'ai-video', type: 'service', name: 'AI Video & Slides', desc: 'Automated video generation.', icon: <Video className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'ai-chat', type: 'service', name: 'AI Chat Assistant', desc: 'Conversational reasoning.', icon: <MessageSquare className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Ultra-realistic voices.', icon: <Mic className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'ai-music', type: 'service', name: 'AI Music Studio', desc: 'Generative soundtracks.', icon: <Music className="w-4 h-4" />, iconBg: 'bg-violet-50', iconColor: 'text-violet-700', iconBorder: 'border-violet-100' },
      { id: 'ai-pods', type: 'service', name: 'AI Compute Pods', desc: 'Serverless GPU clusters.', icon: <Cpu className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' }
    ],
    videoModal: {
      title: 'AI Image Studio Walkthrough',
      subtitle: 'Photorealistic Generation & 8K Inpainting',
      heroCardTitle: 'Watch Generative Image Creation',
      heroCardDesc: 'See how SNS Square AI Image Studio renders photorealistic 8K product photos, preserves exact brand guidelines, and edits images with brush inpainting.',
      highlights: [{ label: '< 2.8s', sub: 'Render latency' }, { label: '8K Ultra HD', sub: 'Print ready' }, { label: 'LoRA Kits', sub: 'Brand consistency' }]
    }
  }
};
