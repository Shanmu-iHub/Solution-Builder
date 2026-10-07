import React, { createContext, useCallback, useContext, useState } from 'react';
import { daysAgo, uid } from '../ui';
import {
  DOC_DEFS, analyzeIdea, initialPlanningState, makeAnalysis, makeChains, makeCustomers, makeDirections, makeDocContent, makeFindings, makeJourneys, makeMarket, makeMarketBrief,
  makeOpportunity, makePersonas, makeProposal, makeStatements, makeTasks, makeVision, makeWireframes,
} from './content';
import { PlanningStage, PlanningState, SolutionProject } from './types';

interface Store {
  projects: SolutionProject[];
  state: (id: string) => PlanningState;
  patch: (id: string, p: Partial<PlanningState> | ((s: PlanningState) => Partial<PlanningState>)) => void;
  setStage: (id: string, stage: PlanningStage) => void;
  createProject: (name: string, description: string) => SolutionProject;
  updateProject: (id: string, name: string, description: string) => void;
  deleteProject: (id: string) => void;
}

const Ctx = createContext<Store | null>(null);

/** A project that has already been through discovery (used for the seeded demo rows). */
const discoveredState = (name: string, ideaText?: string): PlanningState => {
  const s = initialPlanningState();
  const dirs = makeDirections(name);
  const statements = makeStatements(name).map((x, i) => (i === 0 ? { ...x, status: 'confirmed' as const } : x));
  return {
    ...s,
    discoveryPage: 'problem', ideaStep: 'confirm', ideaReached: 4, idea: ideaText ?? `An AI-assisted service workspace for ${name} that unifies cases, knowledge and reporting.`, analyzed: true,
    slots: { ...analyzeIdea(`An AI-assisted service workspace for ${name}.`), users: { state: 'known', value: 'End customers, support staff', items: ['End customers', 'Support staff'] }, outcome: { state: 'known', value: 'Faster resolution', items: ['Faster resolution'] }, problem: { state: 'known', value: 'Fragmented knowledge and manual hand-offs slow every case.' }, context: { state: 'known', value: 'Existing CRM and email; cloud-first.' }, use_cases: { state: 'known', value: 'Resolve a billing question on first contact.', items: ['Resolve a billing question on first contact'] } },
    directions: dirs, selectedDirection: 'd1', vision: { text: makeVision(name, dirs[0].title), source: 'ai' }, briefConfirmed: true,
    oppTab: 'brief', opportunity: makeOpportunity(name), market: makeMarket(), customers: makeCustomers(), analysis: makeAnalysis(name), marketBrief: makeMarketBrief(), oppCompleted: true,
    pdStep: 'confirm', pdReached: 4, pdContext: true, chains: makeChains().map((c, i) => (i === 0 ? { ...c, status: 'confirmed' as const } : c)), statements, selectedStatement: 'st1',
    evidence: [{ id: 'ev1', description: 'Q2 support ticket export — 12,400 tickets', type: 'tickets', source: 'Helpdesk export', supports: ['frequency', 'severity'], origin: 'user_confirmed' }, { id: 'ev2', description: 'Customer survey (n=640)', type: 'survey', source: 'CX team', supports: ['customer_impact'], origin: 'user_confirmed' }],
    decision: { status: 'validated', note: 'Evidence from tickets and survey supports the statement.', decidedAt: daysAgo(4) },
    versions: [{ version: 'v1', status: 'confirmed', statement: statements[0].statement, validation: 'validated', at: daysAgo(4) }],
  };
};

