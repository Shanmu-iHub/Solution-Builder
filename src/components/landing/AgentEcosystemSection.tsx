import React, { useState } from 'react';
import {
  Code2,
  Bot,
  Boxes,
  BarChart3,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export interface EcosystemLayer {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  pills: string[];
  color: string;
  gradient: string;
  sideGradient: string;
  lightBg: string;
  borderColor: string;
  icon: React.ReactNode;
}

const ECOSYSTEM_LAYERS: EcosystemLayer[] = [
  {
    id: 'solution-builder',
    stepNumber: '01',
    title: 'Solution Builder',
    subtitle: 'Full-Stack · Frontend · SuperAgent',
    role: 'Builds complete enterprise solutions',
    description: 'Architect, build, and ship enterprise-grade AI applications from prompts or modular blueprints with automated full-stack code generation and 1-click cloud deployment.',
    pills: ['Full-Stack Architect', 'Frontend Studio', 'SuperAgent Pipeline', 'Git Sync & CI/CD', '1-Click Cloud Deploy'],
    color: '#0066FF',
    gradient: 'linear-gradient(135deg, #1E75FF 0%, #0047B3 100%)',
    sideGradient: 'linear-gradient(180deg, #004099 0%, #002D6B 100%)',
    lightBg: 'rgba(0, 102, 255, 0.06)',
    borderColor: 'rgba(0, 102, 255, 0.25)',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: 'agent-builder',
    stepNumber: '02',
    title: 'Agent Builder',
    subtitle: 'LLM Orchestration & Custom Tools',
    role: 'Combines capabilities into agents',
    description: 'Design autonomous multi-agent systems with tool calling, persistent memory management, conditional routing logic, and human-in-the-loop governance.',
    pills: ['Multi-Agent Flow', 'Tool Calling SDK', 'Memory Management', 'Human-in-the-Loop', 'Live Debugger'],
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    sideGradient: 'linear-gradient(180deg, #5B21B6 0%, #431407 100%)',
    lightBg: 'rgba(124, 58, 237, 0.06)',
    borderColor: 'rgba(124, 58, 237, 0.25)',
    icon: <Bot className="w-5 h-5" />,
  },
  {
    id: 'products',
    stepNumber: '03',
    title: 'Products',
    subtitle: 'Enterprise AI Suite & Marketplace',
    role: 'Provides ready-to-use capabilities',
    description: 'Explore ready-to-use AI products, vertical industry solutions, AI Chat, Image & Video generators, Secrets Vault, and pre-integrated Marketplace modules.',
    pills: ['AI Chat & Media', 'Marketplace Apps', 'Knowledge Base (RAG)', 'Secrets Vault', 'Custom Agents'],
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
    sideGradient: 'linear-gradient(180deg, #0284C7 0%, #075985 100%)',
    lightBg: 'rgba(8, 145, 178, 0.06)',
    borderColor: 'rgba(8, 145, 178, 0.25)',
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    id: 'ai-factory',
    stepNumber: '04',
    title: 'AI Factory',
    subtitle: 'Analytics, FinOps & Operations',
    role: 'Creates the foundation & governance',
    description: 'Unified command center to monitor real-time latency, manage AI compute budgets, enforce SOC-2 compliance, audit logs, and optimize LLM token costs.',
    pills: ['Observability & Drift', 'FinOps & Cost Control', 'SOC-2 Compliance', 'Audit Logs', 'Model Benchmarks'],
    color: '#059669',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    sideGradient: 'linear-gradient(180deg, #059669 0%, #064E3B 100%)',
    lightBg: 'rgba(5, 150, 105, 0.06)',
    borderColor: 'rgba(5, 150, 105, 0.25)',
    icon: <BarChart3 className="w-5 h-5" />,
  },
];

interface AgentEcosystemSectionProps {
  onSelectAction?: (layerId: string) => void;
}

export const AgentEcosystemSection: React.FC<AgentEcosystemSectionProps> = ({ onSelectAction }) => {
  const [activeLayerId, setActiveLayerId] = useState<string>('solution-builder');
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);

  // Isometric stack slab spacing parameters with ample vertical distance
  const stackPositions = [
    { yOffset: 25, index: 0 },
    { yOffset: 155, index: 1 },
    { yOffset: 285, index: 2 },
    { yOffset: 415, index: 3 },
  ];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white border-b border-gray-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[650px] h-[650px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.04) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* 90% Section Width */}
      <div className="w-[90%] max-w-[1550px] mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 mb-3.5">
            <Layers className="w-3.5 h-3.5" /> 3D LAYERED ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.08]">
            Your entire agent ecosystem,<br />
            <span className="text-gray-900">One view.</span>
          </h2>
        </div>

        {/* Content Grid: Left 3D Isometric View, Right Interactive Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: 3D Isometric Stack Visual */}
          <div className="lg:col-span-6 flex items-center justify-center relative select-none">
            <div className="w-full max-w-[580px] aspect-[1.08/1] relative">
              <svg
                viewBox="0 0 550 560"
                className="w-full h-full drop-shadow-sm overflow-visible"
                style={{ filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.07))' }}
              >
                <defs>
                  {/* Layer Top Face Gradients */}
                  {/* 1. Solution Builder - Electric Blue */}
                  <linearGradient id="layer0Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E75FF" />
                    <stop offset="100%" stopColor="#0047B3" />
                  </linearGradient>

                  {/* 2. Agent Builder - Electric Purple */}
                  <linearGradient id="layer1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6D28D9" />
                  </linearGradient>

                  {/* 3. Products - Ocean Cyan */}
                  <linearGradient id="layer2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </linearGradient>

                  {/* 4. AI Factory - Emerald Green */}
                  <linearGradient id="layer3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>

                  {/* Wireframe shadow filter */}
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Draw 4 Isometric Slabs from bottom to top for correct natural overlap */}
                {[...ECOSYSTEM_LAYERS].reverse().map((layer, reverseIdx) => {
                  const idx = 3 - reverseIdx;
                  const isActive = activeLayerId === layer.id;
                  const isHovered = hoveredLayerId === layer.id;
                  const basePos = stackPositions[idx];

                  // Smooth elevation lift on active/hover
                  const lift = isActive ? 16 : isHovered ? 8 : 0;
                  const y = basePos.yOffset - lift;

                  // Isometric parallelogram points:
                  // Top Back (P1), Right Corner (P2), Bottom Front (P3), Left Corner (P4)
                  const p1 = { x: 235, y: y };
                  const p2 = { x: 485, y: y + 95 };
                  const p3 = { x: 280, y: y + 185 };
                  const p4 = { x: 30, y: y + 90 };

                  // Slab thickness (3D vertical depth downwards)
                  const depth = isActive ? 15 : 8;
                  const p3Down = { x: p3.x, y: p3.y + depth };
                  const p2Down = { x: p2.x, y: p2.y + depth };
                  const p4Down = { x: p4.x, y: p4.y + depth };

                  // Colors based on active / hovered state
                  const fillColor = isActive
                    ? `url(#layer${idx}Grad)`
                    : isHovered
                    ? '#F8FAFC'
                    : '#FFFFFF';

                  const strokeColor = isActive
                    ? '#ffffff'
                    : isHovered
                    ? layer.color
                    : '#334155';

                  const strokeWidth = isActive ? 1.6 : 1.2;

                  return (
                    <g
                      key={layer.id}
                      className="cursor-pointer transition-all duration-300 ease-out"
                      onClick={() => setActiveLayerId(layer.id)}
                      onMouseEnter={() => setHoveredLayerId(layer.id)}
                      onMouseLeave={() => setHoveredLayerId(null)}
                      style={{
                        transform: `translateY(${isActive ? -4 : 0}px)`,
                        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      }}
                    >
                      {/* Active Slab Drop Shadow */}
                      {isActive && (
                        <polygon
                          points={`${p1.x},${p1.y + 26} ${p2.x},${p2.y + 26} ${p3.x},${p3.y + 26} ${p4.x},${p4.y + 26}`}
                          fill="rgba(0,0,0,0.16)"
                          filter="url(#softGlow)"
                        />
                      )}

                      {/* Side face (Left front thickness) */}
                      <polygon
                        points={`${p4.x},${p4.y} ${p3.x},${p3.y} ${p3Down.x},${p3Down.y} ${p4Down.x},${p4Down.y}`}
                        fill={isActive ? 'rgba(0,0,0,0.38)' : '#E2E8F0'}
                        stroke={isActive ? 'rgba(255,255,255,0.2)' : strokeColor}
                        strokeWidth={0.8}
                      />

                      {/* Side face (Right front thickness) */}
                      <polygon
                        points={`${p3.x},${p3.y} ${p2.x},${p2.y} ${p2Down.x},${p2Down.y} ${p3Down.x},${p3Down.y}`}
                        fill={isActive ? 'rgba(0,0,0,0.52)' : '#CBD5E1'}
                        stroke={isActive ? 'rgba(255,255,255,0.2)' : strokeColor}
                        strokeWidth={0.8}
                      />

                      {/* Top Plane Face */}
                      <polygon
                        points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                        fill={fillColor}
                        stroke={isActive ? 'rgba(255,255,255,0.45)' : strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                      />

                      {/* Text Label on the 3D Slab Surface - Positioned safely in upper-right clear area */}
                      <g
                        transform={`translate(330, ${y + 98}) rotate(21.6)`}
                        className="pointer-events-none select-none transition-all duration-300"
                      >
                        <text
                          x={0}
                          y={0}
                          textAnchor="middle"
                          className="font-bold tracking-tight select-none"
                          style={{
                            fontSize: '17px',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fill: isActive ? '#FFFFFF' : '#0F172A',
                            fontWeight: isActive ? 800 : 700,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {layer.title}
                        </text>
                        {isActive && (
                          <text
                            x={0}
                            y={16}
                            textAnchor="middle"
                            className="font-medium tracking-normal select-none"
                            style={{
                              fontSize: '10.5px',
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fill: 'rgba(255,255,255,0.9)',
                              letterSpacing: '0.01em',
                            }}
                          >
                            {layer.subtitle}
                          </text>
                        )}
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* RIGHT: Interactive Accordion / Product Details */}
          <div className="lg:col-span-6 space-y-4">
            {ECOSYSTEM_LAYERS.map((layer, index) => {
              const isActive = activeLayerId === layer.id;

              return (
                <div
                  key={layer.id}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? 'border-gray-200 shadow-md bg-white'
                      : 'border-transparent hover:border-gray-100 hover:bg-gray-50/50'
                  }`}
                >
                  {/* Header Bar */}
                  <button
                    onClick={() => setActiveLayerId(isActive ? '' : layer.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Icon box */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isActive
                            ? 'text-white'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-900'
                        }`}
                        style={{
                          background: isActive ? layer.color : undefined,
                        }}
                      >
                        {layer.icon}
                      </div>

                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                            isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                          }`}
                        >
                          {layer.title}
                        </h3>
                        {!isActive && (
                          <p className="text-xs text-gray-400 font-medium mt-0.5">
                            {layer.role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isActive
                          ? 'bg-gray-100 text-gray-700 rotate-45'
                          : 'text-gray-400 group-hover:text-gray-700'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expanded Content Drawer */}
                  {isActive && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-0 animate-fadeIn">
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 font-normal">
                        {layer.description}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-2 pt-1 pb-4">
                        {layer.pills.map((pill) => (
                          <span
                            key={pill}
                            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700 transition-colors"
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>

                      {/* Action trigger button */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Ecosystem Layer 0{index + 1}
                        </span>
                        <button
                          onClick={() => onSelectAction?.(layer.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold transition-transform hover:translate-x-0.5"
                          style={{ color: layer.color }}
                        >
                          Explore {layer.title} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Clean separator line */}
                  <div className="mx-6 border-b border-gray-100" />
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};
