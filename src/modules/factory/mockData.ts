import { daysAgo } from '../ui';
import {
  ClarificationQuestion, DbCollection, FactoryProject, MigrationEdge, MigrationFile, MigrationNode, MigrationPlanStep, RepoGroup, TokenLog, WorkspaceState,
} from './types';

/* ── Projects ───────────────────────────────────────────────────────────── */

export const seedFactoryProjects: FactoryProject[] = [
  { projectId: 'fs-ecom', kind: 'full-stack', projectName: 'E-Commerce Dashboard', description: 'Admin dashboard for orders, inventory and customer insights with role-based access.', createdAt: daysAgo(12), updatedAt: daysAgo(1) },
  { projectId: 'fs-loyalty', kind: 'full-stack', projectName: 'Customer Loyalty Portal', description: 'Points, tiers and partner rewards for retail banking customers.', createdAt: daysAgo(30), updatedAt: daysAgo(6) },
  { projectId: 'fs-inventory', kind: 'full-stack', projectName: 'Warehouse Inventory Tracker', description: '', createdAt: daysAgo(2), updatedAt: daysAgo(2) },
  { projectId: 'fs-hr', kind: 'full-stack', projectName: 'HR Leave Management', description: 'Leave requests, approvals, balances and team calendars with manager and HR roles.', createdAt: daysAgo(20), updatedAt: daysAgo(8) },
  { projectId: 'ui-landing', kind: 'ui-canvas', projectName: 'SaaS Landing Page', description: 'High-fidelity marketing site with pricing, testimonials and a waitlist form.', createdAt: daysAgo(9), updatedAt: daysAgo(2) },
  { projectId: 'ui-admin', kind: 'ui-canvas', projectName: 'Analytics Admin Kit', description: 'Reusable dashboard layout with KPI cards and charts.', createdAt: daysAgo(21), updatedAt: daysAgo(10) },
  { projectId: 'ui-portal', kind: 'ui-canvas', projectName: 'Customer Self-Service Portal', description: 'Account overview, invoices, support tickets and profile settings for B2B customers.', createdAt: daysAgo(12), updatedAt: daysAgo(6) },
  { projectId: 'mg-flask', kind: 'code-migration', projectName: 'Flask to FastAPI Migration', description: 'Move the legacy orders service to async FastAPI with Pydantic models.', createdAt: daysAgo(15), updatedAt: daysAgo(2), sourceLanguage: 'Python · Flask', targetLanguage: 'Python · FastAPI', sourceType: 'github', sourceRef: 'https://github.com/acme/legacy-orders' },
  { projectId: 'mg-java', kind: 'code-migration', projectName: 'Billing Engine → Spring Boot 3', description: 'Upgrade the Java 8 billing monolith to Spring Boot 3 / Java 21.', createdAt: daysAgo(40), updatedAt: daysAgo(18), sourceLanguage: 'Java 8', targetLanguage: 'Java 21 · Spring Boot 3', sourceType: 'upload', sourceRef: 'billing-engine' },
  { projectId: 'pa-loan', kind: 'planner-app', projectName: 'Loan Origination Portal', description: 'Digital loan application, scoring and approval workflow for retail banking — imported from the approved Solution Planner roadmap.', createdAt: daysAgo(10), updatedAt: daysAgo(2) },
  { projectId: 'pa-retail', kind: 'planner-app', projectName: 'Retail Analytics Hub', description: 'Unified store, inventory and demand analytics for a 120-store retail chain.', createdAt: daysAgo(24), updatedAt: daysAgo(5) },
  { projectId: 'pa-insure', kind: 'planner-app', projectName: 'Policy Renewal Advisor', description: 'Renewal risk scoring, quote comparison and recommendation drafting for commercial insurance brokers.', createdAt: daysAgo(15), updatedAt: daysAgo(4) },
  { projectId: 'pa-claims', kind: 'planner-app', projectName: 'Claims Automation Portal', description: 'Self-service claim intake with automated triage and an adjuster workbench.', createdAt: daysAgo(18), updatedAt: daysAgo(7) },
  { projectId: 'pa-enterprise', kind: 'planner-app', projectName: 'Enterprise Solution Architecture', description: 'Customer onboarding workspace orchestrating KYC, document intake and account provisioning.', createdAt: daysAgo(8), updatedAt: daysAgo(3) },
];

/* ── Clarification questions / plan ─────────────────────────────────────── */

