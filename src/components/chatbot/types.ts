export interface Message {
    role: 'user' | 'assistant' | 'tool';
    content: string;
    sources?: { title: string; slug: string }[];
    suggested_actions?: string[];
    isWhatsappHandoff?: boolean;
}

export interface LeadInfo {
    name: string;
    email: string;
}
