
import templatesData from '@/lib/data/workflow-templates.json';
import { slugify } from '@/lib/slugify';

export interface TemplateStep {
    name: string;
    description: string;
}

export interface Template {
  category: string;
  name: string;
  slug: string;
  description: string;
  purpose?: string;
  steps?: TemplateStep[];
}

// Add a slug to each template object dynamically
export function getTemplates(): Template[] {
    return (templatesData as Omit<Template, 'slug'>[]).map(template => ({
        ...template,
        slug: slugify(template.name)
    }));
}

// Export templates array for backward compatibility
export const templates = getTemplates();

export function getTemplateBySlug(slug: string): Template | undefined {
    const allTemplates = getTemplates();
    return allTemplates.find(template => template.slug === slug);
}
