"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/copy";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./logo";

const links = [
  { href: "/console", key: "team" as const },
  { href: "/console/schedule", key: "schedule" as const },
  { href: "/console/files", key: "files" as const },
  { href: "/console/integrations", key: "integrations" as const },
  { href: "/console/marketplace", key: "market" as const },
  { href: "/console/audit", key: "audit" as const },
];

export function ConsoleNav() {
  const pathname = usePathname();
  const { lang, setLang, t } = useI18n();

  return (
    <aside className="flex w-full flex-col border-b border-white/10 bg-navy text-paper md:h-screen md:w-60 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-paper"><Logo /></Link>
        <button type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] md:hidden">
          {lang === "zh" ? "EN" : "中"}
        </button>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible">
        {links.map((link) => {
          const active = link.href === "/console" ? pathname === "/console" || pathname.startsWith("/console/agents") : pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${active ? "bg-white/10 text-paper" : "text-paper/65 hover:text-paper"}`}>
              {t(copy.console[link.key])}
            </Link>
          );
        })}
      </nav>
      <div className="hidden items-center justify-between px-4 py-4 md:flex">
        <Link href="/" className="text-xs text-paper/50 hover:text-paper">← Harbour Crew</Link>
        <button type="button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} className="rounded-full border border-white/20 px-2 py-0.5 text-[11px]">
          {lang === "zh" ? "EN" : "中"}
        </button>
      </div>
    </aside>
  );
}
