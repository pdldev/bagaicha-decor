import type { Metadata } from 'next'

type BuildMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

const defaultUrl = 'https://bagaichaevents.com'
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultUrl).replace(
  /\/+$/,
  '',
)

export function buildMetadata({
  title,
  description,
  path,
  image = '/placeholder.jpg',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const cleanPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const absoluteUrl = `${siteUrl}${cleanPath}`
  const isPreview =
    Boolean(process.env.NEXT_PUBLIC_VERCEL_URL) &&
    process.env.NEXT_PUBLIC_VERCEL_URL !== new URL(siteUrl).hostname
  const noIndexRobots = noIndex || isPreview
  const suffix = ' | Bagaicha Flower Decor and Events'
  const fullTitle =
    `${title}${suffix}`.length <= 60
      ? `${title}${suffix}`
      : `${title.slice(0, 60 - suffix.length - 3).trim()}...${suffix}`
  const trimmedDescription =
    description.length <= 155
      ? description
      : `${description.slice(0, 152).trim()}...`

  return {
    title: fullTitle,
    description: trimmedDescription,
    alternates: { canonical: absoluteUrl },
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: fullTitle,
      description: trimmedDescription,
      url: absoluteUrl,
      siteName: 'Bagaicha Flower Decor and Events',
      locale: 'en_NP',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: trimmedDescription,
      images: [image],
    },
    robots: noIndexRobots
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
