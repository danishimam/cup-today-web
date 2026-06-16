"use client"

import { CalendarX2, CheckCircle2, Loader2, Trash2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { StatusBadge } from "@/components/admin/status-badge"
import {
  formatDate,
  formatDateTime,
  formatTime,
  normalizeStatus,
} from "@/lib/admin-format"
import type { Booking } from "@/lib/supabase-admin"

type Props = {
  bookings: Booking[]
  busyId: string | null
  onConfirm: (id: string) => void
  onCancel: (id: string) => void
  onDelete: (id: string) => void
}

export function BookingsTable({ bookings, busyId, onConfirm, onCancel, onDelete }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <CalendarX2 className="h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium text-foreground">No bookings found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try clearing the search or filters.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop / tablet: table */}
      <div className="hidden rounded-xl border border-border bg-card shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-center">Guests</TableHead>
              <TableHead>Special Request</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium text-foreground">
                  {b.customer_name}
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:${b.phone_number}`}
                    className="text-primary hover:underline"
                  >
                    {b.phone_number}
                  </a>
                </TableCell>
                <TableCell>{formatDate(b.booking_date)}</TableCell>
                <TableCell>{formatTime(b.booking_time)}</TableCell>
                <TableCell className="text-center">{b.guests}</TableCell>
                <TableCell className="max-w-[16rem] whitespace-normal text-muted-foreground">
                  {b.special_request?.trim() || "—"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={b.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(b.created_at)}
                </TableCell>
                <TableCell className="text-right">
                  <RowActions
                    booking={b}
                    busy={busyId === b.id}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground">{b.customer_name}</p>
                <a
                  href={`tel:${b.phone_number}`}
                  className="text-sm text-primary hover:underline"
                >
                  {b.phone_number}
                </a>
              </div>
              <StatusBadge status={b.status} />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Detail label="Date" value={formatDate(b.booking_date)} />
              <Detail label="Time" value={formatTime(b.booking_time)} />
              <Detail label="Guests" value={String(b.guests)} />
              <Detail label="Created" value={formatDateTime(b.created_at)} />
            </dl>

            {b.special_request?.trim() && (
              <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
                {b.special_request.trim()}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <RowActions
                booking={b}
                busy={busyId === b.id}
                onConfirm={onConfirm}
                onCancel={onCancel}
                onDelete={onDelete}
                full
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-foreground">{value}</dd>
    </div>
  )
}

function RowActions({
  booking,
  busy,
  onConfirm,
  onCancel,
  onDelete,
  full = false,
}: {
  booking: Booking
  busy: boolean
  onConfirm: (id: string) => void
  onCancel: (id: string) => void
  onDelete: (id: string) => void
  full?: boolean
}) {
  const status = normalizeStatus(booking.status)

  return (
    <div className={`flex items-center gap-2 ${full ? "w-full" : "justify-end"}`}>
      {busy && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />}

      {status !== "confirmed" && (
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => onConfirm(booking.id)}
          className="border-emerald-600/40 text-emerald-700 hover:bg-emerald-600 hover:text-white"
        >
          <CheckCircle2 className="size-4" />
          Confirm
        </Button>
      )}

      {status !== "cancelled" && (
        <Button
          size="sm"
          variant="outline"
          disabled={busy}
          onClick={() => onCancel(booking.id)}
        >
          <XCircle className="size-4" />
          Cancel
        </Button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            disabled={busy}
            className="text-destructive hover:bg-destructive hover:text-white"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes {booking.customer_name}&apos;s booking. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(booking.id)}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
