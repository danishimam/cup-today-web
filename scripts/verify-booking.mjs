// One-off verification: inserts a clearly-labeled test booking via the public
// anon client (same path the form uses), then tries to clean it up.
import { readFileSync } from "node:fs"
import { createClient } from "@supabase/supabase-js"

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=")
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const url = (env.NEXT_PUBLIC_SUPABASE_URL || "")
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "")
const supabase = createClient(url, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
})

const row = {
  customer_name: "TEST BOOKING – automated check (safe to delete)",
  phone_number: "+910000000000",
  booking_date: new Date().toISOString().slice(0, 10),
  booking_time: "12:00",
  guests: 2,
  special_request: "Automated verification row",
}

console.log("=== Resolved Supabase URL ===")
console.log(url)
console.log("\n=== Exact insert call ===")
console.log(`supabase.from("bookings").insert(${JSON.stringify(row, null, 2)}).select()`)
console.log("\n=== REST endpoint hit by supabase-js ===")
console.log(`POST ${url}/rest/v1/bookings`)

const { data, error, status, statusText } = await supabase
  .from("bookings")
  .insert(row)
  .select()

console.log("\n=== HTTP status ===")
console.log(status, statusText)

if (error) {
  console.log("\n=== Complete error object ===")
  // PostgrestError fields are non-enumerable in some builds; list them explicitly.
  console.log(
    JSON.stringify(
      {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        name: error.name,
      },
      null,
      2,
    ),
  )
  console.log("\n=== Raw error (util.inspect) ===")
  console.dir(error, { depth: null })
  process.exit(1)
}
console.log("INSERT OK. Returned row(s):", JSON.stringify(data, null, 2))

// Best-effort cleanup (will only succeed if a DELETE policy exists).
const id = data?.[0]?.id
if (id != null) {
  const { error: delErr } = await supabase.from("bookings").delete().eq("id", id)
  console.log(
    delErr
      ? `Cleanup skipped (no public DELETE policy): test row id=${id} remains.`
      : `Cleanup OK: removed test row id=${id}.`,
  )
}
