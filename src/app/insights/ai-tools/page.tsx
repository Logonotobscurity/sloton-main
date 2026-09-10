import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Tools & Technology — stacks that survive African ops",
  description: "Models, orchestration, WhatsApp. LOG_ON tools cluster.",
  canonical: "/insights/ai-tools",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Tools & Technology"
      href="/insights/ai-tools"
      intro="Stacks that survive FX, latency, residency, and WhatsApp."
      pickSlug="best-ai-tools-nigerian-african-enterprises-2026"
    />
  );
}
