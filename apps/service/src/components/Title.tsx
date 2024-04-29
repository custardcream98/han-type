"use client"

import clsx from "clsx"
import React, { useEffect, useMemo, useRef, useState } from "react"

const TypingStatusContext = React.createContext<{
  isTyping: boolean
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isTyping: false,
  setIsTyping: () => null
})

export const TypingStatusProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
    },
    []
  )

  const value = useMemo(
    () => ({
      isTyping,
      setIsTyping: () => {
        setIsTyping(true)

        if (timerRef.current !== null) {
          clearTimeout(timerRef.current)
        }

        timerRef.current = window.setTimeout(() => {
          setIsTyping(false)
        }, 4000)
      }
    }),
    [isTyping, setIsTyping]
  )

  return (
    <TypingStatusContext.Provider value={value}>
      {children}
    </TypingStatusContext.Provider>
  )
}

export const useTypingStatus = () => {
  const { isTyping, setIsTyping } = React.useContext(TypingStatusContext)

  return { isTyping, setIsTyping }
}

export const Title = () => {
  const { isTyping } = useTypingStatus()

  return (
    <h1
      className={clsx(
        "text-4xl font-bold tracking-widest transition-opacity duration-700",
        !isTyping ? "opacity-100" : "opacity-0"
      )}
    >
      한,타자
    </h1>
  )
}
