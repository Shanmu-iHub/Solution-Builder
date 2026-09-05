import { AIModel } from '../types';

export const modelsList: AIModel[] = [
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google Cloud',
    category: 'Multimodal',
    contextWindow: '1,048,576 tokens',
    inputPricing: '$0.10 / 1M tokens',
    outputPricing: '$0.40 / 1M tokens',
    status: 'Production',
    description: 'Next-generation multimodal model offering blazing fast latency, audio/video live streaming, and high reasoning throughput.',
    rating: 4.9,
    benchmarkScore: 92.4
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    category: 'Reasoning',
    contextWindow: '200,000 tokens',
    inputPricing: '$3.00 / 1M tokens',
    outputPricing: '$15.00 / 1M tokens',
    status: 'Production',
    description: 'Industry-leading coding and complex reasoning model with outstanding software architecture and instruction precision.',
    rating: 4.95,
    benchmarkScore: 94.1
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Enterprise',
    provider: 'OpenAI',
    category: 'Multimodal',
    contextWindow: '128,000 tokens',
    inputPricing: '$2.50 / 1M tokens',
    outputPricing: '$10.00 / 1M tokens',
    status: 'Production',
    description: 'Flagship omni-model combining vision, audio, text, and deep structured output parsing with robust enterprise SLA.',
    rating: 4.9,
    benchmarkScore: 93.6
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 Reasoning',
    provider: 'DeepSeek Open',
    category: 'Reasoning',
    contextWindow: '64,000 tokens',
    inputPricing: '$0.55 / 1M tokens',
    outputPricing: '$2.19 / 1M tokens',
    status: 'Production',
    description: 'Reinforcement learning reasoning model excelling at mathematics, competitive programming, and formal logic verification.',
    rating: 4.88,
    benchmarkScore: 92.8
  },
  {
    id: 'flux-1-pro',
    name: 'Flux 1.1 Pro Ultra',
    provider: 'Black Forest Labs',
    category: 'Vision',
    contextWindow: '4,096 tokens',
    inputPricing: '$0.04 / generation',
    outputPricing: 'Included',
    status: 'Production',
    description: 'State-of-the-art visual generation model with photorealism, typography fidelity, and prompt adherence.',
    rating: 4.92,
    benchmarkScore: 95.0
  },
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3 Alpha',
    provider: 'RunwayML',
    category: 'Video',
    contextWindow: 'N/A',
    inputPricing: '$0.15 / sec video',
    outputPricing: 'Included',
    status: 'Production',
    description: 'Ultra-realistic cinematic video generation with dynamic camera controls and physics simulation.',
    rating: 4.85,
    benchmarkScore: 91.2
  },
  {
    id: 'elevenlabs-v2',
    name: 'ElevenLabs Multilingual v2',
    provider: 'ElevenLabs',
    category: 'Audio',
    contextWindow: 'N/A',
    inputPricing: '$0.18 / 1k chars',
    outputPricing: 'Included',
    status: 'Production',
    description: 'Lifelike emotional speech synthesis supporting 29 languages with instantaneous voice cloning.',
    rating: 4.94,
    benchmarkScore: 96.5
  },
  {
    id: 'suno-v4',
    name: 'Suno v4 Studio',
    provider: 'Suno AI',
    category: 'Audio',
    contextWindow: 'N/A',
    inputPricing: '$0.10 / generation',
    outputPricing: 'Included',
    status: 'Beta',
    description: 'Full-track studio music composition including vocals, instrumental arrangements, and mastering.',
    rating: 4.8,
    benchmarkScore: 89.7
  }
];
