

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTemplateBySlug } from '@/lib/workflow-templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Share2, ArrowLeft, CheckCircle, Lightbulb, Workflow, Send, Eye, Cog, Calendar, MessageCircle, Edit } from 'lucide-react';
import { ShareModal } from '@/components/share-modal';
import type { Metadata } from 'next';
import { IconAdminOps, IconSupport, IconDevelopment, IconBriefcase, IconHealthcare, IconHumanResources, IconItOperations, IconMarketing, IconProcurement, IconRealEstate, IconSales, IconGeneral } from '@/lib/icons';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { GatedFeatureModal } from '@/components/gated-feature-modal';
import { DialogFormWrapper } from '@/components/dialog-form-wrapper';
import { CommunityLeadForm } from '@/components/community-lead-form';
import { PageHero } from '@/components/page-hero';
import { getTemplates } from '@/lib/workflow-templates';

const categoryStyles: { [key: string]: { icon: React.ElementType, iconBg: string, color: string } } = {
  'Finance': { icon: IconBriefcase, iconBg: "bg-green-100 dark:bg-green-900/50", color: "text-green-600 dark:text-green-400" },
  'Human Resources': { icon: IconHumanResources, iconBg: "bg-blue-100 dark:bg-blue-900/50", color: "text-blue-600 dark:text-blue-400" },
  'Sales': { icon: IconSales, iconBg: "bg-orange-100 dark:bg-orange-900/50", color: "text-orange-600 dark:text-orange-400" },
  'Marketing': { icon: IconMarketing, iconBg: "bg-purple-100 dark:bg-purple-900/50", color: "text-purple-600 dark:text-purple-400" },
  'Real Estate': { icon: IconRealEstate, iconBg: "bg-violet-100 dark:bg-violet-900/50", color: "text-violet-600 dark:text-violet-400" },
  'IT Operations': { icon: IconItOperations, iconBg: "bg-pink-100 dark:bg-pink-900/50", color: "text-pink-600 dark:text-pink-400" },
  'Procurement': { icon: IconProcurement, iconBg: "bg-indigo-100 dark:bg-indigo-900/50", color: "text-indigo-600 dark:text-indigo-400" },
  'Development': { icon: IconDevelopment, iconBg: "bg-red-100 dark:bg-red-900/50", color: "text-red-600 dark:text-red-400" },
  'Healthcare': { icon: IconHealthcare, iconBg: "bg-emerald-100 dark:bg-emerald-900/50", color: "text-emerald-600 dark:text-emerald-400" },
  'Admin and Ops': { icon: IconAdminOps, iconBg: "bg-yellow-100 dark:bg-yellow-900/50", color: "text-yellow-600 dark:text-yellow-400" },
  'CS and Support': { icon: IconSupport, iconBg: "bg-cyan-100 dark:bg-cyan-900/50", color: "text-cyan-600 dark:text-cyan-400" },
  'General': { icon: IconGeneral, iconBg: "bg-gray-100 dark:bg-gray-900/50", color: "text-gray-600 dark:text-gray-400" },
};


type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = getTemplateBySlug(params.slug);
  if (!template) {
    return { title: 'Template Not Found' };
  }
  return {
    title: `${template.name} | Workflow Template`,
    description: template.description,
  };
}

