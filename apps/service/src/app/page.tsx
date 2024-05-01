import { GitHubLink, Title } from "@/components/Title"
import { TypeSlots } from "@/components/TypeSlots"
import { TypingStatusProvider } from "@/components/TypingStatusProvider"

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
    <div className='flex flex-col items-center'>
      <TypingStatusProvider>
        <header className='fixed left-0 right-0 top-0 mx-auto mt-[30vh] max-w-4xl'>
          <Title />
        </header>
        <TypeSlots quotes={shortTexts} />
        <GitHubLink />
      </TypingStatusProvider>
    </div>
  )
}
