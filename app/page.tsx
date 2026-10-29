'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { testimonials } from '@/lib/content'
import { work } from '@/data/work'
import heroImage from './front page/fp1.jpg'
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
    slug: 'wedding',
    image: weddingImage,
  },
  { number: '02', name: 'Pasni', slug: 'pasni', image: pasniImage },
  {
    number: '03',
    name: 'Bratabandha',
    slug: 'bratabandha',
    image: bratabandhaImage,
  },
  {
    number: '04',
    name: 'Reception',
    slug: 'reception',
    image: receptionImage,
  },
  {
    number: '05',
    name: 'Haldi & Mehendi',
    slug: 'haldi-mehendi',
    image: haldiImage,
  },
  { number: '06', name: 'Birthday', slug: 'birthday', image: birthdayImage },
  {
    number: '07',
    name: 'Car Decoration',
    slug: 'car-decoration',
    image: carImage,
  },
  {
    number: '08',
    name: 'Other events',
    slug: 'other-events',
    image,
  },
]
const bouquets = [
  ['Marigold Morning', 'Rs. 2,500'],
  ['The Pokhara Posy', 'Rs. 3,800'],
  ['Rose & Eucalyptus', 'Rs. 4,200'],
  ['Sunset Bouquet', 'Rs. 2,800'],
  ['Wild Garden', 'Rs. 3,500'],
  ['A Little Celebration', 'Rs. 2,200'],
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
  const [flowerIndex, setFlowerIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
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
  const visibleBouquets = bouquets
    .slice(flowerIndex, flowerIndex + 3)
    .concat(bouquets.slice(0, Math.max(0, flowerIndex + 3 - bouquets.length)))
  return (
    <main className="bg-background text-ink overflow-hidden">
      <section className="bg-ink text-background relative flex min-h-[calc(100svh-76px)] items-end">
        <Image
          src={heroImage}
          alt="Warm floral arrangement prepared in the Bagaicha studio"
          fill
          priority
          className="animate-float object-cover opacity-50"
          sizes="100vw"
        />
        <div className="from-ink/85 via-ink/25 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl items-end justify-between px-6 pt-32 pb-14 sm:px-10 lg:px-16 lg:pb-20">
          <div className="max-w-4xl">
            <p className="text-background/70 mb-6 text-[10px] tracking-[.26em] uppercase">
              Bagaicha / Flower decor & events
            </p>
            <h1 className="font-display text-[clamp(4rem,10vw,9.5rem)] leading-[.82] font-light tracking-[-.055em]">
              Flowers for the days you&apos;ll{' '}
              <em className="text-marigold-contrast">remember.</em>
            </h1>
            <p className="text-background/75 mt-8 max-w-md text-sm leading-6">
              Wedding, pasni, bratabandha and every celebration in Pokhara,
              decorated by hand.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#services"
                className="bg-background text-ink animate-pulse-soft inline-flex min-h-11 items-center gap-2 rounded-[2px] px-5 text-[11px] tracking-[.16em] uppercase"
              >
                Explore services <ArrowDown className="size-3.5" />
              </Link>
              <WhatsAppButton
                message="Namaste! I'm planning an event and would like help with decoration."
                className="border-background text-background hover:bg-background hover:text-ink"
              >
                Plan on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
          <div className="text-background/60 hidden items-center gap-3 text-[10px] tracking-[.2em] uppercase [writing-mode:vertical-rl] lg:flex">
            <span>Pokhara, Nepal</span>
            <span className="bg-background/40 h-16 w-px" />
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
              src={image}
              alt="Flowers in soft natural light"
              width={320}
              height={420}
              className="absolute top-4 left-8 h-64 w-48 object-cover sm:h-80 sm:w-60"
            />
            <Image
              src={image}
              alt="Close detail of a floral arrangement"
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
                <p className="eyebrow">01: What we decorate</p>
                <h2 className="section-title">The good stuff.</h2>
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
                    className={`group bg-surface relative overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1 ${i === 0 ? 'row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''}`}
                  >
                    <Image
                      src={serviceImage}
                      alt={`${name} decoration by Bagaicha`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="from-ink/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    <div className="text-background absolute inset-x-4 bottom-4 flex items-end justify-between">
                      <div>
                        <span className="text-background/70 text-[10px]">
                          {number}
                        </span>
                        <p className="font-display text-2xl leading-none sm:text-3xl">
                          {name}
                        </p>
                        <p className="text-background/0 group-hover:text-background/75 mt-2 max-w-32 text-[10px] leading-4 transition">
                          Made personal, from first flower to final detail.
                        </p>
                      </div>
                      <ArrowUpRight className="size-5" />
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
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">02: From our flower studio</p>
              <h2 className="section-title">A little something lovely.</h2>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous flowers"
                onClick={() =>
                  setFlowerIndex(
                    (flowerIndex + bouquets.length - 1) % bouquets.length,
                  )
                }
                className="border-line hover:bg-surface rounded-full border p-2"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="Next flowers"
                onClick={() =>
                  setFlowerIndex((flowerIndex + 1) % bouquets.length)
                }
                className="border-line hover:bg-surface rounded-full border p-2"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {visibleBouquets.map(([name, price], i) => (
              <article key={`${name}-${i}`} className="group">
                <div className="bg-surface relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${name} bouquet`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="border-line flex items-center justify-between border-b py-4">
                  <div>
                    <h3 className="font-display text-2xl">{name}</h3>
                    <p className="text-ink/60 mt-1 text-xs">{price}</p>
                  </div>
                  <WhatsAppButton
                    message={`Namaste! I'd like to order the ${name} bouquet (${price}).`}
                    className="min-h-9 px-3 text-[9px]"
                  >
                    Order
                  </WhatsAppButton>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/flowers-gifts"
            className="mt-8 inline-flex items-center gap-2 text-xs tracking-[.14em] uppercase underline-offset-4 hover:underline"
          >
            See all flowers & gifts <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-surface">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:px-16 lg:py-28">
            <div className="relative min-h-[420px]">
              <Image
                src={image}
                alt="Bagaicha team floral styling at an event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div>
              <p className="eyebrow">Why Bagaicha</p>
              <h2 className="section-title mb-10">Thoughtful by nature.</h2>
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
                    className="border-line grid grid-cols-[42px_1fr] gap-4 border-t py-5"
                  >
                    <span className="text-marigold-contrast text-xs">{n}</span>
                    <div>
                      <h3 className="font-display text-2xl">{title}</h3>
                      <p className="text-ink/65 mt-2 max-w-md text-sm leading-6">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mb-14">Simple from here.</h2>
          <div className="relative grid gap-8 sm:grid-cols-4 sm:gap-4">
            <div className="bg-line absolute top-2 right-0 left-0 hidden h-px sm:block" />
            {process.map((step, i) => (
              <div key={step} className="relative flex gap-4 sm:block">
                <span className="border-background bg-marigold relative z-10 flex size-4 shrink-0 rounded-full border-4 sm:mb-5" />
                <div>
                  <span className="text-ink/45 text-[10px]">0{i + 1}</span>
                  <p className="font-display mt-1 max-w-40 text-2xl leading-none">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">A few beautiful things</p>
              <h2 className="section-title">From the gallery.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', ...galleryCategories] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`border px-3 py-2 text-[9px] tracking-[.14em] uppercase transition-colors ${galleryFilter === filter ? 'border-maroon bg-maroon text-background' : 'border-line hover:border-maroon'}`}
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
              className="border-ink inline-flex items-center border-b pb-1 text-[10px] tracking-[.16em] uppercase"
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
              <h2 className="section-title">
                A few days we&apos;ve decorated.
              </h2>
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
                <p className="font-display mt-4 text-2xl">{entry.title}</p>
                <p className="text-ink/55 mt-1 text-xs tracking-[.14em] uppercase">
                  {entry.eventType} · {entry.venue}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-line bg-maroon text-background border-y">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10 lg:py-28">
            <p className="eyebrow text-background/60">
              Words from happy people
            </p>
            <div className="min-h-44">
              <blockquote className="font-display mt-8 text-4xl leading-[.98] tracking-[-.03em] sm:text-6xl">
                &ldquo;{testimonials[testimonialIndex]?.quote}&rdquo;
              </blockquote>
              <p className="text-background/65 mt-7 text-xs tracking-[.18em] uppercase">
                {testimonials[testimonialIndex]?.name} ·{' '}
                {testimonials[testimonialIndex]?.event}
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setTestimonialIndex(i)}
                  className={`size-1.5 rounded-full ${i === testimonialIndex ? 'bg-marigold' : 'bg-background/35'}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <section className="bg-sage text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-24">
          <h2 className="font-display max-w-2xl text-5xl leading-[.9] font-light tracking-[-.04em] sm:text-7xl">
            Tell us about your celebration.
          </h2>
          <WhatsAppButton
            message="Namaste! I'd like to discuss decoration for my event on [date]. Location: ____"
            className="border-background text-background hover:bg-background hover:text-sage"
          >
            Start a conversation <ArrowUpRight className="ml-2 size-4" />
          </WhatsAppButton>
        </div>
      </section>
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          className="bg-ink/90 fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close gallery"
            className="text-background absolute top-5 right-5"
          >
            <X className="size-7" />
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
