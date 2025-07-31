import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Mon Portfolio - Ingénieur Backend",
  description: "Mon Portfolio professionnel d'ingénieur backend spécialisé en architectures logicielles",
    generator: 'james.nyemeck'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} font-sans`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
