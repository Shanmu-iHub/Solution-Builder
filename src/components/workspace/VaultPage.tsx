import React, { useState } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  KeyRound,
  Lock,
  Unlock,
  ShieldCheck,
  Server,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  AlertTriangle,
  Clock,
  Activity,
  Zap,
  Globe,
  ChevronDown,
  Tag,
  GitBranch,
  CloudLightning,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scope: string;
  environment: 'Production' | 'Staging' | 'Development';
  created: string;
  lastUsed: string;
  status: 'Active' | 'Revoked';
  requests: number;
}

interface Secret {
  id: string;
  key: string;
  value: string;
  category: string;
  environment: 'Production' | 'Staging' | 'Development' | 'All';
  lastUpdated: string;
  visible: boolean;
}

interface Integration {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'Connected' | 'Disconnected' | 'Error';
  lastSync: string;
}

/* ─────────────────────────────────────────
   Mock Data
───────────────────────────────────────── */
const initialKeys: ApiKey[] = [
  { id: 'k1', name: 'Production Backend Gateway', prefix: 'sns_live_9481...', scope: 'Full Access', environment: 'Production', created: 'Aug 14, 2026', lastUsed: '2 min ago', status: 'Active', requests: 182_403 },
  { id: 'k2', name: 'CI/CD GitHub Actions Runner', prefix: 'sns_live_3821...', scope: 'Read Only', environment: 'Staging', created: 'Sep 01, 2026', lastUsed: '1 hr ago', status: 'Active', requests: 47_210 },
  { id: 'k3', name: 'Telemetry Ingest Worker', prefix: 'sns_live_7712...', scope: 'Telemetry Only', environment: 'Production', created: 'Jul 28, 2026', lastUsed: '5 min ago', status: 'Active', requests: 901_022 },
  { id: 'k4', name: 'Local Dev Playground', prefix: 'sns_test_0023...', scope: 'AI Models Only', environment: 'Development', created: 'Sep 05, 2026', lastUsed: '3 days ago', status: 'Active', requests: 1_209 },
];

const initialSecrets: Secret[] = [
  { id: 's1', key: 'DATABASE_URL', value: 'postgresql://admin:***@prod-db.snssquare.com:5432/sns_prod', category: 'Database', environment: 'Production', lastUpdated: 'Sep 06, 2026', visible: false },
  { id: 's2', key: 'OPENAI_API_KEY', value: 'sk-proj-********************', category: 'AI / LLM', environment: 'All', lastUpdated: 'Sep 04, 2026', visible: false },
  { id: 's3', key: 'AWS_ACCESS_KEY_ID', value: 'AKIA******************', category: 'Cloud', environment: 'Production', lastUpdated: 'Aug 30, 2026', visible: false },
  { id: 's4', key: 'STRIPE_SECRET_KEY', value: 'sk_live_***********************', category: 'Payments', environment: 'Production', lastUpdated: 'Aug 20, 2026', visible: false },
  { id: 's5', key: 'REDIS_URL', value: 'redis://:password@prod-redis.snssquare.com:6379', category: 'Cache', environment: 'Staging', lastUpdated: 'Sep 01, 2026', visible: false },
  { id: 's6', key: 'SLACK_WEBHOOK_URL', value: 'https://hooks.slack.com/services/T00/B00/***', category: 'Notifications', environment: 'All', lastUpdated: 'Sep 03, 2026', visible: false },
];

