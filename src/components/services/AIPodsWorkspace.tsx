import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { Radio, Sparkles, Play, Pause, Download, Users, Mic, Volume2 } from 'lucide-react';

export const AIPodsWorkspace: React.FC = () => {
  const [topic, setTopic] = useState('How Multi-Agent AI systems are automating software testing and cloud FinOps in 2026');
  const [host1, setHost1] = useState('Alex (Lead Tech Strategist)');
  const [host2, setHost2] = useState('Sarah (Principal Cloud Architect)');
  const [duration, setDuration] = useState('5 Minutes (Executive Brief)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [dialogue, setDialogue] = useState([
    { speaker: 'Alex', text: 'Welcome back to the SNS Tech Deep Dive! Today Sarah and I are unpacking how autonomous multi-agent swarms are revolutionizing software delivery.' },
    { speaker: 'Sarah', text: 'Thanks Alex! What used to take engineering teams weeks of manual testing is now orchestrated by autonomous agents validating API contracts in under two minutes.' },
    { speaker: 'Alex', text: 'And the unit economics are stunning. When you combine proactive FinOps agents with semantic caching, companies are slashing token costs by over 40%.' },
    { speaker: 'Sarah', text: 'Exactly. It turns observability from reactive firefighting into predictive self-healing infrastructure.' }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Services' }, { label: 'AI Pods Studio' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">AI Pods: Dual-Host Podcast Studio</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                NotebookLM & Dual-Voice AI
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Turn documentation, technical whitepapers, and meeting transcripts into dynamic, natural two-host conversational audio podcasts.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Podcast Topic or Source Text</label>
            <textarea
              rows={3}
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full p-3.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Host 1 (Primary Voice)</label>
              <select
                value={host1}
                onChange={e => setHost1(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white"
              >
                <option>Alex (Lead Tech Strategist)</option>
                <option>Michael (Analytical Executive)</option>
                <option>Jordan (Energetic Commentator)</option>
              </select>
            </div>
            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Host 2 (Co-Host Voice)</label>
              <select
                value={host2}
                onChange={e => setHost2(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white"
              >
                <option>Sarah (Principal Cloud Architect)</option>
                <option>Elena (Security Specialist)</option>
                <option>Chloe (Investigative Journalist)</option>
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
              <span>{isGenerating ? 'Synthesizing Dual-Voice Podcast...' : 'Generate Episode'}</span>
            </button>
          </div>
        </div>

        {/* Audio Player Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md">
              <Radio className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#0F172A]">Episode: Autonomous Swarms</h4>
            <p className="text-xs text-[#64748B] mt-1">Dual-Host AI Deep Dive (4m 42s)</p>
          </div>

          <div className="my-4 pt-4 border-t border-[#F1F5F9] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span>01:24</span>
              <span>04:42</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '32%' }} />
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => alert('Downloaded full podcast episode in 320kbps MP3 format.')}
            className="w-full py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100 rounded-xl text-xs font-semibold text-[#0F172A] flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Episode MP3</span>
          </button>
        </div>
      </div>

      {/* Script Transcript */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-3">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Dual-Host Script Transcription</h4>
        <div className="space-y-3 text-xs">
          {dialogue.map((line, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className={`font-bold block mb-1 ${line.speaker === 'Alex' ? 'text-blue-600' : 'text-indigo-600'}`}>
                {line.speaker}:
              </span>
              <p className="text-[#0F172A] leading-relaxed">{line.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
