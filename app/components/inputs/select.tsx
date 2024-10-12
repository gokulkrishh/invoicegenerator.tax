'use client'

import React from 'react'

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
          'custom-select inline-flex rounded-lg border border-gray-300 bg-white p-2 text-sm text-black outline-none ring-gray-400 transition-all duration-200 ease-in-out focus:border-gray-300 focus:ring-2 focus:ring-offset-1 focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-950/5',
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
