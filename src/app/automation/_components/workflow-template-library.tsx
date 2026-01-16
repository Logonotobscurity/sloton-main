
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Eye, Cog, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getTemplates, Template } from '@/lib/data/workflow-templates';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { GatedFeatureModal } from '@/components/gated-feature-modal';
import { categoryStyles, categories } from '@/lib/category-styles';
import { slugify } from '@/lib/slugify';


const ITEMS_PER_PAGE = 8; 

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const style = categoryStyles[template.category] || categoryStyles['General'];
  const fullDescription = template.steps ? template.steps.map(step => `${step.name}: ${step.description}`).join('; ') : template.description;
  const CategoryIcon = style.icon;

  return (
    <Card className="bg-background/50 flex flex-col p-6 rounded-xl border-border/50 group transition-colors duration-300 hover:border-primary">
      <CardHeader className="p-0">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", style.iconBg)}>
          <CategoryIcon className={cn("h-6 w-6", style.color)} />
        </div>
        <CardTitle className="pt-4 text-xl font-semibold">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow pt-2">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">{template.description}</p>
      </CardContent>
      <CardFooter className="p-0 pt-6">
        <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-secondary">
                <Link href={`/automation/${slugify(template.name)}`}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                </Link>
            </Button>
             <GatedFeatureModal
                trigger={
                    <Button asChild variant="outline" size="sm" className="rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                         <Link href={`/automation?workflow=${encodeURIComponent(fullDescription)}`}>
                            Use template
                        </Link>
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
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
 
  useEffect(() => {
    setAllTemplates(getTemplates());
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === 'Show All' ? 'All' : category);
    setCurrentPage(1);
  };
  
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template => {
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, allTemplates]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredTemplates]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };
  
  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    return pageNumbers.map((num, index) => (
        <PaginationItem key={index}>
            {typeof num === 'number' ? (
                <PaginationLink
                    href="#"
                    isActive={currentPage === num}
                    onClick={(e) => { e.preventDefault(); handlePageChange(num); }}
                >
                    {num}
                </PaginationLink>
            ) : (
                <PaginationEllipsis />
            )}
        </PaginationItem>
    ));
  };


  return (
    <div className="py-fluid-lg">
      <div className="bg-secondary/20 -mx-fluid-sm md:-mx-10 lg:-mx-20 px-fluid-sm md:px-10 lg:px-20 py-12 rounded-t-3xl">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-fluid-xl font-bold font-headline mb-4">Workflow Template Library</h2>
             <p className="text-fluid-base text-muted-foreground mt-4">
              Browse our library of pre-built workflow templates to get started. Use them as-is or as a starting point for your own custom automation.
            </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a workflow template"
              className="w-full h-14 pl-12 pr-4 rounded-lg bg-background border-border/50 shadow-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
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
                onClick={() => handleCategoryClick(name)}
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
           <Card className="bg-primary/10 flex flex-col p-6 rounded-xl border-primary/50 group transition-colors duration-300">
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

        {filteredTemplates.length === 0 && (
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
              
              {renderPagination()}

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
