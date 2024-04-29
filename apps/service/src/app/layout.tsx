import "./globals.css"

import { pretendard } from "@/assets/fonts"
import { Title, TypingStatusProvider } from "@/components/Title"
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
            <div className='mx-auto flex max-w-4xl grow flex-col px-8'>
              <TypingStatusProvider>
                <header className='fixed left-0 right-0 top-0 mx-auto mt-[30vh] max-w-4xl'>
                  <Title />
                </header>
                <div className='grow'>{children}</div>
              </TypingStatusProvider>
            </div>
          </ToastRoot>
        </main>
      </body>
    </html>
  )
}
