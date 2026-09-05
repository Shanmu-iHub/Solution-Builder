import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { productsList } from '../../data/productsData';
import { servicesList } from '../../data/servicesData';
import { agentsList } from '../../data/agentsData';
import { mockProjects } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';
import { Search, X, ArrowRight, BookOpen, Layers, Sparkles, Bot, Briefcase, Settings, Sliders } from 'lucide-react';

export const GlobalSearch: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToService, navigateToAgent, setCurrentView } = useNavigation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Search matches
  const q = query.toLowerCase().trim();

  const matchingProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const matchingServices = servicesList.filter(s =>
    s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  );

  const matchingAgents = agentsList.filter(a =>
    a.name.toLowerCase().includes(q) || a.shortDesc.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
  );

  const matchingProjects = mockProjects.filter(prj =>
    prj.name.toLowerCase().includes(q) || prj.description.toLowerCase().includes(q) || prj.key.toLowerCase().includes(q)
  );

  // Combine flat list for selection
  const flatResults = [
    ...matchingProducts.map(p => ({ type: 'product' as const, item: p })),
    ...matchingServices.map(s => ({ type: 'service' as const, item: s })),
    ...matchingAgents.map(a => ({ type: 'agent' as const, item: a })),
    ...matchingProjects.map(pr => ({ type: 'project' as const, item: pr }))
  ];

  const handleSelect = (entry: typeof flatResults[0]) => {
    if (entry.type === 'product') {
      navigateToProduct((entry.item as any).id);
    } else if (entry.type === 'service') {
      navigateToService((entry.item as any).id);
    } else if (entry.type === 'agent') {
      navigateToAgent((entry.item as any).id);
    } else if (entry.type === 'project') {
      setCurrentView('projects');
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-modal border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[80vh] animate-slide-down"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E2E8F0] bg-white">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, services, agents, projects, documentation... (Type keywords)"
            className="w-full text-sm text-[#0F172A] placeholder-slate-400 bg-transparent border-none focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs px-2 py-1 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto max-h-[60vh] divide-y divide-[#F1F5F9] space-y-3">
          {flatResults.length === 0 ? (
            <div className="p-8 text-center text-[#64748B]">
              <p className="text-sm font-medium text-[#0F172A] mb-1">No matching results found</p>
              <p className="text-xs text-[#94A3B8]">Try searching for "Architect", "FinOps", "Chat", "Research", or "Testing"</p>
            </div>
          ) : (
            <>
              {/* Products Group */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Products ({matchingProducts.length})</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchingProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          navigateToProduct(p.id);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F1F5F9] text-left transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                          <IconRenderer name={p.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                            {p.name}
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">{p.shortDesc}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">Product</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Group */}
              {matchingServices.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>AI Services ({matchingServices.length})</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchingServices.map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          navigateToService(s.id);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F1F5F9] text-left transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                          <IconRenderer name={s.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-[#0F172A] group-hover:text-indigo-600 transition-colors">
                            {s.name}
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">{s.shortDesc}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">Service</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Agents Group */}
              {matchingAgents.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    <Bot className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Agents ({matchingAgents.length})</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchingAgents.map(a => (
                      <button
                        key={a.id}
                        onClick={() => {
                          navigateToAgent(a.id);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F1F5F9] text-left transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                          <IconRenderer name={a.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-[#0F172A] group-hover:text-emerald-600 transition-colors">
                            {a.name}
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">{a.shortDesc}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">Agent</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Group */}
              {matchingProjects.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                    <span>Workspace Projects ({matchingProjects.length})</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {matchingProjects.map(pr => (
                      <button
                        key={pr.id}
                        onClick={() => {
                          setCurrentView('projects');
                          setIsSearchOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F1F5F9] text-left transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 shrink-0 font-bold text-xs">
                          {pr.key}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-[#0F172A] group-hover:text-amber-600 transition-colors">
                            {pr.name}
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">{pr.description}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">Project</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Nav Footer */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-600">Enter</kbd> to select</span>
            <span>Close: <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-600">Esc</kbd></span>
          </div>
          <span className="font-medium text-[#2563EB]">SNS Square Unified Search</span>
        </div>
      </div>
    </div>
  );
};
