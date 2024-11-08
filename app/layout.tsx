import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { CurrencyProvider } from '@/app/components/context/currency'

import { FormProvider } from './components/context/form'
import './globals.css'

const geistSans = Geist({
  preload: true,
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  preload: true,
  variable: '--font-geist-mono',
})

const title = 'Invoice Generator'
const description =
  'Just a dumb free invoice generator! Enter your details and download your invoice as pdf. No sign-up required!'
const url = 'https://invoicegenerator.tax'

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  manifest: `${url}/manifest.json`,
  icons: {
    icon: `/logo.svg`,
    apple: ['/manifest/apple-touch-icon.png'],
    shortcut: ['/manifest/apple-touch-icon.png'],
  },
  openGraph: {
    title,
    description,
    siteName: 'Invoice Generator',
    type: 'website',
    url,
    images: [
      {
        type: 'image/gif',
        url: '/og/og.gif',
        width: 1200,
        height: 630,
        alt: 'Invoice Generator',
      },
    ],
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@gokul_i',
    images: [
      {
        type: 'image/gif',
        url: '/og/og.gif',
        width: 1920,
        height: 1080,
        alt: 'Invoice Generator',
      },
    ],
  },
  appleWebApp: { title, statusBarStyle: 'black-translucent' },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider enableColorScheme enableSystem>
          <FormProvider>
            <CurrencyProvider>
              <Toaster position="top-center" />
              {children}
            </CurrencyProvider>
          </FormProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
