import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  Landmark,
  Smile,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getBooks } from "@/lib/api";
import Reveal from "@/components/Reveal";

const categories: {
  name: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Fiction",
    desc: "Novels and stories that carry you away",
    icon: BookOpen,
  },
  { name: "Science", desc: "Curious minds and big ideas", icon: FlaskConical },
  { name: "History", desc: "Learn from the days gone by", icon: Landmark },
  { name: "Kids", desc: "Little readers, big worlds", icon: Smile },
  { name: "Others", desc: "Everything in between", icon: Layers },
];

export default async function TopCategories() {
  const books = await getBooks();

  const countOf = (name: string) =>
    books.filter((b) => b.category === name).length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
      <Reveal>
        <div className="mb-10 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Browse by genre
          </p>
          <h2 className="text-3xl md:text-4xl">Top Categories</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Find your next read by picking a category you love.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((c, i) => {
          const Icon = c.icon;
          const count = countOf(c.name);
          const wide = i === 0 ? "lg:col-span-3" : "lg:col-span-3";
          const size = i < 2 ? wide : "lg:col-span-2";

          return (
            <Reveal key={c.name} delay={i * 0.08} className={`h-full ${size}`}>
              <Link
                href="/books"
                className="group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
              >
                <Icon
                  className="absolute -bottom-6 -right-6 text-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/20"
                  size={150}
                  strokeWidth={1}
                />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                <div className="relative space-y-1">
                  <h3 className="text-2xl">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                  <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    {count} {count === 1 ? "book" : "books"}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
