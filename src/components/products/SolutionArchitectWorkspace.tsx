import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Plus, 
  Server, 
  Database, 
  Shield, 
  Cpu, 
  Globe, 
  Zap, 
  Code2, 
  DollarSign, 
  Play, 
  Check, 
  Copy, 
  Trash2, 
  RefreshCw,
  ArrowLeft,
  Box
} from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  type: 'gateway' | 'compute' | 'database' | 'cache' | 'ai' | 'storage';
  provider: 'AWS' | 'Azure' | 'GCP';
  cost: number;
  x: number;
  y: number;
}

export const SolutionArchitectWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [nodes, setNodes] = useState<ArchNode[]>([
    { id: 'node-1', name: 'Kong API Gateway', type: 'gateway', provider: 'AWS', cost: 74, x: 50, y: 120 },
    { id: 'node-2', name: 'Order Microservice (EKS)', type: 'compute', provider: 'AWS', cost: 180, x: 260, y: 60 },
    { id: 'node-3', name: 'AI Reasoning Gateway', type: 'ai', provider: 'GCP', cost: 240, x: 260, y: 180 },
    { id: 'node-4', name: 'Amazon Aurora PostgreSQL', type: 'database', provider: 'AWS', cost: 310, x: 480, y: 60 },
    { id: 'node-5', name: 'Redis Cache Cluster', type: 'cache', provider: 'AWS', cost: 85, x: 480, y: 180 },
  ]);

  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(nodes[0]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationPassed, setValidationPassed] = useState(true);
  const [activeTab, setActiveTab] = useState<'canvas' | 'terraform' | 'cost'>('canvas');
  const [copiedCode, setCopiedCode] = useState(false);

  const totalCost = nodes.reduce((acc, node) => acc + node.cost, 0);

  const handleAddNode = (type: ArchNode['type'], name: string, cost: number, provider: 'AWS' | 'Azure' | 'GCP') => {
    const newNode: ArchNode = {
      id: `node-${Date.now()}`,
      name,
      type,
      provider,
      cost,
      x: 100 + Math.floor(Math.random() * 300),
      y: 60 + Math.floor(Math.random() * 180)
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const handleRemoveNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    }
  };

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationPassed(true);
    }, 800);
  };

  const terraformSnippet = `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# SNS Square Auto-Generated Architecture (${nodes.length} Components)
${nodes.map(n => `resource "${n.provider.toLowerCase()}_${n.type}" "${n.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}" {
  name        = "${n.name}"
  environment = "production"
  tags = {
    ManagedBy = "SNS-Square-Solution-Architect"
    EstCost   = "$${n.cost}/mo"
  }
}`).join('\n\n')}`;

  const copyTerraform = () => {
    navigator.clipboard.writeText(terraformSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getNodeIcon = (type: ArchNode['type']) => {
    switch (type) {
      case 'gateway': return <Globe className="w-4 h-4 text-blue-600" />;
      case 'compute': return <Server className="w-4 h-4 text-purple-600" />;
      case 'database': return <Database className="w-4 h-4 text-emerald-600" />;
      case 'cache': return <Zap className="w-4 h-4 text-amber-600" />;
      case 'ai': return <Cpu className="w-4 h-4 text-rose-600" />;
      default: return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const config = getOfferingConfig('solution-architect');

  if (viewMode === 'landing' && config) {
    return <ProductLandingLayout config={config} onOpenConsole={() => setViewMode('console')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Solution Architect Overview</span>
        </button>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('landing')}
            className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 transition-all font-medium cursor-pointer"
          >
            Product Overview
          </button>
          <button
            onClick={() => setViewMode('console')}
            className="px-3 py-1 rounded-lg bg-white text-blue-600 shadow-2xs font-semibold cursor-pointer"
          >
            Live Console
          </button>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'Build & Create' }, { label: 'Solution Architect' }]} />

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Solution Architect</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                Interactive Canvas
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Design scalable cloud architectures, wire multi-cloud components, estimate monthly infrastructure costs, and export production-ready Terraform code.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleValidate}
            disabled={isValidating}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className={`w-3.5 h-3.5 text-blue-600 ${isValidating ? 'animate-spin' : ''}`} />
            <span>{isValidating ? 'Validating...' : 'Validate Architecture'}</span>
          </button>

          <button
            onClick={() => setActiveTab('terraform')}
            className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Nodes" value={`${nodes.length} Components`} subtitle="Multi-cloud topology" isPositive />
        <MetricCard label="Est. Cloud Spend" value={`$${totalCost}/mo`} subtitle="AWS + GCP Blended" change="-12% optimized" isPositive />
        <MetricCard label="AI Architecture Score" value="98.5 / 100" subtitle="Well-Architected Framework" change="High Reliability" isPositive />
        <MetricCard label="Security Compliance" value="Zero Risks" subtitle="TLS 1.3 & VPC isolation" isPositive />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab('canvas')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'canvas' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Interactive Canvas</span>
        </button>
        <button
          onClick={() => setActiveTab('terraform')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'terraform' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Terraform / IaC Preview</span>
        </button>
        <button
          onClick={() => setActiveTab('cost')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'cost' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Cost Breakdown</span>
        </button>
      </div>

      {/* Canvas View */}
      {activeTab === 'canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Visual Canvas (Cols 1-3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle flex flex-col overflow-hidden">
            {/* Canvas Toolbar */}
            <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#0F172A] mr-2">Add Component:</span>
                <button
                  onClick={() => handleAddNode('compute', 'Worker Node (Lambda)', 35, 'AWS')}
                  className="px-2 py-1 bg-white border border-[#E2E8F0] hover:bg-slate-100 rounded text-[11px] font-medium text-[#0F172A] flex items-center gap-1"
                >
                  <Server className="w-3 h-3 text-purple-600" /> Lambda
                </button>
                <button
                  onClick={() => handleAddNode('database', 'Vector DB (Pinecone)', 110, 'GCP')}
                  className="px-2 py-1 bg-white border border-[#E2E8F0] hover:bg-slate-100 rounded text-[11px] font-medium text-[#0F172A] flex items-center gap-1"
                >
                  <Database className="w-3 h-3 text-emerald-600" /> Vector DB
                </button>
                <button
                  onClick={() => handleAddNode('ai', 'Claude 3.5 Sonnet Endpoint', 190, 'AWS')}
                  className="px-2 py-1 bg-white border border-[#E2E8F0] hover:bg-slate-100 rounded text-[11px] font-medium text-[#0F172A] flex items-center gap-1"
                >
                  <Cpu className="w-3 h-3 text-rose-600" /> LLM Node
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#64748B]">Auto-layout wired</span>
              </div>
            </div>

            {/* Canvas Area with Blueprint Grid */}
            <div 
              className="relative h-[420px] bg-[#F8FAFC] p-6 overflow-hidden select-none"
              style={{
                backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              {/* SVG Connecting Wires */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M120 140 C180 140, 200 80, 260 80" stroke="#94A3B8" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M120 140 C180 140, 200 200, 260 200" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M380 80 C420 80, 440 80, 480 80" stroke="#3B82F6" strokeWidth="2" fill="none" />
                <path d="M380 200 C420 200, 440 200, 480 200" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </svg>

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    className={`absolute p-3 rounded-xl bg-white border cursor-pointer transition-all shadow-subtle flex items-center gap-3 w-52 ${
                      isSelected 
                        ? 'border-[#2563EB] ring-2 ring-blue-500/20 shadow-md scale-102 z-20' 
                        : 'border-[#CBD5E1] hover:border-[#94A3B8] z-10'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shrink-0">
                      {getNodeIcon(node.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{node.provider}</span>
                        <span className="text-[10px] font-bold text-emerald-600">${node.cost}/m</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#0F172A] truncate mt-0.5">{node.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Properties & AI Validation Inspector (Col 4) */}
          <div className="space-y-4">
            {/* Selected Node Properties */}
            {selectedNode ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Node Inspector</h4>
                  <button
                    onClick={() => handleRemoveNode(selectedNode.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete Node"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-[#64748B] block mb-1">Component Name</label>
                    <input
                      type="text"
                      value={selectedNode.name}
                      onChange={e => {
                        const val = e.target.value;
                        setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, name: val } : n));
                        setSelectedNode({ ...selectedNode, name: val });
                      }}
                      className="w-full px-2.5 py-1.5 border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-[#64748B] block mb-1">Provider</label>
                      <span className="px-2 py-1 bg-[#F8FAFC] border rounded text-xs font-semibold block text-[#0F172A]">
                        {selectedNode.provider}
                      </span>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#64748B] block mb-1">Monthly Cost</label>
                      <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded text-xs font-bold text-emerald-700 block">
                        ${selectedNode.cost} / mo
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#64748B] block mb-1">Security Isolation</label>
                    <span className="text-[11px] text-[#475569] flex items-center gap-1.5 font-medium">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      Encrypted VPC Subnet (Zone A)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-[#CBD5E1] p-5 text-center text-xs text-[#64748B]">
                Click on any node in the canvas to inspect properties.
              </div>
            )}

            {/* AI Architecture Guardrails */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-[#0F172A]">AI Reliability Audit</h4>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed mb-3">
                Current architecture meets AWS Well-Architected Framework standards with multi-AZ failover and automated rate limiting on API gateway.
              </p>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  <span>✔ High Availability</span>
                  <span className="font-semibold">99.99%</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  <span>✔ Zero Cold Starts</span>
                  <span className="font-semibold">Provisioned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terraform IaC View */}
      {activeTab === 'terraform' && (
        <div className="bg-[#07111F] rounded-2xl border border-[#1E293B] overflow-hidden text-slate-200">
          <div className="px-5 py-3 border-b border-[#1E293B] bg-[#0B1625] flex items-center justify-between">
            <span className="text-xs font-mono text-blue-400">main.tf — Production Blueprint</span>
            <button
              onClick={copyTerraform}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-5 font-mono text-xs overflow-x-auto leading-relaxed text-slate-300">
            {terraformSnippet}
          </pre>
        </div>
      )}

      {/* Cost Breakdown Table */}
      {activeTab === 'cost' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-sm font-bold text-[#0F172A] mb-3">Unit Economics & Component Pricing</h3>
          <div className="divide-y divide-[#F1F5F9]">
            {nodes.map(n => (
              <div key={n.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {getNodeIcon(n.type)}
                  <span className="font-semibold text-[#0F172A]">{n.name}</span>
                  <span className="text-[10px] text-slate-400 border px-1 rounded">{n.provider}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700">${n.cost}.00</span>
                  <span className="text-slate-400 text-[10px] block">monthly recurring</span>
                </div>
              </div>
            ))}
            <div className="pt-3 flex items-center justify-between font-bold text-sm text-[#0F172A]">
              <span>Estimated Total Run Cost:</span>
              <span className="text-emerald-600">${totalCost}.00 / month</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
