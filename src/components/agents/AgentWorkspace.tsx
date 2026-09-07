import React, { useState } from 'react';
import { AgentId } from '../../types';
import { agentsList } from '../../data/agentsData';
import { Breadcrumb } from '../common/Breadcrumb';
import { IconRenderer } from '../common/IconRenderer';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Bot, 
  Play, 
  Sparkles, 
  Settings, 
  Clock, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Share2,
  RefreshCw,
  PhoneCall,
  FileText,
  Search,
  Languages,
  CheckSquare,
  Layout,
  ArrowLeft
} from 'lucide-react';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';

interface AgentWorkspaceProps {
  agentId: AgentId;
}

export const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({ agentId }) => {
  const [viewMode, setViewMode] = useState<'overview' | 'console'>('overview');
  const agent = agentsList.find(a => a.id === agentId) || agentsList[0];
  const landingConfig = getOfferingConfig(agentId);

  // Agent-specific default inputs
  const defaultInputs: Record<AgentId, { inputLabel: string; defaultValue: string; placeholder: string }> = {
    'meeting-notes': {
      inputLabel: 'Meeting Recording or Live Call Link (Zoom / Meet / Teams)',
      defaultValue: 'https://meet.google.com/qwe-rtui-opk - Architecture sync on Q3 Cloud Migration',
      placeholder: 'Paste Google Meet / Zoom link or upload audio recording...'
    },
    'deep-research': {
      inputLabel: 'Research Topic or Hypothesis',
      defaultValue: 'State of Multi-Modal Foundation Models and Enterprise Autonomous Agents in 2026',
      placeholder: 'Enter research question, technology area, or competitive analysis...'
    },
    'fact-check': {
      inputLabel: 'Claim or Statement to Verify',
      defaultValue: 'Cloud provider egress fees dropped by 80% across AWS and Google Cloud due to 2026 data portability acts.',
      placeholder: 'Paste claim, news excerpt, or statistical figure...'
    },
    'call-for-me': {
      inputLabel: 'Call Objective & Target Phone Number',
      defaultValue: 'Call +1 (555) 839-2041 to verify availability of SOC 2 compliance auditor for next month.',
      placeholder: 'Enter phone number and specific objective for the voice agent...'
    },
    'translation': {
      inputLabel: 'Source Text & Target Languages',
      defaultValue: 'All cloud microservices must adhere to the zero-trust mutual TLS protocol.\n\nTarget languages: Spanish, German, Japanese.',
      placeholder: 'Enter source text and desired target languages...'
    },
    'download-for-me': {
      inputLabel: 'Resource Download Target URL or Query',
      defaultValue: 'https://dataset.enterprise-benchmark.org/v2/financial-models-2026.parquet',
      placeholder: 'Enter public URLs or structured web data source to scrape and download...'
    }
  };

  const currentDefaults = defaultInputs[agent.id] || defaultInputs['meeting-notes'];

  const [inputVal, setInputVal] = useState(currentDefaults.defaultValue);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'Agent initialized: Model Gemini 2.0 Flash + Claude 3.5 Sonnet',
    'Loaded enterprise memory & workspace context',
    'Waiting for user input prompt...'
  ]);

  const [outputResult, setOutputResult] = useState<string>(
    agent.id === 'meeting-notes' ? 
`### 📋 Executive Summary
**Meeting Topic:** Architecture Sync & Q3 Cloud Migration
**Participants:** Sanmugavel S (Lead), Elena Rostova (SecOps), Michael K (DevOps)
**Duration:** 34 mins • Status: Completed

#### 🔑 Key Decisions Made
1. Adopt **Blue/Green canary rollouts** on AWS EKS to prevent downtime during database schema transitions.
2. Centralize FinOps budget controls with automated S3 lifecycle rules to save an estimated $6,420/mo.
3. Lock in SOC 2 Type II audit window for November 2026.

#### ✅ Action Items Table
| Assignee | Action Item | Due Date | Priority |
| :--- | :--- | :--- | :--- |
| **Sanmugavel S** | Deploy Terraform IaC for Kafka dead-letter queues | Sep 12 | High |
| **Elena Rostova** | Complete IAM privilege review & export SOC 2 report | Sep 15 | Critical |
| **Michael K** | Configure k6 load test for 50,000 req/s | Sep 18 | Medium |` :
agent.id === 'call-for-me' ?
`### 📞 Call Execution Transcript & CRM Summary
**Contact:** Auditor Dispatch Desk (+1 555-839-2041)
**Call Duration:** 2m 14s • Status: Objective Completed
**Sentiment:** Highly Receptive (Score: 9.6/10)

#### 📝 Call Summary & Findings
- Spoke with Sarah at Compliance Assurance Partners.
- Confirmed availability for SOC 2 Type II initial readiness review starting October 14, 2026.
- Formal proposal packet dispatched to compliance@snssquare.com.
- Logged call recording & summary directly to Salesforce Opportunity #OPP-8921.` :
agent.id === 'translation' ?
`### 🌐 Neural Localization Output
**Source Language:** English (Detected 100%)
**Target Languages:** Spanish, German, Japanese
**Layout Fidelity:** 100% Preserved

#### 🇪🇸 Spanish (Castilian)
Todos los microservicios en la nube deben adherirse al protocolo de TLS mutuo de confianza cero.

#### 🇩🇪 German (Standard)
Alle Cloud-Mikrodienste müssen das Zero-Trust-Mutual-TLS-Protokoll einhalten.

#### 🇯🇵 Japanese (Formal Business)
すべてのクラウドマイクロサービスは、ゼロトラスト相互TLSプロトコルに準拠する必要があります。` :
`### 🔬 Autonomous Synthesis Report
**Agent:** ${agent.name}
**Confidence Score:** 99.4% • Execution Time: 1.2s

#### 💡 Structured Findings
- **Data Provenance:** Cross-referenced against 18 primary datasets, technical RFCs, and regulatory filings.
- **Verification Status:** Factual claims validated with zero hallucinations or contradictory evidence.
- **Next Steps:** Export available in Markdown, PDF, and automated webhook payload.`
  );

  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setExecutionLogs([
      `[00:00] Starting ${agent.name} autonomous runner...`,
      `[00:01] Parsing input parameters and decomposing sub-tasks...`,
      `[00:02] Querying knowledge base and executing live tools...`,
      `[00:03] Synthesizing output with high-confidence reasoning...`,
      `[00:04] Task completed successfully. 0 errors.`
    ]);

    setTimeout(() => {
      setIsRunning(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If we have landing config and mode is overview, render standardized landing page
  const currentViewMode: string = viewMode;
  if (landingConfig && viewMode === 'overview') {
    return (
      <div className="space-y-4">
        <ProductLandingLayout
          config={landingConfig}
          onOpenConsole={() => setViewMode('console')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">


      <Breadcrumb items={[{ label: 'Agents' }, { label: agent.name }]} />

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <IconRenderer name={agent.icon} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">{agent.name}</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {agent.badge || 'Ready'}
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">{agent.longDesc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Agent Executing...' : 'Execute Agent'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Col 1): Agent Input & Configuration */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              1. Task Input & Parameters
            </h3>

            <div>
              <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                {currentDefaults.inputLabel}
              </label>
              <textarea
                rows={4}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder={currentDefaults.placeholder}
                className="w-full p-3 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB] text-[#0F172A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#64748B] block mb-1">Inference Engine</label>
              <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white font-medium text-[#0F172A]">
                <option>Auto-Router (Gemini 2.0 + Claude 3.5)</option>
                <option>Claude 3.5 Sonnet (Deep Reasoning)</option>
                <option>GPT-4o Enterprise</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#64748B] block mb-1">Output Delivery Destination</label>
              <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white font-medium text-[#0F172A]">
                <option>Workspace Screen & Markdown Download</option>
                <option>Direct Sync to Jira / Linear / Slack</option>
                <option>S3 Bucket & Webhook Dispatch</option>
              </select>
            </div>
          </div>

          {/* Capabilities Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Agent Tooling & Capabilities
            </h4>
            <div className="space-y-2 text-xs">
              {agent.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[#475569]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Cols 2-3): Live Execution Console & Output Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Live Execution Logs */}
          <div className="bg-[#07111F] rounded-2xl border border-[#1E293B] p-4 font-mono text-xs text-slate-200 shadow-subtle">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1E293B] text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-slate-200">Execution Telemetry Stream</span>
              </div>
              <span className="text-emerald-400">● {isRunning ? 'EXECUTING' : 'READY'}</span>
            </div>
            <div className="space-y-1 text-slate-300 max-h-32 overflow-y-auto">
              {executionLogs.map((log, i) => (
                <div key={i} className="leading-snug">{log}</div>
              ))}
            </div>
          </div>

          {/* Output Results Canvas */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-4">
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Agent Output Artifact
                  </h3>
                  <span className="text-[11px] text-[#64748B]">Structured & Verified Result</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100 rounded-lg text-xs font-semibold text-[#0F172A] flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                  </button>
                  <button
                    onClick={() => alert('Downloaded agent output document.')}
                    className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* Formatted output content */}
              <div className="prose prose-sm max-w-none text-xs text-[#0F172A] leading-relaxed whitespace-pre-wrap font-sans">
                {outputResult}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
              <span>Run ID: <code className="font-mono text-slate-800">agt_9841_exec</code></span>
              <span>Latency: 1.2s • 480 Tokens Used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
