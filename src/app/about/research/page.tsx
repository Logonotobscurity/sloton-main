
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FlaskConical, Lightbulb, BrainCircuit } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'LOG_ON Research',
  description: 'Explore how LOG_ON Research is pushing the boundaries of AI and automation through our labs, academic partnerships, and open-source contributions.',
};

const researchAreas = [
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary"/>,
        title: "Generative AI & LLMs",
        description: "Developing novel architectures for more efficient and context-aware Large Language Models and exploring new applications for generative content.",
    },
    {
        icon: <FlaskConical className="h-8 w-8 text-primary"/>,
        title: "Ethical & Responsible AI",
        description: "Creating frameworks and tools to identify and mitigate bias in AI models, ensuring fairness and transparency in automated decision-making.",
    },
    {
        icon: <Lightbulb className="h-8 w-8 text-primary"/>,
        title: "Human-Computer Interaction",
        description: "Researching how AI can best augment human capabilities, designing intuitive 'copilot' experiences that boost productivity and creativity.",
    }
]

export default function ResearchPage() {
  return (
    <div>
        <PageHero 
            title="LOG_ON Research"
            description="Innovation is at the core of our DNA. LOG_ON Research is dedicated to exploring the frontiers of artificial intelligence and automation. Through our internal labs, partnerships with academic institutions, and contributions to open-source projects, we aim to solve fundamental challenges and pioneer the next generation of business technology."
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12">
        <section>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Our Core Research Areas</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {researchAreas.map(area => (
                    <Card key={area.title}>
                        <CardHeader>
                            {area.icon}
                            <CardTitle className="pt-4">{area.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{area.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

       <section>
        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Publications & Papers</h2>
        <p className="text-muted-foreground mb-6">Our researchers regularly contribute to the broader scientific community. While we don't have public papers to share at this moment, please check our <Link href="/insights" className="text-primary hover:underline">Insights blog</Link> for articles on our latest thinking.</p>
      </section>

       <section className="text-center p-8 bg-secondary/30 rounded-lg">
          <h2 className="text-2xl font-bold">Collaborate With Us</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">Are you an academic institution or a researcher interested in partnering with us? We'd love to hear from you.</p>
          <Button asChild className="mt-4">
              <Link href="/contact?subject=Research+Partnership">
                Contact Research Team
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Link>
          </Button>
      </section>
    </div>
    </div>
  );
}
