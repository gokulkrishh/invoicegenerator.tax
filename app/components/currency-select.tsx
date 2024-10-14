'use client'

import { useCurrency } from './context/currency'
import Select from './inputs/select'

export default function CurrencySelect() {
  const { data, selectedCurrency, onChangeHandler } = useCurrency()
  return (
    <div className="inline-flex w-full max-w-[300px] items-center gap-2">
      <span className="text-sm font-medium">Currency:</span>
      <Select
        aria-label="Currency"
        className="w-full"
        defaultSelected={selectedCurrency.code}
        data={data}
        onChangeCallback={onChangeHandler}
      />
    </div>
  )
}
