"use client"

import { TypeArea } from "./TypeArea"

import { useEffect, useRef, useState } from "react"

export const TypeSlots = ({ quotes }: { quotes: string[] }) => {
  const typeAreaRefList = useRef<(HTMLTextAreaElement | null)[]>(
    new Array(quotes.length).fill(null)
  )
  const [focusedIndex, setFocusedIndex] = useState(0)

  const frameRef = useRef<number | null>(null)
  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    },
    []
  )

  const [translation, setTranslation] = useState(0)

  return (
    <div className='overflow-auto'>
      <div
        className='flex max-h-full flex-col gap-8 transition-transform'
        style={{
          transform: `translateY(${translation}px)`
        }}
      >
        {quotes.map((quote, index) => (
          <TypeArea
            key={`${quote}${index}`}
            ref={(element) => {
              typeAreaRefList.current[index] = element
            }}
            disabled={index !== focusedIndex}
            autoFocus={index === 0}
            onComplete={() => {
              const typeAreaElement = typeAreaRefList.current[index]

              if (!typeAreaElement) {
                return
              }

              const height = typeAreaElement.clientHeight

              setTranslation((prev) => prev - height - 32)

              const nextElement = typeAreaRefList.current[index + 1]

              if (nextElement) {
                setFocusedIndex((prev) => prev + 1)

                const focus = () => {
                  const isDisabled = nextElement.getAttribute("disabled")

                  if (!isDisabled) {
                    nextElement.focus()
                    return
                  }

                  frameRef.current = requestAnimationFrame(focus)
                }

                frameRef.current = requestAnimationFrame(focus)
              }
            }}
            text={quote}
          />
        ))}
      </div>
    </div>
  )
}
