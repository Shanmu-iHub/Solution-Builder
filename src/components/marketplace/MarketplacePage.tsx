import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  Store,
  Bot,
  Box,
  Search,
  Star,
  Heart,
  ArrowRight,
  Headphones,
  FileText,
  BarChart3,
  Send,
  Users,
  Scale,
  Share2,
  Package,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Plus,
  Play,
  SlidersHorizontal,
  Cloud,
  Cpu,
  Database,
  Terminal,
  Copy,
  Check,
  Code2,
  Zap,
  Lock,
  Globe,
  MessageSquare,
  Bookmark,
  Building2,
  Clock,
  ThumbsUp,
  Activity
} from 'lucide-react';

export interface MarketplaceItem {
  id: string;
  name: string;
  desc: string;
  longDesc?: string;
  category: string;
  industry: string;
  rating: number;
  reviewCount: string;
  type: 'agent' | 'solution';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  section: 'featured' | 'popular' | 'recent';
  author: string;
  verifiedAuthor?: boolean;
  version?: string;
  lastUpdated?: string;
  price: string;
  features?: string[];
  samplePrompts?: string[];
  sampleOutput?: string;
  models?: string[];
  latency?: string;
  contextWindow?: string;
}

const marketplaceAgents: MarketplaceItem[] = [
  // 1. Featured AI Agents
  {
    id: 'customer-support',
    name: 'Customer Support Agent',
    desc: 'Instant customer support for your business with CRM ticketing and real-time resolution.',
    longDesc: 'An enterprise-ready autonomous customer support agent engineered to ingest company knowledge bases, triage incoming tickets, answer user inquiries in 40+ languages, and escalate complex requests seamlessly to human reps.',
    category: 'Customer Support',
    industry: 'SaaS & Tech',
    rating: 4.8,
    reviewCount: '1.2K',
    type: 'agent',
    icon: <Headphones className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-blue-50/90',
    iconColor: 'text-blue-600',
    iconBorder: 'border-blue-100',
    section: 'featured',
    author: 'SNS Square Core',
    verifiedAuthor: true,
    version: 'v3.2.0',
    lastUpdated: '2 days ago',
    price: 'Free / ₹1,499 mo',
    features: [
      'Multi-channel integration with Zendesk, Intercom, Freshdesk & Slack',
      'Real-time semantic vector retrieval across PDF docs, FAQs, and notion workspaces',
      'Sentiment analysis with automated manager escalation triggers',
      'Continuous reinforcement feedback loop to improve accuracy over time'
    ],
    samplePrompts: [
      'How do I upgrade my enterprise tier subscription?',
      'Check if my order #90214 is shipped',
      'I am getting a 403 Forbidden error on API endpoint /v1/auth'
    ],
    sampleOutput: 'Hello! I checked order #90214 for you. It was dispatched this morning via BlueDart Express with tracking code BD-8839201. Expected delivery is tomorrow by 4:00 PM IST.',
    models: ['Claude 3.5 Sonnet', 'GPT-4o Mini', 'Llama-3-70B'],
    latency: '180ms',
    contextWindow: '128k tokens'
  },
  {
    id: 'content-creator',
    name: 'Content Creator Agent',
    desc: 'Create high-quality content in seconds with SEO optimization and tone adaptation.',
    longDesc: 'A specialized generative marketing agent that crafts search-engine optimized articles, social media campaigns, whitepapers, and email newsletters adhering strictly to your brand tone guidelines.',
    category: 'Marketing & Content',
    industry: 'Media & E-Commerce',
    rating: 4.7,
    reviewCount: '856',
    type: 'agent',
    icon: <FileText className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-purple-50/90',
    iconColor: 'text-purple-600',
    iconBorder: 'border-purple-100',
    section: 'featured',
    author: 'CreativeLab AI',
    verifiedAuthor: true,
    version: 'v2.4.1',
    lastUpdated: '5 days ago',
    price: 'Free / ₹1,999 mo',
    features: [
      'Built-in SEO keyword density analyzer and competitor search intent matching',
      'Multi-platform output formatting for LinkedIn, X (Twitter), Substack, and WordPress',
      'Automated royalty-free visual asset suggestion and prompt synthesis',
      'Brand tone fine-tuning with custom persona sliders'
    ],
    samplePrompts: [
      'Draft a LinkedIn announcement for our Series A funding round',
      'Write a 5-step guide on reducing cloud FinOps costs for CTOs',
      'Generate 5 viral hooks for a TikTok/Reels marketing video'
    ],
    sampleOutput: '🚀 Excited to announce: SNS Square has raised $12M in Series A funding to revolutionize agentic workflows!\n\nHere is what this means for builders:\n1. 10x faster agent orchestration\n2. Native zero-retention data privacy\n3. Enterprise multi-cloud deploy in 1-click\n\nRead the full founder letter: [link]',
    models: ['GPT-4o', 'Claude 3.5 Sonnet', 'Mistral Large'],
    latency: '240ms',
    contextWindow: '128k tokens'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst Agent',
    desc: 'Turn data into insights and clear reports with automated SQL and chart generation.',
    longDesc: 'An autonomous quantitative reasoning agent that connects directly to Postgres, Snowflake, BigQuery, or CSV datasets to run diagnostic SQL queries and generate interactive executive summaries.',
    category: 'Data & Analytics',
    industry: 'FinTech & Banking',
    rating: 4.9,
    reviewCount: '2.1K',
    type: 'agent',
    icon: <BarChart3 className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-emerald-50/90',
    iconColor: 'text-emerald-600',
    iconBorder: 'border-emerald-100',
    section: 'featured',
    author: 'DataSense Team',
    verifiedAuthor: true,
    version: 'v4.0.0',
    lastUpdated: '1 day ago',
    price: 'Free / ₹2,499 mo',
    features: [
      'Natural language to hardened, read-only SQL generation',
      'Automated cohort analysis, churn forecast, and revenue attribution metrics',
      'Instant chart generation (Bar, Trendlines, Heatmaps, Sankey)',
      'Scheduled weekly automated Slack and PDF digest dispatch'
    ],
    samplePrompts: [
      'Show me monthly recurring revenue growth comparing Q1 vs Q2',
      'Which marketing channel generated the highest LTV customers last quarter?',
      'Identify the top 5 product features causing customer churn'
    ],
    sampleOutput: 'Analysis Complete:\n• Q2 MRR reached ₹42.8 Lakhs (+28.4% QoQ)\n• Organic Search generated highest 12-month LTV (₹1.85L avg)\n• Primary churn factor: Onboarding dropoff at Step 3 (API Key generation).',
    models: ['Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek-Coder'],
    latency: '310ms',
    contextWindow: '128k tokens'
  },

  // 2. Popular AI Agents
  {
    id: 'sales-outreach',
    name: 'Sales Outreach Agent',
    desc: 'Find leads and follow up automatically with personalized multi-touch sequences.',
    longDesc: 'Autonomous prospecting and email warmup engine that verifies company domains, analyzes prospect LinkedIn profiles, and crafts high-converting 1-on-1 cold outreach sequences.',
    category: 'Sales & Outreach',
    industry: 'B2B Enterprise',
    rating: 4.8,
    reviewCount: '1.4K',
    type: 'agent',
    icon: <Send className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-blue-50/90',
    iconColor: 'text-blue-600',
    iconBorder: 'border-blue-100',
    section: 'popular',
    author: 'GrowthFlow',
    verifiedAuthor: true,
    version: 'v2.1.0',
    lastUpdated: '1 week ago',
    price: 'Free / ₹1,999 mo',
    features: [
      'Automated LinkedIn & Apollo.io lead verification',
      'Hyper-personalized email icebreakers based on recent company news',
      'A/B testing subject lines and follow-up cadence scheduling',
      'Direct sync with HubSpot, Salesforce, and Close CRM'
    ],
    samplePrompts: [
      'Generate a 3-touch cold email sequence for VP of Engineering leads',
      'Find 10 high-growth FinTech companies in Bengaluru with recent Series B',
      'Write a follow-up email after a prospect viewed our demo deck'
    ],
    sampleOutput: 'Subject: Quick question regarding your AWS compute costs, {{firstName}}\n\nHi {{firstName}},\n\nSaw your team just crossed 50 engineers—congrats! As infrastructure scales, AWS egress and idle EC2 clusters tend to spike silently.\n\nWould you be open to a 5-min demo showing how we helped Zepto reduce cloud waste by 34%?',
    models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    latency: '220ms',
    contextWindow: '64k tokens'
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    desc: 'Search and summarize information for you across 100M+ academic and web sources.',
    longDesc: 'Deep exploratory research agent that crawls technical whitepapers, SEC filings, and scientific journals to generate comprehensive citations, cross-verified summaries, and market landscapes.',
    category: 'Research & Knowledge',
    industry: 'All Industries',
    rating: 4.7,
    reviewCount: '1.1K',
    type: 'agent',
    icon: <Search className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-sky-50/90',
    iconColor: 'text-sky-600',
    iconBorder: 'border-sky-100',
    section: 'popular',
    author: 'SNS Square Labs',
    verifiedAuthor: true,
    version: 'v3.1.2',
    lastUpdated: '3 days ago',
    price: 'Free / ₹1,299 mo',
    features: [
      'Multi-hop web search with fact-checking validation',
      'ArXiv, PubMed, and patent database deep indexing',
      'Automated Markdown report generation with inline bibliography and DOI links',
      'Export directly to Notion, Google Docs, or PDF format'
    ],
    samplePrompts: [
      'Summarize current state-of-the-art in small reasoning models (SLMs)',
      'Analyze the regulatory landscape for AI medical diagnostics in India (CDSCO)',
      'Compare pricing models of leading vector databases (Pinecone vs Milvus vs Qdrant)'
    ],
    sampleOutput: 'Summary: Recent breakthroughs in Small Language Models (SLMs) like Qwen-2.5-Coder and Phi-3.5 demonstrate that targeted synthetic data filtering allows 7B models to match 70B parameter performance on specialized reasoning tasks with 6x lower latency.',
    models: ['GPT-4o', 'Claude 3.5 Sonnet', 'Llama-3-70B'],
    latency: '450ms',
    contextWindow: '128k tokens'
  },
  {
    id: 'hr-assistant',
    name: 'HR Assistant',
    desc: 'Screen candidates and shortlist with ease, coordinate interviews, and score rubrics.',
    longDesc: 'Talent operations copilot designed to parse bulk resumes, match technical proficiencies against JD requirements, draft tailored interview questions, and coordinate calendar scheduling.',
    category: 'HR & Operations',
    industry: 'Human Resources',
    rating: 4.6,
    reviewCount: '642',
    type: 'agent',
    icon: <Users className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-purple-50/90',
    iconColor: 'text-purple-600',
    iconBorder: 'border-purple-100',
    section: 'popular',
    author: 'TalentScale AI',
    verifiedAuthor: true,
    version: 'v1.8.0',
    lastUpdated: '4 days ago',
    price: 'Free / ₹1,799 mo',
    features: [
      'Unbiased blind resume parsing and skill rubric scoring',
      'Automated candidate interview scheduling via Google Calendar & Outlook',
      'Personalized feedback generation for rejected and shortlisted applicants',
      'Greenhouse, Lever, and Workday ATS bidirectional sync'
    ],
    samplePrompts: [
      'Screen 20 frontend engineer resumes against React and TypeScript requirements',
      'Draft 5 behavioral interview questions for a Senior Product Manager role',
      'Write a warm onboarding email welcome sequence for our new DevOps hire'
    ],
    sampleOutput: 'Candidate Match Score: 92/100\nStrengths: 5+ yrs React, Production Next.js & GraphQL, Redux Toolkit architecture.\nSuggested Interview Questions:\n1. Walk us through a scenario where you optimized Core Web Vitals on a high-traffic app.\n2. How do you approach state persistence in distributed client sessions?',
    models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    latency: '260ms',
    contextWindow: '64k tokens'
  },

  // 3. Recently Added
  {
    id: 'legal-document',
    name: 'Legal Document Agent',
    desc: 'Automate legal workflows efficiently with contract redlining and compliance verification.',
    longDesc: 'Contract review and legal ops assistant that highlights non-standard indemnification clauses, flags missing GDPR/DPDP terms, and drafts boilerplate NDAs in seconds.',
    category: 'Legal & Compliance',
    industry: 'Legal & Governance',
    rating: 4.5,
    reviewCount: '320',
    type: 'agent',
    icon: <Scale className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-purple-50/90',
    iconColor: 'text-purple-600',
    iconBorder: 'border-purple-100',
    section: 'recent',
    author: 'LexisAI Labs',
    verifiedAuthor: true,
    version: 'v1.2.0',
    lastUpdated: 'Just now',
    price: 'Free / ₹2,999 mo',
    features: [
      'Clause-by-clause contract redlining with side-by-side risk score',
      'Indian Digital Personal Data Protection (DPDP) Act 2023 compliance checker',
      'Automated NDA, MSA, and SLA template generation',
      'DocuSign & Adobe Sign native API handshake'
    ],
    samplePrompts: [
      'Review this Master Services Agreement for unfavorable liability caps',
      'Draft a mutual Non-Disclosure Agreement for an enterprise SaaS pilot',
      'Identify clause differences between our standard NDA and vendor version'
    ],
    sampleOutput: '⚠️ Risk Alert Found in Section 8.2 (Indemnity):\n"Vendor liability is uncapped for third-party IP claims."\nRecommendation: Propose standard 2x annual contract value cap to limit enterprise exposure.',
    models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    latency: '380ms',
    contextWindow: '128k tokens'
  },
  {
    id: 'social-media',
    name: 'Social Media Agent',
    desc: 'Create and schedule engaging posts across LinkedIn, X, and Instagram with analytics.',
    longDesc: 'Multi-channel social media manager that transforms long-form podcasts, webinars, and blog posts into high-performing carousels, tweet threads, and short captions.',
    category: 'Marketing & Content',
    industry: 'Media & Marketing',
    rating: 4.6,
    reviewCount: '410',
    type: 'agent',
    icon: <Share2 className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-rose-50/90',
    iconColor: 'text-rose-600',
    iconBorder: 'border-rose-100',
    section: 'recent',
    author: 'SocialPulse Team',
    verifiedAuthor: true,
    version: 'v2.0.4',
    lastUpdated: '1 day ago',
    price: 'Free / ₹1,199 mo',
    features: [
      'Automated thread expansion from YouTube transcripts and URLs',
      'Optimal posting time prediction based on historical engagement analytics',
      'Hashtag density & virality coefficient estimator',
      'Buffer, Hootsuite, and Typefully publishing webhook integration'
    ],
    samplePrompts: [
      'Turn this 1,000 word blog post into a 7-slide LinkedIn carousel',
      'Write a witty thread summarizing our latest release notes',
      'Generate 10 engaging poll ideas for tech professionals'
    ],
    sampleOutput: 'Slide 1 (Hook): Most teams waste 40% of their cloud budget. Here is the 4-step framework we used to fix it in 30 days.\n\nSlide 2: Step 1 - Turn off unattached EBS volumes...\n[Slide 3-7 formatted with design cues]',
    models: ['GPT-4o Mini', 'Claude 3.5 Sonnet'],
    latency: '190ms',
    contextWindow: '64k tokens'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Agent',
    desc: 'Optimize supply chain operations, inventory forecasts, and vendor SLA rebalancing.',
    longDesc: 'Logistics intelligence agent that correlates seasonal demand swings, supplier lead times, and freight tariff fluctuations to recommend optimal reorder points.',
    category: 'Operations',
    industry: 'Logistics & Retail',
    rating: 4.7,
    reviewCount: '520',
    type: 'agent',
    icon: <Package className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-amber-50/90',
    iconColor: 'text-amber-600',
    iconBorder: 'border-amber-100',
    section: 'recent',
    author: 'LogiGrid Core',
    verifiedAuthor: true,
    version: 'v1.5.0',
    lastUpdated: '3 days ago',
    price: 'Free / ₹3,499 mo',
    features: [
      'Inventory reorder point calculation using Monte Carlo safety stock models',
      'Supplier on-time delivery score tracking and automated PO escalation',
      'Freight route carbon footprint and cost optimization algorithms',
      'SAP, Oracle ERP, and Zoho Inventory API connectors'
    ],
    samplePrompts: [
      'Calculate safety stock for SKU-8821 ahead of festive Diwali season',
      'Draft a vendor penalty notice for 5-day delivery delay',
      'Compare air freight vs ocean shipping costs for Mumbai to Dubai cargo'
    ],
    sampleOutput: 'Recommendation for SKU-8821:\n• Increase safety buffer by +35% for Oct-Nov cycle\n• Recommended PO Date: Sep 18, 2026\n• Projected stockout risk reduced from 14.2% to < 1.1%.',
    models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    latency: '340ms',
    contextWindow: '128k tokens'
  }
];

