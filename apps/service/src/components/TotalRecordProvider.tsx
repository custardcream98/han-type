"use client"

import React, { useMemo, useState } from "react"

export type TotalRecord = {
  wordsPerMinutes: number[]
  accuracies: number[]
}

type RecordUpdateHandlerParameter = {
  wordsPerMinute: number
  accuracy: number
}

const TotalRecordContext = React.createContext<
  | (TotalRecord & {
      updateTotalRecord: (params: RecordUpdateHandlerParameter) => void
      resetRecord: () => void
    })
  | null
>(null)

export const useTotalRecord = () => {
  const value = React.useContext(TotalRecordContext)

  if (!value) {
    throw new Error("TotalRecordProvider is not found")
  }

  return value
}

export const TotalRecordProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [data, setData] = useState<TotalRecord>({
    accuracies: [],
    wordsPerMinutes: []
  })

  const value = useMemo(
    () => ({
      ...data,
      resetRecord: () => {
        setData({
          accuracies: [],
          wordsPerMinutes: []
        })
      },
      updateTotalRecord: ({
        wordsPerMinute,
        accuracy
      }: RecordUpdateHandlerParameter) => {
        setData(({ accuracies, wordsPerMinutes }) => ({
          accuracies: [...accuracies, accuracy],
          wordsPerMinutes: [...wordsPerMinutes, wordsPerMinute]
        }))
      }
    }),
    [data]
  )

  return (
    <TotalRecordContext.Provider value={value}>
      {children}
    </TotalRecordContext.Provider>
  )
}
