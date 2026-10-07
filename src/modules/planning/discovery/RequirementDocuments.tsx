import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Loader2, Sparkles, Download } from 'lucide-react';
import { Button, cx, sleep, CSuiteValidation, CSuiteGate } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { StageResourceActivity } from './StageResourceActivity';

const Section: React.FC<{
  num: string; title: string; summary: string; need?: string | null; open: boolean;
  onToggle: () => void; children: React.ReactNode;
}> = ({ num, title, summary, need, open, onToggle, children }) => (
  <div className={cx('border border-slate-200 bg-white rounded-xl overflow-hidden transition-all duration-200', open ? 'shadow-sm' : 'hover:border-slate-300')}>
    <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer text-left bg-white">
      <span className="text-[13.5px] font-bold text-slate-400 font-mono">{num}</span>
      <span className="text-[15px] font-bold text-[#0F172A]">{title}</span>
      {need && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[11.5px] font-bold tracking-wide uppercase">{need}</span>}
      <span className="flex-1 min-w-0 text-[13.5px] text-slate-500 truncate ml-2">{summary}</span>
      <span className="text-slate-400">{open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
    </button>
    {open && <div className="px-5 pb-5 pt-1 border-t border-slate-100">{children}</div>}
  </div>
);

const DOCS = [
  { id: 'brd', s: 'BRD', l: 'Business Requirements', sections: 9 },
  { id: 'prd', s: 'PRD', l: 'Product Requirements', sections: 7 },
  { id: 'srs', s: 'SRS', l: 'Software Requirements Specification', sections: 8 },
];

export const RequirementDocuments: React.FC<{ projectId: string; projectName: string; onComplete: () => void }> = ({ projectId, onComplete }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ docs: true });
  const [drafting, setDrafting] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [activeDoc, setActiveDoc] = useState('brd');

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasDocs = s.documentsConfirmed;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    setGenerated(true);
    setBusy(false); setDrafting(false);
    setOpenSecs({ docs: true });
  };

  const confirm = () => {
    patch(projectId, { documentsConfirmed: true });
    onComplete();
  };

  // No initial state setup required for RequirementDocuments beyond open sections


  const exportDoc = () => {
    alert(`Exporting ${DOCS.find(d => d.id === activeDoc)?.s}...`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Generating requirement documents with traceability" knowledgeIds={['KNW-0001']} instructionIds={['INS-0001']} policyIds={['POL-0001']} />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 08 of 10</div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Documents</h1>
          <p className="text-[15px] text-slate-500 mt-1">Review the generated document set.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Document Set · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          
          <Section num="01" title="Document set" summary="BRD · PRD · SRS" open={openSecs.docs} onToggle={() => toggle('docs')}>
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                {DOCS.map(d => (
                  <button 
                    key={d.id} 
                    onClick={() => setActiveDoc(d.id)}
                    className={cx("flex-1 text-left p-4 rounded-xl border transition cursor-pointer flex flex-col gap-1", activeDoc === d.id ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-slate-50 border-slate-200 hover:border-slate-300")}
                  >
                    <span className={cx("text-[15px] font-bold", activeDoc === d.id ? "text-[#1D4ED8]" : "text-[#0F172A]")}>{d.s}</span>
                    <span className="text-[13px] text-slate-500 line-clamp-1">{d.l}</span>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mt-1">{d.sections} sections</span>
                  </button>
                ))}
              </div>
              
              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm mt-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">{DOCS.find(d => d.id === activeDoc)?.l}</span>
                    <h3 className="text-[19px] font-bold text-[#0F172A]">{DOCS.find(d => d.id === activeDoc)?.s}</h3>
                  </div>
                  <Button variant="secondary" icon={<Download className="w-4 h-4"/>} onClick={exportDoc}>Export Word</Button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-[15px] font-bold text-[#0F172A]">1. Purpose & Vision</h4>
                    <p className="text-[14px] text-slate-600 leading-relaxed">This document outlines the requirements for the mobile expense claims solution. The system will enable field sales representatives to capture receipts via their mobile devices and submit claims into a digital approval workflow.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[15px] font-bold text-[#0F172A]">2. Target Users</h4>
                    <ul className="text-[14px] text-slate-600 list-disc pl-4 space-y-1">
                      <li>Field Sales Representatives (Primary)</li>
                      <li>Line Managers</li>
                      <li>Finance Team</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[15px] font-bold text-[#0F172A]">3. Core Features</h4>
                    <ul className="text-[14px] text-slate-600 list-disc pl-4 space-y-1">
                      <li>Mobile receipt capture and OCR extraction</li>
                      <li>Digital approval queues for line managers</li>
                      <li>Automated integration with SAP Concur</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>

        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">BRD · PRD · SRS</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">v1.0</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">BRD</span><p className="text-[14.5px] text-[#0F172A] leading-snug">9 sections</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">PRD</span><p className="text-[14.5px] text-[#0F172A] leading-snug">7 sections</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">SRS</span><p className="text-[14.5px] text-[#0F172A] leading-snug">8 sections</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Baseline</span><p className="text-[14.5px] text-[#0F172A] leading-snug">Requirements v1.0</p></div>
            <div className="pt-2">
              <CSuiteValidation stageId="documents" status={'Validated'} />
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-4">
            <CSuiteGate validated={true} />
            <Button variant="primary" className="w-full text-[15px] py-2.5" onClick={confirm}>Complete Requirement Gathering <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
