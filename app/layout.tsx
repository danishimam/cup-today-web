import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const LOGO =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-8Sc7Q9Rj04fI0M5C5zhzlhnIkbwA8w.jpeg"

export const metadata: Metadata = {
  title: "Cup Today Café — Fresh Brews, Delicious Bites | Tolichowki, Hyderabad",
  description:
    "Cup Today Café in Tolichowki, Hyderabad — premium coffee, signature burgers, pizzas, mocktails and milkshakes. Open daily 10:30 AM – 12:30 AM. Book a table now.",
  generator: "v0.app",
  keywords: [
    "Cup Today Cafe",
    "Tolichowki cafe",
    "Hyderabad cafe",
    "best burgers Tolichowki",
    "premium coffee Hyderabad",
    "cafe near Hayath Mall",
  ],
  icons: {
    icon: LOGO,
    shortcut: LOGO,
    apple: LOGO,
  },
  openGraph: {
    title: "Cup Today Café — Fresh Brews, Delicious Bites, Memorable Moments",
    description:
      "Premium café at Hayath Mall, Tolichowki, Hyderabad. Coffee, burgers, pizzas, mocktails and more.",
    type: "website",
    images: [LOGO],
  },
}

export const viewport = {
  themeColor: "#F5E6CC",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
