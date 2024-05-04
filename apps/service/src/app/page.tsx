import { GitHubLink } from "@/components/GitHubLink"
import { Journey } from "@/components/Journey"
import { OptionsProvider, OptionsSelector } from "@/components/OptionsProvider"
import { Title } from "@/components/Title"
import { TotalRecordProvider } from "@/components/TotalRecordProvider"
import { TypingStatusProvider } from "@/components/TypingStatusProvider"
import { isMacOS } from "@/utils/userAgent.server"

const shortTexts = [
  "눈부신 햇살이 아름다운 날. 바람은 가볍게 불고, 모든 것이 평화롭다. 그런데 갑자기 엄청난 폭풍우가 닥친다!",
  "언덕 위에 자리한 작은 집. 창문을 통해 보이는 풍경은 너무 아름답다. 하지만 집안은 어둡고 조용하다.",
  "우주에서 외계 생명체가 지구를 공격하고 있다! 우리는 마지막 희망이다. 우리의 용기와 결단이 우리의 운명을 결정할 것이다.",
  "작은 마을에는 비밀이 숨겨져 있다. 그 비밀은 시간이 흘러도 밝혀지지 않을 것이다. 그러나 오늘, 그 비밀이 드러난다.",
  "용감한 모험가가 신비로운 숲으로 들어갔다. 거기에는 보물이 숨겨져 있다는 전설이 있다. 하지만 그 보물을 찾기 위해선 큰 시련을 극복해야 한다.",
  "눈부신 햇살이 아름다운 날. 바람은 가볍게 불고, 모든 것이 평화롭다. 그런데 갑자기 엄청난 폭풍우가 닥친다!",
  "언덕 위에 자리한 작은 집. 창문을 통해 보이는 풍경은 너무 아름답다. 하지만 집안은 어둡고 조용하다.",
  "우주에서 외계 생명체가 지구를 공격하고 있다! 우리는 마지막 희망이다. 우리의 용기와 결단이 우리의 운명을 결정할 것이다.",
  "작은 마을에는 비밀이 숨겨져 있다. 그 비밀은 시간이 흘러도 밝혀지지 않을 것이다. 그러나 오늘, 그 비밀이 드러난다.",
  "용감한 모험가가 신비로운 숲으로 들어갔다. 거기에는 보물이 숨겨져 있다는 전설이 있다. 하지만 그 보물을 찾기 위해선 큰 시련을 극복해야 한다."
]

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
          <Journey isMacOS={isMacOS()} quotes={shortTexts} />
        </OptionsProvider>
        <GitHubLink />
      </TypingStatusProvider>
    </TotalRecordProvider>
  )
}
