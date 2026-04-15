"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';
import { LeadInfo } from './types';

interface LeadCaptureFormProps {
    onSuccess: (leadInfo: LeadInfo) => void;
    whatsappUrl: string;
}

export function LeadCaptureForm({ onSuccess, whatsappUrl }: LeadCaptureFormProps) {
    const [leadInfo, setLeadInfo] = useState<LeadInfo>({ name: '', email: '' });
    const [leadStep, setLeadStep] = useState<'name' | 'email'>('name');
    const [leadError, setLeadError] = useState('');

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (leadStep === 'name') {
            if (!leadInfo.name.trim() || leadInfo.name.trim().length < 2) {
                setLeadError('Please enter your name (at least 2 characters).');
                return;
            }
            setLeadError('');
            setLeadStep('email');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(leadInfo.email)) {
                setLeadError('Please enter a valid email address.');
                return;
            }
            setLeadError('');
            onSuccess(leadInfo);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-6">
            <div className="text-center space-y-1">
                <p className="font-semibold text-base">Welcome to LOG_ON 👋</p>
                <p className="text-sm text-muted-foreground">
                    {leadStep === 'name'
                        ? "What's your name so I can personalise our chat?"
                        : `Thanks, ${leadInfo.name}! What's your email address?`}
                </p>
            </div>
            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
                {leadStep === 'name' ? (
                    <Input
                        autoFocus
                        placeholder="Your full name"
                        value={leadInfo.name}
                        onChange={e => setLeadInfo(p => ({ ...p, name: e.target.value }))}
                        aria-label="Your name"
                    />
                ) : (
                    <Input
                        autoFocus
                        type="email"
                        placeholder="Your email address"
                        value={leadInfo.email}
                        onChange={e => setLeadInfo(p => ({ ...p, email: e.target.value }))}
                        aria-label="Your email"
                    />
                )}
                {leadError && <p className="text-xs text-destructive">{leadError}</p>}
                <Button type="submit" className="w-full">
                    {leadStep === 'name' ? 'Continue' : 'Start Chatting →'}
                </Button>
            </form>
            <div className="text-center">
                <p className="text-xs text-muted-foreground">Or chat immediately on</p>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors"
                    aria-label="Chat on WhatsApp"
                >
                    <Phone className="h-4 w-4" /> WhatsApp Us
                </a>
            </div>
        </div>
    );
}
