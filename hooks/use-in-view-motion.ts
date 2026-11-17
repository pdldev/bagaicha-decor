'use client'

import { useEffect } from 'react'

export function useInViewMotion() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-motion]'),
    )
    const root = document.documentElement

    if (
      targets.length === 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return
    }

    const cleanupTimers = new Set<number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target
          target.addEventListener(
            'animationend',
            (event) => {
              if (event.target === target) {
                target.classList.add('motion-finished')
              }
            },
            { once: true },
          )
          target.classList.add('motion-visible')
          if (target.querySelector('.motion-image-scale')) {
            const timer = window.setTimeout(() => {
              target.classList.add('motion-image-finished')
              cleanupTimers.delete(timer)
            }, 1500)
            cleanupTimers.add(timer)
          }
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    )

    targets.forEach((target) => {
      const bounds = target.getBoundingClientRect()
      if (bounds.top < window.innerHeight * 0.85 && bounds.bottom > 0) {
        target.classList.add('motion-skip')
        target.classList.add('motion-visible')
      } else {
        observer.observe(target)
      }
    })

    root.classList.add('motion-enabled')

    return () => {
      observer.disconnect()
      cleanupTimers.forEach(window.clearTimeout)
      root.classList.remove('motion-enabled')
    }
  }, [])
}
