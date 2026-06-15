import type { BookingStatus } from "@/lib/supabase-admin"

/** Treat a null/unknown status as "pending" for display and filtering. */
export function normalizeStatus(status: BookingStatus | null): BookingStatus {
  if (status === "confirmed" || status === "cancelled") return status
  return "pending"
}

/** "2026-06-15" -> "15 Jun 2026". Falls back to the raw value if unparseable. */
export function formatDate(value: string | null): string {
  if (!value) return "—"
  const d = new Date(value.includes("T") ? value : `${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/** "19:30" or "19:30:00" -> "7:30 PM". Falls back to the raw value. */
export function formatTime(value: string | null): string {
  if (!value) return "—"
  const [h, m] = value.split(":")
  const hour = Number(h)
  const minute = Number(m)
  if (Number.isNaN(hour) || Number.isNaN(minute)) return value
  const period = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`
}

/** A full timestamp -> "15 Jun 2026, 7:30 PM". */
export function formatDateTime(value: string | null): string {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/** Local YYYY-MM-DD (used to detect "today's" bookings). */
export function todayISO(): string {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10)
}
