export type AnalyticsEvent = 'whatsapp_click' | 'contact_submit' | 'catalogue_download'
export type AnalyticsSource =
  'header' | 'hero' | 'product' | 'service' | 'basket' | 'contact'

type EventPayload = {
  source?: AnalyticsSource
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === 'undefined') return
  const analyticsConfigured = Boolean(
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ||
      process.env.NEXT_PUBLIC_ANALYTICS ||
      process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID ||
      (window as Window & { plausible?: unknown }).plausible,
  )
  if (!analyticsConfigured) return
  const plausible = window as Window & {
    plausible?: (name: string, options?: { props: EventPayload }) => void
  }
  if (typeof plausible.plausible === 'function')
    plausible.plausible(event, { props: payload })
  window.dispatchEvent(
    new CustomEvent('bagaicha:analytics', { detail: { event, ...payload } }),
  )
}
