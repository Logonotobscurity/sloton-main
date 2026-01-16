
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { teamMembers } from '@/lib/data/team-members';
import { OptimizedImage } from '@/lib/image-utils';

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
                    <OptimizedImage src={author.image} alt={author.name} width={128} height={128} />
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