export const defaultQuestions: ClarificationQuestion[] = [
  { id: 'q1', category: 'SCALE', question: 'What operational scale should the application be designed for?', options: ['Prototype / internal pilot (< 100 users)', 'Small team product (100 – 5,000 users)', 'Growth stage (5,000 – 100,000 users)', 'Enterprise scale (100,000+ users)'] },
  { id: 'q2', category: 'AUTH', question: 'How should users sign in?', options: ['Email + password', 'Social login (Google, Microsoft)', 'Enterprise SSO (SAML / OIDC)', 'No authentication needed'], allowCustom: true },
  { id: 'q3', category: 'DATA', question: 'Which primary database fits best?', options: ['PostgreSQL (relational)', 'MongoDB (document)', 'PostgreSQL + Redis cache', 'Let the architect decide'] },
  { id: 'q4', category: 'UI', question: 'What visual direction do you want?', options: ['Clean enterprise (light, blue accents)', 'Dark analytics console', 'Playful consumer app', 'Match my brand guidelines'], allowCustom: true },
  { id: 'q5', category: 'EXTRAS', question: 'Which extras should be included in the first build?', options: ['Role-based access control', 'Audit log', 'Email notifications', 'CSV export', 'None — keep it minimal'] },
];

export const buildPlanMarkdown = (name: string, answers: Record<string, { question: string; answer: string }>) => {
  const a = (id: string, fallback: string) => answers[id]?.answer || fallback;
  return `# Implementation Plan — ${name}

## 1. Summary
A full-stack web application built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS**, backed by **${a('q3', 'PostgreSQL')}**. It is sized for **${a('q1', 'a small team product')}** and designed so that new modules can be added without touching existing ones.

## 2. Goals
- Give users one place to see, search and act on their records
- Keep every change traceable with an audit log
- Ship a usable first release quickly, then iterate

## 3. Architecture decisions
| Area | Decision | Rationale |
|---|---|---|
| Authentication | ${a('q2', 'Email + password')} | Matches the access model you selected |
| Database | ${a('q3', 'PostgreSQL (relational)')} | Relational integrity and straightforward reporting |
| Visual direction | ${a('q4', 'Clean enterprise')} | Consistent, accessible design tokens |
| Extras | ${a('q5', 'Role-based access control')} | Included in the first build |
| API style | REST with Zod validation | Simple to test and document |
| Hosting | Container on a managed platform | Easy deploy and rollback |

## 4. Modules
1. **Auth & session** — sign-in, session cookies, route protection middleware, role checks.
2. **Dashboard** — KPI cards, trend chart and a recent-activity feed.
3. **Records management** — list, search, filter, create and edit with server-side validation and pagination.
4. **Settings** — profile, team members, notification preferences.
5. **Audit log** — append-only record of who changed what and when.

## 5. Data model
| Entity | Key fields |
|---|---|
| User | id, email, role, createdAt |
| Record | id, title, status (open / in_review / closed), ownerId, updatedAt |
| ActivityLog | id, actorId, action, entity, at |

Relationships: a User owns many Records; every create/update/delete writes an ActivityLog entry.

## 6. API surface
- \`GET /api/records\` — list with search, status filter and cursor pagination
- \`POST /api/records\` — create (validated)
- \`PATCH /api/records/{id}\` — update
- \`GET /api/summary\` — KPI figures for the dashboard

## 7. Screens
| Screen | Purpose |
|---|---|
| Dashboard | Totals by status, weekly activity, recent records |
| Records | Searchable table with inline status badges |
| Settings | Profile and notification preferences |

## 8. Delivery steps
- [x] Scaffold application and design tokens
- [ ] Implement data layer and API routes
- [ ] Build dashboard and list screens
- [ ] Add auth, validation and error handling
- [ ] Run lint / type-check and prepare deployment

## 9. Quality checks
Type-check, lint, unit tests for validation and data access, and a smoke test of every screen before each deploy.

## 10. Risks
- Scope creep on reporting — keep charts to three KPIs in v1
- Data volume — pagination is mandatory on every list endpoint
- Access model changes — roles are centralised so they can be adjusted in one place
`;
};

/* ── App file templates ─────────────────────────────────────────────────── */

