"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import type { Book } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function BookCard({
  book,
  index = 0,
}: {
  book: Book;
  index?: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const available = book.totalCopies > 0;

  return (
    <motion.div
      className="h-full"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <motion.div
        className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:border-primary/60 hover:shadow-2xl"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {/* image with badges */}
        <div className="relative h-72 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
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
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="line-clamp-1 text-lg font-bold">{book.title}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User size={14} />
            <span className="line-clamp-1">{book.author}</span>
          </p>

          <div className="mt-auto pt-4">
            <Button
              className="w-full"
              nativeButton={false}
              render={<Link href={`/books/${book._id}`} />}
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}