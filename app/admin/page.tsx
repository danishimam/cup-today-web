"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"
import { AlertCircle, LogOut, RefreshCw, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IMG } from "@/lib/site-data"
import {
  cancelBooking,
  confirmBooking,
  deleteBooking,
  fetchBookings,
  getAdminSupabase,
  type Booking,
} from "@/lib/supabase-admin"
import { normalizeStatus } from "@/lib/admin-format"
import { computeStats, StatCards } from "@/components/admin/stat-cards"
import {
  BookingsToolbar,
  type StatusFilter,
} from "@/components/admin/bookings-toolbar"
import { BookingsTable } from "@/components/admin/bookings-table"

type AuthState = "checking" | "authed" | "anon"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>("checking")

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [busyId, setBusyId] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<StatusFilter>("all")

  // --- Auth guard -----------------------------------------------------------
  useEffect(() => {
    const supabase = getAdminSupabase()
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      if (data.session) {
        setAuthState("authed")
      } else {
        setAuthState("anon")
        router.replace("/admin/login")
      }
    })

    // React to sign-out (here or in another tab).
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      if (!session) {
        setAuthState("anon")
        router.replace("/admin/login")
      }
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [router])

  // --- Data load ------------------------------------------------------------
  const load = useCallback(async () => {
    setLoading(true)
    setLoadError("")
    const { data, error } = await fetchBookings()
    if (error) {
      setLoadError("Couldn't load bookings. Please refresh or try again shortly.")
    } else {
      setBookings(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authState === "authed") void load()
  }, [authState, load])

  // --- Actions --------------------------------------------------------------
  const handleConfirm = useCallback(async (id: string) => {
    setBusyId(id)
    const { data, error } = await confirmBooking(id)
    if (error || !data) {
      toast.error("Couldn't confirm the booking.")
    } else {
      setBookings((prev) => prev.map((b) => (b.id === id ? data : b)))
      toast.success("Booking confirmed.")
    }
    setBusyId(null)
  }, [])

  const handleCancel = useCallback(async (id: string) => {
    setBusyId(id)
    const { data, error } = await cancelBooking(id)
    if (error || !data) {
      toast.error("Couldn't cancel the booking.")
    } else {
      setBookings((prev) => prev.map((b) => (b.id === id ? data : b)))
      toast.success("Booking cancelled.")
    }
    setBusyId(null)
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    setBusyId(id)
    const { error } = await deleteBooking(id)
    if (error) {
      toast.error("Couldn't delete the booking.")
    } else {
      setBookings((prev) => prev.filter((b) => b.id !== id))
      toast.success("Booking deleted.")
    }
    setBusyId(null)
  }, [])

  const handleLogout = useCallback(async () => {
    await getAdminSupabase().auth.signOut()
    router.replace("/admin/login")
  }, [router])

  // --- Derived data ---------------------------------------------------------
  const stats = useMemo(() => computeStats(bookings), [bookings])

  const counts = useMemo<Record<StatusFilter, number>>(
    () => ({
      all: bookings.length,
      pending: bookings.filter((b) => normalizeStatus(b.status) === "pending").length,
      confirmed: bookings.filter((b) => normalizeStatus(b.status) === "confirmed").length,
      cancelled: bookings.filter((b) => normalizeStatus(b.status) === "cancelled").length,
    }),
    [bookings],
  )

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    const qDigits = q.replace(/\D/g, "")
    return bookings.filter((b) => {
      if (filter !== "all" && normalizeStatus(b.status) !== filter) return false
      if (!q) return true
      const nameHit = b.customer_name.toLowerCase().includes(q)
      const phoneHit =
        qDigits.length > 0 && b.phone_number.replace(/\D/g, "").includes(qDigits)
      return nameHit || phoneHit
    })
  }, [bookings, search, filter])

  // --- Render ---------------------------------------------------------------
  if (authState !== "authed") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={IMG.logo}
            alt="Cup Today Café"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover shadow-sm"
            unoptimized
          />
          <div>
            <h1 className="font-serif text-2xl font-semibold leading-tight md:text-3xl">
              Bookings Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Cup Today Café</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void load()}
            disabled={loading}
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => void handleLogout()}>
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </header>

      <section className="mt-6 md:mt-8">
        <StatCards stats={stats} />
      </section>

      <section className="mt-6 md:mt-8">
        <BookingsToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      </section>

      <section className="mt-4 md:mt-6">
        {loading ? (
          <div className="flex items-center justify-center rounded-xl border border-border bg-card py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : loadError ? (
          <div
            role="alert"
            className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-4 text-sm text-destructive"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{loadError}</span>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => void load()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <BookingsTable
            bookings={visible}
            busyId={busyId}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  )
}