export const templateFiles = (name: string): Record<string, string> => ({
  'package.json': `{\n  "name": "${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",\n  "private": true,\n  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },\n  "dependencies": {\n    "next": "15.1.0",\n    "react": "19.0.0",\n    "react-dom": "19.0.0",\n    "@prisma/client": "6.1.0",\n    "zod": "3.24.1"\n  },\n  "devDependencies": { "typescript": "5.7.2", "tailwindcss": "3.4.17", "prisma": "6.1.0" }\n}\n`,
  'app/layout.tsx': `import './globals.css';\nimport { Sidebar } from '@/components/Sidebar';\n\nexport const metadata = { title: '${name}' };\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body className="bg-slate-50 text-slate-900">\n        <div className="flex min-h-screen">\n          <Sidebar />\n          <main className="flex-1 p-8">{children}</main>\n        </div>\n      </body>\n    </html>\n  );\n}\n`,
  'app/page.tsx': `import { StatCard } from '@/components/StatCard';\nimport { RecordsTable } from '@/components/RecordsTable';\nimport { getSummary, listRecords } from '@/lib/data';\n\nexport default async function DashboardPage() {\n  const [summary, records] = await Promise.all([getSummary(), listRecords({ limit: 8 })]);\n\n  return (\n    <section className="space-y-8">\n      <header>\n        <h1 className="text-2xl font-bold">Dashboard</h1>\n        <p className="text-slate-500">Live overview of your workspace</p>\n      </header>\n      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">\n        {summary.map(s => <StatCard key={s.label} {...s} />)}\n      </div>\n      <RecordsTable records={records} />\n    </section>\n  );\n}\n`,
  'app/records/page.tsx': `import { RecordsTable } from '@/components/RecordsTable';\nimport { listRecords } from '@/lib/data';\n\nexport default async function RecordsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {\n  const { q } = await searchParams;\n  const records = await listRecords({ query: q, limit: 50 });\n  return <RecordsTable records={records} showSearch />;\n}\n`,
  'app/api/records/route.ts': `import { NextResponse } from 'next/server';\nimport { z } from 'zod';\nimport { db } from '@/lib/db';\n\nconst schema = z.object({ title: z.string().min(2), status: z.enum(['open', 'in_review', 'closed']) });\n\nexport async function GET() {\n  const rows = await db.record.findMany({ orderBy: { updatedAt: 'desc' }, take: 50 });\n  return NextResponse.json(rows);\n}\n\nexport async function POST(req: Request) {\n  const parsed = schema.safeParse(await req.json());\n  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });\n  const row = await db.record.create({ data: { ...parsed.data, ownerId: 'current-user' } });\n  return NextResponse.json(row, { status: 201 });\n}\n`,
  'components/Sidebar.tsx': `import Link from 'next/link';\n\nconst links = [\n  { href: '/', label: 'Dashboard' },\n  { href: '/records', label: 'Records' },\n  { href: '/settings', label: 'Settings' },\n];\n\nexport function Sidebar() {\n  return (\n    <aside className="w-56 bg-white border-r border-slate-200 p-4">\n      <p className="font-bold mb-6">Workspace</p>\n      <nav className="space-y-1">\n        {links.map(l => (\n          <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">{l.label}</Link>\n        ))}\n      </nav>\n    </aside>\n  );\n}\n`,
  'components/StatCard.tsx': `export function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {\n  return (\n    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">\n      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>\n      <p className="mt-2 text-3xl font-bold">{value}</p>\n      <p className="mt-1 text-xs text-emerald-600">{delta}</p>\n    </div>\n  );\n}\n`,
  'components/RecordsTable.tsx': `'use client';\nimport { useState } from 'react';\n\nexport function RecordsTable({ records, showSearch }: { records: { id: string; title: string; status: string }[]; showSearch?: boolean }) {\n  const [q, setQ] = useState('');\n  const rows = records.filter(r => r.title.toLowerCase().includes(q.toLowerCase()));\n  return (\n    <div className="rounded-2xl border border-slate-200 bg-white">\n      {showSearch && <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="m-4 w-72 rounded-xl border px-3 py-2 text-sm" />}\n      <table className="w-full text-sm">\n        <tbody>{rows.map(r => <tr key={r.id} className="border-t"><td className="p-3">{r.title}</td><td className="p-3">{r.status}</td></tr>)}</tbody>\n      </table>\n    </div>\n  );\n}\n`,
  'lib/db.ts': `import { PrismaClient } from '@prisma/client';\n\nconst globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };\nexport const db = globalForPrisma.prisma ?? new PrismaClient();\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;\n`,
  'lib/data.ts': `import { db } from './db';\n\nexport async function getSummary() {\n  const total = await db.record.count();\n  return [\n    { label: 'Total records', value: String(total), delta: '+12% this month' },\n    { label: 'Open', value: '48', delta: '+4 today' },\n    { label: 'In review', value: '17', delta: '-2 today' },\n    { label: 'Closed', value: '312', delta: '+9% this month' },\n  ];\n}\n\nexport async function listRecords({ query, limit = 20 }: { query?: string; limit?: number }) {\n  return db.record.findMany({ where: query ? { title: { contains: query, mode: 'insensitive' } } : undefined, take: limit, orderBy: { updatedAt: 'desc' } });\n}\n`,
  'prisma/schema.prisma': `generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id        String   @id @default(cuid())\n  email     String   @unique\n  role      String   @default("member")\n  createdAt DateTime @default(now())\n  records   Record[]\n}\n\nmodel Record {\n  id        String   @id @default(cuid())\n  title     String\n  status    String   @default("open")\n  ownerId   String\n  owner     User     @relation(fields: [ownerId], references: [id])\n  updatedAt DateTime @updatedAt\n}\n`,
  'README.md': `# ${name}\n\nGenerated by Solution Factory.\n\n\`\`\`bash\nnpm install\nnpx prisma migrate dev\nnpm run dev\n\`\`\`\n`,
});

export const BUILD_ORDER = ['package.json', 'prisma/schema.prisma', 'lib/db.ts', 'lib/data.ts', 'app/api/records/route.ts', 'components/StatCard.tsx', 'components/Sidebar.tsx', 'components/RecordsTable.tsx', 'app/layout.tsx', 'app/page.tsx', 'app/records/page.tsx', 'README.md'];

