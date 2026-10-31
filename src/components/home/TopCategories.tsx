const categories = [
  { name: "Fiction", icon: "📖" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "🏛️" },
  { name: "Kids", icon: "🧸" },
  { name: "Others", icon: "📚" },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Top Categories</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
        {categories.map((c) => (
          <div
            key={c.name}
            className="flex h-full flex-col items-center gap-2 rounded-xl border bg-card p-6"
          >
            <span className="text-4xl">{c.icon}</span>
            <span className="font-semibold">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}