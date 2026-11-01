"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { Book, BookMarked, BookOpen, BookPlus, Library, NotebookPen } from "lucide-react";

const orbitIcons = [Book, BookOpen, BookMarked, Library, BookPlus, NotebookPen];

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  // counts 0 to 100 on every full page load / reload
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: "easeInOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        timer = setTimeout(() => setShow(false), 350);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* soft glow */}
          <div className="absolute h-80 w-80 rounded-full bg-primary/15 blur-3xl" />

          {/* ring + orbiting books */}
          <div className="relative flex h-64 w-64 items-center justify-center">
            {/* books fly in and orbit */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {orbitIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{ transform: `rotate(${i * 60}deg)` }}
                >
                  <motion.div
                    className="absolute -left-4 -top-4 text-primary"
                    initial={{ y: -380, opacity: 0, scale: 0.4 }}
                    animate={{ y: -118, opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.15,
                      duration: 0.9,
                      type: "spring",
                      stiffness: 70,
                      damping: 12,
                    }}
                  >
                    <Icon size={32} strokeWidth={1.8} />
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* progress ring */}
            <svg viewBox="0 0 200 200" className="h-44 w-44 -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                strokeWidth="6"
                className="stroke-muted"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                className="stroke-primary"
                style={{ pathLength: count / 100 }}
              />
            </svg>

            {/* counter in the middle */}
            <div className="absolute flex items-baseline text-4xl font-bold tabular-nums">
              {count}
              <span className="text-lg text-primary">%</span>
            </div>
          </div>

          {/* BookNook is "written" with a pen: outline draws, then fills */}
          <svg viewBox="0 0 400 80" className="h-16 w-72 md:h-20 md:w-96">
            <motion.text
              x="200"
              y="58"
              textAnchor="middle"
              fontSize="58"
              fontWeight="700"
              strokeWidth="1.5"
              strokeDasharray="420"
              style={{ stroke: "var(--primary)" }}
              initial={{ strokeDashoffset: 420, fill: "rgba(0,0,0,0)" }}
              animate={{
                strokeDashoffset: 0,
                fill: "var(--foreground)",
              }}
              transition={{
                strokeDashoffset: { duration: 1.6, ease: "easeInOut" },
                fill: { delay: 1.5, duration: 0.7 },
              }}
            >
              BookNook
            </motion.text>
          </svg>

          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Add a book, borrow a book, return a book
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}