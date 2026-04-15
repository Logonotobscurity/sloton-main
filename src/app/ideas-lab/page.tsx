"use client";

import { PageHero } from '@/components/page-sections/page-hero';
import { Lightbulb, Rocket, Filter } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { GlowingCard } from '@/components/ui/glowing-card';
import { GridBackground } from '@/components/ui/grid-background';
import { products, productCategories, getProductsByCategory, getProductStats } from '@/lib/data/ideas-lab-products';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  'DEPLOYED': 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  'MVP': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  'PROTOTYPE': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  'ACTIVE BUILD': 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
  'Q2 2026': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  'PRODUCTION': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
};

export default function IdeasLabPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredProducts = getProductsByCategory(selectedCategory);
  const stats = getProductStats();

  return (
    <div>
      <PageHero
        title="Ideas Lab"
        description="Our innovation portfolio: 16 active builds across 7 domains. From deployed products to experimental prototypes, explore the connected ecosystem where research informs architecture, architecture enables products, and products validate research."
        icon={<Lightbulb className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
      />

      {/* Stats Section */}
      <section className="py-fluid-md bg-secondary/20">
        <div className="container mx-auto px-fluid-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground mt-1">Active Builds</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{stats.deployed}</div>
              <div className="text-sm text-muted-foreground mt-1">Deployed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground mt-1">In Progress</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">{stats.domains}</div>
              <div className="text-sm text-muted-foreground mt-1">Domains</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-fluid-md">
        <div className="container mx-auto px-fluid-sm">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {productCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-fluid-lg">
        <div className="container mx-auto px-fluid-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <GlowingCard key={product.id} className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    {/* Icon & Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", statusColors[product.status])}
                      >
                        {product.status}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {product.description}
                    </p>

                    {/* Impact */}
                    <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Impact
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {product.impact}
                      </div>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mt-auto">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                          Key Features
                        </div>
                        <ul className="space-y-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </GlowingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-fluid-lg bg-secondary/20">
        <div className="container mx-auto px-fluid-sm text-center">
          <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Build Together?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            These products represent our connected ecosystem approach. Each build shares infrastructure, making deployment faster and more reliable. Let's discuss how we can adapt these solutions for your business.
          </p>
          <Button asChild size="lg">
            <a href="/contact">Start a Conversation</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
