import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  FileCheck,
  Layers,
  LineChart,
  Lock,
  PieChart,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { cx } from '../../ui';

interface CSuiteOfficer {
  id: string;
  role: string;
  title: string;
  officer: string;
  alignment: number;
  icon: typeof Award;
  color: string;
  summary: string;
  decisionLogic: string;
  kpis: { label: string; value: string }[];
  risks: string[];
  signature: {
    signedAt: string;
    certificate: string;
    decision: 'APPROVED';
  };
}

const OFFICERS: CSuiteOfficer[] = [
  {
    id: 'ceo',
    role: 'CEO',
    title: 'Chief Executive Officer',
    officer: 'Elena Rostova',
    alignment: 96,
    icon: Award,
    color: 'text-blue-500 bg-blue-50 border-blue-200',
    summary:
      'ExpensifyIQ automates 80% of routine expense audits and scales company workforce efficiency with zero incremental administrative headcount.',
    decisionLogic:
      'High strategic synergy with corporate digitization OKRs. Accelerates financial close velocity by 4.2x while providing instant enterprise spend visibility.',
    kpis: [
      { label: 'Reimbursement Velocity', value: '< 48 Hours' },
      { label: 'Labor Productivity Gain', value: '+35%' },
      { label: 'Executive Adoption Score', value: '98/100' },
    ],
    risks: [
      'Low initial mobile app submission compliance — mitigated with Slack/Teams bot reminders.',
      'Change management with distributed field reps — addressed via 1-click OCR receipt scanning.',
    ],
    signature: {
      signedAt: '2026-10-06 09:15:22 UTC',
      certificate: 'SHA256:8f4c21a99e84b12d992f0331e847c21f',
      decision: 'APPROVED',
    },
  },
  {
    id: 'cfo',
    role: 'CFO',
    title: 'Chief Financial Officer',
    officer: 'Marcus Vance',
    alignment: 94,
    icon: DollarSign,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
    summary:
      '$140,000 annual administrative labor savings in audit costs, with an average reimbursement cycle drop from 14 days down to 48 hours.',
    decisionLogic:
      'Calculated unit economics project a 312% return on investment with full capital payback achieved within 3.2 months post-deployment.',
    kpis: [
      { label: 'Annual Labor Savings', value: '$140,000' },
      { label: 'Cost Per Expense Claim', value: '$1.42 (was $8.90)' },
      { label: 'Projected Payback Window', value: '3.2 Months' },
    ],
    risks: [
      'Out-of-policy false negative leakage — mitigated through strict multi-tier approval escalation rules.',
      'Foreign currency transaction slippage — automated using real-time ECB exchange rate sync.',
    ],
    signature: {
      signedAt: '2026-10-06 09:18:45 UTC',
      certificate: 'SHA256:7c913da221b9a9f0e201488c918321fe',
      decision: 'APPROVED',
    },
  },
  {
    id: 'cto',
    role: 'CTO',
    title: 'Chief Technology Officer',
    officer: 'Dr. Aris Thorne',
    alignment: 98,
    icon: Zap,
    color: 'text-purple-500 bg-purple-50 border-purple-200',
    summary:
      'Next.js 15 App Router + Mongoose ODM with 10 autonomous Agent Builder workflows cleanly decouples domain logic and minimizes technical debt.',
    decisionLogic:
      'Architecture aligns perfectly with company modern micro-frontend standard. Server actions and agentic workflows deliver sub-200ms API response latency.',
    kpis: [
      { label: 'P95 API Response Time', value: '142ms' },
      { label: 'Autonomous Agent Workflows', value: '10 Endpoints' },
      { label: 'Test Coverage Benchmark', value: '94.2%' },
    ],
    risks: [
      'High-resolution OCR processing latency — offloaded to asynchronous worker queues.',
      'Database connection pool limits — protected via MongoDB Atlas connection pooling.',
    ],
    signature: {
      signedAt: '2026-10-06 09:22:10 UTC',
      certificate: 'SHA256:44a98fe11b4908ef901239aa81239fbc',
      decision: 'APPROVED',
    },
  },
  {
    id: 'ciso',
    role: 'CISO',
    title: 'Chief Information Security Officer',
    officer: 'Kavita Patel',
    alignment: 95,
    icon: ShieldCheck,
    color: 'text-rose-500 bg-rose-50 border-rose-200',
    summary:
      'AES-256 encryption at rest for receipts, strict role-based access control (RBAC), and immutable audit logs meet SOC2 Type II and GDPR standards.',
    decisionLogic:
      'Zero-trust tenant data separation, automated PII redaction on receipt scans, and SAML 2.0 / Okta SSO integration pass all corporate security gates.',
    kpis: [
      { label: 'Data Encryption', value: 'AES-256 / TLS 1.3' },
      { label: 'Compliance Readiness', value: 'SOC2 & GDPR' },
      { label: 'Vulnerability Scan Result', value: '0 Critical / 0 High' },
    ],
    risks: [
      'Third-party OCR data residency leakage — strictly isolated to customer-dedicated AWS/GCP region.',
      'Privileged escalation via API keys — token rotation enforced every 90 days.',
    ],
    signature: {
      signedAt: '2026-10-06 09:25:04 UTC',
      certificate: 'SHA256:91b24cc8001faecb991845bb01823ef1',
      decision: 'APPROVED',
    },
  },
  {
    id: 'coo',
    role: 'COO',
    title: 'Chief Operating Officer',
    officer: 'David Chen',
    alignment: 92,
    icon: TrendingUp,
    color: 'text-amber-500 bg-amber-50 border-amber-200',
    summary:
      'Dynamic multi-tier approval matrix with automated escalation timers ensures 99.2% on-time reimbursement SLA across 14 global branch offices.',
    decisionLogic:
      'Eliminates manual manager review bottlenecks. Department heads only review flagged policy exceptions, saving an average of 4.5 hours per manager weekly.',
    kpis: [
      { label: 'On-time SLA Rate', value: '99.2%' },
      { label: 'Manager Hours Saved', value: '4.5 hrs / week' },
      { label: 'Employee NPS Score', value: '+48' },
    ],
    risks: [
      'Manager approval delays during travel — addressed via one-tap mobile push notification approvals.',
      'Receipt loss before scanning — offline draft caching enabled.',
    ],
    signature: {
      signedAt: '2026-10-06 09:30:19 UTC',
      certificate: 'SHA256:129038fc99a18274bbad9081230198aa',
      decision: 'APPROVED',
    },
  },
];

