import { Suspense } from "react";
import type { Metadata } from "next";
import { getBooks } from "@/lib/api";
import Spinner from "@/components/Spinner";
import BookExplorer from "./BookExplorer";

export const metadata: Metadata = {
  title: "BookNook | All Books",
};

async function BookList() {
  const books = await getBooks("?sort=newest");

  if (books.length === 0) {
    return <p className="text-center text-muted-foreground">No books found.</p>;
  }
  return <BookExplorer books={books} />;
}

export default function AllBooksPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          The collection
        </p>
        <h1 className="text-3xl md:text-5xl">Explore the Library</h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Browse every book shared by our readers and borrow your next read.
        </p>
      </div>
      <Suspense fallback={<Spinner />}>
        <BookList />
      </Suspense>
    </section>
  );
}