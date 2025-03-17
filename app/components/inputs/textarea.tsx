'use client'
'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/app/lib/utils'

type TextAreaProps = {
  label?: string
  defaultValue?: string
  onChangeCallback?: (value: string) => void
} & React.InputHTMLAttributes<HTMLTextAreaElement>

export default function TextArea({ className, defaultValue, label, onChangeCallback, ...props }: TextAreaProps) {
  const [value, setValue] = useState<string>(defaultValue || '')

  useEffect(() => {
    setValue(defaultValue || '')
  }, [defaultValue])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    onChangeCallback?.(inputValue)
  }

  return (
    <label className="flex w-full flex-col gap-2">
      {label ? <span className="font-medium">{label}</span> : null}
      <textarea
        className={cn(
          'border-border text-foreground ring-ring ring-offset-background focus:border-border focus-visible:border-border disabled:bg-foreground/10 inline-flex rounded-lg border p-2 text-sm outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          className,
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}
