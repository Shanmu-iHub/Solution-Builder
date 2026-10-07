export type SlotKey = 'idea' | 'problem' | 'intended_users' | 'intended_outcome' | 'context' | 'use_cases' | 'affected_stakeholders' | 'handled_today' | 'main_drivers' | 'success_signal' | 'constraints';
export type SlotState = 'known' | 'inferred' | 'missing' | 'skipped';
export interface SlotValue { state: SlotState; value: string; items?: string[] }
export type Slots = Record<SlotKey, SlotValue>;

export type AnswerType = 'single_select' | 'multi_select' | 'short_text' | 'long_text';
export interface IdeaQuestion {
  id: string;
  slot: SlotKey;
  text: string;
  why: string;
  type: AnswerType;
  options: { value: string; label: string }[];
  allowOther: boolean;
  skippable: boolean;
  /** pre-filled answer so a demo can click straight through */
  suggested: string | string[];
  suggestedOther?: string;
}
export interface IdeaAnswer { value: string | string[]; other?: string; skipped?: boolean }

export type DirectionTag = 'recommended' | 'ambitious' | 'broad_scope' | 'alternative';
export interface Direction { id: string; title: string; description: string; tag: DirectionTag; buildsOn: string[] }

export type Origin = 'user_confirmed' | 'source_backed' | 'ai_suggestion' | 'ai_inference' | 'ai_estimate' | 'assumption' | 'missing';

/* Opportunity & discovery */
export interface OppCard { text: string; source: Origin }
export interface Opportunity {
  cards: Record<'business' | 'customer' | 'market' | 'technology', OppCard>;
  potentialValue: { label: string; value: string; basis: string; source: Origin }[];
  assumptions: { text: string; source: Origin }[];
}
export interface ResearchResult { rank: number; title: string; url: string; content: string }
export interface MarketResearch { queries: string[]; results: ResearchResult[]; summary: { text: string; sources: number[] }[] }
export interface Customers {
  problemHolders: string[];
  solutionUsers: string[];
  segments: { name: string; description: string }[];
  personas: { name: string; type: 'problem_holder' | 'solution_user'; goals: string; pains: string }[];
}
export interface Analysis { summary: string; strengths: string[]; risks: string[]; openQuestions: string[] }
export interface MarketBrief {
  sections: { key: string; title: string; items: { text: string; type: 'reported' | 'synthesis'; sources: number[] }[] }[];
  sizing: { tam: string; sam: string; som: string; method: string };
  competitors: { name: string; description: string }[];
  comparison: { competitor: string; capability: string; detail: string }[];
  assumptions: string[];
  openQuestions: string[];
}

/* Problem discovery */
export type DimensionKey = 'problem' | 'affected_users' | 'pain_points' | 'current_process' | 'frequency' | 'severity' | 'business_impact' | 'customer_impact' | 'evidence';
export interface Dimension { key: DimensionKey; label: string; required: boolean; state: 'known' | 'inferred' | 'missing' | 'skipped'; items: { label: string; value: string; origin: Origin }[] }
export interface PdQuestion { suggested: string[]; id: string; dimension: DimensionKey; text: string; help: string; options: string[]; multi: boolean; allowOther: boolean; skippable: boolean }
export interface RootChain {
  id: string;
  status: 'proposed' | 'confirmed' | 'rejected';
  levels: { pain_point: string; symptom: string; root_cause: string; underlying_cause: string };
  rationale: string;
  edited?: boolean;
}
export type Perspective = 'user' | 'business' | 'process' | 'custom';
export interface Statement { id: string; perspective: Perspective; label: string; source: 'ai_generated' | 'user_written'; status: 'proposed' | 'confirmed' | 'rejected'; statement: string; why: string; affected: string[]; uncertainties: string[] }
export interface Lens { role: string; focus: string; score: number; reasoning: string }
export type LensKey = 'ceo' | 'cfo' | 'coo' | 'cmo';
export interface Evidence { id: string; description: string; type: string; source: string; supports: string[]; origin: Origin }
export interface GateCondition { id: string; label: string; passed: boolean; detail: string }
export interface Decision { status: 'validated' | 'needs_more_evidence' | 'working_assumption'; note: string; decidedAt: string }
export interface ProblemVersion { version: string; status: 'draft' | 'confirmed'; statement: string; validation: Decision['status'] | null; at: string }

