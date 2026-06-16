import { createClient } from "@supabase/supabase-js"

/**
 * The env URL may include a trailing REST path (e.g. ".../rest/v1/").
 * supabase-js expects the bare project URL and appends "/rest/v1" itself,
 * so we strip any trailing REST segment / slash to avoid a doubled path.
 */
function normalizeSupabaseUrl(raw: string | undefined): string {
  if (!raw) return ""
  return raw.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "")
}

const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim()

if (!supabaseUrl || !supabaseAnonKey) {
  // Surface misconfiguration during development without crashing render.
  console.warn(
    "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  )
}

/**
 * Browser-safe Supabase client. The form only performs an anonymous public
 * INSERT (RLS-protected), so we disable session persistence — there is no auth.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

/** Shape of a row inserted into the public `bookings` table. */
export type BookingInsert = {
  customer_name: string
  phone_number: string
  booking_date: string
  booking_time: string
  guests: number
  special_request: string | null
}

/** Insert a single booking. Returns the raw Supabase result ({ data, error }). */
export async function insertBooking(booking: BookingInsert) {
  // Phone numbers must never be coerced to a number — that would drop leading
  // zeros and the leading "+" of a country code. Force a string at the storage
  // boundary so any caller (even one passing a numeric value) is safe.
  return supabase.from("bookings").insert({
    ...booking,
    phone_number: String(booking.phone_number).trim(),
  })
}
