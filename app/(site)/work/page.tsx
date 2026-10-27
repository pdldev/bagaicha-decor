import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { work } from '@/data/work'

export const metadata: Metadata = { title: 'Recent work', description: 'A few weddings, family rituals and celebrations decorated by Bagaicha in Pokhara and beyond.', alternates: { canonical: '/work' }, openGraph: { images: ['/og/work'] }, twitter: { images: ['/og/work'] } }

export default function WorkPage() {
  return <main className="bg-background text-ink"><section className="mx-auto max-w-7xl px-6 pb-20 pt-40 sm:px-10 md:pb-32 md:pt-48 lg:px-16"><p className="eyebrow">Recent work</p><h1 className="section-title max-w-4xl">Flowers that found their place.</h1><p className="text-ink/65 mt-8 max-w-lg text-sm leading-6">A look at a few celebrations we have decorated around Pokhara. Every setup begins with the people, the place and the feeling of the day.</p><div className="mt-16 grid gap-10 md:grid-cols-2">{work.map((entry) => <Link key={entry.slug} href={`/work/${entry.slug}`} className="group"><div className="bg-surface relative aspect-[4/3] overflow-hidden"><Image src={entry.photos[0]} alt={entry.title} fill placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxwYXRoIGZpbGw9IiNlOGU0ZDUiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /></div><div className="border-line flex items-start justify-between border-b py-5"><div><p className="eyebrow">{entry.eventType} · {entry.venue}</p><h2 className="font-display mt-2 text-3xl">{entry.title}</h2></div><ArrowUpRight className="size-5" /></div></Link>)}</div></section></main>
}
