import { PostHog } from 'posthog-node';

let client: PostHog | null = null;

function getToken(): string | undefined {
  return (
    process.env.POSTHOG_PROJECT_TOKEN ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    process.env.NEXT_PUBLIC_POSTHOG_KEY
  );
}

export function getPostHogServer(): PostHog | null {
  const token = getToken();
  if (!token) return null;
  if (!client) {
    client = new PostHog(token, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return client;
}

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const ph = getPostHogServer();
  if (!ph) return;
  try {
    ph.capture({ distinctId, event, properties });
    await ph.flush();
  } catch {
    // Never block form/AI flows on analytics
  }
}
