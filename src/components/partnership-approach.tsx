
"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { CaseStudiesCarousel } from "./case-studies-carousel";
import { motion } from 'framer-motion';

const partners = [
    { name: "Google Cloud Partner", logo: "https://img.icons8.com/color/96/google-cloud.png", dataAiHint: "Google Cloud logo" },
    { name: "AWS Partner", logo: "https://img.icons8.com/color/96/amazon-web-services.png", dataAiHint: "AWS logo" },
    { name: "Microsoft Partner", logo: "https://img.icons8.com/color/96/azure-storage-explorer.png", dataAiHint: "Microsoft Azure logo" },
    { name: "Vercel Partner", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.svg", dataAiHint: "Vercel logo" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function PartnershipApproach() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
            <div className="space-y-6">
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-headline">Strategic Partnerships</motion.h2>
                <motion.p variants={itemVariants} className="text-muted-foreground md:text-lg">
                    We collaborate with industry leaders to ensure your solutions are built on reliable, enterprise-grade platforms.
                </motion.p>
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4">
                    {partners.map(partner => (
                        <div key={partner.name} className="flex items-center gap-3" title={partner.name}>
                          <div data-ai-hint={partner.dataAiHint}>
                            <Image 
                                src={partner.logo} 
                                alt={partner.name}
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                          </div>
                            <span className="font-semibold text-sm">{partner.name.replace(" Partner", "")}</span>
                        </div>
                    ))}
                </motion.div>
                <motion.div variants={itemVariants} className="pt-4">
                    <Button asChild>
                        <Link href="/contact">
                            Start a Project
                        </Link>
                    </Button>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="max-w-xl mx-auto w-full">
                <CaseStudiesCarousel />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
