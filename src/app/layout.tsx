import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ChromeShell } from '@/components/chrome-shell';
import { Toaster } from '@/components/ui/toaster';

import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutWidgets } from '@/components/layout-widgets';
import { NewsletterPopup } from '@/components';
import { SafeIsland } from '@/components/safe-island';
import ErrorBoundary from '@/components/error-boundary';
import { ChatbotProvider } from '@/context/chatbot-provider';
import { DataBehaviorsInit } from '@/components/data-behaviors-init';
import { PostHogProvider } from '@/components/posthog-provider';

// LOG_ON Design System — Typography (restored per reference)
let outfit: { variable: string } = { variable: '--font-outfit' };
let fraunces: { variable: string } = { variable: '--font-fraunces' };
let instrument: { variable: string } = { variable: '--font-instrument' };
let ibmPlexMono: { variable: string } = { variable: '--font-mono' };
let interUi: { variable: string } = { variable: '--font-ui' };
let jetMono: { variable: string } = { variable: '--font-jet' };
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const {
    Outfit: OutfitFont,
    Fraunces: FrauncesFont,
    Instrument_Serif: InstrumentFont,
    Inter: InterFont,
    IBM_Plex_Mono: IBMFont,
    JetBrains_Mono: JetFont,
  } = require('next/font/google');
  outfit = OutfitFont({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
    weight: ['400', '500', '600', '700', '800'],
  });
  fraunces = FrauncesFont({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fraunces',
    weight: ['400', '600', '700', '900'],
    style: ['normal', 'italic'],
  });
  instrument = InstrumentFont({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-instrument',
    weight: '400',
    style: ['normal', 'italic'],
  });
  interUi = InterFont({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ui',
    weight: ['400', '500', '600', '700'],
  });
  ibmPlexMono = IBMFont({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
    weight: ['400', '500', '600'],
  });
  jetMono = JetFont({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jet',
    weight: ['400', '500', '700'],
  });
} catch {
  // Offline or fetch failure — fallback to CSS variables already defined in globals.css
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://logonai.netlify.app'),
  title: {
    default: 'AI & Automation for Business Efficiency',
    template: '%s | LOG_ON',
  },
  description: 'We design your digital ecosystem. Get a free AI assessment to discover automation and IT solutions tailored to your business needs.',
  openGraph: {
    title: 'AI & Automation for Business Efficiency | LOG_ON',
    description: 'We design your digital ecosystem.',
    url: 'https://logonai.netlify.app',
    siteName: 'LOG_ON',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LOG_ON',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Automation for Business Efficiency | LOG_ON',
    description: 'We design your digital ecosystem.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-NG': '/',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LOG_ON",
  "url": "https://logonai.netlify.app",
  "logo": "https://logonai.netlify.app/og-image.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+234-814-306-6320",
    "contactType": "customer service",
    "areaServed": "NG",
    "email": "logonthepage@gmail.com"
  },
  "sameAs": [
    "https://medium.com/@Logon_thepage",
    "https://x.com/Logo_obscurity",
    "https://www.instagram.com/logon_thepage/",
    "https://substack.com/@logonthepage",
    "https://github.com/Logonotobscurity/",
    "https://www.linkedin.com/in/logo-oluwamayowa-cpo-/",
    "https://www.linkedin.com/company/logon-connecting-advantages"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LOG_ON",
  "image": "https://logonai.netlify.app/og-image.png",
  "@id": "https://logonai.netlify.app",
  "url": "https://logonai.netlify.app",
  "telephone": "+234 814 306 6320",
  "email": "logonthepage@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lagos",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.5093,
    "longitude": 3.3717
  },
  "description": "LOG_ON provides expert AI agent development and workplace automation in Nigeria. We help businesses cut costs, automate processes, and scale faster with intelligent technology solutions.",
  "priceRange": "$$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "9.0820",
      "longitude": "8.6753"
    },
    "geoRadius": "1000000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Technology Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Solutions & Agent Development",
          "url": "https://logonai.netlify.app/ai-solutions",
          "description": "Custom AI models and AI agent development to solve complex business challenges."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Workplace Process Automation",
          "url": "https://logonai.netlify.app/automation",
          "description": "Intelligent automation and RPA to streamline workflows and increase efficiency in your workplace."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web & Custom Development",
          "url": "https://logonai.netlify.app/solutions#web-development",
          "description": "Scalable websites, e-commerce platforms, and custom applications."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Analytics",
          "url": "https://logonai.netlify.app/solutions#business-analytics",
          "description": "Custom dashboards and BI reporting to turn data into actionable insights."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technology Training Programs",
          "url": "https://logonai.netlify.app/training",
          "description": "Expert-led training in AI, automation, and digital strategy."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${fraunces.variable} ${instrument.variable} ${ibmPlexMono.variable} ${interUi.variable} ${jetMono.variable}`}
    >
      <head>
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos" />
        <meta name="geo.position" content="6.5093;3.3717" />
        <meta name="ICBM" content="6.5093, 3.3717" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="llms-full.txt" />
        <link rel="describedby" href="/llms.txt" />

        {process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== 'GTM-XXXXXXX' ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {process.env.NEXT_PUBLIC_ENABLE_MATOMO === 'true' ? (
        <Script id="matomo-analytics" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['disableCookies']);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://logonsolutionsnetlifyapp.matomo.cloud/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/logonsolutionsnetlifyapp.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
        ) : null}
      </head>
      <body suppressHydrationWarning={true} className="relative text-foreground site-canvas-body">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('logon-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||((t==='system'||!t)&&d);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`,
          }}
        />
        {process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== 'GTM-XXXXXXX' ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        ) : null}
        <ThemeProvider>
          <ErrorBoundary>
            <PostHogProvider>
            <DataBehaviorsInit />
            <ChatbotProvider>
              <ChromeShell>{children}</ChromeShell>
            </ChatbotProvider>
            <LayoutWidgets />
            <Toaster />
            </PostHogProvider>
          </ErrorBoundary>
          <SafeIsland>
            <NewsletterPopup />
          </SafeIsland>
        </ThemeProvider>
      </body>
    </html>
  );
}
