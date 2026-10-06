import { daysAgo } from '../ui';
import { domainFor } from './domainData';
import { AvailableProject, CollectionPreview, FoundRecord, MapEdge, MapNode, ProjectGraphDefinition, ProjectMap, ProjectView } from './types';

export const ALLOWED_COLLECTIONS = ['business_requirements', 'product_definitions', 'srs_documents', 'architecture_docs', 'wireframes', 'task_breakdowns', 'stakeholder_register'];

export const DEFAULT_DEFINITION: ProjectGraphDefinition = {
  entitySources: [
    { id: 'br', collection: 'business_requirements', entityType: 'BusinessRequirement', path: 'register.items', idField: 'req_id', labelField: 'title', textFields: ['statement', 'priority'], versionField: 'version', latestOnly: true },
    { id: 'go', collection: 'product_definitions', entityType: 'Goal', path: 'goals', idField: 'go_id', idPrefix: 'pd.', labelField: 'name', textFields: ['description', 'metric'] },
    { id: 'ft', collection: 'product_definitions', entityType: 'Feature', path: 'features', idField: 'ft_id', idPrefix: 'pd.', labelField: 'name', textFields: ['description', 'priority'] },
    { id: 'ep', collection: 'product_definitions', entityType: 'Epic', path: 'epics', idField: 'ep_id', labelField: 'name', textFields: ['description'], parent: 'ft', parentRelationship: 'CONTAINS' },
    { id: 'fr', collection: 'srs_documents', entityType: 'FunctionalRequirement', path: 'functional.items', idField: 'fr_id', labelField: 'title', textFields: ['behaviour', 'acceptance'], latestOnly: true },
    { id: 'st', collection: 'stakeholder_register', entityType: 'Stakeholder', path: 'stakeholders', idField: 'sh_id', labelField: 'name', textFields: ['role', 'concern'] },
    { id: 'cmp', collection: 'architecture_docs', entityType: 'Component', path: 'components', idField: 'cmp_id', labelField: 'name', textFields: ['responsibility', 'tech'] },
  ],
  relationships: [
    { name: 'SUPPORTS', kind: 'reference', from: 'ft', field: 'goal_ids', to: 'go', valuePrefix: 'pd.' },
    { name: 'TRACES_TO', kind: 'reference', from: 'fr', field: 'traces_to', to: 'br' },
    { name: 'DELIVERS', kind: 'reference', from: 'fr', field: 'feature_id', to: 'ft' },
    { name: 'IMPLEMENTS', kind: 'reference', from: 'cmp', field: 'implements', to: ['fr', 'ft'] },
    { name: 'RAISED_BY', kind: 'commonValue', from: 'br', fromField: 'owner', to: 'st', toField: 'name' },
  ],
};

const base = (o: Partial<ProjectView> & Pick<ProjectView, 'projectId' | 'name'>): ProjectView => ({
  description: null,
  phase: 'Planning',
  stage: 'Requirements',
  status: 'registered',
  isDefaultDefinition: true,
  build: { buildId: null, phase: null, progress: null, startedAt: null, completedAt: null, stats: null, report: null, error: null },
  registeredAt: daysAgo(20),
  updatedAt: daysAgo(2),
  ...o,
});

export const seedProjects: ProjectView[] = [
  base({
    projectId: 'prj-loyalty',
    name: 'Customer Loyalty Platform',
    description: 'Points, tiers and partner rewards for retail banking customers.',
    phase: 'Planning',
    stage: 'Architecture',
    status: 'ready',
    registeredAt: daysAgo(30),
  }),
  base({
    projectId: 'prj-claims',
    name: 'Claims Automation Portal',
    description: 'Self-service claim intake with automated triage for a regional insurer.',
    phase: 'Planning',
    stage: 'Requirements',
    status: 'registered',
    registeredAt: daysAgo(6),
  }),
  base({
    projectId: 'prj-hr',
    name: 'HR Onboarding Assistant',
    description: 'Conversational onboarding assistant for new hires across 12 countries.',
    phase: 'Build',
    stage: 'Development',
    status: 'failed',
    isDefaultDefinition: false,
    registeredAt: daysAgo(14),
    build: { buildId: 'b-4410', phase: 'extracting', progress: { total: 100, done: 42 }, startedAt: daysAgo(1), completedAt: null, stats: null, report: null, error: 'A reference pointed at a collection that is not allowed for this project (stakeholder_register.manager_ref).' },
  }),
];

