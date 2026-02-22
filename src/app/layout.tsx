import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { WebsiteLoader } from '@/components/website-loader';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { BotWidget } from '@/components/bot-widget';
import { BotpressWidget } from '@/components/botpress-widget';
import { BookDemoWidget } from '@/components/book-demo-widget';
import { BackToTop } from '@/components/back-to-top';
import { NewsletterPopup } from '@/components/newsletter-popup';
import { Abhaya_Libre, Nunito } from 'next/font/google';
import ErrorBoundary from '@/components/error-boundary';
import { ChatbotProvider } from '@/context/chatbot-provider';

const abhayaLibre = Abhaya_Libre({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '700', '800'],
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://logonsolutions.netlify.app'),
  title: {
    default: 'AI & Automation for Business Efficiency',
    template: '%s | LOG_ON',
  },
  description: 'We design your digital ecosystem. Get a free AI assessment to discover automation and IT solutions tailored to your business needs.',
  openGraph: {
    title: 'AI & Automation for Business Efficiency | LOG_ON',
    description: 'We design your digital ecosystem.',
    url: 'https://logonsolutions.netlify.app',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LOG_ON",
  "url": "https://logonsolutions.netlify.app",
  "logo": "https://logonsolutions.netlify.app/og-image.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+234-814-306-6320",
    "contactType": "customer service",
    "areaServed": "NG",
    "email": "logonthepage@gmail.com"
  },
  "sameAs": [
    "https://medium.com/@Logon_thepage",
    "https://x.com/log_onthepage",
    "https://www.instagram.com/logon_thepage/",
    "https://substack.com/@logonthepage"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LOG_ON",
  "image": "https://logonsolutions.netlify.app/og-image.png",
  "@id": "https://logonsolutions.netlify.app",
  "url": "https://logonsolutions.netlify.app",
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
          "url": "https://logonsolutions.netlify.app/ai-solutions",
          "description": "Custom AI models and AI agent development to solve complex business challenges."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Workplace Process Automation",
          "url": "https://logonsolutions.netlify.app/automation",
          "description": "Intelligent automation and RPA to streamline workflows and increase efficiency in your workplace."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web & Custom Development",
          "url": "https://logonsolutions.netlify.app/solutions#web-development",
          "description": "Scalable websites, e-commerce platforms, and custom applications."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
            "@type": "Service",
            "name": "Business Analytics",
            "url": "https://logonsolutions.netlify.app/solutions#business-analytics",
            "description": "Custom dashboards and BI reporting to turn data into actionable insights."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technology Training Programs",
          "url": "https://logonsolutions.netlify.app/training",
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
    <html lang="en" suppressHydrationWarning className={`${nunito.variable} ${abhayaLibre.variable}`}>
       <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script id="matomo-analytics" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
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
      </head>
      <body suppressHydrationWarning={true}>
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
              height="0" 
              width="0" 
              style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
          </noscript>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <WebsiteLoader />
              <ChatbotProvider>
                <Header />
                <main id="main-content">
                  {children}
                </main>
                <Footer />
                <BotWidget initialMessage="Hello! How can I help you discover the right LOG_ON solution today?" />
                <BookDemoWidget />
              </ChatbotProvider>
              <BotpressWidget />
              <BackToTop />
              <NewsletterPopup />
              <Toaster />
            </ErrorBoundary>
          </ThemeProvider>
      </body>
    </html>
  );
}
