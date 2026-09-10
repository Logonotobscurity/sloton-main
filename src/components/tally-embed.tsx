'use client';

import { useEffect } from 'react';

const FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID || 'aQpexW';

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export function TallyEmbed({ className }: { className?: string }) {
  useEffect(() => {
    const src = 'https://tally.so/widgets/embed.js';
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    const boot = () => window.Tally?.loadEmbeds();
    if (existing) {
      boot();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = boot;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
      loading="lazy"
      width="100%"
      height="520"
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}
      title="Contact LOG_ON"
      className={className}
    />
  );
}
