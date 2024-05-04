import { useRecord } from "./Record"
import { ResetButton } from "./ResetButton"
import { useToast } from "./Toast"
import { useTotalRecord } from "./TotalRecordProvider"
import { useTypingStatus } from "./TypingStatusProvider"

import clsx from "clsx"
import React, { useRef, useState } from "react"

const ENGLISH_REGEX = /[a-zA-Z]/

export const TypeArea = React.forwardRef(function TypeAreaForward(
  {
    text,
    disabled,
    autoFocus,
    isMacOS,
    onComplete
  }: {
    text: string
    disabled?: boolean
    autoFocus?: boolean
    isMacOS?: boolean
    onComplete?: () => void
  },
  ref: React.Ref<HTMLTextAreaElement>
) {
  const innerRef = useRef<HTMLTextAreaElement>()

  const { isTyping, typing } = useTypingStatus()
  const {
    updateRecord,
    resolvedCharList,
    resetRecord,
    wordsPerMinute,
    accuracy
  } = useRecord()

  const [typedValue, setTypedValue] = useState<string>("")

  const [isReadyToComplete, setIsReadyToComplete] = useState(false)

  const { updateTotalRecord } = useTotalRecord()

  const reset = () => {
    setTypedValue("")
    updateRecord("")
    resetRecord()
    setIsReadyToComplete(false)

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
          if (isReadyToComplete) {
            return
          }

          const value = event.currentTarget.value

          typing()

          if (ENGLISH_REGEX.test(value) && value !== "") {
            errorToast("한글을 입력해주세요.")
            return
          }

          setTypedValue(value)
          updateRecord(value)

          if (value.length === text.length) {
            setIsReadyToComplete(true)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && isReadyToComplete) {
            updateTotalRecord({
              accuracy,
              wordsPerMinute
            })
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

      <div className='absolute right-0 mt-8 flex items-center gap-4'>
        <ResetButton
          show={!!wordsPerMinute}
          disabled={!typedValue}
          dimIcon={isTyping}
          onReset={reset}
        />

        <div
          className={clsx(
            "transition-all duration-500 md:text-base",
            isReadyToComplete
              ? "max-w-28 opacity-100 md:max-w-24"
              : "max-w-0 opacity-0"
          )}
        >
          <button
            type='button'
            disabled={!isReadyToComplete}
            className='font-code clickable w-max text-sm tracking-wide md:text-base'
          >
            ⏎ {isMacOS ? "return" : "enter"}
          </button>
        </div>
      </div>
    </div>
  )
})
