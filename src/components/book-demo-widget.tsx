
"use client";

import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { CommunityLeadForm } from './community-lead-form';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChatbotContext } from '@/context/chatbot-provider';

export function BookDemoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(ChatbotContext);
  
  if (!context) {
    throw new Error('BookDemoWidget must be used within a ChatbotProvider');
  }

  const { isChatbotOpen } = context;

  if (isChatbotOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-24 right-4 z-[100]">
          <Button
            className={cn(
              'rounded-full h-14 w-14 p-0 shadow-lg bg-primary hover:bg-primary/90 transition-transform duration-300 flex items-center justify-center',
              'md:h-auto md:w-auto md:px-6 md:py-3'
            )}
            aria-label="Book a Demo"
          >
            <Calendar className="h-6 w-6 text-primary-foreground" />
            <span className="hidden md:inline ml-2 font-semibold">Book a Demo</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book a Free Demo</DialogTitle>
          <DialogDescription>
            Choose a date that works for you, and we'll get in touch to schedule a personalized demo of our solutions.
          </DialogDescription>
        </DialogHeader>
        <CommunityLeadForm interest="Free Demo Request" />
      </DialogContent>
    </Dialog>
  );
}
