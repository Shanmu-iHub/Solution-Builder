import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { Button, cx, sleep, CSuiteValidation } from '../../ui';
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

const FINDS = [
  { t: 'SAP Concur offers mobile receipt capture and an expense approval workflow.', s: 'concur.com' },
  { t: 'Expensify scans receipts from a phone photo and routes reports for approval.', s: 'expensify.com' },
  { t: 'Zoho Expense supports receipt scanning, policy rules and multi-level approval.', s: 'zoho.com/expense' },
  { t: 'Microsoft Power Automate can route approvals through Teams and email.', s: 'learn.microsoft.com' }
];

const SEGS = [
  { id: 's_reps', t: 'Field sales reps', role: 'Submit claims', wants: 'Get reimbursed quickly', str: 'Keeping paper receipts on the road', today: 'Email receipts and wait' },
  { id: 's_mgr', t: 'Line managers', role: 'Approve claims', wants: 'Approve without chasing email', str: 'Claims arrive scattered in the inbox', today: 'Approve manually by email' },
  { id: 's_fin', t: 'Finance team', role: 'Check and pay', wants: 'Clean, policy-checked claims', str: 'Manual processing', today: 'Not provided' },
];
const SUG_SEG = { id: 's_ops', t: 'Sales operations', role: 'Sets expense rules for the sales team', wants: 'Enforce travel & expense rules', str: 'Policy non-compliance', today: 'Spreadsheets & email' };

