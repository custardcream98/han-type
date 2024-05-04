"use client"

import { useTypingStatus } from "./TypingStatusProvider"

import clsx from "clsx"

export const Title = () => {
  const { isTyping } = useTypingStatus()

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
