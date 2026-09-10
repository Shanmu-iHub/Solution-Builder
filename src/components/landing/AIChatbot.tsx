import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, ChevronDown, Sparkles, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: Date;
}

const QUICK_QUESTIONS = [
  "What is SNS Square?",
  "How does the Agent Builder work?",
  "What layers does SNS Square have?",
  "How do I get started?",
];

const AI_RESPONSES: Record<string, string> = {
  "What is SNS Square?":
    "SNS Square is an enterprise AI foundation that brings agents, workflows, applications, APIs, data, AI models, and governance together through one unified platform. It provides the orchestration layer for building, connecting, and governing intelligent systems at scale.",
  "How does the Agent Builder work?":
    "The Agent Builder lets you design, configure, test, and deploy intelligent agents. You define instructions, attach tools (APIs, data, webhooks), connect a knowledge base, and deploy in one click. All agent activity is governed and fully auditable.",
  "What layers does SNS Square have?":
    "SNS Square has five core layers:\n\n1. Orchestration Layer - coordinates all AI flows\n2. Agent Builder Layer - design and deploy agents\n3. Integration Layer - connect any enterprise system\n4. Model Layer - model-agnostic AI runtime\n5. Governance Layer - audit, compliance and control",
  "How do I get started?":
    "Getting started is simple:\n\n1. Click Get Started in the navigation\n2. Create your workspace\n3. Connect your first data source or API\n4. Build your first agent in the Agent Builder\n\nOur team also offers white-glove onboarding for enterprise teams. Would you like to schedule a demo?",
};

function getResponse(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes("what is") || lower.includes("sns square"))
    return AI_RESPONSES["What is SNS Square?"];
  if (lower.includes("agent builder") || lower.includes("agent"))
    return AI_RESPONSES["How does the Agent Builder work?"];
  if (lower.includes("layer") || lower.includes("layers"))
    return AI_RESPONSES["What layers does SNS Square have?"];
  if (lower.includes("start") || lower.includes("begin") || lower.includes("how do"))
    return AI_RESPONSES["How do I get started?"];
  return "Great question! SNS Square unifies your entire AI ecosystem from orchestration to governance. I would recommend exploring the platform docs or clicking Get Started to speak with our team. Is there a specific layer or feature you would like to know more about?";
}

export const AIChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      text: "Hi! I am the SNS Square AI assistant. How can I help you today?",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing, open, minimized]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      ts: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    const reply = getResponse(text);
    setTyping(false);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      text: reply,
      ts: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    if (!open) setUnread((n) => n + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "96px",
          right: "24px",
          zIndex: 9990,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.95)",
          transformOrigin: "bottom right",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            width: "380px",
            height: minimized ? "64px" : "560px",
            transition: "height 0.35s cubic-bezier(0.16,1,0.3,1)",
            background: "#07101F",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.1)",
          }}
        >
          {/* Header */}
          <div
            onClick={() => setMinimized((m) => !m)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              flexShrink: 0,
              cursor: "pointer",
              background: "linear-gradient(135deg,#0D1F3C 0%,#0B1829 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg,#2563EB,#06B6D4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
                  }}
                >
                  <Bot style={{ width: 18, height: 18, color: "white" }} />
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    right: "-2px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#34D399",
                    border: "2px solid #0D1F3C",
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                  SNS Square AI
                </div>
                <div style={{ fontSize: "10px", color: "#34D399", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#34D399", animation: "pulse 2s infinite" }} />
                  Online &middot; Always here to help
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }}
                style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
              >
                <Minimize2 style={{ width: 13, height: 13 }} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
              >
                <X style={{ width: 13, height: 13 }} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  scrollbarWidth: "none",
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      gap: "10px",
                    }}
                  >
                    {msg.role === "assistant" && (
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: "linear-gradient(135deg,#2563EB,#06B6D4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Bot style={{ width: 14, height: 14, color: "white" }} />
                      </div>
                    )}
                    <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: "4px" }}>
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          fontSize: "12px",
                          lineHeight: 1.6,
                          whiteSpace: "pre-wrap",
                          background: msg.role === "user"
                            ? "#2563EB"
                            : "rgba(255,255,255,0.07)",
                          color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.88)",
                          border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                        }}
                      >
                        {msg.text}
                      </div>
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", paddingLeft: "2px", paddingRight: "2px" }}>
                        {fmtTime(msg.ts)}
                      </span>
                    </div>
                    {msg.role === "user" && (
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.5)",
                          marginTop: "2px",
                        }}
                      >
                        U
                      </div>
                    )}
                  </div>
                ))}

                {typing && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#2563EB,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Bot style={{ width: 14, height: 14, color: "white" }} />
                    </div>
                    <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "5px", alignItems: "center" }}>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#60A5FA",
                            display: "inline-block",
                            animation: "chatBounce 1s ease-in-out infinite",
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div style={{ padding: "0 14px 12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "6px 12px",
                        borderRadius: "100px",
                        border: "1px solid rgba(59,130,246,0.4)",
                        color: "#93C5FD",
                        background: "rgba(59,130,246,0.08)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                style={{ padding: "10px 14px 14px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "8px 12px" }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about SNS Square..."
                    disabled={typing}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "12px", color: "white", fontFamily: "inherit" }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: input.trim() && !typing ? "pointer" : "not-allowed",
                      background: input.trim() && !typing ? "#2563EB" : "rgba(255,255,255,0.08)",
                      color: input.trim() && !typing ? "#fff" : "rgba(255,255,255,0.3)",
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <Send style={{ width: 13, height: 13 }} />
                  </button>
                </div>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "8px" }}>
                  Powered by SNS Square AI
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Chat"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9991,
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: open
            ? "#0D1F3C"
            : "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.5)",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          transform: "scale(1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <ChevronDown style={{ width: 20, height: 20, color: "white" }} />
        ) : (
          <>
            <Sparkles style={{ width: 20, height: 20, color: "white" }} />
            {unread > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#EF4444",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </>
  );
};
