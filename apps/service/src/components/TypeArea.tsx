"use client"

import { useRecord } from "./Record"
import { useToast } from "./Toast"
import { useTypingStatus } from "./TypingStatusProvider"

import clsx from "clsx"
import React, { useState } from "react"

const ENGLISH_REGEX = /[a-zA-Z]/

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
  const { typing } = useTypingStatus()
  const { updateRecord, resolvedCharList } = useRecord()

  const [typedValue, setTypedValue] = useState<string>("")

  const { errorToast } = useToast()

  return (
    <div className='relative text-xl leading-normal tracking-widest sm:text-2xl md:text-3xl md:leading-normal'>
      <textarea
        ref={ref}
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        spellCheck='false'
        autoSave='off'
        autoFocus={autoFocus}
        className='absolute inset-0 resize-none overflow-hidden bg-transparent text-transparent caret-slate-300 selection:bg-orange-100 selection:bg-opacity-30 focus:border-none focus:outline-none'
        disabled={disabled}
        onChange={(event) => {
          const value = event.currentTarget.value

          typing()

          if (ENGLISH_REGEX.test(value) && value !== "") {
            errorToast("한글을 입력해주세요.")
            return
          }

          setTypedValue(value)
          updateRecord(value)

          if (value.length === text.length) {
            onComplete?.()
          }
        }}
        value={typedValue}
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
