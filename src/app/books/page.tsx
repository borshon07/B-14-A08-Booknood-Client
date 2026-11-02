import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Layers, User, UserCheck } from "lucide-react";
import { getBook } from "@/lib/api";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import BorrowButton from "@/app/books/[id]/BorrowButton";

export const metadata: Metadata = {
  title: "BookNook | Book Details",
};

async function BookDetails({ id }: { id: string }) {
  const book = await getBook(id);
  if (!book) notFound();

  const addedDate = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
      {/* image */}
      <div className="md:sticky md:top-24 md:self-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-[480px] w-full rounded-2xl border object-cover shadow-xl"
        />
      </div>

      {/* info */}
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
            {book.category}
          </span>
          <h1 className="text-3xl font-bold md:text-4xl">{book.title}</h1>
          <p className="flex items-center gap-2 text-lg text-muted-foreground">
            <User size={18} />
            by {book.author}
          </p>
        </div>

        <p className="leading-relaxed">{book.description}</p>

        {/* quick facts */}
        <div className="grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Layers className="text-primary" size={22} />
            <div>
              <p className="text-xs text-muted-foreground">Available copies</p>
              <p className="font-semibold">{book.totalCopies}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="text-primary" size={22} />
            <div>
              <p className="text-xs text-muted-foreground">Added on</p>
              <p className="font-semibold">{addedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <UserCheck className="text-primary" size={22} />
            <div>
              <p className="text-xs text-muted-foreground">Added by</p>
              <p className="font-semibold">
                {book.addedBy.name}{" "}
                <span className="font-normal text-muted-foreground">
                  ({book.addedBy.email})
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <BorrowButton
            bookId={book._id}
            bookTitle={book.title}
            totalCopies={book.totalCopies}
          />
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/books" />}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Button>
        </div>
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
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Suspense fallback={<Spinner />}>
        <BookDetails id={id} />
      </Suspense>
    </section>
  );
}