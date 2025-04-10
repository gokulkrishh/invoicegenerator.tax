'use client'

import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'

import { toast } from 'sonner'

import Button from '@/app/components/button'
import ClipboardButton from '@/app/components/clipboard'
import { useCurrency } from '@/app/components/context/currency'
import { FormData, getInitialFormData, useFormData } from '@/app/components/context/form'
import DateInput from '@/app/components/inputs/date'
import Switch from '@/app/components/inputs/switch'
import Text from '@/app/components/inputs/text'
import TextArea from '@/app/components/inputs/textarea'
import ItemsTable, { ItemsData } from '@/app/components/items-table'
import Loader from '@/app/components/loader'
import Preview from '@/app/components/preview'

import { formatCurrency, formatDate, formatDateForInput } from '@/app/lib/utils'

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
    const localDevMode = localStorage.getItem('invoice-dev-mode')
    if (localInvoiceData) {
      setFormData(JSON.parse(localInvoiceData) as FormData)
    }
    if (localInvoiceData && localDevMode) {
      setDevMode(JSON.parse(localDevMode) as boolean)
    }
    setSavedToLocal(!!localInvoiceData)
    setLoading(false)
  }, [setFormData])

  const onChangeDevMode = () => {
    setDevMode(!devMode)
    const localInvoiceData = localStorage.getItem('invoice-form-data')
    if (localInvoiceData) {
      localStorage.setItem('invoice-dev-mode', JSON.stringify(!devMode))
    }
  }

  const totalItemsAmount = formatCurrency(
    parseFloat(formData.items?.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0).toString()),
    'en',
    selectedCurrency.code,
  )

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setFormLoading(true)
      toast.success('Downloading now, please wait a moment.', { duration: 5000, className: 'rounded-lg' })
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: JSON.stringify({ formData, totalItemsAmount, currencyCode: selectedCurrency.code }),
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
      toast.error('Error occurred, please try again.', { duration: 4000, className: 'rounded-lg' })
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
                    className="ring-ring ring-offset-background rounded-xs underline underline-offset-2 outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
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
          <Switch defaultValue={devMode} label="Developer Mode" onChangeCallback={onChangeDevMode} />
        </div>
      </div>
      <div className="border-border flex w-full flex-col gap-2.5 overflow-auto rounded-lg border p-4 px-4 print:hidden">
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

            <h2 className="mt-2 mb-5 w-full pr-6 text-right text-xl font-semibold tracking-tight">
              Total Amount: <span className="tabular-nums">{totalItemsAmount}</span>
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
            <Button className="w-28 gap-2" variant="default" disabled={formLoading} type="submit">
              {formLoading ? (
                <Loader className="bg-black" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M4 12.9978L4.01994 3.99557C4.02238 2.89186 4.91845 1.99877 6.02216 2L12.9958 2.00776L20 8.99481L19.9922 12.9978M13 2.49778V6.99778C13 8.10235 13.8954 8.99778 15 8.99778H19.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.5 16.75C19.9142 16.75 20.25 16.4142 20.25 16C20.25 15.5858 19.9142 15.25 19.5 15.25V16.75ZM16 16V15.25C15.5858 15.25 15.25 15.5858 15.25 16H16ZM15.25 22C15.25 22.4142 15.5858 22.75 16 22.75C16.4142 22.75 16.75 22.4142 16.75 22H15.25ZM19 19.75C19.4142 19.75 19.75 19.4142 19.75 19C19.75 18.5858 19.4142 18.25 19 18.25V19.75ZM4 16V15.25C3.58579 15.25 3.25 15.5858 3.25 16H4ZM3.25 22C3.25 22.4142 3.58579 22.75 4 22.75C4.41421 22.75 4.75 22.4142 4.75 22H3.25ZM10 16V15.25C9.58579 15.25 9.25 15.5858 9.25 16H10ZM10 22H9.25C9.25 22.4142 9.58579 22.75 10 22.75V22ZM19.5 15.25H16V16.75H19.5V15.25ZM15.25 16V19H16.75V16H15.25ZM15.25 19V22H16.75V19H15.25ZM16 19.75H19V18.25H16V19.75ZM4 16.75H5.75V15.25H4V16.75ZM4.75 22V19.5H3.25V22H4.75ZM4.75 19.5V16H3.25V19.5H4.75ZM5.75 18.75H4V20.25H5.75V18.75ZM6.75 17.75C6.75 18.3023 6.30228 18.75 5.75 18.75V20.25C7.13071 20.25 8.25 19.1307 8.25 17.75H6.75ZM5.75 16.75C6.30228 16.75 6.75 17.1977 6.75 17.75H8.25C8.25 16.3693 7.13071 15.25 5.75 15.25V16.75ZM10 16.75H11.5V15.25H10V16.75ZM12.75 18V20H14.25V18H12.75ZM11.5 21.25H10V22.75H11.5V21.25ZM10.75 22V16H9.25V22H10.75ZM12.75 20C12.75 20.6904 12.1904 21.25 11.5 21.25V22.75C13.0188 22.75 14.25 21.5188 14.25 20H12.75ZM11.5 16.75C12.1904 16.75 12.75 17.3096 12.75 18H14.25C14.25 16.4812 13.0188 15.25 11.5 15.25V16.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              )}
              Download
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-10 mb-5 flex w-full flex-col overflow-auto">
        <div className="flex justify-between print:hidden">
          <h3 className="w-fit font-semibold">Preview:</h3>
          <p className="inline-flex items-center gap-1 text-sm">
            Press{' '}
            <kbd className="border-border text-foreground rounded-md border p-0.5 px-1 font-mono font-medium">
              cmd + p
            </kbd>{' '}
            to print or save it!
          </p>
        </div>
        <Preview formData={previewData} totalItemsAmount={totalItemsAmount} currencyCode={selectedCurrency.code} />
      </div>

      {devMode ? (
        <div className="mt-5 flex w-full flex-col print:hidden">
          <div className="mb-2 flex justify-between">
            <h4 className="w-fit font-semibold">Data:</h4>
            <div className="flex items-center gap-3">
              <ClipboardButton data={formData} />
            </div>
          </div>
          <TextArea className="white h-[620px] font-mono" defaultValue={JSON.stringify(formData, null, 2)} readOnly />
        </div>
      ) : null}
    </>
  )
}
