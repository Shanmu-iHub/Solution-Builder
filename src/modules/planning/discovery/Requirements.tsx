import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, Check, X, Search, Filter, 
  Plus, Pencil, Trash2, Sparkles, Briefcase, User, Cpu, ShieldCheck, 
  RotateCcw, SlidersHorizontal, CheckCheck
} from 'lucide-react';
import { Button, Input, Textarea, cx } from '../../ui';
import { usePlanning } from '../PlanningStore';

export type RequirementCategory = 'business' | 'user' | 'functional' | 'ai' | 'non_functional';
export type RequirementPriority = 'HIGH' | 'MED' | 'LOW';
export type RequirementStatus = 'APPROVED' | 'IN REVIEW' | 'REJECTED';
export type RequirementType = 'Objective' | 'Rule' | 'Constraint';

export interface RequirementItem {
  id: string;
  category: RequirementCategory;
  statement: string;
  type: RequirementType;
  priority: RequirementPriority;
  status: RequirementStatus;
  source: string;
}

const INITIAL_REQUIREMENTS: RequirementItem[] = [
  // ==========================================
  // BUSINESS REQUIREMENTS (8)
  // ==========================================
  {
    id: 'BR-001',
    category: 'business',
    statement: 'Enable field sales reps to capture receipts instantly.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-002',
    category: 'business',
    statement: 'Provide accurate AI extraction of receipt data.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-003',
    category: 'business',
    statement: 'Store captured receipts when offline and sync when connectivity returns.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-004',
    category: 'business',
    statement: 'Protect receipt data and enforce access permissions.',
    type: 'Constraint',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-005',
    category: 'business',
    statement: 'Integrate claim submission with the existing expense management workflow.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-006',
    category: 'business',
    statement: 'Managers must receive notifications and be able to approve or reject claims through the existing approval process.',
    type: 'Rule',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-007',
    category: 'business',
    statement: 'The solution must not include dedicated scanning hardware.',
    type: 'Constraint',
    priority: 'LOW',
    status: 'APPROVED',
    source: 'Not linked',
  },
  {
    id: 'BR-008',
    category: 'business',
    statement: 'Support offline buffering to mitigate network connectivity issues for receipt sync.',
    type: 'Rule',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Not linked',
  },

  // ==========================================
  // USER REQUIREMENTS (8)
  // ==========================================
  {
    id: 'UR-001',
    category: 'user',
    statement: 'Field sales reps must be able to photograph a paper receipt within 5 seconds using single-handed mobile capture.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Field Rep Persona',
  },
  {
    id: 'UR-002',
    category: 'user',
    statement: 'Reps must see an immediate real-time preview showing detected edges and extracted expense line items.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Field Rep Persona',
  },
  {
    id: 'UR-003',
    category: 'user',
    statement: 'Line managers must have a unified 1-click triage queue on desktop and mobile web to review pending claims.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Sales Manager Persona',
  },
  {
    id: 'UR-004',
    category: 'user',
    statement: 'Reps must receive automated push alerts when an expense claim is approved, flagged, or reimbursed.',
    type: 'Rule',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Field Rep Persona',
  },
  {
    id: 'UR-005',
    category: 'user',
    statement: 'Finance teams must be able to bulk-export approved claims directly into the enterprise general ledger.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Finance Approver Persona',
  },
  {
    id: 'UR-006',
    category: 'user',
    statement: 'The mobile interface must provide clear tactile and visual confirmation upon successful background sync.',
    type: 'Constraint',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Mobile Ops Lead Persona',
  },
  {
    id: 'UR-007',
    category: 'user',
    statement: 'Reps must be able to group multi-receipt travel itineraries into a single consolidated expense claim.',
    type: 'Objective',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Field Rep Persona',
  },
  {
    id: 'UR-008',
    category: 'user',
    statement: 'Users must be able to manually edit or correct OCR-extracted values before final claim submission.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Field Rep Persona',
  },

  // ==========================================
  // FUNCTIONAL REQUIREMENTS (6)
  // ==========================================
  {
    id: 'FR-001',
    category: 'functional',
    statement: 'The system shall automatically crop, straighten, and contrast-enhance camera-captured receipt images.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Photo Capture Capability',
  },
  {
    id: 'FR-002',
    category: 'functional',
    statement: 'The system shall extract merchant name, date, total amount, currency, and line items with >95% confidence.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'AI OCR Service',
  },
  {
    id: 'FR-003',
    category: 'functional',
    statement: 'The system shall flag out-of-policy expenses (e.g. weekend spend, alcohol, exceeding per-diem limits) prior to submission.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Policy Validation Engine',
  },
  {
    id: 'FR-004',
    category: 'functional',
    statement: 'The system shall queue offline claims in encrypted client storage and auto-sync using exponential backoff.',
    type: 'Constraint',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Offline Sync Capability',
  },
  {
    id: 'FR-005',
    category: 'functional',
    statement: 'The system shall generate automated 48-hour SLA escalation reminders for unreviewed manager approvals.',
    type: 'Rule',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Workflow Integration',
  },
  {
    id: 'FR-006',
    category: 'functional',
    statement: 'The system shall produce tamper-evident audit logs recording the exact timestamp and user ID for every line-item edit.',
    type: 'Constraint',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Audit & Compliance Engine',
  },

  // ==========================================
  // AI & MACHINE LEARNING REQUIREMENTS (8)
  // ==========================================
  {
    id: 'AI-001',
    category: 'ai',
    statement: 'The AI OCR model shall achieve sub-2-second inference latency on standard smartphone camera uploads.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'AI Vision Pipeline',
  },
  {
    id: 'AI-002',
    category: 'ai',
    statement: 'The model shall classify receipt merchant categories into standardized corporate expense codes automatically.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Categorization Classifier',
  },
  {
    id: 'AI-003',
    category: 'ai',
    statement: 'The system shall detect potential duplicate receipt submissions across reps using perceptual image hashing.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Fraud Prevention Engine',
  },
  {
    id: 'AI-004',
    category: 'ai',
    statement: 'The extraction model shall highlight low-confidence extracted fields for human-in-the-loop review.',
    type: 'Constraint',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Confidence Scoring Service',
  },
  {
    id: 'AI-005',
    category: 'ai',
    statement: 'Multi-currency receipts shall automatically calculate conversions based on historical rates for the receipt transaction date.',
    type: 'Rule',
    priority: 'MED',
    status: 'APPROVED',
    source: 'FX Rate Provider',
  },
  {
    id: 'AI-006',
    category: 'ai',
    statement: 'The system shall support multilingual receipt parsing for English, Spanish, French, German, and Japanese.',
    type: 'Objective',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Multilingual OCR Engine',
  },
  {
    id: 'AI-007',
    category: 'ai',
    statement: 'The model shall blur or redact sensitive payment card numbers (PCI-DSS compliance) before cloud storage.',
    type: 'Constraint',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Privacy Redaction Filter',
  },
  {
    id: 'AI-008',
    category: 'ai',
    statement: 'The system shall learn from user manual corrections to continuously improve custom vendor parsing accuracy.',
    type: 'Objective',
    priority: 'LOW',
    status: 'APPROVED',
    source: 'Active Learning Feedback Loop',
  },

  // ==========================================
  // NON-FUNCTIONAL REQUIREMENTS (8)
  // ==========================================
  {
    id: 'NFR-001',
    category: 'non_functional',
    statement: 'All receipt imagery and personal metadata must be encrypted at rest using AES-256 and in transit via TLS 1.3.',
    type: 'Constraint',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Security Architecture',
  },
  {
    id: 'NFR-002',
    category: 'non_functional',
    statement: 'The mobile client app package size must not exceed 45 MB to ensure fast cellular downloads in the field.',
    type: 'Constraint',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Mobile App Packaging',
  },
  {
    id: 'NFR-003',
    category: 'non_functional',
    statement: 'System availability must meet or exceed 99.95% uptime during global business operating hours.',
    type: 'Objective',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'SLA Target',
  },
  {
    id: 'NFR-004',
    category: 'non_functional',
    statement: 'Mobile app memory footprint must remain under 120 MB during full-resolution camera capture sessions.',
    type: 'Constraint',
    priority: 'MED',
    status: 'APPROVED',
    source: 'Performance Profiling',
  },
  {
    id: 'NFR-005',
    category: 'non_functional',
    statement: 'System must comply with SOC 2 Type II, GDPR, and ISO 27001 data residency standards.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Enterprise Compliance',
  },
  {
    id: 'NFR-006',
    category: 'non_functional',
    statement: 'Receipt images must be archived in immutable cloud object storage for a 7-year regulatory audit retention period.',
    type: 'Rule',
    priority: 'HIGH',
    status: 'APPROVED',
    source: 'Data Retention Policy',
  },
  {
    id: 'NFR-007',
    category: 'non_functional',
    statement: 'The application must support remote device wipe and revocation via corporate MDM/MAM integrations.',
    type: 'Constraint',
    priority: 'MED',
    status: 'APPROVED',
    source: 'MDM Security Policy',
  },
  {
    id: 'NFR-008',
    category: 'non_functional',
    statement: 'API endpoints must maintain a 99th percentile response time below 300ms under 5,000 concurrent user load.',
    type: 'Objective',
    priority: 'LOW',
    status: 'APPROVED',
    source: 'Scalability Benchmarks',
  },
];

