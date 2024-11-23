'use client'

import { useState } from 'react'

import Button from './button'
import { FormData } from './context/form'

export default function Clipboard({ data }: { data: FormData }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard
      .writeText(JSON.stringify(data, null, 2))
      .then(() => {
        setIsCopied(true)
      })
      .catch((err) => {
        console.error('Failed to copy data to clipboard', err)
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopied(false)
        }, 4000)
      })
  }

  return (
    <Button className="text-foreground" onClick={copyToClipboard} variant="secondary">
      {isCopied ? (
        <svg
          aria-hidden="true"
          className="text-foreground h-4! w-4!"
          viewBox="0 0 16 16"
          stroke="2"
          fill="currentColor"
        >
          <path d="M13.78 4.22a.75.75 0 0 1 1.06 1.06l-7 7a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06L7.25 10.94l6.53-6.72z"></path>
        </svg>
      ) : (
        <svg aria-hidden="true" className="text-foreground h-3.5! w-3.5!" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
      )}
      {isCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}
