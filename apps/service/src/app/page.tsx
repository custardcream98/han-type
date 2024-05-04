import { GitHubLink } from "@/components/GitHubLink"
import { Journey } from "@/components/Journey"
import { OptionsProvider, OptionsSelector } from "@/components/OptionsProvider"
import { Title } from "@/components/Title"
import { TotalRecordProvider } from "@/components/TotalRecordProvider"
import { TypingStatusProvider } from "@/components/TypingStatusProvider"
import { isMacOS } from "@/utils/userAgent.server"
import { getRandomWords } from "@/utils/words"

const ROUNDS = 5
const WORDS_COUNT = 10

const generateShortTexts = () => {
  const shortTexts = []

  for (let i = 0; i < ROUNDS; i++) {
    shortTexts.push(getRandomWords(WORDS_COUNT).join(" "))
  }

  return shortTexts
}

export default function Home() {
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
          <Journey isMacOS={isMacOS()} quotes={generateShortTexts()} />
        </OptionsProvider>
        <GitHubLink />
      </TypingStatusProvider>
    </TotalRecordProvider>
  )
}
