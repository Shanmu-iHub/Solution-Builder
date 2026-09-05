import React from 'react';
import { agentsList } from '../../data/agentsData';
import { useNavigation } from '../../context/NavigationContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { IconRenderer } from '../common/IconRenderer';
import { Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AgentListing: React.FC = () => {
  const { navigateToAgent } = useNavigation();

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Agents' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Autonomous Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Autonomous AI Agents</h1>
          <p className="text-xs text-[#64748B] max-w-2xl">
            Autonomous multi-step agents that execute business workflows: transcribe meetings with action items, crawl web sources for deep research, verify facts, conduct voice calls, translate documents, and scrape resources.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentsList.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <IconRenderer name={agent.icon} className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{agent.status}</span>
                </div>
              </div>

              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                {agent.category}
              </span>
              <h3 className="text-base font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                {agent.name}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                {agent.longDesc}
              </p>

              {/* Capabilities */}
              <div className="space-y-1.5 pt-3 border-t border-[#F1F5F9] mb-4">
                {agent.capabilities.slice(0, 3).map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#475569]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigateToAgent(agent.id)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white border border-[#E2E8F0] group-hover:border-transparent font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Launch & Run Agent</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
