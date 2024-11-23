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
          'custom-date h-[36px] rounded-lg border border-border bg-background p-2 text-sm text-foreground outline-hidden ring-ring ring-offset-background transition-all duration-200 ease-in-out focus:border-border focus:ring-2 focus:ring-offset-2 focus-visible:border-border focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-foreground/10',
          className,
        )}
        type="date"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}
