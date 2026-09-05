import { Project, ActivityEvent, NotificationItem, AuditRecord, ComplianceControl } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-01',
    name: 'OmniFlow Commerce Core',
    key: 'OFC',
    description: 'Enterprise multi-tenant microservices architecture with event-driven checkout and real-time fraud scoring.',
    status: 'Active',
    productsUsed: ['Solution Architect', 'Monitoring', 'DevOps', 'Testing'],
    owner: 'Sanmugavel S',
    updatedAt: '10 minutes ago',
    membersCount: 8
  },
  {
    id: 'proj-02',
    name: 'FinSight Cost Automation',
    key: 'FCA',
    description: 'Automated Kubernetes cluster rightsizing and reserved instance purchasing pipeline across AWS & Azure.',
    status: 'Active',
    productsUsed: ['FinOps', 'Analytics', 'AI Models'],
    owner: 'Sanmugavel S',
    updatedAt: '2 hours ago',
    membersCount: 5
  },
  {
    id: 'proj-03',
    name: 'Healthcare Compliance Shield',
    key: 'HCS',
    description: 'HIPAA & SOC 2 audit readiness system with continuous cloud asset discovery and immutable logging.',
    status: 'In Review',
    productsUsed: ['Compliance', 'Audit', 'Testing'],
    owner: 'Elena Rostova',
    updatedAt: '1 day ago',
    membersCount: 12
  },
  {
    id: 'proj-04',
    name: 'VoiceGen Voice Assistant V3',
    key: 'VGA',
    description: 'Autonomous multi-lingual telephone dispatching agent connected to CRM and telephony gateways.',
    status: 'Active',
    productsUsed: ['AI Models', 'Monitoring', 'Testing'],
    owner: 'Sanmugavel S',
    updatedAt: '3 days ago',
    membersCount: 6
  }
];

export const mockActivities: ActivityEvent[] = [
  {
    id: 'act-1',
    user: {
      name: 'Sanmugavel S',
      avatar: 'SS',
      email: 'sanmugavel@snssquare.com'
    },
    action: 'deployed new architecture blueprint',
    target: 'OmniFlow Commerce Core (v2.4.0)',
    category: 'deploy',
    timestamp: '8 mins ago',
    status: 'success'
  },
  {
    id: 'act-2',
    user: {
      name: 'Deep Research Agent',
      avatar: 'DR',
      email: 'agent-research@snssquare.ai'
    },
    action: 'completed synthesis report',
    target: 'Q1 Cloud Cost & LLM Inference Optimization',
    category: 'agent',
    timestamp: '24 mins ago',
    status: 'info'
  },
  {
    id: 'act-3',
    user: {
      name: 'Elena Rostova',
      avatar: 'ER',
      email: 'elena.r@snssquare.com'
    },
    action: 'triggered automated compliance audit scan',
    target: 'SOC 2 Type II Controls Matrix',
    category: 'product',
    timestamp: '1 hour ago',
    status: 'success'
  },
  {
    id: 'act-4',
    user: {
      name: 'CI/CD Pipeline Runner',
      avatar: 'CI',
      email: 'runner@snssquare.devops'
    },
    action: 'ran 1,420 test suites with 99.8% pass rate',
    target: 'Core API Gateway Release 4.1',
    category: 'product',
    timestamp: '2 hours ago',
    status: 'success'
  },
  {
    id: 'act-5',
    user: {
      name: 'FinOps AI Engine',
      avatar: 'FO',
      email: 'finops-bot@snssquare.ai'
    },
    action: 'identified idle compute resources',
    target: 'Potential monthly saving of $2,480 detected',
    category: 'product',
    timestamp: '4 hours ago',
    status: 'warning'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Architecture Validation Complete',
    message: 'Solution Architect successfully verified OmniFlow v2.4.0 with 0 security risks and $1.2k estimated savings.',
    timestamp: '5m ago',
    read: false,
    type: 'system'
  },
  {
    id: 'notif-2',
    title: 'Deep Research Agent Finished',
    message: 'Report "2026 Enterprise Agentic Workflows" is ready for download and team sharing.',
    timestamp: '25m ago',
    read: false,
    type: 'agent'
  },
  {
    id: 'notif-3',
    title: 'Monthly Cloud Budget Notification',
    message: 'Your team has utilized 82.4% of the monthly allocated cloud budget ($24,850 / $30,000).',
    timestamp: '3h ago',
    read: true,
    type: 'billing'
  },
  {
    id: 'notif-4',
    title: 'SOC 2 Control Audit Passed',
    message: 'Automated evidence collector verified 148 controls against AWS and GitHub production logs.',
    timestamp: '1d ago',
    read: true,
    type: 'security'
  }
];

