import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI for Industries — finance, health, manufacturing, logistics",
  description: "Vertical AI plays for African operators. LOG_ON Insights.",
  canonical: "/insights/ai-industries",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI for Industries"
      href="/insights/ai-industries"
      intro="Finance, healthcare, manufacturing, logistics, public sector — risk first."
      pickSlug="ai-in-financial-services-use-cases"
    />
  );
}
