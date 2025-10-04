
"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const IntegrationsComponent = () => {
  const integrations = [
    {
      name: "Google Drive",
      description:
        "Access and manage your files from Google Drive within our platform.",
      icon: "logos:google-drive",
    },
    {
      name: "Slack",
      description:
        "Receive notifications and collaborate with your team through Slack.",
      icon: "logos:slack-icon",
    },
    {
      name: "GitHub",
      description:
        "Connect your GitHub repositories to streamline your development workflow.",
      icon: "mdi:github",
      color: "text-neutral-500 dark:text-neutral-200",
    },
    {
      name: "Stripe",
      description:
        "Process payments and manage subscriptions with our Stripe integration.",
      icon: "logos:stripe",
    },
    {
      name: "Salesforce",
      description:
        "Sync your customer data between our platform and Salesforce.",
      icon: "logos:salesforce",
    },
    {
      name: "Notion",
      description:
        "Organize your projects and documents with our Notion integration.",
      icon: "logos:notion-icon",
    },
  ];
  const [hovered, setHovered] = React.useState<number | null>(null);

  const containerVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-5xl mx-auto md:gap-10 gap-y-10"
    >
      {integrations.map((integration, idx) => (
        <motion.div
          variants={containerVariants}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          key={integration.name}
          className={cn(
            "p-4 rounded-xl border border-transparent dark:border-white/[0.2] group/feature bg-secondary/30 relative z-20"
          )}
        >
          <AnimatePresence>
            {hovered === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                className="hidden lg:block absolute inset-0 h-full w-full bg-gradient-to-t from-background/50 dark:from-background to-transparent  rounded-xl pointer-events-none"
              />
            )}
          </AnimatePresence>

          <div className="flex flex-col  p-4 relative z-30">
            <Icon
              icon={integration.icon}
              className={cn("w-10 h-10", integration.color)}
            />
            <h1 className="text-lg font-bold text-foreground mt-4">
              {integration.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {integration.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
