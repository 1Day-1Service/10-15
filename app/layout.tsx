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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <style jsx global>{`
          .font-inter { font-family: ${inter.style.fontFamily}; }
          .font-roboto { font-family: ${roboto.style.fontFamily}; }
          .font-poppins { font-family: ${poppins.style.fontFamily}; }
          .font-montserrat { font-family: ${montserrat.style.fontFamily}; }
          .font-opensans { font-family: ${openSans.style.fontFamily}; }
          .font-playfair { font-family: ${playfair.style.fontFamily}; }
          .font-jetbrains { font-family: ${jetbrains.style.fontFamily}; }
          .font-noto { font-family: ${notoSansKR.style.fontFamily}; }
        `}</style>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}


