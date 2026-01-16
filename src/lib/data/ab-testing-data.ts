
import { FlaskConical, Handshake, CheckCircle, CircleDot } from 'lucide-react';

export const labValues = [
    {
        icon: FlaskConical,
        title: "Relentless Curiosity",
        description: "We are driven by a constant need to ask 'what if.' Every project starts with a bold question and an open mind."
    },
    {
        icon: Handshake,
        title: "Open Collaboration",
        description: "Innovation thrives in the open. We partner with brands and creators to test ideas and share insights for mutual growth."
    },
    {
        icon: CheckCircle,
        title: "Data-Driven Validation",
        description: "We replace guesswork with evidence. Our rigorous testing methodology provides undeniable proof of what works."
    }
];

export const submissionProcess = [
    {
        title: "1. You Submit",
        description: "Tell us about your product, website, or campaign. What's the key question you need to answer?"
    },
    {
        title: "2. We Strategize",
        description: "Our lab team designs a bespoke A/B test to validate your hypothesis and define clear success metrics."
    },
    {
        title: "3. We Test & Analyze",
        description: "We run the experiment on relevant traffic using our robust tools and gather clean, unbiased data."
    },
    {
        title: "4. You Get Insights",
        description: "You receive a comprehensive report with clear, actionable data and strategic recommendations."
    }
];

export const activePilots = [
    {
        name: "Pilot: 'Cognitive-Load-Optimized' Checkout Flow",
        hypothesis: "By simplifying the checkout form from 5 fields to 3 with smart autofill, we will increase completion rates by 15%.",
        metric: "Conversion Rate, Bounce Rate",
        status: "Data Collection In Progress",
        statusColor: "text-yellow-500",
        icon: CircleDot,
    },
    {
        name: "Pilot: AI-Generated vs. Human-Written Headlines",
        hypothesis: "AI-generated headlines tailored to user segments will achieve a higher click-through rate (CTR) than a single, human-written headline.",
        metric: "Click-Through Rate (CTR)",
        status: "Results Pending Analysis",
        statusColor: "text-blue-500",
        icon: CircleDot,
    },
    {
        name: "Pilot: Value-Based vs. Feature-Based Landing Page",
        hypothesis: "A landing page focused on the emotional benefits of a service will convert better than one focused on listing technical features.",
        metric: "Sign-up Rate",
        status: "Completed - Value-based page showed a 22% uplift.",
        statusColor: "text-green-500",
        icon: CircleDot,
    }
];
