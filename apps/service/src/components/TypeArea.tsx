"use client"

import clsx from "clsx"
import React, { useMemo, useState } from "react"

export const TypeArea = React.forwardRef(function TypeAreaForward(
  {
    text,
    disabled,
    autoFocus,
    onComplete
  }: {
    text: string
    disabled?: boolean
    autoFocus?: boolean
    onComplete?: () => void
  },
  ref: React.Ref<HTMLTextAreaElement>
) {
  const charList = useMemo(() => text.split(""), [text])

  const [typedValueList, setTypedValueList] = useState<string[]>([])

  const resolvedCharList = useMemo(() => {
    return charList.map((char, index) => {
      const typedChar = typedValueList[index]

      return {
        char,
        isCorrect: typedChar === char,
        typedChar
      }
    })
  }, [typedValueList, charList])

  return (
    <div className='relative text-3xl leading-normal tracking-widest'>
      <textarea
        ref={ref}
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        spellCheck='false'
        autoFocus={autoFocus}
        className='absolute inset-0 resize-none overflow-hidden bg-transparent text-transparent caret-slate-300 selection:bg-orange-100 selection:bg-opacity-30 focus:border-none focus:outline-none'
        disabled={disabled}
        onChange={(event) => {
          const value = event.target.value

          const typedValueList = value.split("")

          setTypedValueList(typedValueList)

          if (typedValueList.length === charList.length) {
            onComplete?.()
          }
        }}
        value={typedValueList.join("")}
      />
      <p>
        {resolvedCharList.map(({ char, typedChar, isCorrect }, index) => (
          <span
            key={`${index}${char}`}
            className={clsx(
              typedChar
                ? isCorrect
                  ? "text-amber-100"
                  : "text-red-300"
                : "text-gray-600"
            )}
          >
            {typedChar ?? char}
          </span>
        ))}
      </p>
    </div>
  )
})
