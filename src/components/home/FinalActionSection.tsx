import React from 'react';
import { ArrowRight, FolderKanban } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const FinalActionSection: React.FC = () => {
  const { setCurrentView } = useNavigation();

  return (
    <section className="py-10 text-center border-t border-[#E2DFD7]">
      <div className="max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
          Get Started
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
          Ready to see what it can do?
        </h2>

        <p className="text-xs sm:text-sm text-[#66635D] leading-relaxed max-w-lg mx-auto">
          Open the workspace right now. Design an architecture, run an autonomous research agent, or inspect cloud telemetry with zero setup friction.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentView('products')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>Launch SNS Square Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentView('projects')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#ECEAE4] border border-[#DDD9CE] text-[#151515] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <FolderKanban className="w-4 h-4 text-[#8C887B]" />
            <span>View Workspace Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
};
