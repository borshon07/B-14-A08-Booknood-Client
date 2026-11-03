import Link from "next/link";
import { ArrowRight, BookPlus, BookOpen, Undo2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const steps: {
  no: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    no: "01",
    title: "Add",
    text: "Share a book with its details, cover and number of copies.",
    icon: BookPlus,
  },
  {
    no: "02",
    title: "Borrow",
    text: "Pick any available book and borrow it for 7 days in one click.",
    icon: BookOpen,
  },
  {
    no: "03",
    title: "Return",
    text: "Done reading? Return it so the next reader can enjoy it.",
    icon: Undo2,
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal>
          <div className="mb-12 space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Simple as 1, 2, 3
            </p>
            <h2 className="text-3xl md:text-4xl">How Borrowing Works</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Add a book, borrow a book, return a book. That is all it takes.
            </p>
          </div>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* connecting line (desktop only) */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden border-t-2 border-dashed border-primary/40 md:block" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.no} delay={i * 0.12} className="h-full">
                <div className="group relative flex h-full flex-col items-center gap-4 rounded-3xl border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                  <span className="absolute right-5 top-4 font-heading text-4xl text-primary/20">
                    {s.no}
                  </span>

                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Icon size={28} strokeWidth={1.8} />
                  </span>

                  <h3 className="text-2xl">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/books" />}
            >
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
