import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, Check, Download, 
  FileText, Copy, Printer, Sparkles, ShieldCheck, 
  Briefcase, Cpu, User, Layers, CheckCheck, Eye
} from 'lucide-react';
import { Button, cx, useToast } from '../../ui';
import { usePlanning } from '../PlanningStore';

export type DocumentType = 'brd' | 'prd' | 'srs' | 'lifecycle';

interface DocMetadata {
  id: DocumentType;
  code: string;
  title: string;
  description: string;
  sectionsCount: number;
  badgeTone: 'blue' | 'purple' | 'emerald' | 'amber';
  updatedAt: string;
  version: string;
}

const DOC_TABS: DocMetadata[] = [
  {
    id: 'brd',
    code: 'BRD',
    title: 'Business Requirements Document',
    description: 'Strategic justification, revenue ROI, stakeholder personas, and operational impact.',
    sectionsCount: 9,
    badgeTone: 'blue',
    updatedAt: 'Today, 2:45 PM',
    version: 'v1.0 Baseline',
  },
  {
    id: 'prd',
    code: 'PRD',
    title: 'Product Requirements Document',
    description: 'User journey workflows, mobile UI specs, core capabilities, and scope boundaries.',
    sectionsCount: 7,
    badgeTone: 'purple',
    updatedAt: 'Today, 2:48 PM',
    version: 'v1.0 Baseline',
  },
  {
    id: 'srs',
    code: 'SRS',
    title: 'Software Requirements Specification',
    description: 'Technical architecture, AI OCR pipeline, API schemas, security, and SLAs.',
    sectionsCount: 8,
    badgeTone: 'emerald',
    updatedAt: 'Today, 2:50 PM',
    version: 'v1.0 Baseline',
  },
  {
    id: 'lifecycle',
    code: 'FLOW',
    title: 'Lifecycle Tracking Matrix',
    description: 'Feature & Sub-feature mapping for the whole requirement gathering phase, full flow.',
    sectionsCount: 10,
    badgeTone: 'amber',
    updatedAt: 'Today, 2:55 PM',
    version: 'v1.0 Matrix',
  },
];

interface LifecyclePhase {
  phase: string;
  rows: { feature: string; sub: string }[];
}

