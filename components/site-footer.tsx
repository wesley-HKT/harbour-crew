"use client";

import Link from "next/link";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl">Harbour Crew</p>
          <p className="mt-1 text-sm text-paper/70">{t(copy.tagline)}</p>
        </div>
        <div className="flex gap-6 text-sm text-paper/75">
          <Link href="/solution">{t(copy.nav.product)}</Link>
          <Link href="/console">{t(copy.nav.console)}</Link>
          <Link href="/contact">{t(copy.nav.contact)}</Link>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-xs text-paper/45">{t(copy.footerNote)}</p>
    </footer>
  );
}
