'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'

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

  const onChangeHandler = (code: Currency['code']) => {
    const currencyData = data[code]
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
