"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Phone } from 'lucide-react';

interface ChatInputProps {
    isLoading: boolean;
    whatsappUrl: string;
    onSend: (e: React.FormEvent, message: string) => void;
}

export function ChatInput({ isLoading, whatsappUrl, onSend }: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSend(e, input);
        setInput('');
    };

    return (
        <div className="p-3 border-t space-y-2">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-xs text-green-600 hover:text-green-500 font-semibold transition-colors py-1"
                aria-label="Transfer to WhatsApp"
            >
                <Phone className="h-3.5 w-3.5" />
                Transfer to WhatsApp
            </a>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services..."
                    className="flex-1 text-sm"
                    disabled={isLoading}
                    aria-label="Ask the LOG_ON assistant a question"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
}
