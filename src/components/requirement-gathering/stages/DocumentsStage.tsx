import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, Shield, Database, Cpu, Building } from 'lucide-react';

export const DocumentsStage: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState('prd');

  const docs = [
    {
      id: 'prd',
      code: 'PRD',
      title: 'Product Requirements Document',
      owner: 'CPO',
      pages: '14 Pages',
      status: 'Validated',
      desc: 'Product scope, user stories, personas, mobile user journey flows, and functional acceptance criteria.'
    },
    {
      id: 'brd',
      code: 'BRD',
      title: 'Business Requirements Document',
      owner: 'CBO',
      pages: '10 Pages',
      status: 'Validated',
      desc: 'Commercial business case, operational stakeholder workflows, departmental policies, and ROI targets.'
    },
    {
      id: 'srs',
      code: 'SRS / SAD',
      title: 'System Architecture & Technical Spec',
      owner: 'CTO',
      pages: '22 Pages',
      status: 'Validated',
      desc: 'Component architecture, microservices topology, REST/GraphQL API specifications, and SAP Concur adapter.'
    },
    {
      id: 'data',
      code: 'DATA ARCH',
      title: 'Data Architecture & Schema Spec',
      owner: 'CDO',
      pages: '8 Pages',
      status: 'Validated',
      desc: 'Normalized relational database schemas, audit logging lineage, transaction isolation, and retention policies.'
    },
    {
      id: 'sec',
      code: 'SEC ARCH',
      title: 'Security & Compliance Matrix',
      owner: 'CISO',
      pages: '12 Pages',
      status: 'Validated',
      desc: 'Zero-trust network security, AES-256 / TLS 1.3 encryption, SOC2 and GDPR compliance mappings.'
    },
    {
      id: 'fin',
      code: 'FIN MODEL',
      title: 'Financial Feasibility & Business Case',
      owner: 'CFO',
      pages: '6 Pages',
      status: 'Validated',
      desc: 'Detailed cost breakdown, capital expenditure, operational expenditure, payback period, and 3-year ROI.'
    }
  ];

  const activeDoc = docs.find((d) => d.id === selectedDoc) || docs[0];

  return (
    <div className="space-y-6">
      
      {/* Domain-based Document Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Generated Document Deliverables
          </h3>
          <span className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full font-semibold">
            Domain-Based Executive Validation Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {docs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedDoc === doc.id
                  ? 'border-slate-900 bg-slate-50/60 ring-1 ring-slate-900 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                  {doc.code}
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                  Reviewed by {doc.owner}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{doc.title}</h4>
              <p className="text-slate-600 line-clamp-2 mb-3">{doc.desc}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span>{doc.pages}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Document Preview Box */}
      <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{activeDoc.title}</h4>
              <span className="text-[11px] text-slate-400">
                Official Baseline • Direct sign-off by {activeDoc.owner}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-black cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download Spec (PDF)
          </button>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-mono">
          <p className="font-bold text-slate-900 mb-2">
            /// DOCUMENT HEADER: {activeDoc.code} — {activeDoc.title.toUpperCase()} ///
          </p>
          <p>VERSION: 1.0.0-APPROVED</p>
          <p>DOMAIN VALIDATOR: {activeDoc.owner}</p>
          <p className="mt-2 text-slate-600 font-sans">{activeDoc.desc}</p>
          <p className="mt-2 text-emerald-700 font-sans font-semibold">
            ✓ Traceability verification complete. All cross-document citations resolved without conflict.
          </p>
        </div>
      </div>
    </div>
  );
};
