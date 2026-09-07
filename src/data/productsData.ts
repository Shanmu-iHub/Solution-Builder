import { ProductItem } from '../types';

export const productsList: ProductItem[] = [
  {
    id: 'finops',
    name: 'FinOps',
    shortDesc: 'Understand, control, and optimize cloud and AI spending in INR.',
    longDesc: 'Intelligent cloud cost intelligence and unit economics platform that discovers waste, forecasts monthly spend in Indian Rupees, and automates commitment recommendations.',
    category: 'Operations & Cost',
    icon: 'DollarSign',
    badge: 'Savings Hub',
    features: [
      'Multi-cloud cost allocation & tagging governance',
      'Idle resource detection & rightsizing recommendations',
      'Predictive ML cost forecasting & anomaly alerts',
      'Team & project budget threshold enforcement in INR',
      'Reserved instance & savings plan optimizer'
    ],
    stats: [
      { label: 'Monthly Cloud Spend', value: '₹24.8 Lakhs', change: '-14% vs budget' },
      { label: 'Identified Savings', value: '₹6.4 Lakhs/mo', change: '8 recommendations' },
      { label: 'Budget Utilization', value: '82.4%', change: 'Safe zone' }
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
    id: 'compliance',
    name: 'Compliance',
    shortDesc: 'Manage policies, controls, risks, and compliance requirements.',
    longDesc: 'Continuous compliance automation engine supporting SOC 2 Type II, ISO 27001, HIPAA, and Indian DPDP Act with automated evidence collection and auditor portals.',
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
      { label: 'Frameworks Active', value: '4 Frameworks', change: 'SOC2, ISO, HIPAA, DPDP' }
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
      'Real-time streaming queries with ClickHouse backend',
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
    id: 'gamifications',
    name: 'Gamifications',
    shortDesc: 'Incentivize engineering excellence with quests, XP, streaks, and squad leaderboards.',
    longDesc: 'Enterprise developer motivation platform transforming sprint milestones, FinOps cost cutting, and zero-bug releases into engaging bounties and rewards.',
    category: 'Engineering & Cloud',
    icon: 'Trophy',
    badge: 'Season 4',
    features: [
      'Automated XP hooks for Git commits & PR reviews',
      'Squad & individual developer leaderboards',
      'Daily streak multipliers & seasonal quest bounties',
      'Custom rewards store for gift vouchers & tech swag',
      'Digital profile badges & achievement certificates'
    ],
    stats: [
      { label: 'Active Participants', value: '4.8x Engaged', change: '94% on-time sprints' },
      { label: 'XP Distributed', value: '142.5K XP', change: 'Season 4' },
      { label: 'Quests Completed', value: '1,280 Bounties', change: 'Active' }
    ]
  }
];
