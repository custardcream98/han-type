"use client"

import { useTypingStatus } from "./TypingStatusProvider"

import clsx from "clsx"
import { useEffect } from "react"

export const Title = () => {
  const { isTyping, forceTypeEnd, typing } = useTypingStatus()

  useEffect(() => {
    const handleTouch = () => {
      if (isTyping) {
        forceTypeEnd()
      } else {
        typing()
      }
    }

    window.addEventListener("touchstart", handleTouch)

    return () => {
      window.removeEventListener("touchstart", handleTouch)
    }
  }, [forceTypeEnd, typing, isTyping])

  return (
    <h1
      className={clsx(
        "text-2xl font-bold tracking-widest transition-opacity duration-700 md:text-4xl",
        !isTyping ? "opacity-100" : "opacity-0"
      )}
    >
      한,타자
    </h1>
  )
}
