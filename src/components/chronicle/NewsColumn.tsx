"use client";

import React from 'react';
import Link from 'next/link';
import { insights } from '@/lib/data/insights';
import { Badge } from '@/components/ui/badge';
import { Newspaper, ArrowRight, Calendar, User } from 'lucide-react';
import { formatShortDate } from '@/lib/date-utils';
import { ArticleCodeVisual } from '@/components/ui/article-code-visual';
import { FillImage } from '@/lib/image-utils';

export function NewsColumn() {
  // Memoize array slicing to prevent recalculation on re-renders
  const { featuredArticle, recentNews } = React.useMemo(() => ({
    featuredArticle: insights[0],
    recentNews: insights.slice(1, 5)
  }), []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <Newspaper className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-headline font-bold">Latest Updates</h2>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <Link 
          href={`/insights/${featuredArticle.slug}`}
          className="group block"
        >
          <article className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 transition-all">
            <div className="relative h-64 overflow-hidden">
              {featuredArticle.codeVisualType ? (
                <ArticleCodeVisual 
                  type={featuredArticle.codeVisualType} 
                  className="h-full w-full rounded-none border-0"
                  animated={false}
                />
              ) : (
                <FillImage
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {featuredArticle.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} className="bg-primary/90 text-primary-foreground text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm line-clamp-2">
                {featuredArticle.description}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {featuredArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatShortDate(featuredArticle.date)}
                </span>
              </div>
            </div>
          </article>
        </Link>
      )}

      {/* Recent News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentNews.map((article) => (
          <Link 
            key={article.slug}
            href={`/insights/${article.slug}`}
            className="group block"
          >
            <article className="h-full rounded-lg border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all overflow-hidden">
              {article.codeVisualType && (
                <ArticleCodeVisual 
                  type={article.codeVisualType} 
                  className="h-24 w-full rounded-none border-0 border-b"
                  animated={false}
                />
              )}
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {article.tags.slice(0, 1).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatShortDate(article.date)}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <Link 
        href="/insights" 
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        View all articles <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
