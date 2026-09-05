import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Bot, 
  Layers, 
  Sparkles, 
  Activity, 
  DollarSign, 
  CheckCircle2, 
  Play, 
  Pause,
  ShieldCheck,
  Zap,
  Terminal
} from 'lucide-react';

export const FeatureHeroCards: React.FC = () => {
  const { navigateToAgent, setCurrentView, navigateToProduct } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = [
    {
      id: 0,
      badge: 'Autonomous AI Swarm',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Build & Deploy Autonomous AI Agents',
      description: 'Deploy specialized agents for deep multi-step research, real-time meeting transcripts, automated fact checking, voice calling, and continuous workflow automation.',
      primaryBtnText: 'Create AI Agent',
      primaryAction: () => navigateToAgent('deep-research'),
      secondaryBtnText: 'Explore 6 Agents',
      secondaryAction: () => setCurrentView('agents'),
      tag: '6 Agents Ready',
      bgGradient: 'from-blue-50/70 via-indigo-50/40 to-white',
      borderColor: 'border-blue-100',
      accentColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      graphicType: 'agent'
    },
    {
      id: 1,
      badge: 'Enterprise Product Suite',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: 'Architect, Test & Optimize Multi-Cloud Systems',
      description: 'Enterprise architecture studio with drag-and-drop cloud canvases, PRD AI decomposition, 2,480+ automated testing suites, FinOps cloud spend savings, and visual CI/CD pipelines.',
      primaryBtnText: 'Design Architecture',
      primaryAction: () => navigateToProduct('solution-architect'),
      secondaryBtnText: 'View 10 Products',
      secondaryAction: () => setCurrentView('products'),
      tag: '10 Enterprise Tools',
      bgGradient: 'from-indigo-50/70 via-purple-50/40 to-white',
      borderColor: 'border-indigo-100',
      accentColor: 'text-indigo-600',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      graphicType: 'architecture'
    },
    {
      id: 2,
      badge: 'Observability & Frontier Models',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Unified Observability, FinOps & Frontier Model Hub',
      description: 'Real-time multi-cloud telemetry, continuous SOC 2 compliance tracking, -$6,420/mo identified cost reductions, and instant playground for Gemini 2.0, Claude 3.5, and GPT-4o.',
      primaryBtnText: 'Open Monitoring Console',
      primaryAction: () => navigateToProduct('monitoring'),
      secondaryBtnText: 'Test Frontier Models',
      secondaryAction: () => navigateToProduct('ai-models'),
      tag: '99.995% SLA Live',
      bgGradient: 'from-emerald-50/70 via-teal-50/40 to-white',
      borderColor: 'border-emerald-100',
      accentColor: 'text-emerald-600',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      graphicType: 'telemetry'
    }
  ];

  // Auto-play interval
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div 
      className="relative mb-8 group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slide Container Card */}
      <div className={`relative bg-gradient-to-r ${slide.bgGradient} rounded-3xl border ${slide.borderColor} border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden min-h-[300px] flex flex-col justify-between`}>
        {/* Subtle Ambient Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/3 w-64 h-64 rounded-full bg-indigo-400/5 blur-2xl pointer-events-none" />

        {/* Slide Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 relative z-10 items-center">
          {/* Left Text & Actions (Col 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tag & Badge */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${slide.badgeColor} shadow-2xs`}>
                <Sparkles className="w-3 h-3" />
                {slide.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-white/80 border border-slate-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                {slide.tag}
              </span>
            </div>

            {/* Slide Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              {slide.title}
            </h2>

            {/* Slide Description */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xl font-normal">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                onClick={slide.primaryAction}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${slide.buttonColor} text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer`}
              >
                <span>{slide.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={slide.secondaryAction}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition-all hover:border-slate-400 cursor-pointer"
              >
                <span>{slide.secondaryBtnText}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Graphic (Col 8-12) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            {/* Graphic 1: AI Agent Robot & Interactive Swarm */}
            {slide.graphicType === 'agent' && (
              <div className="relative w-full max-w-[320px] bg-white/90 backdrop-blur-xs rounded-2xl border border-blue-200/80 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Deep Research Agent</h4>
                      <p className="text-[10px] text-emerald-600 font-mono">● Active Synthesis</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Auto-Pilot
                  </span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-600">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      Parsing 480 Technical Papers
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">100%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-blue-900 font-medium">
                      <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      Fact Checking Sources
                    </span>
                    <span className="font-mono text-[10px] text-blue-700 font-bold">In Progress</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Tokens: 14.2k/sec</span>
                  <span>Latency: 180ms</span>
                </div>
              </div>
            )}

            {/* Graphic 2: Solution Architecture & IaC Cloud Studio */}
            {slide.graphicType === 'architecture' && (
              <div className="relative w-full max-w-[320px] bg-white/90 backdrop-blur-xs rounded-2xl border border-indigo-200/80 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Multi-Cloud Canvas</h4>
                      <p className="text-[10px] text-indigo-600 font-mono">Terraform / AWS / Azure</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    IaC Synced
                  </span>
                </div>

                <div className="bg-slate-900 rounded-xl p-2.5 text-[11px] font-mono text-slate-300 space-y-1 overflow-hidden">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                    <Terminal className="w-3 h-3 text-indigo-400" />
                    <span>main.tf (Auto-Generated)</span>
                  </div>
                  <p className="text-emerald-400">resource "aws_eks_cluster" "prod" &#123;</p>
                  <p className="text-slate-400 pl-3">name = "sns-core-cluster"</p>
                  <p className="text-slate-400 pl-3">version = "1.30"</p>
                  <p className="text-emerald-400">&#125;</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-semibold text-indigo-700">12 Cloud Resources</span>
                  <span className="text-emerald-600 font-semibold font-mono">✓ 0 Drift Detected</span>
                </div>
              </div>
            )}

            {/* Graphic 3: Telemetry, Observability & FinOps */}
            {slide.graphicType === 'telemetry' && (
              <div className="relative w-full max-w-[320px] bg-white/90 backdrop-blur-xs rounded-2xl border border-emerald-200/80 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Cluster Observability</h4>
                      <p className="text-[10px] text-emerald-600 font-mono">99.995% Uptime</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    -$6.4k/mo Saved
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      SOC 2 Continuous Compliance
                    </span>
                    <span className="font-bold text-emerald-700 font-mono text-[11px]">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                  </div>

                  <div className="flex justify-between items-center text-slate-700 pt-1">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium">
                      <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                      FinOps Optimization
                    </span>
                    <span className="font-bold text-slate-900 font-mono text-[11px]">$24.8k / $30k</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Gemini 2.0 • Claude 3.5</span>
                  <span>p50: 42ms</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Navigation Footer */}
        <div className="px-6 py-3.5 bg-white/70 backdrop-blur-xs border-t border-slate-200/80 flex items-center justify-between">
          {/* Pagination Indicators / Step Dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-8 bg-blue-600 shadow-2xs' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Go to Slide ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}

            <span className="text-[11px] font-mono text-slate-500 ml-2 font-medium">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Controls: Prev, Pause/Play, Next */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isAutoPlaying ? 'Pause Auto-slide' : 'Resume Auto-slide'}
              aria-label="Toggle Auto-slide"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={prevSlide}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all shadow-2xs cursor-pointer"
              title="Previous Slide"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextSlide}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all shadow-2xs cursor-pointer"
              title="Next Slide"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Quick Navigation Mini-Pills underneath slider */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              currentSlide === idx
                ? 'bg-white border-blue-400 shadow-xs ring-1 ring-blue-400/30'
                : 'bg-white/60 hover:bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${currentSlide === idx ? 'text-blue-600' : 'text-slate-700'}`}>
                Slide {idx + 1}: {s.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{s.tag}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {s.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