const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    phase: 'Phase 1: Problem Understanding & Confirmation',
    rows: [
      { feature: 'Input Capture', sub: 'Natural language input, Attachments, Supporting context, Source metadata' },
      { feature: 'AI Understanding', sub: 'Input classification (idea/problem), Entity extraction, Context extraction, Intent detection, Initial problem statement' },
      { feature: 'Problem Clarification', sub: 'AI-generated follow-up questions, Conversational refinement, Answer tracking, Disambiguation' },
      { feature: 'Problem Definition', sub: 'Current situation (as-is state), Symptoms, Root cause hypotheses, Desired outcome (to-be state), Affected users & area, Business context' },
      { feature: 'Problem Framing', sub: 'Who/What/Where/When/Why structure, Problem statement generation, Problem scope definition, Key assumptions' },
      { feature: 'Confirmation & Closure', sub: 'Review & edit problem statement, Approve for validation, Restart if needed' },
      { feature: 'Problem Artifact', sub: 'Finalized problem statement, Context, Assumptions, Known unknowns' },
    ],
  },
  {
    phase: 'Phase 2: Problem Validation',
    rows: [
      { feature: 'Validation Planning', sub: 'Validation objectives, Validation questions, Hypotheses to test, Success criteria, Evidence requirements' },
      { feature: 'Root Cause Analysis', sub: 'Root cause hypotheses, Cause-effect diagrams, Contributing factors, Process bottlenecks, Current workarounds' },
      { feature: 'Evidence Collection', sub: 'Internal documents, Business data, Customer feedback, External research, User interviews/surveys, Upload workspace' },
      { feature: 'Evidence Repository', sub: 'Upload, Categorization, Search & filtering, Version control' },
      { feature: 'Evidence Analysis', sub: 'Volume, frequency, trend, time, cost analysis; Statistical summaries; Data visualization' },
      { feature: 'Impact Assessment', sub: 'Time impact, Cost impact, User impact, Business impact, Operational impact; Risk assessment' },
      { feature: 'Evidence Validation', sub: 'Supporting vs. conflicting evidence, Source credibility, Evidence strength scoring, Confidence levels' },
      { feature: 'Validation Scoring', sub: 'Reality (is it a real problem?), Frequency (how often?), Severity (how bad?), Impact (business value), Evidence strength, Overall confidence' },
      { feature: 'Validation Decision', sub: 'Decision gate: Validated → Proceed / Need More Evidence → Refine / Reframe → Problem redefinition / Reject → Archive' },
      { feature: 'Validation Report', sub: 'Executive summary, Evidence summary, Key metrics, Impact quantification, Confidence score, Recommendation' },
    ],
  },
  {
    phase: 'Phase 3: Opportunity Discovery',
    rows: [
      { feature: 'Opportunity Context', sub: 'Validated problem summary, Problem impact, Affected population, Current alternatives' },
      { feature: 'Opportunity Exploration', sub: 'Market gaps, Customer gaps, Revenue opportunities, Cost reduction, Automation, Efficiency, Strategic positioning, Business model innovation, Technology innovation' },
      { feature: 'Opportunity Generation', sub: 'AI-generated hypotheses, User-sourced ideas, Alternative paths, Concept descriptions' },
      { feature: 'Opportunity Evaluation', sub: 'Business value, Customer value, Potential scale, Feasibility, Strategic alignment, Differentiation, Impact magnitude' },
      { feature: 'Opportunity Comparison', sub: 'Side-by-side scoring, Ranking matrix, Priority visualization' },
      { feature: 'Opportunity Selection', sub: 'Select primary, Refine, Reject, Explore alternatives' },
      { feature: 'Opportunity Artifact', sub: 'Opportunity statement, Target area, Value potential, Key assumptions, Risks, Success criteria' },
    ],
  },
  {
    phase: 'Phase 4: Market & Industry Discovery',
    rows: [
      { feature: 'Market Definition', sub: 'Market identification, Market boundaries, Target segments, Geography, Segment sizing' },
      { feature: 'Market Research', sub: 'Market size (TAM/SAM/SOM), Growth rate, Demand analysis, Adoption trends, Market drivers, Market barriers, Segmentation detail' },
      { feature: 'Industry Analysis', sub: 'Industry trends, Industry structure, Business models, Regulatory environment, Industry disruption signals' },
      { feature: 'Competitive Landscape', sub: 'Direct competitors, Indirect competitors, Existing solutions, Alternatives, Positioning map' },
      { feature: 'Competitive Analysis', sub: 'Competitor features, Pricing, Target users, Strengths/weaknesses, Differentiation, Market gaps' },
      { feature: 'Technology Assessment', sub: 'Emerging tech, Technology maturity, AI/ML capabilities, Technology trends, Adoption readiness' },
      { feature: 'Market Gap Analysis', sub: 'Unmet needs, Underserved segments, Product gaps, Service gaps, Capability gaps' },
      { feature: 'Market Risk Assessment', sub: 'Economic risks, Regulatory risks, Technology risks, Competitive risks, Adoption barriers' },
      { feature: 'Market Report', sub: 'Market summary, Competitive landscape, Market gaps, Key trends, Risk assessment, Investment recommendation' },
    ],
  },
  {
    phase: 'Phase 5: User & Customer Discovery',
    rows: [
      { feature: 'User Identification', sub: 'Primary users, Secondary users, Customers, Buyers, Decision makers, Influencers' },
      { feature: 'Persona Discovery', sub: 'Persona creation (role, goals, responsibilities, pain points, needs, behaviors, constraints), Persona profiles' },
      { feature: 'User Journey Mapping', sub: 'Journey stages, User actions, Touchpoints, Pain points, Friction, Emotions, Desired outcomes' },
      { feature: 'Current Workflow Analysis', sub: 'Process steps, Bottlenecks, Manual tasks, Workarounds, Decision points, System interactions' },
      { feature: 'Needs & Pain Point Analysis', sub: 'Functional needs, Emotional needs, Business needs, Severity, Frequency, Root causes, Existing workarounds' },
      { feature: 'User Research', sub: 'Interview framework, Survey design, Feedback collection, Support conversation analysis, Observation sessions' },
      { feature: 'Research Synthesis', sub: 'Common patterns, Contradictions, Key findings, Evidence-backed insights, User quotes' },
      { feature: 'User Validation', sub: 'Need validation, Problem confirmation, Priority validation, Segment size validation' },
      { feature: 'User Insight Report', sub: 'Personas, Journeys, Consolidated pain points, Needs hierarchy, Behaviors, Adoption success factors' },
    ],
  },
  {
    phase: 'Phase 6: Solution Discovery',
    rows: [
      { feature: 'Solution Context', sub: 'Validated problem, Problem impact, Opportunity, Market findings, User insights (synthesis of all prior phases)' },
      { feature: 'Solution Ideation', sub: 'AI brainstorming, User brainstorming, Technology-driven concepts, Alternative solution types' },
      { feature: 'Solution Types', sub: 'Product, SaaS Platform, AI Agent, Multi-Agent System, Workflow automation, API/service, Hybrid (human + AI)' },
      { feature: 'Solution Concepts', sub: 'Concept descriptions, Use cases, User journey per concept, Key value drivers' },
      { feature: 'Solution Architecture Concept', sub: 'Components, Agents/workflows, Integrations, Data model, AI models, Knowledge requirements' },
      { feature: 'Solution Comparison', sub: 'User value, Business value, Feasibility, Cost, Complexity, Risk, Differentiation, Strategic fit' },
      { feature: 'Solution Scoring', sub: 'Value score, Feasibility score, Strategic alignment score, Risk score, Recommendation' },
      { feature: 'MVP Definition', sub: 'MVP scope, Key workflows, Critical features, Success metrics, Go/no-go criteria' },
      { feature: 'Assumption Analysis', sub: 'Business assumptions, User assumptions, Technology assumptions, Market assumptions, Validation plan' },
      { feature: 'Solution Risk Analysis', sub: 'Technical risks, Business risks, Adoption risks, Security/compliance risks, Mitigation strategies' },
      { feature: 'Solution Selection', sub: 'Primary recommendation, Rationale, Alternative pathways, Decision record' },
      { feature: 'Solution Artifact', sub: 'Solution statement, Target users, Capabilities, Features, Value proposition, MVP scope, Assumptions, Risks, Next steps' },
    ],
  },
  {
    phase: 'Phase 7: Business Model & Monetization Discovery',
    rows: [
      { feature: 'Business Model Architecture', sub: 'Value creation mechanism, Revenue model (SaaS, usage-based, subscription, marketplace), Cost structure, Margin analysis, Unit economics' },
      { feature: 'Pricing Strategy', sub: 'Value-based pricing, Tiered packaging, Add-ons & expansions, Enterprise discounting, Competitive benchmark' },
      { feature: 'Go-to-Market Strategy', sub: 'Distribution channels, Sales motion (PLG vs. enterprise sales), Customer acquisition cost (CAC), LTV/CAC ratio, Partner ecosystem' },
      { feature: 'Financial Viability & Projections', sub: 'Breakeven horizon, Capital expenditure (CapEx), Operating expenditure (OpEx), Revenue projections (Year 1–3), ROI sensitivity modeling' },
      { feature: 'Business Model Artifact', sub: 'Business Model Canvas, Pricing tier matrix, Unit economics summary, Revenue forecast model' },
    ],
  },
  {
    phase: 'Phase 8: Product Definition & UX Foundation',
    rows: [
      { feature: 'Product Scoping & Vision', sub: 'Product vision statement, Core value proposition, Architectural capabilities, Scope boundaries (In-scope deliverables vs. Out-of-scope boundaries)' },
      { feature: 'Persona Operationalization', sub: 'Enterprise role definitions, Permission tiers, Primary workflows per persona, Success milestones' },
      { feature: 'Experience Principles', sub: 'Design system alignment, Usability heuristics, Mobile vs. web paradigms, Accessibility standards (WCAG), Offline interaction model' },
      { feature: 'Journey Specification', sub: 'Step-by-step user journey, Interaction states, Error recovery flows, Micro-feedback loops' },
      { feature: 'Success & Quality Metrics', sub: 'Time-to-value, Task completion rate, CSAT/NPS targets, Operational error reduction targets' },
      { feature: 'Product Definition Artifact', sub: 'Product specification overview, Scope boundary charter, UX flow diagrams, Target metrics baseline' },
    ],
  },
  {
    phase: 'Phase 9: Requirements Engineering & Baseline',
    rows: [
      { feature: 'Requirement Elicitation & Taxonomy', sub: 'Business requirements (BR), User requirements (UR), Functional specifications (FR), AI & algorithmic requirements (AI), Non-functional requirements (NFR)' },
      { feature: 'Requirement Authoring & Formatting', sub: 'Atomic statements, Standard identifiers (BR-001, UR-001, FR-001, AI-001, NFR-001), Acceptance criteria (Given-When-Then), Priority tagging (HIGH, MED, LOW), Requirement type classification (Objective, Rule, Constraint)' },
      { feature: 'Traceability & Linkage', sub: 'Upstream linkage to root causes & problem statements, Downstream linkage to architecture modules, Persona association, Coverage validation' },
      { feature: 'Verification & Conflict Analysis', sub: 'Ambiguity checks, Duplicate detection, Inconsistency resolution, Technical feasibility verification' },
      { feature: 'Baseline Management', sub: 'Baseline versioning (Draft v0.1 to Baseline v1.0), Requirement status lifecycle (Proposed, In Review, Approved, Rejected), Change audit history' },
      { feature: 'Requirements Baseline Artifact', sub: 'Approved requirements registry (38 specifications), Traceability index, Priority distribution matrix' },
    ],
  },
  {
    phase: 'Phase 10: Enterprise Documentation & C-Suite Sign-off',
    rows: [
      { feature: 'Document Set Generation', sub: 'Business Requirements Document (BRD), Product Requirements Document (PRD), Software Requirements Specification (SRS)' },
      { feature: 'Document Section Structuring', sub: 'Executive summary, Scope boundaries, Functional breakdown, Architecture overview, Data schemas, Security & compliance standards' },
      { feature: 'Traceability & Compliance Mapping', sub: 'Requirements-to-specification matrix, Regulatory compliance mapping (SOC 2, GDPR, PCI-DSS), Audit trail verification' },
      { feature: 'Export & Integration', sub: 'Export to Microsoft Word (.docx), Export to PDF, Markdown generation, JIRA / Azure DevOps export' },
      { feature: 'C-Suite Governance & Stage Gate', sub: 'Chief Product Officer (CPO) review, Chief Business Officer (CBO) review, Chief Technology Officer (CTO) review, CEO stage-gate decision (Approved / Refine / Reject)' },
      { feature: 'Documentation Artifact', sub: 'Signed-off enterprise document bundle (BRD v1.0, PRD v1.0, SRS v1.0), C-Suite approval record, Formal sign-off charter unlocking Solution Planning' },
    ],
  },
];

