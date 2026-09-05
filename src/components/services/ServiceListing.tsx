import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ServiceId } from '../../types';
import {
  Search,
  ArrowRight,
  LayoutGrid,
  List,
  MessageSquare,
  Image as ImageIcon,
  Film,
  Music,
  Mic,
  Radio,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface AIServiceItem {
  id: ServiceId;
  name: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  iconText: string;
  iconBorder: string;
  badge?: string;
}

export const ServiceListing: React.FC = () => {
  const { navigateToService, setCurrentView } = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Core Generative AI Services
  const aiServices: AIServiceItem[] = [
    {
      id: 'ai-chat',
      name: 'AI Chat',
      desc: 'Conversational reasoning and enterprise LLM multi-model intelligence.',
      icon: <MessageSquare className="w-5 h-5" />,
      iconBg: 'bg-blue-50/90',
      iconText: 'text-blue-700',
      iconBorder: 'border-blue-200/60',
      badge: 'GPT-4o & Gemini'
    },
    {
      id: 'ai-image',
      name: 'AI Image',
      desc: 'Studio-grade generative image synthesis, inpainting, and 4K upscaling.',
      icon: <ImageIcon className="w-5 h-5" />,
      iconBg: 'bg-purple-50/90',
      iconText: 'text-purple-700',
      iconBorder: 'border-purple-200/60',
      badge: 'Flux 1.1 Pro'
    },
    {
      id: 'ai-video',
      name: 'AI Video',
      desc: 'Cinematic AI video generation studio with camera motion control.',
      icon: <Film className="w-5 h-5" />,
      iconBg: 'bg-rose-50/90',
      iconText: 'text-rose-700',
      iconBorder: 'border-rose-200/60',
      badge: 'Runway Gen-3'
    },
    {
      id: 'ai-music',
      name: 'AI Music',
      desc: 'Harmonic generative music production with mood and stem controls.',
      icon: <Music className="w-5 h-5" />,
      iconBg: 'bg-amber-50/90',
      iconText: 'text-amber-700',
      iconBorder: 'border-amber-200/60',
      badge: 'Suno v4'
    },
    {
      id: 'ai-audio',
      name: 'AI Audio',
      desc: 'Neural voice cloning, studio speech-to-text, and audio mastering.',
      icon: <Mic className="w-5 h-5" />,
      iconBg: 'bg-emerald-50/90',
      iconText: 'text-emerald-700',
      iconBorder: 'border-emerald-200/60',
      badge: 'ElevenLabs v2'
    },
    {
      id: 'ai-pods',
      name: 'AI Pods',
      desc: 'Autonomous dual-host conversational podcast production from documents.',
      icon: <Radio className="w-5 h-5" />,
      iconBg: 'bg-cyan-50/90',
      iconText: 'text-cyan-700',
      iconBorder: 'border-cyan-200/60',
      badge: 'Dual-Host'
    }
  ];

  const filteredServices = aiServices.filter(
    s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in w-full pb-12 select-none">
      
      {/* ========================================================================= */}
      {/* 1 & 2. Top Header Hero Card with Integrated Breadcrumb */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#F8FAFC] via-[#F4F5FD] to-[#E9EEFA] border border-slate-200/90 p-6 sm:p-9 lg:p-10 overflow-hidden shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Geometric Crystal 3D Facets Illustration */}
        <div className="absolute right-36 lg:right-56 top-0 bottom-0 w-80 lg:w-96 pointer-events-none hidden md:flex items-center justify-center opacity-85">
          <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="serviceCrystalTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="serviceCrystalLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4338CA" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="serviceCrystalRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="serviceCrystalBack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EDE9FE" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Background wireframe polygons */}
            <polygon points="120,40 220,10 280,60 180,90" fill="url(#serviceCrystalBack)" stroke="#C4B5FD" strokeWidth="0.75" strokeOpacity="0.6" />
            <polygon points="280,60 340,110 240,160 180,90" fill="url(#serviceCrystalBack)" stroke="#C4B5FD" strokeWidth="0.75" strokeOpacity="0.6" />
            <polygon points="60,110 160,80 220,130 120,160" fill="url(#serviceCrystalBack)" stroke="#C4B5FD" strokeWidth="0.75" strokeOpacity="0.5" />

            {/* Central 3D Crystal Block */}
            <g transform="translate(140, 45)">
              <polygon points="60,10 110,35 60,60 10,35" fill="url(#serviceCrystalTop)" stroke="#E0E7FF" strokeWidth="1" />
              <polygon points="10,35 60,60 60,120 10,95" fill="url(#serviceCrystalLeft)" stroke="#A5B4FC" strokeWidth="1" />
              <polygon points="60,60 110,35 110,95 60,120" fill="url(#serviceCrystalRight)" stroke="#C4B5FD" strokeWidth="1" />
            </g>

            {/* Floating Mini Facet */}
            <g transform="translate(60, 85) scale(0.65)">
              <polygon points="60,10 110,35 60,60 10,35" fill="url(#serviceCrystalTop)" stroke="#E0E7FF" strokeWidth="0.75" />
              <polygon points="10,35 60,60 60,120 10,95" fill="url(#serviceCrystalLeft)" stroke="#A5B4FC" strokeWidth="0.75" />
              <polygon points="60,60 110,35 110,95 60,120" fill="url(#serviceCrystalRight)" stroke="#C4B5FD" strokeWidth="0.75" />
            </g>

            {/* Floating Sparkle Nodes */}
            <circle cx="145" cy="75" r="2.5" fill="#818CF8" />
            <circle cx="255" cy="85" r="2.5" fill="#A78BFA" />
            <circle cx="195" cy="165" r="2.5" fill="#6366F1" />
          </svg>
        </div>

        {/* Left: Integrated Breadcrumb + Title + Subtitle */}
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5 font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#0F172A]">AI Services</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0B132B] tracking-tight leading-tight">
            AI Services
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-2 font-normal leading-relaxed max-w-lg">
            Explore SNS Square generative studios for conversational reasoning, image creation, video, music, neural audio, and automated podcasts.
          </p>
        </div>

        {/* Right: Quote Box matching mockup */}
        <div className="relative z-10 flex items-start gap-3.5 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xs sm:self-center shrink-0">
          <div className="w-[3.5px] self-stretch bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-[#EC4899] rounded-full shrink-0" />
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#0F172A] tracking-wider leading-snug uppercase font-sans">
              CREATIVE<br />
              INTELLIGENCE FOR<br />
              MODERN ENTERPRISE
            </div>
            <div className="w-9 h-[1.5px] bg-slate-300/90 my-1.5 rounded-full" />
            <div className="text-[9.5px] font-bold text-slate-500 tracking-widest uppercase">
              GENERATE · SYNTHESIZE · AUTOMATE
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Search Bar */}
      {/* ========================================================================= */}
      <div className="relative w-full">
        <div className="flex items-center bg-white rounded-xl border border-slate-200/90 shadow-2xs px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search AI services..."
            className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 outline-none font-normal bg-transparent"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. "All AI Services" Section Bar & Layout Switcher */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
          All AI Services
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#64748B] font-medium">
            {filteredServices.length} services
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
      {/* 5. AI Services Grid / List Display */}
      {/* ========================================================================= */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => (
            <div
              key={service.id}
              onClick={() => navigateToService(service.id)}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Soft Pastel Icon Container */}
                  <div
                    className={`w-11 h-11 rounded-xl ${service.iconBg} ${service.iconText} border ${service.iconBorder} flex items-center justify-center group-hover:scale-105 transition-transform`}
                  >
                    {service.icon}
                  </div>

                  {service.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors mb-1">
                  {service.name}
                </h3>

                {/* Service Description */}
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-5 flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] group-hover:text-indigo-600 transition-colors">
                <span>Explore {service.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
          {filteredServices.map(service => (
            <div
              key={service.id}
              onClick={() => navigateToService(service.id)}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl ${service.iconBg} ${service.iconText} border ${service.iconBorder} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  {service.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors">
                      {service.name}
                    </h3>
                    {service.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] font-normal truncate mt-0.5">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#0F172A] group-hover:text-indigo-600 shrink-0 ml-4">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No AI services found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

