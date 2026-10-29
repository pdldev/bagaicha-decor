import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getWork, work } from '@/data/work'

export function generateStaticParams() {
  return work.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getWork(slug)
  if (!entry) return {}

  return {
    title: entry.title,
    description: entry.story,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: entry.title,
      description: entry.story,
      url: `/work/${slug}`,
      images: [`/og/work/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.story,
      images: [`/og/work/${slug}`],
    },
  }
}
export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getWork(slug)
  if (!entry) notFound()
  return (
    <main className="bg-background text-ink">
      <section className="mx-auto max-w-7xl px-6 pt-40 pb-20 sm:px-10 md:pt-48 md:pb-32 lg:px-16">
        <Link
          href="/work"
          className="hover:text-maroon inline-flex items-center gap-2 text-xs tracking-[.14em] uppercase"
        >
          <ArrowLeft className="size-4" /> Recent work
        </Link>
        <p className="eyebrow mt-16">
          {entry.eventType} · {entry.venue} · {entry.date}
        </p>
        <h1 className="section-title max-w-5xl">{entry.title}</h1>
        <p className="text-ink/70 mt-8 max-w-2xl text-base leading-7">
          {entry.story}
        </p>
        <div className="mt-16 grid grid-cols-2 gap-2 md:grid-cols-4">
          {entry.photos.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`bg-surface relative overflow-hidden ${index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
            >
              <Image
                src={src}
                alt={`${entry.title}, detail ${index + 1}`}
                fill
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxwYXRoIGZpbGw9IiNlOGU0ZDUiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+"
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-8 border-t pt-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Theme</p>
            <p className="mt-2 text-sm">{entry.theme}</p>
          </div>
          <div>
            <p className="eyebrow">Flowers</p>
            <p className="mt-2 text-sm">{entry.flowers.join(' · ')}</p>
          </div>
          <div>
            <p className="eyebrow">Venue</p>
            <p className="mt-2 text-sm">{entry.venue}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
