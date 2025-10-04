
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
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { BottomCta } from "@/components/bottom-cta";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SolutionRecommendationForm } from "@/components/solution-recommendation-form";


export const metadata: Metadata = {
  title: "Technology Solutions | Custom AI, Automation & Development",
  description:
    "Explore LOG_ON's comprehensive suite of technology solutions, including custom AI, process automation, web development, and business analytics, designed to drive efficiency and growth.",
};

const services = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
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
    icon: <Zap className="h-8 w-8 text-primary" />,
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
    icon: <Code className="h-8 w-8 text-primary" />,
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
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
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
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
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
    icon: <Database className="h-8 w-8 text-primary" />,
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

const industryApplications = [
    {
        icon: <Landmark className="h-8 w-8 text-primary" />,
        industry: "Finance & Banking",
        challenge: "Financial institutions face immense pressure to detect fraud in real-time, comply with strict regulations, and reduce the high costs of manual back-office operations like loan processing and compliance reporting.",
        solution: "We integrate **AI Solutions** and **Process Automation** to solve this. Our AI models analyze transaction patterns to detect and flag fraudulent activity with over 99% accuracy. Simultaneously, our RPA bots automate the extraction and validation of data for loan applications and compliance reports, reducing processing time by up to 70%.",
        cta: {
            text: "View Case Study",
            href: "/use-cases"
        }
    },
    {
        icon: <HeartPulse className="h-8 w-8 text-primary" />,
        industry: "Healthcare",
        challenge: "Healthcare providers are burdened with administrative tasks, from patient scheduling and billing to managing vast amounts of unstructured patient data, leading to staff burnout and inefficient patient care.",
        solution: "Our **Chatbots & Virtual Assistants** streamline patient communication by automating appointment scheduling and answering common queries. We couple this with **AI Solutions** (NLP) to extract critical information from clinical notes, helping to automate medical coding and provide clinicians with faster access to patient histories, ultimately improving the quality of care.",
        cta: {
            text: "View Case Study",
            href: "/use-cases"
        }
    },
    {
        icon: <ShoppingCart className="h-8 w-8 text-primary" />,
        industry: "E-Commerce",
        challenge: "Online retailers struggle to provide personalized shopping experiences at scale, leading to high cart abandonment rates and missed revenue opportunities. Managing customer queries about order status and returns further strains support teams.",
        solution: "We combine **Business Analytics** with **Web & Custom Development** to build intelligent e-commerce platforms. Our analytics dashboards track user behavior to identify drop-off points, while our custom recommendation engines (powered by our AI models) personalize the shopping experience. An integrated AI chatbot handles over 60% of order-related inquiries, freeing up support staff.",
        cta: {
            text: "View Case Study",
            href: "/use-cases"
        }
    }
];

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <PageHero 
        title="Turn Your Biggest Challenges into Growth Opportunities"
        description="We don't just build solutions; we architect results. Discover how our integrated AI and automation services can transform your business, streamline operations, and unlock new value."
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">Get Your Free AI Assessment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Free AI Business Assessment</DialogTitle>
                        <DialogDescription>
                        Describe your business needs to receive tailored IT solution recommendations from our AI consultant.
                        </DialogDescription>
                    </DialogHeader>
                    <SolutionRecommendationForm />
                </DialogContent>
            </Dialog>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Schedule a Free Consultation</Link>
            </Button>
        </div>
      </PageHero>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-20">
        
        {/* Core Services Section */}
        <div className="space-y-16">
            {services.map((service) => (
                <section key={service.id} id={service.id} className="scroll-mt-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="lg:sticky top-24">
                           <div className="flex items-center gap-4 mb-4">
                                {service.icon}
                                <h2 className="text-3xl md:text-4xl font-bold font-headline">{service.title}</h2>
                           </div>
                           <p className="text-muted-foreground md:text-lg">{service.description}</p>
                           <Button asChild className="mt-6">
                               <Link href={service.cta.href}>
                                   {service.cta.text} <ArrowRight className="ml-2 h-4 w-4"/>
                               </Link>
                           </Button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">Key Capabilities</h3>
                                <ul className="space-y-2">
                                    {service.capabilities.map(cap => (
                                        <li key={cap} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{cap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">Business Benefits</h3>
                                <ul className="space-y-2">
                                    {service.benefits.map(benefit => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>

        {/* Solutions Audit Section */}
        <section className="py-16 md:py-24 bg-secondary/20 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 sm:rounded-2xl">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                             <Search className="h-8 w-8 text-primary" />
                             <h2 className="text-3xl md:text-4xl font-bold font-headline">The LOG_ON Solutions Audit</h2>
                        </div>
                        <p className="text-muted-foreground md:text-lg">Before we build, we analyze. Our process begins with a comprehensive audit of your existing digital ecosystem—from your main page and sub-pages to your navigation flows. We map out user journeys and data pathways to identify critical opportunities for optimization.</p>
                        <p className="text-muted-foreground md:text-lg">This strategic approach ensures that any solution we implement is perfectly aligned with your business goals and has a clearly defined path to delivering a return on investment. We don't guess; we provide a data-driven roadmap to success.</p>
                    </div>
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>Your Free AI Business Assessment</CardTitle>
                            <CardDescription>Our audit process starts here. Answer a few questions about your business, and our AI consultant will generate a high-level report identifying your top opportunities for automation and digital transformation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/contact?subject=AI+Business+Assessment">
                                    Get Your Free Assessment <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        {/* Industry Applications Section */}
        <section>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Industry-Specific Solutions</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground">We apply our core services to solve the unique challenges of your industry, turning complex problems into growth opportunities.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industryApplications.map(app => (
                    <Card key={app.industry} className="bg-background/50 flex flex-col">
                        <CardHeader>
                            <div className="flex items-start gap-4 mb-2">
                                <div className="flex-shrink-0">{app.icon}</div>
                                <div className="flex-1">
                                    <CardTitle className="text-xl leading-snug">{app.industry}</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-destructive">{app.challenge}</p>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <div className="flex-grow">
                                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: app.solution.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') }} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href={app.cta.href}>{app.cta.text}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>

      </div>
      <BottomCta />
    </div>
  );
}
