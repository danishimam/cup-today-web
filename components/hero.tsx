import { Coffee, MapPin, Star, Sparkles } from "lucide-react"
import { IMG } from "@/lib/site-data"

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-secondary/40 pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* decorative grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grain opacity-40" />
      {/* soft gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-12 md:gap-10 md:px-8">
        {/* Copy */}
        <div className="md:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Now Open · Tolichowki, Hyderabad
          </div>

          <h1 className="mt-6 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Fresh Brews,{" "}
            <span className="italic text-primary">Delicious Bites</span>,
            <br className="hidden md:block" /> Memorable{" "}
            <span className="relative inline-block text-accent">
              Moments
              <svg
                viewBox="0 0 200 12"
                className="absolute left-0 -bottom-2 w-full text-accent/60"
                aria-hidden
              >
                <path
                  d="M2 8 Q 50 1, 100 6 T 198 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Welcome to Cup Today, where every cup is brewed with passion and
            every visit feels like home. Specialty coffee, signature burgers,
            wood-fired pizzas and more — crafted with love.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.03] hover:bg-primary/90"
            >
              <Coffee className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              Explore Menu
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-background/70 px-7 py-3.5 text-sm font-semibold text-primary backdrop-blur transition-colors hover:bg-secondary"
            >
              <MapPin className="h-4 w-4" />
              Book Table
            </a>
          </div>

          {/* Customer rating card */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl glass-card border border-border/80 p-3 pr-5 shadow-sm">
            <div className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src || "/placeholder.svg"}
                  alt=""
                  aria-hidden
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-foreground">4.8</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Loved by <span className="font-semibold text-foreground">500+</span> happy guests
              </div>
            </div>
          </div>
        </div>

        {/* Image stack */}
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-primary/10">
            <img
              src={IMG.storefront || "/placeholder.svg"}
              alt="Cup Today Café storefront at Hayath Mall, Tolichowki, Hyderabad at dusk"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </div>

          {/* Floating coffee card */}
          <div className="absolute -left-3 top-10 hidden w-44 -rotate-6 rounded-2xl border border-border bg-card p-3 shadow-xl shadow-primary/10 animate-float-slow sm:block">
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src={IMG.coffee || "/placeholder.svg"}
                alt="Signature cappuccino"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-2 px-1">
              <div className="font-serif text-sm font-semibold">Cappuccino</div>
              <div className="text-xs text-accent font-semibold">₹189</div>
            </div>
          </div>

          {/* Floating burger card */}
          <div
            className="absolute -bottom-6 -right-3 hidden w-48 rotate-3 rounded-2xl border border-border bg-card p-3 shadow-xl shadow-primary/10 animate-float-slow sm:block"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={IMG.burger || "/placeholder.svg"}
                alt="Cheese burst chicken burger"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-2 flex items-center justify-between px-1">
              <div className="font-serif text-sm font-semibold leading-tight">Cheese Burst</div>
              <div className="text-xs text-accent font-semibold">₹319</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
