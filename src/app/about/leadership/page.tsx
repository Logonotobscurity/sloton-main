
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, CheckCircle, Lightbulb, Zap, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Our Leadership',
  description: 'Meet the expert team at LOG_ON, a dynamic duo of technology experts dedicated to delivering innovative solutions and exceptional service to drive your business forward.',
};

const teamMembers = [
  {
    name: 'Oluwamayowa Logo',
    role: 'Lead Developer & Automation Solution Architect',
    description: 'Expert in AI architecture and automation solutions with a focus on innovative technology implementation. Specializes in developing scalable solutions for business growth.',
    expertise: ['AI Architecture', 'Strategy', 'Innovation', 'Web Development', 'IT Support', 'Solution Design'],
    image: 'https://picsum.photos/seed/authorOluwamayowa/128/128',
    dataAiHint: 'male developer'
  },
  {
    name: 'Favour Alfred',
    role: 'Team Lead Sales & Business Process Automation',
    description: 'Results-driven professional specializing in business process automation and digital marketing strategies. Expert in optimizing workflows and driving digital transformation.',
    expertise: ['Process Automation', 'Workflow Design', 'Integration', 'Digital Marketing', 'Sales Strategy', 'Business Development'],
    image: 'https://picsum.photos/seed/authorFavour/128/128',
    dataAiHint: 'female professional'
  },
];


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
                    <div className="p-6 text-center md:text-left">
                        <h3 className="font-bold text-2xl">{member.name}</h3>
                        <p className="text-primary mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm">{member.description}</p>
                    </div>
                    <div className="bg-secondary/20 p-6">
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