/* Solution planning */
export interface Proposal {
  name: string; tagline: string; domain: string; confidence: number; status: string; complexity: string; aiLevel: string; description: string;
  whyThis: string[]; benefits: string[];
  mapping: { problem: string; solution: string }[];
  outcomes: string[]; capabilities: string[]; modules: string[]; aiFeatures: string[]; integrations: string[];
  summary: Record<string, string>;
}
export type DocType = 'Solution Architecture Document' | 'Technical Design Document' | 'API Endpoint List' | 'Database Design Document' | 'High-Level Design Document' | 'Integration Design Document' | 'Infrastructure Design Document' | 'Security Design Document' | 'Low-Level Design Document' | 'AI Solution Design Document';
export interface DocState { status: 'none' | 'generating' | 'completed'; content: string }
export interface Finding { doc: string; dimension: string; severity: 'critical' | 'high' | 'medium' | 'low'; status: 'passed' | 'failed' | 'warning' | 'insufficient_evidence'; finding: string; recommendation?: string }
export interface Persona { id: string; name: string; role: string; tagline: string; about: string; experience: string; environment: string; device: string; frequency: string; goals: string[]; concerns: string[]; tasks: string[]; quote: string }
export interface JourneyPhase { name: string; actions: string[]; mindsets: string[]; saying: string[]; touchpoints: string[]; emotion: { label: string; score: number } }
export interface Journey { id: string; personaId: string; scenario: string; goal: string; expectations: string; phases: JourneyPhase[]; opportunities: string[] }
export interface WireframePage { id: string; name: string; purpose: string; flowType: string; components: string[]; interactions: { action: string; result: string }[]; html: string }
export interface TaskNode { id: string; title: string; owner: string; priority: 'P0' | 'P1' | 'P2'; hours: number; status: 'todo' | 'in_progress' | 'completed'; description: string }
export interface StoryNode { id: string; title: string; statement: string; tasks: TaskNode[] }
export interface FeatureNode { id: string; title: string; description: string; stories: StoryNode[] }
export interface EpicNode { id: string; title: string; description: string; features: FeatureNode[] }

export type PlanningStage = 'requirement_context' | 'solution_dashboard' | 'documentation' | 'architecture_validation' | 'ux_foundation' | 'wireframe_generation' | 'task_breakdown';
export type DiscoveryPage = 'idea' | 'opportunity' | 'problem' | 'solution' | 'business_model' | 'product_definition' | 'requirements' | 'documentation';

export interface SolutionProject {
  id: string;
  name: string;
  description: string;
  stage: PlanningStage;
  createdAt: string;
  updatedAt: string;
}

export interface PlanningState {
  discoveryPage: DiscoveryPage;
  /* idea */
  ideaStep: 'understand' | 'clarify' | 'directions' | 'vision' | 'confirm';
  ideaReached: number;
  idea: string;
  analyzed: boolean;
  slots: Slots;
  answers: Record<string, IdeaAnswer>;
  directions: Direction[];
  selectedDirection: string | null;
  vision: { text: string; source: 'ai' | 'user_edited' } | null;
  briefConfirmed: boolean;
  /* opportunity */
  oppTab: 'opportunity' | 'market' | 'customers' | 'analysis' | 'brief';
  opportunity: Opportunity | null;
  market: MarketResearch | null;
  customers: Customers | any;
  analysis: Analysis | null;
  marketBrief: MarketBrief | string | null;
  oppCompleted: boolean;
  /* problem discovery */
  pdStep: 'understand' | 'root_causes' | 'choose' | 'validate' | 'confirm';
  pdReached: number;
  pdContext: boolean;
  pdAnswers: Record<string, any>;
  chains: RootChain[];
  statements: Statement[];
  selectedStatement: string | null;
  executive: Record<string, Record<LensKey, Lens>> | null;
  evidence: Evidence[];
  decision: Decision | null;
  versions: ProblemVersion[];
  /* planning */
  proposal: Proposal | null;
  solutionApproved: boolean;
  docs: Record<string, DocState>;
  validation: { status: 'none' | 'validating' | 'completed'; findings: Finding[]; at: string | null };
  personas: Persona[];
  journeys: Journey[];
  wireframes: WireframePage[];
  tasks: { epics: EpicNode[]; review: 'pending' | 'approved' | 'changes_requested'; notes: string } | null;
  /* confirmations */
  productDefinitionConfirmed?: boolean;
  businessModelConfirmed?: boolean;
  documentsConfirmed?: boolean;
  requirementsConfirmed?: boolean;
  solutionConfirmed?: boolean;
  /* Solution Definition Map & Executive Layer */
  viewPerspective?: 'team' | 'executive';
  activeWorkspacePage?: DiscoveryPage | null;
  phaseMeta?: Partial<Record<DiscoveryPage, PhaseMetadata>>;
  executiveDecisions?: ExecutiveDecision[];
}

export type PhaseStatus = 'not_started' | 'in_progress' | 'ready_for_review' | 'approved' | 'needs_attention';

export interface PhaseMetadata {
  status: PhaseStatus;
  confidence: number;
  openQuestions: number;
  evidenceSources: number;
  lastUpdated: string;
  summaryText: string;
}

export interface ExecutiveDecision {
  id: string;
  phaseId: DiscoveryPage;
  title: string;
  category: string;
  description: string;
  impact: string;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  status: 'pending' | 'approved' | 'changes_requested';
  options?: string[];
  selectedOption?: string;
  decisionNote?: string;
}
