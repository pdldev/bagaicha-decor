'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { services, type ServiceCategory } from '@/lib/content'

type Filter = 'All' | ServiceCategory
const filters: Filter[] = [
  'All',
  'Weddings',
  'Family Rituals',
  'Celebrations',
  'Vehicles',
]

export function ServicesClient() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible =
    filter === 'All'
      ? services
      : services.filter((service) => service.category === filter)
  return (
      <main className="bg-background text-ink overflow-hidden">
        <section className="mx-auto max-w-7xl px-6 pt-36 pb-10 sm:px-10 lg:px-16 lg:pb-16">
          <p className="eyebrow">Our services</p>
          <h1 className="font-display mt-5 max-w-4xl text-[clamp(3.8rem,9vw,8.5rem)] leading-[.82] font-light tracking-[-.055em]">
            Every ceremony, <em className="text-marigold">beautifully</em>{' '}
            dressed.
          </h1>
          <div className="border-line mt-12 flex flex-wrap gap-2 border-t pt-5">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`border px-4 py-2 text-[10px] tracking-[.16em] uppercase transition-colors ${filter === item ? 'border-maroon bg-maroon text-background' : 'border-line hover:border-maroon'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
        <section className="border-line border-t">
          {visible.map((service, index) => (
            <article key={service.slug} className="border-line border-b">
              <div
                className={`mx-auto grid max-w-7xl lg:grid-cols-2 ${index % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}
              >
                <div className="bg-surface relative aspect-[4/3] min-h-[260px] lg:aspect-auto lg:min-h-[470px]">
                  <Image
                    src={service.heroImage}
                    alt={`${service.name} floral decoration`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
                  <p className="text-maroon text-[10px] tracking-[.2em]">
                    0{index + 1}
                  </p>
                  <h2 className="font-display mt-5 text-5xl leading-[.88] font-light tracking-[-.04em] sm:text-6xl">
                    {service.name}
                  </h2>
                  <p className="text-ink/65 mt-6 max-w-md text-sm leading-7">
                    {service.shortDescription}
                  </p>
                  <p className="font-display text-maroon mt-8 text-2xl">
                    {service.startingPrice}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="border-ink inline-flex items-center border-b pb-1 text-[10px] tracking-[.16em] uppercase"
                    >
                      View details <ArrowUpRight className="ml-2 size-3" />
                    </Link>
                    <WhatsAppButton
                      message={`Namaste! I'd like to enquire about ${service.name}.`}
                      variant="outline"
                      className="border-0 px-0 text-[10px] tracking-[.16em] uppercase"
                    >
                      Enquire on WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
  )
}
