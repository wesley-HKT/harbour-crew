"use client";

import { FormEvent, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function ContactPage() {
  const { lang, t } = useI18n();
  const { addInquiry, log } = useStore();
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const inquiry = {
      id: crypto.randomUUID(),
      company: String(data.get("company") ?? ""),
      industry: String(data.get("industry") ?? ""),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      createdAt: new Date().toISOString(),
    };
    addInquiry(inquiry);
    log({
      at: lang === "zh" ? "剛剛" : "Just now",
      actor: inquiry.name || inquiry.company,
      action: `提交查詢：${inquiry.company}`,
      actionEn: `Inquiry from ${inquiry.company}`,
    });
    await fetch("/api/inquire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });
    setDone(true);
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-display text-4xl leading-tight">{t(copy.contactHero.title)}</h1>
          <p className="mt-4 max-w-lg text-ink/70">{t(copy.contactHero.lead)}</p>
          <dl className="mt-10 space-y-3 text-sm">
            <div>
              <dt className="text-ink/45">{lang === "zh" ? "示範郵箱" : "Demo inbox"}</dt>
              <dd>hello@harbourcrew.demo</dd>
            </div>
            <div>
              <dt className="text-ink/45">{lang === "zh" ? "服務範圍" : "Coverage"}</dt>
              <dd>{lang === "zh" ? "香港、深圳口岸企業到場" : "Hong Kong on-site, Shenzhen by arrangement"}</dd>
            </div>
          </dl>
        </div>
        {done ? (
          <p className="rounded-2xl bg-foam p-8 text-navy">{t(copy.form.thanks)}</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-sand/80 p-6">
            {([["company", copy.form.company],["industry", copy.form.industry],["name", copy.form.name],["phone", copy.form.phone],["email", copy.form.email]] as const).map(([name, label]) => (
              <label key={name} className="block text-sm">
                <span>{t(label)}</span>
                <input name={name} required type={name === "email" ? "email" : "text"} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-3 py-2 outline-none" />
              </label>
            ))}
            <label className="block text-sm">
              <span>{t(copy.form.message)}</span>
              <textarea name="message" required rows={4} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-3 py-2 outline-none" />
            </label>
            <button type="submit" className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper">{t(copy.form.submit)}</button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