const initialIntegrations: Integration[] = [
  { id: 'i1', name: 'Amazon Web Services (AWS)', category: 'Cloud Infrastructure', icon: '☁️', status: 'Connected', lastSync: '2 min ago' },
  { id: 'i2', name: 'GitHub Enterprise', category: 'Source Control & CI/CD', icon: '🐙', status: 'Connected', lastSync: '5 min ago' },
  { id: 'i3', name: 'Slack Enterprise Grid', category: 'Team Notifications', icon: '💬', status: 'Connected', lastSync: '1 hr ago' },
  { id: 'i4', name: 'Datadog SIEM', category: 'Observability & Logs', icon: '📊', status: 'Connected', lastSync: '10 min ago' },
  { id: 'i5', name: 'Stripe Payments', category: 'Billing & Webhooks', icon: '💳', status: 'Connected', lastSync: '30 min ago' },
  { id: 'i6', name: 'Jira Cloud', category: 'Issue Tracking', icon: '🎯', status: 'Error', lastSync: '2 hr ago' },
  { id: 'i7', name: 'Google Cloud Platform', category: 'Cloud Infrastructure', icon: '🌐', status: 'Disconnected', lastSync: 'Never' },
  { id: 'i8', name: 'Vercel Edge', category: 'Deployment', icon: '▲', status: 'Connected', lastSync: '1 min ago' },
];

