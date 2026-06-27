
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema, BreadcrumbSchema } from '@/lib/seo';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { WorkflowTemplateLibrary } from '@/app/automation/_components/workflow-template-library';
import { PageHero } from '@/components/page-sections/page-hero';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Clock, TrendingDown, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = generateMetadata({
  title: 'Workplace Automation & RPA Solutions in Nigeria | Intelligent Workflows',
  description: 'Design and deploy workplace automation solutions in Nigeria. Our intelligent RPA platform helps you configure business workflows with AI-powered optimization. Automate repetitive tasks, reduce costs, and boost productivity with LOG_ON automation services.',
  keywords: [
    ...KEYWORD_SETS.automation,
    'workplace automation Nigeria',
    'RPA Nigeria',
    'business process automation Lagos',
    'workflow automation',
    'intelligent automation Nigeria',
    'process optimization',
    'task automation',
    'robotic process automation',
  ],
  canonical: 'https://logonsolutions.netlify.app/automation',
});

const automationServiceSchema = generateServiceSchema({
  name: 'Workplace Automation & RPA Solutions',
  description: 'Design and deploy workplace automation solutions in Nigeria. Our intelligent automation platform helps you configure RPA & business workflows, with AI-powered optimization.',
  url: 'https://logonsolutions.netlify.app/automation',
  provider: 'LOG_ON',
  areaServed: 'Nigeria',
});

const stats = [
  { icon: TrendingDown, value: '30%', label: 'Average cost reduction for clients within 12 months' },
  { icon: Clock, value: '50%+', label: 'Increase in process throughput speed' },
  { icon: Users, value: '40hrs', label: 'Average hours per week saved per team' },
];

const automationTypes = [
  {
    title: 'Robotic Process Automation (RPA)',
    description: 'Software bots that mimic human actions — clicking, typing, reading screens — to execute high-volume, rule-based tasks across any application without API access. Ideal for data entry, reconciliation, and compliance reporting.',
  },
  {
    title: 'AI-Powered Workflow Automation',
    description: 'Unlike basic RPA, AI-powered automation handles unstructured inputs like emails, documents, and images. Using NLP and computer vision, our systems understand intent, extract data, and make decisions dynamically.',
  },
  {
    title: 'Business Process Automation (BPA)',
    description: 'End-to-end automation of multi-step processes spanning multiple systems and departments. We map your complete workflow, identify bottlenecks, and deploy integrated automation that connects your CRM, ERP, and cloud tools.',
  },
  {
    title: 'Attended & Unattended Automation',
    description: 'Attended bots work alongside your team in real-time (e.g., auto-filling forms during a customer call). Unattended bots run 24/7 without human involvement (e.g., overnight batch processing). We design the right blend for your operations.',
  },
];

export default async function AutomationPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const workflow = typeof resolvedSearchParams?.workflow === 'string' ? resolvedSearchParams.workflow : "";

  return (
    <div className="bg-background">
      <JsonLd data={automationServiceSchema} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://logonsolutions.netlify.app' },
        { name: 'Automation', url: 'https://logonsolutions.netlify.app/automation' },
      ]} />
      <PageHero 
        title="Intelligent Workplace Automation & RPA"
        description="Eliminate repetitive, manual work from your operations. LOG_ON designs and deploys custom AI-powered automation and Robotic Process Automation (RPA) solutions that free your team to focus on strategy, relationships, and innovation."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">

        {/* Proof stats */}
        <section aria-label="Automation impact metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 md:mb-24">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20">
              <stat.icon className="h-8 w-8 text-primary mb-3" />
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Canonical definitions for GEO/LLMs */}
        <section className="mb-16 md:mb-24 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">What Is Workplace Automation?</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Workplace automation is the use of technology to perform tasks that previously required human effort. It spans a spectrum from simple, rule-based <strong>Robotic Process Automation (RPA)</strong> — where bots execute repetitive, click-by-click tasks — to sophisticated <strong>AI-powered automation</strong> that can reason, understand natural language, and make decisions from unstructured data.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            At LOG_ON, our automation engagements always begin with a <Link href="/contact?subject=Automation+Assessment" className="text-primary underline hover:no-underline">free workflow analysis</Link>. We map your existing processes, identify the highest-ROI automation candidates, and design a phased roadmap — so you see measurable results in weeks, not months. Our solutions integrate directly with the systems you already use: CRM, ERP, email platforms, and cloud infrastructure.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {automationTypes.map(type => (
              <Card key={type.title} className="bg-secondary/30">
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive workflow designer */}
        <section className="mb-16 md:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Design Your Workflow Now</h2>
            <p className="mt-3 text-muted-foreground">
              Describe a process in plain language. Our AI generates a structured workflow plan with optimisation suggestions — instantly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TaskAutomationForm initialValues={{ workflowDescription: workflow }} />
          </div>
        </section>

        <div className="mt-fluid-lg">
          <WorkflowTemplateLibrary />
        </div>

        {/* Internal cross-links for topical authority */}
        <section className="mt-16 md:mt-24 py-12 border-t">
          <h2 className="text-xl font-bold font-headline mb-6">Automation by Industry</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/use-cases#finance">Finance & Banking Automation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/use-cases#healthcare">Healthcare Process Automation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/use-cases#e-commerce">E-Commerce Workflow Automation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/solutions#chatbots">AI Chatbot Automation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <p className="mt-6 text-muted-foreground text-sm">
            Want to build automation skills in-house? Explore our{' '}
            <Link href="/training" className="text-primary underline hover:no-underline">Process Automation Mastery training programme</Link> or read our{' '}
            <Link href="/insights" className="text-primary underline hover:no-underline">automation insights and guides</Link>.
          </p>
        </section>

      </div>
    </div>
  );
}
