'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'

import { ItemsData } from '@/app/components/items-table'

export type FormData = {
  name: string
  email: string
  phoneNumber: string
  tax: string
  fromAddress: string
  toAddress: string
  invoiceNo: string
  termsOfPayment: string
  footnote1?: string
  footnote2?: string
  items: ItemsData[]
  performanceFrom: string
  performanceTo: string
  invoiceDate: string
  totalAmount?: number
  dueDate: string
}

export type FormContextType = {
  formData: FormData
  setFormData: (data: FormData) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const getInitialFormData = (): FormData => ({
  name: '',
  email: '',
  phoneNumber: '',
  tax: '',
  fromAddress: '',
  toAddress: '',
  invoiceNo: '',
  termsOfPayment: '',
  items: [{ name: '', description: '', quantity: 0, price: 0, totalAmount: 0, id: 1 }],
  totalAmount: undefined,
  performanceFrom: '',
  performanceTo: '',
  invoiceDate: '',
  dueDate: '',
})

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(getInitialFormData)

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>
}

export const useFormData = (): FormContextType => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider')
  }
  return context
}
