export type FactoryKind = 'full-stack' | 'ui-canvas' | 'code-migration' | 'planner-app';

export interface FactoryProject {
  projectId: string;
  kind: FactoryKind;
  projectName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  sourceType?: 'github' | 'upload';
  sourceRef?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  /** Tool/file activity lines shown under an assistant message. */
  activity?: { label: string; file?: string; done: boolean }[];
  streaming?: boolean;
  error?: boolean;
}

export interface ClarificationQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  allowCustom?: boolean;
}

export type PlanStatus = 'NONE' | 'DRAFT' | 'APPROVED';
export type ClarificationStatus = 'NONE' | 'AWAITING_USER' | 'ANSWERED';

export interface TokenLog {
  id: string;
  step: string;
  model: string;
  input: number;
  output: number;
  at: string;
}

export interface GitState {
  connected: boolean;
  account?: string;
  repoName?: string;
  repoUrl?: string;
  branch: string;
  commits: { hash: string; message: string; at: string }[];
}

export interface DeploymentRecord {
  id: string;
  provider: string;
  projectName: string;
  url: string;
  status: 'live' | 'stopped';
  at: string;
}

export interface WorkspaceState {
  messages: ChatMessage[];
  files: Record<string, string>;
  activeFile: string;
  questions: ClarificationQuestion[];
  clarificationStatus: ClarificationStatus;
  clarificationSummary: string;
  planMarkdown: string;
  planStatus: PlanStatus;
  generating: boolean;
  previewReady: boolean;
  previewRevision: number;
  terminal: string[];
  tokens: TokenLog[];
  git: GitState;
  deployments: DeploymentRecord[];
  publicLink: boolean;
  pages: string[];
  activePage: string;
}

export interface DbCollection {
  name: string;
  engine: 'PostgreSQL' | 'MongoDB';
  count: number;
  fields: { name: string; type: string; indexed?: boolean }[];
  rows: Record<string, unknown>[];
}

/* ── Code migration ─────────────────────────────────────────────────────── */

export interface MigrationFile {
  path: string;
  language: string;
  source: string;
  migrated?: string;
}

export interface MigrationNode {
  id: string;
  type: 'Module' | 'Class' | 'Function' | 'Route' | 'Table';
  label: string;
  file: string;
  description: string;
}
export interface MigrationEdge {
  id: string;
  source: string;
  target: string;
  type: 'CALLS' | 'IMPORTS' | 'READS' | 'EXPOSES';
}

export interface MigrationPlanStep {
  id: string;
  title: string;
  detail: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'pending' | 'in-progress' | 'done';
  files: string[];
}

export interface RepoGroup {
  id: string;
  name: string;
  description: string;
  projectIds: string[];
  crossCalls: { from: string; to: string; via: string; count: number }[];
  updatedAt: string;
}
