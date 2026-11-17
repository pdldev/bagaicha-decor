'use client'

import Image from 'next/image'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import {
  bouquets,
  getActiveOffer,
  gifts,
  type Bouquet,
  type Gift,
  type Offer,
} from '@/lib/content'
import { useEnquiryStore } from '@/store/enquiry'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { formatNpr, formatOfferPrice, getOfferPrice } from '@/lib/pricing'
import { offerQuerySchema } from '@/lib/schemas/offer'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { QuickView } from '@/components/flowers-gifts/quick-view'

const whatsapp = buildWhatsAppUrl
const money = formatNpr
type Product = Bouquet | Gift

function productMessage(
  product: Product,
  price: number,
  size = '',
  quantity = 1,
  details = '',
  offer: Offer | null = null,
) {
  const offerPrice = getOfferPrice({ ...product, price }, offer)
  return `Namaste Bagaicha Flower Decor! I'd like to order:\n*${product.name}*${size ? ` (${size})` : ''}\nPrice: ${formatOfferPrice(offerPrice, offer)}\nQuantity: ${quantity}\nDelivery location: ${details || '____'}\nDelivery date/time: ____\nCard message (optional): ____`
}

function ProductCard({
  product,
  onOpen,
  onAdded,
  offer,
}: {
  product: Product
  onOpen: (product: Product) => void
  onAdded: (name: string) => void
  offer: Offer | null
}) {
  const { addItem } = useEnquiryStore()
  const price = product.price == null ? null : getOfferPrice(product, offer)
  const soldOut = 'inStock' in product && !product.inStock
  const image = product.image
  const blurDataURL = typeof image === 'string' ? undefined : image.blurDataURL
  const isGift = 'tags' in product
  return (
    <article
      className={`group ${isGift ? 'border-line border p-3 sm:p-4' : ''}`}
    >
      <button
        type="button"
        className="focus-visible:outline-brand-gold block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name}`}
      >
        {soldOut && (
          <span className="text-ink-muted mb-2 block text-left text-xs tracking-[.12em] uppercase">
            Sold out
          </span>
        )}
        <div className="bg-surface relative aspect-[4/5] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={`${product.name} — ${product.description}`}
              fill
              sizes="(max-width: 639px) calc(50vw - 24px), (max-width: 1023px) calc(50vw - 32px), 384px"
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
              className="pointer-events-none object-cover object-center transition-transform duration-700 lg:group-hover:scale-[1.03]"
            />
          ) : (
            <div className="text-ink-muted flex size-full items-center justify-center text-sm">
              Photo coming soon
            </div>
          )}
        </div>
      </button>
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="focus-visible:outline-brand-gold mt-4 block max-w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <h3 className="font-display text-ink line-clamp-2 text-xl">
          {product.name}
        </h3>
      </button>
      <div className="font-display text-brand-green mt-2 text-3xl">
        {price ? (
          <>
            {price.discounted && (
              <del className="text-ink-muted mr-2 text-xs">
                <span className="sr-only">Was </span>
                {money(price.original)}
              </del>
            )}
            {money(price.final)}
          </>
        ) : (
          'Price on request'
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="focus-visible:outline-brand-gold bg-brand-green text-brand-white hover:bg-brand-green-deep inline-flex min-h-10 items-center justify-center rounded-[2px] px-4 text-xs tracking-[.14em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {soldOut ? 'Ask about availability' : 'Order now'}
        </button>
        <button
          type="button"
          onClick={() => {
            addItem({ id: product.id })
            onAdded(product.name)
          }}
          className="focus-visible:outline-brand-gold text-ink-muted text-xs tracking-[.14em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Add to enquiry
        </button>
      </div>
    </article>
  )
}

type ShopTab = 'bouquets' | 'gifts'
type SortOrder = 'featured' | 'low' | 'high'

