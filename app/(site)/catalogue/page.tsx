import { CatalogueDownloadCard } from '@/components/services/catalogue-download-card'
import { buildMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { bouquets } from '@/data/bouquets'
import { gifts } from '@/data/gifts'
import { site } from '@/data/site'

const fullCatalogue = {
  file: '/downloads/catalogue/Catalog.pdf',
  preview: '/images/catalogue/full-catalogue-preview.jpg',
  pages: 1,
  sizeLabel: '2.4 MB',
}

export const metadata = buildMetadata({
  title: 'Catalogue',
  description:
    'Browse the Bagaicha design catalogue and download the full PDF for wedding, celebration and floral decor ideas.',
  path: '/catalogue',
  image: '/images/catalogue/full-catalogue-preview.jpg',
})

export default function CataloguePage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [...bouquets, ...gifts].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}/flowers-gifts`,
    })),
  }
  return (
    <main className="bg-background text-ink overflow-hidden">
      <JsonLd data={itemListLd} />
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 sm:px-10 lg:px-16 lg:pt-36 lg:pb-20">
        <div className="mb-12">
          <p className="eyebrow">Our catalogue</p>
          <h1 className="font-display mt-5 max-w-4xl text-[clamp(3.2rem,7vw,7rem)] leading-[.82] font-light tracking-[-.055em]">
            A fuller look at our{' '}
            <em className="text-marigold-contrast">designs.</em>
          </h1>
        </div>

        <div className="max-w-4xl">
          <CatalogueDownloadCard
            serviceName="Bagaicha"
            slug="catalogue"
            catalogue={fullCatalogue}
            heading="See our full design catalogue"
            primaryLabel="Download catalogue (PDF)"
            secondaryLabel="View in browser"
            downloadName="bagaicha-full-catalogue.pdf"
          />
        </div>
      </section>
    </main>
  )
}
