
import { teamMembers } from "@/lib/data/team-members";
import { PageHero } from "@/components/page-sections/page-hero";
import { BottomCta } from "@/components/page-sections/bottom-cta";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import { FillImage } from '@/lib/image-utils';

export const metadata: Metadata = {
  title: 'Our Leadership | AI & Automation Experts',
  description: 'Meet the expert team behind LOG_ON, driving AI agent development and workplace automation solutions in Nigeria. Our leadership is committed to innovation and client success.',
};

export default function LeadershipPage() {
    return (
        <div>
             <PageHero 
                title="Our Leadership"
                description="Meet the visionaries guiding LOG_ON. Our leadership team brings a wealth of experience from the forefront of technology, business, and research. They are united by a shared passion for innovation and a commitment to our clients' success."
            />

            <section className="py-fluid-lg">
                <div className="container mx-auto px-fluid-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                       {teamMembers.map(member => (
                            <Card key={member.name} className="overflow-hidden bg-secondary/20">
                                <div className="grid grid-cols-1 md:grid-cols-3 items-start">
                                    <div className="md:col-span-1 p-4 md:p-6 flex flex-col items-center text-center">
                                        <div data-ai-hint={member.dataAiHint} className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-primary/50 mb-4">
                                            <FillImage 
                                                src={member.image}
                                                alt={member.name}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                                        <p className="text-muted-foreground font-medium">{member.role}</p>
                                        <div className="flex items-center space-x-3 mt-4">
                                            <Link href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary"><Mail size={20}/></Link>
                                            <Link href={member.socials.linkedin} target="_blank" className="text-muted-foreground hover:text-primary"><Linkedin size={20}/></Link>
                                            {member.socials.twitter && <Link href={member.socials.twitter} target="_blank" className="text-muted-foreground hover:text-primary"><Twitter size={20}/></Link>}
                                            {member.socials.github && <Link href={member.socials.github} target="_blank" className="text-muted-foreground hover:text-primary"><Github size={20}/></Link>}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 p-6 bg-background rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
                                        <p className="text-muted-foreground">{member.bio}</p>
                                    </div>
                                </div>
                            </Card>
                       ))}
                    </div>
                </div>
            </section>

            <BottomCta />
        </div>
    );
}
