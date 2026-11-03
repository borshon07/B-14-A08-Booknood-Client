"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type CollectionItem = {
  title: string;
  sub: string;
  count: number;
  cover: string;
};

export default function CollectionsScroller({
  items,
}: {
  items: CollectionItem[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <>
      <div className="mb-6 hidden justify-end gap-2 md:flex">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-accent"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-accent"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={ref}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((c) => (
          <Link
            key={c.title}
            href="/books"
            className="group relative flex h-80 w-64 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl border bg-card sm:w-72"
          >
            {c.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.cover}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-accent" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative space-y-1 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {c.count} {c.count === 1 ? "book" : "books"}
              </p>
              <h3 className="text-2xl">{c.title}</h3>
              <p className="text-sm text-white/80">{c.sub}</p>
              <span className="inline-flex items-center gap-1 pt-1 text-sm font-medium">
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}