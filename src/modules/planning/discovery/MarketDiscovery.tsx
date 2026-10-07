import React from 'react';
import { AlertTriangle, Layers, Radar, Target, TrendingUp } from 'lucide-react';
import { DiscoveryDashboard, FeatureCardData } from './DiscoveryDashboard';

/* Illustrative figures for the expense-claims demo project. They are AI estimates, not sourced data. */

const cards: FeatureCardData[] = [
  {
    id: 'definition',
    title: 'Market Definition & Size',
    icon: <Target className="w-4 h-4" />,
    status: { label: 'AI estimate', tone: 'amber' },
    blocks: [
      {
        kind: 'facts',
        rows: [
          { label: 'Market definition', value: 'Spend and expense management software for field sales teams.' },
          { label: 'Scope boundaries', value: 'Mid-size B2B companies with mobile sales staff. Excludes enterprise travel suites and consumer budgeting apps.' },
          { label: 'Target geography', value: 'India first, then wider APAC.' },
        ],
      },
      {
        kind: 'sizing',
        title: 'Market size (TAM / SAM / SOM)',
        rows: [
          { label: 'TAM', value: '$14B', note: 'Global expense management software', pct: 100 },
          { label: 'SAM', value: '$1.8B', note: 'Field-sales teams in India and APAC', pct: 62 },
          { label: 'SOM', value: '$60M', note: 'Reachable in three years with direct sales', pct: 30 },
        ],
      },
    ],
  },
  {
    id: 'segments',
    title: 'Target Market Segments',
    icon: <Layers className="w-4 h-4" />,
    status: { label: '4 segments', tone: 'blue' },
    blocks: [
      {
        kind: 'table',
        title: 'Segment Breakdown & Readiness',
        head: ['Segment', 'Companies', 'Field reps', 'Share of SAM', 'Growth', 'Readiness'],
        rows: [
          ['Mid-size B2B sales orgs', '38,000', '1.1M', '38%', 'High', 'High'],
          ['Distribution & FMCG', '22,000', '1.6M', '34%', 'Medium', 'Medium'],
          ['Pharma field reps', '4,500', '0.4M', '14%', 'Medium', 'High'],
          ['Services with client visits', '15,000', '0.5M', '14%', 'High', 'Medium'],
        ],
        strongCol: 3,
      },
    ],
  },
  {
    id: 'landscape',
    title: 'Competitive Landscape & Strategic Gaps',
    icon: <Radar className="w-4 h-4" />,
    wide: true,
    status: { label: 'To verify', tone: 'amber' },
    blocks: [
      {
        kind: 'table',
        title: 'Direct Competitors (Indicative — verify before use)',
        head: ['Competitor', 'Features', 'Pricing', 'Target users', 'Strengths / weaknesses'],
        rows: [
          ['SAP Concur', 'Receipt capture, approval workflow, travel booking', 'Quote-based, per user', 'Large enterprises', 'Deep ERP fit / heavy to set up'],
          ['Expensify', 'Phone receipt scan, report routing', 'Per user, tiered plans', 'Small and mid-size teams', 'Easy to start / generic, not field-sales specific'],
          ['Zoho Expense', 'Receipt scan, policy rules, multi-level approval', 'Per user, free tier', 'Small and mid-size teams', 'Good value / lighter audit depth'],
        ],
      },
      {
        kind: 'facts',
        title: 'Strategic Differentiation & Market Gaps',
        rows: [
          { label: 'Indirect alternatives', value: 'Microsoft Power Automate flows; manual ERP expense modules.' },
          { label: 'Core differentiation', value: 'Built around field-sales trips and visit-based spend, with automated policy checks at capture time.' },
          { label: 'Underserved segment', value: 'Mid-size field teams that outgrew spreadsheets but find enterprise suites too heavy.' },
          { label: 'Capability gap', value: 'Out-of-the-box connectors for regional Indian and APAC finance systems.' },
        ],
      },
    ],
  },
  {
    id: 'drivers',
    title: 'Market Drivers & Trends',
    icon: <TrendingUp className="w-4 h-4" />,
    status: { label: 'Industry trends', tone: 'green' },
    blocks: [
      {
        kind: 'facts',
        rows: [
          { label: 'Demand concentration', value: 'Strongest where reps travel daily and claims are still submitted via email.' },
          { label: 'Industry shift', value: 'Receipt capture is becoming a commodity; product value is moving to policy automation.' },
        ],
      },
      {
        kind: 'list',
        title: 'Key Market Drivers',
        items: [
          'Cost pressure on finance operations to reduce manual audit handling',
          'Mobile-first sales workforce expecting on-device claim submission',
          'Tighter regulatory compliance and travel policy enforcement',
        ],
        tone: 'green',
      },
    ],
  },
  {
    id: 'risks',
    title: 'Market Risk Register',
    icon: <AlertTriangle className="w-4 h-4" />,
    status: { label: 'Medium', tone: 'amber' },
    blocks: [
      {
        kind: 'table',
        title: 'Risk Register & Impact Analysis',
        head: ['Risk Category', 'Risk Description', 'Level'],
        rows: [
          ['Adoption barriers', 'Entrenched ERP expense modules and rep habits around paper receipts', 'Medium'],
          ['Integration effort', 'High variation in regional finance and ERP software connectivity', 'Medium'],
          ['Regulatory', 'Receipt retention and tax invoice rules vary by region', 'Medium'],
          ['Competitive', 'Established enterprise suites adding lightweight field-sales modules', 'High'],
          ['Economic', 'Sales hiring freezes shrinking the active field-rep base', 'Medium'],
        ],
        strongCol: 2,
      },
    ],
  },
];

export const MarketDiscovery: React.FC = () => (
  <DiscoveryDashboard
    phase="Phase 3"
    title="Market & Industry Discovery"
    subtitle="Evaluate market sizing, target segment readiness, competitive alternatives, and market dynamics."
    badge="Market Analysis · Draft v0.1"
    kpis={[
      { label: 'TAM / SAM', value: '$14B / $1.8B', hint: 'Global vs. Regional APAC', icon: <Target className="w-4 h-4" />, tone: 'purple' },
      { label: 'Projected SOM', value: '$60M', hint: '3-year reachable market', icon: <Layers className="w-4 h-4" />, tone: 'blue' },
      { label: 'Annual Growth', value: '~12%', hint: '11–13% estimated CAGR', icon: <TrendingUp className="w-4 h-4" />, tone: 'green' },
      { label: 'Market Risk', value: 'Medium', hint: 'Adoption & ERP barriers', icon: <AlertTriangle className="w-4 h-4" />, tone: 'amber' },
    ]}
    cards={cards}
    csuiteStage="market"
    validated
  />
);

