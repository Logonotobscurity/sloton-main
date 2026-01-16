
import type { Metadata } from 'next';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { WorkflowTemplateLibrary } from '@/app/automation/_components/workflow-template-library';
import { PageHero } from '@/components/page-sections/page-hero';

export const metadata: Metadata = {
  title: 'Workplace Automation in Nigeria | Intelligent Solutions',
  description: 'Design and deploy workplace automation solutions in Nigeria. Our intelligent automation platform helps you configure RPA & business workflows, with AI-powered optimization.',
};

export default async function AutomationPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const workflow = typeof resolvedSearchParams?.workflow === 'string' ? resolvedSearchParams.workflow : "";

  return (
    <div className="bg-background">
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
