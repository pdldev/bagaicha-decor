import type { Metadata } from 'next'
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ContactForm } from './contact-form'
import { site } from '@/config/site'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact | Bagaicha Flower Decor and Events',
  description:
    'Plan your flowers, decor and next celebration with Bagaicha in Pokhara.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Bagaicha Flower Decor and Events',
    description:
      'Plan your flowers, decor and next celebration with Bagaicha in Pokhara.',
    url: '/contact',
    images: ['/placeholder.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Bagaicha Flower Decor and Events',
    description:
      'Plan your flowers, decor and next celebration with Bagaicha in Pokhara.',
    images: ['/placeholder.jpg'],
  },
}

const faqs = [
  [
    'How early should I book?',
    'For weddings and larger celebrations, six to eight weeks gives us the best room to plan. Smaller events may be possible with less notice, so please ask.',
  ],
  [
    'Do you travel outside Pokhara?',
    'Yes. We regularly work around Pokhara and can travel for destination events. Travel and logistics are quoted clearly in your proposal.',
  ],
  [
    'Can I customise a theme?',
    'Absolutely. Share your colours, references, rituals and budget; we will shape a considered direction around them.',
  ],
  [
    'Do you provide fresh or artificial flowers?',
    'We prefer fresh flowers wherever they make sense. We can also thoughtfully combine quality artificial blooms or reusable details when needed.',
  ],
  [
    'How do advance payments work?',
    'We confirm a booking with an advance after the scope and quote are agreed. The remaining balance and due dates are shared before we begin.',
  ],
  [
    'Do you deliver bouquets the same day?',
    'Same-day bouquet delivery depends on availability and delivery distance. WhatsApp us early in the day and we will tell you honestly what is possible.',
  ],
  [
    'Can you decorate at my venue/home?',
    'Yes. Homes, halls, gardens, hotels and intimate venues are all part of our work. We visit or review photos when planning needs it.',
  ],
]

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    "Namaste! I'd like to know more about Bagaicha Flower Decor and Events.",
  )
  const directions =
    'https://www.google.com/maps/place/Bagaicha+Flower+Decor+and+Events/@28.2137034,83.9853956,21z/data=!4m6!3m5!1s0x399595004494c103:0x3ee580a9bf868db!8m2!3d28.2136786!4d83.9853726!16s%2Fg%2F11xnw2k0yq?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pokhara',
      addressRegion: 'Gandaki Pradesh',
      addressCountry: 'NP',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 28.2096, longitude: 83.9856 },
    openingHours: 'Su-Sa 09:00-19:00',
    telephone: site.phone,
    sameAs: Object.values(site.socialLinks).filter(Boolean),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-16 sm:px-10 sm:pt-24">
        <p className="eyebrow">Contact</p>
        <h1 className="font-display mt-5 max-w-4xl text-[clamp(3.6rem,9vw,8rem)] leading-[.84] font-light tracking-[-.06em]">
          Let&apos;s plan something <em className="text-maroon">beautiful.</em>
        </h1>
        <p className="text-ink/70 mt-8 max-w-sm text-sm leading-7">
          Fastest reply is on WhatsApp.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="eyebrow">Find us here</p>
          <div className="divide-line border-line mt-5 divide-y border-y">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-maroon flex items-center justify-between py-5 text-lg"
            >
              <span>WhatsApp</span>
              <span className="text-maroon text-xs tracking-[.15em] uppercase">
                Chat with us ↗
              </span>
            </a>
            <a href={`tel:${site.phone}`} className="block py-5 text-sm">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block py-5 text-sm">
              {site.email}
            </a>
            <p className="py-5 text-sm leading-6">{site.address}</p>
            <p className="py-5 text-sm leading-6">{site.openingHours}</p>
          </div>
          <p className="text-ink/70 mt-8 text-sm leading-7">
            Visit our studio by appointment. We&apos;d love to talk through your
            flowers over a cup of tea.
          </p>
          <div className="text-maroon mt-8 flex gap-5 text-xs tracking-[.16em] uppercase">
            {Object.entries(site.socialLinks).map(([name, href]) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="hover:text-sage"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </section>
      <section className="border-line border-y">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 className="font-display mt-3 max-w-xl text-5xl leading-none font-light">
              Come find us.
            </h2>
            <p className="text-ink/70 mt-5 max-w-lg text-sm leading-7">
              Serving Pokhara, Lekhnath, Sarangkot and Lakeside, with travel
              available for destination events across Nepal.
            </p>
            <p className="text-maroon mt-6 text-xs tracking-[.16em] uppercase">
              Pokhara · Lekhnath · Sarangkot · Lakeside · Destination events
            </p>
          </div>
          <a
            href={directions}
            target="_blank"
            rel="noreferrer"
            className="text-maroon text-sm underline underline-offset-4"
          >
            Get directions ↗
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-10">
          <iframe
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bagaicha Flower Decor and Events location map"
            src={site.googleMapsEmbed}
            className="h-64 w-full border-0 grayscale sm:h-80"
          />
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-24 sm:px-10">
        <p className="eyebrow">Questions, answered</p>
        <h2 className="section-title">Before you say hello.</h2>
        <Accordion className="mt-10 w-full">
          {faqs.map(([question, answer], index) => (
            <AccordionItem key={question} value={`faq-${index}`}>
              <AccordionTrigger className="font-display py-6 text-left text-2xl font-light">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-ink/70 max-w-2xl text-sm leading-7">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section className="bg-maroon text-background px-5 py-16 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-background/70 text-xs tracking-[.2em] uppercase">
              A little flower talk?
            </p>
            <h2 className="font-display mt-4 max-w-xl text-5xl leading-none font-light sm:text-6xl">
              Let&apos;s make something that feels like you.
            </h2>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="border-background/50 w-fit border-b pb-2 text-sm"
          >
            WhatsApp us ↗
          </a>
        </div>
      </section>
    </main>
  )
}
