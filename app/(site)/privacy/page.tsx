import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'Learn how Bagaicha Flower Decor and Events handles website enquiries, local storage and optional analytics.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy policy',
    description:
      'Learn how Bagaicha handles website enquiries, local storage and optional analytics.',
    url: '/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy policy',
    description:
      'Learn how Bagaicha handles website enquiries, local storage and optional analytics.',
  },
}

export default function PrivacyPage() {
  return (
    <main className="bg-background text-ink">
      <article className="mx-auto max-w-3xl px-6 py-32 sm:px-10">
        <p className="eyebrow">Privacy</p>
        <h1 className="section-title">Privacy policy</h1>
        <p className="text-ink/65 mt-6 text-sm leading-7">
          This page explains what happens when you browse the Bagaicha Flower
          Decor and Events website or contact us through it.
        </p>

        <div className="mt-12 space-y-10 text-sm leading-7">
          <section>
            <h2 className="font-display text-3xl">Information you share</h2>
            <p className="text-ink/70 mt-3">
              Enquiry forms prepare a message for WhatsApp; they do not submit
              it to a Bagaicha server. Nothing is sent until you choose to open
              WhatsApp and send the message. WhatsApp then handles that
              information under its own privacy policy. You can also contact us
              directly by phone or email.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Browser storage</h2>
            <p className="text-ink/70 mt-3">
              The enquiry shortlist is stored in your browser so it remains
              available on a later visit. This feature does not create a
              Bagaicha account or send shortlist contents to our servers.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Analytics</h2>
            <p className="text-ink/70 mt-3">
              We do not use website analytics. No analytics choice is stored in
              your browser.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Contact</h2>
            <p className="text-ink/70 mt-3">
              For privacy questions, contact Bagaicha using the details on our{' '}
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
