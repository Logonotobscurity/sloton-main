/**
 * Technology stack data for the tech carousel
 * Extracted from tech-stack-carousel.tsx for better separation of concerns
 */

export interface Technology {
  name: string;
  icon: string;
  dataAiHint: string;
  href: string;
}

export const technologies: Technology[] = [
  { name: 'React', icon: '/images/marks/tech-react.svg', dataAiHint: 'React logo', href: 'https://react.dev/' },
  { name: 'Next.js', icon: '/images/marks/tech-nextjs.svg', dataAiHint: 'Next.js logo', href: 'https://nextjs.org/' },
  { name: 'TypeScript', icon: '/images/marks/tech-typescript.svg', dataAiHint: 'TypeScript logo', href: 'https://www.typescriptlang.org/' },
  { name: 'Node.js', icon: '/images/marks/tech-nodejs.svg', dataAiHint: 'Node.js logo', href: 'https://nodejs.org/' },
  { name: 'Python', icon: '/images/marks/tech-python.svg', dataAiHint: 'Python logo', href: 'https://www.python.org/' },
  { name: 'AWS', icon: '/images/marks/tech-aws.svg', dataAiHint: 'AWS logo', href: 'https://aws.amazon.com/' },
  { name: 'Google Cloud', icon: '/images/marks/tech-gcp.svg', dataAiHint: 'Google Cloud logo', href: 'https://cloud.google.com/' },
  { name: 'Azure', icon: '/images/marks/tech-azure.svg', dataAiHint: 'Azure logo', href: 'https://azure.microsoft.com/' },
  { name: 'Firebase', icon: '/images/marks/tech-firebase.svg', dataAiHint: 'Firebase logo', href: 'https://firebase.google.com/' },
  { name: 'Docker', icon: '/images/marks/tech-docker.svg', dataAiHint: 'Docker logo', href: 'https://www.docker.com/' },
  { name: 'Kubernetes', icon: '/images/marks/tech-k8s.svg', dataAiHint: 'Kubernetes logo', href: 'https://kubernetes.io/' },
  { name: 'Git', icon: '/images/marks/tech-git.svg', dataAiHint: 'Git logo', href: 'https://git-scm.com/' },
  { name: 'Figma', icon: '/images/marks/tech-figma.svg', dataAiHint: 'Figma logo', href: 'https://www.figma.com/' },
  { name: 'Tailwind CSS', icon: '/images/marks/tech-tailwind.svg', dataAiHint: 'Tailwind CSS logo', href: 'https://tailwindcss.com/' },
  { name: 'OpenAI', icon: '/images/marks/tech-openai.svg', dataAiHint: 'OpenAI logo', href: 'https://openai.com/' },
  { name: 'Hugging Face', icon: '/images/marks/tech-hf.svg', dataAiHint: 'Hugging Face logo', href: 'https://huggingface.co/' },
];

/**
 * Get technologies repeated for carousel effect
 * @param repeatCount Number of times to repeat the array
 */
export function getRepeatedTechnologies(repeatCount: number = 4): Technology[] {
  return Array(repeatCount).fill(technologies).flat();
}
