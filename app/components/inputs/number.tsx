'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/app/lib/utils'

type NumberProps = {
  label?: string
  defaultValue?: number
  onChangeCallback?: (value: number) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Number({ className, defaultValue, label, onChangeCallback, ...props }: NumberProps) {
  const [value, setValue] = useState<number>()

  useEffect(() => {
    if (defaultValue) setValue(defaultValue)
  }, [defaultValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const numericValue = parseFloat(inputValue)
    setValue(numericValue)
    onChangeCallback?.(numericValue)
  }

  return (
    <label className="flex flex-col gap-1.5">
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        type="number"
        className={cn(
          'border-border text-foreground ring-ring ring-offset-background focus:border-border focus-visible:border-border disabled:bg-foreground/10 inline-flex rounded-lg border p-2 text-sm tabular-nums outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          className,
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}
