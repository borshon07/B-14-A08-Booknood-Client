import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Layers, User, UserCheck } from "lucide-react";
import { getBook, getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import BorrowButton from "./BorrowButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BookNook | Book Details",
};

async function BookDetails({ id }: { id: string }) {
  const book = await getBook(id);
  if (!book) notFound();

  // related books: same category (uses the existing GET /books)
  const all = await getBooks("?sort=newest");
  const related = all
    .filter((b) => b.category === book.category && b._id !== book._id)
    .slice(0, 3);

  const addedDate = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-12">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/books" className="hover:text-foreground">
          All Books
        </Link>
        <span>/</span>
        <span className="line-clamp-1 text-foreground">{book.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
        {/* image */}
        <div className="relative h-[320px] w-full sm:h-[420px] md:h-[480px]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-2xl border object-cover shadow-xl"
          />
        </div>

        {/* info */}
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
              {book.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl">{book.title}</h1>
            <p className="flex items-center gap-2 text-base text-muted-foreground sm:text-lg">
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
                <p className="text-xs text-muted-foreground">
                  Available copies
                </p>
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
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Added by</p>
                <p className="break-words font-semibold">
                  {book.addedBy.name}{" "}
                  <span className="font-normal text-muted-foreground">
                    ({book.addedBy.email})
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <BorrowButton
              bookId={book._id}
              bookTitle={book.title}
              totalCopies={book.totalCopies}
            />
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              nativeButton={false}
              render={<Link href="/books" />}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Button>
          </div>
        </div>
      </div>

      {/* related books */}
      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl">More in {book.category}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b, i) => (
              <BookCard key={b._id} book={b} index={i} />
            ))}
          </div>
        </section>
      )}
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
    <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <Suspense fallback={<Spinner />}>
        <BookDetails id={id} />
      </Suspense>
    </section>
  );
}
