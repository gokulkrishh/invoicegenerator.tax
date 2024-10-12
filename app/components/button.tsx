import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/app/lib/utils'

import Loader from './loader'

export const buttonVariants = cva(
  `inline-flex shrink-0 gap-2 font-medium text-white items-center justify-center rounded-lg outline-none focus:bg-gray-950/90 focus:border-gray-950/90 focus:ring-2 focus:ring-offset-1 focus-visible:bg-gray-950/90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-gray-950/90 ring-blue-600 whitespace-nowrap text-nowrap disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-950/70 disabled:border-gray-950/10 disabled:ring-0 border border-black transition-all duration-200 ease-in-out [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 text-sm`,
  {
    variants: {
      variant: {
        default: 'bg-gray-950 text-neutral-100 hover:bg-gray-950/90',
        primary:
          'bg-blue-600 text-neutral-100 hover:bg-blue-600/90 hover:bg-blue-600/90 border border-blue-500 focus:border-blue-500/90 focus:ring-2 focus:ring-offset-1 focus-visible:bg-blue-500/90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-blue-500/90 ring-blue-600 whitespace-nowrap text-nowrap disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-500/5 disabled:border-blue-600/10',
        secondary:
          'bg-transparent text-gray-800 [&_svg]:text-gray-800 hover:bg-gray-100/90 border border-gray-300 focus:border-gray-300 focus:ring-2 focus:ring-offset-1 focus-visible:bg-gray-100/90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-gray-300 ring-blue-600 whitespace-nowrap text-nowrap disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100/5 disabled:border-gray-800/10',
        ghost:
          'border-transparent hover:border-gray-200 hover:bg-gray-100 focus:border-gray-200 focus:bg-gray-100 focus-visible:bg-gray-100 focus-visible:border-gray-200',
      },
      size: {
        default: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export default function Button({ children, variant, size, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </button>
  )
}
