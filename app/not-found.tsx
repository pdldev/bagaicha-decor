import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] items-center justify-center px-6 py-32 text-center">
      <div>
        <p className="eyebrow">404 / Bagaicha</p>
        <h1 className="font-display mt-5 text-[clamp(4rem,12vw,9rem)] leading-[.8] font-light tracking-[-.06em]">
          This petal
          <br />
          <em className="text-marigold-contrast">drifted away.</em>
        </h1>
        <p className="text-ink/65 mx-auto mt-8 max-w-sm text-sm leading-7">
          The page you were looking for is no longer here. Let&apos;s take you
          back to the garden.
        </p>
        <Link
          href="/"
          className="bg-maroon text-background mt-8 inline-flex rounded-full px-5 py-3 text-[10px] tracking-[.16em] uppercase"
        >
          Back home
        </Link>
      </div>
    </main>
  )
}