export const availableRegistry: AvailableProject[] = [
  { projectId: 'prj-fleet', name: 'Fleet Telematics Dashboard', phase: 'Planning', stage: 'Idea definition' },
  { projectId: 'prj-vendor', name: 'Vendor Risk Scoring', phase: 'Planning', stage: 'Product definition' },
  { projectId: 'prj-patient', name: 'Patient Intake Bot', phase: 'Planning', stage: 'Requirements' },
  { projectId: 'prj-retail', name: 'Retail Inventory Optimizer', phase: 'Build', stage: 'Development' },
  { projectId: 'prj-legal', name: 'Contract Review Copilot', phase: 'Planning', stage: 'Architecture' },
];

/* ── Deterministic pseudo-random so the same project always yields the same map ── */

const hash = (s: string) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
};
const rng = (seed: number) => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};

export const buildMap = (projectId: string, def: ProjectGraphDefinition): ProjectMap => {
  const rand = rng(hash(projectId));
  const pack = domainFor(projectId);
  const nodes: MapNode[] = [];
  const byType = new Map<string, MapNode[]>();

  def.entitySources.forEach(src => {
    const bank = pack[src.entityType] || [1, 2, 3, 4, 5, 6].map(i => ({ id: `${src.id.toUpperCase()}-${String(i).padStart(2, '0')}`, label: `${src.entityType} ${i}`, text: `${src.entityType} read from ${src.collection}.` }));
    bank.forEach((en, i) => {
      const node: MapNode = { id: `${src.idPrefix || ''}${en.id}`, type: src.entityType, label: en.label, description: en.text, version: src.versionField ? `v${1 + (i % 3)}` : null };
      nodes.push(node);
      byType.set(src.entityType, [...(byType.get(src.entityType) || []), node]);
    });
  });

  const edges: MapEdge[] = [];
  const typeOfSource = new Map(def.entitySources.map(s => [s.id, s.entityType]));
  const push = (source: string, target: string, type: string) => {
    if (source !== target && !edges.some(e => e.source === source && e.target === target && e.type === type)) edges.push({ id: `e-${edges.length}`, source, target, type });
  };
  def.entitySources.filter(s => s.parent).forEach(s => {
    const parents = byType.get(typeOfSource.get(s.parent!) || '') || [];
    (byType.get(s.entityType) || []).forEach((child, i) => parents.length && push(parents[i % parents.length].id, child.id, s.parentRelationship || 'CONTAINS'));
  });
  def.relationships.forEach(r => {
    const from = byType.get(typeOfSource.get(r.from) || '') || [];
    const targets = (Array.isArray(r.to) ? r.to : [r.to]).flatMap(t => byType.get(typeOfSource.get(t) || '') || []);
    if (!targets.length) return;
    from.forEach((f, i) => {
      push(f.id, targets[(i + Math.floor(rand() * 3)) % targets.length].id, r.name);
      if (rand() > 0.6) push(f.id, targets[Math.floor(rand() * targets.length)].id, r.name);
    });
  });

  const entityTypeCounts: Record<string, number> = {};
  nodes.forEach(n => (entityTypeCounts[n.type] = (entityTypeCounts[n.type] || 0) + 1));
  const relationshipTypeCounts: Record<string, number> = {};
  edges.forEach(e => (relationshipTypeCounts[e.type] = (relationshipTypeCounts[e.type] || 0) + 1));
  return { nodes, edges, totalNodes: nodes.length, entityTypeCounts, relationshipTypeCounts };
};


/* ── Data preview ──────────────────────────────────────────────────────── */

const f = (path: string, types: string[], seenIn: number) => ({ path, types, seenIn });

