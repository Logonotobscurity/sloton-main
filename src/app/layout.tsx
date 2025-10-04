
import type { Metadata, Viewport } from 'next';
import { Nunito, Abhaya_Libre } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { WebsiteLoader } from '@/components/website-loader';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { BotWidget } from '@/components/bot-widget';
import { BookDemoWidget } from '@/components/book-demo-widget';
import { initializeConfig } from '@/config';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '700'],
});

const abhayaLibre = Abhaya_Libre({
  subsets: ['latin'],
  variable: '--font-abhaya-libre',
  weight: '800',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://logonsolutions.netlify.app'),
  title: {
    default: 'LOG_ON | AI & Automation for Business Efficiency',
    template: '%s | LOG_ON',
  },
  description: 'We design your digital ecosystem. Get a free AI assessment to discover automation and IT solutions tailored to your business needs.',
  openGraph: {
    title: 'LOG_ON | AI & Automation for Business Efficiency',
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
    title: 'LOG_ON | AI & Automation for Business Efficiency',
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
  "description": "Logon Solutions provides AI-driven technology consulting and automation solutions to help businesses cut costs, automate processes, and scale faster.",
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
          "name": "AI Solutions",
          "url": "https://logonsolutions.netlify.app/solutions#ai-solutions",
          "description": "Custom AI and machine learning models to solve complex business challenges."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Process Automation",
          "url": "https://logonsolutions.netlify.app/solutions#process-automation",
          "description": "Intelligent automation and RPA to streamline workflows and increase efficiency."
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
  // Initialize configuration
  initializeConfig();
  
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${getConfig().services.analytics.googleTagManagerId}');
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
              var u="${getConfig().services.analytics.matomoUrl}";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '${getConfig().services.analytics.siteId}']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/logonsolutionsnetlifyapp.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          nunito.variable,
          abhayaLibre.variable,
        )}
      >
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${getConfig().services.analytics.googleTagManagerId}`}
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
            <WebsiteLoader />
            <Header />
            <main className="flex-grow relative z-20">{children}</main>
            <BotWidget initialMessage="Hello! How can I help you discover the right LOG_ON solution today?" />
            <BookDemoWidget />
            <Footer />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
