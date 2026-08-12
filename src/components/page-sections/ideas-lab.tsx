"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { products } from "@/lib/data/ideas-lab-products";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function IdeasLab() {
  // Triple the products for truly seamless infinite scroll
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Creative Animated Code Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        {/* Floating Code Blocks */}
        <motion.div
          className="absolute top-10 left-10 text-xs font-mono text-primary font-semibold"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <pre className="leading-relaxed">{`const innovate = () => {
  return ideas
    .filter(viable)
    .map(build)
    .reduce(impact);
};`}</pre>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-xs font-mono text-accent font-semibold"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <pre className="leading-relaxed">{`// AI-Powered Innovation
class IdeasLab {
  async launch(project) {
    await this.validate();
    return this.deploy();
  }
}`}</pre>
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/4 text-xs font-mono text-primary font-semibold"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <pre className="leading-relaxed">{`export const portfolio = {
  projects: 17,
  domains: 7,
  status: 'BUILDING'
};`}</pre>
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-1/3 text-xs font-mono text-accent font-semibold"
          animate={{
            y: [0, 25, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <pre className="leading-relaxed">{`// Innovation Pipeline
const pipeline = [
  'ideate',
  'prototype',
  'build',
  'deploy'
].map(stage =>
  execute(stage)
);`}</pre>
        </motion.div>

        {/* Scattered Code Symbols */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg font-mono text-foreground font-bold"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['{ }', '[ ]', '< >', '( )', '=>', '...', '++', '&&', '||', '==='][i % 10]}
          </motion.div>
        ))}

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            opacity: 0.1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-headline">From the Ideas Lab</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground">
              Explore our portfolio of {products.length} innovative projects across {[...new Set(products.map(p => p.category))].length} domains.
            </p>
          </motion.div>
        </div>

        {/* Infinite Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -(280 + 16) * products.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: products.length * 5, // Slower: 5 seconds per project
                  ease: "linear",
                },
              }}
            >
              {duplicatedProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Card
                    key={`${product.id}-${index}`}
                    className="group cursor-pointer transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg bg-background/90 backdrop-blur-sm flex-shrink-0 w-[280px]"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 mt-1 text-xs">
                            {product.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap",
                          product.status === 'DEPLOYED' || product.status === 'PRODUCTION' 
                            ? "bg-green-500/10 text-green-600 border border-green-500/20"
                            : product.status === 'ACTIVE BUILD'
                            ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                        )}>
                          {product.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate">{product.impact}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none" />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/ideas-lab" className="group">
              Explore All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
