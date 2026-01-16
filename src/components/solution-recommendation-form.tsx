
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2, RefreshCw, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSolutionRecommendationAction } from "@/app/actions";
import { SolutionRecommendationOutput } from "@/ai/flows/solution-recommendation";
import { AssessmentResult } from "./chatbot/assessment-result";
import { hoverLift, tapScale } from "@/lib/animation-variants";

const formSchema = z.object({
  industry: z.string().min(3, "Please specify your industry."),
  challenge: z.string().min(10, "Please describe your primary challenge in at least 10 characters."),
  goals: z.string().min(10, "Please describe your primary goals in at least 10 characters."),
});

export default function SolutionRecommendationForm() {
  const [result, setResult] = React.useState<SolutionRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      challenge: "",
      goals: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getSolutionRecommendationAction(values);
    setIsLoading(false);

    if (response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error Generating Recommendation",
        description: (response as { error?: string }).error || "An unknown error occurred. Please try again."
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 min-h-[400px]" aria-live="polite">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Generating your personalized recommendation...</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1 -m-1" aria-live="polite">
        <AssessmentResult result={result} />
        <Button onClick={() => { setResult(null); form.reset(); }} variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g., E-Commerce, Healthcare, Finance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Business Challenge</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'High customer support costs and slow response times.'"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Business Goals</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'Reduce operational costs by 20% and improve customer satisfaction.'"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div
          className="pt-4"
          whileHover={hoverLift}
          whileTap={tapScale}
        >
          <Button type="submit" size="lg" disabled={isLoading} className="w-full font-semibold">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            Generate Recommendation
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
