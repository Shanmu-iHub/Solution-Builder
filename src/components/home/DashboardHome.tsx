import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import {
  Sparkles,
  ArrowRight,
  Folder,
  Bot,
  Coins,
  Activity,
  Box,
  Store,
  LayoutGrid,
  BarChart2,
  Headphones,
  Share2,
  FileText,
  MoreHorizontal,
  Layers
} from 'lucide-react';

interface WorkItem {
  id: string;
  name: string;
  desc: string;
  type: 'Solution' | 'Agent' | 'Project';
  typeColor: string;
  lastUpdated: string;
  status: 'In Progress' | 'Review' | 'Completed';
  statusColor: string;
  icon: React.ReactNode;
  routeType: 'product' | 'agent' | 'service';
  routeId: string;
}

export const DashboardHome: React.FC = () => {
  const {
    navigateToProduct,
    navigateToService,
    navigateToAgent,
    setCurrentView
  } = useNavigation();

  const [promptText, setPromptText] = useState('');
  const [activeTab, setActiveTab] = useState<'solutions' | 'agents' | 'projects'>('solutions');

  const promptSuggestions = [
    'Build a customer onboarding platform',
    'Automate IT helpdesk',
    'Create a sales analytics dashboard'
  ];

  const workItems: WorkItem[] = [
    {
      id: 'item-1',
      name: 'Retail Analytics Platform',
      desc: 'End-to-end retail insights solution',
      type: 'Solution',
      typeColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
      lastUpdated: '2 hours ago',
      status: 'In Progress',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
      icon: <Box className="w-4 h-4 text-slate-700" />,
      routeType: 'product',
      routeId: 'solution-architect'
    },
    {
      id: 'item-2',
      name: 'IT Helpdesk Automation',
      desc: 'Automated ticket resolution system',
      type: 'Agent',
      typeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      lastUpdated: '5 hours ago',
      status: 'Review',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
      icon: <Headphones className="w-4 h-4 text-slate-700" />,
      routeType: 'agent',
      routeId: 'call-for-me'
    },
    {
      id: 'item-3',
      name: 'Supply Chain Optimizer',
      desc: 'Inventory and demand optimization',
      type: 'Project',
      typeColor: 'bg-slate-100 text-slate-700 border-slate-200/60',
      lastUpdated: '1 day ago',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      icon: <Share2 className="w-4 h-4 text-slate-700" />,
      routeType: 'product',
      routeId: 'solution-factor'
    },
    {
      id: 'item-4',
      name: 'Customer Onboarding',
      desc: 'KYC and account setup automation',
      type: 'Solution',
      typeColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
      lastUpdated: '2 days ago',
      status: 'In Progress',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
      icon: <FileText className="w-4 h-4 text-slate-700" />,
      routeType: 'product',
      routeId: 'solution-architect'
    }
  ];

  // Filter items according to the active tab
  const filteredWorkItems = workItems.filter(item => {
    if (activeTab === 'solutions') return item.type === 'Solution' || true;
    if (activeTab === 'agents') return item.type === 'Agent';
    if (activeTab === 'projects') return item.type === 'Project';
    return true;
  });

  const handleBuildPrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) {
      navigateToProduct('solution-architect');
    } else {
      navigateToProduct('solution-architect');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in w-full pb-12 select-none">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Minimal Colors, Soft Ice-Blue Ambient Gradient, Full Width) */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-[#F3F7FC] to-[#E9F1FA] border border-slate-200/80 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs w-full">
        
        {/* Decorative Floating Glass Graphic on the Right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden md:flex items-center justify-end pr-8 lg:pr-16">
          <div className="relative w-80 lg:w-96 h-64 flex items-center justify-center">
            {/* Background blur orb */}
            <div className="absolute w-56 h-56 rounded-full bg-blue-400/10 blur-2xl" />
            
            {/* Floating Glass Panel 1: Ideas to Impact */}
            <div className="absolute top-4 right-10 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/90 shadow-lg w-48 rotate-[-4deg] animate-float">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                IDEAS TO IMPACT
              </span>
              <div className="w-8 h-1 bg-blue-500 rounded-full my-2" />
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Box className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-2 bg-slate-200 rounded" />
                  <div className="w-10 h-1.5 bg-slate-100 rounded" />
                </div>
              </div>
            </div>

            {/* Floating Mini Card: Metric */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white shadow-md flex items-center gap-2.5 rotate-[3deg]">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BarChart2 className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1">
                <div className="w-12 h-2 bg-slate-300 rounded" />
                <div className="w-8 h-1.5 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Floating Category Badges */}
            <div className="absolute right-2 bottom-8 flex flex-col gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider">
              <span className="px-2 py-0.5 rounded-md bg-white/60 backdrop-blur-xs border border-white/80">AGENTS</span>
              <span className="px-2 py-0.5 rounded-md bg-white/60 backdrop-blur-xs border border-white/80">SOLUTIONS</span>
              <span className="px-2 py-0.5 rounded-md bg-white/60 backdrop-blur-xs border border-white/80">SERVICES</span>
              <span className="px-2 py-0.5 rounded-md bg-white/60 backdrop-blur-xs border border-white/80">PRODUCTS</span>
            </div>
          </div>
        </div>

        {/* Hero Left Content */}
        <div className="relative z-10 max-w-xl">
          {/* Overline Tag */}
          <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#64748B] tracking-widest uppercase mb-3">
            <span>BUILD</span>
            <span>·</span>
            <span>AUTOMATE</span>
            <span>·</span>
            <span>SCALE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
            Your ideas. <br />
            <span className="text-[#0F172A]">Amplified by AI.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#64748B] mt-3 font-normal leading-relaxed max-w-md">
            SNS Square helps you design, build, deploy and operate enterprise solutions with AI agents, services and products.
          </p>

          {/* Interactive AI Prompt Input */}
          <form onSubmit={handleBuildPrompt} className="mt-6">
            <div className="flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm p-1.5 pl-3.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Sparkles className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                placeholder="Describe what you want to build..."
                className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 outline-none font-normal bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 transition-all shadow-xs cursor-pointer ml-2"
              >
                <span>Build with AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Prompt Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {promptSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptText(suggestion);
                  navigateToProduct('solution-architect');
                }}
                className="text-[11px] text-[#475569] hover:text-[#0F172A] bg-white/90 hover:bg-white border border-slate-200/80 rounded-full px-3 py-1 transition-all cursor-pointer shadow-2xs font-normal"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Hero Bottom Tag */}
          <div className="mt-8 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            SECURE · SCALABLE · ENTERPRISE READY
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. METRIC KPI STATS BAR (Minimal Clean 4-Cards Row) */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* Stat 1: Active Projects */}
          <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 lg:pt-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0F172A] leading-tight">12</div>
              <div className="text-xs text-[#64748B] font-normal">Active Projects</div>
            </div>
          </div>

          {/* Stat 2: Deployed Agents */}
          <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 lg:pt-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0F172A] leading-tight">28</div>
              <div className="text-xs text-[#64748B] font-normal">Deployed Agents</div>
            </div>
          </div>

          {/* Stat 3: Credits Remaining */}
          <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 lg:pt-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0F172A] leading-tight">4,850</div>
              <div className="text-xs text-[#64748B] font-normal">Credits Remaining</div>
            </div>
          </div>

          {/* Stat 4: Platform Uptime */}
          <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 lg:pt-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0F172A] leading-tight">99.9%</div>
              <div className="text-xs text-[#64748B] font-normal">Platform Uptime</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "Explore SNS Square" 4-CARDS GRID */}
      {/* ========================================================================= */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Explore SNS Square
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-normal">
            Everything you need to build, operate and scale with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Build and Create */}
          <button
            onClick={() => navigateToProduct('solution-architect')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                Build and Create
              </h3>
              <p className="text-xs text-[#64748B] mt-1 font-normal leading-relaxed">
                Solutions, agents and full-stack development with AI.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

          {/* Card 2: Marketplace */}
          <button
            onClick={() => navigateToProduct('ai-models')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                Marketplace
              </h3>
              <p className="text-xs text-[#64748B] mt-1 font-normal leading-relaxed">
                Discover templates, agents and solutions.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

          {/* Card 3: AI Services */}
          <button
            onClick={() => setCurrentView('services')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                AI Services
              </h3>
              <p className="text-xs text-[#64748B] mt-1 font-normal leading-relaxed">
                Ready-to-use AI capabilities for your business.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

          {/* Card 4: Products */}
          <button
            onClick={() => setCurrentView('products')}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                Products
              </h3>
              <p className="text-xs text-[#64748B] mt-1 font-normal leading-relaxed">
                Monitor, analyze and optimize your operations.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Continue Your Work" TABLE SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
              Continue Your Work
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-normal">
              Pick up where you left off and keep building.
            </p>
          </div>

          {/* Filter Tabs matching mockup */}
          <div className="flex items-center gap-4 text-xs border-b sm:border-b-0 border-slate-200">
            <button
              onClick={() => setActiveTab('solutions')}
              className={`pb-1 sm:pb-0.5 font-medium transition-colors cursor-pointer relative ${
                activeTab === 'solutions'
                  ? 'text-[#0F172A] font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-[#2563EB]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Recent Solutions
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`pb-1 sm:pb-0.5 font-medium transition-colors cursor-pointer relative ${
                activeTab === 'agents'
                  ? 'text-[#0F172A] font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-[#2563EB]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Recent Agents
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-1 sm:pb-0.5 font-medium transition-colors cursor-pointer relative ${
                activeTab === 'projects'
                  ? 'text-[#0F172A] font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-[#2563EB]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Recent Projects
            </button>
            <button
              onClick={() => setCurrentView('projects')}
              className="text-xs text-[#64748B] hover:text-[#2563EB] flex items-center gap-1 font-medium transition-colors cursor-pointer ml-2"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clean Work Items Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-[#64748B] bg-slate-50/50">
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Last Updated</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkItems.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (item.routeType === 'product') navigateToProduct(item.routeId as any);
                      else if (item.routeType === 'agent') navigateToAgent(item.routeId as any);
                      else if (item.routeType === 'service') navigateToService(item.routeId as any);
                    }}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    {/* Name Column */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-center shrink-0 group-hover:border-blue-300 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-tight">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#64748B] font-normal leading-tight mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type Column */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${item.typeColor}`}>
                        {item.type}
                      </span>
                    </td>

                    {/* Last Updated Column */}
                    <td className="py-3 px-4 text-[#64748B] font-normal whitespace-nowrap">
                      {item.lastUpdated}
                    </td>

                    {/* Status Column */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Action Column */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (item.routeType === 'product') navigateToProduct(item.routeId as any);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
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
  );
};

