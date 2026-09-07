import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { MetricCard } from '../common/MetricCard';
import { Modal } from '../common/Modal';
import {
  HelpCircle,
  Plus,
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Send,
  Paperclip,
  ExternalLink,
  PhoneCall,
  BookOpen,
  Activity,
  ChevronRight,
  ShieldCheck,
  Headphones,
  Sparkles,
  ArrowLeft,
  Server,
  Bot,
  CreditCard,
  Code2,
  Check,
  Info,
  LifeBuoy
} from 'lucide-react';

export type TicketPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TicketStatus = 'Open' | 'In Progress' | 'Waiting on Customer' | 'Resolved' | 'Closed';
export type TicketCategory =
  | 'Technical & Cloud'
  | 'Autonomous Agents'
  | 'Billing & Credits'
  | 'API & SDK'
  | 'Security & Compliance'
  | 'Feature Request';

export interface TicketMessage {
  id: string;
  sender: string;
  role: 'user' | 'agent' | 'system';
  avatar?: string;
  timestamp: string;
  content: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  category: TicketCategory;
  product: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedEngineer: string;
  slaRemaining: string;
  messages: TicketMessage[];
}

const initialTickets: SupportTicket[] = [
  {
    id: 'TKT-2026-104',
    title: 'Multi-region VPC Peering latency spike during agent batch inference',
    category: 'Technical & Cloud',
    product: 'Solution Factor / AI Models',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: 'Sep 7, 2026, 10:15 AM',
    updatedAt: '12 mins ago',
    assignedEngineer: 'Vikram Joshi (Principal Architect)',
    slaRemaining: '48 mins (P1 SLA)',
    messages: [
      {
        id: 'm1',
        sender: 'Sanmugavel S (You)',
        role: 'user',
        timestamp: 'Sep 7, 2026, 10:15 AM',
        content: 'We are observing a 380ms latency jitter on inter-cluster VPC peering between ap-south-1 and us-east-1 during high-concurrency model routing pipelines.'
      },
      {
        id: 'm2',
        sender: 'Vikram Joshi (SNS Support Tier-3)',
        role: 'agent',
        timestamp: 'Sep 7, 2026, 10:24 AM',
        content: 'Investigating transit gateway metrics now. We have applied a route optimization patch to ap-south-1 direct connect tunnel. Please verify if p99 latency normalizes.'
      }
    ]
  },
  {
    id: 'TKT-2026-102',
    title: 'Custom Agent Webhook delivery retry backoff policy configuration',
    category: 'Autonomous Agents',
    product: 'Custom Agent Studio',
    priority: 'High',
    status: 'Open',
    createdAt: 'Sep 6, 2026, 04:30 PM',
    updatedAt: '2 hours ago',
    assignedEngineer: 'Elena Rostova (Agent Platform)',
    slaRemaining: '2.5 hours (P2 SLA)',
    messages: [
      {
        id: 'm1',
        sender: 'Sanmugavel S (You)',
        role: 'user',
        timestamp: 'Sep 6, 2026, 04:30 PM',
        content: 'Need guidance on setting custom exponential backoff delays with jitter for downstream CRM webhook triggers.'
      }
    ]
  },
  {
    id: 'TKT-2026-098',
    title: 'GST invoice tax breakdown discrepancy for August 2026 billing cycle',
    category: 'Billing & Credits',
    product: 'Billing & Resource Credits (INR)',
    priority: 'Medium',
    status: 'Waiting on Customer',
    createdAt: 'Sep 4, 2026, 02:10 PM',
    updatedAt: '1 day ago',
    assignedEngineer: 'Priya Sharma (Enterprise Accounts)',
    slaRemaining: 'Met SLA',
    messages: [
      {
        id: 'm1',
        sender: 'Sanmugavel S (You)',
        role: 'user',
        timestamp: 'Sep 4, 2026, 02:10 PM',
        content: 'We need the GSTIN 18% CGST/SGST revised credit note PDF attached with state tax codes for our corporate filing.'
      },
      {
        id: 'm2',
        sender: 'Priya Sharma (Enterprise Billing)',
        role: 'agent',
        timestamp: 'Sep 4, 2026, 03:45 PM',
        content: 'We have re-generated the revised GST invoice with State Code 33 (Tamil Nadu). Please confirm if you can download the updated PDF from the Credits portal.'
      }
    ]
  },
  {
    id: 'TKT-2026-091',
    title: 'Request for SOC 2 Type II Bridge Letter and Audit Report 2026',
    category: 'Security & Compliance',
    product: 'Compliance Cloud',
    priority: 'Low',
    status: 'Resolved',
    createdAt: 'Sep 1, 2026, 11:00 AM',
    updatedAt: 'Sep 2, 2026',
    assignedEngineer: 'David Miller (Compliance & InfoSec)',
    slaRemaining: 'Closed',
    messages: [
      {
        id: 'm1',
        sender: 'Sanmugavel S (You)',
        role: 'user',
        timestamp: 'Sep 1, 2026, 11:00 AM',
        content: 'Our compliance team requires the latest Q3 SOC 2 Type II audit report for vendor due diligence.'
      },
      {
        id: 'm2',
        sender: 'David Miller (InfoSec)',
        role: 'agent',
        timestamp: 'Sep 1, 2026, 11:40 AM',
        content: 'Attached the signed NDA-cleared SOC 2 Type II package to your Security Vault repository. Ticket marked as resolved.'
      }
    ]
  },
  {
    id: 'TKT-2026-085',
    title: 'Python SDK v2.4 async streaming support for Solution Architect API',
    category: 'API & SDK',
    product: 'Solution Architect',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: 'Aug 28, 2026, 03:15 PM',
    updatedAt: 'Aug 29, 2026',
    assignedEngineer: 'Ananya Rao (DevRel Engineering)',
    slaRemaining: 'Closed',
    messages: [
      {
        id: 'm1',
        sender: 'Sanmugavel S (You)',
        role: 'user',
        timestamp: 'Aug 28, 2026, 03:15 PM',
        content: 'Is there native AsyncIterator support for streaming architecture topology JSON in python-sdk?'
      },
      {
        id: 'm2',
        sender: 'Ananya Rao (DevRel)',
        role: 'agent',
        timestamp: 'Aug 28, 2026, 04:30 PM',
        content: 'Yes! Python SDK v2.4.2 includes full async streaming support via `client.architecture.stream()`. Documented in our SDK reference.'
      }
    ]
  }
];

