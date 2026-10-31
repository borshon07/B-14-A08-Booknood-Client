import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBook } from "@/lib/api";
import Spinner from "@/components/Spinner";
import BorrowButton from "./BorrowButton";

export const metadata: Metadata = {
  title: "BookNook | Book Details",
};

async function BookDetails({ id }: { id: string }) {
  const book = await getBook(id);
  if (!book) notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        className="h-[480px] w-full rounded-xl border object-cover"
      />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-lg text-muted-foreground">by {book.author}</p>
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          {book.category}
        </span>
        <p>{book.description}</p>
        <p className="text-sm">
          Added by: <span className="font-semibold">{book.addedBy.name}</span>{" "}
          ({book.addedBy.email})
        </p>

        <BorrowButton
          bookId={book._id}
          bookTitle={book.title}
          totalCopies={book.totalCopies}
        />
      </div>
    </div>
  );
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <Suspense fallback={<Spinner />}>
        <BookDetails id={id} />
      </Suspense>
    </section>
  );
}