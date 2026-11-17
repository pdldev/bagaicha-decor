import Link from 'next/link'
import { faqs } from '@/data/faqs'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { FaqHashNavigation } from './faq-hash-navigation'

const faqPresentation: Array<{
  id: string
  group: string
  faqIndex: number
  number: string
  whatsappText?: string
}> = [
  { id: 'booking-timing', group: 'Booking', faqIndex: 0, number: '01' },
  { id: 'custom-theme', group: 'Booking', faqIndex: 2, number: '02' },
  { id: 'flower-options', group: 'Booking', faqIndex: 3, number: '03' },
  {
    id: 'advance-payment',
    group: 'Pricing and payment',
    faqIndex: 4,
    number: '04',
  },
  {
    id: 'outside-pokhara',
    group: 'Delivery and venues',
    faqIndex: 1,
    number: '05',
  },
  {
    id: 'same-day-delivery',
    group: 'Delivery and venues',
    faqIndex: 5,
    number: '06',
  },
  {
    id: 'venue-decoration',
    group: 'Delivery and venues',
    faqIndex: 6,
    number: '07',
  },
]

const groups = [
  'Booking',
  'Pricing and payment',
  'Delivery and venues',
] as const

export function ContactFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-10 md:py-24 lg:grid-cols-12 lg:gap-14 lg:px-16"
    >
      <div className="lg:col-span-5">
        <p className="eyebrow">FAQ</p>
        <h2
          id="faq-heading"
          className="font-display max-w-xl text-4xl leading-tight sm:text-5xl"
        >
          Questions we&apos;re <em>asked</em> most often
        </h2>
      </div>
      <div className="lg:col-span-7">
        <FaqHashNavigation />
        {groups.map((group) => {
          const questions = faqPresentation
            .filter((presentation) => presentation.group === group)
            .map((presentation) => ({
              ...presentation,
              ...faqs[presentation.faqIndex],
            }))

          if (questions.length === 0) return null

          return (
            <div key={group}>
              <p className="eyebrow text-ink-muted border-line border-b py-4">
                {group}
              </p>
              {questions.map(
                ({ id, question, answer, number, whatsappText }) => (
                  <details
                    key={id}
                    id={`faq-${id}`}
                    className="group contact-faq-item border-line border-b"
                    style={{ scrollMarginTop: '100px' }}
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                      <span className="text-ink-muted w-7 shrink-0 text-xs tracking-[.12em] uppercase">
                        {number}
                      </span>
                      <h3 className="font-display flex-1 text-2xl">
                        {question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="text-maroon font-display ml-auto text-2xl transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-6 pl-11">
                      <p className="text-ink/75 max-w-2xl text-[17px] leading-7">
                        {answer}
                      </p>
                      {whatsappText && (
                        <a
                          href={buildWhatsAppUrl(whatsappText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-maroon mt-4 inline-block text-sm underline underline-offset-4"
                        >
                          Ask on WhatsApp about this
                        </a>
                      )}
                    </div>
                  </details>
                ),
              )}
            </div>
          )
        })}
        <div className="text-ink/60 flex flex-wrap gap-x-2 gap-y-1 pt-6 text-sm">
          <span>Delivery and payment details are on their own pages.</span>
          <Link
            className="text-maroon underline underline-offset-4"
            href="/delivery"
          >
            Delivery
          </Link>
          <Link
            className="text-maroon underline underline-offset-4"
            href="/payment"
          >
            Payment
          </Link>
        </div>
      </div>
    </section>
  )
}
