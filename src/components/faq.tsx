"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrainCircuit, CircleDollarSign, Calendar, GraduationCap, ShieldCheck, Scale } from "lucide-react";
import Script from "next/script";
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerCustom, fadeInLeft } from '@/lib/animation-variants';

const faqItems = [
  {
    value: "item-1",
    question: "How can AI realistically be integrated into my non-tech business?",
    answer: "The best starting point is to identify repetitive, data-heavy tasks. Our free <a href='/solutions' class='text-primary underline'>AI Business Assessment</a> helps you pinpoint these opportunities. We often begin with an AI-powered chatbot to handle customer inquiries or an automation tool to streamline your reporting. These are low-risk, high-impact solutions that deliver immediate value.",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />
  },
  {
    value: "item-2",
    question: "What is the real ROI of investing in automation?",
    answer: "ROI comes in two forms: cost savings and growth opportunities. Automation directly cuts costs by reducing man-hours spent on manual tasks and eliminating human error. More importantly, it frees up your team to focus on strategic work like customer relationships and product innovation, which drives sustainable growth. Clients often see a return within the first 6-9 months.",
    icon: <CircleDollarSign className="h-5 w-5 text-primary" />
  },
  {
    value: "item-3",
    question: "How do you ensure the security and privacy of my business data?",
    answer: "Data security is at the core of our architecture. We adhere to strict data privacy principles and build on world-class cloud infrastructure like AWS and Google Cloud. All solutions include encryption, access control, and audit logging to protect your data and ensure you meet industry compliance standards. You can learn more about our commitment on our <a href='/about#trust' class='text-primary underline'>Trust & Compliance</a> section.",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />
  },
  {
    value: "item-4",
    question: "We're a small team. Are these solutions too complex or expensive for us?",
    answer: "Not at all. Our core mission is to make powerful technology accessible. We specialize in creating scalable, cost-effective solutions tailored for small to medium-sized businesses. We focus on a phased approach, starting with a solution that addresses your most pressing need and can grow with you.",
    icon: <Scale className="h-5 w-5 text-primary" />
  },
  {
    value: "item-5",
    question: "What does the implementation process look like, and how long does it take?",
    answer: "A simple chatbot can be deployed in 2-4 weeks, while a custom development project may take a few months. Our process is transparent and collaborative, starting with a deep-dive analysis of your needs, followed by a clear project roadmap with defined milestones. You're involved at every stage to ensure the final solution is perfectly aligned with your goals.",
    icon: <Calendar className="h-5 w-5 text-primary" />
  },
  {
      value: "item-6",
      question: "Do my employees need to be technical to use these tools?",
      answer: "No. We design our solutions with the end-user in mind, focusing on intuitive interfaces and seamless workflows. We also provide comprehensive <a href='/training' class='text-primary underline'>training and support</a> to ensure your team feels confident and empowered by the new technology, not intimidated by it.",
      icon: <GraduationCap className="h-5 w-5 text-primary" />
  },
  {
      value: "item-7",
      question: "What is Generative Engine Optimization (GEO) and how is it different from SEO?",
      answer: "Traditional SEO optimizes your site for search engines like Google, which rank pages with links. GEO (Generative Engine Optimization) ensures that AI models like ChatGPT, Perplexity, and Google Gemini accurately represent your brand when users ask questions. Unlike SEO, GEO is about creating structured, authoritative content that LLMs can understand and cite. LOG_ON Solutions specializes in both — read our guide on <a href='/insights/seo-vs-geo-invisible-in-ai-search' class='text-primary underline'>SEO vs GEO</a>.",
      icon: <BrainCircuit className="h-5 w-5 text-primary" />
  },
  {
      value: "item-8",
      question: "How can AI-powered search engines like ChatGPT or Gemini learn about my business?",
      answer: "AI models are trained on publicly available web content, structured data (schema.org JSON-LD), and increasingly on files like <a href='/insights/why-llms-txt-matters-for-seo' class='text-primary underline'>llms.txt</a>. To be cited accurately, your website needs clear, factual content, properly structured data, and consistent brand signals across the web. LOG_ON Solutions's <a href='/contact' class='text-primary underline'>free AI Business Assessment</a> includes a GEO readiness audit to help your brand show up in AI answers.",
      icon: <BrainCircuit className="h-5 w-5 text-primary" />
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer.replace(/<[^>]*>/g, '') // strip HTML for schema
    }
  }))
};

export { Faq };

export default function Faq() {
  return (
    <section id="faq" className="py-fluid-lg bg-secondary/20">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-fluid-sm">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-fluid-lg font-bold font-headline">Frequently Asked Questions</h2>
          <p className="mt-4 text-fluid-base text-muted-foreground">
            Have questions? We have answers. Here are some of the most common inquiries we receive from prospective partners.
          </p>
        </div>
        <motion.div 
          className="mt-12 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerCustom(0.1, 0)}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <motion.div key={item.value} variants={fadeInLeft}>
                <AccordionItem value={item.value}>
                  <AccordionTrigger className="text-left text-base md:text-lg">
                    <div className="flex items-start md:items-center gap-4">
                      <div className="flex-shrink-0 pt-1 md:pt-0">{item.icon}</div>
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="text-muted-foreground pl-10 md:pl-12 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
