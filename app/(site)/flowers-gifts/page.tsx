'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronDown, Minus, Plus, Search, X } from 'lucide-react'
import { bouquets, type Bouquet, type ProductSize } from '@/lib/content'
import { gifts, type Gift } from '@/lib/content'
import { useEnquiryStore } from '@/store/enquiry'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const whatsapp = buildWhatsAppUrl
const money = (value: number) => `Rs. ${value.toLocaleString('en-IN')}`
type Product = Bouquet | Gift

function productMessage(
  product: Product,
  price: number,
  size = '',
  quantity = 1,
  details = '',
) {
  return `Namaste Bagaicha Flower Decor! I'd like to order:\n*${product.name}*${size ? ` (${size})` : ''}\nPrice: ${money(price)}\nQuantity: ${quantity}\nDelivery location: ${details || '____'}\nDelivery date/time: ____\nCard message (optional): ____`
}

function ProductCard({
  product,
  onOpen,
}: {
  product: Product
  onOpen: (product: Product) => void
}) {
  const { addItem } = useEnquiryStore()
  const price = product.price
  return (
    <article className="group">
      <button
        className="block w-full text-left"
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name}`}
      >
        <div className="bg-surface relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {'inStock' in product && !product.inStock && (
              <span className="bg-background px-2 py-1 text-[9px] tracking-[.16em] uppercase">
                Sold out
              </span>
            )}
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 pt-4">
          <div>
            <h2 className="font-display text-2xl leading-none">
              {product.name}
            </h2>
            <p className="text-ink/55 mt-1 text-xs">{product.category}</p>
          </div>
          <p className="shrink-0 text-sm">{money(price)}</p>
        </div>
      </button>
      <div className="border-line mt-4 flex items-center gap-3 border-t pt-3 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <a
          href={whatsapp(productMessage(product, price))}
          target="_blank"
          rel="noreferrer"
          className="bg-maroon text-background flex-1 rounded-full px-3 py-2 text-center text-[10px] tracking-[.1em] uppercase"
        >
          Order on WhatsApp
        </a>
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              type: product.category,
              price,
            })
          }
          className="text-maroon text-[10px] tracking-[.1em] uppercase"
        >
          Add to enquiry
        </button>
      </div>
    </article>
  )
}

function QuickView({
  product,
  close,
}: {
  product: Product
  close: () => void
}) {
  const { addItem } = useEnquiryStore()
  const sizes = 'sizes' in product ? product.sizes : undefined
  const [selected, setSelected] = useState<ProductSize | undefined>(sizes?.[1])
  const [qty, setQty] = useState(1)
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [card, setCard] = useState('')
  const price = selected?.price ?? product.price
  const message = `Namaste Bagaicha Flower Decor! I'd like to order:\n*${product.name}*${selected ? ` (${selected.label})` : ''}\nPrice: ${money(price)}\nQuantity: ${qty}\nDelivery location: ${location || '____'}\nDelivery date/time: ${date || '____'}\nCard message (optional): ${card || '____'}`
  return (
    <div
      className="bg-ink/45 fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
    >
      <div className="bg-background max-h-[94vh] w-full max-w-4xl overflow-y-auto sm:grid sm:grid-cols-2">
        <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[600px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
          <button
            onClick={close}
            aria-label="Close quick view"
            className="bg-background absolute top-4 right-4 rounded-full p-2"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex flex-col gap-5 p-6 sm:p-10">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h2 className="font-display mt-2 text-4xl leading-none">
              {product.name}
            </h2>
            <p className="text-ink/65 mt-3 text-sm leading-6">
              {product.description}
            </p>
          </div>
          {sizes && (
            <div>
              <p className="mb-2 text-[10px] tracking-[.16em] uppercase">
                Size
              </p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelected(size)}
                    className={`rounded-full border px-4 py-2 text-xs ${selected?.label === size.label ? 'border-maroon bg-maroon text-background' : 'border-line'}`}
                  >
                    {size.label} · {money(size.price)}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="border-line flex items-center justify-between border-y py-3">
            <span className="text-[10px] tracking-[.16em] uppercase">
              Quantity
            </span>
            <div className="flex items-center gap-4">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span>{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty(qty + 1)}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid gap-3">
            <input
              aria-label="Delivery area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Delivery area"
              className="border-line placeholder:text-ink/40 border-b bg-transparent px-0 py-2 text-sm outline-none"
            />
            <input
              aria-label="Delivery date or time"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Delivery date / time"
              className="border-line placeholder:text-ink/40 border-b bg-transparent px-0 py-2 text-sm outline-none"
            />
            <textarea
              aria-label="Optional card message"
              value={card}
              onChange={(e) => setCard(e.target.value)}
              placeholder="Optional card message"
              rows={2}
              className="border-line placeholder:text-ink/40 resize-none border-b bg-transparent px-0 py-2 text-sm outline-none"
            />
          </div>
          <div className="mt-auto flex items-center justify-between pt-3">
            <p className="font-display text-3xl">{money(price * qty)}</p>
            <div className="flex flex-col items-end gap-2">
              <a
                href={whatsapp(message)}
                target="_blank"
                rel="noreferrer"
                className="bg-maroon text-background rounded-full px-5 py-3 text-center text-[10px] tracking-[.1em] uppercase"
              >
                Order on WhatsApp
              </a>
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    type: product.category,
                    price,
                    qty,
                  })
                  close()
                }}
                className="text-maroon text-[10px] tracking-[.1em] uppercase"
              >
                Add to enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
}: any) {
  const categories =
    tab === 'bouquets'
      ? [
          'All',
          'Rose',
          'Mixed',
          'Marigold',
          'Orchid',
          'Wedding',
          'Bridal',
          'Custom',
        ]
      : [
          'All',
          'Chocolates',
          'Soft toys',
          'Gift hampers',
          'Cakes',
          'Personalised',
          'Combo with flowers',
        ]
  return (
    <div className="border-line bg-background/95 sticky top-[76px] z-20 border-y py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 lg:px-12">
        <div className="border-line flex items-center gap-7 border-b">
          <button
            onClick={() => setTab('bouquets')}
            aria-pressed={tab === 'bouquets'}
            className={`font-display pb-3 text-3xl ${tab === 'bouquets' ? 'border-maroon text-maroon border-b-2' : 'text-ink/45'}`}
          >
            Bouquets
          </button>
          <button
            onClick={() => setTab('gifts')}
            aria-pressed={tab === 'gifts'}
            className={`font-display pb-3 text-3xl ${tab === 'gifts' ? 'border-maroon text-maroon border-b-2' : 'text-ink/45'}`}
          >
            Gifts
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex max-w-full gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full border px-3 py-1.5 text-[10px] tracking-[.08em] whitespace-nowrap uppercase ${category === item ? 'border-maroon bg-maroon text-background' : 'border-line text-ink/60'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="ml-auto flex w-full items-center gap-2 sm:w-auto">
            <label className="border-line flex flex-1 items-center gap-2 border-b px-1 py-1 sm:w-44">
              <Search className="text-ink/45 size-4" />
              <input
                aria-label="Search flowers and gifts"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flowers..."
                className="placeholder:text-ink/45 min-w-0 bg-transparent text-sm outline-none"
              />
            </label>
            <select
              aria-label="Filter by occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="hidden bg-transparent text-xs outline-none sm:block"
            >
              <option value="All occasions">All occasions</option>
              <option>Birthday</option>
              <option>Wedding</option>
              <option>Anniversary</option>
              <option>Puja</option>
              <option>Thank you</option>
            </select>
            <select
              aria-label="Sort flowers and gifts"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-xs outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low-high</option>
              <option value="high">Price: high-low</option>
            </select>
            <ChevronDown className="pointer-events-none -ml-5 size-3" />
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
  const [sort, setSort] = useState('featured')
  const [selected, setSelected] = useState<Product | null>(null)
  const [toast, setToast] = useState('')
  const products = tab === 'bouquets' ? bouquets : gifts
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
    window.history.replaceState(null, '', `#${next}`)
    setCategory('All')
    setQuery('')
  }
  const filtered = useMemo(
    () =>
      [...products]
        .filter(
          (item) =>
            (category === 'All' || item.category === category) &&
            (occasion === 'All occasions' ||
              ('occasions' in item
                ? item.occasions.includes(occasion)
                : item.tags.includes(occasion))) &&
            item.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === 'low'
            ? a.price - b.price
            : sort === 'high'
              ? b.price - a.price
              : 0,
        ),
    [products, category, occasion, query, sort],
  )
  return (
    <>
      <main className="pt-[76px]">
        <section className="mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-24">
          <p className="eyebrow">Flower studio &amp; gifts</p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(4rem,10vw,8.5rem)] leading-[.82] font-light tracking-[-.06em]">
            Say it with <em className="text-maroon">flowers.</em>
          </h1>
        </section>
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
        />
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setSelected}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-4xl">
                Nothing blooming here yet.
              </p>
              <p className="text-ink/60 mt-2 text-sm">
                Try another search, or tell us what you have in mind.
              </p>
            </div>
          )}
        </section>
        <section className="bg-sage text-background mx-5 my-10 grid gap-6 px-6 py-10 sm:mx-8 sm:px-10 lg:mx-auto lg:max-w-7xl lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
          <div>
            <p className="eyebrow text-background/60">Made for your moment</p>
            <h2 className="font-display mt-3 max-w-xl text-4xl leading-none sm:text-5xl">
              Can&apos;t find what you imagine? We&apos;ll design it for you.
            </h2>
          </div>
          <a
            href={whatsapp(
              "Namaste! I'd like to request a custom bouquet. My budget is ____, colours are ____ and the occasion is ____.",
            )}
            target="_blank"
            rel="noreferrer"
            className="bg-background text-sage w-fit rounded-full px-5 py-3 text-[10px] tracking-[.1em] uppercase"
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
        <QuickView product={selected} close={() => setSelected(null)} />
      )}
    </>
  )
}
