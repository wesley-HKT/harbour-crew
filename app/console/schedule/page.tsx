"use client";

import { FormEvent, useState } from "react";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function SchedulePage() {
  const { lang, t } = useI18n();
  const { jobs, agents, addJob, toggleJob, log } = useStore();
  const [open, setOpen] = useState(false);
  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const agentId = String(data.get("agentId") ?? agents[0]?.id ?? "");
    const cadence = String(data.get("cadence") ?? "");
    if (!title) return;
    addJob({ id: crypto.randomUUID(), agentId, title, titleEn: title, cadence, cadenceEn: cadence, enabled: true, lastRun: "—", nextRun: cadence });
    log({ at: lang === "zh" ? "剛剛" : "Just now", actor: lang === "zh" ? "經理" : "Manager", action: `新增排程：${title}`, actionEn: `Scheduled: ${title}` });
    setOpen(false);
  }
  return (
    <div className="p-5 md:p-8">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl">{t(copy.console.schedule)}</h1>
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-sm text-brass">{t(copy.console.addJob)}</button>
      </div>
      {open ? (
        <form onSubmit={onAdd} className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-navy p-4 md:grid-cols-3">
          <input name="title" required placeholder={lang === "zh" ? "任務" : "Job"} className="rounded-lg bg-ink px-3 py-2 text-sm" />
          <select name="agentId" className="rounded-lg bg-ink px-3 py-2 text-sm">{agents.map((a) => (<option key={a.id} value={a.id}>{lang === "zh" ? a.name : a.nameEn}</option>))}</select>
          <input name="cadence" placeholder={lang === "zh" ? "例如：每日 09:00" : "e.g. Daily 09:00"} className="rounded-lg bg-ink px-3 py-2 text-sm" />
          <button type="submit" className="rounded-lg bg-teal px-3 py-2 text-sm text-ink md:col-span-3">{t(copy.console.addJob)}</button>
        </form>
      ) : null}
      <ul className="mt-6 space-y-3">
        {jobs.map((job) => {
          const agent = agents.find((a) => a.id === job.agentId);
          return (
            <li key={job.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-navy px-4 py-3">
              <div>
                <p>{lang === "zh" ? job.title : job.titleEn}</p>
                <p className="text-xs text-paper/50">{agent ? (lang === "zh" ? agent.name : agent.nameEn) : "—"} · {lang === "zh" ? job.cadence : job.cadenceEn} · {job.lastRun}</p>
              </div>
              <button type="button" onClick={() => toggleJob(job.id)} className={`rounded-full px-3 py-1 text-xs ${job.enabled ? "bg-teal text-ink" : "bg-white/10 text-paper/60"}`}>
                {job.enabled ? (lang === "zh" ? "運行中" : "On") : lang === "zh" ? "已暫停" : "Off"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
