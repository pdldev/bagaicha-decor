import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import { SiteShell } from '@/components/layout/site-shell'
import { aboutStory, numbers, team, values } from '@/data/about'

export const metadata = {
  title: 'About us | Bagaicha Flower Decor and Events',
  description:
    'Meet Bagaicha, a flower decor and events studio rooted in Pokhara and grown around the celebrations that matter most.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About us | Bagaicha Flower Decor and Events',
    description:
      'Meet Bagaicha, a flower decor and events studio rooted in Pokhara and grown around the celebrations that matter most.',
    url: '/about',
    images: ['/placeholder.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/placeholder.jpg'] },
}

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="bg-background text-ink overflow-hidden">
        <section
          className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: '9rem', paddingBottom: '3rem' }}
        >
          <p className="eyebrow">About us</p>
          <h1 className="font-display mt-5 max-w-5xl text-[clamp(3.6rem,8vw,8.5rem)] leading-[.83] font-light tracking-[-.055em]">
            Rooted in <em className="text-marigold">Pokhara,</em> grown with
            every celebration.
          </h1>
          <div className="bg-surface relative mt-12 aspect-[16/7] overflow-hidden sm:mt-16">
            <Image
              src="/placeholder.jpg"
              alt="A Bagaicha floral celebration in Pokhara"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </section>

        <Reveal>
          <section className="border-line border-y">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1fr_.72fr] lg:gap-24 lg:px-16 lg:py-28">
              <div>
                <p className="eyebrow">Our story</p>
                <div className="text-ink/70 mt-10 max-w-xl space-y-6 text-sm leading-7">
                  {aboutStory.intro.map((paragraph, index) => (
                    <div key={paragraph}>
                      {index === 1 && (
                        <blockquote className="font-display text-ink my-12 -ml-1 text-4xl leading-[.95] font-light tracking-[-.03em] sm:text-5xl">
                          &ldquo;{aboutStory.quote}&rdquo;
                        </blockquote>
                      )}
                      <p>{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[500px] lg:min-h-[680px]">
                <Image
                  src="/placeholder.jpg"
                  alt="Flowers being prepared for a Bagaicha event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
            <p className="eyebrow">What we believe</p>
            <h2 className="section-title mb-14">
              Good work starts with good intentions.
            </h2>
            <div className="grid lg:grid-cols-3">
              {values.map((value, index) => (
                <article
                  key={value.number}
                  className={`py-6 lg:px-8 lg:py-2 ${index > 0 ? 'border-line border-t lg:border-t-0 lg:border-l' : 'lg:pl-0'}`}
                >
                  <span className="font-display text-marigold text-6xl font-light">
                    {value.number}
                  </span>
                  <h3 className="font-display mt-8 text-3xl leading-none">
                    {value.title}
                  </h3>
                  <p className="text-ink/65 mt-4 max-w-xs text-sm leading-6">
                    {value.copy}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-line bg-surface border-y">
            <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-10 sm:px-10 lg:grid-cols-4 lg:px-16">
              {numbers.map(([number, label], index) => (
                <div
                  key={label}
                  className={`py-4 ${index % 2 === 1 ? 'pl-5 sm:pl-8' : ''} ${index > 1 ? 'border-line border-t lg:border-t-0 lg:border-l lg:pl-8' : ''}`}
                >
                  <p className="font-display text-4xl leading-none font-light sm:text-5xl">
                    {number}
                  </p>
                  <p className="text-ink/55 mt-2 text-[10px] tracking-[.16em] uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">The team</p>
                <h2 className="section-title">The hands behind the blooms.</h2>
              </div>
              <p className="text-ink/60 max-w-xs text-sm leading-6">
                A small, thoughtful team making room for the details that make
                your day feel like yours.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-5">
              {team.map((person) => (
                <article key={person.role}>
                  <div className="bg-surface relative aspect-[4/5] overflow-hidden rounded-t-[50%]">
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.role}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-display mt-4 text-2xl leading-none">
                    {person.name}
                  </h3>
                  <p className="text-ink/55 mt-2 text-[10px] tracking-[.14em] uppercase">
                    {person.role}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-line border-y">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-16 lg:py-20">
              <div>
                <p className="eyebrow">Service area</p>
                <h2 className="font-display mt-4 max-w-sm text-4xl leading-[.92] font-light sm:text-5xl">
                  Close to home, ready to travel.
                </h2>
              </div>
              <div>
                <p className="text-ink/75 max-w-2xl text-lg leading-8">
                  We serve Pokhara, Lekhnath, Sarangkot and Lakeside, and travel
                  for destination events wherever your celebration takes us.
                </p>
                <div className="border-line text-ink/55 mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t pt-5 text-[10px] tracking-[.18em] uppercase">
                  <span>Pokhara</span>
                  <span>Lekhnath</span>
                  <span>Sarangkot</span>
                  <span>Lakeside</span>
                  <span>Destination events</span>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="bg-sage text-background">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:py-24">
            <div>
              <p className="text-background/60 text-[10px] tracking-[.24em] uppercase">
                Let&apos;s make something lovely
              </p>
              <h2 className="font-display mt-5 max-w-2xl text-5xl leading-[.88] font-light tracking-[-.04em] sm:text-7xl">
                Tell us what you&apos;re celebrating.
              </h2>
            </div>
            <WhatsAppButton
              message="Namaste! I'd like to know more about Bagaicha Flower Decor and Events."
              className="border-background text-background hover:bg-background hover:text-sage"
            >
              Start a conversation <ArrowUpRight className="ml-2 size-4" />
            </WhatsAppButton>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}
