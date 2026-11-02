import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-7xl font-bold text-primary md:text-8xl">404</h1>
      <p className="text-xl font-semibold md:text-2xl">Page not found</p>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button size="lg" nativeButton={false} render={<Link href="/" />}>
        Back to Home
      </Button>
    </div>
  );
}