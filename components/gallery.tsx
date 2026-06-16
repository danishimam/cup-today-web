import { IMG } from "@/lib/site-data"
import { cn } from "@/lib/utils"

type Shot = {
  src: string
  alt: string
  label: string
  /**
   * The single focal point. Renders as a 2×2 tile (full-width hero on mobile),
   * twice the width and height of a standard square tile.
   */
  featured?: boolean
}

// 9 shots: one 2×2 featured tile + eight 1×1 square tiles = 12 grid cells.
// 12 divides evenly by 2, 3 and 4, so the grid forms a complete rectangle at
// every breakpoint with no orphan tiles, holes or trailing whitespace. (A 2×2
// tile among ten images would make 13 effective cells — a prime that always
// strands one lonely tile — so the focal layout uses nine.)
const shots: Shot[] = [
  { src: IMG.sofa, alt: "Premium leather sofa lounge with golden pendant lights", label: "Lounge seating", featured: true },
  { src: IMG.inside, alt: "Industrial dining hall with wooden tables and pendant lamps", label: "Dining hall" },
  { src: IMG.outside, alt: "Open-air balcony seating with Hyderabad skyline at sunset", label: "Rooftop balcony" },
  { src: IMG.frames, alt: "Coffee-themed gallery wall above a wooden bench", label: "Gallery wall" },
  { src: IMG.cafeLook, alt: "Wide cafe interior view with golden hanging lights", label: "Café interior" },
  { src: IMG.tvView, alt: "Tan leather armchairs and wooden tables beneath a coffee-brewing wall screen", label: "Brew lounge" },
  { src: IMG.rightSofa, alt: "Cosy window-side lounge seating with a laptop on a wooden table", label: "Window nook" },
  { src: IMG.public, alt: "Cafe full of guests in the evening", label: "Evening vibes" },
  { src: IMG.counter2, alt: "Barista counter with espresso machine and brick wall", label: "Barista counter" },
]

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-28 py-16 md:scroll-mt-32 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary">
              <span className="inline-flex h-px w-10 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">The Space</span>
            </div>
            <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Step <span className="italic text-primary">inside</span> our world.
            </h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            From the rooftop balcony to the warm wooden interiors — Cup Today is
            designed for every kind of moment, from a quick espresso to a long
            conversation.
          </p>
        </div>

        {/*
          Focal bento grid. Standard tiles are aspect-square, which fixes the
          implicit row height to the column width — so the featured tile, which
          spans 2 columns and 2 rows, renders as a perfect (larger) square. With
          one 2×2 + eight 1×1 tiles (12 cells), the grid fills completely at
          grid-cols-2 / 3 / 4. Every cell reserves its space before the image
          loads → no layout shift, no overflow, no uneven gaps.
        */}
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((s) => (
            <li
              key={s.src}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm",
                "transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
                s.featured ? "col-span-2 row-span-2" : "aspect-square",
              )}
            >
              <figure className="h-full w-full">
                <img
                  src={s.src || "/placeholder.svg"}
                  alt={s.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out will-change-transform motion-safe:group-hover:scale-105"
                  loading={s.featured ? "eager" : "lazy"}
                  decoding="async"
                />
                {/* Bottom-up scrim keeps captions legible without hiding the photo. */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 md:p-4">
                  <span className={cn("inline-flex h-px bg-accent", s.featured ? "w-8" : "w-5")} />
                  <span
                    className={cn(
                      "font-semibold uppercase tracking-[0.18em] text-background drop-shadow-sm",
                      s.featured ? "text-sm md:text-lg" : "text-xs md:text-sm",
                    )}
                  >
                    {s.label}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
