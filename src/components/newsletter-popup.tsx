"use client";

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import { insights } from '@/lib/data/insights';
import type { Insight } from '@/lib/data/insights';
import Link from 'next/link';
import { newsletterSignupAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const POPUP_DELAY = 8000; // 8 seconds
const POPUP_COOLDOWN_KEY = 'newsletter-popup-dismissed';
const POPUP_COOLDOWN_DAYS = 7;

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [featuredArticle, setFeaturedArticle] = useState<Insight | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if popup was recently dismissed
    const dismissedAt = localStorage.getItem(POPUP_COOLDOWN_KEY);
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < POPUP_COOLDOWN_DAYS) {
        return; // Don't show popup
      }
    }

    // Select a random recent article (from the last 10)
    const recentArticles = insights.slice(0, 10);
    const randomArticle = recentArticles[Math.floor(Math.random() * recentArticles.length)];
    setFeaturedArticle(randomArticle);

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_COOLDOWN_KEY, Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call server action to handle newsletter signup and send to Automation AI
      const result = await newsletterSignupAction({ email });
      
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Subscription failed",
          description: result.error,
        });
        logger.error('Newsletter subscription failed', { error: result.error });
      } else {
        setIsSuccess(true);
        toast({
          title: "Success! 🎉",
          description: "Check your inbox for a confirmation email.",
        });
        
        // Close after showing success message
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      logger.error('Newsletter subscription failed', { error });
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!featuredArticle) return null;

  const fomoMessages = [
    {
      icon: <Users className="h-4 w-4" />,
      text: "Join 5,000+ Nigerian tech leaders",
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      text: "Weekly AI & automation insights",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      text: "Exclusive content & early access",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
          aria-label="Close newsletter popup"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {!isSuccess ? (
          <>
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 pb-8">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  🔥 TRENDING NOW
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold mb-2">
                Don't Miss Out on This!
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/90 text-base">
                Thousands are already ahead. Join them before it's too late.
              </DialogDescription>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Featured Article */}
              <div className="bg-muted/50 rounded-lg p-4 border">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">LATEST ARTICLE</p>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {featuredArticle.description}
                    </p>
                    <Link 
                      href={`/insights/${featuredArticle.slug}`}
                      onClick={handleClose}
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Read now <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* FOMO Points */}
              <div className="space-y-2">
                {fomoMessages.map((message, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="text-primary">{message.icon}</div>
                    <span className="text-muted-foreground">{message.text}</span>
                  </div>
                ))}
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Get Free Weekly Insights
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. Unsubscribe anytime. 100% free.
                </p>
              </form>

              {/* Social Proof */}
              <div className="text-center pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">127 people</span> subscribed in the last 7 days
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">You're In! 🎉</h3>
            <p className="text-muted-foreground">
              Check your inbox for a confirmation email.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
