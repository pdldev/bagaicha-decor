import type { MetadataRoute } from 'next'

const siteUrl = 'https://bagaichaevents.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/flowers-gifts', '/contact']
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
