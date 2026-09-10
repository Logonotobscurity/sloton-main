export default function Loading() {
  return (
    <div
      className="container mx-auto px-fluid-sm py-16 animate-pulse"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      <div className="h-8 w-48 bg-muted rounded-md mb-6" />
      <div className="h-4 max-w-xl bg-muted rounded-md mb-3" />
      <div className="h-4 max-w-lg bg-muted rounded-md" />
    </div>
  );
}