const planningState = (name: string, ideaText: string | undefined, upTo: 'dashboard' | 'documentation' | 'validation' | 'ux' | 'wireframe' | 'tasks'): PlanningState => {
  const s = discoveredState(name, ideaText);
  const order = ['dashboard', 'documentation', 'validation', 'ux', 'wireframe', 'tasks'];
  const at = order.indexOf(upTo);
  const docs: PlanningState['docs'] = {};
  DOC_DEFS.forEach(d => (docs[d.type] = { status: at >= 1 ? 'completed' : 'none', content: at >= 1 ? makeDocContent(d.type, name) : '' }));
  const personas = makePersonas(name);
  return {
    ...s,
    proposal: makeProposal(name), solutionApproved: true, docs,
    validation: at >= 2 ? { status: 'completed', findings: makeFindings(), at: daysAgo(1) } : s.validation,
    personas: at >= 3 ? personas : [], journeys: at >= 3 ? makeJourneys(personas) : [],
    wireframes: at >= 4 ? makeWireframes() : [],
    tasks: at >= 5 ? { epics: makeTasks(), review: 'pending', notes: '' } : null,
  };
};

const seedProjects: SolutionProject[] = [
  { id: 'sp-expensify', name: 'ExpensifyIQ', description: 'An intelligent expense management platform that simplifies expense submission, approvals, and policy compliance while improving spending visibility for finance teams.', stage: 'documentation', createdAt: daysAgo(5), updatedAt: daysAgo(1) },
  { id: 'sp-support', name: 'Customer Support AI', description: 'AI-assisted support workspace for a regional telecom: faster answers, fewer repeat contacts.', stage: 'requirement_context', createdAt: daysAgo(3), updatedAt: daysAgo(1) },
  { id: 'sp-claims', name: 'Claims Automation Portal', description: 'Self-service claim intake with automated triage and adjuster workbench for a regional insurer.', stage: 'requirement_context', createdAt: daysAgo(9), updatedAt: daysAgo(1) },
  { id: 'sp-hr', name: 'HR Onboarding Assistant', description: 'Conversational onboarding for new hires across 12 countries: paperwork, equipment, training.', stage: 'requirement_context', createdAt: daysAgo(14), updatedAt: daysAgo(2) },
  { id: 'sp-fleet', name: 'Fleet Telematics Dashboard', description: 'Live vehicle tracking, driver safety scoring and maintenance forecasting for a logistics fleet.', stage: 'solution_dashboard', createdAt: daysAgo(16), updatedAt: daysAgo(3) },
  { id: 'sp-loan', name: 'Loan Origination Portal', description: 'Digital loan application, scoring and approval workflow for retail banking.', stage: 'documentation', createdAt: daysAgo(18), updatedAt: daysAgo(2) },
  { id: 'sp-insure', name: 'Policy Renewal Advisor', description: 'Proactive renewal recommendations and quote comparison for commercial insurance brokers.', stage: 'ux_foundation', createdAt: daysAgo(27), updatedAt: daysAgo(4) },
  { id: 'sp-retail', name: 'Retail Analytics Hub', description: 'Unified store, inventory and demand analytics for a 120-store retail chain.', stage: 'task_breakdown', createdAt: daysAgo(40), updatedAt: daysAgo(5) },
];

const IDEAS = {
  expensify: 'An intelligent expense management platform that simplifies expense submission, approvals, and policy compliance while improving spending visibility for finance teams.',
  support: 'An AI customer support platform for a regional telecom that helps customers get faster answers and reduces support staff workload by grounding every reply in approved knowledge.',
  claims: 'A claims automation portal where policyholders report a loss in minutes, claims are triaged by severity and fraud risk, and adjusters work from one unified case file.',
  hr: 'A conversational HR assistant that guides new hires through paperwork, equipment, accounts and compliance training so they are productive in their first week.',
  fleet: 'A fleet telematics dashboard that shows live vehicle positions, scores driver safety and forecasts maintenance to cut downtime and fuel cost.',
  loan: 'A digital loan origination portal that lets retail customers apply online, get a scored decision quickly and complete documents without visiting a branch.',
  insure: 'A renewal advisor that helps brokers spot at-risk policies early, compare quotes and send tailored renewal recommendations.',
  retail: 'A unified analytics hub that brings store sales, inventory and demand forecasts together so category managers can act before stock-outs happen.',
};

