import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export default async function Recommendation() {
  const all = await getBooks("?sort=newest");
  const picks = all.slice(6, 10);
  if (picks.length === 0) return null;

  return (
    <section className="border-y bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_2.2fr]">
        <Reveal>
          <div className="space-y-5 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Hand picked
            </p>
            <h2 className="text-3xl md:text-4xl">
              Books you&apos;ll fall in love with
            </h2>
            <p className="text-muted-foreground">
              Discover stories and ideas selected to inspire your next reading
              adventure.
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/books" />}
            >
              Browse all books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {picks.map((b, i) => (
            <BookCard key={b._id} book={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}