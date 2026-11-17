'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { SectionHeading } from '@/components/ui/section-heading'
import {
  QuickView,
  type FlowerGiftProduct,
} from '@/components/flowers-gifts/quick-view'
import { useInViewMotion } from '@/hooks/use-in-view-motion'
import { testimonials } from '@/lib/content'
import { work } from '@/data/work'
import { bouquets } from '@/data/bouquets'
import { gifts } from '@/data/gifts'
import { formatNpr } from '@/lib/pricing'
import heroImage from './front page/hero.jpeg'
import boq1Image from './front page/boq1.jpeg'
import boq2Image from './front page/boq2.jpeg'
import whyImage from './front page/why.jpeg'
import weddingImage from './images/Weeding1.jpeg'
import pasniImage from './images/pasni1.jpeg'
import bratabandhaImage from './images/barta1.jpg'
import receptionImage from './images/wr1.jpeg'
import haldiImage from './images/haldi1.jpg'
import birthdayImage from './images/bd1.jpeg'
import carImage from './images/car1.jpeg'

const image = '/placeholder.jpg'
const galleryImages = Object.values(
  import.meta.glob('./gallaryimg/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
) as string[]

const galleryCategories = [
  'Weddings',
  'Family Rituals',
  'Celebrations',
  'Vehicles',
] as const
const galleryItems = galleryImages.map((src, index) => ({
  src,
  category: galleryCategories[index % galleryCategories.length],
}))

const services = [
  {
    number: '01',
    name: 'Wedding',
    slug: 'wedding-decoration',
    image: weddingImage,
  },
  {
    number: '02',
    name: 'Pasni',
    slug: 'pasni-annaprashan',
    image: pasniImage,
  },
  {
    number: '03',
    name: 'Bratabandha',
    slug: 'bratabandha',
    image: bratabandhaImage,
  },
  {
    number: '04',
    name: 'Reception',
    slug: 'wedding-reception',
    image: receptionImage,
  },
  {
    number: '05',
    name: 'Haldi & Mehendi',
    slug: 'haldi-mehendi',
    image: haldiImage,
  },
  {
    number: '06',
    name: 'Birthday',
    slug: 'birthday-decoration',
    image: birthdayImage,
  },
  {
    number: '07',
    name: 'Car Decoration',
    slug: 'car-decoration',
    image: carImage,
  },
  {
    number: '08',
    name: 'Other events',
    slug: 'corporate-other-events',
    image,
  },
]
const process = [
  'Tell us your event on WhatsApp',
  'We share ideas and a quote',
  'We decorate with care',
  'You celebrate',
]

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function Page() {
  useInViewMotion()
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] =
    useState<FlowerGiftProduct | null>(null)
  const [galleryFilter, setGalleryFilter] = useState<
    'All' | (typeof galleryCategories)[number]
  >('All')
  const visibleGallery =
    galleryFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter)
  useEffect(() => {
    const timer = window.setInterval(
      () => setTestimonialIndex((i) => (i + 1) % testimonials.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    if (lightbox === null) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setLightbox(null)
      } else if (event.key === 'ArrowLeft') {
        setLightbox((index) =>
          index === null
            ? null
            : (index - 1 + visibleGallery.length) % visibleGallery.length,
        )
      } else if (event.key === 'ArrowRight') {
        setLightbox((index) =>
          index === null ? null : (index + 1) % visibleGallery.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox, visibleGallery.length])
  return (
    <main className="bg-background text-ink overflow-hidden">
      <section className="bg-ink text-background relative flex min-h-svh items-center">
        <Image
          src={heroImage}
          alt="Warm floral arrangement prepared in the Bagaicha studio"
          fill
          priority
          className="animate-float object-cover"
          sizes="100vw"
        />
        <div aria-hidden="true" className="bg-ink/50 absolute inset-0" />
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-32 pb-14 sm:px-10 lg:px-16 lg:pb-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-background mb-6">
              <span className="text-brand-gold">Bagaicha</span> / Flower decor
              &amp; events
            </p>
            <h1 className="font-display text-[clamp(4rem,10vw,9.5rem)] leading-[.82] font-light tracking-[-.055em]">
              Flowers for the days you&apos;ll{' '}
              <em className="text-brand-gold">remember.</em>
            </h1>
            <p className="text-background/75 mt-8 max-w-md text-sm leading-6">
              Wedding, pasni, bratabandha and every celebration in Pokhara,
              decorated by hand.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#services"
                className="bg-brand-green text-brand-white hover:bg-brand-green-deep inline-flex min-h-11 items-center gap-2 rounded-[2px] px-5 text-xs tracking-[.14em] uppercase"
              >
                Explore services <ArrowDown className="size-3.5" />
              </Link>
              <WhatsAppButton
                message="Namaste! I'm planning an event and would like help with decoration."
                variant="outline"
              >
                Plan on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
          <div className="text-background/75 hidden items-center gap-3 text-xs tracking-[.14em] uppercase [writing-mode:vertical-rl] lg:flex">
            <span>Pokhara, Nepal</span>
            <span className="bg-background/50 h-16 w-px" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-16 lg:py-32">
          <p className="font-display max-w-3xl text-4xl leading-[1.02] font-light tracking-[-.03em] sm:text-6xl">
            A flower studio for{' '}
            <em className="text-marigold-contrast">unforgettable</em>{' '}
            gatherings, where every petal has a place and every detail feels
            like you.
          </p>
          <div className="relative min-h-72">
            <Image
              src={boq1Image}
              alt="Bouquet arranged by Bagaicha"
              width={320}
              height={420}
              className="absolute top-4 left-8 h-64 w-48 object-cover sm:h-80 sm:w-60"
            />
            <Image
              src={boq2Image}
              alt="Floral bouquet detail by Bagaicha"
              width={280}
              height={350}
              className="absolute top-0 right-4 h-48 w-40 object-cover sm:h-60 sm:w-48"
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="services" className="border-line border-y">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="eyebrow">01 — What we decorate</p>
                <SectionHeading>
                  The <em>good</em> stuff.
                </SectionHeading>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-2 text-xs tracking-[.14em] uppercase underline-offset-4 hover:underline sm:flex"
              >
                View all services <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="grid auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[220px] sm:grid-cols-4">
              {services.map(
                ({ number, name, slug, image: serviceImage }, i) => (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className={`group bg-surface relative flex flex-col overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1 ${i === 0 ? 'row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''}`}
                  >
                    <div className="relative min-h-0 flex-1 overflow-hidden">
                      <Image
                        src={serviceImage}
                        alt={`${name} decoration by Bagaicha`}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="bg-background flex items-center justify-between px-3 py-3 sm:px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-ink-muted text-xs tracking-[.12em] uppercase">
                          {number}
                        </span>
                        <h3 className="font-display text-2xl">{name}</h3>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0" />
                    </div>
                  </Link>
                ),
              )}
            </div>
            <Link
              href="/services"
              className="mt-7 flex items-center gap-2 text-xs tracking-[.14em] uppercase sm:hidden"
            >
              View all services <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="mb-12">
            <div>
              <p className="eyebrow">02 — Flowers &amp; thoughtful gifts</p>
              <SectionHeading>
                Made for your <em>moments.</em>
              </SectionHeading>
            </div>
          </div>
          {[
            { name: 'Bouquets', type: 'bouquet', items: bouquets.slice(0, 3) },
            { name: 'Gifts', type: 'gift', items: gifts.slice(0, 3) },
          ].map((collection) => (
            <div key={collection.type} className="mb-12 last:mb-0">
              <div className="mb-5 flex items-end justify-between">
                <h3 className="font-display text-2xl">{collection.name}</h3>
                <Link
                  href="/flowers-gifts"
                  className="flex items-center gap-2 text-xs tracking-[.14em] uppercase underline-offset-4 hover:underline"
                >
                  Browse all <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {collection.items.map((product) => (
                  <article key={product.id} className="group">
                    <div className="bg-surface relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} from Bagaicha`}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </div>
                    <div className="border-line flex items-center justify-between gap-3 border-b py-4">
                      <div className="min-w-0">
                        <h3 className="font-display truncate text-2xl">
                          {product.name}
                        </h3>
                        <p className="text-brand-green mt-1 text-sm">
                          {formatNpr(product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="brand-button-primary bg-brand-green text-brand-white hover:bg-brand-green-deep border-brand-green inline-flex min-h-9 shrink-0 items-center justify-center rounded-[2px] border px-3 text-xs font-medium tracking-[.14em] uppercase transition-colors"
                      >
                        Order
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </Reveal>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:px-16 lg:py-28">
          <div
            className="motion-image-frame clip-reveal relative min-h-[420px] overflow-hidden"
            data-motion="why-image"
          >
            <Image
              src={whyImage}
              alt="Bagaicha team floral styling at an event"
              fill
              className="motion-image-scale object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div>
            <p className="eyebrow motion-label-clip" data-motion="why-label">
              Why Bagaicha
            </p>
            <h2 className="section-title mb-10">
              <span className="motion-line-mask">
                <span className="motion-line" data-motion="why-heading">
                  <em>Thoughtful</em> by nature.
                </span>
              </span>
            </h2>
            <div>
              {[
                [
                  '01',
                  'Fresh local flowers',
                  'Seasonal blooms, sourced close to home and chosen at their best.',
                ],
                [
                  '02',
                  'Custom themes',
                  'Your colours, your feeling, your little details, never a copy-paste setup.',
                ],
                [
                  '03',
                  'On-time setup',
                  'We arrive prepared, work quietly and leave you with one less thing to worry about.',
                ],
                [
                  '04',
                  'Fair, clear pricing',
                  'Honest quotes, clear options and no surprises hiding between the petals.',
                ],
              ].map(([n, title, copy]) => (
                <div
                  key={n}
                  className="border-line relative grid grid-cols-[42px_1fr] gap-4 border-t border-transparent py-5"
                >
                  <span
                    aria-hidden="true"
                    className="motion-draw-line motion-divider"
                    data-motion="why-divider"
                    style={
                      {
                        '--delay': `${(Number(n) - 1) * 120}ms`,
                      } as CSSProperties
                    }
                  />
                  <span
                    className="motion-stagger-child motion-number text-marigold-contrast text-xs tracking-[.12em] uppercase"
                    data-motion="why-number"
                    style={
                      {
                        '--delay': `${(Number(n) - 1) * 120}ms`,
                      } as CSSProperties
                    }
                  >
                    {n}
                  </span>
                  <div>
                    <h3
                      className="motion-stagger-child motion-copy font-display text-2xl"
                      data-motion="why-title"
                      style={
                        {
                          '--delay': `${(Number(n) - 1) * 120 + 120}ms`,
                        } as CSSProperties
                      }
                    >
                      {title}
                    </h3>
                    <p
                      className="motion-stagger-child motion-copy text-ink/65 mt-2 max-w-md text-sm leading-6"
                      data-motion="why-copy"
                      style={
                        {
                          '--delay': `${(Number(n) - 1) * 120 + 240}ms`,
                        } as CSSProperties
                      }
                    >
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <p className="eyebrow mb-3">
          <span className="motion-line-mask">
            <span className="motion-line" data-motion="how-label">
              How it works
            </span>
          </span>
        </p>
        <h2 className="section-title mb-14">
          <span className="motion-line-mask">
            <span className="motion-line" data-motion="how-heading">
              <em>Simple</em> from here.
            </span>
          </span>
        </h2>
        <div className="relative grid gap-8 sm:grid-cols-4 sm:gap-4">
          <div
            aria-hidden="true"
            className="motion-draw-line motion-timeline-line bg-line absolute top-[5px] right-0 left-0 h-px"
            data-motion="timeline-line"
          />
          {process.map((step, i) => (
            <div key={step} className="relative flex gap-4 sm:block">
              <span
                aria-hidden="true"
                className="motion-stagger-child motion-step-dot bg-marigold relative z-10 mt-[1px] size-[9px] shrink-0 rounded-full sm:absolute sm:top-0 sm:left-0"
                data-motion="step-dot"
                style={
                  {
                    '--delay': `${i * 300}ms`,
                  } as CSSProperties
                }
              />
              <div className="sm:pt-8">
                <span
                  className="motion-stagger-child motion-number text-gold-on-white text-xs tracking-[.12em] uppercase"
                  data-motion="step-number"
                  style={
                    {
                      '--delay': `${i * 300}ms`,
                    } as CSSProperties
                  }
                >
                  0{i + 1}
                </span>
                <h3
                  className="motion-stagger-child motion-copy font-display mt-1 max-w-40 text-2xl leading-none"
                  data-motion="step-title"
                  style={
                    {
                      '--delay': `${i * 300 + 150}ms`,
                    } as CSSProperties
                  }
                >
                  {step}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">A few beautiful things</p>
              <SectionHeading>
                From the <em>gallery.</em>
              </SectionHeading>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', ...galleryCategories] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`border px-3 py-2 text-xs tracking-[.14em] uppercase transition-colors ${galleryFilter === filter ? 'border-maroon bg-maroon text-background' : 'border-line hover:border-maroon'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {visibleGallery.slice(0, 8).map((item, i) => (
              <button
                key={`${item.src}-${i}`}
                onClick={() => setLightbox(i)}
                aria-label={`Open gallery image ${i + 1}`}
                className={`bg-surface relative overflow-hidden text-left transition-transform duration-500 ease-out hover:-translate-y-1 ${i === 0 || i === 5 ? 'aspect-[3/4]' : 'aspect-square'} ${i === 2 ? 'sm:col-span-2' : ''}`}
              >
                <Image
                  src={item.src}
                  alt={`Bagaicha ${item.category} detail ${i + 1}`}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/gallary"
              className="border-ink inline-flex items-center border-b pb-1 text-xs tracking-[.14em] uppercase"
            >
              Show more <ArrowUpRight className="ml-2 size-3" />
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:py-32 lg:px-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">Recent work</p>
              <SectionHeading>
                A few days we&apos;ve <em>decorated.</em>
              </SectionHeading>
            </div>
            <Link
              href="/work"
              className="hover:text-maroon hidden items-center gap-2 text-xs tracking-[.14em] uppercase sm:flex"
            >
              See all work <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {work.map((entry) => (
              <Link
                key={entry.slug}
                href={`/work/${entry.slug}`}
                className="group"
              >
                <div className="bg-surface relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={entry.photos[0]}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="clip-reveal object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display mt-4 text-2xl">{entry.title}</h3>
                <span className="text-ink/55 mt-1 block text-xs tracking-[.12em] uppercase">
                  {entry.eventType} · {entry.venue}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-line bg-background text-ink border-y">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10 lg:py-28">
            <p className="eyebrow">Words from happy people</p>
            <div className="min-h-44">
              <blockquote className="font-display mt-8 text-4xl leading-[.98] tracking-[-.03em] sm:text-6xl">
                &ldquo;{testimonials[testimonialIndex]?.quote}&rdquo;
              </blockquote>
              <span className="text-ink-muted mt-7 block text-xs tracking-[.12em] uppercase">
                {testimonials[testimonialIndex]?.name} ·{' '}
                {testimonials[testimonialIndex]?.event}
              </span>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setTestimonialIndex(i)}
                  className={`size-1.5 rounded-full ${i === testimonialIndex ? 'bg-brand-green' : 'bg-line'}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <section className="section-brand">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-24">
          <h2 className="font-display text-background max-w-2xl text-5xl leading-[.9] font-light tracking-[-.04em] sm:text-7xl">
            Tell us about your <em>celebration.</em>
          </h2>
          <WhatsAppButton
            message="Namaste! I'd like to discuss decoration for my event on [date]. Location: ____"
            className="border-background text-background hover:bg-background hover:text-sage"
          >
            Start a conversation <ArrowUpRight className="ml-2 size-4" />
          </WhatsAppButton>
        </div>
      </section>
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
          onAdded={() => setSelectedProduct(null)}
          offer={null}
        />
      )}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          className="bg-ink/90 fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="text-background absolute top-5 right-5"
            onClick={() => setLightbox(null)}
          >
            <X className="size-7" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            className="text-background absolute top-1/2 left-3 -translate-y-1/2 p-3 sm:left-6"
            onClick={(event) => {
              event.stopPropagation()
              setLightbox((index) =>
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
              setLightbox((index) =>
                index === null ? null : (index + 1) % visibleGallery.length,
              )
            }}
          >
            <ArrowRight aria-hidden="true" className="size-7 sm:size-9" />
          </button>
          <Image
            src={visibleGallery[lightbox]?.src ?? image}
            alt={`Enlarged Bagaicha gallery image ${lightbox + 1}`}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
