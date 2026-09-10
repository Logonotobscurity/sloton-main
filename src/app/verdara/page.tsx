import Link from "next/link";
import { SystemSwitch } from "@/components/systems/system-switch";
import { Sunburst } from "@/components/systems/sunburst";

export const metadata = {
  title: "Verdara",
  robots: { index: false, follow: false },
};

const issues = [
  { tone: "sage", title: "Agents in production", tag: "Field notes" },
  { tone: "sky", title: "WhatsApp as the desk", tag: "Africa" },
  { tone: "amber", title: "Human gates that hold", tag: "Ops" },
];

const tagClass: Record<string, string> = {
  sage: "bg-verdara-sage/60 text-verdara-ink",
  amber: "bg-verdara-amber text-verdara-ink",
  sky: "bg-verdara-sky text-verdara-ink",
};

export default function VerdaraPage() {
  return (
    <div className="system-surface min-h-screen bg-verdara-paper text-verdara-ink font-sans">
      <header className="sticky top-0 z-40 h-[70px] bg-verdara-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-[70px] max-w-[1240px] items-center justify-between px-5 lg:px-10">
          <div className="flex items-center gap-2 text-verdara-ink">
            <Sunburst className="h-5 w-5" />
            <p className="font-fraunces text-[21px] font-semibold">Verdara</p>
          </div>
          <SystemSwitch current="/verdara" />
          <Link
            href="/contact"
            className="rounded-full bg-verdara-ink px-6 py-3 text-[13px] font-medium text-verdara-paperAlt transition-transform duration-150 ease-quiet hover:scale-[1.03] active:scale-[0.98]"
          >
            Join the field
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-14">
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.16em] text-verdara-muted">02 — Cream editorial quarterly</p>
            <h1 className="font-fraunces mt-4 text-[46px] font-semibold leading-[0.95] tracking-[-0.02em] sm:text-[60px] lg:text-[72px]">
              Work that actually <em className="italic text-verdara-coral">flows</em>
            </h1>
            <p className="mt-6 max-w-[60ch] text-[13.5px] leading-relaxed text-verdara-muted">
              Fraunces on cream. One coral italic per headline. LOG_ON writes from Lagos deliveries, not invented Nordic TAM.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/insights" className="rounded-full border border-verdara-ink/25 px-6 py-3 text-[13px] font-medium text-verdara-ink hover:border-verdara-ink">
                Read Insights
              </Link>
              <Link href="/contact" className="rounded-full bg-verdara-amber px-5 py-2.5 text-[12.5px] font-semibold text-verdara-ink">
                Save edition
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[26px] bg-verdara-ink p-8 text-verdara-paperAlt">
            <Sunburst petals={14} rx={26} ry={110} className="pointer-events-none absolute -right-10 -top-16 h-[400px] w-[400px] text-verdara-amber/[0.08]" color="currentColor" />
            <p className="text-[9px] uppercase tracking-[0.16em] text-verdara-amber">Issue 04 · Lagos</p>
            <p className="font-fraunces mt-4 text-[32px] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[42px]">
              Operators, not <em className="italic text-verdara-amber">theatre</em>
            </p>
            <p className="mt-4 text-[12.5px] leading-relaxed text-verdara-paperAlt/80">
              Loan cycle −60%. Retail AOV +15%. Support tickets −30%. Healthcare triage ~40% where we measured it.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {issues.map((item) => (
            <article key={item.title} className="flex flex-col rounded-[22px] border border-verdara-rule bg-verdara-card p-6">
              <span className={`w-fit rounded-full px-4 py-1.5 text-[11.5px] font-medium ${tagClass[item.tone]}`}>{item.tag}</span>
              <h2 className="font-fraunces mt-4 text-[26px] font-semibold leading-[1.05] tracking-[-0.01em]">{item.title}</h2>
              <p className="mt-auto pt-4 text-[12.5px] leading-relaxed text-verdara-muted">Written for Nigerian, African, and global operators.</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
