
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { communityLeadAction } from '@/app/actions';
import { DatePicker } from './ui/date-picker';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  interest: z.string().optional(),
  date: z.date().optional(),
});

const whatsappLink = "https://wa.me/qr/QFSBRGKZGHP3F1";

export function CommunityLeadForm({ interest }: { interest?: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      interest: interest || 'General Inquiry',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await communityLeadAction(values);
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preferred Date</FormLabel>
                <DatePicker 
                    date={field.value}
                    setDate={field.onChange}
                />
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Input type="hidden" {...form.register("interest")} />
       
        <Button type="submit" className="group w-full flex justify-center gap-2 items-center" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Chat on WhatsApp
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
