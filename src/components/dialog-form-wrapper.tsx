"use client"

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DialogFormWrapperProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function DialogFormWrapper({ trigger, children, className }: DialogFormWrapperProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
