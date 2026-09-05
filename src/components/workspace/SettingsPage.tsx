import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { useNavigation } from '../../context/NavigationContext';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { 
  Settings, 
  User, 
  Building, 
  Users, 
  KeyRound, 
  Plug, 
  ShieldCheck, 
  Bell, 
  Check, 
  Copy, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff,
  Sparkles
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { activeSettingsTab, setActiveSettingsTab } = useNavigation();

  // API Key state
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Production Backend Gateway', prefix: 'sns_live_9481...', created: 'Aug 14, 2026', status: 'Active' },
    { id: 'key-2', name: 'CI/CD GitHub Actions Runner', prefix: 'sns_live_3821...', created: 'Sep 01, 2026', status: 'Active' },
  ]);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Team members
  const [team, setTeam] = useState([
    { id: 'usr-1', name: 'Sanmugavel S', email: 'sanmugavel@snssquare.com', role: 'Organization Owner', status: 'Active' },
    { id: 'usr-2', name: 'Elena Rostova', email: 'elena.r@snssquare.com', role: 'Security & Compliance Lead', status: 'Active' },
    { id: 'usr-3', name: 'Michael K', email: 'michael.k@snssquare.com', role: 'Principal DevOps Architect', status: 'Active' },
  ]);

  // Integrations state
  const [integrations, setIntegrations] = useState([
    { name: 'Amazon Web Services (AWS)', category: 'Cloud Infrastructure', connected: true },
    { name: 'GitHub Enterprise', category: 'Source Control & CI/CD', connected: true },
    { name: 'Slack Enterprise Grid', category: 'Team Notifications', connected: true },
    { name: 'Datadog / Splunk SIEM', category: 'Observability & Logs', connected: true },
    { name: 'Stripe Payments Engine', category: 'Billing & Webhooks', connected: true },
    { name: 'Jira & Linear Cloud', category: 'Issue Tracking', connected: true },
  ]);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    setApiKeys([
      ...apiKeys,
      {
        id: `key-${Date.now()}`,
        name: newKeyName,
        prefix: `sns_live_${Math.random().toString(36).substring(2, 8)}...`,
        created: 'Just now',
        status: 'Active'
      }
    ]);
    setIsKeyModalOpen(false);
    setNewKeyName('');
  };

  const navItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'org', label: 'Organization', icon: Building },
    { id: 'team', label: 'Team & Roles', icon: Users },
    { id: 'api-keys', label: 'API Keys', icon: KeyRound },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'security', label: 'Security & 2FA', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Workspace' }, { label: 'Settings' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Control Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Workspace Settings</h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl">
            Configure organization details, team access controls, API keys, zero-trust security, and integrations.
          </p>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 shadow-subtle space-y-1 h-fit">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSettingsTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSettingsTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  active
                    ? 'bg-blue-50 text-[#2563EB] shadow-2xs border border-blue-200/60'
                    : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel (Cols 2-4) */}
        <div className="lg:col-span-3 space-y-6">
          {/* GENERAL TAB */}
          {activeSettingsTab === 'general' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-5 text-xs">
              <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">
                Workspace Preferences
              </h3>

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Workspace Name</label>
                  <input
                    type="text"
                    defaultValue="SNS Square Production Workspace"
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Primary Cloud Region</label>
                  <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
                    <option>US-East (N. Virginia)</option>
                    <option>US-West (Oregon)</option>
                    <option>EU-Central (Frankfurt)</option>
                    <option>AP-South (Mumbai)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Default Time Zone</label>
                  <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>IST (Indian Standard Time)</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => alert('Preferences saved successfully.')}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeSettingsTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-5 text-xs">
              <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">
                User Profile
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-900 font-extrabold text-xl flex items-center justify-center border-2 border-white shadow-md">
                  SS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Sanmugavel S</h4>
                  <p className="text-slate-500">sanmugavel@snssquare.com</p>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mt-1 inline-block">
                    Organization Owner
                  </span>
                </div>
              </div>

              <div className="space-y-4 max-w-xl pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#0F172A] mb-1">First Name</label>
                    <input type="text" defaultValue="Sanmugavel" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#0F172A] mb-1">Last Name</label>
                    <input type="text" defaultValue="S" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Email Address</label>
                  <input type="email" defaultValue="sanmugavel@snssquare.com" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs" />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => alert('Profile updated.')}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold shadow-sm"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TEAM & ROLES TAB */}
          {activeSettingsTab === 'team' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Team Members & Access Roles</h3>
                  <span className="text-[11px] text-[#64748B]">Manage RBAC permissions across all products and agents</span>
                </div>
                <button
                  onClick={() => alert('Opened Invite Team Member dialog.')}
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite Member</span>
                </button>
              </div>

              <div className="divide-y divide-[#F1F5F9]">
                {team.map((member) => (
                  <div key={member.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{member.name}</h4>
                      <span className="text-[#64748B] text-[11px]">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
                        {member.role}
                      </span>
                      <StatusBadge status={member.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API KEYS TAB */}
          {activeSettingsTab === 'api-keys' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">API Keys & Access Tokens</h3>
                  <span className="text-[11px] text-[#64748B]">Universal API tokens for AI Models, DevOps pipelines, and Telemetry</span>
                </div>
                <button
                  onClick={() => setIsKeyModalOpen(true)}
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Generate Key</span>
                </button>
              </div>

              <div className="divide-y divide-[#F1F5F9]">
                {apiKeys.map((k) => (
                  <div key={k.id} className="py-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{k.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">{k.prefix}</span>
                        <span className="text-[10px] text-[#94A3B8]">Created {k.created}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={k.status} />
                      <button
                        onClick={() => setApiKeys(apiKeys.filter(x => x.id !== k.id))}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                        title="Revoke Key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeSettingsTab === 'integrations' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">
                Connected Cloud & Developer Integrations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integ, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{integ.name}</h4>
                      <span className="text-[11px] text-[#64748B]">{integ.category}</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                      Connected
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeSettingsTab === 'security' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-5 text-xs">
              <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">
                Security & Zero-Trust Governance
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <div>
                    <h4 className="font-bold text-[#0F172A]">Two-Factor Authentication (2FA / FIDO2)</h4>
                    <span className="text-[11px] text-[#64748B]">Enforced for all organization administrators</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold">
                    Enforced
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <h4 className="font-bold text-[#0F172A]">SAML 2.0 Single Sign-On (SSO)</h4>
                    <span className="text-[11px] text-[#64748B]">Okta, Azure AD, and Google Workspace</span>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded text-[11px] font-semibold">
                    Configured
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div>
                    <h4 className="font-bold text-[#0F172A]">IP Allowlisting & Geo-Fencing</h4>
                    <span className="text-[11px] text-[#64748B]">Restricts console access to approved enterprise CIDR blocks</span>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded text-[11px] font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ORGANIZATION TAB */}
          {activeSettingsTab === 'org' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">
                Organization Profile
              </h3>
              <div className="space-y-3 max-w-xl">
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Company Legal Name</label>
                  <input type="text" defaultValue="SNS Square Technologies Inc." className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Verified Corporate Domain</label>
                  <input type="text" defaultValue="snssquare.com" className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs font-mono" />
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => alert('Organization details saved.')}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold shadow-sm"
                  >
                    Save Organization
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generate API Key Modal */}
      <Modal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        title="Generate Universal API Token"
        subtitle="Create a secured API token for programmatic workspace integration"
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
              Create Token
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateKey} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Token Identifier / Name</label>
            <input
              type="text"
              required
              value={newKeyName}
              onChange={e => setNewKeyName(e.target.value)}
              placeholder="e.g. Staging Ingestion Worker"
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1">Scope & Permissions</label>
            <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
              <option>Full Access (All Products, Services, & Agents)</option>
              <option>Read Only (Telemetry & Observability)</option>
              <option>AI Foundation Models Only</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};
