import Link from "next/link";

const SYSTEMS = [
  { href: "/verda", label: "01 Verda" },
  { href: "/verdara", label: "02 Verdara" },
  { href: "/vista", label: "03 Vista" },
  { href: "/tessera", label: "04 Tessera" },
  { href: "/chamfer", label: "05 Chamfer" },
] as const;

export function SystemSwitch({
  current,
  tone = "light",
}: {
  current: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-white/55 hover:text-white" : "opacity-70 hover:opacity-100";
  const on = tone === "dark" ? "text-white font-semibold" : "font-semibold underline underline-offset-4";
  return (
    <nav aria-label="Design systems" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em]">
      <Link href="/" className={muted}>
        LOG_ON
      </Link>
      {SYSTEMS.map((s) => (
        <Link key={s.href} href={s.href} aria-current={current === s.href ? "page" : undefined} className={current === s.href ? on : muted}>
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
