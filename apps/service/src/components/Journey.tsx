"use client"

import { Result } from "./Result"
import { TypeSlots } from "./TypeSlots"

import { useState } from "react"

const Step = {
  결과: 1,
  타이핑: 0
} as const

type Step = (typeof Step)[keyof typeof Step]

export const Journey = ({
  quotes,
  isMacOS
}: {
  quotes: string[]
  isMacOS: boolean
}) => {
  const [step, setStep] = useState<Step>(Step.타이핑)

  return (
    <>
      {step === Step.타이핑 && (
        <TypeSlots
          isMacOS={isMacOS}
          quotes={quotes}
          onComplete={() => setStep(Step.결과)}
        />
      )}
      {step === Step.결과 && <Result onRetry={() => setStep(Step.타이핑)} />}
    </>
  )
}
