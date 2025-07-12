import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Medical History Twin",
  description: "Doctor-facing interface for patient medical history management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-50">
          <Navigation />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
