import { cn } from '../lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export default function Loader({ className, size = 'sm', color = '', ...props }: Props) {
  return (
    <div
      className={cn('relative mr-0.25 h-8 w-8', {
        'h-4 w-4': size === 'sm',
        'h-8 w-8': size === 'md',
        'h-12 w-12': size === 'lg',
      })}
    >
      <div className="relative top-[50%] left-[50%] h-[inherit] w-[inherit]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={cn('animate-spinner absolute h-[8%] w-[24%] rounded-sm bg-neutral-800 opacity-100', className)}
            style={{
              backgroundColor: color,
              transform: `rotate(${i * 30}deg) translate(146%)`,
              animationDelay: `${-1.1 + i * 0.1}s`,
            }}
            {...props}
          />
        ))}
      </div>
    </div>
  )
}
