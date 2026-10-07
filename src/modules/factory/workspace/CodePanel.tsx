import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  FileCode,
  Pencil,
  Save,
  Terminal,
  X,
} from 'lucide-react';
import { Button } from '../../ui';
import { WorkspaceState } from '../types';
import { CodeViewer, FileExplorer } from './CodeParts';

interface Props {
  state: WorkspaceState;
  onPick: (f: string) => void;
  onSave: (f: string, content: string) => void;
  isCodeWriterActive?: boolean;
}

export const EXPENSIFY_CODE_FILES: Record<string, string> = {
  'src/app/page.tsx': `'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import ExpenseTable from '@/components/ExpenseTable';
import SpendAnalyticsChart from '@/components/SpendAnalyticsChart';

export default function ExpensifyDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              ExpensifyIQ — Spend Intelligence
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Pending Approvals" value="8" delta="3 urgent SLA < 24h" tone="amber" />
            <StatCard label="Monthly Spend" value="$42,850" delta="+12.4% vs last mo" tone="emerald" />
            <StatCard label="Receipts Processed" value="1,420" delta="98.5% OCR accuracy" tone="emerald" />
            <StatCard label="Policy Exceptions" value="3" delta="Requires CFO sign-off" tone="slate" />
          </div>

          <SpendAnalyticsChart />
          <ExpenseTable />
        </main>
      </div>
    </div>
  );
}`,

  'src/app/layout.tsx': `import './globals.css';
import React from 'react';

export const metadata = {
  title: 'ExpensifyIQ — Intelligent Expense & Approvals Management',
  description: 'Automated receipt OCR, multi-tier approvals hierarchy, and real-time policy compliance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}`,

  'src/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

body {
  color: var(--foreground);
  background: var(--background);
}`,

  'src/app/expenses/page.tsx': `'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ExpenseTable from '@/components/ExpenseTable';
import ReceiptUploader from '@/components/ReceiptUploader';

export default function ExpensesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">All Expenses & Claims</h1>
            <ReceiptUploader />
          </div>
          <ExpenseTable />
        </main>
      </div>
    </div>
  );
}`,

  'src/app/approvals/page.tsx': `'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ApprovalWorkflow from '@/components/ApprovalWorkflow';

export default function ApprovalsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <h1 className="text-xl font-bold text-slate-900">Multi-Tier Approvals Queue</h1>
          <ApprovalWorkflow />
        </main>
      </div>
    </div>
  );
}`,

  'src/app/analytics/page.tsx': `'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SpendAnalyticsChart from '@/components/SpendAnalyticsChart';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <h1 className="text-xl font-bold text-slate-900">Spend Analytics & Forecasting</h1>
          <SpendAnalyticsChart />
        </main>
      </div>
    </div>
  );
}`,

  'src/models/approvalHierarchyModel.ts': `import { ObjectId } from 'mongodb';

export interface ApprovalStep {
  stepOrder: number;
  approverRole: 'MANAGER' | 'DIRECTOR' | 'VP' | 'CFO';
  thresholdAmount: number;
  autoApproveBelow?: number;
  slaHours: number;
}

export interface ApprovalHierarchy {
  _id?: ObjectId;
  organizationId: string;
  department: string;
  currency: string;
  steps: ApprovalStep[];
  requireReceiptThreshold: number;
  flagDuplicates: boolean;
  active: boolean;
  updatedAt: Date;
}

export const defaultHierarchy: ApprovalHierarchy = {
  organizationId: 'org_enterprise_01',
  department: 'Finance & Operations',
  currency: 'USD',
  requireReceiptThreshold: 25.00,
  flagDuplicates: true,
  active: true,
  updatedAt: new Date(),
  steps: [
    { stepOrder: 1, approverRole: 'MANAGER', thresholdAmount: 500, slaHours: 24 },
    { stepOrder: 2, approverRole: 'DIRECTOR', thresholdAmount: 2500, slaHours: 48 },
    { stepOrder: 3, approverRole: 'VP', thresholdAmount: 10000, slaHours: 72 },
    { stepOrder: 4, approverRole: 'CFO', thresholdAmount: 50000, slaHours: 120 },
  ],
};`,

  'src/models/expenseModel.ts': `import { ObjectId } from 'mongodb';

export type ExpenseStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'REIMBURSED';

