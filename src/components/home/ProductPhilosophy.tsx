import React from 'react';
import { Shield, Lock, FileCode } from 'lucide-react';

export const ProductPhilosophy: React.FC = () => {
  return (
    <section className="py-8 border-t border-[#E2DFD7]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Founder & Engineering Note (Col 1-5) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
            Behind The Scenes
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#151515] tracking-tight leading-tight">
            Why we built SNS Square.
          </h2>
          <div className="text-xs sm:text-sm text-[#66635D] space-y-2.5 leading-relaxed">
            <p>
              "We were tired of opening 8 different tabs just to architect a simple cloud backend, configure testing, run AI agents, and check our monthly AWS spend."
            </p>
            <p>
              "Most enterprise software feels bloated and disconnected. We built SNS Square with one goal: to create a clean, trustworthy workspace where engineers can move from concept to deployment without losing context."
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ECEAE4] border border-[#DDD9CE] text-[#151515] font-bold text-xs flex items-center justify-center">
              SS
            </div>
            <div>
              <span className="block text-xs font-bold text-[#151515]">Sanmugavel S</span>
              <span className="text-[11px] text-[#8C887B]">SNS Square Engineering & Product</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Core Engineering Commitments (Col 6-12) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 bg-white rounded-xl border border-[#DDD9CE] space-y-2">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E2DFD7] text-[#151515] w-fit">
              <FileCode className="w-4 h-4 text-[#2563EB]" />
            </div>
            <h4 className="text-xs font-bold text-[#151515]">Zero Vendor Lock-In</h4>
            <p className="text-[11px] text-[#66635D] leading-relaxed">
              Every architecture diagram exports to standard Terraform or Bicep IaC. You own your code 100%.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#DDD9CE] space-y-2">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E2DFD7] text-[#151515] w-fit">
              <Lock className="w-4 h-4 text-[#2563EB]" />
            </div>
            <h4 className="text-xs font-bold text-[#151515]">Data Sovereignty</h4>
            <p className="text-[11px] text-[#66635D] leading-relaxed">
              Your telemetry and prompts never train third-party foundation models. SOC 2 Type II compliant.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#DDD9CE] space-y-2">
            <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E2DFD7] text-[#151515] w-fit">
              <Shield className="w-4 h-4 text-[#2563EB]" />
            </div>
            <h4 className="text-xs font-bold text-[#151515]">Predictable Billing</h4>
            <p className="text-[11px] text-[#66635D] leading-relaxed">
              No hidden inference markups. FinOps cost guardrails alert your team before surprise charges occur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