const CATEGORIES: { id: RequirementCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'business', label: 'Business', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'user', label: 'User', icon: <User className="w-3.5 h-3.5" /> },
  { id: 'functional', label: 'Functional', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'ai', label: 'AI', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'non_functional', label: 'Non-Functional', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
];

export const Requirements: React.FC<{ 
  projectId: string; 
  projectName: string; 
  onComplete: () => void;
  onBack?: () => void;
}> = ({ projectId, projectName, onComplete, onBack }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);

  const [reqs, setReqs] = useState<RequirementItem[]>(INITIAL_REQUIREMENTS);
  const [activeCategory, setActiveCategory] = useState<RequirementCategory>('business');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  // Submodal editing state
  const [editingReq, setEditingReq] = useState<RequirementItem | null>(null);

  // Counts
  const totalCount = reqs.length;
  const approvedCount = reqs.filter(r => r.status === 'APPROVED').length;
  const inReviewCount = reqs.filter(r => r.status === 'IN REVIEW').length;
  const traceCoverage = '58%'; // Matching Image 2

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<RequirementCategory, number> = {
      business: 0,
      user: 0,
      functional: 0,
      ai: 0,
      non_functional: 0,
    };
    reqs.forEach(r => {
      if (counts[r.category] !== undefined) {
        counts[r.category] += 1;
      }
    });
    return counts;
  }, [reqs]);

  // Filtered requirements list
  const filteredReqs = useMemo(() => {
    return reqs.filter(r => {
      if (r.category !== activeCategory) return false;
      if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
      if (priorityFilter !== 'ALL' && r.priority !== priorityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesStatement = r.statement.toLowerCase().includes(q);
        const matchesType = r.type.toLowerCase().includes(q);
        const matchesSource = r.source.toLowerCase().includes(q);
        if (!matchesId && !matchesStatement && !matchesType && !matchesSource) return false;
      }
      return true;
    });
  }, [reqs, activeCategory, statusFilter, priorityFilter, searchQuery]);

  const handleSaveRequirement = (item: RequirementItem) => {
    if (!item.statement.trim()) return;
    if (reqs.some(x => x.id === item.id)) {
      setReqs(prev => prev.map(x => x.id === item.id ? item : x));
    } else {
      setReqs(prev => [...prev, item]);
    }
    setEditingReq(null);
  };

  const handleDeleteRequirement = (id: string) => {
    setReqs(prev => prev.filter(x => x.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setReqs(prev => prev.map(r => {
      if (r.id !== id) return r;
      const nextStatus: RequirementStatus = 
        r.status === 'APPROVED' ? 'IN REVIEW' : 
        r.status === 'IN REVIEW' ? 'REJECTED' : 'APPROVED';
      return { ...r, status: nextStatus };
    }));
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
  };

  const confirm = () => {
    patch(projectId, { 
      requirementsConfirmed: true, 
      discoveryPage: 'documentation' 
    });
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
        <div>

          <h1 className="text-lg font-bold text-[#0F172A]">Business &amp; Product Requirements</h1>
        </div>

      </div>

      {/* Main Full-Width Workspace Canvas (No Cramped Side Panel!) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* 1. TOP 4 KPI METRIC CARDS (Exact Match to Reference Image 2) */}
          {/* ========================================================================= */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Requirements
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {totalCount}
              </span>
            </div>
          </div> */}

          {/* ========================================================================= */}
          {/* 2. CATEGORY TABS WITH BADGES (Exact Match to Reference Image 2) */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-0 overflow-x-auto">
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat.id;
              const count = categoryCounts[cat.id];
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cx(
                    "flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap",
                    active
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  )}
                >
                  <span className={cx(active ? "text-slate-900" : "text-slate-400")}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                  <span className={cx(
                    "px-1.5 py-0.2 rounded-full text-[10.5px] font-bold",
                    active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 3. SEARCH & FILTER TOOLBAR (Exact Match to Reference Image 2) */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search requirements..."
                className="pl-8 text-xs bg-white h-9"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-400 h-9"
              >
                <option value="ALL">Status: All</option>
                <option value="APPROVED">Status: Approved</option>
                <option value="IN REVIEW">Status: In Review</option>
                <option value="REJECTED">Status: Rejected</option>
              </select>

              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-400 h-9"
              >
                <option value="ALL">Priority: All</option>
                <option value="HIGH">Priority: High</option>
                <option value="MED">Priority: Med</option>
                <option value="LOW">Priority: Low</option>
              </select>

              {(searchQuery || statusFilter !== 'ALL' || priorityFilter !== 'ALL') && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1 transition-colors cursor-pointer"
                >
                  <Filter className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}

              <Button
                size="xs"
                variant="secondary"
                icon={<Plus className="w-3 h-3 text-blue-600" />}
                onClick={() => setEditingReq({
                  id: `${activeCategory === 'business' ? 'BR' : activeCategory === 'user' ? 'UR' : activeCategory === 'functional' ? 'FR' : activeCategory === 'ai' ? 'AI' : 'NFR'}-${String(reqs.length + 1).padStart(3, '0')}`,
                  category: activeCategory,
                  statement: '',
                  type: 'Objective',
                  priority: 'HIGH',
                  status: 'APPROVED',
                  source: 'Not linked',
                })}
                className="text-xs font-bold h-9"
              >
                Add Requirement
              </Button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. FULL-WIDTH REQUIREMENTS TABLE (Exact Match to Reference Image 2) */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200">
                    <th className="px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider w-24">
                      ID
                    </th>
                    <th className="px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                      Requirement
                    </th>
                    <th className="px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider w-28">
                      Type
                    </th>
                    <th className="px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider w-24">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider w-28">
                      Review Status
                    </th>

                    <th className="px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider text-right w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredReqs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        No requirements found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredReqs.map(r => (
                      <tr 
                        key={r.id} 
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        {/* ID */}
                        <td className="px-4 py-3.5 font-mono font-medium text-slate-500 whitespace-nowrap">
                          {r.id}
                        </td>

                        {/* Statement */}
                        <td className="px-4 py-3.5 font-medium text-slate-900 leading-relaxed max-w-xl">
                          {r.statement}
                        </td>

                        {/* Type */}
                        <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                          {r.type}
                        </td>

                        {/* Priority Badge */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {r.priority === 'HIGH' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white tracking-wider uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              High
                            </span>
                          ) : r.priority === 'MED' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white tracking-wider uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              Med
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-400 text-white tracking-wider uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              Low
                            </span>
                          )}
                        </td>

                        {/* Status Pill */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(r.id)}
                            className="cursor-pointer transition-transform hover:scale-105"
                            title="Click to cycle status"
                          >
                            {r.status === 'APPROVED' ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Approved
                              </span>
                            ) : r.status === 'IN REVIEW' ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                In Review
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                Rejected
                              </span>
                            )}
                          </button>
                        </td>



                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => setEditingReq(r)}
                              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit requirement"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRequirement(r.id)}
                              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete requirement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM STICKY ACTION BAR (Matching Image 2 and Rest of App) */}
      {/* ========================================================================= */}
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-end shrink-0 shadow-xs">


        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              patch(projectId, { requirementsConfirmed: true });
            }}
            className="text-xs font-bold h-9"
          >
            <CheckCheck className="w-3.5 h-3.5 mr-1 text-slate-600" />
            <span>Save Draft</span>
          </Button>

          <Button
            variant="primary"
            onClick={confirm}
            className="px-6 py-2 text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-white shadow-xs cursor-pointer flex items-center gap-1.5 h-9"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SUBMODAL FOR ADDING / EDITING A REQUIREMENT */}
      {/* ========================================================================= */}
      {editingReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {reqs.some(x => x.id === editingReq.id) ? `Edit Requirement (${editingReq.id})` : 'Add Requirement'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingReq(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Requirement ID</label>
                  <Input
                    value={editingReq.id}
                    onChange={e => setEditingReq({ ...editingReq, id: e.target.value })}
                    placeholder="e.g. BR-009"
                    className="text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingReq.category}
                    onChange={e => setEditingReq({ ...editingReq, category: e.target.value as RequirementCategory })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-500"
                  >
                    <option value="business">Business</option>
                    <option value="user">User</option>
                    <option value="functional">Functional</option>
                    <option value="ai">AI</option>
                    <option value="non_functional">Non-Functional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Requirement Statement</label>
                <Textarea
                  rows={3}
                  value={editingReq.statement}
                  onChange={e => setEditingReq({ ...editingReq, statement: e.target.value })}
                  placeholder="Specify clear, verifiable requirement statement..."
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type</label>
                  <select
                    value={editingReq.type}
                    onChange={e => setEditingReq({ ...editingReq, type: e.target.value as RequirementType })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-500"
                  >
                    <option value="Objective">Objective</option>
                    <option value="Rule">Rule</option>
                    <option value="Constraint">Constraint</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={editingReq.priority}
                    onChange={e => setEditingReq({ ...editingReq, priority: e.target.value as RequirementPriority })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-500"
                  >
                    <option value="HIGH">High</option>
                    <option value="MED">Med</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={editingReq.status}
                    onChange={e => setEditingReq({ ...editingReq, status: e.target.value as RequirementStatus })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-500"
                  >
                    <option value="APPROVED">Approved</option>
                    <option value="IN REVIEW">In Review</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Traceability Source</label>
                <Input
                  value={editingReq.source}
                  onChange={e => setEditingReq({ ...editingReq, source: e.target.value })}
                  placeholder="e.g. Mobile Rep Persona, AI OCR Service, Not linked"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingReq(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!editingReq.statement.trim() || !editingReq.id.trim()}
                onClick={() => handleSaveRequirement(editingReq)}
                className="text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-white"
              >
                Save Requirement
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
