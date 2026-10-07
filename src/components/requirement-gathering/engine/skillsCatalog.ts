import { SkillMatch } from './RGStore';

// Local capability catalog used by the prototype until the Skills service is connected
const CATALOG = [
  { id: 'doc-capture', name: 'Document & receipt capture', version: 'v1.0', keywords: ['receipt', 'document', 'invoice', 'scan', 'upload', 'ocr'] },
  { id: 'approval-workflow', name: 'Approval workflow', version: 'v1.2', keywords: ['approv', 'sign-off', 'review'] },
  { id: 'policy-rules', name: 'Policy & rules validation', version: 'v1.0', keywords: ['policy', 'compliance', 'rule', 'validat'] },
  { id: 'notifications', name: 'Notifications', version: 'v2.0', keywords: ['notif', 'alert', 'remind'] },
  { id: 'reporting', name: 'Reporting & dashboards', version: 'v1.1', keywords: ['report', 'dashboard', 'visibility', 'analytic'] },
  { id: 'integrations', name: 'System integration connectors', version: 'v1.0', keywords: ['integrat', 'accounting', 'erp', 'crm', 'hr ', 'api'] },
  { id: 'payments', name: 'Payments & reimbursement', version: 'v1.0', keywords: ['payment', 'reimburs', 'payout', 'invoice'] },
  { id: 'mobile-app', name: 'Mobile app shell', version: 'v1.0', keywords: ['mobile', 'phone', 'field', 'on the go'] }
];

export const matchSkills = (text: string): SkillMatch[] => {
  const lower = text.toLowerCase();
  return CATALOG.map((skill) => ({
    id: skill.id,
    name: skill.name,
    version: skill.version,
    matchedOn: skill.keywords.filter((k) => lower.includes(k)).map((k) => k.trim())
  })).filter((m) => m.matchedOn.length > 0);
};
