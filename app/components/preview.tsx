import { cn, formatCurrency, calculateDiscountAmount } from '@/app/lib/utils'
import { FormData } from './context/form'

type PreviewProps = {
  formData: FormData
  totalItemsAmount: string
  discountAmount?: string
  finalAmount?: string
  currencyCode: string
}

export default function Preview({ totalItemsAmount, discountAmount, finalAmount, formData, currencyCode }: PreviewProps) {
 
  const subtotalValue = parseFloat(
    formData.items?.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0).toString()
  )
  
  const discountValue = calculateDiscountAmount(
    subtotalValue,
    formData.discountType,
    Number(formData.discountValue)  
  )
  
  const calculatedFinalAmount = subtotalValue - discountValue
  
  
  const displaySubtotal = totalItemsAmount || formatCurrency(subtotalValue, 'en', currencyCode)
  const displayDiscount = discountAmount || formatCurrency(discountValue, 'en', currencyCode)
  const displayFinalAmount = finalAmount || formatCurrency(calculatedFinalAmount, 'en', currencyCode)

 
  return (
    <div
      className={cn(
        'border-border mt-2 flex w-full flex-col gap-2.5 overflow-auto rounded-lg border p-4 px-4 text-sm! leading-6 lg:max-w-[1080px] print:border-0',
      )}
    >
      <div className="w-[860px] md:w-full">
        <div className="flex w-full justify-between">
          <div className="flex w-full max-w-md flex-col gap-3">
            {formData.logo && (
              <div className="mb-3">
                <img 
                  src={formData.logo} 
                  alt="Company Logo" 
                  className="max-h-24 max-w-48 mb-2" 
                />
              </div>
            )}
            <h4 className="max-w-md text-xl font-semibold">{formData.name}</h4>

            <p className="mt-1 flex w-full max-w-xs flex-col whitespace-pre-line">
              <span className="text-base font-semibold">From Address</span>
              {formData.fromAddress}
            </p>
          </div>

          <div className="mt-0 flex w-full max-w-xs flex-col">
            <h5 className="mb-2 max-w-md text-lg font-semibold">Invoice {formData.invoiceNo}</h5>
            <p className="mt-1 flex w-full gap-1">
              <span className="font-semibold">Email:</span> {formData.email}
            </p>
            <p className="mt-1 flex w-full gap-1">
              <span className="font-semibold">Phone Number:</span> {formData.phoneNumber}
            </p>
            <p className="mt-1 flex w-full gap-1">
              <span className="font-semibold">TAX/GSTIN:</span> {formData.tax}
            </p>
          </div>
        </div>

        <div className="mt-5 flex w-full justify-between">
          <div className="flex w-full max-w-sm flex-col gap-3">
            <p className="mt-1 flex w-full max-w-xs flex-col whitespace-pre-line">
              <span className="text-base font-semibold">To Address</span>
              {formData.toAddress}
            </p>
          </div>

          <div className="flex w-full max-w-xs flex-col items-end">
            <p className="mt-1 flex w-full items-center gap-1">
              <span className="w-[140px] font-semibold">Performance Period:</span>
              <span>
                {formData.performanceFrom} <span className="text-sm font-medium">-</span> {formData.performanceTo}{' '}
              </span>
            </p>
            <p className="mt-1 flex w-full max-w-xs gap-1">
              <span className="w-[140px] font-semibold">Due Date:</span> {formData.dueDate}
            </p>
            <p className="mt-1 flex w-full max-w-xs gap-1">
              <span className="w-[140px] font-semibold">Invoice Date:</span> {formData.invoiceDate}
            </p>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col">
          <div className="border-border flex w-full max-w-full flex-col border-b text-sm">
            <div className="border-border grid grid-cols-[40px_1.5fr_80px_80px_1.5fr_1fr] items-center gap-2 border-b">
              <span className="p-2 font-semibold">No.</span>
              <span className="font-semibold">Name</span>
              <span className="font-semibold">Price</span>
              <span className="font-semibold">Quantity</span>
              <span className="font-semibold">Description</span>
              <span className="font-semibold">Amount</span>
            </div>
            {formData.items?.map((item, index) => {
              return (
                <div
                  className="grid grid-cols-[40px_1.5fr_80px_80px_1.5fr_1fr] items-center gap-2"
                  key={`${item.id}-${index}`}
                >
                  <span className="p-2">{item.id}.</span>
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <span>{item.quantity}</span>
                  <span>{item.description}</span>
                  <span>{formatCurrency(item.totalAmount, 'en', currencyCode)}</span>
                </div>
              )
            })}
          </div>
          
          <div className="mt-6 mb-6 flex w-full flex-col items-end">
        <div className="flex w-64 justify-between">
          <span className="text-base">Subtotal:</span>
          <span className="tabular-nums">{displaySubtotal}</span>
        </div>
        
        {discountValue > 0 && (
          <div className="mt-1 flex w-64 justify-between">
            <span className="text-base">
              Discount {formData.discountType === 'percentage' ? `(${formData.discountValue}%)` : ''}:
            </span>
            <span className="tabular-nums text-red-600">-{displayDiscount}</span>
          </div>
        )}
        
        <div className="mt-2 flex w-64 justify-between border-t pt-2">
          <span className="text-lg font-semibold">Total Amount:</span>
          <span className="tabular-nums text-lg font-semibold">{displayFinalAmount}</span>
        </div>
      </div>
        </div>

        <div className="flex w-full flex-col">
          <span className="text-base font-semibold">Terms of Payment</span>
          <p className="mt-1 flex w-full max-w-md flex-col gap-3 whitespace-pre-line">{formData.termsOfPayment}</p>
        </div>

        {formData.footnote1?.length || formData.footnote2?.length ? (
          <hr className="border-border mt-40 h-[1px] w-full" />
        ) : null}

        <div className="mt-3 flex w-full justify-between gap-10 leading-6">
          <p className="mt-1 flex w-full max-w-xs flex-col gap-3 whitespace-pre-line">{formData.footnote1}</p>
          <p className="mt-1 flex w-full max-w-xs flex-col gap-3 whitespace-pre-line">{formData.footnote2}</p>
        </div>
      </div>
    </div>
  )
}