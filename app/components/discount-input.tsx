'use client'

import { useState, useEffect } from 'react'

import Number from '@/app/components/inputs/number'
import { useCurrency } from '@/app/components/context/currency'

type DiscountInputProps = {
  defaultType?: 'none' | 'fixed' | 'percentage'
  defaultValue?: number
  onChangeCallback: (type: 'none' | 'fixed' | 'percentage', value: number) => void
}

export default function DiscountInput({
  defaultType = 'none',
  defaultValue = 0,
  onChangeCallback,
}: DiscountInputProps) {
  const [discountType, setDiscountType] = useState<'none' | 'fixed' | 'percentage'>(defaultType)
  const [discountValue, setDiscountValue] = useState<number>(defaultValue)
  const { selectedCurrency } = useCurrency()
  
 
  useEffect(() => {
    setDiscountType(defaultType);
    setDiscountValue(defaultValue);
  }, [defaultType, defaultValue]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'none' | 'fixed' | 'percentage'
    setDiscountType(newType)
    
   
    if (newType === 'none') {
      setDiscountValue(0);
      onChangeCallback(newType, 0);
    } else {
      // Keep the current value for other types
      onChangeCallback(newType, discountValue);
    }
    
  }

  const handleValueChange = (value: number | undefined) => {
    const newValue = value || 0
    setDiscountValue(newValue)
    
   
    onChangeCallback(discountType, newValue)
    
  }

  return (
    <div className="flex items-end gap-2">
      <div className="flex-grow">
        <label className="mb-2 block text-sm font-medium">Discount Type</label>
        <select
          className="border-border bg-background text-foreground ring-ring focus-visible:ring-ring w-full rounded-md border p-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          value={discountType}
          onChange={handleTypeChange}
        >
          <option value="none">No Discount</option>
          <option value="fixed">Fixed Amount ({selectedCurrency.symbol})</option>
          <option value="percentage">Percentage (%)</option>
        </select>
      </div>
      <div className="flex-grow">
        <Number
          label="Discount Value"
          className={`w-full ${discountType === 'none' ? 'opacity-50' : ''}`}
          placeholder={discountType === 'percentage' ? "10" : "500"}
          value={discountValue}
          onChangeCallback={handleValueChange}
          disabled={discountType === 'none'}
          min={0}
          max={discountType === 'percentage' ? 100 : undefined}
        />
      </div>
    </div>
  )
}