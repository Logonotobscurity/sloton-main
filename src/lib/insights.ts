
import imageData from '@/lib/placeholder-images.json';

export interface Insight {
    title: string;
    slug: string;
    description: string;
    image: string;
    width: number;
    height: number;
    dataAiHint: string;
    tags: string[];
    author: string;
    date: string;
}

export const insights: Insight[] = [
   {
    title: "Why llms.txt Matters for Modern SEO",
    slug: "why-llms-txt-matters-for-seo",
    description: "Learn how the llms.txt file is becoming a key tool for helping websites communicate effectively with large language models and improve SEO.",
    image: imageData.llmsTxtFile.src,
    width: imageData.llmsTxtFile.width,
    height: imageData.llmsTxtFile.height,
    dataAiHint: imageData.llmsTxtFile.dataAiHint,
    tags: ["SEO", "AI", "Technical SEO"],
    author: "Oluwamayowa Logo",
    date: "2025-08-19"
  },
  {
    title: "10 Content Formats That Get Picked Up by LLMs",
    slug: "10-content-formats-that-get-picked-up-by-llms",
    description: "Discover how to structure your content to improve visibility in AI-powered search engines and ensure your key information is accurately represented.",
    image: imageData.aiContentFormats.src,
    width: imageData.aiContentFormats.width,
    height: imageData.aiContentFormats.height,
    dataAiHint: imageData.aiContentFormats.dataAiHint,
    tags: ["AI", "SEO", "Content Strategy"],
    author: "Favour Alfred",
    date: "2025-08-11"
  },
  {
    title: "SEO vs GEO: Why Your Content Might Be Invisible in AI Search",
    slug: "seo-vs-geo-invisible-in-ai-search",
    description: "Learn the difference between traditional SEO and Generative Engine Optimization (GEO) and discover the strategies that actually work for AI-driven search engines.",
    image: imageData.seoVsGeo.src,
    width: imageData.seoVsGeo.width,
    height: imageData.seoVsGeo.height,
    dataAiHint: imageData.seoVsGeo.dataAiHint,
    tags: ["SEO", "GEO", "AI Search", "Content Strategy"],
    author: "Favour Alfred",
    date: "2025-04-14"
  },
  {
    title: "My AI Investment Playbook: The No-BS Edition 🚀",
    slug: "ai-investment-playbook",
    description: "I've been doubling down on AI stocks lately, and honestly? It's been a wild ride—but the good kind. Here's exactly what I'm holding and why.",
    image: imageData.stockMarketChart.src,
    width: imageData.stockMarketChart.width,
    height: imageData.stockMarketChart.height,
    dataAiHint: imageData.stockMarketChart.dataAiHint,
    tags: ["AI", "Investing", "Technology", "Stocks"],
    author: "Oluwamayowa Logo",
    date: "2024-08-21"
  },
  {
    title: "Transforming Customer Support with AI",
    slug: "transforming-customer-support-with-ai",
    description: "Learn how to leverage your organization's existing documents and SOPs to build private AI support tools that revolutionize your internal support systems.",
    image: imageData.customerSupportAi.src,
    width: imageData.customerSupportAi.width,
    height: imageData.customerSupportAi.height,
    dataAiHint: imageData.customerSupportAi.dataAiHint,
    tags: ["AI", "Training", "Customer Support"],
    author: "Oluwamayowa Logo",
    date: "2024-08-20"
  },
  {
    title: "Quick Start to Prompt Engineering for Developers",
    slug: "prompt-engineering-for-developers",
    description: "Discover how prompt engineering can supercharge your coding skills and development processes. Learn to automate tasks, generate code, and build more effective AI-driven solutions.",
    image: imageData.codeOnScreen.src,
    width: imageData.codeOnScreen.width,
    height: imageData.codeOnScreen.height,
    dataAiHint: imageData.codeOnScreen.dataAiHint,
    tags: ["AI", "Training", "Development", "Prompt Engineering"],
    author: "Oluwamayowa Logo",
    date: "2024-08-19"
  },
  {
    title: "Building Recommendation Systems with Python",
    slug: "building-recommendation-systems",
    description: "Take a deep dive into building and deploying scalable recommendation models using Python, Pandas, and Pinecone to create personalized user experiences.",
    image: imageData.abstractDataNetwork.src,
    width: imageData.abstractDataNetwork.width,
    height: imageData.abstractDataNetwork.height,
    dataAiHint: imageData.abstractDataNetwork.dataAiHint,
    tags: ["AI", "Training", "Python", "Data Science"],
    author: "Favour Alfred",
    date: "2024-08-18"
  },
  {
    title: "AI Insights: A Practical Guide",
    slug: "ai-insights-a-practical-guide",
    description: "A comprehensive overview of AI types, from ANI to ASI, and their practical applications across different industries. Understand the core principles of AI strategy.",
    image: imageData.glowingAiBrain.src,
    width: imageData.glowingAiBrain.width,
    height: imageData.glowingAiBrain.height,
    dataAiHint: imageData.glowingAiBrain.dataAiHint,
    tags: ["AI", "Training", "Strategy"],
    author: "Oluwamayowa Logo",
    date: "2024-08-17"
  },
  {
    title: "Prompt Engineering for Business Users",
    slug: "prompt-engineering-for-business",
    description: "Learn how to harness prompt engineering skills for ChatGPT and GPT-4 to boost productivity, supercharge communications, and revolutionize business processes.",
    image: imageData.professionalsMeeting.src,
    width: imageData.professionalsMeeting.width,
    height: imageData.professionalsMeeting.height,
    dataAiHint: imageData.professionalsMeeting.dataAiHint,
    tags: ["AI", "Training", "Business", "Prompt Engineering"],
    author: "Favour Alfred",
    date: "2024-08-16"
  },
  {
    title: "The Future of Work: How AI is Redefining Productivity",
    slug: "future-of-work-ai",
    description: "Explore the transformative impact of artificial intelligence on modern workplaces and how businesses can adapt.",
    image: imageData.futuristicAiTech.src,
    width: imageData.futuristicAiTech.width,
    height: imageData.futuristicAiTech.height,
    dataAiHint: imageData.futuristicAiTech.dataAiHint,
    tags: ["AI", "Future of Work"],
    author: "Oluwamayowa Logo",
    date: "2024-08-15"
  },
  {
    title: "Unlocking Efficiency: A Guide to Business Process Automation",
    slug: "guide-to-business-process-automation",
    description: "A deep dive into the strategies and technologies behind successful automation implementation.",
    image: imageData.workflowAutomation.src,
    width: imageData.workflowAutomation.width,
    height: imageData.workflowAutomation.height,
    dataAiHint: imageData.workflowAutomation.dataAiHint,
    tags: ["Automation", "Strategy"],
    author: "Favour Alfred",
    date: "2024-08-10"
  },
  {
    title: "Scaling Securely: Best Practices for Cloud Infrastructure",
    slug: "scaling-securely-cloud-infrastructure",
    description: "Learn how to build a robust and secure cloud foundation that scales with your business needs.",
    image: imageData.cloudSecurity.src,
    width: imageData.cloudSecurity.width,
    height: imageData.cloudSecurity.height,
    dataAiHint: imageData.cloudSecurity.dataAiHint,
    tags: ["Cloud", "Security"],
    author: "Oluwamayowa Logo",
    date: "2024-08-05"
  },
  {
    title: "The Rise of No Code and Low Code Platforms in Nigeria",
    slug: "no-code-low-code-nigeria",
    description: "How visual development tools are empowering a new generation of creators and entrepreneurs.",
    image: imageData.visualProgramming.src,
    width: imageData.visualProgramming.width,
    height: imageData.visualProgramming.height,
    dataAiHint: imageData.visualProgramming.dataAiHint,
    tags: ["No-Code", "Innovation", "Nigeria"],
    author: "Favour Alfred",
    date: "2024-07-28"
  },
  {
    title: "Cybersecurity in the Age of AI: Threats and Opportunities",
    slug: "cybersecurity-ai-threats-opportunities",
    description: "An overview of how AI is being used to both perpetrate and prevent cyber attacks.",
    image: imageData.cyberSecurityLock.src,
    width: imageData.cyberSecurityLock.width,
    height: imageData.cyberSecurityLock.height,
    dataAiHint: imageData.cyberSecurityLock.dataAiHint,
    tags: ["Cybersecurity", "AI"],
    author: "Oluwamayowa Logo",
    date: "2024-07-22"
  },
   {
    title: "Data Driven Decisions: A Primer on Business Analytics",
    slug: "primer-on-business-analytics",
    description: "Learn how to leverage data to make smarter, faster, and more effective business decisions.",
    image: imageData.dataAnalyticsDashboard.src,
    width: imageData.dataAnalyticsDashboard.width,
    height: imageData.dataAnalyticsDashboard.height,
    dataAiHint: imageData.dataAnalyticsDashboard.dataAiHint,
    tags: ["Data", "Analytics", "BI"],
    author: "Favour Alfred",
    date: "2024-07-15"
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
