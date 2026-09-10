/** Tessera isometric cube stack — unique LOG_ON mark, not a photo. */
export function IsometricStack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 220"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path d="M120 12 L204 56 L120 100 L36 56 Z" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <path d="M36 56 L36 124 L120 168 L120 100 Z" fill="hsl(var(--foreground) / 0.08)" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <path d="M120 100 L120 168 L204 124 L204 56 Z" fill="hsl(var(--accent) / 0.12)" stroke="hsl(var(--accent))" strokeWidth="2" />
      <path d="M120 52 L164 74 L120 96 L76 74 Z" fill="hsl(var(--primary))" />
      <circle cx="120" cy="74" r="6" fill="hsl(var(--background))" />
    </svg>
  );
}
