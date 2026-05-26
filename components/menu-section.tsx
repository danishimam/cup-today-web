"use client"

import { useState } from "react"
import { menu, menuCategories, type MenuItem } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function MenuSection() {
  const [active, setActive] = useState(menuCategories[0])
  const items = menu[active]

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 border-y border-border/60 bg-secondary/40 py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <span className="inline-flex h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">The Menu</span>
            <span className="inline-flex h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Crafted with <span className="italic text-primary">care</span>, served with love.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            From signature burgers to bold espressos — every item is
            made-to-order using fresh, quality ingredients.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3"
          role="tablist"
          aria-label="Menu categories"
        >
          {menuCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all",
                active === c
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <MenuCard key={item.name} item={item} index={idx} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Prices include all taxes · Subject to availability
        </p>
      </div>
    </section>
  )
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl hover:shadow-primary/15 animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {item.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {item.tag && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-foreground shadow-md">
              {item.tag}
            </span>
          )}
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-secondary via-card to-secondary">
          <span className="font-serif text-5xl font-semibold text-primary/30">
            {item.name.charAt(0)}
          </span>
          {item.tag && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-foreground shadow-md">
              {item.tag}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl font-semibold leading-tight text-foreground">
            {item.name}
          </h3>
          <span className="shrink-0 font-serif text-lg font-semibold text-accent">
            {item.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
      </div>
    </article>
  )
}
