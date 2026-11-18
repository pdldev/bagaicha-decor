import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { work } from '@/data/work'
import { site } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/catalogue',
    '/contact',
    '/flowers-gifts',
    '/gallary',
    '/plan',
    '/services',
    '/work',
    '/privacy',
    '/terms',
    ...services.map((service) => `/services/${service.slug}`),
    ...work.map((entry) => `/work/${entry.slug}`),
  ]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route.split('/').length > 2 ? 0.6 : 0.8,
  }))
}
