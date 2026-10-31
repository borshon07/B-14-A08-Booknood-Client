import Reveal from "@/components/Reveal";
const steps = [
  { no: "1", title: "Add", text: "Add a book with its details and copies." },
  { no: "2", title: "Borrow", text: "Borrow an available book for 7 days." },
  { no: "3", title: "Return", text: "Return the book and free up the copy." },
];

export default function HowItWorks() {
  return (
    <section className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <h2 className="mb-8 text-center text-3xl font-bold">
            How Borrowing Works
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.15} className="h-full">
              <div className="flex h-full flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {s.no}
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
