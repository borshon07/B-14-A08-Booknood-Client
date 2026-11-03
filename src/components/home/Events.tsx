import { CalendarDays, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";

const events = [
  { title: "Author Meetup", type: "Sample event", place: "Online" },
  { title: "Reading Session", type: "Sample event", place: "Community" },
  { title: "Book Club Discussion", type: "Sample event", place: "Online" },
];

export default function Events() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
      <Reveal>
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Coming soon
          </p>
          <h2 className="text-3xl md:text-4xl">Gatherings for readers</h2>
          <p className="text-sm text-muted-foreground">
            Placeholder content. Real events will be added later.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {events.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1} className="h-full">
            <div className="flex h-full flex-col gap-4 rounded-3xl border bg-card p-6">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {e.type}
              </span>
              <h3 className="text-2xl">{e.title}</h3>
              <div className="mt-auto space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-primary" />
                  Date to be announced
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={15} className="text-primary" />
                  {e.place}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
