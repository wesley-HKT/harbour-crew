"use client";

import Link from "next/link";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./logo";

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="text-ink">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-ink/80 md:flex">
          <Link href="/solution" className="hover:text-ink">
            {t(copy.nav.product)}
          </Link>
          <Link href="/console" className="hover:text-ink">
            {t(copy.nav.console)}
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <Link
            href="/contact"
            className="rounded-full bg-ink px-4 py-2 text-paper hover:bg-navy"
          >
            {t(copy.nav.contact)}
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="rounded-full border border-ink/15 px-3 py-1 text-xs"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <Link href="/console" className="text-sm">
            {t(copy.nav.console)}
          </Link>
        </div>
      </div>
    </header>
  );
}
