
import { ShieldCheck, Lock, DatabaseZap, BrainCircuit, FlaskConical, Lightbulb } from 'lucide-react';

export const stats = [
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Satisfied Clients' },
    { value: '10+', label: 'Technology Partners' },
    { value: '5+', label: 'Countries Served' }
];

export const trustPillars = [
    {
        icon: ShieldCheck,
        title: "Security by Design",
        description: "We embed security into every stage of our development lifecycle. From architecture to deployment, we follow industry best practices to protect against threats and vulnerabilities."
    },
    {
        icon: Lock,
        title: "Data Privacy & Governance",
        description: "Your data is yours. We adhere to strict data privacy principles and comply with global regulations like GDPR. We provide you with the tools and transparency to control your data."
    },
    {
        icon: DatabaseZap,
        title: "Platform Reliability & Resilience",
        description: "We build our systems on world-class cloud infrastructure like AWS and Google Cloud, designing for high availability and disaster recovery to ensure your services remain online."
    }
];

export const researchAreas = [
    {
        icon: BrainCircuit,
        title: "Generative AI & LLMs",
        description: "Developing novel architectures for more efficient and context-aware Large Language Models and exploring new applications for generative content.",
    },
    {
        icon: FlaskConical,
        title: "Ethical & Responsible AI",
        description: "Creating frameworks and tools to identify and mitigate bias in AI models, ensuring fairness and transparency in automated decision-making.",
    },
    {
        icon: Lightbulb,
        title: "Human-Computer Interaction",
        description: "Researching how AI can best augment human capabilities, designing intuitive 'copilot' experiences that boost productivity and creativity.",
    }
];

export const analystReports = [
    {
        firm: "Gartner®",
        title: "Magic Quadrant™ for Enterprise Conversational AI Platforms",
        date: "July 2024",
        excerpt: "LOG_ON recognized for its ability to execute and completeness of vision in the rapidly evolving AI landscape.",
        href: "#"
    },
    {
        firm: "Forrester™",
        title: "The Forrester Wave™: Robotic Process Automation, Q3 2024",
        date: "September 2024",
        excerpt: "LOG_ON named a Strong Performer in our evaluation of the top RPA vendors, cited for its ease of use and strong partner ecosystem.",
        href: "#"
    }
];
