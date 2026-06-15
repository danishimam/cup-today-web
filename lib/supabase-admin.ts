import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Admin Supabase client — separate from the public client in `lib/supabase.ts`.
 *
 * The public client is deliberately anonymous (no session) because the booking
 * form only performs an RLS-protected INSERT. The admin dashboard, by contrast,
 * needs a real authenticated session that persists across reloads, so it gets
 * its own client with session persistence enabled and a distinct storage key
 * (so the two clients never clobber each other's auth state in the browser).
 *
 * Security note: route protection in the UI is convenience only. The real
 * boundary is Row Level Security — SELECT/UPDATE/DELETE on `bookings` must be
 * restricted to the `authenticated` role (see scripts/admin-rls.sql). Without a
 * valid owner session the queries below simply return nothing / fail.
 */

function normalizeSupabaseUrl(raw: string | undefined): string {
  if (!raw) return ""
  return raw.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "")
}

const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim()

let cachedClient: SupabaseClient | undefined

/** Lazily-created singleton admin client (browser-only usage). */
export function getAdminSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[supabase-admin] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    )
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "cuptoday-admin-auth",
    },
  })
  return cachedClient
}

export type BookingStatus = "pending" | "confirmed" | "cancelled"

/** A row from the public `bookings` table, as read by the admin dashboard. */
export type Booking = {
  id: string
  customer_name: string
  phone_number: string
  booking_date: string
  booking_time: string
  guests: number
  special_request: string | null
  status: BookingStatus | null
  created_at: string
  confirmed_at: string | null
  cancelled_at: string | null
}

const BOOKING_COLUMNS =
  "id, customer_name, phone_number, booking_date, booking_time, guests, special_request, status, created_at, confirmed_at, cancelled_at"

/** Fetch all bookings, newest first. */
export async function fetchBookings() {
  return getAdminSupabase()
    .from("bookings")
    .select(BOOKING_COLUMNS)
    .order("created_at", { ascending: false })
    .returns<Booking[]>()
}

/** Mark a booking confirmed and stamp `confirmed_at`. */
export async function confirmBooking(id: string) {
  return getAdminSupabase()
    .from("bookings")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("id", id)
    .select(BOOKING_COLUMNS)
    .single<Booking>()
}

/** Mark a booking cancelled and stamp `cancelled_at`. */
export async function cancelBooking(id: string) {
  return getAdminSupabase()
    .from("bookings")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("id", id)
    .select(BOOKING_COLUMNS)
    .single<Booking>()
}

/** Permanently delete a booking. */
export async function deleteBooking(id: string) {
  return getAdminSupabase().from("bookings").delete().eq("id", id)
}
