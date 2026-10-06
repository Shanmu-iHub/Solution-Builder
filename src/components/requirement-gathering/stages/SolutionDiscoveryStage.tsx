import React, { useState } from 'react';
import {
  Boxes,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Check,
  ChevronRight
} from 'lucide-react';

export const SolutionDiscoveryStage: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState('mobile-first');

  const capabilities = [
    { id: 'c-1', name: 'Mobile Camera Receipt Capture with On-Device OCR', rootCause: 'rc_capture', rating: 'High' },
    { id: 'c-2', name: 'Instant Policy Pre-Validation Rule Engine', rootCause: 'rc_approval', rating: 'High' },
    { id: 'c-3', name: 'Manager Approval Inbox with 1-Tap Decisions', rootCause: 'rc_approval', rating: 'High' },
    { id: 'c-4', name: 'Automated Bi-directional ERP Sync with SAP Concur', rootCause: 'rc_entry', rating: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Options Selection */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Solution Architectural Alternatives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div
            onClick={() => setSelectedSolution('mobile-first')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSolution === 'mobile-first'
                ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold text-sm">Mobile-First Unified App</strong>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-sm">
                RECOMMENDED
              </span>
            </div>
            <p className="text-slate-600 mb-3">
              Native mobile client for instant photo capture, offline queueing, and direct cloud sync.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <div>✓ Resolves Point-of-Sale receipt capture</div>
              <div>✓ Direct manager mobile notifications</div>
            </div>
          </div>

          <div
            onClick={() => setSelectedSolution('workflow-engine')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSolution === 'workflow-engine'
                ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold text-sm">Workflow Automation Hub</strong>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-sm">
                ALTERNATIVE
              </span>
            </div>
            <p className="text-slate-600 mb-3">
              Lightweight web portal with email webhooks that extracts receipts from forwarded inbox emails.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <div>~ Partial receipt capture improvement</div>
              <div>✓ Strong email integration</div>
            </div>
          </div>

          <div
            onClick={() => setSelectedSolution('api-ecosystem')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSolution === 'api-ecosystem'
                ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold text-sm">Modular Micro-API Stack</strong>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-sm">
                ENTERPRISE
              </span>
            </div>
            <p className="text-slate-600 mb-3">
              Decoupled headless services embedded into existing corporate HR tools.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <div>✓ Maximum architectural flexibility</div>
              <div>~ Higher implementation complexity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feasibility & Architecture Evaluation Matrix */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Evaluation Matrix (Mobile-First Unified App)
        </h3>
        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Evaluation Dimension</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Evidence Basis</th>
                <th className="p-3">Domain Stakeholder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-800">User Value & Adoption</td>
                <td className="p-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-bold">High</span></td>
                <td className="p-3 text-slate-600">Solves core rep frustration of receipt loss in field</td>
                <td className="p-3 text-slate-500 font-mono">CPO</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Technical Feasibility</td>
                <td className="p-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-bold">High</span></td>
                <td className="p-3 text-slate-600">Standard React Native / iOS / Android camera APIs</td>
                <td className="p-3 text-slate-500 font-mono">CTO</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Data Architecture Readiness</td>
                <td className="p-3"><span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-xs font-bold">High</span></td>
                <td className="p-3 text-slate-600">Normalized PostgreSQL schema with immutable audit logs</td>
                <td className="p-3 text-slate-500 font-mono">CDO</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Security & Privacy Posture</td>
                <td className="p-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-bold">High</span></td>
                <td className="p-3 text-slate-600">Zero-trust RBAC, AES-256 for receipt attachments</td>
                <td className="p-3 text-slate-500 font-mono">CISO</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Implementation Complexity</td>
                <td className="p-3"><span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xs font-bold">Medium</span></td>
                <td className="p-3 text-slate-600">Requires certified SAP Concur partner API adapter</td>
                <td className="p-3 text-slate-500 font-mono">CTO / CIO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Core Capabilities */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-3">
          Target Solution Capabilities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {capabilities.map((cap) => (
            <div key={cap.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">{cap.name}</p>
                <span className="text-[11px] text-slate-400">Linked to: {cap.rootCause}</span>
              </div>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs text-[10px] font-bold">
                ✓ Included
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
