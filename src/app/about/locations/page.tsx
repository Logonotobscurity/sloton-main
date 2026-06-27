
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/page-sections/page-hero';
import { locations } from '@/lib/data/locations-data';

export const metadata: Metadata = {
  title: 'Our Locations',
  description: 'Find LOG_ON office information. We operate globally from our virtual headquarters in Lagos, Nigeria.',
};

export default function LocationsPage() {
  return (
    <div>
      <PageHero 
        title="Our Locations"
        description="While our headquarters is virtually based in the vibrant tech hub of Lagos, Nigeria, our operations and impact are global. We leverage a remote-first model to collaborate with clients and partners worldwide, ensuring we can bring our expertise wherever it's needed."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
         <div className="grid grid-cols-1 gap-8">
            {locations.map(loc => (
                <Card key={loc.name}>
                    <CardHeader>
                        <CardTitle className="text-2xl">{loc.name}</CardTitle>
                        <p className="text-primary font-semibold">{loc.region}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Globe className="h-5 w-5"/>
                            <span>{loc.address}</span>
                        </div>
                         <div className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="h-5 w-5"/>
                             <a href={`mailto:${loc.email}`} className="hover:text-primary">{loc.email}</a>
                        </div>
                         <div className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="h-5 w-5"/>
                            <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="hover:text-primary">{loc.phone}</a>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