export const OpportunityDiscovery: React.FC<{ projectId: string; projectName: string; onContinue: () => void }> = ({ projectId, onContinue }) => {
  const { state, patch } = usePlanning();
  const s = state(projectId);
  const [busy, setBusy] = useState(false);
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({ opp: true, mkt: true, cust: true });
  const [drafting, setDrafting] = useState(false);
  const [sugState, setSugState] = useState<'open' | 'added' | 'dismissed'>('open');

  const toggle = (id: string) => setOpenSecs(prev => ({ ...prev, [id]: !prev[id] }));
  
  const hasBrief = !!s.marketBrief;

  const generate = async () => {
    setBusy(true); setDrafting(true);
    await sleep(2000);
    patch(projectId, { 
      marketBrief: 'Make expense claims for field sales reps paperless and fast — from phone receipt capture through approval.'
    });
    setBusy(false); setDrafting(false);
    setOpenSecs({ opp: true, mkt: true, cust: true });
  };

  const confirm = () => {
    patch(projectId, { discoveryPage: 'problem' });
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
    <div className="flex flex-col h-full bg-slate-50/60 overflow-hidden relative">
      <StageResourceActivity active={drafting} activity="Synthesizing opportunity and customer context" />
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Opportunity Discovery</h1>
          <p className="text-[15px] text-slate-500 mt-1">Market research and customer segments.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[12.5px] font-bold">
          Market Brief · Draft v0.1
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
          <Section num="01" title="Opportunity" summary={typeof s.marketBrief === 'string' ? s.marketBrief : ''} open={openSecs.opp} onToggle={() => toggle('opp')}>
            <div className="space-y-6 pt-2">
              <p className="text-[17px] font-medium text-[#0F172A] leading-relaxed">{typeof s.marketBrief === 'string' ? s.marketBrief : ''}</p>
              
              <div>
                <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-3">Four lenses</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                    <span className="text-[14px] text-[#0F172A]">Faster, tracked reimbursement with less manual handling by managers and finance.</span>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest">Business</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                    <span className="text-[14px] text-[#0F172A]">Reps stop losing receipts and know where their claim is.</span>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest">Customer</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                    <span className="text-[14px] text-[#0F172A]">Several established expense tools already offer mobile receipt capture.</span>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest">Market</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                    <span className="text-[14px] text-[#0F172A]">Target finance system not known yet.</span>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-widest">Technology</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
          
          <Section num="02" title="Market research" summary={`${FINDS.length} findings · 2 gaps`} open={openSecs.mkt} onToggle={() => toggle('mkt')}>
            <div className="space-y-6 pt-2">
              <div className="space-y-3">
                {FINDS.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-500 shrink-0 mt-0.5">{i+1}</span>
                    <div>
                      <p className="text-[14px] text-[#0F172A]">{f.t}</p>
                      <a href={`https://${f.s}`} target="_blank" className="inline-flex items-center gap-1 mt-1 text-[12px] text-blue-600 hover:underline">
                        <ExternalLink className="w-3 h-3" /> {f.s}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-[12.5px] font-bold text-slate-800 uppercase mb-3">Searched for, not found</h4>
                <div className="space-y-2 text-[14px] text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">Market size for field-sales expense tools</div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">Rate of lost receipts in field sales</div>
                </div>
              </div>
            </div>
          </Section>

          <Section num="03" title="Customers" summary={`Primary: ${primaryCust?.name || 'Not chosen'}`} need={!primaryCust ? "Choose primary" : null} open={openSecs.cust} onToggle={() => toggle('cust')}>
            <div className="space-y-4 pt-2">
              <p className="text-[12.5px] text-slate-500 mb-2">Pick the primary customer — the product is designed for them first.</p>
              
              <div className="grid gap-3">
                {SEGS.concat(sugState === 'added' ? [SUG_SEG] : []).map(s => {
                  const isPrimary = primaryCust?.id === s.id;
                  return (
                    <button 
                      key={s.id} 
                      onClick={() => patch(projectId, st => ({ 
                        customers: SEGS.concat(sugState === 'added' ? [SUG_SEG] : []).map(x => ({ id: x.id, name: x.t, type: x.role, primary: x.id === s.id }))
                      }))}
                      className={cx("w-full text-left p-4 rounded-xl border transition cursor-pointer relative", isPrimary ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-slate-300")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={cx("text-[15px] font-bold", isPrimary ? "text-[#1D4ED8]" : "text-[#0F172A]")}>{s.t} {isPrimary && <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[11px] uppercase tracking-widest font-bold">Primary</span>}</span>
                      </div>
                      <div className="text-[13.5px] text-slate-600 space-y-1">
                        <div className="flex"><span className="w-20 font-semibold text-slate-400 text-[12px] uppercase">Role</span> {s.role}</div>
                        {s.wants && <div className="flex"><span className="w-20 font-semibold text-slate-400 text-[12px] uppercase">Wants</span> {s.wants}</div>}
                        {s.str && <div className="flex"><span className="w-20 font-semibold text-slate-400 text-[12px] uppercase">Struggles</span> {s.str}</div>}
                        {s.today && <div className="flex"><span className="w-20 font-semibold text-slate-400 text-[12px] uppercase">Today</span> {s.today}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {sugState === 'open' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-4">
                  <div className="flex items-center gap-2 mb-1"><span className="text-[14.5px] font-bold text-[#0F172A]">{SUG_SEG.t}</span> <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[11px] font-bold uppercase tracking-wider">AI Suggestion</span></div>
                  <p className="text-[13.5px] text-slate-600 mb-3">{SUG_SEG.role}</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="text-[13px] py-1" onClick={() => setSugState('added')}>Add</Button>
                    <Button variant="ghost" className="text-[13px] py-1" onClick={() => setSugState('dismissed')}>Dismiss</Button>
                  </div>
                </div>
              )}
            </div>
          </Section>
        </div>

        {/* Side Panel */}
        <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[19px] font-bold text-[#0F172A]">Market Brief</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11.5px] font-bold uppercase tracking-widest">Draft v0.1</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Opportunity</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{typeof s.marketBrief === 'string' ? s.marketBrief : (s.marketBrief ? 'Market Brief Available' : '')}</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Customer</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{primaryCust?.name || 'Not decided'}</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Segments</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{customerList.map((c: any) => c.name).join(', ') || SEGS.map(s => s.t).join(', ')}</p></div>
            <div><span className="block text-[11.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">Market Findings</span><p className="text-[14.5px] text-[#0F172A] leading-snug">{FINDS.length} products found</p></div>
            
            <div className="pt-2">
              <CSuiteValidation stageId="opportunity" status={canConfirm ? 'Validated' : 'Pending'} />
            </div>
          </div>
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
            {canConfirm ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600 text-[13.5px] font-bold mb-2"><CheckCircle2 className="w-4 h-4" /> Ready to confirm</div>
                <Button variant="primary" className="w-full text-[15px] py-2.5" onClick={onContinue}>Confirm & Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-600 text-[13.5px] font-bold mb-2">Pending decisions</div>
                <Button className="w-full text-[15px] py-2.5" disabled>Confirm Market Brief</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
