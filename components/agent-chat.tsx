"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import type { Agent } from "@/lib/types";

export function AgentChat({ agent }: { agent: Agent }) {
  const { lang, t } = useI18n();
  const [input, setInput] = useState("");
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          agent: {
            name: agent.name,
            nameEn: agent.nameEn,
            title: agent.title,
            brief: agent.brief,
            briefEn: agent.briefEn,
            skills: agent.skills,
            knowledge: agent.knowledge,
            language: lang,
          },
        },
      }),
    [agent, lang],
  );
  const { messages, sendMessage, status } = useChat({ id: `${agent.id}-${lang}`, transport });
  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="flex min-h-[28rem] flex-1 flex-col rounded-2xl border border-white/10 bg-ink">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="pt-8 text-center text-sm text-paper/45">{t(copy.console.emptyChat)}</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-teal text-ink" : "bg-white/8 text-paper"}`}>
              {message.parts.map((part, i) =>
                part.type === "text" ? (
                  <p key={`${message.id}-${i}`} className="whitespace-pre-wrap">{part.text}</p>
                ) : null,
              )}
            </div>
          ))
        )}
        {busy ? <p className="text-xs text-brass">{lang === "zh" ? "員工處理中…" : "Working…"}</p> : null}
      </div>
      <form className="border-t border-white/10 p-3" onSubmit={(e) => { e.preventDefault(); const text = input.trim(); if (!text || busy) return; sendMessage({ text }); setInput(""); }}>
        <p className="mb-2 text-[11px] text-paper/40">{t(copy.console.chatHint)}</p>
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={lang === "zh" ? "對這位員工下指令…" : "Brief this employee…"} className="flex-1 rounded-xl border border-white/10 bg-navy px-3 py-2.5 text-sm text-paper outline-none placeholder:text-paper/30" />
          <button type="submit" disabled={busy} className="rounded-xl bg-brass px-4 py-2 text-sm text-ink disabled:opacity-50">{t(copy.console.send)}</button>
        </div>
      </form>
    </div>
  );
}
