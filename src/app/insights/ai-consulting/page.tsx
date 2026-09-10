import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Consulting — roadmaps, RFPs, TCO",
  description: "How enterprises buy AI in 2026. LOG_ON consulting cluster.",
  canonical: "/insights/ai-consulting",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Consulting"
      href="/insights/ai-consulting"
      intro="Roadmaps, BPA partners, RFPs, TCO, scoped vs seats."
      pickSlug="best-ai-roadmap-consulting-partners-2026"
    />
  );
}
