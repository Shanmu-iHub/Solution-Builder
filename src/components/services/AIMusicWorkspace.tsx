import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { Music, Sparkles, Play, Pause, Download, Volume2, Disc, Repeat } from 'lucide-react';

export const AIMusicWorkspace: React.FC = () => {
  const [prompt, setPrompt] = useState('Inspiring electronic tech anthem with punchy bass, melodic synthesizers, and modern ambient pads, 124 BPM');
  const [genre, setGenre] = useState('Electronic / Synthwave');
  const [mood, setMood] = useState('Inspiring & Uplifting');
  const [isComposing, setIsComposing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [tracks, setTracks] = useState([
    {
      id: 'trk-1',
      title: 'SNS Pulse: Synthetic Horizon',
      genre: 'Electronic / Synthwave',
      mood: 'Inspiring',
      duration: '2:40',
      bpm: 124,
      timestamp: '15m ago'
    },
    {
      id: 'trk-2',
      title: 'Neural Drift: Ambient Focus',
      genre: 'Ambient Lo-Fi',
      mood: 'Deep Concentration',
      duration: '3:15',
      bpm: 85,
      timestamp: '2h ago'
    }
  ]);

  const handleGenerate = () => {
    setIsComposing(true);
    setTimeout(() => {
      setIsComposing(false);
      setTracks(prev => [
        {
          id: `trk-${Date.now()}`,
          title: 'Quantum Velocity (SNS Mix)',
          genre,
          mood,
          duration: '2:15',
          bpm: 120,
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Services' }, { label: 'AI Music Studio' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Generative AI Music Composer</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Suno v4 & Udio Pro
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Create original royalty-free soundtracks, podcast intros, background ambiance, and commercial audio experiences with AI.
            </p>
          </div>
        </div>
      </div>

      {/* Music Composition Controls */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Music Prompt & Style Description</label>
          <textarea
            rows={2}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="w-full p-3.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Genre</label>
            <select
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white"
            >
              <option>Electronic / Synthwave</option>
              <option>Cinematic Orchestral</option>
              <option>Ambient Lo-Fi Chill</option>
              <option>Modern Corporate Tech</option>
              <option>Energetic Rock & Pop</option>
            </select>
          </div>

          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Mood & Energy</label>
            <select
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white"
            >
              <option>Inspiring & Uplifting</option>
              <option>Deep Concentration / Focus</option>
              <option>Dramatic & Heroic</option>
              <option>Calm & Serene</option>
            </select>
          </div>

          <div>
            <label className="block text-[#64748B] font-semibold mb-1">Vocal Format</label>
            <select className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white">
              <option>Pure Instrumental (No Vocals)</option>
              <option>Vocal Hooks & Melodic Choirs</option>
              <option>Full Song with Lyrics</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isComposing}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${isComposing ? 'animate-spin' : ''}`} />
            <span>{isComposing ? 'Composing Track Stems...' : 'Compose Track'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Audio Player & Tracks */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Generated Audio Tracks & Waveforms</h3>

        <div className="space-y-3">
          {tracks.map((trk) => (
            <div
              key={trk.id}
              className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#CBD5E1] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm hover:bg-[#1D4ED8] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">{trk.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                    <span>{trk.genre}</span>
                    <span>•</span>
                    <span>{trk.bpm} BPM</span>
                    <span>•</span>
                    <span>{trk.duration}</span>
                  </div>
                </div>
              </div>

              {/* Fake animated audio waveform bars */}
              <div className="flex items-center gap-1 h-8 max-w-xs flex-1">
                {[15, 30, 60, 40, 80, 50, 90, 70, 45, 65, 85, 30, 95, 40, 60, 35, 75, 45, 90, 60, 30].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-rose-400/80 rounded-full transition-all"
                    style={{ height: `${isPlaying ? (h * (i % 2 === 0 ? 0.8 : 1.2)) % 100 : h}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloaded lossless WAV: ${trk.title}`)}
                  className="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#0F172A] rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>WAV</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