export interface ExpenseRecord {
  _id?: ObjectId;
  expenseId: string;
  userId: string;
  merchantName: string;
  category: 'Travel' | 'Meals & Entertainment' | 'Software & Subscriptions' | 'Office Supplies';
  amount: number;
  currency: string;
  date: string;
  receiptUrl?: string;
  receiptAssetId?: string;
  status: ExpenseStatus;
  currentStep: number;
  policyViolations: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}`,

  'src/models/receiptAssetModel.ts': `import { ObjectId } from 'mongodb';

export interface OcrExtractedData {
  merchant?: string;
  total?: number;
  tax?: number;
  date?: string;
  confidence: number;
  rawText: string;
}

export interface ReceiptAsset {
  _id?: ObjectId;
  assetId: string;
  fileName: string;
  fileSize: number;
  mimeType: 'image/jpeg' | 'image/png' | 'application/pdf';
  storageKey: string;
  ocrStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  extractedData?: OcrExtractedData;
  createdAt: Date;
}`,

  'src/models/userModel.ts': `import { ObjectId } from 'mongodb';

export interface UserProfile {
  _id?: ObjectId;
  userId: string;
  email: string;
  name: string;
  role: 'EMPLOYEE' | 'APPROVER' | 'FINANCE_ADMIN' | 'C_SUITE';
  department: string;
  spendingLimit: number;
  managerId?: string;
  avatarUrl?: string;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: Date;
}`,

  'src/models/policyModel.ts': `import { ObjectId } from 'mongodb';

export interface PolicyRule {
  _id?: ObjectId;
  ruleCode: string;
  title: string;
  category: string;
  maxAmountPerTransaction: number;
  requiresReceipt: boolean;
  weekendWarning: boolean;
  action: 'WARN' | 'BLOCK' | 'REQUIRE_EXECUTIVE_APPROVAL';
  enabled: boolean;
}`,

  'src/components/ExpenseTable.tsx': `'use client';

import React from 'react';

const SAMPLE_EXPENSES = [
  { title: 'Client Dinner (Le Bernardin)', user: 'John D.', status: 'approved', amt: '$340.00', time: '2 hrs ago' },
  { title: 'Delta Airlines SFO → JFK', user: 'Sarah M.', status: 'in_review', amt: '$680.50', time: '3 hrs ago' },
  { title: 'Uber Business Ride', user: 'Alex K.', status: 'approved', amt: '$42.20', time: '5 hrs ago' },
  { title: 'AWS Cloud Hosting', user: 'DevOps', status: 'approved', amt: '$1,250.00', time: '1 day ago' },
];

export default function ExpenseTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm">Recent Expense Submissions</h3>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-5 py-3">Expense</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Amount</th>
            <th className="px-5 py-3">Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {SAMPLE_EXPENSES.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50/50">
              <td className="px-5 py-3.5">
                <p className="font-semibold text-slate-900">{r.title}</p>
                <p className="text-[11px] text-slate-400">{r.user}</p>
              </td>
              <td className="px-5 py-3.5">
                <span className={\`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase \${r.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}\`}>
                  {r.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right font-bold text-slate-900">{r.amt}</td>
              <td className="px-5 py-3.5 text-slate-400">{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,

  'src/components/ReceiptUploader.tsx': `'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export default function ReceiptUploader() {
  const [uploading, setUploading] = useState(false);

  return (
    <button
      onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1200); }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
    >
      <Upload size={14} />
      <span>{uploading ? 'Scanning OCR…' : 'Upload Receipt'}</span>
    </button>
  );
}`,

  'src/components/ApprovalWorkflow.tsx': `'use client';

import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { title: 'Manager Review', role: 'Direct Supervisor', done: true },
  { title: 'Finance Pre-Check', role: 'Policy Engine Validation', done: true },
  { title: 'Department VP', role: 'Tier 3 Approval', active: true },
  { title: 'Disbursement', role: 'Automated ACH / Stripe', pending: true },
];