const marketplaceSolutions: MarketplaceItem[] = [
  {
    id: 'sol-ecommerce',
    name: 'E-Commerce Cloud Architecture',
    desc: 'High-concurrency storefront architecture with automated PCI-DSS checkout and cache layers.',
    longDesc: 'A battle-tested production blueprint for distributed microservice storefronts. Features multi-region Redis caching, serverless checkout lambdas, automated database failover, and CDN edge optimization capable of handling 50,000 req/sec.',
    category: 'Engineering & Cloud',
    industry: 'E-Commerce & Retail',
    rating: 4.9,
    reviewCount: '1.8K',
    type: 'solution',
    icon: <Cloud className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-blue-50/90',
    iconColor: 'text-blue-600',
    iconBorder: 'border-blue-100',
    section: 'featured',
    author: 'SNS Square Cloud',
    verifiedAuthor: true,
    version: 'v4.2.0',
    lastUpdated: 'Yesterday',
    price: 'Enterprise Blueprint',
    features: [
      'Complete Terraform & Pulumi IaC scripts for AWS/GCP/Azure deployment',
      'Automated PCI-DSS Level 1 tokenized payment gateway integration',
      'Global multi-region Redis cache cluster with 99.99% uptime SLA',
      'Integrated OpenTelemetry metrics, Datadog alerts, and Prometheus boards'
    ],
    samplePrompts: [
      'Deploy full stack e-commerce blueprint to AWS ap-south-1 (Mumbai)',
      'Run load test simulation with 10,000 concurrent checkout carts',
      'Inspect auto-scaling policies for sudden flash-sale traffic spikes'
    ],
    sampleOutput: 'Terraform Plan generated successfully:\n• 12 Microservices in EKS Kubernetes cluster\n• Aurora PostgreSQL multi-AZ database configured\n• CloudFront CDN with edge token auth enabled.\nReady for deployment.',
    models: ['Claude 3.5 Sonnet', 'Terraform IaC Engine'],
    latency: '150ms',
    contextWindow: '256k tokens'
  },
  {
    id: 'sol-finops',
    name: 'Multi-Tenant FinOps Platform',
    desc: 'Unified multi-cloud cost intelligence, budget anomaly alerts, and automated compute rebalancing.',
    longDesc: 'Comprehensive cloud financial operations blueprint providing real-time unit economics attribution, automated idle instance hibernation, spot instance orchestrator, and executive spend governance.',
    category: 'Operations & Cost',
    industry: 'FinTech & Banking',
    rating: 4.8,
    reviewCount: '940',
    type: 'solution',
    icon: <Layers className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-indigo-50/90',
    iconColor: 'text-indigo-600',
    iconBorder: 'border-indigo-100',
    section: 'featured',
    author: 'Cloud FinOps Core',
    verifiedAuthor: true,
    version: 'v3.0.1',
    lastUpdated: '3 days ago',
    price: 'Enterprise Blueprint',
    features: [
      'Cross-cloud cost allocation across AWS, GCP, Azure, and Databricks',
      'Automated spot fleet rebalancer with 0 downtime fallback',
      'Custom budget anomaly detection via ML forecasting models',
      'Granular cost-per-tenant, cost-per-customer, and cost-per-API call attribution'
    ],
    samplePrompts: [
      'Audit unattached storage volumes across our 3 AWS production accounts',
      'Setup automated Slack alert if daily compute exceeds ₹50,000',
      'Generate executive quarterly cloud savings summary for CFO'
    ],
    sampleOutput: 'Audit complete:\n• Identified 34 unattached EBS volumes (Est. savings: ₹1.4L/mo)\n• Over-provisioned RDS instances found in staging\n• Recommended Reserved Instance strategy: 38% net savings.',
    models: ['GPT-4o', 'FinOps Cost Model'],
    latency: '210ms',
    contextWindow: '128k tokens'
  },
  {
    id: 'sol-hipaa',
    name: 'Healthcare HIPAA Compliance SaaS',
    desc: 'Zero-retention medical RAG pipeline with automated BAA and audit log encryption guarantee.',
    longDesc: 'Enterprise architecture blueprint certified for HIPAA, GDPR, and ISO 27001 medical SaaS applications. Implements client-side envelope encryption, isolated patient metadata vaults, and immutable audit logs.',
    category: 'Security & Governance',
    industry: 'Healthcare & Life Sciences',
    rating: 4.9,
    reviewCount: '620',
    type: 'solution',
    icon: <ShieldCheck className="w-6 h-6 stroke-[2]" />,
    iconBg: 'bg-emerald-50/90',
    iconColor: 'text-emerald-600',
    iconBorder: 'border-emerald-100',
    section: 'featured',
    author: 'Compliance Cloud',
    verifiedAuthor: true,
    version: 'v2.5.0',
    lastUpdated: '4 days ago',
    price: 'Enterprise Blueprint',
    features: [
      'AES-256-GCM envelope encryption with AWS KMS hardware security module',
      'Zero-retention LLM inference gateways with PII scrubbing before tokenization',
      'Immutable WORM (Write Once Read Many) audit trail with SIEM forwarding',
      'Pre-audited SOC 2 Type II and HIPAA compliance matrix'
    ],
    samplePrompts: [
      'Verify PII de-identification pipeline on sample patient health records',
      'Export compliance audit report for third-party security auditor',
      'Simulate breach containment protocol and access revocation'
    ],
    sampleOutput: 'Security Validation: PASS\n• PII Sanitizer: 100% of patient names/SSNs masked\n• KMS Key Rotation: Active (30-day interval)\n• Zero-retention confirmed on LLM endpoint.',
    models: ['Claude 3.5 Sonnet', 'HIPAA Secure Pipeline'],
    latency: '190ms',
    contextWindow: '128k tokens'
  }
];

