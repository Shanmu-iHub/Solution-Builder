import React from 'react';
import {
  Video,
  Music,
  Mic,
  Cpu,
  Box,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  Cloud,
  Store,
  Compass,
  Monitor,
  Code,
  Sliders,
  Headphones,
  Activity,
  DollarSign,
  FileText,
  Clock,
  ShieldCheck,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';

export const moreServicesOfferingsConfigs: Record<string, OfferingLandingConfig> = {
  'ai-video': {
    id: 'ai-video',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Video & Slides',
    badgeIcon: <Video className="w-3.5 h-3.5 text-rose-600" />,
    heroIcon: <Video className="w-6 h-6" />,
    heroIconBg: 'bg-rose-50/90',
    heroIconColor: 'text-rose-700',
    heroIconBorder: 'border-rose-100/80',
    headline1: 'Automated video synthesis.',
    headline2: 'Presentation decks in seconds.',
    subtitle: 'Transform raw prompt scripts and documents into high-definition AI videos, realistic avatar narrations, and stunning executive slide decks.',
    openButtonText: 'Open Video Studio',
    heroIllustration: {
      cardTitle: 'Video & Storyboard Timeline',
      cardSub: '4K Generative Renderer',
      cardBadge: '4K 60FPS Output',
      annotationText: 'Lip-Sync Avatars\nAutomated Decks',
      checklist: ['Photorealistic Lip-Sync Avatars', 'Document-to-Slide Generation', 'Multi-Language Dubbing'],
      bars: [
        { height: '40%', bg: 'bg-rose-300' },
        { height: '60%', bg: 'bg-rose-400' },
        { height: '80%', bg: 'bg-rose-500' },
        { height: '95%', bg: 'bg-rose-600' },
        { height: '70%', bg: 'bg-rose-400' },
        { height: '100%', bg: 'bg-[#E11D48]' }
      ],
      curveColor: '#E11D48'
    },
    metrics: [
      { label: 'Video Rendering Speed', value: '4x Real-Time', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-600', iconBorder: 'border-rose-100' },
      { label: 'Supported Output Languages', value: '54 Languages', icon: <Globe className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Photorealistic Avatars', value: '120+ Cast', icon: <Sparkles className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Slide Deck Creation Time', value: '< 15 Secs', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    capabilitiesHeadline: 'Comprehensive video and presentation generation platform',
    capabilities: [
      {
        id: 'avatar-synthesis',
        number: '01',
        title: 'Photorealistic AI Avatars & Lip-Sync',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Generate studio-grade presenter videos with expressive facial animations and accurate phoneme lip-syncing.',
        features: ['Natural micro-expressions and eye contact', 'Custom corporate avatar cloning', 'Multi-speaker conversational dialogue', 'Green-screen & 3D background staging'],
        preview: {
          title: 'Avatar Lip-Sync Engine',
          bars: [{ label: 'Lip', val1: 100, val2: 98 }, { label: 'Face', val1: 98, val2: 95 }, { label: 'Tone', val1: 99, val2: 96 }, { label: 'Sync', val1: 100, val2: 100 }, { label: '4K', val1: 96, val2: 92 }],
          providers: [{ name: 'Lip-Sync Accuracy', amount: '100% Exact', color: 'bg-emerald-500' }, { name: 'Active Avatars', amount: '120 Presenters', color: 'bg-rose-600' }, { name: 'Resolution', amount: '4K 60FPS', color: 'bg-blue-600' }, { name: 'Render Latency', amount: 'Near Realtime', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'doc-to-slides',
        number: '02',
        title: 'Document-to-Slide Generator',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Convert PDFs, strategy memos, and financial reports into beautifully formatted PowerPoint and Pitch decks.',
        features: ['Automated slide structure and hierarchy', 'Custom corporate font & brand palette enforcement', 'Smart charts and infographic generation', 'Exportable to PPTX, PDF, and Keynote'],
        preview: {
          title: 'Slide Deck Compiler',
          bars: [{ label: 'Parse', val1: 98, val2: 95 }, { label: 'Layout', val1: 99, val2: 96 }, { label: 'Charts', val1: 96, val2: 92 }, { label: 'Brand', val1: 100, val2: 100 }, { label: 'PPTX', val1: 100, val2: 98 }],
          providers: [{ name: 'Deck Build Speed', amount: '12 secs / 20 slides', color: 'bg-emerald-500' }, { name: 'Brand Adherence', amount: '100% Verified', color: 'bg-rose-600' }, { name: 'Infographics', amount: 'Automated', color: 'bg-blue-600' }, { name: 'Export Format', amount: 'PPTX & PDF', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'voice-dubbing',
        number: '03',
        title: 'Multi-Lingual Voice Dubbing',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Automatically translate and dub video audio into 50+ languages while matching the original speaker voice timbre.',
        features: ['Voice tone & emotion preservation', 'Automatic time-stretch audio alignment', 'Translated on-screen captions & subtitles', 'Clean background music stem separation'],
        preview: {
          title: 'Dubbing Pipeline',
          bars: [{ label: 'Trans', val1: 99, val2: 96 }, { label: 'Voice', val1: 98, val2: 95 }, { label: 'Time', val1: 100, val2: 98 }, { label: 'Sub', val1: 100, val2: 100 }, { label: 'Stem', val1: 98, val2: 94 }],
          providers: [{ name: 'Supported Languages', amount: '54 Languages', color: 'bg-rose-600' }, { name: 'Voice Timbre Match', amount: '99.2%', color: 'bg-emerald-500' }, { name: 'Lip Realignment', amount: 'Automated', color: 'bg-blue-600' }, { name: 'Subtitle Formats', amount: 'SRT / VTT', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'timeline-editor',
        number: '04',
        title: 'Browser Timeline Video Editor',
        icon: <Video className="w-4 h-4" />,
        tagline: 'Multi-track non-linear browser editor with AI B-roll suggestions, transitions, and audio mastering.',
        features: ['Automated B-roll semantic match', 'Smart auto-cut & filler word removal', 'Dynamic animated captions & lower-thirds', 'Cloud rendering queue'],
        preview: {
          title: 'Timeline Editor Board',
          bars: [{ label: 'Track 1', val1: 95, val2: 90 }, { label: 'Track 2', val1: 98, val2: 95 }, { label: 'B-Roll', val1: 96, val2: 92 }, { label: 'Audio', val1: 100, val2: 98 }, { label: 'Render', val1: 98, val2: 95 }],
          providers: [{ name: 'Auto-Cuts Accuracy', amount: '99.8%', color: 'bg-emerald-500' }, { name: 'B-Roll Library', amount: '4M+ HD Clips', color: 'bg-rose-600' }, { name: 'Cloud Render', amount: '4K GPU Queue', color: 'bg-blue-600' }, { name: 'Filler Word Purge', amount: '1-Click Clean', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'screen-recording',
        number: '05',
        title: 'AI Demo & Product Walkthroughs',
        icon: <Monitor className="w-4 h-4" />,
        tagline: 'Record a quick product clickthrough and let AI add smooth zooms, cursor smoothing, and presenter narration.',
        features: ['Automated camera follow & smooth zoom', 'Cursor trajectory stabilization', 'Generated voiceover from action steps', 'Interactive chapter bookmarks'],
        preview: {
          title: 'Product Walkthrough AI',
          bars: [{ label: 'Zoom', val1: 98, val2: 95 }, { label: 'Cursor', val1: 100, val2: 98 }, { label: 'Voice', val1: 99, val2: 96 }, { label: 'Chapters', val1: 100, val2: 100 }, { label: 'Export', val1: 98, val2: 95 }],
          providers: [{ name: 'Demo Production Time', amount: '3 Mins Total', color: 'bg-emerald-500' }, { name: 'Smooth Zoom', amount: 'AI Assisted', color: 'bg-rose-600' }, { name: 'Voiceover Sync', amount: 'Perfect Match', color: 'bg-blue-600' }, { name: 'Interactive Embed', amount: 'HTML5 Player', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'social-repurpose',
        number: '06',
        title: 'Viral Short & Clip Repurposing',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Convert 1-hour webinars and podcasts into 10 viral vertical clips (9:16) with hook scores and subtitles.',
        features: ['AI virality & hook score detector', 'Dynamic speaker auto-reframe for 9:16', 'Word-by-word animated karaoke subtitles', 'Batch multi-platform scheduling'],
        preview: {
          title: 'Clip Repurposing Feed',
          bars: [{ label: 'Detect', val1: 95, val2: 90 }, { label: 'Crop', val1: 98, val2: 95 }, { label: 'Captions', val1: 100, val2: 98 }, { label: 'Score', val1: 96, val2: 92 }, { label: 'Clips', val1: 100, val2: 98 }],
          providers: [{ name: 'Viral Clips / Hour', amount: '8 - 12 Shorts', color: 'bg-rose-600' }, { name: 'Auto-Reframe 9:16', amount: 'Active Speaker', color: 'bg-emerald-500' }, { name: 'Karaoke Captions', amount: '32 Styles', color: 'bg-blue-600' }, { name: 'Engagement Lift', amount: '+240% Reach', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'brand-templates',
        number: '07',
        title: 'Brand-Locked Video Templates',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Enforce company intro/outro animations, logo watermarks, and brand colors across marketing teams.',
        features: ['Locked brand design assets', 'Role-based creation permissions', 'Custom font uploading', 'Brand approval publishing workflow'],
        preview: {
          title: 'Brand Kit Guard',
          bars: [{ label: 'Intro', val1: 100, val2: 100 }, { label: 'Logo', val1: 100, val2: 100 }, { label: 'Colors', val1: 100, val2: 100 }, { label: 'Fonts', val1: 100, val2: 98 }, { label: 'Approve', val1: 98, val2: 95 }],
          providers: [{ name: 'Brand Compliance', amount: '100% Locked', color: 'bg-emerald-500' }, { name: 'Team Workspaces', amount: 'Multi-Tenant', color: 'bg-rose-600' }, { name: 'Approval Gates', amount: 'Active', color: 'bg-blue-600' }, { name: 'Asset Library', amount: 'Central Cloud', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'cloud-video-api',
        number: '08',
        title: 'Programmatic Cloud Video API',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Generate thousands of personalized video messages for sales outreach and user onboarding via REST API.',
        features: ['Dynamic variable injection (Name, Company, Metrics)', 'Async webhook notifications', 'Scalable GPU rendering farm', 'Python & TypeScript SDKs'],
        preview: {
          title: 'Programmatic Video Farm',
          bars: [{ label: 'REST', val1: 98, val2: 95 }, { label: 'GPU', val1: 95, val2: 90 }, { label: 'Scale', val1: 100, val2: 98 }, { label: 'Webhook', val1: 99, val2: 96 }, { label: 'SLA', val1: 100, val2: 100 }],
          providers: [{ name: 'Render Capacity', amount: '10,000 Vids/hr', color: 'bg-rose-600' }, { name: 'API Latency', amount: '< 3s Start', color: 'bg-emerald-500' }, { name: 'Personalized Outreach', amount: '3.8x Reply Rate', color: 'bg-blue-600' }, { name: 'Uptime SLA', amount: '99.99%', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Scale visual storytelling and presentation velocity',
    useCases: [
      { id: 'v-uc1', title: 'Executive Slide Decks', desc: 'Create investor pitches and strategy decks in under 30 seconds.', icon: <Layers className="w-5 h-5" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-600', iconBorder: 'border-rose-100' },
      { id: 'v-uc2', title: 'Product Walkthrough Demos', desc: 'Produce polished software tour videos with smooth zooms and narration.', icon: <Monitor className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'v-uc3', title: 'Multi-Lingual Global Dubbing', desc: 'Localize training and marketing videos into 54 languages seamlessly.', icon: <Globe className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'v-uc4', title: 'Personalized Sales Outreach', desc: 'Generate custom personalized avatar videos for high-value deal outreach.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    integrationsHeadline: 'Connects to your content platforms and cloud storage',
    integrations: [
      { name: 'Google Slides', logoKey: 'gcp' },
      { name: 'Microsoft PowerPoint', logoKey: 'azure' },
      { name: 'AWS Cloudfront', logoKey: 'aws' },
      { name: 'YouTube API', logoKey: 'google' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'OpenAI Whisper', logoKey: 'openai' },
      { name: 'GitHub Sync', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to generate professional videos & slides?',
    ctaSubtitle: 'Transform your first script or document into a 4K AI video in under 60 seconds.',
    relatedHeadline: 'Explore related AI creative services',
    relatedOfferings: [
      { id: 'ai-image', type: 'service', name: 'AI Image Studio', desc: '8K generative graphics.', icon: <ImageIcon className="w-4 h-4" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-700', iconBorder: 'border-pink-100' },
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Studio voice cloning.', icon: <Mic className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'ai-chat', type: 'service', name: 'AI Chat Assistant', desc: 'Conversational reasoning.', icon: <MessageSquare className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'ai-music', type: 'service', name: 'AI Music Studio', desc: 'Generative soundtracks.', icon: <Music className="w-4 h-4" />, iconBg: 'bg-violet-50', iconColor: 'text-violet-700', iconBorder: 'border-violet-100' },
      { id: 'ai-pods', type: 'service', name: 'AI Compute Pods', desc: 'Serverless GPU clusters.', icon: <Cpu className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' }
    ],
    videoModal: {
      title: 'AI Video & Slides Walkthrough',
      subtitle: 'Generative 4K Video, Avatars & Slide Decks',
      heroCardTitle: 'Watch Video Synthesis in Action',
      heroCardDesc: 'See how SNS Square AI Video converts raw text into PowerPoint decks, produces lip-synced AI presenters, and translates videos into 54 languages.',
      highlights: [{ label: '4K 60FPS', sub: 'Cinema fidelity' }, { label: '54 Languages', sub: 'Instant dubbing' }, { label: '15 Seconds', sub: 'Deck generation' }]
    }
  },

  'ai-music': {
    id: 'ai-music',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Music Studio',
    badgeIcon: <Music className="w-3.5 h-3.5 text-violet-600" />,
    heroIcon: <Music className="w-6 h-6" />,
    heroIconBg: 'bg-violet-50/90',
    heroIconColor: 'text-violet-700',
    heroIconBorder: 'border-violet-100/80',
    headline1: 'Generative audio studio.',
    headline2: 'Royalty-free dynamic music.',
    subtitle: 'Generate bespoke instrumental tracks, adaptive gaming scores, podcast themes, and commercial background music in any genre with full master rights.',
    openButtonText: 'Open Music Studio',
    heroIllustration: {
      cardTitle: 'Harmonic Audio Synthesizer',
      cardSub: 'Stem Separator & Mastering',
      cardBadge: '100% Royalty-Free',
      annotationText: 'Stem Separation\nStudio Mastering',
      checklist: ['Commercial Royalty-Free Stems', 'Adaptive Game Audio Loops', 'AI Lyric & Vocal Synthesis'],
      bars: [
        { height: '45%', bg: 'bg-violet-300' },
        { height: '65%', bg: 'bg-violet-400' },
        { height: '85%', bg: 'bg-violet-500' },
        { height: '95%', bg: 'bg-violet-600' },
        { height: '70%', bg: 'bg-violet-400' },
        { height: '100%', bg: 'bg-[#7C3AED]' }
      ],
      curveColor: '#7C3AED'
    },
    metrics: [
      { label: 'Generation Speed', value: '< 4.5s', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', iconBorder: 'border-violet-100' },
      { label: 'Music Genres & Moods', value: '250+ Styles', icon: <Sparkles className="w-6 h-6" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' },
      { label: 'Audio Quality Output', value: '48kHz 24-Bit', icon: <Headphones className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Commercial License', value: '100% Cleared', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    capabilitiesHeadline: 'Full-stack AI music generation from simple prompt to multi-track stems',
    capabilities: [
      {
        id: 'genre-composer',
        number: '01',
        title: 'Multi-Genre Composition Engine',
        icon: <Music className="w-4 h-4" />,
        tagline: 'Generate high-fidelity tracks across Cinematic Orchestral, Lo-Fi, Synthwave, Hip-Hop, Rock, and Ambient.',
        features: ['BPM tempo and key signature locking', 'Structure control (Intro, Verse, Chorus, Outro)', 'Mood and emotional timbre guidance', 'Seamless loop point detection for games'],
        preview: {
          title: 'Composition Matrix',
          bars: [{ label: 'Cinematic', val1: 95, val2: 90 }, { label: 'Lo-Fi', val1: 98, val2: 95 }, { label: 'EDM', val1: 92, val2: 88 }, { label: 'Ambient', val1: 100, val2: 98 }, { label: 'Rock', val1: 94, val2: 90 }],
          providers: [{ name: 'Audio Fidelity', amount: '48kHz Lossless', color: 'bg-violet-600' }, { name: 'Active Genres', amount: '250+ Styles', color: 'bg-emerald-500' }, { name: 'Seamless Looping', amount: 'Zero Click', color: 'bg-blue-600' }, { name: 'Mastering Chain', amount: 'Integrated', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'stem-separation',
        number: '02',
        title: 'Multi-Track Stem Isolation',
        icon: <Layers className="w-4 h-4" />,
        tagline: 'Separate any generated track into clean individual stems: Drums, Bass, Vocals, Synths, and Melody.',
        features: ['WAV stem export for Ableton & Logic', 'Individual track volume and mute controls', 'Stem-by-stem re-generation', 'MIDI track conversion output'],
        preview: {
          title: 'Stem Isolator Output',
          bars: [{ label: 'Drums', val1: 100, val2: 98 }, { label: 'Bass', val1: 98, val2: 95 }, { label: 'Vocals', val1: 99, val2: 96 }, { label: 'Synths', val1: 96, val2: 92 }, { label: 'FX', val1: 100, val2: 98 }],
          providers: [{ name: 'Stem Separation', amount: '5 Stems', color: 'bg-emerald-500' }, { name: 'Bleed Level', amount: '< -48 dB', color: 'bg-violet-600' }, { name: 'MIDI Generation', amount: 'Included', color: 'bg-blue-600' }, { name: 'DAW Export', amount: 'Ableton / FL', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'adaptive-gaming',
        number: '03',
        title: 'Dynamic Adaptive Game Audio',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Create dynamic interactive music layers that transition smoothly during gameplay combat and exploration.',
        features: ['Intensity layer crossfading', 'Wwise and FMOD compatible export', 'Sub-millisecond loop transition markers', 'Dynamic procedural variation generator'],
        preview: {
          title: 'Interactive Game Audio',
          bars: [{ label: 'Explore', val1: 90, val2: 85 }, { label: 'Tension', val1: 95, val2: 90 }, { label: 'Combat', val1: 100, val2: 98 }, { label: 'Boss', val1: 98, val2: 95 }, { label: 'Victory', val1: 96, val2: 92 }],
          providers: [{ name: 'Transition Speed', amount: '< 10ms', color: 'bg-emerald-500' }, { name: 'Engine Support', amount: 'Unity / Unreal', color: 'bg-violet-600' }, { name: 'Dynamic Stems', amount: '4 Intensity Tiers', color: 'bg-blue-600' }, { name: 'CPU Usage', amount: '< 0.5%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'vocal-synthesis',
        number: '04',
        title: 'AI Vocal & Lyric Synthesis',
        icon: <Mic className="w-4 h-4" />,
        tagline: 'Write lyrics and hear natural singing vocals across pop, RnB, opera, and rock styles with natural vibrato.',
        features: ['Lyric phonetic syllable timing', 'Vocal pitch correction & auto-tune', 'Multi-singer harmony generation', 'Breath and emotional dynamic control'],
        preview: {
          title: 'Vocal Synthesizer',
          bars: [{ label: 'Pitch', val1: 98, val2: 95 }, { label: 'Lyrics', val1: 100, val2: 98 }, { label: 'Harmony', val1: 96, val2: 92 }, { label: 'Vibrato', val1: 99, val2: 96 }, { label: 'Tone', val1: 98, val2: 95 }],
          providers: [{ name: 'Vocal Realism', amount: '99.4%', color: 'bg-emerald-500' }, { name: 'Singing Styles', amount: '48 Profiles', color: 'bg-violet-600' }, { name: 'Language Support', amount: '24 Languages', color: 'bg-blue-600' }, { name: 'Harmony Stacks', amount: '4-Part Chords', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'commercial-rights',
        number: '05',
        title: '100% Commercial Copyright Safety',
        icon: <ShieldCheck className="w-4 h-4" />,
        tagline: 'Trained on 100% licensed datasets with complete copyright indemnity and YouTube Content ID clearance.',
        features: ['Full commercial master rights', 'YouTube monetization safe guarantee', 'Automated Content ID whitelist', 'Enterprise copyright indemnity insurance'],
        preview: {
          title: 'Copyright Shield',
          bars: [{ label: 'YT Safe', val1: 100, val2: 100 }, { label: 'Spotify', val1: 100, val2: 100 }, { label: 'Ad Sync', val1: 100, val2: 100 }, { label: 'Gaming', val1: 100, val2: 100 }, { label: 'Rights', val1: 100, val2: 100 }],
          providers: [{ name: 'Content ID Flags', amount: '0 Claims', color: 'bg-emerald-500' }, { name: 'Commercial Rights', amount: '100% Perpetual', color: 'bg-violet-600' }, { name: 'Indemnity Cover', amount: 'Enterprise Tier', color: 'bg-blue-600' }, { name: 'Dataset Provenance', amount: 'Ethically Licensed', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'mastering-suite',
        number: '06',
        title: 'Automated AI Mastering Suite',
        icon: <Sliders className="w-4 h-4" />,
        tagline: 'Professional loudness normalization (-14 LUFS for Spotify, -16 LUFS for Apple), multi-band compression, and EQ.',
        features: ['Streaming platform LUFS presets', 'Dynamic multi-band compression', 'Stereo imaging widening', 'Harmonic tube warmth saturation'],
        preview: {
          title: 'Mastering Chain Output',
          bars: [{ label: 'LUFS', val1: 100, val2: 100 }, { label: 'EQ', val1: 98, val2: 95 }, { label: 'Comp', val1: 99, val2: 96 }, { label: 'Width', val1: 96, val2: 92 }, { label: 'Clip', val1: 100, val2: 100 }],
          providers: [{ name: 'Loudness Target', amount: '-14 LUFS Match', color: 'bg-emerald-500' }, { name: 'Stereo Field', amount: 'Phase Coherent', color: 'bg-violet-600' }, { name: 'Frequency Range', amount: '20Hz - 22kHz', color: 'bg-blue-600' }, { name: 'Mastering Speed', amount: '< 1.5s', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'podcast-soundtracks',
        number: '07',
        title: 'Podcast & Content Intro Builder',
        icon: <Headphones className="w-4 h-4" />,
        tagline: 'Generate matching intro stagers, transition stingers, and ambient background music tailored for podcasts.',
        features: ['Auto-ducking under spoken voice', '3-second to 15-second stinger builder', 'Consistent show sonic branding', 'Instant export to Audacity & Descript'],
        preview: {
          title: 'Podcast Sonic Kit',
          bars: [{ label: 'Intro', val1: 100, val2: 98 }, { label: 'Stinger', val1: 98, val2: 95 }, { label: 'Bed', val1: 99, val2: 96 }, { label: 'Outro', val1: 100, val2: 98 }, { label: 'Duck', val1: 100, val2: 100 }],
          providers: [{ name: 'Auto-Ducking', amount: '-18dB Smooth', color: 'bg-emerald-500' }, { name: 'Show Brand Kit', amount: 'Complete Suite', color: 'bg-violet-600' }, { name: 'Export Formats', amount: 'WAV / MP3 / FLAC', color: 'bg-blue-600' }, { name: 'Podcast Listeners', amount: 'Higher Retain', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'music-api-engine',
        number: '08',
        title: 'Developer Music Generation API',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Embed dynamic background music generation directly into video editing apps, games, and creative platforms.',
        features: ['REST & WebSocket real-time audio streams', 'Parametric mood & energy level inputs', 'High-throughput GPU inference pool', 'SDKs for Unity, Node, and Python'],
        preview: {
          title: 'Music API Metrics',
          bars: [{ label: 'REST', val1: 98, val2: 95 }, { label: 'Stream', val1: 100, val2: 98 }, { label: 'Latency', val1: 96, val2: 92 }, { label: 'SLA', val1: 100, val2: 100 }, { label: 'Scale', val1: 98, val2: 95 }],
          providers: [{ name: 'Stream Buffer', amount: '< 200ms', color: 'bg-emerald-500' }, { name: 'API Availability', amount: '99.99%', color: 'bg-violet-600' }, { name: 'Throughput', amount: '500 Streams/min', color: 'bg-blue-600' }, { name: 'SDKs', amount: 'Unity / Unreal / TS', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Power high-impact audio for games, media, and marketing',
    useCases: [
      { id: 'm-uc1', title: 'Video & Ad Background Music', desc: 'Custom commercial tracks with zero Content ID copyright strikes.', icon: <Music className="w-5 h-5" />, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', iconBorder: 'border-violet-100' },
      { id: 'm-uc2', title: 'Adaptive Video Game Scoring', desc: 'Multi-layer interactive soundtracks that adapt to player combat.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'm-uc3', title: 'Podcast Sonic Branding', desc: 'Generate unique intros, transition stingers, and ambient music beds.', icon: <Headphones className="w-5 h-5" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-600', iconBorder: 'border-pink-100' },
      { id: 'm-uc4', title: 'Songwriting & Multi-Track Stems', desc: 'Export isolated WAV and MIDI stems directly into your DAW.', icon: <Layers className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' }
    ],
    integrationsHeadline: 'Connects to your audio editing suites and game engines',
    integrations: [
      { name: 'Ableton Live', logoKey: 'ableton' },
      { name: 'Unity Game Engine', logoKey: 'unity' },
      { name: 'Unreal Engine', logoKey: 'unreal' },
      { name: 'Apple Logic Pro', logoKey: 'apple' },
      { name: 'AWS S3', logoKey: 'aws' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'GitHub', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to generate bespoke commercial music?',
    ctaSubtitle: 'Describe your mood or genre and get a studio-mastered track with stems in seconds.',
    relatedHeadline: 'Explore related AI creative services',
    relatedOfferings: [
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Voice cloning & TTS.', icon: <Mic className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'ai-video', type: 'service', name: 'AI Video & Slides', desc: 'Automated video creation.', icon: <Video className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'ai-image', type: 'service', name: 'AI Image Studio', desc: 'Generative 8K graphics.', icon: <ImageIcon className="w-4 h-4" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-700', iconBorder: 'border-pink-100' },
      { id: 'ai-chat', type: 'service', name: 'AI Chat Assistant', desc: 'Conversational reasoning.', icon: <MessageSquare className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'ai-pods', type: 'service', name: 'AI Compute Pods', desc: 'Serverless GPU clusters.', icon: <Cpu className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' }
    ],
    videoModal: {
      title: 'AI Music Studio Walkthrough',
      subtitle: 'Generative Soundtracks & Multi-Track Stems',
      heroCardTitle: 'Watch Generative Music in Action',
      heroCardDesc: 'See how SNS Square AI Music generates multi-genre compositions, isolates instrument stems for DAWs, and guarantees 100% commercial clearance.',
      highlights: [{ label: '< 4.5s', sub: 'Generation speed' }, { label: '5 Stems', sub: 'WAV & MIDI export' }, { label: '100% Safe', sub: 'Commercial indemnity' }]
    }
  },

  'ai-audio': {
    id: 'ai-audio',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Audio & Speech',
    badgeIcon: <Mic className="w-3.5 h-3.5 text-emerald-600" />,
    heroIcon: <Mic className="w-6 h-6" />,
    heroIconBg: 'bg-emerald-50/90',
    heroIconColor: 'text-emerald-700',
    heroIconBorder: 'border-emerald-100/80',
    headline1: 'Hyper-realistic voice synthesis.',
    headline2: 'Zero-latency neural audio.',
    subtitle: 'Generate human-like text-to-speech, real-time voice cloning, automated background noise cancellation, and conversational full-duplex speech.',
    openButtonText: 'Open Audio Studio',
    heroIllustration: {
      cardTitle: 'Neural Voice Waveform',
      cardSub: 'Sub-150ms Streaming Audio',
      cardBadge: '99.8% Natural Voice',
      annotationText: 'Voice Cloning\nStudio Mastering',
      checklist: ['Instant 5-Second Voice Cloning', 'Sub-150ms Streaming Latency', 'AI Background Denoising'],
      bars: [
        { height: '40%', bg: 'bg-emerald-300' },
        { height: '65%', bg: 'bg-emerald-400' },
        { height: '85%', bg: 'bg-emerald-500' },
        { height: '95%', bg: 'bg-emerald-600' },
        { height: '70%', bg: 'bg-emerald-400' },
        { height: '100%', bg: 'bg-[#059669]' }
      ],
      curveColor: '#059669'
    },
    metrics: [
      { label: 'Streaming Latency', value: '< 140ms', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Human Parity MOS Score', value: '4.92 / 5.0', icon: <Sparkles className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Languages & Accents', value: '62 Global', icon: <Globe className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { label: 'Clone Sample Required', value: '5 Seconds', icon: <CheckCircle2 className="w-6 h-6" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    capabilitiesHeadline: 'Comprehensive voice AI stack from real-time telephony to audio mastering',
    capabilities: [
      {
        id: 'voice-cloning',
        number: '01',
        title: 'Instant Voice Cloning & Timbre Match',
        icon: <Mic className="w-4 h-4" />,
        tagline: 'Clone any speaker voice with just a 5-second audio sample while capturing distinct cadence and accent.',
        features: ['Zero-shot instant voice cloning', 'Emotional inflection & whisper modulation', 'Multi-lingual voice projection', 'Cryptographic voice biometric consent watermark'],
        preview: {
          title: 'Voice Cloning Matrix',
          bars: [{ label: 'Timbre', val1: 100, val2: 98 }, { label: 'Pacing', val1: 98, val2: 95 }, { label: 'Accent', val1: 99, val2: 96 }, { label: 'Emotion', val1: 96, val2: 92 }, { label: 'Watermark', val1: 100, val2: 100 }],
          providers: [{ name: 'Timbre Fidelity', amount: '99.6%', color: 'bg-emerald-500' }, { name: 'Clone Latency', amount: '1.2 secs', color: 'bg-blue-600' }, { name: 'Consent Watermark', amount: 'Sealed', color: 'bg-purple-600' }, { name: 'Dynamic Range', amount: '24-Bit Studio', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'realtime-tts',
        number: '02',
        title: 'Sub-150ms Streaming Text-to-Speech',
        icon: <Zap className="w-4 h-4" />,
        tagline: 'Low-latency chunked audio streaming ideal for real-time customer calling agents and voice assistants.',
        features: ['Websocket binary audio chunk streaming', 'SSML speech markup support', 'Custom pronunciation dictionary', 'Sub-150ms time-to-first-byte (TTFB)'],
        preview: {
          title: 'TTS Streaming Latency',
          bars: [{ label: 'Chunk 1', val1: 98, val2: 95 }, { label: 'Chunk 2', val1: 100, val2: 98 }, { label: 'Chunk 3', val1: 100, val2: 99 }, { label: 'Chunk 4', val1: 99, val2: 96 }, { label: 'Chunk 5', val1: 100, val2: 98 }],
          providers: [{ name: 'Time to First Byte', amount: '138ms', color: 'bg-emerald-500' }, { name: 'Throughput', amount: '48kHz Stream', color: 'bg-blue-600' }, { name: 'SSML Controls', amount: 'Supported', color: 'bg-purple-600' }, { name: 'Call Drops', amount: '0.00%', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'noise-isolation',
        number: '03',
        title: 'Neural Noise Removal & Studio Cleanup',
        icon: <Headphones className="w-4 h-4" />,
        tagline: 'Eliminate room reverb, microphone hiss, wind, and background chatter from recorded audio files.',
        features: ['Deep neural de-reverberation', 'Wind, traffic, and fan noise subtraction', 'Voice isolation from overlapping chatter', 'Broadcast studio warmth boost'],
        preview: {
          title: 'Denoising SNR Index',
          bars: [{ label: 'Hiss', val1: 100, val2: 98 }, { label: 'Reverb', val1: 98, val2: 95 }, { label: 'Wind', val1: 100, val2: 100 }, { label: 'Chatter', val1: 96, val2: 92 }, { label: 'Warmth', val1: 99, val2: 96 }],
          providers: [{ name: 'Noise Reduction', amount: '-42 dB Clean', color: 'bg-emerald-500' }, { name: 'Voice Clarity', amount: 'Crystal Clear', color: 'bg-blue-600' }, { name: 'Reverb Elimination', amount: '100% Dry', color: 'bg-purple-600' }, { name: 'Processing Speed', amount: '10x Faster', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'speech-to-text',
        number: '04',
        title: 'Whisper Large v3 Speech-to-Text',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Word-accurate transcription with speaker diarization, punctuation capitalization, and timestamping.',
        features: ['Multi-speaker diarization (Speaker 1 / 2)', 'Technical jargon & acronym dictionary', 'Word-level microsecond timestamps', '99.2% transcription accuracy across 62 languages'],
        preview: {
          title: 'Transcription Accuracy',
          bars: [{ label: 'English', val1: 100, val2: 99 }, { label: 'Spanish', val1: 99, val2: 98 }, { label: 'German', val1: 98, val2: 96 }, { label: 'Japanese', val1: 98, val2: 95 }, { label: 'Hindi', val1: 97, val2: 94 }],
          providers: [{ name: 'Word Error Rate (WER)', amount: '< 1.4%', color: 'bg-emerald-500' }, { name: 'Speaker Diarization', amount: 'Exact Match', color: 'bg-blue-600' }, { name: 'Micro Timestamps', amount: 'Millisecond', color: 'bg-purple-600' }, { name: 'Languages', amount: '62 Global', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'telephony-sip',
        number: '05',
        title: 'Telephony & WebRTC Streaming',
        icon: <Activity className="w-4 h-4" />,
        tagline: 'Connect directly to Twilio, SIP trunks, Asterisk, and WebRTC for interactive conversational voice bots.',
        features: ['Direct Twilio & SIP trunk integration', 'WebRTC low-latency audio tunnel', 'Real-time speech interruption barge-in', 'DTMF keypad detection'],
        preview: {
          title: 'SIP Trunk Stream',
          bars: [{ label: 'SIP', val1: 100, val2: 98 }, { label: 'WebRTC', val1: 100, val2: 99 }, { label: 'Barge', val1: 98, val2: 95 }, { label: 'Twilio', val1: 100, val2: 100 }, { label: 'Jitter', val1: 99, val2: 96 }],
          providers: [{ name: 'SIP Connect Latency', amount: '< 40ms', color: 'bg-emerald-500' }, { name: 'Active Phone Lines', amount: '1,000+ Concurrency', color: 'bg-blue-600' }, { name: 'Barge-In Reaction', amount: '< 80ms', color: 'bg-purple-600' }, { name: 'Twilio Compatibility', amount: 'Native Webhooks', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'voice-translation',
        number: '06',
        title: 'Real-Time Speech-to-Speech Translation',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Translate live conversations across languages in real time while preserving the original speaker voice.',
        features: ['Simultaneous live translation', 'Zero-accent voice transfer', 'Cross-lingual emotion preservation', 'Instant subtitle broadcast'],
        preview: {
          title: 'Speech Translation',
          bars: [{ label: 'EN->ES', val1: 99, val2: 96 }, { label: 'EN->FR', val1: 98, val2: 95 }, { label: 'EN->DE', val1: 98, val2: 94 }, { label: 'EN->JA', val1: 97, val2: 92 }, { label: 'EN->ZH', val1: 96, val2: 90 }],
          providers: [{ name: 'Translation Latency', amount: '350ms Total', color: 'bg-emerald-500' }, { name: 'Voice Match Score', amount: '98.4%', color: 'bg-blue-600' }, { name: 'Context Retention', amount: 'High Nuance', color: 'bg-purple-600' }, { name: 'Simultaneous Stream', amount: 'Full-Duplex', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'audiobook-narrator',
        number: '07',
        title: 'Long-Form Audiobook Narrator',
        icon: <FileText className="w-4 h-4" />,
        tagline: 'Convert entire 50,000-word manuscripts into audiobooks with multi-character chapter casting.',
        features: ['Automated dialogue parsing & speaker assignment', 'Chapter bookmarking and mastering', 'ACX / Audible compliant loudness export', 'Consistent character voices across chapters'],
        preview: {
          title: 'Audiobook Render Queue',
          bars: [{ label: 'Ch 1', val1: 100, val2: 98 }, { label: 'Ch 2', val1: 100, val2: 99 }, { label: 'Ch 3', val1: 100, val2: 98 }, { label: 'Ch 4', val1: 100, val2: 100 }, { label: 'Ch 5', val1: 100, val2: 98 }],
          providers: [{ name: 'Audible ACX Standard', amount: '100% Passed', color: 'bg-emerald-500' }, { name: 'Multi-Character Casting', amount: 'Automated', color: 'bg-blue-600' }, { name: 'Manuscript Speed', amount: '50k Words / 4 Mins', color: 'bg-purple-600' }, { name: 'Master File', amount: '192kbps MP3', color: 'bg-indigo-600' }]
        }
      },
      {
        id: 'speech-api',
        number: '08',
        title: 'Developer Speech SDK & REST API',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Integrate real-time text-to-speech, STT transcription, and voice cloning directly into your apps.',
        features: ['TypeScript, Python, and Go SDKs', 'WebSocket binary streaming clients', 'Rate-limiting & dedicated concurrency pools', '99.99% Enterprise uptime SLA'],
        preview: {
          title: 'Speech API Telemetry',
          bars: [{ label: 'REST', val1: 98, val2: 95 }, { label: 'WS', val1: 100, val2: 99 }, { label: 'Latency', val1: 98, val2: 96 }, { label: 'Scale', val1: 100, val2: 98 }, { label: 'SLA', val1: 100, val2: 100 }],
          providers: [{ name: 'API Latency', amount: '< 140ms', color: 'bg-emerald-500' }, { name: 'Throughput', amount: '10,000 Streams/s', color: 'bg-blue-600' }, { name: 'SDKs', amount: 'Node / Python / Go', color: 'bg-purple-600' }, { name: 'Uptime SLA', amount: '99.99%', color: 'bg-indigo-600' }]
        }
      }
    ],
    useCasesHeadline: 'Power realistic voice interactions across products and media',
    useCases: [
      { id: 'a-uc1', title: 'Interactive AI Phone Calling', desc: 'Deploy conversational voice agents for sales calls and customer support.', icon: <Mic className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'a-uc2', title: 'Instant Voice Cloning', desc: 'Clone executive and influencer voices for scalable media production.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { id: 'a-uc3', title: 'Automated Audiobooks & Narration', desc: 'Convert books and articles into studio-narrated audio content.', icon: <FileText className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'a-uc4', title: 'Noise Cleaning & Post-Production', desc: 'Remove background noise and room reverb with 1-click neural cleanup.', icon: <Headphones className="w-5 h-5" />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', iconBorder: 'border-amber-100' }
    ],
    integrationsHeadline: 'Connects to your telephony and developer tools',
    integrations: [
      { name: 'Twilio SIP', logoKey: 'twilio' },
      { name: 'OpenAI Whisper', logoKey: 'openai' },
      { name: 'AWS Polly & S3', logoKey: 'aws' },
      { name: 'Google Cloud Speech', logoKey: 'gcp' },
      { name: 'Microsoft Azure Speech', logoKey: 'azure' },
      { name: 'Slack Alerts', logoKey: 'slack' },
      { name: 'GitHub', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to build with hyper-realistic voice AI?',
    ctaSubtitle: 'Clone a voice or generate ultra-low latency streaming speech in under 30 seconds.',
    relatedHeadline: 'Explore related AI services',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat Assistant', desc: 'Conversational reasoning.', icon: <MessageSquare className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'ai-video', type: 'service', name: 'AI Video & Slides', desc: 'Automated video creation.', icon: <Video className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'ai-music', type: 'service', name: 'AI Music Studio', desc: 'Generative soundtracks.', icon: <Music className="w-4 h-4" />, iconBg: 'bg-violet-50', iconColor: 'text-violet-700', iconBorder: 'border-violet-100' },
      { id: 'ai-image', type: 'service', name: 'AI Image Studio', desc: 'Generative 8K graphics.', icon: <ImageIcon className="w-4 h-4" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-700', iconBorder: 'border-pink-100' },
      { id: 'ai-pods', type: 'service', name: 'AI Compute Pods', desc: 'Serverless GPU clusters.', icon: <Cpu className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' }
    ],
    videoModal: {
      title: 'AI Audio & Speech Walkthrough',
      subtitle: 'Real-Time Neural Speech & Voice Cloning',
      heroCardTitle: 'Watch Voice AI in Action',
      heroCardDesc: 'See how SNS Square AI Audio clones voices from 5 seconds of audio, streams speech with sub-140ms latency, and cleans background room noise.',
      highlights: [{ label: '< 140ms', sub: 'Streaming TTFB' }, { label: '5 Seconds', sub: 'Voice clone sample' }, { label: '62 Global', sub: 'Languages & accents' }]
    }
  },

  'ai-pods': {
    id: 'ai-pods',
    type: 'service',
    breadcrumbCategory: 'AI Services',
    badgeTitle: 'AI Compute Pods',
    badgeIcon: <Cpu className="w-3.5 h-3.5 text-cyan-600" />,
    heroIcon: <Cpu className="w-6 h-6" />,
    heroIconBg: 'bg-cyan-50/90',
    heroIconColor: 'text-cyan-700',
    heroIconBorder: 'border-cyan-100/80',
    headline1: 'Serverless GPU pods.',
    headline2: 'Instant AI model execution.',
    subtitle: 'Deploy dedicated NVIDIA H100, A100, and L40S GPU compute pods with auto-scaling to zero, instant warm boots, and sub-second container initialization.',
    openButtonText: 'Open Compute Pods',
    heroIllustration: {
      cardTitle: 'Serverless GPU Cluster Mesh',
      cardSub: 'H100 / A100 SXM5 Fabric',
      cardBadge: '99.99% Availability',
      annotationText: 'Sub-Second Boot\nScale to Zero',
      checklist: ['NVIDIA H100 & A100 SXM5', 'Instant Cold-Start Warm Boot', 'Automatic Scale-to-Zero'],
      bars: [
        { height: '45%', bg: 'bg-cyan-300' },
        { height: '65%', bg: 'bg-cyan-400' },
        { height: '85%', bg: 'bg-cyan-500' },
        { height: '95%', bg: 'bg-cyan-600' },
        { height: '70%', bg: 'bg-cyan-400' },
        { height: '100%', bg: 'bg-[#0891B2]' }
      ],
      curveColor: '#0891B2'
    },
    metrics: [
      { label: 'Cold Boot Start Time', value: '< 650ms', icon: <Zap className="w-6 h-6" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', iconBorder: 'border-cyan-100' },
      { label: 'GPU Cluster Capacity', value: '2,400+ GPUs', icon: <Cpu className="w-6 h-6" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' },
      { label: 'Cost Reduction vs On-Demand', value: '72% Saved', icon: <DollarSign className="w-6 h-6" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { label: 'Network Interconnect', value: '3.2 Tbps', icon: <Activity className="w-6 h-6" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' }
    ],
    capabilitiesHeadline: 'Enterprise serverless GPU infrastructure built for demanding AI workloads',
    capabilities: [
      {
        id: 'h100-clusters',
        number: '01',
        title: 'NVIDIA H100 & A100 SXM5 Clusters',
        icon: <Cpu className="w-4 h-4" />,
        tagline: 'Access dedicated high-bandwidth GPU nodes connected by 3.2 Tbps InfiniBand mesh networks.',
        features: ['NVIDIA H100 80GB & A100 SXM5 GPUs', 'Sub-millisecond inter-node NVLink latency', 'FlashAttention v3 hardware optimization', 'Zero noisy neighbor resource isolation'],
        preview: {
          title: 'GPU Mesh Fabric',
          bars: [{ label: 'H100-1', val1: 95, val2: 90 }, { label: 'H100-2', val1: 98, val2: 95 }, { label: 'H100-3', val1: 100, val2: 98 }, { label: 'H100-4', val1: 96, val2: 92 }, { label: 'H100-8', val1: 100, val2: 100 }],
          providers: [{ name: 'Active H100 SXM5', amount: '512 Nodes', color: 'bg-cyan-600' }, { name: 'NVLink Bandwidth', amount: '900 GB/s', color: 'bg-emerald-500' }, { name: 'GPU Memory Saturation', amount: '84.2%', color: 'bg-blue-600' }, { name: 'Cluster Health', amount: '100% Healthy', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'scale-to-zero',
        number: '02',
        title: 'Serverless Scale-to-Zero Billing',
        icon: <DollarSign className="w-4 h-4" />,
        tagline: 'Never pay for idle GPUs. Pods automatically suspend when traffic drops and resume in milliseconds.',
        features: ['Exact per-millisecond billing granularity', 'Automatic sleep after configurable idle threshold', 'Snapshot memory warm boot state', 'Zero baseline standby cost'],
        preview: {
          title: 'Autoscaler Metrics',
          bars: [{ label: '0 req', val1: 0, val2: 0 }, { label: '10 req', val1: 40, val2: 30 }, { label: '100 req', val1: 75, val2: 60 }, { label: '500 req', val1: 95, val2: 85 }, { label: '0 req', val1: 0, val2: 0 }],
          providers: [{ name: 'Idle Cost', amount: '$0.00 / hr', color: 'bg-emerald-500' }, { name: 'Warm Boot Speed', amount: '480ms', color: 'bg-cyan-600' }, { name: 'Autoscaling Range', amount: '0 -> 64 Pods', color: 'bg-blue-600' }, { name: 'Cost Reduction', amount: '-72.4%', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'custom-model-deploy',
        number: '03',
        title: '1-Click Open-Source Model Deployment',
        icon: <Cloud className="w-4 h-4" />,
        tagline: 'Deploy Llama 3.3, Mistral Large, DeepSeek-R1, Stable Diffusion, and Whisper in 1 click.',
        features: ['Pre-baked vLLM, TensorRT-LLM, and TGI runtimes', 'Hugging Face weights 1-click sync', 'Continuous speculative decoding optimization', 'Private model weights encryption'],
        preview: {
          title: 'Model Deployment Speed',
          bars: [{ label: 'Llama 3.3', val1: 98, val2: 95 }, { label: 'DeepSeek', val1: 96, val2: 92 }, { label: 'Mistral', val1: 100, val2: 98 }, { label: 'SDXL', val1: 95, val2: 90 }, { label: 'Whisper', val1: 100, val2: 100 }],
          providers: [{ name: 'Pre-Baked Catalog', amount: '120+ Models', color: 'bg-cyan-600' }, { name: 'Inference Engine', amount: 'vLLM / TensorRT', color: 'bg-emerald-500' }, { name: 'Throughput', amount: '142 tps / user', color: 'bg-blue-600' }, { name: 'Deploy Time', amount: '< 45 Secs', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'secure-enclaves',
        number: '04',
        title: 'Confidential GPU Computing & Enclaves',
        icon: <Lock className="w-4 h-4" />,
        tagline: 'Hardware-encrypted memory enclaves ensuring your proprietary model weights and user inputs remain private.',
        features: ['NVIDIA Confidential Computing hardware locks', 'Zero host-level memory inspection', 'SOC 2 and HIPAA compliant enclave isolation', 'End-to-end TLS 1.3 encrypted data plane'],
        preview: {
          title: 'Security Enclave Health',
          bars: [{ label: 'Enclave', val1: 100, val2: 100 }, { label: 'Memory', val1: 100, val2: 100 }, { label: 'Weights', val1: 100, val2: 100 }, { label: 'TLS', val1: 100, val2: 100 }, { label: 'Audit', val1: 100, val2: 100 }],
          providers: [{ name: 'Confidential Compute', amount: 'Hardware Enforced', color: 'bg-emerald-500' }, { name: 'Memory Encryption', amount: 'AES-256 XTS', color: 'bg-cyan-600' }, { name: 'SOC 2 Type II', amount: 'Certified', color: 'bg-blue-600' }, { name: 'Audit Provenance', amount: 'Immutable', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'docker-containers',
        number: '05',
        title: 'Custom Docker Container Runtimes',
        icon: <Code className="w-4 h-4" />,
        tagline: 'Bring your own Dockerfile, CUDA drivers, and Python environment with instant global registry caching.',
        features: ['Any CUDA 12+ or PyTorch 2.5 image', 'Shared fast distributed volume mounts (NFS/Ceph)', 'Automated GitHub/GitLab build triggers', 'Sub-second container warm layer caching'],
        preview: {
          title: 'Container Layer Cache',
          bars: [{ label: 'Base', val1: 100, val2: 100 }, { label: 'CUDA', val1: 100, val2: 100 }, { label: 'PyTorch', val1: 100, val2: 98 }, { label: 'Model', val1: 98, val2: 95 }, { label: 'App', val1: 100, val2: 98 }],
          providers: [{ name: 'Layer Cache Hit', amount: '99.4%', color: 'bg-emerald-500' }, { name: 'Volume Mount Speed', amount: '12 GB/s', color: 'bg-cyan-600' }, { name: 'Custom Containers', amount: 'Supported', color: 'bg-blue-600' }, { name: 'Build CI Sync', amount: 'Automated', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'global-endpoints',
        number: '06',
        title: 'Global Anycast Edge Endpoints',
        icon: <Globe className="w-4 h-4" />,
        tagline: 'Route user requests to the geographically nearest available GPU pod with smart geo-DNS routing.',
        features: ['Anycast IP across 32 global edge pops', 'DDoS protection & WAF edge filtering', 'Automatic multi-region load rebalancing', 'Sub-20ms edge connection handshake'],
        preview: {
          title: 'Global Edge Pops',
          bars: [{ label: 'US-East', val1: 98, val2: 95 }, { label: 'US-West', val1: 99, val2: 96 }, { label: 'EU-Cent', val1: 100, val2: 98 }, { label: 'AP-South', val1: 97, val2: 94 }, { label: 'AP-East', val1: 98, val2: 95 }],
          providers: [{ name: 'Edge Locations', amount: '32 Data Centers', color: 'bg-cyan-600' }, { name: 'Anycast Latency', amount: '< 18ms', color: 'bg-emerald-500' }, { name: 'DDoS Shield', amount: 'Tbps Capacity', color: 'bg-blue-600' }, { name: 'Failover Routing', amount: 'Zero Drop', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'fine-tuning-pipeline',
        number: '07',
        title: 'Distributed Fine-Tuning & LoRA',
        icon: <Sparkles className="w-4 h-4" />,
        tagline: 'Run distributed QLoRA, DPO, and full parameter fine-tuning jobs across multi-GPU node clusters.',
        features: ['Deepspeed ZeRO-3 & FSDP integration', 'Automated checkpointing to S3/Cloud Storage', 'Weights & Biases telemetry tracking', 'Spot GPU auto-resume on eviction'],
        preview: {
          title: 'Fine-Tuning Cluster',
          bars: [{ label: 'Epoch 1', val1: 40, val2: 30 }, { label: 'Epoch 2', val1: 65, val2: 50 }, { label: 'Epoch 3', val1: 85, val2: 70 }, { label: 'Epoch 4', val1: 95, val2: 85 }, { label: 'Complete', val1: 100, val2: 98 }],
          providers: [{ name: 'Training Throughput', amount: '3,800 tokens/s', color: 'bg-cyan-600' }, { name: 'Spot Cost Discount', amount: '78% Off', color: 'bg-emerald-500' }, { name: 'Checkpoint Sync', amount: 'Automated S3', color: 'bg-blue-600' }, { name: 'Loss Convergence', amount: 'Optimal (0.18)', color: 'bg-purple-600' }]
        }
      },
      {
        id: 'observability-metrics',
        number: '08',
        title: 'GPU Telemetry & Cost Governor',
        icon: <Activity className="w-4 h-4" />,
        tagline: 'Monitor GPU temperature, SM utilization, memory bandwidth, and set hard budget limit caps.',
        features: ['NVIDIA NVML real-time metrics', 'Granular cost per inference call', 'Hard spend limit budget alarms', 'Prometheus & Grafana metric exporters'],
        preview: {
          title: 'GPU Telemetry Board',
          bars: [{ label: 'SM Util', val1: 95, val2: 90 }, { label: 'Mem BW', val1: 92, val2: 88 }, { label: 'Temp', val1: 60, val2: 55 }, { label: 'Power', val1: 85, val2: 80 }, { label: 'Cost', val1: 40, val2: 30 }],
          providers: [{ name: 'SM Utilization', amount: '94.8% (Peak)', color: 'bg-emerald-500' }, { name: 'GPU Temperature', amount: '58°C (Optimal)', color: 'bg-cyan-600' }, { name: 'Cost / 1k Tokens', amount: '$0.00012', color: 'bg-blue-600' }, { name: 'Budget Governor', amount: 'Active Limit', color: 'bg-purple-600' }]
        }
      }
    ],
    useCasesHeadline: 'Power demanding AI models with ultra-efficient GPU compute',
    useCases: [
      { id: 'p-uc1', title: 'Low-Latency LLM Inference', desc: 'Host high-throughput open source models with instant response times.', icon: <Zap className="w-5 h-5" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', iconBorder: 'border-cyan-100' },
      { id: 'p-uc2', title: 'Serverless Scale-to-Zero', desc: 'Eliminate thousands in idle GPU costs with automated sleep & wake.', icon: <DollarSign className="w-5 h-5" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100' },
      { id: 'p-uc3', title: 'Private & Secure Model Hosting', desc: 'Run proprietary weights inside hardware-encrypted confidential enclaves.', icon: <Lock className="w-5 h-5" />, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', iconBorder: 'border-purple-100' },
      { id: 'p-uc4', title: 'Distributed Model Fine-Tuning', desc: 'Train custom LoRA and DPO adapters with multi-node GPU clusters.', icon: <Sparkles className="w-5 h-5" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', iconBorder: 'border-blue-100' }
    ],
    integrationsHeadline: 'Connects to your model registries and cloud infrastructure',
    integrations: [
      { name: 'Hugging Face', logoKey: 'huggingface' },
      { name: 'NVIDIA CUDA', logoKey: 'nvidia' },
      { name: 'Kubernetes', logoKey: 'kubernetes' },
      { name: 'Docker Registry', logoKey: 'docker' },
      { name: 'AWS Cloud', logoKey: 'aws' },
      { name: 'Terraform', logoKey: 'terraform' },
      { name: 'GitHub Actions', logoKey: 'github' }
    ],
    ctaTitle: 'Ready to deploy high-speed serverless GPU pods?',
    ctaSubtitle: 'Launch your first NVIDIA H100 or A100 compute pod in under 60 seconds.',
    relatedHeadline: 'Explore related AI infrastructure services',
    relatedOfferings: [
      { id: 'ai-chat', type: 'service', name: 'AI Chat Assistant', desc: 'Conversational reasoning.', icon: <MessageSquare className="w-4 h-4" />, iconBg: 'bg-blue-50', iconColor: 'text-blue-700', iconBorder: 'border-blue-100' },
      { id: 'ai-image', type: 'service', name: 'AI Image Studio', desc: '8K generative graphics.', icon: <ImageIcon className="w-4 h-4" />, iconBg: 'bg-pink-50', iconColor: 'text-pink-700', iconBorder: 'border-pink-100' },
      { id: 'ai-video', type: 'service', name: 'AI Video & Slides', desc: 'Automated video creation.', icon: <Video className="w-4 h-4" />, iconBg: 'bg-rose-50', iconColor: 'text-rose-700', iconBorder: 'border-rose-100' },
      { id: 'ai-audio', type: 'service', name: 'AI Audio & Speech', desc: 'Ultra-realistic voices.', icon: <Mic className="w-4 h-4" />, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', iconBorder: 'border-emerald-100' },
      { id: 'finops', type: 'product', name: 'FinOps', desc: 'Optimize GPU expenditure.', icon: <DollarSign className="w-4 h-4" />, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-700', iconBorder: 'border-cyan-100' },
      { id: 'monitoring', type: 'product', name: 'Monitoring', desc: 'Real-time observability.', icon: <Activity className="w-4 h-4" />, iconBg: 'bg-sky-50', iconColor: 'text-sky-700', iconBorder: 'border-sky-100' }
    ],
    videoModal: {
      title: 'AI Compute Pods Walkthrough',
      subtitle: 'Serverless NVIDIA H100 & A100 GPU Clusters',
      heroCardTitle: 'Watch Serverless GPU Execution in Action',
      heroCardDesc: 'See how SNS Square AI Pods cold-boots containers in under 650ms, auto-scales down to zero when idle, and provides hardware-isolated memory enclaves.',
      highlights: [{ label: '< 650ms', sub: 'Cold start boot' }, { label: '72% Saved', sub: 'Scale to zero' }, { label: '3.2 Tbps', sub: 'InfiniBand mesh' }]
    }
  }
};
