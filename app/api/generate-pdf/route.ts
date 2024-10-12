import { NextRequest, NextResponse } from 'next/server'

import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'

import { FormData } from '@/app/components/context/form'

export const maxDuration = 60

const executablePath = `https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar`

export async function POST(request: NextRequest) {
  const {
    formData,
    totalItemsAmount,
  }: {
    formData: FormData
    totalItemsAmount: string
  } = await request.json()

  try {
    /* Chrome size exceeds limit of serverless 50MB limit, followed below to avoid this issue

     https://www.stefanjudis.com/blog/how-to-use-headless-chrome-in-serverless-functions/
    */

    // Launch a new browser instance
    puppeteer.launch({
      args: [...chromium.args, '--disable-blink-features=AutomationControlled'],
      defaultViewport: chromium.defaultViewport,
      // you have to point to a Chromium tar file here 👇
      executablePath: await chromium.executablePath(executablePath),
    })
    const browser = await puppeteer.launch({
      defaultViewport: { width: 1080, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    // Import ReactDOMServer for rendering the Preview component
    const ReactDOMServer = (await import('react-dom/server')).default

    // Import the Preview component and render it to HTML
    const PreviewComponent = (await import(`@/app/components/preview`)).default
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(PreviewComponent({ formData, totalItemsAmount }))
    await page.setContent(await htmlTemplate, { waitUntil: 'networkidle0' })

    //  Add Tailwind CSS to the page
    await page.addScriptTag({ url: 'https://cdn.tailwindcss.com' })
    await page.addScriptTag({ url: 'https://unpkg.com/tailwindcss-cdn' })

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })

    // Close the browser
    await page.close()
    await browser.close()

    // Set the headers to indicate a file attachment
    const headers = new Headers()
    headers.set('Content-Disposition', `attachment; filename=invoice_${formData.invoiceNo}.pdf`)
    headers.set('Content-Length', pdfBuffer.length.toString())
    headers.set('Content-Type', 'application/pdf')

    // // Return the PDF buffer as a response
    return new NextResponse(pdfBuffer, { status: 200, headers: headers })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return new NextResponse('Error generating PDF', { status: 500 })
  }
}
