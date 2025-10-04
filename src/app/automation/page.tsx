
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { WorkflowTemplateLibrary } from '@/components/workflow-template-library';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Intelligent Automation Solutions | RPA & Workflow Design',
  description: 'Design, configure, and deploy automated IT tasks and business workflows with our intelligent automation and RPA solutions. Get AI-powered optimization suggestions.',
};

function AutomationPageContent({ workflow }: { workflow?: string }) {
  const initialValues = {
    workflowDescription: workflow || "When a new user signs up, send them a welcome email, add them to our CRM, and schedule a follow-up task for the sales team in 3 days.",
  };

  return (
    <div className="bg-background">
      <PageHero 
        title="Intelligent Automation Task Designer"
        description="Describe a workflow to generate a configured, optimized task design, complete with AI suggestions. Go from idea to a fully-structured automation plan in seconds."
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            <TaskAutomationForm initialValues={initialValues} />
        </div>

        <div className="mt-16 md:mt-24">
          <WorkflowTemplateLibrary />
        </div>

      </div>
    </div>
  );
}

export default function AutomationPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const workflow = typeof searchParams?.workflow === 'string' ? searchParams.workflow : undefined;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AutomationPageContent workflow={workflow} />
    </Suspense>
  );
}