export const HelpSupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [currentViewMode, setCurrentViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Selected Ticket for Details Modal
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Create Ticket Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TicketCategory>('Technical & Cloud');
  const [newProduct, setNewProduct] = useState('Solution Builder');
  const [newPriority, setNewPriority] = useState<TicketPriority>('High');
  const [newEnvironment, setNewEnvironment] = useState('Production');
  const [newDescription, setNewDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Create Ticket Submit
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newTicketId = `TKT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const createdTicket: SupportTicket = {
      id: newTicketId,
      title: newTitle.trim(),
      category: newCategory,
      product: newProduct,
      priority: newPriority,
      status: 'Open',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      assignedEngineer: 'Triage Queue (Assigned within 5 mins)',
      slaRemaining: newPriority === 'Critical' ? '1 hour (P1 SLA)' : newPriority === 'High' ? '4 hours (P2 SLA)' : '24 hours',
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: 'Sanmugavel S (You)',
          role: 'user',
          timestamp: 'Just now',
          content: `${newDescription.trim()}\n\n[Environment: ${newEnvironment}]${
            attachedFiles.length > 0 ? `\n[Attachments: ${attachedFiles.join(', ')}]` : ''
          }`
        }
      ]
    };

    setTickets([createdTicket, ...tickets]);
    setCurrentViewMode('list');
    setNewTitle('');
    setNewDescription('');
    setAttachedFiles([]);
    showToast(`Ticket ${newTicketId} created successfully! Enterprise SLA active.`);
  };

  // Reply to ticket
  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    const newMsg: TicketMessage = {
      id: `m-${Date.now()}`,
      sender: 'Sanmugavel S (You)',
      role: 'user',
      timestamp: 'Just now',
      content: replyMessage.trim()
    };

    const updated = {
      ...selectedTicket,
      updatedAt: 'Just now',
      messages: [...selectedTicket.messages, newMsg]
    };

    setSelectedTicket(updated);
    setTickets(tickets.map(t => (t.id === updated.id ? updated : t)));
    setReplyMessage('');
    showToast('Reply submitted to support engineer.');
  };

  // Update Status
  const handleUpdateStatus = (ticketId: string, newStatus: TicketStatus) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        const updated = { ...t, status: newStatus, updatedAt: 'Just now' };
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(updated);
        }
        return updated;
      }
      return t;
    });
    setTickets(updatedTickets);
    showToast(`Ticket status updated to "${newStatus}"`);
  };

  // Filter logic
  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'open' && (t.status === 'Open' || t.status === 'In Progress' || t.status === 'Waiting on Customer')) ||
      (statusFilter === 'in-progress' && t.status === 'In Progress') ||
      (statusFilter === 'resolved' && (t.status === 'Resolved' || t.status === 'Closed'));

    const matchesPriority =
      priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();

    const matchesCategory =
      categoryFilter === 'all' || t.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Priority Styles (Soft & Minimal)
  const getPriorityBadge = (priority: TicketPriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
            Low
          </span>
        );
    }
  };

  // Status Styles (Clean & Breathing)
  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Open
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-100">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            In Progress
          </span>
        );
      case 'Waiting on Customer':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Waiting
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Resolved
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
            Closed
          </span>
        );
    }
  };

  const openCount = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;

  // =========================================================================
  // VIEW 2: INDIVIDUAL FULL PAGE UI FOR "CREATE NEW TICKET"
  // =========================================================================
  if (currentViewMode === 'create') {
    return (
      <div className="space-y-6 animate-fade-in pb-16">
        {/* Toast Notification */}
        {notificationToast && (
          <div className="fixed top-20 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-slide-down text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notificationToast}</span>
          </div>
        )}

        {/* Clickable Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <button
            onClick={() => setCurrentViewMode('list')}
            className="hover:text-blue-600 font-medium transition-colors"
          >
            Workspace
          </button>
          <span>/</span>
          <button
            onClick={() => setCurrentViewMode('list')}
            className="hover:text-blue-600 font-medium transition-colors"
          >
            Help & Support
          </button>
          <span>/</span>
          <span className="text-[#0F172A] font-bold">Create New Ticket</span>
        </div>

        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentViewMode('list')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Tickets List</span>
            </button>
            <h1 className="text-2xl font-bold text-[#0F172A]">Create Support Ticket</h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xl leading-relaxed">
              Submit a high-priority incident or technical inquiry directly to SNS Square Level-3 engineers and your assigned Principal Architect.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              24/7 Priority SLA Active
            </span>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Form (Span 2) */}
          <form onSubmit={handleCreateTicket} className="lg:col-span-2 space-y-6">
            {/* Card 1: Ticket Essentials */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-5">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Issue Summary & Scope</span>
              </h2>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ticket Subject / Summary <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g., Latency degradation on ap-south-1 inference endpoint during batch load"
                  className="w-full text-xs p-3 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Category Selector Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'Technical & Cloud', label: 'Technical & Cloud', icon: <Server className="w-3.5 h-3.5" /> },
                    { id: 'Autonomous Agents', label: 'Autonomous Agents', icon: <Bot className="w-3.5 h-3.5" /> },
                    { id: 'Billing & Credits', label: 'Billing & Credits (INR)', icon: <CreditCard className="w-3.5 h-3.5" /> },
                    { id: 'API & SDK', label: 'API & SDK Integration', icon: <Code2 className="w-3.5 h-3.5" /> },
                    { id: 'Security & Compliance', label: 'Security & Compliance', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                    { id: 'Feature Request', label: 'Feature Request', icon: <Sparkles className="w-3.5 h-3.5" /> }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewCategory(cat.id as TicketCategory)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                        newCategory === cat.id
                          ? 'bg-blue-50/80 border-blue-500 text-blue-700 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span className={newCategory === cat.id ? 'text-blue-600' : 'text-slate-400'}>
                        {cat.icon}
                      </span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropdowns Row: Product & Environment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Impacted Product / Offering
                  </label>
                  <select
                    value={newProduct}
                    onChange={e => setNewProduct(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 font-medium text-slate-700 cursor-pointer"
                  >
                    <option value="Solution Builder">Solution Builder (Full Stack / Frontend)</option>
                    <option value="Solution Factor / AI Models">Solution Factor / AI Models</option>
                    <option value="Cloud FinOps">Cloud FinOps</option>
                    <option value="Compliance Cloud">Compliance Cloud</option>
                    <option value="Custom Agent Studio">Custom Agent Studio</option>
                    <option value="Autonomous Agents">Autonomous Agents Suite</option>
                    <option value="Billing & Resource Credits (INR)">Billing & Resource Credits (INR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Target Environment
                  </label>
                  <select
                    value={newEnvironment}
                    onChange={e => setNewEnvironment(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 font-medium text-slate-700 cursor-pointer"
                  >
                    <option value="Production">Production (Mission Critical)</option>
                    <option value="Staging / Pre-Production">Staging / Pre-Production</option>
                    <option value="Development / Sandbox">Development / Sandbox</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card 2: Priority Selection */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Severity & SLA Level</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'Critical',
                    label: 'Critical (P1)',
                    desc: 'Outage / production down. Core business workflows blocked.',
                    sla: '< 15 mins Response',
                    color: 'border-rose-300 bg-rose-50/40 text-rose-900',
                    activeColor: 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-200'
                  },
                  {
                    id: 'High',
                    label: 'High (P2)',
                    desc: 'Severe degradation with significant user impact, no workaround.',
                    sla: '< 2 hours Response',
                    color: 'border-amber-300 bg-amber-50/40 text-amber-900',
                    activeColor: 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200'
                  },
                  {
                    id: 'Medium',
                    label: 'Medium (P3)',
                    desc: 'Non-critical functionality impaired or technical assistance required.',
                    sla: '< 8 hours Response',
                    color: 'border-sky-300 bg-sky-50/40 text-sky-900',
                    activeColor: 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-200'
                  },
                  {
                    id: 'Low',
                    label: 'Low (P4)',
                    desc: 'General inquiry, documentation clarification, or minor improvement.',
                    sla: '< 24 hours Response',
                    color: 'border-slate-300 bg-slate-50 text-slate-800',
                    activeColor: 'border-slate-600 bg-slate-100 text-slate-900 ring-2 ring-slate-200'
                  }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setNewPriority(item.id as TicketPriority)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      newPriority === item.id ? item.activeColor : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{item.label}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200">
                        {item.sla}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Description & Diagnostics */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Detailed Description & Diagnostics</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Reproduction Steps, Error Codes & Context <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Please include:&#10;1. What happened vs expected behavior&#10;2. Timestamps and relevant Request IDs / API keys&#10;3. Error logs or stack trace snippets"
                  className="w-full text-xs p-3.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 transition-all font-mono leading-relaxed text-slate-800"
                />
              </div>

              {/* Attachments Section */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Diagnostic Attachments (Optional)
                </label>
                <div className="p-4 bg-slate-50/80 rounded-xl border border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2.5">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    <span>Attach HAR files, screenshots, server logs, or configurations (Max 25MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const sampleName = `debug_log_${Date.now()}.json`;
                      setAttachedFiles([...attachedFiles, sampleName]);
                      showToast(`Attached ${sampleName}`);
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-100 cursor-pointer shadow-2xs whitespace-nowrap text-[11px]"
                  >
                    + Browse File
                  </button>
                </div>

                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {attachedFiles.map((file, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-blue-50 text-blue-700 border border-blue-200 font-mono"
                      >
                        <Check className="w-3 h-3 text-blue-600" />
                        <span>{file}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentViewMode('list')}
                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel & Return
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Enterprise Ticket</span>
              </button>
            </div>
          </form>

          {/* Right Sidebar: SLA Info & Quick Help */}
          <div className="space-y-4">
            {/* SLA Guarantee Card */}
            <div className="bg-gradient-to-br from-[#07111F] to-[#0F2038] text-white rounded-2xl p-5 shadow-subtle border border-[#1E293B]">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-2 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise SLA Guarantee</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Dedicated Level-3 Engineering</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Your enterprise tier includes direct escalations to core product engineers with strict uptime and response guarantees.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>&lt; 15 min response time for P1</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Dedicated VPC peering & Architect</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Zero-retention data privacy guarantee</span>
                </li>
              </ul>
            </div>

            {/* Fast Resolution Tips */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-3">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>Tips for Faster Resolution</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Specify the exact API endpoint or AWS/GCP region affected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Include recent deployment versions or config revisions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Sanitize any production passwords or private tokens.</span>
                </li>
              </ul>
            </div>

            {/* Need Immediate Call Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#0F172A] mb-1">Need Urgent Phone Support?</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                For complete production blockers, trigger an emergency architect bridge.
              </p>
              <button
                type="button"
                onClick={() => alert('Initiating priority emergency call bridge...')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Emergency Bridge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: ALL TICKETS LIST VIEW
  // =========================================================================
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-slide-down text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      <Breadcrumb items={[{ label: 'Workspace' }, { label: 'Help & Support' }]} />

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <Headphones className="w-4 h-4" />
            <span>Enterprise Support Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Help, Support & Tickets</h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl leading-relaxed">
            Create and track enterprise technical support tickets, manage incidents, and communicate directly with your dedicated Solutions Architect.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => alert('Initiating priority callback with dedicated Solutions Architect...')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            <span>Request Architect Call</span>
          </button>

          <button
            onClick={() => setCurrentViewMode('create')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Ticket</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Open Tickets" value={`${openCount} Active`} subtitle="1 In Progress · 1 P1 Critical" isPositive={openCount <= 2} />
        <MetricCard label="Resolved Tickets" value={`${resolvedCount} Resolved`} subtitle="100% resolution satisfaction" isPositive />
        <MetricCard label="Average First Response" value="8 Mins" subtitle="Guaranteed < 15m P1 SLA" isPositive />
        <MetricCard label="Dedicated SLA Level" value="24/7 Enterprise" subtitle="Dedicated VPC & Architect" isPositive />
      </div>

      {/* Main Ticket Management Section */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle overflow-hidden">
        {/* Top Filter Bar */}
        <div className="p-4 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#F8FAFC]">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: `All Tickets (${tickets.length})` },
              { id: 'open', label: `Open (${openCount})` },
              { id: 'in-progress', label: `In Progress (1)` },
              { id: 'resolved', label: `Resolved (${resolvedCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Dropdown Filters */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search ticket ID, title, product..."
                className="w-full pl-8 pr-3 py-1.5 bg-white text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden cursor-pointer font-medium"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-white text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden cursor-pointer font-medium"
            >
              <option value="all">All Categories</option>
              <option value="technical & cloud">Technical & Cloud</option>
              <option value="autonomous agents">Autonomous Agents</option>
              <option value="billing & credits">Billing & Credits</option>
              <option value="api & sdk">API & SDK</option>
              <option value="security & compliance">Security & Compliance</option>
            </select>
          </div>
        </div>

        {/* Clean, Breathing Ticket List Table */}
        <div className="divide-y divide-slate-100">
          {filteredTickets.length === 0 ? (
            <div className="py-16 text-center">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-600">No tickets found matching your filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setCategoryFilter('all');
                }}
                className="mt-3 text-xs text-blue-600 font-bold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="px-5 py-4 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left Area: ID, Status, Priority, Subject, Product */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Ticket ID */}
                  <span className="font-mono text-xs font-medium text-slate-400 shrink-0 w-24">
                    {ticket.id}
                  </span>

                  {/* Status */}
                  <div className="shrink-0">
                    {getStatusBadge(ticket.status)}
                  </div>

                  {/* Priority */}
                  <div className="shrink-0 hidden sm:block">
                    {getPriorityBadge(ticket.priority)}
                  </div>

                  {/* Title */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-[13px] font-medium text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                      {ticket.title}
                    </h3>
                  </div>

                  {/* Product Tag */}
                  <span className="hidden lg:inline-block px-2 py-0.5 rounded text-[11px] text-slate-500 bg-slate-100 shrink-0">
                    {ticket.product}
                  </span>
                </div>

                {/* Right Area: Assignee, Updated Time & Arrow */}
                <div className="flex items-center gap-6 justify-between md:justify-end text-xs shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-[11px] font-medium text-slate-700 block">
                      {ticket.assignedEngineer.split('(')[0].trim()}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {ticket.updatedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      {ticket.messages.length}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Self Service & Knowledge Base Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:border-blue-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] mb-1">Developer Documentation</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Browse step-by-step integration guides, Python/TypeScript SDK references, and API endpoint specs.
          </p>
          <a
            href="#docs"
            onClick={e => {
              e.preventDefault();
              alert('Opening developer documentation portal...');
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>Explore Docs</span> <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:border-emerald-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] mb-1">Live Cloud System Status</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            All 10 Products and 6 Generative Services are operating with 99.99% uptime across all global regions.
          </p>
          <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Operational Status</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle hover:border-indigo-300 transition-all">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] mb-1">Security & Trust Center</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Download SOC 2 Type II audit certificates, HIPAA attestation, and data processing addendums.
          </p>
          <a
            href="#security"
            onClick={e => {
              e.preventDefault();
              alert('Opening Trust & Compliance center...');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
          >
            <span>View Trust Center</span> <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TICKET DETAILS / MANAGEMENT MODAL                                         */}
      {/* ========================================================================= */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          title={`Ticket Details: ${selectedTicket.id}`}
          subtitle={`Created ${selectedTicket.createdAt} · Assigned to ${selectedTicket.assignedEngineer}`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Ticket Metadata Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {getPriorityBadge(selectedTicket.priority)}
                {getStatusBadge(selectedTicket.status)}
                <span className="text-xs text-slate-500 font-bold bg-white px-2.5 py-1 rounded border border-slate-200">
                  {selectedTicket.product}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Category: <strong className="text-slate-700">{selectedTicket.category}</strong>
                </span>
              </div>

              {/* Status Quick Changer */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold">Change Status:</span>
                <select
                  value={selectedTicket.status}
                  onChange={e => handleUpdateStatus(selectedTicket.id, e.target.value as TicketStatus)}
                  className="bg-white text-xs border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 font-bold focus:outline-hidden"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting on Customer">Waiting on Info</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Ticket Subject */}
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">{selectedTicket.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">SLA Target: {selectedTicket.slaRemaining}</p>
            </div>

            {/* Conversation Thread */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {selectedTicket.messages.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  className={`p-4 rounded-xl border ${
                    msg.role === 'user'
                      ? 'bg-blue-50/40 border-blue-100 ml-4 md:ml-8'
                      : 'bg-white border-slate-200 mr-4 md:mr-8 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-purple-600 text-white'
                        }`}
                      >
                        {msg.sender.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-[#0F172A]">{msg.sender}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap pl-8">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Input Box */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="relative">
                <textarea
                  value={replyMessage}
                  onChange={e => setReplyMessage(e.target.value)}
                  placeholder="Type a response or attach diagnostic logs to this ticket..."
                  rows={3}
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert('Simulating log/screenshot attachment...')}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-medium px-2 py-1 rounded hover:bg-slate-100"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach logs / files</span>
                </button>

                <div className="flex items-center gap-2">
                  {selectedTicket.status !== 'Resolved' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(selectedTicket.id, 'Resolved')}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg hover:bg-emerald-100"
                    >
                      Mark as Resolved
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