/* ── Preview HTML (rendered in a sandboxed iframe) ──────────────────────── */

export const previewHtml = (name: string, page: string, dark: boolean) => {
  const bg = dark ? '#0b1220' : '#f8fafc';
  const card = dark ? '#111b2e' : '#ffffff';
  const fg = dark ? '#e2e8f0' : '#0f172a';
  const muted = dark ? '#94a3b8' : '#64748b';
  const line = dark ? '#1e293b' : '#e2e8f0';
  const nav = ['Dashboard', 'Records', 'Settings'].map(n => `<a class="nav ${n === page ? 'active' : ''}">${n}</a>`).join('');
  const stats = [['Total records', '1,284', '+12% this month'], ['Open', '48', '+4 today'], ['In review', '17', '-2 today'], ['Closed', '312', '+9% this month']]
    .map(([l, v, d]) => `<div class="card"><p class="lbl">${l}</p><p class="val">${v}</p><p class="dlt">${d}</p></div>`).join('');
  const rows = [['Q3 vendor onboarding', 'open'], ['Refund policy update', 'in_review'], ['Warehouse audit — Pune', 'closed'], ['New tier benefits copy', 'open'], ['Partner API rate limits', 'in_review'], ['Holiday campaign assets', 'closed']]
    .map(([t, s]) => `<tr><td>${t}</td><td><span class="pill ${s}">${s.replace('_', ' ')}</span></td><td class="m">2 hrs ago</td></tr>`).join('');
  const bars = [40, 64, 52, 78, 60, 92, 70].map(h => `<div class="bar" style="height:${h}%"></div>`).join('');
  const body =
    page === 'Settings'
      ? `<h1>Settings</h1><p class="sub">Profile and notification preferences</p><div class="card" style="max-width:520px"><p class="lbl">Display name</p><input value="Demo User"/><p class="lbl" style="margin-top:14px">Email</p><input value="demo.user@sns.test"/><p class="lbl" style="margin-top:14px">Notifications</p><label class="chk"><input type="checkbox" checked/> Email digests</label><label class="chk"><input type="checkbox"/> Product updates</label><button>Save changes</button></div>`
      : page === 'Records'
        ? `<h1>Records</h1><p class="sub">Search, filter and manage everything in one list</p><div class="card"><input placeholder="Search records…" style="max-width:300px"/><table>${rows}${rows}</table></div>`
        : `<h1>Dashboard</h1><p class="sub">Live overview of your workspace</p><div class="grid">${stats}</div><div class="two"><div class="card"><p class="lbl">Weekly activity</p><div class="chart">${bars}</div></div><div class="card"><p class="lbl">Recent records</p><table>${rows}</table></div></div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;background:${bg};color:${fg};display:flex;min-height:100vh}
aside{width:200px;background:${card};border-right:1px solid ${line};padding:18px 12px;flex-shrink:0}
aside b{display:block;margin:0 8px 18px;font-size:15px}.nav{display:block;padding:9px 12px;border-radius:10px;font-size:13px;color:${muted};cursor:pointer;margin-bottom:2px}.nav.active{background:#2563eb;color:#fff}
main{flex:1;padding:28px;min-width:0}h1{margin:0;font-size:22px}.sub{color:${muted};font-size:13px;margin:4px 0 20px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:16px}.two{display:grid;grid-template-columns:1fr 1.3fr;gap:14px}
.card{background:${card};border:1px solid ${line};border-radius:16px;padding:18px}.lbl{margin:0;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${muted}}
.val{margin:8px 0 2px;font-size:28px;font-weight:800}.dlt{margin:0;font-size:12px;color:#10b981}
.chart{height:150px;display:flex;align-items:flex-end;gap:10px;margin-top:14px}.bar{flex:1;background:linear-gradient(#60a5fa,#2563eb);border-radius:6px 6px 0 0}
table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}td{padding:10px 6px;border-top:1px solid ${line}}.m{color:${muted};text-align:right}
.pill{padding:2px 9px;border-radius:99px;font-size:11px;font-weight:600}.open{background:#dbeafe;color:#1d4ed8}.in_review{background:#fef3c7;color:#b45309}.closed{background:#d1fae5;color:#047857}
input{width:100%;padding:9px 12px;border-radius:10px;border:1px solid ${line};background:${bg};color:${fg};font-size:13px;margin-top:6px}.chk{display:flex;gap:8px;font-size:13px;margin-top:8px;align-items:center}.chk input{width:auto;margin:0}
button{margin-top:18px;background:#2563eb;color:#fff;border:0;border-radius:10px;padding:10px 16px;font-weight:600;cursor:pointer}
@media(max-width:700px){aside{display:none}.two{grid-template-columns:1fr}main{padding:16px}}
</style></head><body><aside><b>${name}</b>${nav}</aside><main>${body}</main></body></html>`;
};

/* ── Database inspector ─────────────────────────────────────────────────── */

