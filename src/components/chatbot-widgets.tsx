"use client";

import dynamic from 'next/dynamic';

// Dynamic imports for widgets that require ChatbotProvider context
const BotWidget = dynamic(() => import('@/components/bot-widget').then(mod => ({ default: mod.BotWidget })), {
  ssr: false,
  loading: () => null,
});

const BookDemoWidget = dynamic(() => import('@/components/book-demo-widget').then(mod => ({ default: mod.BookDemoWidget })), {
  ssr: false,
  loading: () => null,
});

/**
 * Chatbot Widgets - Widgets that require ChatbotProvider context
 * Must be rendered inside ChatbotProvider
 */
export function ChatbotWidgets() {
  return (
    <>
      <BotWidget initialMessage="Hi there! 👋 I'm the LOG_ON AI Assistant — here to help you discover how our AI agents and automation solutions can transform your business. What challenge can I help you solve today?" />
      <BookDemoWidget />
    </>
  );
}

