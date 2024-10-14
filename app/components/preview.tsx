import { cn } from '../lib/utils'
import { FormData } from './context/form'

type PreviewProps = {
  formData: FormData
  totalItemsAmount: string
}

export default function Preview({ totalItemsAmount, formData }: PreviewProps) {
  return (
    <div
      className={cn(
        'mt-2 flex w-full flex-col gap-2.5 overflow-auto rounded-lg border border-gray-300 p-4 px-4 text-sm leading-6 lg:max-w-[1080px] print:border-0',
      )}
    >
      <div className="w-[820px] md:w-full">
        <div className="flex w-full justify-between">
          <div className="flex w-full max-w-md flex-col gap-3">
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
          <div className="flex w-full max-w-md flex-col gap-3">
            <p className="mt-1 flex w-full max-w-xs flex-col whitespace-pre-line">
              <span className="text-base font-semibold">To Address</span>
              {formData.toAddress}
            </p>
          </div>

          <div className="flex w-full max-w-xs flex-col items-end">
            <p className="mt-1 flex w-full items-center gap-1">
              <span className="w-[140px] font-semibold">Performance Period:</span>
              <span>
                {formData.performanceFrom} - {formData.performanceTo}{' '}
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
          <div className="flex w-full max-w-full flex-col border-b border-gray-400 text-sm">
            <div className="grid grid-cols-[40px,1.5fr,80px,80px,1.5fr,1fr] items-center gap-2 border-b border-gray-400">
              <span className="p-2 font-semibold">No.</span>
              <span className="font-semibold">Name</span>
              <span className="font-semibold">Price</span>
              <span className="font-semibold">Quantity</span>
              <span className="font-semibold">Description</span>
              <span className="font-semibold">Total Amount</span>
            </div>
            {formData.items?.map((item, index) => {
              return (
                <div
                  className="grid grid-cols-[40px,1.5fr,80px,80px,1.5fr,1fr] items-center gap-2"
                  key={`${item.id}-${index}`}
                >
                  <span className="p-2">{item.id}.</span>
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <span>{item.quantity}</span>
                  <span>{item.description}</span>
                  <span>{item.totalAmount}</span>
                </div>
              )
            })}
          </div>
          <h6 className="mb-6 mt-10 w-full text-right text-lg font-semibold tracking-tight">
            Total Items Amount: <span className="tabular-nums">{totalItemsAmount}</span>
          </h6>
        </div>

        <div className="flex w-full flex-col">
          <span className="text-base font-semibold">Terms of Payment</span>
          <p className="mt-1 flex w-full max-w-md flex-col gap-3 whitespace-pre-line">{formData.termsOfPayment}</p>
        </div>

        {formData.footnote1?.length || formData.footnote2?.length ? (
          <hr className="mt-10 h-[1px] w-full bg-gray-300" />
        ) : null}

        <div className="mt-2 flex w-full justify-between gap-10 leading-6">
          <p className="mt-1 flex w-full max-w-xs flex-col gap-3 whitespace-pre-line">{formData.footnote1}</p>
          <p className="mt-1 flex w-full max-w-xs flex-col gap-3 whitespace-pre-line">{formData.footnote2}</p>
        </div>
      </div>
    </div>
  )
}
