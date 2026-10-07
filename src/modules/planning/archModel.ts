/**
 * Project-specific architecture for the Documentation → Architecture tab.
 * A project is matched to a domain from its name / description / idea, the domain's
 * component spec is turned into Mermaid text, and anything unrecognised gets a generic
 * layout built from the project's own name.
 */

export type DomainKey = 'support' | 'claims' | 'renewal' | 'lending' | 'fleet' | 'retail' | 'hr' | 'healthcare' | 'generic';
type GroupKey = 'clients' | 'edge' | 'services' | 'ai' | 'data' | 'external';
interface ArchNode { id: string; label: string }
type Link = [from: string, to: string, label?: string];
interface ArchSpec { label: string; style: string; groups: Partial<Record<GroupKey, ArchNode[]>>; links: Link[] }

const n = (id: string, label: string): ArchNode => ({ id, label });

const GROUPS: { key: GroupKey; title: string; fill: string; stroke: string }[] = [
  { key: 'clients', title: 'Clients', fill: '#EFF6FF', stroke: '#2563EB' },
  { key: 'edge', title: 'Edge & ingest', fill: '#F1F5F9', stroke: '#64748B' },
  { key: 'services', title: 'Application services', fill: '#EEF2FF', stroke: '#4F46E5' },
  { key: 'ai', title: 'AI & analytics', fill: '#FAF5FF', stroke: '#9333EA' },
  { key: 'data', title: 'Data stores', fill: '#ECFDF5', stroke: '#059669' },
  { key: 'external', title: 'External systems', fill: '#FFFBEB', stroke: '#D97706' },
];