/** Discovery finished up to (but not including) the given point — used to seed in-progress projects. */
const inProgress = (name: string, idea: string, where: 'opportunity' | 'problem'): PlanningState => {
  const base = discoveredState(name, idea);
  if (where === 'opportunity') {
    return { ...base, discoveryPage: 'opportunity', oppTab: 'customers', customers: null, analysis: null, marketBrief: null, oppCompleted: false, pdStep: 'understand', pdReached: 0, pdContext: false, pdAnswers: {}, chains: [], statements: [], selectedStatement: null, executive: null, evidence: [], decision: null, versions: [] };
  }
  return { ...base, discoveryPage: 'problem', pdStep: 'validate', pdReached: 3, decision: null, versions: [], evidence: base.evidence.slice(0, 1) };
};

const seedStates = (): Record<string, PlanningState> => {
  const expensify = planningState('ExpensifyIQ', IDEAS.expensify, 'documentation');
  const expensifyDocs = { ...expensify.docs };
  DOC_DEFS.slice(0, 4).forEach(d => (expensifyDocs[d.type] = { status: 'completed', content: makeDocContent(d.type, 'ExpensifyIQ') }));

  const loan = planningState('Loan Origination Portal', IDEAS.loan, 'dashboard');
  const loanDocs = { ...loan.docs };
  DOC_DEFS.slice(0, 4).forEach(d => (loanDocs[d.type] = { status: 'completed', content: makeDocContent(d.type, 'Loan Origination Portal') }));
  const fleet = planningState('Fleet Telematics Dashboard', IDEAS.fleet, 'dashboard');
  const insure = planningState('Policy Renewal Advisor', IDEAS.insure, 'validation');
  return {
    'sp-expensify': { ...expensify, docs: expensifyDocs },
    'sp-support': { ...initialPlanningState(), idea: IDEAS.support },
    'sp-claims': inProgress('Claims Automation Portal', IDEAS.claims, 'opportunity'),
    'sp-hr': inProgress('HR Onboarding Assistant', IDEAS.hr, 'problem'),
    'sp-fleet': { ...fleet, solutionApproved: false, docs: Object.fromEntries(Object.keys(fleet.docs).map(k => [k, { status: 'none' as const, content: '' }])) },
    'sp-loan': { ...loan, docs: loanDocs },
    'sp-insure': { ...insure, personas: [], journeys: [] },
    'sp-retail': planningState('Retail Analytics Hub', IDEAS.retail, 'tasks'),
  };
};

export const PlanningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<SolutionProject[]>(seedProjects);
  const [states, setStates] = useState<Record<string, PlanningState>>(seedStates);
  const blank = React.useRef(initialPlanningState());

  const patch = useCallback<Store['patch']>((id, p) => {
    setStates(all => {
      const cur = all[id] ?? initialPlanningState();
      return { ...all, [id]: { ...cur, ...(typeof p === 'function' ? p(cur) : p) } };
    });
    setProjects(list => list.map(x => (x.id === id ? { ...x, updatedAt: new Date().toISOString() } : x)));
  }, []);

  const store: Store = {
    projects,
    state: id => states[id] ?? blank.current,
    patch,
    setStage: (id, stage) => setProjects(list => list.map(x => (x.id === id ? { ...x, stage, updatedAt: new Date().toISOString() } : x))),
    createProject: (name, description) => {
      const now = new Date().toISOString();
      const p: SolutionProject = { id: `sp-${uid('x').slice(2)}`, name, description, stage: 'requirement_context', createdAt: now, updatedAt: now };
      setProjects(list => [p, ...list]);
      setStates(all => ({ ...all, [p.id]: { ...initialPlanningState(), idea: description ? `${description} Teams currently handle this manually with spreadsheets and email, which is slow and error-prone.` : '' } }));
      return p;
    },
    updateProject: (id, name, description) => setProjects(list => list.map(x => (x.id === id ? { ...x, name, description, updatedAt: new Date().toISOString() } : x))),
    deleteProject: id => { setProjects(list => list.filter(x => x.id !== id)); setStates(all => { const { [id]: _d, ...rest } = all; return rest; }); },
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

export const usePlanning = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePlanning must be used within PlanningProvider');
  return ctx;
};
