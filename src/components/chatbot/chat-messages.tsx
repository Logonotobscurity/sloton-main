"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, User, FileText, Phone } from 'lucide-react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Message, LeadInfo } from './types';
import { Button } from '@/components/ui/button';

interface ChatMessagesProps {
    messages: Message[];
    leadInfo: LeadInfo;
    isLoading: boolean;
    whatsappUrl: string;
    onActionClick: (e: React.MouseEvent, action: string) => void;
    isOpen: boolean;
}

export function ChatMessages({ messages, leadInfo, isLoading, whatsappUrl, onActionClick, isOpen }: ChatMessagesProps) {
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    return (
        <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
                <ChatBubble key={index} variant={message.role === 'user' ? 'sent' : 'received'}>
                    {message.role === 'assistant' && (
                        <ChatBubbleAvatar>
                            <Avatar>
                                <Image src="/icons/circuit-o.svg" alt="LOG_ON AI" width={32} height={32} className="rounded-full p-0.5 bg-primary/10" />
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                        </ChatBubbleAvatar>
                    )}
                    <div className="flex flex-col gap-2 w-full">
                        <ChatBubbleMessage>
                            {message.content}
                        </ChatBubbleMessage>

                        {/* WhatsApp Handoff Card */}
                        {message.isWhatsappHandoff && (
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition-colors text-sm font-semibold text-green-600"
                                aria-label="Open WhatsApp to chat with LOG_ON team"
                            >
                                <Phone className="h-5 w-5 flex-shrink-0" />
                                <div>
                                    <p>Chat on WhatsApp</p>
                                    <p className="text-xs font-normal text-muted-foreground">+234 814 306 6320 · Typically replies in minutes</p>
                                </div>
                            </a>
                        )}

                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                            <div className="flex flex-col gap-1 text-xs">
                                <p className="font-semibold text-muted-foreground">Sources:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {message.sources.map(source => (
                                        <Link key={source.slug} href={source.slug} target="_blank" className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 text-xs">
                                            <FileText className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate max-w-[140px]">{source.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggested Actions */}
                        {message.suggested_actions && message.suggested_actions.length > 0 && index === messages.length - 1 && !isLoading && (
                            <div className="flex gap-2 flex-wrap pt-1">
                                {message.suggested_actions.map(action => (
                                    <Button
                                        key={action}
                                        onClick={(e) => onActionClick(e, action)}
                                        variant="outline"
                                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium text-left transition-colors"
                                        aria-label={`Suggested action: ${action}`}
                                    >
                                        {action}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                    {message.role === 'user' && (
                        <ChatBubbleAvatar>
                            <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                                    {leadInfo.name ? leadInfo.name[0].toUpperCase() : <User className="h-4 w-4" />}
                                </AvatarFallback>
                            </Avatar>
                        </ChatBubbleAvatar>
                    )}
                </ChatBubble>
            ))}
            {isLoading && (
                <ChatBubble variant="received">
                    <ChatBubbleAvatar>
                        <Avatar>
                            <Image src="/icons/circuit-o.svg" alt="LOG_ON AI thinking" width={32} height={32} className="rounded-full p-0.5 bg-primary/10" />
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                    </ChatBubbleAvatar>
                    <ChatBubbleMessage isLoading />
                </ChatBubble>
            )}
        </div>
    );
}
