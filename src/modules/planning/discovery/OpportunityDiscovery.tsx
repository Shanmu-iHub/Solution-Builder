import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Globe, Target, Users } from 'lucide-react';
import { Button, cx } from '../../ui';
import { usePlanning } from '../PlanningStore';
import { OpportunityTab } from './OpportunityTab';
import { MarketDiscovery } from './MarketDiscovery';
import { UserDiscovery } from './UserDiscovery';

type TabKey = 'opportunity' | 'market' | 'customers';
const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'opportunity', label: 'Opportunity', icon: <Target className="w-3.5 h-3.5" /> },
  { key: 'market', label: 'Market & Industry', icon: <Globe className="w-3.5 h-3.5" /> },
  { key: 'customers', label: 'Customer Discovery', icon: <Users className="w-3.5 h-3.5" /> },
];

export const OpportunityDiscovery: React.FC<{ projectId: string; projectName: string; onContinue: () => void }> = ({ projectId, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const tab: TabKey = TABS.some(t => t.key === s.oppTab) ? (s.oppTab as TabKey) : 'opportunity';
  const idx = TABS.findIndex(t => t.key === tab);
  const isLast = idx === TABS.length - 1;
  const canContinue = tab !== 'opportunity' || !!s.selectedOpportunity;

  const openTab = (key: TabKey) => { patch(projectId, { oppTab: key }); };
  const next = () => (isLast ? confirm() : openTab(TABS[idx + 1].key));
  const confirm = () => {
    patch(projectId, { oppCompleted: true, discoveryPage: 'problem' });
    onContinue();
  };

  useEffect(() => {
    if (!s.marketBrief) {
      patch(projectId, {
        marketBrief: 'Make expense claims for field sales reps paperless and fast — from phone receipt capture through approval.'
      });
    }
  }, [s.marketBrief, projectId, patch]);

  const customerList: any[] = Array.isArray(s.customers) ? s.customers : [];
  const primaryCust = customerList.find(c => c.primary) || null;
  const canConfirm = !!primaryCust;

  return (
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6 space-y-6">
          <div>
            <div className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest">Phase · Discovery</div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] mt-2">Opportunity &amp; Discovery</h1>
            <p className="text-[15px] text-slate-500 mt-2 max-w-2xl">Establish the market and customer context for this initiative.</p>
          </div>

          <nav className="flex gap-7 border-b border-slate-200 overflow-x-auto" aria-label="Opportunity & Discovery sections">
            {TABS.map(t => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => openTab(t.key)}
                  aria-current={active ? 'page' : undefined}
                  className={cx('flex items-center gap-1.5 pb-2.5 text-[14.5px] whitespace-nowrap border-b-2 -mb-px cursor-pointer transition-colors', active ? 'border-[#0F172A] text-[#0F172A] font-semibold' : 'border-transparent text-slate-500 hover:text-slate-700')}
                >
                  <span className={active ? '' : 'opacity-70'}>{t.icon}</span>
                  {t.label}
                </button>
              );
            })}
          </nav>

          {tab === 'opportunity' && <OpportunityTab projectId={projectId} />}
          {tab === 'market' && <MarketDiscovery />}
          {tab === 'customers' && <UserDiscovery />}
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        {canContinue
          ? <div className="flex items-center gap-2 text-emerald-600 text-[13.5px] font-bold"><CheckCircle2 className="w-4 h-4" /> Ready to continue</div>
          : <div className="text-amber-600 text-[13.5px] font-bold">Select a primary opportunity to continue</div>}
        <Button variant="primary" disabled={!canContinue} onClick={next}>
          {isLast ? 'Confirm & Continue' : `Continue to ${TABS[idx + 1].label}`} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
