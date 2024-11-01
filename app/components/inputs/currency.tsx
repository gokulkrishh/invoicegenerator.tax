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
