"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, Sparkles } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import Book3D, { type FeaturedBook } from "@/components/home/Book3D";

const slides = [
  {
    title: "Your next favorite story is waiting.",
    text: "Browse a growing library shared by readers like you.",
  },
  {
    title: "Borrow a book, keep it for 7 days.",
    text: "Pick any available book and take it home in one click.",
  },
  {
    title: "Done reading? Return it for the next reader.",
    text: "Return the book and free up the copy for someone else.",
  },
];

const fallbackBook: FeaturedBook = {
  _id: "",
  title: "BookNook",
  author: "Your small online library",
  image: "",
};

// tiny dust particles (fixed values, so no hydration problem)
const dust = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 4),
  duration: 6 + (i % 5) * 2,
  delay: (i % 7) * 0.6,
}));

function DustParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dust.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ y: [0, -40, 0], x: [0, 12, 0], opacity: [0, 0.7, 0] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSlider({ books }: { books: FeaturedBook[] }) {
  const [active, setActive] = useState(0);
  const featured = books.length ? books[active % books.length] : fallbackBook;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-card">
      <DustParticles />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-2 px-4 py-10 md:min-h-[640px] md:grid-cols-2 md:gap-8">
        {/* left: swiper slides (title, text, Browse Books) */}
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          className="w-full pb-12"
          style={
            {
              "--swiper-pagination-color": "var(--primary)",
              "--swiper-pagination-bullet-inactive-color": "var(--foreground)",
              "--swiper-pagination-bullet-inactive-opacity": "0.3",
              "--swiper-pagination-bullet-size": "10px",
              "--swiper-pagination-bottom": "0px",
              "--swiper-pagination-horizontal-alignment": "left",
            } as React.CSSProperties
          }
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="flex min-h-[300px] flex-col items-start justify-center gap-5 pr-2 md:min-h-[360px]">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                  <Sparkles size={15} />
                  BookNook Library
                </span>
                <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                  {slide.title}
                </h2>
                <p className="max-w-md text-lg text-muted-foreground">
                  {slide.text}
                </p>
                <motion.div
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/books" />}
                  >
                    Browse Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* right: giant 3D book */}
        <div className="flex flex-col items-center">
          <Book3D book={featured} />

          {/* featured title changes with the slide */}
          <div className="h-12 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured._id || "default"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {featured._id ? (
                  <Link
                    href={`/books/${featured._id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    Now featuring{" "}
                    <span className="font-semibold text-foreground">
                      {featured.title}
                    </span>{" "}
                    by {featured.author}
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Add a book, borrow a book, return a book
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}