export const mockAuditLogs: AuditRecord[] = [
  {
    id: 'aud-9801',
    timestamp: '2026-09-05 09:12:44',
    user: 'sanmugavel@snssquare.com',
    ip: '192.168.1.104',
    action: 'DEPLOY_PIPELINE',
    resource: 'production-us-east-1/cluster-core',
    status: 'Success',
    details: 'Deployed commit #a491f82 with Blue/Green switchover',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  },
  {
    id: 'aud-9802',
    timestamp: '2026-09-05 08:45:10',
    user: 'elena.r@snssquare.com',
    ip: '10.0.4.22',
    action: 'UPDATE_IAM_POLICY',
    resource: 'iam/role/ai-agents-execution-role',
    status: 'Success',
    details: 'Added s3:PutObject permission for research report artifacts',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  },
  {
    id: 'aud-9803',
    timestamp: '2026-09-05 07:30:19',
    user: 'external-api-key-live_882',
    ip: '45.33.32.156',
    action: 'GENERATE_AI_COMPLETION',
    resource: 'api/v1/models/gemini-2-flash',
    status: 'Success',
    details: 'Prompt execution: 14,200 input tokens, 820 output tokens',
    userAgent: 'Go-http-client/1.1'
  },
  {
    id: 'aud-9804',
    timestamp: '2026-09-05 06:14:02',
    user: 'unknown@suspicious-origin.net',
    ip: '185.220.101.5',
    action: 'AUTHENTICATE_WORKSPACE',
    resource: 'auth/login',
    status: 'Denied',
    details: 'Blocked by Zero-Trust Geo-Fencing & IP Threat Intelligence',
    userAgent: 'Python-requests/2.28.1'
  },
  {
    id: 'aud-9805',
    timestamp: '2026-09-05 04:50:22',
    user: 'sanmugavel@snssquare.com',
    ip: '192.168.1.104',
    action: 'CREATE_ARCHITECTURE_SPEC',
    resource: 'architect/canvas/proj-01-omnichannel',
    status: 'Success',
    details: 'Saved 14 nodes, 18 wires with AWS RDS + Lambda + EKS topology',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
];

export const mockComplianceControls: ComplianceControl[] = [
  {
    id: 'CC-1.1',
    framework: 'SOC 2 Type II',
    controlName: 'Access Control & Multi-Factor Authentication',
    status: 'Compliant',
    score: 100,
    lastAudited: 'Today',
    owner: 'Security Ops'
  },
  {
    id: 'CC-2.3',
    framework: 'SOC 2 Type II',
    controlName: 'Continuous Vulnerability & Dependency Scanning',
    status: 'Compliant',
    score: 98,
    lastAudited: 'Yesterday',
    owner: 'DevSecOps'
  },
  {
    id: 'ISO-27001-A9',
    framework: 'ISO 27001',
    controlName: 'User Access Management & Privilege Review',
    status: 'Compliant',
    score: 96,
    lastAudited: '2 days ago',
    owner: 'IAM Lead'
  },
  {
    id: 'HIPAA-164.312',
    framework: 'HIPAA',
    controlName: 'ePHI Data Encryption in Transit (TLS 1.3) & At Rest (AES-256)',
    status: 'Compliant',
    score: 100,
    lastAudited: 'Today',
    owner: 'Infrastructure'
  },
  {
    id: 'GDPR-Art-32',
    framework: 'GDPR',
    controlName: 'Security of Data Processing & Right to Erasure Pipeline',
    status: 'In Review',
    score: 88,
    lastAudited: '3 days ago',
    owner: 'Legal & Privacy'
  }
];
