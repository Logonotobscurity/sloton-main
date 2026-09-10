import Link from "next/link";
import { SystemSwitch } from "@/components/systems/system-switch";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Verda",
  robots: { index: false, follow: false },
};

const cards = [
  { title: "Loan cycle", value: "−60%", note: "Time on a delivered credit ops slice." },
  { title: "Retail AOV", value: "+15%", note: "Where we instrumented the storefront." },
  { title: "Support tickets", value: "−30%", note: "Deflection after the agent went live." },
];

export default function VerdaPage() {
  return (
    <div className="system-surface min-h-screen bg-verda-bg text-verda-text font-sans">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[900px] w-[520px] -translate-x-1/2 bg-verda-mint/[0.07] blur-[120px]" aria-hidden />
      <header className="sticky top-0 z-40 h-16 bg-verda-deep/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <p className="font-display text-[15px] font-semibold tracking-tight">LOG_ON · Verda</p>
          <SystemSwitch current="/verda" tone="dark" />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-verda-mint px-6 py-3 text-[14px] font-semibold text-verda-deep transition-transform duration-150 ease-quiet hover:scale-[1.03] active:scale-[0.98]"
          >
            Book a demo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-16 lg:px-8 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.18em] text-verda-faint">01 — Dark mint neo-bank</p>
        <h1 className="font-display mt-4 text-[34px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[46px] lg:text-[58px]">
          Move money slower?{" "}
          <span className="inline-block rounded-full bg-verda-mint px-4 py-0.5 text-verda-deep lg:px-5">Never again</span>
        </h1>
        <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-verda-muted">
          Lagos operators, one mint voltage. Proof is LOG_ON delivery records — not a TAM slide.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-verda-mint px-6 py-3 text-[14px] font-semibold text-verda-deep transition-transform duration-150 ease-quiet hover:scale-[1.03] active:scale-[0.98]"
          >
            Get assessment <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-full border border-verda-line px-6 py-3 text-[14px] font-medium text-verda-text transition-colors duration-150 ease-quiet hover:border-verda-mint/60 hover:text-verda-mint"
          >
            Solutions
          </Link>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-2xl border border-verda-line/70 bg-verda-surface p-6 transition-colors duration-200 ease-quiet hover:border-verda-mint/40"
            >
              <p className="text-[9px] uppercase tracking-[0.16em] text-verda-faint">{c.title}</p>
              <p className="font-display mt-3 text-[26px] font-semibold tracking-tight text-verda-mint">{c.value}</p>
              <p className="mt-auto pt-4 text-[12.5px] leading-relaxed text-verda-muted">{c.note}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