export const buildSchema = (projectId: string): CollectionPreview[] => {
  const rand = rng(hash(projectId + 'schema'));
  const docs = () => 1 + Math.floor(rand() * 5);
  return [
    {
      collection: 'business_requirements', exists: true, documentCount: docs(), fieldsTruncated: false,
      fields: [f('projectId', ['string'], 3), f('version', ['number'], 3), f('register.items', ['array'], 3), f('register.items.*.req_id', ['string'], 3), f('register.items.*.title', ['string'], 3), f('register.items.*.statement', ['string'], 3), f('register.items.*.priority', ['string'], 3), f('register.items.*.owner', ['string'], 2), f('createdAt', ['date'], 3)],
      samples: [{ projectId, version: 3, register: { items: [{ req_id: 'BR-001', title: 'Single sign-on for staff', statement: 'Staff sign in once and reach every internal tool…', priority: 'High', owner: 'Compliance Officer' }, { req_id: 'BR-002', title: 'Audit trail for every change', statement: 'Every change to a customer record is logged…', priority: 'High', owner: 'Head of Retail' }] } }],
    },
    {
      collection: 'product_definitions', exists: true, documentCount: docs(), fieldsTruncated: false,
      fields: [f('goals', ['array'], 2), f('goals.*.go_id', ['string'], 2), f('goals.*.name', ['string'], 2), f('goals.*.metric', ['string', 'null'], 2), f('features', ['array'], 2), f('features.*.ft_id', ['string'], 2), f('features.*.name', ['string'], 2), f('features.*.goal_ids', ['array'], 2), f('epics', ['array'], 2), f('epics.*.ep_id', ['string'], 2)],
      samples: [{ goals: [{ go_id: 'go_1', name: 'Reduce onboarding time by 40%', metric: '<= 3 days' }], features: [{ ft_id: 'ft_1', name: 'Rewards catalogue', goal_ids: ['go_1'] }] }],
    },
    {
      collection: 'srs_documents', exists: true, documentCount: docs(), fieldsTruncated: true,
      fields: [f('functional.items', ['array'], 2), f('functional.items.*.fr_id', ['string'], 2), f('functional.items.*.title', ['string'], 2), f('functional.items.*.traces_to', ['string', 'array'], 2), f('functional.items.*.behaviour', ['string'], 2), f('functional.items.*.acceptance', ['array'], 2), f('nonFunctional.items', ['array'], 2)],
      samples: [{ functional: { items: [{ fr_id: 'FR-001', title: 'Authenticate user', traces_to: ['BR-001'], behaviour: 'The system shall authenticate…', acceptance: ['Given valid credentials…'] }] } }],
    },
    {
      collection: 'architecture_docs', exists: true, documentCount: 1, fieldsTruncated: false,
      fields: [f('components', ['array'], 1), f('components.*.cmp_id', ['string'], 1), f('components.*.name', ['string'], 1), f('components.*.tech', ['string'], 1), f('components.*.implements', ['array'], 1)],
      samples: [{ components: [{ cmp_id: 'cmp_1', name: 'Points Service', tech: 'Node.js / Postgres', implements: ['FR-002', 'FR-003'] }] }],
    },
    {
      collection: 'stakeholder_register', exists: true, documentCount: 1, fieldsTruncated: false,
      fields: [f('stakeholders', ['array'], 1), f('stakeholders.*.sh_id', ['string'], 1), f('stakeholders.*.name', ['string'], 1), f('stakeholders.*.role', ['string'], 1), f('stakeholders.*.concern', ['string'], 1)],
      samples: [{ stakeholders: [{ sh_id: 'sh_1', name: 'Compliance Officer', role: 'Approver', concern: 'Regulatory exposure' }] }],
    },
    { collection: 'wireframes', exists: true, documentCount: 0, fields: [], fieldsTruncated: false, samples: [] },
    { collection: 'task_breakdowns', exists: false, documentCount: 0, fields: [], fieldsTruncated: false, samples: [] },
  ];
};

/* ── Search ────────────────────────────────────────────────────────────── */

