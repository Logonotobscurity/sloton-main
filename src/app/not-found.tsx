import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to LOG_ON homepage or explore our solutions.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          <div className="-mt-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="large" variant="primary">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          
          <Button asChild size="large" variant="outline">
            <Link href="/solutions">
              <Search className="mr-2 h-5 w-5" />
              Explore Solutions
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="border-t pt-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/ai-solutions" 
              className="text-sm hover:text-primary transition-colors"
            >
              AI Solutions
            </Link>
            <Link 
              href="/automation" 
              className="text-sm hover:text-primary transition-colors"
            >
              Automation
            </Link>
            <Link 
              href="/insights" 
              className="text-sm hover:text-primary transition-colors"
            >
              Insights
            </Link>
            <Link 
              href="/contact" 
              className="text-sm hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
