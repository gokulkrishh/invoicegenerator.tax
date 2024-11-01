'use client'

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import currencyData from '@/app/data/currency.json'

export type Currency = {
  symbol: string
  name_plural: string
  code: string
  symbol_native: string
  decimal_digits: number
  name: string
  rounding: number
}

type CurrencyContextType = {
  selectedCurrency: Currency
  onChangeHandler: (currency: string) => void
  data: { [key: string]: Currency }
}

const data = currencyData as { [key: string]: Currency }

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const defaultCurrency: Currency = currencyData.EUR

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrency)

  useEffect(() => {
    const localInvoiceData = localStorage.getItem('invoice-form-data')
    const localCurrencyCode = localStorage.getItem('invoice-currency')

    if (localInvoiceData && localCurrencyCode && data[localCurrencyCode]) {
      setSelectedCurrency(data[localCurrencyCode])
    }
  }, [setSelectedCurrency])

  const onChangeHandler = (code: Currency['code']) => {
    const currencyData = data[code]
    const localInvoiceData = localStorage.getItem('invoice-form-data')
    if (localInvoiceData) localStorage.setItem('invoice-currency', code)
    setSelectedCurrency(currencyData)
  }

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, data, onChangeHandler }}>{children}</CurrencyContext.Provider>
  )
}

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
