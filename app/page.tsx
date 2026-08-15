"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-ink">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url(/hero.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/70 to-ink/35" />
          <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
            <p className="text-xs tracking-[0.22em] text-brass uppercase">{t(copy.heroKicker)}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.15] text-paper md:text-6xl">
              {t(copy.tagline)}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
              {t(copy.heroLead)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-brass px-5 py-2.5 text-sm text-ink">
                {t(copy.heroCta)}
              </Link>
              <Link href="/console" className="rounded-full border border-paper/30 px-5 py-2.5 text-sm text-paper">
                {t(copy.heroSecondary)}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm text-ink/55">{t(copy.worry.q)}</p>
          <blockquote className="mt-4 max-w-3xl font-display text-2xl leading-snug text-navy md:text-3xl">
            {t(copy.worry.quote)}
          </blockquote>
          <p className="mt-4 text-xs tracking-[0.18em] text-teal uppercase">{t(copy.worry.label)}</p>
        </section>

        <section className="bg-sand/70 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-3xl md:text-4xl">{t(copy.whyTitle)}</h2>
            <p className="mt-3 max-w-2xl text-ink/70">{t(copy.whyLead)}</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {copy.why.map((item) => (
                <article key={item.n} className="rounded-2xl bg-paper p-6 shadow-[0_1px_0_rgba(16,32,51,0.06)]">
                  <p className="text-xs tracking-[0.2em] text-brass">{item.n}</p>
                  <h3 className="mt-2 text-lg font-medium">{t(item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(item.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy bg-cover bg-center" style={{ backgroundImage: "url(/case.jpg)" }} />
          <div>
            <p className="text-xs tracking-[0.2em] text-teal uppercase">{t(copy.caseKicker)}</p>
            <h2 className="mt-3 font-display text-3xl leading-snug">{t(copy.caseTitle)}</h2>
            <p className="mt-4 text-ink/75 leading-relaxed">{t(copy.caseQuote)}</p>
            <p className="mt-4 text-sm text-ink/50">{t(copy.caseMeta)}</p>
          </div>
        </section>

        <section className="bg-navy py-16 text-paper">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">{t(copy.localTitle)}</h2>
              <p className="mt-4 max-w-lg text-paper/75 leading-relaxed">{t(copy.localLead)}</p>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-ink bg-cover bg-center" style={{ backgroundImage: "url(/team.jpg)" }} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl">{t(copy.stepsTitle)}</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {copy.steps.map((step, i) => (
              <li key={step.en} className="rounded-2xl border border-ink/10 p-4">
                <p className="text-xs text-brass">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm leading-relaxed">{t(step)}</p>
              </li>
            ))}
          </ol>
          <Link href="/contact" className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">
            {t(copy.stepsCta)}
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
