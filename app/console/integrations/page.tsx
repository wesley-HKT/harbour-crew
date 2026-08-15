"use client";

import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function IntegrationsPage() {
  const { lang, t } = useI18n();
  const { integrations, toggleIntegration, log } = useStore();
  return (
    <div className="p-5 md:p-8">
      <h1 className="font-display text-3xl">{t(copy.console.integrations)}</h1>
      <p className="mt-2 max-w-xl text-sm text-paper/55">{lang === "zh" ? "示範連接。真正上線時會走 OAuth / 內網 API。" : "Demo toggles. A live install uses OAuth or LAN APIs."}</p>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {integrations.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy px-4 py-4">
            <div>
              <p>{item.name}</p>
              <p className="text-xs text-paper/45">{lang === "zh" ? item.category : item.categoryEn}</p>
            </div>
            <button type="button" onClick={() => { toggleIntegration(item.id); log({ at: lang === "zh" ? "剛剛" : "Just now", actor: lang === "zh" ? "經理" : "Manager", action: `${item.connected ? "中斷" : "連接"} ${item.name}`, actionEn: `${item.connected ? "Disconnected" : "Connected"} ${item.name}` }); }} className={`rounded-full px-3 py-1 text-xs ${item.connected ? "bg-teal text-ink" : "border border-white/20 text-paper/70"}`}>
              {item.connected ? t(copy.console.connected) : t(copy.console.connect)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
