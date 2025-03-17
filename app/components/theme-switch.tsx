'use client'

import { useEffect, useState } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { useTheme } from 'next-themes'

type Theme = 'light' | 'dark' | 'system'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (selectedTheme: Theme) => {
    setTheme(selectedTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <RadioGroup.Root
      className="border-border flex h-fit w-fit items-center justify-between rounded-full border"
      value={theme}
      aria-label="theme"
      onValueChange={(value: Theme) => {
        handleClick(value)
      }}
      name="theme"
    >
      <RadioGroup.Item
        className={
          'border-border text-foreground ring-ring ring-offset-background hover:bg-foreground/10 focus:border-border/85 focus:bg-foreground/10 focus-visible:border-border/85 focus-visible:bg-background/85 disabled:bg-background/70 data-[state=checked]:bg-foreground/20 inline-flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full border-0 bg-transparent text-sm font-medium text-nowrap whitespace-nowrap outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed [&_svg]:shrink-0 [&_svg]:text-inherit [&>svg]:pointer-events-none [&>svg]:size-4'
        }
        value={'system'}
        id="system"
        suppressHydrationWarning
      >
        <svg className="not-sr-only" strokeLinejoin="round" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 3.25C1 1.45507 2.45507 0 4.25 0H11.75C13.5449 0 15 1.45507 15 3.25V15.25V16H14.25H1.75H1V15.25V3.25ZM4.25 1.5C3.2835 1.5 2.5 2.2835 2.5 3.25V14.5H13.5V3.25C13.5 2.2835 12.7165 1.5 11.75 1.5H4.25ZM4 4C4 3.44772 4.44772 3 5 3H11C11.5523 3 12 3.44772 12 4V10H4V4ZM9 13H12V11.5H9V13Z"
            fill="currentColor"
          ></path>
        </svg>
      </RadioGroup.Item>
      <RadioGroup.Item
        className={
          'border-border text-foreground ring-ring ring-offset-background hover:bg-foreground/10 focus:border-border/85 focus:bg-foreground/10 focus-visible:border-border/85 focus-visible:bg-background/85 disabled:bg-background/70 data-[state=checked]:bg-foreground/20 inline-flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full border-0 bg-transparent text-sm font-medium text-nowrap whitespace-nowrap outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed [&_svg]:shrink-0 [&_svg]:text-inherit [&>svg]:pointer-events-none [&>svg]:size-4'
        }
        value={'light'}
        id="light"
        suppressHydrationWarning
      >
        <svg
          className="not-sr-only"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          color="currentColor"
          fill="none"
        >
          <path
            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9955 3H12.0045M11.9961 21H12.0051M18.3588 5.63599H18.3678M5.63409 18.364H5.64307M5.63409 5.63647H5.64307M18.3582 18.3645H18.3672M20.991 12.0006H21M3 12.0006H3.00898"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RadioGroup.Item>
      <RadioGroup.Item
        className={
          'border-border text-foreground ring-ring ring-offset-background hover:bg-foreground/10 focus:border-border/85 focus:bg-foreground/10 focus-visible:border-border/85 focus-visible:bg-background/85 disabled:bg-background/70 data-[state=checked]:bg-foreground/20 inline-flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full border-0 bg-transparent text-sm font-medium text-nowrap whitespace-nowrap outline-hidden transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed [&_svg]:shrink-0 [&_svg]:text-inherit [&>svg]:pointer-events-none [&>svg]:size-4'
        }
        value={'dark'}
        id="dark"
        suppressHydrationWarning
      >
        <svg
          className="not-sr-only h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          color="currentColor"
          fill="none"
        >
          <path
            d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RadioGroup.Item>
    </RadioGroup.Root>
  )
}

export default ThemeSwitch
