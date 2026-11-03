"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const collections = [
  { title: "Fiction", sub: "Stories that carry you away", emoji: "📖" },
  { title: "Science", sub: "Curious minds, big ideas", emoji: "🔬" },
  { title: "History", sub: "Learn from the past", emoji: "🏛️" },
  { title: "Kids", sub: "Little readers, big worlds", emoji: "🧸" },
  { title: "Others", sub: "Everything in between", emoji: "📚" },
];

export default function Collections() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Curated for you
            </p>
            <h2 className="text-3xl md:text-4xl">Featured Collections</h2>
          </div>
          <div className="hidden gap-2 md:flex">
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
        </div>
      </Reveal>

      <div
        ref={ref}
        className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {collections.map((c) => (
          <Link
            key={c.title}
            href="/books"
            className="group flex w-64 shrink-0 snap-start flex-col justify-between gap-8 rounded-3xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary sm:w-72"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-3xl">
              {c.emoji}
            </span>
            <div className="space-y-1">
              <h3 className="text-2xl">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.sub}</p>
              <span className="inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
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
    </section>
  );
}