export const dbCollections: DbCollection[] = [
  {
    name: 'User', engine: 'PostgreSQL', count: 248,
    fields: [{ name: 'id', type: 'text', indexed: true }, { name: 'email', type: 'text', indexed: true }, { name: 'role', type: 'text' }, { name: 'createdAt', type: 'timestamp' }],
    rows: [
      { id: 'cm1a2b', email: 'priya.menon@acme.io', role: 'admin', createdAt: '2026-07-02T09:12:00Z' },
      { id: 'cm1a3c', email: 'daniel.okafor@acme.io', role: 'member', createdAt: '2026-07-04T14:40:00Z' },
      { id: 'cm1a4d', email: 'mei.lin@acme.io', role: 'member', createdAt: '2026-07-09T11:05:00Z' },
      { id: 'cm1a5e', email: 'carlos.vega@acme.io', role: 'viewer', createdAt: '2026-07-18T16:22:00Z' },
    ],
  },
  {
    name: 'Record', engine: 'PostgreSQL', count: 1284,
    fields: [{ name: 'id', type: 'text', indexed: true }, { name: 'title', type: 'text' }, { name: 'status', type: 'text', indexed: true }, { name: 'ownerId', type: 'text', indexed: true }, { name: 'updatedAt', type: 'timestamp' }],
    rows: [
      { id: 'r-9001', title: 'Q3 vendor onboarding', status: 'open', ownerId: 'cm1a2b', updatedAt: '2026-10-05T10:01:00Z' },
      { id: 'r-9002', title: 'Refund policy update', status: 'in_review', ownerId: 'cm1a3c', updatedAt: '2026-10-05T08:44:00Z' },
      { id: 'r-9003', title: 'Warehouse audit — Pune', status: 'closed', ownerId: 'cm1a4d', updatedAt: '2026-10-04T19:30:00Z' },
    ],
  },
  {
    name: 'activity_log', engine: 'MongoDB', count: 9312,
    fields: [{ name: '_id', type: 'ObjectId', indexed: true }, { name: 'actorId', type: 'string', indexed: true }, { name: 'action', type: 'string' }, { name: 'entity', type: 'string' }, { name: 'at', type: 'date' }],
    rows: [
      { _id: '66f0c1', actorId: 'cm1a2b', action: 'record.create', entity: 'r-9001', at: '2026-10-05T10:01:00Z' },
      { _id: '66f0c2', actorId: 'cm1a3c', action: 'record.update', entity: 'r-9002', at: '2026-10-05T08:44:00Z' },
    ],
  },
];

export const initialTokens = (): TokenLog[] => [
  { id: 't1', step: 'Clarification questions', model: 'claude-sonnet-5-5', input: 1840, output: 620, at: daysAgo(1) },
  { id: 't2', step: 'Implementation plan', model: 'claude-sonnet-5-5', input: 3920, output: 2410, at: daysAgo(1) },
  { id: 't3', step: 'Code generation — app shell', model: 'claude-sonnet-5-5', input: 6120, output: 9340, at: daysAgo(1) },
  { id: 't4', step: 'Code generation — data layer', model: 'claude-sonnet-5-5', input: 5410, output: 7800, at: daysAgo(1) },
];

export const emptyWorkspace = (): WorkspaceState => ({
  messages: [], files: {}, activeFile: '', questions: [], clarificationStatus: 'NONE', clarificationSummary: '', planMarkdown: '', planStatus: 'NONE',
  generating: false, previewReady: false, previewRevision: 0, terminal: [], tokens: [], deployments: [], publicLink: false, pages: ['Dashboard', 'Records', 'Settings'], activePage: 'Dashboard',
  git: { connected: false, branch: 'main', commits: [] },
});

export const builtWorkspace = (name: string): WorkspaceState => {
  const files = templateFiles(name);
  return {
    ...emptyWorkspace(),
    messages: [
      { id: 'm1', role: 'user', content: `Build ${name}: a dashboard with KPI cards, a searchable records table and settings.` },
      { id: 'm2', role: 'assistant', content: 'I have a few architecture questions before I start — answer them in the **Plan** tab.' },
      { id: 'm3', role: 'assistant', content: 'Plan approved. I scaffolded the Next.js app, wired Prisma + PostgreSQL and built the dashboard, records list and settings screens. The preview is live — tell me what to change next.', activity: BUILD_ORDER.slice(0, 6).map(f => ({ label: `Wrote ${f}`, file: f, done: true })) },
    ],
    files, activeFile: 'app/page.tsx', questions: defaultQuestions, clarificationStatus: 'ANSWERED', clarificationSummary: 'Decisions captured for scale, auth, data and UI.',
    planMarkdown: buildPlanMarkdown(name, {}), planStatus: 'APPROVED', previewReady: true, previewRevision: 1,
    terminal: ['$ npm install', 'added 312 packages in 14s', '$ npx prisma generate', '✔ Generated Prisma Client', '$ npm run dev', '▲ Next.js 15.1.0', '- Local: http://localhost:3000', '✓ Ready in 1.9s'],
    tokens: initialTokens(),
    git: { connected: true, account: 'demo-user', repoName: 'e-commerce-dashboard', repoUrl: 'https://github.com/demo-user/e-commerce-dashboard', branch: 'main', commits: [{ hash: 'a41f9c2', message: 'feat: initial dashboard scaffold', at: daysAgo(1) }, { hash: '7be3d10', message: 'feat: records list and search', at: daysAgo(1) }] },
    deployments: [{ id: 'd1', provider: 'Cloudflare Pages', projectName: 'e-commerce-dashboard', url: 'https://e-commerce-dashboard.pages.dev', status: 'live', at: daysAgo(1) }],
  };
};

