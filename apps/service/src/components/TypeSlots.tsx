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
    <div className='max-h-screen overflow-hidden'>
      <div
        className='flex flex-col gap-[50vh] transition-transform'
        style={{
          transform: `translateY(calc(-${focusedIndex * 50}vh - ${translation}px))`
        }}
      >
        <div></div>
        {quotes.map((quote, index) => (
          <div
            key={`${quote}${index}`}
            className={index === 0 ? "-translate-y-1/2" : "-translate-y-full"}
          >
            <TypeArea
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

                setTranslation((prev) => prev + height)

                const nextElement = typeAreaRefList.current[index + 1]

                if (nextElement) {
                  setFocusedIndex((prev) => prev + 1)

                  setTimeout(() => {
                    const focus = () => {
                      const isDisabled = nextElement.getAttribute("disabled")

                      if (!isDisabled) {
                        nextElement.focus()
                        return
                      }

                      frameRef.current = requestAnimationFrame(focus)
                    }

                    frameRef.current = requestAnimationFrame(focus)
                  }, 150)
                }
              }}
              text={quote}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
