import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Cpu, Eye, Languages, BarChart, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseStudyFeature } from '@/components/case-study-feature';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'AI Solutions | Custom AI & Machine Learning Services',
  description: 'We design and deploy custom AI solutions, including machine learning models, NLP, and computer vision, to solve complex business challenges and drive growth.',
};

const aiServices = [
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: 'Custom Machine Learning Models',
    description: 'We go beyond off-the-shelf solutions to build and train custom machine learning models tailored to your unique data and business objectives. From predictive analytics to recommendation engines, we create systems that learn from your data to automate processes and uncover valuable insights that drive strategic decisions.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: 'Natural Language Processing (NLP)',
    description: 'Unlock the value in your unstructured text data. We build advanced NLP solutions that can understand, interpret, and process human language. Applications include sentiment analysis for customer feedback, automated document summarization, and intelligent chatbots that provide meaningful customer interactions.',
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: 'Computer Vision',
    description: 'Turn images and videos into actionable data. Our computer vision services help businesses automate tasks like object detection, image classification, and quality control in manufacturing. We build systems that can "see" and interpret the world, opening up new possibilities for efficiency and innovation.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Predictive Analytics & Forecasting',
    description: 'Make smarter, data-driven decisions by anticipating future trends. We implement predictive analytics solutions that analyze historical data to forecast demand, identify potential risks, and optimize your business strategy. Stay ahead of the competition by turning hindsight into foresight.',
  },
];

const benefits = [
    "Gain a competitive edge with proprietary AI tools",
    "Automate complex tasks and boost operational efficiency",
    "Enhance decision-making with data-driven insights",
    "Create personalized and intelligent customer experiences",
    "Unlock new revenue streams and business opportunities"
]

export default function AiSolutionsPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="Custom AI Solutions to Power Your Business"
        description="At LOG_ON, we don't just use AI—we build it. We specialize in creating bespoke artificial intelligence and machine learning solutions that integrate seamlessly with your operations to solve your most complex challenges. Our expert team partners with you to transform your data into a strategic asset, driving efficiency, innovation, and measurable growth."
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="space-y-4 pt-4">
                {benefits.map(benefit => (
                    <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{benefit}</span>
                    </div>
                ))}
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">Free AI Consultation</Link>
            </Button>
          </div>
          <div className="relative h-80 lg:h-96 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 transition-transform duration-300 ease-in-out hover:rotate-0"></div>
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <BrainCircuit className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-2xl md:text-3xl">Artificial Intelligence</CardTitle>
                    <CardDescription className="text-center">
                        Building the brains behind your business operations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm md:text-base">
                    <p className="leading-relaxed">We leverage cutting-edge algorithms and data science to build intelligent systems that learn, adapt, and drive value.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold font-headline">Our AI Development Services</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground leading-relaxed">
                    We offer a comprehensive suite of AI services designed to address your specific needs and deliver tangible results.
                </p>
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                {aiServices.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {service.icon}
                        <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["AI", "Chatbot", "Analytics"]}
            title="Real-World AI Success Stories"
            description="See how our custom AI solutions have transformed businesses, from automating support to providing critical data insights."
        />

         <section className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-background rounded-lg px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-headline">Ready to Unlock Your AI Potential?</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our custom AI solutions can revolutionize your business. Schedule a free, no-obligation consultation with our AI experts today.
            </p>
            <div className="mt-8 flex justify-center">
                <Button asChild size="lg">
                    <Link href="/contact">
                        Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