/* ── Code migration ─────────────────────────────────────────────────────── */

export const migrationFiles: MigrationFile[] = [
  {
    path: 'app.py', language: 'python',
    source: `from flask import Flask, jsonify, request\nfrom models import db, Order\nfrom services.billing import calculate_total\nfrom utils.validators import validate_order\n\napp = Flask(__name__)\napp.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://localhost/orders"\ndb.init_app(app)\n\n@app.route("/orders", methods=["GET"])\ndef list_orders():\n    orders = Order.query.order_by(Order.created_at.desc()).limit(50).all()\n    return jsonify([o.to_dict() for o in orders])\n\n@app.route("/orders", methods=["POST"])\ndef create_order():\n    payload = request.get_json()\n    errors = validate_order(payload)\n    if errors:\n        return jsonify({"errors": errors}), 422\n    order = Order(customer_id=payload["customer_id"], total=calculate_total(payload["items"]))\n    db.session.add(order)\n    db.session.commit()\n    return jsonify(order.to_dict()), 201\n`,
    migrated: `from fastapi import FastAPI, Depends, HTTPException\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy import select\n\nfrom database import get_session\nfrom models import Order\nfrom schemas import OrderCreate, OrderOut\nfrom services.billing import calculate_total\n\napp = FastAPI(title="Orders Service")\n\n\n@app.get("/orders", response_model=list[OrderOut])\nasync def list_orders(session: AsyncSession = Depends(get_session)):\n    result = await session.execute(select(Order).order_by(Order.created_at.desc()).limit(50))\n    return result.scalars().all()\n\n\n@app.post("/orders", response_model=OrderOut, status_code=201)\nasync def create_order(payload: OrderCreate, session: AsyncSession = Depends(get_session)):\n    order = Order(customer_id=payload.customer_id, total=calculate_total(payload.items))\n    session.add(order)\n    await session.commit()\n    await session.refresh(order)\n    return order\n`,
  },
  {
    path: 'models.py', language: 'python',
    source: `from flask_sqlalchemy import SQLAlchemy\nfrom datetime import datetime\n\ndb = SQLAlchemy()\n\nclass Order(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    customer_id = db.Column(db.Integer, nullable=False)\n    total = db.Column(db.Numeric(10, 2), nullable=False)\n    created_at = db.Column(db.DateTime, default=datetime.utcnow)\n\n    def to_dict(self):\n        return {"id": self.id, "customer_id": self.customer_id, "total": float(self.total), "created_at": self.created_at.isoformat()}\n`,
    migrated: `from datetime import datetime\nfrom decimal import Decimal\n\nfrom sqlalchemy import Integer, Numeric, DateTime\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\n\n\nclass Base(DeclarativeBase):\n    pass\n\n\nclass Order(Base):\n    __tablename__ = "order"\n\n    id: Mapped[int] = mapped_column(Integer, primary_key=True)\n    customer_id: Mapped[int] = mapped_column(Integer, nullable=False)\n    total: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)\n    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)\n`,
  },
  {
    path: 'services/billing.py', language: 'python',
    source: `TAX_RATE = 0.18\n\ndef calculate_total(items):\n    subtotal = sum(i["price"] * i["qty"] for i in items)\n    return round(subtotal * (1 + TAX_RATE), 2)\n`,
    migrated: `from decimal import Decimal, ROUND_HALF_UP\n\nTAX_RATE = Decimal("0.18")\n\n\ndef calculate_total(items) -> Decimal:\n    subtotal = sum((Decimal(str(i.price)) * i.qty for i in items), Decimal("0"))\n    return (subtotal * (1 + TAX_RATE)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)\n`,
  },
  {
    path: 'utils/validators.py', language: 'python',
    source: `def validate_order(payload):\n    errors = []\n    if not payload.get("customer_id"):\n        errors.append("customer_id is required")\n    if not payload.get("items"):\n        errors.append("items must not be empty")\n    return errors\n`,
    migrated: `# Replaced by Pydantic validation in schemas.py\n`,
  },
  {
    path: 'requirements.txt', language: 'text',
    source: `Flask==2.0.3\nFlask-SQLAlchemy==2.5.1\npsycopg2-binary==2.9.3\n`,
    migrated: `fastapi==0.115.0\nuvicorn[standard]==0.30.6\nsqlalchemy[asyncio]==2.0.35\nasyncpg==0.29.0\npydantic==2.9.2\n`,
  },
];

