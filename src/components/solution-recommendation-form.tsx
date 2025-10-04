"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSolutionRecommendation } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, ArrowRight, ArrowLeft, Calendar, RefreshCw } from 'lucide-react';
import type { SolutionRecommendationOutput } from '@/ai/flows/solution-recommendation';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowIcon } from './ui/arrow-icon';

const formSchema = z.object({
  businessNeeds: z.string().min(20, 'Please describe your business needs in at least 20 characters.'),
  companySize: z.string().min(1, 'Please select a company size.'),
  industry: z.string().min(2, 'Please enter your industry.'),
  budget: z.string().min(1, 'Please select a budget range.'),
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
});

export function SolutionRecommendationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SolutionRecommendationOutput | null>(null);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessNeeds: '',
      companySize: '',
      industry: '',
      budget: '',
      name: '',
      email: '',
      phone: '',
    },
  });

  const { trigger } = form;

  const handleNext = async () => {
    const fieldsToValidate: ("businessNeeds" | "companySize" | "industry" | "budget" | "name" | "email" | "phone")[] = 
      step === 1 ? ["businessNeeds"] : 
      step === 2 ? ["companySize", "industry", "budget"] :
      [];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await getSolutionRecommendation(values);
      if (res.error) {
        toast({
          variant: 'destructive',
          title: 'Error Generating Report',
          description: res.error,
        });
      } else {
        setResult(res.data);
        setStep(4); // Move to result view
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 min-h-[300px]" aria-live="polite">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Analyzing your needs and crafting solutions...</p>
      </div>
    );
  }

  if (result && step === 4) {
    return (
       <div className="p-1 space-y-6" aria-live="polite">
        <div className="space-y-8 max-h-[60vh] overflow-y-auto p-4 -m-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Executive Summary</h3>
              <Card className="bg-secondary/30">
                  <CardContent className="pt-6 space-y-2 text-sm">
                      <p><strong>Overview:</strong> {result.executiveSummary.overview}</p>
                      <p><strong>Opportunity:</strong> {result.executiveSummary.primaryOpportunity}</p>
                      <p><strong>ROI Timeline:</strong> {result.executiveSummary.expectedRoiTimeframe}</p>
                  </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Recommended Solution Path</h3>
                  <Card className="bg-secondary/30">
                      <CardHeader>
                          <CardTitle>{result.recommendedSolutionPath.coreTechnology.solutionName}</CardTitle>
                          <CardDescription>{result.recommendedSolutionPath.coreTechnology.justification}</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <h4 className="font-semibold mb-4 text-foreground">Expected Outcomes</h4>
                          <div className="hidden md:block">
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Metric</TableHead>
                                          <TableHead>Current</TableHead>
                                          <TableHead>Improvement</TableHead>
                                          <TableHead>Timeframe</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {result.recommendedSolutionPath.expectedOutcomes.map((outcome, index) => (
                                          <TableRow key={index}>
                                              <TableCell className="font-medium">{outcome.metric}</TableCell>
                                              <TableCell>{outcome.currentState}</TableCell>
                                              <TableCell className="text-green-500 font-semibold">{outcome.projectedImprovement}</TableCell>
                                              <TableCell>{outcome.timeframe}</TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </div>
                          <div className="block md:hidden space-y-2 text-sm">
                              {result.recommendedSolutionPath.expectedOutcomes.map((outcome, index) => (
                                <div key={index} className="p-3 rounded-md bg-background/50">
                                    <p className="font-semibold">{outcome.metric}</p>
                                    <div className="flex justify-between items-center text-muted-foreground mt-1">
                                      <span>Current State: {outcome.currentState}</span>
                                      <span className="text-green-500 font-semibold">{outcome.projectedImprovement}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Timeframe: {outcome.timeframe}</p>
                                </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Next Steps</h3>
                <div className="hidden md:block">
                  <Table>
                      <TableHeader>
                          <TableRow>
                          <TableHead>Action Item</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Deadline</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {result.nextSteps.map((step, index) => (
                          <TableRow key={index}>
                              <TableCell className="font-medium">{step.actionItem}</TableCell>
                              <TableCell>{step.owner}</TableCell>
                              <TableCell>{step.deadline}</TableCell>
                          </TableRow>
                          ))}
                      </TableBody>
                  </Table>
                </div>
                <div className="block md:hidden space-y-2 text-sm">
                    {result.nextSteps.map((step, index) => (
                        <div key={index} className="p-3 rounded-md bg-background/50">
                            <p className="font-semibold">{step.actionItem}</p>
                            <div className="flex justify-between items-center text-muted-foreground mt-1">
                                <span>Owner: {step.owner}</span>
                                <span className="font-semibold">{step.deadline}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="group flex justify-center gap-2 items-center">
                <Link href="https://calendly.com/" target="_blank">
                    <Calendar className="mr-2 h-4 w-4" /> Book a Free Consultation
                </Link>
            </Button>
            <Button variant="outline" size="icon" onClick={() => { setResult(null); form.reset(); setStep(1); }} title="Start a New Assessment">
                <RefreshCw className="h-4 w-4" />
            </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="px-1 py-2">
            <Progress value={(step / 3) * 100} className="w-full h-2" />
             <p className="text-xs text-muted-foreground text-center mt-2">Step {step} of 3</p>
        </div>
        
        {step === 1 && (
           <FormField
            control={form.control}
            name="businessNeeds"
            render={({ field }) => (
                <FormItem>
                <FormLabel>What are your primary business goals or challenges?</FormLabel>
                <FormControl>
                    <Textarea placeholder="e.g., We need to reduce customer support costs and improve response times, while also streamlining our sales process to handle more clients." {...field} rows={5} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        )}

        {step === 2 && (
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                            <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                            <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                            <SelectItem value="201-1000 employees">201-1000 employees</SelectItem>
                            <SelectItem value="1000+ employees">1000+ employees</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., E-commerce, Finance" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Project Budget Range (USD)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Under $5,000 USD">Under $5,000</SelectItem>
                        <SelectItem value="$5,000 - $20,000 USD">$5,000 - $20,000</SelectItem>
                        <SelectItem value="$20,000 - $100,000 USD">$20,000 - $100,000</SelectItem>
                        <SelectItem value="$100,000+ USD">$100,000+</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        )}

        {step === 3 && (
             <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Almost there! Just a few details to finalize your personalized plan.</p>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                            <Input placeholder="+1 234 567 8900" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </div>
        )}
        
        <div className="flex justify-between gap-4 pt-4">
            {step > 1 && (
                <Button type="button" variant="secondary" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            )}

            {step < 3 ? (
                <Button type="button" onClick={handleNext} className="group flex justify-center gap-2 items-center">
                    Next
                    <ArrowIcon />
                </Button>
            ) : (
                <Button type="submit" disabled={loading} className="group flex justify-center gap-2 items-center w-full">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate My Free Report
                </Button>
            )}
        </div>
      </form>
    </Form>
  );
}