function FilterBar({
  tab,
  setTab,
  query,
  setQuery,
  category,
  setCategory,
  occasion,
  setOccasion,
  sort,
  setSort,
  occasionOptions,
}: {
  tab: ShopTab
  setTab: (tab: ShopTab) => void
  query: string
  setQuery: (query: string) => void
  category: string
  setCategory: (category: string) => void
  occasion: string
  setOccasion: (occasion: string) => void
  sort: SortOrder
  setSort: (sort: SortOrder) => void
  occasionOptions: string[]
}) {
  const categories =
    tab === 'bouquets'
      ? [
          { value: 'All', label: 'All' },
          { value: 'Rose', label: 'Roses' },
          { value: 'Mixed', label: 'Mixed' },
          { value: 'Marigold', label: 'Marigold' },
          { value: 'Wedding', label: 'Wedding' },
          { value: 'Bridal', label: 'Bridal' },
        ]
      : [
          { value: 'All', label: 'All' },
          { value: 'Chocolates', label: 'Chocolates' },
          { value: 'Soft toys', label: 'Soft toys' },
          { value: 'Gift hampers', label: 'Gift hampers' },
          { value: 'Cakes', label: 'Cakes' },
          { value: 'Personalised', label: 'Personalised' },
          { value: 'Combo with flowers', label: 'Combos' },
        ]
  return (
    <div className="border-line bg-background sticky top-[76px] z-20 border-b">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <div
          role="tablist"
          aria-label="Shop category"
          className="border-line flex items-center gap-7 border-b"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'bouquets'}
            onClick={() => setTab('bouquets')}
            className={`focus-visible:outline-brand-gold font-display border-b-2 px-1 pb-3 text-3xl focus-visible:outline-2 focus-visible:outline-offset-2 ${tab === 'bouquets' ? 'border-brand-green text-brand-green' : 'text-ink-muted border-transparent'}`}
          >
            Bouquets
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'gifts'}
            onClick={() => setTab('gifts')}
            className={`focus-visible:outline-brand-gold font-display border-b-2 px-1 pb-3 text-3xl focus-visible:outline-2 focus-visible:outline-offset-2 ${tab === 'gifts' ? 'border-brand-green text-brand-green' : 'text-ink-muted border-transparent'}`}
          >
            Gifts
          </button>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="radiogroup"
            aria-label="Filter by category"
            className="flex max-w-full [scrollbar-width:none] gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                role="radio"
                onClick={() => setCategory(item.value)}
                aria-checked={category === item.value}
                className={`focus-visible:outline-brand-gold h-11 shrink-0 rounded-full border px-4 text-xs tracking-[.14em] whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-2 ${category === item.value ? 'border-brand-green bg-brand-green text-brand-white' : 'border-line text-ink'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-2 lg:flex lg:shrink-0">
            <label className="border-line focus-within:border-brand-green focus-within:outline-brand-gold col-span-2 flex h-11 min-w-0 items-center gap-2 border px-3 focus-within:outline-2 focus-within:outline-offset-2 lg:col-span-1 lg:w-60">
              <Search
                aria-hidden="true"
                className="text-ink-muted size-4 shrink-0"
              />
              <input
                aria-label="Search arrangements"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search arrangements"
                className="placeholder:text-ink-muted min-w-0 flex-1 bg-transparent text-base outline-none"
              />
            </label>
            <div className="relative min-w-0 lg:w-40">
              <select
                aria-label="Filter by occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="focus-visible:outline-brand-gold border-line bg-background text-ink focus:border-brand-green h-11 w-full appearance-none border px-3 pr-9 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <option value="All occasions">Occasion</option>
                {occasionOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="text-ink-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
              />
            </div>
            <div className="relative min-w-0 lg:w-40">
              <select
                aria-label="Sort by"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOrder)}
                className="focus-visible:outline-brand-gold border-line bg-background text-ink focus:border-brand-green h-11 w-full appearance-none border px-3 pr-9 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <option value="featured">Sort by</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="text-ink-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlowersGiftsPage() {
  const [tab, setTab] = useState<'bouquets' | 'gifts'>('bouquets')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [occasion, setOccasion] = useState('All occasions')
  const [sort, setSort] = useState<SortOrder>('featured')
  const [selected, setSelected] = useState<Product | null>(null)
  const [toast, setToast] = useState('')
  const [offer, setOffer] = useState<Offer | null>(null)
  const deferredTab = useDeferredValue(tab)
  const deferredQuery = useDeferredValue(query)
  const deferredCategory = useDeferredValue(category)
  const deferredOccasion = useDeferredValue(occasion)
  const deferredSort = useDeferredValue(sort)
  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timeout)
  }, [toast])
  const notifyAdded = (name: string) => setToast(name)
  const products = deferredTab === 'bouquets' ? bouquets : gifts
  const occasionOptions = useMemo(() => {
    const values = products.flatMap((item) =>
      'occasions' in item ? item.occasions : item.tags,
    )
    return [
      ...new Set([
        ...values,
        ...(deferredTab === 'bouquets' ? ['Orchid', 'Custom'] : []),
      ]),
    ].sort()
  }, [deferredTab, products])
  useEffect(() => {
    const queryValue = new URLSearchParams(window.location.search).get('offer')
    const parsedOfferId = offerQuerySchema.safeParse(queryValue)
    const activeOffer = getActiveOffer(new Date())
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffer(
      parsedOfferId.success && activeOffer?.id === parsedOfferId.data
        ? activeOffer
        : null,
    )
  }, [])
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'gifts' || hash === 'bouquets') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs the shareable URL hash after hydration.
      setTab(hash as 'gifts' | 'bouquets')
    }
    const onHash = () => {
      const next = window.location.hash.replace('#', '')
      if (next === 'gifts' || next === 'bouquets')
        setTab(next as 'gifts' | 'bouquets')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const changeTab = (next: 'bouquets' | 'gifts') => {
    setTab(next)
    const url = new URL(window.location.href)
    url.hash = next
    window.history.replaceState(
      null,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    )
    setCategory('All')
    setOccasion('All occasions')
    setSort('featured')
    setQuery('')
  }
  const clearFilters = () => {
    setCategory('All')
    setOccasion('All occasions')
    setSort('featured')
    setQuery('')
  }
  const filtered = useMemo(
    () =>
      [...products]
        .filter(
          (item) =>
            (deferredCategory === 'All' ||
              item.category === deferredCategory) &&
            (!offer || offer.productIds.includes(item.id)) &&
            (deferredOccasion === 'All occasions' ||
              (deferredOccasion === 'Orchid' || deferredOccasion === 'Custom'
                ? item.category === deferredOccasion
                : 'occasions' in item
                  ? item.occasions.includes(deferredOccasion)
                  : item.tags.includes(deferredOccasion))) &&
            `${item.name} ${item.description}`
              .toLowerCase()
              .includes(deferredQuery.toLowerCase()),
        )
        .sort((a, b) =>
          deferredSort === 'low'
            ? getOfferPrice(a, offer).final - getOfferPrice(b, offer).final
            : deferredSort === 'high'
              ? getOfferPrice(b, offer).final - getOfferPrice(a, offer).final
              : 0,
        ),
    [
      products,
      deferredCategory,
      deferredOccasion,
      deferredQuery,
      deferredSort,
      offer,
    ],
  )
  const filtersActive =
    category !== 'All' ||
    occasion !== 'All occasions' ||
    sort !== 'featured' ||
    query.trim() !== ''
  const isFiltering =
    tab !== deferredTab ||
    category !== deferredCategory ||
    occasion !== deferredOccasion ||
    sort !== deferredSort ||
    query !== deferredQuery
  return (
    <>
      <main className="shop-catalogue pt-[76px]">
        <header className="mx-auto max-w-7xl px-5 pt-20 pb-8 sm:px-8 lg:px-12">
          <p className="eyebrow">Flower studio &amp; gifts</p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(4rem,10vw,8.5rem)] leading-[.82] font-light tracking-[-.06em]">
            Say it with <em>flowers.</em>
          </h1>
        </header>
        <FilterBar
          tab={tab}
          setTab={changeTab}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          occasion={occasion}
          setOccasion={setOccasion}
          sort={sort}
          setSort={setSort}
          occasionOptions={occasionOptions}
        />
        <section className="mx-auto max-w-7xl px-5 pt-8 pb-[120px] sm:px-8 lg:px-12">
          {offer && (
            <div className="border-line mb-8 flex flex-wrap items-center justify-between gap-3 border-y py-4">
              <p className="text-sm leading-6">
                <span className="text-maroon">{offer.festival} offer:</span>{' '}
                {offer.discountPercent}% off selected items
              </p>
              <Link
                href="/flowers-gifts"
                onClick={() => setOffer(null)}
                className="text-maroon text-xs underline underline-offset-4"
              >
                Clear offer
              </Link>
            </div>
          )}
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-ink-muted text-sm">
              {filtered.length} {tab === 'bouquets' ? 'arrangements' : 'gifts'}
            </p>
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="focus-visible:outline-brand-gold text-brand-green hover:decoration-brand-gold text-xs underline decoration-transparent underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
          <div
            className={`grid grid-cols-2 gap-x-4 gap-y-10 transition-opacity duration-200 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 ${isFiltering ? 'opacity-60' : 'opacity-100'}`}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setSelected}
                onAdded={notifyAdded}
                offer={offer}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-base">Nothing matches that yet.</p>
              <p className="text-ink-muted mt-2 text-sm leading-6">
                Try another word, or ask us on WhatsApp for a custom
                arrangement.
              </p>
              <a
                href={whatsapp(
                  "Namaste! I'd like to request a custom bouquet. My budget is ____, colours are ____ and the occasion is ____.",
                )}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-brand-gold bg-brand-green text-brand-white hover:bg-brand-green-deep mt-6 inline-flex min-h-11 items-center px-5 text-xs tracking-[.14em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Ask on WhatsApp
              </a>
            </div>
          )}
        </section>
        <section className="bg-surface mx-5 my-10 grid gap-6 px-6 py-10 sm:mx-8 sm:px-10 lg:mx-auto lg:max-w-7xl lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
          <div>
            <p className="eyebrow">Made for your moment</p>
            <h2 className="font-display mt-3 max-w-xl text-4xl leading-none sm:text-5xl">
              Can&apos;t find what you imagine? We&apos;ll <em>design</em> it
              for you.
            </h2>
          </div>
          <a
            href={whatsapp(
              "Namaste! I'd like to request a custom bouquet. My budget is ____, colours are ____ and the occasion is ____.",
            )}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-green text-brand-white hover:bg-brand-green-deep w-fit rounded-[2px] px-5 py-3 text-xs tracking-[.14em] uppercase"
          >
            Request a custom bouquet
          </a>
        </section>
        <section className="mx-auto max-w-7xl px-5 pt-4 pb-16 sm:px-8 lg:px-12">
          <div className="border-line border-y py-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Delivery in Pokhara</p>
              <p className="font-display mt-2 text-3xl">
                Same-day delivery for orders placed by noon.
              </p>
            </div>
            <p className="text-ink/60 mt-4 text-sm sm:mt-0">
              Lakeside · Damside · Lekhnath · Sarangkot · and destination events
              beyond
            </p>
          </div>
        </section>
      </main>
      {selected && (
        <QuickView
          product={selected}
          close={() => setSelected(null)}
          onAdded={notifyAdded}
          offer={offer}
        />
      )}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="border-line bg-background fixed right-4 bottom-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm animate-[fade-up_0.3s_ease-out_both] items-center gap-4 border p-4 sm:right-6 sm:bottom-6"
        >
          <span className="bg-sage/10 text-sage flex size-11 shrink-0 items-center justify-center rounded-full">
            <Check className="size-5" strokeWidth={2.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-maroon block text-xs tracking-[.12em] uppercase">
              Added to your enquiry
            </span>
            <span className="font-display mt-1 block truncate text-xl">
              {toast}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setToast('')}
            aria-label="Dismiss notification"
            className="text-ink/45 hover:text-ink self-start p-1 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </>
  )
}
