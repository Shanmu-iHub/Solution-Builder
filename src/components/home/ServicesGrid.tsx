import React from 'react';
import { servicesList } from '../../data/servicesData';
import { useNavigation } from '../../context/NavigationContext';
import { IconRenderer } from '../common/IconRenderer';
import { ArrowRight, MoreHorizontal, MessageSquare, Image, Film, Music, Mic, Radio } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const { navigateToService, setCurrentView } = useNavigation();

  // Color mappings for the service tiles matching the reference aesthetic
  const serviceStyles: { [key: string]: { bg: string; text: string; border: string } } = {
    'ai-chat': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    'ai-image': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    'ai-video': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    'ai-music': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
    'ai-audio': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    'ai-pods': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' }
  };

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">Our Services</h2>
          <p className="text-xs text-[#64748B]">Multi-modal generative intelligence, audio synthesis, and conversational tools</p>
        </div>
        <button
          onClick={() => setCurrentView('services')}
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors group"
        >
          <span>View all services</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Row of Icon Tiles matching reference screenshot */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {servicesList.map((service) => {
          const style = serviceStyles[service.id] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' };
          return (
            <button
              key={service.id}
              onClick={() => navigateToService(service.id)}
              className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all duration-150 text-center group"
            >
              <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.border} border flex items-center justify-center ${style.text} group-hover:scale-108 transition-transform mb-2.5 shadow-2xs`}>
                <IconRenderer name={service.icon} className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate w-full">
                {service.name}
              </span>
              <span className="text-[10px] text-[#94A3B8] truncate w-full mt-0.5">
                {service.category}
              </span>
            </button>
          );
        })}

        {/* More Services Tile */}
        <button
          onClick={() => setCurrentView('services')}
          className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-subtle hover:shadow-card hover:border-[#CBD5E1] transition-all text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:scale-108 transition-transform mb-2.5">
            <MoreHorizontal className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate w-full">
            More Services
          </span>
          <span className="text-[10px] text-[#94A3B8] truncate w-full mt-0.5">
            Explore All
          </span>
        </button>
      </div>
    </section>
  );
};
