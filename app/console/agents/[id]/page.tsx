"use client";

import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { AgentChat } from "@/components/agent-chat";
import { copy, deptLabel } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AgentPage() {
  const params = useParams<{ id: string }>();
  const { lang, t } = useI18n();
  const { agents, addSkill, files } = useStore();
  const [skill, setSkill] = useState("");
  const agent = agents.find((a) => a.id === params.id);
  if (!agent) return <p className="p-8 text-paper/60">{lang === "zh" ? "找不到這位員工。" : "Staff not found."}</p>;
  function onSkill(e: FormEvent) {
    e.preventDefault();
    if (!agent || !skill.trim()) return;
    addSkill(agent.id, skill.trim());
    setSkill("");
  }
  const owned = files.filter((f) => f.agentId === agent.id);
  return (
    <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr] md:p-8">
      <div className="flex flex-col">
        <p className="text-xs tracking-[0.18em] text-brass uppercase">{deptLabel[lang][agent.department]}</p>
        <h1 className="mt-1 font-display text-3xl">{lang === "zh" ? agent.name : agent.nameEn}</h1>
        <p className="text-sm text-paper/55">{lang === "zh" ? agent.title : agent.titleEn}</p>
        <div className="mt-5 flex-1"><AgentChat agent={agent} /></div>
      </div>
      <aside className="space-y-5">
        <section className="rounded-2xl border border-white/10 bg-navy p-4">
          <h2 className="text-sm text-paper/60">{t(copy.console.skills)}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">{agent.skills.map((s) => (<span key={s} className="rounded-full bg-white/8 px-2 py-1 text-xs">{s}</span>))}</div>
          <form onSubmit={onSkill} className="mt-3 flex gap-2">
            <input value={skill} onChange={(e) => setSkill(e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-ink px-2 py-1.5 text-sm" />
            <button type="submit" className="text-xs text-brass">{t(copy.console.addSkill)}</button>
          </form>
        </section>
        <section className="rounded-2xl border border-white/10 bg-navy p-4">
          <h2 className="text-sm text-paper/60">{t(copy.console.knowledge)}</h2>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            {agent.knowledge.map((k) => (<li key={k}>· {k}</li>))}
            {owned.map((f) => (<li key={f.id}>· {f.name} — {f.summary}</li>))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
