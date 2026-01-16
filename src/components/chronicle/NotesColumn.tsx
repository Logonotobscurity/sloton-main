"use client";

import React from 'react';
import Link from 'next/link';
import { insights } from '@/lib/data/insights';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight } from 'lucide-react';

export function NotesColumn() {
  // Filter for guides/technical content - memoized to prevent recalculation on re-renders
  const notes = React.useMemo(() => {
    return insights.filter(i => 
      i.tags.some(t => ['Training', 'Strategy', 'Technical SEO', 'Development'].includes(t))
    ).slice(0, 6);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-headline font-bold">Notes & Guides</h2>
      </div>
      
      <div className="space-y-4">
        {notes.map((note) => (
          <Link 
            key={note.slug} 
            href={`/insights/${note.slug}`}
            className="group block p-4 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors border border-transparent hover:border-primary/20"
          >
            <div className="flex flex-wrap gap-1.5 mb-2">
              {note.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {note.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
              {note.description}
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read more <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
      
      <Link 
        href="/insights?topic=Training" 
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        View all guides <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
