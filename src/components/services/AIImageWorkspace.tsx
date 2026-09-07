import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';
import { 
  Image, 
  Sparkles, 
  Download, 
  Sliders, 
  Maximize2, 
  RefreshCw, 
  Check, 
  Layers, 
  Eye,
  ArrowLeft
} from 'lucide-react';

interface GeneratedImage {
  id: string;
  prompt: string;
  aspect: string;
  style: string;
  imageUrl: string;
  timestamp: string;
}

export const AIImageWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [prompt, setPrompt] = useState('Futuristic high-tech enterprise cloud server rack with glowing neon cyan circuits and holographic data matrices, hyper-detailed 8k, cinematic lighting');
  const [aspect, setAspect] = useState('16:9');
  const [style, setStyle] = useState('Photorealistic 8K');
  const [isGenerating, setIsGenerating] = useState(false);

  const [gallery, setGallery] = useState<GeneratedImage[]>([
    {
      id: 'img-1',
      prompt: 'Futuristic enterprise cloud server rack with glowing neon cyan circuits and holographic matrices',
      aspect: '16:9',
      style: 'Photorealistic 8K',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      timestamp: '10m ago'
    },
    {
      id: 'img-2',
      prompt: 'Isometric 3D glass cube architecture representation with floating AI neural nodes',
      aspect: '1:1',
      style: '3D Isometric',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      timestamp: '1h ago'
    },
    {
      id: 'img-3',
      prompt: 'Clean modern enterprise boardroom with autonomous AI holographic assistant',
      aspect: '16:9',
      style: 'Cinematic Lighting',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      timestamp: '3h ago'
    }
  ]);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGallery(prev => [
        {
          id: `img-${Date.now()}`,
          prompt,
          aspect,
          style,
          imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }, 1200);
  };

  const config = getOfferingConfig('ai-image');

  if (viewMode === 'landing' && config) {
    return <ProductLandingLayout config={config} onOpenConsole={() => setViewMode('console')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-pink-600 hover:text-pink-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Image Studio Overview</span>
        </button>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('landing')}
            className="px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 transition-all font-medium cursor-pointer"
          >
            Service Overview
          </button>
          <button
            onClick={() => setViewMode('console')}
            className="px-3 py-1 rounded-lg bg-white text-pink-600 shadow-2xs font-semibold cursor-pointer"
          >
            Live Console
          </button>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'AI Services' }, { label: 'AI Image Studio' }]} />

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Image className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Generative AI Image Studio</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Flux 1.1 Pro Ultra
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Create and synthesize ultra-high-resolution marketing graphics, UI mockups, 3D architectural renders, and enterprise concept art.
            </p>
          </div>
        </div>
      </div>

      {/* Generator Controls */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Image Generation Prompt</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="w-full p-3.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {['1:1', '16:9', '9:16'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAspect(r)}
                  className={`py-1.5 rounded-lg border font-semibold text-xs transition-all ${
                    aspect === r 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white border-[#E2E8F0] text-slate-700 hover:bg-[#F8FAFC]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Rendering Style</label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white font-medium text-[#0F172A]"
            >
              <option>Photorealistic 8K</option>
              <option>3D Isometric Render</option>
              <option>Minimalist Vector Art</option>
              <option>Cinematic Lighting</option>
              <option>Cyberpunk Concept</option>
            </select>
          </div>

          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Engine Quality</label>
            <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white font-medium text-[#0F172A]">
              <option>Flux 1.1 Pro (Ultra-HD)</option>
              <option>Midjourney v6.1 Turbo</option>
              <option>DALL-E 3 HD</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing Ultra-HD Image...' : 'Generate Image'}</span>
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Generation History & Asset Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-subtle group hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.prompt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => window.open(item.imageUrl, '_blank')}
                    className="p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-xs hover:bg-black/80"
                    title="View Full Resolution"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => alert('Downloaded full 4K asset.')}
                    className="p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-xs hover:bg-black/80"
                    title="Download Asset"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-1.5 text-[10px] text-[#64748B]">
                  <span className="font-bold uppercase tracking-wider">{item.style}</span>
                  <span className="font-mono">{item.timestamp}</span>
                </div>
                <p className="text-xs text-[#0F172A] line-clamp-2 leading-relaxed">
                  {item.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
