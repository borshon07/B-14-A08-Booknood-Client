"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Book } from "@/lib/api";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";

export default function BookExplorer({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState("newest");

  // categories come from the real data (so custom ones appear too)
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(books.map((b) => b.category)))],
    [books],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = books.filter((b) => {
      const matchText =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      const matchCategory = category === "All" || b.category === category;
      const matchAvailable = !onlyAvailable || b.totalCopies > 0;
      return matchText && matchCategory && matchAvailable;
    });

    if (sort === "title") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "oldest") {
      list = [...list].reverse();
    }
    return list;
  }, [books, query, category, onlyAvailable, sort]);

  return (
    <div className="space-y-8">
      {/* search and controls */}
      <div className="space-y-4">
        <div className="relative mx-auto max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="h-11 rounded-full pl-11"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            Available only
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A to Z</option>
          </select>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Showing {visible.length} of {books.length} books
      </p>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No books match your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((book, i) => (
            <BookCard key={book._id} book={book} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}