import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Logo Generator - Create Custom Logos with AI (Free!)",
  description: "Generate beautiful custom logos with AI. Powered by Hugging Face FLUX. 100% Free!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}


