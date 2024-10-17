import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/app/lib/utils'

export const buttonVariants = cva(
  `inline-flex shrink-0 gap-2 font-medium items-center bg-gray-950 text-white justify-center rounded-lg outline-none focus:bg-gray-950/85 hover:bg-gray-950/85 focus:bg-gray-950/85 focus:border-gray-950/85 focus:ring-2 focus:ring-offset-1 focus-visible:bg-gray-950/85 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-gray-950/85 ring-blue-600 whitespace-nowrap text-nowrap disabled:cursor-not-allowed disabled:bg-gray-950/70 disabled:border-gray-950/10 disabled:ring-0 border border-black transition-all duration-200 ease-in-out [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-inherit text-sm`,
  {
    variants: {
      variant: {
        default: '',
        primary:
          'bg-blue-600 text-neutral-100 hover:bg-blue-600/90 hover:bg-blue-600/90 border border-blue-600 focus:border-blue-600/90 focus:ring-2 focus:ring-offset-1 focus-visible:bg-blue-600/90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-blue-600/90 ring-blue-600 whitespace-nowrap text-nowrap disabled:cursor-not-allowed disabled:bg-blue-600/90 disabled:border-blue-600/90',
        secondary:
          'bg-transparent text-black hover:bg-gray-100/90 border border-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-2 focus:bg-gray-200/90 focus:ring-offset-1 focus-visible:bg-gray-200/90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-gray-200 ring-blue-600 whitespace-nowrap text-nowrap disabled:cursor-not-allowed disabled:bg-gray-200/90 disabled:border-gray-200/90',
        ghost:
          'bg-transparent text-inherit border-transparent hover:bg-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-2 focus-visible:bg-gray-200 focus-visible:ring-1 focus-visible:border-gray-200/90 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:border-gray-200 ring-blue-600 whitespace-nowrap text-nowrap disabled:cursor-not-allowed disabled:bg-gray-200/90 disabled:border-gray-200/90',
      },
      size: {
        default: 'h-9 px-3',
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
