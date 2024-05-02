"use client"

import { useTypingStatus } from "./TypingStatusProvider"

import { GitHubLogo } from "@/assets/images/GitHubLogo"
import clsx from "clsx"
import React from "react"

export const Title = () => {
  const { isTyping } = useTypingStatus()

  return (
    <h1
      className={clsx(
        "text-3xl font-bold tracking-widest transition-opacity duration-700 md:text-4xl",
        !isTyping ? "opacity-100" : "opacity-0"
      )}
    >
      한,타자
    </h1>
  )
}

export const GitHubLink = () => {
  const { isTyping } = useTypingStatus()

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://github.com/custardcream98/han-type'
      className={clsx(
        "absolute bottom-32 transition-opacity duration-700",
        !isTyping ? "opacity-70" : "opacity-0"
      )}
    >
      <GitHubLogo className='fill-neutral-200' width={25} height={25} />
      <span className='sr-only'>GitHub Link</span>
    </a>
  )
}
