
"use client";

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { useEffect, useRef, useState } from 'react';
import { Shapes } from 'lucide-react';
import { GlowingCard } from './ui/glowing-card';


const technologies = [
    { name: 'React', icon: 'https://img.icons8.com/color/96/react-native.png', dataAiHint: "React logo", href: "https://react.dev/" },
    { name: 'Next.js', icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', dataAiHint: "Next.js logo", href: "https://nextjs.org/" },
    { name: 'TypeScript', icon: 'https://img.icons8.com/color/96/typescript.png', dataAiHint: "TypeScript logo", href: "https://www.typescriptlang.org/" },
    { name: 'Node.js', icon: 'https://img.icons8.com/color/96/nodejs.png', dataAiHint: "Node.js logo", href: "https://nodejs.org/" },
    { name: 'Python', icon: 'https://img.icons8.com/color/96/python.png', dataAiHint: "Python logo", href: "https://www.python.org/" },
    { name: 'AWS', icon: 'https://img.icons8.com/color/96/amazon-web-services.png', dataAiHint: "AWS logo", href: "https://aws.amazon.com/" },
    { name: 'Google Cloud', icon: 'https://img.icons8.com/color/96/google-cloud.png', dataAiHint: "Google Cloud logo", href: "https://cloud.google.com/" },
    { name: 'Azure', icon: 'https://img.icons8.com/color/96/microsoft-azure.png', dataAiHint: "Microsoft Azure logo", href: "https://azure.microsoft.com/" },
    { name: 'Firebase', icon: 'https://img.icons8.com/color/96/firebase.png', dataAiHint: "Firebase logo", href: "https://firebase.google.com/" },
    { name: 'Docker', icon: 'https://img.icons8.com/color/96/docker.png', dataAiHint: "Docker logo", href: "https://www.docker.com/" },
    { name: 'Kubernetes', icon: 'https://img.icons8.com/color/96/kubernetes.png', dataAiHint: "Kubernetes logo", href: "https://kubernetes.io/" },
    { name: 'Git', icon: 'https://img.icons8.com/color/96/git.png', dataAiHint: "Git logo", href: "https://git-scm.com/" },
    { name: 'Figma', icon: 'https://img.icons8.com/color/96/figma.png', dataAiHint: "Figma logo", href: "https://www.figma.com/" },
    { name: 'Tailwind CSS', icon: 'https://img.icons8.com/color/96/tailwind_css.png', dataAiHint: "Tailwind CSS logo", href: "https://tailwindcss.com/" },
    { name: 'OpenAI', icon: 'https://www.vectorlogo.zone/logos/openai/openai-icon.svg', dataAiHint: "OpenAI logo", href: "https://openai.com/" },
    { name: 'Hugging Face', icon: 'https://www.vectorlogo.zone/logos/huggingface/huggingface-icon.svg', dataAiHint: "Hugging Face logo", href: "https://huggingface.co/" },
].flatMap(el => [el, el, el, el]);


export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 24,
  speed = 20,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    if (size === 0) return; // Don't start animation until size is measured

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      // Set initial position before starting the loop
      translation.set(from);
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        'bg-background relative flex size-12 items-center justify-center rounded-full border',
        className,
      )}
    >
      <div className={cn('m-auto size-fit text-muted-foreground *:size-5', isCenter && '*:size-8')}>
        {children}
      </div>
    </div>
  );
};


export function TechStackCarousel() {
  const slider1 = technologies.slice(0, 8);
  const slider2 = technologies.slice(8, 16);
  const slider3 = technologies.slice(16, 24);

  return (
    <section className="bg-secondary/20 py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <GlowingCard className="p-8 md:p-12">
            <div className="group relative mx-auto max-w-[22rem] items-center justify-between space-y-6 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] sm:max-w-md rounded-xl">
                <div
                    role="presentation"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
                ></div>
            
            {/* Slider Row 1 */}
            <div>
                <InfiniteSlider speedOnHover={10}>
                {slider1.map((tech, index) => (
                    <IntegrationCard key={index}>
                    <Image src={tech.icon} alt={tech.name} width={20} height={20} className="size-5" />
                    </IntegrationCard>
                ))}
                </InfiniteSlider>
            </div>

            {/* Slider Row 2 */}
            <div>
                <InfiniteSlider speedOnHover={10} reverse>
                {slider2.map((tech, index) => (
                    <IntegrationCard key={index}>
                    <Image src={tech.icon} alt={tech.name} width={20} height={20} className="size-5" />
                    </IntegrationCard>
                ))}
                </InfiniteSlider>
            </div>

            {/* Slider Row 3 */}
            <div>
                <InfiniteSlider speedOnHover={10}>
                {slider3.map((tech, index) => (
                    <IntegrationCard key={index}>
                    <Image src={tech.icon} alt={tech.name} width={20} height={20} className="size-5" />
                    </IntegrationCard>
                ))}
                </InfiniteSlider>
            </div>
            </div>

            {/* Text Content */}
            <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl font-headline">
                Business Value First
            </h2>
            <p className="text-muted-foreground">
                We leverage proven, scalable technology that grows with your business. No legacy systems, no technical debt—just solutions that deliver measurable results today and adapt for tomorrow.
            </p>

            <Button variant="outline" size="sm" asChild>
                <Link href="/solutions">Explore Our Solutions</Link>
            </Button>
            </div>
        </GlowingCard>
      </div>
    </section>
  );
}
