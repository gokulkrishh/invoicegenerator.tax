'use client'

import { useEffect, useState } from 'react'

type SwitchProps = { label?: string; defaultValue?: boolean; onChangeCallback: (value: boolean) => void }

export default function Switch({ label, defaultValue, onChangeCallback }: SwitchProps) {
  const [enabled, setEnabled] = useState(defaultValue ?? false)

  useEffect(() => {
    setEnabled(defaultValue ?? false)
  }, [defaultValue])

  return (
    <div className="relative flex h-full items-center justify-between gap-2">
      {label ? (
        <label htmlFor={label} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <div className="relative inline-flex cursor-pointer items-center">
        <input id={label} tabIndex={-1} type="checkbox" className="peer sr-only" checked={enabled} readOnly />
        <button
          aria-label={enabled ? 'Disable' : 'Enable'}
          onClick={() => {
            setEnabled(!enabled)
            onChangeCallback?.(!enabled)
          }}
          className="peer h-5 w-9 rounded-full bg-foreground/10 outline-hidden ring-ring ring-offset-background transition-all duration-200 ease-in-out after:absolute after:left-[1px] after:top-[0.5px] after:h-[18.5px] after:w-[18.5px] after:rounded-full after:border after:border-border after:bg-white after:transition-all after:content-[''] focus:border-border focus:ring-2 focus:ring-offset-2 focus-visible:border-border focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-foreground/10 peer-checked:border-border peer-checked:bg-green-600 peer-checked:after:left-[-2px] peer-checked:after:translate-x-full peer-checked:after:border-green-700 peer-focus:ring-green-300"
        />
      </div>
    </div>
  )
}
