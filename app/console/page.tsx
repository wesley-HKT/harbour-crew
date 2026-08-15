"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { copy, deptLabel } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { Department } from "@/lib/types";

const statusDot: Record<string, string> = { online: "bg-teal", busy: "bg-brass", idle: "bg-white/30" };

export default function ConsoleHome() {
  const { lang, t } = useI18n();
  const { agents, jobs, files, addAgent, log } = useStore();
  const [open, setOpen] = useState(false);

  function hire(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const department = String(data.get("department") ?? "ops") as Department;
    const brief = String(data.get("brief") ?? "").trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, "-").slice(0, 20) + "-" + Date.now().toString(36);
    addAgent({
      id, name, nameEn: name,
      title: deptLabel.zh[department] + (lang === "zh" ? "員工" : ""),
      titleEn: deptLabel.en[department] + " staff",
      department, status: "idle", language: lang,
      brief: brief || `你是 ${name}，負責${deptLabel.zh[department]}相關工序。用公司文件作答，不要捏造。`,
      briefEn: brief || `You are ${name}, covering ${deptLabel.en[department]}. Use company files. Do not invent facts.`,
      skills: [], knowledge: [], tasksToday: 0,
      lastActive: lang === "zh" ? "剛剛聘用" : "Just hired",
    });
    log({ at: lang === "zh" ? "剛剛" : "Just now", actor: lang === "zh" ? "經理" : "Manager", action: `聘用 ${name}`, actionEn: `Hired ${name}` });
    setOpen(false);
  }

  return (
    <div className="p-5 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.2em] text-brass uppercase">{t(copy.console.overview)}</p>
          <h1 className="mt-1 font-display text-3xl">{t(copy.console.team)}</h1>
        </div>
        <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-full bg-brass px-4 py-2 text-sm text-ink">{t(copy.console.hire)}</button>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label={t(copy.console.online)} value={`${agents.filter((a) => a.status === "online").length}`} />
        <Stat label={t(copy.console.jobs)} value={`${jobs.filter((j) => j.enabled).length}`} />
        <Stat label={t(copy.console.filesCount)} value={`${files.length}`} />
      </div>
      {open ? (
        <form onSubmit={hire} className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-navy p-4 md:grid-cols-2">
          <input name="name" required placeholder={lang === "zh" ? "員工名稱" : "Name"} className="rounded-xl border border-white/10 bg-ink px-3 py-2 text-sm" />
          <select name="department" className="rounded-xl border border-white/10 bg-ink px-3 py-2 text-sm">
            {(Object.keys(deptLabel.zh) as Department[]).map((d) => (<option key={d} value={d}>{deptLabel[lang][d]}</option>))}
          </select>
          <textarea name="brief" rows={3} placeholder={lang === "zh" ? "職責簡述（可選）" : "Brief (optional)"} className="rounded-xl border border-white/10 bg-ink px-3 py-2 text-sm md:col-span-2" />
          <button type="submit" className="rounded-xl bg-teal px-4 py-2 text-sm text-ink md:col-span-2">{t(copy.console.hire)}</button>
        </form>
      ) : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/console/agents/${agent.id}`} className="rounded-2xl border border-white/10 bg-navy p-5 hover:border-brass/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg">{lang === "zh" ? agent.name : agent.nameEn}</p>
                <p className="text-sm text-paper/55">{lang === "zh" ? agent.title : agent.titleEn} · {deptLabel[lang][agent.department]}</p>
              </div>
              <span className="flex items-center gap-2 text-xs text-paper/50"><span className={`h-2 w-2 rounded-full ${statusDot[agent.status]}`} />{agent.status}</span>
            </div>
            <p className="mt-4 text-sm text-paper/70">{agent.tasksToday} {lang === "zh" ? "項今日任務" : "tasks today"} · {agent.lastActive}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (<div className="rounded-2xl border border-white/10 bg-navy px-4 py-3"><p className="text-xs text-paper/45">{label}</p><p className="mt-1 font-display text-2xl">{value}</p></div>);
}
