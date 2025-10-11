import type { Metadata } from "next"
import { Inter, Roboto, Poppins, Montserrat, Open_Sans, Playfair_Display, JetBrains_Mono, Noto_Sans_KR } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ["latin"] })
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })
const openSans = Open_Sans({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"] })
const notoSansKR = Noto_Sans_KR({ weight: ['400', '700'], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Logo Generator - Create Custom Logos with AI (Free!)",
  description: "Generate beautiful custom logos with AI. Powered by Hugging Face FLUX. 100% Free!",
  verification: {
    google: "4fH6k9IRd0AGqHAYAvpCe_EN_NwmRCpFso5olHqs_MA",
  },
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


