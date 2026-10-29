'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page rendering failed:', error)
  }, [error])

  return (
    <main className="flex min-h-[70svh] items-center justify-center px-6 py-32 text-center">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="font-display mt-5 text-5xl font-light sm:text-7xl">
          Let&apos;s try that again.
        </h1>
        <p className="text-ink/65 mx-auto mt-6 max-w-sm text-sm leading-7">
          This page could not be loaded. Please try again or return to the
          homepage.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="bg-maroon text-background px-5 py-3 text-xs tracking-[.16em] uppercase"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border-maroon text-maroon border px-5 py-3 text-xs tracking-[.16em] uppercase"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  )
}
