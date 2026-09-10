import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Statistics & Data — adoption, skills, spend",
  description: "LOG_ON research notes. Estimates labelled. African production gap.",
  canonical: "/insights/ai-statistics",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Statistics & Data"
      href="/insights/ai-statistics"
      intro="Adoption, skills, and spend — labelled estimates, not invented MAU."
      pickSlug="africa-ai-adoption-2026"
    />
  );
}
