import { CalendarCheck, CalendarClock, CheckCircle2, Users } from "lucide-react"

import { Card } from "@/components/ui/card"
import { normalizeStatus, todayISO } from "@/lib/admin-format"
import type { Booking } from "@/lib/supabase-admin"

export type BookingStats = {
  total: number
  pending: number
  confirmed: number
  today: number
}

export function computeStats(bookings: Booking[]): BookingStats {
  const today = todayISO()
  return bookings.reduce<BookingStats>(
    (acc, b) => {
      acc.total += 1
      const status = normalizeStatus(b.status)
      if (status === "pending") acc.pending += 1
      if (status === "confirmed") acc.confirmed += 1
      if (b.booking_date === today) acc.today += 1
      return acc
    },
    { total: 0, pending: 0, confirmed: 0, today: 0 },
  )
}

const CARDS = [
  { key: "total", label: "Total Bookings", Icon: Users, accent: "text-primary" },
  { key: "pending", label: "Pending", Icon: CalendarClock, accent: "text-accent-foreground" },
  { key: "confirmed", label: "Confirmed", Icon: CheckCircle2, accent: "text-emerald-600" },
  { key: "today", label: "Today's Bookings", Icon: CalendarCheck, accent: "text-primary" },
] as const

export function StatCards({ stats }: { stats: BookingStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {CARDS.map(({ key, label, Icon, accent }) => (
        <Card key={key} className="gap-2 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </span>
            <Icon className={`h-4 w-4 shrink-0 ${accent}`} />
          </div>
          <span className="font-serif text-3xl font-semibold sm:text-4xl">
            {stats[key]}
          </span>
        </Card>
      ))}
    </div>
  )
}
