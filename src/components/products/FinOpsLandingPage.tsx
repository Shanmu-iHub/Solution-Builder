import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { useNavigation } from '../../context/NavigationContext';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Settings,
  ShieldCheck,
  Clock,
  Bell,
  Eye,
  Sliders,
  PieChart,
  Search,
  Server,
  Users,
  Leaf,
  ChevronRight,
  Cloud,
  Cpu,
  FileText,
  DollarSign,
  Activity,
  FlaskConical,
  Infinity as InfinityIcon,
  BarChart2,
  Layers,
  Database,
  Check,
  TrendingUp,
  X
} from 'lucide-react';

interface FinOpsLandingPageProps {
  onOpenConsole?: () => void;
}

export const FinOpsLandingPage: React.FC<FinOpsLandingPageProps> = ({ onOpenConsole }) => {
  const { navigateToProduct, setCurrentView } = useNavigation();
  const [activeCapability, setActiveCapability] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // 8 Capabilities from the UI design
  const capabilities = [
    {
      id: 'cost-visibility',
      number: '01',
      title: 'Cost Visibility',
      icon: <Eye className="w-4 h-4" />,
      tagline: 'Get real-time visibility into cloud and AI spending across all environments. Track costs by team, project, service and more.',
      features: [
        'Unified multi-cloud view',
        'Granular cost breakdowns',
        'Real-time spend analytics',
        'Custom reporting and dashboards'
      ],
      preview: {
        title: 'Real-time Visibility',
        bars: [
          { label: 'Jan', val1: 45, val2: 25 },
          { label: 'Feb', val1: 58, val2: 32 },
          { label: 'Mar', val1: 72, val2: 40 },
          { label: 'Apr', val1: 85, val2: 50 },
          { label: 'May', val1: 65, val2: 42 }
        ],
        providers: [
          { name: 'AWS', amount: '$12,430', color: 'bg-[#FF9900]', logo: 'aws' },
          { name: 'Azure', amount: '$8,920', color: 'bg-[#0089D6]', logo: 'azure' },
          { name: 'Google Cloud', amount: '$6,210', color: 'bg-[#4285F4]', logo: 'gcp' },
          { name: 'Others', amount: '$2,932', color: 'bg-[#8B5CF6]', logo: 'other' }
        ]
      }
    },
    {
      id: 'cost-optimization',
      number: '02',
      title: 'Cost Optimization',
      icon: <Sliders className="w-4 h-4" />,
      tagline: 'Automate resource rightsizing and eliminate idle waste with predictive AI recommendations and autonomous policies.',
      features: [
        'Automated idle resource teardown',
        'Reserved instance & savings plan planner',
        'AI prompt token caching & distillation',
        'Spot and burst compute orchestration'
      ],
      preview: {
        title: 'Optimization Pipeline',
        bars: [
          { label: 'Compute', val1: 80, val2: 45 },
          { label: 'Storage', val1: 60, val2: 30 },
          { label: 'Database', val1: 75, val2: 52 },
          { label: 'AI LLMs', val1: 90, val2: 40 },
          { label: 'Network', val1: 50, val2: 25 }
        ],
        providers: [
          { name: 'Compute Savings', amount: '$6,840/mo', color: 'bg-emerald-500', logo: 'aws' },
          { name: 'Storage LifeCycles', amount: '$2,150/mo', color: 'bg-blue-500', logo: 'azure' },
          { name: 'Token Cache Dedupe', amount: '$3,420/mo', color: 'bg-indigo-500', logo: 'gcp' },
          { name: 'Idle Teardown', amount: '$1,890/mo', color: 'bg-purple-500', logo: 'other' }
        ]
      }
    },
    {
      id: 'budget-forecasting',
      number: '03',
      title: 'Budget & Forecasting',
      icon: <PieChart className="w-4 h-4" />,
      tagline: 'Accurately forecast future cloud and model inference expenditures with machine learning trend detection.',
      features: [
        'Predictive runway and burn rate models',
        'Proactive threshold alert notifications',
        'Scenario-based what-if cost modelling',
        'Seasonal traffic surge protection'
      ],
      preview: {
        title: 'Runway Forecast & Budget',
        bars: [
          { label: 'Q1', val1: 40, val2: 35 },
          { label: 'Q2', val1: 55, val2: 50 },
          { label: 'Q3', val1: 70, val2: 60 },
          { label: 'Q4', val1: 85, val2: 72 },
          { label: 'Proj', val1: 95, val2: 80 }
        ],
        providers: [
          { name: 'Q3 Allocated Budget', amount: '$45,000', color: 'bg-blue-600', logo: 'azure' },
          { name: 'Current Trajectory', amount: '$38,200', color: 'bg-emerald-500', logo: 'aws' },
          { name: 'Forecasted Variance', amount: '-15.1%', color: 'bg-indigo-500', logo: 'gcp' },
          { name: 'Safety Margin', amount: '$6,800', color: 'bg-amber-500', logo: 'other' }
        ]
      }
    },
    {
      id: 'governance-policies',
      number: '04',
      title: 'Governance & Policies',
      icon: <ShieldCheck className="w-4 h-4" />,
      tagline: 'Enforce guardrails and compliance rules across development and production environments automatically.',
      features: [
        'Role-based deployment quotas',
        'Mandatory tag validation policies',
        'Automated compliance drift remediation',
        'Approval workflows for high-cost services'
      ],
      preview: {
        title: 'Active Governance Rules',
        bars: [
          { label: 'Tags', val1: 98, val2: 95 },
          { label: 'Quotas', val1: 92, val2: 90 },
          { label: 'Security', val1: 100, val2: 98 },
          { label: 'Regions', val1: 95, val2: 92 },
          { label: 'Tiers', val1: 88, val2: 85 }
        ],
        providers: [
          { name: 'Tag Compliance', amount: '99.4%', color: 'bg-emerald-500', logo: 'aws' },
          { name: 'Quota Enforcement', amount: 'Active', color: 'bg-blue-600', logo: 'azure' },
          { name: 'Regional Locks', amount: 'Strict', color: 'bg-purple-600', logo: 'gcp' },
          { name: 'Approval Gates', amount: '12 Cleared', color: 'bg-indigo-600', logo: 'other' }
        ]
      }
    },
    {
      id: 'anomaly-detection',
      number: '05',
      title: 'Anomaly Detection',
      icon: <Search className="w-4 h-4" />,
      tagline: 'Instant alerts on unexpected spikes in cloud infrastructure or token inference before budgets are drained.',
      features: [
        'Hourly statistical outlier detection',
        'Root-cause attribution within seconds',
        'Slack, PagerDuty and Teams alerts',
        'Automated circuit breakers for runaway loops'
      ],
      preview: {
        title: 'Anomaly Monitor Stream',
        bars: [
          { label: '00h', val1: 20, val2: 18 },
          { label: '06h', val1: 22, val2: 20 },
          { label: '12h', val1: 85, val2: 40 },
          { label: '18h', val1: 30, val2: 25 },
          { label: '24h', val1: 24, val2: 22 }
        ],
        providers: [
          { name: 'Spike Detected (Egress)', amount: 'Resolved', color: 'bg-emerald-500', logo: 'aws' },
          { name: 'AI Batch Prompt Spike', amount: 'Throttled', color: 'bg-amber-500', logo: 'gcp' },
          { name: 'Zero False Positives', amount: '99.8%', color: 'bg-blue-600', logo: 'azure' },
          { name: 'Mean Time to Detect', amount: '< 3 mins', color: 'bg-indigo-600', logo: 'other' }
        ]
      }
    },
    {
      id: 'resource-rightsizing',
      number: '06',
      title: 'Resource Rightsizing',
      icon: <Server className="w-4 h-4" />,
      tagline: 'Match workload resource consumption with optimal cloud instance families and container memory limits.',
      features: [
        'Kubernetes pod resource recommendation',
        'Overprovisioned VM downsizing suggestions',
        'EBS storage volume type modernizations',
        'Serverless concurrency fine-tuning'
      ],
      preview: {
        title: 'Compute Rightsizing',
        bars: [
          { label: 'EKS', val1: 78, val2: 42 },
          { label: 'RDS', val1: 65, val2: 38 },
          { label: 'EC2', val1: 84, val2: 50 },
          { label: 'Lambda', val1: 40, val2: 28 },
          { label: 'Blob', val1: 55, val2: 30 }
        ],
        providers: [
          { name: 'EKS Nodes Optimized', amount: '24 Pods', color: 'bg-blue-600', logo: 'aws' },
          { name: 'RDS Family Upgrade', amount: '$1,200/mo', color: 'bg-emerald-500', logo: 'azure' },
          { name: 'Unattached Disks', amount: '0 Idle', color: 'bg-indigo-600', logo: 'gcp' },
          { name: 'Performance Headroom', amount: '40% Safe', color: 'bg-purple-600', logo: 'other' }
        ]
      }
    },
    {
      id: 'chargeback-allocation',
      number: '07',
      title: 'Chargeback & Allocation',
      icon: <Users className="w-4 h-4" />,
      tagline: 'Assign 100% of shared costs, cluster compute, and third-party APIs back to appropriate cost centers and business units.',
      features: [
        'Multi-tenant Kubernetes cost allocation',
        'Shared common infrastructure split rules',
        'Business unit showback statements',
        'Custom cost allocation tags and metadata'
      ],
      preview: {
        title: 'Department Allocation',
        bars: [
          { label: 'Eng', val1: 85, val2: 60 },
          { label: 'AI/ML', val1: 95, val2: 70 },
          { label: 'Prod', val1: 60, val2: 45 },
          { label: 'Mktg', val1: 40, val2: 25 },
          { label: 'Sales', val1: 30, val2: 20 }
        ],
        providers: [
          { name: 'Engineering Core', amount: '$14,350', color: 'bg-blue-600', logo: 'aws' },
          { name: 'AI & Data Science', amount: '$11,200', color: 'bg-indigo-600', logo: 'gcp' },
          { name: 'Product Growth', amount: '$4,850', color: 'bg-emerald-500', logo: 'azure' },
          { name: 'Internal Ops', amount: '$2,120', color: 'bg-purple-500', logo: 'other' }
        ]
      }
    },
    {
      id: 'sustainability',
      number: '08',
      title: 'Sustainability',
      icon: <Leaf className="w-4 h-4" />,
      tagline: 'Measure, report, and reduce the carbon footprint of your multi-cloud and high-power AI GPU workloads.',
      features: [
        'Scope 1, 2, and 3 cloud carbon analytics',
        'Green energy region optimization',
        'Carbon-efficient workload scheduling',
        'ESG sustainability export reports'
      ],
      preview: {
        title: 'Carbon & Green Efficiency',
        bars: [
          { label: 'US-E', val1: 65, val2: 45 },
          { label: 'EU-W', val1: 30, val2: 20 },
          { label: 'AP-S', val1: 55, val2: 38 },
          { label: 'US-W', val1: 40, val2: 28 },
          { label: 'Green', val1: 85, val2: 70 }
        ],
        providers: [
          { name: 'Carbon Abated', amount: '-32.4 MT', color: 'bg-emerald-500', logo: 'aws' },
          { name: 'Renewable Region %', amount: '84.6%', color: 'bg-teal-500', logo: 'azure' },
          { name: 'Idle Power Curtailed', amount: '12.8 MWh', color: 'bg-blue-600', logo: 'gcp' },
          { name: 'Green Index', amount: 'Grade A+', color: 'bg-indigo-600', logo: 'other' }
        ]
      }
    }
  ];

  // Brand SVG Logos
  const renderBrandLogo = (brand: string) => {
    switch (brand) {
      case 'aws':
        return (
          <svg className="w-8 h-8" viewBox="0 0 50 30" fill="none">
            <path
              d="M14.07 14.28c0 1.95-.5 3.44-1.5 4.47-.99 1.03-2.39 1.54-4.2 1.54-1.22 0-2.28-.27-3.18-.8-1.53-.9-2.3-2.35-2.3-4.34 0-1.2.35-2.18 1.06-2.95.7-.77 1.66-1.25 2.87-1.44 1.22-.19 2.62-.3 4.2-.35v-.65c0-.98-.24-1.74-.71-2.28-.47-.54-1.18-.81-2.12-.81-.77 0-1.48.17-2.13.5-.66.34-1.17.84-1.55 1.52l-2.02-1.22c.62-1.02 1.45-1.8 2.5-2.35C5.97 5.16 7.22 4.88 8.7 4.88c1.8 0 3.22.48 4.25 1.45 1.03.97 1.55 2.37 1.55 4.2v3.75h-.43zm-7.05 4.08c1.06 0 1.9-.3 2.53-.9.63-.6.94-1.46.94-2.58v-1.25c-1.3.05-2.38.16-3.23.33-.85.17-1.48.47-1.88.9-.4.43-.6.97-.6 1.62 0 .61.2 1.09.6 1.44.4.35 1 .54 1.64.54v-.1zM24.8 19.95l-3.35-12.7h2.64l2.12 8.95 2.05-8.95h2.47l2.06 8.95 2.12-8.95h2.58l-3.4 12.7h-2.55l-2.06-8.68-2.06 8.68h-2.62zm16.5-1.55l1.65-1.78c1.12 1.1 2.45 1.65 3.98 1.65.78 0 1.39-.16 1.83-.48.44-.32.66-.75.66-1.29 0-.44-.16-.8-.48-1.08-.32-.28-.86-.53-1.62-.75l-2.15-.62c-1.22-.35-2.13-.88-2.73-1.59-.6-.71-.9-1.6-.9-2.67 0-1.38.54-2.48 1.62-3.3 1.08-.82 2.47-1.23 4.17-1.23 1.34 0 2.56.3 3.66.9 1.1.6 1.94 1.42 2.52 2.46l-1.85 1.46c-.8-.98-1.92-1.47-3.36-1.47-.75 0-1.34.16-1.77.48-.43.32-.64.73-.64 1.23 0 .42.16.76.48 1.02.32.26.88.5 1.68.72l2.05.58c1.3.37 2.27.92 2.9 1.65.63.73.95 1.64.95 2.73 0 1.42-.53 2.55-1.59 3.39-1.06.84-2.48 1.26-4.26 1.26-1.78 0-3.38-.45-4.8-1.36v.08z"
              fill="#232F3E"
            />
            <path
              d="M39.6 24.3c-5.32 3.92-13.06 6.02-19.7 6.02-9.28 0-17.65-3.38-23.9-9.05-.18-.17-.02-.39.2-.26 6.55 3.8 14.52 6.09 22.75 6.09 5.89 0 12.33-1.37 18.25-4.23.44-.22.82.32.4.63v.8z"
              fill="#FF9900"
            />
            <path
              d="M41.7 22.82c-.67-.86-4.42-.41-6.1-.21-.26.03-.3-.2-.06-.37 1.54-1.1 4.07-1.47 4.96-.34.9 1.13.24 3.73-1.24 4.93-.23.18-.42.08-.3-.16.78-1.55 3.4-3 2.74-3.85z"
              fill="#FF9900"
            />
          </svg>
        );
      case 'azure':
        return (
          <svg className="w-7 h-7" viewBox="0 0 48 48" fill="none">
            <path d="M19.5 4L4 38.5h11.2l9.8-22.1L19.5 4z" fill="#0078D4" />
            <path d="M20.6 18.3L15.2 30.2l12.4 8.3H44L30.8 14.6 20.6 18.3z" fill="#0089D6" />
            <path d="M15.2 38.5h13.8l-8.6-6-5.2 6z" fill="#1490DF" />
            <path d="M30.8 14.6L20.6 18.3l17.8 20.2H44L30.8 14.6z" fill="#2899F5" />
          </svg>
        );
      case 'gcp':
        return (
          <svg className="w-7 h-7" viewBox="0 0 48 48" fill="none">
            <path d="M38.5 20.2c0-.7-.1-1.4-.2-2.1H24v7.7h8.2c-.4 2-1.5 3.7-3.2 4.9v4.1h5.2c3-2.8 4.7-6.9 4.7-11.8z" fill="#4285F4" />
            <path d="M24 35c4.3 0 8-1.4 10.6-3.9l-5.2-4.1c-1.4 1-3.3 1.6-5.4 1.6-4.1 0-7.7-2.8-8.9-6.6H9.7v4.2C12.3 31.4 17.8 35 24 35z" fill="#34A853" />
            <path d="M15.1 22c-.3-.9-.5-1.9-.5-3s.2-2.1.5-3v-4.2H9.7C8.6 13.8 8 16.3 8 19s.6 5.2 1.7 7.2l5.4-4.2z" fill="#FBBC05" />
            <path d="M24 10.4c2.4 0 4.5.8 6.2 2.4l4.6-4.6C32 5.8 28.3 4.4 24 4.4c-6.2 0-11.7 3.6-14.3 8.8l5.4 4.2c1.2-3.8 4.8-6.6 8.9-6.6z" fill="#EA4335" />
          </svg>
        );
      case 'databricks':
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" fill="#FF3621" />
            <path d="M2 12.5L12 18L22 12.5L12 7L2 12.5Z" fill="#E62C18" />
            <path d="M2 17.5L12 23L22 17.5L12 12L2 17.5Z" fill="#CC2513" />
          </svg>
        );
      case 'kubernetes':
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
              stroke="#326CE5"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" fill="#326CE5" />
            <path d="M12 5V9M12 15V19M6 8.5L9.5 10.5M14.5 13.5L18 15.5M6 15.5L9.5 13.5M14.5 10.5L18 8.5" stroke="#326CE5" strokeWidth="1.5" />
          </svg>
        );
      case 'snowflake':
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="#29B5E8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M10 4l2-2 2 2M10 20l2 2 2-2M4 10l-2 2 2 2M20 10l2 2-2 2" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'terraform':
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <path d="M1.5 2.5h6v7h-6z" fill="#7B42BC" />
            <path d="M9 7h6v7H9z" fill="#5C4EE5" />
            <path d="M9 14.5h6v7H9z" fill="#5C4EE5" />
            <path d="M16.5 7h6v7h-6z" fill="#844FBA" />
          </svg>
        );
      default:
        return <Cloud className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* 1. Breadcrumb */}
      <Breadcrumb items={[{ label: 'Products' }, { label: 'FinOps' }]} />

      {/* 2. Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-blue-50/70 via-white to-slate-50/40 border border-blue-100/60 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        {/* Soft background glow accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Badge matching design */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50/90 border border-cyan-100/80 flex items-center justify-center text-cyan-700 shadow-2xs">
                <Database className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>FinOps</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
                Optimize cloud costs.
              </h1>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
                Maximize business value.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed max-w-lg">
              Gain complete visibility, control, and optimization of your cloud and AI infrastructure costs with AI-powered FinOps.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onOpenConsole}
                className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Open FinOps</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#334155] border border-slate-200 font-semibold text-sm transition-all flex items-center gap-2.5 shadow-2xs cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Watch Overview</span>
              </button>
            </div>
          </div>

          {/* Right Hero Column: 3D Illustration matching the reference */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Floating Checklist in top-right */}
              <div className="absolute -top-3 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-100 shadow-lg space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Reduce waste</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Improve efficiency</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Maximize ROI</span>
                </div>
              </div>

              {/* Central Graphic Container with 3D Isometric Screen */}
              <div className="relative p-6 pt-10 pb-8 bg-gradient-to-br from-blue-100/50 via-white to-blue-50/60 rounded-3xl border border-blue-200/50 shadow-md">
                {/* 3D Slanted Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Realtime Spend</span>
                      <h4 className="text-sm font-bold text-[#0F172A]">Smarter Cloud Spending</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      -28% waste
                    </span>
                  </div>

                  {/* Chart Bars & Upward Curve */}
                  <div className="pt-4 flex items-end justify-between h-28 gap-2 relative">
                    {/* SVG Trend Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 90" fill="none">
                      <path
                        d="M 10 70 Q 60 65, 100 45 T 190 15"
                        stroke="#2563EB"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="190" cy="15" r="4" fill="#2563EB" />
                    </svg>

                    {/* Bar columns */}
                    {[
                      { height: '35%', bg: 'bg-blue-300' },
                      { height: '48%', bg: 'bg-blue-400' },
                      { height: '62%', bg: 'bg-blue-500' },
                      { height: '78%', bg: 'bg-blue-600' },
                      { height: '55%', bg: 'bg-blue-400' },
                      { height: '90%', bg: 'bg-[#1D4ED8]' }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          className={`w-full rounded-t-md ${bar.bg} transition-all duration-500`}
                          style={{ height: bar.height }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating 3D Cloud Graphic */}
                <div className="absolute -bottom-4 -left-3 sm:-left-6 z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-400 shadow-xl shadow-blue-500/30 flex items-center justify-center border-2 border-white">
                    <Cloud className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white/20" />
                  </div>
                </div>

                {/* Handwritten Annotation on the bottom right */}
                <div className="absolute -bottom-6 right-2 sm:right-4 flex items-center gap-2 pointer-events-none select-none">
                  <svg className="w-8 h-8 text-blue-500 transform -rotate-12" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M 5 35 C 15 30, 25 20, 32 8 M 32 8 L 24 9 M 32 8 L 30 16"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-[12px] font-semibold text-blue-600 italic tracking-tight leading-tight">
                    Smarter Spending<br />Brighter Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Key Stats Ribbon (4 Metrics Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">30%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Average Cost Savings</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Spend Visibility</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">2x</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Faster ROI</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">40%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Reduction in Idle Resources</div>
          </div>
        </div>
      </div>

      {/* 4. KEY CAPABILITIES Section */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            KEY CAPABILITIES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Everything you need to manage and optimize cloud costs
          </h2>
        </div>

        {/* Split View Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs">
          {/* Left Vertical Tabs list */}
          <div className="lg:col-span-4 space-y-1 pr-0 lg:pr-2">
            {capabilities.map((cap, index) => {
              const isActive = activeCapability === index;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapability(index)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/80 text-[#2563EB] font-semibold border-l-4 border-[#2563EB] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#2563EB]' : 'text-slate-400'}>
                      {cap.icon}
                    </span>
                    <span className="text-[13px]">{cap.title}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#2563EB]" />}
                </button>
              );
            })}
          </div>

          {/* Right Detail Pane */}
          <div className="lg:col-span-8 bg-slate-50/60 rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Info Column */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-block px-3 py-1 rounded-lg bg-blue-100/70 text-blue-700 text-xs font-extrabold tracking-wide">
                  {capabilities[activeCapability].number}
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  {capabilities[activeCapability].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {capabilities[activeCapability].tagline}
                </p>

                {/* Features check list */}
                <div className="space-y-2.5 pt-2">
                  {capabilities[activeCapability].features.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Action */}
                <div className="pt-4">
                  <button
                    onClick={onOpenConsole}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visual Preview Card matching image */}
              <div className="md:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {capabilities[activeCapability].preview.title}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Micro Bar Chart */}
                <div className="flex items-end justify-between h-20 gap-2 border-b border-slate-100 pb-3">
                  {capabilities[activeCapability].preview.bars.map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center gap-0.5 h-16">
                        <div
                          className="w-2 sm:w-2.5 bg-blue-600 rounded-t-sm"
                          style={{ height: `${bar.val1}%` }}
                        />
                        <div
                          className="w-2 sm:w-2.5 bg-sky-300 rounded-t-sm"
                          style={{ height: `${bar.val2}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium">{bar.label}</span>
                    </div>
                  ))}
                </div>

                {/* Cloud Providers / Items Breakdown */}
                <div className="space-y-2 text-xs">
                  {capabilities[activeCapability].preview.providers.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.color}`} />
                        <span className="font-medium text-slate-700 text-[11.5px]">{p.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11.5px]">{p.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. USE CASES Section */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            USE CASES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Drive measurable business value
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Cloud className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Optimize Cloud Spend</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reduce unnecessary infrastructure costs.
              </p>
            </div>
            <button
              onClick={onOpenConsole}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-2 group"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Control AI Costs</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monitor and optimize AI model and agent usage.
              </p>
            </div>
            <button
              onClick={onOpenConsole}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-2 group"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Departmental Accountability</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enable cost ownership across teams.
              </p>
            </div>
            <button
              onClick={onOpenConsole}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-2 group"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Govern at Scale</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Maintain compliance with cost policies and standards.
              </p>
            </div>
            <button
              onClick={onOpenConsole}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-2 group"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. INTEGRATIONS Section */}
      <div className="space-y-4">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            INTEGRATIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
            Works with your existing tools
          </h2>
        </div>

        {/* Logos horizontal bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            {renderBrandLogo('aws')}
            <span className="text-xs font-bold text-slate-700">AWS</span>
          </div>

          <div className="flex items-center gap-2.5">
            {renderBrandLogo('azure')}
            <span className="text-xs font-bold text-slate-700">Microsoft Azure</span>
          </div>

          <div className="flex items-center gap-2.5">
            {renderBrandLogo('gcp')}
            <span className="text-xs font-bold text-slate-700">Google Cloud</span>
          </div>

          <div className="flex items-center gap-2.5">
            {renderBrandLogo('databricks')}
            <span className="text-xs font-bold text-slate-700">Databricks</span>
          </div>

          <div className="flex items-center gap-2.5">
            {renderBrandLogo('kubernetes')}
            <span className="text-xs font-bold text-slate-700">Kubernetes</span>
          </div>

          <div className="flex items-center gap-2.5">
            {renderBrandLogo('snowflake')}
            <span className="text-xs font-bold text-slate-700">Snowflake</span>
          </div>

          <div className="flex items-center gap-2.5">
            {renderBrandLogo('terraform')}
            <span className="text-xs font-bold text-slate-700">Terraform</span>
          </div>

          <button
            onClick={() => setCurrentView('integrations')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* 7. GET STARTED CTA Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0C1E4E] via-[#123180] to-[#1D4ED8] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl text-white">
        {/* Glow & 3D bar steps backdrop */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-30 sm:opacity-50 pointer-events-none flex items-end justify-end pr-8 pb-4 gap-3">
          <div className="w-8 sm:w-12 h-24 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-t-lg shadow-lg" />
          <div className="w-8 sm:w-12 h-36 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-t-lg shadow-lg" />
          <div className="w-8 sm:w-12 h-48 bg-gradient-to-t from-cyan-300 to-sky-200 rounded-t-lg shadow-lg" />
          <div className="w-8 sm:w-12 h-60 bg-gradient-to-t from-cyan-200 to-white rounded-t-lg shadow-lg" />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest block">
            GET STARTED
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to optimize your costs?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Get started with FinOps in minutes and unlock the full potential of your cloud and AI investments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenConsole}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Open FinOps</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('projects')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-200 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Documentation</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8. RELATED PRODUCTS Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              RELATED PRODUCTS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
              Explore other SNS Square products
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('products')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group"
          >
            <span>View all products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {/* Monitoring */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700">
                <Activity className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-[#0F172A]">Monitoring</h5>
              <p className="text-[11px] text-slate-500 leading-snug">
                Monitor applications and infrastructure.
              </p>
            </div>
            <button
              onClick={() => navigateToProduct('monitoring')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Testing */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-[#0F172A]">Testing</h5>
              <p className="text-[11px] text-slate-500 leading-snug">
                Test and validate AI solutions.
              </p>
            </div>
            <button
              onClick={() => navigateToProduct('testing')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* DevOps */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700">
                <InfinityIcon className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-[#0F172A]">DevOps</h5>
              <p className="text-[11px] text-slate-500 leading-snug">
                Build, deploy and operate faster.
              </p>
            </div>
            <button
              onClick={() => navigateToProduct('devops')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Compliance */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-[#0F172A]">Compliance</h5>
              <p className="text-[11px] text-slate-500 leading-snug">
                Manage regulatory compliance.
              </p>
            </div>
            <button
              onClick={() => navigateToProduct('compliance')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <BarChart2 className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-[#0F172A]">Analytics</h5>
              <p className="text-[11px] text-slate-500 leading-snug">
                Turn data into actionable insights.
              </p>
            </div>
            <button
              onClick={() => navigateToProduct('analytics')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Audit */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700">
                <FileText className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-[#0F172A]">Audit</h5>
              <p className="text-[11px] text-slate-500 leading-snug">
                Track and review activities.
              </p>
            </div>
            <button
              onClick={() => navigateToProduct('audit')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Watch Overview Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">FinOps Overview Walkthrough</h3>
                  <p className="text-xs text-slate-500">Autonomous Cloud & AI Cost Optimization</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div className="aspect-video bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-blue-600/80 border border-blue-400/40 flex items-center justify-center shadow-lg shadow-blue-500/40 mb-3 animate-pulse">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <h4 className="text-lg font-bold">Watch FinOps in Action</h4>
                <p className="text-xs text-blue-200 max-w-md mt-1">
                  Discover how SNS Square Cloud FinOps automatically identifies idle compute, token redundancies, and unifies multi-cloud billing.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">Real-time</span>
                  <span className="text-slate-500 text-[11px]">Spend ingestion</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">1-Click</span>
                  <span className="text-slate-500 text-[11px]">Autonomous action</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">Zero Risk</span>
                  <span className="text-slate-500 text-[11px]">Rollback guarantee</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  if (onOpenConsole) onOpenConsole();
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Live Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
