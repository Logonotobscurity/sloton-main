/**
 * Industry features data for the industries bento grid
 * Extracted from industries-bento.tsx for better separation of concerns
 */

import { Briefcase, HeartPulse, Server, Truck, ShoppingCart, Building, Cog } from "lucide-react";
import type { ReactNode } from "react";

export interface IndustryFeature {
  title: string;
  description: string;
  icon: ReactNode;
  className: string;
}

export const industryFeatures: IndustryFeature[] = [
  {
    title: "Finance & Banking",
    description: "Stop fraud faster and automate compliance tasks that consume valuable resources.",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    className: "lg:col-span-2",
  },
  {
    title: "Healthcare",
    description: "Secure systems that protect patient data while reducing administrative overhead.",
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
  {
    title: "IT Consulting",
    description: "Automation strategy, custom AI model development, and cloud optimization.",
    icon: <Cog className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
  {
    title: "E-Commerce",
    description: "AI that recommends products customers want to buy, plus automated support that never sleeps.",
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
  {
    title: "IT & Logistics",
    description: "Intelligent automation for route planning, warehouse management, and shipment tracking.",
    icon: <Server className="w-8 h-8 text-primary" />,
    className: "lg:col-span-2",
  },
  {
    title: "Real Estate",
    description: "AI assistants that qualify leads and handle inquiries 24/7, maximizing conversion opportunities.",
    icon: <Building className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
];

// Alternative version with Truck icon for Logistics
export const industryFeaturesAlt: IndustryFeature[] = [
  {
    title: "Finance & Banking",
    description: "Stop fraud faster and automate compliance tasks that consume valuable resources.",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    className: "lg:col-span-2",
  },
  {
    title: "Healthcare",
    description: "Secure systems that protect patient data while reducing administrative overhead.",
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
  {
    title: "IT Consulting",
    description: "Automation strategy, custom AI model development, and cloud optimization.",
    icon: <Cog className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
  {
    title: "E-Commerce",
    description: "AI that recommends products customers want to buy, plus automated support that never sleeps.",
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
  {
    title: "Logistics & Supply Chain",
    description: "Intelligent automation for route planning, warehouse management, and shipment tracking.",
    icon: <Truck className="w-8 h-8 text-primary" />,
    className: "lg:col-span-2",
  },
  {
    title: "Real Estate",
    description: "AI assistants that qualify leads and handle inquiries 24/7, maximizing conversion opportunities.",
    icon: <Building className="w-8 h-8 text-primary" />,
    className: "lg:col-span-1",
  },
];
