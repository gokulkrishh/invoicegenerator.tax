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
          'inline-flex rounded-lg border border-border p-2 text-sm tabular-nums text-foreground outline-none ring-ring ring-offset-background transition-all duration-200 ease-in-out focus:border-border focus:ring-2 focus:ring-offset-2 focus-visible:border-border focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-foreground/10',
          className,
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}
