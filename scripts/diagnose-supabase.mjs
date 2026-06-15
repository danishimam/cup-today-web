// READ-ONLY diagnosis. No inserts, no writes, no app-code changes.
// Decodes the anon key, compares project refs, and inspects the request role.
import { readFileSync } from "node:fs"

const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
const env = Object.fromEntries(
  raw
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=")
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const rawUrl = env.NEXT_PUBLIC_SUPABASE_URL || ""
const normalizedUrl = rawUrl
  .trim()
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "")

// Project ref from the URL host: <ref>.supabase.co
const urlRef = (() => {
  try {
    return new URL(normalizedUrl).host.split(".")[0]
  } catch {
    return "(unparseable URL)"
  }
})()

function decodeJwt(token) {
  const parts = (token || "").split(".")
  if (parts.length !== 3) return null
  const b64 = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
  try {
    return { header: JSON.parse(b64(parts[0])), payload: JSON.parse(b64(parts[1])) }
  } catch {
    return null
  }
}

const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const decoded = decodeJwt(key)

console.log("============ 1. URL IN USE ============")
console.log("raw NEXT_PUBLIC_SUPABASE_URL :", JSON.stringify(rawUrl))
console.log("normalized (used by client)  :", JSON.stringify(normalizedUrl))
console.log("project ref from URL host    :", urlRef)

console.log("\n============ 2. ANON KEY DECODED ============")
console.log("key length                   :", key.length)
if (!decoded) {
  console.log("Could not decode JWT (malformed key).")
} else {
  console.log("header                       :", JSON.stringify(decoded.header))
  console.log("payload.iss                  :", decoded.payload.iss)
  console.log("payload.ref (project)        :", decoded.payload.ref)
  console.log("payload.role                 :", decoded.payload.role)
  const now = Math.floor(Date.now() / 1000)
  console.log("payload.iat                  :", decoded.payload.iat, "->", new Date(decoded.payload.iat * 1000).toISOString())
  console.log("payload.exp                  :", decoded.payload.exp, "->", new Date(decoded.payload.exp * 1000).toISOString())
  console.log("expired?                     :", decoded.payload.exp < now)
}

console.log("\n============ 3. PROJECT MATCH CHECK ============")
if (decoded) {
  const match = decoded.payload.ref === urlRef
  console.log("URL ref     :", urlRef)
  console.log("Key ref     :", decoded.payload.ref)
  console.log("MATCH?      :", match ? "YES ✅" : "NO ❌  <-- key and URL are DIFFERENT projects")
}

console.log("\n============ 4. REQUEST ROLE CHECK (live, read-only) ============")
// Ask PostgREST who we are by calling the built-in introspection: a HEAD on the
// REST root returns 200 for a valid anon key. We also decode the role we send.
console.log("role sent in Authorization   :", decoded?.payload.role ?? "(unknown)")
console.log("auth.persistSession          : false (no user session) -> request runs as the key's role")

try {
  const res = await fetch(`${normalizedUrl}/rest/v1/`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  console.log("GET /rest/v1/ status         :", res.status, res.statusText)
} catch (e) {
  console.log("GET /rest/v1/ failed         :", e.message)
}

// Read-only probe against the bookings table (SELECT, not INSERT).
try {
  const res = await fetch(`${normalizedUrl}/rest/v1/bookings?select=count`, {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact" },
  })
  console.log("HEAD-style SELECT bookings   :", res.status, res.statusText, "| content-range:", res.headers.get("content-range"))
} catch (e) {
  console.log("SELECT bookings failed       :", e.message)
}
