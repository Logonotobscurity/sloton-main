import { renderLlmsFull } from '@/lib/data/site-index';

export const dynamic = 'force-static';

export function GET() {
  return new Response(renderLlmsFull(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
