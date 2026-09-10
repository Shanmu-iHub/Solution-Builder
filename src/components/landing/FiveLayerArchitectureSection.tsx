import React, { useState } from 'react';
import {
  Workflow,
  Bot,
  Share2,
  Cpu,
  Shield,
  Plus,
  ArrowRight,
} from 'lucide-react';

export interface ArchitectureLayer {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

const FIVE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'orchestration',
    num: '01',
    title: 'Orchestration Layer',
    tagline: 'Coordinate intelligence across your ecosystem',
    description: 'Coordinate intelligence across your ecosystem. Manage agents, workflows, tasks, decisions, triggers, and multi-agent collaboration from one orchestration layer.',
    capabilities: [
      'Workflow orchestration',
      'Multi-agent coordination',
      'Task routing',
      'Events & triggers',
      'Conditional logic',
      'Human-in-the-loop'
    ],
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    icon: <Workflow className="w-5 h-5" />
  },
  {
    id: 'agent-builder',
    num: '02',
    title: 'Agent Builder Layer',
    tagline: 'Build agents that actually get work done',
    description: 'Create purpose-built agents with instructions, tools, memory, knowledge, actions, and workflows that understand enterprise context and take action.',
    capabilities: [
      'Agent creation',
      'Instructions',
      'Tools & actions',
      'Knowledge',
      'Memory',
      'Skills',
      'Testing',
      'Deployment'
    ],
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    icon: <Bot className="w-5 h-5" />
  },
  {
    id: 'integration',
    num: '03',
    title: 'Integration Layer',
    tagline: 'Connect AI to the systems you already use',
    description: 'Connect applications, APIs, databases, enterprise platforms, communication tools, and external data sources into a unified intelligent mesh.',
    capabilities: [
      'APIs',
      'Enterprise applications',
      'Databases',
      'SaaS platforms',
      'Enterprise systems',
      'External services'
    ],
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
    icon: <Share2 className="w-5 h-5" />
  },
  {
    id: 'model',
    num: '04',
    title: 'Model Layer',
    tagline: 'The right intelligence for every task',
    description: 'Connect and manage AI models based on capability, performance, cost, and use case while keeping models independent from workflows.',
    capabilities: [
      'Multiple model providers',
      'Model selection',
      'Model routing',
      'Performance optimization',
      'Cost management',
      'Model evaluation'
    ],
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    icon: <Cpu className="w-5 h-5" />
  },
  {
    id: 'governance',
    num: '05',
    title: 'Governance Layer',
    tagline: 'Enterprise control from day one',
    description: 'Control identity, access, security, compliance, monitoring, audit trails, policies, and AI operations at enterprise scale.',
    capabilities: [
      'Identity & access',
      'Permissions',
      'Zero-trust security',
      'Compliance policies',
      'Audit trails',
      'Monitoring & telemetry'
    ],
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    icon: <Shield className="w-5 h-5" />
  }
];

interface FiveLayerArchitectureSectionProps {
  onSelectAction?: (layerId: string) => void;
}

