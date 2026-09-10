import React from 'react';
import {
  PhoneCall,
  Mail,
  FileText,
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
  Bot,
  Terminal,
  Activity,
  DollarSign,
  ShieldCheck,
  Code,
  Monitor,
  Video,
  Languages,
  Clock,
  Search,
  MessageSquare,
  Mic,
  Calendar,
  CheckSquare,
  FileCheck,
  Download,
  Box,
  Infinity as InfinityIcon
} from 'lucide-react';
import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';

export const agentServicesConfigs: Record<string, OfferingLandingConfig> = {
  'call-for-me': {
    id: 'call-for-me',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'Sales & Support',
    badgeIcon: <PhoneCall className="w-3.5 h-3.5 text-blue-600" />,
    heroIcon: <PhoneCall className="w-6 h-6" />,
    heroIconBg: 'bg-blue-50/90',
    heroIconColor: 'text-blue-700',
    heroIconBorder: 'border-blue-100/80',
    headline1: 'Autonomous voice sales.',
    headline2: '24/7 intelligent customer support.',
    subtitle: 'Deploy human-parity conversational voice agents and omnichannel AI support bots that qualify sales prospects, book meetings, and resolve 85% of tier-1 support tickets in under 400ms.',
    openButtonText: 'Open Sales & Support',
    heroIllustration: {
      cardTitle: 'Voice & Telephony Agent Console',
      cardSub: 'Sub-400ms Turn Latency',
      cardBadge: 'Voice Telephony Active',
      annotationText: 'Sub-400ms Voice\nZero Queue Time',
      checklist: ['Human-Parity Telephony', 'Autonomous CRM Tool Sync', 'Real-Time Escalation Whisper'],
      bars: [
        { height: '45%', bg: 'bg-blue-300' },
        { height: '65%', bg: 'bg-blue-400' },
        { height: '85%', bg: 'bg-blue-500' },
        { height: '98%', bg: 'bg-blue-600' },
        { height: '75%', bg: 'bg-blue-400' },
        { height: '99%', bg: 'bg-[#2563EB]' }
      ]
    },
    metrics: [
      { label: 'Autonomous Ticket Resolution', value: '85%', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Voice Response Latency', value: '< 380ms', icon: <Clock className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Sales Pipeline Velocity', value: '3.8x', icon: <BarChart2 className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Omnichannel Availability', value: '24/7/365', icon: <Cloud className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Enterprise voice agents and customer support automation',
    capabilities: [
      {
        id: 'voice-telephony',
        number: '01',
        title: 'Conversational Voice & Telephony Engine',
        icon: <PhoneCall className="w-4 h-4" />,
        tagline: 'Natural speech-to-speech AI engine with sub-400ms turnaround, dynamic interruption handling, and accent adaptability.',
        features: ['Interruption-friendly duplex audio streaming', 'Emotion and sentiment detection', 'Direct SIP trunking, Twilio & WebRTC', 'Custom branded voice cloning'],
        preview: {
          title: 'Voice Telephony Engine',
          bars: [{ label: 'SIP', val1: 98, val2: 95 }, { label: 'WebRTC', val1: 99, val2: 96 }, { label: 'Audio', val1: 95, val2: 90 }, { label: 'TTS', val1: 100, val2: 98 }, { label: 'CRM', val1: 100, val2: 100 }],
          providers: [{ name: 'Voice Latency', amount: '< 380ms', color: 'bg-emerald-500' }, { name: 'Active Telephony', amount: 'Twilio / SIP', color: 'bg-blue-600' }, { name: 'FCR Rate', amount: '89.4%', color: 'bg-indigo-600' }, { name: 'Cloned Voices', amount: 'Enterprise', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'sales-qualifier',
        number: '02',
        title: 'Autonomous Inbound Sales Prospector',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Qualify inbound website prospects within 60 seconds of form submission to maximize meeting booking conversion.',
        features: ['BANT qualification scoring', 'Instant Google & Outlook calendar booking', 'Objection handling playbooks', 'Automated CRM lead enrichment'],
        preview: {
          title: 'Pipeline Acceleration',
          bars: [{ label: 'Form', val1: 96, val2: 92 }, { label: 'Call', val1: 98, val2: 95 }, { label: 'Score', val1: 95, val2: 90 }, { label: 'Book', val1: 100, val2: 98 }, { label: 'Sync', val1: 100, val2: 100 }],
          providers: [{ name: 'Lead Response', amount: '< 60s', color: 'bg-emerald-500' }, { name: 'Meeting Booking', amount: '3.8x Lift', color: 'bg-blue-600' }, { name: 'CRM Enrichment', amount: '100% Real-time', color: 'bg-purple-600' }, { name: 'Objection Acc', amount: '98.2%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'omnichannel-desk',
        number: '03',
        title: 'Omnichannel Customer Support Desk',
        icon: <MessageSquare className="w-4 h-4" />,
        tagline: 'Unified customer assistance across phone, live chat, email, SMS, and Zendesk tickets with contextual memory.',
        features: ['Universal cross-channel memory', 'Automated Zendesk ticket resolution', 'Knowledge base RAG with citations', 'Deterministic billing guardrails'],
        preview: {
          title: 'Omnichannel Desk',
          bars: [{ label: 'Chat', val1: 95, val2: 90 }, { label: 'Voice', val1: 98, val2: 94 }, { label: 'Email', val1: 92, val2: 88 }, { label: 'Zendesk', val1: 100, val2: 98 }, { label: 'CSAT', val1: 99, val2: 96 }],
          providers: [{ name: 'Tier-1 Deflection', amount: '85.2%', color: 'bg-emerald-500' }, { name: 'Queue Time', amount: '0 Seconds', color: 'bg-blue-600' }, { name: 'CSAT Score', amount: '94.8%', color: 'bg-indigo-600' }, { name: 'Connected Channels', amount: 'Omnichannel', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'human-escalation',
        number: '04',
        title: 'Seamless Human Escalation & Whisper',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Instant live transfer to human operators with full audio transcripts, customer sentiment, and suggested replies.',
        features: ['Zero-hold-time SIP call bridging', 'Live screen whisper summary for reps', 'Suggested responses based on policy', 'Post-call AI co-pilot ticket notes'],
        preview: {
          title: 'Human Handoff Bridge',
          bars: [{ label: 'Detect', val1: 100, val2: 98 }, { label: 'Bridge', val1: 100, val2: 100 }, { label: 'Whisper', val1: 98, val2: 95 }, { label: 'Summary', val1: 100, val2: 99 }, { label: 'Sync', val1: 100, val2: 100 }],
          providers: [{ name: 'Handoff Latency', amount: '< 1.5s', color: 'bg-emerald-500' }, { name: 'Context Loss', amount: '0%', color: 'bg-blue-600' }, { name: 'Whisper Precision', amount: '99.1%', color: 'bg-purple-600' }, { name: 'Call Recording', amount: 'Encrypted', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'crm-tool-execution',
        number: '05',
        title: 'Autonomous CRM & API Tool Calling',
        icon: <Database className="w-4 h-4" />,
        tagline: 'Read and write customer data in Salesforce, HubSpot, Stripe, and internal databases via secure API tool calling.',
        features: ['Stripe payment & subscription lookups', 'PostgreSQL and Snowflake queries', 'Scoped OAuth permissions', 'Webhook dispatches to microservices'],
        preview: {
          title: 'Tool Execution Flow',
          bars: [{ label: 'OAuth', val1: 100, val2: 100 }, { label: 'Stripe', val1: 98, val2: 95 }, { label: 'CRM', val1: 99, val2: 96 }, { label: 'SQL', val1: 96, val2: 92 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'Tool Accuracy', amount: '99.9%', color: 'bg-emerald-500' }, { name: 'Stripe / CRM APIs', amount: 'Native', color: 'bg-blue-600' }, { name: 'Audit Logging', amount: 'SOC 2 Enforced', color: 'bg-purple-600' }, { name: 'API Latency', amount: '< 180ms', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'csat-telemetry',
        number: '06',
        title: 'CSAT & Conversation Telemetry',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: '100% automated quality assurance on all conversations without needing human sampling.',
        features: ['Automated CSAT prediction on 100% calls', 'Topic clustering to uncover product bugs', 'Speech clarity & sentiment heatmaps', 'Downloadable compliance audit logs'],
        preview: {
          title: 'Conversation Telemetry',
          bars: [{ label: 'CSAT', val1: 98, val2: 94 }, { label: 'Sentiment', val1: 96, val2: 92 }, { label: 'QA', val1: 100, val2: 98 }, { label: 'Speech', val1: 99, val2: 95 }, { label: 'Reports', val1: 100, val2: 100 }],
          providers: [{ name: 'QA Coverage', amount: '100% of Calls', color: 'bg-emerald-500' }, { name: 'Sentiment Heatmap', amount: 'Real-time', color: 'bg-blue-600' }, { name: 'Bug Clustering', amount: 'Automated', color: 'bg-indigo-600' }, { name: 'Export Format', amount: 'CSV / PDF', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'enterprise-security',
        number: '07',
        title: 'Enterprise Privacy & PCI Redaction',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Audio streams and transcripts are scrubbed of credit card numbers, SSNs, and passwords before logging.',
        features: ['Real-time PII & PCI audio bleeping', 'Dedicated single-tenant VPC deployments', 'Custom retention policies with signed logs', 'Role-based access control and SSO'],
        preview: {
          title: 'Voice Privacy Shield',
          bars: [{ label: 'PII', val1: 100, val2: 100 }, { label: 'PCI', val1: 100, val2: 100 }, { label: 'KMS', val1: 100, val2: 100 }, { label: 'RBAC', val1: 100, val2: 100 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'PCI Redaction', amount: '100% Guaranteed', color: 'bg-emerald-500' }, { name: 'SOC 2 Type II', amount: 'Certified', color: 'bg-blue-600' }, { name: 'Data Isolation', amount: 'Zero Retention', color: 'bg-purple-600' }, { name: 'Encryption', amount: 'AES-256 GCM', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'multilingual-voice',
        number: '08',
        title: 'Multilingual Voice & Regional Dialects',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Deliver authentic customer experiences globally without hiring regional call centers in every timezone.',
        features: ['Dynamic language switching mid-call', 'Localized currency and phone recognition', 'Dialect-tuned acoustic models', 'Real-time translation for supervisors'],
        preview: {
          title: 'Global Voice Matrix',
          bars: [{ label: 'EN', val1: 100, val2: 100 }, { label: 'ES', val1: 99, val2: 96 }, { label: 'DE', val1: 98, val2: 95 }, { label: 'JA', val1: 98, val2: 94 }, { label: 'FR', val1: 100, val2: 98 }],
          providers: [{ name: 'Supported Languages', amount: '45+ Dialects', color: 'bg-emerald-500' }, { name: 'Mid-Call Switch', amount: 'Instant', color: 'bg-blue-600' }, { name: 'Accent Clarity', amount: '99.4%', color: 'bg-purple-600' }, { name: 'Supervisor Stream', amount: 'Live English', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Autonomous voice and customer assistance for growing businesses',
    useCases: [
      { id: 'uc1', title: 'Tier-1 Support Offload', desc: 'Resolve high-volume routine inquiries (order tracking, billing FAQs, password resets) automatically around the clock.', icon: <Headphones className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'uc2', title: 'Inbound Lead Qualification', desc: 'Call back high-value website leads within 60 seconds of form submission, qualify their needs, and book meetings on sales rep calendars.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'uc3', title: 'After-Hours Global Support Desk', desc: 'Ensure 24/7 global support coverage across US, European, and APAC timezones without expensive overseas graveyard shifts.', icon: <Globe className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'uc4', title: 'Proactive Account Outreach', desc: 'Conduct automated onboarding calls, customer satisfaction check-ins, and renewal reminder notifications at scale.', icon: <PhoneCall className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your telephony gateway and CRM ecosystem',
    integrations: [
      { name: 'AWS', logoKey: 'aws' },
      { name: 'GitHub', logoKey: 'github' },
      { name: 'Docker', logoKey: 'docker' },
      { name: 'OpenAI', logoKey: 'openai' },
      { name: 'Anthropic', logoKey: 'anthropic' },
      { name: 'Databricks', logoKey: 'databricks' }
    ],
    ctaTitle: 'Deploy autonomous voice & support AI in minutes',
    ctaSubtitle: 'Connect your phone number or CRM to start answering customer calls and qualifying sales leads with human-parity voice AI.',
    relatedHeadline: 'Explore related AI services and operational tools',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat', desc: 'Next-gen enterprise multi-modal chat assistant with tool calling.', icon: <MessageSquare className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Studio-grade voice cloning, podcast mastering, and speech-to-text.', icon: <Headphones className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Automated SOC 2, HIPAA, and PCI-DSS compliance auditing.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Unified cross-cloud data warehouse intelligence and telemetry.', icon: <BarChart2 className="w-5 h-5" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconBorder: 'border-indigo-100' },
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Real-time infrastructure observability and APM telemetry.', icon: <Activity className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { id: 'ai-video', type: 'service', name: 'AI Slides & Video', desc: 'Generate high-converting video presentations and decks from text.', icon: <Video className="w-5 h-5" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' }
    ],
    videoModal: {
      title: 'Sales & Support Walkthrough',
      subtitle: 'Sub-400ms Voice Telephony & AI Customer Support',
      heroCardTitle: 'Watch Human-Parity Voice AI in Action',
      heroCardDesc: 'See how SNS Square Sales & Support handles live telephony calls, answers technical objections, and resolves tier-1 tickets autonomously.',
      highlights: [{ label: '< 380ms', sub: 'Voice turn latency' }, { label: '85%', sub: 'Autonomous FCR' }, { label: 'Omnichannel', sub: 'Phone + Chat + Email' }]
    }
  },

  'translation': {
    id: 'translation',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'Mail & Translate',
    badgeIcon: <Languages className="w-3.5 h-3.5 text-blue-600" />,
    heroIcon: <Mail className="w-6 h-6" />,
    heroIconBg: 'bg-blue-50/90',
    heroIconColor: 'text-blue-700',
    heroIconBorder: 'border-blue-100/80',
    headline1: 'Multilingual mail intelligence.',
    headline2: 'Neural document & codebase translation.',
    subtitle: 'Translate emails, complex PDF/Office documents, and software string catalogs across 95+ languages while preserving exact visual formatting, tone, and proprietary corporate glossaries.',
    openButtonText: 'Open Mail & Translate',
    heroIllustration: {
      cardTitle: 'Neural Translation & Mail Engine',
      cardSub: '95+ Languages Supported',
      cardBadge: 'Continuous Localization Active',
      annotationText: 'Layout & Tone\n100% Preserved',
      checklist: ['Contextual Semantic Accuracy', 'Pixel-Perfect PDF & Office Layout', 'Strict Corporate Glossary Enforcement'],
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
      { label: 'Languages Supported', value: '95+', icon: <Globe className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Glossary Compliance Rate', value: '99.8%', icon: <ShieldCheck className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Layout & Font Preservation', value: '100%', icon: <FileText className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Real-Time Translation Latency', value: '0.8s', icon: <Clock className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Neural translation and multilingual communication for global enterprises',
    capabilities: [
      {
        id: 'smart-inbox-mail',
        number: '01',
        title: 'Smart Inbox Mail Copilot',
        icon: <Mail className="w-4 h-4" />,
        tagline: 'Auto-compose, summarize, and reply to multilingual customer and vendor emails in fluent local phrasing.',
        features: ['One-click multi-language draft generation', 'Context-aware summary of lengthy threads', 'Gmail and Outlook add-in integrations', 'Automated tone matching (Formal, Casual)'],
        preview: {
          title: 'Mail Copilot Flow',
          bars: [{ label: 'Ingest', val1: 98, val2: 95 }, { label: 'Tone', val1: 99, val2: 96 }, { label: 'Glossary', val1: 100, val2: 98 }, { label: 'Draft', val1: 96, val2: 92 }, { label: 'Send', val1: 100, val2: 100 }],
          providers: [{ name: 'Mail Draft Speed', amount: '< 1.2s', color: 'bg-emerald-500' }, { name: 'Inbox Sync', amount: 'Gmail / Outlook', color: 'bg-blue-600' }, { name: 'Tone Accuracy', amount: '99.4%', color: 'bg-indigo-600' }, { name: 'Thread Summaries', amount: 'Instant', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'document-layout',
        number: '02',
        title: 'Document Layout Preservation Engine',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Translate PDFs, Word docs, PowerPoint decks, and Excel spreadsheets without breaking fonts, images, or tables.',
        features: ['Pixel-perfect PDF, DOCX, PPTX, and XLSX rendering', 'Automatic font resizing for length expansion', 'Vector graphic text translation', 'Batch processing of multi-hundred-page files'],
        preview: {
          title: 'Document Layout Engine',
          bars: [{ label: 'PDF', val1: 100, val2: 98 }, { label: 'DOCX', val1: 100, val2: 100 }, { label: 'PPTX', val1: 98, val2: 95 }, { label: 'XLSX', val1: 99, val2: 96 }, { label: 'Export', val1: 100, val2: 100 }],
          providers: [{ name: 'Layout Fidelity', amount: '100% Preserved', color: 'bg-emerald-500' }, { name: 'Batch Capacity', amount: '500+ Pages', color: 'bg-blue-600' }, { name: 'Font Expansion', amount: 'Auto Resized', color: 'bg-purple-600' }, { name: 'Vector Graphics', amount: 'Unflattened', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'glossary-adherence',
        number: '03',
        title: 'Enterprise Glossary & Brand Terminology',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Upload proprietary company terminology, product names, and legal phrasing to guarantee strict adherence.',
        features: ['Custom CSV and TBX glossary imports', 'Do-not-translate (DNT) brand rules', 'Automated compliance check against dictionaries', 'Team-wide synced vocabulary'],
        preview: {
          title: 'Glossary Enforcement',
          bars: [{ label: 'Import', val1: 100, val2: 100 }, { label: 'DNT', val1: 100, val2: 100 }, { label: 'Match', val1: 99, val2: 98 }, { label: 'Enforce', val1: 100, val2: 100 }, { label: 'Verify', val1: 100, val2: 100 }],
          providers: [{ name: 'Glossary Adherence', amount: '99.8%', color: 'bg-emerald-500' }, { name: 'DNT Brand Rules', amount: '100% Enforced', color: 'bg-blue-600' }, { name: 'Format Support', amount: 'CSV / TBX', color: 'bg-purple-600' }, { name: 'Sync Frequency', amount: 'Real-time', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'software-i18n',
        number: '04',
        title: 'Automated CI/CD Software i18n',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Translate JSON, YAML, PO, and iOS/Android string files directly in your GitHub CI/CD development workflow.',
        features: ['Support for JSON, YAML, XLIFF, Gettext PO', 'Interpolation variable preservation ({user})', 'GitHub Actions webhook integration', 'Pluralization & grammatical rule adaptation'],
        preview: {
          title: 'Software Localization',
          bars: [{ label: 'JSON', val1: 100, val2: 100 }, { label: 'YAML', val1: 100, val2: 98 }, { label: 'PO', val1: 98, val2: 95 }, { label: 'PR Sync', val1: 100, val2: 100 }, { label: 'Deploy', val1: 100, val2: 100 }],
          providers: [{ name: 'CI/CD Automation', amount: 'GitHub Webhooks', color: 'bg-emerald-500' }, { name: 'Syntax Safety', amount: '100% Valid JSON', color: 'bg-blue-600' }, { name: 'Variable Locks', amount: 'Enforced', color: 'bg-indigo-600' }, { name: 'PR Speed', amount: '< 15 Seconds', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'bilingual-tickets',
        number: '05',
        title: 'Real-Time Bilingual Ticket Translation',
        icon: <MessageSquare className="w-4 h-4" />,
        tagline: 'Translate incoming customer chat messages and support tickets dynamically into your team preferred language.',
        features: ['Sub-second message translation stream', 'Bi-directional translation for rep & customer', 'Zendesk, Intercom, and Freshdesk live sync', 'Automatic language detection'],
        preview: {
          title: 'Live Ticket Translation',
          bars: [{ label: 'Detect', val1: 100, val2: 99 }, { label: 'Translate', val1: 98, val2: 95 }, { label: 'Zendesk', val1: 100, val2: 98 }, { label: 'Reply', val1: 99, val2: 96 }, { label: 'Archive', val1: 100, val2: 100 }],
          providers: [{ name: 'Stream Latency', amount: '< 800ms', color: 'bg-emerald-500' }, { name: 'Bi-Directional', amount: 'Seamless', color: 'bg-blue-600' }, { name: 'Help Desk Sync', amount: 'Native Zendesk', color: 'bg-purple-600' }, { name: 'Auto Detection', amount: '100% Acc', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'voice-video-dubbing',
        number: '06',
        title: 'Neural Audio & Video Dubbing',
        icon: <Video className="w-4 h-4" />,
        tagline: 'Dub video tutorials, product walkthroughs, and audio recordings into new languages with voiceprint cloning.',
        features: ['Voiceprint cloning in 40+ languages', 'Automated timestamp sync and SRT creation', 'Video face and lip-sync alignment engine', '4K export with multi-language tracks'],
        preview: {
          title: 'Neural Video Dubbing',
          bars: [{ label: 'Audio', val1: 98, val2: 94 }, { label: 'Clone', val1: 96, val2: 92 }, { label: 'LipSync', val1: 95, val2: 90 }, { label: 'SRT', val1: 100, val2: 98 }, { label: 'Render', val1: 100, val2: 100 }],
          providers: [{ name: 'Dubbing Languages', amount: '40+ Voices', color: 'bg-emerald-500' }, { name: 'Vocal Timbre', amount: 'Cloned 1:1', color: 'bg-blue-600' }, { name: 'SRT Accuracy', amount: 'Pixel-perfect', color: 'bg-indigo-600' }, { name: 'Export Resolution', amount: 'Up to 4K', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'zero-retention-security',
        number: '07',
        title: 'Enterprise Confidentiality & Zero Retention',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Certified confidential translation infrastructure with zero customer text retained or used for public training.',
        features: ['SOC 2 Type II, ISO 27001, and GDPR compliant', 'Zero data retention (ZDR) guarantee', 'Encrypted at rest with KMS / Key Vault', 'Isolated VPC deployment options'],
        preview: {
          title: 'Zero Retention Shield',
          bars: [{ label: 'ZDR', val1: 100, val2: 100 }, { label: 'KMS', val1: 100, val2: 100 }, { label: 'SOC2', val1: 100, val2: 100 }, { label: 'GDPR', val1: 100, val2: 100 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'Zero Retention', amount: '100% Certified', color: 'bg-emerald-500' }, { name: 'Data Isolation', amount: 'Single-Tenant', color: 'bg-blue-600' }, { name: 'KMS Encryption', amount: 'Customer Keys', color: 'bg-purple-600' }, { name: 'Compliance', amount: 'SOC 2 / GDPR', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'high-throughput-api',
        number: '08',
        title: 'High-Throughput Batch Translation API',
        icon: <Terminal className="w-4 h-4" />,
        tagline: 'Developer-first REST and gRPC APIs capable of translating millions of tokens per second with predictable latency.',
        features: ['Sub-second API latency for sentences', 'Asynchronous job workers for massive documents', 'Smart caching layer for 90% cost savings', 'SDKs for TypeScript, Python, and Go'],
        preview: {
          title: 'High-Throughput API',
          bars: [{ label: 'REST', val1: 100, val2: 98 }, { label: 'gRPC', val1: 100, val2: 100 }, { label: 'Cache', val1: 98, val2: 95 }, { label: 'Async', val1: 100, val2: 99 }, { label: 'Scale', val1: 100, val2: 100 }],
          providers: [{ name: 'Throughput', amount: '1M+ Tokens/s', color: 'bg-emerald-500' }, { name: 'Cache Hit Rate', amount: '42.5%', color: 'bg-blue-600' }, { name: 'API Latency', amount: '< 120ms', color: 'bg-purple-600' }, { name: 'SDKs', amount: 'TS / Py / Go', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Powering international expansion and multilingual operations',
    useCases: [
      { id: 'uc1', title: 'E-Commerce Catalog Localization', desc: 'Translate millions of product titles, descriptions, and customer reviews into 95+ languages with automated glossary adherence.', icon: <Store className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'uc2', title: 'Cross-Border Legal Document Review', desc: 'Translate confidential contracts, patents, and litigation filings while preserving exact legal clause numbering and visual layout.', icon: <FileText className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'uc3', title: 'Automated CI/CD App Localization', desc: 'Hook into GitHub repository PRs to automatically translate UI strings for web and mobile apps before each release.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'uc4', title: 'Multilingual Customer Support & Mail', desc: 'Allow support teams to answer inbound customer emails in Japanese, French, or Portuguese with perfect local phrasing.', icon: <Mail className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your developer stack and productivity suite',
    integrations: [
      { name: 'AWS', logoKey: 'aws' },
      { name: 'GitHub', logoKey: 'github' },
      { name: 'Docker', logoKey: 'docker' },
      { name: 'OpenAI', logoKey: 'openai' },
      { name: 'Anthropic', logoKey: 'anthropic' },
      { name: 'Kubernetes', logoKey: 'kubernetes' }
    ],
    ctaTitle: 'Break language barriers across your enterprise',
    ctaSubtitle: 'Upload your documents, connect your inbox, or plug in your GitHub repo to start translating with pixel-perfect layout preservation.',
    relatedHeadline: 'Explore related AI services and productivity tools',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat', desc: 'Next-gen enterprise multi-modal chat assistant with tool calling.', icon: <MessageSquare className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Studio-grade voice cloning, podcast mastering, and speech-to-text.', icon: <Headphones className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'ai-video', type: 'service', name: 'AI Slides & Video', desc: 'Generate high-converting video presentations and decks from text.', icon: <Video className="w-5 h-5" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Automated SOC 2, HIPAA, and ISO 27001 compliance auditing.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Unified cross-cloud data warehouse intelligence and telemetry.', icon: <BarChart2 className="w-5 h-5" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconBorder: 'border-indigo-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Autonomous CI/CD pipeline automation and GitOps deployments.', icon: <InfinityIcon className="w-5 h-5" />, iconBg: 'bg-slate-50', iconColor: 'text-slate-600', iconBorder: 'border-slate-200' }
    ],
    videoModal: {
      title: 'Mail & Translate Walkthrough',
      subtitle: 'Multilingual Mail Copilot & Neural Document Translation',
      heroCardTitle: 'Watch Neural Document Translation in Action',
      heroCardDesc: 'See how SNS Square translates complex multi-page PDF documents while preserving 100% of formatting, tables, and corporate terminology.',
      highlights: [{ label: '95+', sub: 'Global languages' }, { label: '99.8%', sub: 'Glossary accuracy' }, { label: 'Pixel-Perfect', sub: 'PDF & Office layouts' }]
    }
  },

  'meeting-notes': {
    id: 'meeting-notes',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Meeting Notes',
    badgeIcon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
    heroIcon: <FileText className="w-6 h-6" />,
    heroIconBg: 'bg-blue-50/90',
    heroIconColor: 'text-blue-700',
    heroIconBorder: 'border-blue-100/80',
    headline1: 'Automated meeting intelligence.',
    headline2: 'Executive action items & Jira sync.',
    subtitle: 'Autonomous meeting assistant that joins Google Meet, Zoom, and Microsoft Teams calls to generate high-fidelity transcripts, executive bullet summaries, and synchronized Jira and Notion action items.',
    openButtonText: 'Open AI Meeting Notes',
    heroIllustration: {
      cardTitle: 'Meeting Intelligence Console',
      cardSub: 'Real-Time Diarization & Transcription',
      cardBadge: 'Calendar Auto-Join Ready',
      annotationText: 'Zero Note Taking\n100% Jira Sync',
      checklist: ['Multi-Speaker Voiceprint Diarization', 'Executive Bullet Summaries', 'Direct Jira & Linear Action Items'],
      bars: [
        { height: '50%', bg: 'bg-blue-300' },
        { height: '70%', bg: 'bg-blue-400' },
        { height: '85%', bg: 'bg-blue-500' },
        { height: '98%', bg: 'bg-blue-600' },
        { height: '80%', bg: 'bg-blue-400' },
        { height: '99%', bg: 'bg-[#2563EB]' }
      ]
    },
    metrics: [
      { label: 'Speaker Diarization Accuracy', value: '99.4%', icon: <Headphones className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Manual Note-Taking Time', value: '0 Mins', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Task Sync to Jira & Linear', value: '100%', icon: <Layers className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Time Saved Per Team/Week', value: '54 Mins', icon: <Clock className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Comprehensive meeting intelligence, transcriptions, and workflow automation',
    capabilities: [
      {
        id: 'calendar-auto-join',
        number: '01',
        title: 'Autonomous Calendar Meeting Bot',
        icon: <Clock className="w-4 h-4" />,
        tagline: 'Automatically joins scheduled Google Meet, Zoom, Microsoft Teams, and Webex calls right on time.',
        features: ['Zero-click calendar auto-join', 'Ad-hoc meeting invitation via link', 'Custom bot avatar and company branding', 'Configurable recording consent prompt'],
        preview: {
          title: 'Meeting Bot Dispatch',
          bars: [{ label: 'Calendar', val1: 100, val2: 100 }, { label: 'Join', val1: 99, val2: 98 }, { label: 'Record', val1: 100, val2: 100 }, { label: 'Transcribe', val1: 98, val2: 95 }, { label: 'Export', val1: 100, val2: 100 }],
          providers: [{ name: 'Join Reliability', amount: '99.9%', color: 'bg-emerald-500' }, { name: 'Meeting Platforms', amount: 'Zoom / Meet / Teams', color: 'bg-blue-600' }, { name: 'Branded Avatar', amount: 'Custom', color: 'bg-indigo-600' }, { name: 'Consent Audio', amount: 'Configurable', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'speaker-diarization',
        number: '02',
        title: 'Multi-Speaker Voiceprint Diarization',
        icon: <Headphones className="w-4 h-4" />,
        tagline: 'Accurately separates overlapping conversations and identifies speakers by name using acoustic voiceprints.',
        features: ['Sub-second multi-speaker separation', 'Automated matching with calendar directory', 'Saved vocal profiles for teammates', 'Background noise and keyboard cancellation'],
        preview: {
          title: 'Acoustic Voiceprints',
          bars: [{ label: 'Split', val1: 99, val2: 96 }, { label: 'Match', val1: 98, val2: 95 }, { label: 'Diarize', val1: 100, val2: 98 }, { label: 'Noise', val1: 97, val2: 94 }, { label: 'Attribute', val1: 100, val2: 100 }],
          providers: [{ name: 'Diarization Accuracy', amount: '99.4%', color: 'bg-emerald-500' }, { name: 'Participants Max', amount: '50+ Speakers', color: 'bg-blue-600' }, { name: 'Noise Scrubbing', amount: 'Active AI', color: 'bg-purple-600' }, { name: 'Speaker Tagging', amount: 'Automatic', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'executive-summary',
        number: '03',
        title: 'Executive Bullet Synthesis & Decisions',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Condenses a 60-minute technical or board discussion into a crisp, skimmable 90-second executive summary.',
        features: ['Key Decisions Made with contextual rationale', 'Risks and unresolved blockers highlighted', 'Customizable summary templates by meeting type', 'Shareable Markdown, PDF, and Slack digest'],
        preview: {
          title: 'Executive Bullet Summary',
          bars: [{ label: 'Ingest', val1: 98, val2: 95 }, { label: 'Decisions', val1: 100, val2: 98 }, { label: 'Risks', val1: 96, val2: 92 }, { label: 'Format', val1: 100, val2: 100 }, { label: 'Slack', val1: 100, val2: 100 }],
          providers: [{ name: 'Reading Time', amount: '< 90 Seconds', color: 'bg-emerald-500' }, { name: 'Decision Precision', amount: '99.2%', color: 'bg-blue-600' }, { name: 'Templates', amount: 'Sprint / 1-on-1 / Board', color: 'bg-indigo-600' }, { name: 'Slack Integration', amount: 'Automated Digest', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'action-item-sync',
        number: '04',
        title: 'Two-Way Jira & Linear Action Dispatch',
        icon: <CheckSquare className="w-4 h-4" />,
        tagline: 'Identifies action items, assignees, and deadlines mentioned in the meeting and creates tickets automatically.',
        features: ['Auto-extract assignee, due date, and priority', 'Direct creation in Jira, Linear, and Notion', 'Deep link to exact meeting timestamp', 'One-click approval workflow before publish'],
        preview: {
          title: 'Action Item Dispatch',
          bars: [{ label: 'Extract', val1: 99, val2: 96 }, { label: 'Assignee', val1: 98, val2: 95 }, { label: 'Due Date', val1: 97, val2: 94 }, { label: 'Jira API', val1: 100, val2: 100 }, { label: 'Sync', val1: 100, val2: 100 }],
          providers: [{ name: 'Task Capture Rate', amount: '100% Extracted', color: 'bg-emerald-500' }, { name: 'Jira / Linear Sync', amount: 'Native Webhooks', color: 'bg-blue-600' }, { name: 'Timestamp Link', amount: 'Exact Second', color: 'bg-purple-600' }, { name: 'Approval Gate', amount: 'Optional', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'semantic-search',
        number: '05',
        title: 'Universal Meeting Knowledge Base',
        icon: <Search className="w-4 h-4" />,
        tagline: 'Search across your entire organization past meetings using natural language questions to recall past decisions.',
        features: ['Semantic vector search across transcripts', 'Direct jump to audio playback timestamp', 'Team-scoped access permissions and locks', 'Automated trend tracking on repeated topics'],
        preview: {
          title: 'Semantic Meeting Archive',
          bars: [{ label: 'Search', val1: 100, val2: 98 }, { label: 'Vector', val1: 99, val2: 96 }, { label: 'Audio', val1: 98, val2: 95 }, { label: 'RBAC', val1: 100, val2: 100 }, { label: 'Results', val1: 100, val2: 100 }],
          providers: [{ name: 'Search Query Speed', amount: '< 45ms', color: 'bg-emerald-500' }, { name: 'Video Jump', amount: 'Timestamped', color: 'bg-blue-600' }, { name: 'Confidential Locks', amount: 'Enforced', color: 'bg-indigo-600' }, { name: 'Indexed Hours', amount: '10,000+ Hrs', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'live-translation',
        number: '06',
        title: 'Real-Time Multilingual Subtitles',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Generate live subtitles in 40+ languages during the call and produce localized meeting summaries for global teams.',
        features: ['Real-time live translated subtitles', 'Summaries exported in multiple languages', 'Regional vocabulary and accent tuning', 'Synchronized multi-lingual audio tracks'],
        preview: {
          title: 'Multilingual Live Captions',
          bars: [{ label: 'Stream', val1: 99, val2: 96 }, { label: 'Translate', val1: 98, val2: 95 }, { label: 'Subtitle', val1: 100, val2: 98 }, { label: 'Digest', val1: 99, val2: 96 }, { label: 'Sync', val1: 100, val2: 100 }],
          providers: [{ name: 'Caption Latency', amount: '< 600ms', color: 'bg-emerald-500' }, { name: 'Supported Languages', amount: '40+ Dialects', color: 'bg-blue-600' }, { name: 'Digest Translation', amount: 'Simultaneous', color: 'bg-purple-600' }, { name: 'Accuracy', amount: '99.1%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'talk-time-analytics',
        number: '07',
        title: 'Talk-Time & Sentiment Telemetry',
        icon: <BarChart2 className="w-4 h-4" />,
        tagline: 'Coaching insights for sales reps, hiring managers, and team leaders to improve meeting effectiveness.',
        features: ['Talk-to-listen ratio breakdown per participant', 'Pacing, filler word, and engagement metrics', 'Customer sentiment trajectory over call', 'Interactivity score for quiet teammates'],
        preview: {
          title: 'Meeting Health Analytics',
          bars: [{ label: 'TalkTime', val1: 98, val2: 94 }, { label: 'Pacing', val1: 96, val2: 92 }, { label: 'Sentiment', val1: 98, val2: 95 }, { label: 'Engagement', val1: 99, val2: 96 }, { label: 'Report', val1: 100, val2: 100 }],
          providers: [{ name: 'Talk-to-Listen Ratio', amount: 'Per Speaker', color: 'bg-emerald-500' }, { name: 'Sentiment Arc', amount: 'Visual Heatmap', color: 'bg-blue-600' }, { name: 'Filler Word Count', amount: 'Tracked', color: 'bg-indigo-600' }, { name: 'Coaching Tips', amount: 'Automated', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'cryptographic-vault',
        number: '08',
        title: 'SOC 2 & HIPAA Cryptographic Vault',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'End-to-end encrypted storage with granular privacy controls, role-based access, and automated data retention.',
        features: ['SOC 2 Type II, HIPAA, and GDPR compliant', 'Private meeting flag (attendees only)', 'Automated PII and credit card redaction', 'Customer-managed encryption keys (CMEK)'],
        preview: {
          title: 'Meeting Privacy Vault',
          bars: [{ label: 'CMEK', val1: 100, val2: 100 }, { label: 'PII', val1: 100, val2: 100 }, { label: 'SOC2', val1: 100, val2: 100 }, { label: 'HIPAA', val1: 100, val2: 100 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'Meeting Encryption', amount: 'AES-256 GCM', color: 'bg-emerald-500' }, { name: 'Attendee-Only Lock', amount: 'Enforced', color: 'bg-blue-600' }, { name: 'PII Redaction', amount: 'Automated', color: 'bg-purple-600' }, { name: 'Compliance', amount: 'SOC 2 / HIPAA', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Autonomous meeting capture and task synchronization across teams',
    useCases: [
      { id: 'uc1', title: 'Engineering Sprint Standups & Syncs', desc: 'Capture technical architectural decisions, API schema changes, and assign tickets directly to Jira and Linear.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'uc2', title: 'Sales Demos & Customer Discovery', desc: 'Log customer pain points, feature requests, budget constraints, and sync call recordings directly to Salesforce and HubSpot.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'uc3', title: 'Executive Board & Leadership Meetings', desc: 'Generate concise, high-density executive bullet digests for C-suite leaders, outlining strategic commitments and deadlines.', icon: <FileText className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'uc4', title: 'Structured Candidate Interviews', desc: 'Transcribe structured interviews, extract candidate answers against rubrics, and share standardized notes with the hiring committee.', icon: <CheckSquare className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your video conferencing and task management stack',
    integrations: [
      { name: 'AWS', logoKey: 'aws' },
      { name: 'GitHub', logoKey: 'github' },
      { name: 'Docker', logoKey: 'docker' },
      { name: 'OpenAI', logoKey: 'openai' },
      { name: 'Anthropic', logoKey: 'anthropic' },
      { name: 'Kubernetes', logoKey: 'kubernetes' }
    ],
    ctaTitle: 'Automate meeting notes across your entire team',
    ctaSubtitle: 'Connect your calendar in 10 seconds. The AI meeting assistant will automatically join your next call and send executive notes.',
    relatedHeadline: 'Explore related AI services and collaboration tools',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat', desc: 'Next-gen enterprise multi-modal chat assistant with tool calling.', icon: <MessageSquare className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'ai-video', type: 'service', name: 'AI Slides & Video', desc: 'Generate high-converting video presentations and decks from text.', icon: <Video className="w-5 h-5" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' },
      { id: 'monitoring', type: 'product', name: 'Observability', desc: 'Real-time infrastructure observability and APM telemetry.', icon: <Activity className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Autonomous CI/CD pipeline automation and GitOps deployments.', icon: <InfinityIcon className="w-5 h-5" />, iconBg: 'bg-slate-50', iconColor: 'text-slate-600', iconBorder: 'border-slate-200' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Automated SOC 2, HIPAA, and ISO 27001 compliance auditing.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Unified cross-cloud data warehouse intelligence and telemetry.', icon: <BarChart2 className="w-5 h-5" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconBorder: 'border-indigo-100' }
    ],
    videoModal: {
      title: 'AI Meeting Notes Walkthrough',
      subtitle: 'Multi-Speaker Diarization & Jira Action Item Sync',
      heroCardTitle: 'Watch Meeting Intelligence in Action',
      heroCardDesc: 'See how the AI meeting assistant joins Zoom and Google Meet calls, generates executive summaries, and synchronizes tickets straight to Jira.',
      highlights: [{ label: '99.4%', sub: 'Diarization accuracy' }, { label: '100%', sub: 'Jira action sync' }, { label: '54 mins', sub: 'Saved / week' }]
    }
  },

  'deep-research': {
    id: 'deep-research',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'Deep Research',
    badgeIcon: <Search className="w-3.5 h-3.5 text-purple-600" />,
    heroIcon: <Search className="w-6 h-6" />,
    heroIconBg: 'bg-purple-50/90',
    heroIconColor: 'text-purple-700',
    heroIconBorder: 'border-purple-100/80',
    headline1: 'Autonomous research synthesis.',
    headline2: 'Multi-source whitepaper intelligence.',
    subtitle: 'Autonomous deep-thinking research agent that searches hundreds of academic papers, technical documentation, and enterprise datasets to produce citation-backed strategic reports.',
    openButtonText: 'Open Deep Research',
    heroIllustration: {
      cardTitle: 'Deep Research Planner Engine',
      cardSub: 'Recursive Synthesis Graph',
      cardBadge: '400+ Sources Crawled',
      annotationText: 'Peer-Reviewed\nZero Hallucination',
      checklist: ['Recursive Query Decomposition', 'Multi-Source Cross-Validation', 'Automated Citation Footnote Linking'],
      bars: [
        { height: '40%', bg: 'bg-purple-300' },
        { height: '60%', bg: 'bg-purple-400' },
        { height: '80%', bg: 'bg-purple-500' },
        { height: '95%', bg: 'bg-purple-600' },
        { height: '70%', bg: 'bg-purple-400' },
        { height: '98%', bg: 'bg-[#9333EA]' }
      ]
    },
    metrics: [
      { label: 'Sources Analyzed / Query', value: '400+', icon: <Search className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Citation Precision Rate', value: '99.8%', icon: <ShieldCheck className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Time Saved Per Report', value: '14 Hours', icon: <Clock className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Markdown & PDF Export', value: '100%', icon: <FileText className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Autonomous deep research, literature review, and intelligence synthesis',
    capabilities: [
      {
        id: 'recursive-decomposition',
        number: '01',
        title: 'Recursive Query Decomposition',
        icon: <Search className="w-4 h-4" />,
        tagline: 'Breaks complex hypotheses into dozens of targeted sub-queries to explore multiple research angles simultaneously.',
        features: ['Automated hypothesis testing', 'Cross-domain synthesis across tech & law', 'Semantic duplicate filtering', 'Tree-of-thought progress visualization'],
        preview: {
          title: 'Research Tree Explorer',
          bars: [{ label: 'Decompose', val1: 98, val2: 95 }, { label: 'Crawl', val1: 99, val2: 96 }, { label: 'Filter', val1: 96, val2: 92 }, { label: 'Synthesize', val1: 100, val2: 98 }, { label: 'Footnote', val1: 100, val2: 100 }],
          providers: [{ name: 'Sub-Queries / Run', amount: '24 Tasks', color: 'bg-emerald-500' }, { name: 'Search Sources', amount: 'ArXiv / Web / SEC', color: 'bg-blue-600' }, { name: 'SEO Spam Filter', amount: '100% Filtered', color: 'bg-purple-600' }, { name: 'Reasoning Depth', amount: 'Recursive', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'cross-validation',
        number: '02',
        title: 'Adversarial Evidence Cross-Validation',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Validates claims by comparing numbers across independent datasets and official benchmark specifications.',
        features: ['Cross-verifies benchmarks against whitepapers', 'Flags disputed historical statistics', 'Truth-scoring matrix with provenance links', 'Confidence intervals for projections'],
        preview: {
          title: 'Evidence Validation Matrix',
          bars: [{ label: 'Verify', val1: 100, val2: 98 }, { label: 'CrossCheck', val1: 99, val2: 96 }, { label: 'Authority', val1: 98, val2: 95 }, { label: 'Score', val1: 100, val2: 100 }, { label: 'Provenance', val1: 100, val2: 100 }],
          providers: [{ name: 'Confidence Score', amount: '99.8%', color: 'bg-emerald-500' }, { name: 'Primary Sources', amount: 'Verified RFCs', color: 'bg-blue-600' }, { name: 'Contradiction Flag', amount: 'Automated', color: 'bg-purple-600' }, { name: 'Provenance Links', amount: 'Direct URLs', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'whitepaper-generation',
        number: '03',
        title: 'Executive Whitepaper Generator',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Produces publication-ready structured documents with tables, charts, footnotes, and executive bullet takeaways.',
        features: ['Executive summary and methodology', 'Comparative matrices and quantitative tables', 'Direct export to Google Docs & PDF', 'Interactive citation tooltips'],
        preview: {
          title: 'Structured Report Output',
          bars: [{ label: 'Summary', val1: 100, val2: 100 }, { label: 'Tables', val1: 98, val2: 95 }, { label: 'Citations', val1: 100, val2: 100 }, { label: 'PDF', val1: 100, val2: 98 }, { label: 'Docs', val1: 100, val2: 100 }],
          providers: [{ name: 'Generation Time', amount: '< 5 Minutes', color: 'bg-emerald-500' }, { name: 'Citation Accuracy', amount: '100% Verifiable', color: 'bg-blue-600' }, { name: 'Export Format', amount: 'Markdown / PDF', color: 'bg-purple-600' }, { name: 'Document Quality', amount: 'Publication Ready', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'tech-spec-parsing',
        number: '04',
        title: 'GitHub & Technical Spec Ingestion',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Ingests open-source GitHub repositories, RFC standards, and API documentation to extract architectural insights.',
        features: ['AST-level code parsing & comparison', 'RFC blueprint decomposition', 'Benchmarking comparison across engines', 'Direct code snippets for implementation'],
        preview: {
          title: 'Technical Spec Ingestion',
          bars: [{ label: 'GitHub', val1: 100, val2: 98 }, { label: 'RFC', val1: 100, val2: 100 }, { label: 'AST', val1: 98, val2: 95 }, { label: 'Benchmark', val1: 99, val2: 96 }, { label: 'Compare', val1: 100, val2: 100 }],
          providers: [{ name: 'Repo Parsing', amount: 'AST Level', color: 'bg-emerald-500' }, { name: 'Supported Specs', amount: 'RFC / OpenAPI', color: 'bg-blue-600' }, { name: 'Benchmark Analysis', amount: 'Automated', color: 'bg-indigo-600' }, { name: 'Snippet Extraction', amount: 'Syntax Highlighted', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'hybrid-rag',
        number: '05',
        title: 'Hybrid Private-Public Knowledge Search',
        icon: <Database className="w-4 h-4" />,
        tagline: 'Combines external web research with your private Confluence, Notion, Slack, and Google Drive archives.',
        features: ['RBAC-governed enterprise RAG indexing', 'Zero data leakage to external models', 'Private wiki citation footnotes', 'Real-time differential monitoring'],
        preview: {
          title: 'Hybrid Knowledge Search',
          bars: [{ label: 'Public', val1: 100, val2: 98 }, { label: 'Confluence', val1: 99, val2: 96 }, { label: 'Notion', val1: 98, val2: 95 }, { label: 'Slack', val1: 97, val2: 94 }, { label: 'Synthesize', val1: 100, val2: 100 }],
          providers: [{ name: 'Data Isolation', amount: '100% Encrypted', color: 'bg-emerald-500' }, { name: 'Private Wiki Sync', amount: 'Confluence / Notion', color: 'bg-blue-600' }, { name: 'RBAC Enforcement', amount: 'Strict', color: 'bg-purple-600' }, { name: 'Public Web Scale', amount: '400+ Sources', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'continuous-briefings',
        number: '06',
        title: 'Continuous Radar & Topic Briefings',
        icon: <Clock className="w-4 h-4" />,
        tagline: 'Subscribe to research topics and receive automated weekly briefings whenever breakthrough papers are published.',
        features: ['Automated arXiv and patent scrapers', 'Weekly executive delta summaries', 'Emerging technology radar charts', 'Custom alert thresholds for regulations'],
        preview: {
          title: 'Topic Radar Briefings',
          bars: [{ label: 'arXiv', val1: 100, val2: 99 }, { label: 'Patents', val1: 98, val2: 95 }, { label: 'Delta', val1: 97, val2: 94 }, { label: 'Digest', val1: 100, val2: 98 }, { label: 'Alerts', val1: 100, val2: 100 }],
          providers: [{ name: 'Schedule Frequency', amount: 'Daily / Weekly', color: 'bg-emerald-500' }, { name: 'Alert Channels', amount: 'Slack / Email', color: 'bg-blue-600' }, { name: 'Technology Radar', amount: 'Visual Map', color: 'bg-indigo-600' }, { name: 'Paper Summaries', amount: 'Executive Bullets', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'ensemble-debate',
        number: '07',
        title: 'Multi-Model Ensemble Debate Reasoning',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Combines Gemini 2.0 Flash, Claude 3.5 Sonnet, and deep reasoning models for unmatched analytical rigor.',
        features: ['Adversarial critique and revision loop', 'Mathematical formula verification', 'Specialized domain prompt fine-tuning', 'Configurable reasoning budget'],
        preview: {
          title: 'Ensemble Reasoning Flow',
          bars: [{ label: 'Claude', val1: 100, val2: 98 }, { label: 'Gemini', val1: 100, val2: 99 }, { label: 'Debate', val1: 99, val2: 96 }, { label: 'Refine', val1: 100, val2: 98 }, { label: 'Consensus', val1: 100, val2: 100 }],
          providers: [{ name: 'Reasoning Models', amount: 'Ensemble 3x', color: 'bg-emerald-500' }, { name: 'Math Verification', amount: 'Symbolic Python', color: 'bg-blue-600' }, { name: 'Flaw Elimination', amount: '99.4%', color: 'bg-purple-600' }, { name: 'Reasoning Depth', amount: 'Adjustable', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'confidential-sandbox',
        number: '08',
        title: 'Confidential Stealth Due Diligence',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Conduct stealth market research, M&A due diligence, and competitive intel without leaving search footprints.',
        features: ['Proxied multi-region crawler network', 'Zero search query telemetry recorded', 'SOC 2 Type II certified isolation', 'Ephemeral container execution environments'],
        preview: {
          title: 'Stealth Due Diligence',
          bars: [{ label: 'Proxy', val1: 100, val2: 100 }, { label: 'Stealth', val1: 100, val2: 100 }, { label: 'Telemetry', val1: 0, val2: 0 }, { label: 'SOC2', val1: 100, val2: 100 }, { label: 'Sandbox', val1: 100, val2: 100 }],
          providers: [{ name: 'Search Footprint', amount: 'Zero Trace', color: 'bg-emerald-500' }, { name: 'Proxied Crawler', amount: 'Residential 120+', color: 'bg-blue-600' }, { name: 'M&A Safe', amount: 'Confidential', color: 'bg-purple-600' }, { name: 'Container Isolation', amount: 'Ephemeral', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Strategic research, due diligence, and market intelligence',
    useCases: [
      { id: 'uc1', title: 'M&A & Competitive Due Diligence', desc: 'Analyze competitor market positioning, pricing changes, patent filings, and technology stack migrations.', icon: <BarChart2 className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'uc2', title: 'Technical Architecture Feasibility', desc: 'Evaluate open-source frameworks, database performance benchmarks, and cloud migration trade-offs.', icon: <Code className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'uc3', title: 'Regulatory & Compliance Mapping', desc: 'Map changing global AI, privacy, and cybersecurity laws (EU AI Act, HIPAA, SOC 2) to your product roadmap.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'uc4', title: 'Scientific & Academic Literature Review', desc: 'Survey hundreds of arXiv papers, patents, and medical journals to extract formulas and benchmark results.', icon: <FileText className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to academic repositories and enterprise knowledge hubs',
    integrations: [
      { name: 'AWS', logoKey: 'aws' },
      { name: 'GitHub', logoKey: 'github' },
      { name: 'Docker', logoKey: 'docker' },
      { name: 'OpenAI', logoKey: 'openai' },
      { name: 'Anthropic', logoKey: 'anthropic' },
      { name: 'Databricks', logoKey: 'databricks' }
    ],
    ctaTitle: 'Conduct exhaustive deep research in minutes',
    ctaSubtitle: 'Enter any research question or technical hypothesis to generate citation-backed whitepapers automatically.',
    relatedHeadline: 'Explore related AI services and research tools',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat', desc: 'Next-gen enterprise multi-modal chat assistant with tool calling.', icon: <MessageSquare className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'solution-architect', type: 'product', name: 'Solution Architect', desc: 'AI-assisted cloud architecture design and IaC generator.', icon: <Box className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'analytics', type: 'product', name: 'Analytics', desc: 'Unified cross-cloud data warehouse intelligence and telemetry.', icon: <BarChart2 className="w-5 h-5" />, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', iconBorder: 'border-indigo-100' },
      { id: 'compliance', type: 'product', name: 'Risk & Compliance', desc: 'Automated SOC 2, HIPAA, and ISO 27001 compliance auditing.', icon: <ShieldCheck className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'audit', type: 'product', name: 'Audit Management', desc: 'Multi-cloud security posture, IAM permissions, and access auditing.', icon: <FileCheck className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'devops', type: 'product', name: 'DevOps', desc: 'Autonomous CI/CD pipeline automation and GitOps deployments.', icon: <InfinityIcon className="w-5 h-5" />, iconBg: 'bg-slate-50', iconColor: 'text-slate-600', iconBorder: 'border-slate-200' }
    ],
    videoModal: {
      title: 'Deep Research Walkthrough',
      subtitle: 'Recursive Autonomous Research & Synthesis Engine',
      heroCardTitle: 'Watch Autonomous Deep Research in Action',
      heroCardDesc: 'See how the Deep Research agent recursively decomposes complex questions, crawls 400+ authoritative sources, and compiles publication-ready whitepapers.',
      highlights: [{ label: '400+ Sources', sub: 'Analyzed / query' }, { label: '99.8%', sub: 'Citation accuracy' }, { label: '14 Hours', sub: 'Saved / report' }]
    }
  }
};
