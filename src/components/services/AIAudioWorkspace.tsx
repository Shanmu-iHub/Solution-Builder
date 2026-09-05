import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { Mic, Sparkles, Play, Volume2, Download, FileText, Upload, RefreshCw, Check } from 'lucide-react';

export const AIAudioWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tts' | 'stt'>('tts');

  // TTS state
  const [ttsText, setTtsText] = useState('Welcome to SNS Square. Your unified business technology and AI operations workspace is now online and ready for production.');
  const [voice, setVoice] = useState('Rachel (Warm Enterprise)');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedAudio, setSynthesizedAudio] = useState(true);

  // STT state
  const [sttFile, setSttFile] = useState<string | null>('quarterly_earnings_call_2026.mp3');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState(
    "[00:00:02 - Sanmugavel S]: Welcome everyone to the Q3 architecture review. Today we are walking through our new distributed event-driven topology.\n[00:00:15 - Elena Rostova]: Thanks Sanmugavel. The compliance posture is at 96.2% and all SOC 2 Type II evidence is passing.\n[00:00:28 - Sanmugavel S]: Excellent. Let's proceed with deploying the Blue/Green switchover."
  );

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSynthesizedAudio(true);
    }, 900);
  };

  const handleTranscribe = () => {
    setIsTranscribing(true);
    setTimeout(() => {
      setIsTranscribing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Services' }, { label: 'AI Audio & Speech' }]} />

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-[#0F172A]">Neural Audio & Voice Intelligence</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                ElevenLabs & Whisper v3
              </span>
            </div>
            <p className="text-xs text-[#64748B] max-w-xl">
              Lifelike neural text-to-speech synthesis with 29 languages and high-accuracy automated audio transcription with speaker diarization.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab('tts')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'tts' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Text-to-Speech (TTS)</span>
        </button>
        <button
          onClick={() => setActiveTab('stt')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'stt' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Speech-to-Text Transcription (STT)</span>
        </button>
      </div>

      {/* TTS View */}
      {activeTab === 'tts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Text to Synthesize</label>
              <textarea
                rows={5}
                value={ttsText}
                onChange={e => setTtsText(e.target.value)}
                className="w-full p-3.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSynthesize}
                disabled={isSynthesizing}
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
              >
                <Sparkles className={`w-4 h-4 ${isSynthesizing ? 'animate-spin' : ''}`} />
                <span>{isSynthesizing ? 'Synthesizing Neural Audio...' : 'Generate Voice Audio'}</span>
              </button>
            </div>

            {synthesizedAudio && (
              <div className="mt-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert('Playing synthesized audio waveform.')}
                    className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">Synthesized Audio Output</h4>
                    <span className="text-[11px] text-[#64748B]">{voice} • 44.1kHz Lossless MP3</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloaded speech audio file.')}
                  className="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#0F172A] rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP3</span>
                </button>
              </div>
            )}
          </div>

          {/* Voice selector */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle space-y-4 text-xs">
            <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs">Voice Configuration</h4>
            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Select Neural Voice</label>
              <select
                value={voice}
                onChange={e => setVoice(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white font-medium text-[#0F172A]"
              >
                <option>Rachel (Warm Enterprise)</option>
                <option>Adam (Authoritative Executive)</option>
                <option>Marcus (Deep Narrative)</option>
                <option>Elena (Professional Clear)</option>
                <option>Nova (Energetic Modern)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Speaking Stability & Emotion</label>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.75" className="w-full accent-amber-500" />
            </div>

            <div>
              <label className="block text-[#64748B] font-semibold mb-1">Speed Pace (1.0x)</label>
              <input type="range" min="0.7" max="1.5" step="0.1" defaultValue="1.0" className="w-full accent-amber-500" />
            </div>
          </div>
        </div>
      )}

      {/* STT View */}
      {activeTab === 'stt' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <div>
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Audio Transcription Lab</h3>
              <span className="text-[11px] text-[#64748B]">Powered by OpenAI Whisper v3 Large with multi-speaker diarization</span>
            </div>
            <button
              onClick={handleTranscribe}
              disabled={isTranscribing}
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTranscribing ? 'animate-spin' : ''}`} />
              <span>{isTranscribing ? 'Transcribing...' : 'Re-run Transcription'}</span>
            </button>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-mono text-xs text-[#0F172A] whitespace-pre-wrap leading-relaxed">
            {transcript}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(transcript);
                alert('Copied transcript with timestamps to clipboard.');
              }}
              className="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-slate-50 text-[#0F172A] rounded-lg text-xs font-semibold"
            >
              Copy Text
            </button>
            <button
              onClick={() => alert('Downloaded subtitle track (.SRT).')}
              className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export SRT Subtitles</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
