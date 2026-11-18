import type { Metadata } from 'next'
import { Camera, Music2, ThumbsUp } from 'lucide-react'
import { ContactFaq } from '@/components/contact/contact-faq'
import { ContactMap } from '@/components/contact/contact-map'
import { ContactForm } from './contact-form'
import { site } from '@/config/site'
import {
  getContactOpeningStatus,
  getKathmanduDate,
} from '@/lib/contact/opening-hours'
import { buildWhatsAppUrl, greetingMessage } from '@/lib/whatsapp'
import { buildMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { faqs } from '@/data/faqs'
import { site as dataSite } from '@/data/site'

const pageTitle = 'Contact | Bagaicha Flower Decor and Events, Pokhara'
const pageDescription =
  'Contact Bagaicha Flower Decor and Events in Pokhara for weddings, pasni, bratabandha and celebrations. Message us on WhatsApp for a quick reply.'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact Bagaicha Flower Decor and Events in Pokhara for weddings, pasni, bratabandha and celebrations via WhatsApp.',
  path: '/contact',
  image: '/placeholder.jpg',
})

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(greetingMessage())
  const closingWhatsappUrl = buildWhatsAppUrl(
    'Namaste! I have a question about my event.',
  )
  const now = new Date()
  const openingStatus = getContactOpeningStatus(now)
  const earliestDate = getKathmanduDate(now)
  const socials = [
    { name: 'Instagram', href: site.socialLinks.instagram, Icon: Camera },
    { name: 'Facebook', href: site.socialLinks.facebook, Icon: ThumbsUp },
    { name: 'TikTok', href: site.socialLinks.tiktok, Icon: Music2 },
  ]
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${dataSite.url}/#localbusiness`,
    additionalType: [
      'https://schema.org/Florist',
      'https://schema.org/EventPlanner',
    ],
    name: site.name,
    description: 'Flower decor and event styling for celebrations in Pokhara.',
    telephone: site.phone,
    email: site.email,
    url: dataSite.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dataSite.address.streetAddress,
      addressLocality: dataSite.address.addressLocality,
      addressRegion: dataSite.address.addressRegion,
      addressCountry: dataSite.address.addressCountry,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '07:00',
      closes: '19:00',
    },
    areaServed: ['Pokhara', 'Lekhnath', 'Sarangkot', 'Lakeside'],
    sameAs: dataSite.sameAs,
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <main className="pb-[calc(120px+env(safe-area-inset-bottom))] md:pb-0">
      <JsonLd data={[localBusinessLd, faqLd]} />

      <header className="border-line mx-auto grid max-w-7xl gap-8 border-b px-6 pt-16 pb-10 sm:px-10 md:grid-cols-[1fr_auto] md:items-end md:pt-24 lg:px-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] font-normal md:text-[64px]">
            Let&apos;s plan something <em>beautiful.</em>
          </h1>
          <p className="text-ink/75 mt-5 max-w-lg text-lg leading-7">
            The fastest reply is on WhatsApp.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-green text-brand-white hover:bg-brand-green-deep inline-flex min-h-12 items-center justify-center rounded-[2px] px-6 text-xs tracking-[.14em] uppercase"
          >
            Message us on WhatsApp
          </a>
          <span className="text-ink/60 text-xs tracking-[.14em] uppercase">
            {site.phone}
          </span>
        </div>
      </header>

      <section
        aria-labelledby="contact-details-heading"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-10 md:py-16 lg:grid-cols-12 lg:gap-14 lg:px-16"
      >
        <div className="lg:col-span-5">
          <h2 id="contact-details-heading" className="sr-only">
            Contact <em>details</em>
          </h2>
          <dl className="border-line divide-line divide-y border-y">
            <div className="py-5">
              <dt className="eyebrow text-ink-muted">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-maroon text-[32px]"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow text-ink-muted">Phone</dt>
              <dd className="font-display mt-1 text-2xl">
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>
                  {site.phone}
                </a>
              </dd>
            </div>
            {site.email && (
              <div className="py-5">
                <dt className="eyebrow text-ink-muted">Email</dt>
                <dd className="font-display mt-1 text-2xl">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
            )}
            <div className="py-5">
              <dt className="eyebrow text-ink-muted">Address</dt>
              <dd className="text-ink/85 mt-2 text-sm leading-6">
                {site.address}
              </dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow text-ink-muted">Opening hours</dt>
              <dd className="mt-2">
                <p className="text-ink/85 text-sm leading-6">
                  {site.openingHours}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm leading-6">
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full ${openingStatus.isOpen ? 'bg-brand-green' : 'bg-red-600'}`}
                  />
                  {openingStatus.label}
                </p>
              </dd>
            </div>
            <div className="py-5">
              <dt className="eyebrow text-ink-muted">Social</dt>
              <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink/75 decoration-line inline-flex items-center gap-2 underline underline-offset-4"
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.6} />
                    {name}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactForm earliestDate={earliestDate} />
        </div>
      </section>

      <section
        aria-labelledby="map-heading"
        className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16"
      >
        <h2 id="map-heading" className="sr-only">
          Find <em>Bagaicha</em> Flower Decor and Events
        </h2>
        <div className="border-line border-t-brand-green border border-t-4">
          <div>
            <ContactMap src={site.googleMapsEmbed} />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
          <p className="text-ink/70 text-sm">{site.address}</p>
          <a
            href={site.googleMapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon w-fit border-b border-current pb-1"
          >
            Get directions
          </a>
        </div>
      </section>

      <ContactFaq />

      <section
        aria-labelledby="closing-heading"
        className="section-brand px-6 py-16 sm:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rule-gold mb-4 w-10" />
          <div className="mt-4 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-brand-gold">Ready when you are</p>
              <h2
                id="closing-heading"
                className="font-display text-background max-w-3xl text-4xl leading-tight font-normal md:text-[56px]"
              >
                Tell us about your{' '}
                <em className="text-brand-gold">celebration.</em>
              </h2>
            </div>
            <a
              href={closingWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-button-primary inline-flex min-h-12 items-center justify-center rounded-[2px] px-6 text-xs tracking-[.14em] uppercase"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
