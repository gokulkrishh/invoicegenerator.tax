import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Invoice Generator',
    short_name: 'Invoice Generator',
    description:
      'Just a dumb free invoice generator! Enter your details and download your invoice as pdf. No sign-up required!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    id: '/',
    icons: [
      { src: '/manifest/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/manifest/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
