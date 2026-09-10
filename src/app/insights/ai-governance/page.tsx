import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Governance & Compliance — NDPR, EU AI Act, risk registers",
  description: "LOG_ON governance cluster for Nigerian exporters and African operators.",
  canonical: "/insights/ai-governance",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Governance & Compliance"
      href="/insights/ai-governance"
      intro="EU-style obligations and NDPR — inventory, classify, document, without freezing every pilot."
      pickSlug="eu-ai-act-compliance-consulting-2026"
    />
  );
}