export const RequirementDocuments: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onComplete: () => void;
  onBack?: () => void;
}> = ({ projectId, projectName, onComplete, onBack }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const { toast } = useToast();

  const [activeDoc, setActiveDoc] = useState<DocumentType>('brd');
  const [copied, setCopied] = useState(false);

  const currentMeta = DOC_TABS.find(d => d.id === activeDoc) || DOC_TABS[0];

  const handleExport = (format: string) => {
    toast({
      title: `Exporting ${currentMeta.code} (${format})`,
      description: `Preparing executive document package for ${projectName}...`,
    });
  };

  const handleCopyMarkdown = () => {
    setCopied(true);
    toast({
      title: 'Copied to Clipboard',
      description: `${currentMeta.title} exported in Markdown format.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const confirm = () => {
    patch(projectId, { documentsConfirmed: true });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#0F172A]">Enterprise Document Set</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Traceable business, product, and engineering specifications ready for executive sign-off.
          </p>
        </div>    
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">
            Stage 10 · Enterprise Documents
          </span>
        </div>
      </div>

      {/* Two-Column Workspace: Center Document Viewer + Right Sidebar Document Selector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center: Selected Document Content Viewer */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* 3. DOCUMENT CONTROLS & EXPORT TOOLBAR */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-slate-900 text-white">
                  {currentMeta.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {currentMeta.title}
                </h3>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentMeta.version}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-500 mt-0.5">
                Official traceable baseline generated from confirmed phases 01–07.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="xs"
                variant="secondary"
                icon={<Copy className="w-3 h-3" />}
                onClick={handleCopyMarkdown}
                className="text-xs font-medium"
              >
                {copied ? 'Copied!' : 'Copy Markdown'}
              </Button>

              <Button
                size="xs"
                variant="secondary"
                icon={<Download className="w-3 h-3" />}
                onClick={() => handleExport('PDF')}
                className="text-xs font-medium"
              >
                PDF
              </Button>

              <Button
                size="xs"
                variant="primary"
                icon={<Download className="w-3 h-3" />}
                onClick={() => handleExport('Word')}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Export Word (.docx)
              </Button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. FULL-WIDTH EXECUTIVE DOCUMENT VIEWER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">

            {/* TAB 1: BRD - BUSINESS REQUIREMENTS DOCUMENT */}
            {activeDoc === 'brd' && (
              <div className="space-y-8">
                {/* Document Header Metadata */}
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      Confidential · Enterprise Architecture Baseline
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: BRD-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Business Requirements Document (BRD)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    High-level enterprise specification detailing the business justification, target operational workflows, revenue ROI drivers, and strategic scope for the Mobile Expense Receipt Capture solution.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Target Project</span>
                      <span className="font-bold text-slate-800">{projectName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Document Owner</span>
                      <span className="font-bold text-slate-800">Product &amp; Commercial Strategy</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Baseline Version</span>
                      <span className="font-bold text-emerald-600">v1.0 Signed Off</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Sign-Off Date</span>
                      <span className="font-bold text-slate-800">October 2026</span>
                    </div>
                  </div>
                </div>

                {/* Section 1: Strategic Purpose & Vision */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>Executive Purpose &amp; Strategic Vision</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700 leading-relaxed">
                    <p>
                      Field sales representatives face significant friction in expense reimbursement, spending up to 3.5 hours per week manually filing physical paper receipts, resulting in an estimated 14% receipt loss rate and prolonged payment cycles exceeding 21 days.
                    </p>
                    <p>
                      The primary objective of this initiative is to deploy an AI-powered mobile application allowing instantaneous receipt capture at the point of sale, automatic metadata extraction, automated compliance audits, and straight-through routing into corporate accounting queues.
                    </p>
                  </div>
                </div>

                {/* Section 2: Target Stakeholder Personas */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Target Stakeholder &amp; User Personas</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Field Sales Rep</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">Primary</span>
                      </div>
                      <p className="text-slate-600">Visits 6–8 clients daily; needs 1-tap receipt capture with guaranteed offline queuing so reimbursements take days instead of weeks.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Sales Line Manager</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px]">Approver</span>
                      </div>
                      <p className="text-slate-600">Supervises team travel spend; requires a centralized queue with automated 48-hour reminders to approve compliant claims with zero email clutter.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Finance &amp; Audit Team</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Reconciliation</span>
                      </div>
                      <p className="text-slate-600">Audits tax compliance; needs immutable logs, structured CSV/ledger feeds, and automated pre-checks to cut monthly audit hours by 60%.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Traceable Business Requirements Matrix */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">3</span>
                    <span>Traceable Business Requirements Baseline</span>
                  </h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10.5px]">
                        <tr>
                          <th className="px-4 py-2.5 w-24">Req ID</th>
                          <th className="px-4 py-2.5">Business Requirement Statement</th>
                          <th className="px-4 py-2.5 w-24">Priority</th>
                          <th className="px-4 py-2.5 w-24">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-001</td>
                          <td className="px-4 py-2.5 text-slate-900">Enable field sales reps to capture receipts instantly on mobile devices.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Objective</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-002</td>
                          <td className="px-4 py-2.5 text-slate-900">Provide accurate AI extraction of receipt line-item data without manual typing.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Objective</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-003</td>
                          <td className="px-4 py-2.5 text-slate-900">Store captured receipts when offline and auto-sync when cellular connectivity returns.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Rule</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">BR-005</td>
                          <td className="px-4 py-2.5 text-slate-900">Integrate claim submission with existing corporate expense workflows and SAP Concur.</td>
                          <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">HIGH</span></td>
                          <td className="px-4 py-2.5 text-slate-600">Objective</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Expected ROI & Business Success Metrics */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">4</span>
                    <span>Quantified ROI &amp; Success Targets</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Reimbursement Cycle</span>
                      <span className="text-base font-bold text-slate-900 block">&lt; 3 Days</span>
                      <span className="text-[11px] text-slate-500">Down from 21 days</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Manual Data Entry</span>
                      <span className="text-base font-bold text-slate-900 block">Zero Effort</span>
                      <span className="text-[11px] text-slate-500">95%+ OCR Auto-populate</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Field CSAT</span>
                      <span className="text-base font-bold text-slate-900 block">92%+ CSAT</span>
                      <span className="text-[11px] text-slate-500">Target rep adoption</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Lost Receipts</span>
                      <span className="text-base font-bold text-slate-900 block">0% Losses</span>
                      <span className="text-[11px] text-slate-500">Instant digital backup</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRD - PRODUCT REQUIREMENTS DOCUMENT */}
            {activeDoc === 'prd' && (
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                      Product Architecture Baseline
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: PRD-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Product Requirements Document (PRD)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    Detailed product specification defining user experience flows, core functional modules, edge-handling rules, and strict scope boundaries.
                  </p>
                </div>

                {/* Section 1: User Journey Walkthrough */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>Core User Experience &amp; Journey Flow</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">1</span>
                        <span>Single-Tap Photo Capture</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Sales rep points camera at receipt; edge-detection automatically identifies document borders, rectifies perspective skew, and snaps image in &lt; 2 seconds.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px]">2</span>
                        <span>AI Extraction &amp; Pre-Fill</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        OCR extracts vendor name, currency, amount, tax, and date. Fields auto-populate on screen with confidence flags highlighting any ambiguous entries.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">3</span>
                        <span>Pre-Submission Policy Audit</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Automated checks verify expense limits and per-diem rules in real time. Rep receives immediate guidance before submission, avoiding later rejections.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">4</span>
                        <span>Manager Approval &amp; GL Sync</span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Manager reviews claim in 1-click mobile inbox. Approved claim triggers automated API posting into SAP Concur with digital receipts attached.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: In-Scope Deliverables vs Out-of-Scope Boundaries */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Product Scope Boundaries</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                      <span className="font-bold uppercase tracking-wider text-emerald-800 text-[11px] block">
                        Included in Scope
                      </span>
                      <ul className="space-y-1 text-slate-700 list-disc pl-4 leading-relaxed">
                        <li>Native iOS and Android field rep capture applications</li>
                        <li>Automated OCR receipt parser with edge rectification</li>
                        <li>Offline encrypted storage queue with background synchronization</li>
                        <li>Web-based manager approval queue with 48h SLA reminders</li>
                        <li>Export integration to enterprise accounting feeds</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="font-bold uppercase tracking-wider text-slate-600 text-[11px] block">
                        Strictly Out of Scope
                      </span>
                      <ul className="space-y-1 text-slate-600 list-disc pl-4 leading-relaxed">
                        <li>No replacement of corporate general ledger or payroll engines</li>
                        <li>No proprietary scanning hardware devices</li>
                        <li>No physical paper storage or warehouse logistics</li>
                        <li>No ingestion of non-corporate personal credit cards</li>
                        <li>No direct bank wire disbursement execution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SRS - SOFTWARE REQUIREMENTS SPECIFICATION */}
            {activeDoc === 'srs' && (
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Technical Engineering Specification
                    </span>
                    <span className="text-xs text-slate-400 font-mono">DOC-ID: SRS-EXP-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Software Requirements Specification (SRS)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    Engineering requirements governing software architecture, AI inference latency, cloud synchronization protocol, data encryption, and high-availability SLAs.
                  </p>
                </div>

                {/* Section 1: Architectural Components */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span>System Architecture Overview</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                    <p>
                      <strong>Client Layer:</strong> React Native mobile application supporting offline-first persistence using SQLCipher with AES-256 encrypted database encryption.
                    </p>
                    <p>
                      <strong>Inference Pipeline:</strong> Microservices-based OCR processing engine leveraging fine-tuned transformer models running on GPU clusters, delivering sub-2-second parse times.
                    </p>
                    <p>
                      <strong>Integration Gateway:</strong> RESTful API gateway authenticated via OAuth 2.0 / SAML SSO with corporate identity providers, routing validated payloads to SAP Concur webhooks.
                    </p>
                  </div>
                </div>

                {/* Section 2: Non-Functional Specifications Table */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span>Non-Functional &amp; Security Specifications</span>
                  </h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10.5px]">
                        <tr>
                          <th className="px-4 py-2.5 w-24">ID</th>
                          <th className="px-4 py-2.5">Domain</th>
                          <th className="px-4 py-2.5">Specification Standard</th>
                          <th className="px-4 py-2.5 w-24">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-001</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Data Encryption</td>
                          <td className="px-4 py-2.5 text-slate-600">AES-256 for all stored imagery; TLS 1.3 in transit with certificate pinning.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-002</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Package Size</td>
                          <td className="px-4 py-2.5 text-slate-600">Mobile app binary package footprint &lt; 45 MB on app stores.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-003</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Availability</td>
                          <td className="px-4 py-2.5 text-slate-600">99.95% cloud service availability with multi-region failover.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-mono font-bold text-slate-600">NFR-005</td>
                          <td className="px-4 py-2.5 font-bold text-slate-800">Regulatory</td>
                          <td className="px-4 py-2.5 text-slate-600">SOC 2 Type II, GDPR, and PCI-DSS compliance certification.</td>
                          <td className="px-4 py-2.5"><span className="text-emerald-700 font-bold">Verified</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: REQUIREMENT GATHERING LIFECYCLE FLOW MATRIX */}
            {activeDoc === 'lifecycle' && (
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      Requirement Gathering Full-Flow Lifecycle Matrix
                    </span>
                    <span className="text-xs text-slate-400 font-mono">FLOW-SPEC-2026-v1.0</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Requirement Gathering Lifecycle: Feature &amp; Sub-Feature Breakdown
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                    End-to-end operational framework establishing the exact Feature and Sub-feature breakdown across the entire Requirement Gathering lifecycle (Phases 1 through 10).
                  </p>
                </div>

                <div className="space-y-6">
                  {LIFECYCLE_PHASES.map((p, pIdx) => (
                    <div key={pIdx} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                          {p.phase}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                          {p.rows.length} Features
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10.5px]">
                            <tr>
                              <th className="px-4 py-2.5 w-1/4 min-w-[180px]">Feature</th>
                              <th className="px-4 py-2.5">Sub-features</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {p.rows.map((r, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                                <td className="px-4 py-2.5 font-bold text-slate-900 align-top">
                                  {r.feature}
                                </td>
                                <td className="px-4 py-2.5 text-slate-600 leading-relaxed">
                                  {r.sub}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage Gate Sign-Off & Governance Box (Full-Width Clean Presentation) */}
            <div className="pt-6 border-t border-slate-200">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Stage Gate Sign-Off
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      C-Suite Requirement Gathering Approval
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All Validations Complete</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  All required C-Suite validations across Business Alignment, Architecture Feasibility, and Strategic Fit have been verified against the confirmed baseline document set. Requirement Gathering is complete and ready for formal transition into Solution Planning.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">C-Suite Execs Validated</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Business Alignment Approved</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Strategic Fit Approved</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDEBAR: DOCUMENT SELECTOR */}
      {/* ========================================================================= */}
      <div className="w-[350px] lg:w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                Document Selector
              </h3>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              {DOC_TABS.length} Documents
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Select a document specification to view and review in the center workspace.
          </p>
        </div>

        {/* Document Selector List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
            Available Specifications
          </div>
          {DOC_TABS.map(doc => {
            const active = activeDoc === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActiveDoc(doc.id)}
                className={cx(
                  "w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5 group relative",
                  active
                    ? "bg-blue-50/30 border-blue-600 shadow-xs ring-1 ring-blue-600/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cx(
                      "px-2 py-0.5 rounded text-[11px] font-extrabold tracking-tight",
                      active
                        ? doc.id === 'brd' ? 'bg-blue-600 text-white' :
                          doc.id === 'prd' ? 'bg-purple-600 text-white' :
                          doc.id === 'srs' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                        : "bg-slate-100 text-slate-700"
                    )}>
                      {doc.code}
                    </span>
                    <span className={cx(
                      "text-xs font-bold truncate max-w-[170px]",
                      active ? "text-blue-900" : "text-slate-900 group-hover:text-slate-800"
                    )}>
                      {doc.title}
                    </span>
                  </div>

                  {active && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 ring-4 ring-blue-100 shrink-0" />
                  )}
                </div>

                <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-2">
                  {doc.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                  <span className={cx(
                    "px-1.5 py-0.5 rounded font-semibold",
                    active ? "bg-white text-slate-700 border border-slate-200" : "bg-slate-50 text-slate-500"
                  )}>
                    {doc.sectionsCount} {doc.id === 'lifecycle' ? 'Phases' : 'Sections'}
                  </span>
                  <span className={cx(
                    "font-semibold flex items-center gap-1",
                    active ? "text-blue-600 font-bold" : "text-slate-400 group-hover:text-slate-600"
                  )}>
                    <Eye className="w-3 h-3" />
                    {active ? 'Viewing in Center' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Summary & Governance */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70 shrink-0 space-y-2.5">
          <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white border border-slate-200">
            <span className="text-slate-600 font-medium">Document Baseline</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              v1.0 Ready
            </span>
          </div>
          <div className="text-[11px] text-slate-400 leading-relaxed">
            ✦ All specifications are cross-traceable to confirmed discovery requirements.
          </div>
        </div>
      </div>
    </div>

    {/* ========================================================================= */}
      {/* 5. BOTTOM STICKY ACTION BAR (Matching System Standard) */}
      {/* ========================================================================= */}
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document Set Validated</span>
            <span className="text-slate-400 font-normal">·</span>
            <span className="text-slate-600 font-medium">
              BRD, PRD, SRS &amp; RTM Baseline Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={confirm}
            className="px-6 py-2.5 text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Complete Requirement Gathering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
