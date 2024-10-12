import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://invoicegenerator.tax',
      lastModified: new Date(),
    },
  ]
}
