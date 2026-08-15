export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <rect width="28" height="28" rx="7" fill="#102033" />
        <path
          d="M5 18c3.2-5 6.4-7.6 9.6-7.6S20.8 13 24 18"
          fill="none"
          stroke="#d6b16a"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7.2 18c2.4-3.4 4.8-5.1 7.2-5.1S19.2 14.6 21.6 18"
          fill="none"
          stroke="#2a9d8f"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="14.4" cy="9.2" r="1.3" fill="#f3eee4" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] tracking-tight">
          Harbour Crew
        </span>
        <span className="block text-[10px] tracking-[0.18em] text-brass uppercase">
          智工隊
        </span>
      </span>
    </span>
  );
}
