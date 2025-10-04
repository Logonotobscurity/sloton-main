
import Link from 'next/link';
import { IconFacebook, IconInstagram, IconLinkedIn, IconX, IconYouTube } from '@/lib/icons';
import { menuData } from '@/lib/menu-data';
import { Button } from './ui/button';
import { AdinkraBackground } from './ui/adinkra-background';

const socialLinks = [
  { href: 'https://www.facebook.com/logonthepage', label: 'Facebook', icon: <IconFacebook className="w-5 h-5" /> },
  { href: 'https://x.com/log_onthepage', label: 'X', icon: <IconX className="w-5 h-5" /> },
  { href: 'https://www.instagram.com/logon_thepage/', label: 'Instagram', icon: <IconInstagram className="w-5 h-5" /> },
  { href: 'https://www.linkedin.com/company/logon-connecting-advantages', label: 'LinkedIn', icon: <IconLinkedIn className="w-5 h-5" /> },
  { href: 'https://www.youtube.com/@logonthepage', label: 'YouTube', icon: <IconYouTube className="w-5 h-5" /> },
];

const { products, company } = menuData.menu;

const essentialCompanyLinks = company.items.filter(item => 
    ['About Us', 'Insights', 'FAQ'].includes(item.title)
);

export function Footer() {
  return (
    <footer className="bg-background border-t relative overflow-hidden">
      <AdinkraBackground />
       <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background z-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 md:py-24">
          
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <Link href="/" className="inline-block" prefetch={false}>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="font-bold text-3xl tracking-tighter text-primary leading-tight">LOG_ON</span>
                  <span className="text-sm text-muted-foreground -mt-1">Connecting Advantages...</span>
                </div>
            </Link>
            <address className="text-sm text-muted-foreground not-italic">
                Lagos, Nigeria<br />
                Serving clients worldwide
            </address>
             <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto lg:mx-0">
              Ready to transform your business with intelligent technology? Let's build something great together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button asChild>
                <Link href="/contact">Get Your Free Efficiency Assessment</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/use-cases">See Real Business Results</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-primary text-lg tracking-wider">What We Solve</h3>
                <ul className="space-y-3 list-none">
                  {products.items.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-primary text-lg tracking-wider">Company</h3>
                 <ul className="space-y-3 list-none">
                  {essentialCompanyLinks.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                   <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
               <div>
                <h3 className="font-semibold mb-4 text-primary text-lg tracking-wider">Resources</h3>
                 <ul className="space-y-3 list-none">
                   <li><Link href="/use-cases" className="text-muted-foreground hover:text-primary transition-colors">See Results</Link></li>
                   <li><Link href="/training" className="text-muted-foreground hover:text-primary transition-colors">Build Skills</Link></li>
                   <li><Link href="/ideas-lab" className="text-muted-foreground hover:text-primary transition-colors">Ideas Lab</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} LOG_ON. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
             {socialLinks.map(link => (
                <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary p-2 rounded-full hover:bg-secondary/50 transition-colors">
                  {link.icon}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
