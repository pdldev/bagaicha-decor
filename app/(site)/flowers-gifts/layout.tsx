import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Flowers & Gifts',
  description:
    'Fresh flowers, thoughtful gifts and same-day delivery across Pokhara from Bagaicha.',
  path: '/flowers-gifts',
  image: '/placeholder.jpg',
})

export default function FlowersGiftsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
