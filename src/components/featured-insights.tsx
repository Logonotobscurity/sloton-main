
"use client";

import Link from 'next/link';
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { insights } from '@/lib/insights';
import { Button } from './ui/button';
import { GlowingCard } from './ui/glowing-card';
import { motion } from 'framer-motion';


export function FeaturedInsights() {
  const featuredInsights = insights.slice(0, 3);
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Practical Business Intelligence</h2>
          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Actionable advice on AI, automation, and growth strategies that actually work for real businesses.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredInsights.map((insight, i) => (
            <motion.div
              key={insight.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
            >
              <GlowingCard>
                <div className="flex flex-col h-full">
                  <CardHeader className="p-0">
                    <Link href={`/insights/${insight.slug}`}>
                      <div data-ai-hint={insight.dataAiHint}>
                        <Image
                          src={insight.image}
                          alt={insight.title}
                          width={insight.width}
                          height={insight.height}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                        />
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 flex-grow">
                    <div className="flex flex-wrap gap-2 mb-2">
                       {insight.tags.map(tag => (
                         <Badge key={tag} variant="outline" className="border-primary text-primary">{tag}</Badge>
                       ))}
                    </div>
                    <CardTitle className="text-lg md:text-xl">
                        <Link href={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                            {insight.title}
                        </Link>
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm line-clamp-3">{insight.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                    <Link href={`/insights/${insight.slug}`} className="text-primary font-semibold flex items-center group">
                      Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Button asChild size="lg">
                <Link href="/insights">
                    View All Articles
                </Link>
            </Button>
        </div>

      </div>
    </section>
  );
}
