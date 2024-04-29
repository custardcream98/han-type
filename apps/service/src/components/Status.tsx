import React, { useEffect, useRef } from "react"

const StatusContext = React.createContext<{
  wordsPerMinute: number
  accuracy: number
  setData: ({
    targetValue,
    typedValue
  }: {
    targetValue: string
    typedValue: string
  }) => void
}>({
  accuracy: 0,
  setData: () => null,
  wordsPerMinute: 0
})

export const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [wordsPerMinute, setWordsPerMinute] = React.useState(0)
  const [accuracy, setAccuracy] = React.useState(0)

  const [currentWords, setCurrentWords] = React.useState<string[]>([])

  const [isEnded, setIsEnded] = React.useState(false)

  const startedTimeRef = useRef<number | null>(null)

  const setData = (data: { targetValue: string; typedValue: string }) => {
    const startedTime = (startedTimeRef.current =
      startedTimeRef.current ?? Date.now())

    const totalTime = Date.now() - startedTime

    const newCurrentWords = data.typedValue.split(" ")
    setCurrentWords(newCurrentWords)

    const wordsPerMinute = newCurrentWords.length / (totalTime / 1000 / 60)
    setWordsPerMinute(wordsPerMinute)

    const accuracyTarget = data.targetValue.slice(0, data.typedValue.length)

    const accuracy =
      accuracyTarget
        .split("")
        .filter((char, index) => char === data.typedValue[index]).length /
      accuracyTarget.length
    setAccuracy(accuracy)

    if (data.targetValue.length === data.typedValue.length) {
      setIsEnded(true)
    }
  }

  useEffect(() => {
    const startTime = startedTimeRef.current

    if (isEnded || !startTime) {
      return
    }

    const interval = setInterval(() => {
      const totalTime = Date.now() - startTime

      const wordsPerMinute = currentWords.length / (totalTime / 1000 / 60)
      setWordsPerMinute(wordsPerMinute)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [currentWords.length, isEnded])

  return (
    <StatusContext.Provider value={{ accuracy, setData, wordsPerMinute }}>
      {children}
    </StatusContext.Provider>
  )
}

export const useTypeStatus = () => {
  return React.useContext(StatusContext)
}

export const Status = () => {
  const { wordsPerMinute, accuracy } = useTypeStatus()

  return (
    <p className='text-amber-50 opacity-20'>
      {wordsPerMinute.toFixed(2)} / {(accuracy * 100).toFixed(2)}%
    </p>
  )
}
