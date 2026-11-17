'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

const galleryCategories = [
  'Weddings',
  'Family Rituals',
  'Celebrations',
  'Vehicles',
] as const

const galleryImages = Object.values(
  import.meta.glob('../../gallaryimg/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
) as string[]

const galleryItems = galleryImages.map((src, index) => ({
  src,
  category: galleryCategories[index % galleryCategories.length],
}))

export default function GalleryPage() {
  const [filter, setFilter] = useState<
    'All' | (typeof galleryCategories)[number]
  >('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visibleGallery = useMemo(
    () =>
      filter === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  )

  const selectedImage =
    lightboxIndex !== null ? visibleGallery[lightboxIndex]?.src : null

  useEffect(() => {
    if (lightboxIndex === null) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setLightboxIndex(null)
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((index) =>
          index === null
            ? null
            : (index - 1 + visibleGallery.length) % visibleGallery.length,
        )
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((index) =>
          index === null ? null : (index + 1) % visibleGallery.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, visibleGallery.length])

  return (
    <main className="bg-background text-ink overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 pt-36 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <p className="eyebrow">Our gallery</p>
        <h1 className="font-display mt-5 max-w-4xl text-[clamp(3.4rem,7vw,7.5rem)] leading-[.82] font-light tracking-[-.055em]">
          Moments we&apos;ve{' '}
          <em className="text-marigold-contrast">decorated</em> with care.
        </h1>
        <div className="border-line mt-12 flex flex-wrap gap-2 border-t pt-5">
          {(['All', ...galleryCategories] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`border px-4 py-2 text-[10px] tracking-[.16em] uppercase transition-colors ${filter === item ? 'border-maroon bg-maroon text-background' : 'border-line hover:border-maroon'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {visibleGallery.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open image ${index + 1}`}
              className={`bg-surface relative overflow-hidden text-left ${index === 0 || index === 5 ? 'aspect-[3/4]' : 'aspect-square'} ${index === 2 ? 'sm:col-span-2' : ''}`}
            >
              <Image
                src={item.src}
                alt={`${item.category} event detail ${index + 1}`}
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          className="bg-ink/90 fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="text-background absolute top-5 right-5"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="size-7" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            className="text-background absolute top-1/2 left-3 -translate-y-1/2 p-3 sm:left-6"
            onClick={(event) => {
              event.stopPropagation()
              setLightboxIndex((index) =>
                index === null
                  ? null
                  : (index - 1 + visibleGallery.length) % visibleGallery.length,
              )
            }}
          >
            <ArrowLeft aria-hidden="true" className="size-7 sm:size-9" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="text-background absolute top-1/2 right-3 -translate-y-1/2 p-3 sm:right-6"
            onClick={(event) => {
              event.stopPropagation()
              setLightboxIndex((index) =>
                index === null ? null : (index + 1) % visibleGallery.length,
              )
            }}
          >
            <ArrowRight aria-hidden="true" className="size-7 sm:size-9" />
          </button>
          <Image
            src={selectedImage}
            alt={`Expanded gallery image ${(lightboxIndex ?? 0) + 1}`}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
