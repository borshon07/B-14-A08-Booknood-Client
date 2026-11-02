"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Book } from "@/lib/api";

// soft pastel backgrounds (work in light and dark mode)
const tints = [
  "rgba(135, 163, 131, 0.22)", // sage
  "rgba(214, 195, 165, 0.30)", // champagne
  "rgba(140, 160, 200, 0.22)", // soft blue
  "rgba(200, 150, 160, 0.22)", // soft rose
  "rgba(170, 150, 200, 0.22)", // soft lilac
];

export default function BookCard({
  book,
  index = 0,
}: {
  book: Book;
  index?: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const available = book.totalCopies > 0;
  const tint = tints[index % tints.length];

  return (
    <motion.div
      className="h-full"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      {/* the whole card is a link to the details page */}
      <Link
        href={`/books/${book._id}`}
        aria-label={`View details of ${book.title}`}
        className="group block h-full"
      >
        <motion.article
          className="flex h-full flex-col gap-4"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMove}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {/* pastel box with the book cover */}
          <div
            className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl sm:h-64 lg:h-72"
            style={{ backgroundColor: tint }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.image}
              alt={book.title}
              className="h-[82%] w-[58%] rounded-md object-cover shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 group-hover:-rotate-2"
            />

            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
              {book.category}
            </span>
            <span
              className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                available
                  ? "bg-primary text-primary-foreground"
                  : "bg-destructive text-white"
              }`}
            >
              {available ? `${book.totalCopies} left` : "Not Available"}
            </span>
          </div>

          {/* info */}
          <div className="flex flex-1 flex-col gap-1 px-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-1 text-lg font-bold transition-colors group-hover:text-primary">
                {book.title}
              </h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              by {book.author}
            </p>

            {/* small text link (keeps the "View Details" requirement) */}
            <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary">
              View Details
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}