
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-hero';
import { teamMembers } from '@/lib/team-members';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Leadership',
  description: 'Meet the expert team at LOG_ON, a dynamic duo of technology experts dedicated to delivering innovative solutions and exceptional service to drive your business forward.',
};

export default function LeadershipPage() {
  return (
    <div>
        <PageHero 
            title="Meet Our Leadership"
            description="Our team is led by a dynamic duo of technology experts dedicated to delivering innovative solutions and exceptional service to our clients."
        />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {teamMembers.map((member) => (
                <GlowingCard key={member.name}>
                    <div className="p-6 text-center md:text-left md:flex md:gap-6">
                        <div className="md:w-1/3 flex-shrink-0 flex justify-center">
                             <div className="relative h-32 w-32" data-ai-hint={member.dataAiHint}>
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    layout="fill"
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3 mt-4 md:mt-0">
                            <h3 className="font-bold text-2xl">{member.name}</h3>
                            <p className="text-primary mb-3">{member.role}</p>
                            <p className="text-muted-foreground text-sm">{member.bio}</p>
                        </div>
                    </div>
                    <div className="bg-secondary/20 p-6 border-t">
                        <h4 className="font-semibold mb-4 text-primary">Areas of Expertise</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                            {member.expertise.map(skill => (
                                <div key={skill} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-accent" />
                                    <span className="text-sm text-muted-foreground">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlowingCard>
                ))}
            </div>
        </div>
    </div>
  );
}
