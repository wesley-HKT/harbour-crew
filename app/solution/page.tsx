"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

export default function SolutionPage() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs tracking-[0.2em] text-teal uppercase">{t(copy.solutionHero.kicker)}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">{t(copy.solutionHero.title)}</h1>
          <p className="mt-5 max-w-2xl text-ink/70">{t(copy.solutionHero.lead)}</p>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">{t(copy.nav.contact)}</Link>
        </section>
        <section className="bg-sand/70 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl">{t(copy.hardwareTitle)}</h2>
              <p className="mt-3 text-ink/70">{t(copy.hardwareLead)}</p>
              <ul className="mt-6 space-y-3 text-sm text-ink/80">
                {copy.hardwarePoints.map((p) => (<li key={p.en} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />{t(p)}</li>))}
              </ul>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink bg-cover bg-center" style={{ backgroundImage: "url(/appliance.jpg)" }} />
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl">{t(copy.compareTitle)}</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="bg-navy text-paper">
                <tr>
                  <th className="px-4 py-3 font-medium">{t(copy.compareHead.dim)}</th>
                  <th className="px-4 py-3 font-medium">{t(copy.compareHead.us)}</th>
                  <th className="px-4 py-3 font-medium">{t(copy.compareHead.them)}</th>
                </tr>
              </thead>
              <tbody>
                {copy.compareRows.map((row) => (
                  <tr key={row.dim.en} className="border-t border-ink/10">
                    <td className="px-4 py-3 font-medium">{t(row.dim)}</td>
                    <td className="px-4 py-3 text-ink/80">{t(row.us)}</td>
                    <td className="px-4 py-3 text-ink/55">{t(row.them)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-navy py-16 text-paper">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-3xl">{t(copy.platformTitle)}</h2>
            <p className="mt-3 max-w-2xl text-paper/70">{t(copy.platformLead)}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {copy.platform.map((item) => (
                <article key={item.title.en} className="rounded-2xl border border-white/10 p-5">
                  <h3 className="text-lg">{t(item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{t(item.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl">{t(copy.marketTitle)}</h2>
          <p className="mt-3 max-w-2xl text-ink/70">{t(copy.marketLead)}</p>
          <h3 className="mt-10 text-sm tracking-[0.18em] text-teal uppercase">{t(copy.scenesTitle)}</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {copy.scenes.map((scene) => (
              <article key={scene.title.en} className="rounded-2xl bg-sand/80 p-5">
                <h4 className="font-medium">{t(scene.title)}</h4>
                <p className="mt-2 text-sm text-ink/70">{t(scene.body)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
