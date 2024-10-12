import React from 'react'

import { cn } from '@/app/lib/utils'

export default function Label({ children, className, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('mb-1.5 font-medium', className)} {...props}>
      {children}
    </span>
  )
}
