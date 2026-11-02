"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import Book3D, { type FeaturedBook } from "@/components/home/Book3D";

const slides = [
  {
    eyebrow: "A world between the pages",
    title: "Stories that stay with you.",
    text: "Discover, borrow and explore books shared by a community of readers.",
  },
  {
    eyebrow: "Borrow with ease",
    title: "Take a book home for seven days.",
    text: "Pick any available book and borrow it in a single click.",
  },
  {
    eyebrow: "Pass it on",
    title: "Return it, so the next reader can begin.",
    text: "Every returned book becomes someone else's next favourite story.",
  },
];

const fallbackBook: FeaturedBook = {
  _id: "",
  title: "BookNook",
  author: "Your small online library",
  image: "",
};

export default function HeroSlider({ books }: { books: FeaturedBook[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const featured = books.length ? books[active % books.length] : fallbackBook;

  return (
    <section className="relative overflow-hidden border-b bg-secondary/60">
      {/* soft warm glow, no moving particles */}
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-4 px-4 py-10 sm:px-6 md:min-h-[640px] md:grid-cols-[1.1fr_1fr] md:gap-10">
        {/* left: slider text */}
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={reduce ? false : { delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          onSlideChange={(s) => setActive(s.realIndex)}
          className="w-full pb-12"
          style={
            {
              "--swiper-pagination-color": "var(--foreground)",
              "--swiper-pagination-bullet-inactive-color": "var(--foreground)",
              "--swiper-pagination-bullet-inactive-opacity": "0.25",
              "--swiper-pagination-bullet-size": "8px",
              "--swiper-pagination-bottom": "0px",
              "--swiper-pagination-horizontal-alignment": "left",
            } as React.CSSProperties
          }
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="flex min-h-[340px] flex-col items-start justify-center gap-6 pr-2 md:min-h-[420px]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  {slide.eyebrow}
                </p>
                <h2 className="text-4xl leading-[1.05] sm:text-5xl lg:text-7xl">
                  {slide.title}
                </h2>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {slide.text}
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    nativeButton={false}
                    render={<Link href="/books" />}
                  >
                    Browse Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    nativeButton={false}
                    render={<Link href="/#new-arrivals" />}
                  >
                    Discover Your Next Read
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* right: 3D featured book */}
        <div className="flex flex-col items-center">
          <Book3D book={featured} />
          <div className="h-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured._id || "default"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {featured._id ? (
                  <Link
                    href={`/books/${featured._id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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