import { CatalogueDownloadCard } from '@/components/services/catalogue-download-card'

const fullCatalogue = {
  file: '/downloads/catalogue/Catalog.pdf',
  preview: '/images/catalogue/full-catalogue-preview.jpg',
  pages: 1,
  sizeLabel: '2.4 MB',
}

export const metadata = {
  title: 'Catalogue',
  description:
    'Browse the Bagaicha design catalogue and download the full PDF.',
  alternates: { canonical: '/catalogue' },
  openGraph: {
    title: 'Bagaicha design catalogue',
    description: 'Browse and download the Bagaicha design catalogue.',
    url: '/catalogue',
    images: ['/images/catalogue/full-catalogue-preview.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bagaicha design catalogue',
    description: 'Browse and download the Bagaicha design catalogue.',
    images: ['/images/catalogue/full-catalogue-preview.jpg'],
  },
}

export default function CataloguePage() {
  return (
    <main className="bg-background text-ink overflow-hidden">
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
