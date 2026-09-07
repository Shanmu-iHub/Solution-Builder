import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { useNavigation } from '../../context/NavigationContext';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronRight,
  FileText,
  X,
  LucideIcon
} from 'lucide-react';
import { ProductId, ServiceId } from '../../types';

export interface MetricItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  tagline: string;
  features: string[];
  preview: {
    title: string;
    badge?: string;
    bars: { label: string; val1: number; val2: number }[];
    providers: { name: string; amount: string; color: string }[];
  };
}

export interface UseCaseItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
}

export interface IntegrationItem {
  name: string;
  logoKey: string;
}

export interface RelatedOfferingItem {
  id: ProductId | ServiceId;
  type: 'product' | 'service';
  name: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
}

export interface OfferingLandingConfig {
  id: string;
  type: 'product' | 'service';
  breadcrumbCategory: 'Products' | 'AI Services' | 'Marketplace' | 'Build & Create';
  badgeTitle: string;
  badgeIcon: React.ReactNode;
  heroIcon: React.ReactNode;
  heroIconBg: string;
  heroIconColor: string;
  heroIconBorder: string;
  headline1: string;
  headline2: string;
  subtitle: string;
  openButtonText: string;
  
  // Hero Visual
  heroIllustration: {
    cardTitle: string;
    cardSub: string;
    cardBadge: string;
    annotationText: string;
    checklist: string[];
    bars: { height: string; bg: string }[];
    curveColor?: string;
  };

  // 4 Metrics
  metrics: MetricItem[];

  // 8 Capabilities
  capabilitiesHeadline: string;
  capabilities: CapabilityItem[];

  // 4 Use Cases
  useCasesHeadline: string;
  useCases: UseCaseItem[];

  // Integrations
  integrationsHeadline: string;
  integrations: IntegrationItem[];

  // CTA
  ctaTitle: string;
  ctaSubtitle: string;

  // Related
  relatedHeadline: string;
  relatedOfferings: RelatedOfferingItem[];

  // Video walkthrough modal info
  videoModal: {
    title: string;
    subtitle: string;
    heroCardTitle: string;
    heroCardDesc: string;
    highlights: { label: string; sub: string }[];
  };
}

interface ProductLandingLayoutProps {
  config: OfferingLandingConfig;
  onOpenConsole?: () => void;
}

