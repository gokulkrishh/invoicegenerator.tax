import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/app/lib/utils'

export const buttonVariants = cva(
  `inline-flex shrink-0 gap-2 font-medium items-center bg-background text-foreground justify-center rounded-lg outline-hidden focus:bg-foreground/10 hover:bg-foreground/10 focus:border-border/85 focus:ring-2 focus:ring-offset-2 focus-visible:bg-background/85 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:border-border/85 ring-ring ring-offset-background whitespace-nowrap text-nowrap disabled:cursor-not-allowed disabled:bg-background/70 border border-border transition-all duration-200 ease-in-out [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-inherit text-sm`,
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background hover:bg-foreground/80 focus:bg-foreground/80 focus-visible:bg-foreground/80 focus-visible:border-border/85 focus-visible:ring-2 focus-visible:ring-offset-2 ring-ring ring-offset-background disabled:bg-foreground/60 disabled:border-border',
        primary:
          'bg-blue-600 text-foreground hover:bg-blue-600/90  border border-blue-600 focus:border-blue-600/90 focus-visible:bg-blue-600/90 focus-visible:border-blue-600/90 ring-ring ring-offset-background disabled:bg-blue-600/90 disabled:border-blue-600/90',
        secondary:
          'bg-transparent text-foreground hover:bg-foreground/10 focus:bg-foreground/10 focus-visible:bg-foreground/10 focus-visible:border-border ring-ring ring-offset-background',
        ghost:
          'bg-transparent text-inherit border-transparent hover:bg-background focus-visible:bg-background focus-visible:border-border ring-ring ring-offset-background',
        icon: 'bg-background text-foreground hover:bg-foreground/10 border border-background focus:border-foreground/10 focus-visible:bg-foreground/10 focus-visible:border-foreground/10 ring-ring ring-offset-background disabled:bg-foreground/10 disabled:border-foreground/10',
      },
      size: {
        default: 'h-10 px-3',
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
