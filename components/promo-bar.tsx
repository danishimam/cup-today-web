"use client"

import { useState } from "react"
import { Sparkles, X, ArrowRight } from "lucide-react"
import { CONTACT, ORDER } from "@/lib/site-data"

const OFFER_MESSAGE =
  "Hello Cup Today, I'd like to claim the Buy 2 Mocktails, Get 1 Free offer."

/**
 * Slim, premium announcement bar fixed at the very top of the page.
 * Its height is published as the --promo-h CSS variable so the fixed header
 * and the hero padding sit neatly below it; dismissing the bar flips
 * html.promo-dismissed to 0px and everything slides up smoothly.
 */
export function PromoBar() {
  const [show, setShow] = useState(true)
  if (!show) return null

  const href = ORDER.whatsapp(CONTACT.phones[0], OFFER_MESSAGE)

  const dismiss = () => {
    document.documentElement.classList.add("promo-dismissed")
    setShow(false)
  }

  return (
    <div
      role="region"
      aria-label="Special offer"
      className="fixed inset-x-0 top-0 z-[90] flex h-10 items-center overflow-hidden bg-primary text-primary-foreground md:h-11"
    >
      {/* subtle gold shimmer sweeping across the bar */}
      <div
        aria-hidden
        className="animate-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,color-mix(in_oklab,var(--accent)_45%,transparent)_50%,transparent_75%)]"
      />

      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center gap-2.5 px-10 sm:gap-3 md:px-12">
        <Sparkles className="hidden h-3.5 w-3.5 shrink-0 text-accent sm:block" aria-hidden />
        <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
          B2G1 Free
        </span>
        <span className="truncate text-xs font-semibold tracking-wide sm:text-sm">
          Buy 2 Mocktails, Get 1 <span className="text-accent">Free</span>
        </span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group hidden shrink-0 items-center gap-1 rounded-full border border-primary-foreground/30 px-3 py-1 text-[11px] font-semibold transition-colors hover:bg-primary-foreground/10 sm:inline-flex"
        >
          Claim now
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer"
        className="absolute right-1.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground md:right-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
