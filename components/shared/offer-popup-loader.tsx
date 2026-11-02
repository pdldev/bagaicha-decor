'use client'

import dynamic from 'next/dynamic'

const OfferPopup = dynamic(() => import('./offer-popup'), { ssr: false })

export function OfferPopupLoader() {
  return <OfferPopup />
}
