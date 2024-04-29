"use client"

import { TypeArea } from "./TypeArea"

import { useEffect, useRef, useState } from "react"

export const TypeSlots = ({ quotes }: { quotes: string[] }) => {
  const typeAreaRefList = useRef<(HTMLTextAreaElement | null)[]>(
    new Array(quotes.length).fill(null)
  )
  const [focusedIndex, setFocusedIndex] = useState(0)
  useEffect(() => {
    const elementToFocus = typeAreaRefList.current[focusedIndex]

    if (elementToFocus) {
      elementToFocus.focus()
    }
  }, [focusedIndex])

  useEffect(() => {
    let frame: number
    const focusFirstElement = () => {
      const firstElement = typeAreaRefList.current[0]

      if (firstElement) {
        firstElement.focus()
        cancelAnimationFrame(frame)
        return
      }

      frame = requestAnimationFrame(focusFirstElement)
    }

    requestAnimationFrame(focusFirstElement)
  }, [])

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
            key={quote}
            ref={(element) => {
              typeAreaRefList.current[index] = element
            }}
            disabled={index !== focusedIndex}
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
              }
            }}
            text={quote}
          />
        ))}
      </div>
    </div>
  )
}
