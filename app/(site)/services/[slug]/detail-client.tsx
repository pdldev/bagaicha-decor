'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowUpRight, Check, X } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { services, type Service } from '@/lib/content'

const schema = z.object({
  date: z.string().min(1, 'Please choose a date.'),
  venue: z.string().min(2, 'Tell us where the celebration will be.'),
  guests: z.string().optional(),
  budget: z.string().optional(),
  theme: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export function ServiceDetail({ service }: { service: Service }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const onSubmit = (values: FormValues) => {
    const message = `Namaste Bagaicha Flower Decor! I'd like to book *${service.name}*.\nDate: ${values.date}\nVenue: ${values.venue}\nGuests: ${values.guests || 'Not decided'}\nBudget: ${values.budget || 'Not decided'}\nTheme/Colours: ${values.theme || 'Open to ideas'}\nPlease share ideas and a quote.`
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }
  return (
    <SiteShell>
      <main className="bg-background text-ink overflow-hidden">
        <section className="bg-surface relative mx-auto mt-24 min-h-[65vh] max-w-[1400px] sm:mt-28">
          <Image
            src={service.heroImage}
            alt={`${service.name} decoration`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="from-ink/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <div className="text-background absolute inset-x-0 bottom-0 p-6 sm:p-12 lg:p-16">
            <Link
              href="/services"
              className="text-background/75 mb-8 inline-flex items-center text-[10px] tracking-[.18em] uppercase"
            >
              <ArrowLeft className="mr-2 size-3" /> All services
            </Link>
            <p className="text-background/70 text-[10px] tracking-[.22em] uppercase">
              {service.category}
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-6xl leading-[.85] font-light tracking-[-.05em]">
              {service.name}
            </h1>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-16 lg:py-28">
          <div>
            <p className="eyebrow">The details</p>
            <p className="text-maroon mt-6 text-[10px] tracking-[.18em] uppercase">
              Ideal for
            </p>
            <p className="text-ink/65 mt-3 max-w-xs text-sm leading-6">
              {service.idealFor}
            </p>
          </div>
          <div>
            <p className="font-display max-w-2xl text-4xl leading-[.95] font-light sm:text-5xl">
              {service.longDescription}
            </p>
            <div className="mt-16">
              <p className="eyebrow">What&apos;s included</p>
              <div className="border-line mt-6 grid border-t sm:grid-cols-2">
                {service.inclusions.map((item) => (
                  <div
                    key={item}
                    className="border-line text-ink/70 flex gap-3 border-b py-4 text-sm"
                  >
                    <Check className="text-marigold mt-0.5 size-4" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
          <div className="mb-8">
            <p className="eyebrow">A closer look</p>
            <h2 className="section-title">Made for your photographs.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {service.gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setLightbox(index)}
                className={`bg-surface relative overflow-hidden ${index === 0 ? 'col-span-2 aspect-[16/9] sm:col-span-2' : 'aspect-square'}`}
              >
                <Image
                  src={image}
                  alt={`${service.name} detail ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </button>
            ))}
          </div>
        </section>
        <section className="border-line bg-surface border-y">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:px-16 lg:py-24">
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h2 className="font-display mt-5 max-w-sm text-5xl leading-[.88] font-light">
                Plan your {service.name.toLowerCase()}.
              </h2>
              <p className="text-ink/60 mt-6 text-sm leading-6">
                Share a few details and we&apos;ll reply with ideas and a
                thoughtful quote.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-5 sm:grid-cols-2"
            >
              {(
                [
                  {
                    name: 'date',
                    label: 'Date',
                    type: 'date',
                    placeholder: undefined,
                  },
                  {
                    name: 'venue',
                    label: 'Venue / location',
                    type: 'text',
                    placeholder: 'Where will it be?',
                  },
                  {
                    name: 'guests',
                    label: 'Approximate guests',
                    type: 'text',
                    placeholder: 'e.g. 120',
                  },
                  {
                    name: 'theme',
                    label: 'Theme / colour preference',
                    type: 'text',
                    placeholder: 'Tell us what you are imagining',
                  },
                ] as const
              ).map((field) => (
                <label
                  key={field.name}
                  className={`flex flex-col gap-2 text-[10px] tracking-[.16em] uppercase ${field.name === 'theme' ? 'sm:col-span-2' : ''}`}
                >
                  {field.label}
                  <input
                    type={field.type}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    className="border-line placeholder:text-ink/35 focus:border-maroon border-b bg-transparent py-3 text-sm tracking-normal normal-case outline-none"
                  />
                  {errors[field.name] && (
                    <span className="text-maroon text-xs tracking-normal normal-case">
                      {errors[field.name]?.message}
                    </span>
                  )}
                </label>
              ))}
              <label className="flex flex-col gap-2 text-[10px] tracking-[.16em] uppercase">
                Budget range
                <select
                  {...register('budget')}
                  className="border-line focus:border-maroon border-b bg-transparent py-3 text-sm tracking-normal normal-case outline-none"
                >
                  <option value="">Choose a range</option>
                  <option>Under Rs. 25,000</option>
                  <option>Rs. 25,000 – 75,000</option>
                  <option>Rs. 75,000 – 1,50,000</option>
                  <option>Above Rs. 1,50,000</option>
                </select>
              </label>
              <button
                type="submit"
                className="bg-maroon text-background hover:bg-ink mt-3 inline-flex w-fit items-center px-5 py-3 text-[10px] tracking-[.17em] uppercase transition-colors"
              >
                Send on WhatsApp <ArrowUpRight className="ml-2 size-3" />
              </button>
            </form>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <p className="eyebrow">You may also like</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services
              .filter((item) => item.slug !== service.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  href={`/services/${item.slug}`}
                  key={item.slug}
                  className="group"
                >
                  <div className="bg-surface relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.heroImage}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                  <h3 className="font-display mt-4 text-3xl font-light">
                    {item.name}
                  </h3>
                </Link>
              ))}
          </div>
        </section>
        <div className="border-line bg-background fixed inset-x-0 bottom-0 z-20 border-t p-3 sm:hidden">
          <WhatsAppButton
            message={`Namaste! I'd like to enquire about ${service.name}.`}
            className="bg-maroon text-background w-full justify-center"
          >
            Enquire about {service.name}
          </WhatsAppButton>
        </div>
        {lightbox !== null && (
          <div
            className="bg-ink/90 fixed inset-0 z-50 flex items-center justify-center p-5"
            role="dialog"
            aria-label="Expanded gallery image"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close image"
              className="text-background absolute top-5 right-5"
              onClick={() => setLightbox(null)}
            >
              <X />
            </button>
            <div
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={service.gallery[lightbox]}
                alt={`${service.name} enlarged detail`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>
        )}
      </main>
    </SiteShell>
  )
}
