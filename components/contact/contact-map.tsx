'use client'

import { useEffect, useRef } from 'react'

export function ContactMap({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const frame = frameRef.current
    const placeholder = placeholderRef.current
    if (!container || !frame || !placeholder) return

    const loadMap = () => {
      frame.src = src
      frame.classList.remove('opacity-0', 'pointer-events-none')
      placeholder.hidden = true
    }

    if (!('IntersectionObserver' in window)) {
      loadMap()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        loadMap()
        observer.disconnect()
      },
      { rootMargin: '0px' },
    )
    observer.observe(container)

    return () => observer.disconnect()
  }, [src])

  return (
    <div
      ref={containerRef}
      className="bg-surface relative h-[320px] w-full md:h-[420px]"
    >
      <iframe
        ref={frameRef}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Bagaicha Flower Decor and Events location map"
        className="pointer-events-none absolute inset-0 size-full border-0 opacity-0"
      />
      <div
        ref={placeholderRef}
        aria-hidden="true"
        className="bg-surface absolute inset-0"
        data-testid="map-placeholder"
      />
    </div>
  )
}
