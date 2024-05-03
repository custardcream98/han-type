"use client"

import { useRecord } from "./Record"
import { useToast } from "./Toast"
import { useTypingStatus } from "./TypingStatusProvider"

import { RetryIcon } from "@/assets/images/RetryIcon"
import clsx from "clsx"
import React, { useRef, useState } from "react"

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
  const innerRef = useRef<HTMLTextAreaElement>()

  const { isTyping, typing } = useTypingStatus()
  const { updateRecord, resolvedCharList, resetRecord } = useRecord()

  const [typedValue, setTypedValue] = useState<string>("")

  const reset = () => {
    setTypedValue("")
    updateRecord("")
    resetRecord()

    const textareaElement = innerRef.current

    if (textareaElement) {
      textareaElement.focus()
    }
  }

  const { errorToast } = useToast()

  return (
    <div className='relative text-xl leading-normal tracking-widest sm:text-2xl md:text-3xl md:leading-normal'>
      <textarea
        ref={(element) => {
          if (element) {
            innerRef.current = element

            if (typeof ref === "function") {
              ref(element)
            }
          }
        }}
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

      <button
        type='button'
        className={clsx(
          "clickable absolute right-0 mt-8 block rounded-full hover:-rotate-[210deg] md:mt-4",
          isTyping ? "opacity-100" : "opacity-50"
        )}
        onClick={reset}
      >
        <RetryIcon className='h-4 w-4 md:h-6 md:w-6' />
        <span className='sr-only'>다시 시작하기</span>
      </button>
    </div>
  )
})
