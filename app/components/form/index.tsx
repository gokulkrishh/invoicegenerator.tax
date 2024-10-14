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
import Number from '@/app/components/inputs/number'
import Switch from '@/app/components/inputs/switch'
import Text from '@/app/components/inputs/text'
import TextArea from '@/app/components/inputs/textarea'
import ItemsTable, { ItemsData } from '@/app/components/items-table'
import Loader from '@/app/components/loader'
import Preview from '@/app/components/preview'

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
            <div className="mt-1 flex w-full max-w-xs flex-col gap-3">
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

          <div className="flex justify-between">
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
              <Number
                onChangeCallback={(value: number) => {
                  onChangeHandler('phoneNumber', value)
                }}
                id="phone-number"
                name="phone-number"
                className="w-full"
                type="tel"
                label="Phone Number"
                placeholder="1234567890"
                required
                defaultValue={formData.phoneNumber || undefined}
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
                    onChangeHandler('performanceFrom', value)
                  }}
                  id="performance-from"
                  name="performance-from"
                  className="w-full"
                  label="Performance From"
                  required
                  defaultValue={formData.performanceFrom}
                />
                <DateInput
                  onChangeCallback={(value: string) => {
                    onChangeHandler('performanceTo', value)
                  }}
                  id="performance-to"
                  name="performance-to"
                  className="w-full"
                  label="Performance To"
                  required
                  defaultValue={formData.performanceTo}
                />
              </div>
              <div className="inline-flex w-full max-w-xs justify-between">
                <DateInput
                  className="w-full"
                  onChangeCallback={(value: string) => {
                    onChangeHandler('dueDate', value)
                  }}
                  id="due-date"
                  name="due-date"
                  label="Due Date"
                  required
                  defaultValue={formData.dueDate}
                />
                <DateInput
                  className="w-full"
                  onChangeCallback={(value: string) => {
                    onChangeHandler('invoiceDate', value)
                  }}
                  id="invoice-date"
                  name="invoice-date"
                  label="Invoice Date"
                  required
                  defaultValue={formData.invoiceDate}
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

          <div className="mt-10 h-[1px] w-full bg-gray-300" />

          <div className="mt-2 flex w-full justify-between gap-10">
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
              {formLoading ? (
                <Loader />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={'text-white'} fill={'none'}>
                  <path
                    d="M8 22V17C8 15.8954 8.89543 15 10 15H14C15.1046 15 16 15.8954 16 17V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 7H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 20V4C3 2.89543 3.89543 2 5 2H14.2759C14.7438 2 15.1968 2.16403 15.5563 2.46356L20.2804 6.40031C20.7364 6.7803 21 7.34319 21 7.93675V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              Download PDF
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
