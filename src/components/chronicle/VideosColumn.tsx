"use client";

import Link from 'next/link';
import { Play, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Video content - you can expand this with real video data
const videos = [
  {
    id: '1',
    title: 'Introduction to AI Agents for Business',
    description: 'Learn the fundamentals of AI agent development',
    thumbnail: '/66c4cf98db4efc2ae8c54b7d_LLMz.webp',
    duration: '12:34',
    category: 'Tutorial',
    externalUrl: '#',
  },
  {
    id: '2',
    title: 'Workplace Automation Demo',
    description: 'See our automation solutions in action',
    thumbnail: '/automation_process_rpa_cycle_workflow.png',
    duration: '8:45',
    category: 'Demo',
    externalUrl: '#',
  },
  {
    id: '3',
    title: 'Building Your First AI Workflow',
    description: 'Step-by-step guide to creating automated workflows',
    thumbnail: '/planning_chart_workflow.png',
    duration: '15:20',
    category: 'Guide',
    externalUrl: '#',
  },
];

export function VideosColumn() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <Play className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-headline font-bold">Videos</h2>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={video.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative rounded-lg overflow-hidden bg-secondary/20 border border-transparent hover:border-primary/20 transition-all">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="bg-background/80 text-xs">
                    {video.duration}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <Badge variant="outline" className="text-xs mb-2">
                  {video.category}
                </Badge>
                <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {video.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link 
        href="#" 
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        View all videos <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
}
