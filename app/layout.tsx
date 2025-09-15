import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import {Toaster} from "react-hot-toast"
import "./globals.css"

export const metadata: Metadata = {
  title: "Weekendly - Plan Your Perfect Weekend",
  description:
    "Transform your weekends with our intuitive planning app. Organize activities, manage time, and make every weekend memorable.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} flex flex-col min-h-screen`}>
        <Toaster position="top-center" />
        <main className="flex-grow">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
          <Footer />
        <Analytics />
      </body>
    </html>
  )
}
