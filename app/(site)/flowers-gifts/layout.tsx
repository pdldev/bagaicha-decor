import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flowers & Gifts',
  description:
    'Fresh flowers, thoughtful gifts and same-day delivery across Pokhara from Bagaicha.',
  alternates: { canonical: '/flowers-gifts' },
  openGraph: {
    title: 'Flowers & Gifts',
    description: 'Fresh flowers and thoughtful gifts from Bagaicha in Pokhara.',
    url: '/flowers-gifts',
    images: ['/placeholder.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/placeholder.jpg'] },
}

export default function FlowersGiftsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
