import type { Metadata, Viewport } from 'next'
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Serif_Devanagari,
} from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/layout/site-shell'
import { AnalyticsConsent } from '@/components/shared/analytics-consent'
import { site } from '@/config/site'

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

const siteUrl = 'https://bagaichaevents.com'

export const metadata: Metadata = {
  title: {
    default: 'Bagaicha Flower Decor and Events | Pokhara',
    template: '%s | Bagaicha Flower Decor and Events',
  },
  description:
    'Thoughtful flowers, floral decor and event styling for beautiful celebrations in Pokhara, Nepal.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: 'website',
    locale: 'en_NP',
    url: siteUrl,
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Bagaicha flowers and event decor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.tagline,
    images: ['/placeholder.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAF6EF',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${devanagari.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
        <AnalyticsConsent />
      </body>
    </html>
  )
}
