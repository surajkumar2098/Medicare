"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { userAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

type ChatMessage = { id: string; role: "user" | "assistant" | "system"; text: string };

export default function AssistantPageVision() {
  const { isAuthenticated, user } = userAuthStore();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = localStorage.getItem("assistant:history");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [webFallback, setWebFallback] = useState(true);
  const [snippet, setSnippet] = useState<string | null>(null);
  const [lastSource, setLastSource] = useState("ai");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) router.replace("/login/patient");
  }, [isAuthenticated, router]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem("assistant:history", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speak reply
  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    try {
      synth.cancel();
    } catch {}

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";

    u.onstart = () => setIsSpeaking(true);
    u.onend = () => {
      setIsSpeaking(false);
      utterRef.current = null;
    };

    utterRef.current = u;
    synth.speak(u);
  };

  const stopSpeaking = () => {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setIsSpeaking(false);
    utterRef.current = null;
  };

  // Send message
  const sendMessage = async (maybe?: string) => {
    const text = (maybe ?? input).trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: Date.now() + "u", role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    stopSpeaking();
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, webFallback }),
      });

      const data = await res.json();
      const reply = data.answer || "(no response)";

      const assistantMsg: ChatMessage = { id: Date.now() + "a", role: "assistant", text: reply };
      setMessages((m) => [...m, assistantMsg]);

      if (data.snippet) setSnippet(data.snippet);
      setLastSource(data.source || "ai");

      speak(reply);
    } catch (err) {
      const assistantMsg: ChatMessage = {
        id: Date.now() + "e",
        role: "assistant",
        text: "Network error",
      };
      setMessages((m) => [...m, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Enter key
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#0f172a,_#071029)] text-white pt-24">
      <div className="max-w-3xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="backdrop-blur-xl bg-white/6 border border-white/10 rounded-3xl p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold">MediCare+ Assistant</h1>
                <p className="text-sm text-white/70">Hello, {user?.name}. Ask anything.</p>
              </div>

              <div className="h-6 w-20 bg-white/10 rounded-full flex items-center justify-center text-xs">
                {isSpeaking ? "Speaking…" : lastSource?.toUpperCase()}
              </div>
            </div>

            {/* Chat Window */}
            <div className="h-[48vh] overflow-auto rounded-2xl p-4 bg-white/3 border border-white/6">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="text-white/60">No messages yet — start a conversation.</div>
                )}

                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[78%] py-2 px-3 rounded-2xl ${
                        m.role === "user"
                          ? "bg-white/90 text-slate-900"
                          : "bg-white/8 text-white"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Row */}
            <div className="mt-4 flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your question…"
                className="flex-1 bg-white/5 placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none border border-white/6"
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-white/90 to-white/80 text-slate-900 shadow"
              >
                <Send />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between text-xs text-white/60">
              <div>Powered by MediCare+ knowledge base</div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={webFallback}
                  onChange={(e) => setWebFallback(e.target.checked)}
                  className="accent-white/80"
                />
                <span>Web lookup</span>
              </label>
            </div>

            {snippet && (
              <div className="mt-3 p-3 rounded-xl bg-white/6 text-sm text-white/90">{snippet}</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