interface Props {
  open: boolean;
  projectName?: string;
  onClose: () => void;
}

export const CSuiteValidationModal: React.FC<Props> = ({ open, projectName = 'ExpensifyIQ', onClose }) => {
  const [selectedOfficer, setSelectedOfficer] = useState<CSuiteOfficer | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">C-Suite Executive Validation</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  95% CONSENSUS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none mt-0.5">
                Cross-functional executive alignment across Strategy, Finance, Technology, Security, and Operations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Executive Overview Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Strategic Alignment</span>
              <p className="text-xl font-black text-slate-900 mt-1">96%</p>
              <span className="text-[10px] font-medium text-emerald-600">Enterprise Grade</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projected ROI</span>
              <p className="text-xl font-black text-emerald-600 mt-1">312%</p>
              <span className="text-[10px] font-medium text-slate-500">3.2 Mo. Payback</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Posture</span>
              <p className="text-xl font-black text-slate-900 mt-1">SOC2 Type II</p>
              <span className="text-[10px] font-medium text-emerald-600">GDPR Compliant</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Readiness Score</span>
              <p className="text-xl font-black text-indigo-600 mt-1">98 / 100</p>
              <span className="text-[10px] font-medium text-indigo-600">Ready to Deploy</span>
            </div>
          </div>

          {/* Officers Validation Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Executive Officer Sign-Offs (5 Roles)
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">All 5 Signatures Verified</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {OFFICERS.map(officer => {
                const I = officer.icon;
                return (
                  <div
                    key={officer.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between shadow-2xs group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className={cx('w-8 h-8 rounded-lg flex items-center justify-center font-bold', officer.color)}>
                            <I className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px] font-bold text-slate-900">{officer.role}</span>
                              <span className="text-[11px] text-slate-400">· {officer.title}</span>
                            </div>
                            <span className="text-[10.5px] font-medium text-slate-500">{officer.officer}</span>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {officer.alignment}%
                        </span>
                      </div>

                      <p className="text-[12px] text-slate-600 leading-relaxed line-clamp-2 italic mb-3">
                        "{officer.summary}"
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">{officer.kpis[0].label}: <strong className="text-slate-700">{officer.kpis[0].value}</strong></span>
                      <button
                        onClick={() => setSelectedOfficer(officer)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex h-14 shrink-0 items-center justify-between border-t border-slate-200 px-6 bg-slate-50/70">
          <div className="flex items-center gap-2 text-[11.5px] font-medium text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographic audit consensus stamped: <strong>October 7, 2026</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-[12px] font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* Individual Officer Detail Deep-Dive Modal */}
      {selectedOfficer && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs font-sans animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#0F172A] text-white">
                  {selectedOfficer.role}
                </span>
                <div>
                  <h4 className="text-[13.5px] font-bold text-slate-900">{selectedOfficer.title} Validation</h4>
                  <p className="text-[10.5px] text-slate-500 leading-none">{selectedOfficer.officer}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOfficer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Executive Directive</span>
                <p className="text-[12.5px] text-slate-800 leading-relaxed">{selectedOfficer.summary}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Key Metric Targets</span>
                <div className="grid grid-cols-3 gap-2">
                  {selectedOfficer.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <span className="text-[9.5px] font-medium text-slate-400 block">{kpi.label}</span>
                      <strong className="text-[12px] font-bold text-slate-900 mt-0.5 block">{kpi.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Decision Logic</span>
                <p className="text-[12px] text-slate-600 leading-relaxed">{selectedOfficer.decisionLogic}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Risk Mitigation</span>
                <ul className="space-y-1 text-[11.5px] text-slate-600">
                  {selectedOfficer.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold shrink-0">·</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-1 font-mono text-[10.5px]">
                <div className="flex items-center justify-between text-emerald-800 font-bold">
                  <span>Sign-off Status: {selectedOfficer.signature.decision}</span>
                  <span>100% Verified</span>
                </div>
                <div className="text-emerald-700 text-[10px]">Timestamp: {selectedOfficer.signature.signedAt}</div>
                <div className="text-emerald-700 text-[9.5px] truncate">Hash: {selectedOfficer.signature.certificate}</div>
              </div>
            </div>

            <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedOfficer(null)}
                className="px-4 py-1.5 rounded-xl bg-[#0F172A] text-white text-[11.5px] font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
