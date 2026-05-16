export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9">
        <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
          <path d="M6 38 Q32 8 58 38" fill="none" stroke="var(--navy)" strokeWidth="4" strokeLinecap="round" className="dark:stroke-cream" />
        </svg>
        <div className="absolute inset-x-1.5 top-2 bottom-0 flex items-center justify-center rounded-xl bg-orange text-cream font-bold text-lg shadow-soft">
          R
        </div>
      </div>
      <div className="flex items-baseline gap-0.5 text-xl font-bold tracking-tight">
        <span className="text-navy dark:text-cream">revolico</span>
        <span className="text-orange">uci</span>
      </div>
    </div>
  );
}
