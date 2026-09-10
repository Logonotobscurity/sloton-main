import { formatFullDate } from '@/lib/date-utils';

export function LastUpdated({
  published,
  modified,
}: {
  published: string;
  modified?: string;
}) {
  const updated = modified || published;
  return (
    <p className="text-sm text-muted-foreground">
      <time dateTime={published}>Published {formatFullDate(published)}</time>
      {' · '}
      <time dateTime={updated}>Last updated {formatFullDate(updated)}</time>
    </p>
  );
}
