
import {
  BrainCircuit,
  Zap,
  Code,
  MessageSquare,
  BarChart3,
  Database,
  Search,
  Landmark,
  HeartPulse,
  ShoppingCart,
} from "lucide-react";

export const services = [
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    id: "ai-solutions",
    description: "We design and deploy custom AI and machine learning models that integrate seamlessly into your operations to solve your most complex challenges. By transforming your data into a strategic asset, we help you uncover insights, automate decisions, and gain a significant competitive edge.",
    capabilities: [
      "Custom Machine Learning Model Development (Predictive Analytics, Recommendation Engines)",
      "Natural Language Processing (NLP) for Text Analysis and Understanding",
      "Computer Vision for Image and Video Data Interpretation",
      "Generative AI for Content Creation and Automation",
    ],
    benefits: [
      "Increase predictive accuracy by up to 40%",
      "Automate complex decision-making processes",
      "Unlock new insights from unstructured data",
      "Create personalized customer experiences at scale",
    ],
    cta: {
      text: "Request a Custom AI Model Demo",
      href: "/contact?subject=AI+Model+Demo"
    },
  },
  {
    icon: Zap,
    title: "Process Automation",
    id: "process-automation",
    description: "Our intelligent automation and Robotic Process Automation (RPA) solutions are designed to eliminate repetitive, manual tasks across your organization. We map your existing workflows, identify bottlenecks, and deploy bots and AI agents to execute tasks with speed and precision, freeing up your team to focus on high-value work.",
    capabilities: [
      "Robotic Process Automation (RPA) for Repetitive Task Execution",
      "AI-Powered Workflow Design and Optimization",
      "Integration with Existing Systems (CRM, ERP)",
      "Automated Data Entry, Extraction, and Reconciliation",
    ],
    benefits: [
      "Reduce operational costs by up to 30%",
      "Eliminate human error in data processing",
      "Increase process speed and throughput by over 50%",
      "Improve employee satisfaction by removing tedious tasks",
    ],
    cta: {
      text: "Get a Free Automation Assessment",
      href: "/contact?subject=Automation+Assessment"
    },
  },
  {
    icon: Code,
    title: "Web & Custom Development",
    id: "web-development",
    description: "We build scalable, secure, and high-performance web platforms and custom applications that serve as the backbone of your digital presence. From sophisticated e-commerce stores to data-intensive enterprise applications, our solutions are built with modern, future-proof technologies like Next.js and React.",
    capabilities: [
      "Scalable E-Commerce Platform Development",
      "Custom Enterprise Web Applications",
      "Headless CMS and API-First Architectures",
      "Performance Optimization and Security Hardening",
    ],
    benefits: [
      "Achieve sub-second page load times",
      "Handle high-traffic events with zero downtime",
      "Integrate seamlessly with third-party services",
      "Own a flexible, custom platform that grows with you",
    ],
    cta: {
      text: "Start Your Custom Web Project",
      href: "/contact?subject=Web+Development+Project"
    },
  },
  {
    icon: MessageSquare,
    title: "Chatbots & Virtual Assistants",
    id: "chatbots",
    description: "Engage every customer, 24/7, with intelligent, AI-powered conversational agents. We design and build chatbots that integrate with your website, WhatsApp, and other platforms to automate customer service, qualify leads, and even drive sales while your team sleeps.",
    capabilities: [
      "24/7 AI-Powered Customer Support Agents",
      "Automated Lead Qualification and Sales Funnels",
      "Integration with CRM and Backend Systems",
      "Multi-platform Deployment (Web, WhatsApp, Messenger)",
    ],
    benefits: [
      "Reduce customer support response times by over 90%",
      "Increase lead capture rates by up to 40%",
      "Provide consistent, accurate answers 24/7",
      "Free up human agents for high-value interactions",
    ],
    cta: {
      text: "Build Your AI Chatbot",
      href: "/contact?subject=Chatbot+Development"
    },
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    id: "business-analytics",
    description: "We transform your raw data into actionable, strategic insights. Our team designs and builds custom, interactive dashboards and BI reports that provide a clear, real-time view of your business performance. Move from simply collecting data to actively using it to drive growth, optimize operations, and make confident decisions.",
    capabilities: [
      "Custom Interactive Dashboards (Power BI, Tableau)",
      "Automated Business Intelligence (BI) Reporting",
      "Key Performance Indicator (KPI) Tracking and Analysis",
      "Data Integration from Multiple Sources",
    ],
    benefits: [
      "Gain a single, unified view of your business health",
      "Identify trends and opportunities faster",
      "Improve decision-making speed and accuracy",
      "Foster a data-driven culture across your organization",
    ],
    cta: {
      text: "Request a Dashboard Demo",
      href: "/contact?subject=Dashboard+Demo"
    },
  },
  {
    icon: Database,
    title: "Database Solutions",
    id: "database-solutions",
    description: "Your data is your most valuable asset; its foundation must be rock-solid. We design, build, and manage secure, scalable, and high-performance database systems (both SQL and NoSQL). From architecture and cloud migration to performance tuning and security, we ensure your data infrastructure is a competitive advantage, not a bottleneck.",
    capabilities: [
      "Scalable SQL & NoSQL Database Architecture",
      "Cloud Data Migration and Integration (AWS, Google Cloud)",
      "Database Performance Tuning and Optimization",
      "Data Security, Compliance, and Governance",
    ],
    benefits: [
      "Ensure 99.99% data availability and reliability",
      "Improve application response times with optimized queries",
      "Scale your data infrastructure to handle millions of users",
      "Protect sensitive data and meet compliance standards (GDPR, etc.)",
    ],
    cta: {
      text: "Schedule a Database Consultation",
      href: "/contact?subject=Database+Consultation"
    },
  },
];

