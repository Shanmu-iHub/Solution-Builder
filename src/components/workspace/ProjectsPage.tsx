import React, { useState, useMemo } from 'react';
import {
  FileText,
  Code2,
  GraduationCap,
  Layers,
  Plus,
  Search,
  ArrowRight,
  ChevronDown,
  MoreVertical,
  Clock,
  Sparkles,
  BarChart3,
  FileSpreadsheet,
  FileCheck2,
  Copy,
  ExternalLink,
  Trash2,
  Download,
  Share2,
  X,
  Check,
  Filter,
  Eye
} from 'lucide-react';

interface KnowledgeItem {
  id: string;
  name: string;
  type: 'Document' | 'Prompt' | 'Skill';
  platform: string;
  category?: string;
  lastUpdated: string;
  lastUsed?: string;
  fileFormat?: 'pdf' | 'doc' | 'xlsx' | 'txt' | 'code' | 'skill';
  description?: string;
  content?: string;
}

export const ProjectsPage: React.FC = () => {
  // Navigation tabs: 'All' | 'Documents' | 'Prompts' | 'Skills'
  const [activeTab, setActiveTab] = useState<'all' | 'documents' | 'prompts' | 'skills'>('all');
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [platformFilter, setPlatformFilter] = useState('All Platforms');
  const [sortBy, setSortBy] = useState('Recently Updated');

  // Modals & UI States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [newAssetType, setNewAssetType] = useState<'Document' | 'Prompt' | 'Skill'>('Document');
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetPlatform, setNewAssetPlatform] = useState('Solution Builder');
  const [newAssetDescription, setNewAssetDescription] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState<KnowledgeItem | null>(null);

  // Documents Data
  const [documents, setDocuments] = useState<KnowledgeItem[]>([
    {
      id: 'doc-1',
      name: 'Product Requirements.pdf',
      type: 'Document',
      platform: 'Solution Builder',
      lastUpdated: 'Updated 2 days ago',
      lastUsed: '2 hours ago',
      fileFormat: 'pdf',
      description: 'Comprehensive functional and technical specifications for SNS Square ecosystem.'
    },
    {
      id: 'doc-2',
      name: 'Meeting Notes Template',
      type: 'Document',
      platform: 'AI Meeting Notes',
      lastUpdated: 'Updated 5 days ago',
      lastUsed: '2 days ago',
      fileFormat: 'doc',
      description: 'Standardized layout for capturing executive action items and transcript summaries.'
    },
    {
      id: 'doc-3',
      name: 'Customer Data.xlsx',
      type: 'Document',
      platform: 'AI Sheet',
      lastUpdated: 'Updated 1 week ago',
      lastUsed: '4 days ago',
      fileFormat: 'xlsx',
      description: 'Anonymized client metrics, usage telemetry, and segment cohorts.'
    },
    {
      id: 'doc-4',
      name: 'Q3 Business Plan.pdf',
      type: 'Document',
      platform: 'Solution Builder',
      lastUpdated: 'Updated 2 weeks ago',
      lastUsed: '2 hours ago',
      fileFormat: 'pdf',
      description: 'Strategic roadmap, OKRs, and market expansion targets for Q3.'
    },
    {
      id: 'doc-5',
      name: 'Project Kickoff Notes',
      type: 'Document',
      platform: 'AI Meeting Notes',
      lastUpdated: 'Updated 3 weeks ago',
      lastUsed: '2 days ago',
      fileFormat: 'doc',
      description: 'Sprint zero discovery insights and cross-functional team assignments.'
    }
  ]);

  // Prompts Data
  const [prompts, setPrompts] = useState<KnowledgeItem[]>([
    {
      id: 'prm-1',
      name: 'Market Analysis Prompt',
      type: 'Prompt',
      platform: 'Research & Planning',
      lastUpdated: 'Updated 3 days ago',
      lastUsed: '5 hours ago',
      fileFormat: 'code',
      description: 'Structured framework for analyzing competitive moat, TAM, and pricing elasticity.'
    },
    {
      id: 'prm-2',
      name: 'Solution Design Prompt',
      type: 'Prompt',
      platform: 'Solution Builder',
      lastUpdated: 'Updated 1 week ago',
      lastUsed: '1 week ago',
      fileFormat: 'code',
      description: 'System architecture prompt for generating clean 5-tier microservices diagrams.'
    },
    {
      id: 'prm-3',
      name: 'Email Draft Prompt',
      type: 'Prompt',
      platform: 'AI Mail',
      lastUpdated: 'Updated 1 week ago',
      lastUsed: '3 days ago',
      fileFormat: 'code',
      description: 'High-converting enterprise outbound follow-up with value hook & clear CTA.'
    },
    {
      id: 'prm-4',
      name: 'Competitor Analysis Prompt',
      type: 'Prompt',
      platform: 'Research',
      lastUpdated: 'Updated 2 weeks ago',
      lastUsed: '5 hours ago',
      fileFormat: 'code',
      description: 'Comparative feature matrix generation and positioning teardown.'
    },
    {
      id: 'prm-5',
      name: 'Customer Follow-up Prompt',
      type: 'Prompt',
      platform: 'AI Mail',
      lastUpdated: 'Updated 3 weeks ago',
      lastUsed: '3 days ago',
      fileFormat: 'code',
      description: 'Warm touchpoint prompt acknowledging recent product onboarding milestone.'
    }
  ]);

  // Skills Data
  const [skills, setSkills] = useState<KnowledgeItem[]>([
    {
      id: 'skl-1',
      name: 'Data Analysis',
      type: 'Skill',
      platform: 'Analytics',
      lastUpdated: 'Updated 4 days ago',
      lastUsed: '1 day ago',
      fileFormat: 'skill',
      description: 'Automatic statistical anomaly detection, correlation matrix, and trend forecast.'
    },
    {
      id: 'skl-2',
      name: 'Document Summarization',
      type: 'Skill',
      platform: 'Productivity',
      lastUpdated: 'Updated 1 week ago',
      lastUsed: '3 days ago',
      fileFormat: 'skill',
      description: 'High-density multi-page synthesis preserving core numbers and decision items.'
    },
    {
      id: 'skl-3',
      name: 'Content Generation',
      type: 'Skill',
      platform: 'Content',
      lastUpdated: 'Updated 2 weeks ago',
      lastUsed: '1 week ago',
      fileFormat: 'skill',
      description: 'Brand-aligned technical copy, landing page hooks, and developer docs.'
    },
    {
      id: 'skl-4',
      name: 'Data Visualization',
      type: 'Skill',
      platform: 'AI Sheet',
      lastUpdated: 'Updated 2 weeks ago',
      lastUsed: '1 day ago',
      fileFormat: 'skill',
      description: 'Transform tabular data into interactive Vega-Lite & Chart.js specifications.'
    }
  ]);

  // Filtered lists based on search and filters
  const filterList = (items: KnowledgeItem[]) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesPlatform = platformFilter === 'All Platforms' || item.platform.toLowerCase().includes(platformFilter.toLowerCase());
      return matchesSearch && matchesPlatform;
    });
  };

  const filteredDocs = useMemo(() => filterList(documents), [documents, searchQuery, platformFilter]);
  const filteredPrompts = useMemo(() => filterList(prompts), [prompts, searchQuery, platformFilter]);
  const filteredSkills = useMemo(() => filterList(skills), [skills, searchQuery, platformFilter]);

  // Combined Recently Used Table items
  const recentlyUsedItems: KnowledgeItem[] = useMemo(() => {
    const rawItems: KnowledgeItem[] = [
      {
        id: 'rec-1',
        name: 'Q3 Business Plan.pdf',
        type: 'Document',
        platform: 'Solution Builder',
        lastUpdated: 'Updated 2 days ago',
        lastUsed: '2 hours ago',
        fileFormat: 'pdf'
      },
      {
        id: 'rec-2',
        name: 'Competitor Analysis Prompt',
        type: 'Prompt',
        platform: 'Research',
        lastUpdated: 'Updated 3 days ago',
        lastUsed: '5 hours ago',
        fileFormat: 'code'
      },
      {
        id: 'rec-3',
        name: 'Data Visualization',
        type: 'Skill',
        platform: 'AI Sheet',
        lastUpdated: 'Updated 1 week ago',
        lastUsed: '1 day ago',
        fileFormat: 'skill'
      },
      {
        id: 'rec-4',
        name: 'Project Kickoff Notes',
        type: 'Document',
        platform: 'AI Meeting Notes',
        lastUpdated: 'Updated 5 days ago',
        lastUsed: '2 days ago',
        fileFormat: 'doc'
      },
      {
        id: 'rec-5',
        name: 'Customer Follow-up Prompt',
        type: 'Prompt',
        platform: 'AI Mail',
        lastUpdated: 'Updated 1 week ago',
        lastUsed: '3 days ago',
        fileFormat: 'code'
      }
    ];
    return rawItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All Types' || item.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesPlatform = platformFilter === 'All Platforms' || item.platform.toLowerCase().includes(platformFilter.toLowerCase());
      return matchesSearch && matchesType && matchesPlatform;
    });
  }, [searchQuery, typeFilter, platformFilter]);

  const totalAssetsCount = documents.length + prompts.length + skills.length;

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;

    const newItem: KnowledgeItem = {
      id: `${newAssetType.toLowerCase()}-${Date.now()}`,
      name: newAssetName,
      type: newAssetType,
      platform: newAssetPlatform,
      lastUpdated: 'Updated just now',
      lastUsed: 'Just now',
      description: newAssetDescription || 'Custom knowledge asset created in SNS Square workspace.',
      fileFormat: newAssetType === 'Document' ? 'pdf' : newAssetType === 'Prompt' ? 'code' : 'skill'
    };

    if (newAssetType === 'Document') {
      setDocuments(prev => [newItem, ...prev]);
    } else if (newAssetType === 'Prompt') {
      setPrompts(prev => [newItem, ...prev]);
    } else {
      setSkills(prev => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
    setNewAssetName('');
    setNewAssetDescription('');
  };

  const handleCopyLink = (id: string, name: string) => {
    navigator.clipboard?.writeText(`https://snssquare.ai/kb/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteItem = (id: string, type: string) => {
    if (type === 'Document') setDocuments(prev => prev.filter(d => d.id !== id));
    if (type === 'Prompt') setPrompts(prev => prev.filter(p => p.id !== id));
    if (type === 'Skill') setSkills(prev => prev.filter(s => s.id !== id));
    setActiveActionMenuId(null);
  };

  // Helper for rendering format icon
  const renderFormatIcon = (format?: string, type?: string) => {
    if (format === 'pdf') {
      return (
        <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex flex-col items-center justify-center font-bold text-[10px] tracking-tighter shrink-0 shadow-xs">
          <span>PDF</span>
        </div>
      );
    }
    if (format === 'doc') {
      return (
        <div className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <FileText className="w-5 h-5 text-white" />
        </div>
      );
    }
    if (format === 'xlsx') {
      return (
        <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <FileSpreadsheet className="w-5 h-5 text-white" />
        </div>
      );
    }
    if (type === 'Prompt' || format === 'code') {
      return (
        <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center shrink-0 border border-[#6366F1]/20">
          <Code2 className="w-5 h-5 text-[#6366F1]" />
        </div>
      );
    }
    if (type === 'Skill' || format === 'skill') {
      return (
        <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/60">
          <GraduationCap className="w-5 h-5 text-teal-600" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 pt-2 select-none" onClick={() => {
      if (isAddDropdownOpen) setIsAddDropdownOpen(false);
      if (activeActionMenuId) setActiveActionMenuId(null);
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. HERO HEADER SECTION */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100/60 border border-slate-200/80 p-7 sm:p-9 shadow-xs">
          {/* Subtle Architectural Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                KNOWLEDGE BASE
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Your Knowledge.<br className="hidden sm:inline" /> Always at Hand.
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                Store and manage your documents, prompts, skills and other assets used across SNS Square. Keep everything organized, reusable and accessible.
              </p>
            </div>

            {/* Right Architectural 3D Graphic & Banner */}
            <div className="relative shrink-0 flex items-center justify-end">
              <div className="relative w-72 sm:w-80 h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-br from-slate-200/80 via-slate-100 to-slate-300/60 border border-slate-300/60 flex items-center justify-end p-5 shadow-xs">
                {/* 3D Geometric Polygonal Background Shapes */}
                <div className="absolute -right-8 -top-8 w-44 h-44 bg-slate-400/20 rounded-full blur-xl pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-slate-200/90 to-transparent transform -skew-x-12" />
                
                {/* Overlay Text Tag */}
                <div className="relative z-10 text-right max-w-[160px] space-y-2">
                  <p className="text-xs font-semibold text-slate-700 leading-snug">
                    Reusable Knowledge for Greater Impact
                  </p>
                  <div className="w-8 h-1 bg-slate-800 rounded-full ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS ROW (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1: Documents */}
          <div
            onClick={() => setActiveTab('documents')}
            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Documents</div>
                <div className="text-xl font-bold text-slate-900 tracking-tight">{documents.length}</div>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-700 group-hover:bg-slate-100 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stat 2: Prompts */}
          <div
            onClick={() => setActiveTab('prompts')}
            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Prompts</div>
                <div className="text-xl font-bold text-slate-900 tracking-tight">{prompts.length}</div>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-700 group-hover:bg-slate-100 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stat 3: Skills */}
          <div
            onClick={() => setActiveTab('skills')}
            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Skills</div>
                <div className="text-xl font-bold text-slate-900 tracking-tight">{skills.length}</div>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-700 group-hover:bg-slate-100 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stat 4: Total Assets */}
          <div
            onClick={() => setActiveTab('all')}
            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500">Total Assets</div>
                <div className="text-xl font-bold text-slate-900 tracking-tight">{totalAssetsCount}</div>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-700 group-hover:bg-slate-100 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 3. TABS BAR & + ADD NEW BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/90 pb-3">
          {/* Left Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'text-[#0F172A]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>All</span>
              {activeTab === 'all' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'documents'
                  ? 'text-[#0F172A]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
              {activeTab === 'documents' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'prompts'
                  ? 'text-[#0F172A]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Prompts</span>
              {activeTab === 'prompts' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'skills'
                  ? 'text-[#0F172A]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Skills</span>
              {activeTab === 'skills' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full" />
              )}
            </button>
          </div>

          {/* Right "+ Add New" Dropdown Button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAddDropdownOpen(prev => !prev);
              }}
              className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isAddDropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1.5 z-50 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  onClick={() => {
                    setNewAssetType('Document');
                    setIsAddDropdownOpen(false);
                    setIsAddModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Upload Document</span>
                </button>
                <button
                  onClick={() => {
                    setNewAssetType('Prompt');
                    setIsAddDropdownOpen(false);
                    setIsAddModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <span>Create Prompt</span>
                </button>
                <button
                  onClick={() => {
                    setNewAssetType('Skill');
                    setIsAddDropdownOpen(false);
                    setIsAddModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <span>Define Skill</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. SEARCH AND FILTERS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, prompts, skills..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter 1: All Types */}
          <div className="md:col-span-2 relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-400 shadow-2xs appearance-none cursor-pointer pr-8"
            >
              <option value="All Types">All Types</option>
              <option value="Document">Documents</option>
              <option value="Prompt">Prompts</option>
              <option value="Skill">Skills</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter 2: All Platforms */}
          <div className="md:col-span-2 relative">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-400 shadow-2xs appearance-none cursor-pointer pr-8"
            >
              <option value="All Platforms">All Platforms</option>
              <option value="Solution Builder">Solution Builder</option>
              <option value="AI Meeting Notes">AI Meeting Notes</option>
              <option value="AI Sheet">AI Sheet</option>
              <option value="AI Mail">AI Mail</option>
              <option value="Research & Planning">Research & Planning</option>
              <option value="Analytics">Analytics</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter 3: Sort by */}
          <div className="md:col-span-2 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 font-medium focus:outline-none focus:border-slate-400 shadow-2xs appearance-none cursor-pointer pr-8"
            >
              <option value="Recently Updated">Sort by</option>
              <option value="Recently Updated">Recently Updated</option>
              <option value="Alphabetical">Alphabetical (A-Z)</option>
              <option value="Recently Used">Most Used</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 5. SECTION: DOCUMENTS */}
        {(activeTab === 'all' || activeTab === 'documents') && (
          <section className="space-y-3 pt-2">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-700">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Documents</h2>
                  <p className="text-xs text-slate-500">Store and manage your important files, reports, templates and more.</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('documents')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3-Column Document Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredDocs.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedItemDetail(doc)}
                  className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {renderFormatIcon(doc.fileFormat, doc.type)}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate pt-0.5">
                          {doc.platform}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionMenuId(activeActionMenuId === doc.id ? null : doc.id);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeActionMenuId === doc.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1 z-50 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100"
                        >
                          <button
                            onClick={() => handleCopyLink(doc.id, doc.name)}
                            className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>{copiedId === doc.id ? 'Copied!' : 'Copy Link'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem(doc.id, 'Document')}
                            className="w-full px-3 py-1.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-400 font-normal">
                    {doc.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. SECTION: PROMPTS */}
        {(activeTab === 'all' || activeTab === 'prompts') && (
          <section className="space-y-3 pt-3">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Prompts</h2>
                  <p className="text-xs text-slate-500">Save and reuse effective prompts across your workflows.</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('prompts')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3-Column Prompt Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPrompts.slice(0, 3).map((prm) => (
                <div
                  key={prm.id}
                  onClick={() => setSelectedItemDetail(prm)}
                  className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {renderFormatIcon(prm.fileFormat, prm.type)}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {prm.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate pt-0.5">
                          {prm.platform}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionMenuId(activeActionMenuId === prm.id ? null : prm.id);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeActionMenuId === prm.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1 z-50 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100"
                        >
                          <button
                            onClick={() => handleCopyLink(prm.id, prm.name)}
                            className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>{copiedId === prm.id ? 'Copied!' : 'Copy Prompt'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem(prm.id, 'Prompt')}
                            className="w-full px-3 py-1.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-400 font-normal">
                    {prm.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. SECTION: SKILLS */}
        {(activeTab === 'all' || activeTab === 'skills') && (
          <section className="space-y-3 pt-3">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-700">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Skills</h2>
                  <p className="text-xs text-slate-500">Manage your custom skills and reusable capabilities.</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('skills')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3-Column Skill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredSkills.slice(0, 3).map((skl, idx) => {
                const getSkillVisual = () => {
                  if (idx === 0) {
                    return (
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                      </div>
                    );
                  }
                  if (idx === 1) {
                    return (
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/60">
                        <FileCheck2 className="w-5 h-5 text-teal-600" />
                      </div>
                    );
                  }
                  return (
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200/60">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                    </div>
                  );
                };

                return (
                  <div
                    key={skl.id}
                    onClick={() => setSelectedItemDetail(skl)}
                    className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {getSkillVisual()}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                            {skl.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 truncate pt-0.5">
                            {skl.platform}
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionMenuId(activeActionMenuId === skl.id ? null : skl.id);
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeActionMenuId === skl.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1 z-50 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-100"
                          >
                            <button
                              onClick={() => handleCopyLink(skl.id, skl.name)}
                              className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>{copiedId === skl.id ? 'Copied!' : 'Copy Skill'}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteItem(skl.id, 'Skill')}
                              className="w-full px-3 py-1.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-400 font-normal">
                      {skl.lastUpdated}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 8. SECTION: RECENTLY USED (Table) */}
        <section className="space-y-3 pt-3">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-700">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recently Used</h2>
                <p className="text-xs text-slate-500">Quick access to your recent documents, prompts and skills.</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('all')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Name</th>
                    <th className="py-3 px-4 font-semibold">Type</th>
                    <th className="py-3 px-4 font-semibold">Platform / Feature</th>
                    <th className="py-3 px-4 font-semibold">Last Used</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {recentlyUsedItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItemDetail(item)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Name Column with Icon */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {renderFormatIcon(item.fileFormat, item.type)}
                          <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3 px-4 text-slate-600">
                        {item.type}
                      </td>

                      {/* Platform / Feature */}
                      <td className="py-3 px-4 text-slate-600">
                        {item.platform}
                      </td>

                      {/* Last Used */}
                      <td className="py-3 px-4 text-slate-500 font-normal">
                        {item.lastUsed || 'Recently'}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(item.id, item.name);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center justify-center cursor-pointer"
                          title="Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL: ADD NEW ASSET */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Add New {newAssetType}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder={newAssetType === 'Document' ? 'e.g. Architecture Spec.pdf' : newAssetType === 'Prompt' ? 'e.g. Code Review Prompt' : 'e.g. Data Anomaly Hunter'}
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Platform / Feature</label>
                <select
                  value={newAssetPlatform}
                  onChange={(e) => setNewAssetPlatform(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400"
                >
                  <option value="Solution Builder">Solution Builder</option>
                  <option value="AI Meeting Notes">AI Meeting Notes</option>
                  <option value="AI Sheet">AI Sheet</option>
                  <option value="AI Mail">AI Mail</option>
                  <option value="Research & Planning">Research & Planning</option>
                  <option value="Analytics">Analytics</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description / Content</label>
                <textarea
                  rows={3}
                  placeholder="Provide context, prompt template or capability instructions..."
                  value={newAssetDescription}
                  onChange={(e) => setNewAssetDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Create Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ITEM DETAIL DRAWER */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                {renderFormatIcon(selectedItemDetail.fileFormat, selectedItemDetail.type)}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedItemDetail.name}</h3>
                  <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-500">
                    <span>{selectedItemDetail.type}</span>
                    <span>•</span>
                    <span>{selectedItemDetail.platform}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                <span className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider block">Description</span>
                <p className="text-slate-700 leading-relaxed">{selectedItemDetail.description || 'Enterprise asset verified across SNS Square workflows.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Last Modified</span>
                  <span className="text-xs font-semibold text-slate-800">{selectedItemDetail.lastUpdated}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Recency</span>
                  <span className="text-xs font-semibold text-slate-800">{selectedItemDetail.lastUsed || 'Recent'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => handleCopyLink(selectedItemDetail.id, selectedItemDetail.name)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === selectedItemDetail.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === selectedItemDetail.id ? 'Copied!' : 'Share Link'}</span>
              </button>

              <button
                onClick={() => setSelectedItemDetail(null)}
                className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectsPage;
