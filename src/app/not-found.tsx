import Link from "next/link";
import LottiePlayer from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <LottiePlayer src="/lottie/notfound.json" className="h-56 w-56 sm:h-72 sm:w-72" />
      <h1 className="text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button size="lg" nativeButton={false} render={<Link href="/" />}>
        Back to Home
      </Button>
    </div>
  );
}