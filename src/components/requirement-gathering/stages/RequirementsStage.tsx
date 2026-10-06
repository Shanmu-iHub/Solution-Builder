import React, { useState } from 'react';
import { Filter, Check, ShieldCheck, Database, Cpu, User, Building } from 'lucide-react';

export const RequirementsStage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const requirements = [
    { id: 'BR-01', type: 'Business', title: 'Accelerate reimbursement turnaround from 18 days to under 48 hours', trace: 'CBO / Problem Brief', status: 'Approved' },
    { id: 'UR-01', type: 'User', title: 'Field sales reps can photograph and crop receipt slips on mobile', trace: 'CPO / User Persona', status: 'Approved' },
    { id: 'FR-01', type: 'Functional', title: 'Automatic OCR extraction of merchant name, total, date, and VAT', trace: 'CPO / Feature Spec', status: 'Approved' },
    { id: 'FR-02', type: 'Functional', title: 'Real-time policy check against corporate daily lodging and meal caps', trace: 'CBO / Policy Rules', status: 'Approved' },
    { id: 'NFR-01', type: 'Technical', title: '99.9% mobile API availability with sub-500ms OCR ingestion latency', trace: 'CTO / SLA Contract', status: 'Approved' },
    { id: 'DATA-01', type: 'Data', title: 'Immutable audit log of all expense submission, approval, and edits', trace: 'CDO / Data Schema', status: 'Approved' },
    { id: 'SEC-01', type: 'Security', title: 'AES-256 encryption for receipts and TLS 1.3 encryption in transit', trace: 'CISO / Security Baseline', status: 'Approved' },
    { id: 'INT-01', type: 'Integration', title: 'REST/SFTP bidirectional synchronization adapter for SAP Concur', trace: 'CTO / Integration Arch', status: 'Approved' }
  ];

  const filtered = filterType === 'all' ? requirements : requirements.filter((r) => r.type.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['all', 'Business', 'User', 'Functional', 'Technical', 'Data', 'Security', 'Integration'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer capitalize ${
                filterType.toLowerCase() === cat.toLowerCase()
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium">{filtered.length} Requirements Baseline</span>
      </div>

      {/* Requirements Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Requirement Statement</th>
                <th className="p-3.5">Traceability Source</th>
                <th className="p-3.5">Baseline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{req.id}</td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {req.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-800">{req.title}</td>
                  <td className="p-3.5 text-slate-500 font-mono text-[11px]">{req.trace}</td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
