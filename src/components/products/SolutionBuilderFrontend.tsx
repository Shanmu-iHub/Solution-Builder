import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { 
  Monitor, 
  Boxes, 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Layers, 
  Code2, 
  Palette, 
  Layout, 
  Type, 
  Grid,
  Square,
  Play
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const SolutionBuilderFrontend: React.FC = () => {
  const { setCurrentView, navigateToProduct } = useNavigation();
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in select-none pb-16 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumb Top Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button 
          onClick={() => setCurrentView('home')} 
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-500">Solution Builder</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Frontend</span>
      </nav>

      {/* 2. Enhanced Hero Section matching Reference Image & Color Palette */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]/40 border border-slate-200/90 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-gradient-to-br from-purple-400/15 via-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[400px] bg-gradient-to-tr from-sky-400/15 via-blue-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Typography, Eyebrow & CTAs */}
          <div className="flex-1 max-w-xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-indigo-200/80 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>SOLUTION BUILDER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-3">
              Frontend <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Studio</span>
            </h1>

            {/* Sub-Headline & Description */}
            <p className="text-base sm:text-lg font-semibold text-[#1E293B] mb-2">
              Build and customize frontend experiences with AI.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
              Create modern, responsive and production-ready user interfaces using AI-powered generation, components and customization tools.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Responsive Design</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Component Generator</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Theme Customizer</span>
              </span>
            </div>

            {/* Primary Action Button */}
            <div>
              <button
                onClick={() => setIsStudioModalOpen(true)}
                className="py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-indigo-600 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Open Frontend Platform</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Perspective UI Studio Canvas matching Reference Image */}
          <div className="w-full lg:w-[580px] h-[320px] sm:h-[360px] relative flex items-center justify-center">
            
            {/* Background 3D Main Browser Mockup Card */}
            <div 
              className="w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-300 z-10"
              style={{ perspective: '800px' }}
            >
              {/* Browser Header */}
              <div className="bg-slate-800 px-3.5 py-2.5 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[10px] text-slate-400 font-mono">frontend-studio.app</span>
                </div>
              </div>

              {/* Browser Canvas Content */}
              <div className="p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white min-h-[190px]">
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] leading-tight">
                    Modern<br />Interfaces<br />Faster
                  </h3>
                  <button className="px-4 py-1.5 rounded-lg bg-[#0F172A] text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                    Explore UI
                  </button>
                </div>

                {/* 3D Modern Architecture Building Visual */}
                <div className="w-28 h-28 rounded-xl bg-gradient-to-tr from-slate-200 via-slate-100 to-white border border-slate-200/80 shadow-inner flex items-center justify-center overflow-hidden relative">
                  <svg className="w-full h-full opacity-85" viewBox="0 0 100 100" fill="none">
                    <rect x="20" y="25" width="60" height="60" rx="30" fill="#CBD5E1" />
                    <rect x="30" y="15" width="40" height="70" rx="20" fill="#E2E8F0" />
                    <rect x="40" y="35" width="20" height="50" rx="10" fill="#94A3B8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Left Floating Palette: Components Palette */}
            <div 
              className="absolute left-0 sm:left-2 top-8 w-[125px] sm:w-[135px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-3 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20"
            >
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 mb-2">
                <Boxes className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] font-bold text-slate-800">Components</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                  <Square className="w-2.5 h-2.5 text-slate-400" />
                  <span>Button</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                  <Layout className="w-2.5 h-2.5 text-slate-400" />
                  <span>Card</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                  <Type className="w-2.5 h-2.5 text-slate-400" />
                  <span>Input</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                  <Grid className="w-2.5 h-2.5 text-slate-400" />
                  <span>Navbar</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                  <Sliders className="w-2.5 h-2.5 text-slate-400" />
                  <span>Modal</span>
                </div>
              </div>
            </div>

            {/* Right Floating Palette: Style & Tokens Inspector */}
            <div 
              className="absolute right-0 sm:right-2 top-12 w-[130px] sm:w-[140px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-3 transform rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20"
            >
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 mb-2">
                <Palette className="w-3.5 h-3.5 text-pink-600" />
                <span className="text-[10px] font-bold text-slate-800">Style</span>
              </div>
              <div className="space-y-2 text-[10px] text-slate-600">
                <div>
                  <span className="text-[9px] text-slate-400 font-medium block mb-1">Colors</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0F172A] ring-1 ring-slate-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#4F46E5] ring-1 ring-slate-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#93C5FD] ring-1 ring-slate-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#CBD5E1] ring-1 ring-slate-300" />
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-medium block mb-1">Typography</span>
                  <div className="px-2 py-1 rounded bg-slate-100 text-[9px] font-semibold text-slate-700 flex items-center justify-between">
                    <span>Aa Inter</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-medium block mb-1">Spacing</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm border border-slate-300 bg-slate-100" />
                    <span className="w-3.5 h-3.5 rounded-sm border border-slate-300 bg-slate-100" />
                    <span className="w-4 h-4 rounded-sm border border-indigo-400 bg-indigo-50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Handwritten / Stylized Badge Callout: Design / Build / Launch */}
            <div className="absolute right-4 bottom-2 text-right z-30">
              <div className="text-xs sm:text-sm font-extrabold text-[#0F172A] tracking-wider italic font-mono flex flex-col items-end">
                <span>Design</span>
                <span>Build</span>
                <span>Launch</span>
                <div className="w-14 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mt-0.5" />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 3. Section: Capabilities */}
      <section className="space-y-6">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">
            CAPABILITIES
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Everything you need to build better user experiences
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Responsive Design */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50/90 border border-sky-100/80 flex items-center justify-center text-sky-600 group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Monitor className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                Responsive Design
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Create responsive interfaces that work seamlessly across all devices and screen sizes.
              </p>
            </div>
          </div>

          {/* Card 2: Component Generation */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50/90 border border-indigo-100/80 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Boxes className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Component Generation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Generate reusable UI components with clean, scalable and accessible code.
              </p>
            </div>
          </div>

          {/* Card 3: UI Generation */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50/90 border border-purple-100/80 flex items-center justify-center text-purple-600 group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Sparkles className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                UI Generation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Turn prompt ideas and wireframes into stunning, modern user interfaces with AI.
              </p>
            </div>
          </div>

          {/* Card 4: Frontend Customization */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/90 border border-amber-100/80 flex items-center justify-center text-amber-600 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-2xs mb-5">
                <Sliders className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Frontend Customization
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                Customize and fine-tune your frontend with themes, typography styles and advanced tokens.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Bottom Banner matching Reference Image */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]/70 border border-slate-200/90 p-7 sm:p-9 shadow-xs overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Callout */}
        <div className="z-10 max-w-lg">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
            FROM IDEA TO IMPACT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Build modern interfaces, without limits.
          </h2>
        </div>

        {/* Right Button & Tech Accent */}
        <div className="z-10 flex items-center gap-6">
          <button
            onClick={() => setIsStudioModalOpen(true)}
            className="py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-indigo-600 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>Open Frontend Platform</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="hidden lg:flex flex-col items-center pl-4 border-l border-slate-300/80">
            <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase leading-tight text-center">
              BUILD<br />FASTER<br />TOGETHER
            </span>
            <div className="w-6 h-0.5 bg-indigo-500 mt-1 rounded-full" />
          </div>
        </div>

      </section>

      {/* Interactive Frontend Studio Modal */}
      <Modal
        isOpen={isStudioModalOpen}
        onClose={() => setIsStudioModalOpen(false)}
        title="Frontend Experience Studio"
        maxWidth="2xl"
      >
        <div className="space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI-Powered Component & Layout Studio</span>
            </div>
            <p className="text-xs text-slate-600">
              Generate fully responsive React & Tailwind components, customize design tokens, and export production-ready code in seconds.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Step 1: Choose Layout & Component Archetype</div>
                  <div className="text-[11px] text-slate-500">Select from Dashboard, Landing Page, Ecommerce, or SaaS</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsStudioModalOpen(false);
                  navigateToProduct('solution-factor');
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 bg-indigo-50 rounded-lg"
              >
                Launch Factor
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-purple-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Step 2: Customize Colors, Typography & Styles</div>
                  <div className="text-[11px] text-slate-500">Fine-tune Tailwind tokens and light/dark theme presets</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsStudioModalOpen(false);
                  navigateToProduct('solution-architect');
                }}
                className="text-xs font-semibold text-purple-600 hover:text-purple-800 px-3 py-1.5 bg-purple-50 rounded-lg"
              >
                Launch Studio
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setIsStudioModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsStudioModalOpen(false);
                navigateToProduct('solution-factor');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Launch Studio Environment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
