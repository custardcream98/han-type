import { RetryIcon } from "@/assets/images/RetryIcon"
import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"

export const ResetButton = ({
  show,
  className,
  disabled = false,
  onReset
}: {
  show: boolean
  className?: string
  disabled?: boolean
  onReset: () => void
}) => {
  const [isEscTyped, setIsEscTyped] = useState(false)

  const reset = useCallback(() => {
    setIsEscTyped(true)
    onReset()

    window.setTimeout(() => {
      setIsEscTyped(false)
    }, 300)
  }, [onReset])

  useEffect(() => {
    if (disabled) return

    const handleReset = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        reset()
      }
    }

    window.addEventListener("keydown", handleReset)

    return () => {
      window.removeEventListener("keydown", handleReset)
    }
  }, [disabled, reset])

  return (
    <button
      type='button'
      disabled={disabled}
      className={clsx(
        "clickable font-code text-sm md:text-base",
        className,
        (!show || isEscTyped) && "scale-0 opacity-0"
      )}
      onClick={reset}
    >
      <span className='flex items-center gap-2 transition-opacity'>
        <RetryIcon className='h-3 w-3' />
        <span>esc</span>
        <span className='sr-only'>다시 시작하기</span>
      </span>
    </button>
  )
}
