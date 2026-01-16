"use client";

import Script from 'next/script';

export function BotpressWidget() {
  return (
    <>
      <Script 
        src="https://cdn.botpress.cloud/webchat/v3.5/inject.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://files.bpcontent.cloud/2025/09/03/00/20250903000320-J2QZTSYJ.js"
        strategy="lazyOnload"
      />
    </>
  );
}
