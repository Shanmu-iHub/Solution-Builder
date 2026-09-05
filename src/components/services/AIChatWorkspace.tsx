import React, { useState, useRef, useEffect } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Paperclip, 
  Download, 
  Sliders, 
  Plus, 
  Bot, 
  User, 
  Cpu, 
  Zap 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  tokens?: number;
}

export const AIChatWorkspace: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      content: 'How should we architect an asynchronous event-driven order processing pipeline with zero data loss in AWS?',
      timestamp: '09:20 AM'
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      content: `To build an **enterprise event-driven order processing pipeline with zero data loss**, follow this decoupled architecture:

### 1. Ingestion Layer (Idempotency & Durability)
* **Amazon API Gateway** receives order payload with \`X-Idempotency-Key\` header.
* Dispatches directly to **Amazon SQS (FIFO)** or **Amazon Kinesis / Kafka Broker** with content-based deduplication.

### 2. Processing Layer (Transactional Outbox)
* **Worker Microservices (AWS Lambda or EKS)** consume messages in batches.
* Writes order record & outbox event atomically to **Aurora PostgreSQL** within a single database transaction.

### 3. Failover & Dead-Letter Queue (DLQ)
* Non-retryable payload failures route to an SQS DLQ with automated CloudWatch alarms.
* DLQ Redrive automation periodically reprocesses poisoned messages after bug fixes.

\`\`\`json
{
  "orderId": "ord_9941a82",
  "status": "QUEUED_TRANSACTIONAL",
  "sla_guarantee": "ZERO_DATA_LOSS_FIFO"
}
\`\`\``,
      timestamp: '09:20 AM',
      model: 'Claude 3.5 Sonnet',
      tokens: 284
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [temperature, setTemperature] = useState(0.4);
  const [systemPrompt, setSystemPrompt] = useState('You are SNS Square Enterprise AI Assistant, an expert cloud solutions architect and software engineering partner.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsGenerating(true);

    // Stream simulated response
    const assistantId = `msg-${Date.now() + 1}`;
    const botResponse = `I have processed your request using **${selectedModel}** under temperature **${temperature}**.\n\nHere is the recommended execution plan:\n\n1. **Validation**: Verified schemas and input constraints.\n2. **Optimization**: Automated token consumption using SNS Square Semantic Caching.\n3. **Result**: All parameters initialized successfully. Ready to deploy or execute next step.`;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: assistantId,
          sender: 'assistant',
          content: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: selectedModel,
          tokens: 142
        }
      ]);
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb items={[{ label: 'Services' }, { label: 'AI Chat' }]} />

      {/* Main 3-Column Enterprise Chat Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[620px]">
        {/* Left Column: Models & Configuration */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-[#0F172A]">AI Chat Configuration</h3>
              </div>
              <button
                onClick={() => setMessages([])}
                className="p-1 text-slate-400 hover:text-blue-600 rounded"
                title="New Chat"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[#0F172A] font-semibold mb-1.5">Foundation Model</label>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white font-medium text-[#0F172A]"
              >
                <option>Claude 3.5 Sonnet</option>
                <option>Gemini 2.0 Flash</option>
                <option>GPT-4o Enterprise</option>
                <option>DeepSeek R1</option>
                <option>Llama 3.3 70B</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-[#0F172A] font-semibold">Temperature ({temperature})</label>
                <span className="text-[10px] text-[#64748B]">{temperature < 0.4 ? 'Precise' : 'Creative'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-[#0F172A] font-semibold mb-1.5">System Instructions</label>
              <textarea
                rows={4}
                value={systemPrompt}
                onChange={e => setSystemPrompt(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-[11px] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Enterprise Guardrails</span>
            </div>
            <p className="text-[#64748B] leading-tight">
              Data is zero-retention compliant and excluded from foundation model training.
            </p>
          </div>
        </div>

        {/* Center/Right (Cols 2-4): Main Chat Thread Canvas */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle flex flex-col overflow-hidden h-[620px]">
          {/* Top Bar */}
          <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-[#0F172A]">{selectedModel}</span>
              <span className="text-slate-400 font-mono">|</span>
              <span className="text-slate-500 font-mono">Context: 200k tokens</span>
            </div>
            <button
              onClick={() => alert('Exported conversation transcript in Markdown format.')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded text-[11px] font-medium flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#2563EB] text-white rounded-br-none shadow-sm'
                      : 'bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-bl-none shadow-2xs'
                  }`}
                >
                  {msg.sender === 'assistant' && msg.model && (
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0] text-[10px] text-[#64748B]">
                      <span className="font-bold uppercase tracking-wider">{msg.model}</span>
                      <div className="flex items-center gap-2">
                        {msg.tokens && <span>{msg.tokens} tokens</span>}
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-blue-600 flex items-center gap-0.5"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
                    {msg.content}
                  </div>

                  <span className={`text-[9px] mt-2 block text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    SS
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-center gap-3 text-xs text-[#64748B]">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>Generating reasoning output...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-[#E2E8F0] bg-white flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => alert('Attach documents, code files, or images for AI context.')}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Ask anything or request architecture specs, code, and reasoning..."
              className="flex-1 px-4 py-2.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] text-[#0F172A]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isGenerating}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
