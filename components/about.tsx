import { Coffee, Leaf, Wifi, Heart, Star } from "lucide-react"
import { IMG } from "@/lib/site-data"

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "50+", label: "Menu Items" },
  { value: "100%", label: "Fresh Ingredients" },
  { value: "Premium", label: "Coffee Beans" },
]

const reasons = [
  { icon: Coffee, title: "Premium Coffee Beans", desc: "Carefully sourced and freshly brewed for every cup." },
  { icon: Leaf, title: "Comfortable Atmosphere", desc: "A cozy, welcoming space designed for every mood." },
  { icon: Wifi, title: "Free High-speed Wi-Fi", desc: "Work, study or scroll — we've got you covered." },
  { icon: Heart, title: "Friendly Service", desc: "Warm hospitality that makes you feel right at home." },
  { icon: Star, title: "Premium Experience", desc: "From plating to ambience — every detail considered." },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 md:grid-cols-2 md:gap-12 md:px-8 lg:gap-20">
        {/* Image collage */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-primary/10">
            <img
              src={IMG.counter || "/placeholder.svg"}
              alt="Cup Today Café counter with espresso machine and brick wall"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden aspect-square w-2/5 overflow-hidden rounded-2xl border-4 border-background shadow-xl md:block">
            <img
              src={IMG.pouring || "/placeholder.svg"}
              alt="Espresso pouring into a white cup"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-10 left-6 hidden aspect-[3/4] w-1/3 -rotate-3 overflow-hidden rounded-2xl border-4 border-background shadow-xl animate-float-slow lg:block">
            <img
              src={IMG.v60 || "/placeholder.svg"}
              alt="Hand holding a glass mug of fresh pour-over coffee with the Tolichowki skyline behind"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -top-6 -left-4 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-xl md:block">
            <div className="font-serif text-3xl font-semibold text-primary">4.8 ★</div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Average rating
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-accent">
            <span className="inline-flex h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Our Story</span>
          </div>
          <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
            More than coffee — a <span className="italic text-primary">place to belong</span>.
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            At Cup Today, we believe a café is more than coffee. It is a place
            where conversations begin, ideas grow and memories are created.
            Tucked into Hayath Mall in the heart of Tolichowki, our space
            blends warm wooden interiors with golden lights, premium seating
            and an open kitchen serving handcrafted bites all day.
          </p>

          {/* Stats */}
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="min-w-0 rounded-2xl border border-border bg-card p-4 text-center"
              >
                <div className="break-words font-serif text-2xl font-semibold text-primary md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label}
                </div>
              </li>
            ))}
          </ul>

          {/* Why choose us */}
          <h3 className="mt-12 font-serif text-xl font-semibold">Why Choose Cup Today</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <li
                key={r.title}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <r.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-serif text-base font-semibold">{r.title}</div>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
