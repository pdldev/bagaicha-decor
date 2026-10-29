import type { Metadata } from 'next'
import { ServicesClient } from './services-client'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Wedding, pasni, bratabandha and celebration decoration in Pokhara by Bagaicha.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services',
    description:
      'Wedding, pasni, bratabandha and celebration decoration in Pokhara by Bagaicha.',
    url: '/services',
    images: ['/placeholder.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services',
    description:
      'Wedding, pasni, bratabandha and celebration decoration in Pokhara by Bagaicha.',
    images: ['/placeholder.jpg'],
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
