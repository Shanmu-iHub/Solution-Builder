import React from 'react';
import { AlertTriangle, BarChart3, Building2, Cpu, FileText, Globe2, Layers, Radar, Swords, Target, TrendingUp, Users } from 'lucide-react';
import { DiscoveryDashboard, FeatureCardData } from './DiscoveryDashboard';

/* Illustrative figures for the expense-claims demo project. They are AI estimates, not sourced data. */

const cards: FeatureCardData[] = [
  {
    id: 'definition', title: 'Market Definition', icon: <Target className="w-4 h-4" />, status: { label: 'Defined', tone: 'green' },
    blocks: [
      {
        kind: 'facts', rows: [
          { label: 'Market identification', value: 'Spend and expense management software for field sales teams.' },
          { label: 'Market boundaries', value: 'Mid-size B2B companies with mobile sales staff. Excludes enterprise travel suites and consumer budgeting apps.' },
          { label: 'Geography', value: 'India first, then wider APAC.' },
        ],
      },
      { kind: 'chips', title: 'Target segments', items: ['Mid-size B2B sales orgs', 'Distribution & FMCG field teams', 'Pharma field reps', 'Services with client visits'], tone: 'blue' },
      { kind: 'table', title: 'Segment sizing', head: ['Segment', 'Companies', 'Field reps'], rows: [['Mid-size B2B sales orgs', '38,000', '1.1M'], ['Distribution & FMCG', '22,000', '1.6M'], ['Pharma field reps', '4,500', '0.4M'], ['Services with client visits', '15,000', '0.5M']] },
    ],
  },
  {
    id: 'research', title: 'Market Research', icon: <BarChart3 className="w-4 h-4" />, status: { label: 'AI estimate', tone: 'amber' },
    blocks: [
      {
        kind: 'sizing', title: 'Market size (TAM / SAM / SOM)', rows: [
          { label: 'TAM', value: '$14B', note: 'Global expense management software', pct: 100 },
          { label: 'SAM', value: '$1.8B', note: 'Field-sales teams in India and APAC', pct: 62 },
          { label: 'SOM', value: '$60M', note: 'Reachable in three years with direct sales', pct: 30 },
        ],
      },
      {
        kind: 'facts', rows: [
          { label: 'Growth rate', value: 'Roughly 11–13% a year (estimate, source not yet confirmed).' },
          { label: 'Demand analysis', value: 'Strongest where reps travel daily and claims are still emailed.' },
          { label: 'Adoption trends', value: 'Mobile-first claim filing is now the default expectation for new tools.' },
        ],
      },
      { kind: 'list', title: 'Market drivers', items: ['Cost pressure on finance operations', 'Mobile-first workforce', 'Tighter audit and policy compliance'], tone: 'green' },
      { kind: 'list', title: 'Market barriers', items: ['Entrenched ERP expense modules', 'Integration effort with finance systems', 'Rep habits around paper receipts'], tone: 'red' },
      { kind: 'table', title: 'Segmentation detail', head: ['Segment', 'Share of SAM', 'Growth', 'Readiness'], rows: [['Mid-size B2B sales orgs', '38%', 'High', 'High'], ['Distribution & FMCG', '34%', 'Medium', 'Medium'], ['Pharma field reps', '14%', 'Medium', 'High'], ['Services with client visits', '14%', 'High', 'Medium']] },
    ],
  },
  {
    id: 'industry', title: 'Industry Analysis', icon: <Building2 className="w-4 h-4" />, status: { label: 'Complete', tone: 'green' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Industry trends', value: 'Receipt capture is becoming a commodity; value is moving to policy automation.' },
        { label: 'Industry structure', value: 'A few global suites, many regional point tools, ERP modules as the default.' },
        { label: 'Business models', value: 'Per-user subscription, with premium tiers for audit and card feeds.' },
        { label: 'Regulatory environment', value: 'Tax invoice and data-retention rules apply to stored receipts.' },
        { label: 'Industry disruption signals', value: 'AI receipt reading and card-feed matching are cutting manual entry.' },
      ],
    }],
  },
  {
    id: 'landscape', title: 'Competitive Landscape', icon: <Radar className="w-4 h-4" />, status: { label: '7 players', tone: 'blue' },
    blocks: [
      { kind: 'chips', title: 'Direct competitors', items: ['SAP Concur', 'Expensify', 'Zoho Expense'], tone: 'red' },
      { kind: 'chips', title: 'Indirect competitors', items: ['Microsoft Power Automate flows', 'ERP expense modules'], tone: 'amber' },
      { kind: 'chips', title: 'Existing solutions & alternatives', items: ['Email + spreadsheet claims', 'Paper receipts and manual approval', 'Build in-house'], tone: 'slate' },
      {
        kind: 'matrix', title: 'Positioning map', xLabel: 'Field-sales focus', yLabel: 'Ease of adoption', quadrants: ['Easy, generic', 'Easy & focused', 'Heavy, generic', 'Focused, heavy'],
        points: [
          { label: 'Concur', x: 3, y: 3 }, { label: 'Expensify', x: 4, y: 8 }, { label: 'Zoho Expense', x: 5, y: 7 },
          { label: 'Power Automate', x: 2, y: 4 }, { label: 'ERP modules', x: 1, y: 2 }, { label: 'Our product', x: 8, y: 8, highlight: true },
        ],
      },
    ],
  },
  {
    id: 'analysis', title: 'Competitive Analysis', icon: <Swords className="w-4 h-4" />, wide: true, status: { label: 'To verify', tone: 'amber' },
    blocks: [
      {
        kind: 'table', title: 'Competitor comparison (indicative — verify before use)', head: ['Competitor', 'Features', 'Pricing', 'Target users', 'Strengths / weaknesses'], rows: [
          ['SAP Concur', 'Receipt capture, approval workflow, travel booking', 'Quote-based, per user', 'Large enterprises', 'Deep ERP fit / heavy to set up'],
          ['Expensify', 'Phone receipt scan, report routing', 'Per user, tiered plans', 'Small and mid-size teams', 'Easy to start / generic, not field-sales specific'],
          ['Zoho Expense', 'Receipt scan, policy rules, multi-level approval', 'Per user, free tier', 'Small and mid-size teams', 'Good value / lighter audit depth'],
        ],
      },
      {
        kind: 'facts', rows: [
          { label: 'Differentiation', value: 'Built around field-sales trips and visit-based spend, with policy checks at capture time.' },
          { label: 'Market gaps', value: 'No clear leader for mobile-first field-sales claims with local finance integrations.' },
        ],
      },
    ],
  },
  {
    id: 'technology', title: 'Technology Assessment', icon: <Cpu className="w-4 h-4" />, status: { label: 'Feasible', tone: 'green' },
    blocks: [
      { kind: 'bars', title: 'Technology maturity', max: 10, rows: [{ label: 'Mobile receipt OCR', value: 9, note: 'Proven and widely available' }, { label: 'AI field extraction', value: 7, note: 'Maturing fast' }, { label: 'Policy rules engine', value: 8 }, { label: 'Card-feed integration', value: 5, note: 'Depends on issuer APIs' }] },
      {
        kind: 'facts', rows: [
          { label: 'Emerging tech', value: 'Multimodal AI that reads receipts and drafts the claim.' },
          { label: 'AI/ML capabilities', value: 'Field extraction, category suggestion, anomaly flagging.' },
          { label: 'Technology trends', value: 'On-device capture and AI-assisted audit are becoming standard.' },
          { label: 'Adoption readiness', value: 'High — reps already use phones; finance system choice is still open.' },
        ],
      },
    ],
  },
  {
    id: 'gaps', title: 'Market Gap Analysis', icon: <Layers className="w-4 h-4" />, status: { label: '5 gaps', tone: 'blue' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Unmet needs', value: 'Claim status visibility for reps.' },
        { label: 'Underserved segments', value: 'Mid-size field teams that outgrew spreadsheets but find suites too heavy.' },
        { label: 'Product gaps', value: 'Trip-aware claims and policy checks while the rep is still on the road.' },
        { label: 'Service gaps', value: 'Local-language support and onboarding for field staff.' },
        { label: 'Capability gaps', value: 'Out-of-the-box connectors for regional finance systems.' },
      ],
    }],
  },
  {
    id: 'risks', title: 'Market Risk Assessment', icon: <AlertTriangle className="w-4 h-4" />, status: { label: 'Medium', tone: 'amber' },
    blocks: [{
      kind: 'table', title: 'Risk register', head: ['Risk', 'Description', 'Level'], strongCol: 2, rows: [
        ['Economic', 'Sales hiring freezes shrink the field-rep base', 'Medium'],
        ['Regulatory', 'Receipt retention and tax invoice rules vary by region', 'Medium'],
        ['Technology', 'OCR accuracy on poor photos', 'Low'],
        ['Competitive', 'Established suites add field-sales features', 'High'],
        ['Adoption barriers', 'ERP lock-in and rep habits', 'Medium'],
      ],
    }],
  },
  {
    id: 'report', title: 'Market Report', icon: <FileText className="w-4 h-4" />, status: { label: 'Draft v0.1', tone: 'slate' },
    blocks: [{
      kind: 'facts', rows: [
        { label: 'Market summary', value: 'A $1.8B serviceable market growing about 12% a year, with mobile-first claim filing now expected.' },
        { label: 'Competitive landscape', value: 'Three direct competitors; none is built around field-sales travel patterns.' },
        { label: 'Market gaps', value: 'Claim visibility, trip-aware policy checks and regional finance connectors.' },
        { label: 'Key trends', value: 'AI receipt reading, policy automation, card-feed matching.' },
        { label: 'Risk assessment', value: 'Medium overall; competitive response is the main risk.' },
        { label: 'Investment recommendation', value: 'Proceed to user discovery. Confirm market size with a sourced report before committing build budget.' },
      ],
    }],
  },
];

export const MarketDiscovery: React.FC = () => (
  <DiscoveryDashboard
    phase="Phase 4"
    title="Market & Industry Discovery"
    subtitle="How big the market is, who else is in it and where the gaps are."
    badge="Market Report · Draft v0.1"
    kpis={[
      { label: 'Serviceable market', value: '$1.8B', hint: 'SAM, AI estimate', icon: <Globe2 className="w-4 h-4" />, tone: 'blue' },
      { label: 'Growth rate', value: '~12% / yr', hint: 'Not yet sourced', icon: <TrendingUp className="w-4 h-4" />, tone: 'green' },
      { label: 'Competitors mapped', value: 7, hint: '3 direct, 2 indirect, 2 alternatives', icon: <Users className="w-4 h-4" />, tone: 'purple' },
      { label: 'Overall risk', value: 'Medium', hint: '1 high, 3 medium', icon: <AlertTriangle className="w-4 h-4" />, tone: 'amber' },
    ]}
    cards={cards}
    csuiteStage="market"
    validated
  />
);
