"use client"

import { useTypeStatus } from "./Status"
import { useToast } from "./Toast"
import { useTypingStatus } from "./TypingStatusProvider"

import { isWritingKoreanLetter } from "@/utils/isWritingKoreanLetter"
import clsx from "clsx"
import React, { useMemo, useState } from "react"

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
  const { setData } = useTypeStatus()

  const charList = useMemo(() => text.split(""), [text])

  const [typedValueList, setTypedValueList] = useState<string[]>([])

  const resolvedCharList = useMemo(() => {
    return charList.map((char, index) => {
      const typedChar = typedValueList[index]

      return {
        char,
        isCorrect: isWritingKoreanLetter({
          nextTypedValue: typedValueList[index + 1],
          nextValue: charList[index + 1],
          targetValue: char,
          value: typedChar ?? ""
        }),
        typedChar
      }
    })
  }, [typedValueList, charList])

  const { errorToast } = useToast()

  return (
    <div className='relative text-2xl leading-normal tracking-widest md:text-3xl md:leading-normal'>
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
          const value = event.target.value

          typing(true)

          if (ENGLISH_REGEX.test(value) && value !== "") {
            errorToast("한글을 입력해주세요.")
            return
          }

          const typedValueList = value.split("")

          setTypedValueList(typedValueList)

          setData({
            targetValue: text,
            typedValue: value
          })

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
