'use client';

import { useFilteredData } from '@/hooks/use-filtered-data';

export interface TemplateItem {
  name: string;
  description: string;
  category: string;
  slug: string;
  [key: string]: any;
}

export function useTemplateLibrary(templates: TemplateItem[], itemsPerPage = 9) {
  return useFilteredData(templates, {
    searchFields: ['name', 'description'],
    categoryField: 'category',
    itemsPerPage
  });
}