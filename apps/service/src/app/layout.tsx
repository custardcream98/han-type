import "./globals.css"

import { pretendard } from "@/assets/fonts"
import { ToastRoot } from "@/components/Toast"
import { Metadata } from "next"

export const metadata: Metadata = {
  description: "한국어 타자 연습",
  title: "HanType"
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
          <ToastRoot>
            <div className='mx-auto flex min-w-96 max-w-4xl grow flex-col px-8'>
              <header className='sr-only'>
                <h1>한타입</h1>
              </header>
              <div className='grow'>{children}</div>
            </div>
          </ToastRoot>
        </main>
      </body>
    </html>
  )
}
