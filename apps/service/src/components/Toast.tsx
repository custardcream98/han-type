"use client"
import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"

const TOAST_DEFAULT_DURATION = 3000
const TOAST_ANIMATION_DURATION = 150

const ToastContext = React.createContext<{
  errorToast: (message: string) => void
}>({
  errorToast: () => null
})

export const ToastRoot = ({ children }: React.PropsWithChildren) => {
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>("")

  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = timerRef.current

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
        timerRef.current = null
      }
    }
  }, [])

  const errorToast = (message: React.ReactNode) => {
    if (timerRef.current !== null) {
      return
    }

    setErrorMessage(message)

    timerRef.current = window.setTimeout(() => {
      setErrorMessage("")
      timerRef.current = null
    }, TOAST_DEFAULT_DURATION + TOAST_ANIMATION_DURATION)
  }

  return (
    <ToastContext.Provider value={{ errorToast }}>
      {children}
      <article id='toast'>
        <ErrorToast message={errorMessage} />
      </article>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return React.useContext(ToastContext)
}

export const ErrorToast = ({ message }: { message: React.ReactNode }) => {
  const [animateClassName, setAnimateClassName] = useState("translate-y-20")

  useEffect(() => {
    if (!message) {
      setAnimateClassName("translate-y-20")
      return
    }

    setAnimateClassName("translate-y-0")

    const timer = window.setTimeout(() => {
      setAnimateClassName("translate-y-20")
    }, TOAST_DEFAULT_DURATION)

    return () => {
      clearTimeout(timer)
    }
  }, [message])

  return (
    <div
      className={clsx(
        "fixed bottom-10 left-0 right-0 flex justify-center transition-transform",
        animateClassName
      )}
    >
      <div className='flex items-center gap-4 rounded-lg bg-red-200 px-4 py-2 text-red-900 shadow-md'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-sm'>
          !
        </div>
        <div className='text-lg'>{message}</div>
      </div>
    </div>
  )
}
