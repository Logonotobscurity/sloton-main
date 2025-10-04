
import {
    IconHumanResources,
    IconSales,
    IconMarketing,
    IconBriefcase,
    IconProcurement,
    IconDevelopment,
    IconHealthcare,
    IconItOperations,
    IconRealEstate,
    IconAdminOps,
    IconSupport,
  } from '@/lib/icons';
import templatesData from '@/lib/data/workflow-templates.json';

export interface TemplateStep {
    name: string;
    description: string;
}

export interface Template {
  category: 'Finance' | 'Human Resources' | 'Sales' | 'Marketing' | 'Real Estate' | 'IT Operations' | 'Procurement' | 'Development' | 'Healthcare' | 'Admin and Ops' | 'CS and Support';
  name: string;
  slug: string;
  description: string;
  purpose?: string;
  steps?: TemplateStep[];
}

export const templates: Template[] = templatesData as Template[];

export function getTemplates(): Template[] {
    return templates;
}

export function getTemplateBySlug(slug: string): Template | undefined {
    return templates.find(template => template.slug === slug);
}
