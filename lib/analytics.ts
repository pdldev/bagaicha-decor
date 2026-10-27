export type AnalyticsEvent = 'whatsapp_click' | 'contact_submit'
export type AnalyticsSource =
  'header' | 'hero' | 'product' | 'service' | 'basket' | 'contact'

type EventPayload = {
  source?: AnalyticsSource
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === 'undefined') return
  const plausible = window as Window & {
    plausible?: (name: string, options?: { props: EventPayload }) => void
  }
  if (typeof plausible.plausible === 'function')
    plausible.plausible(event, { props: payload })
  window.dispatchEvent(
    new CustomEvent('bagaicha:analytics', { detail: { event, ...payload } }),
  )
}
