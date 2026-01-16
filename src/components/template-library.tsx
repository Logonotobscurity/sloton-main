

"use client";

import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Eye, Cog } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  IconGeneral
} from '@/lib/icons';
import { templates as allTemplates, Template } from '@/lib/data/workflow-templates';
import { TaskAutomationForm } from './task-automation-form';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { GatedFeatureModal } from './gated-feature-modal';
import { useTemplateLibrary } from '@/hooks/use-template-library';


const categories = [
  { name: 'Show All', icon: IconGeneral },
  { name: 'Finance', icon: IconBriefcase },
  { name: 'Human Resources', icon: IconHumanResources },
  { name: 'Sales', icon: IconSales },
  { name: 'Marketing', icon: IconMarketing },
  { name: 'Real Estate', icon: IconRealEstate },
  { name: 'IT Operations', icon: IconItOperations },
  { name: 'Procurement', icon: IconProcurement },
  { name: 'Development', icon: IconDevelopment },
  { name: 'Healthcare', icon: IconHealthcare },
  { name: 'Admin and Ops', icon: IconAdminOps },
  { name: 'CS and Support', icon: IconSupport },
];

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

const ITEMS_PER_PAGE = 8; // Adjust to 8 to leave space for the generator card

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const style = categoryStyles[template.category] || categoryStyles['General'];
  return (
    <Card className="bg-background/50 flex flex-col p-6 rounded-xl border-border/50 group transition-colors duration-300 hover:border-primary">
      <CardHeader className="p-0">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", style.iconBg)}>
          <style.icon className={cn("h-6 w-6", style.color)} />
        </div>
        <CardTitle className="pt-4 text-xl font-semibold">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow pt-2">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">{template.description}</p>
      </CardContent>
      <CardFooter className="p-0 pt-6">
        <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-secondary">
                <Link href={`/automation/${template.slug}`}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                </Link>
            </Button>
            <GatedFeatureModal 
                trigger={
                     <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                        Use template
                    </Button>
                }
                featureName="Workflow Customization"
            />
        </div>
      </CardFooter>
    </Card>
  );
};

export function WorkflowTemplateLibrary() {
  const {
    paginatedData: paginatedTemplates,
    totalPages,
    searchTerm,
    selectedCategory,
    currentPage,
    handlePageChange,
    handleCategoryChange,
    handleSearchChange,
    renderPagination,
    hasResults
  } = useTemplateLibrary(allTemplates, ITEMS_PER_PAGE);


  return (
    <div className="py-16 md:py-24">
      <div className="bg-secondary/20 dark:bg-zinc-900/50 -mx-4 md:-mx-10 lg:-mx-20 px-4 md:px-10 lg:px-20 py-12 rounded-t-3xl">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Workflow Template Library</h2>
             <p className="text-md md:text-lg text-muted-foreground mt-4">
              Browse our library of pre-built workflow templates to get started. Use them as-is or as a starting point for your own custom automation.
            </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a workflow template"
              className="w-full h-14 pl-12 pr-4 rounded-lg bg-background border-border/50 shadow-sm"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {categories.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant="outline"
                className={cn(
                  "rounded-full border bg-background transition-colors",
                  selectedCategory === (name === 'Show All' ? 'All' : name)
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'text-foreground border-border hover:bg-secondary'
                )}
                onClick={() => handleCategoryChange(name)}
              >
                <Icon className={cn("mr-2 h-4 w-4", selectedCategory !== name && categoryStyles[name]?.color)} />
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8">
            <h2 className="text-2xl font-bold">
                {selectedCategory === 'All' ? 'Showing All Templates' : `Workflow template results for ${selectedCategory}`}
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <Card className="bg-background/50 flex flex-col p-6 rounded-xl border-amber-500/50 group transition-colors duration-300">
              <CardHeader className="p-0">
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", categoryStyles['IT Operations'].iconBg)}>
                      <Cog className={cn("h-6 w-6", categoryStyles['IT Operations'].color)} />
                  </div>
                  <CardTitle className="pt-4 text-xl font-semibold">Automation Task Designer</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow pt-2">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">Can't find a template? Describe your workflow and our AI will generate a configured, optimized task design in seconds.</p>
              </CardContent>
              <CardFooter className="p-0 pt-6">
                  <Dialog>
                      <DialogTrigger asChild>
                           <Button className="w-full">
                              Create Your Own
                              <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                      </DialogTrigger>
                       <DialogContent className="sm:max-w-[600px] bg-background">
                          <DialogHeader>
                              <DialogTitle className="text-2xl flex items-center gap-2"><Cog className="h-6 w-6 text-accent" /> Automation Task Designer</DialogTitle>
                              <DialogDescription>
                                  Describe a workflow to generate a configured, optimized task design, complete with AI suggestions.
                              </DialogDescription>
                          </DialogHeader>
                          <TaskAutomationForm />
                      </DialogContent>
                  </Dialog>
              </CardFooter>
          </Card>
          {paginatedTemplates.map((template) => {
            return <TemplateCard key={template.slug} template={template} />
          })}
        </div>

        {!hasResults && (
           <div className="text-center py-16 col-span-full">
              <Search className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No Templates Found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or category filters.</p>
            </div>
        )}
      </div>
      
       {totalPages > 1 && (
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {renderPagination().map((item) => (
                <PaginationItem key={item.key}>
                  {item.type === 'page' ? (
                    <PaginationLink
                      href="#"
                      isActive={item.isActive}
                      onClick={(e) => { e.preventDefault(); handlePageChange(item.value as number); }}
                    >
                      {item.value}
                    </PaginationLink>
                  ) : (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                   href="#"
                   onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) handlePageChange(currentPage + 1); }}
                   className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}