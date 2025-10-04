'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import styles from './tech-stack.module.css';
import { useUIStore } from '@/stores/ui-store';

interface TechStackItem {
  name: string;
  src: string;
}

const techStackData: TechStackItem[] = [
  {
    name: 'Google Meet',
    src: '/techstack assets/64942675411fec0ff9ddd101_Google_Meet_icon_(2020).png',
  },
  {
    name: 'Microsoft Teams',
    src: '/techstack assets/64942675e4949b66bda530c3_mi462me99-microsoft-teams-logo-microsoft-teams.png',
  },
  {
    name: 'Webflow',
    src: '/techstack assets/64942676411fec0ff9ddd398_Webflow (2).png',
  },
  {
    name: 'Outlook',
    src: '/techstack assets/6494267742fa10094f3e63e1_file-microsoft-office-outlook-logo-present-svg-wikipedia-1.png',
  },
  {
    name: 'Slack',
    src: '/techstack assets/64942678eaf0cb93c0651bf7_Slack.png',
  },
  {
    name: 'Zoom',
    src: '/techstack assets/6494267940a47641d75f8b6a_zoom-logo-in-blue-colors-meetings-app-logotype-free-png.png',
  },
  {
    name: 'Mail',
    src: '/techstack assets/6494267b63b5e98441dc9282_Mail.png',
  },
  {
    name: 'Collaborations',
    src: '/techstack assets/collabotions.png',
  },
  {
    name: 'Section',
    src: '/techstack assets/section.webp',
  }
];

export function TechStack() {
  const { techStackScrollPosition, techStackAutoScroll, setTechStackScrollPosition, setTechStackAutoScroll } = useUIStore();

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      if (techStackAutoScroll) {
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= interval) {
          setTechStackScrollPosition((prev) => (prev + 0.5) % (100 * techStackData.length));
          lastTime = currentTime;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [techStackAutoScroll, setTechStackScrollPosition]);

  return (
    <section 
      className="py-12 bg-background overflow-hidden"
      onMouseEnter={() => setTechStackAutoScroll(false)}
      onMouseLeave={() => setTechStackAutoScroll(true)}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Technology Stack
        </h2>
        <div className="relative w-full">
          <div 
            className={styles.carousel}
            style={{
              '--translate-x': `-${techStackScrollPosition}%`,
              '--carousel-width': `${200 * techStackData.length}%`
            } as React.CSSProperties}
          >
            {/* First set of images */}
            {techStackData.map((tech, index) => (
              <div key={`${tech.name}-1`} className={styles.item}>
                <Image
                  src={tech.src}
                  alt={`${tech.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 128px"
                  priority={index < 3}
                />
              </div>
            ))}
            {/* Duplicate set for infinite scroll */}
            {techStackData.map((tech) => (
              <div key={`${tech.name}-2`} className={styles.item}>
                <Image
                  src={tech.src}
                  alt={`${tech.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}