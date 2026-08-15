import { ConsoleNav } from "@/components/console-nav";

export default function ConsoleLayout({ children }: LayoutProps<"/console">) {
  return (
    <div className="flex min-h-full flex-col bg-ink text-paper md:flex-row">
      <ConsoleNav />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
