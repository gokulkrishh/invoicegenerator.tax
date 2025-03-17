'use client'

import React, { useEffect } from 'react'

import { cn } from '@/app/lib/utils'

type SelectProps = {
  label?: string
  className?: string
  defaultSelected: string
  data: Record<string, { code: string; name: string }>
  onChangeCallback: (value: string) => void
}

export default function Select({ className, label, data, defaultSelected, onChangeCallback, ...props }: SelectProps) {
  const [selected, setSelected] = React.useState<string>(defaultSelected || '')

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeCallback?.(event.target.value)
    setSelected(event.target.value)
  }

  return (
    <label className="flex flex-col gap-2">
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        onChange={onChangeHandler}
        className={cn(
          'custom-select border-border bg-background text-foreground ring-ring ring-offset-background focus:border-border focus-visible:border-border disabled:bg-foreground/10 inline-flex rounded-lg border p-2 text-sm outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          className,
        )}
        value={selected}
        {...props}
      >
        {Object.values(data).map((datum: { code: string; name: string }) => (
          <option key={datum.code} value={datum.code}>
            {datum.code} - {datum.name}
          </option>
        ))}
      </select>
    </label>
  )
}
