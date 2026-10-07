import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, FileText, ChevronRight, ShieldCheck, Check, Clock } from 'lucide-react';
import { usePlanning } from '../PlanningStore';
import { ExecutiveDecision } from '../types';
import { getDefaultDecisions, PHASE_CONFIGS } from '../map/mapData';
import { cx, useToast } from '../../ui';

interface Props {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

export const DecisionCenterModal: React.FC<Props> = ({ open, onClose, projectId, projectName }) => {
  const { state, patch } = usePlanning();
  const { toast } = useToast();
  const s = state(projectId);
  const decisions = s.executiveDecisions || getDefaultDecisions(projectName);

  const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');
  const [selectedDecId, setSelectedDecId] = useState<string>(decisions[0]?.id || '');
  const [rationale, setRationale] = useState('');

  if (!open) return null;

  const currentDec = decisions.find(d => d.id === selectedDecId) || decisions[0];

  const handleUpdateStatus = (id: string, status: 'approved' | 'changes_requested') => {
    const updated = decisions.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status,
          decisionNote: rationale.trim() || d.decisionNote
        };
      }
      return d;
    });

    patch(projectId, { executiveDecisions: updated });
    toast({
      title: status === 'approved' ? 'Decision Approved' : 'Changes Requested',
      description: `Updated status for "${currentDec?.title}"`
    });
    setRationale('');
  };

  const handleSelectOption = (id: string, opt: string) => {
    const updated = decisions.map(d => (d.id === id ? { ...d, selectedOption: opt } : d));
    patch(projectId, { executiveDecisions: updated });
  };

  const pendingList = decisions.filter(d => d.status === 'pending');
  const resolvedList = decisions.filter(d => d.status !== 'pending');
  const currentList = activeTab === 'pending' ? pendingList : resolvedList;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Human Authority
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[13px] font-semibold text-slate-500">{projectName}</span>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] mt-1">Executive Decision Center</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Sidebar list + Detail Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left list */}
          <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/40 shrink-0">
            <div className="p-3 border-b border-slate-200 flex gap-1">
              <button
                onClick={() => setActiveTab('pending')}
                className={cx(
                  "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  activeTab === 'pending' ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Pending ({pendingList.length})
              </button>
              <button
                onClick={() => setActiveTab('resolved')}
                className={cx(
                  "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  activeTab === 'resolved' ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Resolved ({resolvedList.length})
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {currentList.map(dec => {
                const isSelected = dec.id === currentDec?.id;
                return (
                  <button
                    key={dec.id}
                    onClick={() => setSelectedDecId(dec.id)}
                    className={cx(
                      "w-full text-left p-3 rounded-xl border transition-all cursor-pointer",
                      isSelected 
                        ? "bg-blue-50/70 border-blue-200 text-[#0F172A] shadow-xs" 
                        : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-700"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {PHASE_CONFIGS[dec.phaseId]?.shortTitle || dec.phaseId}
                      </span>
                      <span className={cx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        dec.status === 'approved' ? "bg-emerald-100 text-emerald-800" :
                        dec.status === 'changes_requested' ? "bg-rose-100 text-rose-800" :
                        "bg-amber-100 text-amber-800"
                      )}>
                        {dec.status === 'approved' ? 'Approved' : dec.status === 'changes_requested' ? 'Changes' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[13px] font-bold line-clamp-2">{dec.title}</p>
                  </button>
                );
              })}

              {currentList.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No {activeTab} decisions.
                </div>
              )}
            </div>
          </div>

          {/* Right Decision Detail */}
          {currentDec ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {currentDec.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[12px] font-semibold text-slate-500">
                    Confidence: <strong>{currentDec.confidence}%</strong>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{currentDec.title}</h3>
                <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">
                  {currentDec.description}
                </p>
              </div>

              {/* Impact Callout */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-0.5">
                  Estimated Business Impact
                </span>
                <p className="text-[13px] text-blue-900 font-medium">
                  {currentDec.impact}
                </p>
              </div>

              {/* Options to Choose */}
              {currentDec.options && currentDec.options.length > 0 && (
                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Decision Direction
                  </h4>
                  <div className="space-y-2">
                    {currentDec.options.map(opt => {
                      const isChosen = currentDec.selectedOption === opt;
                      return (
                        <div
                          key={opt}
                          onClick={() => handleSelectOption(currentDec.id, opt)}
                          className={cx(
                            "flex items-center justify-between p-3 rounded-xl border text-[13.5px] cursor-pointer transition-all",
                            isChosen
                              ? "bg-blue-50 border-blue-300 text-blue-900 font-bold shadow-xs"
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                          )}
                        >
                          <span>{opt}</span>
                          {isChosen && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Decision Note / Rationale */}
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Authority Note / Rationale
                </h4>
                <textarea
                  value={rationale || currentDec.decisionNote || ''}
                  onChange={e => setRationale(e.target.value)}
                  placeholder="Provide context or constraints regarding this decision…"
                  rows={2}
                  className="w-full p-3 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={() => handleUpdateStatus(currentDec.id, 'changes_requested')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => handleUpdateStatus(currentDec.id, 'approved')}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Decision
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Select a decision to inspect details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
