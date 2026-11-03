import Link from "next/link";
import { BookMarked, BookOpen, BookPlus, Library } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

const features: {
  icon: LucideIcon;
  label: string;
  text: string;
  href: string;
}[] = [
  {
    icon: Library,
    label: "Discover Books",
    text: "Browse the full library",
    href: "/books",
  },
  {
    icon: BookMarked,
    label: "Borrow Books",
    text: "Take one home for 7 days",
    href: "/books",
  },
  {
    icon: BookPlus,
    label: "Share a Book",
    text: "Add your own to the shelf",
    href: "/add-book",
  },
  {
    icon: BookOpen,
    label: "Personal Library",
    text: "Track your borrowed books",
    href: "/my-borrows",
  },
];

export default function FeatureBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border bg-card sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.label}
                href={f.href}
                className={`group flex items-center gap-4 p-6 transition-colors hover:bg-accent ${
                  i !== 0 ? "border-t sm:border-t-0 sm:border-l" : ""
                } ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${
                  i === 1 ? "sm:border-l" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{f.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {f.text}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}