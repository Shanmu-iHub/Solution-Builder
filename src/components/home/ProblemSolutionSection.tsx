import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="py-8 border-t border-[#E2DFD7]">
      <div className="max-w-3xl mb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
          The Real Problem vs Solution
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#151515] tracking-tight mt-1">
          Why is building modern cloud & AI systems so exhausting?
        </h2>
        <p className="text-xs sm:text-sm text-[#66635D] mt-1.5 leading-relaxed">
          Most engineering teams don't struggle because the code is hard. They struggle because their tools don't talk to each other.
        </p>
      </div>

      {/* Side-by-Side Honest Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: The Fragmented Way */}
        <div className="bg-white rounded-2xl border border-[#DDD9CE] p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-[#F0EEE8]">
            <XCircle className="w-4 h-4 text-[#8C887B]" />
            <h3 className="text-sm font-bold text-[#151515]">The Fragmented Approach</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-[#66635D]">
            <li className="flex items-start gap-2">
              <span className="text-[#8C887B] font-bold">—</span>
              <span><strong>8 different browser tabs:</strong> One for AWS console, one for OpenAI, one for Terraform Cloud, one for Datadog, one for Jira.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8C887B] font-bold">—</span>
              <span><strong>Manual YAML editing:</strong> Hand-crafting hundreds of lines of infrastructure code that inevitably drift from diagrams.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8C887B] font-bold">—</span>
              <span><strong>Surprise cloud bills:</strong> Unused GPU inference containers and orphaned disk volumes running silently for weeks.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8C887B] font-bold">—</span>
              <span><strong>Siloed AI experiments:</strong> Team members pasting sensitive data into random web chats with zero enterprise audit logs.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: The SNS Square Way */}
        <div className="bg-[#FAF9F6] rounded-2xl border-2 border-[#2563EB]/40 p-5 space-y-3 relative">
          <div className="absolute -top-3 right-5 bg-[#2563EB] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
            SNS Square System
          </div>

          <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2DFD7]">
            <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#151515]">Unified in One Workspace</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-[#151515]">
            <li className="flex items-start gap-2">
              <span className="text-[#2563EB] font-bold">✓</span>
              <span><strong>Visual-to-Code:</strong> Draw your cloud architecture on the canvas; receive production-ready Terraform/Bicep IaC immediately.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563EB] font-bold">✓</span>
              <span><strong>6 Autonomous Swarm Agents:</strong> Research, meeting notes, QA testing, and fact-checking coordinated under one roof.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563EB] font-bold">✓</span>
              <span><strong>Automated FinOps cost guards:</strong> Real-time waste detection with 1-click optimization before invoices balloon.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563EB] font-bold">✓</span>
              <span><strong>Enterprise multi-tenant privacy:</strong> Centralized SOC 2 audit logs, API key vaults, and local data sovereignty.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