const SPECS: Record<Exclude<DomainKey, 'generic'>, ArchSpec> = {
  support: {
    label: 'Customer service', style: 'Modular monolith with an internal event bus',
    groups: {
      clients: [n('web', 'Agent Workspace'), n('portal', 'Customer Portal')],
      edge: [n('gw', 'API Gateway')],
      services: [n('case', 'Case Service'), n('kb', 'Knowledge Service'), n('notify', 'Notification Worker')],
      ai: [n('asst', 'Assistant Service'), n('ana', 'Analytics Pipeline')],
      data: [n('pg', 'PostgreSQL'), n('redis', 'Redis'), n('vec', 'Vector index')],
      external: [n('idp', 'Identity Provider'), n('crm', 'CRM'), n('llm', 'LLM Provider'), n('msg', 'Email / SMS gateway')],
    },
    links: [['web', 'gw'], ['portal', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'case'], ['gw', 'kb'], ['gw', 'asst'], ['asst', 'kb', 'retrieve'], ['asst', 'case', 'context'], ['asst', 'llm'], ['kb', 'vec'], ['case', 'pg'], ['kb', 'pg'], ['case', 'redis', 'queue'], ['redis', 'notify'], ['notify', 'msg'], ['case', 'crm', 'read profile'], ['case', 'ana', 'events']],
  },
  claims: {
    label: 'Insurance claims', style: 'Event-driven services around a claim case file',
    groups: {
      clients: [n('portal', 'Policyholder Portal'), n('adj', 'Adjuster Workbench')],
      edge: [n('gw', 'API Gateway')],
      services: [n('intake', 'Claim Intake Service'), n('triage', 'Triage & Routing'), n('cov', 'Coverage Check'), n('doc', 'Document Service'), n('pay', 'Payment Authorisation'), n('notify', 'Notification Worker')],
      ai: [n('score', 'Severity & Fraud Scoring'), n('ocr', 'Document OCR')],
      data: [n('pg', 'PostgreSQL (claims)'), n('obj', 'Encrypted object store'), n('bus', 'Event bus')],
      external: [n('idp', 'Identity Provider'), n('pas', 'Policy Admin System'), n('fin', 'Finance / Payments'), n('msg', 'Email / SMS gateway')],
    },
    links: [['portal', 'gw'], ['adj', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'intake'], ['gw', 'doc'], ['gw', 'pay'], ['intake', 'pg'], ['intake', 'bus', 'ClaimSubmitted'], ['bus', 'triage'], ['triage', 'score'], ['triage', 'cov'], ['cov', 'pas', 'verify policy'], ['doc', 'obj'], ['doc', 'ocr'], ['pay', 'fin', 'settle'], ['pay', 'pg'], ['bus', 'notify'], ['notify', 'msg']],
  },
  renewal: {
    label: 'Insurance renewals', style: 'Batch + API services with a scoring pipeline',
    groups: {
      clients: [n('broker', 'Broker Portal'), n('ops', 'Underwriting Console')],
      edge: [n('gw', 'API Gateway')],
      services: [n('renew', 'Renewal Pipeline'), n('quote', 'Quote Comparison Service'), n('policy', 'Policy Service'), n('comm', 'Communications Service')],
      ai: [n('risk', 'At-risk Policy Scoring'), n('rec', 'Recommendation Engine')],
      data: [n('pg', 'PostgreSQL'), n('wh', 'Data warehouse'), n('redis', 'Redis cache')],
      external: [n('idp', 'Identity Provider'), n('pas', 'Policy Admin System'), n('carr', 'Carrier rating APIs'), n('mail', 'Email gateway')],
    },
    links: [['broker', 'gw'], ['ops', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'renew'], ['gw', 'quote'], ['gw', 'policy'], ['policy', 'pas', 'sync policies'], ['policy', 'pg'], ['renew', 'risk'], ['risk', 'wh', 'features'], ['renew', 'rec'], ['rec', 'quote'], ['quote', 'carr', 'rate'], ['quote', 'redis', 'cache'], ['renew', 'comm'], ['comm', 'mail']],
  },
  lending: {
    label: 'Retail lending', style: 'Workflow-driven services with an immutable audit trail',
    groups: {
      clients: [n('web', 'Applicant Web Portal'), n('uw', 'Underwriter Workbench')],
      edge: [n('gw', 'API Gateway')],
      services: [n('app', 'Application Service'), n('doc', 'Document Service'), n('wf', 'Decision Workflow Engine'), n('disb', 'Disbursement Service'), n('notify', 'Notification Worker')],
      ai: [n('score', 'Credit Scoring Service')],
      data: [n('pg', 'PostgreSQL (applications)'), n('obj', 'Encrypted object store'), n('audit', 'Immutable audit log'), n('redis', 'Redis queues')],
      external: [n('idp', 'Identity Provider'), n('bureau', 'Credit Bureau API'), n('kyc', 'KYC verification'), n('core', 'Core Banking System'), n('esign', 'e-Signature provider')],
    },
    links: [['web', 'gw'], ['uw', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'app'], ['gw', 'doc'], ['app', 'pg'], ['app', 'wf', 'start decision'], ['wf', 'score'], ['score', 'bureau', 'pull report'], ['wf', 'kyc', 'verify'], ['wf', 'audit', 'log decision'], ['doc', 'obj'], ['doc', 'esign', 'sign'], ['wf', 'disb', 'approved'], ['disb', 'core', 'fund loan'], ['app', 'redis'], ['redis', 'notify']],
  },
  fleet: {
    label: 'Fleet telematics', style: 'Streaming ingest with time-series storage',
    groups: {
      clients: [n('web', 'Fleet Manager Dashboard'), n('mob', 'Driver Mobile App')],
      edge: [n('gw', 'API Gateway'), n('ingest', 'MQTT / IoT ingest')],
      services: [n('live', 'Live Tracking Service'), n('trip', 'Trip & Route Service'), n('alert', 'Alerting Service')],
      ai: [n('score', 'Driver Safety Scoring'), n('maint', 'Maintenance Forecasting')],
      data: [n('ts', 'TimescaleDB (telemetry)'), n('pg', 'PostgreSQL (fleet, drivers)'), n('redis', 'Redis (live positions)'), n('lake', 'Object store / data lake')],
      external: [n('dev', 'Vehicle telematics devices'), n('maps', 'Maps & routing API'), n('idp', 'Identity Provider'), n('erp', 'Maintenance / ERP system'), n('msg', 'SMS / Email gateway')],
    },
    links: [['web', 'gw'], ['mob', 'gw'], ['gw', 'idp', 'OIDC'], ['dev', 'ingest', 'GPS / OBD-II'], ['ingest', 'ts'], ['ingest', 'redis'], ['ingest', 'lake', 'raw archive'], ['gw', 'live'], ['gw', 'trip'], ['live', 'redis'], ['trip', 'maps', 'routes'], ['trip', 'pg'], ['score', 'ts'], ['score', 'pg'], ['maint', 'ts'], ['maint', 'erp', 'work orders'], ['ingest', 'alert', 'events'], ['alert', 'msg']],
  },
  retail: {
    label: 'Retail analytics', style: 'Batch + stream ingest feeding a warehouse',
    groups: {
      clients: [n('web', 'Category Manager Dashboard')],
      edge: [n('gw', 'API Gateway'), n('ingest', 'Batch & stream ingest')],
      services: [n('sales', 'Sales Analytics Service'), n('inv', 'Inventory Service'), n('alert', 'Stock-out Alerting')],
      ai: [n('fc', 'Demand Forecasting')],
      data: [n('wh', 'Data warehouse'), n('pg', 'PostgreSQL (metadata)'), n('redis', 'Redis cache'), n('lake', 'Object store / data lake')],
      external: [n('pos', 'POS systems'), n('erp', 'ERP / WMS'), n('idp', 'Identity Provider'), n('mail', 'Email / Teams alerts')],
    },
    links: [['web', 'gw'], ['gw', 'idp', 'OIDC'], ['pos', 'ingest', 'sales'], ['erp', 'ingest', 'stock levels'], ['ingest', 'lake', 'raw'], ['ingest', 'wh', 'model'], ['gw', 'sales'], ['gw', 'inv'], ['sales', 'wh'], ['sales', 'redis', 'cache'], ['inv', 'wh'], ['inv', 'pg'], ['wh', 'fc', 'features'], ['fc', 'inv', 'forecast'], ['inv', 'alert', 'low stock'], ['alert', 'mail']],
  },
  hr: {
    label: 'HR onboarding', style: 'Workflow service with an LLM assistant over HR policy',
    groups: {
      clients: [n('web', 'New Hire Portal'), n('chat', 'Onboarding Chat Assistant'), n('hr', 'HR Admin Console')],
      edge: [n('gw', 'API Gateway')],
      services: [n('flow', 'Onboarding Workflow Service'), n('docs', 'Paperwork Service'), n('equip', 'Equipment Provisioning'), n('learn', 'Training Assignment')],
      ai: [n('asst', 'Assistant Service'), n('ret', 'Policy Retrieval')],
      data: [n('pg', 'PostgreSQL'), n('vec', 'Vector index'), n('obj', 'Document store')],
      external: [n('idp', 'Identity Provider'), n('hris', 'HRIS'), n('itsm', 'IT Service Management'), n('lms', 'Learning platform'), n('esign', 'e-Signature provider'), n('llm', 'LLM Provider')],
    },
    links: [['web', 'gw'], ['chat', 'gw'], ['hr', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'flow'], ['gw', 'asst'], ['asst', 'ret'], ['ret', 'vec'], ['asst', 'llm'], ['asst', 'flow', 'task status'], ['flow', 'pg'], ['flow', 'hris', 'employee record'], ['flow', 'docs'], ['docs', 'esign'], ['docs', 'obj'], ['flow', 'equip'], ['equip', 'itsm', 'tickets'], ['flow', 'learn'], ['learn', 'lms']],
  },
  healthcare: {
    label: 'Healthcare intake', style: 'Privacy-first services with consent and audit',
    groups: {
      clients: [n('portal', 'Patient Intake Portal'), n('staff', 'Clinic Staff App')],
      edge: [n('gw', 'API Gateway')],
      services: [n('intake', 'Intake Service'), n('consent', 'Consent & Privacy Service'), n('sched', 'Scheduling Service'), n('notify', 'Notification Worker')],
      ai: [n('bot', 'Intake Assistant')],
      data: [n('pg', 'PostgreSQL (encrypted)'), n('obj', 'Encrypted object store'), n('audit', 'Immutable audit log')],
      external: [n('idp', 'Identity Provider'), n('ehr', 'EHR (FHIR API)'), n('llm', 'LLM Provider'), n('msg', 'SMS / Email gateway')],
    },
    links: [['portal', 'gw'], ['staff', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'intake'], ['gw', 'sched'], ['intake', 'consent', 'check consent'], ['intake', 'bot'], ['bot', 'llm'], ['intake', 'pg'], ['intake', 'obj', 'documents'], ['intake', 'ehr', 'write FHIR'], ['intake', 'audit'], ['sched', 'ehr', 'slots'], ['sched', 'notify'], ['notify', 'msg']],
  },
};

