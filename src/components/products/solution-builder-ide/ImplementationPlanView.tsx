import React, { useState } from 'react';
import { Copy, Download, Check, FileText } from 'lucide-react';

interface ImplementationPlanViewProps {
  appName?: string;
}

export const ImplementationPlanView: React.FC<ImplementationPlanViewProps> = ({
  appName = 'OmniBoard Support Hub'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpensify = appName.toLowerCase().includes('expensify');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header Bar */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
            IMPLEMENTATION PLAN
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3 stroke-[3]" />
            APPROVED
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Document Body */}
      <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
        {/* Document Title */}
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            {isExpensify
              ? 'Implementation Plan: Working Capital Optimizer Platform'
              : 'Implementation Plan: AI Customer Support Platform'}
          </h2>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            1. Executive Summary & Business Vision
          </h3>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            {isExpensify ? (
              <>
                The <strong>Working Capital Optimizer Platform (ExpensifyIQ)</strong> is an
                intelligent expense management and spend governance platform designed to
                streamline corporate expense lifecycles. It automates expense claims submission,
                receipt processing via OCR, corporate policy compliance validation, manager and
                finance team approval workflows, and reimbursement status tracking.
              </>
            ) : (
              <>
                The <strong>AI Customer Support Platform (operating commercially as OmniBoard Support Hub)</strong> is a centralized,
                high-reliability support ticket management web application. It eliminates fragmented tracking across emails,
                spreadsheets, and chat messages by providing a responsive, single-screen workspace.
              </>
            )}
          </p>

          <div className="pt-2 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Business Goals & Objectives:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 text-xs pl-1">
              {isExpensify ? (
                <>
                  <li>Accelerate expense submission and reimbursement cycles.</li>
                  <li>Minimize manual effort required by finance teams to review expense claims.</li>
                  <li>Enforce automated company expense policies in real-time at ingestion.</li>
                  <li>Eliminate incomplete submissions and flag policy violations or duplicate claims instantly.</li>
                  <li>Deliver comprehensive spend visibility and analytics to finance teams.</li>
                </>
              ) : (
                <>
                  <li><strong>Centralize Ticket Lifecycles:</strong> Replace fragmented channels with a single source of truth.</li>
                  <li><strong>High CRUD Reliability:</strong> Ensure ACID-compliant storage and immediate state synchronization.</li>
                  <li><strong>Reduce Manual Effort:</strong> Streamline ticket discovery, status updates, and agent assignment.</li>
                  <li><strong>Intuitive UI/UX:</strong> Provide drag-and-drop Kanban workflows alongside robust search and filtering.</li>
                </>
              )}
            </ul>
          </div>

          <div className="pt-2 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              Target User Personas:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 text-xs pl-1">
              {isExpensify ? (
                <>
                  <li><strong>Employees:</strong> Submit expense reports, upload receipts, categorize spending, and track reimbursement status.</li>
                  <li><strong>Managers / Approvers:</strong> Review, approve, reject, or request information on team expense claims.</li>
                  <li><strong>Finance Teams / Admins:</strong> Monitor overall spending, audit policy violations, configure company spending rules, and process reimbursements.</li>
                </>
              ) : (
                <>
                  <li><strong>Support Agent:</strong> Day-to-day user who creates, updates, resolves, and manages assigned tickets across columns (Open, In Progress, Resolved).</li>
                  <li><strong>Support Manager:</strong> Administrative user who oversees queue distribution, monitors summary metrics, manages agent assignments, and audits ticket histories.</li>
                </>
              )}
            </ul>
          </div>

          <div className="pt-2 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              High-Level Architecture:
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-[11px] text-slate-700 space-y-1">
              <div>• Frontend: React 18 + Vite + Tailwind CSS (Responsive Single-Screen Workspace)</div>
              <div>• Backend API: Node.js + Hono REST Endpoints (/api/v1/tickets, /api/v1/auth)</div>
              <div>• Data Tier: PostgreSQL schema with ACID transactions, indexing & seed migrations</div>
              <div>• Realtime State: WebSocket state sync for collaborative ticket board operations</div>
              <div>• Security: JWT authentication, RBAC policy middleware, rate limiting</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
