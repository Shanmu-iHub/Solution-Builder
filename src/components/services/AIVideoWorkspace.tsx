import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { ProductLandingLayout } from '../common/ProductLandingLayout';
import { getOfferingConfig } from '../../data/offeringsData';
import { Film, Sparkles, Play, Download, Clock, Camera, RefreshCw, ArrowLeft } from 'lucide-react';

export const AIVideoWorkspace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');
  const [prompt, setPrompt] = useState('Cinematic aerial drone flyover of an ultra-modern smart data center illuminated at night, 4K 60fps slow motion');
  const [duration, setDuration] = useState('5s');
  const [motion, setMotion] = useState('Smooth Orbit & Push In');
  const [isGenerating, setIsGenerating] = useState(false);

  const [videos, setVideos] = useState([
    {
      id: 'vid-1',
      title: 'Smart City Data Infrastructure',
      prompt: 'Cinematic aerial drone flyover of modern cloud campus at dusk',
      duration: '5s',
      status: 'Rendered (1080p)',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      timestamp: '25m ago'
    },
    {
      id: 'vid-2',
      title: 'Neural Network Topology Visualizer',
      prompt: '3D glowing fiber optic nodes pulsing with high-speed data packets',
      duration: '10s',
      status: 'Rendered (4K)',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      timestamp: '2h ago'
    }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setVideos(prev => [
        {
          id: `vid-${Date.now()}`,
          title: 'Custom Generation',
          prompt,
          duration,
          status: 'Rendered (1080p)',
          thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }, 1500);
  };

  const config = getOfferingConfig('ai-video');

  if (viewMode === 'landing' && config) {
    return <ProductLandingLayout config={config} onOpenConsole={() => setViewMode('console')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-2xs">
        <button
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Video Studio Overview</span>
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
            className="px-3 py-1 rounded-lg bg-white text-rose-600 shadow-2xs font-semibold cursor-pointer"
          >
            Live Console
          </button>
        </div>
      </div>

      <Breadcrumb items={[{ label: 'AI Services' }, { label: 'AI Video & Slides' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Generative AI Video Studio</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Runway Gen-3 & Kling
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Generate cinematic video clips, motion animations, and product showcases with precise camera path control.
            </p>
          </div>
        </div>
      </div>

      {/* Prompt Form */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Video Generation Prompt</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="w-full p-3.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Duration</label>
            <div className="grid grid-cols-2 gap-2">
              {['5s', '10s'].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`py-1.5 rounded-lg border font-semibold text-xs ${
                    duration === d ? 'bg-slate-900 text-white' : 'bg-white border-[#E2E8F0] text-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Camera Path Motion</label>
            <select
              value={motion}
              onChange={e => setMotion(e.target.value)}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white"
            >
              <option>Smooth Orbit & Push In</option>
              <option>Dynamic Crane Down</option>
              <option>Linear Horizontal Pan</option>
              <option>Static High-Angle</option>
            </select>
          </div>

          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Output Resolution</label>
            <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
              <option>1080p Full HD (60fps)</option>
              <option>4K Ultra HD (30fps)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Rendering AI Video Frames...' : 'Generate Video'}</span>
          </button>
        </div>
      </div>

      {/* Video Outputs */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Generated Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-subtle group">
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-80" />
                <button 
                  onClick={() => alert(`Playing generated stream: ${vid.title}`)}
                  className="absolute w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  {vid.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-xs text-[#0F172A]">{vid.title}</h4>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {vid.status}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] line-clamp-2">{vid.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