const KEYWORDS: Record<Exclude<DomainKey, 'generic'>, RegExp[]> = {
  lending: [/\bloan/, /lending/, /credit/, /mortgage/, /underwrit/, /borrower/, /originat/],
  fleet: [/fleet/, /vehicle/, /telematics/, /\bdriver/, /logistic/, /\bgps\b/, /\btruck/, /\broute/],
  claims: [/\bclaim/, /adjuster/, /settlement/, /\bloss\b/],
  renewal: [/renewal/, /broker/, /\bquote/, /premium/, /\bpolicy\b/],
  retail: [/retail/, /\bstore/, /inventory/, /demand/, /merchandis/, /\bsku/, /stock/],
  hr: [/onboarding/, /new hire/, /employee/, /\bhr\b/, /payroll/, /hris/],
  healthcare: [/patient/, /clinic/, /hospital/, /health/, /medical/],
  support: [/customer support|support (team|agent|desk|workspace|ticket|staff)/, /helpdesk|help desk|service desk/, /customer service/, /contact cent/, /case management/],
};

const hits = (text: string, res: RegExp[]) => res.filter(r => r.test(text)).length;

/** Name matches count double; ties go to the order above. A single stray description word is not enough, so it falls back to generic. */
export const detectDomain = (name: string, description = ''): DomainKey => {
  const nm = name.toLowerCase();
  const rest = description.toLowerCase();
  let best: DomainKey = 'generic';
  let bestScore = 0;
  (Object.keys(KEYWORDS) as Exclude<DomainKey, 'generic'>[]).forEach(k => {
    const score = hits(nm, KEYWORDS[k]) * 2 + hits(rest, KEYWORDS[k]);
    if (score >= 2 && score > bestScore) { best = k; bestScore = score; }
  });
  return best;
};

