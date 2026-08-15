"use client";

import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AuditPage() {
  const { lang, t } = useI18n();
  const { audit, inquiries } = useStore();

  return (
    <div className="p-5 md:p-8">
      <h1 className="font-display text-3xl">{t(copy.console.audit)}</h1>
      <ul className="mt-6 space-y-2">
        {audit.map((event) => (
          <li key={event.id} className="rounded-xl border border-white/10 bg-navy px-4 py-3 text-sm">
            <p className="text-xs text-paper/40">{event.at} · {event.actor}</p>
            <p className="mt-1">{lang === "zh" ? event.action : event.actionEn}</p>
          </li>
        ))}
      </ul>
      {inquiries.length ? (
        <section className="mt-10">
          <h2 className="text-sm text-paper/50">{lang === "zh" ? "網站查詢" : "Site inquiries"}</h2>
          <ul className="mt-3 space-y-2">
            {inquiries.map((q) => (
              <li key={q.id} className="rounded-xl border border-white/10 px-4 py-3 text-sm">
                <p>{q.company} · {q.name} · {q.email}</p>
                <p className="mt-1 text-paper/60">{q.message}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
