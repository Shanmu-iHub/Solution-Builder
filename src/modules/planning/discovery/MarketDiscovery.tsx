import React from 'react';
import { AlertTriangle, FileText, Layers, Radar, Target, TrendingUp } from 'lucide-react';
import { DiscoveryDashboard, FeatureCardData } from './DiscoveryDashboard';

/* Illustrative figures for the expense-claims demo project. They are AI estimates, not sourced data. */

const cards: FeatureCardData[] = [
  {
    id: 'summary', title: 'Market Summary', icon: <FileText className="w-4 h-4" />, wide: true, status: { label: 'Draft v0.1', tone: 'slate' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Market summary', value: 'A $1.8B serviceable market growing about 12% a year, with mobile-first claim filing now expected.' },
        { label: 'Recommendation', value: 'Proceed to user discovery. Confirm market size with a sourced report before committing build budget.' },
      ],
    }],
  },
  {
    id: 'definition', title: 'Market Definition & Size', icon: <Target className="w-4 h-4" />, status: { label: 'AI estimate', tone: 'amber' },
    blocks: [
      {
        kind: 'facts', rows: [
          { label: 'Market', value: 'Spend and expense management software for field sales teams.' },
          { label: 'Boundaries', value: 'Mid-size B2B companies with mobile sales staff. Excludes enterprise travel suites and consumer budgeting apps.' },
          { label: 'Geography', value: 'India first, then wider APAC.' },
        ],
      },
      {
        kind: 'sizing', title: 'Market size (TAM / SAM / SOM)', rows: [
          { label: 'TAM', value: '$14B', note: 'Global expense management software', pct: 100 },
          { label: 'SAM', value: '$1.8B', note: 'Field-sales teams in India and APAC', pct: 62 },
          { label: 'SOM', value: '$60M', note: 'Reachable in three years with direct sales', pct: 30 },
        ],
      },
      { kind: 'table', title: 'Target segments', head: ['Segment', 'Companies', 'Field reps', 'Share of SAM', 'Growth', 'Readiness'], rows: [['Mid-size B2B sales orgs', '38,000', '1.1M', '38%', 'High', 'High'], ['Distribution & FMCG', '22,000', '1.6M', '34%', 'Medium', 'Medium'], ['Pharma field reps', '4,500', '0.4M', '14%', 'Medium', 'High'], ['Services with client visits', '15,000', '0.5M', '14%', 'High', 'Medium']] },
    ],
  },
  {
    id: 'demand', title: 'Demand & Trends', icon: <TrendingUp className="w-4 h-4" />, status: { label: 'Not yet sourced', tone: 'amber' },
    blocks: [
      {
        kind: 'facts', rows: [
          { label: 'Growth rate', value: 'Roughly 11–13% a year (estimate, source not yet confirmed).' },
          { label: 'Demand', value: 'Strongest where reps travel daily and claims are still emailed.' },
          { label: 'Industry trends', value: 'Receipt capture is becoming a commodity; value is moving to policy automation.' },
        ],
      },
      { kind: 'list', title: 'Market drivers', items: ['Cost pressure on finance operations', 'Mobile-first workforce', 'Tighter audit and policy compliance'], tone: 'green' },
      { kind: 'list', title: 'Market barriers', items: ['Entrenched ERP expense modules', 'Integration effort with finance systems', 'Rep habits around paper receipts'], tone: 'red' },
    ],
  },
  {
    id: 'landscape', title: 'Competitive Landscape', icon: <Radar className="w-4 h-4" />, wide: true, status: { label: 'To verify', tone: 'amber' },
    blocks: [
      {
        kind: 'table', title: 'Direct competitors (indicative — verify before use)', head: ['Competitor', 'Features', 'Pricing', 'Target users', 'Strengths / weaknesses'], rows: [
          ['SAP Concur', 'Receipt capture, approval workflow, travel booking', 'Quote-based, per user', 'Large enterprises', 'Deep ERP fit / heavy to set up'],
          ['Expensify', 'Phone receipt scan, report routing', 'Per user, tiered plans', 'Small and mid-size teams', 'Easy to start / generic, not field-sales specific'],
          ['Zoho Expense', 'Receipt scan, policy rules, multi-level approval', 'Per user, free tier', 'Small and mid-size teams', 'Good value / lighter audit depth'],
        ],
      },
      {
        kind: 'facts', rows: [
          { label: 'Indirect competitors', value: 'Microsoft Power Automate flows; ERP expense modules.' },
          { label: 'Differentiation', value: 'Built around field-sales trips and visit-based spend, with policy checks at capture time.' },
        ],
      },
    ],
  },
  {
    id: 'gaps', title: 'Market Gaps', icon: <Layers className="w-4 h-4" />, status: { label: '3 gaps', tone: 'blue' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Underserved segments', value: 'Mid-size field teams that outgrew spreadsheets but find suites too heavy.' },
        { label: 'Product gaps', value: 'Trip-aware claims and policy checks while the rep is still on the road.' },
        { label: 'Capability gaps', value: 'Out-of-the-box connectors for regional finance systems.' },
      ],
    }],
  },
  {
    id: 'risks', title: 'Market Risks', icon: <AlertTriangle className="w-4 h-4" />, status: { label: 'Medium', tone: 'amber' },
    blocks: [{
      kind: 'table', title: 'Risk register', head: ['Risk', 'Description', 'Level'], strongCol: 2, rows: [
        ['Economic', 'Sales hiring freezes shrink the field-rep base', 'Medium'],
        ['Regulatory', 'Receipt retention and tax invoice rules vary by region', 'Medium'],
        ['Competitive', 'Established suites add field-sales features', 'High'],
        ['Adoption barriers', 'ERP lock-in and rep habits', 'Medium'],
      ],
    }],
  },
];

export const MarketDiscovery: React.FC = () => (
  <DiscoveryDashboard cards={cards} csuiteStage="market" validated />
);