export default function ApprovalWorkflow() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <h3 className="font-bold text-slate-900 text-sm">Approval Hierarchy Pipeline</h3>
      <div className="space-y-3">
        {STEPS.map((s, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className={\`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold \${s.done ? 'bg-emerald-500 text-white' : s.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}\`}>
              {s.done ? <Check size={14} /> : idx + 1}
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-xs">{s.title}</p>
              <p className="text-[10px] text-slate-400">{s.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  'src/components/SpendAnalyticsChart.tsx': `'use client';

import React from 'react';

export default function SpendAnalyticsChart() {
  const heights = [40, 64, 52, 78, 60, 92, 70];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Weekly Spend Volume</h3>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">+14.2%</span>
      </div>
      <div className="h-32 flex items-end gap-3 pt-4 border-b border-slate-100 pb-2">
        {heights.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <div className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md transition-all hover:opacity-80" style={{ height: \`\${h}%\` }} />
            <span className="text-[10px] text-slate-400 font-mono">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  'src/components/Sidebar.tsx': `import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r border-slate-200 p-4 space-y-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</p>
      <nav className="space-y-1 text-xs font-semibold">
        <Link href="/" className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700">Dashboard</Link>
        <Link href="/expenses" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50">Expenses</Link>
        <Link href="/approvals" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50">Approvals</Link>
        <Link href="/analytics" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50">Analytics</Link>
      </nav>
    </aside>
  );
}`,

  'src/components/Navbar.tsx': `import React from 'react';

export default function Navbar() {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <span className="font-bold text-slate-900 tracking-tight">ExpensifyIQ</span>
      <span className="text-xs text-slate-500 font-mono">Enterprise Workspace</span>
    </header>
  );
}`,

  'src/components/StatCard.tsx': `import React from 'react';

export default function StatCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
      <p className={\`text-xs mt-1 font-semibold \${tone === 'emerald' ? 'text-emerald-600' : tone === 'amber' ? 'text-amber-600' : 'text-slate-500'}\`}>{delta}</p>
    </div>
  );
}`,

  'src/app/api/expenses/route.ts': `import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDatabase();
    const expenses = await db.collection('expenses').find({}).sort({ createdAt: -1 }).limit(50).toArray();
    return NextResponse.json({ success: true, count: expenses.length, data: expenses });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDatabase();
    const result = await db.collection('expenses').insertOne({
      ...body,
      status: 'SUBMITTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}`,

  'src/app/api/auth/login/route.ts': `import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }
  const db = await getDatabase();
  const user = await db.collection('users').findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({
    token: 'jwt_mock_token_expensifyiq_session',
    user: { id: user.userId, email: user.email, role: user.role },
  });
}`,

  'src/lib/db.ts': `import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://admin:cluster99.mongodb.net/expensifyiq';
let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDatabase(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db('expensifyiq');
  return db;
}`,

  'src/lib/ocrService.ts': `export interface OcrResult {
  merchant: string;
  amount: number;
  currency: string;
  date: string;
  tax: number;
  confidence: number;
}

export async function parseReceiptImage(fileBuffer: Buffer): Promise<OcrResult> {
  return {
    merchant: 'Le Bernardin New York',
    amount: 340.00,
    currency: 'USD',
    date: new Date().toISOString().slice(0, 10),
    tax: 28.50,
    confidence: 0.985,
  };
}`,

  '.env.example': `MONGODB_URI=mongodb+srv://admin:cluster99.mongodb.net/expensifyiq
NEXTAUTH_SECRET=expensifyiq_auth_secret_key_8492
NEXT_PUBLIC_APP_URL=https://expensifyiq.vercel.app
GEMINI_API_KEY=AIzaSyD_expensify_ocr_key`,

  'package.json': `{
  "name": "expensifyiq",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "mongodb": "^6.10.0",
    "lucide-react": "^0.460.0",
    "zod": "^3.24.1",
    "tailwindcss": "3.4.17"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0"
  }
}`,

  'README.md': `# ExpensifyIQ — Intelligent Expense & Approvals Management

Autonomous Full-Stack application generated by Solution Builder.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS
- **Database:** MongoDB (13 collections)
- **AI Services:** Gemini Vision Receipt OCR & Policy Engine
`,
};

const DEFAULT_PAGE_CODE = EXPENSIFY_CODE_FILES['src/app/page.tsx'];

const TERMINAL_LINES = [
  '1 > bun install',
  '2 > bun install',
  '3 bun install v1.3.14 (0d9b296a)',
  '4 bun install v1.3.14 (0d9b296a)',
  '5 [2.70ms] ".env.local", ".env"',
  '6 [2.70ms] ".env.local", ".env"',
  '7 Resolving dependencies [next, react, react-dom, tailwindcss, lucide-react, mongodb]',
  '8 Saved lockfile bun.lockb',
  '9 Done in 412ms',
  '10 > next build --no-lint',
  '11 Creating an optimized production build ...',
  '12 ✓ Compiled successfully in 1.4s',
  '13 Route (app)                              Size     First Load JS',
  '14 ┌ ○ /                                    5.4 kB         87.2 kB',
  '15 ├ ○ /analytics                           8.2 kB         90.1 kB',
  '16 ├ ○ /expenses                            6.1 kB         88.0 kB',
  '17 ├ ○ /approvals                           4.8 kB         86.7 kB',
  '18 └ ○ /settings                            3.9 kB         85.8 kB',
  '19 + First Load JS shared by all            81.8 kB',
  '20 ✓ Generating static pages (55/55) [100%]',
  '21 ✓ Finalizing page optimization ...',
  '22 ✓ Ready in 320ms on http://localhost:3000',
];

export const CodePanel: React.FC<Props> = ({
  state,
  onPick,
  onSave,
  isCodeWriterActive = true,
}) => {
  const allFilesMap: Record<string, string> = {
    ...EXPENSIFY_CODE_FILES,
    ...state.files,
  };
  const files = Object.keys(allFilesMap).sort();
  const activeFile = state.activeFile && allFilesMap[state.activeFile]
    ? state.activeFile
    : (files.includes('src/app/page.tsx') ? 'src/app/page.tsx' : files[0]);
  const content = allFilesMap[activeFile] || DEFAULT_PAGE_CODE;

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEditing(false);
  }, [activeFile]);

  if (!isCodeWriterActive) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-center p-8 bg-[#FAFAFA] font-sans">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center mb-4 shadow-sm">
          <Terminal className="w-6 h-6 text-indigo-500" />
        </div>
        <h4 className="text-[16px] font-bold text-slate-900 mb-1">Source Code Files</h4>
        <p className="text-[13px] text-slate-500 max-w-sm leading-relaxed">
          Application source code will appear here once the code-writer agent begins generating files in the execution pipeline.
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const fileCount = Math.max(files.length, 55);
  const fileTypeLabel = activeFile.endsWith('.json')
    ? 'JSON'
    : activeFile.endsWith('.css')
    ? 'CSS'
    : activeFile.endsWith('.md')
    ? 'MARKDOWN'
    : 'TYPESCRIPT';

  return (
    <div className="flex h-full w-full flex-col bg-white overflow-hidden font-sans border-l border-slate-200">
      {/* Upper Area: File Explorer + Code Editor */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left: Files Sidebar */}
        <div className="w-64 shrink-0 border-r border-slate-200 bg-[#FAFAFA] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-white">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              FILES
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-400">
              {fileCount}
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <FileExplorer files={files} active={activeFile} onPick={onPick} />
          </div>
        </div>

        {/* Center: Editor Area */}
        <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden">
          {/* Tab Header */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 px-4 bg-white">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <FileCode className="w-4 h-4 text-slate-400" />
              <span className="text-[13px] font-mono font-bold text-slate-800">
                {activeFile}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {fileTypeLabel}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11.5px] font-sans font-medium text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              {editing ? (
                <div className="flex items-center gap-1.5 ml-2">
                  <Button
                    size="xs"
                    variant="primary"
                    icon={<Save className="w-3 h-3" />}
                    onClick={() => {
                      onSave(activeFile, draft);
                      setEditing(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button size="xs" icon={<X className="w-3 h-3" />} onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setDraft(content);
                    setEditing(true);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                  title="Edit file"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 min-h-0 overflow-auto bg-white">
            {editing ? (
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                spellCheck={false}
                className="w-full h-full resize-none p-4 font-mono text-[13px] leading-[1.65] text-slate-800 focus:outline-none bg-white"
              />
            ) : (
              <CodeViewer code={content} className="min-h-full py-3" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Area: Terminal */}
      <div className="h-44 shrink-0 border-t border-slate-200 bg-white flex flex-col font-mono">
        <div className="flex items-center justify-between px-4 h-8 border-b border-slate-200 bg-slate-50/70 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider">TERMINAL</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
          <span className="text-slate-400 font-sans text-[11px]">32 lines</span>
        </div>

        <div className="flex-1 overflow-auto p-3 text-[12px] leading-relaxed text-slate-700 bg-white space-y-0.5">
          {TERMINAL_LINES.map((line, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="select-none text-slate-300 w-6 text-right shrink-0">{idx + 1}</span>
              <span className={line.includes('✓') ? 'text-emerald-600 font-semibold' : ''}>
                {line.replace(/^\d+\s/, '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
