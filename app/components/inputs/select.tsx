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
          'custom-select inline-flex rounded-lg border border-border bg-background p-2 text-sm text-foreground outline-none ring-ring ring-offset-background transition-all duration-200 ease-in-out focus:border-border focus:ring-2 focus:ring-offset-2 focus-visible:border-border focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-foreground/10',
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
