import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ServicesClient } from './services-client'

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Explore wedding, pasni, bratabandha and celebration decoration services thoughtfully planned by Bagaicha in Pokhara.',
  path: '/services',
  image: '/placeholder.jpg',
})

export default function ServicesPage() {
  return <ServicesClient />
}
