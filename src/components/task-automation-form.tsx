
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { exampleWorkflows } from "@/lib/data/example-workflows";
import { motion } from "framer-motion";
import { Loader2, RefreshCw, Wand2 } from "lucide-react";
import { VisualWorkflow } from "./visual-workflow";
import { Badge } from "./ui/badge";
import { getAutomatedTaskDesign } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { AutomateTaskDesignOutput } from "@/ai/flows/automated-task-design";
import { hoverScale, tapScale } from "@/lib/animation-variants";

const formSchema = z.object({
  workflowDescription: z.string().min(10, "Please describe the task you want to automate in at least 10 characters."),
  optimizationSuggestions: z.string().optional(),
});

export function TaskAutomationForm({ initialValues }: { initialValues?: z.infer<typeof formSchema> }) {
  const [result, setResult] = React.useState<AutomateTaskDesignOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflowDescription: initialValues?.workflowDescription || "",
      optimizationSuggestions: initialValues?.optimizationSuggestions || "",
    },
  });
  
  React.useEffect(() => {
    if (initialValues?.workflowDescription) {
        form.setValue("workflowDescription", initialValues.workflowDescription);
    }
  }, [initialValues, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getAutomatedTaskDesign(values);
    setIsLoading(false);
    if (response.data) {
        setResult(response.data);
    } else {
        toast({
            variant: "destructive",
            title: "Error Generating Workflow",
            description: response.error || "An unknown error occurred. Please try again."
        });
    }
  }

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 min-h-[400px]" aria-live="polite">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your custom workflow...</p>
        </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1 -m-1" aria-live="polite">
        <VisualWorkflow result={result} />
        <Button onClick={() => { setResult(null); form.reset({workflowDescription: '', optimizationSuggestions: ''}); }} variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Design Another Task
        </Button>
      </div>
    );
  }

  return (
    <div className="p-1">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="workflowDescription"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-base">Task Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Automate the user onboarding process, including account creation, email verification, and a welcome tour."
                        className="min-h-[100px] resize-y"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="space-y-2">
                    <FormLabel className="text-sm">Or try an example:</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {exampleWorkflows.slice(0,3).map((example, i) => (
                            <Button key={i} type="button" variant="outline" size="sm" onClick={() => form.setValue('workflowDescription', example)}>
                                {example.length > 40 ? example.slice(0, 40) + '...' : example}
                            </Button>
                        ))}
                    </div>
                </div>
                
                <FormField
                control={form.control}
                name="optimizationSuggestions"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2">
                            <FormLabel className="text-base">Optimization (Optional)</FormLabel>
                            <Badge>AI-Powered</Badge>
                        </div>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Use a decision node to check user type (free/paid) and tailor the onboarding flow accordingly."
                        className="min-h-[60px] resize-y"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription className="text-xs">
                        Tell us how you'd like to improve this workflow.
                    </FormDescription>
                    </FormItem>
                )}
                />
                <motion.div
                    className="flex justify-center pt-4"
                    whileHover={hoverScale}
                    whileTap={tapScale}
                >
                    <Button type="submit" size="lg" disabled={isLoading} className="w-full max-w-sm font-semibold shadow-lg">
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                        </>
                    ) : (
                        <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Workflow
                        </>
                    )}
                    </Button>
                </motion.div>
            </form>
        </Form>
    </div>
  );
}