const shortName = (name: string) => name.replace(/\b(portal|platform|dashboard|assistant|app|hub|advisor|system|tool|copilot|bot)\b/gi, '').replace(/\s+/g, ' ').trim() || name;

const genericSpec = (name: string, text: string): ArchSpec => {
  const ai = /\b(ai|assistant|copilot|chat|bot|predict|forecast|recommend|llm|ml)\b/i.test(text);
  const core = `${shortName(name)} Core Service`;
  return {
    label: 'General business application', style: 'Modular monolith with background workers',
    groups: {
      clients: [n('web', `${shortName(name)} Web App`), n('adm', 'Admin Console')],
      edge: [n('gw', 'API Gateway')],
      services: [n('core', core), n('wf', 'Workflow & Rules Engine'), n('notify', 'Notification Worker'), n('rep', 'Reporting Service')],
      ...(ai ? { ai: [n('asst', 'AI Assistant Service')] } : {}),
      data: [n('pg', 'PostgreSQL'), n('redis', 'Redis'), n('obj', 'Object storage')],
      external: [n('idp', 'Identity Provider'), n('msg', 'Email / SMS gateway'), ...(ai ? [n('llm', 'LLM Provider')] : [])],
    },
    links: [['web', 'gw'], ['adm', 'gw'], ['gw', 'idp', 'OIDC'], ['gw', 'core'], ['core', 'pg'], ['core', 'wf', 'start workflow'], ['wf', 'redis', 'queue'], ['redis', 'notify'], ['notify', 'msg'], ['core', 'obj', 'attachments'], ['core', 'rep', 'events'], ['rep', 'pg'], ...(ai ? ([['gw', 'asst'], ['asst', 'core', 'context'], ['asst', 'llm']] as Link[]) : [])],
  };
};

export interface Architecture { domain: DomainKey; label: string; style: string; mermaid: string; components: number }

export const makeArchitecture = (name: string, description = ''): Architecture => {
  const domain = detectDomain(name, description);
  const spec = domain === 'generic' ? genericSpec(name, `${name} ${description}`) : SPECS[domain];
  const ids = new Set(Object.values(spec.groups).flatMap(g => (g ?? []).map(x => x.id)));
  const lines = ['flowchart TB'];
  GROUPS.forEach(g => {
    const nodes = spec.groups[g.key];
    if (!nodes?.length) return;
    lines.push(`  subgraph ${g.key}["${g.title}"]`, ...nodes.map(x => `    ${x.id}["${x.label}"]`), '  end');
  });
  spec.links.filter(([a, b]) => ids.has(a) && ids.has(b)).forEach(([a, b, label]) => lines.push(label ? `  ${a} -->|"${label}"| ${b}` : `  ${a} --> ${b}`));
  GROUPS.forEach(g => {
    const nodes = spec.groups[g.key];
    if (!nodes?.length) return;
    lines.push(`  classDef c_${g.key} fill:${g.fill},stroke:${g.stroke},stroke-width:1.5px,color:#0F172A`, `  class ${nodes.map(x => x.id).join(',')} c_${g.key}`);
  });
  return { domain, label: spec.label, style: spec.style, mermaid: lines.join('\n'), components: ids.size };
};