export const industryApplications = [
    {
        icon: Landmark,
        industry: "Finance & Banking",
        challenge: "Financial institutions face immense pressure to detect fraud in real-time, comply with strict regulations, and reduce the high costs of manual back-office operations like loan processing and compliance reporting.",
        solution: "We integrate **AI Solutions** and **Process Automation** to solve this. Our AI models analyze transaction patterns to detect and flag fraudulent activity with over 99% accuracy. Simultaneously, our RPA bots automate the extraction and validation of data for loan applications and compliance reports, reducing processing time by up to 70%.",
        cta: {
            text: "View Case Study",
            href: "/use-cases"
        }
    },
    {
        icon: HeartPulse,
        industry: "Healthcare",
        challenge: "Healthcare providers are burdened with administrative tasks, from patient scheduling and billing to managing vast amounts of unstructured patient data, leading to staff burnout and inefficient patient care.",
        solution: "Our **Chatbots & Virtual Assistants** streamline patient communication by automating appointment scheduling and answering common queries. We couple this with **AI Solutions** (NLP) to extract critical information from clinical notes, helping to automate medical coding and provide clinicians with faster access to patient histories, ultimately improving the quality of care.",
        cta: {
            text: "View Case Study",
            href: "/use-cases"
        }
    },
    {
        icon: ShoppingCart,
        industry: "E-Commerce",
        challenge: "Online retailers struggle to provide personalized shopping experiences at scale, leading to high cart abandonment rates and missed revenue opportunities. Managing customer queries about order status and returns further strains support teams.",
        solution: "We combine **Business Analytics** with **Web & Custom Development** to build intelligent e-commerce platforms. Our analytics dashboards track user behavior to identify drop-off points, while our custom recommendation engines (powered by our AI models) personalize the shopping experience. An integrated AI chatbot handles over 60% of order-related inquiries, freeing up support staff.",
        cta: {
            text: "View Case Study",
            href: "/use-cases"
        }
    }
];
