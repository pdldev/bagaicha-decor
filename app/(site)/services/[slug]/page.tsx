import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getService, getServiceCatalogue, services } from '@/lib/content'
import { ServiceDetail } from './detail-client'
import { buildMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { site } from '@/data/site'

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
  if (!service) {
    return buildMetadata({
      title: 'Service',
      description:
        'Explore flower decoration and event services by Bagaicha in Pokhara.',
      path: `/services/${slug}`,
      noIndex: true,
    })
  }
  return buildMetadata({
    title: service.name,
    description: `${service.shortDescription} Plan wedding, celebration and floral decoration in Pokhara with Bagaicha.`,
    path: `/services/${slug}`,
    image: service.heroImage,
  })
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
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.longDescription,
      provider: { '@id': `${site.url}/#localbusiness` },
    },
  ]
  return (
    <>
      <JsonLd data={data} />
      <ServiceDetail service={service} catalogue={catalogue ?? undefined} />
    </>
  )
}
