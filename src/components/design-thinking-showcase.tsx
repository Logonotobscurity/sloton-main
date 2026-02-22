"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users, Pencil, Rocket, FlaskConical, TrendingUp } from "lucide-react";
import { DesignThinkingProcess } from "@/lib/data/case-studies";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainerCustom } from "@/lib/animation-variants";

interface DesignThinkingShowcaseProps {
  process: DesignThinkingProcess;
  client: string;
}

const processSteps = [
  {
    key: "empathize" as keyof DesignThinkingProcess,
    title: "1. Empathize",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    key: "define" as keyof DesignThinkingProcess,
    title: "2. Define",
    icon: Pencil,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    key: "ideate" as keyof DesignThinkingProcess,
    title: "3. Ideate",
    icon: Lightbulb,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    key: "prototype" as keyof DesignThinkingProcess,
    title: "4. Prototype",
    icon: Rocket,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    key: "test" as keyof DesignThinkingProcess,
    title: "5. Test",
    icon: FlaskConical,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    key: "outcome" as keyof DesignThinkingProcess,
    title: "Outcome",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function DesignThinkingShowcase({ process, client }: DesignThinkingShowcaseProps) {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="text-sm">Design Thinking Process</Badge>
        <span className="text-sm text-muted-foreground">How we transformed abstract ideas into concrete solutions</span>
      </div>

      <motion.div
        variants={staggerContainerCustom(0.1, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const content = process[step.key];

          return (
            <motion.div key={step.key} variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${step.bgColor}`}>
                      <Icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Design Thinking Impact
        </h4>
        <p className="text-sm text-muted-foreground">
          By following a structured design thinking process, we transformed {client}'s abstract vision into a concrete, user-centered solution that delivers measurable business value. Each phase built upon insights from the previous, ensuring the final product truly meets user needs.
        </p>
      </div>
    </div>
  );
}
