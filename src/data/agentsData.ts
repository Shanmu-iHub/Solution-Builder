import { AgentItem } from '../types';

export const agentsList: AgentItem[] = [
  {
    id: 'meeting-notes',
    name: 'AI Meeting Notes',
    shortDesc: 'Automatically capture meetings, summarize discussions, and identify action items.',
    longDesc: 'Autonomous meeting assistant that joins Google Meet, Zoom, and Teams calls or ingests audio recordings, providing high-fidelity transcriptions, key decisions, and synchronized Jira tasks.',
    category: 'Productivity',
    icon: 'FileText',
    badge: 'Zoom / Meet / Teams',
    status: 'Ready',
    lastRun: '12 mins ago',
    capabilities: [
      'Multi-speaker identification with voiceprints',
      'Automated executive bullet summary',
      'Action item extraction with assignee & due dates',
      'Direct sync to Notion, Jira, Linear, and Slack',
      'Sentiment and engagement analytics'
    ]
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    shortDesc: 'Research complex topics across multiple sources and generate structured insights.',
    longDesc: 'Multi-step autonomous web and database research agent that searches hundreds of academic, industry, and technical sources, cross-references findings, and produces comprehensive whitepapers.',
    category: 'Research & Analysis',
    icon: 'Search',
    badge: 'Multi-Step Planner',
    status: 'Ready',
    lastRun: '1 hr ago',
    capabilities: [
      'Recursive query decomposition and crawling',
      'Cross-validation across peer-reviewed papers & patents',
      'Data synthesis with citation footnotes',
      'Automated graph and chart generation',
      'Export to PDF, Markdown, and Google Docs'
    ]
  },
  {
    id: 'fact-check',
    name: 'Fact Check',
    shortDesc: 'Analyze claims and verify information using trusted sources.',
    longDesc: 'Verification and compliance auditing agent that evaluates statements against verified knowledge bases, regulatory filings, and primary sources to detect hallucinations or factual discrepancies.',
    category: 'Research & Analysis',
    icon: 'CheckSquare',
    badge: 'Truth Index 99.8%',
    status: 'Ready',
    lastRun: '3 hrs ago',
    capabilities: [
      'Claim extraction and semantic entity parsing',
      'Live retrieval from authoritative fact databases',
      'Confidence scoring with explicit provenance',
      'Red-flag detection for outdated statistics',
      'Automated correction recommendation'
    ]
  },
  {
    id: 'call-for-me',
    name: 'Sales & Support',
    shortDesc: 'Autonomous conversational voice agent and 24/7 omnichannel AI customer support.',
    longDesc: 'Human-parity conversational telephone agent capable of qualifying sales leads, scheduling appointments, conducting vendor inquiries, and resolving tier-1 support tickets in under 400ms.',
    category: 'Automation & Voice',
    icon: 'PhoneCall',
    badge: 'Sub-400ms Voice',
    status: 'Ready',
    lastRun: 'Yesterday',
    capabilities: [
      'Ultra-natural conversational voice with low latency',
      'Autonomous objective fulfillment and question handling',
      'Call recording, real-time live transfer to human',
      'Post-call outcome logging and structured CRM sync',
      'Twilio and WebRTC enterprise telephony gateway'
    ]
  },
  {
    id: 'translation',
    name: 'Mail & Translate',
    shortDesc: 'Multilingual email intelligence and context-aware neural document & codebase translation.',
    longDesc: 'Context-aware neural translation and email copilot engine preserving formatting in docx, pdf, and codebases across 95+ languages with enterprise glossary adherence.',
    category: 'Operations',
    icon: 'Languages',
    badge: '95+ Languages',
    status: 'Ready',
    lastRun: '2 days ago',
    capabilities: [
      'Document layout preservation (PDF, Office, HTML)',
      'Custom corporate terminology glossary support',
      'Idiomatic and culturally tuned localization',
      'Audio & video dubbing with lip-sync alignment',
      'Batch translation API for CI/CD pipelines'
    ]
  },
  {
    id: 'download-for-me',
    name: 'Download For Me',
    shortDesc: 'Find, retrieve, and organize requested digital resources.',
    longDesc: 'Autonomous web asset scraping and data collection worker that bypasses captchas, gathers structured datasets, downloads files, and organizes them securely into your cloud storage.',
    category: 'Automation & Voice',
    icon: 'DownloadCloud',
    badge: 'Automated Crawl',
    status: 'Ready',
    lastRun: '4 days ago',
    capabilities: [
      'Multi-site automated batch resource downloading',
      'Intelligent asset categorization and tagging',
      'Direct upload to S3, Google Drive, or OneDrive',
      'Anti-bot and rate-limiting compliant scheduling',
      'Data extraction from non-standard formats'
    ]
  }
];
