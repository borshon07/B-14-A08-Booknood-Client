import Link from "next/link";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

export default async function NewArrivals() {
  const books = await getBooks("?sort=newest&limit=6");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <h2 className="mb-8 text-center text-3xl font-bold">New Arrivals</h2>
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

      <div className="mt-10 text-center">
        <Button size="lg" nativeButton={false} render={<Link href="/books" />}>
          See All Books
        </Button>
      </div>
    </section>
  );
}
