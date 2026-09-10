import { generateMetadata } from "@/lib/seo";
import { ClusterHub } from "@/components/insights/cluster-hub";

export const metadata = generateMetadata({
  title: "AI Automation — RPA, BPA, and agents",
  description: "LOG_ON automation cluster: pilots to production for African operators.",
  canonical: "/insights/ai-automation",
});

export default function Page() {
  return (
    <ClusterHub
      label="AI Automation"
      href="/insights/ai-automation"
      intro="RPA, BPA, and agents as a portfolio — not a renamed chatbot."
      pickSlug="ai-automation-consulting-2026"
    />
  );
}