export const ProductLandingLayout: React.FC<ProductLandingLayoutProps> = ({ config, onOpenConsole }) => {
  const { navigateToProduct, navigateToService, setCurrentView } = useNavigation();
  const [activeCapability, setActiveCapability] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const renderBrandLogo = (brand: string) => {
    switch (brand) {
      case 'aws':
        return (
          <svg className="w-7 h-7" viewBox="0 0 50 30" fill="none">
            <path
              d="M14.07 14.28c0 1.95-.5 3.44-1.5 4.47-.99 1.03-2.39 1.54-4.2 1.54-1.22 0-2.28-.27-3.18-.8-1.53-.9-2.3-2.35-2.3-4.34 0-1.2.35-2.18 1.06-2.95.7-.77 1.66-1.25 2.87-1.44 1.22-.19 2.62-.3 4.2-.35v-.65c0-.98-.24-1.74-.71-2.28-.47-.54-1.18-.81-2.12-.81-.77 0-1.48.17-2.13.5-.66.34-1.17.84-1.55 1.52l-2.02-1.22c.62-1.02 1.45-1.8 2.5-2.35C5.97 5.16 7.22 4.88 8.7 4.88c1.8 0 3.22.48 4.25 1.45 1.03.97 1.55 2.37 1.55 4.2v3.75h-.43zm-7.05 4.08c1.06 0 1.9-.3 2.53-.9.63-.6.94-1.46.94-2.58v-1.25c-1.3.05-2.38.16-3.23.33-.85.17-1.48.47-1.88.9-.4.43-.6.97-.6 1.62 0 .61.2 1.09.6 1.44.4.35 1 .54 1.64.54v-.1zM24.8 19.95l-3.35-12.7h2.64l2.12 8.95 2.05-8.95h2.47l2.06 8.95 2.12-8.95h2.58l-3.4 12.7h-2.55l-2.06-8.68-2.06 8.68h-2.62zm16.5-1.55l1.65-1.78c1.12 1.1 2.45 1.65 3.98 1.65.78 0 1.39-.16 1.83-.48.44-.32.66-.75.66-1.29 0-.44-.16-.8-.48-1.08-.32-.28-.86-.53-1.62-.75l-2.15-.62c-1.22-.35-2.13-.88-2.73-1.59-.6-.71-.9-1.6-.9-2.67 0-1.38.54-2.48 1.62-3.3 1.08-.82 2.47-1.23 4.17-1.23 1.34 0 2.56.3 3.66.9 1.1.6 1.94 1.42 2.52 2.46l-1.85 1.46c-.8-.98-1.92-1.47-3.36-1.47-.75 0-1.34.16-1.77.48-.43.32-.64.73-.64 1.23 0 .42.16.76.48 1.02.32.26.88.5 1.68.72l2.05.58c1.3.37 2.27.92 2.9 1.65.63.73.95 1.64.95 2.73 0 1.42-.53 2.55-1.59 3.39-1.06.84-2.48 1.26-4.26 1.26-1.78 0-3.38-.45-4.8-1.36v.08z"
              fill="#232F3E"
            />
            <path
              d="M39.6 24.3c-5.32 3.92-13.06 6.02-19.7 6.02-9.28 0-17.65-3.38-23.9-9.05-.18-.17-.02-.39.2-.26 6.55 3.8 14.52 6.09 22.75 6.09 5.89 0 12.33-1.37 18.25-4.23.44-.22.82.32.4.63v.8z"
              fill="#FF9900"
            />
          </svg>
        );
      case 'azure':
        return (
          <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
            <path d="M19.5 4L4 38.5h11.2l9.8-22.1L19.5 4z" fill="#0078D4" />
            <path d="M20.6 18.3L15.2 30.2l12.4 8.3H44L30.8 14.6 20.6 18.3z" fill="#0089D6" />
            <path d="M15.2 38.5h13.8l-8.6-6-5.2 6z" fill="#1490DF" />
            <path d="M30.8 14.6L20.6 18.3l17.8 20.2H44L30.8 14.6z" fill="#2899F5" />
          </svg>
        );
      case 'gcp':
      case 'google':
        return (
          <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
            <path d="M38.5 20.2c0-.7-.1-1.4-.2-2.1H24v7.7h8.2c-.4 2-1.5 3.7-3.2 4.9v4.1h5.2c3-2.8 4.7-6.9 4.7-11.8z" fill="#4285F4" />
            <path d="M24 35c4.3 0 8-1.4 10.6-3.9l-5.2-4.1c-1.4 1-3.3 1.6-5.4 1.6-4.1 0-7.7-2.8-8.9-6.6H9.7v4.2C12.3 31.4 17.8 35 24 35z" fill="#34A853" />
            <path d="M15.1 22c-.3-.9-.5-1.9-.5-3s.2-2.1.5-3v-4.2H9.7C8.6 13.8 8 16.3 8 19s.6 5.2 1.7 7.2l5.4-4.2z" fill="#FBBC05" />
            <path d="M24 10.4c2.4 0 4.5.8 6.2 2.4l4.6-4.6C32 5.8 28.3 4.4 24 4.4c-6.2 0-11.7 3.6-14.3 8.8l5.4 4.2c1.2-3.8 4.8-6.6 8.9-6.6z" fill="#EA4335" />
          </svg>
        );
      case 'databricks':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" fill="#FF3621" />
            <path d="M2 12.5L12 18L22 12.5L12 7L2 12.5Z" fill="#E62C18" />
            <path d="M2 17.5L12 23L22 17.5L12 12L2 17.5Z" fill="#CC2513" />
          </svg>
        );
      case 'kubernetes':
      case 'k8s':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#326CE5" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="#326CE5" />
          </svg>
        );
      case 'snowflake':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="#29B5E8" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case 'terraform':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M1.5 2.5h6v7h-6z" fill="#7B42BC" />
            <path d="M9 7h6v7H9z" fill="#5C4EE5" />
            <path d="M9 14.5h6v7H9z" fill="#5C4EE5" />
            <path d="M16.5 7h6v7h-6z" fill="#844FBA" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#24292E" />
          </svg>
        );
      case 'slack':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M6 15a2 2 0 10-2-2 2 2 0 002 2zm1 0a2 2 0 002 2 2 2 0 002-2v-5H7z" fill="#E01E5A" />
            <path d="M9 6a2 2 0 10-2 2 2 2 0 002-2zm0 1a2 2 0 002 2 2 2 0 002-2V2H9z" fill="#36C5F0" />
            <path d="M18 9a2 2 0 102 2 2 2 0 00-2-2zm-1 0a2 2 0 00-2-2 2 2 0 00-2 2v5h4z" fill="#2EB67D" />
            <path d="M15 18a2 2 0 102-2 2 2 0 00-2 2zm0-1a2 2 0 00-2-2 2 2 0 00-2 2v5h4z" fill="#ECB22E" />
          </svg>
        );
      case 'openai':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M21.5 10.2a6 6 0 00-.5-4.8 6.1 6.1 0 00-5.7-3 6.1 6.1 0 00-4.8 2.2 6.1 6.1 0 00-6.9 3.2 6 6 0 00-1.8 4.6 6.1 6.1 0 002.5 5.5 6.1 6.1 0 005.7 3 6.1 6.1 0 004.8-2.2 6.1 6.1 0 006.9-3.2 6 6 0 001.8-4.6l-2 -.7z" stroke="#10A37F" strokeWidth="1.8" />
          </svg>
        );
      case 'anthropic':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M14 4L7 20h3.5l1.4-3.5h4.2L17.5 20H21L14 4zm-1.1 9.5l1.1-2.9 1.1 2.9h-2.2z" fill="#D97706" />
          </svg>
        );
      case 'docker':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12h19c0 4-3 7.5-8 7.5S3 16 2.5 12z" fill="#2496ED" />
            <rect x="5" y="8.5" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
            <rect x="8.5" y="8.5" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
            <rect x="12" y="8.5" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
            <rect x="8.5" y="5" width="2.5" height="2.5" rx="0.5" fill="#2496ED" />
          </svg>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
            {brand.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  const handleRelatedClick = (item: RelatedOfferingItem) => {
    if (item.type === 'product') {
      navigateToProduct(item.id as ProductId);
    } else {
      navigateToService(item.id as ServiceId);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* 1. Breadcrumb */}
      <Breadcrumb items={[{ label: config.breadcrumbCategory }, { label: config.badgeTitle }]} />

      {/* 2. Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-blue-50/70 via-white to-slate-50/40 border border-blue-100/60 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Badges */}
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl ${config.heroIconBg} ${config.heroIconBorder} ${config.heroIconColor} border flex items-center justify-center shadow-2xs`}
              >
                {config.heroIcon}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold">
                <span className="text-blue-600">{config.badgeIcon}</span>
                <span>{config.badgeTitle}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-0.5">
              <h1 className="text-2xl sm:text-3xl lg:text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {config.headline1}
              </h1>
              <h1 className="text-2xl sm:text-3xl lg:text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {config.headline2}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed max-w-lg">
              {config.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <button
                onClick={onOpenConsole}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>{config.openButtonText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#334155] border border-slate-200 font-semibold text-xs transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <Play className="w-2 h-2 fill-white ml-0.5" />
                </div>
                <span>Watch Overview</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Preview Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Floating Checklist */}
              <div className="absolute -top-3 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-100 shadow-lg space-y-2 text-xs">
                {config.heroIllustration.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Graphic Container */}
              <div className="relative p-6 pt-10 pb-8 bg-gradient-to-br from-blue-100/50 via-white to-blue-50/60 rounded-3xl border border-blue-200/50 shadow-md">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        {config.heroIllustration.cardSub}
                      </span>
                      <h4 className="text-sm font-bold text-[#0F172A]">{config.heroIllustration.cardTitle}</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {config.heroIllustration.cardBadge}
                    </span>
                  </div>

                  {/* Chart Bars & Curve */}
                  <div className="pt-4 flex items-end justify-between h-28 gap-2 relative">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 90" fill="none">
                      <path
                        d="M 10 70 Q 60 60, 100 40 T 190 12"
                        stroke={config.heroIllustration.curveColor || '#2563EB'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="190" cy="12" r="4" fill={config.heroIllustration.curveColor || '#2563EB'} />
                    </svg>

                    {config.heroIllustration.bars.map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          className={`w-full rounded-t-md ${bar.bg} transition-all duration-500`}
                          style={{ height: bar.height }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating 3D Badge Icon */}
                <div className="absolute -bottom-4 -left-3 sm:-left-6 z-10">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xl shadow-blue-500/30 flex items-center justify-center border-2 border-white text-white`}
                  >
                    <div className="scale-150">{config.heroIcon}</div>
                  </div>
                </div>

                {/* Handwritten Annotation */}
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
                    {config.heroIllustration.annotationText.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < config.heroIllustration.annotationText.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4 Value Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-colors"
          >
            <div
              className={`w-11 h-11 rounded-xl ${m.iconBg} ${m.iconBorder} ${m.iconColor} border flex items-center justify-center shrink-0`}
            >
              {m.icon}
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                {m.value}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. KEY CAPABILITIES (8-Tab Split View) */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            KEY CAPABILITIES
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight mt-0.5">
            {config.capabilitiesHeadline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs">
          {/* Left Vertical Tabs list */}
          <div className="lg:col-span-4 space-y-1 pr-0 lg:pr-2">
            {config.capabilities.map((cap, index) => {
              const isActive = activeCapability === index;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapability(index)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/80 text-[#2563EB] font-semibold border-l-4 border-[#2563EB] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#2563EB]' : 'text-slate-400'}>
                      {cap.icon}
                    </span>
                    <span className="text-xs font-semibold">{cap.title}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#2563EB]" />}
                </button>
              );
            })}
          </div>

          {/* Right Detail Pane */}
          {config.capabilities[activeCapability] && (
            <div className="lg:col-span-8 bg-slate-50/60 rounded-2xl border border-slate-100 p-5 sm:p-6 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-3">
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100/70 text-blue-700 text-[11px] font-extrabold tracking-wide">
                    {config.capabilities[activeCapability].number}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                    {config.capabilities[activeCapability].title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {config.capabilities[activeCapability].tagline}
                  </p>

                  <div className="space-y-2 pt-1">
                    {config.capabilities[activeCapability].features.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={onOpenConsole}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right Visual Preview Card */}
                <div className="md:col-span-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {config.capabilities[activeCapability].preview.title}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="flex items-end justify-between h-20 gap-2 border-b border-slate-100 pb-3">
                    {config.capabilities[activeCapability].preview.bars.map((bar, idx) => (
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

                  <div className="space-y-1.5 text-xs">
                    {config.capabilities[activeCapability].preview.providers.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50/70 border border-slate-100"
                      >
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${p.color}`} />
                          <span className="font-medium text-slate-700 text-[11px]">{p.name}</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">{p.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. USE CASES */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            USE CASES
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight mt-0.5">
            {config.useCasesHeadline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.useCases.map(uc => (
            <div
              key={uc.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-blue-200 transition-all"
            >
              <div className="space-y-2.5">
                <div
                  className={`w-9 h-9 rounded-xl ${uc.iconBg} ${uc.iconBorder} ${uc.iconColor} border flex items-center justify-center`}
                >
                  {uc.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">{uc.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{uc.desc}</p>
              </div>
              <button
                onClick={onOpenConsole}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-1 group"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. INTEGRATIONS */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            INTEGRATIONS
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight mt-0.5">
            {config.integrationsHeadline}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {config.integrations.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {renderBrandLogo(item.logoKey)}
              <span className="text-xs font-bold text-slate-700">{item.name}</span>
            </div>
          ))}

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
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0C1E4E] via-[#123180] to-[#1D4ED8] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-30 sm:opacity-50 pointer-events-none flex items-end justify-end pr-8 pb-4 gap-3">
          <div className="w-8 sm:w-12 h-24 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-t-lg shadow-lg" />
          <div className="w-8 sm:w-12 h-36 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-t-lg shadow-lg" />
          <div className="w-8 sm:w-12 h-48 bg-gradient-to-t from-cyan-300 to-sky-200 rounded-t-lg shadow-lg" />
          <div className="w-8 sm:w-12 h-60 bg-gradient-to-t from-cyan-200 to-white rounded-t-lg shadow-lg" />
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">
            GET STARTED
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{config.ctaTitle}</h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">{config.ctaSubtitle}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenConsole}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{config.openButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentView('projects')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-200 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Documentation</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8. RELATED OFFERINGS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              RELATED {config.type === 'product' ? 'PRODUCTS' : 'SERVICES'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mt-1">
              {config.relatedHeadline}
            </h2>
          </div>
          <button
            onClick={() => setCurrentView(config.type === 'product' ? 'products' : 'services')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group"
          >
            <span>View all {config.type === 'product' ? 'products' : 'services'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {config.relatedOfferings.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition-all"
            >
              <div className="space-y-2">
                <div
                  className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconBorder} ${item.iconColor} border flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <h5 className="text-xs font-bold text-[#0F172A]">{item.name}</h5>
                <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
              </div>
              <button
                onClick={() => handleRelatedClick(item)}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group pt-1"
              >
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Walkthrough Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">{config.videoModal.title}</h3>
                  <p className="text-xs text-slate-500">{config.videoModal.subtitle}</p>
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
                <h4 className="text-lg font-bold">{config.videoModal.heroCardTitle}</h4>
                <p className="text-xs text-blue-200 max-w-md mt-1">{config.videoModal.heroCardDesc}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                {config.videoModal.highlights.map((hl, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block">{hl.label}</span>
                    <span className="text-slate-500 text-[11px]">{hl.sub}</span>
                  </div>
                ))}
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
                <span>Launch Live Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
