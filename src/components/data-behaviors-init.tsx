"use client";

import { useEffect } from 'react';
import { initDataBehaviors } from '@/lib/data-behaviors';

/**
 * Client component that initializes all data-attribute behaviors
 * Add this to your root layout
 */
export function DataBehaviorsInit() {
  useEffect(() => {
    initDataBehaviors();
  }, []);

  return null;
}
