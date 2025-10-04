
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { teamMembers } from '@/lib/team-members';

export function AuthorBio({ authorName }: { authorName: string }) {
  const author = teamMembers.find(member => member.name === authorName);

  if (!author) {
    return null;
  }

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage asChild src={author.image} alt={author.name}>
                <div data-ai-hint={author.dataAiHint}>
                    <Image src={author.image} alt={author.name} width={author.width} height={author.height} />
                </div>
            </AvatarImage>
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold">{author.name}</h4>
            <p className="text-sm text-primary">{author.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{author.bio}</p>
      </CardContent>
    </Card>
  );
}
