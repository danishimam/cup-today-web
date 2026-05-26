"use client"

import type React from "react"
import { useState } from "react"
import { Clock, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react"
import { CONTACT } from "@/lib/site-data"

export function Visit() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="relative scroll-mt-24 bg-secondary/40 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <span className="inline-flex h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Visit Us</span>
            <span className="inline-flex h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Find your <span className="italic text-primary">favourite</span> seat.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            We&apos;re right in the heart of Tolichowki. Walk in, grab a table, and
            we&apos;ll take care of the rest — or drop us a message below.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Info + Map */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={MapPin}
                title="Address"
                lines={CONTACT.addressLines}
              />
              <InfoCard
                icon={Clock}
                title="Hours"
                lines={[CONTACT.hours]}
              />
              <InfoCard
                icon={Phone}
                title="Phone"
                lines={CONTACT.phones.map((p) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`)}
                href={`tel:+91${CONTACT.phones[0]}`}
              />
              <InfoCard
                icon={Mail}
                title="Email"
                lines={[CONTACT.email]}
                href={`mailto:${CONTACT.email}`}
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-border shadow-lg">
              <iframe
                title="Cup Today Café location map"
                src={CONTACT.mapsEmbed}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  CONTACT.mapsQuery,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:scale-[1.03]"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
              <a
                href={`tel:+91${CONTACT.phones[0]}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              >
                <Phone className="h-4 w-4" />
                Call to Book
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={onSubmit}
              className="relative flex flex-col gap-4 rounded-[1.5rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-8"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold">Book a Table</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Reserve your favourite spot — we&apos;ll confirm shortly.
                </p>
              </div>

              <Field label="Full name" id="name" type="text" placeholder="Your name" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" id="phone" type="tel" placeholder="+91" required />
                <Field label="Guests" id="guests" type="number" placeholder="2" min={1} max={20} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Date" id="date" type="date" required />
                <Field label="Time" id="time" type="time" required />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Any special requests?"
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:scale-[1.02] hover:bg-primary/90"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Request Sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Reserve My Seat
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                We&apos;ll confirm via call or WhatsApp within 30 minutes.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  lines: string[]
  href?: string
}) {
  const content = (
    <>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </div>
        {lines.map((l) => (
          <div key={l} className="mt-0.5 font-medium text-foreground">
            {l}
          </div>
        ))}
      </div>
    </>
  )
  const className =
    "group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}

function Field({
  label,
  id,
  ...rest
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...rest}
        className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
      />
    </div>
  )
}
