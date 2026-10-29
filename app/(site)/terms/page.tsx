import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'Read the terms for using the Bagaicha Flower Decor and Events website.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of use',
    description:
      'Read the terms for using the Bagaicha Flower Decor and Events website.',
    url: '/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of use',
    description:
      'Read the terms for using the Bagaicha Flower Decor and Events website.',
  },
}

export default function TermsPage() {
  return (
    <main className="bg-background text-ink">
      <article className="mx-auto max-w-3xl px-6 py-32 sm:px-10">
        <p className="eyebrow">Website information</p>
        <h1 className="section-title">Terms of use</h1>
        <p className="text-ink/65 mt-6 text-sm leading-7">
          These terms explain how to use the Bagaicha Flower Decor and Events
          website.
        </p>

        <div className="mt-12 space-y-10 text-sm leading-7">
          <section>
            <h2 className="font-display text-3xl">Website content</h2>
            <p className="text-ink/70 mt-3">
              The website shares general information about our services,
              products and catalogues. Images, availability and displayed prices
              are for illustration and enquiry purposes; they do not confirm
              stock, a booking or a final quote.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Bookings and enquiries</h2>
            <p className="text-ink/70 mt-3">
              Sending an enquiry does not reserve a date or create an order.
              Scope, availability, pricing, payment and booking details are
              confirmed directly with Bagaicha before any work is agreed.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">External services</h2>
            <p className="text-ink/70 mt-3">
              Links to WhatsApp, maps and social networks are provided for
              convenience. Those services are operated by others and have their
              own terms and privacy practices.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Contact</h2>
            <p className="text-ink/70 mt-3">
              Questions about these terms? Please use our{' '}
              <a className="text-maroon underline" href="/contact">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
