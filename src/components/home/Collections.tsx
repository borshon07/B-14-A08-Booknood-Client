import { getBooks } from "@/lib/api";
import Reveal from "@/components/Reveal";
import CollectionsScroller, {
  type CollectionItem,
} from "@/components/home/CollectionsScroller";

const meta = [
  { title: "Fiction", sub: "Stories that carry you away" },
  { title: "Science", sub: "Curious minds, big ideas" },
  { title: "History", sub: "Learn from the past" },
  { title: "Kids", sub: "Little readers, big worlds" },
  { title: "Others", sub: "Everything in between" },
];

export default async function Collections() {
  const books = await getBooks("?sort=newest");

  // cover and count come from real books of each category
  const items: CollectionItem[] = meta.map((m) => {
    const inCategory = books.filter((b) => b.category === m.title);
    return {
      title: m.title,
      sub: m.sub,
      count: inCategory.length,
      cover: inCategory[0]?.image || "",
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
      <Reveal>
        <div className="mb-2 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Curated for you
          </p>
          <h2 className="text-3xl md:text-4xl">Featured Collections</h2>
        </div>
      </Reveal>
      <CollectionsScroller items={items} />
    </section>
  );
}