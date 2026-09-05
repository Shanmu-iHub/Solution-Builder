import React from 'react';
import { agentsList } from '../../data/agentsData';
import { useNavigation } from '../../context/NavigationContext';
import { IconRenderer } from '../common/IconRenderer';
import { ArrowRight, MoreHorizontal } from 'lucide-react';

export const AgentsGrid: React.FC = () => {
  const { navigateToAgent, setCurrentView } = useNavigation();

  // Color mappings for the agent tiles
  const agentStyles: { [key: string]: { bg: string; text: string; border: string } } = {
    'meeting-notes': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    'deep-research': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    'fact-check': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
    'call-for-me': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    'translation': { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' },
    'download-for-me': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' }
  };

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">AI Agents</h2>
          <p className="text-xs text-[#64748B]">Autonomous agents for meetings, deep web research, fact validation, and telephony</p>
        </div>
        <button
          onClick={() => setCurrentView('agents')}
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors group"
        >
          <span>View all agents</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Row of Agent Tiles matching reference screenshot */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {agentsList.map((agent) => {
          const style = agentStyles[agent.id] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' };
          return (
            <button
              key={agent.id}
              onClick={() => navigateToAgent(agent.id)}
              className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all duration-150 text-center group"
            >
              <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.border} border flex items-center justify-center ${style.text} group-hover:scale-108 transition-transform mb-2.5 shadow-2xs`}>
                <IconRenderer name={agent.icon} className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate w-full">
                {agent.name}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium truncate w-full mt-0.5">
                ● {agent.status}
              </span>
            </button>
          );
        })}

        {/* More Agents Tile */}
        <button
          onClick={() => setCurrentView('agents')}
          className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-subtle hover:shadow-card hover:border-[#CBD5E1] transition-all text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:scale-108 transition-transform mb-2.5">
            <MoreHorizontal className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate w-full">
            More Agents
          </span>
          <span className="text-[10px] text-[#94A3B8] truncate w-full mt-0.5">
            Configure All
          </span>
        </button>
      </div>
    </section>
  );
};
