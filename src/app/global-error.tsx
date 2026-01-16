'use client'
 
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-sections/page-hero'
import { ServerCrash } from 'lucide-react'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <PageHero
            title="Something went wrong!"
            description="We're sorry, but an unexpected error occurred. You can try to refresh the page or go back to the homepage."
            icon={<ServerCrash className="h-12 w-12 md:h-16 md:w-16 text-destructive" />}
        >
            <div className="flex items-center gap-4 justify-center mt-8">
                 <Button onClick={() => reset()}>Try again</Button>
                 <Button variant="outline" asChild>
                    <a href="/">Go to Homepage</a>
                </Button>
            </div>
        </PageHero>
      </body>
    </html>
  )
}