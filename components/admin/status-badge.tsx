import { CheckCircle2, Clock, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { normalizeStatus } from "@/lib/admin-format"
import type { BookingStatus } from "@/lib/supabase-admin"

const CONFIG: Record<
  BookingStatus,
  { label: string; className: string; Icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    className: "border-accent/40 bg-accent/15 text-accent-foreground",
    Icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    className: "border-transparent bg-emerald-600 text-white",
    Icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-transparent bg-destructive text-white",
    Icon: XCircle,
  },
}

export function StatusBadge({ status }: { status: BookingStatus | null }) {
  const { label, className, Icon } = CONFIG[normalizeStatus(status)]
  return (
    <Badge variant="outline" className={className}>
      <Icon className="size-3" />
      {label}
    </Badge>
  )
}
