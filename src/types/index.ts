export type NavigationSection = 
  | 'home'
  | 'products'
  | 'services'
  | 'agents'
  | 'workspace'
  | 'admin';

export type ProductId = 
  | 'finops'
  | 'monitoring'
  | 'testing'
  | 'devops'
  | 'compliance'
  | 'analytics'
  | 'audit'
  | 'gamifications'
  | 'solution-architect'
  | 'solution-factor'
  | 'ai-models';

export type ServiceId = 
  | 'ai-chat'
  | 'ai-image'
  | 'ai-video'
  | 'ai-music'
  | 'ai-audio'
  | 'ai-pods';

export type AgentId = 
  | 'meeting-notes'
  | 'deep-research'
  | 'fact-check'
  | 'call-for-me'
  | 'translation'
  | 'download-for-me';

export type WorkspaceView = 
  | 'home'
  | 'products'
  | 'services'
  | 'agents'
  | 'agent-builder'
  | 'agent-listing'
  | 'custom-agent'
  | 'marketplace'
  | 'solution-builder-fullstack'
  | 'solution-builder-frontend'
  | 'solution-builder-superagent'
  | `product-${ProductId}`
  | `service-${ServiceId}`
  | `agent-${AgentId}`
  | 'projects'
  | 'activity'
  | 'usage'
  | 'billing'
  | 'support'
  | 'team'
  | 'roles'
  | 'api-keys'
  | 'integrations'
  | 'settings'
  | 'vault'
  | 'skills-library';

export interface ProductItem {
  id: ProductId;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: 'Engineering & Cloud' | 'Security & Governance' | 'Operations & Cost' | 'Data & AI';
  icon: string;
  badge?: string;
  features: string[];
  stats?: { label: string; value: string; change?: string }[];
}

export interface ServiceItem {
  id: ServiceId;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: 'Conversational' | 'Vision & Media' | 'Audio & Voice' | 'Generative Studio';
  icon: string;
  badge?: string;
  modelOptions?: string[];
}

export interface AgentItem {
  id: AgentId;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: 'Productivity' | 'Research & Analysis' | 'Automation & Voice' | 'Operations';
  icon: string;
  badge?: string;
  status: 'Ready' | 'Active' | 'Running' | 'Idle';
  lastRun?: string;
  capabilities: string[];
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: 'Text' | 'Vision' | 'Audio' | 'Video' | 'Reasoning' | 'Multimodal';
  contextWindow: string;
  inputPricing: string;
  outputPricing: string;
  status: 'Production' | 'Beta' | 'Preview';
  description: string;
  rating: number;
  benchmarkScore: number;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  status: 'Active' | 'In Review' | 'Planning' | 'Archived';
  productsUsed: string[];
  owner: string;
  updatedAt: string;
  membersCount: number;
}

export interface ActivityEvent {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  action: string;
  target: string;
  category: 'product' | 'service' | 'agent' | 'security' | 'deploy';
  timestamp: string;
  status: 'success' | 'warning' | 'info' | 'error';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'system' | 'agent' | 'billing' | 'security' | 'deploy';
  actionUrl?: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  ip: string;
  action: string;
  resource: string;
  status: 'Success' | 'Denied' | 'Warning';
  details: string;
  userAgent: string;
}

export interface ComplianceControl {
  id: string;
  framework: 'SOC 2 Type II' | 'ISO 27001' | 'HIPAA' | 'GDPR';
  controlName: string;
  status: 'Compliant' | 'In Review' | 'Attention Needed';
  score: number;
  lastAudited: string;
  owner: string;
}
