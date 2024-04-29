import "./globals.css"

import { pretendard } from "@/assets/fonts"
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
        <main className='flex min-h-screen flex-col items-center justify-between pb-8'>
          <div className='mx-auto flex min-w-96 max-w-4xl grow flex-col px-8'>
            <header className='pb-12 pt-28'>
              <h1 className='text-3xl font-bold'>한타입</h1>
            </header>
            <div className='grow'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  )
}
