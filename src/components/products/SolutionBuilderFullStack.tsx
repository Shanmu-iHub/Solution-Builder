import React, { useState, useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  Sparkles,
  Cloud,
  Database,
  Code2,
  Check,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  Globe,
  Smartphone,
  ShoppingCart,
  GitBranch,
  Laptop,
  Layers,
  Server,
  Terminal,
  Zap,
  ExternalLink,
  Search,
  Eye,
  X,
  Boxes,
  Play,
  CheckCircle2,
  Flame,
  Star,
  Monitor
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface ProjectTypeOption {
  id: string;
  title: string;
  category: 'projects' | 'web' | 'mobile' | 'ecommerce' | 'existing';
  icon: React.ReactNode;
  description: string;
  tags: string[];
  recommended?: boolean;
}

interface TemplateOption {
  id: string;
  title: string;
  category: 'restaurant' | 'service' | 'personal' | 'data' | 'others';
  categoryLabel: string;
  description: string;
  imageBg: string;
  accentColor: string;
  framework: string;
  stars: number;
  previewUrl?: string;
}

export const SolutionBuilderFullStack: React.FC = () => {
  const { setCurrentView, navigateToProduct } = useNavigation();

  // Category Tab state for "What are you building?"
  const [selectedCategory, setSelectedCategory] = useState<'projects' | 'web' | 'mobile' | 'ecommerce' | 'existing'>('web');

  // Template Filter state
  const [selectedTemplateFilter, setSelectedTemplateFilter] = useState<'all' | 'restaurant' | 'service' | 'personal' | 'data' | 'others'>('all');

  // Modals & Project Setup States
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ProjectTypeOption | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectDb, setProjectDb] = useState('PostgreSQL (Supabase / Neon)');
  const [projectDeploy, setProjectDeploy] = useState('Cloudflare Pages & Workers');
  const [projectCreatedToast, setProjectCreatedToast] = useState(false);

  // Category Options Data (matching Image 1 with support for all tabs)
  const categoryOptions: Record<'projects' | 'web' | 'mobile' | 'ecommerce' | 'existing', ProjectTypeOption[]> = {
    web: [
      {
        id: 'web-simple',
        title: 'Simple Website or Web App',
        category: 'web',
        icon: <Laptop className="w-5 h-5 text-blue-600" />,
        description: 'Perfect for quick prototypes, landing pages, and small applications. Includes built-in database support.',
        tags: ['QUICK PROTOTYPES', 'LANDING PAGES', 'BUILT-IN DB']
      },
      {
        id: 'web-fullstack',
        title: 'Full-Stack Websites or App',
        category: 'web',
        icon: <Layers className="w-5 h-5 text-indigo-600" />,
        description: 'Production-ready stack with auth, account management, backend, and database. Built with Hono framework on Node.js and optimized for Cloudflare Pages deployment.',
        tags: ['HONO', 'NODE.JS', 'AUTH + DB', 'CLOUDFLARE PAGES'],
        recommended: true
      }
    ],
    projects: [
      {
        id: 'proj-microservice',
        title: 'Enterprise Microservice Architecture',
        category: 'projects',
        icon: <Server className="w-5 h-5 text-emerald-600" />,
        description: 'Decoupled event-driven backend microservices with Kafka, Redis caching, and Kubernetes orchestration.',
        tags: ['KUBERNETES', 'KAFKA', 'GO / RUST', 'MULTI-REGION']
      },
      {
        id: 'proj-ai-agent',
        title: 'Autonomous AI Agent System',
        category: 'projects',
        icon: <Sparkles className="w-5 h-5 text-purple-600" />,
        description: 'Multi-agent orchestration pipeline with vector databases, memory buffers, and custom LLM tool calling.',
        tags: ['LANGGRAPH', 'PGVECTOR', 'MULTI-AGENT', 'STREAMING'],
        recommended: true
      }
    ],
    mobile: [
      {
        id: 'mob-react-native',
        title: 'Universal Cross-Platform Mobile App',
        category: 'mobile',
        icon: <Smartphone className="w-5 h-5 text-sky-600" />,
        description: 'Single codebase targeting iOS and Android built on Expo React Native with native animations and offline sync.',
        tags: ['EXPO', 'REACT NATIVE', 'OFFLINE SYNC', 'TAILWIND']
      },
      {
        id: 'mob-flutter',
        title: 'High-Performance Flutter App',
        category: 'mobile',
        icon: <Zap className="w-5 h-5 text-cyan-600" />,
        description: '60fps GPU-accelerated mobile experiences with Dart, Firebase push notifications, and biometric auth.',
        tags: ['FLUTTER', 'DART', 'FIREBASE', 'BIOMETRICS']
      }
    ],
    ecommerce: [
      {
        id: 'ecom-store',
        title: 'Headless E-Commerce Storefront',
        category: 'ecommerce',
        icon: <ShoppingCart className="w-5 h-5 text-amber-600" />,
        description: 'High-converting headless storefront with Stripe Elements checkout, cart persistence, and dynamic inventory.',
        tags: ['NEXT.JS', 'STRIPE', 'MEDUSA / SHOPIFY', 'SSR']
      },
      {
        id: 'ecom-marketplace',
        title: 'Multi-Vendor Marketplace Platform',
        category: 'ecommerce',
        icon: <Boxes className="w-5 h-5 text-orange-600" />,
        description: 'Scalable merchant platform with vendor onboarding, split payouts, order fulfillment, and reviews.',
        tags: ['MULTI-TENANT', 'ESCROW PAYMENTS', 'GRAPHQL', 'ADMIN PORTAL']
      }
    ],
    existing: [
      {
        id: 'ext-github',
        title: 'Import GitHub / GitLab Repository',
        category: 'existing',
        icon: <GitBranch className="w-5 h-5 text-slate-800" />,
        description: 'Connect your existing remote repo to analyze architecture, generate missing documentation, and run automated refactoring.',
        tags: ['GITHUB CI/CD', 'AUTO-SCAFFOLD', 'LINTERS', 'PR BOT']
      },
      {
        id: 'ext-archive',
        title: 'Upload Local Archive / Monorepo',
        category: 'existing',
        icon: <Terminal className="w-5 h-5 text-blue-700" />,
        description: 'Drop a .zip or configure local file watcher to inspect dependencies and attach SNS Square AI Copilot.',
        tags: ['ZIP UPLOAD', 'MONOREPO', 'AST PARSER', 'INSTANT SYNC']
      }
    ]
  };

  // Templates Data matching Image 1
  const templates: TemplateOption[] = [
    {
      id: 'tpl-1',
      title: 'Modern Bistro & Restaurant',
      category: 'restaurant',
      categoryLabel: 'Restaurant',
      description: 'Elegant digital menu, table reservation engine, and Stripe order checkout.',
      imageBg: 'from-amber-50 to-orange-100/60',
      accentColor: 'border-amber-200 text-amber-800 bg-amber-50',
      framework: 'Next.js + Tailwind',
      stars: 142
    },
    {
      id: 'tpl-2',
      title: 'SaaS & Enterprise Services Platform',
      category: 'service',
      categoryLabel: 'Service',
      description: 'Subscription pricing tiers, feature comparison tables, and customer testimonials.',
      imageBg: 'from-blue-50 to-indigo-100/60',
      accentColor: 'border-blue-200 text-blue-800 bg-blue-50',
      framework: 'React + Hono',
      stars: 389
    },
    {
      id: 'tpl-3',
      title: 'Executive Portfolio & Resume',
      category: 'personal',
      categoryLabel: 'Personal',
      description: 'Interactive case studies, project timelines, skill radar, and contact form.',
      imageBg: 'from-emerald-50 to-teal-100/60',
      accentColor: 'border-emerald-200 text-emerald-800 bg-emerald-50',
      framework: 'Vite + React',
      stars: 215
    },
    {
      id: 'tpl-4',
      title: 'Real-Time Analytics & Data Exhibition',
      category: 'data',
      categoryLabel: 'Data Exhibition',
      description: 'Interactive data charts, filtering matrix, exportable CSVs, and dark mode.',
      imageBg: 'from-purple-50 to-violet-100/60',
      accentColor: 'border-purple-200 text-purple-800 bg-purple-50',
      framework: 'Next.js + D3.js',
      stars: 490
    },
    {
      id: 'tpl-5',
      title: 'Artisan Bakery & Cafe Store',
      category: 'restaurant',
      categoryLabel: 'Restaurant',
      description: 'Daily fresh bakery schedule, cart drawer, and local pickup selector.',
      imageBg: 'from-stone-100 to-amber-100/50',
      accentColor: 'border-amber-200 text-amber-800 bg-amber-50',
      framework: 'React + Shopify',
      stars: 98
    },
    {
      id: 'tpl-6',
      title: 'AI Developer Studio & Documentation',
      category: 'others',
      categoryLabel: 'Others',
      description: 'MDX documentation, live code sandbox, API playground, and syntax highlighter.',
      imageBg: 'from-slate-100 to-slate-200/70',
      accentColor: 'border-slate-300 text-slate-800 bg-slate-100',
      framework: 'Nextra + Tailwind',
      stars: 312
    }
  ];

  const filteredTemplates = useMemo(() => {
    if (selectedTemplateFilter === 'all') return templates;
    return templates.filter(t => t.category === selectedTemplateFilter);
  }, [selectedTemplateFilter]);

  const handleOpenStartModal = (option: ProjectTypeOption) => {
    setSelectedOption(option);
    setSelectedTemplate(null);
    setProjectName(option.title);
    setIsStartModalOpen(true);
  };

  const handleUseTemplate = (tpl: TemplateOption) => {
    setSelectedTemplate(tpl);
    setSelectedOption(null);
    setProjectName(tpl.title);
    setIsStartModalOpen(true);
  };

  const handleConfirmProjectCreation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStartModalOpen(false);
    setProjectCreatedToast(true);
    setTimeout(() => setProjectCreatedToast(false), 3500);
  };

  return (
    <div className="space-y-10 animate-fade-in select-none pb-20 max-w-7xl mx-auto">
      
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
        <span className="text-slate-900 font-semibold">Full Stack</span>
      </nav>

      {/* Quick Launch Solution Builder IDE Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">LIVE WORKSPACE</span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-semibold text-emerald-400">C-Suite Validation Integrated</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              OmniBoard Support Hub & ExpensifyIQ Solution IDE
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Access the live solution builder environment with execution pipeline and executive sign-off layers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('solution-builder-ide')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
        >
          <span>OPEN SOLUTION BUILDER IDE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. "START BUILDING SOMETHING GREAT" SECTION */}
      <section className="space-y-8 pt-2">
        
        {/* Section Heading: Centered on a Single Line with Multicolor Gradient */}
        <div className="text-center max-w-5xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight leading-tight whitespace-nowrap">
            <span className="text-[#0F172A]">Start Building </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            Pick a category to get started.
          </p>
        </div>

        {/* Category Selector Cards: Matching Image 2 Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-1">
          
          {/* 1. Projects */}
          <button
            type="button"
            onClick={() => setSelectedCategory('projects')}
            className={`p-3 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
              selectedCategory === 'projects'
                ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white border border-blue-500 shadow-md shadow-blue-500/15'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selectedCategory === 'projects'
                ? 'bg-blue-800/60 text-white border border-blue-400/40'
                : 'bg-white border border-slate-200/80 text-slate-900'
            }`}>
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs sm:text-sm font-bold truncate ${
                selectedCategory === 'projects' ? 'text-white' : 'text-slate-900'
              }`}>
                Projects
              </div>
              <div className={`text-[11px] truncate ${
                selectedCategory === 'projects' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                Build from scratch
              </div>
            </div>
          </button>

          {/* 2. Web */}
          <button
            type="button"
            onClick={() => setSelectedCategory('web')}
            className={`p-3 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
              selectedCategory === 'web'
                ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white border border-blue-500 shadow-md shadow-blue-500/15'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selectedCategory === 'web'
                ? 'bg-blue-800/60 text-white border border-blue-400/40'
                : 'bg-white border border-slate-200/80 text-slate-900'
            }`}>
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs sm:text-sm font-bold truncate ${
                selectedCategory === 'web' ? 'text-white' : 'text-slate-900'
              }`}>
                Web
              </div>
              <div className={`text-[11px] truncate ${
                selectedCategory === 'web' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                Web experiences
              </div>
            </div>
          </button>

          {/* 3. Mobile Apps */}
          <button
            type="button"
            onClick={() => setSelectedCategory('mobile')}
            className={`p-3 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
              selectedCategory === 'mobile'
                ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white border border-blue-500 shadow-md shadow-blue-500/15'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selectedCategory === 'mobile'
                ? 'bg-blue-800/60 text-white border border-blue-400/40'
                : 'bg-white border border-slate-200/80 text-slate-900'
            }`}>
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs sm:text-sm font-bold truncate ${
                selectedCategory === 'mobile' ? 'text-white' : 'text-slate-900'
              }`}>
                Mobile Apps
              </div>
              <div className={`text-[11px] truncate ${
                selectedCategory === 'mobile' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                iOS & Android
              </div>
            </div>
          </button>

          {/* 4. E-commerce */}
          <button
            type="button"
            onClick={() => setSelectedCategory('ecommerce')}
            className={`p-3 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
              selectedCategory === 'ecommerce'
                ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white border border-blue-500 shadow-md shadow-blue-500/15'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selectedCategory === 'ecommerce'
                ? 'bg-blue-800/60 text-white border border-blue-400/40'
                : 'bg-white border border-slate-200/80 text-slate-900'
            }`}>
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs sm:text-sm font-bold truncate ${
                selectedCategory === 'ecommerce' ? 'text-white' : 'text-slate-900'
              }`}>
                E-commerce
              </div>
              <div className={`text-[11px] truncate ${
                selectedCategory === 'ecommerce' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                Sell and scale
              </div>
            </div>
          </button>

          {/* 5. Existing code */}
          <button
            type="button"
            onClick={() => setSelectedCategory('existing')}
            className={`p-3 rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer ${
              selectedCategory === 'existing'
                ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white border border-blue-500 shadow-md shadow-blue-500/15'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selectedCategory === 'existing'
                ? 'bg-blue-800/60 text-white border border-blue-400/40'
                : 'bg-white border border-slate-200/80 text-slate-900'
            }`}>
              <GitBranch className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs sm:text-sm font-bold truncate ${
                selectedCategory === 'existing' ? 'text-white' : 'text-slate-900'
              }`}>
                Existing code
              </div>
              <div className={`text-[11px] truncate ${
                selectedCategory === 'existing' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                Use your codebase
              </div>
            </div>
          </button>

        </div>

        {/* Category Option Cards (2 Columns as shown in Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryOptions[selectedCategory].map((opt) => (
            <div
              key={opt.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group relative"
            >
              <div>
                {/* Header with Icon, Title, and Start Button */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                      {opt.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {opt.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleOpenStartModal(opt)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <span>Start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 mb-6">
                  {opt.description}
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                {opt.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/60 text-[10px] font-bold text-slate-600 tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4. "START FROM A TEMPLATE" SECTION (Image 1 Bottom Section) */}
        <div className="space-y-5 pt-6">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Start from a template</h3>
              <p className="text-xs text-slate-500">Kickstart your production build with verified architectures & pre-configured stacks.</p>
            </div>

            <button
              onClick={() => setSelectedTemplateFilter('all')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View all templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Template Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: 'all', label: 'All Templates' },
              { id: 'restaurant', label: 'Restaurant' },
              { id: 'service', label: 'Service' },
              { id: 'personal', label: 'Personal' },
              { id: 'data', label: 'Data Exhibition' },
              { id: 'others', label: 'Others' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedTemplateFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedTemplateFilter === f.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                {/* Visual Thumbnail Area */}
                <div className={`h-36 sm:h-40 bg-gradient-to-br ${tpl.imageBg} border-b border-slate-200/60 p-4 flex flex-col justify-between relative overflow-hidden`}>
                  {/* Subtle Grid Mockup Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
                  
                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tpl.accentColor}`}>
                      {tpl.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/70 shadow-2xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {tpl.stars}
                    </span>
                  </div>

                  {/* Mock Browser Header */}
                  <div className="relative z-10 bg-white/90 backdrop-blur-xs rounded-xl p-2.5 shadow-xs border border-slate-200/80 group-hover:translate-y-[-2px] transition-transform">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div className="w-24 h-1.5 bg-slate-200 rounded-full ml-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="w-3/4 h-2 bg-slate-300 rounded-full" />
                      <div className="w-1/2 h-1.5 bg-slate-200 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Card Content & CTAs */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tpl.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {tpl.framework}
                    </span>

                    <button
                      onClick={() => handleUseTemplate(tpl)}
                      className="px-3 py-1.5 bg-[#0F172A] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    >
                      <span>Use Template</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* MODAL: PROJECT CREATION SETUP */}
      {isStartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Configure Solution Pipeline
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedOption?.title || selectedTemplate?.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsStartModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmProjectCreation} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Database Layer</label>
                  <select
                    value={projectDb}
                    onChange={(e) => setProjectDb(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400 text-slate-800"
                  >
                    <option value="PostgreSQL (Supabase / Neon)">PostgreSQL (Neon)</option>
                    <option value="Cloudflare D1 (SQLite)">Cloudflare D1</option>
                    <option value="MongoDB Atlas">MongoDB Atlas</option>
                    <option value="Redis KV">Redis KV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Deployment Target</label>
                  <select
                    value={projectDeploy}
                    onChange={(e) => setProjectDeploy(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400 text-slate-800"
                  >
                    <option value="Cloudflare Pages & Workers">Cloudflare Pages</option>
                    <option value="Vercel Edge">Vercel Edge</option>
                    <option value="AWS Lambda & S3">AWS ECS / S3</option>
                    <option value="Docker Container">Docker Container</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Autonomous Pipeline Setup</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  SNS Square will provision repository scaffolding, generate API schemas, configure authentication guards, and wire CI/CD deployment pipelines.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStartModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F172A] hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Launch Solution Builder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NOTIFICATION TOAST */}
      {projectCreatedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Solution Pipeline Initialized</div>
            <div className="text-[11px] text-slate-400">Scaffolding workspace generated successfully.</div>
          </div>
        </div>
      )}

    </div>
  );
};
export default SolutionBuilderFullStack;