/* ─────────────────────────────────────────
   Env Badge
───────────────────────────────────────── */
const EnvBadge: React.FC<{ env: string }> = ({ env }) => {
  const styles: Record<string, string> = {
    Production: 'bg-rose-50 text-rose-700 border-rose-200',
    Staging: 'bg-amber-50 text-amber-700 border-amber-200',
    Development: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    All: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${styles[env] ?? 'bg-slate-100 text-slate-600'}`}>
      {env}
    </span>
  );
};

/* ─────────────────────────────────────────
   Integration Status Badge
───────────────────────────────────────── */
const IntegrationStatus: React.FC<{ status: Integration['status'] }> = ({ status }) => {
  const cfg = {
    Connected: { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Disconnected: { cls: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400' },
    Error: { cls: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500 animate-pulse' },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-semibold ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
type TabId = 'api-keys' | 'secrets' | 'integrations';

export const VaultPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('api-keys');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialKeys);
  const [secrets, setSecrets] = useState<Secret[]>(initialSecrets);
  const [integrations] = useState<Integration[]>(initialIntegrations);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // API Key Modal
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyScope, setNewKeyScope] = useState('Full Access (All Products, Services & Agents)');
  const [newKeyEnv, setNewKeyEnv] = useState<'Production' | 'Staging' | 'Development'>('Production');

  // Secret Modal
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [newSecretKey, setNewSecretKey] = useState('');
  const [newSecretValue, setNewSecretValue] = useState('');
  const [newSecretCategory, setNewSecretCategory] = useState('Database');
  const [newSecretEnv, setNewSecretEnv] = useState<Secret['environment']>('Production');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey: ApiKey = {
      id: `k-${Date.now()}`,
      name: newKeyName,
      prefix: `sns_live_${Math.random().toString(36).substring(2, 8)}...`,
      scope: newKeyScope.split('(')[0].trim(),
      environment: newKeyEnv,
      created: 'Just now',
      lastUsed: 'Never',
      status: 'Active',
      requests: 0,
    };
    setApiKeys([newKey, ...apiKeys]);
    setIsKeyModalOpen(false);
    setNewKeyName('');
  };

  const handleCreateSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecretKey.trim() || !newSecretValue.trim()) return;
    const s: Secret = {
      id: `s-${Date.now()}`,
      key: newSecretKey.toUpperCase().replace(/\s+/g, '_'),
      value: newSecretValue,
      category: newSecretCategory,
      environment: newSecretEnv,
      lastUpdated: 'Just now',
      visible: false,
    };
    setSecrets([s, ...secrets]);
    setIsSecretModalOpen(false);
    setNewSecretKey('');
    setNewSecretValue('');
  };

  const toggleSecretVisibility = (id: string) => {
    setSecrets(secrets.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'api-keys', label: 'API Keys', icon: <KeyRound className="w-4 h-4" />, count: apiKeys.filter(k => k.status === 'Active').length },
    { id: 'secrets', label: 'Secrets & Env Vars', icon: <Lock className="w-4 h-4" />, count: secrets.length },
    { id: 'integrations', label: 'Integrations', icon: <Globe className="w-4 h-4" />, count: integrations.filter(i => i.status === 'Connected').length },
  ];

  const filteredKeys = apiKeys.filter(k =>
    k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.scope.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSecrets = secrets.filter(s =>
    s.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIntegrations = integrations.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRequests = apiKeys.reduce((sum, k) => sum + k.requests, 0);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Hero Banner ─────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-subtle bg-white">
        {/* Decorative gradient blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-blue-100/60 to-indigo-200/40 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-violet-100/40 to-blue-100/30 blur-2xl" />
        </div>

        <div className="relative p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#6366F1] flex items-center justify-center shadow-md flex-shrink-0">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">Secure Storage</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-600">Vault Active</span>
              </div>
              <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Vault</h1>
              <p className="text-xs text-[#64748B] mt-0.5 max-w-lg">
                Centralized management for API tokens, encrypted secrets, environment variables, and third-party integrations.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { label: 'Active Keys', value: apiKeys.filter(k => k.status === 'Active').length, icon: <KeyRound className="w-3.5 h-3.5" />, color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { label: 'Secrets', value: secrets.length, icon: <Lock className="w-3.5 h-3.5" />, color: 'text-violet-600 bg-violet-50 border-violet-200' },
              { label: 'Connected', value: integrations.filter(i => i.status === 'Connected').length, icon: <Zap className="w-3.5 h-3.5" />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { label: 'API Requests', value: `${(totalRequests / 1000).toFixed(0)}k`, icon: <Activity className="w-3.5 h-3.5" />, color: 'text-rose-600 bg-rose-50 border-rose-200' },
            ].map(stat => (
              <div key={stat.label} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold ${stat.color}`}>
                {stat.icon}
                <span className="font-bold text-sm">{stat.value}</span>
                <span className="text-[10px] opacity-80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Security Alert Bar ───────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
        <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Zero-Trust Encryption Active</strong> — All secrets are AES-256 encrypted at rest and TLS 1.3 in transit.
          API tokens rotate automatically every 90 days.
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
          <Clock className="w-3.5 h-3.5" />
          Next rotation: 42 days
        </span>
      </div>

      {/* ── Tab Bar + Search + Actions ───────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#0F172A] shadow-sm border border-slate-200/80'
                  : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'api-keys' ? 'keys' : activeTab === 'secrets' ? 'secrets' : 'integrations'}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-52"
            />
          </div>
          {activeTab === 'api-keys' && (
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Generate Key
            </button>
          )}
          {activeTab === 'secrets' && (
            <button
              onClick={() => setIsSecretModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Secret
            </button>
          )}
        </div>
      </div>

      {/* ── API KEYS TAB ──────────────────────────────── */}
      {activeTab === 'api-keys' && (
        <div className="space-y-3">
          {filteredKeys.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">No API keys found.</div>
          )}
          {filteredKeys.map(key => (
            <div
              key={key.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left */}
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <KeyRound className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-[#0F172A] truncate">{key.name}</h3>
                    <EnvBadge env={key.environment} />
                    <StatusBadge status={key.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <code className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {key.prefix}
                    </code>
                    <button
                      onClick={() => handleCopy(key.prefix, key.id + '-prefix')}
                      className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
                      title="Copy prefix"
                    >
                      {copiedId === key.id + '-prefix' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[11px] text-slate-400">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">{key.scope}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-[10.5px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Created {key.created}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Last used {key.lastUsed}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {key.requests.toLocaleString()} requests</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopy(key.prefix, key.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                >
                  {copiedId === key.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === key.id ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => setApiKeys(apiKeys.filter(k => k.id !== key.id))}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                  title="Revoke Key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SECRETS & ENV VARS TAB ────────────────────── */}
      {activeTab === 'secrets' && (
        <div className="space-y-3">
          {filteredSecrets.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">No secrets found.</div>
          )}
          {filteredSecrets.map(secret => (
            <div
              key={secret.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0 border border-violet-100">
                  <Lock className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-sm font-bold text-[#0F172A] font-mono">{secret.key}</code>
                    <EnvBadge env={secret.environment} />
                    <span className="px-2 py-0.5 rounded border text-[10px] font-bold bg-slate-50 text-slate-600 border-slate-200">{secret.category}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="text-[11px] font-mono bg-slate-900 text-slate-100 px-3 py-1.5 rounded-lg flex-1 min-w-0 truncate select-none">
                      {secret.visible ? secret.value : '•'.repeat(Math.min(secret.value.length, 36))}
                    </code>
                    <button
                      onClick={() => toggleSecretVisibility(secret.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {secret.visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleCopy(secret.value, secret.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {copiedId === secret.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-[10.5px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {secret.lastUpdated}</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      AES-256 Encrypted
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setSecrets(secrets.filter(s => s.id !== secret.id))}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                  title="Delete Secret"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── INTEGRATIONS TAB ─────────────────────────── */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIntegrations.map(integ => (
            <div
              key={integ.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:shadow-md transition-shadow flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-200 flex-shrink-0">
                  {integ.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">{integ.name}</h3>
                  <p className="text-[11px] text-slate-500">{integ.category}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-[10.5px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Last sync: {integ.lastSync}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <IntegrationStatus status={integ.status} />
                {integ.status === 'Connected' && (
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors" title="Sync now">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
                {integ.status === 'Disconnected' && (
                  <button className="px-3 py-1.5 text-[11px] font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors">
                    Connect
                  </button>
                )}
                {integ.status === 'Error' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors">
                    <AlertTriangle className="w-3 h-3" />
                    Reconnect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Generate API Key Modal ────────────────────── */}
      <Modal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        title="Generate API Token"
        subtitle="Create a secured, scoped API token for programmatic access"
        actions={
          <>
            <button
              onClick={() => setIsKeyModalOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateKey}
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold"
            >
              Generate Token
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateKey} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Token Name</label>
            <input
              type="text"
              required
              value={newKeyName}
              onChange={e => setNewKeyName(e.target.value)}
              placeholder="e.g. Staging Ingestion Worker"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Environment</label>
            <select
              value={newKeyEnv}
              onChange={e => setNewKeyEnv(e.target.value as ApiKey['environment'])}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Scope & Permissions</label>
            <select
              value={newKeyScope}
              onChange={e => setNewKeyScope(e.target.value)}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option>Full Access (All Products, Services & Agents)</option>
              <option>Read Only (Telemetry & Observability)</option>
              <option>AI Foundation Models Only</option>
              <option>Telemetry & Metrics Ingest Only</option>
              <option>DevOps Pipeline Access</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* ── Add Secret Modal ──────────────────────────── */}
      <Modal
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
        title="Add Encrypted Secret"
        subtitle="Secrets are AES-256 encrypted and never exposed in logs"
        actions={
          <>
            <button
              onClick={() => setIsSecretModalOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSecret}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
            >
              Store Secret
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateSecret} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Secret Key / Name</label>
            <input
              type="text"
              required
              value={newSecretKey}
              onChange={e => setNewSecretKey(e.target.value)}
              placeholder="e.g. DATABASE_URL"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Secret Value</label>
            <textarea
              required
              value={newSecretValue}
              onChange={e => setNewSecretValue(e.target.value)}
              placeholder="Paste the secret value here..."
              rows={3}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Category</label>
              <select
                value={newSecretCategory}
                onChange={e => setNewSecretCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                {['Database', 'AI / LLM', 'Cloud', 'Payments', 'Cache', 'Notifications', 'Auth', 'Other'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">Environment</label>
              <select
                value={newSecretEnv}
                onChange={e => setNewSecretEnv(e.target.value as Secret['environment'])}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                <option>All</option>
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
