export default function Spinner() {
  return (
    <div
      role="status"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  );
}