import { disassemble } from "hangul-js"

export const isWritingKoreanLetter = ({
  targetValue,
  value,
  nextValue,
  nextTypedValue
}: {
  targetValue: string
  value?: string
  nextValue?: string
  nextTypedValue?: string
}) => {
  if (typeof value === "undefined" || value === targetValue) {
    return true
  }

  const target자소 = disassemble(targetValue)
  const 자소 = disassemble(value)

  if (자소.length > target자소.length) {
    if (nextValue === undefined) {
      return false
    }

    const next자소 = disassemble(nextValue)

    if (nextTypedValue) {
      const nextTyped자소 = disassemble(nextTypedValue)

      return [...자소, ...nextTyped자소].every((letter, index) => {
        return (
          letter === target자소[index] ||
          letter === next자소[index - target자소.length]
        )
      })
    }

    return 자소.every((letter, index) => {
      return (
        letter === target자소[index] ||
        letter === next자소[index - target자소.length]
      )
    })
  }

  return 자소.every((letter, index) => {
    return letter === target자소[index]
  })
}
