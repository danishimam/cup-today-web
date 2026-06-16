"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react"

import { getAdminSupabase } from "@/lib/supabase-admin"
import { IMG } from "@/lib/site-data"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [checking, setChecking] = useState(true)

  // If an owner session already exists, skip the form.
  useEffect(() => {
    const supabase = getAdminSupabase()
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      if (data.session) {
        router.replace("/admin")
      } else {
        setChecking(false)
      }
    })
    return () => {
      active = false
    }
  }, [router])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return

    setError("")
    setSubmitting(true)
    try {
      const { error: signInError } = await getAdminSupabase().auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (signInError) {
        setError("Invalid email or password. Please try again.")
        return
      }
      router.replace("/admin")
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-secondary/40 px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src={IMG.logo}
            alt="Cup Today Café"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover shadow-md"
            unoptimized
          />
          <h1 className="mt-5 font-serif text-3xl font-semibold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage Cup Today Café bookings.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-8"
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@cuptoday.cafe"
                className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none ring-accent/40 transition-all placeholder:text-muted-foreground/70 focus:ring-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:scale-[1.02] hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