const SYNONYM_GROUPS: string[][] = [
  ['login', 'signin', 'sign', 'authenticate', 'authentication', 'sso', 'identity', 'password', 'credential', 'access', 'oidc', 'session'],
  ['security', 'audit', 'fraud', 'compliance', 'retention', 'privacy', 'consent', 'encrypt', 'risk', 'regulatory'],
  ['report', 'reporting', 'export', 'analytics', 'statement', 'dashboard', 'liability', 'csv', 'pdf'],
  ['user', 'customer', 'member', 'staff', 'agent', 'stakeholder', 'policyholder', 'claimant', 'partner'],
  ['points', 'balance', 'ledger', 'earn', 'burn', 'tier', 'reward', 'redeem', 'redemption', 'catalogue', 'catalog'],
  ['notify', 'notification', 'email', 'sms', 'push', 'alert', 'message'],
  ['import', 'migration', 'bulk', 'upload', 'csv', 'historical'],
  ['performance', 'latency', 'availability', 'uptime', 'scale', 'speed', 'fast'],
  ['claim', 'loss', 'incident', 'settlement', 'adjuster', 'payment', 'invoice', 'ocr'],
];

const stem = (w: string) =>
  w.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/(ations|ation|ings|ing|ments|ment|ions|ion|ies|es|ed|er|s)$/, m => (m === 'ies' ? 'y' : '')).replace(/(ate|e)$/, '');
const tokens = (t: string) => t.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 1);

/** true when a and b differ by at most one edit */
const lev1 = (a: string, b: string) => {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, d = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++d > 1) return false;
    if (a.length > b.length) i++; else if (a.length < b.length) j++; else { i++; j++; }
  }
  return d + (a.length - i) + (b.length - j) <= 1;
};
const synonymsOf = (w: string) => {
  const s = stem(w);
  return [...new Set(SYNONYM_GROUPS.filter(g => g.some(x => stem(x) === s)).flat())];
};
/** BR_1, br-001 and BR-01 all normalise to br1 */
const normId = (id: string) => id.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/([a-z]+)0*(\d+)/g, '$1$2');

export const searchMap = (map: ProjectMap, text: string, mode: 'hybrid' | 'keyword' | 'semantic' | 'exact'): FoundRecord[] => {
  const raw = text.trim();
  if (!raw) return [];
  if (mode === 'exact') {
    const ids = raw.split(/[\s,]+/).filter(Boolean).map(normId);
    return map.nodes.filter(n => ids.includes(normId(n.id))).map(n => ({ id: n.id, type: n.type, label: n.label, score: 1, matchedBy: ['exact'] }));
  }

  // an id typed into any mode still finds that record
  const idHit = map.nodes.filter(n => normId(n.id) === normId(raw));
  if (idHit.length) return idHit.map(n => ({ id: n.id, type: n.type, label: n.label, score: 1, matchedBy: ['exact'] }));

  const q = tokens(raw);
  const qStems = q.map(stem);
  const expanded = [...new Set(q.flatMap(w => [stem(w), ...synonymsOf(w).map(stem)]))];
  const out: FoundRecord[] = [];

  map.nodes.forEach(n => {
    const labelToks = tokens(n.label).map(stem);
    const bodyToks = tokens(`${n.description} ${n.type} ${n.id}`).map(stem);
    const all = new Set([...labelToks, ...bodyToks]);
    const hit = (s: string, pool: Iterable<string>) => {
      for (const p of pool) {
        if (p === s) return true;
        if (s.length > 3 && p.length > 3 && (p.startsWith(s) || s.startsWith(p))) return true;
        if (s.length >= 5 && lev1(s, p)) return true;
      }
      return false;
    };
    let kw = 0;
    qStems.forEach(s => { if (hit(s, labelToks)) kw += 1.4; else if (hit(s, bodyToks)) kw += 1; });
    kw = kw / (qStems.length * 1.4);
    let sem = 0;
    expanded.forEach(s => { if (hit(s, labelToks)) sem += 1.3; else if (hit(s, all)) sem += 0.8; });
    sem = Math.min(1, sem / Math.max(2, Math.min(expanded.length, 6)));
    const matchedBy: string[] = [];
    let score = 0;
    if (mode !== 'semantic' && kw > 0) { matchedBy.push('keywords'); score = Math.max(score, Math.min(0.99, 0.3 + kw * 0.7)); }
    if (mode !== 'keyword' && sem > 0) { matchedBy.push('meaning'); score = Math.max(score, Math.min(0.97, 0.25 + sem * 0.7)); }
    if (score > 0) out.push({ id: n.id, type: n.type, label: n.label, score, matchedBy });
  });

  out.sort((a, b) => b.score - a.score);
  return out.slice(0, 10);
};
