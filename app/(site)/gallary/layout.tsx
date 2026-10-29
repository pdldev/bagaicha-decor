import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event gallery',
  description:
    'Explore wedding, family ritual and celebration decorations by Bagaicha in Pokhara.',
  alternates: { canonical: '/gallary' },
  openGraph: {
    title: 'Event gallery',
    description:
      'Explore wedding, family ritual and celebration decorations by Bagaicha in Pokhara.',
    url: '/gallary',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event gallery',
    description:
      'Explore wedding, family ritual and celebration decorations by Bagaicha in Pokhara.',
  },
}

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
