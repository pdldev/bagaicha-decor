'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Dialog } from '@base-ui/react/dialog'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { bouquets, getActiveOffer, gifts } from '@/lib/content'
import { formatNpr, getOfferPrice } from '@/lib/pricing'
import { trackEvent } from '@/lib/analytics'

const products = [...bouquets, ...gifts]

export default function OfferPopup() {
  const pathname = usePathname()
  const offer = getActiveOffer(new Date())
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!offer || pathname === '/flowers-gifts') return

    const storageKey = `bagaicha-offer-seen-${offer.id}`
    try {
      if (window.sessionStorage.getItem(storageKey)) return
    } catch {
      // Session storage is optional; show the offer if it is unavailable.
    }

    const timeout = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(storageKey, '1')
      } catch {
        // The popup still works when session storage is unavailable.
      }
      triggerRef.current?.focus()
      setOpen(true)
      trackEvent('offer_popup_shown', { offer_id: offer.id })
    }, 3000)

    return () => window.clearTimeout(timeout)
  }, [offer, pathname])

  if (!offer || pathname === '/flowers-gifts') return null

  const featuredProducts = offer.featuredIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined)
  const endsAt = new Date(offer.endsAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          window.requestAnimationFrame(() => triggerRef.current?.focus())
        }
      }}
    >
      <Dialog.Trigger
        ref={triggerRef}
        aria-label={`Open ${offer.festival} offer`}
        tabIndex={-1}
        className="sr-only"
      >
        Open offer
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/45 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          aria-labelledby="festival-offer-title"
          className="bg-background fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl p-5 shadow-2xl transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[90dvh] sm:w-[min(92vw,900px)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8"
        >
          <div className="relative mb-5 aspect-[16/5] overflow-hidden">
            <Image
              src={offer.heroImage}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 850px"
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <p className="eyebrow">{offer.festival} Offer</p>
            <Dialog.Title
              id="festival-offer-title"
              className="font-display mt-2 text-3xl font-light sm:text-5xl"
            >
              {offer.discountPercent === 20 ? 'Twenty' : offer.discountPercent}{' '}
              percent off, this <em>festival</em>.
            </Dialog.Title>
            <p className="font-display text-maroon mt-1 text-[clamp(4.5rem,15vw,8rem)] leading-[.9] font-light tracking-[-.06em]">
              {offer.discountPercent}%
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
            {featuredProducts.map((product) => {
              const price = getOfferPrice(product, offer)
              return (
                <article key={product.id} className="min-w-0">
                  <div className="bg-surface relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 30vw, 260px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display mt-2 truncate text-lg leading-tight sm:text-2xl">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs sm:text-sm">
                    <del className="text-ink/50">
                      <span className="sr-only">Was </span>
                      {formatNpr(price.original)}
                    </del>
                    <span className="text-maroon font-medium">
                      {formatNpr(price.final)}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="text-ink/55 mt-5 text-center text-[10px] leading-5 sm:text-xs">
            Offer valid until {endsAt}. Applies to items marked in the store.
            Final price confirmed on WhatsApp.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/flowers-gifts?offer=${encodeURIComponent(offer.id)}`}
              onClick={() => {
                trackEvent('offer_shop_now_click', { offer_id: offer.id })
                setOpen(false)
              }}
              className="bg-maroon text-background w-full rounded-full px-6 py-3 text-center text-xs tracking-[.1em] uppercase sm:w-auto"
            >
              Shop now
            </Link>
            <Dialog.Close className="text-ink/65 px-4 py-2 text-xs">
              Maybe later
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
