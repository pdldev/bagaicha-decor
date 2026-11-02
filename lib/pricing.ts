import type { Bouquet, Gift } from '@/types/content'
import type { Offer } from '@/lib/schemas/offer'

export type OfferPrice = {
  original: number
  final: number
  discounted: boolean
}
type OfferLabel = Pick<Offer, 'festival' | 'discountPercent'>

export function discountedPrice(originalNpr: number, percent: number): number {
  return Math.max(10, Math.round((originalNpr * (1 - percent / 100)) / 10) * 10)
}

export function getOfferPrice(
  product: Pick<Bouquet | Gift, 'id' | 'price'>,
  offer: Offer | null,
): OfferPrice {
  const discounted = offer !== null && offer.productIds.includes(product.id)
  return {
    original: product.price,
    final:
      discounted && offer
        ? discountedPrice(product.price, offer.discountPercent)
        : product.price,
    discounted,
  }
}

export function formatNpr(amount: number): string {
  return `Rs. ${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount)}`
}

export function formatOfferPrice(
  price: OfferPrice,
  offer: OfferLabel | null,
): string {
  if (!price.discounted || !offer) return formatNpr(price.final)
  return `${formatNpr(price.final)} (was ${formatNpr(price.original)}, ${offer.festival} ${offer.discountPercent}% off)`
}
