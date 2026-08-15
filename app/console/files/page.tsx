"use client";

import { FormEvent } from "react";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function FilesPage() {
  const { lang, t } = useI18n();
  const { files, agents, addFile, log } = useStore();
  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const summary = String(data.get("summary") ?? "").trim();
    const agentId = String(data.get("agentId") ?? agents[0]?.id ?? "");
    if (!name) return;
    addFile({ id: crypto.randomUUID(), agentId, name, kind: name.split(".").pop()?.toUpperCase() ?? "NOTE", summary, updated: lang === "zh" ? "剛剛" : "Just now" });
    log({ at: lang === "zh" ? "剛剛" : "Just now", actor: lang === "zh" ? "經理" : "Manager", action: `上載知識：${name}`, actionEn: `Added knowledge: ${name}` });
    e.currentTarget.reset();
  }
  return (
    <div className="p-5 md:p-8">
      <h1 className="font-display text-3xl">{t(copy.console.files)}</h1>
      <form onSubmit={onAdd} className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-navy p-4 md:grid-cols-3">
        <input name="name" required placeholder="SOP-夜更.pdf" className="rounded-lg bg-ink px-3 py-2 text-sm" />
        <select name="agentId" className="rounded-lg bg-ink px-3 py-2 text-sm">{agents.map((a) => (<option key={a.id} value={a.id}>{lang === "zh" ? a.name : a.nameEn}</option>))}</select>
        <input name="summary" placeholder={lang === "zh" ? "這份文件教員工什麼" : "What should they learn"} className="rounded-lg bg-ink px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-teal px-3 py-2 text-sm text-ink md:col-span-3">{t(copy.console.addFile)}</button>
      </form>
      <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
        {files.map((file) => {
          const agent = agents.find((a) => a.id === file.agentId);
          return (<li key={file.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"><div><p>{file.name}</p><p className="text-xs text-paper/50">{file.kind} · {agent ? (lang === "zh" ? agent.name : agent.nameEn) : "—"} · {file.summary}</p></div><span className="text-xs text-paper/40">{file.updated}</span></li>);
        })}
      </ul>
    </div>
  );
}