export const FiveLayerArchitectureSection: React.FC<FiveLayerArchitectureSectionProps> = ({ onSelectAction }) => {
  const [activeLayerId, setActiveLayerId] = useState<string>('orchestration');
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);

  // 5 Slabs spacing parameters
  const stackPositions = [
    { yOffset: 20, index: 0 },
    { yOffset: 125, index: 1 },
    { yOffset: 230, index: 2 },
    { yOffset: 335, index: 3 },
    { yOffset: 440, index: 4 },
  ];

  return (
    <section id="platform" className="py-24 sm:py-32 bg-white border-b border-[#E5E7EB] relative overflow-hidden scroll-mt-20">
      {/* 90% Section Width Container */}
      <div className="w-[90%] max-w-[1550px] mx-auto">
        
        {/* Section Heading */}
        <div className="mb-14 sm:mb-18">
          <div className="text-xs font-black tracking-widest text-[#2563EB] uppercase mb-3">
            FIVE-LAYER ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
            Your entire AI ecosystem.<br />
            <span className="text-[#6B7280]">One unified architecture.</span>
          </h2>
        </div>

        {/* 2-Column Layout: Left 3D Isometric Stack (5 Slabs), Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: 3D Isometric Stack Visual (5 Layers) */}
          <div className="lg:col-span-6 flex items-center justify-center relative select-none">
            <div className="w-full max-w-[560px] aspect-[1.02/1] relative">
              <svg
                viewBox="0 0 540 600"
                className="w-full h-full drop-shadow-sm overflow-visible"
                style={{ filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.06))' }}
              >
                <defs>
                  {/* Layer Gradients */}
                  <linearGradient id="layer0" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>

                  <linearGradient id="layer1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#6D28D9" />
                  </linearGradient>

                  <linearGradient id="layer2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0891B2" />
                    <stop offset="100%" stopColor="#0E7490" />
                  </linearGradient>

                  <linearGradient id="layer3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>

                  <linearGradient id="layer4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>

                  <filter id="softGlow5" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Draw 5 Slabs from bottom to top */}
                {[...FIVE_LAYERS].reverse().map((layer, reverseIdx) => {
                  const idx = 4 - reverseIdx;
                  const isActive = activeLayerId === layer.id;
                  const isHovered = hoveredLayerId === layer.id;
                  const basePos = stackPositions[idx];

                  // Elevation lift
                  const lift = isActive ? 14 : isHovered ? 6 : 0;
                  const y = basePos.yOffset - lift;

                  // Isometric parallelogram points
                  const p1 = { x: 235, y: y };
                  const p2 = { x: 485, y: y + 90 };
                  const p3 = { x: 280, y: y + 175 };
                  const p4 = { x: 30, y: y + 85 };

                  // 3D thickness depth
                  const depth = isActive ? 12 : 7;
                  const p3Down = { x: p3.x, y: p3.y + depth };
                  const p2Down = { x: p2.x, y: p2.y + depth };
                  const p4Down = { x: p4.x, y: p4.y + depth };

                  const fillColor = isActive
                    ? `url(#layer${idx})`
                    : isHovered
                    ? '#F8FAFC'
                    : '#FFFFFF';

                  const strokeColor = isActive
                    ? '#ffffff'
                    : isHovered
                    ? '#2563EB'
                    : '#334155';

                  const strokeWidth = isActive ? 1.5 : 1.1;

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
                      {/* Active Drop Shadow */}
                      {isActive && (
                        <polygon
                          points={`${p1.x},${p1.y + 22} ${p2.x},${p2.y + 22} ${p3.x},${p3.y + 22} ${p4.x},${p4.y + 22}`}
                          fill="rgba(0,0,0,0.14)"
                          filter="url(#softGlow5)"
                        />
                      )}

                      {/* Side face (Left front thickness) */}
                      <polygon
                        points={`${p4.x},${p4.y} ${p3.x},${p3.y} ${p3Down.x},${p3Down.y} ${p4Down.x},${p4Down.y}`}
                        fill={isActive ? 'rgba(0,0,0,0.35)' : '#E2E8F0'}
                        stroke={isActive ? 'rgba(255,255,255,0.2)' : strokeColor}
                        strokeWidth={0.7}
                      />

                      {/* Side face (Right front thickness) */}
                      <polygon
                        points={`${p3.x},${p3.y} ${p2.x},${p2.y} ${p2Down.x},${p2Down.y} ${p3Down.x},${p3Down.y}`}
                        fill={isActive ? 'rgba(0,0,0,0.48)' : '#CBD5E1'}
                        stroke={isActive ? 'rgba(255,255,255,0.2)' : strokeColor}
                        strokeWidth={0.7}
                      />

                      {/* Top Plane Face */}
                      <polygon
                        points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                        fill={fillColor}
                        stroke={isActive ? 'rgba(255,255,255,0.4)' : strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                      />

                      {/* Left-to-Right Slanted Text along the Front-Right Perspective Edge (Matching 2nd Reference Image) */}
                      <g
                        transform={`translate(350, ${y + 128}) rotate(-22.5)`}
                        className="pointer-events-none select-none transition-all duration-300"
                      >
                        <text
                          x={0}
                          y={0}
                          textAnchor="middle"
                          className="font-bold tracking-tight select-none"
                          style={{
                            fontSize: '15px',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fill: isActive ? '#FFFFFF' : '#111111',
                            fontWeight: isActive ? 800 : 700,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {layer.title}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* RIGHT: Interactive Accordion / Five Layers */}
          <div className="lg:col-span-6 space-y-3">
            {FIVE_LAYERS.map((layer, index) => {
              const isActive = activeLayerId === layer.id;

              return (
                <div
                  key={layer.id}
                  className={`rounded-xl transition-all duration-300 border ${
                    isActive
                      ? 'border-[#E5E7EB] shadow-xs bg-white'
                      : 'border-transparent hover:border-[#E5E7EB] hover:bg-[#F7F8FA]/60'
                  }`}
                >
                  {/* Header Bar */}
                  <button
                    onClick={() => setActiveLayerId(isActive ? '' : layer.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Icon box (visible when active) */}
                      {isActive && (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                          style={{ background: layer.color }}
                        >
                          {layer.icon}
                        </div>
                      )}

                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                            isActive ? 'text-[#111111]' : 'text-[#4B5563] group-hover:text-[#111111]'
                          }`}
                        >
                          {layer.title}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon (+ / x) */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isActive
                          ? 'text-[#DC2626] rotate-45'
                          : 'text-[#9CA3AF] group-hover:text-[#111111]'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expanded Content Drawer matching reference */}
                  {isActive && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-0 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-4 font-normal">
                        {layer.description}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-2 pt-1 pb-3">
                        {layer.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-[#4B5563] bg-[#F7F8FA] border border-[#E5E7EB]"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#9CA3AF] uppercase">
                          LAYER 0{index + 1} OF 05
                        </span>
                        <button
                          onClick={() => onSelectAction?.(layer.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold transition-transform hover:translate-x-0.5 text-[#2563EB]"
                        >
                          Explore capabilities <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Divider line */}
                  <div className="mx-4 border-b border-[#F1F5F9]" />
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
