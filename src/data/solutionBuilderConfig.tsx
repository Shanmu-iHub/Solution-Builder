import React from 'react';
import {
  Box,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  Cloud,
  Store,
  Compass,
  Monitor,
  Code,
  Sliders,
  Activity,
  DollarSign,
  FileText,
  Clock,
  ShieldCheck,
  Cpu,
  Bot,
  Infinity as InfinityIcon,
  FlaskConical,
  BarChart2,
  MessageSquare
} from 'lucide-react';
import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';

export const solutionBuilderConfigs: Record<string, OfferingLandingConfig> = {
  'solution-architect': {
    id: 'solution-architect',
    type: 'product',
    breadcrumbCategory: 'Build & Create',
    badgeTitle: 'Solution Architect',
    badgeIcon: <Box className="w-3.5 h-3.5 text-blue-600" />,
    heroIcon: <Box className="w-6 h-6" />,
    heroIconBg: 'bg-blue-50/90',
    heroIconColor: 'text-blue-700',
    heroIconBorder: 'border-blue-100/80',
    headline1: 'Autonomous system design.',
    headline2: 'Full-stack cloud architectures.',
    subtitle: 'Generate enterprise-ready fullstack architectures, data schemas, API contracts, and infrastructure blueprints from high-level product specifications.',
    openButtonText: 'Open Architect',
    heroIllustration: {
      cardTitle: 'Full-Stack Architecture Blueprint',
      cardSub: 'Auto-Generated Topology',
      cardBadge: '100% Production Ready',
      annotationText: 'Microservices & IaC\nZero Boilerplate',
      checklist: ['End-to-End System Topologies', 'OpenAPI & Database Schemas', 'Terraform & Kubernetes IaC'],
      bars: [
        { height: '40%', bg: 'bg-blue-300' },
        { height: '60%', bg: 'bg-blue-400' },
        { height: '80%', bg: 'bg-blue-500' },
        { height: '95%', bg: 'bg-blue-600' },
        { height: '70%', bg: 'bg-blue-400' },
        { height: '100%', bg: 'bg-[#2563EB]' }
      ]
    },
    metrics: [
      { label: 'Architecture Build Time', value: '< 45 Secs', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Production Readiness', value: '100%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Supported Cloud Providers', value: 'AWS, Azure, GCP', icon: <Cloud className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Generated Lines of IaC', value: '25,000+', icon: <Code className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Autonomous architecture generation from requirement prompts to deployable code',
    capabilities: [
      {
        id: 'topology-gen',
        number: '01',
        title: 'Microservices Topology Synthesis',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Generate decoupled microservice architectures with asynchronous event brokers and API gateways.',
        features: ['Event-driven Kafka & RabbitMQ messaging', 'REST, gRPC, and GraphQL service definitions', 'Database partitioning & caching strategies', 'Automated security perimeter mapping'],
        preview: {
          title: 'System Topology',
          bars: [{ label: 'Gateway', val1: 100, val2: 98 }, { label: 'Auth', val1: 100, val2: 98 }, { label: 'Order', val1: 98, val2: 95 }, { label: 'Event', val1: 100, val2: 99 }, { label: 'DB', val1: 100, val2: 100 }],
          providers: [{ name: 'Microservices Topologies', amount: '12 Connected', color: 'bg-blue-600' }, { name: 'Event Brokers', amount: 'Kafka / NATS', color: 'bg-emerald-500' }, { name: 'Latency Budget', amount: '< 35ms P99', color: 'bg-purple-600' }, { name: 'Security Perimeter', amount: 'Zero Trust', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'db-schema-gen',
        number: '02',
        title: 'Database Schema & ORM Compiler',
        icon: <Database className="w-4 h-4" />,
        tagline: 'Synthesize relational PostgreSQL, MongoDB, and Redis schemas with foreign keys and migrations.',
        features: ['Prisma, Drizzle, and TypeORM schemas', 'Automated index & performance tuning', 'ACID transaction boundary maps', 'Data migration scripts generator'],
        preview: {
          title: 'Schema Definition Board',
          bars: [{ label: 'Tables', val1: 95, val2: 90 }, { label: 'Indexes', val1: 100, val2: 98 }, { label: 'FKs', val1: 100, val2: 100 }, { label: 'ORM', val1: 100, val2: 98 }, { label: 'Migrate', val1: 98, val2: 95 }],
          providers: [{ name: 'Generated Tables', amount: '36 Entities', color: 'bg-blue-600' }, { name: 'ORM Client', amount: 'Prisma / Drizzle', color: 'bg-emerald-500' }, { name: 'Query Indexing', amount: 'Optimized', color: 'bg-purple-600' }, { name: 'Type Safety', amount: '100% Strict', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'iac-generator',
        number: '03',
        title: '1-Click Terraform & Kubernetes IaC',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Export production-grade Terraform modules, Helm charts, and GitHub Actions CI workflows.',
        features: ['Multi-cloud Terraform modules', 'Kubernetes Helm manifests & ingress', 'AWS VPC, EKS, RDS, and S3 configs', 'Automated security linting (Checkov)'],
        preview: {
          title: 'IaC Synthesis Feed',
          bars: [{ label: 'Terra', val1: 100, val2: 100 }, { label: 'Helm', val1: 100, val2: 98 }, { label: 'VPC', val1: 100, val2: 100 }, { label: 'K8s', val1: 98, val2: 95 }, { label: 'Lint', val1: 100, val2: 100 }],
          providers: [{ name: 'Terraform Modules', amount: '100% Validated', color: 'bg-emerald-500' }, { name: 'Helm Manifests', amount: 'Production Ready', color: 'bg-blue-600' }, { name: 'Security Score', amount: '0 Checkov Flags', color: 'bg-purple-600' }, { name: 'Deploy Time', amount: '< 10 Mins', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'cost-estimation',
        number: '04',
        title: 'Automated Cloud Cost Estimation',
        icon: <DollarSign className="w-4 h-4" />,
        tagline: 'Get accurate monthly AWS, Azure, and GCP cost projections for your generated architecture before deploying.',
        features: ['Real-time cloud pricing API lookup', 'Tiered traffic cost projection models', 'Right-sized instance tier recommendation', 'Cost reduction recommendations'],
        preview: {
          title: 'Estimated Cloud Costs',
          bars: [{ label: 'Compute', val1: 80, val2: 60 }, { label: 'DB', val1: 65, val2: 45 }, { label: 'Net', val1: 40, val2: 25 }, { label: 'Store', val1: 30, val2: 20 }, { label: 'Total', val1: 90, val2: 70 }],
          providers: [{ name: 'Estimated Spend', amount: '$420 / mo', color: 'bg-emerald-500' }, { name: 'Optimized Savings', amount: '-34% vs Default', color: 'bg-blue-600' }, { name: 'Reserved Instance ROI', amount: '2.4x Faster', color: 'bg-purple-600' }, { name: 'Accuracy', amount: '98% Historical', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'api-contract-builder',
        number: '05',
        title: 'OpenAPI & SDK Client Generator',
        icon: <Compass className="w-4 h-4" />,
        tagline: 'Generate OpenAPI 3.1 specifications and typed client SDKs for TypeScript, Python, and Go.',
        features: ['OpenAPI 3.1 & Swagger documentation', 'TypeScript end-to-end type safety', 'Mock server automated endpoint generator', 'Zod validation schemas'],
        preview: {
          title: 'API Contracts',
          bars: [{ label: 'OpenAPI', val1: 100, val2: 100 }, { label: 'Zod', val1: 100, val2: 98 }, { label: 'TS SDK', val1: 100, val2: 100 }, { label: 'Py SDK', val1: 98, val2: 95 }, { label: 'Mock', val1: 100, val2: 100 }],
          providers: [{ name: 'OpenAPI Version', amount: 'v3.1.0', color: 'bg-emerald-500' }, { name: 'Generated Endpoints', amount: '48 Routes', color: 'bg-blue-600' }, { name: 'Client SDKs', amount: 'TS / Python / Go', color: 'bg-purple-600' }, { name: 'Validation Errors', amount: '0 Strict', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'ai-gateway-config',
        number: '06',
        title: 'AI Gateway & Agent Topology',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Incorporate intelligent LLM routing, semantic caching, vector databases, and agent tools into your architecture.',
        features: ['Pinecone, Qdrant & pgvector embeddings', 'Semantic token cache gateways', 'Autonomous agent supervisor loops', 'Multi-model fallback redundancy'],
        preview: {
          title: 'AI Mesh Architecture',
          bars: [{ label: 'Gateway', val1: 100, val2: 98 }, { label: 'Vector', val1: 98, val2: 95 }, { label: 'Cache', val1: 100, val2: 99 }, { label: 'Agent', val1: 96, val2: 92 }, { label: 'Router', val1: 100, val2: 100 }],
          providers: [{ name: 'Vector DB', amount: 'pgvector / Qdrant', color: 'bg-blue-600' }, { name: 'Semantic Cache Hit', amount: '38%', color: 'bg-emerald-500' }, { name: 'Agent Chains', amount: 'Supervised', color: 'bg-purple-600' }, { name: 'LLM Fallback', amount: 'Zero-Downtime', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'compliance-by-design',
        number: '07',
        title: 'Compliance & Security by Design',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Every generated architecture adheres strictly to SOC 2, HIPAA, and GDPR encryption and isolation standards.',
        features: ['Encryption in-transit (TLS 1.3) & at rest', 'Automated IAM least-privilege policies', 'VPC private subnet isolation', 'Immutable audit logging hooks'],
        preview: {
          title: 'Security Compliance',
          bars: [{ label: 'TLS', val1: 100, val2: 100 }, { label: 'IAM', val1: 100, val2: 100 }, { label: 'VPC', val1: 100, val2: 98 }, { label: 'Audit', val1: 100, val2: 100 }, { label: 'SOC2', val1: 100, val2: 100 }],
          providers: [{ name: 'Security Grade', amount: 'Grade A+', color: 'bg-emerald-500' }, { name: 'IAM Overpermission', amount: '0 Detected', color: 'bg-blue-600' }, { name: 'SOC 2 Ready', amount: 'Certified', color: 'bg-purple-600' }, { name: 'Network Isolation', amount: 'Private Subnets', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'export-deploy',
        number: '08',
        title: 'Direct Cloud Deployment Engine',
        icon: <Cloud className="w-4 h-4" />,
        tagline: 'Push your entire generated solution directly to AWS, Azure, GCP, or GitHub in 1 click.',
        features: ['Automated GitHub repository creation', 'Direct AWS/Azure cloud credentials sync', 'Continuous deployment pipeline bootstrap', 'Live environment provisioning telemetry'],
        preview: {
          title: 'Deployment Pipeline',
          bars: [{ label: 'Git', val1: 100, val2: 100 }, { label: 'IaC', val1: 100, val2: 98 }, { label: 'VPC', val1: 100, val2: 100 }, { label: 'Cluster', val1: 98, val2: 95 }, { label: 'Live', val1: 100, val2: 100 }],
          providers: [{ name: '1-Click Deploy', amount: 'Enabled', color: 'bg-emerald-500' }, { name: 'GitHub Repo Sync', amount: 'Automated', color: 'bg-blue-600' }, { name: 'Provision Time', amount: '< 8 Mins', color: 'bg-purple-600' }, { name: 'Environment Status', amount: 'Live Production', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Design and deploy enterprise software architectures in minutes',
    useCases: [
      { id: 'sa-uc1', title: 'Full-Stack SaaS Architecture', desc: 'Design microservices, databases, and APIs from product specs.', icon: <Box className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'sa-uc2', title: 'Automated IaC Generation', desc: 'Export production-ready Terraform and Helm charts instantly.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'sa-uc3', title: 'AI-Native Applications', desc: 'Incorporate LLM gateways, vector DBs, and caching by default.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'sa-uc4', title: 'Pre-Deployment Cost Estimator', desc: 'Forecast exact cloud infrastructure bills before running Terraform.', icon: <DollarSign className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your clouds, repositories, and IaC tools',
    integrations: [
      { name: 'Terraform', logoKey: 'terraform' },
      { name: 'Kubernetes', logoKey: 'kubernetes' },
      { name: 'AWS Cloud', logoKey: 'aws' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Google Cloud', logoKey: 'gcp' },
      { name: 'GitHub Actions', logoKey: 'github' },
      { name: 'Docker Registry', logoKey: 'docker' }
    ],
    ctaTitle: 'Ready to architect your enterprise solution?',
    ctaSubtitle: 'Enter your project description and generate a complete production architecture in 45 seconds.',
    relatedHeadline: 'Explore related Solution Builder & operational tools',
    relatedOfferings: [
      { id: 'solution-factor', type: 'product', name: 'Solution Factor', desc: 'Component synthesis.', icon: <Layers className="w-4 h-4" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-700', iconBorder: 'border-indigo-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Streamline CI/CD deployment.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize multi-cloud costs.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'compliance', type: 'product', name: 'Compliance', desc: 'Automate audit controls.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'testing', type: 'product', name: 'Testing', desc: 'Automate synthetic evals.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' }
    ],
    videoModal: {
      title: 'Solution Architect Walkthrough',
      subtitle: 'Autonomous System Architecture & IaC Synthesis',
      heroCardTitle: 'Watch Architecture Synthesis in Action',
      heroCardDesc: 'See how SNS Square Solution Architect converts product requirements into microservice topologies, database schemas, and deployable Terraform code.',
      highlights: [{ label: '< 45s', sub: 'Synthesis speed' }, { label: '100% Validated', sub: 'Production IaC' }, { label: 'Multi-Cloud', sub: 'AWS / Azure / GCP' }]
    }
  },

  'solution-factor': {
    id: 'solution-factor',
    type: 'product',
    breadcrumbCategory: 'Build & Create',
    badgeTitle: 'Solution Factor',
    badgeIcon: <Layers className="w-3.5 h-3.5 text-indigo-600" />,
    heroIcon: <Layers className="w-6 h-6" />,
    heroIconBg: 'bg-indigo-50/90',
    heroIconColor: 'text-indigo-700',
    heroIconBorder: 'border-indigo-100/80',
    headline1: 'Design-to-code compiler.',
    headline2: 'Component factory synthesizer.',
    subtitle: 'Generate pixel-perfect React, Next.js, and Tailwind components, full-stack API routes, and interactive UI design systems in real time.',
    openButtonText: 'Open Solution Factor',
    heroIllustration: {
      cardTitle: 'Component Synthesis Pipeline',
      cardSub: 'Design-to-Code Compiler',
      cardBadge: '100% Clean Code',
      annotationText: 'TypeScript React\nInstant Scaffolding',
      checklist: ['Pixel-Perfect UI Components', 'Full-Stack Next.js Routes', 'Accessible WCAG 2.1 AA'],
      bars: [
        { height: '40%', bg: 'bg-indigo-300' },
        { height: '60%', bg: 'bg-indigo-400' },
        { height: '80%', bg: 'bg-indigo-500' },
        { height: '95%', bg: 'bg-indigo-600' },
        { height: '70%', bg: 'bg-indigo-400' },
        { height: '100%', bg: 'bg-[#4F46E5]' }
      ],
      curveColor: '#4F46E5'
    },
    metrics: [
      { label: 'Component Scaffolding Time', value: '< 2.5s', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconBorder: 'border-indigo-100' },
      { label: 'Design Fidelity Score', value: '100% Exact', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Supported Frameworks', value: 'React, Next, Vue', icon: <Code className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Accessibility Standard', value: 'WCAG 2.1 AA', icon: <ShieldCheck className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    capabilitiesHeadline: 'From Figma designs and prompts to production-grade clean code',
    capabilities: [
      {
        id: 'figma-compiler',
        number: '01',
        title: 'Figma-to-React Code Compiler',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Convert Figma designs and wireframes directly into modular, responsive TypeScript React code.',
        features: ['Auto-layout to flexbox & grid conversion', 'Design tokens & color palette extraction', 'Clean semantic HTML5 structure', 'Zero arbitrary hardcoded pixel values'],
        preview: {
          title: 'Figma Compiler Board',
          bars: [{ label: 'Figma', val1: 100, val2: 100 }, { label: 'Tokens', val1: 100, val2: 98 }, { label: 'React', val1: 100, val2: 100 }, { label: 'Tailwind', val1: 100, val2: 100 }, { label: 'A11y', val1: 100, val2: 98 }],
          providers: [{ name: 'Compiler Accuracy', amount: 'Pixel-Perfect', color: 'bg-emerald-500' }, { name: 'Extracted Tokens', amount: '100% Match', color: 'bg-indigo-600' }, { name: 'Syntax Quality', amount: 'TypeScript Strict', color: 'bg-blue-600' }, { name: 'Generation Speed', amount: '1.8 secs', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'design-system',
        number: '02',
        title: 'Design System & Storybook Suite',
        icon: <Box className="w-4 h-4" />,
        tagline: 'Synthesize complete design systems with buttons, modals, dropdowns, and Storybook stories.',
        features: ['Automated Storybook documentation stories', 'Dark mode & high-contrast theme support', 'Keyboard navigation & focus management', 'Framer Motion micro-animations'],
        preview: {
          title: 'Design System Index',
          bars: [{ label: 'Buttons', val1: 100, val2: 100 }, { label: 'Modals', val1: 100, val2: 98 }, { label: 'Tables', val1: 100, val2: 100 }, { label: 'Forms', val1: 98, val2: 95 }, { label: 'Stories', val1: 100, val2: 100 }],
          providers: [{ name: 'Synthesized Components', amount: '64 Components', color: 'bg-indigo-600' }, { name: 'Storybook Stories', amount: '100% Generated', color: 'bg-emerald-500' }, { name: 'Dark Mode Support', amount: 'Native', color: 'bg-blue-600' }, { name: 'Motion Animations', amount: 'Included', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'fullstack-routes',
        number: '03',
        title: 'Full-Stack Next.js App Router',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Scaffold Next.js App Router pages with Server Components, Server Actions, and Prisma queries.',
        features: ['React Server Components (RSC) optimization', 'Server Actions with optimistic UI updates', 'Zod request validation on form submits', 'Authentication & middleware protection'],
        preview: {
          title: 'Next.js App Router',
          bars: [{ label: 'Pages', val1: 100, val2: 100 }, { label: 'RSC', val1: 100, val2: 98 }, { label: 'Actions', val1: 100, val2: 100 }, { label: 'Zod', val1: 100, val2: 100 }, { label: 'Auth', val1: 100, val2: 100 }],
          providers: [{ name: 'Architecture Pattern', amount: 'Next.js 15 App', color: 'bg-emerald-500' }, { name: 'Server Actions', amount: 'Type-Safe', color: 'bg-indigo-600' }, { name: 'Lighthouse Score', amount: '100 Performance', color: 'bg-blue-600' }, { name: 'SSR Optimization', amount: 'Zero Waterfall', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'live-sandbox',
        number: '04',
        title: 'Live Interactive Web Sandbox',
        icon: <Monitor className="w-4 h-4" />,
        tagline: 'Preview, edit, and interact with generated code in a real-time browser sandbox environment.',
        features: ['Hot-module reloading in browser', 'Visual component inspector & editor', 'Console log & error boundary debugger', 'Exportable ZIP or direct GitHub PR push'],
        preview: {
          title: 'Live Sandbox Stream',
          bars: [{ label: 'Render', val1: 100, val2: 100 }, { label: 'HMR', val1: 100, val2: 99 }, { label: 'Edit', val1: 98, val2: 95 }, { label: 'Zip', val1: 100, val2: 100 }, { label: 'Push', val1: 100, val2: 100 }],
          providers: [{ name: 'HMR Reload Speed', amount: '< 40ms', color: 'bg-emerald-500' }, { name: 'Live Sandbox', amount: 'Sandpack Powered', color: 'bg-indigo-600' }, { name: 'Visual Editing', amount: 'Enabled', color: 'bg-blue-600' }, { name: 'GitHub Export', amount: '1-Click', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'accessibility-wcag',
        number: '05',
        title: 'Automated WCAG 2.1 AA Accessibility',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Every component includes ARIA attributes, keyboard focus states, and color contrast compliance.',
        features: ['Automated axe-core accessibility checks', 'Screen-reader friendly semantic tags', 'TabIndex & keyboard focus traps', 'Color contrast ratio > 4.5:1 guarantee'],
        preview: {
          title: 'Accessibility Scanner',
          bars: [{ label: 'ARIA', val1: 100, val2: 100 }, { label: 'Contrast', val1: 100, val2: 100 }, { label: 'Keyboard', val1: 100, val2: 100 }, { label: 'Screen', val1: 100, val2: 98 }, { label: 'Score', val1: 100, val2: 100 }],
          providers: [{ name: 'WCAG Standard', amount: 'Level AA Passed', color: 'bg-emerald-500' }, { name: 'axe-core Violations', amount: '0 Violations', color: 'bg-indigo-600' }, { name: 'Contrast Ratio', amount: '7:1 (AAA Ready)', color: 'bg-blue-600' }, { name: 'Screen Reader', amount: 'VoiceOver / NVDA', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'state-management',
        number: '06',
        title: 'State Management & API Hooks',
        icon: <Sliders className="w-4 h-4" />,
        tagline: 'Generate TanStack Query (React Query), Zustand, and Redux Toolkit data fetching hooks.',
        features: ['Automated optimistic mutations', 'SWR cache invalidation triggers', 'Zustand global state store generation', 'Infinite scroll & pagination utilities'],
        preview: {
          title: 'State Store Engine',
          bars: [{ label: 'Query', val1: 100, val2: 100 }, { label: 'Cache', val1: 100, val2: 98 }, { label: 'Store', val1: 100, val2: 100 }, { label: 'Optimist', val1: 98, val2: 95 }, { label: 'Hydrate', val1: 100, val2: 100 }],
          providers: [{ name: 'Data Fetching', amount: 'TanStack Query v5', color: 'bg-emerald-500' }, { name: 'Global Store', amount: 'Zustand 5', color: 'bg-indigo-600' }, { name: 'Optimistic UI', amount: 'Zero Lag', color: 'bg-blue-600' }, { name: 'Bundle Size', amount: '< 8 KB', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'ai-prompt-refine',
        number: '07',
        title: 'Conversational UI Refinement',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Ask AI to tweak padding, change color schemes, add animations, or add sorting with natural dialogue.',
        features: ['Natural language UI diffs', 'Undo/redo change history', 'Granular component selection', 'Contextual code diff viewer'],
        preview: {
          title: 'Refinement History',
          bars: [{ label: 'Prompt 1', val1: 95, val2: 90 }, { label: 'Prompt 2', val1: 98, val2: 95 }, { label: 'Prompt 3', val1: 100, val2: 98 }, { label: 'Diff', val1: 100, val2: 100 }, { label: 'Apply', val1: 100, val2: 100 }],
          providers: [{ name: 'Refinement Speed', amount: '< 1.2s', color: 'bg-emerald-500' }, { name: 'Diff Accuracy', amount: 'Surgical', color: 'bg-indigo-600' }, { name: 'History Steps', amount: 'Unlimited', color: 'bg-blue-600' }, { name: 'Revert Support', amount: '1-Click', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'github-sync-cli',
        number: '08',
        title: 'GitHub PR & Monorepo Export',
        icon: <Cloud className="w-4 h-4" />,
        tagline: 'Commit synthesized components directly into your Next.js or Turborepo monorepo with clean PRs.',
        features: ['Automated PR creation with visual screenshots', 'Turborepo & Nx monorepo compatibility', 'Package.json dependency resolver', 'ESLint & Prettier automated formatting'],
        preview: {
          title: 'GitHub PR Integration',
          bars: [{ label: 'Branch', val1: 100, val2: 100 }, { label: 'Format', val1: 100, val2: 100 }, { label: 'Lint', val1: 100, val2: 100 }, { label: 'PR', val1: 100, val2: 100 }, { label: 'Merge', val1: 100, val2: 100 }],
          providers: [{ name: 'GitHub Integration', amount: 'Native App', color: 'bg-emerald-500' }, { name: 'ESLint Rules', amount: '0 Errors', color: 'bg-indigo-600' }, { name: 'PR Screenshots', amount: 'Attached', color: 'bg-blue-600' }, { name: 'Merge Readiness', amount: 'Green Checks', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Build and ship beautiful user interfaces at 10x speed',
    useCases: [
      { id: 'sf-uc1', title: 'Figma to React Scaffolding', desc: 'Convert design mockups into pixel-clean TypeScript components.', icon: <Layers className="w-5 h-5" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconBorder: 'border-indigo-100' },
      { id: 'sf-uc2', title: 'Full-Stack Next.js Apps', desc: 'Synthesize pages with Server Actions, validation, and database queries.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'sf-uc3', title: 'Enterprise Design Systems', desc: 'Build accessible, themeable UI components with Storybook stories.', icon: <Box className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'sf-uc4', title: 'Rapid Prototype to Production', desc: 'Preview live components in browser sandboxes and push clean PRs.', icon: <Monitor className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    integrationsHeadline: 'Connects to your frontend frameworks and tools',
    integrations: [
      { name: 'Figma Export', logoKey: 'figma' },
      { name: 'GitHub Actions', logoKey: 'github' },
      { name: 'Docker Registry', logoKey: 'docker' },
      { name: 'AWS Cloudfront', logoKey: 'aws' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'Terraform', logoKey: 'terraform' }
    ],
    ctaTitle: 'Ready to synthesize frontend components?',
    ctaSubtitle: 'Paste a Figma link or describe your interface and get production React code in seconds.',
    relatedHeadline: 'Explore related Solution Builder & development products',
    relatedOfferings: [
      { id: 'solution-architect', type: 'product', name: 'Solution Architect', desc: 'System architecture.', icon: <Box className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Streamline CI/CD deployment.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'testing', type: 'product', name: 'Testing', desc: 'Automate synthetic evals.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize multi-cloud costs.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Transform data to insights.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' }
    ],
    videoModal: {
      title: 'Solution Factor Walkthrough',
      subtitle: 'Design-to-Code Synthesis & Component Factory',
      heroCardTitle: 'Watch Component Synthesis in Action',
      heroCardDesc: 'See how SNS Square Solution Factor compiles Figma frames into TypeScript React, enforces WCAG accessibility, and generates Next.js App Router code.',
      highlights: [{ label: '< 2.5s', sub: 'Synthesis speed' }, { label: 'Pixel-Perfect', sub: 'Figma compiler' }, { label: 'WCAG AA', sub: '100% Accessible' }]
    }
  },

  'ai-models': {
    id: 'ai-models',
    type: 'product',
    breadcrumbCategory: 'Marketplace',
    badgeTitle: 'AI Models Marketplace',
    badgeIcon: <Store className="w-3.5 h-3.5 text-blue-600" />,
    heroIcon: <Store className="w-6 h-6" />,
    heroIconBg: 'bg-blue-50/90',
    heroIconColor: 'text-blue-700',
    heroIconBorder: 'border-blue-100/80',
    headline1: 'Enterprise foundation models.',
    headline2: 'Unified inference marketplace.',
    subtitle: 'Access 150+ top foundation models across text, vision, reasoning, audio, and embeddings with unified billing, latency benchmarking, and intelligent failover.',
    openButtonText: 'Open Marketplace',
    heroIllustration: {
      cardTitle: 'Global Model Marketplace Hub',
      cardSub: 'Unified API & Token Benchmark',
      cardBadge: '150+ Models Live',
      annotationText: 'Multi-Model Router\nLowest Token Rates',
      checklist: ['150+ Leading Foundation Models', 'Unified Billing & API Key', 'Live Latency & Cost Benchmarks'],
      bars: [
        { height: '40%', bg: 'bg-blue-300' },
        { height: '60%', bg: 'bg-blue-400' },
        { height: '80%', bg: 'bg-blue-500' },
        { height: '95%', bg: 'bg-blue-600' },
        { height: '70%', bg: 'bg-blue-400' },
        { height: '100%', bg: 'bg-[#2563EB]' }
      ]
    },
    metrics: [
      { label: 'Available AI Models', value: '150+ Models', icon: <Store className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Inference Latency Advantage', value: '38ms TTFT', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Token Volume Discount', value: 'Up to 45% Off', icon: <DollarSign className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'API Uptime SLA', value: '99.99%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'A single unified API and billing engine for all leading AI models',
    capabilities: [
      {
        id: 'multi-provider-catalog',
        number: '01',
        title: 'Unified Model Catalog & Key',
        icon: <Store className="w-4 h-4" />,
        tagline: 'Access OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, and Cohere with 1 API key and 1 invoice.',
        features: ['OpenAI SDK compatible endpoint format', 'Unified monthly billing reconciliation', 'Instant model switching with 1 string change', 'Zero individual provider contract overhead'],
        preview: {
          title: 'Model Catalog Grid',
          bars: [{ label: 'Claude', val1: 100, val2: 98 }, { label: 'GPT-4o', val1: 100, val2: 98 }, { label: 'Gemini', val1: 98, val2: 95 }, { label: 'Llama', val1: 96, val2: 92 }, { label: 'DeepSeek', val1: 100, val2: 98 }],
          providers: [{ name: 'Claude 3.5 Sonnet', amount: 'Available', color: 'bg-blue-600' }, { name: 'GPT-4o / o1', amount: 'Available', color: 'bg-emerald-500' }, { name: 'Gemini 1.5 Pro', amount: 'Available', color: 'bg-purple-600' }, { name: 'DeepSeek-R1', amount: 'Available', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'latency-benchmarking',
        number: '02',
        title: 'Live Latency & Cost Benchmarks',
        icon: <Activity className="w-4 h-4" />,
        tagline: 'Real-time metrics on Time to First Token (TTFT), tokens per second (TPS), and cost per million tokens.',
        features: ['Live global latency leaderboard', 'Cost per million prompt/completion tokens', 'Quality evaluation ELO leaderboards', 'Historical uptime SLA tracking'],
        preview: {
          title: 'Latency Leaderboard',
          bars: [{ label: 'US-E', val1: 35, val2: 25 }, { label: 'US-W', val1: 42, val2: 30 }, { label: 'EU', val1: 48, val2: 35 }, { label: 'AP', val1: 65, val2: 45 }, { label: 'Avg', val1: 45, val2: 32 }],
          providers: [{ name: 'DeepSeek-V3 Speed', amount: '124 tps', color: 'bg-emerald-500' }, { name: 'Claude 3.5 TTFT', amount: '180ms', color: 'bg-blue-600' }, { name: 'Llama 3.3 70B', amount: '$0.15 / 1M', color: 'bg-purple-600' }, { name: 'Availability', amount: '100% Live', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'smart-failover',
        number: '03',
        title: 'Automatic Fallback & Redundancy',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'If a model provider experiences an outage or rate limit (HTTP 429), automatically fail over in milliseconds.',
        features: ['Zero-downtime automated fallback', 'Configurable fallback cascade rules', 'Rate-limit spike smoothing buffer', 'Unified error handling format'],
        preview: {
          title: 'Failover Sentinel',
          bars: [{ label: 'Pri', val1: 100, val2: 98 }, { label: 'Sec', val1: 100, val2: 100 }, { label: 'Fail', val1: 0, val2: 0 }, { label: 'Buffer', val1: 100, val2: 98 }, { label: 'Uptime', val1: 100, val2: 100 }],
          providers: [{ name: 'Failover Switch Speed', amount: '< 30ms', color: 'bg-emerald-500' }, { name: 'Rate-Limit Breaches', amount: '0 Drops', color: 'bg-blue-600' }, { name: 'Cascade Tiers', amount: '3 Models Deep', color: 'bg-purple-600' }, { name: 'Uptime SLA', amount: '99.99%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'semantic-cache',
        number: '04',
        title: 'Semantic Prompt Caching Engine',
        icon: <Database className="w-4 h-4" />,
        tagline: 'Cache identical or semantically similar prompt responses to reduce token costs by up to 60%.',
        features: ['Semantic vector similarity caching', 'Instant sub-10ms cached response delivery', 'Configurable TTL and cache invalidation', 'Cost savings attribution metrics'],
        preview: {
          title: 'Semantic Cache Rate',
          bars: [{ label: '10m', val1: 30, val2: 20 }, { label: '1h', val1: 45, val2: 35 }, { label: '6h', val1: 58, val2: 48 }, { label: '12h', val1: 65, val2: 55 }, { label: '24h', val1: 72, val2: 60 }],
          providers: [{ name: 'Cache Hit Rate', amount: '41.8%', color: 'bg-emerald-500' }, { name: 'Cached Latency', amount: '8ms', color: 'bg-blue-600' }, { name: 'Monthly Savings', amount: '$6,420 Saved', color: 'bg-purple-600' }, { name: 'Cache Capacity', amount: '10M Vectors', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'fine-tune-marketplace',
        number: '05',
        title: 'Custom Model Weights & LoRA Hub',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Deploy, share, and monetize your proprietary fine-tuned weights and LoRA adapters securely.',
        features: ['Private encrypted weight hosting', 'Role-based team access controls', '1-click adapter attachment to base models', 'Pay-per-use token monetization'],
        preview: {
          title: 'Fine-Tuned Hub',
          bars: [{ label: 'Legal', val1: 95, val2: 90 }, { label: 'Med', val1: 98, val2: 95 }, { label: 'Fin', val1: 100, val2: 98 }, { label: 'Code', val1: 96, val2: 92 }, { label: 'Sales', val1: 98, val2: 95 }],
          providers: [{ name: 'Custom Adapters', amount: '28 Deployed', color: 'bg-blue-600' }, { name: 'Weight Encryption', amount: 'AES-256 GCM', color: 'bg-emerald-500' }, { name: 'Adapter Latency', amount: '+0ms Overhead', color: 'bg-purple-600' }, { name: 'Domain Accuracy', amount: '99.4%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'enterprise-data-privacy',
        number: '06',
        title: 'Zero Data Retention & Privacy',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Zero model training on enterprise prompts with automated PII masking and SOC 2 data agreements.',
        features: ['100% Zero Data Retention (ZDR) guarantee', 'Automated PII scrubbing before inference', 'Dedicated enterprise isolated VPC endpoints', 'HIPAA BAA and GDPR DPA signed'],
        preview: {
          title: 'Privacy Verification',
          bars: [{ label: 'ZDR', val1: 100, val2: 100 }, { label: 'PII', val1: 100, val2: 100 }, { label: 'SOC2', val1: 100, val2: 100 }, { label: 'HIPAA', val1: 100, val2: 100 }, { label: 'VPC', val1: 100, val2: 100 }],
          providers: [{ name: 'Zero Retention', amount: '100% Enforced', color: 'bg-emerald-500' }, { name: 'PII Redacted', amount: '100% Scrubbed', color: 'bg-blue-600' }, { name: 'Compliance Agreements', amount: 'BAA & DPA Ready', color: 'bg-purple-600' }, { name: 'Audit Logs', amount: 'Immutable', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'cost-governor-budgets',
        number: '07',
        title: 'Spend Limits & Cost Governor',
        icon: <DollarSign className="w-4 h-4" />,
        tagline: 'Set team-level token budget caps, model access permissions, and automated spend alerts.',
        features: ['Team & user token quota limits', 'Model whitelisting by environment (Dev vs Prod)', 'Real-time billing telemetry & alerts', 'Automated circuit breaker on budget breach'],
        preview: {
          title: 'Budget Governor Board',
          bars: [{ label: 'Eng', val1: 75, val2: 60 }, { label: 'AI', val1: 85, val2: 70 }, { label: 'Prod', val1: 90, val2: 80 }, { label: 'Mktg', val1: 40, val2: 30 }, { label: 'Dev', val1: 50, val2: 35 }],
          providers: [{ name: 'Budget Adherence', amount: 'On Track', color: 'bg-emerald-500' }, { name: 'Active Quotas', amount: '18 Teams', color: 'bg-blue-600' }, { name: 'Spend Alerts', amount: 'Slack / Email', color: 'bg-purple-600' }, { name: 'Circuit Breaker', amount: 'Armed', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'streaming-sdk-api',
        number: '08',
        title: 'Universal OpenAI SDK Compatible API',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Drop in our base URL into any existing OpenAI, LangChain, LlamaIndex, or Vercel AI SDK codebase.',
        features: ['1-line base URL drop-in replacement', 'Server-Sent Events (SSE) token streaming', 'Function calling & tool use parity', 'Python, TypeScript, and Go SDKs'],
        preview: {
          title: 'API Compatibility',
          bars: [{ label: 'OpenAI', val1: 100, val2: 100 }, { label: 'LangChain', val1: 100, val2: 100 }, { label: 'Vercel', val1: 100, val2: 100 }, { label: 'LlamaIdx', val1: 100, val2: 100 }, { label: 'SSE', val1: 100, val2: 100 }],
          providers: [{ name: 'OpenAI SDK Parity', amount: '100% Drop-In', color: 'bg-emerald-500' }, { name: 'Token Streaming', amount: 'SSE Chunked', color: 'bg-blue-600' }, { name: 'Tools & Functions', amount: 'Supported', color: 'bg-purple-600' }, { name: 'API Latency', amount: '< 25ms Overhead', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Power high-performance AI applications with optimal unit economics',
    useCases: [
      { id: 'm-uc1', title: 'Unified Model Access', desc: 'Query Claude, GPT-4o, Gemini, and open models with 1 API key.', icon: <Store className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'm-uc2', title: 'Zero-Downtime Fallback', desc: 'Automatically route around model outages and rate limits.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'm-uc3', title: 'Semantic Token Caching', desc: 'Cut repeat prompt costs by up to 60% with instant cached responses.', icon: <Database className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'm-uc4', title: 'Enterprise Budget Controls', desc: 'Set team-level spend quotas and enforce strict model whitelists.', icon: <DollarSign className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your AI development frameworks',
    integrations: [
      { name: 'OpenAI SDK', logoKey: 'openai' },
      { name: 'Anthropic Claude', logoKey: 'anthropic' },
      { name: 'Google Gemini', logoKey: 'gcp' },
      { name: 'AWS Bedrock', logoKey: 'aws' },
      { name: 'Microsoft Azure AI', logoKey: 'azure' },
      { name: 'Hugging Face', logoKey: 'huggingface' },
      { name: 'GitHub Sync', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to access the foundation model marketplace?',
    ctaSubtitle: 'Get your universal API key and start querying 150+ models in under 60 seconds.',
    relatedHeadline: 'Explore related AI services and products',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat Assistant', desc: 'Conversational reasoning.', icon: <MessageSquare className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'ai-pods', type: 'service', name: 'AI Compute Pods', desc: 'Serverless GPU clusters.', icon: <Cpu className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize multi-cloud costs.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'solution-architect', type: 'product', name: 'Solution Architect', desc: 'System architecture.', icon: <Box className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'compliance', type: 'product', name: 'Compliance', desc: 'Automate audit controls.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' }
    ],
    videoModal: {
      title: 'AI Models Marketplace Walkthrough',
      subtitle: 'Universal Model Gateway & Latency Benchmarks',
      heroCardTitle: 'Watch Model Marketplace in Action',
      heroCardDesc: 'See how SNS Square AI Models routes queries between 150+ foundation models, enforces semantic caching, and provides instant fallback redundancy.',
      highlights: [{ label: '150+ Models', sub: 'Single API key' }, { label: '38ms TTFT', sub: 'Sub-second speed' }, { label: '45% Savings', sub: 'Semantic caching' }]
    }
  }
};
