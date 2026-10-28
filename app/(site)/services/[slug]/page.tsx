import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getService, getServiceCatalogue, services } from '@/lib/content'
import { ServiceDetail } from './detail-client'

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  return {
    title: service?.name ?? 'Service',
    description: service?.shortDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service?.name ?? 'Service',
      description: service?.shortDescription,
      images: service ? [service.heroImage] : ['/placeholder.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      images: service ? [service.heroImage] : ['/placeholder.jpg'],
    },
  } satisfies Metadata
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const catalogue = getServiceCatalogue(slug)
  return <ServiceDetail service={service} catalogue={catalogue ?? undefined} />
}
