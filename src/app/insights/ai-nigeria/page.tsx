import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI in Nigeria & Africa — policy, programmes, practice",
  description: "National initiatives, NDPR, Lagos operating model. LOG_ON.",
  canonical: "/insights/ai-nigeria",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI in Nigeria & Africa"
      href="/insights/ai-nigeria"
      intro="National programmes and how a Lagos practice actually works."
      pickSlug="ai-nigeria-africa-national-initiatives"
    />
  );
}
