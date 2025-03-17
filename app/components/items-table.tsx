'use client'

import { useEffect, useState } from 'react'

import Button from '@/app/components/button'
import Number from '@/app/components/inputs/number'
import Text from '@/app/components/inputs/text'

import { cn, formatCurrency } from '@/app/lib/utils'

import { useCurrency } from './context/currency'

export type ItemsData = {
  id: number
  name: string
  price: number | 0
  quantity: number
  description: string
  totalAmount: number | 0
}

const getInitialData = (): ItemsData[] => [{ id: 1, name: '', price: 0, quantity: 1, description: '', totalAmount: 0 }]

export const getTotalItemPrice = (item: ItemsData): number => {
  const totalPrice = (item.price || 0) * item.quantity
  return totalPrice
}

type ItemsTableProps = { defaultValue: ItemsData[]; onChangeCallback: (items: ItemsData[]) => void }

function ItemsTable({ onChangeCallback, defaultValue }: ItemsTableProps) {
  const [items, setItems] = useState(getInitialData)
  const { selectedCurrency } = useCurrency()

  useEffect(() => {
    if (defaultValue) setItems(defaultValue ?? getInitialData)
  }, [defaultValue])

  const getTotalAmount = (item: ItemsData) => {
    return isNaN(item.price || NaN) ? undefined : (item.price || 0) * item.quantity
  }

  const addItem = () => {
    const newItems = [
      ...items,
      { id: items.length + 1, name: '', price: 0, quantity: 1, description: '', totalAmount: 0 },
    ]
    setItems(newItems)
    onChangeCallback(newItems)
  }

  const removeItem = (id: number) => {
    const updatedItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 })) as ItemsData[]
    setItems(updatedItems)
    onChangeCallback(updatedItems)
  }

  const handleChange = (id: number, field: string, value: number | string | undefined) => {
    const newItems = items.map((item) => {
      const newItem = { ...item, [field]: value }
      return item.id === id ? { ...newItem, totalAmount: getTotalAmount(newItem) } : item
    }) as ItemsData[]
    setItems(newItems)
    onChangeCallback(newItems)
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between">
        {items.map((item, index) => {
          return (
            <div className="flex items-center justify-between gap-4" key={`${item.id}-${index}`}>
              <div className="flex items-center">
                <span
                  className={cn(`p-2`, {
                    'mt-8': index === 0,
                    'mt-0': index !== 0,
                  })}
                >
                  {item.id}.
                </span>
              </div>
              <div className="flex w-fit flex-col gap-3 rounded-md px-2 py-2">
                <Text
                  label={`${index === 0 ? 'Name' : ''}`}
                  placeholder="Name"
                  value={item.name}
                  onChangeCallback={(value: string) => handleChange(item.id, 'name', value)}
                  required
                />
              </div>
              <div className="flex w-fit flex-col gap-3 rounded-md px-2 py-2">
                <Number
                  label={`${index === 0 ? 'Price' : ''}`}
                  className="w-28"
                  placeholder="250"
                  value={item.price}
                  onChangeCallback={(value: number | undefined) => handleChange(item.id, 'price', value)}
                  required
                />
              </div>
              <div className="flex w-fit flex-col gap-3 rounded-md px-2 py-2">
                <Number
                  label={`${index === 0 ? 'Quantity' : ''}`}
                  className="w-16"
                  placeholder="1"
                  value={item.quantity}
                  onChangeCallback={(value: number) => handleChange(item.id, 'quantity', value.toString())}
                  required
                />
              </div>
              <div className="flex w-fit flex-col gap-3 rounded-md px-2 py-2">
                <Text
                  className="w-full"
                  label={`${index === 0 ? 'Description' : ''}`}
                  placeholder="Description"
                  value={item.description}
                  onChangeCallback={(value: string) => handleChange(item.id, 'description', value)}
                />
              </div>
              <div className="flex w-fit flex-col gap-3 rounded-md px-2 py-2">
                <Text
                  label={`${index === 0 ? 'Amount' : ''}`}
                  className="w-full max-w-38 tabular-nums"
                  placeholder={String(item.totalAmount)}
                  value={formatCurrency(item.totalAmount, 'en', selectedCurrency.code)}
                  readOnly
                  disabled
                />
              </div>
              <div
                className={cn('flex items-center justify-center px-2 py-2', {
                  'mt-8': index === 0,
                  'mt-0': index !== 0,
                })}
              >
                <Button
                  type="button"
                  variant="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    color="currentColor"
                    fill="none"
                  >
                    <path
                      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <Button type="button" variant="ghost" className="text-foreground mt-4 mr-7 w-fit self-start" onClick={addItem}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Item
      </Button>
    </>
  )
}

export default ItemsTable
