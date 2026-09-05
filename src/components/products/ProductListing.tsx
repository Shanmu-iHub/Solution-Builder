import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ProductId } from '../../types';
import {
  Search,
  ArrowRight,
  LayoutGrid,
  List,
  Coins,
  Activity,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  BarChart2,
  FileText,
  FlaskConical,
  Infinity as InfinityIcon,
  Layers,
  ChevronRight
} from 'lucide-react';

interface OperationalProduct {
  id: ProductId;
  name: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  iconText: string;
  iconBorder: string;
}

export const ProductListing: React.FC = () => {
  const { navigateToProduct, setCurrentView } = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 7 Core Operational Products exactly matching the reference design
  const operationalProducts: OperationalProduct[] = [
    {
      id: 'finops',
      name: 'FinOps',
      desc: 'Monitor, manage and optimize your technology and AI costs.',
      icon: <Coins className="w-5 h-5" />,
      iconBg: 'bg-cyan-50/90',
      iconText: 'text-cyan-700',
      iconBorder: 'border-cyan-200/60'
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      desc: 'Monitor applications, agents, workflows and infrastructure in real time.',
      icon: <Activity className="w-5 h-5" />,
      iconBg: 'bg-sky-50/90',
      iconText: 'text-sky-700',
      iconBorder: 'border-sky-200/60'
    },
    {
      id: 'testing',
      name: 'Testing',
      desc: 'Test and validate your solutions with AI-powered testing capabilities.',
      icon: <FlaskConical className="w-5 h-5" />,
      iconBg: 'bg-purple-50/90',
      iconText: 'text-purple-700',
      iconBorder: 'border-purple-200/60'
    },
    {
      id: 'devops',
      name: 'DevOps',
      desc: 'Build, deploy and operate faster with integrated DevOps tools.',
      icon: <InfinityIcon className="w-5 h-5" />,
      iconBg: 'bg-orange-50/90',
      iconText: 'text-orange-700',
      iconBorder: 'border-orange-200/60'
    },
    {
      id: 'compliance',
      name: 'Compliance',
      desc: 'Manage regulatory compliance and policy requirements efficiently.',
      icon: <ShieldCheck className="w-5 h-5" />,
      iconBg: 'bg-emerald-50/90',
      iconText: 'text-emerald-700',
      iconBorder: 'border-emerald-200/60'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      desc: 'Analyze platform, business and operational data to drive insights.',
      icon: <BarChart2 className="w-5 h-5" />,
      iconBg: 'bg-amber-50/90',
      iconText: 'text-amber-700',
      iconBorder: 'border-amber-200/60'
    },
    {
      id: 'audit',
      name: 'Audit',
      desc: 'Track, review and audit activities across your enterprise.',
      icon: <FileText className="w-5 h-5" />,
      iconBg: 'bg-rose-50/90',
      iconText: 'text-rose-700',
      iconBorder: 'border-rose-200/60'
    }
  ];

  const filteredProducts = operationalProducts.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in w-full pb-12 select-none">
      
      {/* ========================================================================= */}
      {/* 1 & 2. Top Header Hero Card with Integrated Breadcrumb matching Image 2 */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#F8FAFC] via-[#F1F5FB] to-[#E6F0FA] border border-slate-200/90 p-6 sm:p-9 lg:p-10 overflow-hidden shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Geometric Crystal 3D Facets Illustration matching Image 2 */}
        <div className="absolute right-36 lg:right-56 top-0 bottom-0 w-80 lg:w-96 pointer-events-none hidden md:flex items-center justify-center opacity-85">
          <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="crystalTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="crystalLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="crystalRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="crystalBack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Background wireframe / soft facet polygons */}
            <polygon points="120,40 220,10 280,60 180,90" fill="url(#crystalBack)" stroke="#93C5FD" strokeWidth="0.75" strokeOpacity="0.6" />
            <polygon points="280,60 340,110 240,160 180,90" fill="url(#crystalBack)" stroke="#93C5FD" strokeWidth="0.75" strokeOpacity="0.6" />
            <polygon points="60,110 160,80 220,130 120,160" fill="url(#crystalBack)" stroke="#93C5FD" strokeWidth="0.75" strokeOpacity="0.5" />

            {/* Main Central 3D Crystal Cube */}
            <g transform="translate(140, 45)">
              {/* Top Face */}
              <polygon points="60,10 110,35 60,60 10,35" fill="url(#crystalTop)" stroke="#BFDBFE" strokeWidth="1" />
              {/* Left Face */}
              <polygon points="10,35 60,60 60,120 10,95" fill="url(#crystalLeft)" stroke="#60A5FA" strokeWidth="1" />
              {/* Right Face */}
              <polygon points="60,60 110,35 110,95 60,120" fill="url(#crystalRight)" stroke="#93C5FD" strokeWidth="1" />
            </g>

            {/* Secondary Floating Crystal Facet */}
            <g transform="translate(60, 85) scale(0.65)">
              <polygon points="60,10 110,35 60,60 10,35" fill="url(#crystalTop)" stroke="#BFDBFE" strokeWidth="0.75" />
              <polygon points="10,35 60,60 60,120 10,95" fill="url(#crystalLeft)" stroke="#60A5FA" strokeWidth="0.75" />
              <polygon points="60,60 110,35 110,95 60,120" fill="url(#crystalRight)" stroke="#93C5FD" strokeWidth="0.75" />
            </g>

            {/* Accent Glowing Dots & Lines */}
            <circle cx="150" cy="80" r="2.5" fill="#3B82F6" />
            <circle cx="250" cy="80" r="2.5" fill="#60A5FA" />
            <circle cx="200" cy="165" r="2.5" fill="#2563EB" />
          </svg>
        </div>

        {/* Left: Integrated Breadcrumb + Title + Subtitle */}
        <div className="relative z-10 max-w-xl">
          {/* Catchy Breadcrumb Navigation inside Hero matching Image 2 */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5 font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#0F172A]">Products</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B132B] tracking-tight leading-tight">
            Products
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-2 font-normal leading-relaxed max-w-lg">
            Explore SNS Square products to monitor, manage, optimize and govern your operations.
          </p>
        </div>

        {/* Right: Quote Box matching Image 2 with vertical line and divider */}
        <div className="relative z-10 flex items-start gap-3.5 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xs sm:self-center shrink-0">
          <div className="w-[3.5px] self-stretch bg-gradient-to-b from-[#0066FF] via-[#2563EB] to-[#38BDF8] rounded-full shrink-0" />
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#0F172A] tracking-wider leading-snug uppercase font-sans">
              INTELLIGENCE<br />
              FOR A MORE<br />
              EFFICIENT TOMORROW
            </div>
            <div className="w-9 h-[1.5px] bg-slate-300/90 my-1.5 rounded-full" />
            <div className="text-[9.5px] font-bold text-slate-500 tracking-widest uppercase">
              MONITOR · OPTIMIZE · GOVERN
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Search Bar */}
      {/* ========================================================================= */}
      <div className="relative w-full">
        <div className="flex items-center bg-white rounded-xl border border-slate-200/90 shadow-2xs px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 outline-none font-normal bg-transparent"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. "All Products" Section Bar & Layout Switcher */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
          All Products
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#64748B] font-medium">
            {filteredProducts.length} products
          </span>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 gap-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. Products Grid / List Display matching mockup */}
      {/* ========================================================================= */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => navigateToProduct(product.id)}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Soft Pastel Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl ${product.iconBg} ${product.iconText} border ${product.iconBorder} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                >
                  {product.icon}
                </div>

                {/* Product Title */}
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1">
                  {product.name}
                </h3>

                {/* Product Description */}
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-5 flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                <span>Explore {product.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => navigateToProduct(product.id)}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl ${product.iconBg} ${product.iconText} border ${product.iconBorder} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  {product.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#64748B] font-normal truncate mt-0.5">
                    {product.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] shrink-0 ml-4">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No products found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

