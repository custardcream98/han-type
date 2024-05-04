"use client"

import { useTypingStatus } from "./TypingStatusProvider"

import { NumbersIcon } from "@/assets/images/NumbersIcon"
import clsx from "clsx"
import React, { useCallback } from "react"

type Options = {
  showRecord: boolean
}

const DEFAULT_OPTIONS: Options = {
  showRecord: true
}

type OptionsContextType = Options & {
  updateOptions: (options: Partial<Options>) => void
}

const OptionsContext = React.createContext<OptionsContextType | null>(null)

export const OptionsProvider = ({ children }: React.PropsWithChildren) => {
  const [options, setOptions] = React.useState<Options>(DEFAULT_OPTIONS)

  const updateOptions = useCallback((options: Partial<Options>) => {
    setOptions((prev) => ({ ...prev, ...options }))
  }, [])

  const value = React.useMemo(
    () => ({
      ...options,
      updateOptions
    }),
    [options, updateOptions]
  )

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  )
}

export const useOptions = () => {
  const value = React.useContext(OptionsContext)

  if (!value) {
    throw new Error("OptionsProvider is not found")
  }

  return value
}

export const OptionsSelector = () => {
  const { showRecord, updateOptions } = useOptions()
  const { isTyping } = useTypingStatus()

  return (
    <label
      className={clsx(
        "clickable block rounded-lg",
        !isTyping ? !showRecord && "opacity-20" : "opacity-0"
      )}
    >
      <input
        className='sr-only'
        type='checkbox'
        checked={showRecord}
        onChange={(event) => {
          updateOptions({ showRecord: event.target.checked })
        }}
      />
      <NumbersIcon className='h-5 w-5 md:h-6 md:w-6' />
      <span className='sr-only'>기록 보기</span>
    </label>
  )
}
