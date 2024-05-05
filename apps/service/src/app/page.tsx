import { GitHubLink } from "@/components/GitHubLink"
import { Journey } from "@/components/Journey"
import { OptionsProvider, OptionsSelector } from "@/components/OptionsProvider"
import { Title } from "@/components/Title"
import { TotalRecordProvider } from "@/components/TotalRecordProvider"
import { TypingStatusProvider } from "@/components/TypingStatusProvider"
import { isMacOS } from "@/utils/userAgent.server"
import { getRandomWords } from "@/utils/words"

const generateShortTexts = ({
  roundCount,
  wordCount
}: {
  roundCount: number
  wordCount: number
}) => {
  const shortTexts = []

  for (let i = 0; i < roundCount; i++) {
    shortTexts.push(getRandomWords(wordCount).join(" "))
  }

  return shortTexts
}

export default function Home() {
  const quotes = generateShortTexts({
    roundCount: 5,
    wordCount: 10
  })

  return (
    <TotalRecordProvider>
      <TypingStatusProvider>
        <OptionsProvider>
          <header className='relative z-10 mt-[10vh] w-full px-8 sm:mt-[25vh]'>
            <div className='mx-auto max-w-4xl'>
              <Title />
            </div>
          </header>
          <div className='fixed right-0 top-0 z-10 p-4'>
            <OptionsSelector />
          </div>
          <Journey isMacOS={isMacOS()} quotes={quotes} />
        </OptionsProvider>
        <GitHubLink />
      </TypingStatusProvider>
    </TotalRecordProvider>
  )
}
