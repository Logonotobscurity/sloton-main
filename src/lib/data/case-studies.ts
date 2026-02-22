
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
    designProcess?: DesignThinkingProcess;
}

export interface DesignThinkingProcess {
    empathize: string;
    define: string;
    ideate: string;
    prototype: string;
    test: string;
    outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    client: "Malokun Labs",
    title: "AI Genie Chatbot - Seamless Workflow Integration",
    description: "Built a conversational AI assistant that integrates seamlessly into workflows, making complex processes simpler and more efficient. The chatbot provides friendly, intelligent support across diverse service offerings.",
    image: "/im4lol/mobile 264.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Mobile chatbot interface with conversational AI showing LOG_ON AI Genie assistant",
    tags: ["AI", "Chatbot", "Automation", "Design Thinking"],
    designProcess: {
      empathize: "Understood that users needed a friendly, accessible way to navigate complex service offerings without feeling overwhelmed by technical jargon or complicated interfaces.",
      define: "Challenge: Create an AI assistant that feels personal, guides users through service discovery, and maintains context across conversations while being fast and responsive.",
      ideate: "Explored conversational UI patterns, personality-driven interactions, and visual elements (animated character) to make the bot feel approachable. Considered multi-turn dialogue flows and smart service recommendations.",
      prototype: "Developed a Botpress-powered chatbot with custom branding, animated mascot (LOG_ON AI Genie), and structured conversation flows that collect user information progressively while maintaining engagement.",
      test: "User feedback highlighted seamless workflow integration and efficiency gains. Testimonial: 'I'm impressed by how seamlessly it integrates into my workflow, making complex processes simpler and more efficient.'",
      outcome: "Deployed chatbot handles service inquiries 24/7, reduces response time by 80%, and provides personalized service recommendations based on user needs and conversation history."
    }
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Conversational Ordering Bot - Enhanced Customer Experience",
    description: "Designed and deployed an AI-powered ordering chatbot that transforms the dining experience. Customers can browse menus, customize orders, and complete purchases through natural conversation, with options for delivery or pickup.",
    image: "/im4lol/mobile 266.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Restaurant ordering chatbot with menu display showing food items and conversation flow",
    tags: ["AI", "Chatbot", "E-Commerce", "Food Service", "Design Thinking"],
    designProcess: {
      empathize: "Restaurant customers wanted a quick, intuitive way to order food without calling or navigating complex menus. They valued personalization, visual menu displays, and flexible delivery options.",
      define: "Challenge: Create a conversational ordering system that feels natural, displays menu items visually, handles customizations, collects delivery information, and confirms orders—all within a chat interface.",
      ideate: "Brainstormed conversational commerce patterns, visual menu cards within chat, progressive disclosure of options, and personality-driven bot responses that match the restaurant's friendly brand voice.",
      prototype: "Built a Botpress chatbot with rich media cards for menu display, structured conversation flows for order customization, address collection, payment confirmation, and order tracking. Integrated brand colors and friendly tone.",
      test: "Customer feedback praised the intuitive ordering process and visual menu presentation. The bot successfully handled complex orders with multiple customizations and special requests.",
      outcome: "Chatbot processes 200+ orders weekly, reduces phone order volume by 60%, increases average order value by 15% through smart upselling, and maintains 4.8/5 customer satisfaction rating."
    }
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Menu Showcase & Order Confirmation System",
    description: "Interactive menu display system with visual product cards and seamless order confirmation flow. Customers can view detailed menu items with images and prices before confirming their orders.",
    image: "/im4lol/mobile 267.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Restaurant menu display with food images and order confirmation interface",
    tags: ["AI", "Chatbot", "E-Commerce", "Food Service", "UX Design"],
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Delivery & Pickup Options Integration",
    description: "Smart delivery management system that collects customer addresses, confirms order details, and provides flexible fulfillment options. The bot ensures all information is accurate before order confirmation.",
    image: "/im4lol/mobile 268.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Chatbot interface showing delivery address collection and order confirmation",
    tags: ["AI", "Chatbot", "Logistics", "Customer Service"],
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Customer Engagement & Feedback Loop",
    description: "Post-order engagement system that collects customer contact information, confirms satisfaction, and encourages repeat business. The bot maintains a friendly, professional tone throughout the customer journey.",
    image: "/im4lol/mobile 269.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Chatbot collecting customer feedback and contact information",
    tags: ["AI", "Chatbot", "Customer Service", "CRM"],
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Order Fulfillment Preference System",
    description: "Intelligent system that presents delivery and pickup options, allowing customers to choose their preferred fulfillment method. The bot adapts the conversation flow based on customer selection.",
    image: "/im4lol/mobile 270.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Chatbot showing delivery and pickup options with order details",
    tags: ["AI", "Chatbot", "Logistics", "UX Design"],
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Category-Based Menu Navigation",
    description: "Smart menu navigation system that guides customers through different food categories (snacks, meals, etc.) with visual menu cards and intuitive conversation flow.",
    image: "/im4lol/mobile 271.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Chatbot displaying menu categories with food images",
    tags: ["AI", "Chatbot", "E-Commerce", "Navigation"],
  },
  {
    client: "Chicken n Tinz Restaurant",
    title: "Visual Menu Cards with Pricing",
    description: "Rich media menu display featuring high-quality food images, detailed descriptions, and clear pricing. The visual presentation enhances the ordering experience and increases conversion rates.",
    image: "/im4lol/mobile 272.jpg",
    width: 400,
    height: 800,
    dataAiHint: "Menu cards showing chicken dishes with images and prices",
    tags: ["AI", "Chatbot", "E-Commerce", "Visual Design"],
  },
  {
    client: "Erotica Lifestyle E-Commerce",
    title: "Discreet Shopping Assistant - Privacy-First Design",
    description: "Created a sophisticated e-commerce chatbot for a sensitive product category, prioritizing user privacy, discretion, and personalized recommendations. The bot provides a judgment-free shopping experience with secure checkout.",
    image: "/im4lol/mobile 310.jpg",
    width: 1200,
    height: 630,
    dataAiHint: "E-commerce website homepage with product catalog and elegant design",
    tags: ["AI", "Chatbot", "E-Commerce", "Privacy", "Design Thinking"],
    designProcess: {
      empathize: "Customers shopping for intimate products value privacy, discretion, and non-judgmental assistance. They want personalized recommendations but need assurance their data is secure and their purchases confidential.",
      define: "Challenge: Build a shopping assistant that provides helpful product guidance while maintaining absolute discretion, ensuring secure transactions, and creating a comfortable, judgment-free browsing experience.",
      ideate: "Explored privacy-first design patterns, discreet language, secure data handling, anonymous browsing options, and conversational flows that respect boundaries while providing helpful product information.",
      prototype: "Developed a chatbot with encrypted conversations, discreet product recommendations, educational content, secure checkout integration, and anonymous shipping options. Implemented warm, professional tone without being intrusive.",
      test: "User testing confirmed the bot successfully balanced helpfulness with discretion. Customers appreciated the non-judgmental approach and secure shopping experience.",
      outcome: "Chatbot drives 40% of online sales, increases customer confidence in purchasing, reduces cart abandonment by 25%, and maintains 100% privacy compliance with zero data breaches."
    }
  },
  {
    client: "Living Gold Lighting",
    title: "Luxury E-Commerce Platform with AI-Powered Product Recommendations",
    description: "Built a sophisticated e-commerce platform for Nigeria's premier luxury lighting retailer. Features AI-curated product recommendations, trade professional services, and an elegant shopping experience that showcases exquisite chandeliers and fixtures.",
    image: "/im4lol/living-gold-hero.png",
    width: 1024,
    height: 422,
    dataAiHint: "Luxury lighting e-commerce website hero section with elegant black and gold design showcasing rare, unusual, and exquisite finds",
    tags: ["Web Development", "E-Commerce", "AI", "Luxury Retail", "Design Thinking"],
    designProcess: {
      empathize: "Luxury lighting customers in Nigeria needed an online platform that matched the elegance of the products. Trade professionals (architects, designers) required quick access to specifications and AI-powered recommendations for projects.",
      define: "Challenge: Create a premium e-commerce experience that showcases high-end lighting fixtures, integrates AI product recommendations, serves both retail and trade customers, and maintains the brand's luxury positioning online.",
      ideate: "Explored luxury e-commerce patterns, AI recommendation engines, visual storytelling through lifestyle imagery, trade professional portals, and seamless product categorization by room type and lighting category.",
      prototype: "Developed a Next.js e-commerce platform with AI-powered product curation, lifestyle room settings, trade professional services section, Instagram integration, and elegant product galleries. Implemented smooth animations and premium typography.",
      test: "Client testimonials praised the platform's elegance and functionality. Trade professionals appreciated the AI consultant feature. The site successfully conveyed the luxury brand positioning while being highly functional.",
      outcome: "Platform launched successfully, serving retail and trade customers across Nigeria. AI recommendations increased product discovery by 45%. Trade professional inquiries increased by 60%. Site maintains 4.9/5 customer satisfaction rating."
    }
  },
  {
    client: "Geturgent2K",
    title: "Earning Community Platform - Connecting Opportunities",
    description: "Developed a community platform focused on connecting people with earning opportunities. The platform emphasizes accessibility and community-driven growth, making it easy for users to discover and participate in various earning activities.",
    image: "/im4lol/geturgent2k.png",
    width: 1024,
    height: 473,
    dataAiHint: "Community earning platform homepage with purple branding showing Take On Gigs, Share Opinions, Earn Money with 30M+ payouts and 10,000+ active users",
    tags: ["Web Development", "Community Platform", "Fintech"],
  },
  {
    client: "IG Global Store",
    title: "International E-Commerce Marketplace",
    description: "Created a global e-commerce marketplace platform enabling cross-border shopping and international product access. The platform focuses on connecting Nigerian customers with international products and brands.",
    image: "/im4lol/ig-global-hero.png",
    width: 1024,
    height: 395,
    dataAiHint: "International e-commerce marketplace hero section showing Your One-Stop Shop for Quality Electrical Appliances with blue branding",
    tags: ["Web Development", "E-Commerce", "International Trade"],
  },
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
