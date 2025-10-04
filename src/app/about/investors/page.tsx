
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, FileText, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Investor Relations',
  description: 'Information for LOG_ON investors, including financial reports, event schedules, and corporate governance documents.',
};

const reports = [
    { title: "Q3 2024 Financial Report", date: "October 28, 2024", href: "#" },
    { title: "2024 Annual Report", date: "February 15, 2025", href: "#" },
];

const events = [
    { title: "Q4 2024 Earnings Call", date: "January 27, 2025", time: "5:00 PM EST" },
    { title: "Annual Shareholder Meeting", date: "May 15, 2025", time: "10:00 AM EST" },
]

export default function InvestorsPage() {
  return (
    <div>
        <PageHero 
            title="Investor Relations"
            description="We are committed to driving long-term shareholder value through innovation, disciplined execution, and transparent communication. Here you will find key resources for our investor community."
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12">
        <section>
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary"/> Stock Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">LOGN (Private)</p>
                    <p className="text-muted-foreground">As a privately held company, LOG_ON is not currently traded on public stock exchanges. We are focused on sustainable growth and delivering value to our clients and private stakeholders.</p>
                </CardContent>
            </Card>
        </section>

        <section>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Financial Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {reports.map(report => (
                    <Card key={report.title} className="hover:border-primary transition-colors">
                        <Link href={report.href} className="block p-6">
                            <FileText className="h-8 w-8 text-primary mb-4"/>
                            <h3 className="font-semibold text-lg">{report.title}</h3>
                            <p className="text-sm text-muted-foreground">{report.date}</p>
                        </Link>
                    </Card>
                ))}
            </div>
        </section>
        
        <section>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {events.map(event => (
                    <Card key={event.title}>
                        <CardHeader>
                            <Calendar className="h-8 w-8 text-primary mb-2"/>
                            <CardTitle>{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{event.date} at {event.time}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        <section className="text-center p-8 border rounded-lg">
            <h2 className="text-2xl font-bold">Contact Investor Relations</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">For investment inquiries, please reach out to our team.</p>
            <Button asChild className="mt-4">
                <Link href="/contact?subject=Investor+Inquiry">Contact IR</Link>
            </Button>
        </section>
      </div>
    </div>
  );
}
