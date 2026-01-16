
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { communityLeadAction } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  programName: z.string().min(1, { message: 'Please select a program.' }),
});

const trainingPrograms = [
    'AI Investment Guide',
    'Transforming Customer Support with AI',
    'AI Insights: A Practical Guide',
    'Applied AI: Building Recommendation Systems',
    'Quick Start to Prompt Engineering for Developers',
    'Quick Start to Prompt Engineering for Business Users',
    'AI Solutions Development',
    'Process Automation Mastery',
    'Chatbot Development',
    'Digital Transformation Strategy'
];

const whatsappLink = "https://wa.me/qr/QFSBRGKZGHP3F1";

export function EnrollmentForm({ programName }: { programName?: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      programName: programName || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await communityLeadAction({name: values.name, email: values.email, interest: values.programName});
    if(result?.success) {
        toast({
            title: "Let's Talk!",
            description: "Redirecting you to WhatsApp to start the conversation.",
        });
        window.open(whatsappLink, '_blank');
        form.reset();
    } else {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: result?.error || "There was a problem with your request. Please try again.",
        });
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                    <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 8900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />
        {!programName || programName === "AI Investment Guide" ? (
             <FormField
                control={form.control}
                name="programName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Program of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {trainingPrograms.map(program => (
                                <SelectItem key={program} value={program}>{program}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
        ) : (
             <Input type="hidden" {...form.register("programName")} />
        )}
       
        <Button type="submit" className="w-full flex justify-center gap-2 items-center" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Submit Enrollment
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
