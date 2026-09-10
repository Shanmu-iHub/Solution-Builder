import React from 'react';
import {
  Activity,
  CheckCircle2,
  FlaskConical,
  Infinity as InfinityIcon,
  ShieldCheck,
  BarChart2,
  FileText,
  DollarSign,
  Box,
  Layers,
  Sparkles,
  Zap,
  Radio,
  Gauge,
  Bell,
  Code,
  Globe,
  Terminal,
  Database,
  Cloud,
  Lock,
  Workflow,
  Search,
  Sliders,
  Store,
  Compass,
  Headphones,
  SlidersHorizontal,
  Bot,
  GitBranch,
  Cpu,
  Monitor,
  Trophy,
  Medal,
  Target,
  Flame,
  Award,
  Gamepad2,
  Users
} from 'lucide-react';
import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';

export const productsOfferingsConfigs: Record<string, OfferingLandingConfig> = {
  testing: {
    id: 'testing',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'Quality Engineering',
    badgeIcon: <FlaskConical className="w-3.5 h-3.5 text-purple-600" />,
    heroIcon: <FlaskConical className="w-6 h-6" />,
    heroIconBg: 'bg-purple-50/90',
    heroIconColor: 'text-purple-700',
    heroIconBorder: 'border-purple-100/80',
    headline1: 'Autonomous test suites.',
    headline2: 'Zero-regression deployments.',
    subtitle: 'Automate AI evaluation, end-to-end integration tests, load simulations, and synthetic traffic generation with intelligent test assertions.',
    openButtonText: 'Open Quality Engineering',
    heroIllustration: {
      cardTitle: 'Continuous Test Runner',
      cardSub: 'Regression & AI Evals',
      cardBadge: '100% Passed',
      annotationText: 'Automated Evals\nZero Flakiness',
      checklist: ['Synthetic Traffic Evals', 'AI Prompt Regressions', 'High-Scale Load Tests'],
      bars: [
        { height: '45%', bg: 'bg-purple-300' },
        { height: '60%', bg: 'bg-purple-400' },
        { height: '75%', bg: 'bg-purple-500' },
        { height: '90%', bg: 'bg-purple-600' },
        { height: '65%', bg: 'bg-purple-400' },
        { height: '98%', bg: 'bg-[#7C3AED]' }
      ],
      curveColor: '#7C3AED'
    },
    metrics: [
      { label: 'Pass Rate Reliability', value: '99.8%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Test Execution Speed', value: '3.4x', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Automated Scenarios', value: '12,500+', icon: <Layers className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Zero-Day Bugs Caught', value: '142', icon: <ShieldCheck className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Comprehensive testing from unit code to LLM reasoning benchmarks',
    capabilities: [
      {
        id: 'llm-evals',
        number: '01',
        title: 'AI Model & Prompt Evals',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Benchmark accuracy, hallucination rates, and safety guardrails across different prompt revisions.',
        features: ['Automated ground-truth scoring', 'Semantic similarity benchmarking', 'Toxicity & jailbreak attack tests', 'Cost vs quality Pareto curve'],
        preview: {
          title: 'Prompt Evaluation Matrix',
          bars: [{ label: 'P1', val1: 85, val2: 70 }, { label: 'P2', val1: 92, val2: 80 }, { label: 'P3', val1: 96, val2: 88 }, { label: 'P4', val1: 88, val2: 75 }, { label: 'P5', val1: 98, val2: 92 }],
          providers: [{ name: 'Reasoning Score', amount: '98.4%', color: 'bg-purple-600' }, { name: 'Hallucination Rate', amount: '< 0.2%', color: 'bg-emerald-500' }, { name: 'Safety Guardrails', amount: '100%', color: 'bg-blue-600' }, { name: 'Token Efficiency', amount: '+24%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'synthetic-load',
        number: '02',
        title: 'High-Concurrency Load Testing',
        icon: <Gauge className="w-4 h-4" />,
        tagline: 'Simulate up to 500,000 concurrent virtual users hitting your APIs and streaming endpoints.',
        features: ['Distributed cloud load generators', 'Realistic traffic distribution curves', 'Latency degradation bottlenecks', 'Auto-scaling trigger verification'],
        preview: {
          title: 'Load Simulation Run',
          bars: [{ label: '10k', val1: 30, val2: 25 }, { label: '50k', val1: 50, val2: 40 }, { label: '100k', val1: 75, val2: 60 }, { label: '250k', val1: 90, val2: 80 }, { label: '500k', val1: 98, val2: 90 }],
          providers: [{ name: 'Peak Concurrency', amount: '500k VU', color: 'bg-purple-600' }, { name: 'P99 Latency', amount: '48ms', color: 'bg-blue-600' }, { name: 'Error Rate', amount: '0.00%', color: 'bg-emerald-500' }, { name: 'Bandwidth Peak', amount: '4.2 Gbps', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'e2e-browser',
        number: '03',
        title: 'End-to-End Journey Automation',
        icon: <Monitor className="w-4 h-4" />,
        tagline: 'Self-healing browser tests that automatically adapt to UI changes without breaking.',
        features: ['AI self-healing DOM locators', 'Cross-browser rendering matrix', 'Visual regression screenshot diffs', 'Mobile & desktop viewport checks'],
        preview: {
          title: 'Browser Journey Tests',
          bars: [{ label: 'Chrome', val1: 99, val2: 98 }, { label: 'Safari', val1: 98, val2: 96 }, { label: 'Firefox', val1: 99, val2: 98 }, { label: 'Edge', val1: 100, val2: 99 }, { label: 'Mobile', val1: 97, val2: 95 }],
          providers: [{ name: 'Checkout Flow', amount: 'Passed', color: 'bg-emerald-500' }, { name: 'User Onboarding', amount: 'Passed', color: 'bg-blue-600' }, { name: 'Billing Portal', amount: 'Passed', color: 'bg-purple-600' }, { name: 'Visual Diffs', amount: '0 Breaking', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'api-contract',
        number: '04',
        title: 'API Contract & Schema Testing',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Validate OpenAPI, gRPC, and GraphQL contracts to prevent breaking upstream client integrations.',
        features: ['Schema breaking change detector', 'Fuzz testing parameter generator', 'Payload boundary validation', 'Mock server automated stubbing'],
        preview: {
          title: 'API Contract Status',
          bars: [{ label: 'REST', val1: 95, val2: 90 }, { label: 'gRPC', val1: 98, val2: 96 }, { label: 'GQL', val1: 92, val2: 88 }, { label: 'Auth', val1: 100, val2: 100 }, { label: 'Hook', val1: 96, val2: 94 }],
          providers: [{ name: 'OpenAPI Contracts', amount: '100% Valid', color: 'bg-emerald-500' }, { name: 'Breaking Changes', amount: '0 Detected', color: 'bg-blue-600' }, { name: 'Fuzz Scenarios', amount: '5,000 Tested', color: 'bg-purple-600' }, { name: 'Mock Server', amount: 'Live', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'security-fuzz',
        number: '05',
        title: 'DAST & Security Fuzzing',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Identify OWASP Top 10 vulnerabilities, injection flaws, and authorization bypasses automatically.',
        features: ['Automated pen-test fuzzing', 'JWT & OAuth vulnerability testing', 'Cross-tenant data leak probes', 'Sanitization verification'],
        preview: {
          title: 'Security Assertion Suite',
          bars: [{ label: 'OWASP', val1: 100, val2: 98 }, { label: 'SQLi', val1: 100, val2: 100 }, { label: 'XSS', val1: 100, val2: 100 }, { label: 'IDOR', val1: 98, val2: 96 }, { label: 'Auth', val1: 100, val2: 100 }],
          providers: [{ name: 'Vulnerabilities', amount: '0 Critical', color: 'bg-emerald-500' }, { name: 'IDOR Probes', amount: 'Passed', color: 'bg-blue-600' }, { name: 'Injection Tests', amount: '2,400 Cleared', color: 'bg-purple-600' }, { name: 'Security Grade', amount: 'Grade A+', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'chaos-engineering',
        number: '06',
        title: 'Chaos & Fault Injection',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Stress test system resilience by injecting network latency, packet loss, and pod crashes safely.',
        features: ['Network latency & jitter injection', 'Kill-pod resilience verification', 'Database failover switch test', 'Circuit breaker auto-recovery'],
        preview: {
          title: 'Resilience Test Runs',
          bars: [{ label: 'KillPod', val1: 95, val2: 90 }, { label: 'Loss', val1: 92, val2: 88 }, { label: 'DBFail', val1: 98, val2: 95 }, { label: 'DNS', val1: 90, val2: 85 }, { label: 'Mem', val1: 96, val2: 92 }],
          providers: [{ name: 'Resilience Score', amount: '99.4%', color: 'bg-emerald-500' }, { name: 'Failover Speed', amount: '< 800ms', color: 'bg-blue-600' }, { name: 'Data Loss', amount: '0 Bytes', color: 'bg-purple-600' }, { name: 'Auto-Healing', amount: 'Verified', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'ci-parallel',
        number: '07',
        title: 'Parallel Matrix Execution',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Run 10,000+ tests across parallel cloud runners in under 60 seconds with intelligent test sharding.',
        features: ['Intelligent test sharding', 'Flaky test quarantined quarantine', 'Artifact & video recordings', 'Smart git-diff test selection'],
        preview: {
          title: 'Test Shard Speed',
          bars: [{ label: 'S1', val1: 98, val2: 95 }, { label: 'S2', val1: 96, val2: 94 }, { label: 'S3', val1: 99, val2: 98 }, { label: 'S4', val1: 97, val2: 95 }, { label: 'S5', val1: 98, val2: 96 }],
          providers: [{ name: 'Run Duration', amount: '48 secs', color: 'bg-purple-600' }, { name: 'Parallel Workers', amount: '64 Pods', color: 'bg-blue-600' }, { name: 'Flakiness Rate', amount: '0.01%', color: 'bg-emerald-500' }, { name: 'Test Coverage', amount: '94.2%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'analytics-reports',
        number: '08',
        title: 'Quality Insights & Telemetry',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: 'Actionable release confidence scores, test health tracking, and developer velocity analytics.',
        features: ['Release readiness scoring', 'Historical regression tracking', 'Coverage heatmaps by module', 'Jira & GitHub PR integrations'],
        preview: {
          title: 'Quality Scoreboard',
          bars: [{ label: 'M1', val1: 92, val2: 85 }, { label: 'M2', val1: 95, val2: 90 }, { label: 'M3', val1: 98, val2: 94 }, { label: 'M4', val1: 96, val2: 92 }, { label: 'M5', val1: 99, val2: 96 }],
          providers: [{ name: 'Release Confidence', amount: '99.1%', color: 'bg-emerald-500' }, { name: 'Coverage Trend', amount: '+8.4%', color: 'bg-blue-600' }, { name: 'Blocked PRs', amount: '0', color: 'bg-purple-600' }, { name: 'Dev Velocity', amount: 'Accelerated', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Deliver bulletproof software at high velocity',
    useCases: [
      { id: 't-uc1', title: 'AI Quality Assurance', desc: 'Ensure prompt updates never degrade output accuracy.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 't-uc2', title: 'Pre-Production Gate', desc: 'Block regressions automatically before merging to main.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 't-uc3', title: 'High-Traffic Preparedness', desc: 'Stress-test infrastructure for Black Friday and surge traffic.', icon: <Gauge className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 't-uc4', title: 'Contract Security', desc: 'Prevent breaking API payload changes across microservices.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Integrates natively into your CI/CD workflow',
    integrations: [
      { name: 'GitHub Actions', logoKey: 'github' },
      { name: 'Kubernetes', logoKey: 'kubernetes' },
      { name: 'AWS Cloud', logoKey: 'aws' },
      { name: 'Terraform', logoKey: 'terraform' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'OpenAI API', logoKey: 'openai' },
      { name: 'Databricks', logoKey: 'databricks' }
    ],
    ctaTitle: 'Ready to automate your test suites?',
    ctaSubtitle: 'Run your first synthetic AI and regression test in under 2 minutes.',
    relatedHeadline: 'Explore related developer products',
    relatedOfferings: [
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Automate build & delivery.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Enforce policy rules.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize cloud costs.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Measure system insights.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' },
      { id: 'audit', type: 'product', name: 'Audit Management', desc: 'Review release logs.', icon: <FileText className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' }
    ],
    videoModal: {
      title: 'Testing Overview Walkthrough',
      subtitle: 'Autonomous Regression & AI Evaluation',
      heroCardTitle: 'Watch Automated Testing in Action',
      heroCardDesc: 'See how SNS Square Testing automatically creates prompt assertions, simulates traffic spikes, and guarantees zero flakiness.',
      highlights: [{ label: 'Zero-Flake', sub: 'Self-healing locators' }, { label: '3.4x Faster', sub: 'Parallel runners' }, { label: 'AI Evals', sub: 'Ground-truth scoring' }]
    }
  },

  devops: {
    id: 'devops',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'DevOps',
    badgeIcon: <InfinityIcon className="w-3.5 h-3.5 text-orange-600" />,
    heroIcon: <InfinityIcon className="w-6 h-6" />,
    heroIconBg: 'bg-orange-50/90',
    heroIconColor: 'text-orange-700',
    heroIconBorder: 'border-orange-100/80',
    headline1: 'Automate build & release.',
    headline2: 'Ship software 10x faster.',
    subtitle: 'Enterprise GitOps pipelines, preview environments, automated canary deployments, and container orchestration at global scale.',
    openButtonText: 'Open DevOps',
    heroIllustration: {
      cardTitle: 'GitOps Pipeline Orchestrator',
      cardSub: 'Continuous Deployment',
      cardBadge: 'Deployed v2.4',
      annotationText: 'Canary Rollouts\nInstant Rollback',
      checklist: ['Automated Canary Deploys', 'Zero-Downtime Rollbacks', 'Ephemeral PR Previews'],
      bars: [
        { height: '40%', bg: 'bg-orange-300' },
        { height: '60%', bg: 'bg-orange-400' },
        { height: '80%', bg: 'bg-orange-500' },
        { height: '95%', bg: 'bg-orange-600' },
        { height: '70%', bg: 'bg-orange-400' },
        { height: '90%', bg: 'bg-[#EA580C]' }
      ],
      curveColor: '#EA580C'
    },
    metrics: [
      { label: 'Deployment Frequency', value: '45/day', icon: <GitBranch className="w-6 h-6" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-600', iconBorder: 'border-orange-100' },
      { label: 'Lead Time to Prod', value: '< 8 mins', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Change Failure Rate', value: '< 0.05%', icon: <ShieldCheck className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Mean Time to Restore', value: '< 45s', icon: <Activity className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    capabilitiesHeadline: 'Everything required to build, test, and ship modern cloud workloads',
    capabilities: [
      {
        id: 'gitops-ci',
        number: '01',
        title: 'GitOps Pipeline Orchestration',
        icon: <GitBranch className="w-4 h-4" />,
        tagline: 'Declare your desired state in Git and let automated controllers sync deployments effortlessly.',
        features: ['Automated branch-to-env mapping', 'Hermetic reproducible builds', 'Secrets management integration', 'Artifact image signing & provenance'],
        preview: {
          title: 'GitOps Pipeline Sync',
          bars: [{ label: 'Build', val1: 95, val2: 90 }, { label: 'Test', val1: 98, val2: 95 }, { label: 'Scan', val1: 100, val2: 98 }, { label: 'Stage', val1: 96, val2: 92 }, { label: 'Prod', val1: 100, val2: 100 }],
          providers: [{ name: 'Main Branch Sync', amount: 'In Sync', color: 'bg-emerald-500' }, { name: 'Active Runners', amount: '32 Parallel', color: 'bg-orange-600' }, { name: 'Build Cache Hit', amount: '92.4%', color: 'bg-blue-600' }, { name: 'Avg Duration', amount: '2m 14s', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'canary-rollout',
        number: '02',
        title: 'Progressive Canary Rollouts',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Gradually route traffic (5% -> 25% -> 100%) and automatically rollback if error rates tick up.',
        features: ['Automated metric health verification', 'Instant 1-click rollback', 'Weighted DNS and ingress routing', 'Blue/Green zero-downtime switch'],
        preview: {
          title: 'Canary Traffic Split',
          bars: [{ label: '5%', val1: 20, val2: 15 }, { label: '25%', val1: 45, val2: 35 }, { label: '50%', val1: 70, val2: 60 }, { label: '75%', val1: 85, val2: 75 }, { label: '100%', val1: 100, val2: 98 }],
          providers: [{ name: 'Canary Target (v2.4)', amount: '100% Live', color: 'bg-emerald-500' }, { name: 'Error Rate Drift', amount: '0.00%', color: 'bg-blue-600' }, { name: 'P95 Latency Impact', amount: '-12ms', color: 'bg-orange-600' }, { name: 'Auto-Promoted', amount: 'Verified', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'preview-env',
        number: '03',
        title: 'Ephemeral Preview Environments',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Spin up isolated preview environments for every pull request with realistic seed data automatically.',
        features: ['Automated PR branch lifecycle', 'Sanitized database snapshot seeding', 'Cost-effective auto-sleep after 2h idle', 'Shareable review URLs for stakeholders'],
        preview: {
          title: 'Preview Envs Live',
          bars: [{ label: 'PR-102', val1: 90, val2: 85 }, { label: 'PR-108', val1: 95, val2: 90 }, { label: 'PR-114', val1: 88, val2: 82 }, { label: 'PR-120', val1: 92, val2: 88 }, { label: 'PR-125', val1: 100, val2: 95 }],
          providers: [{ name: 'Active PR Envs', amount: '14 Live', color: 'bg-orange-600' }, { name: 'Provision Time', amount: '42 secs', color: 'bg-emerald-500' }, { name: 'Auto-Teardown', amount: 'Enabled', color: 'bg-blue-600' }, { name: 'Cost per Preview', amount: '$0.04/hr', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'container-k8s',
        number: '04',
        title: 'Container & K8s Management',
        icon: <Cpu className="w-4 h-4" />,
        tagline: 'Multi-cluster Kubernetes configuration with auto-scaling node pools and Helm chart releases.',
        features: ['Helm & Kustomize package manager', 'Horizontal Pod Autoscaler (HPA)', 'Vulnerability scanning in registry', 'Multi-architecture Docker buildx'],
        preview: {
          title: 'Kubernetes Workloads',
          bars: [{ label: 'EKS', val1: 95, val2: 90 }, { label: 'GKE', val1: 98, val2: 95 }, { label: 'AKS', val1: 92, val2: 88 }, { label: 'Edge', val1: 85, val2: 80 }, { label: 'Dev', val1: 90, val2: 85 }],
          providers: [{ name: 'Production Pods', amount: '340 Healthy', color: 'bg-emerald-500' }, { name: 'Registry Image Scans', amount: '0 CVEs', color: 'bg-blue-600' }, { name: 'Autoscaler Capacity', amount: 'Ready', color: 'bg-orange-600' }, { name: 'Helm Revisions', amount: 'v3.8.2', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'secrets-mgmt',
        number: '05',
        title: 'Zero-Trust Secrets & Config',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Inject dynamic API keys and database credentials into runtime pods without baking secrets into images.',
        features: ['Dynamic short-lived credentials', 'HashiCorp Vault & AWS KMS sync', 'Automated key rotation policies', 'Zero secret leakage in log streams'],
        preview: {
          title: 'Secrets Security Vault',
          bars: [{ label: 'Vault', val1: 100, val2: 100 }, { label: 'KMS', val1: 100, val2: 100 }, { label: 'Rotate', val1: 98, val2: 95 }, { label: 'Leakes', val1: 100, val2: 100 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'Managed Secrets', amount: '480 Active', color: 'bg-emerald-500' }, { name: 'Auto-Rotation', amount: '30 Days', color: 'bg-blue-600' }, { name: 'Leak Scanner', amount: 'Clean', color: 'bg-orange-600' }, { name: 'Audit Compliance', amount: 'SOC2 Ready', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'infra-code',
        number: '06',
        title: 'Infrastructure as Code (IaC)',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Plan, validate, and apply Terraform, OpenTofu, and Pulumi modules with automated drift detection.',
        features: ['Automated terraform plan in PR comments', 'Cloud cost estimation on IaC diffs', 'Daily infrastructure drift scan', 'Private module registry catalogue'],
        preview: {
          title: 'IaC Module Health',
          bars: [{ label: 'VPC', val1: 100, val2: 100 }, { label: 'EKS', val1: 100, val2: 98 }, { label: 'RDS', val1: 100, val2: 100 }, { label: 'IAM', val1: 100, val2: 100 }, { label: 'DNS', val1: 100, val2: 98 }],
          providers: [{ name: 'Terraform Modules', amount: '42 Approved', color: 'bg-purple-600' }, { name: 'Drift Status', amount: '0 Drifted', color: 'bg-emerald-500' }, { name: 'Cost Impact Estimate', amount: '+$14/mo', color: 'bg-orange-600' }, { name: 'State Locking', amount: 'Encrypted', color: 'bg-blue-600' }]
        }
      },
      {
        id: 'developer-portal',
        number: '07',
        title: 'Internal Developer Portal',
        icon: <Compass className="w-4 h-4" />,
        tagline: 'Self-service scaffolding templates for microservices, AI agents, and event-driven architectures.',
        features: ['1-click Golden Path templates', 'Automated repo & CI setup', 'Software catalog & service ownership', 'API documentation auto-sync'],
        preview: {
          title: 'Developer Portal Index',
          bars: [{ label: 'Node', val1: 95, val2: 90 }, { label: 'Python', val1: 98, val2: 95 }, { label: 'Go', val1: 92, val2: 88 }, { label: 'Rust', val1: 88, val2: 85 }, { label: 'Agent', val1: 100, val2: 98 }],
          providers: [{ name: 'Golden Templates', amount: '24 Ready', color: 'bg-orange-600' }, { name: 'Services Catalog', amount: '128 Cataloged', color: 'bg-blue-600' }, { name: 'Time to First PR', amount: '< 5 mins', color: 'bg-emerald-500' }, { name: 'Adoption Rate', amount: '96.8%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'dora-metrics',
        number: '08',
        title: 'DORA Metrics & Velocity',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: 'Track elite engineering velocity metrics and remove developer bottleneck blockages.',
        features: ['Deployment frequency tracking', 'Lead time for changes', 'Change failure percentage', 'MTTR restoration analytics'],
        preview: {
          title: 'DORA Velocity Board',
          bars: [{ label: 'Q1', val1: 80, val2: 70 }, { label: 'Q2', val1: 88, val2: 80 }, { label: 'Q3', val1: 94, val2: 88 }, { label: 'Q4', val1: 98, val2: 94 }, { label: 'Elite', val1: 100, val2: 98 }],
          providers: [{ name: 'DORA Rating', amount: 'Elite Level', color: 'bg-emerald-500' }, { name: 'Deploy Frequency', amount: '45 / Day', color: 'bg-orange-600' }, { name: 'Lead Time', amount: '7.8 mins', color: 'bg-blue-600' }, { name: 'Failure Rate', amount: '0.04%', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Supercharge your software delivery pipeline',
    useCases: [
      { id: 'd-uc1', title: 'Continuous Delivery', desc: 'Deploy without downtime or fear of production breakages.', icon: <GitBranch className="w-5 h-5" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-600', iconBorder: 'border-orange-100' },
      { id: 'd-uc2', title: 'Fast PR Verification', desc: 'Spin up live ephemeral staging environments for PRs.', icon: <Globe className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'd-uc3', title: 'Zero-Downtime Rollout', desc: 'Automate canary traffic shifting with instant rollback.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'd-uc4', title: 'Golden Path Templates', desc: 'Empower developers with self-service microservice setup.', icon: <Compass className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    integrationsHeadline: 'Works with your existing toolchain and clouds',
    integrations: [
      { name: 'GitHub Actions', logoKey: 'github' },
      { name: 'Kubernetes', logoKey: 'kubernetes' },
      { name: 'Docker Registry', logoKey: 'docker' },
      { name: 'Terraform', logoKey: 'terraform' },
      { name: 'AWS Cloud', logoKey: 'aws' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Slack Alerts', logoKey: 'slack' }
    ],
    ctaTitle: 'Ready to modernize your release pipeline?',
    ctaSubtitle: 'Connect your GitHub or GitLab repository and trigger your first automated deploy in 3 minutes.',
    relatedHeadline: 'Explore related engineering products',
    relatedOfferings: [
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Live system observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'testing', type: 'product', name: 'Quality Engineering', desc: 'Automated test suite runs.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize infrastructure spend.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Enforce deployment policies.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Developer velocity boards.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' },
      { id: 'audit', type: 'product', name: 'Audit Management', desc: 'Immutable deployment logs.', icon: <FileText className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' }
    ],
    videoModal: {
      title: 'DevOps Platform Walkthrough',
      subtitle: 'Continuous GitOps & Progressive Delivery',
      heroCardTitle: 'Watch Automated Release in Action',
      heroCardDesc: 'See how SNS Square DevOps orchestrates canary rollouts, creates ephemeral PR preview URLs, and maintains sub-minute recovery.',
      highlights: [{ label: '10x Faster', sub: 'Deployment velocity' }, { label: 'Zero-Downtime', sub: 'Automated rollback' }, { label: 'GitOps Ready', sub: 'Declarative state' }]
    }
  },
  gamifications: {
    id: 'gamifications',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'Rewards & Engagement',
    badgeIcon: <Trophy className="w-3.5 h-3.5 text-amber-600" />,
    heroIcon: <Trophy className="w-6 h-6" />,
    heroIconBg: 'bg-amber-50/90',
    heroIconColor: 'text-amber-700',
    heroIconBorder: 'border-amber-100/80',
    headline1: 'Developer motivation engine.',
    headline2: 'Engagement & Quest Rewards.',
    subtitle: 'Transform engineering sprints, cloud optimization goals, and compliance drills into rewarding milestones with XP, leaderboards, and streak multiplier badges.',
    openButtonText: 'Open Rewards & Engagement',
    heroIllustration: {
      cardTitle: 'Enterprise Quest Hub',
      cardSub: 'XP, Streaks & Team Trophies',
      cardBadge: 'Season 4 Active',
      annotationText: 'Sprint Quests\nStreak Multipliers',
      checklist: ['Continuous XP Automation', 'Zero-Bug Bounty Quests', 'Cloud FinOps Savings Trophies'],
      bars: [
        { height: '40%', bg: 'bg-amber-300' },
        { height: '65%', bg: 'bg-amber-400' },
        { height: '55%', bg: 'bg-orange-300' },
        { height: '90%', bg: 'bg-amber-500' },
        { height: '75%', bg: 'bg-yellow-400' },
        { height: '98%', bg: 'bg-amber-600' }
      ]
    },
    metrics: [
      { value: '4.8x', label: 'Higher Developer Engagement', icon: <Flame className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { value: '94%', label: 'Sprint Milestone Completion', icon: <Target className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { value: '50K+', label: 'Badges & Quests Awarded', icon: <Medal className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { value: '32%', label: 'Reduction in Stale PRs', icon: <Award className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    capabilitiesHeadline: 'Everything you need to motivate and align high-velocity engineering teams',
    capabilities: [
      {
        id: 'gam-cap1',
        number: '01',
        title: 'Autonomous XP & Leveling Engine',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Automatically grant XP for merged PRs, resolved tickets, and automated test coverage boosts.',
        features: ['Git commit & PR event webhooks', 'Configurable point rules by repo & role', 'Automated level-ups & milestone alerts', 'Role-based tier progression'],
        preview: {
          title: 'Developer XP Growth',
          bars: [{ label: 'W1', val1: 40, val2: 30 }, { label: 'W2', val1: 65, val2: 50 }, { label: 'W3', val1: 85, val2: 70 }, { label: 'W4', val1: 100, val2: 90 }],
          providers: [{ name: 'Top Contributor', amount: '12,450 XP', color: 'bg-amber-500' }, { name: 'Bug Hunter', amount: '8,900 XP', color: 'bg-blue-500' }, { name: 'Speed Demon', amount: '6,200 XP', color: 'bg-emerald-500' }]
        }
      },
      {
        id: 'gam-cap2',
        number: '02',
        title: 'Live Guild & Team Leaderboards',
        icon: <Trophy className="w-4 h-4" />,
        tagline: 'Foster healthy cross-team competition with real-time sprint scoreboards and seasonal seasons.',
        features: ['Department and squad leaderboards', 'Weekly reset & monthly champions', 'Slack & Microsoft Teams live standings broadcast', 'Dynamic tier shields (Bronze to Diamond)'],
        preview: {
          title: 'Squad Standings',
          bars: [{ label: 'Alpha', val1: 95, val2: 85 }, { label: 'Beta', val1: 88, val2: 80 }, { label: 'Gamma', val1: 78, val2: 70 }, { label: 'Delta', val1: 65, val2: 60 }],
          providers: [{ name: 'Squad DevOps', amount: '1st Place 🏆', color: 'bg-amber-600' }, { name: 'Squad FinTech', amount: '2nd Place 🥈', color: 'bg-slate-400' }, { name: 'Squad Core AI', amount: '3rd Place 🥉', color: 'bg-amber-700' }]
        }
      },
      {
        id: 'gam-cap3',
        number: '03',
        title: 'Quests, Bounties & Daily Streaks',
        icon: <Flame className="w-4 h-4" />,
        tagline: 'Incentivize critical chores: zero-downtime releases, code review turnaround, and cloud cost cleanup.',
        features: ['Daily streak bonus multipliers', 'Limited-time seasonal quest sprints', 'Security vulnerability bounty reward pools', 'FinOps idle resource savings rewards'],
        preview: {
          title: 'Active Quests',
          bars: [{ label: 'Security', val1: 90, val2: 80 }, { label: 'PR Review', val1: 100, val2: 95 }, { label: 'FinOps', val1: 85, val2: 75 }, { label: 'Test Cov', val1: 92, val2: 88 }],
          providers: [{ name: 'FinOps Quest', amount: '₹50,000 Saved', color: 'bg-emerald-600' }, { name: 'Fast PR Review', amount: '< 15m Avg', color: 'bg-blue-600' }, { name: 'Zero-Bug Sprint', amount: 'Completed', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'gam-cap4',
        number: '04',
        title: 'Custom Swag, Badges & Perks Marketplace',
        icon: <Award className="w-4 h-4" />,
        tagline: 'Allow team members to redeem accumulated points for gift vouchers, tech swag, or conference tickets.',
        features: ['Custom reward catalogue with auto-fulfillment', 'Gift card APIs (Amazon, Swiggy, Uber)', 'Exclusive digital badge showcase for profiles', 'Custom enterprise perks & conference passes'],
        preview: {
          title: 'Reward Store Redemption',
          bars: [{ label: 'Q1', val1: 70, val2: 60 }, { label: 'Q2', val1: 85, val2: 75 }, { label: 'Q3', val1: 95, val2: 88 }, { label: 'Q4', val1: 100, val2: 94 }],
          providers: [{ name: 'Swag Hoodies', amount: '124 Claimed', color: 'bg-indigo-600' }, { name: 'Gift Vouchers', amount: '₹1.5L Value', color: 'bg-amber-500' }, { name: 'Conf Passes', amount: '18 Claimed', color: 'bg-emerald-500' }]
        }
      }
    ],
    useCasesHeadline: 'Gamification designed for modern technology teams',
    useCases: [
      { id: 'g-uc1', title: 'Sprint Velocity Boosting', desc: 'Encourage prompt code reviews, PR turnaround, and milestone deliveries.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { id: 'g-uc2', title: 'FinOps Cloud Cleanup', desc: 'Gamify AWS & cloud cost reduction with bounties for removing idle infrastructure.', icon: <DollarSign className="w-5 h-5" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', iconBorder: 'border-cyan-100' },
      { id: 'g-uc3', title: 'Security & Compliance Drills', desc: 'Reward engineers for fixing dependency vulnerabilities and achieving 100% SOC 2 readiness.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'g-uc4', title: 'Culture & Knowledge Sharing', desc: 'Reward documentation writing, mentoring juniors, and tech talk presentations.', icon: <Medal className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    integrationsHeadline: 'Seamlessly hooks into your developer ecosystem',
    integrations: [
      { name: 'GitHub', logoKey: 'github' },
      { name: 'GitLab', logoKey: 'gitlab' },
      { name: 'Jira Software', logoKey: 'jira' },
      { name: 'Slack', logoKey: 'slack' },
      { name: 'Discord', logoKey: 'discord' },
      { name: 'Linear', logoKey: 'linear' },
      { name: 'Notion', logoKey: 'notion' }
    ],
    ctaTitle: 'Ready to level up your engineering team?',
    ctaSubtitle: 'Launch your first team quest in 2 minutes and watch developer engagement soar.',
    relatedHeadline: 'Explore related operational products',
    relatedOfferings: [
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Continuous delivery pipelines.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Live system observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'testing', type: 'product', name: 'Quality Engineering', desc: 'Automated test suite runs.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Cloud cost intelligence.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Regulatory policy enforcement.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Developer velocity boards.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' }
    ],
    videoModal: {
      title: 'Gamifications Platform Walkthrough',
      subtitle: 'Quests, XP, and Team Leaderboards',
      heroCardTitle: 'See Enterprise Gamification in Action',
      heroCardDesc: 'Learn how top engineering organizations use quests and XP multipliers to achieve 94% on-time sprint completions.',
      highlights: [{ label: '4.8x Engaged', sub: 'Active participants' }, { label: 'Automated XP', sub: 'Git & Jira hooks' }, { label: 'Custom Swag', sub: 'Auto-fulfillment' }]
    }
  }
};
