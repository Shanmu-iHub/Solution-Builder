export type AssetType = 'capability' | 'skill' | 'knowledge' | 'instruction' | 'policy';
export type LifecycleStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';
export type Accessibility = 'PRIVATE' | 'TEAM' | 'PUBLIC';
export type ChangeType = 'MAJOR' | 'MINOR' | 'PATCH';

export interface SkillExample {
  title: string;
  input: string;
  output: string;
}

/** One flat shape for all five asset kinds — type-specific fields are optional. */
export interface Asset {
  id: string;
  type: AssetType;
  familyId: string;
  isFamilyHead: boolean;
  releaseNotes: string;
  changeType: ChangeType | null;

  name: string;
  displayName: string;
  shortDescription: string;
  description: string;
  category: string;
  subCategory: string;
  department?: string;
  tags: string[];

  status: LifecycleStatus;
  semanticVersion: string;
  accessibility: Accessibility;
  marketplaceLive: boolean;
  acquisitionType?: 'INSTALL' | 'CLONE' | null;
  sourceAssetId?: string;
  deprecationReason?: string;
  replacementAssetId?: string;
  archiveReason?: string;

  owner: string;
  createdAt: string;
  updatedAt: string;

  /** Folder membership (knowledge / instruction / policy / skill → capability). */
  capabilityIds: string[];

  // capability
  linkedSkillIds?: string[];

  // skill
  skillType?: 'TASK' | 'ANALYSIS' | 'GENERATION' | 'VALIDATION' | 'REVIEW' | 'CLASSIFICATION';
  promptTemplate?: string;
  examples?: SkillExample[];
  knowledgeIds?: string[];
  instructionIds?: string[];
  policyIds?: string[];

  // knowledge / instruction / policy
  subType?: string;
  content?: string;
  enforcementMode?: 'OPTIONAL' | 'RECOMMENDED' | 'MANDATORY';

  stats: { views: number; installs: number; favorites: number; rating: number; reviewCount: number };
}

export interface AssetReview {
  id: string;
  assetId: string;
  author: string;
  rating: number;
  title: string;
  review: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export type HistoryAction = 'CREATED' | 'UPDATED' | 'PUBLISHED' | 'VERSION_CREATED' | 'DEPRECATED' | 'UNDEPRECATED' | 'ARCHIVED' | 'RESTORED' | 'ROLLED_BACK';

export interface HistoryEntry {
  id: string;
  familyId: string;
  assetId: string;
  action: HistoryAction;
  changedBy: string;
  changedAt: string;
  reason?: string;
  changes: { field: string; from: string; to: string }[];
}

export type IssueSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IssueCategory = 'METADATA' | 'CONTENT' | 'PROMPT_SECURITY' | 'BEHAVIORAL_SECURITY' | 'DATA_PRIVACY' | 'COMPLIANCE' | 'AI_QUALITY';

export interface ValidationIssue {
  category: IssueCategory;
  severity: IssueSeverity;
  message: string;
  fixSuggestion?: string;
}

export interface ValidationReport {
  status: 'PASSED' | 'WARNINGS' | 'BLOCKED';
  readinessScore: number;
  issues: ValidationIssue[];
  scannedAt: string;
}

export const ASSET_TYPE_LABEL: Record<AssetType, string> = {
  capability: 'Folder',
  skill: 'Skill',
  knowledge: 'Knowledge',
  instruction: 'Instruction',
  policy: 'Policy',
};

export const ASSET_TYPE_DESC: Record<AssetType, string> = {
  capability: "A folder for organizing related Skills together, so they're easier to find and manage — similar to how you'd group files into a labeled folder on your computer.",
  skill: "A specific task your AI assistant can perform — like drafting a document or summarizing text. It's built by combining background knowledge, instructions, and rules into one reusable capability.",
  knowledge: 'Background information the AI can reference while working — company facts, product details, or reference material — so its answers are accurate and specific to your business.',
  instruction: 'A set of directions that tells the AI how to behave or format its output — like a style guide or a checklist of steps it should always follow.',
  policy: "A safety rule the AI must always respect — for example, what topics to avoid, or how to handle sensitive information. Policies keep the AI's behavior safe and compliant.",
};

export const STATUS_LABEL: Record<LifecycleStatus, string> = {
  DRAFT: 'Draft',
  UNDER_REVIEW: 'In Review',
  APPROVED: 'Approved',
  PUBLISHED: 'Live',
  DEPRECATED: 'Outdated',
  ARCHIVED: 'Archived',
};

export const ACCESS_LABEL: Record<Accessibility, string> = {
  PRIVATE: 'Only Me',
  TEAM: 'My Team',
  PUBLIC: 'Marketplace',
};

export const HISTORY_LABEL: Record<HistoryAction, string> = {
  CREATED: 'Created',
  UPDATED: 'Updated',
  PUBLISHED: 'Went Live',
  VERSION_CREATED: 'New Version Created',
  DEPRECATED: 'Marked Outdated',
  UNDEPRECATED: 'Reactivated',
  ARCHIVED: 'Archived',
  RESTORED: 'Restored',
  ROLLED_BACK: 'Rolled Back',
};

export const ISSUE_CATEGORY_LABEL: Record<IssueCategory, string> = {
  METADATA: 'Basic Info',
  CONTENT: 'Content',
  PROMPT_SECURITY: 'Security',
  BEHAVIORAL_SECURITY: 'Security',
  DATA_PRIVACY: 'Private Data',
  COMPLIANCE: 'Rules & Policies',
  AI_QUALITY: 'Quality',
};

export const MARKETPLACE_CATEGORIES = [
  'Sales & CRM',
  'Marketing',
  'Customer Support',
  'Finance & Accounting',
  'Human Resources',
  'Operations',
  'Data & Analytics',
  'IT & Engineering',
  'General Utilities',
];

export const TEAMS = [
  { id: 'team-eng', name: 'Platform Engineering' },
  { id: 'team-product', name: 'Product & Design' },
  { id: 'team-data', name: 'Data & AI' },
];
