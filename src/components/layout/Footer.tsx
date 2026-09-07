import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Shield, Cpu, Activity, ExternalLink } from 'lucide-react';
import snsLogo from '../../assets/SNS Square Logo.png';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToProduct, navigateToService, navigateToAgent } = useNavigation();

  return (
    <footer className="bg-[#07111F] text-slate-300 border-t border-[#1E293B] mt-16 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={snsLogo}
                alt="SNS Square Logo"
                className="w-7 h-7 object-contain rounded-md"
              />
              <span className="text-white font-bold text-base">SNS Square</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              "Build. Automate. Analyze. Scale."
              <br />
              One intelligent workspace for your products, services, AI agents, operations, and business automation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Operational 99.99%
              </span>
              <span className="text-slate-400 text-[11px]">SOC 2 Type II Certified</span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Enterprise Products</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigateToProduct('finops')} className="hover:text-white transition-colors cursor-pointer">FinOps & Cloud Cost</button></li>
              <li><button onClick={() => navigateToProduct('monitoring')} className="hover:text-white transition-colors cursor-pointer">Monitoring & Telemetry</button></li>
              <li><button onClick={() => navigateToProduct('testing')} className="hover:text-white transition-colors cursor-pointer">Testing & AI Evals</button></li>
              <li><button onClick={() => navigateToProduct('devops')} className="hover:text-white transition-colors cursor-pointer">DevOps & CI/CD</button></li>
              <li><button onClick={() => navigateToProduct('compliance')} className="hover:text-white transition-colors cursor-pointer">Security & Compliance</button></li>
              <li><button onClick={() => navigateToProduct('analytics')} className="hover:text-white transition-colors cursor-pointer">Analytics & BI</button></li>
              <li><button onClick={() => navigateToProduct('audit')} className="hover:text-white transition-colors cursor-pointer">Audit & Trails</button></li>
              <li><button onClick={() => navigateToProduct('gamifications')} className="hover:text-white transition-colors cursor-pointer">Gamifications Hub</button></li>
            </ul>
          </div>

          {/* Col 3: AI Services & Agents */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Services & Agents</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigateToService('ai-chat')} className="hover:text-white transition-colors">AI Chat Studio</button></li>
              <li><button onClick={() => navigateToService('ai-image')} className="hover:text-white transition-colors">Generative AI Image</button></li>
              <li><button onClick={() => navigateToAgent('deep-research')} className="hover:text-white transition-colors">Deep Research Agent</button></li>
              <li><button onClick={() => navigateToAgent('meeting-notes')} className="hover:text-white transition-colors">Meeting Notes Agent</button></li>
              <li><button onClick={() => navigateToAgent('call-for-me')} className="hover:text-white transition-colors">Call For Me Telephony</button></li>
              <li><button onClick={() => navigateToAgent('fact-check')} className="hover:text-white transition-colors">Fact Check Engine</button></li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Workspace</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setCurrentView('projects')} className="hover:text-white transition-colors">Projects Console</button></li>
              <li><button onClick={() => setCurrentView('activity')} className="hover:text-white transition-colors">Live Activity Feed</button></li>
              <li><button onClick={() => setCurrentView('usage')} className="hover:text-white transition-colors">Telemetry & Quotas</button></li>
              <li><button onClick={() => setCurrentView('billing')} className="hover:text-white transition-colors">Billing & Subscriptions</button></li>
              <li><button onClick={() => setCurrentView('support')} className="hover:text-white transition-colors">Help & Support Tickets</button></li>
              <li><button onClick={() => setCurrentView('settings')} className="hover:text-white transition-colors">API Keys & Webhooks</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-3">
          <p>© 2026 SNS Square Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security Portal</span>
            <span className="hover:text-white cursor-pointer">Status Page</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
