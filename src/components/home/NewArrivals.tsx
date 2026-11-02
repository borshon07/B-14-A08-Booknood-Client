import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export default async function NewArrivals() {
  const books = await getBooks("?sort=newest&limit=6");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <Reveal>
        <div className="mb-10 space-y-3 text-center">
          <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Fresh on the shelf
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">New Arrivals</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            The latest books added by our readers. Pick one and borrow it today.
          </p>
        </div>
      </Reveal>

      {books.length === 0 ? (
        <p className="text-center text-muted-foreground">No books yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <BookCard key={book._id} book={book} index={i} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button size="lg" nativeButton={false} render={<Link href="/books" />}>
          See All Books
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}