export const migrationNodes: MigrationNode[] = [
  { id: 'n-app', type: 'Module', label: 'app.py', file: 'app.py', description: 'Flask application entry point and route registration.' },
  { id: 'n-list', type: 'Route', label: 'GET /orders', file: 'app.py', description: 'Returns the 50 most recent orders.' },
  { id: 'n-create', type: 'Route', label: 'POST /orders', file: 'app.py', description: 'Validates the payload, prices the order and stores it.' },
  { id: 'n-order', type: 'Class', label: 'Order', file: 'models.py', description: 'SQLAlchemy model for the orders table.' },
  { id: 'n-table', type: 'Table', label: 'orders (table)', file: 'models.py', description: 'PostgreSQL table holding order headers.' },
  { id: 'n-calc', type: 'Function', label: 'calculate_total()', file: 'services/billing.py', description: 'Applies 18% tax to the item subtotal.' },
  { id: 'n-valid', type: 'Function', label: 'validate_order()', file: 'utils/validators.py', description: 'Collects payload validation errors.' },
  { id: 'n-todict', type: 'Function', label: 'Order.to_dict()', file: 'models.py', description: 'Serialises an order to JSON-safe dict.' },
];
export const migrationEdges: MigrationEdge[] = [
  { id: 'e1', source: 'n-app', target: 'n-list', type: 'EXPOSES' },
  { id: 'e2', source: 'n-app', target: 'n-create', type: 'EXPOSES' },
  { id: 'e3', source: 'n-list', target: 'n-order', type: 'READS' },
  { id: 'e4', source: 'n-create', target: 'n-valid', type: 'CALLS' },
  { id: 'e5', source: 'n-create', target: 'n-calc', type: 'CALLS' },
  { id: 'e6', source: 'n-create', target: 'n-order', type: 'CALLS' },
  { id: 'e7', source: 'n-order', target: 'n-table', type: 'READS' },
  { id: 'e8', source: 'n-list', target: 'n-todict', type: 'CALLS' },
  { id: 'e9', source: 'n-order', target: 'n-todict', type: 'EXPOSES' },
  { id: 'e10', source: 'n-app', target: 'n-order', type: 'IMPORTS' },
];

export const migrationPlan: MigrationPlanStep[] = [
  { id: 's1', title: 'Introduce async database session', detail: 'Replace Flask-SQLAlchemy global `db` with an AsyncSession dependency (asyncpg driver).', risk: 'HIGH', status: 'done', files: ['models.py', 'database.py'] },
  { id: 's2', title: 'Port data models to SQLAlchemy 2.0 typed mappings', detail: 'Convert Column() declarations to Mapped[...] and drop `to_dict` in favour of Pydantic response models.', risk: 'MEDIUM', status: 'done', files: ['models.py'] },
  { id: 's3', title: 'Replace manual validation with Pydantic schemas', detail: 'validate_order() becomes OrderCreate with field validators; 422 handled by FastAPI.', risk: 'LOW', status: 'pending', files: ['schemas.py', 'utils/validators.py'] },
  { id: 's4', title: 'Convert routes to async endpoints', detail: 'Translate Flask blueprints to FastAPI routers with dependency-injected sessions.', risk: 'HIGH', status: 'pending', files: ['app.py'] },
  { id: 's5', title: 'Use Decimal for money', detail: 'Billing uses float rounding today; switch to Decimal with HALF_UP to avoid cent drift.', risk: 'CRITICAL', status: 'pending', files: ['services/billing.py'] },
  { id: 's6', title: 'Update dependencies and Docker image', detail: 'Swap Flask stack for FastAPI + uvicorn and rebuild the image.', risk: 'LOW', status: 'pending', files: ['requirements.txt', 'Dockerfile'] },
];

export const seedRepoGroups: RepoGroup[] = [
  { id: 'rg-1', name: 'Order Platform', description: 'Orders, billing and notification services analysed together.', projectIds: ['mg-flask', 'mg-java'], updatedAt: daysAgo(3), crossCalls: [{ from: 'orders-service', to: 'billing-engine', via: 'POST /v1/invoices', count: 14 }, { from: 'orders-service', to: 'billing-engine', via: 'GET /v1/tax-rates', count: 6 }, { from: 'billing-engine', to: 'orders-service', via: 'webhook: invoice.paid', count: 9 }] },
  { id: 'rg-2', name: 'Customer 360', description: 'Profile, loyalty and support services.', projectIds: ['mg-flask'], updatedAt: daysAgo(12), crossCalls: [{ from: 'profile-service', to: 'loyalty-service', via: 'GET /customers/{id}/points', count: 22 }] },
];

/* ── Planner application (execution sessions from Solution Planner) ────── */

export interface PlannerDoc { id: string; title: string; subtitle: string; body: string }

