'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/app/lib/utils'

type DateProps = {
  className?: string
  label?: string
  defaultValue?: string
  onChangeCallback?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Date({ className, label, defaultValue, onChangeCallback, ...props }: DateProps) {
  const [value, setValue] = useState<string>(defaultValue ?? '')

  useEffect(() => {
    if (defaultValue) setValue(defaultValue ?? '')
  }, [defaultValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    onChangeCallback?.(inputValue)
  }

  return (
    <label className="flex flex-col gap-1.5">
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        className={cn(
          'custom-date rounded-lg border border-gray-300 p-2 text-sm text-black outline-none ring-gray-400 transition-all duration-200 ease-in-out focus:border-gray-300 focus:ring-2 focus:ring-offset-1 focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-950/5',
          className,
        )}
        pattern="\d{2}/\d{2}/\d{4}"
        type="date"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}
