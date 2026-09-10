import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Training & Education — by persona",
  description: "Exec, operator, builder, counsel. LOG_ON training cluster.",
  canonical: "/insights/ai-training",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Training & Education"
      href="/insights/ai-training"
      intro="Persona-based programmes. No go-live without operator training."
      pickSlug="best-ai-training-companies-by-persona-2026"
    />
  );
}
