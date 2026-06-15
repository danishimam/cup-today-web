"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { IMG } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#order", label: "Order" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      style={{ top: "var(--promo-h, 0px)" }}
      className={cn(
        "fixed inset-x-0 z-[100] transition-all duration-300",
        scrolled
          ? "glass-strong border-b border-primary/15 shadow-md shadow-primary/5"
          : "glass border-b border-border/40",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <a href="#top" className="flex items-center gap-3" aria-label="Cup Today Café home">
          <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-secondary ring-1 ring-primary/30 shadow-sm">
            <img
              src={IMG.logo || "/placeholder.svg"}
              alt="Cup Today Café logo"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold tracking-wide text-foreground sm:text-xl">
              Cup Today
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              Café · Hyderabad
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:scale-[1.03] hover:bg-primary/90 lg:inline-block"
        >
          Book a Table
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 glass-strong lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20"
            >
              Book a Table
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