export const MarketplacePage: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [activeMarketplaceTab, setActiveMarketplaceTab] = useState<'agent' | 'solution'>('agent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Selected detail item for the professional dedicated detail page view
  const [selectedDetailItem, setSelectedDetailItem] = useState<MarketplaceItem | null>(null);
  
  // Tabs within Detail View
  const [detailTab, setDetailTab] = useState<'overview' | 'playground' | 'specs' | 'reviews'>('overview');
  const [testPromptInput, setTestPromptInput] = useState('');
  const [playgroundOutput, setPlaygroundOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => (prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]));
  };

  const currentDataset = activeMarketplaceTab === 'agent' ? marketplaceAgents : marketplaceSolutions;

  const filteredItems = currentDataset.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesIndustry = selectedIndustry === 'all' || item.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const featuredItems = filteredItems.filter(item => item.section === 'featured');
  const popularItems = filteredItems.filter(item => item.section === 'popular');
  const recentItems = filteredItems.filter(item => item.section === 'recent');

  const handleOpenDetail = (item: MarketplaceItem) => {
    setSelectedDetailItem(item);
    setDetailTab('overview');
    setTestPromptInput(item.samplePrompts?.[0] || '');
    setPlaygroundOutput(item.sampleOutput || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunPlaygroundTest = () => {
    if (!testPromptInput.trim()) return;
    setIsSimulating(true);
    setPlaygroundOutput(null);
    setTimeout(() => {
      setIsSimulating(false);
      setPlaygroundOutput(selectedDetailItem?.sampleOutput || 'Agent processed the request with 99.4% confidence rating.');
    }, 800);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Render Individual Marketplace Card
  const renderCard = (item: MarketplaceItem) => {
    const isFav = favorites.includes(item.id);

    return (
      <div
        key={item.id}
        onClick={() => handleOpenDetail(item)}
        className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-xl hover:border-blue-400/80 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
      >
        <div>
          {/* Top Row: Icon and Favorite Heart Button */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-14 h-14 rounded-2xl ${item.iconBg} ${item.iconBorder} ${item.iconColor} border flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs`}
            >
              {item.icon}
            </div>

            <button
              type="button"
              onClick={e => toggleFavorite(e, item.id)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isFav
                  ? 'text-rose-500 bg-rose-50'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
              }`}
              title={isFav ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1.5 line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2">
            {item.desc}
          </p>
        </div>

        {/* Bottom Section: Rating & Action Button */}
        <div className="space-y-3 pt-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{item.rating}</span>
            <span className="text-slate-400 font-normal">({item.reviewCount})</span>
          </div>

          {/* View Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail(item);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#F0F5FF] group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>{activeMarketplaceTab === 'agent' ? 'View Agent' : 'View Solution'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  };

  // =========================================================================
  // DEDICATED PROFESSIONAL DETAIL PAGE VIEW
  // =========================================================================
  if (selectedDetailItem) {
    const isFav = favorites.includes(selectedDetailItem.id);

    return (
      <div className="space-y-8 animate-fade-in select-none pb-20 max-w-7xl mx-auto">
        
        {/* 1. Top Breadcrumb and Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setSelectedDetailItem(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Marketplace
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px]">
              {selectedDetailItem.name}
            </span>
          </div>

          <button
            onClick={() => setSelectedDetailItem(null)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all shadow-2xs cursor-pointer w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </button>
        </div>

        {/* 2. Executive Hero Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-indigo-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Icon & Meta Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${selectedDetailItem.iconBg} ${selectedDetailItem.iconBorder} ${selectedDetailItem.iconColor} border-2 flex items-center justify-center shrink-0 shadow-md`}
              >
                <div className="scale-125 sm:scale-150">
                  {selectedDetailItem.icon}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {selectedDetailItem.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {selectedDetailItem.industry}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {selectedDetailItem.name}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {selectedDetailItem.longDesc || selectedDetailItem.desc}
                </p>

                {/* Star Rating, Author & Stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{selectedDetailItem.rating}</span>
                    <span className="text-slate-500 font-normal">({selectedDetailItem.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>By <strong className="text-slate-800">{selectedDetailItem.author}</strong></span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Updated {selectedDetailItem.lastUpdated || 'Recently'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Deployment Actions */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
              <button
                type="button"
                onClick={() => {
                  alert(`Launching ${selectedDetailItem.name} in your workspace...`);
                  if (selectedDetailItem.type === 'agent') {
                    setCurrentView('custom-agent');
                  } else {
                    setCurrentView('solution-builder-fullstack');
                  }
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Launch in Workspace</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedDetailItem.type === 'agent') {
                      setCurrentView('custom-agent');
                    } else {
                      setCurrentView('solution-builder-fullstack');
                    }
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Customize</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, selectedDetailItem.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isFav
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-500 hover:text-rose-500 hover:bg-rose-50/50'
                  }`}
                  title={isFav ? 'Saved' : 'Save'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Marketplace link copied to clipboard!');
                  }}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
                  title="Share Agent"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Detail Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center gap-8 text-sm font-bold">
          <button
            onClick={() => setDetailTab('overview')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              detailTab === 'overview'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Overview & Capabilities</span>
          </button>

          <button
            onClick={() => setDetailTab('playground')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              detailTab === 'playground'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Interactive Playground</span>
          </button>

          <button
            onClick={() => setDetailTab('specs')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              detailTab === 'specs'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Models & Integration Specs</span>
          </button>

          <button
            onClick={() => setDetailTab('reviews')}
            className={`pb-3.5 flex items-center gap-2 transition-all cursor-pointer relative ${
              detailTab === 'reviews'
                ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({selectedDetailItem.reviewCount})</span>
          </button>
        </div>

        {/* 4. Tab Content Layout (2 Columns: Main Content + Right Info Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {detailTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Key Features & Capabilities */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-5">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span>Key Capabilities & Highlights</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(selectedDetailItem.features || [
                      'Autonomous multi-step reasoning with validation loops',
                      'Enterprise SOC 2 Type II zero-retention data privacy',
                      'Pre-configured connectors for Slack, Zendesk & PostgreSQL',
                      'Real-time streaming responses with fallback failover'
                    ]).map((feat, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          {feat}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow Architecture Pipeline */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Autonomous Execution Pipeline</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-blue-50/60 border border-blue-200/70 rounded-2xl p-4 space-y-2">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 1</div>
                      <h4 className="text-xs font-bold text-slate-900">Ingest & Contextualize</h4>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        Parses input prompts, verifies permissions, and retrieves semantic memory from vector stores.
                      </p>
                    </div>

                    <div className="bg-indigo-50/60 border border-indigo-200/70 rounded-2xl p-4 space-y-2">
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Step 2</div>
                      <h4 className="text-xs font-bold text-slate-900">Reasoning & Tool Execution</h4>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        Executes API calls, queries internal databases, and synthesizes structured output.
                      </p>
                    </div>

                    <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4 space-y-2">
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Step 3</div>
                      <h4 className="text-xs font-bold text-slate-900">Compliance & Dispatch</h4>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        Applies safety guardrails, logs audit traces, and delivers formatted response to endpoints.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pre-Built Integrations */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span>Native Ecosystem Connectors</span>
                  </h3>

                  <div className="flex flex-wrap gap-2.5">
                    {['Slack', 'Zendesk', 'PostgreSQL', 'GitHub', 'Salesforce', 'Jira', 'AWS S3', 'Notion', 'Webhook API'].map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-300 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PLAYGROUND */}
            {detailTab === 'playground' && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-600" />
                    <span>Live Agent Sandbox Simulation</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Test how {selectedDetailItem.name} responds to real enterprise scenarios in real-time.
                  </p>
                </div>

                {/* Sample Prompt Chips */}
                {selectedDetailItem.samplePrompts && selectedDetailItem.samplePrompts.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quick Test Prompts:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedDetailItem.samplePrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTestPromptInput(prompt);
                            handleRunPlaygroundTest();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-medium transition-all text-left cursor-pointer"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={testPromptInput}
                      onChange={e => setTestPromptInput(e.target.value)}
                      placeholder="Type a test scenario or instruction for the agent..."
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Model: <strong>{selectedDetailItem.models?.[0] || 'Claude 3.5 Sonnet'}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRunPlaygroundTest}
                      disabled={isSimulating || !testPromptInput.trim()}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      {isSimulating ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Run Agent</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulation Output Card */}
                {playgroundOutput && (
                  <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-bold text-slate-300">Execution Output (Latency: {selectedDetailItem.latency || '210ms'})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Confidence: 99.4%</span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-mono">
                      {playgroundOutput}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SPECS & API */}
            {detailTab === 'specs' && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-600" />
                    <span>Developer Integration Specs</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Deploy programmatically via Python SDK, REST API, or cURL webhooks.
                  </p>
                </div>

                {/* Code Block Preview */}
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-xs font-mono text-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-bold">python_sdk_example.py</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-blue-300">
{`from sns_square import AgentClient

client = AgentClient(api_key="sk_live_enterprise_xyz")
agent = client.marketplace.get("${selectedDetailItem.id}")

response = agent.run(
    prompt="${selectedDetailItem.samplePrompts?.[0] || 'Execute workflow'}",
    stream=True,
    parameters={"temperature": 0.2, "max_tokens": 1024}
)

for chunk in response.stream():
    print(chunk.text, end="")`}
                  </pre>
                </div>

                {/* Technical Parameters Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Context Window</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedDetailItem.contextWindow || '128k tokens'}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Latency</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedDetailItem.latency || '240ms'}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Version</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedDetailItem.version || 'v2.4.0'}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Security</span>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5">SOC 2 Type II</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: REVIEWS */}
            {detailTab === 'reviews' && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span>Verified Community Reviews</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Rated {selectedDetailItem.rating} out of 5 based on {selectedDetailItem.reviewCount} customer deployments.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Review modal opened')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                          VK
                        </div>
                        <div>
                          <strong className="text-slate-800">Vikram K.</strong>
                          <span className="text-slate-400 text-[11px]"> · Head of AI, FinEdge India</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500 text-xs">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "Deployed this agent into our production Zendesk pipeline last month. Resolution time dropped from 4 hours to under 2 minutes with zero hallucinations."
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                          AM
                        </div>
                        <div>
                          <strong className="text-slate-800">Ananya M.</strong>
                          <span className="text-slate-400 text-[11px]"> · VP Engineering, HyperCloud</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500 text-xs">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "The integration took literally 10 minutes using the provided Terraform blueprints. Highly recommended for any fast-moving team."
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Info Sidebar (1/3 width) */}
          <div className="space-y-6">
            
            {/* Pricing & Deployment Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">License & Pricing</span>
                <div className="text-xl font-extrabold text-[#0F172A] mt-1">
                  {selectedDetailItem.price}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Includes free sandbox trial + commercial usage license.</p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Supported Models</span>
                  <span className="font-bold text-slate-800">{selectedDetailItem.models?.[0] || 'Claude 3.5'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Data Retention</span>
                  <span className="font-bold text-emerald-600">Zero Retention</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">API Access</span>
                  <span className="font-bold text-slate-800">REST & Python SDK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">SLA Guarantee</span>
                  <span className="font-bold text-slate-800">99.9% Uptime</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert(`Launching ${selectedDetailItem.name} in your workspace...`);
                  if (selectedDetailItem.type === 'agent') {
                    setCurrentView('custom-agent');
                  } else {
                    setCurrentView('solution-builder-fullstack');
                  }
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Launch in Workspace</span>
              </button>
            </div>

            {/* Creator / Publisher Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                  {selectedDetailItem.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{selectedDetailItem.author}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-[11px] text-slate-400">Verified Marketplace Partner</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                Specialized in building high-performance autonomous agents with zero-data retention security guarantees.
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View other agents by publisher</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Security & Compliance Badges */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/60 rounded-3xl border border-slate-200/80 p-5 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Security & Compliance</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>End-to-End AES-256 Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Indian DPDP & GDPR Compliant</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // MAIN MARKETPLACE GRID VIEW
  // =========================================================================
  return (
    <div className="space-y-8 animate-fade-in select-none pb-16 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button
          onClick={() => setCurrentView('home')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Marketplace</span>
      </nav>

      {/* 2. Hero Section (Matching Uploaded Image & Solution Builder Aesthetics) */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]/40 border border-slate-200/90 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-sky-300/15 via-cyan-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          
          {/* Left Column: Headline & Subtitle */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              <span>MARKETPLACE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-4">
              Discover <span className="text-[#2563EB]">AI Agents</span> <br />
              and <span className="text-[#2563EB]">Solutions</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Find, use and customize AI agents and ready-to-use solutions built by us and our community.
            </p>
          </div>

          {/* Right Column: 3D Floating Hero Cards Illustration */}
          <div className="w-full lg:w-[480px] h-[220px] sm:h-[240px] relative flex items-center justify-center">
            
            {/* Left 3D Floating Tile: AI Agents */}
            <div className="absolute left-[10%] top-[25%] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl flex flex-col items-center gap-2 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all z-20">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <Bot className="w-7 h-7 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-slate-800">AI Agents</span>
            </div>

            {/* Right 3D Floating Tile: Solutions */}
            <div className="absolute right-[18%] top-[15%] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl flex flex-col items-center gap-2 transform rotate-4 hover:rotate-0 hover:scale-105 transition-all z-20">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Box className="w-7 h-7 stroke-[2]" />
              </div>
              <span className="text-xs font-bold text-slate-800">Solutions</span>
            </div>

            {/* Handwritten Script Tag: Ideas to Impact */}
            <div className="absolute bottom-4 right-6 z-30 transform rotate-[-8deg] select-none pointer-events-none flex items-center gap-1.5">
              <svg className="w-8 h-8 text-blue-600 transform -scale-x-100 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-serif italic font-bold text-sm sm:text-base text-[#2563EB] tracking-wide leading-tight drop-shadow-xs">
                Ideas <br />
                to Impact
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* 3. Primary Marketplace Tabs */}
      <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs max-w-md">
        <button
          onClick={() => setActiveMarketplaceTab('agent')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMarketplaceTab === 'agent'
              ? 'bg-[#EBF2FF] text-[#2563EB] shadow-2xs border border-blue-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Agent Marketplace</span>
        </button>

        <button
          onClick={() => setActiveMarketplaceTab('solution')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMarketplaceTab === 'solution'
              ? 'bg-[#EBF2FF] text-[#2563EB] shadow-2xs border border-blue-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Solution Marketplace</span>
        </button>
      </div>

      {/* 4. Search and Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={activeMarketplaceTab === 'agent' ? 'Search agents by name, skill, or industry...' : 'Search architecture solutions...'}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap sm:flex-nowrap">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="flex-1 sm:flex-none text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="customer support">Customer Support</option>
            <option value="marketing & content">Marketing & Content</option>
            <option value="data & analytics">Data & Analytics</option>
            <option value="sales & outreach">Sales & Outreach</option>
            <option value="legal & compliance">Legal & Compliance</option>
            <option value="operations">Operations & Supply Chain</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={e => setSelectedIndustry(e.target.value)}
            className="flex-1 sm:flex-none text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Industries</option>
            <option value="saas">SaaS & Tech</option>
            <option value="commerce">E-Commerce & Retail</option>
            <option value="fintech">FinTech & Banking</option>
            <option value="healthcare">Healthcare</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="flex-1 sm:flex-none text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="rating">Highest Rated</option>
            <option value="popular">Most Popular</option>
            <option value="newest">Recently Added</option>
          </select>
        </div>
      </div>

      {/* 5. Marketplace Grids */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
          <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No items found matching your filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search query or category filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedIndustry('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-100 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : activeMarketplaceTab === 'agent' ? (
        <div className="space-y-10">
          {/* Section 1: Featured AI Agents */}
          {featuredItems.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Featured AI Agents</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">Handpicked agents to help you get more done.</p>
                </div>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View all agents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map(renderCard)}
              </div>
            </section>
          )}

          {/* Section 2: Popular AI Agents */}
          {popularItems.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Popular AI Agents</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">Most used agents by our community.</p>
                </div>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View all agents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularItems.map(renderCard)}
              </div>
            </section>
          )}

          {/* Section 3: Recently Added */}
          {recentItems.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Recently Added</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">Check out the latest additions to the marketplace.</p>
                </div>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View all agents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentItems.map(renderCard)}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Solution Marketplace View */
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Ready-to-Deploy Architecture Solutions</h2>
            <p className="text-xs text-[#64748B] mt-0.5">End-to-end full stack blueprints with pre-configured AI models, databases, and microservices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(renderCard)}
          </div>
        </div>
      )}

    </div>
  );
};
