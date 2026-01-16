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
  { name: 'React', icon: 'https://img.icons8.com/color/96/react-native.png', dataAiHint: "React logo", href: "https://react.dev/" },
  { name: 'Next.js', icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', dataAiHint: "Next.js logo", href: "https://nextjs.org/" },
  { name: 'TypeScript', icon: 'https://img.icons8.com/color/96/typescript.png', dataAiHint: "TypeScript logo", href: "https://www.typescriptlang.org/" },
  { name: 'Node.js', icon: 'https://img.icons8.com/color/96/nodejs.png', dataAiHint: "Node.js logo", href: "https://nodejs.org/" },
  { name: 'Python', icon: 'https://img.icons8.com/color/96/python.png', dataAiHint: "Python logo", href: "https://www.python.org/" },
  { name: 'AWS', icon: 'https://img.icons8.com/color/96/amazon-web-services.png', dataAiHint: "AWS logo", href: "https://aws.amazon.com/" },
  { name: 'Google Cloud', icon: 'https://img.icons8.com/color/96/google-cloud.png', dataAiHint: "Google Cloud logo", href: "https://cloud.google.com/" },
  { name: 'Azure', icon: 'https://img.icons8.com/color/96/microsoft-azure.png', dataAiHint: "Microsoft Azure logo", href: "https://azure.microsoft.com/" },
  { name: 'Firebase', icon: 'https://img.icons8.com/color/96/firebase.png', dataAiHint: "Firebase logo", href: "https://firebase.google.com/" },
  { name: 'Docker', icon: 'https://img.icons8.com/color/96/docker.png', dataAiHint: "Docker logo", href: "https://www.docker.com/" },
  { name: 'Kubernetes', icon: 'https://img.icons8.com/color/96/kubernetes.png', dataAiHint: "Kubernetes logo", href: "https://kubernetes.io/" },
  { name: 'Git', icon: 'https://img.icons8.com/color/96/git.png', dataAiHint: "Git logo", href: "https://git-scm.com/" },
  { name: 'Figma', icon: 'https://img.icons8.com/color/96/figma.png', dataAiHint: "Figma logo", href: "https://www.figma.com/" },
  { name: 'Tailwind CSS', icon: 'https://img.icons8.com/color/96/tailwind_css.png', dataAiHint: "Tailwind CSS logo", href: "https://tailwindcss.com/" },
  { name: 'OpenAI', icon: 'https://www.vectorlogo.zone/logos/openai/openai-icon.svg', dataAiHint: "OpenAI logo", href: "https://openai.com/" },
  { name: 'Hugging Face', icon: 'https://www.vectorlogo.zone/logos/huggingface/huggingface-icon.svg', dataAiHint: "Hugging Face logo", href: "https://huggingface.co/" },
];

/**
 * Get technologies repeated for carousel effect
 * @param repeatCount Number of times to repeat the array
 */
export function getRepeatedTechnologies(repeatCount: number = 4): Technology[] {
  return Array(repeatCount).fill(technologies).flat();
}
