import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { modelsList } from '../../data/modelsData';
import { AIModel } from '../../types';
import { 
  Brain, 
  Search, 
  Sparkles, 
  Zap, 
  Code2, 
  Coins, 
  Sliders, 
  Play, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const AIModelsWorkspace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'hub' | 'playground' | 'compare'>('hub');
  
  // Playground state
  const [selectedModel, setSelectedModel] = useState<AIModel>(modelsList[0]);
  const [promptInput, setPromptInput] = useState('Explain how to implement zero-trust token authentication between microservices with code examples.');
  const [isInferencing, setIsInferencing] = useState(false);
  const [inferenceOutput, setInferenceOutput] = useState('');

  const categories = ['All', 'Multimodal', 'Reasoning', 'Vision', 'Audio', 'Video'];

  const filteredModels = modelsList.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleTestInference = () => {
    setIsInferencing(true);
    setInferenceOutput('');
    const fullText = `### Architecture Pattern: Zero-Trust Inter-Service Auth

To achieve cryptographic zero-trust between microservices without relying on IP perimeter security, use **mTLS (Mutual TLS) + Short-Lived Asymmetric JWTs (SPIFFE/SPIRE)**:

1. **Identity Assertion:** Each microservice receives an X.509 SVID (SPIFFE Verifiable Identity Document).
2. **mTLS Handshake:** Connections negotiate ephemeral TLS 1.3 with mutual cert verification.
3. **Authorization Token:** An audience-scoped JWT signed by the centralized Keycloak/OIDC provider is passed in the \`Authorization: Bearer <jwt>\` header.

\`\`\`go
// Sample Middleware in Go
func ZeroTrustAuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        tlsState := r.TLS
        if tlsState == nil || len(tlsState.PeerCertificates) == 0 {
            http.Error(w, "mTLS Peer Certificate Required", http.StatusUnauthorized)
            return
        }
        // Verify SPIFFE ID from SAN URI
        spiffeID := tlsState.PeerCertificates[0].URIs[0].String()
        if !strings.HasPrefix(spiffeID, "spiffe://snssquare.internal/ns/prod/") {
            http.Error(w, "Untrusted SPIFFE Domain", http.StatusForbidden)
            return
        }
        next.ServeHTTP(w, r)
    })
}
\`\`\`

**Benchmark Results:**
- **Input Tokens:** 28
- **Output Tokens:** 240
- **Total Latency:** 142ms
- **Model:** ${selectedModel.name}`;

    let i = 0;
    const interval = setInterval(() => {
      i += 15;
      if (i >= fullText.length) {
        setInferenceOutput(fullText);
        setIsInferencing(false);
        clearInterval(interval);
      } else {
        setInferenceOutput(fullText.slice(0, i));
      }
    }, 20);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Products' }, { label: 'AI Models' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">AI Foundation Model Gateway</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                Single Unified API
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Access 30+ leading AI foundation models from OpenAI, Google Cloud, Anthropic, DeepSeek, and Black Forest Labs with automated load balancing and semantic caching.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('playground')}
          className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Open Model Playground</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Frontier Models" value="38 Models" subtitle="Universal API integration" isPositive />
        <MetricCard label="Monthly Tokens" value="84.2M" subtitle="Tokens routed" change="+32% volume" isPositive />
        <MetricCard label="Semantic Cache" value="41.8% Hits" subtitle="Cost reduction" change="$3,200 saved" isPositive />
        <MetricCard label="Global Avg Latency" value="68 ms" subtitle="Smart fallback routing" isPositive />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab('hub')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'hub' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Model Marketplace</span>
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'playground' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Live Prompt Testbench</span>
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'compare' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Benchmark Comparison</span>
        </button>
      </div>

      {/* Tab: Model Marketplace Hub */}
      {activeTab === 'hub' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#07111F] text-white shadow-sm'
                      : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search models or providers..."
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[#0F172A] w-full sm:w-60"
              />
            </div>
          </div>

          {/* Grid of Models */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{model.provider}</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Score: {model.benchmarkScore}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] mb-1">{model.name}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4">{model.description}</p>

                  <div className="space-y-1.5 text-xs bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Context Window:</span>
                      <span className="font-semibold text-[#0F172A]">{model.contextWindow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Pricing:</span>
                      <span className="font-semibold text-emerald-600">{model.inputPricing}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedModel(model);
                    setActiveTab('playground');
                  }}
                  className="w-full py-2 bg-[#F8FAFC] hover:bg-[#2563EB] text-[#2563EB] hover:text-white border border-[#E2E8F0] hover:border-transparent rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Test in Playground</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Live Prompt Playground */}
      {activeTab === 'playground' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls & Prompt (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-[#0F172A]">Active Model:</span>
                  <select
                    value={selectedModel.id}
                    onChange={e => {
                      const m = modelsList.find(x => x.id === e.target.value);
                      if (m) setSelectedModel(m);
                    }}
                    className="text-xs font-semibold px-2 py-1 border border-[#CBD5E1] rounded-lg bg-white"
                  >
                    {modelsList.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleTestInference}
                  disabled={isInferencing}
                  className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isInferencing ? 'animate-spin' : ''}`} />
                  <span>{isInferencing ? 'Streaming...' : 'Generate Completion'}</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">User Prompt</label>
                <textarea
                  rows={4}
                  value={promptInput}
                  onChange={e => setPromptInput(e.target.value)}
                  className="w-full p-3 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Output Canvas */}
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Streaming Model Response</label>
                <div className="p-4 bg-[#07111F] text-slate-200 rounded-xl font-mono text-xs min-h-[200px] whitespace-pre-wrap leading-relaxed border border-[#1E293B]">
                  {inferenceOutput || <span className="text-slate-500">Click 'Generate Completion' to test the inference streaming pipe...</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Model Config Sidebar (Col 3) */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-4 text-xs">
            <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs">Model Configuration</h4>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#64748B]">Temperature:</span>
                <span className="font-bold text-[#0F172A]">0.2 (Deterministic)</span>
              </div>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.2" className="w-full accent-blue-600" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#64748B]">Max Output Tokens:</span>
                <span className="font-bold text-[#0F172A]">4,096</span>
              </div>
              <input type="range" min="512" max="8192" step="512" defaultValue="4096" className="w-full accent-blue-600" />
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
              <span className="font-bold text-[#0F172A] block">Model Metadata</span>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#64748B]">Provider:</span>
                <span className="font-semibold text-[#0F172A]">{selectedModel.provider}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#64748B]">Context Window:</span>
                <span className="font-semibold text-[#0F172A]">{selectedModel.contextWindow}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#64748B]">Input Pricing:</span>
                <span className="font-semibold text-emerald-600">{selectedModel.inputPricing}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Benchmark Comparison */}
      {activeTab === 'compare' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
          <h3 className="text-sm font-bold text-[#0F172A] mb-4">Enterprise Model Capability & Benchmark Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="p-3 font-bold text-[#475569]">Model Name</th>
                  <th className="p-3 font-bold text-[#475569]">Provider</th>
                  <th className="p-3 font-bold text-[#475569]">Category</th>
                  <th className="p-3 font-bold text-[#475569]">Benchmark Score</th>
                  <th className="p-3 font-bold text-[#475569]">Context Window</th>
                  <th className="p-3 font-bold text-[#475569]">Pricing (1M tokens)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {modelsList.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-[#0F172A]">{m.name}</td>
                    <td className="p-3 text-slate-600">{m.provider}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">{m.category}</span></td>
                    <td className="p-3 font-bold text-blue-600">{m.benchmarkScore} / 100</td>
                    <td className="p-3 text-slate-600 font-mono text-[11px]">{m.contextWindow}</td>
                    <td className="p-3 font-bold text-emerald-600">{m.inputPricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
