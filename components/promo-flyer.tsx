import { Sparkles, ArrowRight, GlassWater } from "lucide-react"
import { CONTACT, ORDER, IMG } from "@/lib/site-data"

const OFFER_MESSAGE =
  "Hello Cup Today, I'd like to claim the Buy 2 Mocktails, Get 1 Free offer."

/**
 * Conversion-focused "digital flyer" for the B2G1 mocktail offer.
 * Built entirely from the existing brand palette, type and motion language —
 * espresso card, gold accents, grain texture and the shared float/fade motion.
 */
export function PromoFlyer() {
  const href = ORDER.whatsapp(CONTACT.phones[0], OFFER_MESSAGE)

  return (
    <section id="offers" className="relative scroll-mt-28 py-16 md:scroll-mt-32 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary text-primary-foreground shadow-2xl shadow-primary/20">
          {/* texture + soft glows, matching the hero's decorative language */}
          <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.12]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-[360px] w-[360px] rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-[360px] w-[360px] rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative grid items-center gap-10 p-8 md:grid-cols-2 md:gap-8 md:p-12 lg:p-16">
            {/* Copy */}
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 text-accent">
                <span className="inline-flex h-px w-10 bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.08] md:text-5xl">
                Buy 2 Mocktails,
                <br />
                Get 1 <span className="italic text-accent">Free</span>.
              </h2>

              <p className="mt-5 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
                Round up your crew and cool down with our handcrafted mocktails —
                order any two and the third is on the house. Fresh mint, real
                fruit, endless refreshment.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:bg-accent/90"
                >
                  <GlassWater className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                  Claim the Offer
                </a>
                <a
                  href="#menu"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  View Mocktails
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              <p className="mt-5 flex items-center gap-1.5 text-[11px] text-primary-foreground/60">
                <Sparkles className="h-3 w-3 text-accent" aria-hidden />
                Valid on all mocktails · dine-in &amp; delivery · lowest-priced
                mocktail free.
              </p>
            </div>

            {/* Mocktail collage */}
            <div className="relative animate-fade-up [animation-delay:120ms]">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="row-span-2 overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-xl shadow-black/20">
                  <img
                    src={IMG.cranberry || "/placeholder.svg"}
                    alt="Blue Sea Mojito mocktail"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-xl shadow-black/20">
                  <img
                    src={IMG.mojitoStraw || "/placeholder.svg"}
                    alt="Strawberry Mojito mocktail"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-accent/40 shadow-xl shadow-black/20">
                  <img
                    src={IMG.sparklers || "/placeholder.svg"}
                    alt="Virgin Mojito mocktail — your free third drink"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/65 text-center backdrop-blur-[1px]">
                    <span className="font-serif text-3xl font-bold text-accent">
                      FREE
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
                      Your 3rd drink
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating gold seal — same float motion as the hero cards */}
              <div className="animate-float-slow absolute -bottom-5 -left-5 hidden h-24 w-24 -rotate-[8deg] items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-black/25 ring-4 ring-primary sm:flex">
                <div className="text-center leading-none">
                  <div className="font-serif text-2xl font-bold">B2G1</div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em]">
                    Free
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
