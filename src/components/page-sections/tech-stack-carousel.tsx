"use client";

import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as React from 'react';
import { motion } from 'framer-motion';
import { GlowingCard } from '@/components/ui/glowing-card';
import { GridBackground } from '@/components/ui/grid-background';
import { LogoImage } from '@/lib/image-utils';


const technologies = [
    { name: 'React', icon: '/images/marks/tech-react.svg', href: 'https://react.dev/' },
    { name: 'Next.js', icon: '/images/marks/tech-nextjs.svg', href: 'https://nextjs.org/' },
    { name: 'TypeScript', icon: '/images/marks/tech-typescript.svg', href: 'https://www.typescriptlang.org/' },
    { name: 'Node.js', icon: '/images/marks/tech-nodejs.svg', href: 'https://nodejs.org/' },
    { name: 'Python', icon: '/images/marks/tech-python.svg', href: 'https://www.python.org/' },
    { name: 'AWS', icon: '/images/marks/tech-aws.svg', href: 'https://aws.amazon.com/' },
    { name: 'Google Cloud', icon: '/images/marks/tech-gcp.svg', href: 'https://cloud.google.com/' },
    { name: 'Azure', icon: '/images/marks/tech-azure.svg', href: 'https://azure.microsoft.com/' },
    { name: 'Firebase', icon: '/images/marks/tech-firebase.svg', href: 'https://firebase.google.com/' },
    { name: 'Docker', icon: '/images/marks/tech-docker.svg', href: 'https://www.docker.com/' },
    { name: 'Kubernetes', icon: '/images/marks/tech-k8s.svg', href: 'https://kubernetes.io/' },
    { name: 'Git', icon: '/images/marks/tech-git.svg', href: 'https://git-scm.com/' },
    { name: 'Figma', icon: '/images/marks/tech-figma.svg', href: 'https://www.figma.com/' },
    { name: 'Tailwind CSS', icon: '/images/marks/tech-tailwind.svg', href: 'https://tailwindcss.com/' },
    { name: 'OpenAI', icon: '/images/marks/tech-openai.svg', href: 'https://openai.com/' },
    { name: 'Hugging Face', icon: '/images/marks/tech-hf.svg', href: 'https://huggingface.co/' },
];

export function TechStackCarousel() {
  return (
    <section className="bg-secondary/20 py-24 md:py-32">
      <AnimatedCodeBackground variant="tech" density="medium" />
      <div className="container mx-auto px-4 md:px-6">
        <GlowingCard className="p-8 md:p-12 relative">
            <GridBackground />
            <div 
                className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
            >
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                    {technologies.map((tech, index) => (
                        <li key={index}>
                            <a href={tech.href} target="_blank" rel="noopener noreferrer" title={tech.name}>
                                <LogoImage src={tech.icon} alt={tech.name} size="lg" />
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                    {technologies.map((tech, index) => (
                        <li key={index}>
                             <a href={tech.href} target="_blank" rel="noopener noreferrer" title={tech.name}>
                                <LogoImage src={tech.icon} alt={tech.name} size="lg" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
                <h2 className="text-balance text-3xl font-semibold md:text-4xl font-headline">
                    Business Value First
                </h2>
                <p className="text-muted-foreground">
                    We leverage proven, scalable technology that grows with your business. No legacy systems, no technical debt—just solutions that deliver measurable results today and adapt for tomorrow.
                </p>

                <div className="relative z-30 pt-4">
                  <Button variant="outline" size="lg" asChild aria-label="Explore LOG_ON solutions and services">
                      <Link href="/solutions">Explore Our Solutions</Link>
                  </Button>
                </div>
            </div>
        </GlowingCard>
      </div>
    </section>
  );
}
