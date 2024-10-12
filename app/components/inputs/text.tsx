'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/app/lib/utils'

type TextProps = {
  label?: string
  defaultValue?: string
  onChangeCallback?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Text({ className, defaultValue, label, onChangeCallback, ...props }: TextProps) {
  const [value, setValue] = useState<string>(defaultValue || '')

  useEffect(() => {
    setValue(defaultValue || '')
  }, [defaultValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    onChangeCallback?.(inputValue)
  }

  return (
    <label className="flex flex-col gap-2">
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        type="text"
        className={cn(
          'inline-flex rounded-lg border border-gray-300 p-2 text-sm text-black outline-none ring-gray-400 transition-all duration-200 ease-in-out focus:border-gray-300 focus:ring-2 focus:ring-offset-1 focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-950/5',
          className,
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}
