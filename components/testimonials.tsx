import { Quote, Star } from "lucide-react"

const reviews = [
  {
    name: "Rahul",
    role: "Regular guest",
    body: "Amazing atmosphere and excellent coffee. The vibe of the place is unmatched in Tolichowki.",
  },
  {
    name: "Priya",
    role: "Working professional",
    body: "Perfect place to relax and work. Comfortable seating, great Wi-Fi and the cappuccino is consistently brilliant.",
  },
  {
    name: "Aman",
    role: "Foodie, Hyderabad",
    body: "Loved the food and service quality. The cheese burst burger and loaded fries are an absolute must-try.",
  },
]

export function Testimonials() {
  return (
    <section id="reviews" className="relative scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <span className="inline-flex h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Loved by Hyderabad</span>
            <span className="inline-flex h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Words from our <span className="italic text-primary">guests</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-primary/10 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                aria-hidden
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary opacity-60 transition-transform group-hover:scale-110"
              />
              <Quote className="relative h-8 w-8 text-accent" aria-hidden />
              <div className="relative flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="relative text-pretty leading-relaxed text-foreground">
                &ldquo;{r.body}&rdquo;
              </blockquote>
              <figcaption className="relative mt-auto border-t border-border pt-5">
                <div className="font-serif text-base font-semibold text-primary">{r.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {r.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
