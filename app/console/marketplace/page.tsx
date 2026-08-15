"use client";

import { copy, deptLabel } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { marketAgents } from "@/lib/seed";
import { useStore } from "@/lib/store";

export default function MarketplacePage() {
  const { lang, t } = useI18n();
  const { addAgent, log, agents } = useStore();
  return (
    <div className="p-5 md:p-8">
      <h1 className="font-display text-3xl">{t(copy.console.market)}</h1>
      <p className="mt-2 max-w-xl text-sm text-paper/55">{t(copy.marketLead)}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {marketAgents.map((item) => {
          const hired = agents.some((a) => a.id === item.id);
          return (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-navy p-5">
              <p className="text-xs text-brass">{deptLabel[lang][item.department]}</p>
              <h2 className="mt-1 text-lg">{lang === "zh" ? item.name : item.nameEn}</h2>
              <p className="mt-2 text-sm text-paper/65">{lang === "zh" ? item.summary : item.summaryEn}</p>
              <button type="button" disabled={hired} onClick={() => { addAgent({ id: item.id, name: item.name, nameEn: item.nameEn, title: item.name, titleEn: item.nameEn, department: item.department, status: "idle", language: lang, brief: `你是${item.name}。${item.summary}用公司知識作答，不要捏造。`, briefEn: `You are ${item.nameEn}. ${item.summaryEn} Use company knowledge. Do not invent facts.`, skills: [item.summary], knowledge: [], tasksToday: 0, lastActive: lang === "zh" ? "剛從市集部署" : "Just deployed" }); log({ at: lang === "zh" ? "剛剛" : "Just now", actor: lang === "zh" ? "經理" : "Manager", action: `部署市集員工：${item.name}`, actionEn: `Deployed ${item.nameEn}` }); }} className="mt-4 rounded-full bg-brass px-4 py-1.5 text-sm text-ink disabled:opacity-40">
                {hired ? (lang === "zh" ? "已在團隊" : "On the team") : t(copy.console.deploy)}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
