import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Event gallery',
  description:
    'Explore wedding, family ritual and celebration decorations by Bagaicha in Pokhara.',
  path: '/gallary',
})

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
