
"use client";

import React, { createContext, useState, ReactNode } from 'react';
import { useUiStore } from '@/hooks/use-ui-store';

interface ChatbotContextType {
  isChatbotOpen: boolean;
  setChatbotOpen: (isOpen: boolean) => void;
}

export const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const { isChatbotOpen, setChatbotOpen } = useUiStore();

  return (
    <ChatbotContext.Provider value={{ isChatbotOpen, setChatbotOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
};
