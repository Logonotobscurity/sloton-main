import Link from "next/link";
import { SystemSwitch } from "@/components/systems/system-switch";
import { TesseraCubes } from "@/components/systems/tessera-cubes";

export const metadata = {
  title: "Tessera",
  robots: { index: false, follow: false },
};

const stats = [
  { k: "Loan time", v: "−60%" },
  { k: "Retail AOV", v: "+15%" },
  { k: "Tickets", v: "−30%" },
  { k: "Triage", v: "~40%" },
];

export default function TesseraPage() {
  return (
    <div className="system-surface min-h-screen bg-tessera-lavender font-sans text-tessera-paper">
      <div className="px-4 py-6 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-[1120px] rounded-[22px] bg-tessera-forest p-6 shadow-[0_40px_90px_-50px_rgba(15,31,28,0.9)] lg:p-12">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-instrument text-[21px] italic">LOG_ON tessera</p>
            <SystemSwitch current="/tessera" tone="dark" />
            <Link
              href="/contact"
              className="rounded-full bg-tessera-chartreuse px-5 py-2.5 text-[12.5px] font-semibold text-tessera-forest"
            >
              Book a demo
            </Link>
          </header>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <p className="text-[9.5px] uppercase tracking-[0.18em] text-tessera-muted">04 — Inset frames</p>
              <h1 className="font-instrument mt-3 text-[38px] italic leading-[1.08] tracking-[-0.01em] lg:text-[54px]">
                Forest slabs on a <span className="bg-tessera-chartreuse/20 px-1 font-semibold text-tessera-chartreuse">lavender</span> margin
              </h1>
              <p className="mt-4 max-w-[70ch] text-[13px] leading-relaxed text-tessera-paper/70">
                Chartreuse is the only pulse. Citron and violet decorate cubes — they never carry a CTA.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/insights" className="rounded-full border border-tessera-line px-5 py-2.5 text-[12.5px] text-tessera-paper hover:border-tessera-paper/40">
                  Insights
                </Link>
                <Link href="/contact" className="rounded-full bg-tessera-chartreuse px-5 py-2.5 text-[12.5px] font-semibold text-tessera-forest">
                  Start a slice
                </Link>
              </div>
            </div>
            <TesseraCubes className="w-full max-w-md justify-self-end" />
          </div>

          <dl className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.k} className="border-t border-tessera-line pt-5">
                <dt className="text-[9.5px] uppercase tracking-[0.18em] text-tessera-muted">{s.k}</dt>
                <dd className="font-instrument mt-2 text-[34px] italic leading-none text-tessera-chartreuse">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
