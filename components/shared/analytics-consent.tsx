'use client'

import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Consent = 'accepted' | 'declined'

const storageKey = 'bagaicha-analytics-consent'

export function AnalyticsConsent() {
  const [state, setState] = useState<{
    consent: Consent | null
    ready: boolean
  }>({ consent: null, ready: false })
  const [showChoices, setShowChoices] = useState(false)

  useEffect(() => {
    let consent: Consent | null = null
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved === 'accepted' || saved === 'declined') {
        consent = saved
      }
    } catch (error) {
      console.error('Could not read analytics consent:', error)
    }

    // Sync saved browser consent after hydration to avoid an HTML mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ consent, ready: true })

    const openChoices = () => setShowChoices(true)
    window.addEventListener('bagaicha:open-privacy-choices', openChoices)
    return () =>
      window.removeEventListener('bagaicha:open-privacy-choices', openChoices)
  }, [])

  function chooseConsent(choice: Consent) {
    try {
      window.localStorage.setItem(storageKey, choice)
      setState({ consent: choice, ready: true })
      setShowChoices(false)
    } catch (error) {
      console.error('Could not save analytics consent:', error)
      setState({ consent: 'declined', ready: true })
      setShowChoices(false)
    }
  }

  if (process.env.NODE_ENV !== 'production' || !state.ready) return null

  return (
    <>
      {state.consent === 'accepted' && <Analytics />}
      {showChoices || state.consent === null ? (
        <aside
          aria-label="Analytics privacy choices"
          className="border-line bg-background fixed inset-x-0 bottom-0 z-50 border-t px-5 py-5 shadow-lg sm:px-8"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium">Your privacy choices</p>
              <p className="text-ink/70 mt-1 text-xs leading-5">
                Optional Vercel Analytics helps us understand site visits. It
                stays off unless you allow it. Read our{' '}
                <Link
                  href="/privacy"
                  className="text-maroon underline underline-offset-2"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => chooseConsent('declined')}
                className="border-line min-h-11 border px-4 text-xs"
              >
                Decline analytics
              </button>
              <button
                type="button"
                onClick={() => chooseConsent('accepted')}
                className="bg-maroon text-background min-h-11 px-4 text-xs"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setShowChoices(true)}
          className="border-line bg-background text-ink fixed right-4 bottom-4 z-40 min-h-11 border px-4 text-xs shadow"
        >
          Privacy choices
        </button>
      )}
    </>
  )
}
