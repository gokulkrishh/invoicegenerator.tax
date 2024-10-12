'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/app/lib/utils'

import { useCurrency } from '../context/currency'

type CurrencyProps = {
  label?: string
  defaultValue?: number
  onChangeCallback: (value: number | undefined) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const getCurrencySymbol = (locale: string, currency: string) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency })
    .format(0)
    .replace(/0/g, '')
    .replace(/\.\s*$/, '')
    .trim()
}

export function formatCurrency(value: number, locale: string, currency: string): string {
  const formattedValue = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)

  // Insert a space between the currency symbol and the number
  const parts = formattedValue.match(/(\D*)(\d.*)/)
  if (parts) {
    return `${parts[1].trim()} ${parts[2]}`
  }

  return formattedValue
}

export default function Currency({ className, defaultValue, onChangeCallback, label, ...props }: CurrencyProps) {
  const [value, setValue] = useState<number | undefined>(defaultValue || undefined)
  const [symbol, setSymbol] = useState<string>(' ')
  const { selectedCurrency } = useCurrency()
  const locale = 'en'
  const currency = selectedCurrency.code

  useEffect(() => {
    setSymbol(getCurrencySymbol(locale, currency))
  }, [currency, locale])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value)
    setValue(inputValue)
    onChangeCallback?.(inputValue)
  }

  return (
    <label className="flex flex-col gap-1.5">
      {label ? <span className="font-medium">{label}</span> : null}
      <div className="flex items-center">
        <span className="text-medium min-w-4 tabular-nums">{symbol}</span>
        <input
          type="number"
          className={cn(
            'inline-flex rounded-lg border border-gray-300 p-2 text-sm tabular-nums text-black outline-none ring-gray-400 transition-all duration-200 ease-in-out focus:border-gray-300 focus:ring-2 focus:ring-offset-1 focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-950/5',
            className,
          )}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
    </label>
  )
}
