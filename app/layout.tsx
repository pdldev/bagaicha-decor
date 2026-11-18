import type { Metadata, Viewport } from 'next'
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Serif_Devanagari,
} from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/layout/site-shell'
import { JsonLd } from '@/components/seo/json-ld'
import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})
const devanagari = Noto_Serif_Devanagari({
  variable: '--font-devanagari',
  subsets: ['devanagari'],
  display: 'swap',
  weight: ['400', '500'],
})
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = buildMetadata({
  title: 'Bagaicha Flower Decor and Events',
  description:
    'Thoughtful flowers, floral decor and event styling for beautiful celebrations and meaningful ceremonies in Pokhara, Nepal.',
  path: '/',
  image: '/placeholder.jpg',
})

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationId = `${site.url}/#organization`
  const localBusinessId = `${site.url}/#localbusiness`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: site.legalName,
      alternateName: site.alternateNames,
      url: site.url,
      logo: `${site.url}/placeholder-logo.png`,
      sameAs: site.sameAs,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone || undefined,
        contactType: 'customer service',
        areaServed: 'NP',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.legalName,
      publisher: { '@id': organizationId },
    },
  ]
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${devanagari.variable} antialiased`}
      >
        <JsonLd data={structuredData} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
