"use client";

import React from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Lock, MessageCircle } from 'lucide-react';
import { DialogFormWrapper } from './dialog-form-wrapper';
import { CommunityLeadForm } from './community-lead-form';

interface GatedFeatureModalProps {
  trigger: React.ReactNode;
  featureName: string;
}

export function GatedFeatureModal({ trigger, featureName }: GatedFeatureModalProps) {
  return (
    <DialogFormWrapper 
        trigger={trigger}
        className="sm:max-w-md bg-background text-center p-8"
    >
        <DialogHeader className="space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Access Advanced Features</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            The "{featureName}" is an advanced feature. To unlock its full potential and get a personalized setup, please book a free demo with our team.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 sm:justify-center">
            <DialogFormWrapper
                trigger={
                    <Button size="lg">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Book a Free Demo
                    </Button>
                }
                className="bg-background"
            >
                <DialogHeader>
                    <DialogTitle>Book a Free Demo</DialogTitle>
                    <DialogDescription>
                        {`Interested in the "${featureName}" feature? Fill out your details below to connect with our team on WhatsApp.`}
                    </DialogDescription>
                </DialogHeader>
                <CommunityLeadForm interest={featureName} />
            </DialogFormWrapper>
        </DialogFooter>
    </DialogFormWrapper>
  );
}
