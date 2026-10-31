import { Suspense } from "react";
import type { Metadata } from "next";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "BookNook | All Books",
};

async function BookList() {
  const books = await getBooks();

  if (books.length === 0) {
    return <p className="text-center text-muted-foreground">No books found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book, i) => (
        <BookCard key={book._id} book={book} index={i} />
      ))}
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">All Books</h1>
      <Suspense fallback={<Spinner />}>
        <BookList />
      </Suspense>
    </section>
  );
}
