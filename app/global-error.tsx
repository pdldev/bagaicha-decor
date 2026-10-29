'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application rendering failed:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6 py-32 text-center">
          <div>
            <h1 className="font-display text-5xl font-light sm:text-7xl">
              We&apos;ll be right back.
            </h1>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-7">
              Something unexpected happened. Please try again.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 border px-5 py-3 text-xs tracking-[.16em] uppercase"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