export const plannerSummary = {
  problem: 'Customer onboarding takes 11 days on average because KYC checks, document collection and account set-up are handled in separate tools with manual hand-offs.',
  solution: 'A unified onboarding workspace that orchestrates KYC, document intake and account provisioning, with automated reminders and an auditable status timeline.',
  stakeholders: ['Head of Retail Operations', 'Compliance Officer', 'Customer Experience Lead', 'IT Security'],
  objectives: ['Cut onboarding time from 11 days to 3 days', 'Reduce manual KYC touches by 60%', 'Provide a full audit trail for every onboarding case'],
  inScope: ['Individual customer onboarding', 'Document capture & verification', 'Account provisioning hand-off'],
  outOfScope: ['Corporate / SME onboarding', 'Legacy core-banking replacement'],
  metrics: [['Total Epics', '6'], ['Total Features', '18'], ['User Stories', '74'], ['Implementation Tasks', '212']],
  profile: [['Human Oversight', 'Required for exceptions'], ['Business Users', '1,200'], ['AI Enabled', 'Yes — document extraction'], ['Integrations Count', '7'], ['Security Level', 'High (PII, KYC)'], ['Deployment Type', 'Private cloud'], ['Expected Growth', '+35% YoY'], ['Business Criticality', 'Tier 1'], ['Sensitive Data', 'PII, government IDs']],
};

export const plannerDocs: PlannerDoc[] = [
  { id: 'prd', title: 'Product Requirements Document (PRD)', subtitle: 'Goals, personas, scope and success metrics', body: '{\n  "vision": "One workspace for the whole onboarding journey",\n  "personas": ["Onboarding Analyst", "Compliance Reviewer", "New Customer"],\n  "goals": [\n    { "id": "G1", "name": "Reduce time-to-onboard", "metric": "<= 3 days" },\n    { "id": "G2", "name": "Cut manual KYC effort", "metric": "-60%" }\n  ],\n  "features": ["Case timeline", "Document intake", "KYC orchestration", "Reminder engine", "Audit trail"]\n}' },
  { id: 'sad', title: 'Solution Architecture Document (SAD)', subtitle: 'Logical and deployment architecture', body: 'Style: modular monolith with an event bus.\nFrontend: Next.js 15 + Tailwind.\nBackend: Node.js (Express) modules — cases, documents, kyc, notifications.\nData: PostgreSQL for cases, S3-compatible object store for documents, Redis for queues.\nIntegrations: KYC provider (REST), e-sign, email/SMS gateway, core-banking adapter.\nSecurity: OIDC SSO, field-level encryption for IDs, immutable audit log.' },
  { id: 'tdd', title: 'Technical Design Document (TDD)', subtitle: 'Modules, sequences and non-functional design', body: 'Case lifecycle: CREATED → DOCS_PENDING → KYC_RUNNING → REVIEW → APPROVED | REJECTED.\nEach transition emits a domain event consumed by notifications and the audit writer.\nPagination is mandatory on every list endpoint; p95 latency budget 300 ms.\nBackground jobs use BullMQ with exponential back-off and a dead-letter queue.' },
  { id: 'api', title: 'API Specification & Endpoints List', subtitle: 'REST contract grouped by module', body: 'POST   /v1/cases\nGET    /v1/cases?status=&cursor=\nGET    /v1/cases/{id}\nPOST   /v1/cases/{id}/documents\nPOST   /v1/cases/{id}/kyc/run\nPOST   /v1/cases/{id}/decision\nGET    /v1/cases/{id}/timeline\nPOST   /v1/webhooks/kyc-result' },
  { id: 'ddd', title: 'Domain-Driven Design (DDD) Models', subtitle: 'Aggregates, entities and value objects', body: 'Aggregate: OnboardingCase (id, customerRef, status, assignee)\n  Entity: DocumentSubmission (type, storageKey, verifiedAt)\n  Entity: KycCheck (provider, result, riskScore)\n  Value object: Decision (outcome, reason, decidedBy)\nDomain events: CaseCreated, DocumentReceived, KycCompleted, CaseDecided' },
  { id: 'tasks', title: 'Implementation Task Breakdown', subtitle: 'Epics → features → stories → tasks', body: 'EPIC 1  Case management — 5 features, 21 stories\nEPIC 2  Document intake — 3 features, 14 stories\nEPIC 3  KYC orchestration — 3 features, 13 stories\nEPIC 4  Notifications & reminders — 2 features, 9 stories\nEPIC 5  Audit & reporting — 3 features, 11 stories\nEPIC 6  Platform & security — 2 features, 6 stories' },
];

export const plannerArchitectureLayers = [
  { name: 'Experience', items: ['Analyst workspace', 'Customer portal', 'Reviewer console'] },
  { name: 'Application', items: ['Case service', 'Document service', 'KYC orchestrator', 'Notification service'] },
  { name: 'Platform', items: ['PostgreSQL', 'Object storage', 'Redis / BullMQ', 'Identity (OIDC)'] },
  { name: 'Integrations', items: ['KYC provider', 'E-sign', 'Email / SMS', 'Core banking adapter'] },
];
