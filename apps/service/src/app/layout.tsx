import "./globals.css"

import { pretendard } from "@/assets/fonts"
import { GitHubLink, Title } from "@/components/Title"
import { ToastRoot } from "@/components/Toast"
import { TypingStatusProvider } from "@/components/TypingStatusProvider"
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
            <div className='flex flex-col items-center'>
              <TypingStatusProvider>
                <header className='fixed left-0 right-0 top-0 mx-auto mt-[30vh] max-w-4xl'>
                  <Title />
                </header>
                {children}
                <GitHubLink />
              </TypingStatusProvider>
            </div>
          </ToastRoot>
        </main>
      </body>
    </html>
  )
}
