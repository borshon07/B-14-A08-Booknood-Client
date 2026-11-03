"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";

export type FeaturedBook = {
  _id: string;
  title: string;
  author: string;
  image: string;
};

const W = 300;
const H = 420;
const T = 44;

const stripes =
  "repeating-linear-gradient(90deg, #f7f1e3 0px, #f7f1e3 2px, #d8cdb5 2px, #d8cdb5 3px)";
const stripesFlat =
  "repeating-linear-gradient(0deg, #f7f1e3 0px, #f7f1e3 2px, #d8cdb5 2px, #d8cdb5 3px)";

const loosePages = [
  { left: "6%", top: "58%", delay: 0 },
  { left: "88%", top: "30%", delay: 1.4 },
  { left: "78%", top: "74%", delay: 2.8 },
];

export default function Book3D({ book }: { book: FeaturedBook }) {
  return (
    <div className="relative flex h-[340px] items-center justify-center md:h-[560px]">
      <div className="absolute h-72 w-72 rounded-full bg-primary/25 blur-3xl md:h-[26rem] md:w-[26rem]" />

      {loosePages.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-14 w-10 rounded-sm border border-black/10 bg-[#f7f1e3] shadow-md"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -70, -130],
            x: [0, 14, -10],
            rotateY: [0, 180, 360],
            rotateZ: [0, 25, 50],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="scale-[0.66] md:scale-100">
        <motion.div
          style={{ perspective: 1400 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="relative"
            style={{ width: W, height: H, transformStyle: "preserve-3d" }}
            initial={{ rotateX: -8, rotateY: -30 }}
            animate={{ rotateX: -8, rotateY: [-30, 28, -30] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 rounded-md bg-primary"
              style={{ transform: `translateZ(${-T / 2}px) rotateY(180deg)` }}
            />

            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-r-sm border border-black/10 bg-[#f7f1e3]"
                style={{
                  left: 4,
                  top: 5,
                  width: W + 6,
                  height: H - 10,
                  transformOrigin: "left center",
                  transform: `translateZ(${-9 + i * 3}px)`,
                }}
                animate={{ rotateY: [0, i % 2 ? 2 : -2, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div
              className="absolute"
              style={{
                top: 4,
                left: W - T / 2,
                width: T,
                height: H - 8,
                background: stripes,
                transform: "rotateY(90deg)",
              }}
            />
            <div
              className="absolute"
              style={{
                top: -T / 2,
                left: 4,
                width: W - 8,
                height: T,
                background: stripesFlat,
                transform: "rotateX(90deg)",
              }}
            />

            <div
              className="absolute"
              style={{
                top: H - T / 2,
                left: 4,
                width: W - 8,
                height: T,
                background: stripesFlat,
                transform: "rotateX(-90deg)",
              }}
            />

            <div
              className="absolute flex items-center justify-center bg-primary"
              style={{
                top: 0,
                left: -T / 2,
                width: T,
                height: H,
                transform: "rotateY(-90deg)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,0.25), rgba(255,255,255,0.12), rgba(0,0,0,0.25))",
              }}
            >
              <span
                className="text-sm font-bold tracking-widest text-primary-foreground"
                style={{ writingMode: "vertical-rl" }}
              >
                BOOKNOOK
              </span>
            </div>

            <div
              className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm border border-white/20 bg-primary shadow-2xl"
              style={{
                transform: `translateZ(${T / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={book._id || "default"}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-primary-foreground">
                      <BookOpen size={90} strokeWidth={1.4} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 space-y-1 p-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-white/70">
                      Featured
                    </p>
                    <h3 className="line-clamp-2 text-2xl font-bold leading-tight">
                      {book.title}
                    </h3>
                    <p className="line-clamp-1 text-sm text-white/80">
                      {book.author}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/35 to-transparent" />
              <div className="absolute inset-y-0 left-5 w-px bg-white/25" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
