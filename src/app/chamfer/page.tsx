import Link from "next/link";
import { SystemSwitch } from "@/components/systems/system-switch";

export const metadata = {
  title: "Chamfer",
  robots: { index: false, follow: false },
};

const rows = [
  { token: "sheet.base", value: "cut 28px", applies: "two corners" },
  { token: "sheet.inset", value: "cut 14px", applies: "four corners" },
  { token: "sheet.chip", value: "cut 8px", applies: "actions" },
];

export default function ChamferPage() {
  return (
    <div className="system-surface min-h-screen bg-chamfer-paper font-mono text-chamfer-ink">
      <div className="mx-auto max-w-[1120px] px-5 py-16 lg:px-10 lg:py-20">
        <SystemSwitch current="/chamfer" />
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-chamfer-rust">05 — paper and ink</p>
        <h1 className="font-instrument mt-2 text-[72px] leading-[0.9] sm:text-[96px] lg:text-[128px]">
          chamfer<span className="text-chamfer-amber">.</span>
        </h1>
        <p className="mt-6 max-w-xl font-mono text-[13px] leading-[1.75] lg:text-[14px]">
          Corner 45°. Cuts 8 · 14 · 28 · 72. Radius 0. Orange is the only pulse. Never a shadow.
        </p>

        <div className="chamfer-tr-xl mt-12 bg-chamfer-orange px-7 py-12 text-chamfer-paperLight lg:px-16 lg:py-16">
          <h2 className="font-instrument text-[42px] leading-[1.0] lg:text-[56px]">cut from one angle</h2>
          <p className="mt-4 max-w-lg text-[12.5px] leading-[1.8]">
            LOG_ON delivery records only: loan −60% time, retail +15% AOV, support −30% tickets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="chamfer-sm bg-chamfer-ink px-5 py-2.5 font-mono text-[12px] text-chamfer-paperLight hover:-translate-y-0.5">
              book a demo
            </Link>
            <Link href="/solutions" className="chamfer-sm border border-chamfer-paper/30 px-5 py-2.5 font-mono text-[12px] hover:border-chamfer-amber">
              solutions
            </Link>
          </div>
        </div>

        <div className="chamfer-lg mt-10 bg-chamfer-ink p-7 text-chamfer-paperLight lg:p-10">
          <table className="w-full border-collapse">
            <caption className="sr-only">Chamfer cut tokens</caption>
            <thead>
              <tr className="border-b border-chamfer-paper/20">
                <th className="py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-chamfer-amber">token</th>
                <th className="py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-chamfer-amber">value</th>
                <th className="py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-chamfer-amber">applies</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.token} className="border-b border-chamfer-paper/10">
                  <td className="py-3 text-[12px] text-chamfer-paperLight">{r.token}</td>
                  <td className="py-3 text-[12px] text-chamfer-orange">{r.value}</td>
                  <td className="py-3 text-[12px] text-chamfer-paper/60">{r.applies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
