import { ResetButton } from "./ResetButton"
import { useTotalRecord } from "./TotalRecordProvider"
import { useTypingStatus } from "./TypingStatusProvider"

import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useIsMounted } from "@/hooks/useIsMounted"
import clsx from "clsx"
import { useCallback, useMemo, useState } from "react"

export const Result = ({ onRetry }: { onRetry: () => void }) => {
  const isMounted = useIsMounted()
  const debouncedMount = useDebouncedValue(isMounted, 100)
  const showRetryButton = useDebouncedValue(debouncedMount, 2000)

  const [isRetryClicked, setIsRetryClicked] = useState(false)

  const { accuracies, wordsPerMinutes, resetRecord } = useTotalRecord()

  const { typing } = useTypingStatus()

  const handleRetry = useCallback(() => {
    setIsRetryClicked(true)
    typing()

    setTimeout(() => {
      resetRecord()
      onRetry()
    }, 700)
  }, [onRetry, resetRecord, typing])

  const result = useMemo(
    () => ({
      accuracy: (
        (accuracies.reduce((acc, curr) => acc + curr, 0) / accuracies.length) *
        100
      ).toFixed(2),
      wordsPerMinute: (
        wordsPerMinutes.reduce((acc, curr) => acc + curr, 0) /
        wordsPerMinutes.length
      ).toFixed(2)
    }),
    [accuracies, wordsPerMinutes]
  )

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 top-0 flex content-center items-center px-8 transition-all duration-700",
        debouncedMount ? "opacity-100" : "opacity-0"
      )}
      {...(isRetryClicked && {
        style: {
          transform: "translateY(-100vh)"
        }
      })}
    >
      <div className='mx-auto w-full max-w-4xl text-lg md:text-2xl'>
        <div className='mb-4 flex w-full flex-col gap-1 md:flex-row md:gap-0'>
          <strong>정확도</strong>
          <span className='md:ml-auto'>{result.accuracy} %</span>
        </div>
        <div className='flex w-full flex-col gap-1 md:flex-row md:gap-0'>
          <strong>분당 단어 수</strong>
          <span className='md:ml-auto'>{result.wordsPerMinute} 개 / 분</span>
        </div>

        <ResetButton
          className='ml-auto block'
          show={showRetryButton}
          onReset={handleRetry}
        />
      </div>
    </div>
  )
}
