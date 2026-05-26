import { Mail, MapPin, Phone } from "lucide-react"
import { CONTACT, IMG, SOCIALS } from "@/lib/site-data"

function SocialIcon({ name }: { name: (typeof SOCIALS)[number]["icon"] }) {
  const common = "h-4 w-4"
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      )
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6C16 4.5 15 4.4 13.9 4.4c-2.3 0-3.9 1.4-3.9 4v2.5H7.3V14H10v8h3z" />
        </svg>
      )
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M20.5 3.5A11 11 0 0 0 3.7 17.6L2.5 22l4.5-1.2a11 11 0 0 0 5 1.3h.1A11 11 0 0 0 20.5 3.5Zm-8.5 17h-.1a9 9 0 0 1-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3a9 9 0 1 1 7.2 3.7Zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3 1 2.6 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
        </svg>
      )
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z" />
        </svg>
      )
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="M17.5 3h3l-7.4 8.5L22 21h-6.4l-5-6.6L4.8 21H1.7l8-9.1L1.5 3h6.6l4.5 6 5-6Zm-2.2 16h1.7L7.4 5h-2L15.3 19Z" />
        </svg>
      )
  }
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Stay connected band */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-border py-12 md:flex-row md:py-14">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl font-semibold md:text-3xl">
              Stay Connected With Us
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Follow us for latest offers, new menu launches, updates and café moments.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow Cup Today Café on ${s.name}`}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-md"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-secondary ring-1 ring-primary/30 shadow-sm">
                <img
                  src={IMG.logo || "/placeholder.svg"}
                  alt="Cup Today Café logo"
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <div className="font-serif text-lg font-semibold">Cup Today Café</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Café · Hyderabad
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A premium café in Hayath Mall, Tolichowki — serving specialty
              coffee, signature burgers, wood-fired pizzas and comforting plates
              from morning to midnight.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["#top", "Home"],
                ["#about", "About"],
                ["#menu", "Menu"],
                ["#order", "Order"],
                ["#gallery", "Gallery"],
                ["#reviews", "Reviews"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-muted-foreground transition-colors hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Get in Touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {CONTACT.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  {CONTACT.phones.map((p, i) => (
                    <span key={p}>
                      <a href={`tel:+91${p}`} className="hover:text-primary">+91 {p}</a>
                      {i < CONTACT.phones.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-1 font-medium text-foreground">{CONTACT.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>&copy; {new Date().getFullYear()} Cup Today Café. All rights reserved.</p>
          <p>Crafted with care in Hyderabad.</p>
        </div>
      </div>
    </footer>
  )
}
