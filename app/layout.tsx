import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import { ThemeProvider } from 'next-themes'

import { CurrencyProvider } from '@/app/components/context/currency'

import { FormProvider } from './components/context/form'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const title = 'Invoice Generator'
const description = 'Just a dumb Invoice generator!'
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
        type: 'image/jpeg',
        url: '/og/1.jpeg',
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
        type: 'image/jpeg',
        url: '/og/1.jpeg',
        width: 1920,
        height: 1080,
        alt: 'Invoice Generator',
      },
    ],
  },
  appleWebApp: { title, statusBarStyle: 'black-translucent' },
}

export const viewport: Viewport = {
  themeColor: '#000',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-primary font-sans antialiased`}>
        <ThemeProvider enableSystem={false} enableColorScheme={false}>
          <FormProvider>
            <CurrencyProvider>{children}</CurrencyProvider>
          </FormProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
