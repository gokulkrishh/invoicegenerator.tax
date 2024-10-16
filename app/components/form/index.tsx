'use client'

import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'

import { toast } from 'sonner'

import Button from '@/app/components/button'
import ClipboardButton from '@/app/components/clipboard'
import { useCurrency } from '@/app/components/context/currency'
import { FormData, getInitialFormData, useFormData } from '@/app/components/context/form'
import { formatCurrency } from '@/app/components/inputs/currency'
import DateInput from '@/app/components/inputs/date'
import Switch from '@/app/components/inputs/switch'
import Text from '@/app/components/inputs/text'
import TextArea from '@/app/components/inputs/textarea'
import ItemsTable, { ItemsData } from '@/app/components/items-table'
import Loader from '@/app/components/loader'
import Preview from '@/app/components/preview'

import { formatDate, formatDateForInput } from '@/app/lib/utils'

const IGNORE_FIELDS: (keyof FormData)[] = []

export default function Form() {
  const { formData, setFormData } = useFormData()
  const [devMode, setDevMode] = useState<boolean>(false)
  const [savedToLocal, setSavedToLocal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [formLoading, setFormLoading] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { selectedCurrency } = useCurrency()
  const previewData = formData

  useEffect(() => {
    const localInvoiceData = localStorage.getItem('invoice-form-data')
    if (localInvoiceData) {
      setFormData(JSON.parse(localInvoiceData) as FormData)
    }
    setSavedToLocal(!!localInvoiceData)
    setLoading(false)
  }, [setFormData])

  const totalItemsAmount = formatCurrency(
    parseFloat(formData.items?.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0).toString()),
    'en',
    selectedCurrency.code,
  )

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setFormLoading(true)
      toast.success('Downloading pdf, please wait!', { duration: 3000 })
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: JSON.stringify({ formData, totalItemsAmount }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="?(.+)"?/)
      const filename = filenameMatch ? filenameMatch?.[1] : `invoice_${formData.invoiceNo}.pdf`

      const blob = await response.blob()
      // Create an object URL for the Blob
      const url = URL.createObjectURL(blob)

      // Create a link element and trigger the download
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Release the object URL
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('Error occurred', { duration: 3000 })
      console.error('Error generating PDF:', error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleSaveToLocal = (enabled: boolean, data: FormData = formData) => {
    if (enabled) {
      const filteredData: Partial<FormData> = { ...data }
      const initialData = getInitialFormData()
      IGNORE_FIELDS.forEach((field) => {
        filteredData[field] = initialData[field] as never
      })
      localStorage.setItem('invoice-form-data', JSON.stringify(filteredData))
    } else {
      localStorage.removeItem('invoice-form-data')
    }
    setSavedToLocal(enabled)
  }

  const onChangeHandler = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    const updatedFormData = { ...formData, [key]: value }
    setFormData(updatedFormData)
    const isSaveToLocalEnabled = !!localStorage.getItem('invoice-form-data')
    handleSaveToLocal(isSaveToLocalEnabled, updatedFormData)
  }

  return (
    <>
      <div className="mt-5 flex h-fit w-full flex-col justify-between gap-3 md:flex-row print:hidden">
        <p className="text-sm font-medium">
          {!loading ? (
            <>
              Your data is{' '}
              {savedToLocal ? (
                <span>
                  saved in{' '}
                  <Link
                    className="underline"
                    target="_blank"
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                  >
                    localStorage
                  </Link>
                </span>
              ) : (
                'not saved anywhere!'
              )}
            </>
          ) : null}
        </p>
        <div className="mb-2 flex gap-4 max-sm:justify-between">
          <Switch defaultValue={savedToLocal} label="Save to localStorage" onChangeCallback={handleSaveToLocal} />
          <Switch label="Developer Mode" onChangeCallback={setDevMode} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2.5 overflow-auto rounded-lg border border-gray-300 p-4 px-4 print:hidden">
        <form ref={formRef} onSubmit={onSubmitHandler} className="w-[820px] lg:w-full">
          <div className="flex w-full justify-between">
            <div className="flex w-full max-w-md flex-col gap-3">
              <Text
                className="max-w-md"
                label="Full Name"
                placeholder="Tim Cook"
                id="full-name"
                name="full-name"
                onChangeCallback={(value: string) => {
                  onChangeHandler('name', value)
                }}
                defaultValue={formData.name}
                required
              />
            </div>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <Text
                onChangeCallback={(value: string) => {
                  onChangeHandler('invoiceNo', value)
                }}
                id="invoice-number"
                name="invoice-number"
                label="Invoice Number"
                className="max-w-xs"
                placeholder="NAME_001"
                required
                defaultValue={formData.invoiceNo}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <div className="flex w-full max-w-md flex-col gap-3">
              <TextArea
                onChangeCallback={(value: string) => {
                  onChangeHandler('fromAddress', value)
                }}
                id="from-address"
                name="from-address"
                className="h-32 w-full"
                label="From Address"
                placeholder="4 Privet Drive, Chennai, Tamil Nadu 600001"
                required
                defaultValue={formData.fromAddress}
              />
              <TextArea
                onChangeCallback={(value: string) => {
                  onChangeHandler('toAddress', value)
                }}
                id="to-address"
                name="to-address"
                className="h-40 w-full"
                label="To Address"
                placeholder="1 Privet Drive, Chennai, Tamil Nadu 600001"
                required
                defaultValue={formData.toAddress}
              />
            </div>

            <div className="flex w-full max-w-xs flex-col gap-3">
              <Text
                onChangeCallback={(value: string) => {
                  onChangeHandler('email', value)
                }}
                id="email-address"
                name="email-address"
                className="w-full"
                type="email"
                label="Email Address"
                placeholder="tim@apple.com"
                required
                defaultValue={formData.email}
              />
              <Text
                onChangeCallback={(value: string) => {
                  onChangeHandler('phoneNumber', value)
                }}
                id="phone-number"
                name="phone-number"
                className="w-full"
                label="Phone Number"
                placeholder="+91 1234567890"
                required
                defaultValue={formData.phoneNumber}
              />
              <Text
                onChangeCallback={(value: string) => {
                  onChangeHandler('tax', value)
                }}
                id="gst-in"
                name="gst-in"
                className="w-full"
                label="Tax/GSTIN"
                placeholder="123DK123"
                required
                defaultValue={formData.tax}
              />
              <div className="inline-flex w-full max-w-xs justify-between">
                <DateInput
                  onChangeCallback={(value: string) => {
                    onChangeHandler('performanceFrom', formatDate(value))
                  }}
                  id="performance-from"
                  name="performance-from"
                  className="w-[140px]"
                  label="Performance From"
                  required
                  defaultValue={formatDateForInput(formData.performanceFrom)}
                />
                <DateInput
                  onChangeCallback={(value: string) => {
                    onChangeHandler('performanceTo', formatDate(value))
                  }}
                  id="performance-to"
                  name="performance-to"
                  className="w-[140px]"
                  label="Performance To"
                  required
                  defaultValue={formatDateForInput(formData.performanceTo)}
                />
              </div>
              <div className="inline-flex w-full max-w-xs justify-between">
                <DateInput
                  className="w-[140px]"
                  onChangeCallback={(value: string) => {
                    onChangeHandler('dueDate', formatDate(value))
                  }}
                  id="due-date"
                  name="due-date"
                  label="Due Date"
                  required
                  defaultValue={formatDateForInput(formData.dueDate)}
                />
                <DateInput
                  className="w-[140px]"
                  onChangeCallback={(value: string) => {
                    onChangeHandler('invoiceDate', formatDate(value))
                  }}
                  id="invoice-date"
                  name="invoice-date"
                  label="Invoice Date"
                  required
                  defaultValue={formatDateForInput(formData.invoiceDate)}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex w-full flex-col">
            <ItemsTable
              defaultValue={formData.items}
              onChangeCallback={(items: ItemsData[]) => {
                onChangeHandler('items', items)
              }}
            />

            <h2 className="mb-5 mt-2 w-full pr-6 text-right text-lg font-semibold tracking-tight">
              Total Items Amount: <span className="tabular-nums">{totalItemsAmount}</span>
            </h2>
          </div>

          <div className="flex w-full">
            <TextArea
              onChangeCallback={(value: string) => {
                onChangeHandler('termsOfPayment', value)
              }}
              className="h-36 max-w-md"
              label="Terms of Payment"
              placeholder={`Account Owner Name: Gokulakrishnan Kalaikovan
Account Number: 40123123012312
IFSC Code: SBININBBXXX
MICR Code: 400002003
Swift Code: 123456789012
Bank Name: State Bank of India`}
              required
              defaultValue={formData.termsOfPayment}
            />
          </div>

          <div className="mt-20 flex w-full justify-between gap-10">
            <TextArea
              onChangeCallback={(value: string) => {
                onChangeHandler('footnote1', value)
              }}
              className="h-36 w-full"
              label="Footnote 1 (optional)"
              placeholder=""
              defaultValue={formData.footnote1}
            />
            <TextArea
              onChangeCallback={(value: string) => {
                onChangeHandler('footnote2', value)
              }}
              className="h-36 w-full"
              label="Footnote 2 (optional)"
              placeholder=""
              defaultValue={formData.footnote2}
            />
          </div>

          <div className="mt-5 flex w-full justify-end">
            <Button disabled={formLoading} type="submit">
              {formLoading ? <Loader /> : null}
              Download as PDF
            </Button>
          </div>
        </form>
      </div>

      <div className="mb-5 mt-10 flex w-full flex-col overflow-auto">
        <div className="flex justify-between print:hidden">
          <h3 className="w-fit font-semibold">Preview:</h3>
          <p className="inline-flex items-center gap-1 text-sm">
            Press{' '}
            <kbd className="rounded-md border border-gray-300 p-0.5 px-1 font-mono font-medium text-black">cmd + p</kbd>{' '}
            to print or save it!
          </p>
        </div>
        <Preview formData={previewData} totalItemsAmount={totalItemsAmount} />
      </div>

      {devMode ? (
        <div className="mt-5 flex w-full flex-col print:hidden">
          <div className="flex justify-between">
            <h4 className="w-fit font-semibold">Data:</h4>
            <div className="flex items-center gap-3">
              <ClipboardButton data={formData} />
            </div>
          </div>
          <pre className="mt-2 flex w-full min-w-full items-start justify-start text-left">
            <code className="relative flex w-full flex-col gap-2.5 overflow-auto text-wrap rounded-lg border border-gray-300 p-4 px-4 font-mono">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        </div>
      ) : null}
    </>
  )
}
