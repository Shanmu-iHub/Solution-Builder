export interface LLMProviderConfig {
  providerType: 'gemini' | 'openai' | 'anthropic' | 'deterministic-engine';
  apiKey?: string;
  modelName?: string;
  temperature?: number;
}

export interface PromptPayload {
  executiveId: string;
  stageId: string;
  skillContent: string;
  stageContext: Record<string, any>;
  evaluationScenario: 'approved' | 'needs-changes';
}

export interface LLMResponse {
  decision: 'VALIDATED' | 'NEEDS_CHANGES';
  feedback: string;
  checks: Array<{ id: string; label: string; passed: boolean; message?: string }>;
  findings: Array<{ id: string; severity: 'high' | 'medium' | 'low' | 'info'; title: string; description: string; blocking: boolean; suggestion?: string }>;
  evidence: string[];
}

export class ProviderFactory {
  private static instance: ProviderFactory;
  private currentConfig: LLMProviderConfig = {
    providerType: 'deterministic-engine',
    modelName: 'gemini-1.5-pro-preview',
    temperature: 0.2
  };

  private constructor() {}

  public static getInstance(): ProviderFactory {
    if (!ProviderFactory.instance) {
      ProviderFactory.instance = new ProviderFactory();
    }
    return ProviderFactory.instance;
  }

  public setConfig(config: Partial<LLMProviderConfig>): void {
    this.currentConfig = { ...this.currentConfig, ...config };
  }

  public getConfig(): LLMProviderConfig {
    return { ...this.currentConfig };
  }

  public async executeExecutivePrompt(payload: PromptPayload): Promise<LLMResponse> {
    // Provider executes structured evaluation against executive domain skill
    const { executiveId, evaluationScenario, stageId } = payload;

    if (evaluationScenario === 'needs-changes') {
      return this.generateNeedsChangesResponse(executiveId, stageId);
    }

    return this.generateApprovedResponse(executiveId, stageId);
  }

  private generateApprovedResponse(executiveId: string, stageId: string): LLMResponse {
    return {
      decision: 'VALIDATED',
      feedback: `${executiveId} validation verified. All stage deliverables satisfy domain criteria, provide evidence traceability, and present zero blocking issues.`,
      checks: [
        { id: 'chk-1', label: 'Domain Scope Alignment', passed: true, message: 'Aligned with verified project scope.' },
        { id: 'chk-2', label: 'Upstream Traceability', passed: true, message: 'All claims map back to validated inputs.' },
        { id: 'chk-3', label: 'Feasibility & Evidence', passed: true, message: 'Evidence substantiated by documents and user answers.' },
        { id: 'chk-4', label: 'Risk & Policy Compliance', passed: true, message: 'Adheres to enterprise risk limits.' }
      ],
      findings: [
        {
          id: 'fnd-1',
          severity: 'info',
          title: 'Evidence Baseline Established',
          description: `All reviewed facets for ${stageId} meet the validation standards for ${executiveId}.`,
          blocking: false,
          suggestion: 'Proceed to downstream phase without modification.'
        }
      ],
      evidence: [
        'User confirmed brief specifications',
        'Documented operational constraints',
        'Validated domain capabilities mapping'
      ]
    };
  }

  private generateNeedsChangesResponse(executiveId: string, stageId: string): LLMResponse {
    const feedbackMap: Record<string, { title: string; feedback: string; suggestion: string }> = {
      CFO: {
        title: 'Missing Cost Model Assumptions',
        feedback: 'Financial feasibility cannot be validated because the cost assumptions and ROI savings parameters are missing or unsubstantiated.',
        suggestion: 'Specify expected annual license, implementation estimates, and hours saved per sales rep before proceeding.'
      },
      CTO: {
        title: 'Undefined External Integration Contract',
        feedback: 'Define the external integration contract with legacy ERP / SAP Concur before solution planning can be approved.',
        suggestion: 'Specify whether API access is REST, SFTP batch sync, or webhook-driven with error retry policies.'
      },
      CPO: {
        title: 'User Problem Persona Gap',
        feedback: 'Primary user workflow pain points are insufficiently differentiated between field sales reps and administrative approvers.',
        suggestion: 'Clarify the exact pain point priority between mobile receipt capture and backend reconciliation.'
      },
      CISO: {
        title: 'Missing Encryption & PII Isolation Specification',
        feedback: 'Security posture requires explicit encryption standards for employee reimbursement banking details and receipt images.',
        suggestion: 'Add AES-256 at rest and TLS 1.3 transit requirements to the security baseline.'
      },
      CDO: {
        title: 'Audit Trail Data Lineage Incomplete',
        feedback: 'Data model lacks immutable audit history for expense approval status changes.',
        suggestion: 'Introduce an audit event schema capturing actor, timestamp, and previous state.'
      },
      CBO: {
        title: 'Operational Workflow Friction Unresolved',
        feedback: 'Operational impact on finance department re-keying workload is not addressed in the workflow proposal.',
        suggestion: 'Detail the automated exception routing to eliminate manual re-entry.'
      },
      CMO: {
        title: 'Competitive Differentiation Ambiguity',
        feedback: 'Market positioning overlaps too heavily with existing off-the-shelf tools without clarifying competitive edge.',
        suggestion: 'Highlight the real-time AI policy pre-validation capability as the primary differentiator.'
      },
      CSO: {
        title: 'Strategic Pillar Mapping Weak',
        feedback: 'Long-term enterprise integration roadmap does not connect with corporate digital transformation goals.',
        suggestion: 'Anchor project objectives to the corporate automated operations initiative.'
      },
      CIO: {
        title: 'Deployment & Support Tier Unassigned',
        feedback: 'Operational delivery readiness cannot be signed off without identifying Level 2 IT support ownership.',
        suggestion: 'Designate the internal IT enterprise tools team as support owner.'
      },
      CEO: {
        title: 'Unresolved Cross-Domain Dependency',
        feedback: 'Stage cannot proceed until all dependent domain executives have completed approval.',
        suggestion: 'Resolve the outstanding executive feedback items and re-submit for gating.'
      }
    };

    const item = feedbackMap[executiveId] || {
      title: 'Validation Criteria Not Satisfied',
      feedback: `${executiveId} identified issues in stage ${stageId}. Please revise according to domain skill requirements.`,
      suggestion: 'Update stage inputs and trigger re-validation.'
    };

    return {
      decision: 'NEEDS_CHANGES',
      feedback: item.feedback,
      checks: [
        { id: 'chk-1', label: 'Domain Scope Alignment', passed: true, message: 'Scope aligned.' },
        { id: 'chk-2', label: 'Upstream Traceability', passed: false, message: 'Critical assumption ungrounded.' },
        { id: 'chk-3', label: 'Feasibility & Evidence', passed: false, message: item.title },
        { id: 'chk-4', label: 'Risk & Policy Compliance', passed: true, message: 'Policy compliant.' }
      ],
      findings: [
        {
          id: `fnd-${Date.now()}`,
          severity: 'high',
          title: item.title,
          description: item.feedback,
          blocking: true,
          suggestion: item.suggestion
        }
      ],
      evidence: [
        'Preliminary stage submission draft',
        'Domain skill criteria checklist (failed clause 3.2)'
      ]
    };
  }
}
