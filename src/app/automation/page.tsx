
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema } from '@/lib/seo';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { WorkflowTemplateLibrary } from '@/app/automation/_components/workflow-template-library';
import { PageHero } from '@/components/page-sections/page-hero';

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
      <PageHero 
        title="Intelligent Automation Task Designer"
        description="Describe a workflow to generate a configured, optimized task design, complete with AI suggestions. Go from idea to a fully-structured automation plan in seconds."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            <TaskAutomationForm initialValues={{ workflowDescription: workflow }} />
        </div>

        <div className="mt-fluid-lg">
          <WorkflowTemplateLibrary />
        </div>

      </div>
    </div>
  );
}
