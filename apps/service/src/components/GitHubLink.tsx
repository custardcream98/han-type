"use client"

import { useTypingStatus } from "./TypingStatusProvider"

import { GitHubLogo } from "@/assets/images/GitHubLogo"
import clsx from "clsx"

export const GitHubLink = () => {
  const { isTyping } = useTypingStatus()

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://github.com/custardcream98/han-type'
      className={clsx(
        "absolute bottom-4 right-4 flex items-center gap-1 text-sm transition-opacity duration-700 md:text-lg",
        !isTyping ? "opacity-10" : "opacity-0"
      )}
    >
      <GitHubLogo
        className='h-5 w-5 fill-neutral-200 md:h-6 md:w-6'
        width={24}
        height={24}
      />
      <span>shiwoo.park</span>
    </a>
  )
}
