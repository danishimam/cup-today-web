import { IMG } from "@/lib/site-data"

const shots = [
  { src: IMG.sofa, alt: "Premium leather sofa lounge with golden pendant lights", className: "row-span-2" },
  { src: IMG.inside, alt: "Industrial dining hall with wooden tables and pendant lamps" },
  { src: IMG.outside, alt: "Open-air balcony seating with Hyderabad skyline at sunset" },
  { src: IMG.frames, alt: "Coffee-themed gallery wall above a wooden bench" },
  { src: IMG.cafeLook, alt: "Wide cafe interior view with golden hanging lights" },
  { src: IMG.tvView, alt: "Tan leather armchairs and wooden tables beneath a coffee-brewing wall screen" },
  { src: IMG.rightSofa, alt: "Cosy window-side lounge seating with a laptop on a wooden table" },
  { src: IMG.glassFood, alt: "Plated cafe dish by the window overlooking the Tolichowki street" },
  { src: IMG.public, alt: "Cafe full of guests in the evening" },
  { src: IMG.counter2, alt: "Barista counter with espresso machine and brick wall" },
]

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-24 py-24 md:py-32">
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

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {shots.map((s, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl bg-card ${
                s.className ?? ""
              } ${i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className={i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-square"}>
                <img
                  src={s.src || "/placeholder.svg"}
                  alt={s.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
