"use client";

import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Sparkles, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import FocusLock from 'react-focus-lock';
import { ChatbotContext } from '@/context/chatbot-provider';
import { askSupportBot } from '@/app/actions';
import Image from 'next/image';

import { LeadCaptureForm } from './chatbot/lead-capture-form';
import { ChatMessages } from './chatbot/chat-messages';
import { ChatInput } from './chatbot/chat-input';
import { Message, LeadInfo } from './chatbot/types';

const WHATSAPP_URL = "https://wa.me/2348143066320?text=" + encodeURIComponent("Hi LOG_ON, I'd like to learn more about your AI and automation solutions.");

export function BotWidget({ initialMessage }: { initialMessage: string }) {
    const context = useContext(ChatbotContext);

    if (!context) {
        throw new Error("BotWidget must be used within a ChatbotProvider");
    }

    const { isChatbotOpen, setChatbotOpen } = context;

    // Lead capture state
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [leadInfo, setLeadInfo] = useState<LeadInfo>({ name: '', email: '' });

    // Chat state
    const getInitialState = (): Message[] => [{
        role: 'assistant',
        content: initialMessage,
        suggested_actions: ["What services do you offer?", "Tell me about AI solutions", "I need help with automation"],
    }];
    const [messages, setMessages] = useState<Message[]>(getInitialState());
    const [isLoading, setIsLoading] = useState(false);

    const handleClearChat = () => {
        setMessages(getInitialState());
    };

    const handleLeadSuccess = (info: LeadInfo) => {
        setLeadInfo(info);
        setLeadCaptured(true);
        // Add a personalised welcome message
        setMessages([{
            role: 'assistant',
            content: `Welcome, **${info.name}**! 👋 I'm the LOG_ON AI Assistant. I'm here to help you discover how our AI agents and automation solutions can transform your business. What would you like to know?`,
            suggested_actions: ["What services do you offer?", "Tell me about AI solutions", "I'd like to speak to someone"],
        }]);
    };

    const handleSendMessage = async (e: React.FormEvent | React.MouseEvent, messageText: string) => {
        e.preventDefault();
        const currentInput = messageText;
        if (!currentInput.trim() || isLoading) return;

        // Detect WhatsApp handoff intent
        const isWhatsappIntent = /whatsapp|speak to someone|human|call|contact/i.test(currentInput);

        const userMessage: Message = { role: 'user', content: currentInput };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        if (isWhatsappIntent) {
            setIsLoading(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `I'd love to connect you with a real person from our team! Click the button below to chat directly on WhatsApp — our team typically responds within minutes. 🟢`,
                isWhatsappHandoff: true,
                suggested_actions: ["What are your pricing options?", "Tell me about a case study"],
            }]);
            return;
        }

        const history = messages.map(msg => ({ role: msg.role, content: msg.content }));
        const response = await askSupportBot(history, currentInput);

        setIsLoading(false);
        if (response.data) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.answer,
                sources: response.data.sources,
                suggested_actions: response.data.suggested_actions,
            }]);
        } else {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Please chat with us on WhatsApp for immediate support.",
                isWhatsappHandoff: true,
            }]);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end">
            <FocusLock disabled={!isChatbotOpen} returnFocus>
                <div
                    id="bot-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="LOG_ON AI Assistant"
                    className={cn(
                        "w-[calc(100vw-2rem)] max-w-md bg-background border rounded-xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right mb-2 overflow-hidden",
                        leadCaptured ? "h-[calc(100vh-8rem)] max-h-[680px]" : "h-auto",
                        isChatbotOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b bg-primary/5">
                        <div className="flex items-center gap-2 pl-1">
                            <div className="relative">
                                <Image
                                    src="/icons/circuit-o.svg"
                                    alt="LOG_ON"
                                    width={28}
                                    height={28}
                                    className="rounded-full"
                                />
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background"></span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    LOG_ON Assistant
                                </p>
                                <p className="text-[10px] text-green-500 font-medium">Online · Powered by AI</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {leadCaptured && (
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClearChat} aria-label="Clear Chat">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent><p>Clear Chat</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setChatbotOpen(false)} aria-label="Close Chat">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Close</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    {!leadCaptured ? (
                        <LeadCaptureForm onSuccess={handleLeadSuccess} whatsappUrl={WHATSAPP_URL} />
                    ) : (
                        <>
                            <ChatMessages 
                                messages={messages} 
                                leadInfo={leadInfo} 
                                isLoading={isLoading} 
                                whatsappUrl={WHATSAPP_URL} 
                                onActionClick={handleSendMessage}
                                isOpen={isChatbotOpen} 
                            />
                            <ChatInput 
                                isLoading={isLoading} 
                                whatsappUrl={WHATSAPP_URL} 
                                onSend={handleSendMessage} 
                            />
                        </>
                    )}
                </div>
            </FocusLock>

            {/* Trigger Button */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            aria-expanded={isChatbotOpen}
                            aria-controls="bot-panel"
                            onClick={() => setChatbotOpen(!isChatbotOpen)}
                            className="rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 flex items-center justify-center h-12 px-4"
                        >
                            <MessageCircle className="h-5 w-5 text-primary-foreground" />
                            <span className="ml-2 text-primary-foreground font-semibold text-sm">
                                {isChatbotOpen ? "Close" : "Talk to us"}
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" className="mb-2">
                        <p>Chat with LOG_ON AI Assistant</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
