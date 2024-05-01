"use client"

import { Record, RecordProvider } from "./Record"
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

  return quotes.map((quote, index) => (
    <div
      key={`${quote}${index}`}
      className='fixed bottom-0 left-0 right-0 top-0 flex content-center items-center px-8 transition-transform duration-700'
      style={{
        transform: `translateY(calc(${focusedIndex - index} * -100vh))`
      }}
    >
      <div className='mx-auto max-w-4xl'>
        <RecordProvider target={quote}>
          <Record target={quote} />
          <TypeArea
            ref={(element) => {
              typeAreaRefList.current[index] = element
            }}
            disabled={index !== focusedIndex}
            autoFocus={index === 0}
            onComplete={() => {
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
        </RecordProvider>
      </div>
    </div>
  ))
}
