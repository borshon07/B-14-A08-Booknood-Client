"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { BookOpen, BookPlus, BookMarked, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const slides = [
  {
    badge: "Step 1",
    title: "Add a Book",
    text: "Share your favourite books with the BookNook community.",
    image: "/hero/hero1.jpg",
    icon: BookPlus,
  },
  {
    badge: "Step 2",
    title: "Borrow a Book",
    text: "Pick any available book and borrow it for a few days.",
    image: "/hero/hero2.jpg",
    icon: BookOpen,
  },
  {
    badge: "Step 3",
    title: "Return a Book",
    text: "Done reading? Return it so someone else can enjoy it.",
    image: "/hero/hero3.jpg",
    icon: BookMarked,
  },
];

function SlideContent({ slide }: { slide: (typeof slides)[number] }) {
  // true only for the slide that is visible now
  const { isActive } = useSwiperSlide();
  const Icon = slide.icon;

  return (
    <div className="relative h-[560px] overflow-hidden bg-gradient-to-br from-secondary via-background to-card">
      {/* background photo with slow zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.image})` }}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 7, ease: "linear" }}
      />

      {/* soft overlay: darker in the middle so the text is readable */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* centered text */}
      <div className="relative z-10 mx-auto flex h-full max-w-3xl items-center justify-center px-4">
        <motion.div
          className="flex flex-col items-center space-y-5 text-center text-white"
          initial={false}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: isActive ? 0.15 : 0 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm backdrop-blur">
            <Icon size={16} />
            {slide.badge}
          </span>
          <h2 className="text-4xl font-bold leading-tight drop-shadow-lg md:text-6xl">
            {slide.title}
          </h2>
          <p className="max-w-xl text-lg text-white/85">{slide.text}</p>

          <motion.div
            className="pt-2"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" nativeButton={false} render={<Link href="/books" />}>
              Browse Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="w-full"
      style={
        {
          "--swiper-pagination-color": "var(--primary)",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "10px",
        } as React.CSSProperties
      }
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <SlideContent slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}