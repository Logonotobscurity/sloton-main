import Link from "next/link";
import { SystemSwitch } from "@/components/systems/system-switch";

export const metadata = {
  title: "Vista",
  robots: { index: false, follow: false },
};

const panels = [
  { title: "AI agents", body: "Typed tools, human gates, kill switch." },
  { title: "Automation", body: "SOPs first. RPA is a tool, not a rename." },
  { title: "Training", body: "Operators after go-live — the missing week." },
];

export default function VistaPage() {
  return (
    <div className="system-surface min-h-screen bg-vista-sand font-sans text-vista-navy">
      <div
        className="pointer-events-none absolute left-1/2 top-[-140px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-vista-sandLight/70 blur-[110px]"
        aria-hidden
      />
      <div className="sticky top-0 z-40 px-4 pt-4 lg:px-8 lg:pt-6">
        <div
          className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full bg-vista-navy px-3 py-2.5"
          style={{ boxShadow: "0 20px 50px -24px rgba(14,25,41,0.7)" }}
        >
          <p className="px-3 font-display text-[13px] font-bold text-vista-cream">LOG_ON · Vista</p>
          <div className="hidden md:block">
            <SystemSwitch current="/vista" tone="dark" />
          </div>
          <Link href="/contact" className="rounded-full bg-vista-cream px-5 py-2.5 text-[12.5px] font-semibold text-vista-navy">
            Book a Demo
          </Link>
        </div>
      </div>

      <main className="px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-[9.5px] uppercase tracking-[0.16em] text-vista-navy/70">03 — Sand canvas</p>
          <h1 className="font-display mt-3 text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[54px] lg:text-[68px]">
            Fly the ops desk.{" "}
            <span className="inline-block rounded-full bg-vista-navy px-6 pb-1 text-vista-cream">Popular</span>
          </h1>
          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-vista-navy/80">
            Outfit on sand. Navy slabs float. Cream is the only signal on dark panels.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-vista-navy px-6 py-3.5 text-[13.5px] font-semibold text-vista-cream">
              Plan a slice
            </Link>
            <Link href="/solutions" className="rounded-full border border-vista-navy/25 px-6 py-3.5 text-[13.5px] font-medium text-vista-navy hover:border-vista-navy">
              See routes
            </Link>
          </div>
        </div>

        <section className="mx-auto mt-16 w-full max-w-[1180px] rounded-[32px] bg-vista-navy p-6 text-vista-cream lg:p-12">
          <h2 className="font-display text-[30px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[40px]">Studio</h2>
          <p className="mt-2 text-[13px] text-vista-muted">Detached navy slab. Ember only on the live dot.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {panels.map((p) => (
              <article key={p.title} className="flex flex-col rounded-2xl border border-vista-line bg-vista-panel p-5 transition-colors duration-150 ease-quiet hover:border-vista-cream/25">
                <h3 className="font-display text-[19px] font-bold tracking-tight">{p.title}</h3>
                <p className="mt-auto pt-3 text-[12.5px] leading-relaxed text-vista-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
