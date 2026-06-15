import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Admin · Cup Today Café",
  // The dashboard must never be indexed by search engines.
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
      <Toaster position="top-center" richColors />
    </div>
  )
}
