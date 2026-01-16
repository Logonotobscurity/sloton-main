
"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Share2, Copy, X, Linkedin, Facebook, MessageCircle } from 'lucide-react';

export function ShareModal({ title }: { title: string }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Ensure this only runs on the client side
    setCurrentUrl(window.location.href);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: 'Link Copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Could not copy link to clipboard. Please try again.',
      });
    }
  };

  const socialShares = [
    {
      name: 'X',
      icon: <X className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="h-5 w-5" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + currentUrl)}`,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share this content</DialogTitle>
          <DialogDescription>
            Help spread the word by sharing on your favorite platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {socialShares.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                    >
                        <Button variant="outline" className="w-full">
                            {social.icon}
                            <span className="ml-2 hidden sm:inline">{social.name}</span>
                        </Button>
                    </a>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <Input
                    id="link"
                    value={currentUrl}
                    readOnly
                    className="flex-1"
                />
                <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
