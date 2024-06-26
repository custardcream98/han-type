import { useOptions } from "./OptionsProvider"
import { useTypingStatus } from "./TypingStatusProvider"

import { ResolvedChar } from "@/types/char"
import { isWritingKoreanLetter } from "@/utils/isWritingKoreanLetter"
import clsx from "clsx"
import React, { useCallback, useEffect, useMemo, useRef } from "react"

const RecordContext = React.createContext<{
  wordsPerMinute: number
  accuracy: number
  typedCharsCount: number
  resolvedCharList: ResolvedChar[]
  updateRecord: (value: string) => void
  resetRecord: () => void
} | null>(null)

export const RecordProvider = ({
  target,
  children
}: {
  target: string
  children: React.ReactNode
}) => {
  const targetValueListRef = useRef(target.split(""))

  const [wordsPerMinute, setWordsPerMinute] = React.useState(0)
  const [accuracy, setAccuracy] = React.useState(0)

  const [currentWords, setCurrentWords] = React.useState<string[]>([])

  const [resolvedCharList, setResolvedCharList] = React.useState<
    ResolvedChar[]
  >(target.split("").map((char) => ({ char, isCorrect: false })))

  const [isEnded, setIsEnded] = React.useState(false)

  const startedTimeRef = useRef<number | null>(null)

  const updateRecord = useCallback((value: string) => {
    const startedTime = (startedTimeRef.current =
      startedTimeRef.current ?? Date.now())

    const totalTime = Date.now() - startedTime

    const newCurrentWords = value.split(" ")
    setCurrentWords(newCurrentWords)

    const newWordsPerMinute = newCurrentWords.length / (totalTime / 1000 / 60)
    setWordsPerMinute(newWordsPerMinute)

    const typedValueList = value.split("")
    const targetValueList = targetValueListRef.current
    const newResolvedCharList = targetValueList.map((char, index) => {
      const typedChar = typedValueList[index]

      return {
        char,
        isCorrect:
          !(typedChar && typedValueList[index + 1] && typedChar !== char) &&
          isWritingKoreanLetter({
            nextTypedValue: typedValueList[index + 1],
            nextValue: targetValueList[index + 1],
            targetValue: char,
            value: typedChar
          }),
        typedChar
      }
    })

    setResolvedCharList(newResolvedCharList)

    const newAccuracy =
      newResolvedCharList.filter(({ isCorrect }) => isCorrect).length /
      newResolvedCharList.length
    setAccuracy(newAccuracy)

    if (targetValueList.length === value.length) {
      setIsEnded(true)
    }
  }, [])

  useEffect(() => {
    const startTime = startedTimeRef.current

    if (isEnded || !startTime) {
      return
    }

    const interval = window.setInterval(() => {
      const totalTime = Date.now() - startTime

      const wordsPerMinute = currentWords.length / (totalTime / 1000 / 60)
      setWordsPerMinute(wordsPerMinute)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [currentWords.length, isEnded])

  const resetRecord = useCallback(() => {
    startedTimeRef.current = null

    setWordsPerMinute(0)
    setAccuracy(0)
    setCurrentWords([])
    setResolvedCharList(
      target.split("").map((char) => ({ char, isCorrect: false }))
    )
    setIsEnded(false)
  }, [target])

  const value = useMemo(
    () => ({
      accuracy,
      resetRecord,
      resolvedCharList,
      typedCharsCount: currentWords.join(" ").length,
      updateRecord,
      wordsPerMinute
    }),
    [
      accuracy,
      currentWords,
      resetRecord,
      resolvedCharList,
      updateRecord,
      wordsPerMinute
    ]
  )

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  )
}

export const useRecord = () => {
  const value = React.useContext(RecordContext)

  if (!value) {
    throw new Error("RecordProvider is not found")
  }

  return value
}

export const Record = ({ target }: { target: string }) => {
  const { showRecord } = useOptions()
  const { isTyping } = useTypingStatus()
  const { wordsPerMinute, accuracy, typedCharsCount } = useRecord()

  const data = [
    wordsPerMinute.toFixed(2),
    `${(accuracy * 100).toFixed(2)}%`,
    `${typedCharsCount}/${target.length}`
  ]

  return (
    <p
      className={clsx(
        "text-amber-50 transition-opacity duration-700",
        isTyping && showRecord ? "opacity-20" : "opacity-0"
      )}
    >
      {data.map((children) => (
        <span key={children} className='inline-block w-20'>
          {children}
        </span>
      ))}
    </p>
  )
}
