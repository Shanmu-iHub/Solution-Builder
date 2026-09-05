import { ProductItem } from '../types';

export const productsList: ProductItem[] = [
  {
    id: 'solution-architect',
    name: 'Solution Architect',
    shortDesc: 'Design scalable cloud and technology solutions.',
    longDesc: 'Interactive cloud architecture design canvas with real-time component wiring, cost estimates, AI validation, and multi-cloud export.',
    category: 'Engineering & Cloud',
    icon: 'Layers',
    badge: 'Popular',
    features: [
      'Interactive visual topology designer',
      'Multi-cloud component library (AWS, Azure, GCP)',
      'Automated cost & capacity estimator',
      'AI architectural best-practice validation',
      'Terraform & CloudFormation code generation'
    ],
    stats: [
      { label: 'Architectures', value: '42 Active', change: '+8 this month' },
      { label: 'Est. Cloud Cost', value: '$18.4K/mo', change: '-12% optimized' },
      { label: 'Health Score', value: '98.5%', change: 'Excellent' }
    ]
  },
  {
    id: 'solution-factor',
    name: 'Solution Factor',
    shortDesc: 'Transform business requirements into implementation-ready solutions.',
    longDesc: 'AI-assisted requirement decomposition engine that turns PRDs into functional specs, non-functional criteria, technical stacks, and implementation roadmaps.',
    category: 'Engineering & Cloud',
    icon: 'Sparkles',
    badge: 'AI Powered',
    features: [
      'PRD & User Story AI analyzer',
      'Automated tech stack evaluator & trade-off matrix',
      'WBS & sprint planning breakdown',
      'Risk & dependency mapping',
      'Jira, GitHub & Linear bi-directional sync'
    ],
    stats: [
      { label: 'Specs Generated', value: '128 PRDs', change: '+24 this week' },
      { label: 'Avg. Refinement Time', value: '4.2 hrs', change: '-65% faster' },
      { label: 'Tech Stack Alignment', value: '99.1%', change: 'High confidence' }
    ]
  },
  {
    id: 'testing',
    name: 'Testing',
    shortDesc: 'Validate applications, APIs, workflows, and infrastructure.',
    longDesc: 'Enterprise-grade continuous validation platform for automated unit, integration, API contract, performance, security, and AI regression testing.',
    category: 'Engineering & Cloud',
    icon: 'CheckCircle2',
    features: [
      'Automated API contract & schema validation',
      'End-to-end synthetic user flow testing',
      'AI-generated edge case scenarios',
      'Distributed load & performance benchmarking',
      'Flaky test quarantine & automated healing'
    ],
    stats: [
      { label: 'Total Test Suites', value: '2,480', change: '+142 tests' },
      { label: 'Pass Rate', value: '99.4%', change: '+0.3% stability' },
      { label: 'Avg. Execution', value: '1m 18s', change: 'Optimized runner' }
    ]
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    shortDesc: 'Monitor infrastructure, applications, services, and AI workloads.',
    longDesc: 'Unified observability suite providing deep tracing, metric telemetry, real-time log analysis, AI model latency monitoring, and intelligent anomaly alerting.',
    category: 'Operations & Cost',
    icon: 'Activity',
    badge: 'Real-time',
    features: [
      'Full-stack distributed tracing (OpenTelemetry)',
      'AI Inference latency & token consumption monitoring',
      'Dynamic threshold anomaly detection',
      'Custom KPI dashboards & SLI/SLO tracking',
      'Automated incident triage & runbook triggering'
    ],
    stats: [
      { label: 'Monitored Endpoints', value: '48 Nodes', change: '100% operational' },
      { label: 'Avg. Latency', value: '42ms', change: '-4ms faster' },
      { label: 'Global Uptime', value: '99.99%', change: 'SLA Met' }
    ]
  },
  {
    id: 'finops',
    name: 'FinOps',
    shortDesc: 'Understand, control, and optimize cloud spending.',
    longDesc: 'Intelligent cloud cost intelligence and unit economics platform that discovers waste, forecasts monthly spend, and automates commitment recommendations.',
    category: 'Operations & Cost',
    icon: 'DollarSign',
    badge: 'Savings Hub',
    features: [
      'Multi-cloud cost allocation & tagging governance',
      'Idle resource detection & rightsizing recommendations',
      'Predictive ML cost forecasting & anomaly alerts',
      'Team & project budget threshold enforcement',
      'Reserved instance & savings plan optimizer'
    ],
    stats: [
      { label: 'Monthly Cloud Spend', value: '$24,850', change: '-14% vs budget' },
      { label: 'Identified Savings', value: '$6,420/mo', change: '8 recommendations' },
      { label: 'Budget Utilization', value: '82.4%', change: 'Safe zone' }
    ]
  },
  {
    id: 'audit',
    name: 'Audit',
    shortDesc: 'Track activity, changes, access, and operational history.',
    longDesc: 'Immutable audit trail for all workspace actions, API calls, IAM role changes, and deployment activities with tamper-evident cryptographic verification.',
    category: 'Security & Governance',
    icon: 'ShieldCheck',
    features: [
      'Immutable tamper-evident event streaming',
      'Actor attribution with IP, session & MFA metadata',
      'Granular change diffs for configurations & code',
      'SIEM / Splunk / Datadog streaming exporter',
      'Custom retention policies up to 7 years'
    ],
    stats: [
      { label: 'Audit Records', value: '1.4M Events', change: 'Indexed live' },
      { label: 'Security Flags', value: '0 Critical', change: 'Clean state' },
      { label: 'Export Status', value: 'Synchronized', change: 'SIEM Active' }
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance',
    shortDesc: 'Manage policies, controls, risks, and compliance requirements.',
    longDesc: 'Continuous compliance automation engine supporting SOC 2 Type II, ISO 27001, HIPAA, and GDPR with automated evidence collection and auditor portals.',
    category: 'Security & Governance',
    icon: 'FileCheck',
    badge: 'SOC 2 Ready',
    features: [
      'Automated evidence collection from cloud providers',
      'Continuous control posture monitoring',
      'Vendor risk assessment & scorecards',
      'Read-only auditor portal with one-click export',
      'Policy-as-code linting and pre-commit checks'
    ],
    stats: [
      { label: 'Overall Readiness', value: '96.2%', change: '+3.1% this quarter' },
      { label: 'Passed Controls', value: '148 / 152', change: '4 in review' },
      { label: 'Frameworks Active', value: '4 Frameworks', change: 'SOC2, ISO, HIPAA, GDPR' }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics',
    shortDesc: 'Turn operational and business data into actionable insights.',
    longDesc: 'High-performance interactive business intelligence engine with real-time SQL querying, drag-and-drop report builders, and automated AI insight generation.',
    category: 'Data & AI',
    icon: 'BarChart3',
    features: [
      'Natural language text-to-SQL query generation',
      'Drag-and-drop dashboard composition',
      'Real-time streaming queries with clickhouse backend',
      'Scheduled executive summaries & Slack alerts',
      'Embedded analytics SDK for client portals'
    ],
    stats: [
      { label: 'Active Dashboards', value: '36 Live', change: '14,200 views' },
      { label: 'Query Response', value: '180ms', change: 'Cached acceleration' },
      { label: 'Data Sources', value: '12 Connected', change: 'Postgres, S3, BigQuery' }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps',
    shortDesc: 'Build, deploy, automate, and manage software delivery.',
    longDesc: 'Cloud-native CI/CD automation and GitOps environment control plane with blue/green deployments, canary rollouts, and instant rollback capabilities.',
    category: 'Engineering & Cloud',
    icon: 'GitBranch',
    features: [
      'Multi-stage pipeline editor with DAG visualizer',
      'Canary, Blue-Green, and Shadow deployment strategies',
      'Kubernetes cluster & serverless orchestrator',
      'Ephemeral test environment provisioning on PR',
      'Secret management with zero-trust rotation'
    ],
    stats: [
      { label: 'Daily Builds', value: '94 Pipelines', change: '98.9% success' },
      { label: 'Deploy Frequency', value: '18 / day', change: 'High velocity' },
      { label: 'MTTR', value: '4m 12s', change: '-45% recovery' }
    ]
  },
  {
    id: 'ai-models',
    name: 'AI Models',
    shortDesc: 'Discover, configure, evaluate, and use AI models.',
    longDesc: 'Enterprise AI foundation model gateway providing universal API routing, benchmark evaluations, fine-tuning management, and prompt engineering testbenches.',
    category: 'Data & AI',
    icon: 'Brain',
    badge: 'Unified API',
    features: [
      'Universal single API key across 30+ frontier models',
      'Semantic caching reducing token costs up to 40%',
      'Automatic fallback routing and latency optimization',
      'Custom fine-tuning & LoRA weight hosting',
      'Guardrail evaluation & PII sanitization'
    ],
    stats: [
      { label: 'Available Models', value: '38 Frontier', change: 'OpenAI, Anthropic, Gemini, Llama' },
      { label: 'Tokens Routed', value: '84.2M/mo', change: '+32% volume' },
      { label: 'Cache Hit Rate', value: '41.8%', change: '$3.2K saved' }
    ]
  }
];
