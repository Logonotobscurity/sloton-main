
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
import { Share2, Copy, X, Linkedin, Facebook, MessageCircle, Mail, Send, Smartphone } from 'lucide-react';
import {
  getAllShareUrls,
  copyToClipboard as copyText,
  openSharePopup,
  isWebShareSupported,
  nativeShare,
  type ShareData,
} from '@/lib/social-share';

interface ShareModalProps {
  title: string;
  description?: string;
  hashtags?: string[];
}

export function ShareModal({ title, description, hashtags }: ShareModalProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setShowNativeShare(isWebShareSupported());
    }
  }, []);

  const handleCopyToClipboard = async () => {
    const success = await copyText(currentUrl);
    
    if (success) {
      toast({
        title: 'Link Copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Could not copy link to clipboard. Please try again.',
      });
    }
  };

  const handleNativeShare = async () => {
    const shareData: ShareData = {
      url: currentUrl,
      title,
      description,
      hashtags,
    };

    const success = await nativeShare(shareData);
    
    if (success) {
      setIsOpen(false);
    }
  };

  const shareData: ShareData = {
    url: currentUrl,
    title,
    description,
    hashtags,
  };

  const shareUrls = getAllShareUrls(shareData);

  const socialShares = [
    {
      name: 'X (Twitter)',
      icon: <X className="h-5 w-5" />,
      url: shareUrls.twitter,
      color: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: shareUrls.linkedin,
      color: 'hover:bg-[#0077B5] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: shareUrls.facebook,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="h-5 w-5" />,
      url: shareUrls.whatsapp,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'Telegram',
      icon: <Send className="h-5 w-5" />,
      url: shareUrls.telegram,
      color: 'hover:bg-[#0088cc] hover:text-white',
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      url: shareUrls.email,
      color: 'hover:bg-gray-600 hover:text-white',
    },
  ];

  const handleShare = (url: string) => {
    openSharePopup(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
          <DialogDescription>
            Help spread the word by sharing on your favorite platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Native Share Button (Mobile) */}
          {showNativeShare && (
            <Button
              variant="default"
              className="w-full"
              onClick={handleNativeShare}
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Share via...
            </Button>
          )}

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {socialShares.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                className={`w-full transition-colors ${social.color}`}
                onClick={() => handleShare(social.url)}
              >
                {social.icon}
                <span className="ml-2">{social.name.split(' ')[0]}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link Section */}
          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium">
              Or copy link
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="link"
                value={currentUrl}
                readOnly
                className="flex-1"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button 
                type="button" 
                size="sm" 
                className="px-3" 
                onClick={handleCopyToClipboard}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>

          {/* Brand Footer */}
          <div className="pt-2 border-t text-center text-xs text-muted-foreground">
            Shared from <span className="font-semibold">LOG_ON - Connecting Advantages</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
