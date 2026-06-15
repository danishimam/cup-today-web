"use client"

import { useMemo, useState } from "react"
import {
  Truck,
  MapPin,
  Clock,
  UtensilsCrossed,
  ShoppingBag,
  Bike,
  Info,
  Phone,
} from "lucide-react"
import {
  CONTACT,
  ORDER,
  DELIVERY_INFO,
  ORDER_STEPS,
  IMG,
} from "@/lib/site-data"
import { cn } from "@/lib/utils"

const infoIcon = {
  truck: Truck,
  pin: MapPin,
  clock: Clock,
} as const

const stepIcon = {
  menu: UtensilsCrossed,
  bag: ShoppingBag,
  scooter: Bike,
} as const

export function OrderOnline() {
  // Optional, on-brand estimator that surfaces the delivery business rules.
  const [amount, setAmount] = useState("")
  const [distance, setDistance] = useState("")

  const amt = Number.parseFloat(amount)
  const dist = Number.parseFloat(distance)
  const hasAmount = amount.trim() !== "" && !Number.isNaN(amt)
  const hasDistance = distance.trim() !== "" && !Number.isNaN(dist)

  // The order must meet the minimum value before it can be placed.
  const belowMinimum = hasAmount && amt < ORDER.minOrderValue
  const canOrder = !belowMinimum

  const notices = useMemo(() => {
    const list: string[] = []
    if (belowMinimum) {
      const shortfall = Math.ceil(ORDER.minOrderValue - amt)
      list.push(
        `A minimum order value of ₹${ORDER.minOrderValue} applies — add ₹${shortfall} more to place your order.`,
      )
    } else if (hasAmount) {
      list.push(`You're all set — your order meets the ₹${ORDER.minOrderValue} minimum.`)
    }
    if (hasDistance && dist > ORDER.freeDeliveryRadiusKm) {
      list.push(
        `Your location is beyond our ${ORDER.freeDeliveryRadiusKm} KM free-delivery radius, so delivery charges may apply.`,
      )
    } else if (hasDistance && dist > 0) {
      list.push(
        `Great news — you're within our ${ORDER.freeDeliveryRadiusKm} KM zone, so delivery is free.`,
      )
    }
    return list
  }, [belowMinimum, hasAmount, hasDistance, amt, dist])

  const primaryHref = ORDER.whatsapp(CONTACT.phones[0], ORDER.message)
  const secondaryHref = ORDER.whatsapp(CONTACT.phones[1], ORDER.message)

  return (
    <section
      id="order"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <span className="inline-flex h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Order Online</span>
            <span className="inline-flex h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Your favourites, <span className="italic text-primary">delivered</span>.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Enjoy your favourite food and beverages delivered directly to your doorstep.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: delivery info + steps + estimator */}
          <div className="lg:col-span-7">
            {/* Delivery info cards */}
            <ul className="grid gap-4 sm:grid-cols-3">
              {DELIVERY_INFO.map((d, i) => {
                const Icon = infoIcon[d.icon]
                return (
                  <li
                    key={d.title}
                    className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md animate-fade-up"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-serif text-base font-semibold">{d.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Order process flow */}
            <h3 className="mt-12 font-serif text-xl font-semibold">How it works</h3>
            <ol className="mt-5 grid gap-4 sm:grid-cols-3">
              {ORDER_STEPS.map((s, i) => {
                const Icon = stepIcon[s.icon]
                return (
                  <li
                    key={s.title}
                    className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md animate-fade-up"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    {/* step number + visual connector to the next step */}
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25">
                        {i + 1}
                      </span>
                      <span className="text-primary/80">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div>
                      <div className="font-serif text-base font-semibold leading-snug">{s.title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                    {/* connector dot — hidden on the last card and on mobile stack */}
                    {i < ORDER_STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-accent text-accent-foreground sm:flex"
                      >
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>

            {/* Optional estimator surfacing the business rules */}
            <div className="mt-8 rounded-[1.5rem] border border-border bg-card p-6 shadow-sm md:p-7">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-accent" />
                <h3 className="font-serif text-lg font-semibold">Check your delivery</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Minimum order ₹{ORDER.minOrderValue} · free delivery within{" "}
                {ORDER.freeDeliveryRadiusKm} KM. Enter your details to check before you order.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="order-amount" className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Order amount (₹)
                  </label>
                  <input
                    id="order-amount"
                    type="number"
                    inputMode="numeric"
                    min={ORDER.minOrderValue}
                    placeholder={`e.g. ${ORDER.minOrderValue}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-invalid={belowMinimum || undefined}
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="order-distance" className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Distance (KM)
                  </label>
                  <input
                    id="order-distance"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.1"
                    placeholder="e.g. 3"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
                  />
                </div>
              </div>

              {notices.length > 0 && (
                <ul className="mt-4 space-y-2" aria-live="polite">
                  {notices.map((n) => (
                    <li
                      key={n}
                      className="flex items-start gap-2.5 rounded-xl border border-accent/30 bg-secondary/60 px-4 py-3 text-sm text-secondary-foreground"
                    >
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Order actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={canOrder ? primaryHref : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={canOrder ? undefined : true}
                tabIndex={canOrder ? undefined : -1}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.03] hover:bg-primary/90 sm:w-auto",
                  !canOrder && "pointer-events-none opacity-60",
                )}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order Now
              </a>
              <a
                href={canOrder ? secondaryHref : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={canOrder ? undefined : true}
                tabIndex={canOrder ? undefined : -1}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-background px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary sm:w-auto",
                  !canOrder && "pointer-events-none opacity-60",
                )}
              >
                <Phone className="h-4 w-4" />
                Order via Secondary Number
              </a>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground sm:text-left">
              {canOrder ? (
                <>
                  Tap <span className="font-semibold text-foreground">Order Now</span> to chat with us on WhatsApp.
                  If the primary line is busy, use the secondary number.
                </>
              ) : (
                <>
                  Orders start at{" "}
                  <span className="font-semibold text-foreground">₹{ORDER.minOrderValue}</span>.
                  Add a little more to your order to continue.
                </>
              )}
            </p>
          </div>

          {/* Right: delivery visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-primary/10">
                <img
                  src={IMG.food || "/placeholder.svg"}
                  alt="Freshly plated food ready for delivery from Cup Today Café"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
              </div>

              {/* Floating delivery badge — same language as hero floating cards.
                  Shown only at lg+ where the image sits in its own column, so the
                  negative offset stays within the inter-column gutter (no overflow). */}
              <div
                className="absolute -bottom-5 -left-3 hidden w-52 -rotate-3 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/10 animate-float-slow lg:block"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                    <Bike className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <div className="font-serif text-sm font-semibold">20–30 min</div>
                    <div className="text-xs text-accent font-semibold">Hot &amp; fresh</div>
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.7 17.6L2.5 22l4.5-1.2a11 11 0 0 0 5 1.3h.1A11 11 0 0 0 20.5 3.5Zm-8.5 17h-.1a9 9 0 0 1-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3a9 9 0 1 1 7.2 3.7Zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3 1 2.6 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  )
}