export default function TemplatePreviewPage({ params }: { params: { slug: string } }) {
  const template = getTemplateBySlug(params.slug);

  if (!template) {
    notFound();
  }
  
  const fullDescription = template.steps ? template.steps.map(step => `${step.name}: ${step.description}`).join('; ') : template.description;

  const allTemplates = getTemplates();
  const relatedTemplates = allTemplates
    .filter(t => t.category === template.category && t.slug !== template.slug)
    .slice(0, 3);

  return (
    <div>
      <PageHero
        title={template.name}
        description={template.description}
        icon={<ShareModal title={template.name} />}
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Link href="/automation" className="text-primary hover:underline flex items-center gap-2 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Template Library
          </Link>

          {template.steps && (
            <section className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Workflow className="h-6 w-6 text-primary" /> Workflow Steps</h2>
                {template.steps.map((step, index) => (
                    <Card key={index} className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle>Step {index + 1} - {step.name}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>
          )}

          {template.purpose && (
             <section className="mt-12">
                <h2 className="text-2xl font-bold">The Purpose of {template.name}</h2>
                <div className="prose dark:prose-invert max-w-none mt-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: template.purpose.replace(/\n/g, '<br />') }} />
            </section>
          )}

           <section className="mt-12 text-center bg-primary/10 p-8 rounded-lg">
                <h2 className="text-2xl font-bold">Ready to use this template?</h2>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Take the next step by deploying this workflow, or customize it to your exact needs using our AI-powered designer.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <Button asChild size="lg">
                        <Link href={`/automation?workflow=${encodeURIComponent(fullDescription)}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Customize with AI
                        </Link>
                    </Button>
                    <DialogFormWrapper
                        trigger={<Button size="lg" variant="secondary">Book a Demo</Button>}
                        className="bg-background"
                    >
                        <DialogHeader>
                            <DialogTitle>Book a Free Demo</DialogTitle>
                            <DialogDescription>
                                {`Interested in the "${template.name}" template? Fill out your details below to connect with our team on WhatsApp.`}
                            </DialogDescription>
                        </DialogHeader>
                        <CommunityLeadForm interest={`Template: ${template.name}`} />
                    </DialogFormWrapper>
                </div>
           </section>

           <section className="mt-16 py-12 border-t">
                 <h2 className="text-2xl font-bold text-center">View other {template.category} templates</h2>
                 <div className="mt-8 grid md:grid-cols-3 gap-6">
                    {relatedTemplates.map(related => {
                       const style = categoryStyles[related.category] || categoryStyles['General'];
                       return (
                          <Card key={related.slug} className="bg-background/50 flex flex-col p-6 rounded-xl border-border/50 group transition-colors duration-300 hover:border-primary">
                            <CardHeader className="p-0">
                              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", style.iconBg)}>
                                <style.icon className={cn("h-6 w-6", style.color)} />
                              </div>
                              <CardTitle className="pt-4 text-xl font-semibold">{related.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-grow pt-2">
                              <p className="text-muted-foreground leading-relaxed line-clamp-3">{related.description}</p>
                            </CardContent>
                            <CardFooter className="p-0 pt-6">
                                <div className="flex items-center gap-2">
                                    <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-secondary">
                                        <Link href={`/automation/${related.slug}`}>
                                            <Eye className="mr-2 h-4 w-4" /> Preview
                                        </Link>
                                    </Button>
                                    <GatedFeatureModal
                                        trigger={
                                            <Button variant="outline" size="sm" className="rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                                Use template
                                            </Button>
                                        }
                                        featureName="Workflow Customization"
                                    />
                                </div>
                            </CardFooter>
                          </Card>
                       )
                    })}
                 </div>
                 {relatedTemplates.length > 0 && (
                     <div className="text-center mt-8">
                         <Button variant="outline" asChild>
                             <Link href="/automation">View all templates</Link>
                         </Button>
                     </div>
                 )}
           </section>

           <section className="mt-12 bg-secondary/50 p-8 rounded-lg text-center">
                <Lightbulb className="h-10 w-10 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Need a unique template?</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our AI-powered workflow template generator can create a bespoke template based on your prompt in minutes.</p>
                <div className="mt-6">
                     <Button asChild>
                        <Link href="/automation">
                            <Send className="mr-2 h-4 w-4"/>
                            Go to Workflow Generator
                        </Link>
                    </Button>
                </div>
           </section>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const templates = getTemplates();
  return templates.map((template) => ({
    slug: template.slug,
  }));
}
