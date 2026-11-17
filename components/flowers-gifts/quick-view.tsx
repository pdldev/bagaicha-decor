'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import {
  type Bouquet,
  type Gift,
  type Offer,
  type ProductSize,
} from '@/lib/content'
import { useEnquiryStore } from '@/store/enquiry'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { formatNpr, formatOfferPrice, getOfferPrice } from '@/lib/pricing'

export type FlowerGiftProduct = Bouquet | Gift

export function QuickView({
  product,
  close,
  onAdded,
  offer,
}: {
  product: FlowerGiftProduct
  close: () => void
  onAdded: (name: string) => void
  offer: Offer | null
}) {
  const { addItem } = useEnquiryStore()
  const sizes = 'sizes' in product ? product.sizes : undefined
  const [selected, setSelected] = useState<ProductSize | undefined>(sizes?.[1])
  const [qty, setQty] = useState(1)
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [card, setCard] = useState('')
  const originalPrice = selected?.price ?? product.price
  const price = getOfferPrice({ ...product, price: originalPrice }, offer)
  const message = `Namaste Bagaicha Flower Decor! I'd like to order:\n*${product.name}*${selected ? ` (${selected.label})` : ''}\nPrice: ${formatOfferPrice(price, offer)}\nQuantity: ${qty}\nDelivery location: ${location || '____'}\nDelivery date/time: ${date || '____'}\nCard message (optional): ${card || '____'}`

  return (
    <div
      className="shop-quick-view bg-ink/45 fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
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
            type="button"
            onClick={close}
            aria-label="Close quick view"
            className="bg-background absolute top-4 right-4 rounded-full p-2"
          >
            <X className="size-4" />
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            window.open(
              buildWhatsAppUrl(message),
              '_blank',
              'noopener,noreferrer',
            )
          }}
          className="flex flex-col gap-5 p-6 sm:p-10"
        >
          <div>
            <p className="eyebrow">{product.category}</p>
            <h2 className="font-display mt-2 text-4xl leading-none">
              {product.name.split(' ').slice(0, -1).join(' ')}{' '}
              <em>{product.name.split(' ').slice(-1)[0]}</em>
            </h2>
            <p className="text-ink/65 mt-6 text-sm leading-7">
              {product.description}
            </p>
          </div>
          {sizes && (
            <div>
              <span className="mb-2 block text-xs tracking-[.12em] uppercase">
                Size
              </span>
              <div className="flex gap-2">
                {sizes.map((size) => {
                  const sizePrice = getOfferPrice(
                    { ...product, price: size.price },
                    offer,
                  )

                  return (
                    <button
                      key={size.label}
                      type="button"
                      onClick={() => setSelected(size)}
                      className={`rounded-full border px-4 py-2 text-xs tracking-[.14em] uppercase ${selected?.label === size.label ? 'border-maroon bg-maroon text-background' : 'border-line'}`}
                    >
                      {size.label} ·{' '}
                      {sizePrice.discounted && (
                        <del className="mr-1">
                          <span className="sr-only">Was </span>
                          {formatNpr(sizePrice.original)}
                        </del>
                      )}
                      {formatNpr(sizePrice.final)}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          <div className="border-line flex items-center justify-between border-y py-3">
            <span className="text-xs tracking-[.12em] uppercase">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span>{qty}</span>
              <button
                type="button"
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
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Delivery area"
              className="border-line placeholder:text-ink/40 border-b bg-transparent px-0 py-2 text-base outline-none"
            />
            <input
              aria-label="Delivery date or time"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="Delivery date / time"
              className="border-line placeholder:text-ink/40 border-b bg-transparent px-0 py-2 text-base outline-none"
            />
            <textarea
              aria-label="Optional card message"
              value={card}
              onChange={(event) => setCard(event.target.value)}
              placeholder="Optional card message"
              rows={2}
              className="border-line placeholder:text-ink/40 resize-none border-b bg-transparent px-0 py-2 text-base outline-none"
            />
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 pt-3">
            <div className="text-right">
              {price.discounted && (
                <del className="text-ink/50 block text-xs">
                  <span className="sr-only">Was </span>
                  {formatNpr(price.original * qty)}
                </del>
              )}
              <p
                className={
                  price.discounted ? 'text-maroon text-base' : 'text-base'
                }
              >
                {formatNpr(price.final * qty)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="submit"
                className="focus-visible:outline-brand-gold bg-brand-green text-brand-white hover:bg-brand-green-deep rounded-[2px] px-5 py-3 text-center text-xs tracking-[.14em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Submit order
              </button>
              <button
                type="button"
                onClick={() => {
                  addItem({ id: product.id, qty })
                  onAdded(product.name)
                  close()
                }}
                className="focus-visible:outline-brand-gold text-brand-green text-xs tracking-[.14em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Add to enquiry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
