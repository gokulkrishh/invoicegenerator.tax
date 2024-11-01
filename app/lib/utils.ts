import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatDateForInput(dateString: string) {
  const [day, month, year] = dateString.split('/')
  return `${year}-${month}-${day}`
}

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
