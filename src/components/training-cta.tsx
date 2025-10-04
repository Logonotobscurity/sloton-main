
"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
    HeartHandshake,
    Globe,
    Zap,
    GraduationCap,
    ShieldQuestion,
    Lightbulb,
    Award,
    BookOpen,
    TrendingUp,
    Users,
    Check
} from "lucide-react";


const features = [
  {
    Icon: GraduationCap,
    name: "Build Skills That Deliver Immediate ROI",
    description: "Learn practical, actionable knowledge you can implement immediately to drive efficiency and growth in your organization.",
    href: "/training",
    cta: "Explore Courses",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-2",
    content: (
        <ul className="space-y-3 mt-4">
            {[
                { icon: <Award className="h-4 w-4 text-primary" />, text: 'Industry Expert Instructors' },
                { icon: <BookOpen className="h-4 w-4 text-primary" />, text: 'Hands-on Projects' },
                { icon: <TrendingUp className="h-4 w-4 text-primary" />, text: 'Career Support' },
                { icon: <Users className="h-4 w-4 text-primary" />, text: 'Community-Driven Learning' },
            ].map(item => (
                <li key={item.text} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                </li>
            ))}
        </ul>
    )
  },
  {
    Icon: ShieldQuestion,
    name: "Reducing Support Costs with AI",
    description: "Learn to build private AI assistants using your company documents to revolutionize support.",
    href: "/training",
    cta: "Learn More",
    className: "md:col-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Lightbulb,
    name: "AI for Business Growth: Practical Implementation",
    description: "A comprehensive overview of AI types and their practical applications.",
    href: "/training",
    cta: "Learn More",
    className: "md:col-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: HeartHandshake,
    name: "Making Mental Health Support More Accessible",
    description: "An AI mental health chatbot designed to provide compassionate, accessible, and confidential support.",
    href: "/training#impact",
    cta: "See Our Projects",
    className: "md:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Globe,
    name: "Building AI That Understands Diverse Cultures",
    description: "A research project and toolkit for identifying and mitigating cultural bias in AI models.",
    href: "/training#impact",
    cta: "See Our Projects",
    className: "md:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
   {
    Icon: Zap,
    name: "Gigpilot: AI Gig Economy Assistant",
    description: "An AI-powered tool to convert job seekers into engaged users through intelligent job matching.",
    href: "/training#impact",
    cta: "See Our Projects",
    className: "md:col-span-2 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-4",
  },
];

export function TrainingCTA() {
  return (
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div 
            role="presentation"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
          />
          <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                    <p className="text-sm font-normal uppercase tracking-widest text-primary">04/ Community & Learning</p>
                    <h2 className="font-headline text-[clamp(2rem,5vw,3rem)] font-bold !leading-snug">
                        Building <span className="text-primary">skills</span> and connecting Advantages through <span className="text-primary">community</span>.
                    </h2>
                    <p className="text-muted-foreground md:text-lg">
                        We believe in building more than just technology; we're dedicated to building skills, fostering leadership, and making a positive community impact. Explore our training programs and our commitment to ethical innovation.
                    </p>
                </div>
              <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 lg:grid-rows-3 mt-12 md:mt-16 auto-rows-auto lg:auto-rows-[22rem]">
                  {features.map((feature) => (
                      <BentoCard key={feature.name} {...feature} />
                  ))}
              </BentoGrid>
          </div>
    </section>
  );
}
