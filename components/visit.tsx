"use client"

import type React from "react"
import { useRef, useState } from "react"
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { CONTACT } from "@/lib/site-data"
import { insertBooking } from "@/lib/supabase"

type Status = "idle" | "submitting" | "success" | "error"
type FieldErrors = Partial<Record<"name" | "phone" | "guests" | "date" | "time", string>>

// Local YYYY-MM-DD (used as the date input min and for the past-date check).
function todayISO() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function validate(values: {
  name: string
  phone: string
  guests: string
  date: string
  time: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (values.name.length < 2) {
    errors.name = "Please enter your full name."
  }

  const phoneDigits = values.phone.replace(/[\s\-()]/g, "")
  if (!/^\+?\d{10,15}$/.test(phoneDigits)) {
    errors.phone = "Enter a valid phone number (10–15 digits)."
  }

  const guests = Number(values.guests)
  if (!values.guests || !Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.guests = "Guests must be between 1 and 20."
  }

  if (!values.date) {
    errors.date = "Please choose a date."
  } else if (values.date < todayISO()) {
    errors.date = "Please choose today or a future date."
  }

  if (!values.time) {
    errors.time = "Please choose a time."
  }

  return errors
}

export function Visit() {
  const [status, setStatus] = useState<Status>("idle")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  // Guards against duplicate submissions from rapid double-clicks (set before
  // the async work, so a second click is rejected before state re-renders).
  const submittingRef = useRef(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submittingRef.current) return

    const form = e.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      guests: String(data.get("guests") ?? "").trim(),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    }

    const errors = validate(values)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus("error")
      setFormError("Please fix the highlighted fields and try again.")
      return
    }

    setFieldErrors({})
    setFormError("")
    submittingRef.current = true
    setStatus("submitting")

    try {
      const { error } = await insertBooking({
        customer_name: values.name,
        phone_number: values.phone,
        booking_date: values.date,
        booking_time: values.time,
        guests: Number(values.guests),
        special_request: values.message || null,
      })

      if (error) {
        setStatus("error")
        setFormError(
          "Sorry, we couldn't save your booking right now. Please try again or call us directly.",
        )
        return
      }

      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setFormError(
        "Something went wrong while connecting. Please check your network and try again.",
      )
    } finally {
      submittingRef.current = false
    }
  }

  const isSubmitting = status === "submitting"

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
              noValidate
              className="relative flex flex-col gap-4 rounded-[1.5rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-8"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold">Book a Table</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Reserve your favourite spot — we&apos;ll confirm shortly.
                </p>
              </div>

              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-2.5 rounded-xl border border-accent/40 bg-secondary/70 px-4 py-3 text-sm text-secondary-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    <span className="font-semibold text-foreground">Booking received!</span>{" "}
                    Thank you — we&apos;ll confirm your table via call or WhatsApp within 30 minutes.
                  </span>
                </div>
              )}

              {status === "error" && formError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <Field
                label="Full name"
                id="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                required
                error={fieldErrors.name}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Phone"
                  id="phone"
                  type="tel"
                  placeholder="+91"
                  autoComplete="tel"
                  required
                  error={fieldErrors.phone}
                />
                <Field
                  label="Guests"
                  id="guests"
                  type="number"
                  placeholder="2"
                  min={1}
                  max={20}
                  required
                  error={fieldErrors.guests}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Date"
                  id="date"
                  type="date"
                  min={todayISO()}
                  required
                  error={fieldErrors.date}
                />
                <Field
                  label="Time"
                  id="time"
                  type="time"
                  required
                  error={fieldErrors.time}
                />
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
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:scale-[1.02] hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Reserving…
                  </>
                ) : status === "success" ? (
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
  error,
  ...rest
}: {
  label: string
  id: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = error ? `${id}-error` : undefined
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
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
        className={
          error
            ? "rounded-xl border border-destructive bg-background px-4 py-3 text-sm text-foreground outline-none ring-destructive/30 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
            : "rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
        }
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
