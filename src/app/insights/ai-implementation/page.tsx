import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Implementation — from assessment to production",
  description: "LOG_ON playbooks: five-phase implementation, 2–4 week prototypes, 90-day pilots.",
  canonical: "/insights/ai-implementation",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Implementation"
      href="/insights/ai-implementation"
      intro="From assessment to production. Workflow first; full agents only when the path is unpredictable."
      pickSlug="ai-implementation-guide-2026"
    />
  );
}
