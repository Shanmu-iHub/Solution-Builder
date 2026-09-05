import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Calendar, 
  Download, 
  ArrowRight,
  Code,
  ShieldCheck,
  Check
} from 'lucide-react';

export const SolutionFactorWorkspace: React.FC = () => {
  const [requirementText, setRequirementText] = useState(
    "We need a multi-tenant B2B enterprise billing and subscription platform capable of handling 50,000 requests/sec with automated PCI-DSS compliance, real-time Stripe webhooks reconciliation, and AI-driven churn forecasting."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [copied, setCopied] = useState(false);

  const samplePresets = [
    {
      title: 'B2B Multi-Tenant Billing Platform',
      text: 'We need a multi-tenant B2B enterprise billing and subscription platform capable of handling 50,000 requests/sec with automated PCI-DSS compliance, real-time Stripe webhooks reconciliation, and AI-driven churn forecasting.'
    },
    {
      title: 'AI Healthcare Triage & HIPAA Portal',
      text: 'Build an asynchronous telehealth consultations and prescription platform with end-to-end HIPAA compliance, automated EHR ingestion, and real-time AI doctor voice notes summarizer.'
    },
    {
      title: 'Real-time Autonomous Supply Chain Logistics',
      text: 'A high-throughput IoT fleet management dashboard tracking 10,000 shipping containers worldwide with predictive route optimization and temperature anomaly alerts.'
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'Solution Factor' }]} />

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Solution Factor</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                AI Requirements Decomposer
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Transform high-level product requirements and PRDs into technical architecture specs, risk matrices, technology selections, and sprint roadmaps.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(requirementText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
          <span>{copied ? 'Spec Exported!' : 'Export Spec (Markdown)'}</span>
        </button>
      </div>

      {/* Requirement Input Area */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            1. Enter Business Requirement / PRD
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#64748B]">Try sample:</span>
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setRequirementText(preset.text)}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
              >
                {preset.title.split(' ')[0]}...
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={3}
          value={requirementText}
          onChange={e => setRequirementText(e.target.value)}
          placeholder="Paste user stories, product requirements, or business goals..."
          className="w-full p-3.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-[#94A3B8]">
            AI engine decomposes PRD into architecture, tech stack, and sprint plan
          </span>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Decomposing PRD...' : 'Generate Technical Solution'}</span>
          </button>
        </div>
      </div>

      {/* Generated Solution Specification Grid */}
      {hasGenerated && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Col 1: Functional & Non-Functional Breakdown */}
          <div className="space-y-4">
            {/* Functional Specs */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Functional Requirements
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Multi-tenant tenant isolation with schema-per-tenant architecture.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Stripe webhook idempotency consumer with dead-letter queue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Automated tax calculation, invoice PDF generation, and dunning engine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Real-time churn risk classifier utilizing fine-tuned transformer weights.</span>
                </li>
              </ul>
            </div>

            {/* Non-Functional Specs */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Non-Functional SLA / Constraints
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Throughput</span>
                  <span className="font-bold text-[#0F172A]">50,000 req/s</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Latency SLA</span>
                  <span className="font-bold text-[#0F172A]">p99 &lt; 35ms</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Compliance</span>
                  <span className="font-bold text-[#0F172A]">PCI-DSS & SOC 2</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block">Target Uptime</span>
                  <span className="font-bold text-[#0F172A]">99.995% High Avail</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Recommended Tech Stack & Risk Matrix */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-purple-600" />
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Recommended Tech Stack
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Core Backend</span>
                  <span className="font-semibold text-[#0F172A]">Go 1.23 + Gin Engine</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Primary Database</span>
                  <span className="font-semibold text-[#0F172A]">PostgreSQL 16 + Citus</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Event Streaming</span>
                  <span className="font-semibold text-[#0F172A]">Apache Kafka Cluster</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B]">AI Model Router</span>
                  <span className="font-semibold text-[#0F172A]">Gemini 2.0 Flash + Claude</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Hosting / Infra</span>
                  <span className="font-semibold text-[#0F172A]">AWS EKS Multi-AZ</span>
                </div>
              </div>
            </div>

            {/* Risk & Mitigation Matrix */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Risks & Mitigations
                </h4>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                  <span className="font-bold text-amber-900 block">Webhook Congestion Risk</span>
                  <p className="text-amber-800 mt-0.5">Mitigate via Kafka partitioned consumer groups and exponential backoff.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200">
                  <span className="font-bold text-blue-900 block">Multi-tenant Data Leakage</span>
                  <p className="text-blue-800 mt-0.5">Mitigate with Row-Level Security (RLS) policies enforced at database level.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Sprint Roadmap & Estimation */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Implementation Roadmap
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="border-l-2 border-blue-600 pl-3">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Sprint 1-2 (Foundation)</span>
                  <h5 className="font-bold text-[#0F172A]">Data Modeling & Auth</h5>
                  <p className="text-[#64748B] text-[11px]">PostgreSQL schema, RLS policies, tenant onboarding API.</p>
                </div>

                <div className="border-l-2 border-indigo-600 pl-3">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">Sprint 3-4 (Core Engine)</span>
                  <h5 className="font-bold text-[#0F172A]">Stripe Gateway & Dunning</h5>
                  <p className="text-[#64748B] text-[11px]">Kafka consumer pipeline and dunning automated triggers.</p>
                </div>

                <div className="border-l-2 border-emerald-600 pl-3">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Sprint 5-6 (AI & Scale)</span>
                  <h5 className="font-bold text-[#0F172A]">Churn ML Model & Load Test</h5>
                  <p className="text-[#64748B] text-[11px]">50,000 req/s load test and telemetry hooks.</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold">
                <span className="text-[#64748B]">Total Est. Effort:</span>
                <span className="text-[#0F172A]">6 Sprints (12 Weeks) / 4 Engineers</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
