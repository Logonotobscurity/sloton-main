
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrainCircuit, Zap, CircleDollarSign, Calendar, Code, GraduationCap } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import React from 'react';
import { motion } from 'framer-motion';

const faqItems = [
  {
    value: "item-1",
    question: "How quickly will I see ROI?",
    answer: "Clients typically see significant improvements in efficiency, cost reduction, and scalability. For example, our AI chatbots can reduce customer support tickets by over 30%, and our RPA solutions can save dozens of hours per week by automating manual tasks. We focus on delivering measurable ROI, which we outline in our initial <a href='/solutions' class='text-primary underline'>solutions proposal</a>.",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />
  },
  {
    value: "item-2",
    question: "How do you integrate with our existing systems?",
    answer: "Our process begins with a free AI Business Assessment to understand your goals. From there, we move to a discovery and planning phase to create a detailed project roadmap and timeline. We believe in a collaborative partnership, so you'll be involved at every stage.",
    icon: <Zap className="h-5 w-5 text-primary" />
  },
  {
      value: "item-5",
      question: "You offer a wide range of services. What is your core specialty?",
      answer: "We are strategic technology generalists. Our core specialty lies in understanding the entire digital ecosystem and how different technologies—from AI and automation to web development and data analytics—can be integrated to solve complex business problems. This allows us to create holistic solutions that specialists might miss.",
      icon: <Code className="h-5 w-5 text-primary" />
  },
  {
    value: "item-6",
    question: "Do you offer training programs for these technologies?",
    answer: "Yes, we do. We believe in empowering teams with the skills to drive innovation internally. Our <a href='/training' class='text-primary underline'>expert-led training programs</a> cover AI development, process automation, and digital transformation strategy. They are designed to provide practical, hands-on experience.",
    icon: <GraduationCap className="h-5 w-5 text-primary" />
  },
  {
    value: "item-3",
    question: "What's the typical cost and timeline?",
    answer: "Our pricing is tailored to the scope and complexity of each project. We offer project-based pricing for specific builds and monthly retainers for ongoing support and strategic guidance. We are transparent with all costs upfront. For a detailed quote, please <a href='/contact' class='text-primary underline'>contact us</a>.",
    icon: <CircleDollarSign className="h-5 w-5 text-primary" />
  },
  {
    value: "item-4",
    question: "How long does it take to implement a solution?",
    answer: "Timelines vary depending on the project. A simple chatbot might be deployed in 2-4 weeks, while a complex digital transformation project could take several months. We provide a detailed timeline in our project proposal after the initial assessment.",
    icon: <Calendar className="h-5 w-5 text-primary" />
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


export function Faq() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/20">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Have questions? We have answers. Here are some of the most common inquiries we receive from prospective partners.
          </p>
        </div>
        <motion.div 
          className="mt-12 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <motion.div key={item.value} variants={itemVariants}>
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
