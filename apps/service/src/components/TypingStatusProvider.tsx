"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

const TypingStatusContext = React.createContext<{
  isTyping: boolean
  typing: () => void
} | null>(null)

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
      typing: () => {
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
  const value = React.useContext(TypingStatusContext)

  if (!value) {
    throw new Error("TypingStatusProvider is not found")
  }

  return value
}
