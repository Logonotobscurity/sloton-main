
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { insights } from '@/lib/data/insights';
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { GlowingCard } from '@/components/ui/glowing-card';
import { NotesColumn } from '@/components/chronicle/NotesColumn';
import { NewsColumn } from '@/components/chronicle/NewsColumn';
import { VideosColumn } from '@/components/chronicle/VideosColumn';
import { ArticleCodeVisual } from '@/components/ui/article-code-visual';
import { fadeInUp, staggerContainerCustom, staggerItem } from '@/lib/animation-variants';

export default function InsightsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'chronicle' | 'grid'>('chronicle');

    const filteredInsights = insights.filter(insight => {
        const matchesSearch = searchTerm === '' ||
            insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            insight.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesTopic = selectedTopic === null || insight.tags.includes(selectedTopic);

        return matchesSearch && matchesTopic;
    });

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                {/* Page Header */}
                <div className="mb-12 border-b border-border pb-8">
                    <h1 className="text-4xl md:text-6xl font-headline tracking-tight">
                        LOG_ON Insights
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                        Updates, guides, and expert perspectives on AI, automation, and digital transformation.
                    </p>
                    
                    {/* Search & Filters */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                className="pl-10 bg-secondary/30 border-border/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* View Toggle */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('chronicle')}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    viewMode === 'chronicle' 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Chronicle
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    viewMode === 'grid' 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Grid
                            </button>
                        </div>
                    </div>

                    {/* Topic Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Badge
                            onClick={() => setSelectedTopic(null)}
                            variant={selectedTopic === null ? "default" : "outline"}
                            className="cursor-pointer"
                        >
                            All
                        </Badge>
                        {['AI', 'Automation', 'SEO', 'Training', 'Security'].map(topic => (
                            <Badge
                                key={topic}
                                onClick={() => setSelectedTopic(topic)}
                                variant={selectedTopic === topic ? "default" : "outline"}
                                className="cursor-pointer"
                            >
                                {topic}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Chronicle View - 3-Column Layout */}
                {viewMode === 'chronicle' && !searchTerm && !selectedTopic && (
                    <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                        variants={staggerContainerCustom(0.1, 0)}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Left Column - Notes & Guides (25%) */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-3"
                        >
                            <NotesColumn />
                        </motion.div>

                        {/* Center Column - News (50%) */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-6"
                        >
                            <NewsColumn />
                        </motion.div>

                        {/* Right Column - Videos (25%) */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-3"
                        >
                            <VideosColumn />
                        </motion.div>
                    </motion.div>
                )}

                {/* Grid View or Filtered Results */}
                {(viewMode === 'grid' || searchTerm || selectedTopic) && (
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredInsights.map(insight => (
                                <GlowingCard key={insight.slug}>
                                    <Link href={`/insights/${insight.slug}`} className="block h-full">
                                        <div className="flex flex-col h-full">
                                            <CardHeader className="p-0">
                                                <div data-ai-hint={insight.dataAiHint} className="overflow-hidden rounded-t-xl relative h-48">
                                                    {insight.codeVisualType ? (
                                                        <ArticleCodeVisual 
                                                            type={insight.codeVisualType} 
                                                            className="h-full w-full rounded-none border-0"
                                                            animated={false}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={insight.image}
                                                            alt={insight.title}
                                                            width={insight.width}
                                                            height={insight.height}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 md:p-6 flex-grow">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {insight.tags.map(tag => (
                                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                                    ))}
                                                </div>
                                                <CardTitle className="text-lg md:text-xl">
                                                    {insight.title}
                                                </CardTitle>
                                                <CardDescription className="mt-2 text-sm line-clamp-3">{insight.description}</CardDescription>
                                            </CardContent>
                                            <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                                                <div className="text-primary font-semibold flex items-center">
                                                    <span className="sr-only">Read more about {insight.title}</span>
                                                    <span aria-hidden="true">Read More</span> <ArrowRight className="ml-2 h-4 w-4" />
                                                </div>
                                            </CardFooter>
                                        </div>
                                    </Link>
                                </GlowingCard>
                            ))}
                        </div>
                        {filteredInsights.length === 0 && (
                            <div className="text-center py-16">
                                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-xl font-semibold">No Articles Found</h3>
                                <p className="mt-2 text-muted-foreground">Try adjusting your search or category filters.</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}
