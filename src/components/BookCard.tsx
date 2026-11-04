"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Book } from "@/lib/api";
import Image from "next/image";


const tints = [
  "rgba(242, 106, 27, 0.12)", 
  "rgba(120, 120, 130, 0.14)", 
  "rgba(255, 170, 90, 0.16)", 
  "rgba(200, 90, 60, 0.12)", 
  "rgba(150, 140, 130, 0.16)",
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
          <div
            className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl sm:h-64 lg:h-72"
            style={{ backgroundColor: tint }}
          >
            <div className="relative h-[82%] w-[58%] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 group-hover:-rotate-2">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 60vw, 20vw"
                className="rounded-md object-cover shadow-2xl"
              />
            </div>

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
