import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export default function Promo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-14">
          <BookOpen
            className="absolute -right-6 -top-6 opacity-15"
            size={260}
            strokeWidth={1}
          />
          <div className="relative max-w-xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
              Share the joy
            </p>
            <h2 className="text-3xl sm:text-5xl">Give a book a new reader.</h2>
            <p className="opacity-90">
              Got a book gathering dust? Add it to BookNook and let someone else
              discover it.
            </p>
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/add-book" />}
            >
              Add a Book
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}