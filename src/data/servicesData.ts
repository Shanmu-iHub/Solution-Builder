import { ServiceItem } from '../types';

export const servicesList: ServiceItem[] = [
  {
    id: 'ai-chat',
    name: 'AI Chat',
    shortDesc: 'Interact with powerful AI models for conversations, reasoning, and business tasks.',
    longDesc: 'Multi-model enterprise conversational intelligence workspace supporting live streaming, document context attachments, code execution, and system prompt tuning.',
    category: 'Conversational',
    icon: 'MessageSquare',
    badge: 'GPT-4 & Gemini',
    modelOptions: ['Gemini 2.0 Flash', 'Claude 3.5 Sonnet', 'GPT-4o Enterprise', 'Llama 3.3 70B', 'DeepSeek R1']
  },
  {
    id: 'ai-image',
    name: 'AI Image',
    shortDesc: 'Create and transform images using generative AI.',
    longDesc: 'Studio-grade generative image synthesis suite with text-to-image, inpainting, style transfer, brand asset consistency, and ultra-high resolution upscaling.',
    category: 'Vision & Media',
    icon: 'Image',
    badge: '4K Upscaling',
    modelOptions: ['Flux 1.1 Pro Ultra', 'Midjourney v6.1 API', 'DALL-E 3 HD', 'Stable Diffusion 3.5']
  },
  {
    id: 'ai-video',
    name: 'AI Video',
    shortDesc: 'Generate and transform video content using AI.',
    longDesc: 'Cinematic AI video generation studio supporting camera motion control, image-to-video, multi-shot storyboard sequencing, and temporal coherence.',
    category: 'Vision & Media',
    icon: 'Film',
    badge: '1080p / 4K',
    modelOptions: ['Runway Gen-3 Alpha', 'Luma Dream Machine', 'Kling AI 1.5', 'Pika 2.0']
  },
  {
    id: 'ai-music',
    name: 'AI Music',
    shortDesc: 'Create original music and audio experiences with AI.',
    longDesc: 'Harmonic generative music production workstation offering mood-driven track generation, stem separation, vocal synthesis, and royalty-free enterprise licensing.',
    category: 'Audio & Voice',
    icon: 'Music',
    badge: 'Lossless Audio',
    modelOptions: ['Suno v4 Studio', 'Udio v1.5 Pro', 'MusicGen Large Enterprise']
  },
  {
    id: 'ai-audio',
    name: 'AI Audio',
    shortDesc: 'Generate, transform, transcribe, and process audio.',
    longDesc: 'Full-spectrum voice intelligence workstation featuring ultra-realistic neural voice cloning, multi-language speech-to-text transcription, and studio noise suppression.',
    category: 'Audio & Voice',
    icon: 'Mic',
    badge: 'Ultra-low Latency',
    modelOptions: ['ElevenLabs Multilingual v2', 'OpenAI Whisper v3 Large', 'Deepgram Nova-2', 'Cartesia Sonic']
  },
  {
    id: 'ai-pods',
    name: 'AI Pods',
    shortDesc: 'Create AI-powered podcast and voice content.',
    longDesc: 'Autonomous dual-host conversational podcast production engine that synthesizes lively, deep-dive discussions from articles, research PDFs, or outlines.',
    category: 'Generative Studio',
    icon: 'Radio',
    badge: 'Dual-Host AI',
    modelOptions: ['SNS PodCraft Engine v2', 'NotebookLM Podcast Mode', 'ElevenLabs Conversational']
  }
];
