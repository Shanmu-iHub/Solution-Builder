import React, { useState } from 'react';
import {
  Sparkles,
  Lightbulb,
  HelpCircle,
  Compass,
  Eye,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RotateCcw,
  Check,
  Edit3
} from 'lucide-react';

interface IdeaUnderstandingStageProps {
  onStageUpdated?: (data: any) => void;
  onProceedToNextSubstep?: () => void;
}

export const IdeaUnderstandingStage: React.FC<IdeaUnderstandingStageProps> = ({
  onStageUpdated,
  onProceedToNextSubstep
}) => {
  const [activeSubstep, setActiveSubstep] = useState<'understand' | 'clarify' | 'directions' | 'vision' | 'confirm'>('understand');
  const [isAiUnderstandingOpen, setIsAiUnderstandingOpen] = useState(true);

  // Seed idea text matching Screenshot 2
  const [ideaText, setIdeaText] = useState(
    'Organizations struggle to manage the complete employee expense lifecycle because submission, receipt collection, policy validation, approvals, reimbursement, and reporting are spread across emails, spreadsheets, corporate card systems, HR platforms, and accounting tools. This creates manual effort, processing delays, errors, compliance risks, and limited visibility into organizational spending. The initiative aims to centralize and automate routine expense activities while keeping human oversight for exceptions and high-risk decisions.'
  );

  // Direction option selection
  const [selectedDirection, setSelectedDirection] = useState('unified');

  // Vision statement
  const [visionText, setVisionText] = useState(
    'A unified platform that centralizes and automates the entire expense lifecycle—integrating email, spreadsheets, corporate card, HR and accounting data—to capture receipts, enforce policies, route approvals and generate reports while preserving human oversight for exceptions and high-risk decisions.'
  );

  const directions = [
    {
      id: 'unified',
      badge: 'RECOMMENDED',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: 'Unified Expense Management Platform',
      description:
        'A single SaaS solution that connects to email, spreadsheets, corporate cards, HR and accounting systems to automate receipt capture, policy checks, approvals, reimbursements and reporting while keeping human oversight for exceptions.'
    },
    {
      id: 'assistant',
      badge: 'AMBITIOUS',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
      title: 'AI-Powered Expense Assistant',
      description:
        'An intelligent assistant that uses OCR and natural-language processing to extract receipt data, auto-validate policies and pre-approve low-risk expenses, surfacing only exceptions for manual review.'
    },
    {
      id: 'modular',
      badge: 'ALTERNATIVE',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      title: 'Modular API-First Expense Ecosystem',
      description:
        'A set of interchangeable micro-services for each expense step—submission, validation, approval, reimbursement, reporting—that organizations can embed into their own tools, preserving flexibility while centralizing core logic.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Substep Navigation (Understand, Clarify, Directions, Vision, Confirm) matching screenshots */}
      <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-xs font-semibold overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveSubstep('understand')}
          className={`flex items-center gap-1.5 cursor-pointer pb-2 -mb-3 transition-colors ${
            activeSubstep === 'understand'
              ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Understand</span>
        </button>

        <button
          onClick={() => setActiveSubstep('clarify')}
          className={`flex items-center gap-1.5 cursor-pointer pb-2 -mb-3 transition-colors ${
            activeSubstep === 'clarify'
              ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Clarify</span>
        </button>

        <button
          onClick={() => setActiveSubstep('directions')}
          className={`flex items-center gap-1.5 cursor-pointer pb-2 -mb-3 transition-colors ${
            activeSubstep === 'directions'
              ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Directions</span>
        </button>

        <button
          onClick={() => setActiveSubstep('vision')}
          className={`flex items-center gap-1.5 cursor-pointer pb-2 -mb-3 transition-colors ${
            activeSubstep === 'vision'
              ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vision</span>
        </button>

        <button
          onClick={() => setActiveSubstep('confirm')}
          className={`flex items-center gap-1.5 cursor-pointer pb-2 -mb-3 transition-colors ${
            activeSubstep === 'confirm'
              ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Confirm</span>
        </button>
      </div>

      {/* SUBSTEP 1: UNDERSTAND */}
      {activeSubstep === 'understand' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Define your idea</h3>
            <p className="text-xs text-slate-500 mt-1">
              Start with what you have. We'll structure the idea and clarify only what is missing.
            </p>
          </div>

          {/* Large text area */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              rows={6}
              className="w-full text-xs text-slate-800 leading-relaxed outline-hidden resize-y bg-transparent"
              placeholder="Describe your product idea..."
            />
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
              <span>{ideaText.length} / 3000</span>
              <button
                type="button"
                onClick={() =>
                  setIdeaText(
                    'Our field sales reps lose paper receipts and wait weeks for expense reimbursement because claims are handled through email and approved manually. I want reps to capture receipts on their phone and get claims approved faster.'
                  )
                }
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Use field-sales example
              </button>
            </div>
          </div>

          {/* AI Assistant Rewrite Helper */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>We can make the idea clearer without changing its meaning.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIdeaText(
                  'Centralize and automate the enterprise expense lifecycle with mobile receipt capture, automated policy validation, and intelligent approval routing, ensuring compliance while eliminating manual paperwork.'
                );
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Suggest rewrite
            </button>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveSubstep('clarify')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#18181b] hover:bg-black text-white shadow-xs cursor-pointer group"
            >
              <span>Continue to Clarify</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* SUBSTEP 2: CLARIFY */}
      {activeSubstep === 'clarify' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Clarification complete</h4>
              <p className="text-xs text-slate-500 mt-0.5">Next, explore a few directions this idea could take.</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubstep('directions')}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-[#18181b] text-white hover:bg-black cursor-pointer shadow-2xs"
            >
              Continue to directions
            </button>
          </div>

          {/* User Answers Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              YOUR ANSWERS
            </span>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500">QUESTION 1</span>
              <p className="font-semibold text-slate-900">Which roles would interact with the system on a daily basis?</p>
              <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Business owner, Admin / finance staff, Field sales representatives
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500">QUESTION 2</span>
              <p className="font-semibold text-slate-900">
                In your own words, what are the primary user roles involved in managing the expense lifecycle?
              </p>
              <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Finance and admin staff manage expense submissions and validation, managers handle approvals, and accountants or bookkeepers handle reimbursement, reconciliation, and reporting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBSTEP 3: DIRECTIONS */}
      {activeSubstep === 'directions' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Explore solution directions</h3>
            <p className="text-xs text-slate-500 mt-1">
              Based on your confirmed idea. Choose the direction you want to take forward.
            </p>
          </div>

          <div className="space-y-3">
            {directions.map((dir) => (
              <label
                key={dir.id}
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedDirection === dir.id
                    ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="direction"
                  checked={selectedDirection === dir.id}
                  onChange={() => setSelectedDirection(dir.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-sm font-semibold text-slate-900">{dir.title}</strong>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${dir.badgeClass}`}>
                      {dir.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{dir.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setActiveSubstep('vision')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#18181b] hover:bg-black text-white shadow-xs cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SUBSTEP 4: VISION */}
      {activeSubstep === 'vision' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Define the product vision</h3>
            <p className="text-xs text-slate-500 mt-1">
              One sentence on what this product aims to be. Edit it until it sounds right.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">
              Direction: Unified Expense Management Platform
            </div>
            <textarea
              value={visionText}
              onChange={(e) => setVisionText(e.target.value)}
              rows={4}
              className="w-full text-xs text-slate-800 leading-relaxed outline-hidden resize-none bg-slate-50 p-3 rounded-lg border border-slate-200/80"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() =>
                  setVisionText(
                    'An intelligent, mobile-first expense claims workflow that centralizes receipt capture, automates policy validation, and accelerates reimbursement approval.'
                  )
                }
                className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Regenerate
              </button>
              <span>{visionText.length} / 300</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setActiveSubstep('confirm')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#18181b] hover:bg-black text-white shadow-xs cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SUBSTEP 5: CONFIRM */}
      {activeSubstep === 'confirm' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Idea Brief confirmed</h3>
            <p className="text-xs text-slate-500 mt-1">This is the confirmed summary of your idea.</p>
          </div>

          {/* Confirmation Notice Banner */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Idea Brief v2.0 confirmed on 9/24/2026, 11:37:50 AM.</span>
          </div>

          {/* Grid of Confirmed Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">IDEA</span>
              <p className="text-slate-700 mt-1">centralize and automate routine expense activities while keeping human oversight for exceptions</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PROBLEM</span>
              <p className="text-slate-700 mt-1">receipt collection, policy validation, and reimbursement are spread across fragmented manual tools</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">INTENDED USERS</span>
              <p className="text-slate-700 mt-1">Business owner, Admin / finance staff, Field sales team</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">INTENDED OUTCOME</span>
              <p className="text-slate-700 mt-1">reduced manual effort, faster reimbursement cycles, fewer errors, lower compliance risk</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SELECTED DIRECTION</span>
              <p className="text-slate-900 font-semibold mt-1">Unified Expense Management Platform</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PRODUCT VISION</span>
              <p className="text-slate-700 mt-1">{visionText}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setActiveSubstep('understand')}
              className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-2 border border-slate-200 rounded-lg bg-white cursor-pointer"
            >
              Reopen to edit (v3.0)
            </button>
          </div>
        </div>
      )}

      {/* Bottom Accordion: AI UNDERSTANDING */}
      <div className="border border-slate-200/90 rounded-2xl bg-white overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => setIsAiUnderstandingOpen(!isAiUnderstandingOpen)}
          className="w-full flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-100/60 transition-colors cursor-pointer text-left border-b border-slate-100"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              AI UNDERSTANDING
            </span>
          </div>
          {isAiUnderstandingOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {isAiUnderstandingOpen && (
          <div className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">IDEA</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                    KNOWN
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  centralize and automate routine expense activities while keeping human oversight for exceptions and high-risk decisions
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">PROBLEM</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                    KNOWN
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  organizations struggle to manage the complete employee expense lifecycle because submission, receipt collection, policy validation, and approvals are spread across emails and spreadsheets
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">INTENDED USERS</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                    KNOWN
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">Business owner, Admin / finance staff</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">INTENDED OUTCOME</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                    KNOWN
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  reduced manual effort, faster processing, fewer errors, lower compliance risk, greater visibility into spending
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              AI suggestions do not become confirmed information until you accept or edit them.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
