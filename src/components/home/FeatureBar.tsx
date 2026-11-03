import Link from "next/link";
import { BookOpen, BookMarked, BookPlus, Library } from "lucide-react";

const features = [
  { icon: Library, label: "Discover Books", href: "/books" },
  { icon: BookMarked, label: "Borrow Books", href: "/books" },
  { icon: BookPlus, label: "Share a Book", href: "/add-book" },
  { icon: BookOpen, label: "Personal Library", href: "/my-borrows" },
];

export default function FeatureBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-2 divide-x divide-border rounded-2xl border bg-card md:grid-cols-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.label}
              href={f.href}
              className="group flex flex-col items-center gap-3 px-4 py-6 text-center transition-colors hover:bg-accent"
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-primary transition-transform group-hover:-translate-y-0.5"
              />
              <span className="text-sm font-medium">{f.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}