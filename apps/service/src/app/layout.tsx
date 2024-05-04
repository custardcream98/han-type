import "./globals.css"

import { pretendard } from "@/assets/fonts"
import { ToastRoot } from "@/components/Toast"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"

export const metadata: Metadata = {
  description: "한국어 타자 연습",
  title: "한,타자"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <main className='flex min-h-screen flex-col items-center justify-between'>
          <ToastRoot>{children}</ToastRoot>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
