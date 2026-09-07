import React from 'react';
import {
  ShieldCheck,
  BarChart2,
  FileText,
  DollarSign,
  Box,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  Cloud,
  FileCheck,
  Activity,
  Infinity as InfinityIcon,
  FlaskConical,
  Store,
  Compass,
  Cpu,
  Monitor,
  Code,
  Clock,
  Sliders,
  Search,
  Server
} from 'lucide-react';
import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';

export const moreProductsConfigs: Record<string, OfferingLandingConfig> = {
  compliance: {
    id: 'compliance',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'Compliance',
    badgeIcon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
    heroIcon: <ShieldCheck className="w-6 h-6" />,
    heroIconBg: 'bg-emerald-50/90',
    heroIconColor: 'text-emerald-700',
    heroIconBorder: 'border-emerald-100/80',
    headline1: 'Continuous compliance.',
    headline2: 'Automated audit evidence.',
    subtitle: 'Automate SOC 2, HIPAA, ISO 27001, and GDPR compliance checks across multi-cloud infrastructure and employee workstations with zero manual spreadsheet work.',
    openButtonText: 'Open Compliance',
    heroIllustration: {
      cardTitle: 'Security & Posture Score',
      cardSub: 'Continuous Control Monitor',
      cardBadge: '100% Compliant',
      annotationText: 'Automated Evidence\nAudit-Ready',
      checklist: ['SOC 2 Type II Controls', 'Continuous Evidence Sync', 'Zero Security Drift'],
      bars: [
        { height: '50%', bg: 'bg-emerald-300' },
        { height: '70%', bg: 'bg-emerald-400' },
        { height: '85%', bg: 'bg-emerald-500' },
        { height: '95%', bg: 'bg-emerald-600' },
        { height: '75%', bg: 'bg-emerald-400' },
        { height: '100%', bg: 'bg-[#059669]' }
      ],
      curveColor: '#059669'
    },
    metrics: [
      { label: 'Audit Readiness', value: '100%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Manual Hours Saved', value: '380 hrs', icon: <FileCheck className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Monitored Controls', value: '164 / 164', icon: <Lock className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Time to Certification', value: '14 Days', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Comprehensive policy automation and framework coverage',
    capabilities: [
      {
        id: 'soc2-hipaa',
        number: '01',
        title: 'SOC 2 & HIPAA Automation',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Continuous monitoring of encryption at rest, access controls, and vulnerability scans for SOC 2 Type II.',
        features: ['Automated evidence collection', 'Daily control verification scans', 'Auditor portal direct export', 'Vendor risk assessment questionnaires'],
        preview: {
          title: 'Framework Adherence',
          bars: [{ label: 'SOC2', val1: 100, val2: 100 }, { label: 'HIPAA', val1: 100, val2: 98 }, { label: 'ISO', val1: 98, val2: 95 }, { label: 'GDPR', val1: 100, val2: 100 }, { label: 'PCI', val1: 99, val2: 98 }],
          providers: [{ name: 'SOC 2 Trust Principles', amount: '100% Passed', color: 'bg-emerald-500' }, { name: 'HIPAA Safeguards', amount: '100% Passed', color: 'bg-blue-600' }, { name: 'ISO 27001 Annex A', amount: '99.4% Passed', color: 'bg-indigo-600' }, { name: 'GDPR Data Rights', amount: 'Verified', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'cloud-posture',
        number: '02',
        title: 'Cloud Security Posture (CSPM)',
        icon: <Cloud className="w-4 h-4" />,
        tagline: 'Detect misconfigured S3 buckets, open security groups, and unencrypted databases instantly.',
        features: ['Automated 1-click remediation', 'CIS Benchmark compliance mapping', 'Multi-cloud posture evaluation', 'Real-time alert dispatch'],
        preview: {
          title: 'Cloud Security Posture',
          bars: [{ label: 'AWS', val1: 98, val2: 95 }, { label: 'Azure', val1: 100, val2: 98 }, { label: 'GCP', val1: 96, val2: 94 }, { label: 'K8s', val1: 99, val2: 96 }, { label: 'DB', val1: 100, val2: 100 }],
          providers: [{ name: 'S3 Encryption', amount: '100% Enforced', color: 'bg-emerald-500' }, { name: 'Open Ports (0.0.0.0/0)', amount: '0 Detected', color: 'bg-blue-600' }, { name: 'IAM MFA Coverage', amount: '100%', color: 'bg-purple-600' }, { name: 'Remediation Bot', amount: 'Active', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'access-reviews',
        number: '03',
        title: 'User Access Reviews & RBAC',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Quarterly access certification workflows with auto-deactivation for dormant employee accounts.',
        features: ['Automated quarterly review campaigns', 'Dormant account auto-flagging', 'Privileged role escalation timer', 'SSO & Okta/Entra ID synchronization'],
        preview: {
          title: 'Access Review Campaign',
          bars: [{ label: 'Q1', val1: 100, val2: 100 }, { label: 'Q2', val1: 100, val2: 100 }, { label: 'Q3', val1: 98, val2: 95 }, { label: 'Q4', val1: 95, val2: 90 }, { label: 'Live', val1: 100, val2: 98 }],
          providers: [{ name: 'Access Review Status', amount: '100% Certified', color: 'bg-emerald-500' }, { name: 'Dormant Accounts', amount: '0 Inactive', color: 'bg-blue-600' }, { name: 'Superadmin Roles', amount: '3 Approved', color: 'bg-purple-600' }, { name: 'SSO Enforcement', amount: 'Enforced', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'vendor-risk',
        number: '04',
        title: 'Vendor Risk Management',
        icon: <FileCheck className="w-4 h-4" />,
        tagline: 'Track third-party SaaS security certifications, SOC 2 reports, and sub-processor agreements.',
        features: ['AI vendor SOC 2 report parser', 'Subprocessor GDPR registry', 'Renewal & review alert notifications', 'Security posture scoring by vendor'],
        preview: {
          title: 'Third-Party Risk Score',
          bars: [{ label: 'Tier 1', val1: 100, val2: 100 }, { label: 'Tier 2', val1: 96, val2: 92 }, { label: 'Tier 3', val1: 94, val2: 90 }, { label: 'SaaS', val1: 98, val2: 95 }, { label: 'AI', val1: 100, val2: 98 }],
          providers: [{ name: 'Approved Vendors', amount: '48 Verified', color: 'bg-emerald-500' }, { name: 'Pending Review', amount: '0 Items', color: 'bg-blue-600' }, { name: 'DPA Agreements', amount: '100% Signed', color: 'bg-purple-600' }, { name: 'Average Risk', amount: 'Low (0.4%)', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'policy-center',
        number: '05',
        title: 'Automated Policy Management',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Pre-built security policy templates with automated employee acknowledgment tracking.',
        features: ['24 auditor-approved policy templates', 'Employee signature tracking', 'Annual revision change log', 'Security awareness training sync'],
        preview: {
          title: 'Policy Signatures',
          bars: [{ label: 'InfoSec', val1: 100, val2: 100 }, { label: 'Access', val1: 100, val2: 99 }, { label: 'Incident', val1: 100, val2: 100 }, { label: 'Remote', val1: 98, val2: 95 }, { label: 'AI Code', val1: 100, val2: 100 }],
          providers: [{ name: 'Employee Acceptance', amount: '100% Signed', color: 'bg-emerald-500' }, { name: 'Published Policies', amount: '18 Active', color: 'bg-blue-600' }, { name: 'Training Completion', amount: '99.2%', color: 'bg-purple-600' }, { name: 'Auditor Approval', amount: 'Confirmed', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'vulnerability-mgmt',
        number: '06',
        title: 'Continuous Vulnerability SLA',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Track Mean Time to Remediate (MTTR) for critical CVEs and maintain strict audit SLAs.',
        features: ['Automated CVE severity classification', 'Jira ticket auto-generation', 'SLA breach escalation triggers', 'Zero false-positive suppression'],
        preview: {
          title: 'Vulnerability SLAs',
          bars: [{ label: 'Crit', val1: 100, val2: 100 }, { label: 'High', val1: 98, val2: 95 }, { label: 'Med', val1: 94, val2: 90 }, { label: 'Low', val1: 90, val2: 85 }, { label: 'Zero', val1: 100, val2: 100 }],
          providers: [{ name: 'Critical Fix SLA', amount: '< 24 Hours', color: 'bg-emerald-500' }, { name: 'Overdue CVEs', amount: '0 Overdue', color: 'bg-blue-600' }, { name: 'Scanned Repos', amount: '64 Clean', color: 'bg-purple-600' }, { name: 'SLA Adherence', amount: '99.8%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'auditor-portal',
        number: '07',
        title: 'Direct Auditor Data Room',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Give CPA auditors read-only access to continuous evidence rooms for fast 2-week audits.',
        features: ['Watermarked read-only auditor access', 'Exportable ZIP evidence binders', 'Sample request instant retrieval', 'Historical evidence retention'],
        preview: {
          title: 'Auditor Data Room',
          bars: [{ label: 'E1', val1: 100, val2: 100 }, { label: 'E2', val1: 100, val2: 100 }, { label: 'E3', val1: 100, val2: 98 }, { label: 'E4', val1: 100, val2: 100 }, { label: 'E5', val1: 100, val2: 100 }],
          providers: [{ name: 'Auditor Access', amount: 'Active (CPA)', color: 'bg-emerald-500' }, { name: 'Evidence Attached', amount: '480 Items', color: 'bg-blue-600' }, { name: 'Audit Phase', amount: 'Fieldwork Ready', color: 'bg-purple-600' }, { name: 'Time to Complete', amount: '10 Days Left', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'trust-center',
        number: '08',
        title: 'Public Trust Center & NDA',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Share real-time compliance badges and automated NDA-gated reports with enterprise prospects.',
        features: ['Custom branded trust center', 'Automated clickwrap NDA workflows', 'Live security control status badge', 'Enterprise sales accelerator'],
        preview: {
          title: 'Trust Center Portal',
          bars: [{ label: 'Views', val1: 95, val2: 90 }, { label: 'NDAs', val1: 98, val2: 95 }, { label: 'SOC2', val1: 100, val2: 100 }, { label: 'Deals', val1: 92, val2: 88 }, { label: 'Pass', val1: 100, val2: 100 }],
          providers: [{ name: 'Enterprise Trust Score', amount: '100% Top Tier', color: 'bg-emerald-500' }, { name: 'NDAs Executed', amount: '124 Deals', color: 'bg-blue-600' }, { name: 'Security Questionnaire', amount: 'Instant AI Fill', color: 'bg-purple-600' }, { name: 'Sales Velocity', amount: '3x Faster', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Accelerate enterprise deals and automate regulatory readiness',
    useCases: [
      { id: 'c-uc1', title: 'SOC 2 & ISO Certification', desc: 'Achieve SOC 2 Type II compliance in weeks instead of months.', icon: <CheckCircle2 className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'c-uc2', title: 'Automated Evidence Sync', desc: 'Eliminate manual screenshots and spreadsheet tracking.', icon: <FileCheck className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'c-uc3', title: 'Continuous Cloud Posture', desc: 'Prevent drift and unencrypted storage across cloud accounts.', icon: <Cloud className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'c-uc4', title: 'Enterprise Trust Center', desc: 'Shorten enterprise sales cycles with automated security reports.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects directly to your clouds and identity providers',
    integrations: [
      { name: 'AWS Cloud', logoKey: 'aws' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Google Cloud', logoKey: 'gcp' },
      { name: 'GitHub', logoKey: 'github' },
      { name: 'Kubernetes', logoKey: 'kubernetes' },
      { name: 'Terraform', logoKey: 'terraform' },
      { name: 'Slack Alerts', logoKey: 'slack' }
    ],
    ctaTitle: 'Ready to automate your compliance controls?',
    ctaSubtitle: 'Connect your cloud providers and get an instant audit-readiness posture assessment.',
    relatedHeadline: 'Explore related enterprise governance products',
    relatedOfferings: [
      { id: 'audit', type: 'product', name: 'Audit', desc: 'Immutable trail of records.', icon: <FileText className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize cloud expenditure.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'testing', type: 'product', name: 'Testing', desc: 'Automate synthetic evals.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Automate release pipelines.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Platform operational data.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' }
    ],
    videoModal: {
      title: 'Compliance Platform Walkthrough',
      subtitle: 'Continuous SOC 2, HIPAA, and ISO 27001 Automation',
      heroCardTitle: 'Watch Automated Compliance in Action',
      heroCardDesc: 'See how SNS Square Compliance collects audit evidence in real time, flags security drift, and generates auditor data rooms.',
      highlights: [{ label: '100% Automated', sub: 'Zero spreadsheet busywork' }, { label: '14 Days', sub: 'Audit turnaround' }, { label: 'Continuous', sub: '24/7 posture checks' }]
    }
  },

  monitoring: {
    id: 'monitoring',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'Monitoring',
    badgeIcon: <Activity className="w-3.5 h-3.5 text-sky-600" />,
    heroIcon: <Activity className="w-6 h-6" />,
    heroIconBg: 'bg-sky-50/90',
    heroIconColor: 'text-sky-700',
    heroIconBorder: 'border-sky-100/80',
    headline1: 'Unified observability.',
    headline2: 'Intelligent anomaly detection.',
    subtitle: 'Full-stack observability platform that unifies distributed tracing, metric telemetry, real-time log analysis, AI model latency monitoring, and automated anomaly alerting across every service and cloud region.',
    openButtonText: 'Open Monitoring',
    heroIllustration: {
      cardTitle: 'Observability Command Center',
      cardSub: '48 Nodes · 99.99% Uptime',
      cardBadge: 'All Systems Operational',
      annotationText: 'Real-Time Telemetry\nZero Blind Spots',
      checklist: ['Full-Stack Distributed Tracing', 'AI Inference Latency Tracking', 'Dynamic Anomaly Detection'],
      bars: [
        { height: '45%', bg: 'bg-sky-300' },
        { height: '65%', bg: 'bg-sky-400' },
        { height: '82%', bg: 'bg-sky-500' },
        { height: '96%', bg: 'bg-sky-600' },
        { height: '72%', bg: 'bg-sky-400' },
        { height: '99%', bg: 'bg-[#0284C7]' }
      ],
      curveColor: '#0284C7'
    },
    metrics: [
      { label: 'Monitored Endpoints', value: '48 Nodes', icon: <Server className="w-6 h-6" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-600', iconBorder: 'border-sky-100' },
      { label: 'Average Response Latency', value: '42ms', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Global Service Uptime', value: '99.99%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Incidents Auto-Resolved', value: '94%', icon: <Activity className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Comprehensive full-stack observability for every layer of your infrastructure',
    capabilities: [
      {
        id: 'distributed-tracing',
        number: '01',
        title: 'Full-Stack Distributed Tracing',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Instrument every microservice with OpenTelemetry and trace requests end-to-end across all service boundaries.',
        features: ['OpenTelemetry auto-instrumentation SDK', 'Sub-millisecond span attribution', 'Flame graph and waterfall trace viewer', 'Cross-service dependency topology map'],
        preview: {
          title: 'Distributed Trace Telemetry',
          bars: [{ label: 'Auth', val1: 99, val2: 96 }, { label: 'API', val1: 100, val2: 98 }, { label: 'DB', val1: 98, val2: 94 }, { label: 'Cache', val1: 100, val2: 100 }, { label: 'Queue', val1: 96, val2: 92 }],
          providers: [{ name: 'Trace Fidelity', amount: '100% Sampled', color: 'bg-sky-500' }, { name: 'Span Precision', amount: '< 1ms', color: 'bg-blue-600' }, { name: 'Topology Graph', amount: 'Auto-Generated', color: 'bg-indigo-600' }, { name: 'Retention', amount: '90 Days', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'ai-latency',
        number: '02',
        title: 'AI Inference Latency & Token Telemetry',
        icon: <Cpu className="w-4 h-4" />,
        tagline: 'Monitor Gemini, GPT-4o, and Claude inference latency, token spend, and error rates per model endpoint.',
        features: ['Per-model p50 / p95 / p99 latency', 'Token consumption and cost attribution', 'Prompt-level error rate tracking', 'Model endpoint availability dashboards'],
        preview: {
          title: 'AI Model Telemetry',
          bars: [{ label: 'Gemini', val1: 98, val2: 95 }, { label: 'GPT-4o', val1: 97, val2: 94 }, { label: 'Claude', val1: 99, val2: 96 }, { label: 'Tokens', val1: 100, val2: 98 }, { label: 'Cost', val1: 100, val2: 100 }],
          providers: [{ name: 'p99 Latency', amount: '< 800ms', color: 'bg-sky-500' }, { name: 'Token Budget', amount: 'Real-time', color: 'bg-blue-600' }, { name: 'Error Rate', amount: '0.02%', color: 'bg-emerald-500' }, { name: 'Model Coverage', amount: '8 Endpoints', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'anomaly-detection',
        number: '03',
        title: 'Dynamic Threshold Anomaly Detection',
        icon: <Activity className="w-4 h-4" />,
        tagline: 'ML-powered baselines that auto-tune alert thresholds based on traffic seasonality to eliminate false alarms.',
        features: ['Seasonality-aware alert thresholds', 'Multivariate metric correlation engine', 'Automated root cause ranking', 'Slack, PagerDuty, and OpsGenie dispatch'],
        preview: {
          title: 'Anomaly Intelligence',
          bars: [{ label: 'Baseline', val1: 100, val2: 98 }, { label: 'Spike', val1: 98, val2: 95 }, { label: 'Detect', val1: 100, val2: 100 }, { label: 'Rank', val1: 96, val2: 92 }, { label: 'Alert', val1: 100, val2: 100 }],
          providers: [{ name: 'False Positive Rate', amount: '< 0.1%', color: 'bg-sky-500' }, { name: 'Detection Speed', amount: '< 90s', color: 'bg-emerald-500' }, { name: 'Root Cause Rank', amount: 'Automated', color: 'bg-indigo-600' }, { name: 'Integrations', amount: 'PD / OpsGenie', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'slo-sli',
        number: '04',
        title: 'SLO / SLI Reliability Tracking',
        icon: <CheckCircle2 className="w-4 h-4" />,
        tagline: 'Define custom Service Level Objectives and burn-rate alerts to protect your error budget before SLAs are breached.',
        features: ['Custom SLO builder per endpoint', 'Error budget burn-rate visualization', 'Customer-facing SLA status page', 'Automated SLO breach incident tickets'],
        preview: {
          title: 'SLO Compliance',
          bars: [{ label: 'Auth', val1: 100, val2: 100 }, { label: 'API', val1: 99, val2: 98 }, { label: 'DB', val1: 100, val2: 99 }, { label: 'CDN', val1: 99, val2: 97 }, { label: 'AI', val1: 100, val2: 100 }],
          providers: [{ name: 'SLO Adherence', amount: '99.99% Met', color: 'bg-emerald-500' }, { name: 'Error Budget Left', amount: '94%', color: 'bg-sky-500' }, { name: 'Status Page', amount: 'Public Live', color: 'bg-blue-600' }, { name: 'Burn-Rate Alert', amount: 'Active', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'log-intelligence',
        number: '05',
        title: 'Real-Time Log Intelligence Engine',
        icon: <Search className="w-4 h-4" />,
        tagline: 'Ingest, parse, and search billions of structured and unstructured log lines in milliseconds using semantic queries.',
        features: ['Auto-parsed JSON and plaintext logs', 'Natural language log search queries', 'Regex and Lucene query support', 'Retention policies with cold S3 archival'],
        preview: {
          title: 'Log Query Speed',
          bars: [{ label: 'Ingest', val1: 100, val2: 100 }, { label: 'Parse', val1: 100, val2: 98 }, { label: 'Index', val1: 99, val2: 97 }, { label: 'Query', val1: 100, val2: 100 }, { label: 'Export', val1: 100, val2: 100 }],
          providers: [{ name: 'Query Latency', amount: '< 45ms', color: 'bg-sky-500' }, { name: 'Log Volume', amount: '2B+ Lines/Day', color: 'bg-blue-600' }, { name: 'NL Search', amount: 'AI-Powered', color: 'bg-indigo-600' }, { name: 'Cold Archival', amount: 'Auto S3', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'alert-routing',
        number: '06',
        title: 'Intelligent Alert Routing & Runbooks',
        icon: <Clock className="w-4 h-4" />,
        tagline: 'Route alerts to the right on-call engineer with context-rich runbook attachments and auto-remediation playbooks.',
        features: ['On-call schedule rotation management', 'Runbook attachment on alert trigger', 'Auto-remediation playbook execution', 'Post-incident retrospective generator'],
        preview: {
          title: 'On-Call Alert Dispatch',
          bars: [{ label: 'Route', val1: 100, val2: 100 }, { label: 'Runbook', val1: 98, val2: 95 }, { label: 'Ack', val1: 97, val2: 94 }, { label: 'Fix', val1: 96, val2: 92 }, { label: 'Post', val1: 100, val2: 100 }],
          providers: [{ name: 'Mean Time to Ack', amount: '< 3 Minutes', color: 'bg-sky-500' }, { name: 'Auto-Remediation', amount: '38% of Alerts', color: 'bg-emerald-500' }, { name: 'Runbook Attach', amount: '100% Triggered', color: 'bg-blue-600' }, { name: 'Retrospectives', amount: 'AI-Generated', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'dashboard-studio',
        number: '07',
        title: 'No-Code Dashboard & Metric Studio',
        icon: <Monitor className="w-4 h-4" />,
        tagline: 'Build pixel-perfect executive and engineering dashboards from 100+ metric sources with drag-and-drop panels.',
        features: ['Drag-and-drop multi-panel layouts', '100+ pre-built Grafana-compatible panels', 'Scheduled PDF dashboard digest emails', 'Public embed for status sites'],
        preview: {
          title: 'Dashboard Studio',
          bars: [{ label: 'Layout', val1: 100, val2: 100 }, { label: 'Sources', val1: 100, val2: 98 }, { label: 'Panels', val1: 98, val2: 96 }, { label: 'Alert', val1: 99, val2: 97 }, { label: 'Share', val1: 100, val2: 100 }],
          providers: [{ name: 'Dashboard Templates', amount: '80+ Ready', color: 'bg-sky-500' }, { name: 'Data Sources', amount: '100+ Native', color: 'bg-blue-600' }, { name: 'Digest Emails', amount: 'Scheduled PDF', color: 'bg-indigo-600' }, { name: 'Embed Support', amount: 'Public / SSO', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'multi-cloud-inventory',
        number: '08',
        title: 'Multi-Cloud Infrastructure Inventory',
        icon: <Database className="w-4 h-4" />,
        tagline: 'Automatically discovers and maps every EC2, GKE pod, Azure VM, and container across all environments.',
        features: ['Auto-discovery across AWS, Azure, and GCP', 'Kubernetes pod and namespace health', 'Container image version tracking', 'Cost-enriched resource tagging'],
        preview: {
          title: 'Multi-Cloud Inventory',
          bars: [{ label: 'AWS', val1: 100, val2: 100 }, { label: 'GCP', val1: 98, val2: 96 }, { label: 'Azure', val1: 99, val2: 97 }, { label: 'K8s', val1: 100, val2: 100 }, { label: 'Tags', val1: 98, val2: 95 }],
          providers: [{ name: 'Discovered Resources', amount: '1,248 Nodes', color: 'bg-sky-500' }, { name: 'K8s Namespaces', amount: '24 Tracked', color: 'bg-blue-600' }, { name: 'Untagged Resources', amount: '0 Remaining', color: 'bg-emerald-500' }, { name: 'Cloud Providers', amount: 'AWS + GCP + Azure', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Keep every service healthy, fast, and observable at any scale',
    useCases: [
      { id: 'm-uc1', title: 'Production Incident Response', desc: 'Trace root cause from alert to offending span in under 3 minutes with correlated logs, traces, and metric signals.', icon: <Activity className="w-5 h-5" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-600', iconBorder: 'border-sky-100' },
      { id: 'm-uc2', title: 'SLO & Uptime SLA Enforcement', desc: 'Protect error budgets and auto-notify customers when uptime drops below contractual SLA commitments.', icon: <CheckCircle2 className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'm-uc3', title: 'AI Model Performance Tracking', desc: 'Track LLM inference latency, token consumption, and cost per model to optimize AI spend and quality.', icon: <Cpu className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'm-uc4', title: 'Cloud Cost & Resource Waste', desc: 'Correlate metric utilization with resource spend to spot oversized instances and idle services draining budget.', icon: <Database className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your entire cloud, Kubernetes, and DevOps ecosystem',
    integrations: [
      { name: 'AWS CloudWatch', logoKey: 'aws' },
      { name: 'Google Cloud', logoKey: 'gcp' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Kubernetes', logoKey: 'kubernetes' },
      { name: 'GitHub Actions', logoKey: 'github' },
      { name: 'Terraform', logoKey: 'terraform' },
      { name: 'Slack Alerts', logoKey: 'slack' }
    ],
    ctaTitle: 'Achieve zero blind spots across your entire stack',
    ctaSubtitle: 'Connect your cloud accounts and instrument your first service in under 5 minutes with OpenTelemetry auto-instrumentation.',
    relatedHeadline: 'Explore related operational intelligence products',
    relatedOfferings: [
      { id: 'compliance', type: 'product', name: 'Compliance', desc: 'Automate SOC 2 and regulatory controls.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'audit', type: 'product', name: 'Audit', desc: 'Immutable cryptographic event trail.', icon: <FileText className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize cloud expenditure and waste.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Autonomous CI/CD pipeline automation.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Unified data warehouse intelligence.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' },
      { id: 'testing', type: 'product', name: 'Testing', desc: 'Automated synthetic load & eval testing.', icon: <Sliders className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' }
    ],
    videoModal: {
      title: 'Monitoring Platform Walkthrough',
      subtitle: 'Full-Stack Distributed Tracing & Anomaly Detection',
      heroCardTitle: 'Watch Real-Time Observability in Action',
      heroCardDesc: 'See how SNS Square Monitoring traces requests end-to-end, detects latency anomalies automatically, and routes incidents to the right on-call engineer with runbook context.',
      highlights: [{ label: '99.99%', sub: 'Global uptime SLA' }, { label: '< 90s', sub: 'Anomaly detection speed' }, { label: '48 Nodes', sub: 'Monitored endpoints' }]
    }
  },

  analytics: {
    id: 'analytics',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'Analytics',
    badgeIcon: <BarChart2 className="w-3.5 h-3.5 text-amber-600" />,
    heroIcon: <BarChart2 className="w-6 h-6" />,
    heroIconBg: 'bg-amber-50/90',
    heroIconColor: 'text-amber-700',
    heroIconBorder: 'border-amber-100/80',
    headline1: 'Actionable intelligence.',
    headline2: 'Data-driven decision making.',
    subtitle: 'Unified business intelligence, user behavioral funnels, AI token economics, and operational analytics with instant natural-language querying.',
    openButtonText: 'Open Analytics',
    heroIllustration: {
      cardTitle: 'Executive Growth & BI Board',
      cardSub: 'Real-Time Insights Feed',
      cardBadge: '+42% MRR Growth',
      annotationText: 'Real-time Telemetry\nInstant Insights',
      checklist: ['Natural Language Querying', 'AI Cost Attribution', 'Interactive User Funnels'],
      bars: [
        { height: '35%', bg: 'bg-amber-300' },
        { height: '55%', bg: 'bg-amber-400' },
        { height: '75%', bg: 'bg-amber-500' },
        { height: '90%', bg: 'bg-amber-600' },
        { height: '65%', bg: 'bg-amber-400' },
        { height: '98%', bg: 'bg-[#D97706]' }
      ],
      curveColor: '#D97706'
    },
    metrics: [
      { label: 'Daily Processed Events', value: '1.8 Billion', icon: <Activity className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { label: 'Query Execution Speed', value: '< 180ms', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Conversion Lift', value: '+28.4%', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Data Freshness SLA', value: '< 2 Secs', icon: <Clock className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    capabilitiesHeadline: 'Deep platform analytics from infrastructure metrics to customer LTV',
    capabilities: [
      {
        id: 'user-funnels',
        number: '01',
        title: 'User Journey & Conversion Funnels',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: 'Pinpoint friction points, drop-off stages, and user conversion velocity across web and mobile.',
        features: ['Multi-step conversion funnels', 'Cohort retention heatmaps', 'Session replay correlation', 'Feature adoption tracking'],
        preview: {
          title: 'Conversion Funnel Stages',
          bars: [{ label: 'Visit', val1: 100, val2: 95 }, { label: 'Signup', val1: 75, val2: 70 }, { label: 'Actv', val1: 58, val2: 52 }, { label: 'Sub', val1: 42, val2: 38 }, { label: 'Retain', val1: 36, val2: 32 }],
          providers: [{ name: 'Landing to Signup', amount: '75.0%', color: 'bg-amber-500' }, { name: 'Active User Onboarding', amount: '58.4%', color: 'bg-blue-600' }, { name: 'Paid Conversion', amount: '42.1%', color: 'bg-emerald-500' }, { name: '90-Day Retention', amount: '88.4%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'ai-token-bi',
        number: '02',
        title: 'AI Usage & Token Economics',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Track model prompt/completion token consumption, latency, and cost per tenant in real time.',
        features: ['Cost per user prompt breakdown', 'Model latency vs price analysis', 'Agent workflow ROI metrics', 'Token quota burn rate projections'],
        preview: {
          title: 'AI Economics Board',
          bars: [{ label: 'Claude', val1: 85, val2: 70 }, { label: 'GPT-4o', val1: 90, val2: 75 }, { label: 'Gemini', val1: 78, val2: 60 }, { label: 'Llama', val1: 45, val2: 35 }, { label: 'Embed', val1: 30, val2: 20 }],
          providers: [{ name: 'Token Spend / User', amount: '$0.0034', color: 'bg-amber-500' }, { name: 'Cache Hit Savings', amount: '$4,250/mo', color: 'bg-emerald-500' }, { name: 'Average Prompt Latency', amount: '380ms', color: 'bg-blue-600' }, { name: 'Gross Margin', amount: '79.2%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'nl-query',
        number: '03',
        title: 'Natural Language SQL Querying',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Ask complex analytical questions in plain English and receive instant charts and query plans.',
        features: ['AI text-to-SQL compiler', 'Semantic schema dictionary', 'Automated visualization selection', 'Exportable SQL and CSV reports'],
        preview: {
          title: 'Natural Language Insights',
          bars: [{ label: 'Query', val1: 98, val2: 95 }, { label: 'Parse', val1: 100, val2: 98 }, { label: 'Exec', val1: 96, val2: 92 }, { label: 'Chart', val1: 100, val2: 98 }, { label: 'Cache', val1: 99, val2: 96 }],
          providers: [{ name: 'Query Accuracy', amount: '99.4%', color: 'bg-emerald-500' }, { name: 'Exec Time', amount: '140ms', color: 'bg-amber-500' }, { name: 'Auto-Chart Type', amount: 'Smart Area', color: 'bg-blue-600' }, { name: 'Saved Dashboards', amount: '32 Items', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'realtime-stream',
        number: '04',
        title: 'Real-Time Streaming Engine',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Process millions of incoming streaming telemetry events per second with sub-2-second data freshness.',
        features: ['Kafka & ClickHouse streaming pipeline', 'Zero-latency sliding window aggregations', 'Live leaderboard computation', 'Anomaly alert thresholds'],
        preview: {
          title: 'Streaming Ingestion Feed',
          bars: [{ label: '00s', val1: 85, val2: 70 }, { label: '15s', val1: 90, val2: 75 }, { label: '30s', val1: 95, val2: 80 }, { label: '45s', val1: 88, val2: 72 }, { label: '60s', val1: 98, val2: 85 }],
          providers: [{ name: 'Ingestion Rate', amount: '120k evt/s', color: 'bg-amber-500' }, { name: 'Processing Lag', amount: '1.2 secs', color: 'bg-emerald-500' }, { name: 'Storage Compression', amount: '8.4x', color: 'bg-blue-600' }, { name: 'Buffer Reliability', amount: '100%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'predictive-forecast',
        number: '05',
        title: 'Predictive ML Forecasting',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Forecast seasonal churn, revenue run rates, and capacity demand with machine learning models.',
        features: ['Automated time-series ARIMA & Prophet models', 'Churn risk predictive scoring', 'Capacity exhaustion forecasting', 'Confidence interval bounds'],
        preview: {
          title: 'Forecast Runway Model',
          bars: [{ label: 'M1', val1: 60, val2: 55 }, { label: 'M2', val1: 75, val2: 68 }, { label: 'M3', val1: 88, val2: 80 }, { label: 'M4', val1: 95, val2: 88 }, { label: 'M5', val1: 100, val2: 94 }],
          providers: [{ name: 'Forecast Confidence', amount: '95% Bounds', color: 'bg-emerald-500' }, { name: 'Projected MRR', amount: '$420,000', color: 'bg-amber-500' }, { name: 'Expected Churn', amount: '< 0.8%', color: 'bg-blue-600' }, { name: 'Capacity Headroom', amount: '8 Months', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'executive-reports',
        number: '06',
        title: 'Executive PDF & Digest Exports',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Automated weekly Slack digests, scheduled email PDF reports, and executive summary dashboards.',
        features: ['Scheduled PDF report generation', 'Slack & email digest summaries', 'Custom executive branding', 'Role-based access permissions'],
        preview: {
          title: 'Automated Digest Queue',
          bars: [{ label: 'Mon', val1: 90, val2: 85 }, { label: 'Tue', val1: 92, val2: 88 }, { label: 'Wed', val1: 95, val2: 90 }, { label: 'Thu', val1: 98, val2: 94 }, { label: 'Fri', val1: 100, val2: 98 }],
          providers: [{ name: 'Weekly Digest', amount: 'Sent (Monday)', color: 'bg-emerald-500' }, { name: 'Subscribed Execs', amount: '28 Leaders', color: 'bg-amber-500' }, { name: 'PDF Generation', amount: 'Automated', color: 'bg-blue-600' }, { name: 'Digest Open Rate', amount: '92.4%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'custom-metrics',
        number: '07',
        title: 'Custom Metric Formula Builder',
        icon: <Sliders className="w-4 h-4" />,
        tagline: 'Combine disparate database tables and telemetry counters into high-level business formulas.',
        features: ['Drag-and-drop metric formula editor', 'Cross-table calculated dimensions', 'Custom SQL transformation steps', 'Version-controlled metric repository'],
        preview: {
          title: 'Formula Engine Output',
          bars: [{ label: 'LTV', val1: 85, val2: 70 }, { label: 'CAC', val1: 50, val2: 40 }, { label: 'Magic', val1: 95, val2: 90 }, { label: 'NPS', val1: 92, val2: 88 }, { label: 'Burn', val1: 40, val2: 30 }],
          providers: [{ name: 'LTV / CAC Ratio', amount: '4.8x (Elite)', color: 'bg-emerald-500' }, { name: 'Magic Number', amount: '1.42', color: 'bg-amber-500' }, { name: 'Custom Metrics', amount: '46 Formulas', color: 'bg-blue-600' }, { name: 'Formula Sync', amount: 'Real-Time', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'embedded-analytics',
        number: '08',
        title: 'Customer-Facing Embedded Charts',
        icon: <Compass className="w-4 h-4" />,
        tagline: 'Embed interactive dashboards and usage graphs directly into your own customer-facing product.',
        features: ['Secure tenant-isolated iframe & React SDK', 'Custom CSS theming engine', 'Granular row-level security (RLS)', 'Interactive filtering for end-users'],
        preview: {
          title: 'Embedded Portal SDK',
          bars: [{ label: 'T1', val1: 98, val2: 95 }, { label: 'T2', val1: 96, val2: 92 }, { label: 'T3', val1: 99, val2: 96 }, { label: 'T4', val1: 97, val2: 94 }, { label: 'T5', val1: 100, val2: 98 }],
          providers: [{ name: 'Embedded SDK', amount: 'React / Next.js', color: 'bg-emerald-500' }, { name: 'Tenant RLS Security', amount: 'Strict', color: 'bg-blue-600' }, { name: 'SDK Render Time', amount: '24ms', color: 'bg-amber-500' }, { name: 'Customer NPS', amount: '84 (+12)', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Transform raw data into strategic competitive advantage',
    useCases: [
      { id: 'a-uc1', title: 'Executive BI Dashboard', desc: 'Single source of truth for revenue, retention, and growth.', icon: <BarChart2 className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { id: 'a-uc2', title: 'AI Unit Economics', desc: 'Optimize margin per customer prompt and agent session.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'a-uc3', title: 'Product Retention Funnel', desc: 'Identify friction and increase user onboarding conversions.', icon: <Activity className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'a-uc4', title: 'Customer Embedded Insights', desc: 'Ship beautiful tenant analytics in your SaaS product in hours.', icon: <Compass className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    integrationsHeadline: 'Connects to your data lakes, warehouses, and databases',
    integrations: [
      { name: 'Snowflake', logoKey: 'snowflake' },
      { name: 'Databricks', logoKey: 'databricks' },
      { name: 'Google Cloud BigQuery', logoKey: 'gcp' },
      { name: 'AWS Redshift', logoKey: 'aws' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'GitHub', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to unlock data-driven platform insights?',
    ctaSubtitle: 'Connect your database or telemetry stream and generate executive dashboards in minutes.',
    relatedHeadline: 'Explore related operational products',
    relatedOfferings: [
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize multi-cloud costs.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'compliance', type: 'product', name: 'Compliance', desc: 'Automate audit controls.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Streamline CI/CD deployment.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'testing', type: 'product', name: 'Testing', desc: 'Automate synthetic evals.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' },
      { id: 'audit', type: 'product', name: 'Audit', desc: 'Immutable trail of records.', icon: <FileText className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' }
    ],
    videoModal: {
      title: 'Analytics Platform Walkthrough',
      subtitle: 'Real-Time Business Intelligence & AI Telemetry',
      heroCardTitle: 'Watch Analytics in Action',
      heroCardDesc: 'See how SNS Square Analytics ingests billions of events, calculates tenant unit economics, and answers questions in natural language.',
      highlights: [{ label: '< 180ms', sub: 'Sub-second queries' }, { label: 'AI Powered', sub: 'Natural language BI' }, { label: 'Embedded SDK', sub: 'Customer facing' }]
    }
  },

  audit: {
    id: 'audit',
    type: 'product',
    breadcrumbCategory: 'Products',
    badgeTitle: 'Audit',
    badgeIcon: <FileText className="w-3.5 h-3.5 text-rose-600" />,
    heroIcon: <FileText className="w-6 h-6" />,
    heroIconBg: 'bg-rose-50/90',
    heroIconColor: 'text-rose-700',
    heroIconBorder: 'border-rose-100/80',
    headline1: 'Immutable audit trails.',
    headline2: 'Zero-tampering forensics.',
    subtitle: 'Cryptographically sealed audit logging, role-based change tracking, automated forensic investigations, and full activity provenance across your enterprise.',
    openButtonText: 'Open Audit',
    heroIllustration: {
      cardTitle: 'Tamper-Evident Event Ledger',
      cardSub: 'Immutable Cryptographic Chain',
      cardBadge: '100% Verified',
      annotationText: 'Cryptographic Proof\nZero Tampering',
      checklist: ['Immutable Event Logging', 'Forensic Query Trail', 'Cryptographic Proof'],
      bars: [
        { height: '40%', bg: 'bg-rose-300' },
        { height: '60%', bg: 'bg-rose-400' },
        { height: '80%', bg: 'bg-rose-500' },
        { height: '95%', bg: 'bg-rose-600' },
        { height: '70%', bg: 'bg-rose-400' },
        { height: '100%', bg: 'bg-[#E11D48]' }
      ],
      curveColor: '#E11D48'
    },
    metrics: [
      { label: 'Logged Enterprise Events', value: '450M+', icon: <FileText className="w-6 h-6" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-600', iconBorder: 'border-rose-100' },
      { label: 'Ledger Verification', value: '100% Sealed', icon: <Lock className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Forensic Query Time', value: '< 250ms', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Retention Compliance', value: '7 Years', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    capabilitiesHeadline: 'Enterprise-grade provenance, tamper evidence, and compliance logs',
    capabilities: [
      {
        id: 'immutable-ledger',
        number: '01',
        title: 'Cryptographic Immutable Log Ledger',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Every API request, configuration change, and admin action is sealed in a write-once tamper-evident hash chain.',
        features: ['SHA-256 Merkle tree verification', 'WORM (Write Once Read Many) storage', 'Digital signature provenance', 'Zero-tampering mathematical guarantee'],
        preview: {
          title: 'Ledger Hash Chain',
          bars: [{ label: 'Block 1', val1: 100, val2: 100 }, { label: 'Block 2', val1: 100, val2: 100 }, { label: 'Block 3', val1: 100, val2: 100 }, { label: 'Block 4', val1: 100, val2: 100 }, { label: 'Block 5', val1: 100, val2: 100 }],
          providers: [{ name: 'Merkle Root Integrity', amount: 'Verified Valid', color: 'bg-emerald-500' }, { name: 'Sealed Blocks', amount: '12,400 Blocks', color: 'bg-rose-600' }, { name: 'Tamper Attempts', amount: '0 Detected', color: 'bg-blue-600' }, { name: 'Digital Signatures', amount: 'RSA-4096', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'forensic-search',
        number: '02',
        title: 'Forensic Search & Time Machine',
        icon: <Search className="w-4 h-4" />,
        tagline: 'Search billions of audit events in milliseconds with advanced structured filters and timeline replay.',
        features: ['Sub-second regex and facet search', 'User session timeline replay', 'Diff visualization on config changes', 'Automated export for legal hold'],
        preview: {
          title: 'Forensic Search Stream',
          bars: [{ label: '10ms', val1: 40, val2: 30 }, { label: '50ms', val1: 70, val2: 55 }, { label: '100ms', val1: 95, val2: 80 }, { label: '150ms', val1: 60, val2: 45 }, { label: '200ms', val1: 100, val2: 90 }],
          providers: [{ name: 'Search Latency', amount: '84ms', color: 'bg-emerald-500' }, { name: 'Filtered Events', amount: '1.4M Scanned', color: 'bg-rose-600' }, { name: 'Actor Attribution', amount: '100% Precise', color: 'bg-blue-600' }, { name: 'Legal Hold Exporter', amount: 'Ready', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'admin-tracking',
        number: '03',
        title: 'Privileged Admin Action Tracking',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Track superuser commands, role modifications, and production database queries with high-definition logs.',
        features: ['Terminal command audit logging', 'Database write/delete query capture', 'Break-glass temporary access logs', 'Secondary approval validation trail'],
        preview: {
          title: 'Privileged Actions Log',
          bars: [{ label: 'IAM', val1: 95, val2: 90 }, { label: 'K8s', val1: 98, val2: 95 }, { label: 'DB', val1: 92, val2: 88 }, { label: 'Root', val1: 100, val2: 100 }, { label: 'SSH', val1: 96, val2: 92 }],
          providers: [{ name: 'Superadmin Events', amount: '34 Recorded', color: 'bg-rose-600' }, { name: 'Break-Glass Sessions', amount: '0 Active', color: 'bg-emerald-500' }, { name: 'Database Queries', amount: '100% Logged', color: 'bg-blue-600' }, { name: 'Anomaly Flags', amount: '0 Suspicious', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'ai-prompt-audit',
        number: '04',
        title: 'AI Prompts & Agent Provenance',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Capture input prompts, model responses, system instructions, and tool outputs for AI audit compliance.',
        features: ['Full prompt & response audit log', 'PII redaction before indexing', 'Agent tool call argument verification', 'AI compliance report generation'],
        preview: {
          title: 'AI Prompt Audit Stream',
          bars: [{ label: 'Chat', val1: 95, val2: 90 }, { label: 'Agent', val1: 98, val2: 95 }, { label: 'Tool', val1: 94, val2: 90 }, { label: 'Model', val1: 100, val2: 98 }, { label: 'PII', val1: 100, val2: 100 }],
          providers: [{ name: 'Audited AI Invocations', amount: '4.8M Logged', color: 'bg-emerald-500' }, { name: 'PII Redactions', amount: '100% Scrubbed', color: 'bg-rose-600' }, { name: 'Tool Call Diffs', amount: 'Recorded', color: 'bg-blue-600' }, { name: 'Model Safety Compliance', amount: 'Grade A+', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'retention-rules',
        number: '05',
        title: 'Automated 7-Year Retention Policies',
        icon: <Clock className="w-4 h-4" />,
        tagline: 'Compliant lifecycle tiers transitioning hot data to immutable cold Glacier storage automatically.',
        features: ['Regulatory 7-year storage guarantees', 'Cost-effective tiered lifecycle rules', 'Automated data purge on expiry', 'Tamper-evident legal freeze locks'],
        preview: {
          title: 'Storage Lifecycle Tiers',
          bars: [{ label: 'Hot', val1: 85, val2: 70 }, { label: 'Warm', val1: 75, val2: 60 }, { label: 'Cold', val1: 95, val2: 85 }, { label: 'Glacier', val1: 100, val2: 98 }, { label: 'Freeze', val1: 100, val2: 100 }],
          providers: [{ name: 'Hot Tier (30 Days)', amount: 'Instant Search', color: 'bg-rose-600' }, { name: 'Cold Tier (7 Years)', amount: 'Immutable WORM', color: 'bg-emerald-500' }, { name: 'Legal Freeze Locks', amount: 'Active', color: 'bg-blue-600' }, { name: 'Storage Cost / GB', amount: '$0.00099', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'siem-export',
        number: '06',
        title: 'SIEM & SOC Streaming Export',
        icon: <Activity className="w-4 h-4" />,
        tagline: 'Forward encrypted audit logs to Splunk, Datadog, Microsoft Sentinel, and AWS Security Lake in real time.',
        features: ['Real-time Syslog & HTTPS forwarding', 'Common Event Format (CEF) standardization', 'TLS 1.3 encrypted transport', 'Backpressure buffering queue'],
        preview: {
          title: 'SIEM Forwarding Pipeline',
          bars: [{ label: 'Splunk', val1: 98, val2: 95 }, { label: 'Sentinel', val1: 100, val2: 98 }, { label: 'Datadog', val1: 96, val2: 92 }, { label: 'Lake', val1: 100, val2: 100 }, { label: 'S3', val1: 100, val2: 100 }],
          providers: [{ name: 'Forwarding Latency', amount: '< 500ms', color: 'bg-emerald-500' }, { name: 'Buffer Reliability', amount: '100% Delivery', color: 'bg-rose-600' }, { name: 'Connected SIEMs', amount: '4 Active', color: 'bg-blue-600' }, { name: 'Encrypted Transport', amount: 'mTLS Enabled', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'compliance-mapping',
        number: '07',
        title: 'SOC 2 & HIPAA Audit Mapping',
        icon: <FileCheck className="w-4 h-4" />,
        tagline: 'Map every event directly to SOC 2 Trust Services Criteria, HIPAA Audit Rules, and ISO 27001 clauses.',
        features: ['Automated control cross-referencing', '1-click auditor report bundles', 'Sample selection randomized generator', 'Auditor signature sign-off'],
        preview: {
          title: 'Compliance Control Maps',
          bars: [{ label: 'CC6.1', val1: 100, val2: 100 }, { label: 'CC6.2', val1: 100, val2: 98 }, { label: 'CC6.3', val1: 100, val2: 100 }, { label: 'HIPAA', val1: 100, val2: 100 }, { label: 'ISO', val1: 98, val2: 96 }],
          providers: [{ name: 'SOC 2 Mapped Events', amount: '100% Tagged', color: 'bg-emerald-500' }, { name: 'Auditor Samples', amount: 'Randomized', color: 'bg-rose-600' }, { name: 'Fieldwork Approval', amount: 'Approved', color: 'bg-blue-600' }, { name: 'CPA Export Format', amount: 'Standardized', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'alerting-rules',
        number: '08',
        title: 'Security Incident Alerting',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Trigger instantaneous PagerDuty and Slack alerts on unauthorized privilege grants or mass exports.',
        features: ['Mass data export alert trigger', 'Impossible travel geo-location detection', 'Privilege escalation alarm', 'Automated user session revocation'],
        preview: {
          title: 'Security Alert Engine',
          bars: [{ label: 'Geo', val1: 95, val2: 90 }, { label: 'Export', val1: 98, val2: 95 }, { label: 'Priv', val1: 100, val2: 100 }, { label: 'MFA', val1: 98, val2: 95 }, { label: 'Revoke', val1: 100, val2: 100 }],
          providers: [{ name: 'Critical Incident Alarms', amount: '0 Active', color: 'bg-emerald-500' }, { name: 'Session Revocation', amount: 'Instant API', color: 'bg-rose-600' }, { name: 'Geo-Anomaly Scanner', amount: 'Active', color: 'bg-blue-600' }, { name: 'Alert Dispatch', amount: '< 2 Secs', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Protect enterprise integrity and accelerate security investigations',
    useCases: [
      { id: 'au-uc1', title: 'Forensic Investigation', desc: 'Investigate security incidents with exact second-by-second proof.', icon: <Search className="w-5 h-5" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-600', iconBorder: 'border-rose-100' },
      { id: 'au-uc2', title: 'SOC 2 & HIPAA Audits', desc: 'Provide CPA auditors with tamper-evident cryptographic reports.', icon: <FileCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'au-uc3', title: 'Privileged Access Oversight', desc: 'Ensure zero unauthorized admin mutations across production.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'au-uc4', title: 'AI Governance Provenance', desc: 'Maintain complete traceability of AI prompt calls and tool outputs.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    integrationsHeadline: 'Connects to your security infrastructure and clouds',
    integrations: [
      { name: 'AWS CloudTrail', logoKey: 'aws' },
      { name: 'Microsoft Azure', logoKey: 'azure' },
      { name: 'Google Cloud Audit', logoKey: 'gcp' },
      { name: 'Kubernetes Audit', logoKey: 'kubernetes' },
      { name: 'GitHub Actions', logoKey: 'github' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'Terraform', logoKey: 'terraform' }
    ],
    ctaTitle: 'Ready to seal your enterprise audit records?',
    ctaSubtitle: 'Enable tamper-evident logging across all services and infrastructure in under 2 minutes.',
    relatedHeadline: 'Explore related enterprise products',
    relatedOfferings: [
      { id: 'compliance', type: 'product', name: 'Compliance', desc: 'Automate regulatory checks.', icon: <ShieldCheck className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize cloud expenditure.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'testing', type: 'product', name: 'Testing', desc: 'Automate synthetic evals.', icon: <FlaskConical className="w-4 h-4" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-700', iconBorder: 'border-purple-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Streamline CI/CD pipelines.', icon: <InfinityIcon className="w-4 h-4" />, iconBg: 'bg-orange-50', iconColor: 'text-orange-700', iconBorder: 'border-orange-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Transform data to insights.', icon: <BarChart2 className="w-4 h-4" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-700', iconBorder: 'border-amber-100' }
    ],
    videoModal: {
      title: 'Audit Platform Walkthrough',
      subtitle: 'Cryptographic Provenance & Immutable Logging',
      heroCardTitle: 'Watch Immutable Audit in Action',
      heroCardDesc: 'See how SNS Square Audit seals event logs with SHA-256 Merkle trees, enables instant forensic search, and satisfies 7-year regulatory retention.',
      highlights: [{ label: '100% Sealed', sub: 'Cryptographic proof' }, { label: '< 250ms', sub: 'Forensic search speed' }, { label: '7 Years', sub: 'Compliant retention' }]
    }
  }
};
