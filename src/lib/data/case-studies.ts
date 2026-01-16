
import imageData from '@/lib/placeholder-images.json';

export interface CaseStudy {
    client: string;
    title: string;
    description: string;
    image: string;
    width: number;
    height: number;
    dataAiHint: string;
    tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    client: "Global E-Commerce Brand",
    title: "30% Fewer Support Tickets, 15+ Hours Weekly Saved",
    description: "We implemented intelligent chat support that handles most customer questions automatically. Their team now focuses on complex issues while customer satisfaction scores jumped significantly.",
    image: imageData.supportChatbot.src,
    width: imageData.supportChatbot.width,
    height: imageData.supportChatbot.height,
    dataAiHint: imageData.supportChatbot.dataAiHint,
    tags: ["AI", "Chatbot", "E-Commerce", "Customer Support"],
  },
  {
    client: "Nigerian Financial Services Firm",
    title: "40+ Hours Weekly Reclaimed from Compliance Reports",
    description: "A financial firm was overwhelmed by manual reporting. We built automated systems that eliminated errors and gave them back an entire work week every month for strategic planning.",
    image: imageData.financialData.src,
    width: imageData.financialData.width,
    height: imageData.financialData.height,
    dataAiHint: imageData.financialData.dataAiHint,
    tags: ["Automation", "Finance", "Analytics"],
  },
  {
    client: "Healthcare Tech Startup",
    title: "Platform Scales to Handle 5x Growth Seamlessly",
    description: "When rapid expansion threatened their stability, we built a foundation that grows with them—handling massive user growth without performance issues or downtime.",
    image: imageData.cloudInfrastructure.src,
    width: imageData.cloudInfrastructure.width,
    height: imageData.cloudInfrastructure.height,
    dataAiHint: imageData.cloudInfrastructure.dataAiHint,
    tags: ["Cloud", "Scalability", "Healthcare", "Database"],
  },
  {
    client: "SAAS Provider",
    title: "Custom Analytics Dashboard Drives Product Strategy",
    description: "We developed a custom business intelligence dashboard that consolidated data from multiple sources, giving the product team a 360-degree view of user behavior and churn indicators. This led to a data-driven roadmap that increased user retention by 20%.",
    image: imageData.analyticsDashboard.src,
    width: imageData.analyticsDashboard.width,
    height: imageData.analyticsDashboard.height,
    dataAiHint: imageData.analyticsDashboard.dataAiHint,
    tags: ["Analytics", "BI", "Database"],
  },
  {
    client: "Major Online Publisher",
    title: "Website Relaunch Leads to 50% Increase in Ad Revenue",
    description: "We executed a full-stack web development project to relaunch a high-traffic news portal. The new, blazing-fast website platform improved page load times by 70%, leading to better ad viewability and a significant boost in programmatic ad revenue.",
    image: imageData.newsWebsite.src,
    width: imageData.newsWebsite.width,
    height: imageData.newsWebsite.height,
    dataAiHint: imageData.newsWebsite.dataAiHint,
    tags: ["Web Development", "Publisher"],
  },
];
